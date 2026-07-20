# Codex Infinium — Forge E Session Template (reusable)
*(Copy this for every future wave — one section per session. Fill in the bracketed parts. Attach the Chronicle once at the start of the tool session, not per-subagent.)*

## Hard caps — do not exceed
- **2-4 examples per topic. This is a ceiling, not a target.** If a topic naturally supports more, stop at 4 anyway — depth of the existing 2-4 matters more than volume. (Apprentice overshot this to ~9.75/topic average last session — that's the mistake this template exists to prevent.)
- **One section only this session** — not a whole tier. Section: **[fill in, e.g. "Journeyman: Deeper Language Mechanics"]**
- **Max 2 subagents running at once**, or fully sequential if the section is small enough that parallelism isn't worth the coordination overhead
- **Stop and checkpoint at the end of this section** — do not auto-continue into the next section without an explicit "go" from Joey

## Context discipline
- The parent session reads the Chronicle and schema **once**
- Each subagent gets only: its assigned topics, the example schema, and the content-writing rules below — not the full Chronicle, not the full knowledge base
- No subagent re-derives project history from scratch

## Content-writing rules (same as Forge A/A2/B, restated so it can't drift again)
- `prompt` requires actually applying the concept, not restating the topic's `explanation`
- Vary question shape by topic type — don't template one structure across every topic in the section
- Match existing dual-layer voice: plain-English + real technical term, no filler
- `key_concepts` (3-6) + `answer_bank` (2-4 differently-phrased acceptable answers) per example, same as the Forge A2 schema
- For code topics: `solution_code` must actually be run (Python/JS) to verify `expected_output` before merging — don't hand-guess output

## Live resume state (update this each session before handing off)
| Tier | Section | Status |
|---|---|---|
| Apprentice | all 10 sections | done — 69/69 topics, 673 examples (flagged for a quality spot-check, volume was over-target) |
| Journeyman | Deeper Language Mechanics | done — 12/12 topics, 36 examples (3/topic) |
| Journeyman | Data Structures Advanced | done — 3/3 topics, 9 examples (3/topic) |
| Journeyman | Algorithms Advanced | done — 5/5 topics, 15 examples (3/topic) |
| Journeyman | Architecture | done — 14/14 topics, 42 examples (3/topic) |
| Journeyman | Databases | done — 8/8 topics, 20 examples |
| Journeyman | Web | done — 7/7 topics, 14 examples (2/topic) |
| Journeyman | Concurrency | done — 3/3 topics, 6 examples (2/topic) |
| Journeyman | Hardware Callback | done — 9/9 topics, 18 examples (2/topic) |
| Journeyman | AI Building | done — 7/7 topics, 21 examples (3/topic) |
| **Journeyman** | **all 10 sections** | **FULLY DONE — 68/68 topics, 183 examples, 0 topics at zero examples (verified programmatically)** |
| Master | — | not started |
| Legend | — | not started |
| Novice/Expert | re-expansion for new gap-audit topics | not started |
| Study §7 | inline previews | blocked — waits until banks exist for the relevant tier |

## End-of-session checklist
- [ ] Every topic in this section has 2-4 examples (not more)
- [ ] Schema validation passes (no empty strings, correct field types)
- [ ] Self-audit for voice/quality, not just structural validity
- [ ] Resume table above updated
- [ ] Chronicle logged
- [ ] Stopped — did not continue into next section
