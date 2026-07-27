## Codex Infinium — Expert Tier Content-Depth Expansion, Batch 4: C#

**Before writing anything:**
1. Read the attached `CHRONICLE_OF_INFINIUM.md` in full — current source of truth, includes the completed Python, JavaScript, and Java batches' approach.
2. Read the attached `knowledge_base.json` — do not assume topic IDs/content from the Chronicle alone.
3. I just attached these files if you need them.

**Files to read first:**
- CHRONICLE_OF_INFINIUM.md
- knowledge_base.json (specifically `tiers[].id === "expert"` → `language_tracks.csharp.topics`)

**Current task:**
Expand all 10 C# topics in the Expert tier's `language_tracks.csharp.topics` array from their current ~350-395 word `explanation` fields to 900-1800 words each, same 5-part skeleton as prior batches: hook → mechanism → connections → misconceptions → recap. Dual-layer throughout. Like Java, C# has no live in-browser execution (Forge B's grading falls back to key-concepts/answer-bank matching), so precision matters more than usual — be exact on CLR/IL mechanics, LINQ deferred execution, and nullable-reference-type semantics rather than hand-waving.

Topics (10):
cs_dotnet_ecosystem, cs_properties_syntax, cs_linq, cs_async_await_csharp, cs_delegates_events, cs_nullable_types, cs_asp_net, cs_unity_context, cs_generics, cs_interfaces_vs_abstract

**Constraints / things not to break:**
- Only touch `explanation` and `min_read_seconds` per topic — everything else (`hint`, `xp`, `game_type`, `examples`, `page_intro`) stays unchanged. Verify programmatically after.
- Recalculate `min_read_seconds` at 9.781 words/sec.
- Self-check word count (900-1800) during drafting — every batch so far has needed top-ups on the first pass.
- Check each new closer against the full existing closer list across all prior expanded topics (Novice/Apprentice/Journeyman/Expert-Python/JS/Java), not just this batch.
- Don't touch `language_tracks.python/javascript/java/cpp`, any other tier, or Forge's existing example content for these topics (C#'s authored "expected output" preview and answer-bank grading must keep working as-is).
- Draft-and-merge in one session, no subagents.
- PowerShell testing, no `&&` chaining.

**After the work:**
- Summarize what changed in plain English + real technical term for anything new.
- Update `CHRONICLE_OF_INFINIUM.md` yourself, unprompted, with: batch completion, word-count range achieved, and updated "next step" pointing to Batch 5 (C++, 10 topics — the final Expert batch).
