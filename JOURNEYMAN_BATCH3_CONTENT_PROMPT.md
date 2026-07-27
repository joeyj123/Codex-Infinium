# Codex Infinium — Journeyman Content-Depth Expansion, Batch 3 (Final)
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files. I just attached these files if you need them.)*

## Scope — this batch: 26 topics — completes Journeyman to 68/68
Sections: **web** (7), **concurrency** (3), **hardware_callback** (9), **ai_building** (7).

Topic IDs:
- web: http_methods, status_codes, request_response_headers, cookies_sessions, auth_vs_authz, cors, caching_basics
- concurrency: concurrency_intro, async_await, rate_limiting
- hardware_callback: memory_addresses_pointers_tieback, infinite_loop_cpu, memory_leak, process_scheduling, virtual_memory_paging, semaphores_mutexes, deadlocks, assembly_machine_instructions, risc_cisc_pipelining_cache
- ai_building: calling_an_api_practically, system_vs_user_prompts, structured_output, prompt_chaining, vector_databases, cost_latency_tradeoffs, vibecoding_backstage

These 26 topics currently sit at 303-483 words. Expand each `explanation` field to the established standard below. Everything else about the topic (id, title, hint, xp, section) stays as-is unless noted.

## Content structure (standard, same as Novice/Apprentice/Journeyman Batches 1-2)
900-1800 words per topic, 5-part skeleton:
1. **Hook** — why this matters / a relatable scenario
2. **Mechanism** — the actual how-it-works, technically precise
3. **Connections** — ties back to prior-tier concepts, only where genuinely relevant (don't force it). Note: hardware_callback topics are explicitly designed to tie back to Novice hardware concepts — connections here should be substantive, not a token line.
4. **Misconceptions** — common wrong mental models, corrected
5. **Recap** — short closing summary

Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every concept — including ordinary-sounding words that carry real technical weight (e.g. "session," "cache," "thread").

## Word-count self-check (mandatory)
Check word count per topic during drafting, not after. Every topic must land in the 900-1800 range before merge.

## Closer-variety check (mandatory)
Before finalizing each topic's recap/closer, check it against the closer style already used across expanded Novice, Apprentice, and Journeyman Batches 1-2 topics (read a sample of already-expanded `explanation` fields in `knowledge_base.json`). Don't reuse the same closing sentence structure repeatedly within this batch either.

## min_read_seconds recalculation
Recalculate `min_read_seconds` for all 26 topics using the real observed reading pace: **9.781 words/sec**.

## Process
- No subagents — draft and merge in this one session.
- Read the current `knowledge_base.json` for the real existing text (don't assume from the Chronicle).
- Don't touch any other tier's topics, Forge examples, glossary data, or app code/mechanics.
- Merge directly into `data/knowledge_base.json`.

## After the work
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` — mandatory, unprompted: note that Journeyman content-depth expansion is now fully complete (68/68 topics, 900-1800 words each), and that the next queued content-depth project is **Expert** (56 topics across 5 language tracks, currently at original 312-409 word depth).
