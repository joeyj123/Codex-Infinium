// Sandboxed, in-browser Python execution for The Forge's Expert-tier Python
// examples, via Pyodide (a full CPython build compiled to WebAssembly).
// Pyodide is a multi-megabyte download, so it is never loaded until the
// first time a user actually runs a Python example — everywhere else in the
// app pays zero cost for this feature existing.
//
// Like lib/codeExec.js's JS sandbox, execution happens inside a Web Worker
// (no access to `window`/`document`/the real page) with a hard timeout
// enforced by terminating the worker, since a runaway `while True:` can't
// otherwise be interrupted from outside its own thread.

const EXEC_TIMEOUT_MS = 15000; // Python needs more headroom: first run also loads/initializes Pyodide itself.
const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";

const WORKER_SOURCE = `
self.pyodideReadyPromise = null;

self.onmessage = async function (e) {
  const code = e.data.code;
  try {
    if (!self.pyodideReadyPromise) {
      importScripts(${JSON.stringify(PYODIDE_CDN)});
      self.pyodideReadyPromise = loadPyodide();
    }
    const pyodide = await self.pyodideReadyPromise;
    pyodide.globals.set("__user_code__", code);
    const wrapper = [
      "import sys, io",
      "__buf = io.StringIO()",
      "__old_stdout = sys.stdout",
      "sys.stdout = __buf",
      "__error = None",
      "try:",
      "    exec(__user_code__, {})",
      "except Exception as __e:",
      "    __error = str(__e)",
      "finally:",
      "    sys.stdout = __old_stdout",
      "__buf.getvalue()",
    ].join("\\n");
    const output = await pyodide.runPythonAsync(wrapper);
    const error = pyodide.globals.get("__error");
    self.postMessage({ ok: !error, output: output || "", error: error || null });
  } catch (err) {
    self.postMessage({ ok: false, output: "", error: err && err.message ? err.message : String(err) });
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

// Kept alive across calls so Pyodide (once loaded inside it) doesn't have to
// be re-downloaded/re-initialized for every example run in the same session.
let sharedWorker = null;
function getSharedWorker() {
  if (!sharedWorker) {
    sharedWorker = new Worker(getWorkerBlobUrl());
  }
  return sharedWorker;
}

// Resolves to { ok, output, error, timedOut }, same shape as runJavaScript.
export function runPython(code) {
  return new Promise((resolve) => {
    let settled = false;
    let worker;
    try {
      worker = getSharedWorker();
    } catch (err) {
      resolve({ ok: false, output: "", error: "Could not start sandboxed Python worker.", timedOut: false });
      return;
    }

    const timer = setTimeout(() => {
      if (settled) return;
      settled = true;
      // A timeout forcibly kills the worker, which also discards the
      // in-progress Pyodide load — the next run pays the load cost again.
      // Acceptable tradeoff: it's rare, and correctness (no zombie runs)
      // matters more than saving a reload in that edge case.
      worker.terminate();
      sharedWorker = null;
      resolve({ ok: false, output: "", error: `Execution timed out after ${EXEC_TIMEOUT_MS / 1000}s (possible infinite loop, or slow first-time Python engine load).`, timedOut: true });
    }, EXEC_TIMEOUT_MS);

    worker.onmessage = (e) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ ok: e.data.ok, output: e.data.output || "", error: e.data.error || null, timedOut: false });
    };

    worker.onerror = (err) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      worker.terminate();
      sharedWorker = null;
      resolve({ ok: false, output: "", error: err.message || "Unknown Python worker error.", timedOut: false });
    };

    worker.postMessage({ code });
  });
}
