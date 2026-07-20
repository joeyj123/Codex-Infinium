# Codex Infinium — Forge C: Glossary / Hover-Dictionary
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Context
Every topic's `explanation` text was already written dual-layer (plain-English analogy + the real technical term, always both) — that's raw material for a glossary that's never been extracted into its own lookup. This phase builds that lookup and surfaces it as clickable/hoverable terms inside the reading text, starting with one tier's worth of content rather than all 259 topics at once (same incremental pattern as Forge A/B: build the mechanism once, prove it on a manageable content slice, expand later).

**Scope for this phase: Novice tier only (42 topics)** — mechanism fully built, content authored for Novice, everything else queued as a clearly separate follow-up phase per tier. This mirrors Forge A's Novice-first approach; unlike Forge B, there's no forcing reason to jump to Expert here, so default back to reading order.

---

## 1. Data model — a new glossary index, separate from `knowledge_base.json`
Add `data/glossary.json`, structured as a flat list of terms:
```json
{
  "terms": [
    {
      "id": "cpu",
      "term": "CPU",
      "aliases": ["central processing unit", "processor"],
      "definition": "Plain-English analogy explaining what it does, one to three sentences — not a re-run of the full topic explanation.",
      "technical_term": "Central Processing Unit (CPU)",
      "tier_introduced": "novice",
      "topic_id": "what_is_a_computer"
    }
  ]
}
```
- `term` is the canonical display form; `aliases` are other real phrasings that should also match in reading text (e.g. "processor" should highlight the same entry as "CPU").
- `definition` stays dual-layer (plain-English + the real term folded in), but short — this is a lookup card, not a page from The Study. No padding to hit a word count; if the concept only needs two sentences, use two.
- `topic_id` links back to where the term is taught in depth, for a "Read more" jump into that topic's Study page.
- Extract terms from the *existing* Novice `explanation` text — don't invent new vocabulary the topics don't already cover. Skip words that are already plain English with no real technical weight (don't glossary-ify "computer" itself if a topic just uses it conversationally, but do glossary-ify things like "binary," "kernel," "compiler," "input/output," etc.). Expect somewhwere in the range of 40-80 terms out of 42 Novice topics — some topics won't introduce enough new vocabulary to be worth an entry, some will have two or three; there's no fixed per-topic quota, use judgment.

## 2. Term-highlighting mechanism in reading text
Build a `lib/glossary.js` with a function that takes a block of paragraph text and the glossary term list, and returns a mix of plain text and highlighted term spans, so it can be dropped into existing paragraph-rendering code:
- Case-insensitive whole-word matching against `term` and every `aliases` entry.
- **Longest match wins** at a given position (e.g. match "central processing unit" as one hit, not "central" + separate leftover text), and once a span of text is claimed by a match it can't be re-matched by a shorter alias.
- Highlight only the **first occurrence per page** of a given term (not every repetition) — repeated highlighting of the same word across a long paragraph is visual noise, not helpful.
- This needs to run wherever topic explanation paragraphs are already rendered: The Study's book pages (`app/tier/[tierId]/study/page.js` or wherever `book-page-text` is built) and Forge's reference pane (`components/ForgeReferencePane.js`, which reuses the same `splitExplanation` output) — both should get the same highlighting behavior for free if the render path is shared correctly.

## 3. Popover/tooltip UI
- New component, e.g. `components/GlossaryTerm.js`: wraps a highlighted term with a subtle visual treatment (dotted underline, gold-tinted, consistent with the existing grimoire aesthetic — functional UI copy inside the popover stays plain, no flowery fantasy wording).
- **Click/tap opens** a small popover showing `definition` + `technical_term`, with a "Read full page →" link to `topic_id`'s Study page. Must work on touch devices, not just desktop — click/tap is the primary interaction, hover-to-preview on desktop is a nice-to-have on top of it, not a replacement for it.
- Dismiss on outside click/tap and on Escape. Keep it a lightweight overlay (positioned near the term, not a full-screen modal) so it doesn't interrupt reading flow.

## 4. Content authoring — all 42 Novice topics
- Read each Novice topic's `explanation` field, extract genuinely reusable technical vocabulary, write concise glossary entries per the schema in §1.
- De-duplicate: if multiple topics reference the same term (e.g. "binary" comes up in several places), write **one** glossary entry and point `topic_id` at wherever it's taught most thoroughly/first, not one entry per topic that mentions it.

---

## Explicitly out of scope
- Apprentice/Journeyman/Master/Expert/Legend glossary content — later phases, same pattern, tier-by-tier
- Any new XP, achievement, or progress-tracking tied to glossary lookups — this is a reading aid, not a gamified mode
- Changes to Forge A/A2/B mechanics (exposure levels, grading, code execution)
- Utility drawer (Forge D) — next in queue after this
- Reference pane bugs (return path, highlighting-on-jump) — still deferred to the consolidated refinement pass

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, Expert `?lang=` routing, the progress/XP system, or any of The Forge's existing mechanics (A/A2/B)
- Log this phase's decisions into The Chronicle of Infinium
