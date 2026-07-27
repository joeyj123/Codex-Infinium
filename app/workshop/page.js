"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { WORKSHOP_PILOT_TRACKS, WORKSHOP_PILOT_LANGS, getWorkshopTopic } from "@/lib/workshop";

// Mirrors Forge B's /forge/expert language-picker pattern exactly: no
// language chosen yet -> show language cards; a language chosen via
// ?lang= -> list that track's pilot topics. Java and C# are shown but
// greyed out ("not yet available") rather than hidden, same convention
// Forge uses for tiers/languages without content yet.
function WorkshopPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const expert = kb.tiers.find((t) => t.id === "expert");

  if (lang && WORKSHOP_PILOT_LANGS.includes(lang)) {
    const track = expert.language_tracks[lang];
    const topicIds = WORKSHOP_PILOT_TRACKS[lang];

    return (
      <div>
        <button className="btn" onClick={() => router.push("/workshop")}>
          ⬅️ Change Language
        </button>
        <h1 style={{ marginTop: 12 }}>🛠️ {track.name} — The Workshop</h1>
        <p style={{ color: "var(--muted)" }}>
          Reorder scrambled code, fix a broken one, predict the output, or build from a spec — graded by really
          running your code.
        </p>

        <div className="lang-grid" style={{ marginTop: 20 }}>
          {topicIds.map((topicId) => {
            const topic = getWorkshopTopic(kb, topicId, lang);
            if (!topic) return null;
            const count = topic.workshop_challenges?.length || 0;
            return (
              <div
                key={topicId}
                className="card"
                style={{ textAlign: "center", cursor: "pointer" }}
                onClick={() => router.push(`/workshop/topic/${topicId}?lang=${lang}`)}
              >
                <h4>{topic.title}</h4>
                <p className="stat-line">{count} challenges forged</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1>🛠️ The Workshop</h1>
      <p style={{ color: "var(--muted)" }}>Choose a language track.</p>

      <div className="lang-grid" style={{ marginTop: 20 }}>
        {Object.entries(kb.tiers.find((t) => t.id === "expert").language_tracks).map(([langId, track]) => {
          const ready = WORKSHOP_PILOT_LANGS.includes(langId);
          const count = ready
            ? WORKSHOP_PILOT_TRACKS[langId].reduce(
                (s, topicId) => s + (getWorkshopTopic(kb, topicId, langId)?.workshop_challenges?.length || 0),
                0
              )
            : 0;
          return (
            <div
              key={langId}
              className={`card ${ready ? "" : "card-xp-locked"}`}
              style={{ textAlign: "center", cursor: ready ? "pointer" : "not-allowed" }}
              onClick={() => ready && router.push(`/workshop?lang=${langId}`)}
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

export default function WorkshopPage() {
  return (
    <Suspense fallback={null}>
      <WorkshopPageInner />
    </Suspense>
  );
}
