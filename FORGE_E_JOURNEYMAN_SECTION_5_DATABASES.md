# Codex Infinium — Forge E Session: Journeyman §5

## Unrelated small fix — bundle in, don't hand to content subagents
The page-number indicator on Study book pages (e.g. "(1/2)" next to the chapter title, see attached screenshot) is low-contrast against the parchment background — hard to read at a glance. Bump its contrast (darker/more saturated tone, or a subtle background chip) so it's legible without changing the overall palette. This is a CSS-only fix in whatever component renders the book page header — handle it in the parent session directly, not inside the Group A/B content subagents below, since it's unrelated to example authoring.

## Hard caps — do not exceed
- **2-4 examples per topic. Ceiling, not target.**
- **One section only this session:** Journeyman → Databases
- **Topics (confirmed from `data/knowledge_base.json`, section = `databases`, all at 0 examples — 8 total):**

**Group A (4 topics):**
  - `relational_vs_nonrelational` — Relational vs Non-Relational Databases
  - `tables_rows_columns_keys` — Tables, Rows, Columns, Primary/Foreign Keys
  - `basic_sql_crud` — Basic SQL: SELECT, INSERT, UPDATE, DELETE
  - `joins` — Joins

**Group B (4 topics):**
  - `indexes` — Indexes
  - `acid_properties_transactions` — ACID Properties & Transactions
  - `normalization_1nf_2nf_3nf` — Normalization (1NF/2NF/3NF)
  - `nosql_database_types` — NoSQL Database Types: Document, Key-Value, Column, Graph

- **Max 2 subagents running at once — use the A/B split above.**
- **Stop and checkpoint at the end of this section** — no auto-continue into Web

## Context discipline
- Parent session reads the Chronicle and schema **once**
- Each subagent gets only its assigned group (A or B), the example schema, and the content-writing rules below — not the full Chronicle, not the full knowledge base
- No subagent re-derives project history from scratch

## Content-writing rules
- `prompt` requires actually applying the concept, not restating the topic's `explanation`
- Vary question shape by topic type — no single templated structure repeated across the section
- Match existing dual-layer voice: plain-English + real technical term, no filler
- `key_concepts` (3-6) + `answer_bank` (2-4 differently-phrased acceptable answers) per example
- For SQL-bearing topics (`basic_sql_crud`, `joins`, `indexes`, `normalization_1nf_2nf_3nf`): no in-browser SQL execution exists in this app, so these are NOT "code topics" in the Forge B execution sense — write them as trace/predict-the-result/spot-the-bug reasoning prompts (showing sample tables + a query, asking what it returns or what's wrong), graded via the offline answer-bank/key-concept engine like prose, not run through `solution_code` execution/`expected_output` verification.
- Remember the Expert-tier merge quirk: Expert uses `language_tracks`, not a flat `topics` array — any merge script must skip/branch for tiers without `topics`.

## End-of-session checklist
- [ ] Every topic in this section has 2-4 examples (not more)
- [ ] Schema validation passes (no empty strings, correct field types)
- [ ] Self-audit for voice/quality, not just structural validity
- [ ] Resume table in `FORGE_E_SESSION_TEMPLATE.md` updated
- [ ] Chronicle logged
- [ ] Stopped — did not continue into Web
