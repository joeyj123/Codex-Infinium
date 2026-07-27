// Real C# compilation/execution — mirrors lib/cppRunner.js and
// lib/javaRunner.js, calling the Rust-side `run_csharp` command. Only
// available inside the Tauri desktop shell (bundled trimmed .NET SDK),
// never a plain browser tab.

export { isTauriRuntime } from "./cppRunner";

export async function runCsharp(source) {
  const { isTauriRuntime } = await import("./cppRunner");
  if (!isTauriRuntime()) {
    return {
      ok: false,
      output: "",
      error: "C# execution requires the Codex Infinium desktop app.",
      timedOut: false,
    };
  }
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const result = await invoke("run_csharp", { source });
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
