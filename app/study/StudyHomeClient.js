"use client";

import { useRouter } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";
import { tierTopicIds } from "@/lib/progressHelpers";

// Richer per-tier gradients — vivid when earned, naturally muted when locked
// via CSS opacity rather than a separate color set.
const SPINE_STYLES = [
  { bg: "linear-gradient(180deg, #6b3fa0 0%, #3d1f6e 100%)", edge: "#2a1250", ribbon: "#c9a0ff" }, // novice — violet
  { bg: "linear-gradient(180deg, #8b5a2b 0%, #4e2d0e 100%)", edge: "#301a06", ribbon: "#e8b870" }, // apprentice — burnished bronze
  { bg: "linear-gradient(180deg, #1e6e52 0%, #0d3d2c 100%)", edge: "#071f17", ribbon: "#5ddbb0" }, // journeyman — deep emerald
  { bg: "linear-gradient(180deg, #2a5298 0%, #112244 100%)", edge: "#090f22", ribbon: "#7ab0f0" }, // master — royal blue
  { bg: "linear-gradient(180deg, #8b1a1a 0%, #4a0a0a 100%)", edge: "#250404", ribbon: "#f08080" }, // expert — deep crimson
  { bg: "linear-gradient(180deg, #b8960c 0%, #6b520a 100%)", edge: "#3a2c04", ribbon: "#ffe066" }, // legend — aged gold
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
      <div className="shelf study-bookshelf">
        {kb.tiers.map((tier, i) => {
          const ids = tierTopicIds(tier);
          const done = ids.filter((id) => progress.completedTopics.includes(id)).length;
          const pct = ids.length > 0 ? Math.round((done / ids.length) * 100) : 0;
          const earned = progress.unlockedTiers.includes(tier.id);
          const s = SPINE_STYLES[i] || SPINE_STYLES[SPINE_STYLES.length - 1];
          return (
            <button
              key={tier.id}
              className={`book-spine ${earned ? "" : "book-spine-locked"}`}
              style={{ background: s.bg, "--spine-edge": s.edge, "--spine-ribbon": s.ribbon }}
              onClick={() => router.push(`/tier/${tier.id}`)}
              title={`${tier.name} — ${done}/${ids.length} read${earned ? "" : " (not yet earned)"}`}
            >
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
