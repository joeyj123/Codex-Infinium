# Claude Code Kickoff — Codex Infinium: Novice / OS Section (Content Expansion — DRAFT ONLY)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 10 target topic IDs still match and pull the exact current `explanation` text for `cpu_basics`, `ram_vs_storage`, `firmware_vs_software_hardware`, `bios_uefi`, and `boot_process` (the completed topics so far) to check closer-phrase and misconceptions-framing variety before drafting.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft expanded content for the **OS** section of the Novice tier — 10 topics: `what_is_an_os`, `processes_threads`, `memory_management`, `file_systems`, `file_paths`, `file_types_extensions`, `container_formats_codecs`, `archives_compression`, `disk_images_iso`, `roms_emulation`. This is the section immediately following the completed Firmware section.

**This session is DRAFT + PRESENT ONLY — do not write to `knowledge_base.json`.** Per the standing checkpoint rule, present all 10 drafts for review; merging happens in a separate follow-up session after explicit sign-off (same two-session pattern used for Firmware, to protect against `/clear` between drafting and merging).

**Content structure — apply to all 10 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 10, or repeat one already used in a completed topic** (check against all 5 completed topics listed above before finalizing, not just against each other)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward where genuinely relevant: several of these topics naturally chain (`what_is_an_os` → `processes_threads`/`memory_management`; `file_systems` → `file_paths` → `file_types_extensions`; `file_types_extensions` → `container_formats_codecs`/`archives_compression`/`disk_images_iso`/`roms_emulation`) — use that ordering to build on prior concepts within the section rather than re-explaining from scratch each time, same as Firmware's 3-topic chain did

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields, or `min_read_seconds` this session — this is drafting only
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 10 full drafts for review, with word counts per topic.
- Flag which closers/framing you used where, same as the Firmware session's summary, so variety can be spot-checked.
- Do NOT update the Chronicle yet — that happens after merge, in the follow-up session, per the two-session pattern.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- Checkpoint here — wait for explicit go-ahead before any merge session runs
