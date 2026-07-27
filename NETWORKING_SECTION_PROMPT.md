# Claude Code Kickoff — Codex Infinium: Novice / Networking Section (Content Expansion — DRAFT ONLY)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items.
2. Read the actual current `data/knowledge_base.json` — confirm the 12 target topic IDs still match and pull the exact current `explanation` text for all 24 completed topics so far (pilot, full Hardware x10, Firmware x3, OS x10) to check closer-phrase and misconceptions-framing variety before drafting. This is the largest completed-topic set checked against yet.
3. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Draft expanded content for the **Networking** section of the Novice tier — 12 topics: `what_is_internet`, `ip_addresses`, `server_vs_client`, `what_is_the_cloud`, `dns`, `wifi_basics`, `bluetooth_basics`, `ports_networking`, `tcp_vs_udp`, `mac_vs_ip_address`, `cellular_generations`, `osi_tcpip_layers`. This is the section immediately following the now-complete Hardware section, and the largest single section drafted so far.

**This session is DRAFT + PRESENT ONLY — do not write to `knowledge_base.json`.** Per the standing checkpoint rule, present all 12 drafts for review; merging happens in a separate follow-up session after explicit sign-off, unless Joey explicitly says to draft-and-merge in one go.

**Content structure — apply to all 12 topics:**
- 5-part skeleton: hook → mechanism → connections → misconceptions → recap
- ~1000–1800 words per topic — **verify word count during drafting, not after**; multiple prior sections have come in short on the first pass and needed genuine added content to fix, so build the check into the drafting process itself
- Dual-layer always: plain-English analogy AND the real technical term, spelled out, for every technical concept — including ordinary-sounding words that carry real CS weight
- Vary connective/transitional language and recap-closer phrasing topic-to-topic — **do not reuse a closer verbatim across any of these 12, or repeat one already used in any of the 24 completed topics** (check against all of them before finalizing — note `cpu_basics`/`ram_vs_storage` share "If you remember one thing from this topic, remember this:", already flagged as the known repeat to avoid)
- Vary how each topic frames its misconceptions section — don't template the setup line
- Building-forward where genuinely relevant, given this section's natural structure: `what_is_internet` opens the section broadly; `server_vs_client` and `what_is_the_cloud` build on it conceptually; `ip_addresses` → `dns` → `mac_vs_ip_address` form a natural addressing chain; `ports_networking` and `tcp_vs_udp` pair naturally (how data is routed to the right program, and how it's actually transmitted); `wifi_basics`, `bluetooth_basics`, and `cellular_generations` cover the physical/wireless layer; `osi_tcpip_layers` is a natural capstone for the section, tying the whole chain together as a layered model — consider ordering the draft (and the in-app section order, if it doesn't already match) to build concept-on-concept rather than jumping around

**Constraints / things not to break:**
- Don't touch any other section's topics
- Don't touch `hint`, `page_intro`, XP fields, or `min_read_seconds` this session unless also merging — see above
- Don't touch Forge examples data
- No changes to `lib/forgeXp.js` — XP retune stays deferred

**After the work:**
- Present all 12 full drafts for review, with word counts per topic.
- Flag which closers/framing you used where, same as prior sessions' summaries, so variety can be spot-checked.
- If merging in this same session (only if explicitly told to), recalculate `min_read_seconds` using the confirmed real pace (≈9.79 words/sec, but confirm against the live file rather than assuming it still holds at this topic count) and update the Chronicle with a new session entry (Networking section done, Novice topic count updated, next queued section: Software, 3 topics). If draft-only, do NOT update the Chronicle yet — that happens after merge.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- Checkpoint here — wait for explicit go-ahead before any merge runs, unless told otherwise
- Given this is the largest section yet (12 topics), consider presenting in two batches of 6 if that makes review easier — check with Joey if unsure
