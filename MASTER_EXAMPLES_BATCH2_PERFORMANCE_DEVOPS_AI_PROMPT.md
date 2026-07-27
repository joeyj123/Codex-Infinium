## Codex Infinium — Master Tier Forge Example Authoring, Batch 2 (FINAL): Performance / DevOps / Advanced AI

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes Batch 1's completion (patterns/systems/security, 18/34 topics with examples, 54 total).
2. Read the attached `knowledge_base.json` — pull the current, fully-expanded `explanation` text for these 16 topics directly (`tiers[].id === "master"` → `topics`, sections `performance`/`devops`/`advanced_ai`) to ground examples in the real content.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (`tiers[].id === "master"` → `topics`, sections `performance`/`devops`/`advanced_ai`)

**Current task:**
Author 3 examples per topic (matching Batch 1's density) for the 16 Master topics in `performance`, `devops`, and `advanced_ai` sections (currently `examples: []`). Same schema as Batch 1, no new mechanism: `id`, `prompt`, `steps`, `hints`, `solution_summary`, `key_concepts`, `answer_bank`. Prose/scenario-based, no code execution fields — this content is conceptual/architectural, same as Batch 1.

Topics (16, verify against live file):
- performance: profiling, premature_optimization, caching_vs_precomputation, database_query_optimization, concurrency_at_scale
- devops: what_is_devops, cicd_pipelines, containers_docker, what_is_the_cloud_infrastructure, infrastructure_as_code, monitoring_alerting
- advanced_ai: evaluating_ai_models, multi_agent_systems, retrieval_systems_at_scale, ai_safety_alignment_intro, responsible_ai_deployment

**Constraints / things not to break:**
- Only add to `examples` per topic — don't touch `explanation`, `hint`, `xp`, `game_type`, `page_intro`, or `min_read_seconds`.
- Ground every example in the topic's actual expanded `explanation` content.
- Verify programmatically: every example has all 7 required fields, exactly 3 examples per topic, correctly-prefixed IDs.
- Don't touch any other tier, Expert's language_tracks, or the 18 Master topics already completed in Batch 1.
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what was authored in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted: mark Master tier as fully complete on BOTH workstreams (34/34 content-depth, 34/34 with examples), note total example count, and set "next step" to Legend tier (18 topics — the only tier remaining for both content-depth expansion and example authoring from scratch).
