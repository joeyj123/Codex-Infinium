"use client";

import { useState } from "react";
import Link from "next/link";
import kb from "@/data/knowledge_base.json";
import { useProgress } from "@/lib/ProgressContext";
import { useOnboarding } from "@/lib/OnboardingContext";
import { getUnlockedAchievementIds, buildAchievementDefs } from "@/lib/achievements";
import { tierTopicIds } from "@/lib/progressHelpers";
import RankRing from "@/components/RankRing";
import TierWheel from "@/components/TierWheel";
import AchievementsPanel from "@/components/AchievementsPanel";
import Walkthrough from "@/components/Walkthrough";

const DASHBOARD_TOUR_STEPS = [
  {
    title: "The Rank Ring",
    body: "This ring fills as you earn XP. The number in the middle is your current rank — it climbs independently of which tier you're in.",
  },
  {
    title: "The Tier Wheel",
    body: "Your six tiers, orbiting the one you're currently working through. Dimmed tiers are still readable — you just don't earn XP or completion credit there until you reach them in order.",
  },
  {
    title: "Continue Card",
    body: "Jumps you straight back into the next unread page of your current tier's book. Click it any time you want to pick up where you left off.",
  },
];

function tierFirstTopicId(tier) {
  if (tier.id === "expert") return null;
  return tier.topics?.[0]?.id;
}

export default function Dashboard() {
  const { progress, rank, xpIntoRank, xpForNextRank, loaded } = useProgress();
  const { loaded: onboardingLoaded, dashboardSeen, markDashboardSeen } = useOnboarding();
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  if (!loaded) return null;

  const currentTier =
    kb.tiers.find((t) => {
      if (!progress.unlockedTiers.includes(t.id)) return false;
      const total = tierTopicIds(t).length;
      const done = tierTopicIds(t).filter((id) => progress.completedTopics.includes(id)).length;
      return total === 0 || done < total;
    }) || kb.tiers[0];

  const continueHref =
    currentTier.id === "expert"
      ? "/tier/expert"
      : (() => {
          const firstTopic = tierFirstTopicId(currentTier);
          return firstTopic ? `/tier/${currentTier.id}/study?topic=${firstTopic}` : `/tier/${currentTier.id}`;
        })();

  const achievementCount = getUnlockedAchievementIds(progress, rank, kb).length;
  const achievementTotal = buildAchievementDefs(kb).length;

  return (
    <div>
      <h1>Dashboard</h1>
      <p style={{ color: "var(--muted)" }}>Welcome back.</p>

      <div className="arcane-header">
        <RankRing rank={rank} xpIntoRank={xpIntoRank} xpForNextRank={xpForNextRank} size={140} />
        <div style={{ flex: 1 }}>
          <p className="stat-line" style={{ fontSize: 16 }}>
            {xpIntoRank}/{xpForNextRank} XP to Rank {rank + 1}
          </p>
          <div className="stat-panel-row">
            <div className="stat-panel">
              <span className="stat-panel-label">Topics Done</span>
              <div className="stat-panel-value">{progress.completedTopics.length}</div>
            </div>
            <button className="stat-panel stat-panel-btn" onClick={() => setAchievementsOpen(true)}>
              <span className="stat-panel-label">Achievements</span>
              <div className="stat-panel-value">
                {achievementCount}/{achievementTotal}
              </div>
            </button>
            <div className="stat-panel">
              <span className="stat-panel-label">Tiers Earned</span>
              <div className="stat-panel-value">{progress.unlockedTiers.length}/{kb.tiers.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="continue-panel">
        <span className="continue-panel-label">Continue where you left off</span>
        <div className="continue-panel-body">
          <div className="continue-panel-icon">{currentTier.icon}</div>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: "0 0 4px" }}>{currentTier.name}</h4>
            <p className="stat-line" style={{ margin: 0 }}>
              {tierTopicIds(currentTier).filter((id) => progress.completedTopics.includes(id)).length}/
              {tierTopicIds(currentTier).length} topics
            </p>
          </div>
          <Link href={continueHref}>
            <button className="btn">Continue</button>
          </Link>
        </div>
      </div>

      <div className="stat-panel" style={{ marginTop: 28, padding: "18px 12px" }}>
        <span className="stat-panel-label">The Tier Wheel</span>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <TierWheel tiers={kb.tiers} currentTierId={currentTier.id} progress={progress} size={420} />
        </div>
        <p className="stat-line" style={{ textAlign: "center", color: "var(--muted)" }}>
          Dimmed tiers are readable now — complete prior tiers to earn XP there.
        </p>
      </div>

      {achievementsOpen && (
        <AchievementsPanel
          kb={kb}
          progress={progress}
          rank={rank}
          onClose={() => setAchievementsOpen(false)}
        />
      )}

      {onboardingLoaded && !dashboardSeen && (
        <Walkthrough steps={DASHBOARD_TOUR_STEPS} onDone={markDashboardSeen} />
      )}
    </div>
  );
}
