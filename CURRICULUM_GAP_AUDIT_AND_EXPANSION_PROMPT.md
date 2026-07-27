# Codex Infinium — Curriculum Gap Audit & Expansion
*(Hand this to Claude Code as-is. Read The Chronicle of Infinium in full first, then the actual current `data/knowledge_base.json` — don't assume state from either doc.)*

## Why this phase exists
The Grand Vision is explicit: take Joey from zero to roughly bachelor's-degree-equivalent CS breadth — "literally everything a computer can do and the science behind it." The 259 existing topics are strong on what they cover, but a structural review against real CS curricula (intro programming, data structures & algorithms, computer organization/architecture, operating systems, networking, databases, theory of computation, software engineering) turned up real, substantive holes — not nitpicks, whole subject areas with zero topics. This phase is a full gap audit followed by an actual expansion pass, same authoring standard as everything else in this project (dual-layer explanations, ~300-500 words, no filler).

**This is a big lift. Treat it like Forge B/A2's scale, not a quick patch.** Go tier-by-tier or subject-by-subject with checkpoints, same pattern as the content-rewrite prompt — don't try to author 100+ new topics in one uncheckpointed pass.

---

## 1. Confirmed gaps (verified by direct search against the live file — these are not speculative)

### A. Data structures — the biggest single hole
Apprentice's `data_structures` section currently has only 4 topics: Arrays/Lists, Dictionaries/Maps, Sets, Stacks & Queues. That's it. **There is no dedicated topic anywhere in all 259 for**: linked lists, binary trees / general trees, graphs (as a data structure, not just distributed-systems concepts), hash tables (the internal mechanism — separate from "Dictionaries/Maps" as a language feature), or heaps/priority queues. These are core to any real CS breadth claim and are prerequisite to algorithms topics that assume them.

### B. Algorithms — thin beyond sorting/searching
Journeyman's `mechanics` section has Big O, Sorting Algorithms, Searching Algorithms, Recursion — good foundation, but nothing on: graph traversal (BFS/DFS), shortest-path algorithms (Dijkstra at least conceptually), dynamic programming, greedy algorithms, or divide-and-conquer as a named paradigm distinct from recursion generally.

### C. Networking/wireless — confirmed genuinely missing
This is what prompted the audit. Novice's `networking` section covers What the Internet Physically Is, IP Addresses, Server/Client, The Cloud, DNS — solid start, but WiFi and cellular are only ever mentioned in passing inside other topics' explanations (confirmed by direct text search), never explained as their own subject. **No topic anywhere covers**: what WiFi actually is (802.11, radio frequency, routers/access points, why range/interference happens), what Bluetooth is and how it differs from WiFi (short-range pairing vs. network infrastructure), the OSI model or TCP/IP layers as a named framework, TCP vs. UDP (reliable vs. fast delivery), ports (what a port number is, why 80/443/22 matter), MAC addresses vs. IP addresses, subnetting basics, VPNs, or cellular generations (3G/4G/5G, what actually changed between them).

### D. Operating systems / computer architecture — internals missing
Novice's `os` section and Journeyman's `hardware_callback` touch OS concepts at a survey level, but real internals are absent. **No topic covers**: process scheduling (how the OS decides what runs when), virtual memory and paging (how RAM addresses get remapped — connects directly to the existing Memory Addresses/memory leak topics), deadlocks, semaphores/mutexes as a named synchronization concept (mutex appears once in passing, no dedicated topic), interrupts, or assembly language / machine instructions (mentioned once in passing under source-code-to-machine-code, never its own topic). Also missing: RISC vs. CISC, instruction pipelining, cache hierarchy (L1/L2/L3) as its own topic — cache is mentioned under CPU basics but not explained as a concept in its own right.

### E. Theory of computation — entirely absent
No topic anywhere covers Turing machines, the halting problem, or computability/decidability. No topic covers P vs. NP or NP-completeness (Big O covers complexity of specific algorithms, but never touches complexity *classes*). This is a standard unit in any CS degree and currently doesn't exist at all.

### F. Databases — survey-level only
Journeyman's `databases` section covers relational basics, SQL, joins, indexes — good — but never mentions: ACID properties, transactions, normalization (1NF/2NF/3NF), or NoSQL database *types* specifically (document, key-value, column, graph — "NoSQL" appears twice only in passing, never as its own explained topic with its actual variants).

### G. Software engineering practice — process is missing
Journeyman's `architecture` section covers technical patterns (MVC, middleware, testing, logging) but nothing on: the software development lifecycle, Agile/Scrum as actual named methodologies, requirements gathering, or code review as a practice (distinct from "Reading Someone Else's Code," which is about reading style, not the review *process*).

### H. Hardware/peripherals beyond CPU/RAM/GPU
Novice's `hardware` section is thorough on CPU/RAM/motherboard/GPU but has no topic on: storage hardware internals (SSD vs. HDD — how each physically stores data, confirmed only mentioned in passing elsewhere), input/output devices and USB as a standard, or displays (resolution, refresh rate, how a screen renders an image) — construction-relevant given Joey's interest in physical systems.

### J. File types/formats — real gap, not just theoretical
Novice's `os` section has "What a File Actually Is" and "File Paths," but nothing ever explains file *types* — what actually makes a `.jpg` different from a `.png`, what a container format is vs. a codec, what an archive (`.zip`) actually does (compression, bundling multiple files), what a disk image (`.iso`) is and why it exists (a byte-for-byte copy of an optical disc or drive), and — directly relevant to Joey's current real-world use case — what a **ROM** is in the emulation sense (a dumped copy of a game cartridge/disc's data) and how an **emulator** works (software that mimics another system's hardware so that dumped software can run on different hardware than it was built for). This connects naturally back to existing Novice hardware/firmware topics (What a Program Is, Firmware vs. Software vs. Hardware) and is a genuinely missing subject, not a nice-to-have.

### K. Frontend frameworks — exists, but too late to be useful
"React & Vue (Frameworks)" currently only exists as one topic buried in Expert's JavaScript language track — meaning a learner (or Joey specifically, whose own app is built on Next.js/React) won't hit *any* explanation of what a frontend framework is or why they exist until very late in the curriculum, despite it being directly relevant to a project he's already building. The Expert-tier topic should stay as the deep JS-specific dive, but an earlier, framework-agnostic conceptual topic — what a frontend framework actually is, why plain HTML/CSS/JS eventually needs one at scale, component-based UI as a pattern, roughly where React/Vue/Angular/Next.js fit relative to each other — is a real, confirmed gap that belongs earlier (Apprentice or Journeyman, alongside the existing Language Survey / web fundamentals content).

### L. Smaller confirmed gaps worth folding in if space allows
- Licensing/open source (MIT, GPL, proprietary — what a license actually permits/restricts)
- Accessibility (a11y) as a real engineering concern, not just a nice-to-have
- Version control beyond Git basics: `.gitignore`, tagging/releases (lightweight, don't overbuild)
- Build tools/bundlers (webpack/Vite-equivalent concept) — currently only CMake gets a topic, and only for C++

---

## 2. What NOT to do
- Don't rewrite or touch any existing 259 topics' `explanation` fields — this is pure addition, not another rewrite pass.
- Don't invent topics beyond genuine, confirmed CS-breadth gaps — if you find a candidate topic while doing this work that isn't in the confirmed list above, flag it for approval rather than silently adding it.
- Don't restructure existing tiers/sections to make room — new topics should slot into existing sections where a natural fit exists (e.g. WiFi/Bluetooth into Novice's `networking` section) or become a new section within an existing tier where nothing fits (e.g. a new `data_structures_advanced` section in Journeyman for trees/graphs/heaps, since Apprentice's tier is meant to stay introductory).
- **Hard constraint, applies to the entire phase**: this is a content-data-only phase. Do not touch, refactor, rename, or "clean up" any existing app code — no changes to `app/`, `components/`, `lib/`, routing, ProgressContext, the Forge mechanics, the glossary system, the utility drawer, Settings, onboarding, or any existing ids/section keys/tier structure. The only file that should change is `data/knowledge_base.json` (via addition, never edit of existing entries), plus whatever docs need updating per §5 (Chronicle log, and only the achievements/progress-count logic *if* it hardcodes the total topic count — check first, and if a code change is genuinely required there, stop and flag it rather than making it silently). If at any point a proposed addition seems to require a structural/code change to work (new section type the UI can't render, a new field the existing components don't expect), stop and flag it for approval rather than improvising a fix.
- Don't touch `examples`, `hint`, `xp`, `id` conventions differently than the existing schema — match the exact field shape already used across the file for every new topic (`id`, `section`, `title`, `explanation`, `hint`, `xp`, `page_intro`, `min_read_seconds`, `game_type`, `examples: []`, and — for any Novice topics — matching whatever glossary-adjacent fields Forge A/A2 topics carry, if applicable, so Forge tooling doesn't break on the new topics).
- `examples` field should be left as an empty array for new topics, same as the original pre-Forge-A state — do not attempt to author Forge-style examples in this pass, that's a separate future phase per the established one-thing-at-a-time build pattern.

---

## 3. Proposed new topics by tier/section (starting point — confirm counts feel right before mass-authoring, adjust as genuinely warranted)

### Novice — `networking` section (add ~5-6 topics)
- What WiFi Actually Is (radio frequency, routers/access points, the 802.11 standard, why walls and distance cause dropouts)
- What Bluetooth Actually Is (short-range pairing vs. network infrastructure, how it differs from WiFi in purpose and range)
- Ports: How One IP Address Handles Many Programs at Once
- TCP vs. UDP: Reliable Delivery vs. Speed
- MAC Addresses vs. IP Addresses: Physical vs. Logical Identity
- Cellular Generations: What 3G → 4G → 5G Actually Changed

### Novice — `hardware` section (add ~2-3 topics)
- Storage Hardware: How an SSD and a Hard Drive Actually Store Data
- Input/Output Devices & USB: How Peripherals Talk to a Computer
- Displays: Resolution, Refresh Rate, and How a Screen Builds an Image

### Novice — `os` section (add ~4-5 topics — file types is a real, confirmed gap, not filler)
- File Types & Extensions: Why `.jpg` and `.png` Aren't Interchangeable
- Container Formats vs. Codecs
- Archives & Compression: What a `.zip` Actually Does
- Disk Images: What an `.iso` Is and Why It Exists
- ROMs & Emulation: How a Dumped Cartridge/Disc Runs on Different Hardware

### Apprentice — `languages` section (add 1 topic — framework-agnostic, precedes Expert's deep React/JS dive)
- What a Frontend Framework Is & Why They Exist (Component-Based UI, React/Vue/Angular/Next.js at a Glance)

### Apprentice — `data_structures` section (add ~4-5 topics, this section is the thinnest relative to its importance)
- Linked Lists
- Trees (Binary Trees & General Tree Structure)
- Graphs (as a Data Structure)
- Hash Tables: What's Actually Happening Under a Dictionary/Map
- Heaps & Priority Queues

### Journeyman — new section, working name `algorithms_advanced` (add ~5 topics)
- Graph Traversal: BFS and DFS
- Shortest Path (Dijkstra's Algorithm, Conceptually)
- Dynamic Programming: Solving by Breaking Into Overlapping Subproblems
- Greedy Algorithms
- Divide and Conquer as a Named Paradigm

### Journeyman — `hardware_callback` section (add ~5 topics, this section is currently only 3 topics and thin for its subject weight)
- Process Scheduling: How the OS Decides What Runs When
- Virtual Memory & Paging
- Deadlocks
- Semaphores & Mutexes: Coordinating Access to Shared Resources
- Assembly Language & Machine Instructions

### Journeyman — `architecture` section (add ~2-3 topics)
- The Software Development Lifecycle
- Agile & Scrum, Practically
- Code Review as a Practice

### Journeyman — `databases` section (add ~3 topics)
- ACID Properties & Transactions
- Normalization (1NF/2NF/3NF)
- NoSQL Database Types (Document, Key-Value, Column, Graph)

### Master or Legend — new section, working name `theory_of_computation` (add ~3 topics; Claude Code's call on which tier — Legend fits the capstone-theory framing, Master fits if it should connect more directly to complexity/performance topics already there)
- Turing Machines & Computability
- The Halting Problem
- P vs. NP and NP-Completeness

### Master — `devops` or a small new pass (add ~2 topics)
- Software Licensing (MIT, GPL, Proprietary — What Each Actually Permits)
- Accessibility (a11y) as an Engineering Requirement

---

## 4. Content-authoring standard (identical to the established rules — restated here so this doesn't require re-reading three other docs to get right)
- 300-500 word floor, dual-layer (plain-English analogy + real spelled-out technical term), no filler/hedge-stacking, self-contained.
- One-line `hint` per topic.
- `min_read_seconds` calculated the same way as existing topics: `round(word_count / 200 * 60)`.
- XP scales 15-35 with depth, matching existing tier conventions.
- Building-forward where genuinely relevant (e.g. Virtual Memory & Paging should explicitly connect back to Novice's RAM/Memory Management and Journeyman's existing Memory Addresses/memory-leak topics — these are natural, real connections, not forced ones).
- `page_intro` teaser line, same as all post-Phase-1 topics.
- **Note on the ROMs & Emulation topic specifically**: keep this purely technical/explanatory — what a ROM dump is, how emulation works as a software technique (translating one hardware's instructions into another's) — the same way the app explains any other technology. Not about sourcing files or legality debates; that's out of scope for a CS-concepts topic.
- Match the plain-CSS/no-Tailwind, no-flowery-UI-copy conventions already established — this only affects content data, not UI, so should be low-risk, but don't introduce any new schema field without flagging it first.

---

## 5. Required process
1. **Read the full current `knowledge_base.json`** — confirm the gap list above is still accurate (content may have changed since this audit) and confirm exact current section names/ids before adding anything, so new topics slot in cleanly rather than creating near-duplicate section keys.
2. **Propose the finalized topic list** (adjust counts/wording from §3 as needed) and **wait for approval before authoring** — this is a structural curriculum change, which the established working-style rules require pausing for.
3. Once approved, author in batches by tier/subject (same checkpoint pattern as the tier-by-tier content rewrite) — suggested order: Novice networking/hardware first (smallest, most self-contained), then Apprentice data structures, then Journeyman's three sections, then the theory-of-computation section last (most novel, benefits from everything else being done first for calibration).
4. **Self-audit each batch** before moving on: word count per topic (flag anything under 300), filler-phrase scan, and a spot-check against 2-3 existing topics in the same tier to confirm matching depth/voice.
5. Update `CHRONICLE_OF_INFINIUM.md` (or whatever the doc is currently named if renamed again) with: the finalized topic list actually added, final per-tier/per-section topic counts, and an updated total topic count (currently 259 — this will need to become whatever the new true total is, and that number should be corrected everywhere it's referenced, including the "all X topics completed" capstone achievement if that's tracked by a hardcoded count anywhere in the progress/achievements code).

---

## Explicitly out of scope
- Any Forge (Examples mode) content for new topics — examples stay empty, future phase
- Glossary entries for new topics — Forge C's Novice-only glossary can be extended to cover new Novice terms (WiFi, Bluetooth, ports, etc.) as a natural follow-up, but that's a separate small phase, not bundled here unless trivial to include — flag rather than silently doing it
- Any UI/mechanism changes — this is content-only
- Restructuring or renaming any existing tier/section
- Reference-pane bugs, Forge B browser-verification gap, or any other item already logged as deferred in the Chronicle — unrelated to this phase

## Process reminders
- PowerShell testing, no `&&` chaining
- Explain any changes in plain English first, real technical term alongside
- Don't regress The Study, The Forge, Expert `?lang=` routing, or the progress/XP/achievements system — adding topics changes total counts, so specifically verify achievement logic tied to "all topics completed" still resolves correctly against the new total
- Log this phase's decisions (final topic list, counts, any section renames) into the Chronicle
