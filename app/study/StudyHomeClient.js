"use client";

import { useRouter } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";
import { tierTopicIds } from "@/lib/progressHelpers";

// Book spine colors per tier (index-matched to kb.tiers order)
const SPINE_COLORS = [
  "#5b3a8a", // novice — deep purple
  "#7a4e2d", // apprentice — warm brown
  "#1a5c4a", // journeyman — forest green
  "#2c4a7a", // journeyman+ — navy
  "#7a3a2a", // expert — deep red
  "#3a3a5a", // master — dark slate
];

export default function StudyHomeClient() {
  const router = useRouter();
  const { progress, loaded } = useProgress();

  if (!loaded) return null;

  return (
    <div>
      <h2 style={{ marginBottom: 4 }}>📖 The Study</h2>
      <p className="stat-line" style={{ marginBottom: 8 }}>
        Choose a tier to open its book.
      </p>
      <div className="shelf">
        {kb.tiers.map((tier, i) => {
          const ids = tierTopicIds(tier);
          const done = ids.filter((id) => progress.completedTopics.includes(id)).length;
          const pct = ids.length > 0 ? Math.round((done / ids.length) * 100) : 0;
          const earned = progress.unlockedTiers.includes(tier.id);
          const color = SPINE_COLORS[i] || "#3a3a3a";
          return (
            <button
              key={tier.id}
              className={`book-spine ${earned ? "" : "book-spine-locked"}`}
              style={{ background: color }}
              onClick={() => earned || !progress.unlockedTiers.length ? router.push(`/tier/${tier.id}`) : null}
              title={`${tier.name} — ${done}/${ids.length} read${earned ? "" : " (not yet earned)"}`}
            >
              {!earned && <span className="book-spine-chain">🔒</span>}
              <span className="book-spine-icon">{tier.icon}</span>
              <span className="book-spine-label">{tier.name}</span>
              <div className="book-spine-fill" style={{ height: `${pct}%` }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
