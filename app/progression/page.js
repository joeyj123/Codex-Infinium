"use client";

import Link from "next/link";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";

export default function ProgressionPage() {
  const { progress, loaded } = useProgress();
  if (!loaded) return null;

  return (
    <div>
      <h1>🗺️ Progression Map</h1>
      <p style={{ color: "var(--muted)" }}>
        Every tier is open to read. Complete every topic in a tier to earn XP in the next one.
      </p>

      <div style={{ marginTop: 24 }}>
        {kb.tiers.map((tier, i) => {
          const unlocked = progress.unlockedTiers.includes(tier.id);
          const topicCount =
            tier.id === "expert"
              ? Object.values(tier.language_tracks).reduce((sum, t) => sum + t.topics.length, 0)
              : (tier.topics || []).length;
          const doneCount =
            tier.id === "expert"
              ? Object.values(tier.language_tracks).reduce(
                  (sum, t) => sum + t.topics.filter((x) => progress.completedTopics.includes(x.id)).length,
                  0
                )
              : (tier.topics || []).filter((t) => progress.completedTopics.includes(t.id)).length;

          return (
            <div key={tier.id} style={{ display: "flex", alignItems: "stretch", marginBottom: 4 }}>
              <div
                style={{
                  width: 2,
                  background: unlocked ? "var(--gold)" : "var(--border)",
                  marginRight: 20,
                  marginLeft: 20,
                }}
              />
              <div style={{ flex: 1, paddingBottom: 20 }}>
                <div className={`card ${unlocked ? "" : "card-xp-locked"}`}>
                  <div className="card-row">
                    <div>
                      <h4 style={{ margin: 0 }}>
                        {tier.icon} {tier.name} {!unlocked && <span className="stat-line">(not yet earned)</span>}
                      </h4>
                      <p className="stat-line" style={{ marginTop: 4 }}>
                        {doneCount}/{topicCount} topics
                      </p>
                    </div>
                    <Link href={`/tier/${tier.id}`}>
                      <button className="btn">{unlocked ? "Go" : "Read"}</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
