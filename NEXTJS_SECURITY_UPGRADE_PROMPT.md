# Codex Infinium — Pre-Deployment Fix: Next.js Security Upgrade
*(Hand this to Claude Code as-is. I just attached these files if you need them: CHRONICLE_OF_INFINIUM.md, package.json, package-lock.json.)*

## Context / why this matters now
The app is currently on Next.js 14.2.35, which has known `npm audit` advisories (DoS, cache poisoning, XSS) flagged as a "must fix before going live" item since early in the project. That was a low-priority local-dev-only risk before — it stops being low-priority the moment the app gets a public Vercel URL and gets shared with other people for feedback. This needs to happen before deployment, not after.

## Task
1. Run `npm audit` and report every advisory currently flagged — severity, what's affected, and whether it's a direct or transitive dependency.
2. Check the current latest stable Next.js version and confirm whether upgrading resolves the flagged advisories.
3. Upgrade Next.js (and React/React DOM if a version bump is required alongside it) to the version that clears the advisories. This is a breaking change (14.x → likely 15.x or 16.x) — expect App Router behavior changes, possibly changed defaults for caching/fetch, and possible config changes in `next.config.js`.
4. After upgrading, **test every major route and feature end-to-end in the dev server** before considering this done:
   - Dashboard loads, tier progression wheel renders
   - The Study: book page-flip navigation, sequential page timers, cross-tier reading access
   - The Forge: mode-select (Guided/Challenge/Gauntlet), reference pane, glossary highlighting
   - Expert's `?lang=` routing — language picker, topic resolution via `language_tracks`, live Python (Pyodide) and JavaScript execution, static-language authored-output preview
   - The newly added Apprentice hands-on Python examples (Run/Submit, Pyodide execution, grading)
   - Utility Drawer (Notebook, Dictionary) — open/close state persists across navigation
   - Settings page — Reset Progress, appearance options
   - Achievements, XP toasts, rank-up banners
   - localStorage keys (`codex_infinium_progress`, `codex_infinium_notebook`) still read/write correctly — this is the most likely thing to silently break on a major version bump, since it's client-side state tied to `"use client"` component behavior that may change between versions
5. Fix anything the upgrade breaks. Report anything that can't be cleanly fixed rather than papering over it.
6. Re-run `npm audit` after the upgrade to confirm the flagged advisories are actually cleared, not just version-bumped past.

## Explicitly out of scope
- No content changes (explanation text, examples, glossary)
- No new features
- No GitHub/Vercel deployment setup — that's a separate next step after this is confirmed clean

## Process reminders
- PowerShell testing, no `&&` chaining
- This is a real breaking-change upgrade — go carefully, test as you go rather than upgrading everything at once and debugging at the end
- Explain any code changes in plain English first, real technical term alongside
- Log this session into the Chronicle: what version you upgraded to/from, what broke and how you fixed it, confirmed `npm audit` output before and after, and explicitly confirm the app is now considered safe to deploy publicly (or flag what's still blocking that if anything remains)
