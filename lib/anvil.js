// The Anvil (Forge F) — reorder/fix/predict-output/build-to-spec
// challenges. Content lives directly on a topic object as
// `anvil_challenges`, same as `examples` for The Forge — no separate
// content file. Any tier can carry Anvil content: pre-Expert tiers are
// Python-only and store topics flat (`tier.topics`), Expert content is
// authored per language track (`tier.language_tracks[lang].topics`).
//
// Readiness is entirely content-driven (a tier/track "has" Anvil content
// the moment any of its topics carries a non-empty `anvil_challenges`
// array) rather than a hardcoded pilot allowlist — so newly-authored content
// shows up automatically with no code changes needed alongside it.

export const ANVIL_LANGS = ["python", "javascript", "java", "csharp", "cpp"];

function hasChallenges(topic) {
  return (topic?.anvil_challenges?.length || 0) > 0;
}

// Topics with Anvil content for a flat (pre-Expert) tier.
export function getAnvilTierTopics(kb, tierId) {
  const tier = kb.tiers.find((t) => t.id === tierId);
  if (!tier || tier.id === "expert") return [];
  return (tier.topics || []).filter(hasChallenges);
}

// Topics with Anvil content for one Expert language track.
export function getAnvilTrackTopics(kb, lang) {
  const expert = kb.tiers.find((t) => t.id === "expert");
  const track = expert?.language_tracks?.[lang];
  return (track?.topics || []).filter(hasChallenges);
}

// Whether a tier (or, for Expert, any of its language tracks) has at least
// one Anvil-ready topic.
export function tierHasAnvilContent(kb, tierId) {
  if (tierId === "expert") {
    return ANVIL_LANGS.some((lang) => getAnvilTrackTopics(kb, lang).length > 0);
  }
  return getAnvilTierTopics(kb, tierId).length > 0;
}

// Resolves one topic by id. `lang` given -> looks inside that Expert
// track; omitted -> searches every non-Expert tier's flat topic list.
// Relies on topic ids being globally unique across the whole knowledge
// base, same assumption the existing `/anvil/topic/[topicId]` route
// (no tierId segment) already made for its Expert-only pilot content.
export function getAnvilTopic(kb, topicId, lang) {
  if (lang) {
    const expert = kb.tiers.find((t) => t.id === "expert");
    return expert?.language_tracks?.[lang]?.topics?.find((t) => t.id === topicId) || null;
  }
  for (const tier of kb.tiers) {
    if (tier.id === "expert") continue;
    const found = (tier.topics || []).find((t) => t.id === topicId);
    if (found) return found;
  }
  return null;
}

// Which flat (pre-Expert) tier a given topic id belongs to, or null if it
// isn't a flat-tier topic (e.g. it's an Expert-track topic, resolved via
// the `lang` param instead).
export function getAnvilTopicTierId(kb, topicId) {
  for (const tier of kb.tiers) {
    if (tier.id === "expert") continue;
    if ((tier.topics || []).some((t) => t.id === topicId)) return tier.id;
  }
  return null;
}

// Every topic id in the whole knowledge base that could ever host an
// Anvil page — used for static export param generation, same
// "generate every topic's page, render a not-yet-forged banner if it has
// no content" convention Forge's topic route already uses. Deduped since
// the route has no tierId segment and relies on global id uniqueness.
export function allAnvilTopicIds(kb) {
  const ids = new Set();
  for (const tier of kb.tiers) {
    if (tier.language_tracks) {
      for (const track of Object.values(tier.language_tracks)) {
        for (const topic of track.topics || []) ids.add(topic.id);
      }
    } else {
      for (const topic of tier.topics || []) ids.add(topic.id);
    }
  }
  return [...ids];
}
