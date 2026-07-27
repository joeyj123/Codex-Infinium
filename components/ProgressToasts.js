"use client";

import { useProgress } from "@/lib/ProgressContext";

export default function ProgressToasts() {
  const { xpToast, rankUpBanner, achievementToast, tierCompleteBanner } = useProgress();

  return (
    <>
      <div className="progress-toasts">
        {xpToast && <div key={xpToast.id} className="xp-toast">+{xpToast.amount} XP</div>}
        {achievementToast && (
          <div key={achievementToast.id} className="achievement-toast">
            <span className="achievement-toast-icon">{achievementToast.icon}</span>
            <div>
              <div className="achievement-toast-label">Achievement Unlocked</div>
              <div className="achievement-toast-name">{achievementToast.name}</div>
            </div>
          </div>
        )}
        {rankUpBanner && (
          <div key={rankUpBanner.id} className="rankup-banner">
            Rank increased — {rankUpBanner.tierName}, level {rankUpBanner.from} → level {rankUpBanner.to}
          </div>
        )}
      </div>
      {tierCompleteBanner && (
        <div key={tierCompleteBanner.id} className="tier-complete-banner">
          <div className="tier-complete-banner-title">{tierCompleteBanner.tierName} complete</div>
          {tierCompleteBanner.nextTierName && (
            <div className="tier-complete-banner-sub">{tierCompleteBanner.nextTierName} unlocked</div>
          )}
        </div>
      )}
    </>
  );
}
