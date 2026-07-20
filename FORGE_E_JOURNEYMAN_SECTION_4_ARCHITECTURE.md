# Codex Infinium — Forge E Session: Journeyman §4

## Hard caps — do not exceed
- **2-4 examples per topic. Ceiling, not target.**
- **One section only this session:** Journeyman → Architecture
- **Topics (confirmed from `data/knowledge_base.json`, section = `architecture`, all at 0 examples — 14 total):**

**Group A (7 topics):**
  - `separation_of_concerns` — Separation of Concerns
  - `what_is_state` — What "State" Means in an App
  - `mvc_pattern` — MVC Pattern (Model-View-Controller)
  - `building_an_api` — Building an API
  - `middleware` — What Middleware Is
  - `error_handling_patterns` — Error Handling Patterns (try/catch/exceptions)
  - `logging` — Logging

**Group B (7 topics):**
  - `testing_unit_tests` — Testing: Unit Tests & Coverage
  - `environment_variables_config` — Environment Variables & Config
  - `software_development_lifecycle` — The Software Development Lifecycle
  - `agile_scrum_practically` — Agile & Scrum, Practically
  - `code_review_practice` — Code Review as a Practice
  - `software_licensing` — Software Licensing: MIT, GPL & Proprietary
  - `accessibility_a11y` — Accessibility (a11y) as an Engineering Requirement

- **Max 2 subagents running at once — use the A/B split above.**
- **Stop and checkpoint at the end of this section** — no auto-continue into Databases

## Context discipline
- Parent session reads the Chronicle and schema **once**
- Each subagent gets only its assigned group (A or B), the example schema, and the content-writing rules below — not the full Chronicle, not the full knowledge base
- No subagent re-derives project history from scratch

## Content-writing rules
- `prompt` requires actually applying the concept, not restating the topic's `explanation`
- Vary question shape by topic type — no single templated structure repeated across the section
- Match existing dual-layer voice: plain-English + real technical term, no filler
- `key_concepts` (3-6) + `answer_bank` (2-4 differently-phrased acceptable answers) per example
- For code topics: `solution_code` must actually be run (Python/JS) to verify `expected_output` before merging — no hand-guessing. Most of these topics are conceptual/practice-oriented (SDLC, Agile, licensing, code review) rather than code-heavy — don't force runnable code where a scenario/reasoning prompt fits better.
- Remember the Expert-tier merge quirk found last session: Expert uses `language_tracks`, not a flat `topics` array — any merge script must skip/branch for tiers without `topics`.

## End-of-session checklist
- [ ] Every topic in this section has 2-4 examples (not more)
- [ ] Schema validation passes (no empty strings, correct field types)
- [ ] Self-audit for voice/quality, not just structural validity
- [ ] Resume table in `FORGE_E_SESSION_TEMPLATE.md` updated
- [ ] Chronicle logged
- [ ] Stopped — did not continue into Databases
