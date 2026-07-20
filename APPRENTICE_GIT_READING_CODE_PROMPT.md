# Codex Infinium — Apprentice Content Expansion: Version Control + Reading Real Code
*(Hand this to Claude Code as-is. I just attached these files if you need them: CHRONICLE_OF_INFINIUM.md, data/knowledge_base.json.)*

## Task
Expand these 10 topics (`section: "git"` and `section: "reading_code"`) from their current ~310-470 word depth to the established Apprentice standard: **900-1800 words**, 5-part skeleton (hook → mechanism → connections → misconceptions → recap), dual-layer throughout (plain-English analogy + real technical term, always both).

**Topic IDs (confirmed against the live knowledge_base.json, in order):**

Version Control (`git`):
1. `what_is_git`
2. `commits_branches_repos`
3. `merge_conflicts`
4. `pull_requests`
5. `why_github_gitlab`

Reading Real Code (`reading_code`):
6. `reading_others_code`
7. `naming_conventions`
8. `code_style_formatting`
9. `what_is_clean_code`
10. `common_beginner_mistakes`

## Process
1. Read each topic's current `explanation` field — expand and deepen, don't discard.
2. Draft-and-merge in one session.
3. **Self-check word count during drafting, not after.** Every batch so far has come in short on the first pass and needed genuine added content. Build the check in from the start — target the full 900-1800 range, not the floor.
4. Vary connective/transitional language and closer phrasing. Before finalizing each closer, check it against the full existing closer list — all 101 completed topics (57 Novice + 13 Core Programming Concepts + 12 Language Landscape + 11 Data Structures/Data + 8 OOP/Functional) — and against the other 9 topics in this batch. No repeats in either direction.
5. Building-forward chaining where genuinely relevant — e.g. `what_is_git` sets up `commits_branches_repos`; `merge_conflicts` builds on branching; `pull_requests` and `why_github_gitlab` connect Git's local mechanism to collaborative workflows; `reading_others_code` sets up `naming_conventions`/`code_style_formatting`, which both feed into `what_is_clean_code`; `common_beginner_mistakes` can close the section by tying back to earlier Apprentice pitfalls (e.g. Core Programming Concepts' errors/debugging topic) where genuine. Don't force connections that aren't real.
6. No subagents — sequential work.
7. Recalculate `min_read_seconds` for all 10 topics using the confirmed real reading pace: **9.781 words/sec**.
8. Do not touch `examples`, `hint`, `page_intro`, or `xp` on these 10 topics — expansion is `explanation`-field only.
9. Do not touch any Novice topics, any other Apprentice topics/sections, or any other tier.

## Verification before finishing
- All 10 topics land in the 900-1800 word range.
- All 10 new closers are distinct from each other and from every closer in the 101 prior topics.
- `examples`/`hint`/`page_intro`/`xp` unchanged on all 10 topics.
- All other tiers/sections unchanged — confirm topic counts stay the same everywhere (Novice 57, Apprentice 69 total, Journeyman 68, Master 34, Expert 0, Legend 18).

## After the work
- Summarize what changed in plain English + the real technical term for anything new, same as prior sessions.
- **Update CHRONICLE_OF_INFINIUM.md yourself, unprompted** — this is mandatory. Log: topics completed this session, word count range, any genuinely new technical content added, closer-variety confirmation, and updated Apprentice progress (44/69 → 54/69). Update the "Immediate next step" section to point to the next batch: AI + AI Going Deeper (15 topics) — the final batch for Apprentice.
