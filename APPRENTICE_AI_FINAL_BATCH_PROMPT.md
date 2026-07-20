# Codex Infinium — Apprentice Content Expansion: AI + AI Going Deeper (FINAL BATCH)
*(Hand this to Claude Code as-is. I just attached these files if you need them: CHRONICLE_OF_INFINIUM.md, data/knowledge_base.json.)*

## Task
Expand these 15 topics (`section: "ai"` and `section: "ai_advanced"`) from their current ~300-425 word depth to the established Apprentice standard: **900-1800 words**, 5-part skeleton (hook → mechanism → connections → misconceptions → recap), dual-layer throughout (plain-English analogy + real technical term, always both).

**This is the final Apprentice content-expansion batch — completing all 69 topics.**

**Topic IDs (confirmed against the live knowledge_base.json, in order):**

AI (`ai`, 7): `ai_history`, `symbolic_vs_ml`, `neural_networks_basics`, `training_vs_inference`, `what_is_an_llm`, `prompting_basics`, `ai_limitations_ethics`

AI Going Deeper (`ai_advanced`, 8): `tokens_tokenization`, `model_parameters_size`, `context_window`, `finetuning_vs_prompting`, `embeddings`, `hallucination_mechanism`, `rag_retrieval_augmented_generation`, `agents_tool_use`

## Process
1. Read each topic's current `explanation` field — expand and deepen, don't discard.
2. Draft-and-merge in one session.
3. **Self-check word count during drafting, not after.** Every batch so far has come in short on the first pass and needed genuine added content. Build the check in from the start — target the full 900-1800 range, not the floor.
4. Vary connective/transitional language and closer phrasing. Before finalizing each closer, check it against the full existing closer list — all 111 completed topics (57 Novice + 54 Apprentice so far) — and against the other 14 topics in this batch. No repeats in either direction.
5. Building-forward chaining where genuinely relevant — `ai_history` sets up `symbolic_vs_ml`, which sets up `neural_networks_basics`; `training_vs_inference` connects to `finetuning_vs_prompting` later in the batch; `what_is_an_llm` bridges `ai` into `ai_advanced`'s `tokens_tokenization` and `embeddings`; `context_window` connects to `tokens_tokenization`; `hallucination_mechanism` can tie back to `training_vs_inference` and `embeddings`; `rag_retrieval_augmented_generation` addresses `hallucination_mechanism`'s limitation; `agents_tool_use` closes the section and Apprentice as a whole. Note: Joey directs AI tools (Claude, Claude Code) to build software rather than writing code by hand himself — this section is directly relevant to how he already works, so keep explanations grounded and concrete rather than abstract, without calling that out explicitly in the content itself.
6. No subagents — sequential work.
7. Recalculate `min_read_seconds` for all 15 topics using the confirmed real reading pace: **9.781 words/sec**.
8. Do not touch `examples`, `hint`, `page_intro`, or `xp` on these 15 topics — expansion is `explanation`-field only.
9. Do not touch any Novice topics, any other Apprentice topics/sections, or any other tier.

## Verification before finishing
- All 15 topics land in the 900-1800 word range.
- All 15 new closers are distinct from each other and from every closer in the 111 prior topics.
- `examples`/`hint`/`page_intro`/`xp` unchanged on all 15 topics.
- All other tiers/sections unchanged — confirm topic counts stay the same everywhere (Novice 57, Apprentice 69 total, Journeyman 68, Master 34, Expert 0, Legend 18).
- **Final check for this milestone**: confirm all 69 Apprentice topics now have `explanation` fields in the 900-1800 word range — this closes out the entire Apprentice content-expansion project.

## After the work
- Summarize what changed in plain English + the real technical term for anything new, same as prior sessions.
- **Update CHRONICLE_OF_INFINIUM.md yourself, unprompted** — this is mandatory. Log: topics completed this session, word count range, any genuinely new technical content added, closer-variety confirmation, and mark **Apprentice content expansion as 100% COMPLETE (69/69)**. Update the "Immediate next step" section — Apprentice content expansion is done, so point to whatever is next in the overall project backlog (the separate hands-on Python coding extension if not yet done, or Master/Legend content work, or the consolidated refinement pass — whichever Joey confirms is next).
