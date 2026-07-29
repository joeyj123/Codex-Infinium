// Follow-up to relocate-apprentice-forward-refs.js: a full-tier re-scan
// after the first relocation pass caught 11 additional forward-references
// the original audit's narrower check missed (it only checked for set
// literals in 5 of the 8 populated topics, not all of them, and one `def`
// slipped through in `loops`). Same move-verbatim approach.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

function topic(id) {
  const t = app.topics.find((t) => t.id === id);
  if (!t) throw new Error(`Topic not found: ${id}`);
  if (!t.anvil_challenges) t.anvil_challenges = [];
  return t;
}

const MOVES = [
  ["loops", ["what_is_a_shell_wc7"], "functions_scope"],
  [
    "variables_data_types",
    [
      "container_formats_codecs_wc1",
      "container_formats_codecs_wc2",
      "container_formats_codecs_wc4",
      "what_is_terminal_wc4",
      "browser_vs_app_wc4",
    ],
    "sets",
  ],
  ["operators", ["container_formats_codecs_wc3"], "sets"],
  [
    "conditionals",
    ["container_formats_codecs_wc6", "container_formats_codecs_wc7", "what_is_terminal_wc6", "browser_vs_app_wc6"],
    "sets",
  ],
];

let totalMoved = 0;
for (const [sourceId, ids, destId] of MOVES) {
  const source = topic(sourceId);
  const dest = topic(destId);
  for (const id of ids) {
    const idx = source.anvil_challenges.findIndex((c) => c.id === id);
    if (idx === -1) throw new Error(`Challenge ${id} not found in ${sourceId} — aborting, re-check before rerunning`);
    const [challenge] = source.anvil_challenges.splice(idx, 1);
    dest.anvil_challenges.push(challenge);
    totalMoved += 1;
  }
}

console.log(`Moved ${totalMoved} challenges.`);

let out = JSON.stringify(kb, null, 2);
out = out.replace(/\n/g, "\r\n");
if (!out.endsWith("\r\n")) out += "\r\n";
fs.writeFileSync(KB_PATH, out, "utf8");
console.log("Wrote", KB_PATH);
