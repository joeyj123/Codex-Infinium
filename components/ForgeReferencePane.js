"use client";

import { useRouter } from "next/navigation";
import { splitExplanation } from "@/lib/study";
import { highlightParagraphs } from "@/lib/glossary";
import { SECTION_NAMES } from "@/lib/sectionNames";
import GlossaryText from "@/components/GlossaryText";

// A compact "pocket" view into The Study, jumped straight to the current
// topic's page(s), without navigating away from The Forge. Reuses The
// Study's own text-splitting logic so the two stay in sync, but renders as
// an overlay panel rather than a full open-book spread — this is meant to
// answer "remind me what this topic said," not replace The Study itself.
export default function ForgeReferencePane({ topic, tier, tierId, onClose }) {
  const router = useRouter();
  const pages = splitExplanation(topic.explanation);
  const seenGlossaryIds = new Set();

  return (
    <div className="chapter-overlay" onClick={onClose}>
      <div className="chapter-panel forge-reference-panel" onClick={(e) => e.stopPropagation()}>
        <div className="study-toolbar" style={{ marginBottom: 10 }}>
          <p className="section-tag" style={{ margin: 0 }}>
            📖 {SECTION_NAMES[topic.section] || topic.section}
          </p>
          <button className="btn" onClick={onClose}>
            ✕ Close
          </button>
        </div>
        <div className="book-page forge-reference-page">
          <h3 style={{ marginTop: 0 }}>{topic.title}</h3>
          {topic.page_intro && (
            <p style={{ fontStyle: "italic", color: "var(--muted)" }}>{topic.page_intro}</p>
          )}
          <div className="book-page-text">
            {pages.map((chunk, i) => (
              <div key={i}>
                {highlightParagraphs(chunk.split(/\n\n+/), seenGlossaryIds).map((segments, j) => (
                  <p key={j}>
                    <GlossaryText segments={segments} />
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
        <button
          className="btn"
          style={{ marginTop: 12 }}
          onClick={() => router.push(`/tier/${tierId}/study?topic=${topic.id}`)}
        >
          Open full Study book ⬈
        </button>
      </div>
    </div>
  );
}
