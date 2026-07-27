# Codex Infinium — Forge E Session: Journeyman → Concurrency
*(Hand this to Claude Code as-is, alongside CHRONICLE_OF_INFINIUM.md and FORGE_E_SESSION_TEMPLATE.md.)*

## Section for this session
**Journeyman → Concurrency** (3 topics, 0 examples currently):

| Topic ID | Title |
|---|---|
| concurrency_intro | Concurrency: Doing Multiple Things at Once |
| async_await | Async/Await |
| rate_limiting | Rate Limiting |

## Hard caps
- 2-4 examples per topic (ceiling, not target)
- This section only — do not continue into hardware_callback or ai_building
- Only 3 topics — run sequentially, no subagent split needed

## Schema (match exactly — see Databases/Web sections for a worked reference)
Each example needs: `id`, `prompt`, `steps` (array), `hints` (array), `solution_summary`, `key_concepts` (3-6), `answer_bank` (2-4 differently-phrased acceptable answers).

## Content-writing rules
- `prompt` requires applying the concept, not restating the topic's `explanation`
- Vary question shape across the 3 topics — don't template one structure
- Match existing dual-layer voice: plain-English + real technical term, no filler
- Conceptual/scenario topics (like Databases/Web) — no `solution_code`/`expected_output` needed

## End-of-session checklist
- [ ] All 3 topics have 2-4 examples
- [ ] Schema validation passes
- [ ] Voice/quality self-audit, not just structural validity
- [ ] Update resume table in FORGE_E_SESSION_TEMPLATE.md
- [ ] Log to Chronicle
- [ ] Stop — do not continue into next section
