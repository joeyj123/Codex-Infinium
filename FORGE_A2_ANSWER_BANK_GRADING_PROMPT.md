# Codex Infinium — Forge A2: Answer Bank & Grading Engine
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Context
Forge A built the content and exposure-level mechanics, but there's currently nothing to actually *solve* — examples just reveal a worked solution. This phase adds a real answer-input-and-grading loop, fully offline (no API, no cost, no backend). This completes The Forge's core loop before moving to Forge B.

---

## 1. Content: extend all 98 existing Novice examples
Add two new fields per example in `knowledge_base.json`:
```
{
  ...existing fields...,
  "key_concepts": ["...", "..."],   // 3-6 short terms/ideas a good answer should demonstrate
  "answer_bank": ["...", "...", "..."]  // 2-4 differently-phrased acceptable answers — genuinely varied wording, not just copies of solution_summary
}
```
Match the existing voice and rigor. `answer_bank` entries should read like real different ways a person might correctly answer, not slight rewordings of each other.

## 2. Grading engine (client-side, offline)
Build a scoring function that takes the user's typed answer and returns a tier:
- **Concept coverage**: what fraction of `key_concepts` are present in the answer (allow a short authored synonym list per concept where the obvious alternate wording exists, to reduce false negatives — doesn't need to be exhaustive)
- **Best-match similarity**: compare the user's answer against each `answer_bank` entry using a word-overlap similarity measure (e.g. Jaccard similarity on significant words after lowercasing and stripping common stopwords), take the highest score across the bank
- Combine both signals into a final tier — plain, encouraging labels (e.g. **Strong match**, **Partial match**, **Needs review** — Claude Code's call on exact wording, keep it plain per the project's UI-copy rule, not harsh/gradebook-sounding)
- This is pattern-matching, not true understanding — that's fine and expected, don't try to oversell it in the UI copy

## 3. Wire it into The Forge's existing exposure levels
- Add an answer-input text box to the example viewer
- **Guided**: answer box available but optional (steps/hints already visible) — submitting still runs grading and awards XP, mainly for reinforcement
- **Challenge**: submitting an answer is required before the worked solution reveals
- **The Gauntlet**: same requirement, no hints/reference available as already built
- One XP award per example per user (track completion so re-submitting doesn't farm XP)
- XP amount scales by both exposure level (Gauntlet > Challenge > Guided, matching the existing design intent) and grading tier (Strong > Partial > Needs review)

## 4. Update messaging
The onboarding walkthrough currently says something like "nothing here is graded, it's an honor system" — that's no longer true and needs to change. Replace with plain, accurate copy about how grading/XP actually works now (e.g. explaining the tiers and that XP scales with both mode and answer quality).

---

## Explicitly out of scope
- Real AI/semantic grading — deliberately not doing this, cost and infrastructure tradeoff, offline grading is the permanent plan for now
- Code preview/execution (Forge B), glossary (Forge C), utility drawer (Forge D) — all still queued next, in that order
- Reference pane bugs (missing return path, highlight not working) — Joey's explicitly holding these for a consolidated refinement pass after B/C/D are all built, not fixing piecemeal now
- Apprentice–Legend example/answer-bank content — later phases, same pattern

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, Expert `?lang=` routing, the progress/XP system, or Forge A's exposure-level mechanics
- Log this phase's decisions into The Chronicle of Infinium
