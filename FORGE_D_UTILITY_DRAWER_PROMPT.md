# Codex Infinium — Forge D: The Utility Drawer
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Scope
Build one slim right-side panel, globally accessible from anywhere in the app, with two tabbed sections: **Notebook** (persistent free-text notes — this was in the original Phase 1 backlog but never actually got built when the plan pivoted straight to The Study) and **Quick Dictionary** (a searchable browser view of the glossary Forge C already built, as a second entry point into that same data beyond just clicking highlighted terms in text).

---

## 1. The drawer shell
- A slim panel anchored to the right edge of the screen, collapsed by default, toggled open via a small tab/icon
- Mounted globally (in `layout.js` or equivalent) so it's available on every page — Dashboard, The Study, The Forge, Settings, everywhere — and its open/closed state and active tab persist across navigation rather than resetting per page
- Two tabs inside: **Notebook** and **Dictionary**
- Visually consistent with the existing theme — this is the same "quick actions on the right side" idea from earlier UI brainstorming, now actually built

## 2. Notebook tab
- A flat list of freeform text notes: add a note, view the list, delete a note (no editing needed for v1, no per-topic tagging — matches the original scope this was cut down to)
- Each note stored with a timestamp
- Persists to localStorage under its own key (`codex_infinium_notebook`), separate from progress and settings data — same separation-of-concerns pattern already used for the Settings/appearance data

## 3. Dictionary tab
- Reuses the existing `data/glossary.json` and glossary matching logic from Forge C — no new content authoring this phase, just a new way to browse what's already there
- A simple search/filter box at the top, list of terms below, clicking a term shows its definition (same content Forge C's popover already shows) plus the existing "Read full page →" link back into The Study
- Since glossary content only exists for Novice right now, that's fine — this tab will naturally grow as later phases add glossary content for other tiers, no special-casing needed

---

## Explicitly out of scope
- Pepe the Mage mascot — separate, still-unbuilt backlog item, not part of this drawer
- Apprentice–Legend glossary content — still queued as later phases
- Any changes to how the glossary popover itself works in Study/Forge text — Forge C's mechanism stays as-is, this just adds a second way to reach the same data

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, The Forge (A/A2/B/C), Expert `?lang=` routing, or the progress/XP system
- Log this phase's decisions into The Chronicle of Infinium
