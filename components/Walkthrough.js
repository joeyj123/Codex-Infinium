"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

// Generic click-through tour used by both the first-visit Dashboard
// walkthrough and every per-mode intro. Pass an array of { title, body }
// steps; Skip is always visible (not just on the last step) and never
// blocks the rest of the app once dismissed — onDone fires for both a
// completed run and a skip, so callers can just mark onboarding seen.
export default function Walkthrough({ steps, onDone }) {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => setMounted(true), []);
  if (!mounted || !steps || steps.length === 0) return null;

  const isLast = step === steps.length - 1;
  const current = steps[step];

  return createPortal(
    <div className="chapter-overlay walkthrough-overlay">
      <div className="chapter-panel walkthrough-panel">
        <button className="walkthrough-skip" onClick={onDone}>
          Skip
        </button>
        <p className="stat-line" style={{ marginBottom: 6 }}>
          Step {step + 1}/{steps.length}
        </p>
        <h4 style={{ marginBottom: 8 }}>{current.title}</h4>
        <p style={{ marginBottom: 20 }}>{current.body}</p>
        <div className="btn-row">
          <button className="btn" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))}>
            Back
          </button>
          {isLast ? (
            <button className="btn" style={{ borderColor: "var(--gold)", color: "var(--gold-bright)" }} onClick={onDone}>
              Done
            </button>
          ) : (
            <button className="btn" onClick={() => setStep((s) => s + 1)}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
