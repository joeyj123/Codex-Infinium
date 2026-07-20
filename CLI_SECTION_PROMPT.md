# Claude Code Kickoff — Codex Infinium: Novice / CLI Section (Content Expansion — DRAFT ONLY)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 3 target topic IDs still match and pull the exact current `explanation` text for the completed topics so far (`cpu_basics`, `ram_vs_storage`, `firmware_vs_software_hardware`, `bios_uefi`, `boot_process`, and all 10 OS-section topics) to check closer-phrase and misconceptions-framing variety before drafting.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft expanded content for the **CLI** section of the Novice tier — 3 topics: `what_is_terminal`, `basic_nav_commands`, `what_is_a_shell`. This is the section immediately following the completed OS section.

**This session is DRAFT + PRESENT ONLY — do not write to `knowledge_base.json`.** Per the standing checkpoint rule, present all 3 drafts for review; merging happens in a separate follow-up session after explicit sign-off, unless Joey explicitly says to draft-and-merge in one go.

**Content structure — apply to all 3 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic — **check the word count before presenting**; the last section (OS) came in under the floor on the first pass and needed a genuine added paragraph per topic to fix, so verify length as part of drafting, not after
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 3, or repeat one already used in any of the 15 completed topics** (check against all of them before finalizing)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward where genuinely relevant: `what_is_terminal` naturally sets up `basic_nav_commands` (using the terminal to actually navigate), and `what_is_a_shell` clarifies the terminal/shell distinction people conflate — use that ordering to build on prior concepts within the section rather than re-explaining from scratch each time

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields, or `min_read_seconds` this session unless also merging — see above
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 3 full drafts for review, with word counts per topic.
- Flag which closers/framing you used where, same as prior sessions' summaries, so variety can be spot-checked.
- If merging in this same session (only if explicitly told to), recalculate `min_read_seconds` from the real observed pace and update the Chronicle with a new session entry (CLI section done, Novice topic count updated, next queued section). If draft-only, do NOT update the Chronicle yet — that happens after merge.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- Checkpoint here — wait for explicit go-ahead before any merge runs, unless told otherwise
