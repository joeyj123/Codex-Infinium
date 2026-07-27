## Codex Infinium — Master Tier Content-Depth Expansion, Batch 2 (FINAL): Performance / DevOps / Advanced AI

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes Master Batch 1's completion (patterns/systems/security, 18/34 done).
2. Read the attached `knowledge_base.json` — pull the actual topic IDs and current word counts from `tiers[].id === "master"` → `topics`, filtered to `section` in `performance`/`devops`/`advanced_ai`. Confirm against the live file rather than trusting the list below.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (`tiers[].id === "master"` → `topics`, sections `performance`/`devops`/`advanced_ai`)

**Current task:**
Expand the 16 Master topics in `performance`, `devops`, and `advanced_ai` sections from their current ~325-425 word `explanation` fields to 900-1800 words each, same 5-part skeleton as every prior batch: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout. Content-depth only — do NOT author Forge examples here; that's a separate later workstream covering all 34 Master topics at once, after content is fully done.

Best-guess topics (verify against the live file first):
- performance: profiling, premature_optimization, caching_vs_precomputation, database_query_optimization, concurrency_at_scale
- devops: what_is_devops, cicd_pipelines, containers_docker, what_is_the_cloud_infrastructure, infrastructure_as_code, monitoring_alerting
- advanced_ai: evaluating_ai_models, multi_agent_systems, retrieval_systems_at_scale, ai_safety_alignment_intro, responsible_ai_deployment

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — everything else (`hint`, `xp`, `game_type`, `page_intro`, empty `examples`) stays unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec.
- Self-check word count (900-1800) during drafting — every batch so far has needed top-ups on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman/all 5 Expert tracks/Master Batch 1), not just this batch.
- Don't touch any other tier, or the 18 already-expanded Master topics from Batch 1.
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new, and flag if topic IDs differed from the best-guess list above.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted: mark Master tier content-depth expansion as fully complete (34/34), note word-count range achieved, and set "next step" to scoping the Master Forge example-authoring workstream (34 topics, 0 examples, needs its own dedicated plan — likely following the Forge A pattern: 2-4 examples/topic, answer-bank + key-concepts grading, no code execution since Master is conceptual).
