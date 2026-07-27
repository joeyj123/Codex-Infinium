"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import { SECTION_NAMES } from "@/lib/sectionNames";
import ExposureSelector from "@/components/ExposureSelector";

const FORGE_READY_TIERS = ["novice", "apprentice", "expert"];

export default function ForgeTierClient() {
  const { tierId } = useParams();
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang");
  const router = useRouter();
  const tier = kb.tiers.find((t) => t.id === tierId);

  if (!tier) return <p>Unknown tier.</p>;

  if (!FORGE_READY_TIERS.includes(tierId)) {
    return (
      <div>
        <h1>
          {tier.icon} {tier.name}
        </h1>
        <div className="banner banner-dim">
          The Forge doesn't have examples for {tier.name} yet — Novice and Expert are the only tiers built out so far.
        </div>
        <button className="btn" style={{ marginTop: 16 }} onClick={() => router.push("/forge")}>
          ⬅️ Back to The Forge
        </button>
      </div>
    );
  }

  // Expert has no top-level topics/sections — its content lives under
  // language_tracks, same shape as The Study's tier page. No language chosen
  // yet: show the language picker. Language chosen: list that track's topics.
  if (tierId === "expert") {
    if (lang && tier.language_tracks[lang]) {
      const track = tier.language_tracks[lang];
      const topics = track.topics.filter((t) => (t.examples?.length || 0) > 0);
      return (
        <div>
          <button className="btn" onClick={() => router.push("/forge/expert")}>
            ⬅️ Change Language
          </button>
          <h1 style={{ marginTop: 12 }}>
            {tier.icon} {track.name} — The Forge
          </h1>
          <p style={{ color: "var(--muted)" }}>Pick how much help you want, then choose a topic to work through.</p>

          <ExposureSelector />

          <div style={{ marginTop: 20 }}>
            {topics.map((topic) => (
              <div key={topic.id} className="card">
                <div className="card-row">
                  <p className="card-title">{topic.title}</p>
                  <button
                    className="btn"
                    onClick={() => router.push(`/forge/expert/topic/${topic.id}?lang=${lang}`)}
                  >
                    Enter
                  </button>
                </div>
                <p className="stat-line" style={{ marginTop: 6, marginBottom: 0 }}>
                  {topic.examples.length} example{topic.examples.length === 1 ? "" : "s"}
                </p>
              </div>
            ))}
            {topics.length === 0 && (
              <div className="banner banner-dim">No examples have been forged for {track.name} yet.</div>
            )}
          </div>
        </div>
      );
    }
    return (
      <div>
        <button className="btn" onClick={() => router.push("/forge")}>
          ⬅️ Change Difficulty
        </button>
        <h1 style={{ marginTop: 12 }}>
          {tier.icon} {tier.name} — The Forge
        </h1>
        <p style={{ color: "var(--muted)" }}>Choose a language track.</p>
        <div className="lang-grid" style={{ marginTop: 20 }}>
          {Object.entries(tier.language_tracks).map(([langId, track]) => {
            const count = track.topics.reduce((s, t) => s + (t.examples?.length || 0), 0);
            return (
              <div
                className="card"
                style={{ textAlign: "center", cursor: "pointer" }}
                key={langId}
                onClick={() => router.push(`/forge/expert?lang=${langId}`)}
              >
                <h4>{track.name}</h4>
                <p className="stat-line">{count} examples forged</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const topics = (tier.topics || []).filter((t) => (t.examples?.length || 0) > 0);
  const sections = tier.sections || [];

  return (
    <div>
      <button className="btn" onClick={() => router.push("/forge")}>
        ⬅️ Change Difficulty
      </button>
      <h1 style={{ marginTop: 12 }}>
        {tier.icon} {tier.name} — The Forge
      </h1>
      <p style={{ color: "var(--muted)" }}>Pick how much help you want, then choose a topic to work through.</p>

      <ExposureSelector />

      <div style={{ marginTop: 20 }}>
        {sections.map((section) => {
          const sectionTopics = topics.filter((t) => t.section === section);
          if (sectionTopics.length === 0) return null;
          return (
            <div key={section} style={{ marginBottom: 22 }}>
              <p className="section-tag" style={{ marginBottom: 8 }}>
                {SECTION_NAMES[section] || section}
              </p>
              {sectionTopics.map((topic) => (
                <div key={topic.id} className="card">
                  <div className="card-row">
                    <p className="card-title">{topic.title}</p>
                    <button className="btn" onClick={() => router.push(`/forge/${tierId}/topic/${topic.id}`)}>
                      Enter
                    </button>
                  </div>
                  <p className="stat-line" style={{ marginTop: 6, marginBottom: 0 }}>
                    {topic.examples.length} example{topic.examples.length === 1 ? "" : "s"}
                  </p>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
