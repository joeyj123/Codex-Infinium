## Codex Infinium — Expert Tier Content-Depth Expansion, Batch 3: Java

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes the completed Python and JavaScript batches' approach.
2. Read the attached `knowledge_base.json` — do not assume topic IDs/content from the Chronicle alone.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (specifically `tiers[].id === "expert"` → `language_tracks.java.topics`)

**Current task:**
Expand all 10 Java topics in the Expert tier's `language_tracks.java.topics` array from their current ~350-395 word `explanation` fields to 900-1800 words each, same 5-part skeleton as the Python/JS batches: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout. Java has no live in-browser execution (Forge B's grading falls back to key-concepts/answer-bank matching for this track), so these explanations carry more of the teaching weight than Python/JS — be precise on JVM/bytecode mechanics, checked-exception semantics, and GC behavior rather than hand-waving.

Topics (10):
java_jvm_bytecode, java_strict_typing, java_oop_emphasis, java_interfaces, java_exceptions_checked, java_collections_framework, java_spring_overview, java_android_context, java_garbage_collection, java_maven_gradle

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — everything else (`hint`, `xp`, `game_type`, `examples`, `page_intro`) stays unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec.
- Self-check word count (900-1800) during drafting — every batch so far has come in short on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman/Expert-Python/Expert-JS), not just this batch.
- Don't touch `language_tracks.python/javascript/csharp/cpp`, any other tier, or Forge's existing example content for these topics (Java's authored "expected output" preview and answer-bank grading must keep working as-is).
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted, with: batch completion, word-count range achieved, and updated "next step" pointing to Batch 4 (C#, 10 topics).
