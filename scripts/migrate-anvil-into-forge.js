// One-off migration: fold every anvil_challenges[] entry into the same
// topic's examples[] array (Forge), then delete anvil_challenges entirely.
// Mechanical field mapping only — no new content authored, per Joey's
// explicit instruction. steps[] (required by ForgeTopicClient's render)
// is populated by reusing the existing hints[] as-is.
//
// Code-drill types (reorder/fix/output/build) map onto Forge's existing
// starter_code/solution_code/expected_output/language example shape:
//   reorder -> starter_code: ""      (no scrambled-block UI in Forge; blank slate)
//   fix     -> starter_code: buggy_code
//   build   -> starter_code: starter_code (already the same field)
//   output  -> starter_code: snippet_code (learner can view/run it directly)
// Concept types (order/choice/match) become plain prose examples: no code
// fields, steps come from hints, solution_summary already states the answer.
//
// Pre-Expert tiers need an explicit `language: "python"` tag (ForgeTopicClient
// only treats a pre-Expert example as a code topic if example.language is set).
// Expert-tier examples never need this field — isCodeTopic is already forced
// true for the whole Expert tier regardless of any per-example field.
const fs = require("fs");
const path = require("path");
const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

function toForgeExample(c, needsLanguageTag) {
  const base = {
    id: c.id,
    prompt: c.prompt,
    steps: c.hints && c.hints.length ? c.hints : [c.solution_summary],
    solution_summary: c.solution_summary,
    key_concepts: c.key_concepts || [],
  };
  if (c.type === "order" || c.type === "choice" || c.type === "match") {
    return base;
  }
  let starter_code = "";
  if (c.type === "fix") starter_code = c.buggy_code || "";
  else if (c.type === "build") starter_code = c.starter_code || "";
  else if (c.type === "output") starter_code = c.snippet_code || "";
  // reorder stays "" (blank slate)
  return {
    ...base,
    starter_code,
    solution_code: c.solution_code,
    expected_output: c.expected_output,
    ...(needsLanguageTag ? { language: "python" } : {}),
  };
}

function migrateTopic(topic, needsLanguageTag) {
  const challenges = topic.anvil_challenges || [];
  if (!challenges.length) {
    delete topic.anvil_challenges;
    return 0;
  }
  if (!Array.isArray(topic.examples)) topic.examples = [];
  challenges.forEach((c) => {
    topic.examples.push(toForgeExample(c, needsLanguageTag));
  });
  delete topic.anvil_challenges;
  return challenges.length;
}

let migrated = 0;
for (const tier of kb.tiers) {
  if (tier.id === "expert") {
    for (const track of Object.values(tier.language_tracks)) {
      for (const topic of track.topics) {
        migrated += migrateTopic(topic, false);
      }
    }
  } else {
    for (const topic of tier.topics) {
      migrated += migrateTopic(topic, true);
    }
  }
}

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Migrated ${migrated} anvil_challenges into examples[].`);
