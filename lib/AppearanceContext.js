"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AppearanceContext = createContext(null);

const STORAGE_KEY = "codex_infinium_settings";
const DEFAULT_SETTINGS = { font: "serif", textSize: "medium" };

// Reading-appearance preferences (font + text size for The Study). Kept in
// its own localStorage key, separate from progress data, so resetting
// progress never touches a user's display preferences.
export function AppearanceProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(raw) });
    } catch (e) {
      console.error("Could not load settings", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error("Could not save settings", e);
    }
  }, [settings, loaded]);

  function updateSettings(patch) {
    setSettings((s) => ({ ...s, ...patch }));
  }

  return (
    <AppearanceContext.Provider value={{ settings, updateSettings, loaded }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export function useAppearance() {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used within AppearanceProvider");
  return ctx;
}
