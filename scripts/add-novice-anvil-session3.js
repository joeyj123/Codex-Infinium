// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to Novice topics 21-30 (container_formats_codecs through server_vs_client).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  container_formats_codecs: [
    {
      id: "container_formats_codecs_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A container format bundles video, audio, and metadata streams into one file. A codec is the algorithm used to compress and decompress that raw data. Two .mp4 files can use entirely different video codecs inside despite sharing the same extension. And a file's extension guarantees exactly which codec was used to encode its streams.' Which claim is wrong?",
      options: [
        "A container format bundles video, audio, and metadata streams into one file.",
        "A codec is the algorithm used to compress and decompress that raw data.",
        "Two .mp4 files can use entirely different video codecs inside despite sharing the same extension.",
        "A file's extension guarantees exactly which codec was used to encode its streams.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this exact claim — an extension only tells you the container, not the codec inside.",
        "This is exactly why one .mp4 plays fine while another fails or has no sound.",
      ],
      solution_summary:
        "The extension only tells you the container format — it says nothing guaranteed about which codec was actually used to encode the streams packed inside it.",
      key_concepts: ["container format", "codec", "common misconception"],
    },
    {
      id: "container_formats_codecs_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A media player opens an .mp4 file's structure fine, but then fails partway through with no video showing. What's the most likely explanation?",
      options: [
        "The .mp4 extension itself is corrupted",
        "The player understands the container but lacks a decoder for the specific video codec used inside it",
        "The file is not actually a container format at all",
        "The container and codec are always incompatible with each other by design",
      ],
      correct_index: 1,
      hints: [
        "The player needs to understand both layers — the container structure and the specific codec inside.",
        "This is exactly the opening scenario the topic describes.",
      ],
      solution_summary:
        "The player can parse the container fine but lacks a decoder for the specific codec used inside — the container and codec are separate layers, and both need to be understood.",
      key_concepts: ["container vs codec", "decoder", "playback failure"],
    },
    {
      id: "container_formats_codecs_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Container format", "Codec", "Remuxing", "Re-encoding"],
      right_shuffled: [
        "Repackaging already-compressed streams into a different container with no quality loss",
        "A file structure bundling video, audio, and metadata streams together",
        "Fully decoding and recompressing a stream with a different algorithm",
        "The algorithm used to compress and decompress raw video or audio data",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "Remuxing doesn't touch the actual compressed data, only the packaging.",
        "Re-encoding is the slower operation that risks additional quality loss.",
      ],
      solution_summary:
        "Container format = bundles streams; Codec = compression algorithm; Remuxing = repackage without re-encoding; Re-encoding = decode and recompress with a different algorithm.",
      key_concepts: ["container format", "codec", "remuxing", "re-encoding"],
    },
  ],

  archives_compression: [
    {
      id: "archives_compression_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Archiving bundles multiple files into one container while preserving their individual identities. Lossless compression can reconstruct every original byte exactly. Lossy compression permanently discards some original data. And having a .zip of your files in the same folder as the originals counts as a real backup.' Which claim is wrong?",
      options: [
        "Archiving bundles multiple files into one container while preserving their individual identities.",
        "Lossless compression can reconstruct every original byte exactly.",
        "Lossy compression permanently discards some original data.",
        "Having a .zip of your files in the same folder as the originals counts as a real backup.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly names this exact claim as a common misconception.",
        "A .zip on the same drive offers zero protection if that drive fails.",
      ],
      solution_summary:
        "A .zip sitting on the same drive as the files it was made from offers zero protection against that drive failing — that's not what archiving and compression are built to solve.",
      key_concepts: ["archive vs backup", "common misconception"],
    },
    {
      id: "archives_compression_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You compress an already-heavily-compressed .mp4 video file into a .zip archive. What's the likely result?",
      options: [
        "It shrinks dramatically, just like a repetitive text file would",
        "It barely shrinks further at all, since the codec already squeezed out most of the easy redundancy",
        "It becomes corrupted, since video files can't be zipped",
        "It grows enormously in size",
      ],
      correct_index: 1,
      hints: [
        "Compression works by exploiting redundancy — a codec has already removed most of that from a video file.",
        "The topic states this exact scenario directly.",
      ],
      solution_summary:
        "It barely shrinks further, since the video's own codec already squeezed out most of the exploitable redundancy — there's little left for the zip algorithm to find.",
      key_concepts: ["redundancy", "lossless compression limits", "already-compressed data"],
    },
    {
      id: "archives_compression_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Archive", "Lossless compression", "Lossy compression"],
      right_shuffled: [
        "Deliberately and permanently discards some original data to save more space",
        "A single file bundling multiple files and folders while preserving their individual identities",
        "Fully reversible compression that reconstructs every original byte exactly",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Archiving is about bundling, not shrinking.",
        "Only one of these two compression types is fully reversible.",
      ],
      solution_summary:
        "Archive = bundles files/folders together; Lossless compression = exact reconstruction, zero data lost; Lossy compression = permanently discards some data for greater size reduction.",
      key_concepts: ["archive", "lossless compression", "lossy compression"],
    },
  ],

  disk_images_iso: [
    {
      id: "disk_images_iso_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A disk image is an exact, byte-for-byte digital copy of everything on a physical disc. Mounting an .iso lets the OS treat it as if it were a real inserted disc drive. An .iso can capture structural details like a boot sector. And an .iso is basically just a zip file with a different name.' Which claim is wrong?",
      options: [
        "A disk image is an exact, byte-for-byte digital copy of everything on a physical disc.",
        "Mounting an .iso lets the OS treat it as if it were a real inserted disc drive.",
        "An .iso can capture structural details like a boot sector.",
        "An .iso is basically just a zip file with a different name.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly rebuts this exact claim as the most common misconception.",
        "A disk image faithfully reproduces an entire disc's structure, including things an archive has no equivalent for.",
      ],
      solution_summary:
        "An .iso isn't just a renamed zip — it faithfully reproduces an entire disc's structure, including details like a boot sector that a simple archive format has no equivalent for.",
      key_concepts: ["disk image vs archive", "common misconception"],
    },
    {
      id: "disk_images_iso_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You mount an .iso file directly on your computer, without burning it to a disc. What happens?",
      options: [
        "Nothing — .iso files can only be used by burning them to a physical disc first",
        "The OS treats the image file as if it were a real, currently-inserted disc, letting you browse and open its contents",
        "The file automatically converts itself into a .zip archive",
        "The computer refuses to recognize the file entirely",
      ],
      correct_index: 1,
      hints: [
        "Mounting is one of the two main ways to use a disk image — no physical disc required.",
        "The topic names this exact use case directly.",
      ],
      solution_summary:
        "Mounting lets the OS treat the image file as if it were a real inserted disc, letting you browse and open its contents with no physical disc or drive needed at all.",
      key_concepts: ["mounting a disk image", "no physical media needed"],
    },
    {
      id: "disk_images_iso_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Disk image", "ISO 9660", "Mounting", "Boot sector"],
      right_shuffled: [
        "The exact data a computer's firmware reads first when trying to start from a disc",
        "Treating an image file as if it were a real, currently-inserted disc",
        "The standardized file system format historically used by CDs and DVDs",
        "A byte-for-byte digital copy of an entire physical disc's contents and structure",
      ],
      correct_assignments: [3, 2, 1, 0],
      hints: [
        "ISO 9660 is specifically the standard, not the general concept of a disk image.",
        "The boot sector is what firmware checks first when trying to boot from a disc.",
      ],
      solution_summary:
        "Disk image = byte-for-byte copy of a disc; ISO 9660 = the CD/DVD file system standard; Mounting = treating the file as a real disc; Boot sector = data firmware reads first to boot.",
      key_concepts: ["disk image", "ISO 9660", "mounting", "boot sector"],
    },
  ],

  roms_emulation: [
    {
      id: "roms_emulation_ac1",
      type: "order",
      prompt: "Put these steps of playing an old cartridge game today in the correct order.",
      items: [
        "Someone reads a physical cartridge's memory chip byte by byte, creating a ROM file",
        "The ROM file is loaded into an emulator built for that original console's hardware",
        "The emulator translates the original console's instructions into operations the host computer can perform",
        "The game runs, with its original graphics, sound, and controller input faithfully reproduced in software",
      ],
      shuffled_items: [
        "The emulator translates the original console's instructions into operations the host computer can perform",
        "The ROM file is loaded into an emulator built for that original console's hardware",
        "The game runs, with its original graphics, sound, and controller input faithfully reproduced in software",
        "Someone reads a physical cartridge's memory chip byte by byte, creating a ROM file",
      ],
      hints: [
        "The ROM file has to exist before an emulator can load it.",
        "Translation has to happen before the game can actually run correctly.",
      ],
      solution_summary:
        "Dump the cartridge into a ROM file → load it into a matching emulator → the emulator translates instructions → the game runs.",
      key_concepts: ["ROM", "emulator", "instruction translation"],
    },
    {
      id: "roms_emulation_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A ROM is a faithful digital capture of a cartridge's original contents. An emulator simulates the original hardware's behavior in software. Any emulator can run any ROM from any system interchangeably. And highly accurate emulation sometimes requires reproducing undocumented hardware quirks, not just official behavior.' Which claim is wrong?",
      options: [
        "A ROM is a faithful digital capture of a cartridge's original contents.",
        "An emulator simulates the original hardware's behavior in software.",
        "Any emulator can run any ROM from any system interchangeably.",
        "Highly accurate emulation sometimes requires reproducing undocumented hardware quirks, not just official behavior.",
      ],
      correct_index: 2,
      hints: [
        "The topic directly rebuts this exact claim as a frequent misconception.",
        "An emulator is generally built to simulate one specific piece of hardware or a closely related family.",
      ],
      solution_summary:
        "An emulator is built to simulate one specific system's hardware — a ROM dumped from a different, unrelated system's cartridge is meaningless data to it.",
      key_concepts: ["emulator specificity", "common misconception"],
    },
    {
      id: "roms_emulation_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["ROM", "Emulator", "Instruction set", "Undocumented hardware quirk"],
      right_shuffled: [
        "A program simulating a different piece of hardware entirely in software",
        "An old chip's specific, unofficial behavior that some games were built to rely on",
        "A digital dump of a cartridge's original memory chip contents",
        "The particular vocabulary of raw operations a specific CPU understands",
      ],
      correct_assignments: [2, 0, 3, 1],
      hints: [
        "A ROM is the captured data; an emulator is the program that plays it.",
        "Undocumented quirks were never formally specified anywhere — only ever existing as 'whatever the real chip happened to do.'",
      ],
      solution_summary:
        "ROM = digital dump of cartridge memory; Emulator = software simulating hardware; Instruction set = a CPU's vocabulary of operations; Undocumented quirk = unofficial behavior some games relied on.",
      key_concepts: ["ROM", "emulator", "instruction set", "hardware quirks"],
    },
  ],

  what_is_terminal: [
    {
      id: "what_is_terminal_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A terminal is a text-based interface where you type commands and the computer prints text back. A GUI and a terminal are two different interfaces to the exact same operating system underneath. Text is more expensive to display than graphics, which is why terminals came first. And clicking \"New Folder\" and typing a command both ultimately ask the OS to do the identical thing.' Which claim is wrong?",
      options: [
        "A terminal is a text-based interface where you type commands and the computer prints text back.",
        "A GUI and a terminal are two different interfaces to the exact same operating system underneath.",
        "Text is more expensive to display than graphics, which is why terminals came first.",
        "Clicking \"New Folder\" and typing a command both ultimately ask the OS to do the identical thing.",
      ],
      correct_index: 2,
      hints: [
        "The topic says the opposite — text is enormously cheap to display compared to graphics.",
        "Early computers lacked the power to draw a graphical desktop in real time, which is exactly why text came first.",
      ],
      solution_summary:
        "Text is actually far cheaper to display than graphics — that's exactly why the terminal came first, before computers had the processing power to draw a graphical desktop.",
      key_concepts: ["terminal history", "text vs graphics cost", "common misconception"],
    },
    {
      id: "what_is_terminal_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "You create a new folder by right-clicking in a file browser and choosing 'New Folder,' versus typing an equivalent command in a terminal. What's the relationship between the two results?",
      options: [
        "They produce genuinely different outcomes, since the terminal is a more 'raw' layer of the computer",
        "They ask the OS to do the identical thing — create a new entry in the file system — just through two different front doors",
        "Only the GUI action actually creates a real folder; the terminal command just displays text",
        "The terminal command requires special hardware the GUI action doesn't",
      ],
      correct_index: 1,
      hints: [
        "Both are just different ways of asking the same underlying operating system to do something.",
        "The topic explicitly makes this exact comparison.",
      ],
      solution_summary:
        "Both ask the OS to do the identical thing — create a new file system entry — they're just two different front doors into the same house.",
      key_concepts: ["GUI vs terminal", "same underlying OS request"],
    },
    {
      id: "what_is_terminal_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Terminal", "CLI (command-line interface)", "GUI (graphical user interface)"],
      right_shuffled: [
        "A category of interface where you interact by typing commands, not clicking",
        "A window where you type commands and the computer prints text responses back",
        "An interface built around icons, windows, and a mouse, layered on top of the OS",
      ],
      correct_assignments: [1, 0, 2],
      hints: [
        "CLI is the general category; terminal is the specific window you use one inside.",
        "The GUI is described as a later invention layered on top of the same OS.",
      ],
      solution_summary:
        "Terminal = the text window itself; CLI = the general category of typed-command interfaces; GUI = the icon-and-mouse interface layered on top of the OS.",
      key_concepts: ["terminal", "CLI", "GUI"],
    },
  ],

  basic_nav_commands: [
    {
      id: "basic_nav_commands_ac1",
      type: "order",
      prompt:
        "Put these terminal actions in order for the workflow: confirm your location, create a new folder, move into it, then confirm it's empty.",
      items: [
        "pwd — confirm you're standing in your home folder",
        "mkdir Projects — create a new folder named Projects",
        "cd Projects — move into the new folder",
        "ls (or dir) — confirm the folder is empty and ready to use",
      ],
      shuffled_items: [
        "cd Projects — move into the new folder",
        "ls (or dir) — confirm the folder is empty and ready to use",
        "pwd — confirm you're standing in your home folder",
        "mkdir Projects — create a new folder named Projects",
      ],
      hints: [
        "You have to create the folder before you can move into it.",
        "Checking your location first is always a safe starting move.",
      ],
      solution_summary:
        "pwd (confirm location) → mkdir Projects (create folder) → cd Projects (move into it) → ls/dir (confirm it's empty).",
      key_concepts: ["pwd", "mkdir", "cd", "ls/dir"],
    },
    {
      id: "basic_nav_commands_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'pwd prints the full path of the folder you're currently standing in. ls or dir lists the contents of the current working directory. cd .. moves up one level to the parent folder. And these four commands work with exactly identical names and syntax on every operating system's terminal, with zero variation.' Which claim is wrong?",
      options: [
        "pwd prints the full path of the folder you're currently standing in.",
        "ls or dir lists the contents of the current working directory.",
        "cd .. moves up one level to the parent folder.",
        "These four commands work with exactly identical names and syntax on every operating system's terminal, with zero variation.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly names ls-versus-dir as the most visible example of this NOT being true.",
        "Mac/Linux and Windows Command Prompt use different names for the same listing command.",
      ],
      solution_summary:
        "These commands aren't perfectly universal — ls (Mac/Linux) versus dir (Windows Command Prompt) is the clearest example of naming differences across systems.",
      key_concepts: ["ls vs dir", "cross-platform command differences", "common misconception"],
    },
    {
      id: "basic_nav_commands_ac3",
      type: "match",
      prompt: "Match each command to its function.",
      left: ["pwd", "ls / dir", "cd", "mkdir"],
      right_shuffled: [
        "Creates a new, empty folder inside the current working directory",
        "Lists the files and subfolders in the current working directory",
        "Moves you from one folder to another",
        "Prints the full path of the folder you're currently standing in",
      ],
      correct_assignments: [3, 1, 2, 0],
      hints: [
        "pwd is about knowing where you are, not moving anywhere.",
        "mkdir is the only one of these four that creates something new.",
      ],
      solution_summary:
        "pwd = print current path; ls/dir = list contents; cd = change folder; mkdir = create a new folder.",
      key_concepts: ["pwd", "ls/dir", "cd", "mkdir"],
    },
  ],

  what_is_a_shell: [
    {
      id: "what_is_a_shell_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The terminal is just the window — the text display and keyboard input surface. The shell is the program that actually reads and interprets what you type. PowerShell passes structured objects between commands, while Bash mostly passes plain text. And \"terminal\" and \"shell\" are simply two different words for the exact same single thing.' Which claim is wrong?",
      options: [
        "The terminal is just the window — the text display and keyboard input surface.",
        "The shell is the program that actually reads and interprets what you type.",
        "PowerShell passes structured objects between commands, while Bash mostly passes plain text.",
        "\"Terminal\" and \"shell\" are simply two different words for the exact same single thing.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly untangles this exact misconception.",
        "You can run multiple different shells inside the identical terminal window.",
      ],
      solution_summary:
        "Terminal and shell are genuinely separate layers, not synonyms — the terminal is the window, the shell is the program interpreting commands inside it, and you can swap shells within one terminal.",
      key_concepts: ["terminal vs shell", "common misconception"],
    },
    {
      id: "what_is_a_shell_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You type `ls` into a traditional Windows Command Prompt window. What's the likely result?",
      options: [
        "It lists the folder's contents exactly like on Mac or Linux",
        "It produces an error, since Command Prompt's shell doesn't recognize \"ls\" as a known command (it uses \"dir\" instead)",
        "It automatically converts the command to PowerShell syntax and runs it",
        "It creates a new folder named ls",
      ],
      correct_index: 1,
      hints: [
        "Command availability depends on which shell is actually interpreting your typed text.",
        "The topic gives this exact example directly.",
      ],
      solution_summary:
        "It produces an error — Command Prompt's shell simply doesn't recognize \"ls\" as a command it knows what to do with; it uses \"dir\" instead for the same job.",
      key_concepts: ["shell-specific commands", "ls vs dir"],
    },
    {
      id: "what_is_a_shell_ac3",
      type: "match",
      prompt: "Match each term to its correct description.",
      left: ["Terminal", "Shell", "Bash", "PowerShell"],
      right_shuffled: [
        "Microsoft's modern shell, passing structured objects between commands",
        "The window displaying text and accepting keyboard input, nothing more",
        "The program that reads typed commands and decides what to do about them",
        "A long-standing default shell on most Linux systems and, until recently, Mac",
      ],
      correct_assignments: [1, 2, 3, 0],
      hints: [
        "The terminal is just the display surface; the shell does the actual interpreting.",
        "PowerShell's structured-object design is a real technical difference from Bash's plain-text approach.",
      ],
      solution_summary:
        "Terminal = the window; Shell = the command-interpreting program; Bash = Linux/older-Mac default shell; PowerShell = Microsoft's structured-object shell.",
      key_concepts: ["terminal", "shell", "Bash", "PowerShell"],
    },
  ],

  what_is_internet: [
    {
      id: "what_is_internet_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The internet is a network of networks, with no single company or government owning it as a whole. Data travels across it as small standardized chunks called packets. Routers examine each packet's destination and forward it toward the next hop. And the internet is one single physical thing capable of one unified outage.' Which claim is wrong?",
      options: [
        "The internet is a network of networks, with no single company or government owning it as a whole.",
        "Data travels across it as small standardized chunks called packets.",
        "Routers examine each packet's destination and forward it toward the next hop.",
        "The internet is one single physical thing capable of one unified outage.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts the phrase 'the internet is down' as a common misconception.",
        "What people usually mean is their own connection or one specific service is unreachable, not the whole global internet.",
      ],
      solution_summary:
        "The internet isn't a single thing that can have one unified outage — 'the internet is down' usually means a local connection, ISP, or specific service is unreachable, while the vast majority of the global internet keeps running unaffected.",
      key_concepts: ["network of networks", "no single point of failure", "common misconception"],
    },
    {
      id: "what_is_internet_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "Two packets from the same message are sent from your device seconds apart toward the same destination. What's the likely outcome regarding the physical route each one takes?",
      options: [
        "They must travel the exact identical physical path every time, with no exceptions",
        "They can genuinely travel via different physical routes and still arrive correctly, reassembled in order",
        "The second packet always gets lost since only one path can be used at a time",
        "Packets never take different routes unless there's a network failure",
      ],
      correct_index: 1,
      hints: [
        "Routers make independent, moment-to-moment forwarding decisions based on current conditions.",
        "The topic states this exact scenario directly as a common misconception to correct.",
      ],
      solution_summary:
        "Packets can genuinely travel different physical routes and still arrive correctly, since routers make independent forwarding decisions moment to moment rather than following one fixed path.",
      key_concepts: ["packet routing", "independent router decisions"],
    },
    {
      id: "what_is_internet_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Packet", "Router", "ISP", "Internet exchange point"],
      right_shuffled: [
        "A physical location where traffic is handed off between separate networks",
        "A small, standardized chunk of data traveling independently toward a destination",
        "A company operating the physical infrastructure connecting homes to the wider internet",
        "A device that examines an incoming packet's address and forwards it toward the next hop",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "A packet is a piece of a larger message; a router is what forwards it.",
        "An internet exchange point is about where networks physically connect, not who provides service to homes.",
      ],
      solution_summary:
        "Packet = small standardized data chunk; Router = forwards packets toward the next hop; ISP = connects homes to the internet; Internet exchange point = where separate networks physically hand off traffic.",
      key_concepts: ["packet", "router", "ISP", "internet exchange point"],
    },
  ],

  ip_addresses: [
    {
      id: "ip_addresses_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'An IP address uniquely identifies a device for sending and receiving data. A private IP address only needs to be unique within its own local network. NAT translates between many private addresses and one public address. And a private IP address on its own provides real anonymity or security for a device.' Which claim is wrong?",
      options: [
        "An IP address uniquely identifies a device for sending and receiving data.",
        "A private IP address only needs to be unique within its own local network.",
        "NAT translates between many private addresses and one public address.",
        "A private IP address on its own provides real anonymity or security for a device.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly separates NAT's actual purpose from any security benefit it happens to provide as a side effect.",
        "Private addressing exists to solve address-space efficiency, not to provide security.",
      ],
      solution_summary:
        "Private addressing exists for address-space efficiency and internal organization, not security — obscuring devices from the outside internet is a side effect of NAT, not its purpose.",
      key_concepts: ["private IP address", "NAT", "common misconception"],
    },
    {
      id: "ip_addresses_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "Two completely different homes each have a device using the identical private IP address 192.168.1.5. What's the outcome?",
      options: [
        "A conflict occurs and one of the devices loses its connection",
        "No conflict at all — private addresses only need to be unique within each separate local network, not across the whole internet",
        "The internet automatically reassigns one of the devices a public IP address instead",
        "Both devices are forced to share the exact same connection",
      ],
      correct_index: 1,
      hints: [
        "Private addresses are scoped to their own local network, not the whole internet.",
        "The topic gives this exact scenario directly.",
      ],
      solution_summary:
        "No conflict — private IP addresses only need to be unique within their own local network, so two different homes can reuse the identical private address with zero issue.",
      key_concepts: ["private IP address scope", "no cross-network conflict"],
    },
    {
      id: "ip_addresses_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Public IP address", "Private IP address", "NAT", "DHCP"],
      right_shuffled: [
        "Automatically hands out private IP addresses to devices as they join a network",
        "The address a device presents to the broader internet",
        "Translates between many private addresses and one shared public address",
        "An address used only within a local network to distinguish devices internally",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Public is what the outside world sees; private is internal-only.",
        "DHCP is specifically about automatic assignment, not translation.",
      ],
      solution_summary:
        "Public IP = address shown to the internet; Private IP = internal-only address; NAT = translates private↔public addresses; DHCP = automatically assigns private addresses.",
      key_concepts: ["public IP", "private IP", "NAT", "DHCP"],
    },
  ],

  server_vs_client: [
    {
      id: "server_vs_client_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A server stores data or runs services and responds to requests for them. A client is the machine making that request. Server and client describe roles, not fixed categories of hardware. And a server is some specialized, exotic category of machine fundamentally unlike a personal computer.' Which claim is wrong?",
      options: [
        "A server stores data or runs services and responds to requests for them.",
        "A client is the machine making that request.",
        "Server and client describe roles, not fixed categories of hardware.",
        "A server is some specialized, exotic category of machine fundamentally unlike a personal computer.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "A server is ordinary computer hardware running software configured to listen for and respond to requests.",
      ],
      solution_summary:
        "A server is, at its core, ordinary computer hardware running software configured to respond to requests continuously — not some fundamentally different category of machine.",
      key_concepts: ["server vs client roles", "common misconception"],
    },
    {
      id: "server_vs_client_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "One of several servers behind a webpage (the one serving its comments section) becomes unresponsive, while the servers serving the page's main content and images stay fine. What's the likely result?",
      options: [
        "The entire webpage fails to load at all",
        "Only the comments section fails to load, since each piece is a separate client-server request-response exchange",
        "The whole website goes down for every visitor",
        "The page automatically retries and always recovers within a second",
      ],
      correct_index: 1,
      hints: [
        "Loading one webpage typically involves several separate client-server exchanges happening in parallel.",
        "The topic gives this exact scenario as the reason one part of a page can fail while the rest works.",
      ],
      solution_summary:
        "Only the comments section fails, since it's a genuinely separate client-server request-response exchange from the rest of the page's content and images.",
      key_concepts: ["multiple servers per page", "independent request-response exchanges"],
    },
    {
      id: "server_vs_client_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Server", "Client", "Client-server model", "Request-response round trip"],
      right_shuffled: [
        "The device or program making a request for data or a service",
        "The basic pattern of one machine requesting and another machine responding",
        "A machine that stores data or runs services and responds to requests",
        "The complete exchange from a client's request to the server's answer",
      ],
      correct_assignments: [2, 0, 1, 3],
      hints: [
        "A server responds; a client asks.",
        "The 'model' is the general pattern, not one specific exchange.",
      ],
      solution_summary:
        "Server = responds to requests; Client = makes requests; Client-server model = the general request/response pattern; Request-response round trip = one complete exchange.",
      key_concepts: ["server", "client", "client-server model", "request-response"],
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
