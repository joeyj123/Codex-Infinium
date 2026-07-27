import { isTierComplete, totalTopicCount } from "@/lib/progressHelpers";

// Achievements are never persisted directly — they're recomputed from
// completedTopics/xp/kb every time, so there's nothing to migrate when the
// list changes later.
export function buildAchievementDefs(kb) {
  const defs = [
    {
      id: "first_page",
      name: "First Page Turned",
      description: "Complete your first topic.",
      icon: "📖",
      check: ({ completedTopics }) => completedTopics.length >= 1,
    },
  ];

  kb.tiers.forEach((tier) => {
    defs.push({
      id: `tier_complete_${tier.id}`,
      name: `${tier.name} Complete`,
      description: `Complete every topic in the ${tier.name} tier.`,
      icon: tier.icon,
      check: ({ completedTopics }) => isTierComplete(tier, completedTopics),
    });
  });

  [5, 10, 25].forEach((n) => {
    defs.push({
      id: `rank_${n}`,
      name: `Rank ${n} Reached`,
      description: `Reach Rank ${n}.`,
      icon: "⬆️",
      check: ({ rank }) => rank >= n,
    });
  });

  const total = totalTopicCount(kb);
  defs.push({
    id: "full_grimoire",
    name: "The Full Grimoire",
    description: `Complete all ${total} topics.`,
    icon: "🏆",
    check: ({ completedTopics }) => completedTopics.length >= total,
  });

  return defs;
}

// Returns the set of unlocked achievement ids for the given progress state.
export function getUnlockedAchievementIds(progress, rank, kb) {
  const defs = buildAchievementDefs(kb);
  const ctx = { completedTopics: progress.completedTopics, rank };
  return defs.filter((d) => d.check(ctx)).map((d) => d.id);
}
