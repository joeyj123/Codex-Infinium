# Claude Code Kickoff — Codex Infinium: Novice / Hardware Section, Remaining 8 (Content Expansion — DRAFT ONLY)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 8 target topic IDs still match, and pull the exact current `explanation` text for all 16 completed topics so far (pilot, `cpu_basics`, `ram_vs_storage`, Firmware x3, OS x10, CLI x3) to check closer-phrase and misconceptions-framing variety before drafting. This is the largest completed-topic set checked against yet — read carefully.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft expanded content for the **remaining 8 Hardware topics** — this closes out the long-outstanding gap from the original pilot session, which only completed `cpu_basics` and `ram_vs_storage` before content work moved on to other sections. The 8 topics: `motherboard`, `gpu_basics`, `transistors_logic_gates`, `binary_basics`, `binary_to_electricity`, `storage_hardware_ssd_hdd`, `io_devices_usb`, `displays_basics`.

**This session is DRAFT + PRESENT ONLY — do not write to `knowledge_base.json`.** Per the standing checkpoint rule, present all 8 drafts for review; merging happens in a separate follow-up session after explicit sign-off, unless Joey explicitly says to draft-and-merge in one go.

**Content structure — apply to all 8 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic — **verify word count during drafting, not after**; the OS session's first pass came in under the floor (733–918 words) and needed genuine added content to fix, so build in the check as you go
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 8, or repeat one already used in any of the 16 completed topics** (check against all of them before finalizing — note that `cpu_basics` and `ram_vs_storage` themselves share an identical closer, "If you remember one thing from this topic, remember this:", flagged as the original example of this problem — do not reuse that phrase either)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward where genuinely relevant: `transistors_logic_gates` → `binary_basics` → `binary_to_electricity` form a natural chain (the physical switch, the number system it represents, how it's actually carried as signal); `motherboard` and `gpu_basics` connect back to the already-completed `cpu_basics`; `storage_hardware_ssd_hdd` connects to the already-completed `ram_vs_storage`; `io_devices_usb` and `displays_basics` connect forward to Networking's and later sections' hardware-adjacent topics where relevant. Use this ordering to build on prior concepts rather than re-explaining from scratch each time.

**Constraints / things not to break:**
- Don't touch any other section's topics, including the already-completed `cpu_basics`/`ram_vs_storage`
- Don't touch `hint`, `page_intro`, XP fields, or `min_read_seconds` this session unless also merging — see above
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 8 full drafts for review, with word counts per topic.
- Flag which closers/framing you used where, same as prior sessions' summaries, so variety can be spot-checked.
- If merging in this same session (only if explicitly told to), recalculate `min_read_seconds` using the confirmed real pace (≈9.79 words/sec, averaged across all completed topics — confirm against the live file rather than assuming this figure still holds once 24 topics are done) and update the Chronicle with a new session entry (Hardware section fully closed out, 34/57 Novice topics, next queued: Networking, 12 topics). If draft-only, do NOT update the Chronicle yet — that happens after merge.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- Checkpoint here — wait for explicit go-ahead before any merge runs, unless told otherwise
