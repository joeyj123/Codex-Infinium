# Codex Infinium — Forge E: Full-Depth Example Bank (Resume-Aware)

*(Hand this to the coding agent as-is. Live files beat this doc. Do not assume stale topic/example counts.)*

## Ground rules (token + output discipline)
These exist because the last Forge E attempt burned a full session on 9 parallel agents and died mid-write.

1. **Parent agent reads once.** Read `CHRONICLE_OF_INFINIUM.md` + verify live counts in `data/knowledge_base.json` once at session start. Subagents do **not** re-read the Chronicle or the whole KB.
2. **Subagent prompts stay tiny.** Each subagent gets: this schema block, its section's topic list (id + title + explanation only), target example count, and the output path. Nothing else.
3. **Max 2–3 parallel authoring agents at a time** (not 9). Finish/merge a wave before launching the next. Usage limits kill oversized waves.
4. **Author to scratchpads only.** Never have subagents write `knowledge_base.json` directly. One parent merge script per completed section.
5. **Resume from live file, never re-author completed work.** If a topic already has ≥8 examples in the live KB, skip it.
6. **Checkpoint after Apprentice.** Author → merge → self-audit → report counts → **stop and wait for go-ahead** before Journeyman. Same pattern for every later tier.
7. **Outputs stay short.** Status reports = counts + flags only. Do not dump example text into chat. Do not rewrite this prompt into the Chronicle until the tier checkpoint is done.
8. **PowerShell:** sequential commands only — no `&&` chaining.
9. **Voice:** dual-layer (plain English + real term) inside authored content. Chat about the work stays concise.

---

## Live resume state (verify before writing — do not trust this blindly)

Curriculum expansion already landed: **302 topics** (Novice 57 / Apprentice 69 / Journeyman 68 / Master 34 / Expert 56 / Legend 18).

**Apprentice — DONE (checkpointed):** 69/69 topics, **673 examples**, `FORGE_READY_TIERS` includes `apprentice`. Do not re-author Apprentice.

**Next session after Joey's go-ahead:** Journeyman (68 topics, currently empty examples) — same prose schema / depth / merge rules; unlock `"journeyman"` when merged.

---

## 1. Schema (Forge A2 prose — match live Novice examples)

```json
{
  "id": "topicid_exN",
  "prompt": "...",
  "steps": ["...", "..."],
  "hints": ["...", "..."],
  "solution_summary": "...",
  "key_concepts": ["...", "..."],
  "answer_bank": ["...", "...", "..."]
}
```

- `key_concepts`: 3–6 **plain strings** (match live Novice — not synonym objects). Global synonym handling already lives in `lib/grading.js`; do not invent a new per-concept synonym schema.
- `answer_bank`: 2–4 genuinely differently-phrased acceptable answers (not near-duplicates of each other or of `solution_summary`).
- **No** `starter_code` / `solution_code` / `expected_output` on Apprentice–Legend prose examples (Expert-only later).
- Grading path: existing `gradeAnswer()` — do not touch the grading engine this phase.
- Example `id`s must be unique within the topic and not collide with any existing ids in that topic's bank.

---

## 2. Content standard
- **Target 8–12 examples per topic.** Richer topics can go 12–15+ if scenarios stay distinct. Narrow topics: still aim ≥5–6 genuinely different angles — cut only true redundancy, don't pad.
- Each example must **apply** the concept (trace / spot-the-error / pick-an-approach / compare / novel case). Never restate the `explanation` as a question.
- **Vary question shape within each topic's bank.** Same template with swapped nouns = fail.
- Dual-layer: if a new technical term appears that the topic's `explanation` didn't define, define it briefly inline.
- **No code blocks or terminal output** in Apprentice–Legend prose examples. Describe scenarios in plain language (you may describe what a short snippet *would* do without pasting code).
- Quality > volume theater. Distinct scenarios only.

### Apprentice-specific
Core / languages / OOP / functional / git / reading-code / AI — good fit for "trace this scenario," "spot the bug," "which approach fits," and compare/contrast prompts. Describe any "code" situation in words.

---

## 3. Process for this Apprentice finish

### Suggested waves (≤3 agents each)
1. `core` (13) — possibly split 7+6 if needed
2. `languages` (12) — split 6+6 if needed
3. `data_structures` (6) + `oop` (5) + `functional` (3)
4. `git` (5) + `ai` (7)
5. `ai_advanced` (8)

Merge + validate after each wave (or each section), not at the end of all 59.

### Merge safety
Reuse / recreate a small Node merge script that:
1. Loads scratchpad JSON for one section
2. Asserts every example has all 7 required fields with correct types
3. Asserts every topic in that section reaches target depth
4. Writes into `data/knowledge_base.json` only for those topic ids
5. Re-parses the full file and prints before/after example counts

Do **not** hand-edit the giant JSON.

### Required small unlock (not a mechanism overhaul)
After Apprentice examples are merged, add `"apprentice"` to `FORGE_READY_TIERS` in:
- `app/forge/page.js`
- `app/forge/[tierId]/page.js`
- `app/forge/[tierId]/topic/[topicId]/page.js`

Otherwise the new banks exist but The Forge UI still treats Apprentice as locked. Do this once at Apprentice checkpoint — same pattern later for other tiers. Do **not** change exposure levels, grading, XP, or reference-pane behavior.

### Self-audit before reporting Apprentice done
- Every Apprentice topic has ≥ target depth with full schema
- Spot-check ~5 topics across different sections for shape variety + answer_bank diversity
- Report: topics done / total examples / any sections skipped as already complete
- **Pause for Joey's go-ahead**

---

## 4. Later tiers (do not start this session — kept for continuity)

Order after Apprentice checkpoint + go-ahead:
1. Journeyman (68) — same prose schema / depth / merge rules; unlock `"journeyman"` in `FORGE_READY_TIERS` when merged
2. Master (34) — same; unlock `"master"`
3. Legend (18) — capstone topics may use lighter reflective prompts (1–2 is fine if a graded technical example doesn't fit); unlock `"legend"`
4. **Novice re-expansion** (57 topics) — **append only**, never delete/edit existing examples; bring each topic up to 8–12+ with fresh ids
5. **Expert re-expansion** (56 topics / 5 tracks) — Forge B **code** schema; Python/JS must execute to set `expected_output`; Java/C#/C++ hand-trace; sandbox-safety (no real third-party libs); target ~5–8 per topic; unlock already present
6. **§7 Study preview strip** (small code) — on a topic's **last** Study page, show 1–2 examples as read-only `prompt` + `solution_summary` + "Try more in The Forge →". No grading/XP. Only if `examples.length > 0`. Flag briefly before building. **Not this session.**

---

## Explicitly out of scope (this whole Forge E phase)
- Forge mechanism changes beyond `FORGE_READY_TIERS` unlocks
- Code execution / code examples outside Expert
- Glossary expansion past Novice
- Reference-pane bugs / Forge B browser verification (refinement pass later)
- Writing new topic `explanation` fields (curriculum gap work is done — examples only)
- Study pagination / `##` header textbook-depth work (separate prompt)
- **The Crucible / Forge G games** — separate phase; do not build, scaffold, or mix into this prompt

## After Apprentice checkpoint
Log a short Chronicle entry: resume counts, sections completed this session, total Apprentice example count, and that `FORGE_READY_TIERS` now includes apprentice. Save the full six-tier final tally for when Forge E is actually finished.
