# Codex Infinium — Project Handoff Summary

*(Formerly "Codex Arcanum" — renamed. Any old references to Arcanum in code, filenames, UI copy, or docs should be updated to Infinium.)*

## Who this is for

Joey — a construction management student/intern at R.K. Hoover Construction, no coding background, builds by directing AI ("vibe coding") rather than writing code himself. Uses Claude for reasoning/planning and Claude Code for implementation. Registered for an AI-in-Construction course (Fall 2026) that uses Claude for all coding work. Prefers concise, direct communication — no padding, no over-explaining simple things — but wants full "from scratch" explanations of any technical concept, since he has zero assumed CS/software background.

## The Grand Vision

Codex Infinium is a self-contained, gamified learning app meant to take Joey (or anyone with zero technical background) from total novice to genuinely fluent, conversant with real computer science nerds — roughly bachelor's-degree-equivalent breadth, minus the 4-year time investment. It's a skill-leveling ladder (deliberately similar to Skyrim's skill-rank system): **Novice → Apprentice → Journeyman → Master → Expert → Legend**. Each tier must be completed (all topics done) to unlock the next.

Every topic offers (eventually) 5 ways to engage and earn XP:

1. **Read** — the written explanation (only one actually built)
2. **Examples** — worked, step-by-step walkthroughs (field exists, all empty)
3. **Practice** — a game (stub only — placeholder alert)
4. **Exercise** — hands-on practice (stub only)
5. **Quiz** — endless MC/True-False/Fill-in-blank/Essay mode, streak-based (not built)

## Content Depth Rewrite — DONE

All 259 topics (42 Novice + 66 Apprentice + 46 Journeyman + 34 Master + 56 Expert across 5 language tracks + 15 Legend — actual count, corrected from the doc's earlier "248" estimate) rewritten via Claude Code to \~300-500 word textbook-depth explanations with dual-layer technical definitions. Self-audited for word-count floor and filler/qualifier-stacking density; accuracy/pedagogical quality accepted on spot-checks, not independently re-verified further — Joey decided this is good enough for now and moved on. `examples` field is still empty for all 259 topics (separate, not-yet-started task).

## Content Depth Rule (reference — the standard used above)

Existing Read explanations are too sparse. Going forward, **every technical term used — even ones that sound like plain English — must get its real CS definition, not just an analogy.** Example: the word "Output" can't just mean "what comes out" — it needs the actual technical framing (e.g., data produced by a process/program, as opposed to input; tie to concept of a function/process boundary). This is a retrofit job: the existing 248 topics need to be reviewed and deepened, not just future ones written this way. Keep the dual-layer rule (plain-English analogy + real term) but raise the bar on how much of the *real* layer is included — assume Joey will look up any bolded/technical term he doesn't know elsewhere, so it should stand on its own without a Google search.

## Content Structure (248 topics total)

* **Novice** — 42 topics. Getting Oriented, History, Hardware \& Physical Layer, Physics \& Materials, Firmware \& Boot, Operating Systems, Command Line, Networking \& Internet, Software Concepts.
* **Apprentice** — 66 topics. Core Programming Concepts, Language Landscape, Basic Data Structures, Working With Data, OOP Basics, Functional Basics, Version Control, Reading Real Code, AI (history/theory), AI Going Deeper.
* **Journeyman** — 46 topics. Deeper Language Mechanics, Software Architecture, Databases, Web Fundamentals, Concurrency, Hardware Callback, AI: Building With It (includes "What Claude Is Actually Doing When You Vibe Code").
* **Master** — 34 topics. Design Patterns, Systems Design, Security, Performance \& Optimization, DevOps \& Cloud, Advanced AI.
* **Expert** — 56 topics across 5 language tracks (Python 15, JS 11, Java 10, C# 10, C++ 10). **Structurally different**: uses `language\\\_tracks` object instead of flat `topics` array.
* **Legend** — 15 topics (capstone). Distributed Systems, The Modern AI Stack, Capstone \& Beyond.

## Content-Writing Rules

* Textbook-quality, self-contained, \~100–250 words, no filler — **but see Content Depth Rule above, this length may need to grow**.
* One-line `hint` (analogy/mnemonic) per topic.
* Building-forward principle: ties back to prior-tier concepts only where genuinely relevant.
* Dual-layer explanation for every technical concept — plain-English analogy AND full real term.
* Tiers open with a short `intro` blurb.
* Sections ordered for narrative/textbook flow.
* XP per topic scales 15–35 with depth, ±15% randomization at completion.
* `min\\\_read\\\_seconds` calculated from word count (anti-speedrun gate).
* Light medieval/grimoire aesthetic (name, colors, icons) but **functional UI copy stays plain** — no flowery fantasy words in buttons/labels.

## Tech Stack (current, as of last build)

* **Next.js 14.2.35** (App Router), React 18, plain JS (no TS), plain CSS (no Tailwind)
* Data: `data/knowledge\\\_base.json` (\~254 KB), static import
* Progress: React Context (`lib/ProgressContext.js`) → `localStorage` key `codex\\\_arcanum\\\_progress` *(should this key rename to `codex\\\_infinium\\\_progress`? Flag for discussion — renaming breaks existing local test progress)*
* Path alias `@/` via `jsconfig.json`
* File structure:

```
  app/
    layout.js, page.js (Dashboard), globals.css
    progression/page.js
    tier/\\\[tierId]/page.js
    tier/\\\[tierId]/topic/\\\[topicId]/page.js (Expert uses ?lang= query param)
  components/
    Sidebar.js, TopicCard.js, SectionExpander.js
  lib/
    ProgressContext.js, sectionNames.js
  data/
    knowledge\\\_base.json
  ```

* Runs locally via `npm install` then `npm run dev`

## UI/UX Ideas Backlog (added this session — not yet built, for after content rewrite)

**Pepe the Mage Guide** — a wizard-hatted, bearded frog mascot (SVG), the in-app guide/help character. Note: Pepe already exists as a plain frog SVG mascot in Joey's separate woodworking/3D-modeling software project — this is a re-themed version for Codex Infinium specifically (wizard hat + beard added to fit the grimoire aesthetic), not the same design reused as-is. Pepe should be askable — a Q\&A interface where the user can ask questions about the app itself (e.g. "why can't I see the full paragraph in this file") or potentially about topic content.

**Mode/difficulty system** (applies across Practice/game, Exercise, Quiz, and possibly others):

* A choice between a "gamified/challenge" mode and a straightforward "learning" mode.
* Help availability should be adjustable: fully on, limited hints, or fully off — and this needs to be toggleable **mid-session**, not just at the start, so a user can turn on/off help without restarting.
* Timed vs. untimed option for games/quizzes — untimed should support genuinely endless play (keep going until bored), not just "time removed but still capped."
* While in a game/quiz/exercise, the user should be able to pull up the relevant textbook (Read) content for that topic without leaving the activity — a reference lookup available in-context, not just a separate page.

**Examples mode structure** (this is the "fifth mode" — Read, Examples, Practice, Exercise, Quiz): each example should offer three variants — a fully worked-out step-by-step example (with explanations at each step), a guided example (partial help, user does some steps), and a challenge example (no help, user does it independently). This applies to every example, not just some.

**Notebook feature** — a persistent, per-user notes space, accessible at all times throughout the app (not tied to one topic/page), for jotting down thoughts/notes as they go. Needs to persist the same way progress does (localStorage for now, per the current no-backend setup).



1. Games, Exercises, Quiz mode — 100% unbuilt, placeholder alerts only. Games should escalate in style/difficulty by tier (not designed in detail yet).
2. Examples field empty for all 248 topics.
3. Quiz mode not designed at all.
4. Next.js needs major version upgrade before deploy (14.x → 16.x, breaking change) — `npm audit` flags real advisories (DoS, cache poisoning, XSS). Deferred but must happen before going live.
5. No real multi-user support — localStorage is per-browser. Needs a decision before launch: simple cloud sync vs. accept siloed-per-browser for a friend-group hobby app.
6. PWA packaging (installable on phone) — requested, not started.
7. Deployment path: GitHub → Vercel.
8. **NEW THIS SESSION**: content refinement pass — go deeper on technical terms across all 248 topics (see Content Depth Rule).
9. Joey has "some improvement ideas" from live-testing — collect these as we go.

## Working Style / Process Notes for Claude Code

* Joey reviews/approves plans before big content or structural changes.
* Full autonomy granted on curriculum design/structure once precedent is established in this doc — don't over-ask on settled things.
* Non-technical — explain what's being done/why plain-English first, real technical term included alongside (not instead of).
* Tests locally in PowerShell on Windows (ASUS TUF A16, RTX 4050) — **no `\\\&\\\&` chaining**, give sequential commands.
* Short/direct replies generally, EXCEPT this project's actual educational content and planning — there he wants full depth and comprehensiveness.


**NEW THIS SESSION (2026-07-28, Anvil tier audit)**: content gap discovered — f-string interpolation (`f"...{var}..."`) is used in the solution code of 38 Novice Anvil challenges but is never explicitly taught as a topic in any tier (KB covers string concatenation and string methods, not f-string literal syntax). Needs a decision before Session 2 relocation: add a dedicated topic teaching f-strings (which tier?), or route those 38 challenges to their next-best concept without it. See `ANVIL_TIER_AUDIT_SESSION1.md` for the full per-challenge breakdown.
