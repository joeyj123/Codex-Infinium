## Codex Infinium — Expert Tier Content-Depth Expansion, Batch 5 (FINAL): C++

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes the completed Python, JavaScript, Java, and C# batches' approach (note: the C# batch found the kickoff's topic ID list didn't match the live file — verify IDs the same way here before drafting).
2. Read the attached `knowledge_base.json` — pull the actual 10 topic IDs from `language_tracks.cpp.topics` directly. Do NOT use the list below as ground truth; it's a best guess and may be wrong the same way the C# one was.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (specifically `tiers[].id === "expert"` → `language_tracks.cpp.topics`)

**Current task:**
Expand all 10 C++ topics in the Expert tier's `language_tracks.cpp.topics` array from their current ~350-395 word `explanation` fields to 900-1800 words each, same 5-part skeleton as prior batches: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout. C++ has no live in-browser execution (Forge B's grading falls back to key-concepts/answer-bank matching, hand-traced during authoring), so precision matters — be exact on memory model details (stack vs. heap, RAII destructor-during-unwind ordering, smart pointer reference counting) rather than hand-waving. This is the final Expert batch — closes out the tier at 56/56.

Best-guess topics (VERIFY against the live file before using — likely wrong, confirm exact IDs first):
cpp_manual_memory, cpp_pointers_references, cpp_raii, cpp_smart_pointers, cpp_templates, cpp_stl_containers, cpp_compilation_model, cpp_game_engines, cpp_undefined_behavior, cpp_performance_tradeoffs

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — everything else (`hint`, `xp`, `game_type`, `examples`, `page_intro`) stays unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec.
- Self-check word count (900-1800) during drafting — every batch so far has needed top-ups on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman/Expert-Python/JS/Java/C#), not just this batch.
- Don't touch other `language_tracks`, any other tier, or Forge's existing example content for these topics (C++'s authored "expected output" preview and answer-bank grading must keep working as-is).
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new, and flag if the topic IDs differed from the best-guess list above.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted: mark Expert tier content-depth expansion as fully complete (56/56), note word-count range achieved, and set "next step" to Master tier (34 topics, content-depth expansion AND full Forge example authoring from scratch — 0 examples currently).
