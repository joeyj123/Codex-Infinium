# Codex Infinium — Journeyman Content-Depth Expansion, Batch 1
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files. I just attached these files if you need them.)*

## Scope — this batch: 20 topics
Sections: **mechanics** (12), **data_structures_advanced** (3), **algorithms_advanced** (5).

Topic IDs:
- mechanics: pointers_references, value_vs_reference_types, recursion, big_o_notation, sorting_algorithms, searching_algorithms, multidim_arrays, string_manipulation, type_casting, null_none, regular_expressions, debugging_tools_breakpoints
- data_structures_advanced: trees_binary_general, graphs_data_structure, heaps_priority_queues
- algorithms_advanced: divide_and_conquer_paradigm, graph_traversal_bfs_dfs, shortest_path_dijkstra, dynamic_programming_intro, greedy_algorithms

These 20 topics currently sit at 380-472 words. Expand each `explanation` field to the established standard below. Everything else about the topic (id, title, hint, xp, section) stays as-is unless noted.

## Content structure (standard, same as Novice/Apprentice)
900-1800 words per topic, 5-part skeleton:
1. **Hook** — why this matters / a relatable scenario
2. **Mechanism** — the actual how-it-works, technically precise
3. **Connections** — ties back to prior-tier concepts, only where genuinely relevant (don't force it)
4. **Misconceptions** — common wrong mental models, corrected
5. **Recap** — short closing summary

Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every concept — including ordinary-sounding words that carry real technical weight.

## Word-count self-check (mandatory)
Check word count per topic during drafting, not after. Nearly every batch across prior tiers has come in short on the first pass — don't let that happen here. Every topic must land in the 900-1800 range before merge.

## Closer-variety check (mandatory)
Before finalizing each topic's recap/closer, check it against the closer style already used across expanded Novice and Apprentice topics (read a sample of already-expanded `explanation` fields in `knowledge_base.json` for this) — don't reuse the same closing sentence structure or phrasing pattern repeatedly within this batch either.

## min_read_seconds recalculation
Recalculate `min_read_seconds` for all 20 topics using the real observed reading pace: **9.781 words/sec**.

## Process
- No subagents — draft and merge in this one session.
- Read the current `knowledge_base.json` for the real existing text (don't assume from the Chronicle).
- Don't touch any other tier's topics, Forge examples, glossary data, or app code/mechanics.
- Merge directly into `data/knowledge_base.json`.

## After the work
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` — mandatory, unprompted: note this batch complete, word-count range achieved, and remaining Journeyman batches queued (architecture+databases next, then web+concurrency+hardware_callback+ai_building).
