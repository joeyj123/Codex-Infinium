"use client";

import Link from "next/link";
import { useProgress } from "@/lib/ProgressContext";

export default function TopicCard({ topic, tierId, langId, xpLocked }) {
  const { progress } = useProgress();
  const done = progress.completedTopics.includes(topic.id);
  const href = langId
    ? `/tier/${tierId}/topic/${topic.id}?lang=${langId}`
    : `/tier/${tierId}/topic/${topic.id}`;

  return (
    <div className={`card ${xpLocked ? "card-xp-locked" : ""}`}>
      <div className="card-row">
        <p className="card-title">
          {done ? <span className="seal">✓</span> : <span style={{ fontSize: 16, color: "var(--muted)" }}>○</span>}
          {topic.title}
        </p>
        <Link href={href}>
          <button className="btn">{done ? "Review" : "Open"}</button>
        </Link>
      </div>
      {xpLocked && !done && (
        <p className="stat-line" style={{ color: "var(--muted)", marginTop: 6, marginBottom: 0 }}>
          Reading only — earn XP here once prior tiers are complete
        </p>
      )}
    </div>
  );
}
