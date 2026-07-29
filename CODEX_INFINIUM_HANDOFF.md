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

**NEW THIS SESSION (2026-07-28, Anvil Session 2)**: Novice Anvil is now fully empty (0 challenges) and shows "Not yet available" — a future session needs to author real Novice-appropriate no-code challenges (conceptual/hardware reasoning, not Python syntax) if Novice Anvil is meant to have content again. Also: the f-string content gap flagged in Session 1 is now resolved — `apprentice`/`journeyman` doc references to that gap can be considered closed.

**NEW THIS SESSION (2026-07-29, Novice Anvil Session 1)**: **Decision — Novice Anvil no-code challenge types.** The old 4 Anvil mechanics (reorder/fix/output/build) are Python-execution-only, which can't host no-code conceptual content. Built 3 new types instead of inventing new mechanics, per Joey's "re-skin the existing 4, don't build new ones" framing:
- `order` — reorder-a-process, plain-text steps, no execution (the no-code version of `reorder`).
- `choice` — single-select multiple choice; a `variant: "spot_wrong" | "predict_outcome"` field only changes the UI label, both graded identically (the no-code version of `fix`/`output` combined).
- `match` — match/build-the-system, left items each paired against a shuffled right-side dropdown (the no-code version of `build`).

New file `lib/gradeConcept.js` (gradeOrder/gradeChoice/gradeMatch) returns the same `{tier, label}` shape as `lib/gradeCode.js`/`lib/grading.js`, so XP and completion tracking needed no changes. `AnvilTopicClient.js` branches on `challenge.type` before the Python-only render path. `lib/anvil.js` needed zero changes — its readiness gate already just checks for a non-empty `anvil_challenges` array regardless of challenge type.

Authored 31 no-code challenges (3-4 each, mixed types) across the first 10 Novice topics (`what_is_a_computer` through `io_devices_usb`) via `scripts/add-novice-anvil-session1.js`. Verified live in-browser for `what_is_a_computer` (all 3 types render, grade, and reveal worked solutions correctly) — the remaining 9 topics' content was authored to the same schema but not yet individually spot-checked in-browser. **47 Novice topics remain unauthored** for this new challenge format (topics 11–57).

**UPDATE (2026-07-29, Novice Anvil Session 2)**: Authored 30 more no-code challenges (3 each, no new types needed) across topics 11–20 (`displays_basics` through `file_types_extensions`) via `scripts/add-novice-anvil-session2.js`. **37 Novice topics remain unauthored** (topics 21–57).

**UPDATE (2026-07-29, Novice Anvil Session 3)**: Authored 30 more no-code challenges (3 each, no new types needed) across topics 21–30 (`container_formats_codecs` through `server_vs_client`) via `scripts/add-novice-anvil-session3.js`. **27 Novice topics remain unauthored** (topics 31–57).

**UPDATE (2026-07-29, Novice Anvil Session 4)**: Authored 30 more no-code challenges (3 each, no new types needed) across topics 31–40 (`what_is_the_cloud` through `what_is_a_program`) via `scripts/add-novice-anvil-session4.js`. **17 Novice topics remain unauthored** (topics 41–57).

**UPDATE (2026-07-29, Novice Anvil Session 5)**: Authored 30 more no-code challenges (3 each, no new types needed) across topics 41–50 (`browser_vs_app` through `silicon_semiconductors`) via `scripts/add-novice-anvil-session5.js`. This batch covered the entire Computing History subsection, which is naturally chronological — 6 of 7 History topics used `order` for milestone-sequence challenges, a higher proportion than any prior session. **7 Novice topics remain unauthored** (topics 51–57, the rest of Physical Foundations) — this is the final remaining batch of the whole project.

**UPDATE (2026-07-29, Novice Anvil Session 6 — PROJECT COMPLETE)**: Authored the final 21 no-code challenges across topics 51–57 (`doping` through `chip_manufacturing`) via `scripts/add-novice-anvil-session6.js`. **Novice Anvil is now 100% complete: all 57/57 Novice topics carry `anvil_challenges`** (172 total across the 6 sessions). No further Novice Anvil authoring work remains unless new Novice topics are added to the curriculum in the future. The 3 no-code challenge types built in Session 1 (`order`/`choice`/`match`, via `lib/gradeConcept.js` and the concept-mode branch in `AnvilTopicClient.js`) needed zero further UI or schema changes across any of the 6 sessions.

**UPDATE (2026-07-29, Anvil Reorder UI decision)**: Replaced the `reorder`/`order` challenge types' ▲/▼ arrow-button reordering with drag-and-drop, built on Pointer Events (not HTML5 drag-and-drop, which has no reliable touch story) — new shared component `components/AnvilReorderList.js` used by both `AnvilTopicClient.js` reorder blocks (Python `reorder` and no-code `order`). Uses a live "swap on hover" pattern: the dragged item swaps position with whichever item the pointer is currently over, on every `pointermove`. `setPointerCapture` is wrapped in try/catch — some pointer/browser combinations reject capture for a given pointer id, and without the guard a rejected capture silently aborts the whole drag (this was caught during verification and is worth remembering if a future drag-and-drop feature is added elsewhere: always guard `setPointerCapture`). `order`/`conceptOrder` state shape is unchanged (still arrays of indices into the original shuffled arrays), so grading (`gradeOrder`, `gradeCodeOutput` for Python `reorder`) needed zero changes. Removed the now-dead `.anvil-reorder-controls` CSS.

**UPDATE (2026-07-29, Apprentice Anvil audit — read-only, findings for next session)**: Audited all 69 Apprentice topics' `anvil_challenges` directly against `data/knowledge_base.json` (242 total challenges, matching the count Novice Session 2 relocated here). Key findings, needed before any new Apprentice Anvil authoring:
- **Coverage gap**: only 8 of 69 topics have any content — `variables_data_types` (77), `operators` (29), `conditionals` (20), `loops` (44), `functions_scope` (3), `survey_python` (4), `arrays_lists` (39), `dictionaries_maps` (26). The other 61 topics (88%) are empty, spanning Language Fundamentals, most of Language Survey, Frontend intro, most of Data Structures, all of Data Interchange/OOP/Functional/Version Control/Reading-Code-Style, and all 15 AI topics.
- **21 confirmed misplaced challenges** (forward-references — using Python syntax not yet taught at that topic's position): 12 challenges use `def` inside `variables_data_types`/`operators`/`conditionals` (topics 3/5/6), all before `functions_scope` (topic 8) ever introduces function definitions; 2 challenges in `loops` (topic 7) use list comprehensions, not taught until `survey_python` (topic 16); 7 challenges (6 in `loops`, 1 in `arrays_lists`) use Python set literals (`{...}` + `in`), not taught until `sets` (topic 27). Full challenge-id list is in the chronicle entry for this session.
- **2 soft flags for review, not confirmed misplacements**: `functions_scope`'s `what_is_a_shell_wc5` uses a set literal as a secondary detail (its dominant concept is correctly placed); `dictionaries_maps`'s `motherboard_wc6` uses `.values()`/`all()` — worth checking whether that topic's content actually teaches those before treating it as settled.
- **Recommended next step**: a relocation pass (mirroring exactly how Novice Session 2 handled its own f-string forward-reference gap) moving the 21 misplaced challenges down to their correct topics, followed by authoring batches for the 61 empty topics.
- **No content was authored, edited, moved, or deleted this session** — this was audit-only, per explicit scope in the kickoff prompt.

**UPDATE (2026-07-29, Apprentice Anvil relocation — 32 moved, 0 unresolved remain)**: Executed the relocation the audit above recommended, via `scripts/relocate-apprentice-forward-refs.js` then a follow-up `scripts/relocate-apprentice-forward-refs-2.js`.
- **The original 21-item list was incomplete.** A mandatory full-tier re-scan after the first pass (checking every populated topic's every challenge, not just the specific ids flagged before) found 11 more forward-references the prior audit's narrower check had missed — its set-literal check had only run against 5 of the 8 populated topics, skipping `variables_data_types` and `conditionals` entirely, plus one more `def` usage in `loops`. **Lesson for future audits: when checking a specific syntax marker against topic position, run it against every populated topic, not just the ones a first pass happened to flag for a different reason.**
- Final tally: 12 `def` challenges + 1 more found later → `functions_scope` (13 total); 2 list-comprehension challenges → `survey_python`; 7 set-literal challenges + 10 more found later → `sets` (17 total). **32 challenges relocated overall**, moved verbatim with no rewriting. Grand total held at 242 throughout (verified after each pass).
- **Soft-flag decisions, both resolved as "leave in place"**: `what_is_a_shell_wc5` stays in `functions_scope` — its dominant concept (function def) is correctly homed, the set literal inside it is secondary, and moving it would misplace the primary teaching point. This is the one deliberately-accepted exception left anywhere in Apprentice using not-yet-taught syntax. `motherboard_wc6` stays in `dictionaries_maps` — confirmed via full-text search that neither `.values()` nor `all()` is taught *anywhere* in Apprentice (a genuine content gap, same shape as Novice's f-string gap, not a misplacement) — **flagging this as a standing content gap**: a future `dictionaries_maps` revision or a new topic should explicitly teach `.values()`/`.keys()`/`.items()` and relevant builtins like `all()`/`any()`.
- **Verified live**: build clean; `sets` (0→17) and `functions_scope` (3→16) both spot-checked in-browser, including a real Pyodide execution + grading run on a relocated `sets` challenge ("Strong match").
- **Next step**: author the 61 empty Apprentice topics — the tier's Anvil content is now fully clean of confirmed forward-references (1 documented exception) and ready to build on.

**UPDATE (2026-07-29, Apprentice Anvil authoring — Language Fundamentals batch, 6/61 topics done)**: Authored 18 new challenges (3 each) for `what_is_a_language`, `compilers_vs_interpreters`, `source_to_machine_runtime`, `data_in_memory`, `comments_documentation`, `pseudocode_algorithmic_thinking` via `scripts/add-apprentice-anvil-lang-fundamentals.js`. Two content-tier-alignment decisions worth remembering for the next authoring batch:
- **Topics before `variables_data_types` (idx 3) have no Python operations available at all** — not even assignment or string concatenation, since `variables_data_types` is the tier's first topic to teach either. `what_is_a_language`/`compilers_vs_interpreters`/`source_to_machine_runtime` (idx 0-2) had to be authored using *only* bare `print()` calls with string literals. Any future batch touching topics 0-2 needs to respect the same constraint.
- **`data_in_memory` (idx 4) needed one narrow, documented exception**: it sits before `arrays_lists` (idx 25, where list syntax is formally taught), but its own existing topic content already illustrates value-vs-reference-type behavior using a list (a pre-existing KB content choice, not introduced this session) — genuinely can't demonstrate its subject without some mutable reference type. Used a bare list literal + single-element index assignment only (no `.append()`, no slicing, no iteration) as the minimum necessary exception. Worth a second look/second opinion if a future session wants to reconsider this call.
- **Running total: 260 Anvil challenges across Apprentice (up from 242), 55 empty topics remain** (down from 61) — next batches should continue in topic order through the rest of Language Fundamentals, then Language Survey, Data Structures, etc. Batch size increasing to 10 topics per session going forward (per Joey, within the new context window).

**UPDATE (2026-07-29, Sidebar fix — "The Study" direct nav link)**: `components/Sidebar.js` never had a direct "The Study" nav item in this repo's full git history (checked all 4 commits that ever touched the file) — reading access has always routed through Dashboard's tier spines → `/tier/{tierId}` → `/tier/{tierId}/study`. Not a regression to root-cause, just a missing direct nav item. Added `📖 The Study`, positioned before The Forge, linking to `/tier/{progress.unlockedTiers.at(-1)}/study` — there's no "last read topic" state tracked anywhere in `lib/ProgressContext.js` (only `completedTopics`/`unlockedTiers`), so it falls back to the most-recently-unlocked tier's Study entry point rather than a true "continue reading" deep link. **If per-topic "last read" tracking is ever added to ProgressContext, this link should be updated to use it instead of the current tier-level fallback.** Verified live: build clean, link renders and navigates correctly, active-state highlighting works, all 5 pre-existing nav items confirmed unchanged.

**UPDATE (2026-07-29, Apprentice Anvil authoring — batch 2, 10/61 topics done, batch size now 10)**: Authored 30 new challenges (3 each) for `errors_debugging`, `package_managers_dependencies`, `high_vs_low_level`, `language_paradigms`, `syntax_vs_semantics`, `survey_javascript`, `survey_java`, `survey_c_cpp`, `survey_csharp`, `survey_sql` via `scripts/add-apprentice-anvil-batch2.js`. Two things worth remembering for future batches:
- **Important architectural constraint for any future language-survey topic** (there are more coming: `survey_html_css`, plus Expert tier's per-language tracks work differently): Apprentice's Anvil challenges *always* execute as Python — `AnvilTopicClient.js` only resolves a non-Python `lang` for Expert-track topics, so every pre-Expert challenge runs through `execute()` in Python regardless of what language the topic is actually teaching. Writing real "JavaScript"/"Java"/"C"/"C#"/"SQL" code as a challenge's `solution_code` would misrepresent that language's actual semantics (Python has no `===` to compare against JS's `==`, for instance) or simply fail to run. All 5 survey topics this batch used real, executing Python built from `print()` statements narrating that language's facts — never simulating its actual runtime behavior. Any future Apprentice survey-style topic should follow the same pattern.
- **Caught during authoring (not live)**: two `reorder` challenges initially wrote possessive apostrophes (`Microsoft's`, `Java's`) inside single-quoted Python `print('...')` strings, which is invalid syntax the moment the apostrophe closes the string early. Fixed by switching those specific lines to double-quoted `print("...")` calls instead of mangling the grammar to avoid the apostrophe. **Worth grepping future authored content for this same class of bug before running any add-content script** — a quick check is `grep -oP "print\('[^']*'\)" <file> | grep -E "'s |n't|'re "`.
- **Running total: 290 Anvil challenges across Apprentice (up from 260), 45 empty topics remain** (down from 55). Next batch continues in topic order: `survey_html_css` (idx 22), `evaluating_language_fit` (idx 23), `frontend_frameworks_intro` (idx 24), then the rest of Data Structures (`sets` already has content from the relocation; `stacks_queues`, `linked_lists`, `hash_tables_internals` are next), then Data Interchange.

**UPDATE (2026-07-29, Apprentice Anvil authoring — batch 3, 10/61 topics done)**: Authored 30 new challenges (3 each) for `survey_html_css`, `evaluating_language_fit`, `frontend_frameworks_intro`, `stacks_queues`, `linked_lists`, `hash_tables_internals`, `what_is_json`, `what_is_csv`, `reading_writing_files`, `what_is_a_schema` via `scripts/add-apprentice-anvil-batch3.js`. All 3 languages-section topics and both `linked_lists`/`hash_tables_internals` followed batch 2's `print()`-narration pattern (no custom classes taught yet, so no real node/pointer objects exist for a linked list or hash table to genuinely execute); the 4 Data-section topics stayed narrative too since `import json`/`import csv` aren't established anywhere in the tier. `stacks_queues` was the one exception — real, executing `list.append()`/`.pop()`/`.pop(0)` code, since `arrays_lists` already gives Apprentice list operations. Verified every `solution_code` executes in real Python with output matching `expected_output` byte-for-byte (all 30 passed), plus `npm run build` clean.
- **Running total: 320 Anvil challenges across Apprentice (up from 290), 35 empty topics remain** (down from 45). Next batch should continue with Apprentice's remaining Data section topics, in topic order, picking up right after `what_is_a_schema`.

**UPDATE (2026-07-29, Apprentice Anvil authoring — batch 4, 10/61 topics done)**: Authored 30 new challenges (3 each) for `serialization`, `classes_objects`, `attributes_properties`, `methods`, `inheritance`, `encapsulation`, `pure_functions`, `first_class_functions`, `map_filter_reduce`, `what_is_git` via `scripts/add-apprentice-anvil-batch4.js`. **Important: `classes_objects` is the first Apprentice topic teaching real Python `class` syntax** — all 5 OOP topics now use genuine, executing class-based code (constructors, attributes, methods, subclassing), a first for this tier; `encapsulation` uses the single-underscore convention + manual getter/setter methods, not `@property` (not yet taught). `serialization` is the first real `import json`/`json.dumps`/`json.loads` usage. `what_is_git` stayed print()-narration (no executable Git commands). Verified every `solution_code` executes in Python with output matching `expected_output` byte-for-byte (all 30 passed), plus `npm run build` clean.
- **Running total: 350 Anvil challenges across Apprentice (up from 320), 25 empty topics remain** (down from 35). Next batch continues in topic order, picking up right after `what_is_git` in the Git section.
