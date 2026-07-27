## Task: Deepen remaining tiers of knowledge_base.json to match Novice tier standard

**Files to read first (in this order):**
1. CODEX_INFINIUM_HANDOFF.md — project context and content rules
2. data/knowledge_base.json — the Novice tier (`tiers[0]`) has already been rewritten to the target depth. Read several Novice topics as your calibration reference before writing anything.

**What to do:**
Rewrite the `explanation` field for every topic in the remaining tiers — Apprentice, Journeyman, Master, Expert (all 5 language_tracks), and Legend (206 topics total) — to match the depth, structure, and voice of the Novice tier topics.

**Standard to hit, per topic:**
- Target 400-450 words (hard floor: never under 300; it's fine to run longer if the concept genuinely needs it — don't pad to hit a number).
- Every technical term gets its real, precise CS definition — not just a plain-English analogy. If a casual word (e.g. "output," "state," "handler") has a specific technical meaning in this context, spell that meaning out explicitly.
- Keep the plain-English intuition too — this is additive (dual-layer), not a replacement. Beginners with zero CS background are the audience.
- Do NOT touch `hint`, `xp`, `game_type`, `id`, `section`, or `title` fields — only `explanation`.
- Recalculate `min_read_seconds` for each topic after rewriting: `round(word_count / 200 * 60)`.
- Building-forward principle: where a later-tier topic genuinely connects to an earlier concept (e.g. pointers connecting back to RAM addresses from Novice), make that connection explicit — but don't force a callback where none genuinely exists.

**Special case — Expert tier:**
This tier uses `language_tracks` (an object keyed by language: python, javascript, java, csharp, cpp) instead of a flat `topics` array. Iterate each language track's `topics` array separately.

**Required self-audit before returning results (run this, don't just eyeball it):**
1. Word count per topic — flag anything under 300 words.
2. Scan for generic filler phrases ("in today's world," "it's important to note," "at the end of the day," etc.) — flag and rewrite any hits.
3. Report min/max/average word count across all rewritten topics when done.
4. Spot-check 3-4 topics per tier against the Novice tier's actual depth (e.g. how "CPU basics" or "binary_to_electricity" handles a technical term) to confirm you're matching that bar, not a lighter one.

**Process:**
Do this one tier at a time (Apprentice first), show a word-count/audit summary after each tier, and pause for approval before moving to the next tier — don't run all 206 topics in one shot with no checkpoint.
