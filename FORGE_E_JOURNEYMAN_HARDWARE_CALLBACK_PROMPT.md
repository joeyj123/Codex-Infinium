# Codex Infinium — Forge E Session: Journeyman → Hardware Callback
*(Hand this to Claude Code as-is, alongside CHRONICLE_OF_INFINIUM.md and FORGE_E_SESSION_TEMPLATE.md.)*

## Section for this session
**Journeyman → Hardware Callback** (9 topics, 0 examples currently):

| Topic ID | Title |
|---|---|
| memory_addresses_pointers_tieback | Memory Addresses, Revisited |
| infinite_loop_cpu | Why an Infinite Loop Pins Your CPU |
| memory_leak | What a Memory Leak Physically Is |
| process_scheduling | Process Scheduling: How the OS Decides What Runs When |
| virtual_memory_paging | Virtual Memory & Paging |
| semaphores_mutexes | Semaphores & Mutexes: Coordinating Access to Shared Resources |
| deadlocks | Deadlocks |
| assembly_machine_instructions | Assembly Language & Machine Instructions |
| risc_cisc_pipelining_cache | RISC vs. CISC, Instruction Pipelining & Cache Hierarchy |

## Hard caps
- 2-4 examples per topic (ceiling, not target)
- This section only — do not continue into ai_building
- 9 topics — split into 2 subagent groups: Group A (memory_addresses_pointers_tieback, infinite_loop_cpu, memory_leak, process_scheduling, virtual_memory_paging), Group B (semaphores_mutexes, deadlocks, assembly_machine_instructions, risc_cisc_pipelining_cache)

## Schema (match exactly — see Databases/Web/Concurrency sections for a worked reference)
Each example needs: `id`, `prompt`, `steps` (array), `hints` (array), `solution_summary`, `key_concepts` (3-6), `answer_bank` (2-4 differently-phrased acceptable answers).

## Content-writing rules
- `prompt` requires applying the concept, not restating the topic's `explanation`
- Vary question shape across the 9 topics — don't template one structure
- Match existing dual-layer voice: plain-English + real technical term, no filler
- This section is the "hardware callback" — where genuinely relevant, tie back to Novice-tier hardware concepts (e.g. memory_addresses_pointers_tieback should genuinely reference RAM/addressing from Novice), but don't force a callback where none exists
- Conceptual/scenario topics — no `solution_code`/`expected_output` needed (assembly_machine_instructions may reference small instruction snippets in `steps`/`prompt` text, but this isn't a code-execution topic — no live grading against real output)

## End-of-session checklist
- [ ] All 9 topics have 2-4 examples
- [ ] Schema validation passes
- [ ] Voice/quality self-audit, not just structural validity
- [ ] Update resume table in FORGE_E_SESSION_TEMPLATE.md
- [ ] Log to Chronicle
- [ ] Stop — do not continue into next section (ai_building is the last Journeyman section remaining after this)
