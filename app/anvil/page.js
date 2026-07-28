"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import {
  ANVIL_LANGS,
  getAnvilTierTopics,
  getAnvilTrackTopics,
  tierHasAnvilContent,
} from "@/lib/anvil";

// Three levels, all content-driven (a card is "ready" purely because it has
// at least one topic with `anvil_challenges`, not a hardcoded allowlist):
//   1. No params        -> pick a difficulty (mirrors The Forge's tier grid).
//   2. ?tier=expert      -> pick a language track (existing Expert UI).
//   3. ?lang= or ?tier=  -> that track's or tier's topic list.
function AnvilPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const tierParam = searchParams.get("tier");
  const expert = kb.tiers.find((t) => t.id === "expert");

  if (lang && ANVIL_LANGS.includes(lang)) {
    const track = expert.language_tracks[lang];
    const topics = getAnvilTrackTopics(kb, lang);

    return (
      <div>
        <button className="btn" onClick={() => router.push("/anvil?tier=expert")}>
          ⬅️ Change Language
        </button>
        <h1 style={{ marginTop: 12 }}>🛠️ {track.name} — The Anvil</h1>
        <p style={{ color: "var(--muted)" }}>
          Reorder scrambled code, fix a broken one, predict the output, or build from a spec — graded by really
          running your code.
        </p>

        <div className="lang-grid" style={{ marginTop: 20 }}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="card"
              style={{ textAlign: "center", cursor: "pointer" }}
              onClick={() => router.push(`/anvil/topic/${topic.id}?lang=${lang}`)}
            >
              <h4>{topic.title}</h4>
              <p className="stat-line">{topic.anvil_challenges.length} challenges forged</p>
            </div>
          ))}
          {topics.length === 0 && (
            <div className="banner banner-dim">No challenges have been forged for {track.name} yet.</div>
          )}
        </div>
      </div>
    );
  }

  if (tierParam === "expert") {
    return (
      <div>
        <button className="btn" onClick={() => router.push("/anvil")}>
          ⬅️ Change Difficulty
        </button>
        <h1 style={{ marginTop: 12 }}>
          {expert.icon} {expert.name} — The Anvil
        </h1>
        <p style={{ color: "var(--muted)" }}>Choose a language track.</p>

        <div className="lang-grid" style={{ marginTop: 20 }}>
          {Object.entries(expert.language_tracks).map(([langId, track]) => {
            const topics = getAnvilTrackTopics(kb, langId);
            const ready = topics.length > 0;
            const count = topics.reduce((s, t) => s + t.anvil_challenges.length, 0);
            return (
              <div
                key={langId}
                className={`card ${ready ? "" : "card-xp-locked"}`}
                style={{ textAlign: "center", cursor: ready ? "pointer" : "not-allowed" }}
                onClick={() => ready && router.push(`/anvil?lang=${langId}`)}
              >
                <h4>{track.name}</h4>
                {ready ? (
                  <p className="stat-line">{count} challenges forged</p>
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

  if (tierParam) {
    const tier = kb.tiers.find((t) => t.id === tierParam);
    if (!tier) return <p>Unknown tier.</p>;
    const topics = getAnvilTierTopics(kb, tierParam);

    return (
      <div>
        <button className="btn" onClick={() => router.push("/anvil")}>
          ⬅️ Change Difficulty
        </button>
        <h1 style={{ marginTop: 12 }}>
          {tier.icon} {tier.name} — The Anvil
        </h1>
        <p style={{ color: "var(--muted)" }}>
          Reorder scrambled code, fix a broken one, predict the output, or build from a spec — graded by really
          running your code.
        </p>

        <div style={{ marginTop: 20 }}>
          {topics.map((topic) => (
            <div key={topic.id} className="card">
              <div className="card-row">
                <p className="card-title">{topic.title}</p>
                <button className="btn" onClick={() => router.push(`/anvil/topic/${topic.id}?tier=${tierParam}`)}>
                  Enter
                </button>
              </div>
              <p className="stat-line" style={{ marginTop: 6, marginBottom: 0 }}>
                {topic.anvil_challenges.length} challenge{topic.anvil_challenges.length === 1 ? "" : "s"}
              </p>
            </div>
          ))}
          {topics.length === 0 && (
            <div className="banner banner-dim">No challenges have been forged for {tier.name} yet.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>🛠️ The Anvil</h1>
      <p style={{ color: "var(--muted)" }}>Choose a difficulty.</p>

      <div className="lang-grid" style={{ marginTop: 20 }}>
        {kb.tiers.map((tier) => {
          const ready = tierHasAnvilContent(kb, tier.id);
          const count =
            tier.id === "expert"
              ? ANVIL_LANGS.reduce(
                  (s, l) => s + getAnvilTrackTopics(kb, l).reduce((s2, t) => s2 + t.anvil_challenges.length, 0),
                  0
                )
              : getAnvilTierTopics(kb, tier.id).reduce((s, t) => s + t.anvil_challenges.length, 0);
          return (
            <div
              key={tier.id}
              className={`card ${ready ? "" : "card-xp-locked"}`}
              style={{ textAlign: "center", cursor: ready ? "pointer" : "not-allowed" }}
              onClick={() => ready && router.push(`/anvil?tier=${tier.id}`)}
            >
              <h4>
                {tier.icon} {tier.name}
              </h4>
              {ready ? (
                <p className="stat-line">{count} challenges forged</p>
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

export default function AnvilPage() {
  return (
    <Suspense fallback={null}>
      <AnvilPageInner />
    </Suspense>
  );
}
