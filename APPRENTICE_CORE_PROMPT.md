# Claude Code Kickoff — Codex Infinium: Apprentice / Core Programming Concepts (Content Expansion — DRAFT + MERGE)

Copy/paste this at the start of the session.

**No subagents for this session** — sequential work only, same usage-conservation reasoning as recent Novice sessions.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items. This is the first Apprentice-tier content session; Novice is now fully complete (content, examples, glossary) as documented there.
2. Read the actual current `data/knowledge_base.json` — confirm the 13 target topic IDs still match. Also read a representative sample of completed Novice topics (at minimum `what_is_a_computer`, `cpu_basics`, `binary_basics`, one Firmware topic, one OS topic, one Networking topic, one Software topic) to establish voice/style continuity into Apprentice, plus check closer-phrase variety — Apprentice topics should not repeat any closer already used anywhere in Novice's 57 topics.
3. Confirm current Apprentice content status: all 69 Apprentice topics are currently at the original ~350-450 word depth from the global Content Depth Rewrite pass, not yet expanded to the 5-part textbook standard. Forge examples for Apprentice are already complete (673 examples per the Chronicle) — this session is `explanation` field expansion only, do not touch `examples`.
4. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft and merge expanded content for the **Core Programming Concepts** section of the Apprentice tier — 13 topics, in this order: `what_is_a_language`, `compilers_vs_interpreters`, `source_to_machine_runtime`, `variables_data_types`, `data_in_memory`, `operators`, `conditionals`, `loops`, `functions_scope`, `comments_documentation`, `pseudocode_algorithmic_thinking`, `errors_debugging`, `package_managers_dependencies`. This is the first section of Apprentice, immediately following the now-fully-complete Novice tier.

**Draft + merge in one pass, per the current default, no subagents.** Draft all 13 topics, self-check word count and closer/misconception variety as you go, briefly present, then merge directly into `knowledge_base.json` and recalculate `min_read_seconds` from the confirmed real pace.

**Content structure — apply to all 13 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic — **verify word count during drafting, not after**; every Novice section came in short on the first pass and needed genuine added content, so build the check in as you draft, from the start this time
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 13, or repeat one already used anywhere in Novice's 57 completed topics** (note `cpu_basics`/`ram_vs_storage` share "If you remember one thing from this topic, remember this:", the known repeat to avoid — this phrase and every other Novice closer are off-limits)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward, both within this section and back into Novice: `what_is_a_language` opens the section and should connect back to Novice's `what_is_a_program`/`browser_vs_app` (Software section) as the natural bridge from "what a program is" to "what a programming language is"; `compilers_vs_interpreters` → `source_to_machine_runtime` form a tight pair (how source code becomes something a CPU runs — ties back to Novice's `cpu_from_transistors`/`binary_basics`); `variables_data_types` → `data_in_memory` connect to Novice's `ram_vs_storage`/Memory Management-equivalent content; `operators` → `conditionals` → `loops` form the core control-flow chain; `functions_scope` builds on that; `comments_documentation` is a lighter, practice-oriented topic; `pseudocode_algorithmic_thinking` bridges toward algorithmic reasoning generally; `errors_debugging` and `package_managers_dependencies` close the section on practical, real-world programming concerns

**Constraints / things not to break:**
- Don't touch any Novice-tier topics
- Don't touch `examples`, `hint`, `page_intro`, XP fields on these 13 topics — Apprentice examples are already complete, do not modify them
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 13 drafts briefly with word counts per topic, flag which closers/framing you used where.
- Recalculate `min_read_seconds` using the confirmed real pace from Novice's completed topics (last confirmed ≈9.78 words/sec — confirm against the live file).
- Update the Chronicle with a new session entry: Apprentice content expansion begun, Core Programming Concepts section done (13/69 Apprentice topics expanded), next queued section: Language Landscape (12 topics).

---

### Process reminders
- PowerShell testing, no `&&` chaining
- No subagents
