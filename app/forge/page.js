"use client";

import { useRouter } from "next/navigation";
import kb from "@/data/knowledge_base.json";

// The Forge's difficulty selector mirrors the tier list everywhere else in
// the app, but "available" here means "has authored examples content," not
// "unlocked for XP" — Novice (prose examples, Forge A) and Expert (code
// examples, Forge B) are the tiers with real content so far. Every other
// tier is shown, greyed out, rather than hidden, so the mode's eventual
// shape is visible even before it's filled in.
const FORGE_READY_TIERS = ["novice", "apprentice", "expert"];

export default function ForgePage() {
  const router = useRouter();

  function exampleCount(tier) {
    if (tier.id === "expert") {
      return Object.values(tier.language_tracks || {}).reduce(
        (sum, track) => sum + track.topics.reduce((s, t) => s + (t.examples?.length || 0), 0),
        0
      );
    }
    return (tier.topics || []).reduce((s, t) => s + (t.examples?.length || 0), 0);
  }

  return (
    <div>
      <h1>🔥 The Forge</h1>
      <p style={{ color: "var(--muted)" }}>
        Worked problems and challenges for every topic. Choose a difficulty to begin.
      </p>

      <div className="lang-grid" style={{ marginTop: 20 }}>
        {kb.tiers.map((tier) => {
          const ready = FORGE_READY_TIERS.includes(tier.id);
          const count = exampleCount(tier);
          return (
            <div
              key={tier.id}
              className={`card ${ready ? "" : "card-xp-locked"}`}
              style={{ textAlign: "center", cursor: ready ? "pointer" : "not-allowed" }}
              onClick={() => ready && router.push(`/forge/${tier.id}`)}
            >
              <h4>
                {tier.icon} {tier.name}
              </h4>
              {ready ? (
                <p className="stat-line">{count} examples forged</p>
              ) : (
                <p className="mode-card-badge" style={{ marginTop: 8 }}>
                  Not yet available
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
