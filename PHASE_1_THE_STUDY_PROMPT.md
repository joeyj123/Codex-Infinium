# Codex Infinium — Phase 1 Build Prompt: The Study
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files — don't assume state from either doc.)*

## Scope
Replace the current flat topic page (Hint/Examples/Practice/Exercise/Quiz all mashed into one toolbar) with:
1. A mode-select hub per topic
2. A book-based reading experience called **The Study** (this phase's main build)
3. A redesigned Dashboard that ties visually into The Study

No game/exercise/quiz logic gets built this phase — those stay as clearly-marked "not yet" stubs. No Next.js upgrade, no multi-user work, no PWA.

---

## 1. Data change first: add `page_intro` field
Every topic in `knowledge_base.json` needs a new field, `page_intro` — a short one-line teaser/summary shown at the top of a page in The Study, separate from the existing `hint` field (hint stays reserved for future game use). This field is currently empty across all 259 topics, same status as `examples`. Adding the field to the schema is in scope for this phase; writing the actual teaser text for all 259 topics can be a follow-up content pass — confirm with Joey whether to write a placeholder now or leave blank until the content pass.

## 2. Mode-select hub
Replace the current single topic page with a hub screen shown when a topic is selected:
- Five options shown clearly: **Read (The Study), Examples, Practice, Exercise, Quiz**
- Read is fully active/built
- Examples, Practice, Exercise, Quiz are visually muted/disabled with a "Coming soon" marker — no alert() popups, just clearly non-functional for now
- Selecting Read takes the user into The Study at that topic's page

## 3. The Study — book UI
Core structure:
- **Tier = Book.** **Section = Chapter.** **Topic = Page** (a topic's `explanation` may span 2 physical pages if it's long — split cleanly, e.g. at a paragraph boundary, don't cut mid-sentence).
- **Open-book layout**: two facing pages with a visible spine down the center (a vertical divider — shadow gradient or simple line, whichever renders cleanly against the existing dark/gold palette). Page background should read as parchment-ish without breaking the existing plain-CSS, no-Tailwind setup.
- **Page content, top to bottom**: topic title → `page_intro` teaser line → full `explanation` text.
- **Navigation**:
  - Left/right arrow keys flip to the previous/next page
  - On-screen left/right arrow buttons too (for touch/no-keyboard — this app needs to work on Joey's phone eventually per the PWA backlog item, so don't build keyboard-only)
  - A bookmark-ribbon tab (side of the book) opens a chapter jump-list, so the user isn't forced to arrow through all pages in a tier every time
- **Animation**: simple CSS 3D flip — the page rotates around the spine axis (`transform: rotateY(...)`, `transform-style: preserve-3d`, a transition around 400-600ms). Not a paper-curl effect. Keep it lightweight — this needs to run fine on a 6GB VRAM laptop during local dev.
- **Reading-timer gate carries over**: the existing `min_read_seconds` anti-speedrun logic still applies per page. Show it as a subtle progress fill somewhere on the page (not a separate countdown button) — page is marked "read" once the timer completes while it's open. A small marker (checkmark or dog-ear icon) in the corner once a page is completed.
- **Progress**: completing a page's timer should still write to the existing ProgressContext/localStorage system exactly as topic completion does now — don't change the underlying progress-tracking logic, only the reading UI around it.

## 4. Dashboard redesign
- Represent the six tiers as **book spines on a shelf** rather than the current stacked list of plain cards.
  - Locked tiers: dimmed/chained visual, no click-through (same lock behavior as now)
  - Unlocked tiers: a progress sliver/fill directly on the spine graphic itself, clicking opens that tier's Study (the book)
- "Continue where you left off" card becomes a mini book-cover thumbnail matching the shelf's visual style, instead of the current plain text-in-a-box.
- Restyle the existing Rank/XP progress bar: add tick marks at each rank threshold and a stronger glow/highlight. Don't invent a new visual metaphor (candle, seal, etc.) this phase — this is a styling upgrade to the existing bar, not a new component.
- Sidebar: add a small fraction or thin progress bar under each unlocked tier's name (was flagged in an earlier pass, still applies here).

---

## Explicitly out of scope
- Practice/Exercise/Quiz functionality of any kind
- Examples' three-variant structure (worked/guided/challenge) — that's Examples mode's own future build
- Mode/difficulty/help-toggle system
- Writing the actual `page_intro` content for all 259 topics (flag this as a follow-up, don't silently generate placeholder text for all of them without checking in first)
- Next.js version upgrade, multi-user/cloud sync, PWA manifest/service worker

## Process reminders
- PowerShell testing — no `&&` chaining, sequential commands only
- Explain any code changes in plain English first, real technical term alongside
- Don't regress the Expert tier `?lang=` routing fix, the plain-CSS setup, or the localStorage-based progress system
- Confirm the `codex_infinium_progress` localStorage key rename actually landed in the live file before building on top of ProgressContext
- Log any new decision or scope change made during this build into The Chronicle of Infinium
