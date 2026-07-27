# Codex Infinium — Phase 3 Build Prompt: Polish, Settings, and Onboarding
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Context
Phase 2 (rank/XP overhaul, achievements, Arcane Interface dashboard) is built and largely working — confirmed via live stress testing. This phase is bug fixes plus a few small features surfaced by that testing. No new modes, no Forge work yet.

---

## Bugs (fix these first — real defects, not preferences)

### 1. XP toast gets stuck permanently
The `+29 XP` toast is supposed to fire briefly near the rank ring and fade after a few seconds. Instead it's sticking in the header and persisting across navigation/page changes indefinitely. Find and fix the underlying state bug (likely the toast's dismiss/timeout logic isn't firing, or it's not being cleared on route change). This is also the likely reason the rank-up banner was never seen in testing — same toast system, same bug. Verify both the XP toast and the rank-up banner appear, animate, and clear themselves correctly after this fix.

### 2. Achievements modal breaks depending on trigger point
Opening the Achievements panel from the Dashboard's stat card works correctly. Opening it via the sidebar's quick-access link produces a broken overlay — it renders misaligned/overlapping the page content instead of a clean full overlay. Fix so the modal behaves identically regardless of which entry point triggered it.

### 3. Default OS scrollbar showing through
The plain white browser-default scrollbar is visible on the sidebar and inside the Achievements modal, breaking the theme. Replace with a themed thin scrollbar (dark track, muted gold thumb) everywhere content scrolls.

---

## Progression tuning

### 4. Lower per-page XP significantly
Current XP-per-completion is too generous — reduce it meaningfully (roughly a third to half of current values is a reasonable target, exact number is Claude Code's call). The escalating rank curve from Phase 2 doesn't need to change — lower XP per page just means it naturally takes longer to rank up, which is the intended effect.

### 5. Sequential page timers (not parallel)
Currently both pages in a spread start their reading timers at the same time, which lets a fast reader flip past the left page's timer before it's even relevant. Change this: the right page's timer should not begin counting down until the left page's timer completes. This rewards actually reading each page in order rather than flipping quickly. Timer durations can come down somewhat now that they're gating sequentially instead of in parallel — use judgment, don't make them punishingly long.

---

## New: Tier-complete banner (distinct from rank-up toast)
When a user finishes every topic in a tier and unlocks the next tier's XP path, show a bigger, more prominent banner — top-center of the screen, not a corner toast — since this is a bigger moment than a normal rank-up. Something in the spirit of "Novice complete — Apprentice unlocked." Skyrim-skill-up energy, but keep the actual copy plain per the project's established UI-copy rule (no flowery language, just clear and satisfying). Auto-dismiss after a few seconds, same as other toasts — just visually heavier while it's up.

## New: Earned vs. not-yet-earned tier styling
Right now locked-for-XP tiers all render the same dimmed state whether or not they've actually been earned. Once a tier is genuinely unlocked (prior tier completed), it should render with the same full vibrant color treatment Novice currently has by default — dimmed should only ever mean "readable, not yet earned." Applies to both the sidebar tier list and the dashboard's tier wheel.

## New: Settings page
Add a Settings entry (sidebar, near Dashboard/Progression Map):
- **Reset progress** — clears the `codex_infinium_progress` localStorage key entirely, back to a fresh Rank 1 / 0 topics / 0 achievements state. This is destructive — require a real confirmation step (e.g. a "type RESET to confirm" or a two-click confirm), not a single accidental click.
- **Reading appearance** — a couple of font choices for The Study's page text (current serif, plus at least one more readable/higher-contrast option) and a text-size control (small/medium/large). Store as its own settings object in localStorage, separate from progress data.

## New: Skippable onboarding
Two tiers of onboarding, both must be fully skippable at any point and never block interaction if skipped:
- **Dashboard walkthrough** — shown once on first visit (track via a localStorage flag), a short click-through tour of the rank ring, tier wheel, and continue card. Skip button always visible, not just at the end.
- **Per-mode intro** — the first time a user enters a given mode (starting with The Study, since it's the only one built), a short click-through explaining how it works. Same skip behavior. Build this as reusable scaffolding so future modes (The Forge, etc.) can plug into the same system rather than each mode inventing its own onboarding pattern.

---

## Explicitly out of scope
- The Forge (Examples mode) — separate phase
- Practice/Exercise/Quiz functionality
- Real responsive/mobile layout pass — still deferred (tied to the existing PWA backlog item), narrow-window text-wrapping issues are known and not being fixed this phase
- Any change to The Study's core page-flip/chapter-jump navigation beyond the sequential-timer behavior above

## Process reminders
- PowerShell testing — no `&&` chaining, sequential commands only
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, Expert tier `?lang=` routing, the localStorage progress system, or the Phase 2 dashboard/achievements work — verify all still function after this build
- Log any new decision or scope change made during this build into The Chronicle of Infinium
