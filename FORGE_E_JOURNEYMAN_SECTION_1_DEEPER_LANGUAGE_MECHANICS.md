# Codex Infinium — Forge E Session: Journeyman §1

## Hard caps — do not exceed
- **2-4 examples per topic. Ceiling, not target.** (Apprentice hit ~9.75/topic — do not repeat that.)
- **One section only this session:** Journeyman → Deeper Language Mechanics
- **Max 2 subagents running at once**, or fully sequential if the section is small
- **Stop and checkpoint at the end of this section** — no auto-continue into Software Architecture

## Before starting
- Pull the actual topic list/IDs for Journeyman → Deeper Language Mechanics from `data/knowledge_base.json` — do not guess topic names or count from memory/handoff docs. Confirm the count before authoring.

## Context discipline
- Parent session reads the Chronicle and schema **once**
- Each subagent gets only: its assigned topics, the example schema, and the content-writing rules below — nothing else
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
- [ ] Stopped — did not continue into Software Architecture
