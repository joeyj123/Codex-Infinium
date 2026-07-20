# Claude Code Kickoff Template — Codex Infinium

Copy/paste this at the start of every Claude Code session, fill in the [TASK] section, and attach CODEX_INFINIUM_HANDOFF.md.

---

**Before writing any code:**
1. Read the attached `CODEX_INFINIUM_HANDOFF.md` in full — it's the current source of truth on project state, structure, rules, and open items.
2. Read the actual current files relevant to this task (list them below) — do not assume what's in them from the handoff doc alone. The handoff doc describes intent/history; the files are ground truth.
3. Confirm current versions in use (Next.js, React, etc. — check package.json) before changing dependencies or patterns.
4. Do not regress or undo prior fixes noted in the handoff doc (e.g., the Expert tier's `?lang=` query param routing fix, localStorage-based progress, plain-CSS-no-Tailwind setup) unless the task explicitly asks you to change that.
5. If a planned change touches content (topics, wording, structure) or is a large structural change, propose the plan/list first and wait for approval before generating everything.

**Files to read first:**
- CODEX_INFINIUM_HANDOFF.md
- [relevant files, e.g. data/knowledge_base.json, lib/ProgressContext.js, app/tier/[tierId]/page.js]

**Current task:**
[TASK] — describe what you want done this session.

**Constraints / things not to break:**
- [any specific thing you tested/liked that must survive this change]

**After the work:**
- Summarize what changed in plain English + the real technical term for anything new.
- Update CODEX_INFINIUM_HANDOFF.md if this session changes tech stack, structure, or open items.

---

### Notes on using this
- Keep the handoff doc itself updated after every session — it's the memory Claude Code doesn't otherwise have.
- For content-only sessions (rewriting topics), you may not need code file reads — just the handoff doc + knowledge_base.json.
- For UI/structural sessions, always include the specific component/page files being touched.
