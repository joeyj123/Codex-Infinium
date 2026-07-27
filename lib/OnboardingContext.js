"use client";

import { createContext, useContext, useEffect, useState } from "react";

const OnboardingContext = createContext(null);

const STORAGE_KEY = "codex_infinium_onboarding";
const DEFAULT_STATE = {
  dashboardSeen: false,
  modesSeen: {},
};

// Tracks which one-time tours a user has already been shown, kept in its
// own localStorage key so it survives (or can be wiped) independently of
// progress and appearance settings. Reusable scaffolding: any future mode
// (The Forge, etc.) just calls hasSeenMode/markModeSeen with its own id
// instead of inventing its own onboarding flag.
export function OnboardingProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...DEFAULT_STATE, ...parsed, modesSeen: { ...parsed.modesSeen } });
      }
    } catch (e) {
      console.error("Could not load onboarding state", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Could not save onboarding state", e);
    }
  }, [state, loaded]);

  function markDashboardSeen() {
    setState((s) => ({ ...s, dashboardSeen: true }));
  }

  function hasSeenMode(modeId) {
    return !!state.modesSeen[modeId];
  }

  function markModeSeen(modeId) {
    setState((s) => ({ ...s, modesSeen: { ...s.modesSeen, [modeId]: true } }));
  }

  return (
    <OnboardingContext.Provider
      value={{
        loaded,
        dashboardSeen: state.dashboardSeen,
        markDashboardSeen,
        hasSeenMode,
        markModeSeen,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
