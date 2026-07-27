## Codex Infinium — Master Tier Forge Example Authoring, Batch 1: Patterns / Systems / Security

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth. Master's content-depth expansion is fully complete (34/34); this session is a *different* workstream: authoring Forge examples from scratch for the first time on this tier (currently 0 examples on all 34 topics).
2. Read the attached `knowledge_base.json` — pull the current, fully-expanded `explanation` text for these 18 topics directly (`tiers[].id === "master"` → `topics`, sections `patterns`/`systems`/`security`) to ground examples in the real content, not summaries. Also read one existing Novice example (any topic with populated `examples`) to match the exact field schema.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (`tiers[].id === "master"` → `topics`, sections `patterns`/`systems`/`security`; also inspect any Novice topic's `examples` array for schema reference)

**Current task:**
Author 2-4 examples per topic for the 18 Master topics in `patterns`, `systems`, and `security` sections (currently `examples: []` on all of them). No new mechanism needed — this reuses the existing Forge A2 schema and grading engine (`lib/grading.js`'s word-overlap/key-concept checklist approach), same as Journeyman's and Novice's example content. Master has no code-teaching content, so this is prose/scenario-based like Novice/Apprentice/Journeyman, not like Expert's code examples — no execution, no `starter_code`/`solution_code` fields needed.

Each example needs (match the exact schema of an existing Novice example — confirm field names from the file, don't assume from memory):
- `id` (e.g. `singleton_pattern_ex1`)
- `prompt` — a concrete scenario/question
- `steps` — a fully worked walkthrough (this is what Guided mode shows proactively, Challenge/Gauntlet gate behind user action)
- `hints` — 2-3 hints
- `solution_summary` — one-line answer recap
- `key_concepts` — terms the grading checklist looks for
- `answer_bank` — 2-4 differently-phrased acceptable answers for word-overlap grading

Topics (18, verify against live file — matched exactly last two batches, but confirm anyway):
- patterns: what_is_a_design_pattern, singleton_pattern, factory_pattern, observer_pattern, mvvm_and_other_variants, anti_patterns
- systems: scalability_basics, load_balancing, caching_at_scale, cdns, microservices_vs_monolith, message_queues
- security: common_vulnerabilities, encryption_basics, password_hashing, https_tls, least_privilege_principle, api_keys_secrets_management

**Constraints / things not to break:**
- Only add to `examples` per topic — don't touch `explanation`, `hint`, `xp`, `game_type`, `page_intro`, or `min_read_seconds`.
- Ground every example in the topic's actual (already-expanded) `explanation` content — don't invent scenarios unrelated to what's taught.
- Verify programmatically: every example has all required fields, 2-4 examples per topic, correct topic-id-prefixed example ids.
- Don't touch any other tier, Expert's language_tracks, or the 16 remaining Master topics (performance/devops/advanced_ai — Batch 2, separate session).
- Draft-and-merge in one session, no subagents (per standing process).
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what was authored in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted: note Batch 1 completion (18/34 Master topics with examples, total example count), and set "next step" to Batch 2 (performance/devops/advanced_ai, 16 topics).
