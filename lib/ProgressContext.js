"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { rankFromXp } from "@/lib/xpCurve";
import { isTierComplete, tierTopicIds } from "@/lib/progressHelpers";
import { getUnlockedAchievementIds, buildAchievementDefs } from "@/lib/achievements";

const ProgressContext = createContext(null);

const DEFAULT_PROGRESS = {
  xp: 0,
  completedTopics: [],
  unlockedTiers: ["novice"],
  completedForgeExamples: [],
  completedAnvilChallenges: [],
};

const STORAGE_KEY = "codex_infinium_progress";
const TOAST_MS = 3200;
const BANNER_MS = 4200;
const TIER_BANNER_MS = 5200;

export function ProgressProvider({ children, kb }) {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [loaded, setLoaded] = useState(false);
  const [xpToast, setXpToast] = useState(null); // { id, amount }
  const [rankUpBanner, setRankUpBanner] = useState(null); // { id, from, to }
  const [achievementToast, setAchievementToast] = useState(null); // { id, name, icon }
  const [tierCompleteBanner, setTierCompleteBanner] = useState(null); // { id, tierName, nextTierName }
  const achievementQueue = useRef([]);
  const toastSeq = useRef(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setProgress({ ...DEFAULT_PROGRESS, ...parsed });
      }
    } catch (e) {
      console.error("Could not load progress", e);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error("Could not save progress", e);
    }
  }, [progress, loaded]);

  const { rank, xpIntoRank, xpForNextRank } = rankFromXp(progress.xp);

  function tierComplete(tier) {
    return isTierComplete(tier, progress.completedTopics);
  }

  function resetProgress() {
    setProgress(DEFAULT_PROGRESS);
    setXpToast(null);
    setRankUpBanner(null);
    setAchievementToast(null);
    setTierCompleteBanner(null);
    achievementQueue.current = [];
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Could not clear progress", e);
    }
  }

  function tierUnlockedForXp(tierId) {
    return progress.unlockedTiers.includes(tierId);
  }

  function unlockNextTier(tierIndex) {
    const tiers = kb.tiers;
    if (tierIndex + 1 < tiers.length) {
      const nextId = tiers[tierIndex + 1].id;
      setProgress((p) =>
        p.unlockedTiers.includes(nextId)
          ? p
          : { ...p, unlockedTiers: [...p.unlockedTiers, nextId] }
      );
    }
  }

  function queueAchievementToasts(newIds, defs) {
    const items = newIds
      .map((id) => defs.find((d) => d.id === id))
      .filter(Boolean);
    achievementQueue.current.push(...items);
    if (!achievementToast) drainAchievementQueue();
  }

  function drainAchievementQueue() {
    const next = achievementQueue.current.shift();
    if (!next) {
      setAchievementToast(null);
      return;
    }
    toastSeq.current += 1;
    setAchievementToast({ id: toastSeq.current, name: next.name, icon: next.icon });
    setTimeout(() => {
      drainAchievementQueue();
    }, TOAST_MS);
  }

  // Reading no longer grants XP or requires a timer — visiting a page is
  // enough to mark its topic read. The tier-unlock gate is unchanged:
  // reading a topic in a tier that hasn't been unlocked yet is still
  // allowed (The Study is readable cross-tier), but it doesn't count
  // toward that tier's completion until the tier is reached in order.
  // Rank/XP is now driven entirely by Forge (examples/exercises) via
  // markForgeExampleComplete below.
  function markTopicRead(topicId, tierIndex, tierName) {
    if (progress.completedTopics.includes(topicId)) return;
    const tier = kb.tiers[tierIndex];
    if (!tier || !tierUnlockedForXp(tier.id)) return;

    const rank = rankFromXp(progress.xp).rank;
    const defs = buildAchievementDefs(kb);
    const beforeAchievements = getUnlockedAchievementIds(progress, rank, kb);

    const updatedCompleted = [...progress.completedTopics, topicId];
    setProgress((p) => ({ ...p, completedTopics: updatedCompleted }));

    const justCompletedTier = tierTopicIds(tier).every((id) => updatedCompleted.includes(id));
    if (justCompletedTier) {
      unlockNextTier(tierIndex);
      const nextTier = kb.tiers[tierIndex + 1];
      toastSeq.current += 1;
      setTierCompleteBanner({
        id: toastSeq.current,
        tierName: tier.name,
        nextTierName: nextTier ? nextTier.name : null,
      });
      setTimeout(
        (id) => setTierCompleteBanner((b) => (b && b.id === id ? null : b)),
        TIER_BANNER_MS,
        toastSeq.current
      );
    }

    const afterAchievements = getUnlockedAchievementIds(
      { completedTopics: updatedCompleted },
      rank,
      kb
    );
    const newIds = afterAchievements.filter((id) => !beforeAchievements.includes(id));
    if (newIds.length > 0) queueAchievementToasts(newIds, defs);
  }

  // Forge examples award XP once per example per user, tracked separately
  // from completedTopics (which is Study's "read this page" tracker) since
  // an example isn't the same unit as a topic and shouldn't fight over the
  // same completion flag. Doesn't touch tier unlocks or achievements — those
  // stay keyed to Study completion, same as before.
  function hasCompletedForgeExample(exampleId) {
    return progress.completedForgeExamples.includes(exampleId);
  }

  function markForgeExampleComplete(exampleId, xpAmount, tierName) {
    if (progress.completedForgeExamples.includes(exampleId)) return 0;

    const beforeRank = rankFromXp(progress.xp).rank;
    const updatedXp = progress.xp + xpAmount;
    const afterRank = rankFromXp(updatedXp).rank;

    setProgress((p) =>
      p.completedForgeExamples.includes(exampleId)
        ? p
        : {
            ...p,
            completedForgeExamples: [...p.completedForgeExamples, exampleId],
            xp: p.xp + xpAmount,
          }
    );

    toastSeq.current += 1;
    setXpToast({ id: toastSeq.current, amount: xpAmount });
    setTimeout(
      (id) => setXpToast((t) => (t && t.id === id ? null : t)),
      TOAST_MS,
      toastSeq.current
    );

    if (afterRank > beforeRank) {
      toastSeq.current += 1;
      setRankUpBanner({ id: toastSeq.current, from: beforeRank, to: afterRank, tierName });
      setTimeout(
        (id) => setRankUpBanner((b) => (b && b.id === id ? null : b)),
        BANNER_MS,
        toastSeq.current
      );
    }

    return xpAmount;
  }

  // Anvil was retired and its challenges folded into Forge's examples[]
  // (see scripts/migrate-anvil-into-forge.js) — completion is now tracked
  // solely via hasCompletedForgeExample/markForgeExampleComplete above.
  // completedAnvilChallenges is kept in the progress schema (below) purely
  // so existing saved progress from before the merge still parses safely;
  // nothing writes to it anymore.

  return (
    <ProgressContext.Provider
      value={{
        progress,
        rank,
        xpIntoRank,
        xpForNextRank,
        markTopicRead,
        tierComplete,
        tierUnlockedForXp,
        resetProgress,
        loaded,
        xpToast,
        rankUpBanner,
        achievementToast,
        tierCompleteBanner,
        hasCompletedForgeExample,
        markForgeExampleComplete,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
