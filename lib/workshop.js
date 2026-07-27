// The Workshop (Forge F) — reorder/fix-code challenges. Pilot scope is a
// small, hand-picked batch of Expert-tier Python topics; every lookup here
// stays hardcoded to that batch rather than scanning the whole tree, since
// non-pilot topics simply don't carry a `workshop_challenges` field yet.
export const WORKSHOP_PILOT_TOPIC_IDS = [
  "py_list_comprehensions",
  "py_decorators",
  "py_generators",
  "py_error_handling_idioms",
];

export function getWorkshopTopic(kb, topicId) {
  if (!WORKSHOP_PILOT_TOPIC_IDS.includes(topicId)) return null;
  const py = kb.tiers.find((t) => t.id === "expert")?.language_tracks?.python;
  return py?.topics?.find((t) => t.id === topicId) || null;
}
