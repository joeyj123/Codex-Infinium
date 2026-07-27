"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ForgeContext = createContext(null);

const STORAGE_KEY = "codex_infinium_forge_exposure";
const DEFAULT_EXPOSURE = "guided";

export const EXPOSURE_LEVELS = [
  {
    id: "guided",
    label: "Guided",
    icon: "🧭",
    description: "Worked solution and hints shown up front. The reference pane opens by default.",
  },
  {
    id: "challenge",
    label: "Challenge",
    icon: "⚔️",
    description: "Problem only. Hints are there if you click for them; the reference pane is available on request.",
  },
  {
    id: "gauntlet",
    label: "The Gauntlet",
    icon: "🔥",
    description: "Problem only. No hints, no reference pane. Reveal the solution only once you've actually attempted it.",
  },
];

// The chosen exposure level (Guided / Challenge / Gauntlet) applies across
// all of The Forge, not per-topic — it's a stance the user picks for a
// session and can change any time, not something locked per example. Kept
// in its own localStorage key, same pattern as reading-appearance settings,
// so it survives a refresh without being tangled up with progress data.
export function ForgeProvider({ children }) {
  const [exposure, setExposureState] = useState(DEFAULT_EXPOSURE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw && EXPOSURE_LEVELS.some((l) => l.id === raw)) setExposureState(raw);
    } catch (e) {
      console.error("Could not load Forge exposure setting", e);
    }
    setLoaded(true);
  }, []);

  function setExposure(id) {
    setExposureState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch (e) {
      console.error("Could not save Forge exposure setting", e);
    }
  }

  return (
    <ForgeContext.Provider value={{ exposure, setExposure, loaded }}>{children}</ForgeContext.Provider>
  );
}

export function useForge() {
  const ctx = useContext(ForgeContext);
  if (!ctx) throw new Error("useForge must be used within ForgeProvider");
  return ctx;
}
