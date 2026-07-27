"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProgress } from "@/lib/ProgressContext";
import { useAppearance } from "@/lib/AppearanceContext";
import { isTauriRuntime, checkForUpdate, installUpdate } from "@/lib/updater";

const FONT_OPTIONS = [
  { id: "serif", label: "Serif (Garamond)", sample: "The quick brown fox jumps over the lazy dog." },
  { id: "sans", label: "Legible Sans (Atkinson)", sample: "The quick brown fox jumps over the lazy dog." },
];

const SIZE_OPTIONS = [
  { id: "small", label: "Small" },
  { id: "medium", label: "Medium" },
  { id: "large", label: "Large" },
];

export default function SettingsPage() {
  const router = useRouter();
  const { resetProgress, loaded: progressLoaded } = useProgress();
  const { settings, updateSettings, loaded: settingsLoaded } = useAppearance();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");
  const [justReset, setJustReset] = useState(false);
  const [appVersion, setAppVersion] = useState(null);
  const [updateStatus, setUpdateStatus] = useState("idle"); // idle | checking | none | available | installing | error
  const [foundUpdate, setFoundUpdate] = useState(null);
  const inTauri = isTauriRuntime();

  useEffect(() => {
    if (!inTauri) return;
    import("@tauri-apps/api/app").then(({ getVersion }) => getVersion().then(setAppVersion));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!progressLoaded || !settingsLoaded) return null;

  async function handleCheckForUpdates() {
    setUpdateStatus("checking");
    try {
      const result = await checkForUpdate();
      if (result.available) {
        setFoundUpdate(result);
        setUpdateStatus("available");
      } else {
        setUpdateStatus("none");
      }
    } catch (err) {
      setUpdateStatus("error");
    }
  }

  async function handleInstallUpdate() {
    setUpdateStatus("installing");
    try {
      await installUpdate(foundUpdate.update);
    } catch (err) {
      setUpdateStatus("error");
    }
  }

  function handleResetConfirmed() {
    resetProgress();
    setConfirmOpen(false);
    setConfirmText("");
    setJustReset(true);
    setTimeout(() => router.push("/"), 900);
  }

  return (
    <div>
      <h1>⚙️ Settings</h1>
      <p style={{ color: "var(--muted)" }}>Reading appearance and progress management.</p>

      <div className="stat-panel" style={{ marginTop: 28, padding: "18px 16px" }}>
        <span className="stat-panel-label">Reading Appearance</span>

        <p className="stat-line" style={{ marginTop: 4, marginBottom: 8 }}>Font</p>
        <div className="btn-row">
          {FONT_OPTIONS.map((f) => (
            <button
              key={f.id}
              className={`btn ${settings.font === f.id ? "active" : ""}`}
              style={settings.font === f.id ? { borderColor: "var(--gold)", color: "var(--gold-bright)" } : undefined}
              onClick={() => updateSettings({ font: f.id })}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="stat-line" style={{ marginTop: 18, marginBottom: 8 }}>Text size</p>
        <div className="btn-row">
          {SIZE_OPTIONS.map((s) => (
            <button
              key={s.id}
              className="btn"
              style={settings.textSize === s.id ? { borderColor: "var(--gold)", color: "var(--gold-bright)" } : undefined}
              onClick={() => updateSettings({ textSize: s.id })}
            >
              {s.label}
            </button>
          ))}
        </div>

        <div
          className={`book-page-text ${settings.font === "sans" ? "book-page-text-sans" : ""} book-text-${settings.textSize}`}
          style={{ marginTop: 18, padding: 16, background: "var(--parchment)", borderRadius: 6, color: "#2a2115" }}
        >
          <p style={{ margin: 0 }}>{FONT_OPTIONS.find((f) => f.id === settings.font).sample}</p>
        </div>
      </div>

      {inTauri && (
        <div className="stat-panel" style={{ marginTop: 20, padding: "18px 16px" }}>
          <span className="stat-panel-label">Updates</span>
          <p style={{ margin: "4px 0 12px" }}>
            {appVersion ? `You're running version ${appVersion}.` : "Checking installed version…"}
          </p>
          <div className="btn-row">
            <button className="btn" disabled={updateStatus === "checking" || updateStatus === "installing"} onClick={handleCheckForUpdates}>
              {updateStatus === "checking" ? "Checking…" : "Check for Updates"}
            </button>
            {updateStatus === "available" && (
              <button className="btn" disabled={updateStatus === "installing"} onClick={handleInstallUpdate}>
                Install {foundUpdate?.version} & Restart
              </button>
            )}
          </div>
          {updateStatus === "none" && (
            <p className="stat-line" style={{ marginTop: 8, color: "var(--muted)" }}>You're already on the latest version.</p>
          )}
          {updateStatus === "installing" && (
            <p className="stat-line" style={{ marginTop: 8, color: "var(--muted)" }}>Downloading and installing — the app will restart automatically.</p>
          )}
          {updateStatus === "error" && (
            <p className="stat-line" style={{ marginTop: 8, color: "var(--seal-red)" }}>Couldn't check for updates — check your connection and try again.</p>
          )}
        </div>
      )}

      <div className="stat-panel" style={{ marginTop: 20, padding: "18px 16px", borderColor: "var(--seal-red)" }}>
        <span className="stat-panel-label" style={{ color: "var(--seal-red)" }}>Danger Zone</span>
        <p style={{ margin: "4px 0 12px" }}>
          Reset progress wipes every completed topic, all XP, your rank, and unlocked tiers — back to a
          fresh start. This cannot be undone.
        </p>

        {!confirmOpen && !justReset && (
          <button className="btn" style={{ borderColor: "var(--seal-red)", color: "var(--seal-red)" }} onClick={() => setConfirmOpen(true)}>
            Reset Progress
          </button>
        )}

        {confirmOpen && (
          <div>
            <p className="stat-line" style={{ color: "var(--seal-red)", marginBottom: 8 }}>
              Type RESET below to confirm. This is permanent.
            </p>
            <div className="btn-row">
              <input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="RESET"
                style={{
                  background: "#1a140d",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  color: "var(--parchment)",
                  padding: "8px 12px",
                  fontFamily: "'Spectral Mono', monospace",
                }}
              />
              <button
                className="btn"
                disabled={confirmText !== "RESET"}
                style={{ borderColor: "var(--seal-red)", color: "var(--seal-red)" }}
                onClick={handleResetConfirmed}
              >
                Confirm Reset
              </button>
              <button
                className="btn"
                onClick={() => {
                  setConfirmOpen(false);
                  setConfirmText("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {justReset && <p className="stat-line" style={{ color: "var(--success)" }}>Progress reset. Returning to Dashboard…</p>}
      </div>
    </div>
  );
}
