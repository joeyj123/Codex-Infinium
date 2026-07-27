# Claude Code Kickoff — Codex Infinium: Novice / Hardware Section, Remaining 8 (MERGE ONLY)

Copy/paste this at the start of the session. The 8 remaining Hardware topics were already drafted and approved by Joey in a prior session; that work is not lost, it's embedded below. Your job this session is verification + merge, not drafting.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 8 target topic IDs still exist and check the current real words-per-second pace across completed topics (should be ≈9.79 wps per the last several sessions, but confirm against the live file rather than assuming).
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Merge the 8 already-approved Hardware topic explanations below into `data/knowledge_base.json`, replacing the existing `explanation` field for each topic ID. These were drafted and reviewed last session — content itself is final, do not rewrite or rephrase it. This closes out the long-outstanding Hardware gap (10/10 topics done once merged).

For each of the 8 topics:
1. Replace the `explanation` field with the full text for that topic ID (see the companion drafts — same content already shared and approved in chat).
2. Recalculate `min_read_seconds` from the new word count, using the confirmed real words-per-second pace from the live file.
3. Leave `hint`, `page_intro`, XP fields, and everything else on these 8 topics untouched.

Word counts going in: `motherboard` 1025, `gpu_basics` 1067, `transistors_logic_gates` 991, `binary_basics` 1030, `binary_to_electricity` 1045, `storage_hardware_ssd_hdd` 1023, `io_devices_usb` 1007, `displays_basics` 1038.

**Constraints / things not to break:**
- Don't touch any other section's topics, including the already-completed `cpu_basics`/`ram_vs_storage`
- Don't touch `hint`, `page_intro`, XP fields on these 8 topics
- Don't touch Forge examples data for these topics if any already exist
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work — REQUIRED, every session, no exceptions:**
- Confirm all 8 topics merged successfully and `min_read_seconds` was recalculated per the confirmed real pace.
- Update `CHRONICLE_OF_INFINIUM.md` yourself before ending the session — add a new session entry (Hardware section fully closed out, 10/10 topics, Novice now at 34/57 expanded, next queued section: Networking, 12 topics). Do this even if the change seems minor. Don't wait to be asked.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- This session's scope is merge + verification only — do not rewrite or "improve" the content
- **Note**: the full 8 drafts are long — they're in the companion file `hardware_remaining_8_drafts.md` attached alongside this prompt. Read that file for the exact text to merge for each topic ID.
