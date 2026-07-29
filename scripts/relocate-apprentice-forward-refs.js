// One-off script: relocates 21 Apprentice Anvil challenges flagged by the
// Apprentice Anvil audit as forward-references — using Python syntax
// (def, list comprehensions, set literals) not yet taught at their current
// topic's position in the curriculum. Moves each challenge object verbatim
// (no rewriting) into its correct topic's anvil_challenges array, same
// approach as the Novice Session 2 f-string relocation script.
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

// [sourceTopicId, [challengeIds...], destTopicId]
const MOVES = [
  [
    "variables_data_types",
    ["io_devices_usb_wc1", "io_devices_usb_wc2", "firmware_vs_software_hardware_wc1", "firmware_vs_software_hardware_wc2"],
    "functions_scope",
  ],
  [
    "operators",
    ["firmware_vs_software_hardware_wc6", "osi_tcpip_layers_wc1", "osi_tcpip_layers_wc2", "osi_tcpip_layers_wc6"],
    "functions_scope",
  ],
  [
    "conditionals",
    ["what_is_a_shell_wc1", "what_is_a_shell_wc2", "what_is_a_shell_wc3", "what_is_a_shell_wc6"],
    "functions_scope",
  ],
  ["loops", ["binary_to_electricity_wc2", "binary_to_electricity_wc6"], "survey_python"],
  [
    "loops",
    ["what_is_terminal_wc2", "what_is_terminal_wc3", "what_is_terminal_wc7", "cpu_basics_wc3", "browser_vs_app_wc3", "browser_vs_app_wc7"],
    "sets",
  ],
  ["arrays_lists", ["mac_vs_ip_address_wc5"], "sets"],
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
