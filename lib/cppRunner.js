// Real C++ compilation/execution — unlike Python (Pyodide) and JS (Web
// Worker), this has no in-browser sandbox: it calls the Rust-side `run_cpp`
// Tauri command, which shells out to the bundled MinGW-w64/g++ toolchain.
// Only available when running inside the Tauri desktop shell — a plain
// browser tab (e.g. `npx serve out` during static-export testing) has no
// `__TAURI_INTERNALS__` bridge, so this is unavailable there.

export function isTauriRuntime() {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

// Resolves to the same { ok, output, error, timedOut } shape as
// runJavaScript/runPython so callers (gradeCodeOutput, the Forge UI) don't
// need to branch on shape between execution paths.
export async function runCpp(source) {
  if (!isTauriRuntime()) {
    return {
      ok: false,
      output: "",
      error: "C++ execution requires the Codex Infinium desktop app.",
      timedOut: false,
    };
  }
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const result = await invoke("run_cpp", { source });
    const combined = [result.stdout, result.stderr].filter(Boolean).join("\n");
    return {
      ok: result.ok,
      output: result.stdout || "",
      error: result.ok ? null : result.stderr || combined || `Exited with code ${result.exitCode}`,
      timedOut: result.timedOut,
    };
  } catch (err) {
    return { ok: false, output: "", error: err && err.message ? err.message : String(err), timedOut: false };
  }
}
