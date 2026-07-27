## Codex Infinium — Expert Tier Content-Depth Expansion, Batch 1: Python

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth.
2. Read the attached `knowledge_base.json` — do not assume topic IDs/content from the Chronicle alone.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (specifically `tiers[].id === "expert"` → `language_tracks.python.topics`)

**Current task:**
Expand all 15 Python topics in the Expert tier's `language_tracks.python.topics` array from their current 312-409 word `explanation` fields to 900-1800 words each, following the same 5-part skeleton used for Novice/Apprentice/Journeyman: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout (plain-English analogy + real technical term, always both) — this content teaches actual Python, so technical accuracy matters more than in prose-only tiers; verify claims about language behavior rather than guessing.

Topics (15):
py_zen_and_pep8, py_list_comprehensions, py_generators, py_decorators, py_context_managers, py_virtual_environments, py_pip_and_requirements, py_pandas_numpy_intro, py_streamlit_specifics, py_flask_django_overview, py_type_hints, py_error_handling_idioms, py_async_specifics, py_common_libraries_overview, py_project_structure

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — `hint`, `xp`, `game_type`, `examples`, `page_intro` all stay unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec (real observed reading pace).
- Self-check word count (900-1800) during drafting, not after — nearly every prior batch came in short on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman), not just this batch.
- Don't touch `language_tracks.javascript/java/csharp/cpp`, any other tier, or Forge's existing example content for these topics (already complete, verified working — live Python execution via Pyodide must keep working).
- Draft-and-merge in one session, no subagents (per standing process).
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted, with: batch completion, word-count range achieved, and updated "next step" pointing to Batch 2 (JavaScript, 11 topics).
