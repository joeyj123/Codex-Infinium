"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";
import { useAppearance } from "@/lib/AppearanceContext";
import { useOnboarding } from "@/lib/OnboardingContext";
import { buildBookPages, buildChapterList } from "@/lib/study";
import { highlightParagraphs } from "@/lib/glossary";
import { SECTION_NAMES } from "@/lib/sectionNames";
import Walkthrough from "@/components/Walkthrough";
import GlossaryText from "@/components/GlossaryText";

const STUDY_INTRO_STEPS = [
  {
    title: "The Study",
    body: "Each tier is a book. Each topic is a page (or a short run of pages, if it's long). Use the arrow buttons (or ← / → on your keyboard) to flip between pages.",
  },
  {
    title: "Reading",
    body: "A page counts as read as soon as you visit it — no waiting required.",
  },
  {
    title: "Chapters",
    body: "The 🔖 Chapters button jumps straight to any section without flipping through every page in between.",
  },
];

export default function StudyPage() {
  const { tierId } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get("lang");
  const startTopicId = searchParams.get("topic");
  const { progress, markTopicRead, loaded } = useProgress();
  const { settings } = useAppearance();
  const { loaded: onboardingLoaded, hasSeenMode, markModeSeen } = useOnboarding();

  const tierIndex = kb.tiers.findIndex((t) => t.id === tierId);
  const tier = kb.tiers[tierIndex];
  const tierXpLocked = tier ? !progress.unlockedTiers.includes(tier.id) : false;

  const topics = useMemo(() => {
    if (!tier) return [];
    if (tierId === "expert" && lang && tier.language_tracks?.[lang]) {
      return tier.language_tracks[lang].topics;
    }
    return tier.topics || [];
  }, [tier, tierId, lang]);

  const pages = useMemo(() => buildBookPages(topics), [topics]);
  const chapters = useMemo(() => buildChapterList(topics), [topics]);

  const initialIndex = useMemo(() => {
    if (!startTopicId) return 0;
    const idx = pages.findIndex((p) => p.topicId === startTopicId);
    return idx === -1 ? 0 : idx;
  }, [pages, startTopicId]);

  const [spread, setSpread] = useState(() => Math.floor(initialIndex / 2));
  const [flipDir, setFlipDir] = useState(null);
  const [chapterListOpen, setChapterListOpen] = useState(false);
  const didInit = useRef(false);

  useEffect(() => {
    if (!didInit.current) {
      didInit.current = true;
      setSpread(Math.floor(initialIndex / 2));
    }
  }, [initialIndex]);

  const totalSpreads = Math.ceil(pages.length / 2);
  const leftPage = pages[spread * 2];
  const rightPage = pages[spread * 2 + 1];

  const activeTopicIds = useMemo(() => {
    const ids = [];
    if (leftPage && !ids.includes(leftPage.topicId)) ids.push(leftPage.topicId);
    if (rightPage && !ids.includes(rightPage.topicId)) ids.push(rightPage.topicId);
    return ids;
  }, [leftPage, rightPage]);

  // Visiting any physical page belonging to a topic marks that topic read —
  // no timer, no XP. Tier-unlock gating still applies inside markTopicRead.
  useEffect(() => {
    activeTopicIds.forEach((id) => {
      if (progress.completedTopics.includes(id)) return;
      const topic = topics.find((t) => t.id === id);
      if (topic) markTopicRead(topic.id, tierIndex, tier.name);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopicIds.join(",")]);

  function flipNext() {
    if (spread + 1 >= totalSpreads) return;
    setFlipDir("next");
    setTimeout(() => {
      setSpread((s) => s + 1);
      setFlipDir(null);
    }, 500);
  }

  function flipPrev() {
    if (spread <= 0) return;
    setFlipDir("prev");
    setTimeout(() => {
      setSpread((s) => s - 1);
      setFlipDir(null);
    }, 500);
  }

  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight") flipNext();
      if (e.key === "ArrowLeft") flipPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spread, totalSpreads]);

  if (!loaded || !tier) return null;

  function goToPageIndex(idx) {
    setSpread(Math.floor(idx / 2));
    setChapterListOpen(false);
  }

  const backHref = tierId === "expert" && lang ? `/tier/expert?lang=${lang}` : `/tier/${tierId}`;

  function renderPage(page, side) {
    if (!page) {
      return (
        <div className={`book-page book-page-${side} book-page-blank`}>
          <p className="stat-line" style={{ color: "var(--muted)" }}>~ end of book ~</p>
        </div>
      );
    }
    const done = progress.completedTopics.includes(page.topicId);
    const topic = page.topic;
    const readOnly = tierXpLocked && !done;

    return (
      <div className={`book-page book-page-${side}`}>
        {done && <div className="dogear" title="Read">✓</div>}
        {readOnly && <div className="dogear dogear-readonly" title="Read (tier not yet earned)">◇</div>}
        {page.isFirstPage && (
          <>
            <p className="section-tag">{SECTION_NAMES[page.section] || page.section}</p>
            <h3 style={{ marginTop: 4 }}>{topic.title}</h3>
            {topic.page_intro && (
              <p style={{ fontStyle: "italic", color: "var(--muted)" }}>{topic.page_intro}</p>
            )}
          </>
        )}
        {!page.isFirstPage && (
          <p className="stat-line" style={{ color: "var(--muted)", marginBottom: 6 }}>
            — continued —
          </p>
        )}
        <div
          className={`book-page-text ${settings.font === "sans" ? "book-page-text-sans" : ""} book-text-${settings.textSize}`}
        >
          {highlightParagraphs(page.text.split(/\n\n+/)).map((segments, i) => (
            <p key={i}>
              <GlossaryText segments={segments} />
            </p>
          ))}
        </div>
        {page.isLastPage && topic.examples && topic.examples.length > 0 && (
          <InlineExample example={topic.examples[0]} />
        )}
        <div className="book-page-footer">
          <p className="stat-line" style={{ marginTop: 4 }}>
            {done
              ? "Read"
              : tierXpLocked
              ? "Read (tier not yet earned)"
              : "Marking as read…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="study-toolbar">
        <button className="btn" onClick={() => router.push(backHref)}>⬅️ Back</button>
        <h2 style={{ margin: 0 }}>{tier.icon} {tier.name}</h2>
        <button className="btn" onClick={() => setChapterListOpen(true)}>🔖 Chapters</button>
      </div>

      <div className="book-container">
        <button className="book-nav-btn book-nav-left" onClick={flipPrev} disabled={spread <= 0}>
          ‹
        </button>

        <div className={`book ${flipDir ? `flipping-${flipDir}` : ""}`}>
          {renderPage(leftPage, "left")}
          <div className="spine" />
          {renderPage(rightPage, "right")}
        </div>

        <button className="book-nav-btn book-nav-right" onClick={flipNext} disabled={spread + 1 >= totalSpreads}>
          ›
        </button>
      </div>

      <p className="stat-line" style={{ textAlign: "center", marginTop: 10 }}>
        Spread {spread + 1} / {totalSpreads}
      </p>

      {chapterListOpen && (
        <div className="chapter-overlay" onClick={() => setChapterListOpen(false)}>
          <div className="chapter-panel" onClick={(e) => e.stopPropagation()}>
            <h4>Chapters</h4>
            {chapters.map((sec) => {
              const firstIdx = pages.findIndex((p) => p.section === sec);
              const secTopics = topics.filter((t) => t.section === sec);
              const doneCount = secTopics.filter((t) => progress.completedTopics.includes(t.id)).length;
              return (
                <button
                  key={sec}
                  className="btn"
                  style={{ display: "block", width: "100%", textAlign: "left", marginBottom: 8 }}
                  onClick={() => goToPageIndex(firstIdx)}
                >
                  {SECTION_NAMES[sec] || sec}
                  <span className="stat-line" style={{ float: "right" }}>
                    {doneCount}/{secTopics.length}
                  </span>
                </button>
              );
            })}
            <button className="btn" style={{ marginTop: 8 }} onClick={() => setChapterListOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {onboardingLoaded && !hasSeenMode("study") && (
        <Walkthrough steps={STUDY_INTRO_STEPS} onDone={() => markModeSeen("study")} />
      )}
    </div>
  );
}

// Read-only worked-example preview inside The Study — reuses the example's
// existing steps/solution_summary as-is. No input box, no grading, no XP;
// that's what The Forge is for. This is passive reading, so it's visually
// distinct from a Forge card rather than styled like one.
function InlineExample({ example }) {
  return (
    <div className="study-inline-example">
      <p className="section-tag">In Practice</p>
      <p style={{ fontStyle: "italic", marginBottom: 10 }}>{example.prompt}</p>
      {example.steps.map((step, i) => (
        <p key={i} style={{ lineHeight: 1.6, marginBottom: 8 }}>
          <strong>{i + 1}.</strong> {step}
        </p>
      ))}
      <p className="study-inline-example-summary">{example.solution_summary}</p>
    </div>
  );
}
