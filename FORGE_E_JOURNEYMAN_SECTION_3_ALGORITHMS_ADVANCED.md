# Codex Infinium — Forge E Session: Journeyman §3

## Hard caps — do not exceed
- **2-4 examples per topic. Ceiling, not target.**
- **One section only this session:** Journeyman → Algorithms Advanced
- **Topics (confirmed from `data/knowledge_base.json`, section = `algorithms_advanced`, all at 0 examples):**
  - `divide_and_conquer_paradigm` — Divide and Conquer as a Named Paradigm
  - `graph_traversal_bfs_dfs` — Graph Traversal: BFS and DFS
  - `shortest_path_dijkstra` — Shortest Path (Dijkstra's Algorithm, Conceptually)
  - `dynamic_programming_intro` — Dynamic Programming: Solving by Breaking Into Overlapping Subproblems
  - `greedy_algorithms` — Greedy Algorithms
- **5 topics — max 2 subagents, or sequential if simpler.** Coordination overhead may not be worth splitting at this size; use judgment.
- **Stop and checkpoint at the end of this section** — no auto-continue into Architecture

## Context discipline
- Parent session reads the Chronicle and schema **once**
- No subagent re-derives project history from scratch

## Content-writing rules
- `prompt` requires actually applying the concept, not restating the topic's `explanation`
- Vary question shape by topic type — no single templated structure repeated across the section
- Match existing dual-layer voice: plain-English + real technical term, no filler
- `key_concepts` (3-6) + `answer_bank` (2-4 differently-phrased acceptable answers) per example
- For code topics: `solution_code` must actually be run (Python/JS) to verify `expected_output` before merging — no hand-guessing. These topics are algorithm-heavy — expect most examples to carry runnable code (trace/build/verify), not just prose.

## End-of-session checklist
- [ ] Every topic in this section has 2-4 examples (not more)
- [ ] Schema validation passes (no empty strings, correct field types)
- [ ] Self-audit for voice/quality, not just structural validity
- [ ] Resume table in `FORGE_E_SESSION_TEMPLATE.md` updated
- [ ] Chronicle logged
- [ ] Stopped — did not continue into Architecture
