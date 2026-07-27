// Sandboxed, in-browser JavaScript execution for The Forge's Expert-tier
// Python/JS code examples. Runs user-submitted code inside a Web Worker
// (a background JS thread with no access to `window`/`document`/the real
// page) so it can never touch the live app, and enforces a hard timeout by
// terminating the worker outright if it runs too long — the only reliable
// way to stop a synchronous infinite loop in JS.

const EXEC_TIMEOUT_MS = 4000;

// The worker body is built as a string and loaded via a Blob URL, which is
// how you spin up a Web Worker without shipping a separate static file.
// Inside the worker, console.log/warn/error are overridden to push their
// stringified arguments into an output buffer instead of the real devtools
// console, then posted back to the main thread once the user's code finishes.
const WORKER_SOURCE = `
self.onmessage = function (e) {
  const code = e.data.code;
  const lines = [];
  function stringify(arg) {
    if (typeof arg === "string") return arg;
    try { return JSON.stringify(arg); } catch (err) { return String(arg); }
  }
  const fakeConsole = {
    log: (...args) => lines.push(args.map(stringify).join(" ")),
    info: (...args) => lines.push(args.map(stringify).join(" ")),
    warn: (...args) => lines.push(args.map(stringify).join(" ")),
    error: (...args) => lines.push(args.map(stringify).join(" ")),
  };
  try {
    const fn = new Function("console", code);
    fn(fakeConsole);
    self.postMessage({ ok: true, output: lines.join("\\n") });
  } catch (err) {
    self.postMessage({ ok: false, output: lines.join("\\n"), error: err.message });
  }
};
`;

let workerBlobUrl = null;
function getWorkerBlobUrl() {
  if (!workerBlobUrl) {
    const blob = new Blob([WORKER_SOURCE], { type: "application/javascript" });
    workerBlobUrl = URL.createObjectURL(blob);
  }
  return workerBlobUrl;
}

// Resolves to { ok, output, error, timedOut }. `output` is whatever the
// submitted code printed via console.log, joined with newlines — never
// empty/undefined, even on error, so partial output before a crash still
// shows up in the terminal panel.
export function runJavaScript(code) {
  return new Promise((resolve) => {
    let settled = false;
    let worker;
    try {
      worker = new Worker(getWorkerBlobUrl());
    } catch (err) {
      resolve({ ok: false, output: "", error: "Could not start sandboxed worker.", timedOut: false });
      return;
    }

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      worker.terminate();
      resolve({ ok: false, output: "", error: `Execution timed out after ${EXEC_TIMEOUT_MS / 1000}s (possible infinite loop).`, timedOut: true });
    }, EXEC_TIMEOUT_MS);

    worker.onmessage = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve({ ok: e.data.ok, output: e.data.output || "", error: e.data.error || null, timedOut: false });
    };

    worker.onerror = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      resolve({ ok: false, output: "", error: err.message || "Unknown worker error.", timedOut: false });
    };

    worker.postMessage({ code });
  });
}
