// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to the first 10 Novice topics. Run once, then delete or leave for record.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  what_is_a_computer: [
    {
      id: "what_is_a_computer_ac1",
      type: "order",
      prompt:
        "You press a key in a word processor and later save the document. Put these four stages in the correct order.",
      items: [
        "Input: the keypress becomes a binary code entering the system",
        "Processing: the CPU adds the character and prepares an updated screen image",
        "Output: the updated pixels are pushed to the display",
        "Storage: the document is written to a drive so it survives after the program closes",
      ],
      shuffled_items: [
        "Storage: the document is written to a drive so it survives after the program closes",
        "Input: the keypress becomes a binary code entering the system",
        "Output: the updated pixels are pushed to the display",
        "Processing: the CPU adds the character and prepares an updated screen image",
      ],
      hints: [
        "Ask what has to happen before anything else can — data has to enter before it can be transformed.",
        "Storage only happens if you explicitly save, and that's always the last step in this chain.",
      ],
      solution_summary:
        "Input (keypress) → Processing (CPU updates the document) → Output (screen updates) → Storage (saved to disk).",
      key_concepts: ["input", "processing", "output", "storage"],
    },
    {
      id: "what_is_a_computer_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains the four-stage loop: 'Input is data entering the system, like a keystroke. Processing is the CPU carrying out the program's instructions on that data. Output is data pushed back out, like pixels sent to a screen. And storage only refers to a hard drive or SSD — RAM never counts as storage.' Which claim is wrong?",
      options: [
        "Input is data entering the system, like a keystroke.",
        "Processing is the CPU carrying out the program's instructions on that data.",
        "Output is data pushed back out, like pixels sent to a screen.",
        "Storage only refers to a hard drive or SSD — RAM never counts as storage.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly calls out this exact misconception near the end.",
        "Storage means any way of holding data so it survives past the moment it was created — that technically includes RAM while a program runs.",
      ],
      solution_summary:
        "Storage isn't limited to drives — RAM technically counts as storage while a program is actively running, since it holds data past the moment it was created, it just doesn't survive a power loss.",
      key_concepts: ["storage", "RAM as storage", "common misconception"],
    },
    {
      id: "what_is_a_computer_ac3",
      type: "match",
      prompt: "Match each real-world event to the stage of the input/processing/output/storage loop it represents.",
      left: [
        "A mouse click arriving at the computer",
        "The CPU comparing two numbers",
        "A sound sent to a speaker",
        "A value kept in memory so a later step can still use it",
      ],
      right_shuffled: ["Storage", "Output", "Input", "Processing"],
      correct_assignments: [2, 3, 1, 0],
      hints: [
        "Anything entering the system from outside is input.",
        "Anything crossing back out to the world (a screen, a speaker, another device) is output.",
      ],
      solution_summary:
        "Mouse click = Input, CPU comparison = Processing, sound to speaker = Output, remembered value = Storage.",
      key_concepts: ["input", "processing", "output", "storage"],
    },
  ],

  cpu_basics: [
    {
      id: "cpu_basics_ac1",
      type: "order",
      prompt: "Put the CPU's fetch-decode-execute cycle in the correct order.",
      items: [
        "Fetch: the CPU retrieves the next instruction from memory",
        "Decode: the CPU figures out which operation the instruction specifies",
        "Execute: the CPU actually performs the operation using its logic circuits",
        "The cycle repeats: the CPU fetches the next instruction",
      ],
      shuffled_items: [
        "Execute: the CPU actually performs the operation using its logic circuits",
        "The cycle repeats: the CPU fetches the next instruction",
        "Fetch: the CPU retrieves the next instruction from memory",
        "Decode: the CPU figures out which operation the instruction specifies",
      ],
      hints: [
        "You can't execute an instruction before you know what it is, and you can't know what it is before you've retrieved it.",
        "'Repeat' always comes last since it just starts the cycle over.",
      ],
      solution_summary: "Fetch → Decode → Execute → repeat, billions of times per second.",
      key_concepts: ["fetch-decode-execute cycle", "CPU"],
    },
    {
      id: "cpu_basics_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A shopper compares two laptops: 'Laptop B has a higher clock speed than Laptop A, so Laptop B is faster at literally everything, no matter what I'm doing with it.' What's wrong with this claim?",
      options: [
        "Clock speed measures cycles per second, not total work done per cycle.",
        "Clock speed alone doesn't account for core count or cache, so 'faster at everything' isn't a safe conclusion.",
        "A task that can't be split across cores gets no benefit from extra cores, which clock speed doesn't capture either.",
        "Clock speed is the only spec that matters when comparing two CPUs.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly says comparing CPUs by clock speed alone is misleading.",
        "Three of these four options are true statements from the topic — one contradicts all of them.",
      ],
      solution_summary:
        "Clock speed is not the only spec that matters — core count and cache both change how much real work gets done, and which CPU is 'faster' depends on the task.",
      key_concepts: ["clock speed", "core count", "cache", "it depends on the task"],
    },
    {
      id: "cpu_basics_ac3",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "You're exporting a 10-minute video that splits into thousands of independent chunks. You can choose a 4-core CPU at a high clock speed, or an 8-core CPU at a lower clock speed. Which is more likely to finish the export faster?",
      options: [
        "The 4-core CPU, since higher clock speed always wins",
        "The 8-core CPU, since this task splits into independent chunks that benefit from more cores working in parallel",
        "They'll always finish in exactly the same time regardless of cores or clock speed",
        "Neither — cache size is the only thing that matters for video export",
      ],
      correct_index: 1,
      hints: [
        "Ask whether the task can be broken into independent pieces — that's exactly when more cores help.",
        "Video export is the topic's own example of a parallelizable workload.",
      ],
      solution_summary:
        "The 8-core CPU is favored here, since video export splits into independent chunks — a parallel workload that benefits from more cores running simultaneously.",
      key_concepts: ["parallel workload", "core count", "throughput scaling"],
    },
    {
      id: "cpu_basics_ac4",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Core", "Clock speed", "Cache", "Cache miss"],
      right_shuffled: [
        "Small, extremely fast memory built onto the CPU die holding recently-used data",
        "An independent execution unit inside the CPU capable of its own fetch-decode-execute cycle",
        "When needed data isn't in cache, forcing a slower trip to RAM",
        "The frequency of the CPU's internal timing pulses, measured in Hz",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "A 'miss' is specifically about data NOT being found nearby.",
        "Clock speed is measured in a frequency unit (GHz), which is the giveaway.",
      ],
      solution_summary:
        "Core = independent execution unit; Clock speed = frequency of timing pulses; Cache = fast on-die memory; Cache miss = needed data forces a trip to RAM.",
      key_concepts: ["core", "clock speed", "cache", "cache miss"],
    },
  ],

  ram_vs_storage: [
    {
      id: "ram_vs_storage_ac1",
      type: "order",
      prompt: "Put these events in the correct order for writing and saving a document, ending with a power outage occurring AFTER the save.",
      items: [
        "You type text, which exists only in RAM",
        "You click Save",
        "The document's data is copied from RAM and written to storage",
        "Power goes out, but the document survives because it's already in storage",
      ],
      shuffled_items: [
        "The document's data is copied from RAM and written to storage",
        "You type text, which exists only in RAM",
        "Power goes out, but the document survives because it's already in storage",
        "You click Save",
      ],
      hints: [
        "Text has to exist somewhere before you can save it.",
        "The document only survives the outage if the save already happened before it.",
      ],
      solution_summary:
        "Type (RAM) → Save → written to storage → power loss, and the document survives because it was already in storage.",
      key_concepts: ["RAM volatility", "storage persistence", "save action"],
    },
    {
      id: "ram_vs_storage_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A friend explains: 'RAM is volatile and loses its contents when power is lost. Storage is non-volatile and keeps data with no power at all. RAM is generally faster than storage. And a bigger storage drive always makes a computer feel snappier when multitasking.' Which claim is wrong?",
      options: [
        "RAM is volatile and loses its contents when power is lost.",
        "Storage is non-volatile and keeps data with no power at all.",
        "RAM is generally faster than storage.",
        "A bigger storage drive always makes a computer feel snappier when multitasking.",
      ],
      correct_index: 3,
      hints: [
        "The topic names this exact claim as a common misconception.",
        "Snappy multitasking is tied to RAM capacity and speed, not storage size.",
      ],
      solution_summary:
        "A bigger drive mostly just means more room for files — the responsive, multitasking feel of a computer comes from RAM capacity and speed, not storage size.",
      key_concepts: ["RAM vs storage capacity", "multitasking performance", "common misconception"],
    },
    {
      id: "ram_vs_storage_ac3",
      type: "match",
      prompt: "Sort each item into RAM or Storage.",
      left: [
        "A photo library saved on your phone",
        "The app currently open and responding to your taps",
        "A downloaded song file",
        "The exact scroll position of a webpage open right now",
      ],
      right_shuffled: ["RAM", "Storage"],
      correct_assignments: [1, 0, 1, 0],
      hints: [
        "Ask: does this need to still exist after the device is turned off? If yes, it's storage.",
        "Anything only relevant 'right now, while this is open' is a RAM candidate.",
      ],
      solution_summary:
        "Photo library and song file = Storage (persistent files); open app and scroll position = RAM (temporary, active-use state).",
      key_concepts: ["persistent files", "active-use state", "RAM vs storage distinction"],
    },
  ],

  motherboard: [
    {
      id: "motherboard_ac1",
      type: "order",
      prompt: "Trace a keystroke's physical path to the CPU. Put these steps in order.",
      items: [
        "The keyboard sends an electrical signal into a port mounted on the motherboard",
        "The signal travels along the motherboard's traces toward the CPU",
        "The signal crosses the motherboard's bus, the shared pathway components use to exchange data",
        "The CPU receives the signal and can now treat it as input for processing",
      ],
      shuffled_items: [
        "The signal crosses the motherboard's bus, the shared pathway components use to exchange data",
        "The CPU receives the signal and can now treat it as input for processing",
        "The keyboard sends an electrical signal into a port mounted on the motherboard",
        "The signal travels along the motherboard's traces toward the CPU",
      ],
      hints: [
        "The signal has to enter the board before it can travel across it.",
        "The CPU is always the destination, so it comes last.",
      ],
      solution_summary:
        "Signal enters a motherboard port → travels the traces → crosses the bus → arrives at the CPU as input.",
      key_concepts: ["motherboard as physical link", "bus", "traces", "signal path"],
    },
    {
      id: "motherboard_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student says: 'The motherboard is the main circuit board every component plugs into. It contains traces that carry data and power between parts. The CPU socket only fits specific CPU generations. And the motherboard is where the actual computation happens.' Which claim is wrong?",
      options: [
        "The motherboard is the main circuit board every component plugs into.",
        "It contains traces that carry data and power between parts.",
        "The CPU socket only fits specific CPU generations.",
        "The motherboard is where the actual computation happens.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly says the motherboard does none of the actual computation itself.",
        "It's connective infrastructure, not a processor.",
      ],
      solution_summary:
        "The motherboard does none of the actual computation — it's the physical wiring that lets the CPU, RAM, and other parts talk to each other; the CPU is what actually computes.",
      key_concepts: ["motherboard as connective infrastructure", "not a processor itself"],
    },
    {
      id: "motherboard_ac3",
      type: "match",
      prompt: "Match each motherboard component to its function.",
      left: ["CPU socket", "RAM slots", "PCIe expansion slot", "Chipset"],
      right_shuffled: [
        "A small set of dedicated chips managing communication between the CPU and the board's components",
        "Built to match a specific CPU's physical pin layout",
        "Accepts cards like a graphics card or additional storage",
        "Connects RAM sticks to the memory controller",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "The socket is about physical fit with the CPU specifically.",
        "The chipset is described as managing board-wide communication, not any single slot.",
      ],
      solution_summary:
        "CPU socket = matches CPU pin layout; RAM slots = connect to memory controller; PCIe slot = accepts GPU/storage cards; Chipset = manages board-wide communication.",
      key_concepts: ["CPU socket", "RAM slots", "PCIe", "chipset"],
    },
  ],

  gpu_basics: [
    {
      id: "gpu_basics_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A GPU has thousands of simpler cores instead of a few powerful ones. This makes GPUs great for tasks that split into many independent pieces, like rendering pixels. It's also why GPUs turned out to be well suited to AI matrix multiplication. And a GPU is basically just a faster CPU for any task you throw at it.' Which claim is wrong?",
      options: [
        "A GPU has thousands of simpler cores instead of a few powerful ones.",
        "This makes GPUs great for tasks that split into many independent pieces, like rendering pixels.",
        "It's also why GPUs turned out to be well suited to AI matrix multiplication.",
        "A GPU is basically just a faster CPU for any task you throw at it.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly names this as a common misconception.",
        "A task that isn't parallelizable can actually run slower on a GPU than a CPU.",
      ],
      solution_summary:
        "A GPU isn't a faster CPU — its individual cores are less powerful; it only wins on tasks that split into many independent, parallel pieces.",
      key_concepts: ["GPU vs CPU design", "parallelizable workload", "common misconception"],
    },
    {
      id: "gpu_basics_ac2",
      type: "match",
      prompt: "Classify each task as better suited to a CPU or a GPU.",
      left: [
        "Running the OS's many varied background services",
        "Rendering a 3D scene's lighting across every pixel",
        "Unzipping a single compressed file",
        "Training an AI model via matrix multiplication",
      ],
      right_shuffled: ["GPU", "CPU"],
      correct_assignments: [1, 0, 1, 0],
      hints: [
        "Ask: is this one operation repeated identically across huge independent data, or many different sequential decisions?",
        "Sequential, dependent-step tasks favor the CPU; identical, independent, high-volume tasks favor the GPU.",
      ],
      solution_summary:
        "Background services and unzipping = CPU (sequential/varied logic); pixel lighting and AI matrix multiplication = GPU (massively parallel, identical operations).",
      key_concepts: ["sequential vs parallel workload", "CPU-suited tasks", "GPU-suited tasks"],
    },
    {
      id: "gpu_basics_ac3",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A game needs to calculate the color of 8 million pixels, 60 times per second, where each pixel's calculation doesn't depend on any other pixel's result. What happens if this workload is handed to a GPU instead of a CPU?",
      options: [
        "It finishes much faster, since thousands of simple GPU cores can compute many pixels simultaneously",
        "It finishes much slower, since GPU cores are individually weaker than CPU cores",
        "There's no difference, since clock speed is all that matters",
        "It fails entirely, since GPUs can't do color math",
      ],
      correct_index: 0,
      hints: [
        "This is exactly the kind of massively parallel, independent workload GPUs are built for.",
        "GPU cores are individually weaker, but there are vastly more of them working at once.",
      ],
      solution_summary:
        "It finishes far faster on the GPU — splitting 8 million independent pixel calculations across thousands of simple cores beats a CPU's much smaller number of cores working through them.",
      key_concepts: ["parallel processing", "independent sub-tasks", "many simple cores vs few powerful cores"],
    },
  ],

  transistors_logic_gates: [
    {
      id: "transistors_logic_gates_ac1",
      type: "match",
      prompt: "Match each real-world switch behavior to the logic gate it matches.",
      left: [
        "A porch light turns on only when the wall switch is flipped AND motion is detected",
        "A stairwell light turns on if EITHER the top switch OR the bottom switch is flipped",
        "A security system triggers when a door sensor reads NOT closed",
      ],
      right_shuffled: ["OR gate", "NOT gate", "AND gate"],
      correct_assignments: [2, 0, 1],
      hints: [
        "AND requires every condition to be true at once.",
        "OR only needs at least one condition true; NOT simply flips a single input.",
      ],
      solution_summary: "Porch light = AND gate; stairwell light = OR gate; security trigger = NOT gate.",
      key_concepts: ["AND gate", "OR gate", "NOT gate"],
    },
    {
      id: "transistors_logic_gates_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A vending machine dispenses only when (coin inserted) AND (button pressed) AND NOT(jammed). A customer inserts a coin, presses the button, but the machine is jammed. What happens?",
      options: [
        "It dispenses, since coin AND button were both satisfied",
        "It does not dispense, since NOT(jammed) is false when the machine is jammed",
        "It dispenses twice, since two of the three conditions were met",
        "It's undefined behavior — logic gates can't handle three conditions",
      ],
      correct_index: 1,
      hints: [
        "NOT(jammed) only outputs 1 (true) when the machine is NOT jammed.",
        "A final AND gate requires every one of its inputs to be true — one false input blocks the whole thing.",
      ],
      solution_summary:
        "It does not dispense — NOT(jammed) evaluates to false while jammed, and the final AND gate needs every input true, including that one.",
      key_concepts: ["combining gates", "AND gate", "NOT gate", "override condition"],
    },
    {
      id: "transistors_logic_gates_ac3",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A transistor is a tiny electronic switch built into a chip's silicon. It's controlled by a voltage, not a person flipping it by hand. Modern transistors have moving mechanical parts, like a tiny toggle. And logic gates are built from transistors wired together in specific patterns.' Which claim is wrong?",
      options: [
        "A transistor is a tiny electronic switch built into a chip's silicon.",
        "It's controlled by a voltage, not a person flipping it by hand.",
        "Modern transistors have moving mechanical parts, like a tiny toggle.",
        "Logic gates are built from transistors wired together in specific patterns.",
      ],
      correct_index: 2,
      hints: [
        "The topic directly says modern transistors have no moving parts at all.",
        "The 'switching' is a purely electrical effect, not a mechanical one.",
      ],
      solution_summary:
        "Modern transistors have no moving parts — switching is a purely electrical effect based on voltage controlling a semiconductor, not a physical toggle.",
      key_concepts: ["transistor", "no moving parts", "common misconception"],
    },
  ],

  binary_basics: [
    {
      id: "binary_basics_ac1",
      type: "choice",
      variant: "predict_outcome",
      prompt: "What is the binary number 1010 equal to in decimal?",
      options: ["8", "10", "12", "9"],
      correct_index: 1,
      hints: [
        "Each position going left is a power of 2: 1, 2, 4, 8.",
        "1010 has 1s in the 8's place and the 2's place: 8 + 0 + 2 + 0.",
      ],
      solution_summary: "1010 = 8 + 0 + 2 + 0 = 10 in decimal.",
      key_concepts: ["positional number system", "powers of 2", "binary conversion"],
    },
    {
      id: "binary_basics_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Binary uses only two digits, 0 and 1. Each bit position is a power of 2. Binary can represent fewer possible values overall than decimal can, since it only has two digits per position. And a byte is a group of 8 bits capable of 256 combinations.' Which claim is wrong?",
      options: [
        "Binary uses only two digits, 0 and 1.",
        "Each bit position is a power of 2.",
        "Binary can represent fewer possible values overall than decimal can, since it only has two digits per position.",
        "A byte is a group of 8 bits capable of 256 combinations.",
      ],
      correct_index: 2,
      hints: [
        "The topic explicitly calls this exact claim a common misconception.",
        "Binary can represent every value decimal can — it just needs more digits to do it.",
      ],
      solution_summary:
        "Binary isn't a narrower number system — it has total mathematical equivalence with decimal, it just requires more digits per value since each position carries less information.",
      key_concepts: ["binary vs decimal equivalence", "common misconception"],
    },
    {
      id: "binary_basics_ac3",
      type: "match",
      prompt: "Match each term to its definition.",
      left: ["Bit", "Byte", "Encoding", "Positional value"],
      right_shuffled: [
        "A group of exactly 8 bits, capable of 256 distinct combinations",
        "An agreed-upon mapping between a binary pattern and a real-world meaning, like a letter",
        "A single binary digit, either 0 or 1",
        "What a digit's position (like the 8's place) contributes to a number's total value",
      ],
      correct_assignments: [2, 0, 1, 3],
      hints: [
        "A byte is specifically 8 bits, not just 'a lot of bits.'",
        "Encoding is about the agreed convention, not the number system itself.",
      ],
      solution_summary:
        "Bit = single 0/1 digit; Byte = group of 8 bits (256 combinations); Encoding = agreed binary-to-meaning mapping; Positional value = what a place contributes to the total.",
      key_concepts: ["bit", "byte", "encoding", "place value"],
    },
  ],

  binary_to_electricity: [
    {
      id: "binary_to_electricity_ac1",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "Electrical noise briefly pushes a wire's voltage into the ambiguous middle zone — not clearly high, not clearly low — exactly when a bit is being sampled. What's the likely consequence?",
      options: [
        "Nothing — circuits always read ambiguous voltage as 0 by default",
        "The bit may be misread entirely, since the reading doesn't clearly match the high or low range",
        "The chip permanently shuts down to protect itself",
        "The voltage automatically corrects itself before being sampled",
      ],
      correct_index: 1,
      hints: [
        "This is the exact scenario the topic uses to explain why high/low ranges exist with a gap between them.",
        "The gap exists specifically to tolerate small amounts of noise, but landing inside it at the sampling moment is still risky.",
      ],
      solution_summary:
        "The bit may be misread, since the sampled voltage doesn't clearly fall into either the high or low range — real circuits build in threshold ranges with a gap specifically to reduce (not eliminate) this risk.",
      key_concepts: ["noise margin", "high/low voltage threshold", "signal reliability"],
    },
    {
      id: "binary_to_electricity_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A binary 1 is represented by a voltage above a defined threshold, and a 0 by a voltage below it. A clock signal switches rhythmically between high and low at a fixed rate. Every transistor switching wastes a small amount of energy as heat. And the voltages inside a modern chip are similar in scale to household electrical wiring.' Which claim is wrong?",
      options: [
        "A binary 1 is represented by a voltage above a defined threshold, and a 0 by a voltage below it.",
        "A clock signal switches rhythmically between high and low at a fixed rate.",
        "Every transistor switching wastes a small amount of energy as heat.",
        "The voltages inside a modern chip are similar in scale to household electrical wiring.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly contrasts household wiring voltages with the tiny voltages inside a chip.",
        "Chip voltages are deliberately kept as low as reliably possible.",
      ],
      solution_summary:
        "Chip voltages are tiny by household standards — often just a volt or a few volts — deliberately kept low to reduce wasted energy and heat, unlike household electrical wiring.",
      key_concepts: ["voltage scale", "common misconception"],
    },
    {
      id: "binary_to_electricity_ac3",
      type: "match",
      prompt: "Match each term to its correct description.",
      left: ["High voltage", "Clock signal", "Heat output", "Threshold"],
      right_shuffled: [
        "The dividing line a circuit uses to decide whether a voltage counts as 1 or 0",
        "A voltage above a defined level, read as binary 1",
        "A voltage that switches rhythmically between high and low at a fixed rate",
        "An unavoidable byproduct of billions of transistors switching every second",
      ],
      correct_assignments: [1, 2, 3, 0],
      hints: [
        "The clock signal is defined by its rhythmic switching, not by being high or low itself.",
        "Heat is described as a direct physical consequence of switching activity.",
      ],
      solution_summary:
        "High voltage = read as 1; Clock signal = rhythmic high/low switching at a fixed rate; Heat output = byproduct of switching; Threshold = the high/low dividing line.",
      key_concepts: ["voltage", "clock signal", "heat", "threshold"],
    },
  ],

  storage_hardware_ssd_hdd: [
    {
      id: "storage_hardware_ssd_hdd_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A friend says: 'An SSD and an HDD both store your files. The only real difference is SSDs are newer. HDDs use a mechanical head over a spinning magnetic platter. SSDs use flash memory with no moving parts.' Which claim is wrong?",
      options: [
        "An SSD and an HDD both store your files.",
        "The only real difference is SSDs are newer.",
        "HDDs use a mechanical head over a spinning magnetic platter.",
        "SSDs use flash memory with no moving parts.",
      ],
      correct_index: 1,
      hints: [
        "The topic directly rebuts this exact claim.",
        "It's a difference in physical mechanism (magnetic/mechanical vs. electrical/solid-state), not just age.",
      ],
      solution_summary:
        "It's not just about age — SSDs and HDDs use genuinely different physical mechanisms, and that mechanism difference is why SSDs are faster and more shock-resistant.",
      key_concepts: ["HDD mechanical platter", "SSD flash memory", "physical mechanism, not age"],
    },
    {
      id: "storage_hardware_ssd_hdd_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "You're choosing a drive for a laptop that gets carried around and bumped daily. Which drive type is the better fit, and why?",
      options: [
        "HDD, since it offers more capacity per dollar",
        "SSD, since it has no moving parts and is more resistant to shock and vibration",
        "Either one — physical movement doesn't affect either drive type",
        "Neither — laptops can't use internal storage at all",
      ],
      correct_index: 1,
      hints: [
        "Think about which drive type has parts that could be physically damaged by being bumped while running.",
        "This is exactly the topic's own laptop-vs-backup-server comparison.",
      ],
      solution_summary:
        "SSD is the better fit — having no moving parts makes it far more resistant to the shocks and vibration a frequently-carried laptop experiences.",
      key_concepts: ["shock resistance", "no moving parts", "use-case fit"],
    },
    {
      id: "storage_hardware_ssd_hdd_ac3",
      type: "match",
      prompt: "Match each characteristic to the drive type it describes.",
      left: [
        "Stores data magnetically on a spinning platter",
        "Stores data electrically with no moving parts",
        "Typically offers more capacity per dollar",
        "Needs wear-leveling because each cell has finite write cycles",
      ],
      right_shuffled: ["SSD", "HDD"],
      correct_assignments: [1, 0, 1, 0],
      hints: [
        "Anything involving physical movement or spinning belongs to the HDD.",
        "Wear-leveling is specifically about flash memory cells wearing out.",
      ],
      solution_summary:
        "Magnetic spinning platter and cheaper per-GB = HDD; electrical no-moving-parts and wear-leveling = SSD.",
      key_concepts: ["HDD", "SSD", "wear-leveling", "capacity per dollar"],
    },
  ],

  io_devices_usb: [
    {
      id: "io_devices_usb_ac1",
      type: "match",
      prompt: "Classify each device as primarily Input, Output, or Both.",
      left: ["A keyboard", "A monitor", "A touchscreen", "A headset with a microphone"],
      right_shuffled: ["Output", "Both", "Input"],
      correct_assignments: [2, 0, 1, 1],
      hints: [
        "Input devices send data into the computer; output devices send data back out.",
        "Some devices genuinely do both over the same connection, like a touchscreen or a headset.",
      ],
      solution_summary:
        "Keyboard = Input; Monitor = Output; Touchscreen and headset = Both (they send and receive data simultaneously).",
      key_concepts: ["input devices", "output devices", "devices that do both"],
    },
    {
      id: "io_devices_usb_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "You plug a fast external SSD into an old, low-quality USB cable. The cable physically fits and the drive works normally. What's the likely result?",
      options: [
        "The drive reaches its full rated transfer speed, since the cable fits and works",
        "The drive's real-world transfer speed is bottlenecked below its rated maximum, since the old cable supports a slower USB generation",
        "The drive refuses to connect at all",
        "The cable automatically upgrades itself to match the drive's speed",
      ],
      correct_index: 1,
      hints: [
        "Physical fit and speed capability are two separate things, per the topic.",
        "Different USB generations and cable qualities support different maximum transfer speeds.",
      ],
      solution_summary:
        "The old cable bottlenecks the drive's real-world speed — physically fitting and working isn't proof a cable supports the drive's full rated speed.",
      key_concepts: ["USB generations", "cable speed bottleneck", "physical fit vs. speed capability"],
    },
    {
      id: "io_devices_usb_ac3",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'USB standardizes the physical connector and the communication protocol. A device driver is what lets the OS correctly translate data for a specific device. USB ports are wired into the motherboard. And a USB port is purely a data connection — it never supplies any electrical power.' Which claim is wrong?",
      options: [
        "USB standardizes the physical connector and the communication protocol.",
        "A device driver is what lets the OS correctly translate data for a specific device.",
        "USB ports are wired into the motherboard.",
        "A USB port is purely a data connection — it never supplies any electrical power.",
      ],
      correct_index: 3,
      hints: [
        "The topic gives phone charging over USB as a direct counterexample.",
        "Many USB ports supply real electrical power alongside data over the same cable.",
      ],
      solution_summary:
        "USB ports commonly supply real electrical power alongside data over the same cable — that's exactly how a phone charges from a laptop's USB port.",
      key_concepts: ["USB power delivery", "common misconception"],
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
