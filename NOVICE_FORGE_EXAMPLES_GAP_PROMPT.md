# Claude Code Kickoff — Codex Infinium: Novice Forge Examples Gap — Audit + Close

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items. Find the backlog entry referencing "Novice's 15-topic example-content gap (gap-audit topics never got Forge examples)" and read any surrounding context on how that gap was originally identified.
2. Read the actual current `data/knowledge_base.json` for all 57 Novice topics — specifically check the `examples` field on every single one.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task — two phases:**

**Phase 1: Audit.** Go through all 57 Novice topics and produce a definitive list of which ones have an empty or missing `examples` field. Report this list back before writing any new content — the "15 topics" figure comes from an earlier session's gap-audit and needs reconfirming against the live file now that Novice content expansion is fully done, since new topics/sections were merged since that count was last taken. Don't assume the old count of 15 is still accurate; report the real current number and the exact topic IDs.

**Phase 2: Close the gap.** For whichever topics Phase 1 identifies as missing examples, author 2-4 examples each, following the exact same format, fields, and grading approach established in Forge A (`answer_bank`, `key_concepts`, three exposure levels — Guided/Challenge/Gauntlet) and refined in Forge A2 (offline word-overlap grading). Match the tone and difficulty of the existing 98 Novice examples already in the file — read a handful of those first as a reference before drafting new ones.

**No subagents for this session** — sequential work only, same usage-conservation reasoning as recent content sessions.

**If Phase 1 finds a large number of missing-example topics** (double digits), draft and merge in batches of 5-6 topics rather than all at once, to keep each merge verifiable — check with Joey only if the real count is meaningfully different from the expected ~15, otherwise proceed.

**Constraints / things not to break:**
- Don't touch `explanation`, `hint`, `page_intro`, or XP fields on any topic — this session is `examples` field only
- Don't touch any non-Novice tier
- Don't touch the Forge grading mechanism (`lib/grading.js`, `lib/forgeXp.js`) — reuse it as-is
- Match existing example schema exactly — don't introduce new fields

**After the work:**
- Report the confirmed real count and list of topics that had the gap, and confirm all now have examples.
- Report total new example count added.
- Update the Chronicle with a new session entry: Novice Forge example gap closed, confirm all 57 Novice topics now have both `explanation` and `examples` populated — Novice is now fully complete in every dimension (content + examples + glossary, if the glossary session already ran).

---

### Process reminders
- PowerShell testing, no `&&` chaining
- No subagents — sequential work only
