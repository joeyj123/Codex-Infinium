// Thin wrapper around @tauri-apps/plugin-updater — only usable inside the
// Tauri desktop shell (a plain browser tab has no updater bridge, same
// restriction as the cpp/java/csharp compiler runners).

export function isTauriRuntime() {
  return typeof window !== "undefined" && "__TAURI_INTERNALS__" in window;
}

// Resolves to { available: false } if already up to date, or
// { available: true, version, body, update } where `update` is the raw
// plugin object install() needs. Throws on network/signature failure —
// callers should catch and treat as "couldn't check," not "no update."
export async function checkForUpdate() {
  if (!isTauriRuntime()) return { available: false };
  const { check } = await import("@tauri-apps/plugin-updater");
  const update = await check();
  if (!update) return { available: false };
  return { available: true, version: update.version, body: update.body, update };
}

// Downloads and installs the given update, then relaunches the app so the
// new version takes effect. `onProgress` is optional and receives
// { downloaded, contentLength } chunks if the caller wants a progress bar.
export async function installUpdate(update, onProgress) {
  await update.downloadAndInstall((event) => {
    if (event.event === "Progress" && onProgress) {
      onProgress({ downloaded: event.data.chunkLength, contentLength: event.data.contentLength });
    }
  });
  const { relaunch } = await import("@tauri-apps/plugin-process");
  await relaunch();
}
