"use client";

import { useState } from "react";
import { useProgress } from "@/lib/ProgressContext";
import { SECTION_NAMES } from "@/lib/sectionNames";
import TopicCard from "./TopicCard";

export default function SectionExpander({ sectionKey, topics, tierId, langId, xpLocked, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const { progress } = useProgress();
  const doneCount = topics.filter((t) => progress.completedTopics.includes(t.id)).length;

  return (
    <div className="expander">
      <div className="expander-header" onClick={() => setOpen(!open)}>
        <span>{SECTION_NAMES[sectionKey] || sectionKey}</span>
        <span className="stat-line">
          {doneCount}/{topics.length} {open ? "▲" : "▼"}
        </span>
      </div>
      {open && (
        <div className="expander-body">
          {topics.map((topic) => (
            <TopicCard key={topic.id} topic={topic} tierId={tierId} langId={langId} xpLocked={xpLocked} />
          ))}
        </div>
      )}
    </div>
  );
}
