"use client";

// Silent on launch unless an update is actually found — checks once,
// shows nothing if up to date or not running inside Tauri, and never
// blocks the UI. Manual re-checks (Settings page) reuse the same
// lib/updater.js functions directly rather than this component.

import { useEffect, useState } from "react";
import { isTauriRuntime, checkForUpdate, installUpdate } from "@/lib/updater";

export default function UpdateBanner() {
  const [update, setUpdate] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | installing | error
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isTauriRuntime()) return;
    checkForUpdate()
      .then((result) => {
        if (result.available) setUpdate(result);
      })
      .catch(() => {
        // Silent on launch — a failed background check (offline, GitHub
        // unreachable) shouldn't interrupt anyone opening the app.
      });
  }, []);

  if (!update || dismissed) return null;

  async function handleInstall() {
    setStatus("installing");
    try {
      await installUpdate(update.update);
      // installUpdate() relaunches the app on success — nothing left to do.
    } catch (err) {
      setStatus("error");
    }
  }

  return (
    <div
      className="banner"
      style={{
        margin: "0 0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <span>
        ✨ A new version ({update.version}) is available.
        {status === "error" && " Install failed — check your connection and try again."}
      </span>
      <div className="btn-row" style={{ margin: 0 }}>
        <button className="btn" disabled={status === "installing"} onClick={handleInstall}>
          {status === "installing" ? "Installing…" : "Install & Restart"}
        </button>
        <button className="btn" disabled={status === "installing"} onClick={() => setDismissed(true)}>
          Later
        </button>
      </div>
    </div>
  );
}
