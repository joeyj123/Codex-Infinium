# Codex Infinium — Journeyman Content-Depth Expansion, Batch 2
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files. I just attached these files if you need them.)*

## Scope — this batch: 22 topics
Sections: **architecture** (14), **databases** (8).

Topic IDs:
- architecture: separation_of_concerns, what_is_state, mvc_pattern, building_an_api, middleware, error_handling_patterns, logging, testing_unit_tests, environment_variables_config, software_development_lifecycle, agile_scrum_practically, code_review_practice, software_licensing, accessibility_a11y
- databases: relational_vs_nonrelational, tables_rows_columns_keys, basic_sql_crud, joins, indexes, acid_properties_transactions, normalization_1nf_2nf_3nf, nosql_database_types

These 22 topics currently sit at 323-464 words. Expand each `explanation` field to the established standard below. Everything else about the topic (id, title, hint, xp, section) stays as-is unless noted.

## Content structure (standard, same as Novice/Apprentice/Journeyman Batch 1)
900-1800 words per topic, 5-part skeleton:
1. **Hook** — why this matters / a relatable scenario
2. **Mechanism** — the actual how-it-works, technically precise
3. **Connections** — ties back to prior-tier concepts, only where genuinely relevant (don't force it)
4. **Misconceptions** — common wrong mental models, corrected
5. **Recap** — short closing summary

Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every concept — including ordinary-sounding words that carry real technical weight (e.g. "state," "key," "join").

## Word-count self-check (mandatory)
Check word count per topic during drafting, not after. Every topic must land in the 900-1800 range before merge.

## Closer-variety check (mandatory)
Before finalizing each topic's recap/closer, check it against the closer style already used across expanded Novice, Apprentice, and Journeyman Batch 1 topics (read a sample of already-expanded `explanation` fields in `knowledge_base.json`). Don't reuse the same closing sentence structure repeatedly within this batch either.

## min_read_seconds recalculation
Recalculate `min_read_seconds` for all 22 topics using the real observed reading pace: **9.781 words/sec**.

## Process
- No subagents — draft and merge in this one session.
- Read the current `knowledge_base.json` for the real existing text (don't assume from the Chronicle).
- Don't touch any other tier's topics, Forge examples, glossary data, or app code/mechanics.
- Merge directly into `data/knowledge_base.json`.

## After the work
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` — mandatory, unprompted: note this batch complete, word-count range achieved, and remaining Journeyman batch queued (web + concurrency + hardware_callback + ai_building, 26 topics — the last batch, brings Journeyman to 68/68).
