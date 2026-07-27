## Codex Infinium — Master Tier Content-Depth Expansion, Batch 1: Patterns / Systems / Security

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes the completed Expert tier (56/56) approach and the Master tier's two-workstream plan (content-depth now, Forge examples authored from scratch in a separate later pass).
2. Read the attached `knowledge_base.json` — pull the actual topic IDs and current word counts from `tiers[].id === "master"` → `topics` directly, filtered to `section` in `patterns`/`systems`/`security`. Do NOT trust the list below as ground truth without checking — recent batches (C#, C++) both found the provided ID list didn't match the live file.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (`tiers[].id === "master"` → `topics`, sections `patterns`/`systems`/`security`)

**Current task:**
Expand the 18 Master topics in `patterns`, `systems`, and `security` sections from their current ~325-425 word `explanation` fields to 900-1800 words each, same 5-part skeleton as every prior tier: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout. This is content-depth only — do NOT author any Forge examples in this pass; example authoring for Master is a separate, later workstream so it can be grounded in the final expanded text rather than the current short version.

Best-guess topics (VERIFY against the live file first):
- patterns: what_is_a_design_pattern, singleton_pattern, factory_pattern, observer_pattern, mvvm_and_other_variants, anti_patterns
- systems: scalability_basics, load_balancing, caching_at_scale, cdns, microservices_vs_monolith, message_queues
- security: common_vulnerabilities, encryption_basics, password_hashing, https_tls, least_privilege_principle, api_keys_secrets_management

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — everything else (`hint`, `xp`, `game_type`, `page_intro`, empty `examples`) stays unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec.
- Self-check word count (900-1800) during drafting — every batch so far has needed top-ups on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman/all 5 Expert tracks), not just this batch.
- Don't touch any other tier or section, or Expert's language_tracks.
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new, and flag if topic IDs differed from the best-guess list above.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted: note Batch 1 completion (18/34 Master topics), word-count range achieved, and set "next step" to Batch 2 (performance/devops/advanced_ai, 16 topics).
