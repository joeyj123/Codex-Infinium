# Codex Infinium — Forge E Session: Journeyman §2

## Hard caps — do not exceed
- **2-4 examples per topic. Ceiling, not target.**
- **One section only this session:** Journeyman → Data Structures Advanced
- **Topics (confirmed from `data/knowledge_base.json`, section = `data_structures_advanced`):**
  - `trees_binary_general` — Trees (Binary Trees & General Tree Structure)
  - `graphs_data_structure` — Graphs (as a Data Structure)
  - `heaps_priority_queues` — Heaps & Priority Queues
- **Only 3 topics — run sequentially, not parallel subagents.** Coordination overhead isn't worth it at this size.
- **Stop and checkpoint at the end of this section** — no auto-continue into Algorithms Advanced

## Context discipline
- Parent session reads the Chronicle and schema **once**
- No subagent re-derives project history from scratch

## Content-writing rules
- `prompt` requires actually applying the concept, not restating the topic's `explanation`
- Vary question shape by topic type — no single templated structure repeated across the section
- Match existing dual-layer voice: plain-English + real technical term, no filler
- `key_concepts` (3-6) + `answer_bank` (2-4 differently-phrased acceptable answers) per example
- For code topics: `solution_code` must actually be run (Python/JS) to verify `expected_output` before merging — no hand-guessing

## End-of-session checklist
- [ ] Every topic in this section has 2-4 examples (not more)
- [ ] Schema validation passes (no empty strings, correct field types)
- [ ] Self-audit for voice/quality, not just structural validity
- [ ] Resume table in `FORGE_E_SESSION_TEMPLATE.md` updated
- [ ] Chronicle logged
- [ ] Stopped — did not continue into Algorithms Advanced
