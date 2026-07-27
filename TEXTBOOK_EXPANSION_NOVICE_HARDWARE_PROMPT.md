# Codex Infinium — Textbook Expansion: Novice → Hardware (remaining 8 topics)
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first — including the approved pilot session and its 3 draft topics as your voice/depth calibration reference — then the actual current files.)*

## Section for this session
**Novice → Hardware (remaining 8 topics)** — `what_is_a_computer`, `cpu_basics`, and `ram_vs_storage` are already done (the approved pilot). This session covers the rest of that section:

| Topic ID | Title | Current words | Has examples? |
|---|---|---|---|
| motherboard | The Motherboard: How Parts Talk to Each Other | 381 | yes (2) |
| gpu_basics | The GPU: Why Graphics/AI Need a Different Chip | 404 | yes (3) |
| transistors_logic_gates | Transistors & Logic Gates (AND/OR/NOT) | 391 | yes (3) |
| binary_basics | Binary: How 0s and 1s Become Everything | 397 | yes (3) |
| binary_to_electricity | How Binary Becomes Electricity (Voltage High/Low) | 410 | yes (2) |
| storage_hardware_ssd_hdd | Storage Hardware: How an SSD and a Hard Drive Actually Store Data | 412 | no |
| io_devices_usb | Input/Output Devices & USB: How Peripherals Talk to a Computer | 400 | no |
| displays_basics | Displays: Resolution, Refresh Rate & How a Screen Builds an Image | 385 | no |

## Hard caps
- This section only — do not continue into Firmware or any other section
- 8 topics — split into 2 subagent groups if useful (e.g. Group A: motherboard, gpu_basics, transistors_logic_gates, binary_basics; Group B: binary_to_electricity, storage_hardware_ssd_hdd, io_devices_usb, displays_basics), or sequential if that's cleaner — your call
- Present all 8 drafts back for review before writing anything to `knowledge_base.json` — same as the pilot session, nothing gets merged without sign-off

## Content structure (same 5-part skeleton as the approved pilot)
1. Opening hook/overview — what this is and why it matters
2. The mechanism — real technical depth, how it actually works step by step
3. How it connects — genuine ties to prior/adjacent topics (especially back to `what_is_a_computer`, `cpu_basics`, `ram_vs_storage` where real, since this section follows those directly)
4. Common misconceptions / where beginners trip up
5. Plain-English recap — "if you remember one thing" closer

**Target length**: roughly 1000-1800 words per topic, whatever the concept genuinely warrants — don't pad, don't force uniform length across all 8.

**Keep the dual-layer rule**: plain-English analogy AND the real technical term, always both.

## IMPORTANT — fix from the pilot session, apply this time
The 3 pilot drafts were approved on content quality, but flagged for a real structural issue: all 3 used near-identical connective language — every topic closed with the literal phrase "If you remember one thing from this topic, remember this:" and every misconceptions section followed the identical "The most common misconception... A second... A third..." pattern. That reads as a template stamped onto every chapter once it repeats across dozens of topics, not genuine writing.

**Keep the 5-part skeleton above, but vary the actual language topic to topic**: different phrasing for the recap closer, different framing for how misconceptions are introduced and counted, different transitional language between sections. Each topic should feel individually written, not like the same mad-libs frame refilled 8 times. This is the same instruction already given to Forge E's example content ("vary question shape, don't template one structure") — apply it here too.

## Do NOT touch
`hint`, `xp`, `id`, `section`, `title`, `min_read_seconds`, or the `examples` array — only rewrite `explanation`.

## Explicitly out of scope this session
- Any topic outside this list of 8
- Any other Novice section (Firmware, OS, CLI, Networking, Software, History, Physics — all still queued, one section per session)
- XP retuning — explicitly on hold until Forge/Games/Exercise/Quiz are all complete, do not touch `lib/forgeXp.js` or any XP values this session
- Master/Legend example-bank authoring, Novice's example-content gap, desktop app packaging — all separate, on hold

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any code changes in plain English first, real technical term alongside (though this session should be content-only, no code changes expected)
- Log this session's decisions/outcomes into The Chronicle of Infinium
- Stop after presenting the 8 drafts — wait for explicit sign-off before merging into `knowledge_base.json`, then wait again before starting the next section
