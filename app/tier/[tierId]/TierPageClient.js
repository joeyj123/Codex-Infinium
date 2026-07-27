"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import kb from "@/data/knowledge_base.json";
import SectionExpander from "@/components/SectionExpander";
import TopicCard from "@/components/TopicCard";
import { useProgress } from "@/lib/ProgressContext";

export default function TierPageClient() {
  const { tierId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { progress, loaded } = useProgress();
  const tier = kb.tiers.find((t) => t.id === tierId);
  const lang = searchParams.get("lang");

  if (!loaded) return null;
  if (!tier) return <p>Unknown tier.</p>;

  const xpLocked = !progress.unlockedTiers.includes(tierId);

  if (tierId === "expert") {
    if (lang && tier.language_tracks[lang]) {
      const track = tier.language_tracks[lang];
      return (
        <div>
          <h1>{tier.icon} {track.name} Track</h1>
          <button className="btn" onClick={() => router.push("/tier/expert")}>
            ⬅️ Change Language
          </button>
          <div style={{ marginTop: 16 }}>
            {track.topics.map((topic) => (
              <TopicCard key={topic.id} topic={topic} tierId="expert" langId={lang} xpLocked={xpLocked} />
            ))}
          </div>
        </div>
      );
    }
    return (
      <div>
        <h1>{tier.icon} {tier.name}</h1>
        {tier.intro && <div className="banner">{tier.intro}</div>}
        <div className="lang-grid">
          {Object.entries(tier.language_tracks).map(([langId, track]) => {
            const doneCount = track.topics.filter((t) =>
              progress.completedTopics.includes(t.id)
            ).length;
            return (
              <div
                className="card"
                style={{ textAlign: "center", cursor: "pointer" }}
                key={langId}
                onClick={() => router.push(`/tier/expert?lang=${langId}`)}
              >
                <h4>{track.name}</h4>
                <p className="stat-line">{doneCount}/{track.topics.length} mastered</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const sections = tier.sections || [];

  return (
    <div>
      <h1>{tier.icon} {tier.name}</h1>
      {xpLocked && (
        <div className="banner banner-dim">
          Not yet earned — you can read every page here, but XP and topic completion unlock once
          prior tiers are finished.
        </div>
      )}
      {tier.intro && <div className="banner">{tier.intro}</div>}
      {sections.length > 0 &&
        sections.map((section) => {
          const sectionTopics = tier.topics.filter((t) => t.section === section);
          if (sectionTopics.length === 0) return null;
          return (
            <SectionExpander
              key={section}
              sectionKey={section}
              topics={sectionTopics}
              tierId={tierId}
              xpLocked={xpLocked}
            />
          );
        })}
    </div>
  );
}
