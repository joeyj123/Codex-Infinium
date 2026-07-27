// The Workshop (Forge F) — reorder/fix/predict-output/build-to-spec
// challenges. Pilot scope is a small, hand-picked batch of Expert-tier
// topics per language track; every lookup here stays hardcoded to that
// batch rather than scanning the whole tree, since non-pilot topics simply
// don't carry a `workshop_challenges` field yet.
//
// Language is resolved the same way Forge B resolves it for Expert content:
// via a `?lang=` URL param, not a per-challenge field — a challenge already
// lives under one language track's topic list, so tagging it again would
// just be redundant with where it's stored.
export const WORKSHOP_PILOT_TRACKS = {
  python: ["py_list_comprehensions", "py_decorators", "py_generators", "py_error_handling_idioms"],
  javascript: ["js_json_native"],
  cpp: ["cpp_stl"],
  java: ["java_collections_framework"],
  csharp: ["cs_linq"],
};

export const WORKSHOP_PILOT_LANGS = Object.keys(WORKSHOP_PILOT_TRACKS);

export function getWorkshopTopic(kb, topicId, lang) {
  const pilotTopicIds = WORKSHOP_PILOT_TRACKS[lang];
  if (!pilotTopicIds || !pilotTopicIds.includes(topicId)) return null;
  const track = kb.tiers.find((t) => t.id === "expert")?.language_tracks?.[lang];
  return track?.topics?.find((t) => t.id === topicId) || null;
}

export function allWorkshopTopicIds() {
  return Object.values(WORKSHOP_PILOT_TRACKS).flat();
}
