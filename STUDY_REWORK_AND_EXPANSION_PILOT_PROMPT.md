# Codex Infinium — Study Rework + Textbook Expansion Pilot
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files — especially `app/tier/[tierId]/study/page.js`, `components/GlossaryTerm.js`, `lib/ProgressContext.js`, and `data/knowledge_base.json`.)*

## Why this session exists
Five separate decisions from recent planning sessions all touch the same Study rendering code, bundled here into one pass rather than five separate ones:
1. Textbook content expansion (pilot only — 3 topics, not a full-tier rewrite yet)
2. Pagination redesign (remove the "(1 of 2)" indicator and 2-page cap)
3. Remove reading timer gate + reading XP
4. Inline worked examples inside The Study (reuse existing Forge content, read-only)
5. Fix glossary popover text-clipping bug

---

## 1. Content expansion — PILOT ONLY, 3 topics
Rewrite the `explanation` field for exactly these 3 Novice topics, no others this session:
- `what_is_a_computer`
- `cpu_basics`
- `ram_vs_storage`

**Target structure per topic** (real subsections, not just more words in one block):
1. Opening hook/overview — what this is and why it matters (1-2 paragraphs, similar to what exists now)
2. The mechanism — real technical depth, how it actually works step by step
3. How it connects — genuine ties to prior/adjacent topics, only where real
4. Common misconceptions / where beginners trip up
5. Plain-English recap — "if you remember one thing" closer

**Length**: roughly 1000-1800 words, whatever the concept genuinely warrants — don't pad to hit a number, don't force all 3 topics to the same length.

**Keep the dual-layer rule**: plain-English analogy AND the real technical term, always both, same as existing content.

**Do NOT touch**: `hint`, `xp`, `id`, `section`, `title`, `min_read_seconds` field itself for now (recalculating this ties to the pagination rework below), or the `examples` array (already populated for these 3 topics).

**Stop after these 3 and report back** — do not proceed to more topics or other tiers. This is a voice/depth/structure check before any tier-wide rollout.

---

## 2. Pagination redesign
Current behavior: a topic may span up to 2 pages, each showing a "(1 of 2)" style page-count indicator.

**New behavior**:
- Topic header (title) and intro/opening paragraph(s) render once, at the start of the topic — not repeated per page
- Remaining content flows across as many sequential physical pages as it naturally needs to fit — no fixed cap, no page-count indicator
- Reads as continuous chapter flow: page N ends, page N+1 continues the same topic's content, until the topic's content is exhausted, then the next topic begins
- Page-break logic should break at natural paragraph/section boundaries (from the new structure in §1), not mid-sentence or mid-subsection where avoidable

Remove the `.book-page-count` "(1 of 2)"-style UI element entirely (this was the element fixed for contrast a few sessions ago — now being removed rather than kept).

---

## 3. Remove reading timer gate + reading XP
- Remove `min_read_seconds` as a gate on page-turning / marking a page read — reading a page (visiting it) is enough to mark it read, no timer required
- Remove any XP grant tied to reading a page or completing a topic's reading
- **Keep**: tier-unlock still requires every topic in the current tier to have been read/visited before the next tier unlocks — this stays a structural gate, just with no XP or timer attached to it
- **Keep**: earned/unlocked tiers still get full vibrant-color styling once genuinely unlocked; locked tiers stay dimmed (no change to this — confirm it still works after the above changes)
- Review `lib/forgeXp.js` (or wherever reading XP is currently granted) and confirm Rank/XP is now driven entirely by Forge (examples/exercises) — flag if the XP curve needs retuning now that one of two sources is gone, but don't retune it without asking first

---

## 4. Inline worked examples inside The Study
For any Novice/Apprentice/Journeyman/Expert topic that already has Forge examples (`examples` array is non-empty), render one worked example inline within the reading flow — read-only, no grading, no XP, no input box. Reuse the example's existing `steps` array and `solution_summary` (the fully-worked-out version) as-is; do not author new content for this.

- Place it naturally after the relevant explanation content, visually distinguished from the main body text (e.g. a bordered/tinted "In practice" box) but not styled like a Forge card (no Guided/Challenge/Gauntlet framing — this is passive reading, not an activity)
- If a topic has multiple examples, pick one representative one to show inline (don't dump the whole bank into the reading flow) — use judgment on which one best illustrates the topic simply
- Topics with an empty `examples` array simply don't get this box — no placeholder, no "coming soon"
- This only applies to tiers/topics that currently have example content (Apprentice, Journeyman, Expert, and Novice's existing 42 non-gap-audit topics) — the Novice gap-audit topics and Master/Legend don't have examples yet, so they naturally won't show this yet

---

## 5. Fix glossary popover text-clipping bug
Confirmed via screenshot: `components/GlossaryTerm.js`'s popover clips definition text at the box's right edge — words cut off mid-word, header term also truncated. Text is not wrapping inside the popover container. Fix the width/overflow/word-wrap CSS so full definition text always wraps and displays completely, regardless of term/definition length. Verify by opening a popover for a longer definition and confirming no text is cut off.

---

## Explicitly out of scope this session
- Rewriting any topic beyond the 3 listed in §1
- Master/Legend example-bank authoring (separate, on hold)
- Novice's 15-topic example gap (separate, on hold)
- Desktop app / Electron-Tauri packaging (separate future phase)
- Local/in-browser Java/C#/C++ execution workaround (separate future phase)

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Propose the §1 content pilot's actual draft text for review before merging it into `knowledge_base.json`, since content depth/voice needs sign-off before it sets the pattern for 299 more topics
- Log this session's decisions and outcomes into The Chronicle of Infinium
