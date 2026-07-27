# Codex Infinium — Apprentice Hands-On Coding: Python Examples
*(Hand this to Claude Code as-is. I just attached these files if you need them: CHRONICLE_OF_INFINIUM.md, data/knowledge_base.json.)*

## Context / why this exists
Apprentice's existing Forge examples (673 of them, built earlier) are conceptual/reasoning tasks — "explain what's wrong with this claim," graded by word-overlap against an answer bank. There's currently no hands-on "write real code and run it" practice anywhere before Expert tier, which is gated behind three full tiers of concept-only work. This phase closes that gap for the 32 Apprentice topics that are genuinely code-shaped, using Python — the same language already running live via Pyodide for Expert's Python track.

**Decision locked in**: Python only (not multi-language) — Apprentice teaches general programming concepts, not language-specific syntax comparison (that's Language Landscape's job, which stays untouched). Code examples are **additive** — they sit alongside the existing prose/reasoning examples on each topic, not replacing them.

## Scope — 32 topics across 5 sections
Core Programming Concepts (`core`, 13): `what_is_a_language`, `compilers_vs_interpreters`, `source_to_machine_runtime`, `variables_data_types`, `data_in_memory`, `operators`, `conditionals`, `loops`, `functions_scope`, `comments_documentation`, `pseudocode_algorithmic_thinking`, `errors_debugging`, `package_managers_dependencies`

Basic Data Structures (`data_structures`, 6): `arrays_lists`, `dictionaries_maps`, `sets`, `stacks_queues`, `linked_lists`, `hash_tables_internals`

Working With Data (`data`, 5): `what_is_json`, `what_is_csv`, `reading_writing_files`, `what_is_a_schema`, `serialization`

OOP Basics (`oop`, 5): `classes_objects`, `attributes_properties`, `methods`, `inheritance`, `encapsulation`

Functional Basics (`functional`, 3): `pure_functions`, `first_class_functions`, `map_filter_reduce`

Note: a few of these (`what_is_a_language`, `compilers_vs_interpreters`, `source_to_machine_runtime`, `comments_documentation`, `pseudocode_algorithmic_thinking`) are more conceptual than the others — for these, write a small illustrative Python snippet the concept genuinely supports (e.g. `source_to_machine_runtime` could show a tiny script plus commentary on what happens to it) rather than forcing an artificial coding task. Use judgment; if a topic truly has nothing meaningful to run, flag it and skip rather than padding.

## 1. Mechanism — reuse Forge B's engine, adapt for flat topics
Forge B built `lib/codeExec.js` (JS Web Worker sandbox), `lib/pyodideRunner.js` (Python via Pyodide, Web Worker, lazy-loaded), and `lib/gradeCode.js` (`gradeCodeOutput()` — whitespace-normalized exact match = Strong, ≥40% word-level Jaccard = Partial, else Needs review), all currently wired to Expert's `language_tracks` structure via `?lang=` routing.

For Apprentice (flat `topics` array, no `language_tracks`), the code-execution UI needs to appear on relevant topics without requiring the Expert-style language picker — there's only one language, so no picker needed. Reuse `pyodideRunner.js` and `gradeCode.js` as-is; wire the code-textarea-plus-terminal-plus-Run/Submit UI pattern from Expert's Forge pages into Apprentice's existing Forge flow, gated by whether an example has a `language: "python"` field present (mixing with the existing prose examples that have no such field, so both types render correctly on the same topic).

## 2. Data model — extend Apprentice examples
For each of the 32 topics, add **one new example** (in addition to existing ones) to the `examples` array, following the same schema Forge B introduced for Expert: `id`, `prompt`, `starter_code`, `solution_code`, `expected_output`, `key_concepts`, `answer_bank` (kept for consistency even though grading is output-based), `language: "python"`. Match Expert's exact field shape so `gradeCodeOutput()` needs no changes.

## 3. Content authoring — critical correctness requirement
**Every `solution_code` must actually be executed (via `python3`) during authoring, with `expected_output` set to the real captured stdout** — not hand-guessed. This is the same non-negotiable Forge B established for Python/JS content, and it matters even more here since these are a learner's first real code-running experience. Keep each example short and focused — this is Apprentice-level, not Expert-level; a 5-15 line script illustrating the concept is the right size, not a multi-function program.

No subagents for this phase, given the correctness-verification requirement benefits from one consistent authoring pass rather than parallel agents each re-deriving conventions — sequential work.

## Verification before finishing
- All 32 topics have exactly one new Python example added; existing examples on those topics untouched.
- Every `solution_code` actually ran and `expected_output` matches real captured output — confirm this was done, don't just assert it.
- Code-execution UI (Run/Submit, terminal panel) renders correctly on an Apprentice topic with a Python example, reusing Pyodide without a language picker.
- Existing prose/reasoning examples on all 673-example Apprentice bank still render and grade correctly — this must not regress.
- No changes to Expert's `?lang=` routing, Novice, Journeyman, Master, or Legend.
- Content-expansion word counts (`explanation` field) on these 32 topics are untouched — this phase only touches `examples`.

## After the work
- Summarize what changed in plain English + the real technical term for anything new.
- **Update CHRONICLE_OF_INFINIUM.md yourself, unprompted** — mandatory. Log this as a new decision: the gap identified (no hands-on coding before Expert), the resolution (Python-only, 32-topic, additive examples reusing Forge B's engine), and note this is a new ongoing item — decide and log whether more Apprentice sections (Version Control, Reading Real Code, AI) should eventually get this treatment too, or stay reasoning-only permanently, as an open question for a future session.
