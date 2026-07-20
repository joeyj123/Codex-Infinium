# Claude Code Kickoff — Codex Infinium: Glossary Follow-Up — Last 5 Gaps + False-Positive Fix

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, including the most recent glossary-expansion session entry (110 terms, 52/57 Novice topics covered).
2. Read the actual current `data/glossary.json` in full.
3. Read the actual current `data/knowledge_base.json` for the 5 specific gap topics: `what_is_a_computer`, `binary_to_electricity`, `storage_hardware_ssd_hdd`, `io_devices_usb`, `displays_basics`.
4. Read `lib/glossary.js` to understand the current word-boundary matching logic before touching it — this is where the false-positive bug lives.
5. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/glossary.json
- data/knowledge_base.json
- lib/glossary.js

I just attached these files if you need them.

**Current task — two small, independent fixes:**

**1. Close the last 5 glossary gap topics.** `what_is_a_computer`, `binary_to_electricity`, `storage_hardware_ssd_hdd`, `io_devices_usb`, and `displays_basics` currently have zero glossary terms. Read each topic's `explanation`, extract genuinely new technical vocabulary not already covered by an existing glossary entry (check aliases too, not just canonical terms), and add entries following the exact existing schema (`id`, `term`, `aliases`, `definition`, `technical_term`, `tier_introduced`, `topic_id`). Expect a small number of terms — these are mostly deep-cut topics already well-covered by adjacent Hardware entries, so don't force entries that don't add real value.

**2. Fix the false-positive highlighting bug.** A previous session found that the word "nor" (as a normal English word, e.g. "neither...nor") was incorrectly matching the NOR-gate glossary alias and getting highlighted mid-word or as a false whole-word match. Investigate `lib/glossary.js`'s matching logic — this is likely a word-boundary detection issue (the existing logic checks non-alphanumeric boundary characters rather than just `\b`, per the Forge C build notes, to handle terms containing `/` or `-`; check whether that broader boundary definition is too permissive for a short common-English word like "nor" matching against a "NOR" alias). Consider whether the fix belongs in the matching logic itself (case-sensitivity or additional boundary strictness for short aliases) or in the glossary data (e.g. removing "nor" as a bare alias for the NOR-gate entry if it's listed there, requiring "NOR gate" or similar instead). Pick whichever fix is more correct and general rather than a one-off patch — there may be other short technical terms with the same collision risk (e.g. "or", "and", "not" as logic-gate terms colliding with the common English words) — check for and fix any of those too if the same root cause applies.

**No subagents for this session** — sequential work only, same usage-conservation reasoning as recent sessions. This is a small task, shouldn't need them anyway.

**Constraints / things not to break:**
- Don't touch `explanation`, `hint`, `page_intro`, or XP fields on any topic
- Don't touch the 110 existing glossary entries unless the false-positive fix requires editing a specific alias (e.g. NOR's) — if so, make the edit surgical and report exactly what changed
- Don't touch the Forge examples gap — that's a separate, still-queued task
- Don't touch `lib/forgeXp.js`

**After the work:**
- Report the new terms added for the 5 gap topics and confirm all 57 Novice topics now have at least one glossary term.
- Report exactly what caused the "nor" false positive and what fix was applied — data change, code change, or both — and confirm whether any other short-word collisions (and/or/not, etc.) were found and fixed the same way.
- Verify in-browser that "nor" in ordinary text no longer highlights, and that legitimate NOR-gate references still highlight correctly.
- Update the Chronicle with a new session entry: Novice glossary now covers all 57/57 topics (final term count), false-positive highlighting bug fixed and documented.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- No subagents
