# Claude Code Kickoff — Codex Infinium: Novice Glossary Expansion (Firmware → Physics)

Copy/paste this at the start of the session.

---

**Before writing any code:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth on project state, structure, rules, and open items. Pay specific attention to the Forge C session entries describing the existing glossary mechanism and Novice/Hardware-era content.
2. Read the actual current `data/glossary.json` in full — this is the existing 80-term Hardware-era glossary; new entries must follow its exact schema and de-duplication conventions.
3. Read the actual current `data/knowledge_base.json` for all Novice topics in Firmware, OS, CLI, Networking, Software, History, and Physics — this is the newly-expanded content (47 topics) that has zero glossary coverage right now.
4. Do not regress or undo prior fixes noted in the Chronicle (Study Rework changes, glossary popover fix, Forge mechanics, progress/XP system).

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- data/glossary.json
- data/knowledge_base.json

I just attached these files if you need them.

**Current task:**
Extend `data/glossary.json` with new terms extracted from the 47 Novice topics across Firmware, OS, CLI, Networking, Software, History, and Physics — all of which were expanded to the 5-part textbook standard after the original Forge C glossary pass (which only covered Hardware). This closes the gap flagged in the Chronicle backlog and explicitly deferred until all 57 Novice topics were done.

**Follow the exact same rules Forge C established:**
- Extract terms from the *existing* `explanation` text in these 47 topics — don't invent new vocabulary the topics don't already cover.
- Schema: `id`, `term`, `aliases`, `definition` (short, dual-layer, lookup-card length — not a re-run of the full topic explanation), `technical_term`, `tier_introduced` (all "novice" here), `topic_id`.
- De-duplicate against the *existing* 80 Hardware-era terms first — if a term from this new content is already covered (e.g. "voltage" is likely already in the glossary from `binary_to_electricity` or `electricity_basics` overlap), don't create a duplicate entry; only add genuinely new terms.
- De-duplicate within this new batch too — if the same term shows up in multiple new sections (e.g. "packet" likely appears in both `what_is_internet` and `arpanet_to_internet`), write **one** entry and point `topic_id` at wherever it's taught most thoroughly or first, per the existing convention.
- Skip words that are already plain English with no real technical weight — same judgment call as Forge C, no fixed per-topic quota. Expect roughly 90-160 new terms across 47 topics (Forge C's Hardware pass found ~80 terms across 10 topics, and several of these sections — Networking and Physics especially — are dense with genuinely new vocabulary).
- No mechanism changes: `lib/glossary.js`'s highlighting logic, `components/GlossaryTerm.js`'s popover, and the Dictionary tab in the Utility Drawer already work generically off `glossary.json` — this is a content-only addition, the rendering pipeline needs no changes.

**Content authoring — work section by section, in this order:** Firmware (3 topics) → OS (10) → CLI (3) → Networking (12) → Software (3) → History (7) → Physics (8). Read each section's topics, extract terms, write entries, before moving to the next section — this keeps de-duplication decisions grounded in what's actually been read rather than working from memory across the whole batch.

**No subagents for this session** — same usage-conservation reasoning as the last content session. Sequential work only.

**Constraints / things not to break:**
- Don't touch `knowledge_base.json` at all this session — this is glossary-only
- Don't touch the existing 80 Hardware-era glossary entries unless one is a genuine duplicate that needs merging (flag any such case explicitly rather than silently editing)
- Don't touch the glossary highlighting mechanism, popover component, or Utility Drawer Dictionary tab code
- No changes to `lib/forgeXp.js` — glossary lookups stay explicitly non-gamified, no XP tied to them, per Forge C's original scope

**After the work:**
- Report the final term count added, broken down by section.
- Flag any de-duplication judgment calls made (terms merged into an existing entry, or terms that seemed borderline on the "worth a glossary entry" threshold).
- Confirm in-browser that highlighting works on at least one topic from a section that previously had zero glossary coverage (e.g. confirm a term in `bios_uefi` or `what_is_internet` now highlights and pops up correctly).
- Update the Chronicle with a new session entry: Novice glossary now covers all 57 topics (Hardware's original 80 + this session's new terms), noting the final total term count. Remove or update the backlog item that flagged this as deferred.

---

### Process reminders
- PowerShell testing, no `&&` chaining
- No subagents — sequential work only
