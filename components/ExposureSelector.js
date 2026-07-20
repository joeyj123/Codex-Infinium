"use client";

import { useForge, EXPOSURE_LEVELS } from "@/lib/ForgeContext";

export default function ExposureSelector() {
  const { exposure, setExposure } = useForge();
  const current = EXPOSURE_LEVELS.find((l) => l.id === exposure);

  return (
    <div className="forge-exposure-row">
      <div className="btn-row">
        {EXPOSURE_LEVELS.map((level) => (
          <button
            key={level.id}
            className={`btn ${exposure === level.id ? "active" : ""}`}
            style={exposure === level.id ? { borderColor: "var(--gold)", color: "var(--gold-bright)" } : undefined}
            onClick={() => setExposure(level.id)}
          >
            {level.icon} {level.label}
          </button>
        ))}
      </div>
      {current && (
        <p className="stat-line" style={{ marginTop: 8, color: "var(--muted)" }}>
          {current.description}
        </p>
      )}
    </div>
  );
}
