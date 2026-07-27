// Real C# compilation via a trimmed .NET 10 SDK (Roslyn's csc.exe plus the
// minimum reference assemblies and runtime needed to compile and run a
// console program), shipped as a Tauri resource under `dotnet/`. Mirrors
// cpp_runner.rs/java_runner.rs's structure and safety pattern.
//
// Unlike g++ (produces a native exe directly) or java (runs a class via a
// launcher), csc.exe only ever emits an IL assembly (a .dll in every .NET
// Core sense, regardless of -target:exe) — there is no such thing as csc
// producing a standalone native .exe on its own. To genuinely "run the
// resulting .exe directly" rather than shelling out through a `dotnet exec`
// wrapper, this reimplements the same apphost-generation step `dotnet
// build` does under the hood: copy the SDK's apphost.exe template (a tiny
// native launcher stub) and byte-patch a well-known placeholder inside it
// with the compiled assembly's filename. That's genuinely how every
// `dotnet build` output .exe is made, not a shortcut invented for this app.

use serde::Serialize;
use std::io::Read;
use std::path::{Path, PathBuf};
use std::process::{Command, Output, Stdio};
use std::time::{Duration, Instant};
use tauri::Manager;

const COMPILE_TIMEOUT: Duration = Duration::from_secs(15);
const RUN_TIMEOUT: Duration = Duration::from_secs(5);
const MAX_OUTPUT_CHARS: usize = 20_000;

// Baked in at bundle time — matches the exact SDK/runtime versions trimmed
// into src-tauri/dotnet/ (see CHRONICLE_OF_INFINIUM.md, step 5).
const SDK_VERSION: &str = "10.0.302";
const RUNTIME_VERSION: &str = "10.0.10";
const TARGET_FRAMEWORK: &str = "net10.0";

// The AppHostPatcher placeholder — a fixed 64-byte ASCII string that every
// unmodified `apphost.exe` template ships with, reserved so the real .NET
// SDK's own tooling can find-and-replace it with the app's relative
// assembly path. Confirmed present in this project's bundled
// AppHostTemplate/apphost.exe by direct byte search before relying on it.
const APPHOST_PLACEHOLDER: &[u8] =
    b"c3ab8ff13720e8ad9047dd39466b3c8974e592c2fa383d4a3960714caef0c4f";
const APPHOST_PLACEHOLDER_REGION: usize = 1024;

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

// Same app-local-data staging as cpp_runner.rs/java_runner.rs, applied
// proactively from the start this time (step 4's lesson: cheap insurance
// against a bundled-toolchain-plus-space-in-path bug, whether or not this
// specific toolchain turns out to need it — untested for .NET specifically,
// not worth re-litigating per toolchain).
fn resolve_dotnet_dir(app: &tauri::AppHandle) -> Result<PathBuf, String> {
    let resource_dir = app
        .path()
        .resource_dir()
        .map_err(|e| format!("could not resolve bundled resource dir: {e}"))?;
    let bundled = resource_dir.join("dotnet");

    let cache_root = app
        .path()
        .app_local_data_dir()
        .map_err(|e| format!("could not resolve app local data dir: {e}"))?;
    let staged = cache_root.join("dotnet");

    let csc = staged
        .join("sdk")
        .join(SDK_VERSION)
        .join("Roslyn")
        .join("bincore")
        .join("csc.exe");
    if !csc.exists() {
        std::fs::create_dir_all(&cache_root).map_err(|e| e.to_string())?;
        copy_dir_all(&bundled, &staged).map_err(|e| format!("failed to stage bundled .NET SDK: {e}"))?;
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

// Copies the apphost template and patches in the compiled assembly's
// filename, exactly like the real `dotnet build`'s AppHostPatcher step.
fn write_apphost(apphost_template: &Path, dest_exe: &Path, app_dll_name: &str) -> Result<(), String> {
    let mut data = std::fs::read(apphost_template).map_err(|e| e.to_string())?;
    let idx = find_bytes(&data, APPHOST_PLACEHOLDER)
        .ok_or_else(|| "apphost template is missing its expected placeholder".to_string())?;

    let name_bytes = app_dll_name.as_bytes();
    if name_bytes.len() >= APPHOST_PLACEHOLDER_REGION {
        return Err("compiled assembly name is too long to embed in apphost".to_string());
    }

    for b in data[idx..idx + APPHOST_PLACEHOLDER_REGION].iter_mut() {
        *b = 0;
    }
    data[idx..idx + name_bytes.len()].copy_from_slice(name_bytes);

    std::fs::write(dest_exe, &data).map_err(|e| e.to_string())
}

fn find_bytes(haystack: &[u8], needle: &[u8]) -> Option<usize> {
    haystack.windows(needle.len()).position(|w| w == needle)
}

#[tauri::command]
pub fn run_csharp(app: tauri::AppHandle, source: String) -> Result<CompileResult, String> {
    let dotnet_dir = resolve_dotnet_dir(&app)?;
    let csc = dotnet_dir
        .join("sdk")
        .join(SDK_VERSION)
        .join("Roslyn")
        .join("bincore")
        .join("csc.exe");
    let apphost_template = dotnet_dir
        .join("sdk")
        .join(SDK_VERSION)
        .join("AppHostTemplate")
        .join("apphost.exe");
    let ref_dir = dotnet_dir
        .join("packs")
        .join("Microsoft.NETCore.App.Ref")
        .join(RUNTIME_VERSION)
        .join("ref")
        .join(TARGET_FRAMEWORK);

    let work_dir = std::env::temp_dir().join(format!(
        "codexinfinium_csharp_{}_{}",
        std::process::id(),
        std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .map(|d| d.as_nanos())
            .unwrap_or(0)
    ));
    std::fs::create_dir_all(&work_dir).map_err(|e| e.to_string())?;
    let src_path = work_dir.join("Program.cs");
    let dll_path = work_dir.join("Program.dll");
    let exe_path = work_dir.join("Program.exe");
    std::fs::write(&src_path, &source).map_err(|e| e.to_string())?;

    let ref_args: Vec<String> = std::fs::read_dir(&ref_dir)
        .map_err(|e| format!("could not read reference assembly dir: {e}"))?
        .filter_map(|entry| entry.ok())
        .filter(|entry| entry.path().extension().map(|ext| ext == "dll").unwrap_or(false))
        .map(|entry| format!("-reference:{}", entry.path().display()))
        .collect();

    let compile_outcome = run_with_timeout(
        Command::new(&csc)
            .arg("-nologo")
            .arg("-target:exe")
            .arg(format!("-out:{}", dll_path.display()))
            .args(&ref_args)
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
        Ok(output) if !output.status.success() || !dll_path.exists() => CompileResult {
            ok: false,
            stdout: truncate(String::from_utf8_lossy(&output.stdout).to_string()),
            stderr: truncate(String::from_utf8_lossy(&output.stderr).to_string()),
            exit_code: output.status.code(),
            timed_out: false,
            stage: "compile",
        },
        Ok(_) => {
            let runtimeconfig = format!(
                r#"{{
  "runtimeOptions": {{
    "tfm": "{TARGET_FRAMEWORK}",
    "framework": {{
      "name": "Microsoft.NETCore.App",
      "version": "{RUNTIME_VERSION}"
    }}
  }}
}}"#
            );
            let runtimeconfig_path = work_dir.join("Program.runtimeconfig.json");

            match std::fs::write(&runtimeconfig_path, runtimeconfig)
                .map_err(|e| e.to_string())
                .and_then(|_| write_apphost(&apphost_template, &exe_path, "Program.dll"))
            {
                Err(e) => CompileResult {
                    ok: false,
                    stdout: String::new(),
                    stderr: format!("Failed to prepare runnable executable: {e}"),
                    exit_code: None,
                    timed_out: false,
                    stage: "run",
                },
                Ok(()) => match run_with_timeout(
                    Command::new(&exe_path)
                        .current_dir(&work_dir)
                        .env("DOTNET_ROOT", &dotnet_dir),
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
            }
        }
    };

    let _ = std::fs::remove_dir_all(&work_dir);
    Ok(result)
}
