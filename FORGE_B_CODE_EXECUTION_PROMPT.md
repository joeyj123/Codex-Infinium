# Codex Infinium — Forge B: Code Execution & Expert Tier Content
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current files.)*

## Scope
Two things bundled together, same pattern as Forge A/A2: the code preview/execution **mechanism**, and enough authored **code-containing example content** to actually use it. This phase covers all 56 Expert-tier topics across all 5 language tracks (Python 15, JavaScript 11, Java 10, C# 10, C++ 10).

---

## 1. Execution model — two tiers of capability
- **Python and JavaScript**: real, live in-browser execution.
  - JavaScript runs natively — no extra library needed, but must be sandboxed (don't let user code touch the real page/DOM; capture `console.log` output into the preview terminal instead of the real browser console; enforce an execution timeout to guard against infinite loops in submitted code).
  - Python runs via **Pyodide** (Python compiled to WebAssembly). Lazy-load it only when a Python example is actually opened — it's a real download (~6MB+) and shouldn't add weight to every page load. Same timeout/sandboxing care as JS.
- **Java, C#, C++**: no live execution path exists without a backend, which is explicitly out of scope (staying free/no-infrastructure per the established stance). These use **authored preview output** — a static block written once showing what the correct solution would print, displayed in the same terminal-style UI so the experience feels consistent even though it isn't live.

## 2. Data model — extend the example schema for code topics
```
{
  ...existing fields (prompt, steps, hints, solution_summary)...,
  "starter_code": "...",       // optional stub shown in the answer box
  "solution_code": "...",      // the actual worked-out correct solution
  "expected_output": "...",    // what running solution_code produces (Python/JS) or the authored preview (Java/C#/C++)
  "key_concepts": [...],       // still used as a fallback for Java/C#/C++ grading
  "answer_bank": [...]         // still used as a fallback for Java/C#/C++ grading — a few structurally-varied correct approaches, not just one canonical solution
}
```

## 3. Grading logic — branches by language
- **Python/JS**: run the user's submitted code, capture its actual output, compare against `expected_output` (normalize whitespace before comparing). This is real correctness checking, not pattern-matching — a match is a match. Grade tier: exact/near-exact output = Strong, partially-correct output = Partial, error or wrong output = Needs review.
- **Java/C#/C++**: same offline grading engine built in Forge A2 (concept coverage + best-match similarity against `answer_bank`), applied to the submitted code text instead of prose.
- XP scaling (exposure level × grade tier) reuses the existing system from Forge A2 — no changes to that formula.

## 4. UI
- Answer box becomes a code input (monospace textarea is sufficient for v1 — syntax highlighting is a nice-to-have, not required)
- A terminal-styled output panel shows either the live captured output (Python/JS) or the authored preview (Java/C#/C++) — visually consistent regardless of which path produced it, but don't misrepresent an authored preview as if it were live output (small honest label distinguishing "Output" vs "Expected output" is fine)
- Everything else — Guided/Challenge/Gauntlet gating, reference pane, submit-once XP tracking — reuses Forge A/A2's existing mechanics unchanged

## 5. Content authoring — all 56 Expert topics, all 5 tracks
- Aim for **2 examples per topic** (lower than Novice's 3-4 — code examples take longer to write and verify correctly, quality matters more than volume here)
- **Critical**: for Python/JS, `solution_code` must actually be executed during authoring to confirm `expected_output` is genuinely correct — don't write code and assume it works, since real users will be graded against it. For Java/C#/C++, review the code carefully by hand since there's no way to verify by running it.
- Splitting the authoring work by language track (5 tracks = 5 parallel batches) worked well for the Forge A2 answer-bank content — reuse that approach here if it fits.
- Match the existing voice: prompts should be real coding challenges appropriate to that topic's concept, not generic exercises unrelated to what the topic actually teaches.

---

## Explicitly out of scope
- Any backend/API-based execution for Java/C#/C++ — staying free/no-infrastructure
- Glossary (Forge C), utility drawer (Forge D) — next in queue
- Reference pane bugs (return path, highlighting) — still deferred to the consolidated refinement pass after C and D
- Apprentice/Journeyman code-teaching topics — Expert only this phase

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside
- Don't regress The Study, Expert `?lang=` routing, the progress/XP system, or Forge A/A2's existing mechanics
- Log this phase's decisions into The Chronicle of Infinium
