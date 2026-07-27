// Real C++ compilation via the bundled MinGW-w64/g++ toolchain (WinLibs
// build, shipped as a Tauri resource under `mingw64/`). No system PATH is
// used — the compiler is invoked at its app-relative bundled path only.

use serde::Serialize;
use std::io::Read;
use std::path::{Path, PathBuf};
use std::process::{Command, Output, Stdio};
use std::time::{Duration, Instant};
use tauri::Manager;

const COMPILE_TIMEOUT: Duration = Duration::from_secs(10);
const RUN_TIMEOUT: Duration = Duration::from_secs(5);
const MAX_OUTPUT_CHARS: usize = 20_000;

#[derive(Serialize)]
pub struct CompileResult {
    ok: bool,
    stdout: String,
    stderr: String,
    #[serde(rename = "exitCode")]
    exit_code: Option<i32>,
    #[serde(rename = "timedOut")]
    timed_out: bool,
    // "compile" | "run" — tells the frontend which stage produced this result.
    stage: &'static str,
}

fn truncate(mut s: String) -> String {
    if s.len() > MAX_OUTPUT_CHARS {
        s.truncate(MAX_OUTPUT_CHARS);
        s.push_str("\n... (output truncated)");
    }
    s
}

fn copy_dir_all(src: &Path, dst: &Path) -> std::io::Result<()> {
    std::fs::create_dir_all(dst)?;
    for entry in std::fs::read_dir(src)? {
        let entry = entry?;
        let dest_path = dst.join(entry.file_name());
        if entry.file_type()?.is_dir() {
            copy_dir_all(&entry.path(), &dest_path)?;
        } else {
            std::fs::copy(entry.path(), &dest_path)?;
        }
    }
    Ok(())
}

// GCC on Windows resolves its own install directory (for crt objects,
// specs, etc.) from its real launch path, and a space anywhere in that
// path breaks collect2's internal linker invocation (confirmed by testing:
// this project's own folder, "Codex Infinium", contains a space, and a
// bundled compiler run directly from it fails with
// "ld.exe: cannot find C:/Users/.../Codex: No such file or directory" —
// the space silently splits the path). Tauri's app-local-data directory is
// keyed off the space-free app identifier (`com.codexinfinium.desktop`),
// not the product name, so staging one copy of the toolchain there on
// first use sidesteps the bug regardless of where the app itself is
// installed.
fn resolve_toolchain_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let resource_dir = app
        .path()
        .resource_dir()
        .map_err(|e| format!("could not resolve bundled resource dir: {e}"))?;
    let bundled = resource_dir.join("mingw64");

    let cache_root = app
        .path()
        .app_local_data_dir()
        .map_err(|e| format!("could not resolve app local data dir: {e}"))?;
    let staged = cache_root.join("mingw64");

    if !staged.join("bin").join("g++.exe").exists() {
        std::fs::create_dir_all(&cache_root).map_err(|e| e.to_string())?;
        copy_dir_all(&bundled, &staged)
            .map_err(|e| format!("failed to stage bundled compiler: {e}"))?;
    }
    Ok(staged)
}

// std::process::Command has no built-in timeout, so this polls the child
// with try_wait() while two background threads continuously drain
// stdout/stderr into capped buffers (draining concurrently, not after
// wait, so a chatty program can't deadlock on a full OS pipe buffer).
fn run_with_timeout(cmd: &mut Command, timeout: Duration) -> Result<Output, String> {
    let mut child = cmd
        .stdout(Stdio::piped())
        .stderr(Stdio::piped())
        .spawn()
        .map_err(|e| e.to_string())?;

    let mut stdout_pipe = child.stdout.take().unwrap();
    let mut stderr_pipe = child.stderr.take().unwrap();
    let stdout_handle = std::thread::spawn(move || drain_capped(&mut stdout_pipe));
    let stderr_handle = std::thread::spawn(move || drain_capped(&mut stderr_pipe));

    let start = Instant::now();
    let status = loop {
        match child.try_wait().map_err(|e| e.to_string())? {
            Some(status) => break status,
            None => {
                if start.elapsed() > timeout {
                    let _ = child.kill();
                    let _ = child.wait();
                    return Err("timed out".to_string());
                }
                std::thread::sleep(Duration::from_millis(30));
            }
        }
    };

    let stdout = stdout_handle.join().unwrap_or_default();
    let stderr = stderr_handle.join().unwrap_or_default();
    Ok(Output { status, stdout, stderr })
}

fn drain_capped<R: Read>(reader: &mut R) -> Vec<u8> {
    let mut buf = Vec::new();
    let mut chunk = [0u8; 4096];
    loop {
        match reader.read(&mut chunk) {
            Ok(0) => break,
            Ok(n) => {
                if buf.len() < MAX_OUTPUT_CHARS * 2 {
                    buf.extend_from_slice(&chunk[..n]);
                }
            }
            Err(_) => break,
        }
    }
    buf
}

#[tauri::command]
pub fn run_cpp(app: tauri::AppHandle, source: String) -> Result<CompileResult, String> {
    let toolchain_dir = resolve_toolchain_dir(&app)?;
    let gpp = toolchain_dir.join("bin").join("g++.exe");

    let work_dir = std::env::temp_dir().join(format!(
        "codexinfinium_cpp_{}_{}",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0)
    ));
    std::fs::create_dir_all(&work_dir).map_err(|e| e.to_string())?;
    let src_path = work_dir.join("main.cpp");
    let exe_path = work_dir.join("main.exe");
    std::fs::write(&src_path, &source).map_err(|e| e.to_string())?;

    let compile_outcome = run_with_timeout(
        Command::new(&gpp)
            .arg(&src_path)
            .arg("-o")
            .arg(&exe_path)
            .arg("-std=c++17")
            .arg("-O0")
            .current_dir(&work_dir),
        COMPILE_TIMEOUT,
    );

    let result = match compile_outcome {
        Err(_timeout) => CompileResult {
            ok: false,
            stdout: String::new(),
            stderr: format!(
                "Compilation timed out after {}s.",
                COMPILE_TIMEOUT.as_secs()
            ),
            exit_code: None,
            timed_out: true,
            stage: "compile",
        },
        Ok(output) if !output.status.success() => CompileResult {
            ok: false,
            stdout: truncate(String::from_utf8_lossy(&output.stdout).to_string()),
            stderr: truncate(String::from_utf8_lossy(&output.stderr).to_string()),
            exit_code: output.status.code(),
            timed_out: false,
            stage: "compile",
        },
        Ok(_) => match run_with_timeout(Command::new(&exe_path).current_dir(&work_dir), RUN_TIMEOUT) {
            Err(_timeout) => CompileResult {
                ok: false,
                stdout: String::new(),
                stderr: format!(
                    "Program timed out after {}s (possible infinite loop).",
                    RUN_TIMEOUT.as_secs()
                ),
                exit_code: None,
                timed_out: true,
                stage: "run",
            },
            Ok(output) => CompileResult {
                ok: output.status.success(),
                stdout: truncate(String::from_utf8_lossy(&output.stdout).to_string()),
                stderr: truncate(String::from_utf8_lossy(&output.stderr).to_string()),
                exit_code: output.status.code(),
                timed_out: false,
                stage: "run",
            },
        },
    };

    let _ = std::fs::remove_dir_all(&work_dir);
    Ok(result)
}
