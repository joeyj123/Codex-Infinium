// Real Java compilation/execution — mirrors lib/cppRunner.js exactly, just
// calling the Rust-side `run_java` command instead of `run_cpp`. Only
// available inside the Tauri desktop shell (bundled Temurin JDK), never a
// plain browser tab.

export { isTauriRuntime } from "./cppRunner";

export async function runJava(source) {
  const { isTauriRuntime } = await import("./cppRunner");
  if (!isTauriRuntime()) {
    return {
      ok: false,
      output: "",
      error: "Java execution requires the Codex Infinium desktop app.",
      timedOut: false,
    };
  }
  try {
    const { invoke } = await import("@tauri-apps/api/core");
    const result = await invoke("run_java", { source });
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
