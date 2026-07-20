# Codex Infinium — Forge E Session: Journeyman → Web
*(Hand this to Claude Code as-is, alongside CHRONICLE_OF_INFINIUM.md and FORGE_E_SESSION_TEMPLATE.md.)*

## Section for this session
**Journeyman → Web** (7 topics, 0 examples currently):

| Topic ID | Title |
|---|---|
| http_methods | HTTP Methods (GET, POST, PUT, DELETE) |
| status_codes | HTTP Status Codes |
| request_response_headers | Request/Response Headers |
| cookies_sessions | Cookies & Sessions |
| auth_vs_authz | Authentication vs Authorization |
| cors | CORS (Cross-Origin Resource Sharing) |
| caching_basics | Caching Basics |

## Hard caps
- 2-4 examples per topic (ceiling, not target)
- This section only — do not continue into concurrency, hardware_callback, or ai_building
- Max 2 subagents in parallel (7 topics splits cleanly: e.g. Group A = http_methods, status_codes, request_response_headers, cookies_sessions; Group B = auth_vs_authz, cors, caching_basics)

## Schema (match exactly — see Databases section for a worked reference)
Each example needs: `id`, `prompt`, `steps` (array), `hints` (array), `solution_summary`, `key_concepts` (3-6), `answer_bank` (2-4 differently-phrased acceptable answers).

## Content-writing rules
- `prompt` requires applying the concept, not restating the topic's `explanation`
- Vary question shape across the 7 topics — don't template one structure
- Match existing dual-layer voice: plain-English + real technical term, no filler
- These are non-code, conceptual/scenario topics (like Databases) — no `solution_code`/`expected_output` needed

## End-of-session checklist
- [ ] All 7 topics have 2-4 examples
- [ ] Schema validation passes
- [ ] Voice/quality self-audit, not just structural validity
- [ ] Update resume table in FORGE_E_SESSION_TEMPLATE.md
- [ ] Log to Chronicle
- [ ] Stop — do not continue into next section
