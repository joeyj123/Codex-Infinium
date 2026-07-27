# Claude Code Kickoff — Codex Infinium: Novice / Software Section (Content Expansion — DRAFT + MERGE)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 3 target topic IDs still match and pull the exact current `explanation` text for enough completed topics (at minimum the full Networking section, plus `what_is_a_computer`, `cpu_basics`) to check closer-phrase and misconceptions-framing variety before drafting. There are now 36 completed topics — read efficiently, but check thoroughly.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft and merge expanded content for the **Software** section of the Novice tier — 3 topics: `what_is_a_program`, `browser_vs_app`, `what_is_an_update`. This is the section immediately following the completed Networking section.

**Draft + merge in one pass, per the current default.** Draft all 3 topics, self-check word count and closer/misconception variety as you go, briefly present the drafts, then merge directly into `knowledge_base.json` in this same session and recalculate `min_read_seconds` from the confirmed real pace. No separate checkpoint needed unless something looks genuinely off and you want Joey's input before merging.

**Content structure — apply to all 3 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic — **verify word count during drafting, not after**; nearly every section so far has come in short on the first pass and needed genuine added content, so build the check in as you draft, not as a fix-up step afterward
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 3, or repeat one already used in any of the 36 completed topics** (check against all of them before finalizing — note `cpu_basics`/`ram_vs_storage` share "If you remember one thing from this topic, remember this:", the known repeat to avoid)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward where genuinely relevant: `what_is_a_program` is the conceptual root (ties back to Firmware/OS's software-vs-firmware-vs-hardware layering, and to CLI's terminal-vs-GUI distinction as two ways of running programs); `browser_vs_app` builds on it directly (a browser as a program that runs other "programs" — web apps — inside itself, distinct from natively installed apps); `what_is_an_update` closes the section and ties back to Firmware's BIOS/UEFI update discussion as a contrast (software updates vs. firmware updates, revisited from the software side this time)

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields on these 3 topics
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 3 drafts briefly with word counts per topic, flag which closers/framing you used where.
- Recalculate `min_read_seconds` using the confirmed real pace (≈9.79 words/sec — confirm against the live file rather than assuming it still holds at this topic count).
- Update the Chronicle with a new session entry (Software section done, Novice topic count updated, next queued section: History, 7 topics).

---

### Process reminders
- PowerShell testing, no `&&` chaining
