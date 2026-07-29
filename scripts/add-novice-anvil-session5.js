// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to Novice topics 41-50 (browser_vs_app through silicon_semiconductors).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  browser_vs_app: [
    {
      id: "browser_vs_app_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A native app is compiled for a specific OS and CPU, installed locally, and run as its own process. A browser loads and displays code fetched live from a remote server. A native app can typically access device hardware more directly than a web page can. And a web page loaded in a browser and a native app are functionally identical, just accessed through different icons.' Which claim is wrong?",
      options: [
        "A native app is compiled for a specific OS and CPU, installed locally, and run as its own process.",
        "A browser loads and displays code fetched live from a remote server.",
        "A native app can typically access device hardware more directly than a web page can.",
        "A web page loaded in a browser and a native app are functionally identical, just accessed through different icons.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "Real underlying differences in speed, offline capability, and device access genuinely persist.",
      ],
      solution_summary:
        "A web page and a native app are not functionally identical — real differences in speed, offline capability, and device access persist because of their genuinely different execution models.",
      key_concepts: ["native app vs browser", "common misconception"],
    },
    {
      id: "browser_vs_app_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You close the browser tab showing a website. What happens to that website's 'running' code?",
      options: [
        "It keeps running independently in the background, exactly like a native app might",
        "It ends immediately, since the browser was the actual program continuously interpreting and rendering that code",
        "It gets saved locally and resumes instantly next time regardless of the tab closing",
        "Nothing changes — the website was never actually running anything",
      ],
      correct_index: 1,
      hints: [
        "The browser is the actual native program doing the interpreting the whole time the page is open.",
        "The topic states this exact contrast directly.",
      ],
      solution_summary:
        "Closing the tab immediately ends that process, since the browser itself was the program continuously interpreting and rendering the site's code — unlike a native app, which can often resume more independently.",
      key_concepts: ["browser as the running process", "tab closing"],
    },
    {
      id: "browser_vs_app_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Native app", "Progressive Web App (PWA)", "Hybrid app"],
      right_shuffled: [
        "A native app that internally embeds a browser-like component to display some of its content",
        "A program compiled specifically for a device's OS and CPU, installed and run as its own process",
        "A website built to feel more like a native app, installable and partly usable offline",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "A PWA is fundamentally still running inside a browser's rendering engine.",
        "A hybrid app is distributed like a native app but embeds web-style rendering internally.",
      ],
      solution_summary:
        "Native app = fully compiled, independently installed program; PWA = a website behaving more like a native app; Hybrid app = a native shell embedding browser-like rendering.",
      key_concepts: ["native app", "PWA", "hybrid app"],
    },
  ],

  what_is_an_update: [
    {
      id: "what_is_an_update_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'An update replaces some or all of a program's previously installed files. A security patch closes a discovered vulnerability and is often released urgently. Semantic versioning uses major.minor.patch to signal the size of a change. And every update primarily adds new, user-visible features.' Which claim is wrong?",
      options: [
        "An update replaces some or all of a program's previously installed files.",
        "A security patch closes a discovered vulnerability and is often released urgently.",
        "Semantic versioning uses major.minor.patch to signal the size of a change.",
        "Every update primarily adds new, user-visible features.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "A substantial share of updates are entirely internal — bug fixes, security patches, performance improvements.",
      ],
      solution_summary:
        "Not every update adds visible features — a substantial share are entirely internal fixes or security patches a user may never consciously notice.",
      key_concepts: ["update types", "common misconception"],
    },
    {
      id: "what_is_an_update_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "Compare an interrupted firmware update (power loss mid-flash) to a failed ordinary software update. Which one typically carries greater risk, and why?",
      options: [
        "They carry identical risk, since both are just updates",
        "The firmware update carries greater risk, since firmware is the first code that runs, with no fallback layer beneath it",
        "The software update carries greater risk, since software runs more often",
        "Neither carries any real risk since updates always succeed",
      ],
      correct_index: 1,
      hints: [
        "The topic directly compares these two scenarios using the layering established in Firmware vs. Software vs. Hardware.",
        "A failed software update still has a fully intact OS and firmware underneath it to fall back on.",
      ],
      solution_summary:
        "A firmware update carries meaningfully greater risk — it sits at the very bottom of the layered stack with no fallback layer beneath it, unlike a software update where the OS and firmware underneath remain intact.",
      key_concepts: ["firmware update risk", "software update safety net"],
    },
    {
      id: "what_is_an_update_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Bug fix update", "Security patch", "Feature update", "Semantic versioning"],
      right_shuffled: [
        "Adds genuinely new functionality that didn't exist before",
        "The major.minor.patch convention for numbering releases",
        "Corrects specific, identified flaws in existing behavior",
        "Closes a discovered vulnerability a malicious actor could exploit",
      ],
      correct_assignments: [2, 3, 0, 1],
      hints: [
        "A security patch is specifically about closing an exploitable flaw.",
        "Semantic versioning is the numbering convention, not a type of change itself.",
      ],
      solution_summary:
        "Bug fix = corrects existing flaws; Security patch = closes an exploitable vulnerability; Feature update = adds new functionality; Semantic versioning = major.minor.patch numbering.",
      key_concepts: ["bug fix", "security patch", "feature update", "semantic versioning"],
    },
  ],

  mechanical_calculators: [
    {
      id: "mechanical_calculators_ac1",
      type: "order",
      prompt: "Put these mechanical-calculation milestones in chronological order.",
      items: [
        "Pascal's Pascaline: a fixed-purpose mechanical adder/subtractor",
        "Babbage designs the Analytical Engine: a general-purpose, punch-card-instructed mechanical computer",
        "Hollerith builds a working punched-card tabulating machine, used for the 1890 U.S. Census",
      ],
      shuffled_items: [
        "Hollerith builds a working punched-card tabulating machine, used for the 1890 U.S. Census",
        "Pascal's Pascaline: a fixed-purpose mechanical adder/subtractor",
        "Babbage designs the Analytical Engine: a general-purpose, punch-card-instructed mechanical computer",
      ],
      hints: [
        "The Pascaline came first, in the 1600s.",
        "Babbage's design (1830s) came before Hollerith's actual working machine (1880s).",
      ],
      solution_summary:
        "Pascaline (1600s, fixed-purpose) → Babbage's Analytical Engine design (1830s, general-purpose, never fully built) → Hollerith's working tabulating machine (1880s).",
      key_concepts: ["Pascaline", "Analytical Engine", "Hollerith tabulating machine"],
    },
    {
      id: "mechanical_calculators_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A mechanical calculator performs arithmetic using physical, moving parts rather than electricity. Babbage's Analytical Engine was designed with separate components for processing and memory, plus punched-card instructions. Ada Lovelace wrote what's considered the first published algorithm intended to run on it. And \"mechanical\" and \"primitive\" mean roughly the same thing in this context.' Which claim is wrong?",
      options: [
        "A mechanical calculator performs arithmetic using physical, moving parts rather than electricity.",
        "Babbage's Analytical Engine was designed with separate components for processing and memory, plus punched-card instructions.",
        "Ada Lovelace wrote what's considered the first published algorithm intended to run on it.",
        "\"Mechanical\" and \"primitive\" mean roughly the same thing in this context.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "The Engine's conceptual design was genuinely sophisticated — its limitation was manufacturing, not the underlying idea.",
      ],
      solution_summary:
        "\"Mechanical\" doesn't mean \"primitive\" here — the Analytical Engine's conceptual design was genuinely sophisticated; its actual limitation was 1830s manufacturing precision, not the underlying idea.",
      key_concepts: ["Analytical Engine sophistication", "common misconception"],
    },
    {
      id: "mechanical_calculators_ac3",
      type: "match",
      prompt: "Match each part of Babbage's Analytical Engine design to its modern conceptual equivalent.",
      left: ["The \"mill\"", "The \"store\"", "Punched cards"],
      right_shuffled: [
        "The modern equivalent of changeable program instructions",
        "The modern equivalent of the CPU's processing role",
        "The modern equivalent of memory holding numbers for later use",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "The mill did the actual arithmetic.",
        "Punched cards let the same hardware run different calculations.",
      ],
      solution_summary:
        "Mill = ancestor of the CPU; Store = ancestor of memory; Punched cards = ancestor of changeable program instructions.",
      key_concepts: ["mill", "store", "punched cards"],
    },
  ],

  vacuum_tubes_to_ics: [
    {
      id: "vacuum_tubes_to_ics_ac1",
      type: "order",
      prompt: "Put these three electronic-switching technologies in the order they historically replaced each other.",
      items: [
        "Vacuum tubes: bulky, power-hungry, and mechanically fragile electronic switches",
        "Individual transistors: smaller, lower-power, more reliable solid-state switches",
        "Integrated circuits: many transistors fabricated directly onto one piece of semiconductor material",
      ],
      shuffled_items: [
        "Integrated circuits: many transistors fabricated directly onto one piece of semiconductor material",
        "Vacuum tubes: bulky, power-hungry, and mechanically fragile electronic switches",
        "Individual transistors: smaller, lower-power, more reliable solid-state switches",
      ],
      hints: [
        "Vacuum tubes came first, in machines like ENIAC in the 1940s.",
        "Integrated circuits came after individual, separately manufactured transistors.",
      ],
      solution_summary:
        "Vacuum tubes (1940s) → individual transistors (1947, Bell Labs) → integrated circuits (late 1950s, many transistors on one chip).",
      key_concepts: ["vacuum tube", "transistor", "integrated circuit"],
    },
    {
      id: "vacuum_tubes_to_ics_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Vacuum tubes were bulky, power-hungry, and prone to burning out. The transistor solved all three of those problems at once. Integrated circuits fabricate many transistors directly onto one piece of semiconductor material. And this whole transition happened as one single, sudden leap straight from vacuum tubes to modern chips.' Which claim is wrong?",
      options: [
        "Vacuum tubes were bulky, power-hungry, and prone to burning out.",
        "The transistor solved all three of those problems at once.",
        "Integrated circuits fabricate many transistors directly onto one piece of semiconductor material.",
        "This whole transition happened as one single, sudden leap straight from vacuum tubes to modern chips.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "It was a genuine multi-decade sequence of distinct engineering steps.",
      ],
      solution_summary:
        "This was a genuine multi-decade sequence of distinct steps — vacuum tubes to individual transistors to small integrated circuits to chips holding billions of transistors — not one sudden leap.",
      key_concepts: ["gradual technological transition", "common misconception"],
    },
    {
      id: "vacuum_tubes_to_ics_ac3",
      type: "match",
      prompt: "Match each term to its correct description.",
      left: ["Vacuum tube", "Transistor", "Integrated circuit"],
      right_shuffled: [
        "A technique for fabricating many transistors and their wiring onto one piece of semiconductor material",
        "A glass-enclosed component controlling current flow, bulky and prone to burning out",
        "A dramatically smaller, lower-power, more reliable solid-state switch invented in 1947",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "The vacuum tube is the earliest, largest, least reliable of the three.",
        "The integrated circuit is about fabricating many switches together, not the switch itself.",
      ],
      solution_summary:
        "Vacuum tube = bulky glass-enclosed switch; Transistor = smaller, reliable solid-state switch; Integrated circuit = many transistors fabricated onto one chip.",
      key_concepts: ["vacuum tube", "transistor", "integrated circuit"],
    },
  ],

  punch_cards_to_keyboards: [
    {
      id: "punch_cards_to_keyboards_ac1",
      type: "order",
      prompt: "Put these input/output milestones in chronological order.",
      items: [
        "Punch cards: instructions and data prepared in advance and physically fed into a machine",
        "Teletype: a typed keyboard input with the response printed immediately on paper",
        "Keyboard and monitor: real-time typed input with an immediate on-screen response",
      ],
      shuffled_items: [
        "Keyboard and monitor: real-time typed input with an immediate on-screen response",
        "Punch cards: instructions and data prepared in advance and physically fed into a machine",
        "Teletype: a typed keyboard input with the response printed immediately on paper",
      ],
      hints: [
        "Punch cards required off-machine preparation before anything interactive existed.",
        "The teletype bridged punch cards and modern screens by printing responses on paper instead of displaying them.",
      ],
      solution_summary:
        "Punch cards (prepared in advance) → teletype (real-time typing, printed paper response) → keyboard and monitor (real-time typing, on-screen response).",
      key_concepts: ["punch card", "teletype", "keyboard and monitor"],
    },
    {
      id: "punch_cards_to_keyboards_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A punch card encodes data as a pattern of punched or unpunched holes, a physical form of binary. A keyboard converts a keypress into an electrical signal in real time. A teletype let a person type input and have the response printed immediately on paper. And punch cards were simply a crude, obviously inferior stopgap everyone was eager to abandon the moment something better appeared.' Which claim is wrong?",
      options: [
        "A punch card encodes data as a pattern of punched or unpunched holes, a physical form of binary.",
        "A keyboard converts a keypress into an electrical signal in real time.",
        "A teletype let a person type input and have the response printed immediately on paper.",
        "Punch cards were simply a crude, obviously inferior stopgap everyone was eager to abandon the moment something better appeared.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "Punch cards had real practical advantages — durability, easy storage, mechanical reliability.",
      ],
      solution_summary:
        "Punch cards had genuine practical advantages for their era, which is exactly why they remained in serious, widespread use for a long time rather than being abandoned the moment something else appeared.",
      key_concepts: ["punch card advantages", "common misconception"],
    },
    {
      id: "punch_cards_to_keyboards_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Punch card", "Teletype", "Batch processing"],
      right_shuffled: [
        "Submitting prepared work and waiting for results later, with no interaction while it runs",
        "A stiff paper card encoding data as a pattern of holes",
        "An electromechanical device letting typed input get an immediately printed paper response",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Batch processing is the model punch cards were used within, not a physical object.",
        "The teletype bridges punch cards and modern interactive terminals.",
      ],
      solution_summary:
        "Punch card = holes encoding binary data; Teletype = real-time typed input, printed response; Batch processing = submit-and-wait model with no live interaction.",
      key_concepts: ["punch card", "teletype", "batch processing"],
    },
  ],

  arpanet_to_internet: [
    {
      id: "arpanet_to_internet_ac1",
      type: "order",
      prompt: "Put these networking history milestones in chronological order.",
      items: [
        "ARPANET launches in 1969, connecting four university computers via packet switching",
        "TCP/IP is adopted in 1983, letting genuinely separate networks interconnect",
        "The World Wide Web is invented (1989-1991), layered on top of the existing internet",
        "Commercial ISPs and graphical browsers bring the internet to ordinary households in the 1990s",
      ],
      shuffled_items: [
        "The World Wide Web is invented (1989-1991), layered on top of the existing internet",
        "ARPANET launches in 1969, connecting four university computers via packet switching",
        "Commercial ISPs and graphical browsers bring the internet to ordinary households in the 1990s",
        "TCP/IP is adopted in 1983, letting genuinely separate networks interconnect",
      ],
      hints: [
        "ARPANET came first, decades before the Web existed.",
        "TCP/IP adoption (1983) came before the Web's invention (1989-1991).",
      ],
      solution_summary:
        "ARPANET (1969) → TCP/IP adoption (1983) → World Wide Web invented (1989-1991) → commercial ISPs and browsers bring mass adoption (1990s).",
      key_concepts: ["ARPANET", "TCP/IP adoption", "World Wide Web", "commercial internet"],
    },
    {
      id: "arpanet_to_internet_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'ARPANET used packet switching, breaking messages into independently routed chunks. TCP/IP's adoption let separate networks interconnect using one shared protocol. The World Wide Web is a system of linked documents built on top of the internet's existing infrastructure. And \"the internet\" and \"the World Wide Web\" are simply two names for the identical thing.' Which claim is wrong?",
      options: [
        "ARPANET used packet switching, breaking messages into independently routed chunks.",
        "TCP/IP's adoption let separate networks interconnect using one shared protocol.",
        "The World Wide Web is a system of linked documents built on top of the internet's existing infrastructure.",
        "\"The internet\" and \"the World Wide Web\" are simply two names for the identical thing.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as baked into extremely common everyday phrasing.",
        "The internet is the underlying network infrastructure; the Web is one application built on top of it.",
      ],
      solution_summary:
        "The internet is the underlying packet-switched network infrastructure; the Web is one particular application built on top of it — email and other internet applications predate the Web by decades.",
      key_concepts: ["internet vs World Wide Web", "common misconception"],
    },
    {
      id: "arpanet_to_internet_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["ARPANET", "Packet switching", "TCP/IP", "World Wide Web"],
      right_shuffled: [
        "A shared protocol adopted in 1983 letting separate networks interconnect",
        "An early research network built in 1969, funded by the U.S. Department of Defense",
        "A system of interlinked documents built on top of the internet's existing infrastructure",
        "Breaking a message into small, independently addressed, independently routed chunks",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "Packet switching was ARPANET's key resilience-driven design decision.",
        "The Web came after TCP/IP had already let networks interconnect.",
      ],
      solution_summary:
        "ARPANET = the 1969 research network; Packet switching = independently routed message chunks; TCP/IP = the shared interconnection protocol; World Wide Web = linked documents on top of the internet.",
      key_concepts: ["ARPANET", "packet switching", "TCP/IP", "World Wide Web"],
    },
  ],

  pc_boom: [
    {
      id: "pc_boom_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The PC boom was made possible by the integrated circuit's continued miniaturization. IBM's open, published architecture let other manufacturers build compatible machines. Microsoft's MS-DOS and later Windows became the dominant OS on IBM-compatible hardware. And the personal computer was invented by any one single company or individual.' Which claim is wrong?",
      options: [
        "The PC boom was made possible by the integrated circuit's continued miniaturization.",
        "IBM's open, published architecture let other manufacturers build compatible machines.",
        "Microsoft's MS-DOS and later Windows became the dominant OS on IBM-compatible hardware.",
        "The personal computer was invented by any one single company or individual.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "It emerged from a broader wave of parallel hobbyist, academic, and commercial activity.",
      ],
      solution_summary:
        "The personal computer wasn't invented by any single company or person — it emerged from a broader wave of parallel activity, with Apple and IBM each playing separate, significant roles.",
      key_concepts: ["PC boom origins", "common misconception"],
    },
    {
      id: "pc_boom_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "IBM publishes its PC's technical specifications openly rather than keeping them proprietary. What's the likely consequence?",
      options: [
        "No effect at all, since specifications don't matter to other manufacturers",
        "Other manufacturers build directly compatible machines, accelerating the whole market — including eventual competitors to IBM itself",
        "IBM becomes the only company ever allowed to build PCs",
        "The personal computer market shrinks due to increased competition",
      ],
      correct_index: 1,
      hints: [
        "The topic describes this as a real, calculated business strategy with mixed long-term consequences for IBM.",
        "Openness accelerated adoption while also directly enabling real competitors.",
      ],
      solution_summary:
        "Other manufacturers build directly compatible hardware, accelerating the whole market's growth — a strategy that benefited IBM's platform initially while also enabling competitors to later outcompete it.",
      key_concepts: ["open architecture", "IBM-compatible ecosystem"],
    },
    {
      id: "pc_boom_ac3",
      type: "match",
      prompt: "Match each company/machine to its defining contribution in the PC boom.",
      left: ["Apple II (1977)", "IBM PC (1981)", "Microsoft"],
      right_shuffled: [
        "Built its early business writing software, later dominating with MS-DOS and Windows",
        "A complete, ready-to-use personal computer prioritizing approachability for ordinary users",
        "A deliberately open architecture allowing other manufacturers to build compatible machines",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "The Apple II emphasized approachability; the IBM PC emphasized open compatibility.",
        "Microsoft's contribution was software, not the hardware itself.",
      ],
      solution_summary:
        "Apple II = approachable complete computer; IBM PC = open architecture enabling compatible machines; Microsoft = dominant software (MS-DOS/Windows) running on that hardware.",
      key_concepts: ["Apple II", "IBM PC", "Microsoft"],
    },
  ],

  mobile_era: [
    {
      id: "mobile_era_ac1",
      type: "order",
      prompt: "Put these enabling factors and milestones of the mobile era in the order the topic presents them.",
      items: [
        "Continued transistor miniaturization makes a full computer small and power-efficient enough for a pocket",
        "Cellular network technology advances enough to support genuinely usable mobile data",
        "The iPhone (2007) combines a full touchscreen, real internet connectivity, and an app ecosystem",
        "The app store model becomes the standard way to distribute mobile software",
      ],
      shuffled_items: [
        "The app store model becomes the standard way to distribute mobile software",
        "Continued transistor miniaturization makes a full computer small and power-efficient enough for a pocket",
        "The iPhone (2007) combines a full touchscreen, real internet connectivity, and an app ecosystem",
        "Cellular network technology advances enough to support genuinely usable mobile data",
      ],
      hints: [
        "Hardware miniaturization is the underlying enabling trend, coming before any specific device.",
        "The app store model followed the iPhone's app ecosystem, as its distribution method.",
      ],
      solution_summary:
        "Transistor miniaturization enables small, efficient hardware → cellular data becomes usable → the iPhone combines touchscreen/internet/apps → the app store becomes the standard distribution model.",
      key_concepts: ["mobile era enablers", "iPhone", "app store"],
    },
    {
      id: "mobile_era_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A smartphone is a general-purpose computer in the same sense as a desktop, just at a different power budget. Android is built on an open-source foundation letting many manufacturers build compatible hardware. The app store became the standard distribution method for mobile software. And a smartphone's underlying hardware is categorically, fundamentally different in kind from a desktop or laptop's hardware.' Which claim is wrong?",
      options: [
        "A smartphone is a general-purpose computer in the same sense as a desktop, just at a different power budget.",
        "Android is built on an open-source foundation letting many manufacturers build compatible hardware.",
        "The app store became the standard distribution method for mobile software.",
        "A smartphone's underlying hardware is categorically, fundamentally different in kind from a desktop or laptop's hardware.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "It contains a genuine CPU, RAM, storage, and GPU, just engineered for a tighter power/size budget.",
      ],
      solution_summary:
        "A smartphone's hardware isn't a fundamentally different category — it contains a genuine CPU, RAM, storage, and GPU, covered in the same terms as the Hardware section, just engineered for a much tighter power and size budget.",
      key_concepts: ["smartphone hardware", "common misconception"],
    },
    {
      id: "mobile_era_ac3",
      type: "match",
      prompt: "Match each term to its correct description.",
      left: ["iPhone (2007)", "Android", "App store model"],
      right_shuffled: [
        "An open-source mobile OS letting many phone manufacturers build compatible hardware",
        "A centralized, curated marketplace built into the OS for browsing and installing native apps",
        "Combined a full touchscreen, real internet connectivity, and an app ecosystem into one device",
      ],
      correct_assignments: [2, 0, 1],
      hints: [
        "Android's open-source foundation echoes IBM's open PC architecture dynamic.",
        "The app store is about distribution, not the device itself.",
      ],
      solution_summary:
        "iPhone = combined touchscreen/internet/apps into one device; Android = open-source mobile OS across many manufacturers; App store model = the standard curated software distribution method.",
      key_concepts: ["iPhone", "Android", "app store model"],
    },
  ],

  brief_ai_history: [
    {
      id: "brief_ai_history_ac1",
      type: "order",
      prompt: "Put these AI history milestones in chronological order.",
      items: [
        "Rule-based (symbolic) AI: human experts write explicit logical rules by hand",
        "Machine learning becomes the dominant approach: systems identify patterns from training data automatically",
        "Deep learning accelerates thanks to GPU hardware becoming widely available for parallel computation",
        "Large Language Models (LLMs) apply deep learning to predict and generate coherent language",
      ],
      shuffled_items: [
        "Deep learning accelerates thanks to GPU hardware becoming widely available for parallel computation",
        "Rule-based (symbolic) AI: human experts write explicit logical rules by hand",
        "Large Language Models (LLMs) apply deep learning to predict and generate coherent language",
        "Machine learning becomes the dominant approach: systems identify patterns from training data automatically",
      ],
      hints: [
        "Rule-based systems dominated first, from the 1950s through the 1980s.",
        "LLMs are described as a more recent application of deep learning, which itself needed GPUs to scale.",
      ],
      solution_summary:
        "Rule-based/symbolic AI (1950s-1980s) → machine learning becomes dominant (1990s+) → deep learning accelerates via GPUs (2010s) → LLMs apply deep learning to language (recent).",
      key_concepts: ["rule-based AI", "machine learning", "deep learning", "LLMs"],
    },
    {
      id: "brief_ai_history_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Rule-based systems required every rule to be manually written and coded in by a human in advance. Machine learning systems automatically identify statistical patterns from training data. The deep learning boom was substantially enabled by GPU hardware. And AI is an entirely recent invention, arriving suddenly sometime in just the last few years with no meaningful prior history.' Which claim is wrong?",
      options: [
        "Rule-based systems required every rule to be manually written and coded in by a human in advance.",
        "Machine learning systems automatically identify statistical patterns from training data.",
        "The deep learning boom was substantially enabled by GPU hardware.",
        "AI is an entirely recent invention, arriving suddenly sometime in just the last few years with no meaningful prior history.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "The field is genuinely over seven decades old, tracing back to the 1950s.",
      ],
      solution_summary:
        "AI is not a recent invention — the field is genuinely over seven decades old; what's changed most recently is available training data and GPU-driven parallel computing power, not the fundamental idea.",
      key_concepts: ["AI history length", "common misconception"],
    },
    {
      id: "brief_ai_history_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Rule-based (symbolic) AI", "Machine learning", "Deep learning", "LLM"],
      right_shuffled: [
        "A neural-network approach with many layers, learning complex patterns from large data volumes",
        "A system trained on enormous text data to predict and generate coherent language",
        "Explicit, human-written logical rules encoding expert knowledge directly into code",
        "Systems that automatically identify statistical patterns in training data rather than following hand-written rules",
      ],
      correct_assignments: [2, 3, 0, 1],
      hints: [
        "Deep learning is a specific technique within machine learning, not a synonym for it.",
        "LLMs are a particular, recent application of deep learning applied to language.",
      ],
      solution_summary:
        "Rule-based AI = hand-written explicit rules; Machine learning = automatic pattern identification from data; Deep learning = many-layered neural networks; LLM = deep learning applied to generate language.",
      key_concepts: ["rule-based AI", "machine learning", "deep learning", "LLM"],
    },
  ],

  silicon_semiconductors: [
    {
      id: "silicon_semiconductors_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Silicon is a semiconductor, sitting electrically in between a conductor and an insulator. Its conductivity can be deliberately, precisely controlled and altered. Silicon eventually won out over germanium partly because it forms a stable natural oxide layer useful in manufacturing. And silicon was chosen for computer chips because it's an unusually good conductor of electricity.' Which claim is wrong?",
      options: [
        "Silicon is a semiconductor, sitting electrically in between a conductor and an insulator.",
        "Its conductivity can be deliberately, precisely controlled and altered.",
        "Silicon eventually won out over germanium partly because it forms a stable natural oxide layer useful in manufacturing.",
        "Silicon was chosen for computer chips because it's an unusually good conductor of electricity.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as the most common misconception.",
        "Silicon's value comes from its moderate, controllable 'in-between' conductivity, not from being a great conductor.",
      ],
      solution_summary:
        "Silicon wasn't chosen for being a great conductor — its value comes from close to the opposite: its moderate, controllable, in-between conductivity is exactly what makes it possible to engineer a reliable switch.",
      key_concepts: ["semiconductor conductivity", "common misconception"],
    },
    {
      id: "silicon_semiconductors_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "Pure, untreated silicon is examined at room temperature with no further engineering applied. What's its conductivity like?",
      options: [
        "It conducts electricity extremely well, like copper",
        "It's actually a fairly poor conductor, since its electrons are largely tied up in a stable crystal bonding pattern",
        "It doesn't conduct at all, exactly like rubber",
        "Its conductivity is random and unpredictable",
      ],
      correct_index: 1,
      hints: [
        "The topic states this exact fact directly.",
        "Silicon's electrons form a stable, fully-satisfied bonding pattern in its crystal lattice.",
      ],
      solution_summary:
        "Pure, untreated silicon is actually a fairly poor conductor at room temperature, since its electrons are largely tied up in a stable crystal bonding pattern with few free to carry current.",
      key_concepts: ["pure silicon conductivity", "crystal lattice"],
    },
    {
      id: "silicon_semiconductors_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Conductor", "Insulator", "Semiconductor", "Crystal lattice"],
      right_shuffled: [
        "A repeating, orderly geometric arrangement of atoms sharing electrons",
        "A material whose conductivity sits in between and can be deliberately controlled",
        "A material like copper that lets current flow through easily",
        "A material like rubber that essentially blocks current from flowing",
      ],
      correct_assignments: [2, 3, 1, 0],
      hints: [
        "Silicon's atoms specifically arrange into this repeating structure.",
        "A semiconductor is neither a great conductor nor a total insulator.",
      ],
      solution_summary:
        "Conductor = lets current flow easily; Insulator = blocks current; Semiconductor = controllable in-between conductivity; Crystal lattice = the repeating atomic structure silicon forms.",
      key_concepts: ["conductor", "insulator", "semiconductor", "crystal lattice"],
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
