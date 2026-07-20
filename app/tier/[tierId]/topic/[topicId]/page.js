"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";

const MODES = [
  { key: "study", label: "Read", sub: "The Study", icon: "📖", active: true },
  { key: "examples", label: "Examples", sub: "The Forge — worked, guided, challenge", icon: "🔥", active: true },
  { key: "practice", label: "Practice", sub: "Low-stakes drills", icon: "🎮", active: false },
  { key: "exercise", label: "Exercise", sub: "Applied problems", icon: "✏️", active: false },
  { key: "quiz", label: "Quiz", sub: "Test yourself", icon: "❓", active: false },
];

export default function TopicHubPage() {
  const { tierId, topicId } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const { progress, loaded } = useProgress();

  const tier = kb.tiers.find((t) => t.id === tierId);
  const topic =
    tierId === "expert" && lang
      ? tier.language_tracks[lang].topics.find((t) => t.id === topicId)
      : tier.topics.find((t) => t.id === topicId);

  if (!loaded) return null;

  const done = progress.completedTopics.includes(topic.id);
  const xpLocked = !progress.unlockedTiers.includes(tierId);
  const backHref = tierId === "expert" && lang ? `/tier/expert?lang=${lang}` : `/tier/${tierId}`;
  const studyHref =
    tierId === "expert" && lang
      ? `/tier/${tierId}/study?lang=${lang}&topic=${topic.id}`
      : `/tier/${tierId}/study?topic=${topic.id}`;
  const forgeHref =
    tierId === "expert" && lang
      ? `/forge/${tierId}/topic/${topic.id}?lang=${lang}`
      : `/forge/${tierId}/topic/${topic.id}`;
  const modeHref = { study: studyHref, examples: forgeHref };

  return (
    <div>
      <h1>{topic.title}</h1>
      <p className="stat-line">
        {xpLocked && !done
          ? "Reading only — earn XP once prior tiers are complete"
          : `Worth ${topic.xp || 20} XP`}
        {done && " · ✅ Completed"}
      </p>
      {topic.page_intro && <p style={{ color: "var(--muted)", fontStyle: "italic" }}>{topic.page_intro}</p>}

      <p style={{ marginTop: 20, marginBottom: 8, color: "var(--muted)" }}>Choose how to engage with this topic:</p>

      <div className="mode-grid">
        {MODES.map((mode) => (
          <div
            key={mode.key}
            className={`mode-card ${mode.active ? "" : "mode-card-disabled"}`}
            onClick={() => mode.active && router.push(modeHref[mode.key] || studyHref)}
          >
            <div className="mode-card-icon">{mode.icon}</div>
            <div className="mode-card-label">{mode.label}</div>
            <div className="mode-card-sub">{mode.sub}</div>
            {!mode.active && <div className="mode-card-badge">Coming soon</div>}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 28 }}>
        <button className="btn" onClick={() => router.push(backHref)}>
          ⬅️ Back
        </button>
      </div>
    </div>
  );
}
