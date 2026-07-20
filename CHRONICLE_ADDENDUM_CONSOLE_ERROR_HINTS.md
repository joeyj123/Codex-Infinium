## Session: New idea — in-browser "console" error/hint feedback (folds into Forge F/G backlog)

**Idea**: instead of (or alongside) AI-based grading, build a Chrome-console-style in-browser panel where the user types code and gets real-time feedback on syntax errors, typos, and bugs — a brief plain-English hint about what's wrong, gated by the existing Guided/Challenge/Gauntlet help-availability modes (Guided = shown proactively, Challenge = reveal on click, Gauntlet = raw error only or none).

**Feasibility assessment**: this is NOT AI grading — it's real deterministic error feedback, fully offline, no API cost, and mostly an extension of what Forge B already built:
- **Python/JS**: Pyodide (real CPython) and the sandboxed JS Web Worker already execute real code and already throw real errors (SyntaxError, IndentationError, NameError, TypeError, etc.) — currently these are only used internally to mark grading as "needs review." The new work is surfacing the actual error + mapping common error types to friendly, mode-gated hints, not building new execution infrastructure.
- **Java/C#/C++**: still no in-browser compiler without a backend (same standing limitation as Forge B) — these three stay on the authored-preview/pattern-match grading path, this feature doesn't apply to them.

**Status**: not scoped, logged as a concrete addition to the existing Forge F (The Workshop) / Forge G (The Crucible) backlog rather than a new standalone item. Revisit when that backlog is picked up, after all Journeyman/Master/Legend example banks are finished.
