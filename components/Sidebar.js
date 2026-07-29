"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProgress } from "@/lib/ProgressContext";
import { getUnlockedAchievementIds, buildAchievementDefs } from "@/lib/achievements";
import RankRing from "@/components/RankRing";
import ProgressToasts from "@/components/ProgressToasts";
import AchievementsPanel from "@/components/AchievementsPanel";

export default function Sidebar({ kb }) {
  const pathname = usePathname();
  const { progress, rank, xpIntoRank, xpForNextRank } = useProgress();
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  const achievementCount = getUnlockedAchievementIds(progress, rank, kb).length;
  const achievementTotal = buildAchievementDefs(kb).length;

  // No "last read topic" state is tracked anywhere in ProgressContext, so
  // the direct nav link falls back to Study's normal entry point: the
  // most-recently-unlocked tier's book, opened at its own default first page.
  const studyTierId = progress.unlockedTiers[progress.unlockedTiers.length - 1] || "novice";
  const studyActive = pathname.startsWith(`/tier/`) && pathname.includes("/study");

  return (
    <aside className="sidebar">
      <div style={{ position: "relative" }}>
        <h2 style={{ fontSize: 20, marginBottom: 2 }}>🔮 Codex Infinium</h2>
        <p style={{ color: "var(--muted)", fontSize: 13, marginBottom: 18 }}>
          Learn Computer Science
        </p>
        <ProgressToasts />
      </div>

      <div className="sidebar-rank-row">
        <RankRing rank={rank} xpIntoRank={xpIntoRank} xpForNextRank={xpForNextRank} size={64} />
        <div>
          <div className="stat-line">Rank {rank}</div>
          <div className="stat-line" style={{ color: "var(--muted)" }}>
            {xpIntoRank}/{xpForNextRank} XP
          </div>
        </div>
      </div>

      <button
        className="stat-line achievements-link"
        onClick={() => setAchievementsOpen(true)}
        style={{ marginBottom: 20 }}
      >
        🏆 Achievements: {achievementCount}/{achievementTotal}
      </button>

      <Link href="/">
        <button className={`nav-btn ${pathname === "/" ? "active" : ""}`}>
          📊 Dashboard
        </button>
      </Link>
      <Link href="/progression">
        <button className={`nav-btn ${pathname === "/progression" ? "active" : ""}`}>
          🗺️ Progression Map
        </button>
      </Link>
      <Link href={`/tier/${studyTierId}/study`}>
        <button className={`nav-btn ${studyActive ? "active" : ""}`}>
          📖 The Study
        </button>
      </Link>
      <Link href="/forge">
        <button className={`nav-btn ${pathname.startsWith("/forge") ? "active" : ""}`}>
          🔥 The Forge
        </button>
      </Link>
      <Link href="/anvil">
        <button className={`nav-btn ${pathname.startsWith("/anvil") ? "active" : ""}`}>
          🛠️ The Anvil
        </button>
      </Link>
      <Link href="/settings">
        <button className={`nav-btn ${pathname === "/settings" ? "active" : ""}`}>
          ⚙️ Settings
        </button>
      </Link>

      <div style={{ height: 1, background: "var(--border)", margin: "14px 0" }} />
      <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8, fontFamily: "'Cinzel', serif" }}>
        ALL TIERS
      </p>

      {kb.tiers.map((tier) => {
        const active = pathname.startsWith(`/tier/${tier.id}`);
        const earned = progress.unlockedTiers.includes(tier.id);
        const total =
          tier.id === "expert"
            ? Object.values(tier.language_tracks).reduce((s, t) => s + t.topics.length, 0)
            : (tier.topics || []).length;
        const done =
          tier.id === "expert"
            ? Object.values(tier.language_tracks).reduce(
                (s, t) => s + t.topics.filter((x) => progress.completedTopics.includes(x.id)).length,
                0
              )
            : (tier.topics || []).filter((t) => progress.completedTopics.includes(t.id)).length;
        const pct = total > 0 ? Math.round((done / total) * 100) : 0;
        return (
          <div key={tier.id}>
            <Link href={`/tier/${tier.id}`}>
              <button className={`nav-btn ${active ? "active" : ""} ${earned ? "nav-btn-earned" : "nav-btn-dim"}`}>
                {tier.icon} {tier.name}
              </button>
            </Link>
            <div className="sidebar-tier-progress">
              <div className="sidebar-tier-progress-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="sidebar-tier-frac">{done}/{total}</div>
          </div>
        );
      })}

      {achievementsOpen && (
        <AchievementsPanel
          kb={kb}
          progress={progress}
          rank={rank}
          onClose={() => setAchievementsOpen(false)}
        />
      )}
    </aside>
  );
}
