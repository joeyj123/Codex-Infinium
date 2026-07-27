// Real Java compilation via the bundled Eclipse Temurin JDK, shipped as a
// Tauri resource under `jdk/`. No system PATH is used — javac/java are
// invoked at their app-relative bundled path only. Mirrors cpp_runner.rs's
// structure and safety pattern (timeout, output caps, app-local-data
// staging) so the two commands stay easy to compare.

use serde::Serialize;
use std::io::Read;
use std::path::{Path, PathBuf};
use std::process::{Command, Output, Stdio};
use std::time::{Duration, Instant};
use tauri::Manager;

const COMPILE_TIMEOUT: Duration = Duration::from_secs(15); // javac's JVM startup needs more headroom than g++.
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

// Same space-in-install-path precaution as cpp_runner.rs's
// resolve_toolchain_dir(): staged proactively this time rather than
// discovered by a failure, since GCC's collect2 already proved a bundled
// Windows toolchain can silently break on a path like this project's own
// "Codex Infinium" folder. The JDK launcher was tested directly from the
// space-containing bundled path and did NOT reproduce that bug (its own
// argv/path handling doesn't do GCC's spec-relative string concatenation),
// but staging into the space-free, identifier-keyed app-local-data dir
// costs nothing and removes the risk category entirely rather than relying
// on that being true for every future JDK/OS update.
fn resolve_jdk_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let resource_dir = app
        .path()
        .resource_dir()
        .map_err(|e| format!("could not resolve bundled resource dir: {e}"))?;
    let bundled = resource_dir.join("jdk");

    let cache_root = app
        .path()
        .app_local_data_dir()
        .map_err(|e| format!("could not resolve app local data dir: {e}"))?;
    let staged = cache_root.join("jdk");

    if !staged.join("bin").join("javac.exe").exists() {
        std::fs::create_dir_all(&cache_root).map_err(|e| e.to_string())?;
        copy_dir_all(&bundled, &staged).map_err(|e| format!("failed to stage bundled JDK: {e}"))?;
    }
    Ok(staged)
}

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

// javac requires the source file's name to match its public class exactly.
// Forge's Java examples always name their top-level class after the topic
// (e.g. `public class OverflowDemo`), never a fixed "Main", so the class
// name has to be read out of the submitted source rather than assumed.
// Falls back to the first (non-public) top-level class if there's no
// `public class`, and finally to "Main" so a genuinely malformed submission
// still reaches javac and gets a real compiler error instead of failing
// silently here.
fn extract_class_name(source: &str) -> String {
    if let Some(name) = find_after(source, "public class ") {
        return name;
    }
    if let Some(name) = find_after(source, "class ") {
        return name;
    }
    "Main".to_string()
}

fn find_after(source: &str, needle: &str) -> Option<String> {
    let idx = source.find(needle)?;
    let rest = &source[idx + needle.len()..];
    let name: String = rest
        .chars()
        .take_while(|c| c.is_alphanumeric() || *c == '_' || *c == '$')
        .collect();
    if name.is_empty() {
        None
    } else {
        Some(name)
    }
}

#[tauri::command]
pub fn run_java(app: tauri::AppHandle, source: String) -> Result<CompileResult, String> {
    let jdk_dir = resolve_jdk_dir(&app)?;
    let javac = jdk_dir.join("bin").join("javac.exe");
    let java = jdk_dir.join("bin").join("java.exe");

    let class_name = extract_class_name(&source);

    let work_dir = std::env::temp_dir().join(format!(
        "codexinfinium_java_{}_{}",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0)
    ));
    std::fs::create_dir_all(&work_dir).map_err(|e| e.to_string())?;
    let src_path = work_dir.join(format!("{class_name}.java"));
    std::fs::write(&src_path, &source).map_err(|e| e.to_string())?;

    let compile_outcome = run_with_timeout(
        Command::new(&javac)
            .arg("-d")
            .arg(&work_dir)
            .arg(&src_path)
            .current_dir(&work_dir),
        COMPILE_TIMEOUT,
    );

    let result = match compile_outcome {
        Err(_timeout) => CompileResult {
            ok: false,
            stdout: String::new(),
            stderr: format!("Compilation timed out after {}s.", COMPILE_TIMEOUT.as_secs()),
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
        Ok(_) => match run_with_timeout(
            Command::new(&java)
                .arg("-cp")
                .arg(&work_dir)
                .arg(&class_name)
                .current_dir(&work_dir),
            RUN_TIMEOUT,
        ) {
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
