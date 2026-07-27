# Claude Code Kickoff — Codex Infinium: Novice / Firmware Section (Content Expansion)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — it's the current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — do not assume topic IDs or existing field values from any doc. The Chronicle describes intent/history; the file is ground truth.
3. Confirm the 3 target topics still match: `firmware_vs_software_hardware`, `bios_uefi`, `boot_process`. If IDs differ in the live file, use the live file's IDs and flag the mismatch.
4. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system) unless this task explicitly asks you to change that.
5. Propose the 3 topics' expanded content for review before merging into `knowledge_base.json`.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Expand the **Firmware** section of the Novice tier — 3 topics: `firmware_vs_software_hardware`, `bios_uefi`, `boot_process`. Rewrite each topic's `explanation` field to the current content standard (see below). This is the section immediately following the completed Hardware section (10/10 done).

**Content structure — apply to all 3 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across topics** (standing instruction from prior session; last batch reused "The takeaway" on two topics — avoid repeating any closer phrase within this batch or against recently-completed Hardware topics)
- Vary how each topic frames its misconceptions section — don't template the setup line

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields, or `min_read_seconds` unless word count changes require recalculating `min_read_seconds`
- Don't touch Forge examples data for these topics if any already exist
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work — REQUIRED, every session, no exceptions:**
- Summarize what changed in plain English + the real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself before ending the session — add a new session entry (Firmware section done, topic count update: 13/57 Novice topics expanded, what's next: OS section, 10 topics). Do this even if the change seems minor. Don't wait to be asked.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- Checkpoint here — wait for explicit go-ahead before merging into the live `knowledge_base.json`, per the "one section per session" standing rule
