# Claude Code Kickoff — Codex Infinium: Novice / History + Physics Sections (Content Expansion — DRAFT + MERGE, ONE SHOT)

Copy/paste this at the start of the session.

**Explicit instruction: do NOT use subagents/background agents for this session.** Do all drafting and merging directly, sequentially, in this one conversation. This is a deliberate usage-conservation choice — subagents each carry their own context/usage cost, and combining 15 topics into one prompt is meant to save usage overall, which only works if it stays single-threaded.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm all 15 target topic IDs still match. Given there are now 39 completed topics, you don't need to re-read every single one for closer-checking — read a representative, well-distributed sample (at minimum: `what_is_a_computer`, `cpu_basics`, `ram_vs_storage`, `transistors_logic_gates`, `binary_basics`, `binary_to_electricity`, one Firmware topic, one OS topic, one CLI topic, one full Networking topic, all 3 Software topics) plus, critically, check every closer you write in *this* session against every other closer you write in *this same session* — with 15 new topics going in at once, self-repetition within this batch is the bigger risk, not just repeating something from the 39 already done.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft and merge expanded content for the final two Novice sections, closing out Novice entirely (57/57):

**History (7 topics)**, in order: `mechanical_calculators`, `vacuum_tubes_to_ics`, `punch_cards_to_keyboards`, `arpanet_to_internet`, `pc_boom`, `mobile_era`, `brief_ai_history`.

**Physics (8 topics)**, in order: `silicon_semiconductors`, `doping`, `electricity_basics`, `signals_analog_digital`, `waves_frequency_clock_speed`, `transistor_switching`, `cpu_from_transistors`, `chip_manufacturing`.

**Draft + merge in one pass, per the current default, no subagents.** Draft, self-check word count and closer/misconception variety as you go, briefly present, then merge directly into `knowledge_base.json` and recalculate `min_read_seconds` from the confirmed real pace. Work through History fully first, then Physics — don't interleave — so each section's internal closer-variety check stays manageable.

**Content structure — apply to all 15 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap. For History topics specifically, "mechanism" can lean into *why* an advance happened when it did (what limitation it solved) rather than a physical mechanism — these are historical/narrative topics, not technical-systems ones — but keep dual-layer technical grounding wherever a real technical concept comes up (e.g. what a vacuum tube or an IC actually is). Physics topics are technical-systems topics like Hardware — mechanism should be a real physical mechanism.
- ~1000–1800 words per topic — **verify word count during drafting, not after**; nearly every section so far has come in short on the first pass and needed genuine added content, so build the check in as you draft, every time, for all 15
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **no closer may repeat, anywhere, across any of these 15 topics or any of the 39 already-completed topics** (note `cpu_basics`/`ram_vs_storage` share "If you remember one thing from this topic, remember this:", the known repeat to avoid)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward:
  - **History** is naturally chronological, one continuous arc: `mechanical_calculators` (pre-electronic computation) → `vacuum_tubes_to_ics` (electronic transition, ties to Transistors & Logic Gates / Binary-to-Electricity) → `punch_cards_to_keyboards` (input-method evolution, ties to CLI) → `arpanet_to_internet` (ties directly to Networking's `what_is_internet`) → `pc_boom` (ties to Motherboard/CPU Basics) → `mobile_era` (ties to Cellular Generations) → `brief_ai_history` (closes the section, keep appropriately brief/introductory since deeper AI content is a later tier's focus, not this one's job to cover)
  - **Physics** should build as a physical-foundations arc that deepens (not repeats) the Hardware section's transistor/binary/voltage chain: `silicon_semiconductors` → `doping` (how raw silicon becomes a controllable semiconductor) → `electricity_basics` (voltage/current/circuits as real physics, underneath Binary-to-Electricity's already-covered voltage-as-1-or-0) → `signals_analog_digital` (ties to `binary_to_electricity` and previews Networking's signal concepts) → `waves_frequency_clock_speed` (ties directly to clock speed from CPU Basics/Binary-to-Electricity, now explained as a physical wave phenomenon) → `transistor_switching` (the physical switching mechanism itself, one level deeper than Transistors & Logic Gates' logical description) → `cpu_from_transistors` (ties the whole physical chain back up to a working CPU) → `chip_manufacturing` (closes the section and the entire Novice tier — how a physical chip actually gets made, from silicon wafer to finished product)
  - Physics topics should explicitly go one level *more* physically fundamental than the already-completed Hardware topics covering similar ground (transistors, binary, voltage) — cross-reference those topics directly rather than re-explaining the same content from scratch; each Physics topic should add genuinely new depth, not restate what Hardware already covered

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields on these 15 topics
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred
- No subagents/background agents for this session

**After the work:**
- Present all 15 drafts briefly with word counts per topic (History then Physics), flag which closers/framing you used where, confirm no repeats across all 15 or against the 39 prior topics.
- Recalculate `min_read_seconds` using the confirmed real pace (≈9.78 words/sec — confirm against the live file rather than assuming it still holds at 57 topics).
- Update the Chronicle with a new session entry: **Novice tier content expansion fully complete, 57/57 topics done.** Note what's next per the Chronicle's existing backlog (glossary expansion for post-Hardware Novice content, now unblocked since it was explicitly deferred until all 57 Novice topics were done; Apprentice-tier content work, if that's the next phase Joey wants).

---

### Process reminders
- PowerShell testing, no `&&` chaining
- No subagents — sequential work only, per usage-conservation instruction above
