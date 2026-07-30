// Journeyman Anvil batch 6: async_await, rate_limiting, memory_addresses_pointers_tieback,
// infinite_loop_cpu, memory_leak, process_scheduling, virtual_memory_paging,
// semaphores_mutexes, deadlocks, assembly_machine_instructions.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  async_await: [
    {
      id: "async_await_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how async/await lets a program avoid blocking while waiting, using the coffee-shop analogy.",
      shuffled_items: [
        "The customer steps aside instead of blocking the counter.",
        "A customer places an order at a coffee shop.",
        "The shop keeps serving other customers in the meantime.",
        "The customer returns to collect their drink once it's genuinely ready.",
      ],
      items: [
        "A customer places an order at a coffee shop.",
        "The customer steps aside instead of blocking the counter.",
        "The shop keeps serving other customers in the meantime.",
        "The customer returns to collect their drink once it's genuinely ready.",
      ],
      hints: [
        "The order must be placed before the customer can step aside to wait.",
        "The shop serving others happens while the first customer is away, not before the order.",
      ],
      solution_summary: "An order is placed → the customer steps aside instead of blocking → the shop serves others in the meantime → the customer returns once the drink is ready.",
      key_concepts: ["async", "await", "non-blocking"],
    },
    {
      id: "async_await_jv2",
      type: "choice",
      prompt: "What problem does async/await primarily solve, based on the coffee-shop analogy?",
      options: [
        "It prevents the barista from ever making a mistake",
        "It avoids one task uselessly blocking everything else while it waits",
        "It makes drinks brew faster than physically possible",
        "It requires every customer to be served in the exact order they arrived",
      ],
      correct_index: 1,
      hints: [
        "The customer stepping aside is what lets other customers keep being served.",
        "Blocking is the problem async/await is designed to avoid.",
      ],
      solution_summary: "Async/await avoids one task uselessly blocking everything else while it waits, letting other work continue in the meantime.",
      key_concepts: ["async", "await", "non-blocking"],
    },
    {
      id: "async_await_jv3",
      type: "match",
      prompt: "Match each async/await term to its meaning.",
      left: ["async function", "await", "Blocking", "Non-blocking"],
      right: ["A function that can pause and resume without freezing everything else", "Pausing at a specific point until a result is ready", "Staring uselessly at the counter until a task finishes", "Stepping aside so other work can continue in the meantime"],
      correct_pairs: [
        ["async function", "A function that can pause and resume without freezing everything else"],
        ["await", "Pausing at a specific point until a result is ready"],
        ["Blocking", "Staring uselessly at the counter until a task finishes"],
        ["Non-blocking", "Stepping aside so other work can continue in the meantime"],
      ],
      hints: [
        "await is the specific keyword marking where a pause happens.",
        "Blocking and non-blocking are opposite behaviors described by the coffee-shop analogy.",
      ],
      solution_summary: "An async function can pause without freezing everything else, await pauses for a specific result, blocking means uselessly waiting, and non-blocking means stepping aside so other work continues.",
      key_concepts: ["async", "await", "blocking", "non-blocking"],
    },
  ],
  rate_limiting: [
    {
      id: "rate_limiting_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how rate limiting protects a server from overload, using the restaurant-host analogy.",
      shuffled_items: [
        "A large number of walk-in customers arrive at once.",
        "The host seats people at a sustainable, manageable rate.",
        "Anyone arriving faster than that rate is queued or turned away.",
        "The kitchen continues operating without collapsing under load.",
      ],
      items: [
        "A large number of walk-in customers arrive at once.",
        "The host seats people at a sustainable, manageable rate.",
        "Anyone arriving faster than that rate is queued or turned away.",
        "The kitchen continues operating without collapsing under load.",
      ],
      hints: [
        "The host's controlled pace is what determines who gets queued or turned away.",
        "The kitchen surviving is the outcome of the controlled rate, not the trigger for it.",
      ],
      solution_summary: "Many customers arrive at once → the host controls the pace of seating → excess arrivals are queued or turned away → the kitchen keeps operating without collapsing.",
      key_concepts: ["rate limiting", "server protection"],
    },
    {
      id: "rate_limiting_jv2",
      type: "choice",
      prompt: "What is the primary purpose of rate limiting on a server or API?",
      options: [
        "To reject every single request regardless of load",
        "To control the pace of incoming requests so the system isn't overwhelmed",
        "To make requests process in a random order",
        "To permanently ban all users who send more than one request",
      ],
      correct_index: 1,
      hints: [
        "The restaurant host analogy: controlling pace, not blocking everyone outright.",
        "Rate limiting exists to keep the system sustainable under load, not to reject everything.",
      ],
      solution_summary: "Rate limiting controls the pace of incoming requests so a server isn't overwhelmed beyond what it can sustainably handle.",
      key_concepts: ["rate limiting", "throttling"],
    },
    {
      id: "rate_limiting_jv3",
      type: "match",
      prompt: "Match each rate limiting term to its meaning.",
      left: ["Rate limit", "Throttling", "Request queue", "429 status code"],
      right: ["The maximum allowed pace of requests over a time window", "Deliberately slowing or delaying requests to stay within the limit", "A holding area for requests arriving faster than the limit allows", "The HTTP status code meaning 'too many requests'"],
      correct_pairs: [
        ["Rate limit", "The maximum allowed pace of requests over a time window"],
        ["Throttling", "Deliberately slowing or delaying requests to stay within the limit"],
        ["Request queue", "A holding area for requests arriving faster than the limit allows"],
        ["429 status code", "The HTTP status code meaning 'too many requests'"],
      ],
      hints: [
        "Throttling is the mechanism that enforces the rate limit.",
        "429 is the specific status code servers return when a client exceeds the limit.",
      ],
      solution_summary: "A rate limit is the maximum allowed pace, throttling enforces it, a request queue holds excess requests, and 429 is the status code for exceeding the limit.",
      key_concepts: ["rate limiting", "throttling", "429"],
    },
  ],
  memory_addresses_pointers_tieback: [
    {
      id: "memory_addresses_pointers_tieback_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a memory address lets data be located, using the house-number analogy.",
      shuffled_items: [
        "A byte is stored somewhere in RAM.",
        "Every house on a street has its own specific number.",
        "That byte is assigned its own unique, numbered address.",
        "A program uses that address to locate the exact byte, the same way mail reaches the correct house.",
      ],
      items: [
        "Every house on a street has its own specific number.",
        "A byte is stored somewhere in RAM.",
        "That byte is assigned its own unique, numbered address.",
        "A program uses that address to locate the exact byte, the same way mail reaches the correct house.",
      ],
      hints: [
        "The house-numbering analogy is introduced before it's applied to bytes in RAM.",
        "The address must be assigned before a program can use it to locate the byte.",
      ],
      solution_summary: "Houses each have a unique number → a byte is stored in RAM → it's assigned its own unique address → a program uses that address to locate the byte, just like mail reaching the correct house.",
      key_concepts: ["memory address", "RAM", "pointer"],
    },
    {
      id: "memory_addresses_pointers_tieback_jv2",
      type: "choice",
      prompt: "What does the house-numbering analogy illustrate about memory addresses?",
      options: [
        "That every byte in RAM shares the exact same address",
        "That each byte of memory has its own unique numbered address, just like each house has its own number",
        "That memory addresses change randomly every time a program runs",
        "That memory addresses are only relevant to hard drives, not RAM",
      ],
      correct_index: 1,
      hints: [
        "The analogy is about uniqueness — one number per house, one address per byte.",
        "This is the same underlying principle described for pointers.",
      ],
      solution_summary: "Every byte of RAM has its own unique numbered address, exactly like every house on a street has its own specific number.",
      key_concepts: ["memory address", "RAM"],
    },
    {
      id: "memory_addresses_pointers_tieback_jv3",
      type: "match",
      prompt: "Match each memory-related term to its meaning.",
      left: ["Memory address", "Pointer", "RAM", "Byte"],
      right: ["A unique numbered location identifying one spot in memory", "A variable that stores a memory address", "The hardware providing numbered storage locations", "The basic unit of memory that gets its own address"],
      correct_pairs: [
        ["Memory address", "A unique numbered location identifying one spot in memory"],
        ["Pointer", "A variable that stores a memory address"],
        ["RAM", "The hardware providing numbered storage locations"],
        ["Byte", "The basic unit of memory that gets its own address"],
      ],
      hints: [
        "A pointer doesn't store data itself — it stores the address of where the data lives.",
        "RAM is the physical hardware that provides the addressable locations in the first place.",
      ],
      solution_summary: "A memory address uniquely identifies a location, a pointer stores an address, RAM provides the numbered storage, and a byte is the basic addressable unit.",
      key_concepts: ["memory address", "pointer", "RAM"],
    },
  ],
  infinite_loop_cpu: [
    {
      id: "infinite_loop_cpu_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how an infinite loop keeps consuming CPU resources, using the treadmill analogy.",
      shuffled_items: [
        "A treadmill is left running with nobody pressing stop.",
        "A loop's exit condition is written so that it never actually becomes true.",
        "The belt keeps endlessly cycling, consuming electricity the whole time.",
        "The CPU keeps executing the same block of instructions over and over.",
      ],
      items: [
        "A loop's exit condition is written so that it never actually becomes true.",
        "A treadmill is left running with nobody pressing stop.",
        "The belt keeps endlessly cycling, consuming electricity the whole time.",
        "The CPU keeps executing the same block of instructions over and over.",
      ],
      hints: [
        "The exit condition's failure is what causes the loop to continue indefinitely.",
        "The treadmill analogy is described before its direct parallel to CPU execution.",
      ],
      solution_summary: "An exit condition never becomes true → like a treadmill left running with nobody stopping it → the belt keeps cycling endlessly → the CPU keeps executing the same instructions over and over.",
      key_concepts: ["infinite loop", "CPU", "exit condition"],
    },
    {
      id: "infinite_loop_cpu_jv2",
      type: "choice",
      prompt: "What causes an infinite loop, according to the definition given?",
      options: [
        "The CPU physically overheating",
        "A loop's stated exit condition never actually becomes true",
        "A program running out of available memory",
        "A network connection being lost mid-execution",
      ],
      correct_index: 1,
      hints: [
        "The treadmill analogy: nobody presses stop, so it keeps running.",
        "The defining feature is the exit condition never being satisfied.",
      ],
      solution_summary: "An infinite loop occurs when its stated exit condition never actually becomes true, so the CPU keeps executing the same block of instructions indefinitely.",
      key_concepts: ["infinite loop", "exit condition"],
    },
    {
      id: "infinite_loop_cpu_jv3",
      type: "match",
      prompt: "Match each loop-related term to its meaning.",
      left: ["Infinite loop", "Exit condition", "CPU cycle", "Loop body"],
      right: ["A loop that never stops because its exit condition never becomes true", "The condition checked to decide whether a loop should stop", "One unit of processing work the CPU performs repeatedly", "The block of instructions executed on each pass through a loop"],
      correct_pairs: [
        ["Infinite loop", "A loop that never stops because its exit condition never becomes true"],
        ["Exit condition", "The condition checked to decide whether a loop should stop"],
        ["CPU cycle", "One unit of processing work the CPU performs repeatedly"],
        ["Loop body", "The block of instructions executed on each pass through a loop"],
      ],
      hints: [
        "The exit condition is what an infinite loop specifically fails to satisfy.",
        "The loop body is what gets repeated over and over during an infinite loop.",
      ],
      solution_summary: "An infinite loop never stops, an exit condition determines when a loop should stop, a CPU cycle is one unit of repeated processing, and the loop body is the repeated block of instructions.",
      key_concepts: ["infinite loop", "exit condition", "CPU"],
    },
  ],
  memory_leak: [
    {
      id: "memory_leak_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a memory leak gradually worsens over time, using the dripping-sink analogy.",
      shuffled_items: [
        "A sink has a slow, barely noticeable drip.",
        "Memory that's no longer actually needed never gets properly released.",
        "The bucket underneath eventually overflows if left unnoticed long enough.",
        "The program's memory usage quietly, steadily grows over time.",
      ],
      items: [
        "A sink has a slow, barely noticeable drip.",
        "Memory that's no longer actually needed never gets properly released.",
        "The program's memory usage quietly, steadily grows over time.",
        "The bucket underneath eventually overflows if left unnoticed long enough.",
      ],
      hints: [
        "The sink analogy is introduced before its direct parallel to unreleased memory.",
        "Steadily growing usage happens before the eventual overflow (running out of memory).",
      ],
      solution_summary: "A slow drip goes unnoticed → memory that's no longer needed never gets released → usage quietly grows over time → the bucket (available memory) eventually overflows.",
      key_concepts: ["memory leak", "memory management"],
    },
    {
      id: "memory_leak_jv2",
      type: "choice",
      prompt: "What defines a memory leak, based on the dripping-sink analogy?",
      options: [
        "Memory being released too aggressively and too early",
        "Memory that's no longer needed never being properly released back for reuse",
        "A program using too much memory all at once, immediately",
        "A hard drive slowly running out of storage space",
      ],
      correct_index: 1,
      hints: [
        "The leak is gradual and quiet, not sudden — like a slow drip, not a burst pipe.",
        "The core problem is memory that should be freed but isn't.",
      ],
      solution_summary: "A memory leak is memory that's no longer actually needed never getting properly released back for reuse, causing usage to quietly grow over time.",
      key_concepts: ["memory leak", "memory management"],
    },
    {
      id: "memory_leak_jv3",
      type: "match",
      prompt: "Match each memory management term to its meaning.",
      left: ["Memory leak", "Garbage collection", "Allocated memory", "Released memory"],
      right: ["Memory no longer needed but never freed", "The process of automatically reclaiming unused memory", "Memory currently reserved for a program's use", "Memory returned back to the system for reuse"],
      correct_pairs: [
        ["Memory leak", "Memory no longer needed but never freed"],
        ["Garbage collection", "The process of automatically reclaiming unused memory"],
        ["Allocated memory", "Memory currently reserved for a program's use"],
        ["Released memory", "Memory returned back to the system for reuse"],
      ],
      hints: [
        "Garbage collection is one mechanism meant to prevent memory leaks from happening.",
        "Allocated and released memory are opposite states of the same memory.",
      ],
      solution_summary: "A memory leak is memory that's never freed, garbage collection automatically reclaims unused memory, allocated memory is reserved for use, and released memory is returned for reuse.",
      key_concepts: ["memory leak", "garbage collection"],
    },
  ],
  process_scheduling: [
    {
      id: "process_scheduling_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a single CPU keeps multiple processes progressing, using the barista analogy.",
      shuffled_items: [
        "The barista steams milk for one drink order.",
        "The barista rapidly switches to pulling a shot for a different order.",
        "The barista rings someone up for a third order in between.",
        "All five drink orders keep genuinely moving forward, none fully simultaneous.",
      ],
      items: [
        "The barista steams milk for one drink order.",
        "The barista rapidly switches to pulling a shot for a different order.",
        "The barista rings someone up for a third order in between.",
        "All five drink orders keep genuinely moving forward, none fully simultaneous.",
      ],
      hints: [
        "The individual actions happen in short bursts before the overall progress is described.",
        "The final step is the collective result of rapid switching between individual tasks.",
      ],
      solution_summary: "The barista attends to one order → switches to another → attends to a third in between → all orders end up progressing, without ever being done truly simultaneously.",
      key_concepts: ["process scheduling", "CPU", "context switching"],
    },
    {
      id: "process_scheduling_jv2",
      type: "choice",
      prompt: "What does process scheduling primarily manage, based on the barista analogy?",
      options: [
        "Which processes get permanently deleted from the system",
        "How a single CPU's attention is rapidly divided between multiple processes so each keeps progressing",
        "How much physical memory each process can ever use",
        "Which programming language each process is written in",
      ],
      correct_index: 1,
      hints: [
        "The barista's rapid switching between orders is the direct analogy for scheduling.",
        "Scheduling is about dividing CPU attention over time, not about memory or language.",
      ],
      solution_summary: "Process scheduling manages how a CPU's attention is rapidly divided between multiple processes, giving each just enough time to keep genuinely progressing.",
      key_concepts: ["process scheduling", "CPU"],
    },
    {
      id: "process_scheduling_jv3",
      type: "match",
      prompt: "Match each process scheduling term to its meaning.",
      left: ["Process", "Scheduler", "Time slice", "Context switch"],
      right: ["An independently running program the CPU must service", "The component deciding which process runs next", "A short burst of CPU time given to one process", "Switching the CPU's attention from one process to another"],
      correct_pairs: [
        ["Process", "An independently running program the CPU must service"],
        ["Scheduler", "The component deciding which process runs next"],
        ["Time slice", "A short burst of CPU time given to one process"],
        ["Context switch", "Switching the CPU's attention from one process to another"],
      ],
      hints: [
        "The scheduler is what decides the order and duration processes get attention.",
        "A time slice is the unit of attention; a context switch is the transition between slices.",
      ],
      solution_summary: "A process is an independently running program, the scheduler decides run order, a time slice is a burst of CPU time, and a context switch is the transition between processes.",
      key_concepts: ["process scheduling", "scheduler", "context switch"],
    },
  ],
  virtual_memory_paging: [
    {
      id: "virtual_memory_paging_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how virtual memory hides physical memory details, using the hotel room-number analogy.",
      shuffled_items: [
        "A guest is handed a room number, such as 214.",
        "The front desk quietly handles the translation to the actual physical location.",
        "The guest uses 'room 214' as though it were the complete address that mattered.",
        "The guest never needs to know which physical wing or floor the room actually sits in.",
      ],
      items: [
        "A guest is handed a room number, such as 214.",
        "The guest never needs to know which physical wing or floor the room actually sits in.",
        "The front desk quietly handles the translation to the actual physical location.",
        "The guest uses 'room 214' as though it were the complete address that mattered.",
      ],
      hints: [
        "The room number is assigned first, before the guest ever needs to think about the physical location.",
        "The front desk's translation happens behind the scenes, enabling the guest's simplified view.",
      ],
      solution_summary: "A guest is handed a room number → they never need to know its physical location → the front desk translates behind the scenes → the guest simply uses the room number as the whole address.",
      key_concepts: ["virtual memory", "paging", "address translation"],
    },
    {
      id: "virtual_memory_paging_jv2",
      type: "choice",
      prompt: "What does virtual memory primarily provide, based on the hotel-room analogy?",
      options: [
        "A guarantee that no program can ever run out of memory",
        "A simplified address a program can use, while the system translates it to the actual physical location",
        "A way to permanently delete unused memory",
        "A method for making RAM physically larger",
      ],
      correct_index: 1,
      hints: [
        "The guest uses a simple room number without knowing the real physical layout.",
        "Virtual memory is about abstraction and translation, not literally expanding hardware.",
      ],
      solution_summary: "Virtual memory provides a simplified address a program can use, while the system quietly translates it to the actual physical memory location, just like a hotel room number.",
      key_concepts: ["virtual memory", "paging"],
    },
    {
      id: "virtual_memory_paging_jv3",
      type: "match",
      prompt: "Match each virtual memory term to its meaning.",
      left: ["Virtual address", "Physical address", "Page", "Page table"],
      right: ["The simplified address a program uses, like a room number", "The actual physical location in RAM", "A fixed-size chunk of memory managed as one unit", "The structure mapping virtual addresses to physical ones"],
      correct_pairs: [
        ["Virtual address", "The simplified address a program uses, like a room number"],
        ["Physical address", "The actual physical location in RAM"],
        ["Page", "A fixed-size chunk of memory managed as one unit"],
        ["Page table", "The structure mapping virtual addresses to physical ones"],
      ],
      hints: [
        "The page table is exactly the front desk's translation mechanism.",
        "A page is the unit of memory being tracked and translated.",
      ],
      solution_summary: "A virtual address is the simplified address a program sees, a physical address is the real RAM location, a page is a fixed-size memory chunk, and the page table maps virtual to physical addresses.",
      key_concepts: ["virtual memory", "page table", "physical address"],
    },
  ],
  semaphores_mutexes: [
    {
      id: "semaphores_mutexes_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a mutex enforces exclusive access, using the single-occupancy restroom analogy.",
      shuffled_items: [
        "A restroom has a working lock allowing exactly one person at a time.",
        "One person locks the door while inside using the restroom.",
        "Others queue up outside and wait their turn.",
        "The lock is released once the first person leaves, letting the next person in.",
      ],
      items: [
        "A restroom has a working lock allowing exactly one person at a time.",
        "One person locks the door while inside using the restroom.",
        "Others queue up outside and wait their turn.",
        "The lock is released once the first person leaves, letting the next person in.",
      ],
      hints: [
        "The lock's existence is established before it's used by any one person.",
        "The release only happens once the current occupant is finished.",
      ],
      solution_summary: "A restroom has a lock allowing one occupant → someone locks it while inside → others wait their turn outside → the lock releases once they leave, letting the next person in.",
      key_concepts: ["mutex", "semaphore", "mutual exclusion"],
    },
    {
      id: "semaphores_mutexes_jv2",
      type: "choice",
      prompt: "What is the core purpose of a mutex, based on the single-occupancy restroom analogy?",
      options: [
        "To allow unlimited simultaneous access to a shared resource",
        "To ensure exactly one process or thread can access a shared resource at a time",
        "To permanently prevent any process from ever accessing the resource",
        "To speed up access to a resource by removing all restrictions",
      ],
      correct_index: 1,
      hints: [
        "The lock is what physically enforces one-at-a-time access.",
        "This is exactly the software equivalent of the restroom lock analogy.",
      ],
      solution_summary: "A mutex ensures exactly one process or thread can access a shared resource at a time, exactly like a restroom lock enforcing single occupancy.",
      key_concepts: ["mutex", "mutual exclusion"],
    },
    {
      id: "semaphores_mutexes_jv3",
      type: "match",
      prompt: "Match each concurrency-control term to its meaning.",
      left: ["Mutex", "Semaphore", "Critical section", "Lock"],
      right: ["Allows exactly one thread access to a resource at a time", "Allows a limited number of threads to access a resource concurrently", "The specific code section requiring exclusive or limited access", "The mechanism that physically enforces access restrictions"],
      correct_pairs: [
        ["Mutex", "Allows exactly one thread access to a resource at a time"],
        ["Semaphore", "Allows a limited number of threads to access a resource concurrently"],
        ["Critical section", "The specific code section requiring exclusive or limited access"],
        ["Lock", "The mechanism that physically enforces access restrictions"],
      ],
      hints: [
        "A mutex is a special case of semaphore limited to exactly one at a time.",
        "The critical section is the protected code; the lock is the enforcement mechanism.",
      ],
      solution_summary: "A mutex allows exactly one thread access, a semaphore allows a limited count of threads, a critical section is the protected code, and a lock is the enforcement mechanism.",
      key_concepts: ["mutex", "semaphore", "critical section"],
    },
  ],
  deadlocks: [
    {
      id: "deadlocks_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a deadlock forms, using the narrow-bridge analogy.",
      shuffled_items: [
        "Two drivers meet nose-to-nose on a narrow, single-lane bridge.",
        "Each driver waits for the other to back up first.",
        "Neither driver is willing to be the one who reverses.",
        "Both drivers remain stuck indefinitely unless something intervenes.",
      ],
      items: [
        "Two drivers meet nose-to-nose on a narrow, single-lane bridge.",
        "Each driver waits for the other to back up first.",
        "Neither driver is willing to be the one who reverses.",
        "Both drivers remain stuck indefinitely unless something intervenes.",
      ],
      hints: [
        "The drivers must meet before either can start waiting on the other.",
        "The permanent stuck state is the end result of both refusing to yield.",
      ],
      solution_summary: "Two drivers meet on a narrow bridge → each waits for the other to back up → neither is willing to reverse → both remain stuck indefinitely without intervention.",
      key_concepts: ["deadlock", "concurrency"],
    },
    {
      id: "deadlocks_jv2",
      type: "choice",
      prompt: "What defines a deadlock, based on the narrow-bridge analogy?",
      options: [
        "One process finishing much faster than another",
        "Two or more processes each waiting on the other, with neither able to proceed",
        "A process crashing due to a memory error",
        "A single process running an infinite loop by itself",
      ],
      correct_index: 1,
      hints: [
        "Both drivers are stuck specifically because each is waiting on the other.",
        "A deadlock always involves mutual waiting between multiple parties, not a single process alone.",
      ],
      solution_summary: "A deadlock occurs when two or more processes each wait on the other, with neither able to proceed, exactly like two drivers stuck on a narrow bridge.",
      key_concepts: ["deadlock", "concurrency"],
    },
    {
      id: "deadlocks_jv3",
      type: "match",
      prompt: "Match each deadlock-related term to its meaning.",
      left: ["Deadlock", "Resource", "Circular wait", "Mutual exclusion"],
      right: ["A permanent stuck state where processes wait on each other", "Something a process needs exclusive access to, like a lock or file", "Each process in a chain waiting on the next, forming a loop", "Only one process may hold a given resource at a time"],
      correct_pairs: [
        ["Deadlock", "A permanent stuck state where processes wait on each other"],
        ["Resource", "Something a process needs exclusive access to, like a lock or file"],
        ["Circular wait", "Each process in a chain waiting on the next, forming a loop"],
        ["Mutual exclusion", "Only one process may hold a given resource at a time"],
      ],
      hints: [
        "Circular wait is one of the classic necessary conditions for a deadlock to occur.",
        "Mutual exclusion is what makes a resource contested in the first place.",
      ],
      solution_summary: "A deadlock is a permanent stuck state, a resource is what's being contested, circular wait is the looping dependency, and mutual exclusion means only one process can hold the resource at a time.",
      key_concepts: ["deadlock", "circular wait", "mutual exclusion"],
    },
  ],
  assembly_machine_instructions: [
    {
      id: "assembly_machine_instructions_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a high-level instruction is broken down into explicit low-level steps, using the recipe analogy.",
      shuffled_items: [
        "A recipe for an experienced chef says 'sauté the onions until translucent.'",
        "The same instruction is broken down for a brand-new assistant.",
        "Each explicit step is spelled out: turn on the burner, add oil, wait, add onions, stir.",
        "The assistant follows the exact sequence without needing prior experience.",
      ],
      items: [
        "A recipe for an experienced chef says 'sauté the onions until translucent.'",
        "The same instruction is broken down for a brand-new assistant.",
        "Each explicit step is spelled out: turn on the burner, add oil, wait, add onions, stir.",
        "The assistant follows the exact sequence without needing prior experience.",
      ],
      hints: [
        "The high-level instruction is stated before it's broken down into explicit steps.",
        "Following the sequence happens after each step has already been spelled out.",
      ],
      solution_summary: "A high-level instruction is given → it's broken down for someone without experience → each explicit low-level step is spelled out → the sequence can be followed without prior knowledge.",
      key_concepts: ["assembly", "machine instructions", "abstraction"],
    },
    {
      id: "assembly_machine_instructions_jv2",
      type: "choice",
      prompt: "What does the recipe analogy illustrate about assembly and machine instructions?",
      options: [
        "That high-level and low-level instructions are exactly identical in detail",
        "That a high-level instruction must be broken down into explicit, exact low-level steps for a computer to follow",
        "That computers understand vague, high-level instructions directly",
        "That recipes have nothing in common with how computers execute code",
      ],
      correct_index: 1,
      hints: [
        "The chef's shorthand instruction needs to be spelled out step by step for the inexperienced assistant.",
        "A CPU, like the new assistant, needs every step made fully explicit.",
      ],
      solution_summary: "The recipe analogy illustrates that a high-level instruction must be broken down into explicit, exact low-level steps, just as a CPU needs machine instructions spelled out precisely.",
      key_concepts: ["assembly", "machine instructions"],
    },
    {
      id: "assembly_machine_instructions_jv3",
      type: "match",
      prompt: "Match each low-level programming term to its meaning.",
      left: ["Assembly language", "Machine instruction", "Instruction set", "Opcode"],
      right: ["A human-readable representation close to raw machine instructions", "A single explicit, exact operation a CPU can directly execute", "The full collection of operations a specific CPU can perform", "The part of an instruction identifying which operation to perform"],
      correct_pairs: [
        ["Assembly language", "A human-readable representation close to raw machine instructions"],
        ["Machine instruction", "A single explicit, exact operation a CPU can directly execute"],
        ["Instruction set", "The full collection of operations a specific CPU can perform"],
        ["Opcode", "The part of an instruction identifying which operation to perform"],
      ],
      hints: [
        "Assembly language is a readable stand-in for the raw machine instructions themselves.",
        "An opcode is a component within a single machine instruction.",
      ],
      solution_summary: "Assembly language is human-readable and close to machine instructions, a machine instruction is a single exact CPU operation, an instruction set is the full collection of available operations, and an opcode identifies which operation an instruction performs.",
      key_concepts: ["assembly language", "machine instruction", "opcode"],
    },
  ],
};

let added = 0;
for (const [topicId, challenges] of Object.entries(CONTENT)) {
  const topic = tier.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`MISSING TOPIC: ${topicId}`);
    continue;
  }
  if (!Array.isArray(topic.anvil_challenges)) topic.anvil_challenges = [];
  topic.anvil_challenges.push(...challenges);
  added += challenges.length;
}

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added ${added} challenges across ${Object.keys(CONTENT).length} topics.`);
