"use client";

import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { buildAchievementDefs, getUnlockedAchievementIds } from "@/lib/achievements";

export default function AchievementsPanel({ kb, progress, rank, onClose }) {
  const defs = buildAchievementDefs(kb);
  const unlockedIds = getUnlockedAchievementIds(progress, rank, kb);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  // Rendered via portal so this overlay always covers the full viewport
  // the same way no matter which ancestor (sidebar, dashboard card, etc.)
  // triggered it — nesting it inside the sidebar's scrolling column was
  // what caused the misaligned overlay when opened from there.
  return createPortal(
    <div className="chapter-overlay" onClick={onClose}>
      <div className="chapter-panel achievements-panel" onClick={(e) => e.stopPropagation()}>
        <h4>Achievements</h4>
        <p className="stat-line" style={{ marginBottom: 14 }}>
          {unlockedIds.length}/{defs.length} unlocked
        </p>
        <div className="achievements-list">
          {defs.map((d) => {
            const unlocked = unlockedIds.includes(d.id);
            return (
              <div key={d.id} className={`achievement-row ${unlocked ? "" : "achievement-row-locked"}`}>
                <span className="achievement-row-icon">{unlocked ? d.icon : "◇"}</span>
                <div>
                  <div className="achievement-row-name">{d.name}</div>
                  <div className="achievement-row-desc">{d.description}</div>
                </div>
              </div>
            );
          })}
        </div>
        <button className="btn" style={{ marginTop: 14 }} onClick={onClose}>
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}
