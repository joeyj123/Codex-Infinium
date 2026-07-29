// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to Novice topics 11-20 (displays_basics through file_types_extensions).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  displays_basics: [
    {
      id: "displays_basics_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Resolution is the total count of pixels a display contains. Refresh rate is how many times per second the display redraws its image. A pixel produces color by mixing red, green, and blue light. And a higher resolution number and a higher refresh rate number are really just two versions of the same underlying idea — how good the display is.' Which claim is wrong?",
      options: [
        "Resolution is the total count of pixels a display contains.",
        "Refresh rate is how many times per second the display redraws its image.",
        "A pixel produces color by mixing red, green, and blue light.",
        "A higher resolution number and a higher refresh rate number are really just two versions of the same underlying idea — how good the display is.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly names this exact claim as a common misconception.",
        "Resolution is spatial detail; refresh rate is temporal smoothness — genuinely independent properties.",
      ],
      solution_summary:
        "Resolution and refresh rate measure genuinely independent properties — spatial detail versus temporal smoothness — not two versions of one 'quality' score.",
      key_concepts: ["resolution", "refresh rate", "independent display properties", "common misconception"],
    },
    {
      id: "displays_basics_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A GPU is rendering 200 frames per second, but the monitor it's connected to has a 60Hz refresh rate. What happens?",
      options: [
        "The monitor somehow shows all 200 frames per second anyway",
        "The monitor can only redraw 60 times per second, so the extra frames the GPU produced beyond that are never visibly shown",
        "The GPU is forced to stop rendering entirely",
        "The monitor's resolution automatically increases to compensate",
      ],
      correct_index: 1,
      hints: [
        "Refresh rate is a hard ceiling on how much of the GPU's output can actually be displayed.",
        "The topic states this exact scenario directly.",
      ],
      solution_summary:
        "The monitor physically cannot redraw faster than 60 times per second, so the GPU's extra rendered frames beyond that are never visibly shown.",
      key_concepts: ["refresh rate as a ceiling", "frames per second", "GPU output vs display limit"],
    },
    {
      id: "displays_basics_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Pixel", "Resolution", "Refresh rate", "Response time"],
      right_shuffled: [
        "How quickly an individual pixel finishes changing from one color to another",
        "The smallest individually controllable unit of a display",
        "How many times per second the display redraws its entire image",
        "The total count of pixels a display contains, width by height",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Response time is about one pixel's own speed, not the whole screen's redraw rate.",
        "Resolution is a count; refresh rate is a frequency.",
      ],
      solution_summary:
        "Pixel = smallest controllable unit; Resolution = total pixel count; Refresh rate = redraws per second; Response time = one pixel's color-change speed.",
      key_concepts: ["pixel", "resolution", "refresh rate", "response time"],
    },
  ],

  firmware_vs_software_hardware: [
    {
      id: "firmware_vs_software_hardware_ac1",
      type: "order",
      prompt: "Put these layers in the order they become usable, starting from the most basic and building up.",
      items: [
        "Hardware: physical chips and circuits, does nothing useful on its own",
        "Firmware: low-level code baked into a chip, runs first with no OS required",
        "Software: general-purpose programs that run on top of an operating system",
      ],
      shuffled_items: [
        "Software: general-purpose programs that run on top of an operating system",
        "Hardware: physical chips and circuits, does nothing useful on its own",
        "Firmware: low-level code baked into a chip, runs first with no OS required",
      ],
      hints: [
        "Something has to make hardware usable before any OS can even start.",
        "Software is the last, most flexible layer — it depends on an OS existing first.",
      ],
      solution_summary:
        "Hardware (inert on its own) → Firmware (gets hardware usable, no OS needed) → Software (runs on top of the OS firmware helped start).",
      key_concepts: ["hardware", "firmware", "software", "dependency order"],
    },
    {
      id: "firmware_vs_software_hardware_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Firmware is low-level code stored in a dedicated chip attached to specific hardware. It runs before any operating system exists. Software can be freely installed, removed, or swapped without touching the hardware itself. And firmware is basically hardware itself, not really code at all.' Which claim is wrong?",
      options: [
        "Firmware is low-level code stored in a dedicated chip attached to specific hardware.",
        "It runs before any operating system exists.",
        "Software can be freely installed, removed, or swapped without touching the hardware itself.",
        "Firmware is basically hardware itself, not really code at all.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this exact claim.",
        "Firmware is still code — it can have bugs, and engineers write and patch it, exactly like software.",
      ],
      solution_summary:
        "Firmware is still genuine code, not hardware — it's just code with an unusually narrow job and a direct relationship to one specific physical component.",
      key_concepts: ["firmware is code", "common misconception"],
    },
    {
      id: "firmware_vs_software_hardware_ac3",
      type: "match",
      prompt: "Match each layer to its correct description.",
      left: ["Hardware", "Firmware", "Software"],
      right_shuffled: [
        "Fixed, hardware-specific code present before any OS loads",
        "Physical chips, boards, and wires with no built-in instructions of their own",
        "Flexible, swappable programs that run on top of an operating system",
      ],
      correct_assignments: [1, 0, 2],
      hints: [
        "Hardware is described as inert matter with no opinions of its own.",
        "Software is the layer people install and uninstall freely.",
      ],
      solution_summary:
        "Hardware = physical substrate; Firmware = fixed hardware-specific code present before any OS; Software = flexible, swappable programs on top of the OS.",
      key_concepts: ["hardware", "firmware", "software"],
    },
  ],

  bios_uefi: [
    {
      id: "bios_uefi_ac1",
      type: "order",
      prompt: "Put these events in the order they happen right after you hit the power button.",
      items: [
        "Electricity reaches the motherboard and the CPU jumps to a fixed location in the firmware chip",
        "The firmware runs POST (Power-On Self-Test) to confirm core hardware is present and working",
        "The firmware initializes just enough hardware to function (RAM controller, storage controller, basic video)",
        "The firmware locates a bootloader and hands it control",
      ],
      shuffled_items: [
        "The firmware locates a bootloader and hands it control",
        "Electricity reaches the motherboard and the CPU jumps to a fixed location in the firmware chip",
        "The firmware initializes just enough hardware to function (RAM controller, storage controller, basic video)",
        "The firmware runs POST (Power-On Self-Test) to confirm core hardware is present and working",
      ],
      hints: [
        "POST has to pass before the firmware trusts the hardware enough to initialize it further.",
        "Finding a bootloader is always the last step — it's the handoff point to the next topic.",
      ],
      solution_summary:
        "Power reaches the board → CPU jumps to firmware → POST → firmware initializes hardware → firmware locates a bootloader.",
      key_concepts: ["POST", "firmware initialization", "bootloader handoff"],
    },
    {
      id: "bios_uefi_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'BIOS and UEFI both live in a flash memory chip soldered to the motherboard, separate from the hard drive. UEFI supports GPT, allowing drives larger than about 2 terabytes. UEFI can only initialize hardware sequentially, exactly like classic BIOS. And UEFI supports Secure Boot, verifying the bootloader and OS haven't been tampered with.' Which claim is wrong?",
      options: [
        "BIOS and UEFI both live in a flash memory chip soldered to the motherboard, separate from the hard drive.",
        "UEFI supports GPT, allowing drives larger than about 2 terabytes.",
        "UEFI can only initialize hardware sequentially, exactly like classic BIOS.",
        "UEFI supports Secure Boot, verifying the bootloader and OS haven't been tampered with.",
      ],
      correct_index: 2,
      hints: [
        "The topic says UEFI boots faster specifically because it initializes hardware in parallel.",
        "This is one of the concrete advantages UEFI has over classic BIOS.",
      ],
      solution_summary:
        "UEFI initializes hardware in parallel rather than strictly sequentially, which is part of why it boots faster than classic BIOS.",
      key_concepts: ["UEFI vs BIOS", "parallel initialization", "common misconception"],
    },
    {
      id: "bios_uefi_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["POST", "GPT", "Secure Boot", "Bootloader"],
      right_shuffled: [
        "Cryptographically verifies the bootloader and OS haven't been tampered with",
        "A rapid hardware sanity check confirming core components are present and working",
        "A small program whose job is loading the operating system",
        "A modern partition scheme allowing drives larger than about 2 terabytes",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "POST happens first, before anything else is trusted.",
        "GPT is about how partitions are organized, not about verifying anything.",
      ],
      solution_summary:
        "POST = hardware sanity check; GPT = modern partition scheme; Secure Boot = tamper verification; Bootloader = the program that loads the OS.",
      key_concepts: ["POST", "GPT", "Secure Boot", "bootloader"],
    },
  ],

  boot_process: [
    {
      id: "boot_process_ac1",
      type: "order",
      prompt: "Put these five boot process stages in the correct order.",
      items: [
        "Power-on and POST: firmware confirms core hardware is present and working",
        "Firmware locates a bootloader on a storage device",
        "The bootloader loads the operating system's kernel into RAM",
        "The kernel initializes device drivers, mounts the file system, and starts core services",
        "The OS reaches a usable state: login screen or desktop appears",
      ],
      shuffled_items: [
        "The kernel initializes device drivers, mounts the file system, and starts core services",
        "Power-on and POST: firmware confirms core hardware is present and working",
        "The OS reaches a usable state: login screen or desktop appears",
        "The bootloader loads the operating system's kernel into RAM",
        "Firmware locates a bootloader on a storage device",
      ],
      hints: [
        "The firmware can't hand off to a bootloader until POST has passed.",
        "The desktop only appears after the kernel has already initialized drivers and services.",
      ],
      solution_summary:
        "Power-on/POST → firmware finds bootloader → bootloader loads kernel → kernel initializes drivers/services → desktop appears.",
      key_concepts: ["boot process", "POST", "bootloader", "kernel initialization"],
    },
    {
      id: "boot_process_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A computer's power is cut instantly (a hard shutdown) while a file is actively being written to disk. What's the likely consequence, compared to a normal, clean shutdown?",
      options: [
        "No difference at all — a hard shutdown is basically just a faster clean shutdown",
        "A real risk of a corrupted file or an unstable file system, since the kernel never got to flush data and close files in a controlled order",
        "The file automatically saves itself perfectly regardless of how power was cut",
        "The firmware repairs any damage automatically on the next boot",
      ],
      correct_index: 1,
      hints: [
        "A clean shutdown lets the kernel flush data and close files in a controlled order — a hard cutoff skips all of that.",
        "The topic names this exact scenario as the most common misunderstanding about shutdowns.",
      ],
      solution_summary:
        "A hard cutoff carries real risk of corrupted files or an unstable file system, since none of the kernel's controlled shutdown steps (flushing data, closing files) get to happen.",
      key_concepts: ["hard shutdown vs clean shutdown", "data corruption risk"],
    },
    {
      id: "boot_process_ac3",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A reboot runs the same power-to-desktop sequence again without fully cutting power in between. A cold boot means starting from a fully powered-off state. Safe Mode skips the boot process entirely and uses a different mechanism. And a slower boot time is often just more startup programs being configured to launch automatically.' Which claim is wrong?",
      options: [
        "A reboot runs the same power-to-desktop sequence again without fully cutting power in between.",
        "A cold boot means starting from a fully powered-off state.",
        "Safe Mode skips the boot process entirely and uses a different mechanism.",
        "A slower boot time is often just more startup programs being configured to launch automatically.",
      ],
      correct_index: 2,
      hints: [
        "The topic describes Safe Mode as the same sequence, just with the kernel loading a minimal set of drivers.",
        "Safe Mode isn't a separate mechanism — it's a stripped-down version of the same stages.",
      ],
      solution_summary:
        "Safe Mode is still the same boot sequence — the kernel just deliberately loads a minimal set of essential drivers and skips most startup programs, rather than using an entirely different mechanism.",
      key_concepts: ["Safe Mode", "common misconception"],
    },
  ],

  what_is_an_os: [
    {
      id: "what_is_an_os_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The kernel manages process scheduling, memory, and device drivers. The OS is really just the desktop, icons, and start menu you see and click on. Different operating systems expose different APIs, even on identical hardware. And a headless server with no visible interface still has a full, active OS running underneath.' Which claim is wrong?",
      options: [
        "The kernel manages process scheduling, memory, and device drivers.",
        "The OS is really just the desktop, icons, and start menu you see and click on.",
        "Different operating systems expose different APIs, even on identical hardware.",
        "A headless server with no visible interface still has a full, active OS running underneath.",
      ],
      correct_index: 1,
      hints: [
        "The visible desktop is only the user interface layer — the topic calls this out directly as a common misconception.",
        "The much larger, invisible part is the kernel constantly scheduling processes and managing memory.",
      ],
      solution_summary:
        "The OS is far more than the visible desktop — that's only the user interface layer; the kernel underneath is constantly scheduling processes, managing memory, and routing hardware requests, with or without a visible screen at all.",
      key_concepts: ["OS vs user interface", "kernel", "common misconception"],
    },
    {
      id: "what_is_an_os_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A program built specifically for Windows is copied onto a Linux machine with identical hardware and run directly. What happens?",
      options: [
        "It runs perfectly, since the hardware underneath is identical",
        "It generally fails to run correctly, since the program is really talking to the OS's API, and Windows and Linux expose different APIs",
        "It automatically converts itself to work with Linux's API",
        "It runs, but only the graphics are affected",
      ],
      correct_index: 1,
      hints: [
        "A program doesn't talk to hardware directly — it talks to the OS's set of rules for asking for things.",
        "Different operating systems expose different APIs, even on identical physical hardware.",
      ],
      solution_summary:
        "It generally can't run correctly — the program is built against Windows's API, not the hardware directly, and Linux exposes a genuinely different API even on identical hardware.",
      key_concepts: ["API", "OS-specific programs", "hardware vs OS abstraction"],
    },
    {
      id: "what_is_an_os_ac3",
      type: "match",
      prompt: "Match each OS responsibility to its description.",
      left: ["Process scheduling", "Memory isolation", "Device drivers"],
      right_shuffled: [
        "Small pieces of software translating the OS's generic requests into hardware-specific signals",
        "Deciding which program's instructions the CPU executes right now",
        "Preventing one program from reading or corrupting another program's memory",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Scheduling is about deciding turns on the CPU.",
        "Drivers are specifically about translating requests for specific hardware.",
      ],
      solution_summary:
        "Process scheduling = deciding CPU turns; Memory isolation = protecting programs from each other; Device drivers = translating OS requests into hardware-specific signals.",
      key_concepts: ["process scheduling", "memory isolation", "device drivers"],
    },
  ],

  processes_threads: [
    {
      id: "processes_threads_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A process is a running instance of a program with its own protected memory. A thread lives inside a process and shares that process's memory with other threads in it. Concurrency means multiple tasks genuinely executing at the exact same physical instant. And parallelism means multiple cores truly running different tasks simultaneously.' Which claim is wrong?",
      options: [
        "A process is a running instance of a program with its own protected memory.",
        "A thread lives inside a process and shares that process's memory with other threads in it.",
        "Concurrency means multiple tasks genuinely executing at the exact same physical instant.",
        "Parallelism means multiple cores truly running different tasks simultaneously.",
      ],
      correct_index: 2,
      hints: [
        "The topic distinguishes concurrency (rapid turn-taking) from parallelism (true simultaneity).",
        "Concurrency is about making progress over a stretch of time by taking turns, not literal simultaneity.",
      ],
      solution_summary:
        "Concurrency means tasks making progress over time by rapidly taking turns, not literally executing at the same physical instant — that's what parallelism specifically means.",
      key_concepts: ["concurrency", "parallelism", "common misconception"],
    },
    {
      id: "processes_threads_ac2",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Process", "Thread", "Context switch", "Parallelism"],
      right_shuffled: [
        "The CPU saving one task's state and loading the next task's state",
        "A unit of execution inside a process, sharing that process's memory",
        "Multiple cores truly executing different tasks at the same physical instant",
        "A running instance of a program with its own protected memory",
      ],
      correct_assignments: [3, 1, 0, 2],
      hints: [
        "A context switch is specifically about the cost of swapping between tasks.",
        "Parallelism requires multiple cores, unlike concurrency.",
      ],
      solution_summary:
        "Process = running program instance with protected memory; Thread = execution unit sharing a process's memory; Context switch = saving/loading task state; Parallelism = true simultaneous execution across cores.",
      key_concepts: ["process", "thread", "context switch", "parallelism"],
    },
    {
      id: "processes_threads_ac3",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "One program's main thread gets stuck in a long-running operation and becomes unresponsive. What's the likely state of the rest of the computer?",
      options: [
        "The entire computer freezes completely, since one thread is stuck",
        "Other processes and windows generally keep working fine, since the scheduler is still giving them CPU time normally",
        "All other processes are automatically terminated",
        "The stuck thread automatically fixes itself within a few seconds",
      ],
      correct_index: 1,
      hints: [
        "The topic explains this exact scenario — you can often still move the mouse and switch to other windows.",
        "The scheduler keeps giving CPU time to every other process exactly as normal.",
      ],
      solution_summary:
        "Usually the rest of the system stays responsive — the scheduler keeps giving other processes their normal CPU time, even while one process's thread is stuck.",
      key_concepts: ["unresponsive process", "scheduler", "process isolation"],
    },
  ],

  memory_management: [
    {
      id: "memory_management_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Virtual memory gives every process the illusion of its own private range of memory addresses. Paging temporarily writes some of a process's memory out to storage when RAM fills up. Adding more physical RAM directly fixes a program that's leaking memory by allocating far more than it needs. And a memory leak happens when a program never tells the OS it's done with memory it allocated.' Which claim is wrong?",
      options: [
        "Virtual memory gives every process the illusion of its own private range of memory addresses.",
        "Paging temporarily writes some of a process's memory out to storage when RAM fills up.",
        "Adding more physical RAM directly fixes a program that's leaking memory by allocating far more than it needs.",
        "A memory leak happens when a program never tells the OS it's done with memory it allocated.",
      ],
      correct_index: 2,
      hints: [
        "The topic explicitly separates 'more RAM' from 'programs using memory more efficiently' as two different problems.",
        "More RAM just raises the ceiling before paging kicks in — it doesn't fix an inefficient or leaking program.",
      ],
      solution_summary:
        "More physical RAM just raises the ceiling before paging becomes necessary — it does nothing to fix a program that's leaking or over-allocating memory, which is a software issue, not a hardware capacity one.",
      key_concepts: ["memory leak", "virtual memory", "common misconception"],
    },
    {
      id: "memory_management_ac2",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Virtual memory", "Paging", "Memory leak"],
      right_shuffled: [
        "A program repeatedly allocates memory but never tells the OS it's finished using it",
        "Giving every process the illusion of its own private memory address range",
        "Temporarily writing a process's less-used memory out to storage to free up RAM",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Paging specifically involves writing to storage, not just tracking addresses.",
        "A memory leak is about memory that's never released, not about running out of RAM directly.",
      ],
      solution_summary:
        "Virtual memory = illusion of private address space; Paging = swapping unused memory to storage; Memory leak = allocated memory never released.",
      key_concepts: ["virtual memory", "paging", "memory leak"],
    },
    {
      id: "memory_management_ac3",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A program has a memory leak and is left running for a very long time. What's the likely result?",
      options: [
        "Nothing changes — leaked memory doesn't affect anything",
        "The program gradually consumes more and more RAM over time, potentially forcing heavier paging or running out of memory",
        "The OS automatically detects and fixes the leak within seconds",
        "The leaked memory is immediately returned to other programs regardless",
      ],
      correct_index: 1,
      hints: [
        "The OS keeps reserving memory the program never says it's done with.",
        "This is exactly why restarting a long-running program sometimes visibly frees up memory.",
      ],
      solution_summary:
        "The program gradually consumes more RAM over a long enough runtime, since the OS keeps faithfully reserving memory it's never told to release — eventually forcing heavier paging or running out of memory.",
      key_concepts: ["memory leak", "paging", "long-running program"],
    },
  ],

  file_systems: [
    {
      id: "file_systems_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A file system organizes raw storage into files, folders, and names. Files are broken into blocks, tracked by an index so they can be found quickly. Deleting a file instantly and completely erases its data from the drive. And fragmentation means a file's blocks end up scattered across different physical locations.' Which claim is wrong?",
      options: [
        "A file system organizes raw storage into files, folders, and names.",
        "Files are broken into blocks, tracked by an index so they can be found quickly.",
        "Deleting a file instantly and completely erases its data from the drive.",
        "Fragmentation means a file's blocks end up scattered across different physical locations.",
      ],
      correct_index: 2,
      hints: [
        "The topic explains that deleting mainly removes the file's index entry, not the underlying data.",
        "This is exactly why file-recovery tools can sometimes retrieve 'deleted' files.",
      ],
      solution_summary:
        "Deleting a file mainly removes its entry from the index and marks its blocks reusable — the actual data often physically remains until something overwrites those blocks.",
      key_concepts: ["file deletion", "fragmentation", "common misconception"],
    },
    {
      id: "file_systems_ac2",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["File system", "Metadata", "Block/cluster", "Fragmentation"],
      right_shuffled: [
        "A fixed-size piece a file's data gets broken into on the drive",
        "Data describing a file, like its name, size, and modification date",
        "The rules an OS uses to store, organize, and retrieve data on a drive",
        "A file's blocks ending up scattered across different physical locations",
      ],
      correct_assignments: [2, 1, 0, 3],
      hints: [
        "Metadata is data about the file, not the file's actual content.",
        "Fragmentation is specifically about scattered blocks.",
      ],
      solution_summary:
        "File system = rules for organizing storage; Metadata = data describing a file; Block/cluster = a fixed-size data piece; Fragmentation = scattered blocks.",
      key_concepts: ["file system", "metadata", "block", "fragmentation"],
    },
    {
      id: "file_systems_ac3",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A heavily fragmented file needs to be opened. Which drive type is more noticeably slowed down by that fragmentation: an HDD or an SSD?",
      options: [
        "An SSD, since it has more storage cells to search through",
        "An HDD, since its mechanical head has to physically travel to each scattered piece",
        "Neither — fragmentation affects both drive types identically",
        "An SSD, since flash memory cells wear out faster when fragmented",
      ],
      correct_index: 1,
      hints: [
        "Think about which drive type has a physically moving part that has to travel to each location.",
        "An SSD can jump to any location in roughly the same tiny amount of time regardless of physical position.",
      ],
      solution_summary:
        "An HDD is more noticeably slowed by fragmentation, since its mechanical read/write head has to physically travel to each scattered block — an SSD has no such travel time.",
      key_concepts: ["fragmentation", "HDD mechanical delay", "SSD random access"],
    },
  ],

  file_paths: [
    {
      id: "file_paths_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'An absolute path spells out the complete route from the root every time. A relative path is interpreted starting from the current working directory. Two dots (..) mean go up one folder to the parent. And a file only ever has one true, correct path.' Which claim is wrong?",
      options: [
        "An absolute path spells out the complete route from the root every time.",
        "A relative path is interpreted starting from the current working directory.",
        "Two dots (..) mean go up one folder to the parent.",
        "A file only ever has one true, correct path.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly rebuts this claim — the same file can be described by many valid paths.",
        "An absolute path and any number of relative paths can all correctly point to the same file.",
      ],
      solution_summary:
        "A file can correctly be described by an absolute path and by any number of different valid relative paths depending on where you're starting from — none is more 'true' than another.",
      key_concepts: ["absolute path", "relative path", "common misconception"],
    },
    {
      id: "file_paths_ac2",
      type: "order",
      prompt:
        "You're standing in the Documents folder and want to reach vacation.jpg, which is in a sibling folder called Photos. Put these navigation steps in order for the relative path ..\\Photos\\vacation.jpg.",
      items: [
        "Start at the current working directory (Documents)",
        "Go up one folder to the parent (..)",
        "Enter the Photos folder",
        "Reach vacation.jpg",
      ],
      shuffled_items: [
        "Enter the Photos folder",
        "Start at the current working directory (Documents)",
        "Reach vacation.jpg",
        "Go up one folder to the parent (..)",
      ],
      hints: [
        "A relative path always starts from wherever you currently are.",
        "You have to go up before you can go back down into a sibling folder.",
      ],
      solution_summary:
        "Start in Documents → go up one level (..) → enter Photos → reach vacation.jpg, matching ..\\Photos\\vacation.jpg.",
      key_concepts: ["relative path", "working directory", "parent folder notation"],
    },
    {
      id: "file_paths_ac3",
      type: "match",
      prompt: "Match each path symbol or term to its meaning.",
      left: ["Absolute path", "Working directory", ".", ".."],
      right_shuffled: [
        "Two dots — go up one folder to the parent",
        "A single dot — refers to the current folder",
        "The folder a program or command line is currently standing in",
        "A complete route starting from the root, regardless of current location",
      ],
      correct_assignments: [3, 2, 1, 0],
      hints: [
        "One dot and two dots have different meanings — one stays put, one moves up.",
        "Absolute paths never depend on where you currently are.",
      ],
      solution_summary:
        "Absolute path = complete route from root; Working directory = current standing folder; . = current folder; .. = parent folder.",
      key_concepts: ["absolute path", "working directory", "dot notation"],
    },
  ],

  file_types_extensions: [
    {
      id: "file_types_extensions_ac1",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You rename vacation.jpg to vacation.png without actually converting the image data. What's the likely result?",
      options: [
        "The file opens perfectly everywhere, since renaming a file always converts it too",
        "Some programs may refuse to open it or show a corrupted image, since the actual bytes inside are still JPEG data despite the new extension",
        "The image automatically becomes higher quality",
        "Nothing happens — file extensions have no effect on anything",
      ],
      correct_index: 1,
      hints: [
        "The extension is just a label — it doesn't change the actual format of the bytes inside.",
        "The topic opens with this exact experiment.",
      ],
      solution_summary:
        "Renaming doesn't convert the data — the file still internally contains JPEG-formatted bytes, so some software may fail to open it or render it incorrectly despite the new .png label.",
      key_concepts: ["file extension vs file format", "mislabeled file"],
    },
    {
      id: "file_types_extensions_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A file extension is a hint about what kind of data a file contains. The underlying file format defines exactly how that data is encoded into bytes. A file signature (magic number) can identify a format regardless of the extension. And a file's extension is a hard technical rule the computer always strictly enforces.' Which claim is wrong?",
      options: [
        "A file extension is a hint about what kind of data a file contains.",
        "The underlying file format defines exactly how that data is encoded into bytes.",
        "A file signature (magic number) can identify a format regardless of the extension.",
        "A file's extension is a hard technical rule the computer always strictly enforces.",
      ],
      correct_index: 3,
      hints: [
        "The topic names this exact claim as the most frequent misconception.",
        "The OS mostly trusts the extension at face value rather than inspecting every file's actual bytes.",
      ],
      solution_summary:
        "An extension is closer to a widely-followed convention than a strictly enforced rule — the OS mostly trusts it at face value, which is exactly why a mislabeled file can cause confusion.",
      key_concepts: ["file extension", "common misconception"],
    },
    {
      id: "file_types_extensions_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["File extension", "File format", "File signature (magic number)", "Default program association"],
      right_shuffled: [
        "A short byte sequence at the start of a file identifying its real format regardless of its name",
        "The short suffix after a dot in a filename, hinting at the file's contents",
        "An OS setting mapping an extension to a specific program to open it by default",
        "The specific, defined internal structure describing how data is encoded into bytes",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "The signature is about the actual bytes, not the filename.",
        "The format is the real internal structure; the extension is just the label.",
      ],
      solution_summary:
        "File extension = the label; File format = the real internal byte structure; File signature = a byte sequence identifying the real format; Default program association = an OS setting for which app opens it.",
      key_concepts: ["file extension", "file format", "file signature", "default program association"],
    },
  ],
};

let updated = 0;
for (const topic of novice.topics) {
  if (CONTENT[topic.id]) {
    topic.anvil_challenges = CONTENT[topic.id];
    updated += 1;
  }
}

console.log(`Updated ${updated} topics.`);

let out = JSON.stringify(kb, null, 2);
out = out.replace(/\n/g, "\r\n");
if (!out.endsWith("\r\n")) out += "\r\n";
fs.writeFileSync(KB_PATH, out, "utf8");
console.log("Wrote", KB_PATH);
