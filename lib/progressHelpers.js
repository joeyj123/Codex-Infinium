// Shared helpers for reasoning about tiers/topics across the whole knowledge base.
// Used by both ProgressContext (state) and achievements.js (pure derived checks).

export function tierTopicIds(tier) {
  if (tier.id === "expert") {
    return Object.values(tier.language_tracks).flatMap((track) => track.topics.map((t) => t.id));
  }
  return (tier.topics || []).map((t) => t.id);
}

export function isTierComplete(tier, completedTopics) {
  const ids = tierTopicIds(tier);
  if (ids.length === 0) return false;
  return ids.every((id) => completedTopics.includes(id));
}

export function totalTopicCount(kb) {
  return kb.tiers.reduce((sum, tier) => sum + tierTopicIds(tier).length, 0);
}
