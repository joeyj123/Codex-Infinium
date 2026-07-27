# Codex Infinium — Forge A: Core Mechanics + Novice Example Content
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Scope
This phase builds **The Forge** (Examples mode) end-to-end for the Novice tier only: the mode itself, its three exposure levels, the in-context reference pane, and — this is the big one — **actually authoring real example content for all 42 Novice topics.** Apprentice through Legend get the same treatment in later phases, reusing everything built here. No code-execution/terminal preview this phase — Novice topics are conceptual, that feature is scoped to whichever tier(s) actually teach code (flagged as a later Forge phase).

---

## 1. Data model
Add an `examples` array to each Novice topic in `knowledge_base.json` (field already exists but is empty). Each entry:
```
{
  "id": "...",
  "prompt": "...",       // a concrete scenario/question applying the topic's concept
  "steps": ["...", "..."],   // ordered worked-solution steps, 2-5, each a short reasoned paragraph
  "hints": ["...", "..."],   // 2-3 hints, independently revealable, roughly tied to likely sticking points
  "solution_summary": "..."  // one-line final answer/takeaway
}
```

## 2. Content-authoring standard (apply this across all 42 Novice topics)
- Aim for **3-4 examples per topic** where the topic naturally supports that many distinct scenarios. Some simple/intro topics may only reasonably support 1-2 — don't pad to hit a number, quality over forced count (same principle already established for the explanation rewrite).
- `prompt` must require actually applying the concept, not just restating the topic's `explanation` in question form.
- Vary the question *shape* by topic type rather than templating one structure across everything — e.g. a CPU-cycle topic might trace an instruction step-by-step; an I/O topic might classify a handful of devices; a networking topic might trace a packet's path. Let the topic's actual content shape the example, the way section/topic variety already exists in the explanations.
- Match the existing voice: self-contained, dual-layer where a new technical term shows up mid-example (plain-English + real term), no filler.
- No code snippets or terminal output in this pass — that's out of scope for Novice.
- This is a genuinely large authoring task (42 topics × ~3 examples). Do the full pass in this session — Joey has explicitly asked for this to be as complete as possible in one go rather than a partial/sample pass.

## 3. The Forge — mode structure
- New mode-select entry alongside Read/Practice/Exercise/Quiz on the existing hub (from Phase 1): **The Forge**
- Difficulty selector: Novice through Legend, matching the existing tier list. For this phase, only Novice has real content — other tiers should show clearly as "not yet available" rather than a broken/empty state if selected.
- Three exposure levels, selectable per session (not locked to one choice):
  - **Guided** — worked solution (`steps`) shown proactively, hints shown proactively, reference pane open by default
  - **Challenge** — problem (`prompt`) only by default; hints available on click, not shown automatically; reference pane available if the user chooses to open it
  - **The Gauntlet** — problem only; no hints, no reference pane; the solution only reveals after the user has explicitly attempted/engaged with the problem (this is honor-system — nothing here is graded or monitored, per the original design intent — so "attempt" just means requiring an explicit user action like "Reveal solution" rather than showing it by default)
- All three levels pull from the same underlying `examples` content — this is one authored bank exposed differently, not three separate written variants.

## 4. Reference pane
- Scoped to whatever difficulty/tier is currently selected in The Forge — no cross-tier search needed for this phase
- Opens a compact "pocket" view of that tier's existing Study book, jumped directly to the page most relevant to the current example's topic (McGraw-Hill-style "read about this" → return to the question pattern)
- Should not navigate away from The Forge — this is a panel/overlay on top of the current example, not a page change
- Reuses The Study's existing page-rendering rather than building a second reading UI from scratch

---

## Explicitly out of scope
- Code preview/execution terminal — separate later Forge phase, scoped to code-teaching tiers
- Apprentice through Legend example content — later phases, same pattern as this one
- Glossary/hover-dictionary — separate later Forge phase
- The right-side utility drawer (Notebook + Dictionary consolidation) — separate later Forge phase
- Practice/Exercise/Quiz functionality — unrelated modes, still stubs

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, Expert `?lang=` routing, the progress/XP system, or anything built in Phases 1-3
- Log this phase's decisions and content-authoring approach into The Chronicle of Infinium
