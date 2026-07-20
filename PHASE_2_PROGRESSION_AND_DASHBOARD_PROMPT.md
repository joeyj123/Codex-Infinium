# Codex Infinium — Phase 2 Build Prompt: Progression & the Arcane Dashboard
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Scope
This phase is progression system + dashboard visual rework. No Examples/Practice/Exercise/Quiz functionality — those stay stubs. The Study (book UI) itself is not being changed structurally, only which tiers are accessible for reading.

---

## 1. Decouple Rank from Tier
Right now Rank mirrors Tier 1:1 (Rank 1 = Novice, Rank 2 = Apprentice). Change this:
- **Rank** becomes its own counter driven purely by cumulative XP earned, independent of which tier you're in. A user can reach Rank 5+ while still working through Novice topics.
- **Tier** advancement still requires completing every topic in the current tier (unchanged logic) — Tier and Rank are now two separate numbers tracked separately.
- **XP curve**: replace the flat 100-XP-per-rank with an escalating curve — each rank threshold roughly 15% larger than the last (exact formula is Claude Code's call, but early ranks should come quickly and later ranks should genuinely take more topics to reach).
- Existing local progress: recompute Rank from total accumulated XP under the new curve rather than wiping progress. Flag to Joey if a clean migration isn't possible.

## 2. Cross-tier reading access
The Study should be readable in any tier from the start, regardless of Tier-lock status — since content is cumulative, someone with prior knowledge shouldn't be walled out of reading ahead.
- Every tier's book opens for reading (The Study) regardless of lock state
- Tier-lock still fully applies to anything XP/progression-gated (topic completion counting toward Tier advancement stays restricted to unlocking in order — a user can *read* Legend on day one, but can't *complete/earn XP* for Legend topics until prior tiers are done)
- Visual language needs to shift accordingly: a locked tier shouldn't look fully blocked anymore. Swap the padlock treatment for something that reads as "not yet earned" rather than "can't access" — dimmed but clearly clickable for reading.

## 3. Dashboard — build Direction B (Arcane Interface)
Replace the current bookshelf-of-spines dashboard layout with the progression-wheel concept:
- Rank shown as a **ring** — an unfilled/filled arc proportional to progress toward the next rank threshold, with the rank number centered inside
- Tiers shown as **nodes arranged in a wheel/radial layout** around (or alongside) the current tier, rather than a horizontal row of book spines
  - Current tier is the visually emphasized center node
  - Locked-for-XP tiers are dimmed nodes (per #2 above, still clickable to read)
  - Clicking any node opens that tier's Study
- Stat panels (Rank / Topics done / Achievements) keep a bordered-panel-with-floating-label treatment rather than the old flat boxed cards
- "Continue where you left off" stays as its own element, restyled to match this cooler/geometric direction rather than the warm illuminated-manuscript style from the other mockup

## 4. XP toast + rank-up banner
- Completing a topic's reading timer fires a small toast near the rank ring (e.g. `+25 XP`)
- The ring animates filling live by that amount
- Crossing a rank threshold triggers a banner: **"Rank increased — [Tier name], level [N] → level [N+1]"**, then fades after a few seconds
- Keep both lightweight — no blocking modals, shouldn't interrupt reading flow

## 5. Achievements system (rename from "Badges")
- Rename every instance of "Badges" to "Achievements" across the UI (sidebar counter, dashboard stat card, anywhere else it appears)
- Build a small achievements data structure and unlock logic for this starter set:
  - **First page turned** — complete your first topic
  - **One achievement per tier completed** (6 total — Novice through Legend)
  - **Rank milestones** — e.g. Rank 5, Rank 10, Rank 25 reached (exact thresholds Claude Code's call, should feel meaningfully spaced given the new XP curve)
  - **The full grimoire** — all 259 topics completed
- Earning one fires a small unlock toast, same visual family as the XP toast (not a separate design language)
- A simple achievements list/view — doesn't need its own dedicated page this phase, a panel or modal accessible from the Achievements stat card is enough

---

## Explicitly out of scope
- The Forge (Examples mode) — brainstormed this session, not being built yet
- Practice/Exercise/Quiz functionality
- Any restructuring of The Study's book UI itself (page-flip, chapter jump-list, etc. — those stay as built)
- Cross-tier reference/lookup pane — that belongs to The Forge, next phase

## Process reminders
- PowerShell testing — no `&&` chaining, sequential commands only
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, the Expert tier `?lang=` routing, or the localStorage progress system — verify all three still work after this build, same as last phase
- Log any new decision or scope change made during this build into The Chronicle of Infinium
