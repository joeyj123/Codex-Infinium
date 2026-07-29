// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to Novice topics 31-40 (what_is_the_cloud through what_is_a_program).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  what_is_the_cloud: [
    {
      id: "what_is_the_cloud_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The cloud is really just someone else's servers, physically sitting in real data centers. Cloud computing is the same client-server relationship as before, just at a much larger scale. Cloud data exists somewhere abstract and non-physical, floating free of any actual location. And data centers use industrial cooling because their servers generate real heat.' Which claim is wrong?",
      options: [
        "The cloud is really just someone else's servers, physically sitting in real data centers.",
        "Cloud computing is the same client-server relationship as before, just at a much larger scale.",
        "Cloud data exists somewhere abstract and non-physical, floating free of any actual location.",
        "Data centers use industrial cooling because their servers generate real heat.",
      ],
      correct_index: 2,
      hints: [
        "The topic directly rebuts this claim as a misconception baked into the word 'cloud' itself.",
        "Every piece of cloud-stored data sits on a real physical drive, in a real building, at a real address.",
      ],
      solution_summary:
        "Cloud data always sits on a real physical storage drive in a real building at a real address — it never actually exists somewhere abstract and non-physical.",
      key_concepts: ["cloud computing", "physical data centers", "common misconception"],
    },
    {
      id: "what_is_the_cloud_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "You 'save a file to the cloud.' What actually happens, physically?",
      options: [
        "The file dissolves into a wireless signal with no physical storage involved",
        "Your device sends the file's data across the internet to a data center, where it's physically written to a storage drive in a specific rack and building",
        "The file is stored temporarily in your device's own RAM only",
        "Nothing physical happens — it's purely a software abstraction",
      ],
      correct_index: 1,
      hints: [
        "The topic describes this exact mechanism directly.",
        "Cloud storage is often automatically copied to additional physical drives, sometimes in a different data center.",
      ],
      solution_summary:
        "Your device sends the file across the internet to a data center, where it's physically written to a real storage drive — often copied to additional drives for redundancy.",
      key_concepts: ["cloud storage mechanism", "physical data center", "redundancy"],
    },
    {
      id: "what_is_the_cloud_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["The cloud", "IaaS (Infrastructure as a Service)", "SaaS (Software as a Service)"],
      right_shuffled: [
        "A fully finished application running entirely on the provider's infrastructure, accessed by logging in",
        "Someone else's servers — data centers rented out for storage or computing power",
        "Raw computing resources rented out for a customer to configure and manage themselves",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "SaaS is a finished product; IaaS is bare infrastructure you configure yourself.",
        "'The cloud' is the general term for rented data-center infrastructure.",
      ],
      solution_summary:
        "The cloud = rented data-center infrastructure; IaaS = raw resources you configure yourself; SaaS = a finished application you just log into.",
      key_concepts: ["cloud computing", "IaaS", "SaaS"],
    },
  ],

  dns: [
    {
      id: "dns_ac1",
      type: "order",
      prompt: "Put these steps of a DNS lookup in the correct order.",
      items: [
        "You type a website's name and hit enter",
        "Your device sends a DNS query asking what IP address corresponds to that name",
        "A DNS server responds with the correct numerical IP address",
        "Your device sends its actual webpage request to that specific IP address",
      ],
      shuffled_items: [
        "Your device sends its actual webpage request to that specific IP address",
        "You type a website's name and hit enter",
        "A DNS server responds with the correct numerical IP address",
        "Your device sends a DNS query asking what IP address corresponds to that name",
      ],
      hints: [
        "The lookup has to complete before the actual page request can be addressed anywhere.",
        "You need the name before you can ask a DNS server about it.",
      ],
      solution_summary:
        "Type the name → device sends a DNS query → DNS server returns the IP address → device sends the actual request to that address.",
      key_concepts: ["DNS lookup", "domain name resolution"],
    },
    {
      id: "dns_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'DNS translates human-readable domain names into numerical IP addresses. DNS lookups are typically cached to avoid repeating them every time. DNS is genuinely distributed, looked up hierarchically across many independent servers. And DNS is part of a website itself, hosted and controlled entirely by whoever runs that website.' Which claim is wrong?",
      options: [
        "DNS translates human-readable domain names into numerical IP addresses.",
        "DNS lookups are typically cached to avoid repeating them every time.",
        "DNS is genuinely distributed, looked up hierarchically across many independent servers.",
        "DNS is part of a website itself, hosted and controlled entirely by whoever runs that website.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "A domain name and the server it points to are two separately managed things.",
      ],
      solution_summary:
        "DNS is a genuinely separate, independent layer of infrastructure — a website's operator has to register a domain name and configure DNS records separately from operating the actual server.",
      key_concepts: ["DNS as independent infrastructure", "common misconception"],
    },
    {
      id: "dns_ac3",
      type: "match",
      prompt: "Match each DNS term to its correct definition.",
      left: ["DNS", "A record", "MX record", "CNAME record"],
      right_shuffled: [
        "Tells the internet which server handles email for a domain",
        "A distributed lookup service translating domain names into IP addresses",
        "Lets one domain name point to another name rather than directly to an address",
        "The specific entry mapping one domain name to one IPv4 address",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "The A record is the literal name-to-address mapping.",
        "MX is specifically about email routing.",
      ],
      solution_summary:
        "DNS = the whole name-to-IP lookup system; A record = name-to-IPv4 mapping; MX record = email routing; CNAME record = name pointing to another name.",
      key_concepts: ["DNS", "A record", "MX record", "CNAME record"],
    },
  ],

  wifi_basics: [
    {
      id: "wifi_basics_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'WiFi lets devices connect to a local network using radio waves instead of cables. 2.4GHz travels farther but is more crowded and generally slower than 5GHz. WPA scrambles data so nearby devices without the password can't read it. And WiFi and \"having internet access\" are simply the same thing.' Which claim is wrong?",
      options: [
        "WiFi lets devices connect to a local network using radio waves instead of cables.",
        "2.4GHz travels farther but is more crowded and generally slower than 5GHz.",
        "WPA scrambles data so nearby devices without the password can't read it.",
        "WiFi and \"having internet access\" are simply the same thing.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly separates the local wireless link from the router's own upstream connection.",
        "A device can have a strong WiFi signal to a router that itself has lost its internet connection.",
      ],
      solution_summary:
        "WiFi is specifically the local wireless link to a router — internet access is the router's own separate upstream connection, and one can work while the other fails.",
      key_concepts: ["WiFi vs internet access", "common misconception"],
    },
    {
      id: "wifi_basics_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt:
        "A home router loses its physical connection to the internet service provider, but its local wireless radio keeps working normally. What do connected devices experience?",
      options: [
        "They immediately lose their WiFi signal entirely",
        "They stay connected to the WiFi network but have no actual internet access",
        "They automatically switch to a different working router nearby",
        "Nothing changes at all — WiFi is the same thing as the ISP connection",
      ],
      correct_index: 1,
      hints: [
        "The local wireless signal and the router's upstream ISP connection are two separate things.",
        "The topic describes this exact scenario directly.",
      ],
      solution_summary:
        "Devices stay connected to the local WiFi signal but have no actual internet access, since the router's own upstream connection to the ISP is what's actually broken.",
      key_concepts: ["local WiFi vs upstream internet", "router connection"],
    },
    {
      id: "wifi_basics_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["2.4GHz band", "5GHz band", "802.11", "WPA"],
      right_shuffled: [
        "The technical standard governing how WiFi devices communicate",
        "Faster speeds and less interference, but shorter range and weaker wall penetration",
        "The encryption standard scrambling data between a device and a router",
        "Travels farther and penetrates walls better, but more crowded and generally slower",
      ],
      correct_assignments: [3, 1, 0, 2],
      hints: [
        "The two frequency bands trade off range against speed in opposite directions.",
        "802.11 is the name of the standard itself, not a frequency.",
      ],
      solution_summary:
        "2.4GHz = longer range, slower; 5GHz = shorter range, faster; 802.11 = the governing WiFi standard; WPA = the encryption layer.",
      key_concepts: ["2.4GHz", "5GHz", "802.11", "WPA"],
    },
  ],

  bluetooth_basics: [
    {
      id: "bluetooth_basics_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Bluetooth connects two nearby devices directly, without needing a router. Pairing is the handshake where two devices agree to trust each other. Bluetooth Low Energy trades raw throughput for dramatically lower power consumption. And Bluetooth is basically just a slower, shorter-range version of WiFi, on the same continuous scale.' Which claim is wrong?",
      options: [
        "Bluetooth connects two nearby devices directly, without needing a router.",
        "Pairing is the handshake where two devices agree to trust each other.",
        "Bluetooth Low Energy trades raw throughput for dramatically lower power consumption.",
        "Bluetooth is basically just a slower, shorter-range version of WiFi, on the same continuous scale.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as the most common misconception.",
        "WiFi and Bluetooth are built around fundamentally different goals, not one continuous scale.",
      ],
      solution_summary:
        "Bluetooth and WiFi are built around fundamentally different goals — network connectivity versus low-power direct pairing — not two points on the same speed/range scale.",
      key_concepts: ["Bluetooth vs WiFi purpose", "common misconception"],
    },
    {
      id: "bluetooth_basics_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "Two Bluetooth-paired devices with no internet access anywhere nearby try to exchange data with each other. What happens?",
      options: [
        "The exchange fails entirely, since Bluetooth requires internet access",
        "They can still exchange data with each other perfectly normally, entirely offline",
        "Data is only sent one-way without an internet connection",
        "The devices automatically switch to cellular data instead",
      ],
      correct_index: 1,
      hints: [
        "Bluetooth connects two devices directly to each other, not through the internet.",
        "The topic states this exact scenario directly.",
      ],
      solution_summary:
        "They exchange data perfectly normally offline — Bluetooth connects devices directly to each other and carries no internet connection of its own.",
      key_concepts: ["Bluetooth direct connection", "no internet required"],
    },
    {
      id: "bluetooth_basics_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Bluetooth", "Pairing", "Bluetooth Low Energy (BLE)"],
      right_shuffled: [
        "A version optimized for devices sending small amounts of data occasionally, at very low power",
        "A short-range wireless technology for direct device-to-device connections, no router required",
        "The handshake where two devices exchange identifying information and agree to trust each other",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Pairing is specifically the first-connection handshake.",
        "BLE is engineered for occasional small data, not continuous streaming.",
      ],
      solution_summary:
        "Bluetooth = direct short-range device connection; Pairing = the trust-establishing handshake; BLE = low-power variant for occasional small data.",
      key_concepts: ["Bluetooth", "pairing", "BLE"],
    },
  ],

  ports_networking: [
    {
      id: "ports_networking_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A port is a numbered communication channel identifying a specific program on a device. Well-known ports like 80 and 443 are reserved by convention for common services. A device can have thousands of ports in active use simultaneously. And a network port is a physical hardware connector, similar to a USB port.' Which claim is wrong?",
      options: [
        "A port is a numbered communication channel identifying a specific program on a device.",
        "Well-known ports like 80 and 443 are reserved by convention for common services.",
        "A device can have thousands of ports in active use simultaneously.",
        "A network port is a physical hardware connector, similar to a USB port.",
      ],
      correct_index: 3,
      hints: [
        "The topic explicitly rebuts this claim as a common misconception.",
        "A network port is a purely logical concept, with no physical socket involved.",
      ],
      solution_summary:
        "A network port is a purely logical, numbered software channel with no physical socket at all — it just happens to share the English word 'port' with the physical USB connector.",
      key_concepts: ["network port vs physical port", "common misconception"],
    },
    {
      id: "ports_networking_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "Your browser sends a request to a website over an encrypted (padlock-icon) connection. Which port does it conventionally use?",
      options: ["Port 80", "Port 443", "Port 21", "Port 8080"],
      correct_index: 1,
      hints: [
        "The topic names port 80 for unencrypted and a different port for encrypted, secure traffic.",
        "This is the padlock-icon connection.",
      ],
      solution_summary: "Port 443 is conventionally used for encrypted, secure web traffic (the padlock icon).",
      key_concepts: ["well-known ports", "port 443"],
    },
    {
      id: "ports_networking_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Port", "Well-known port range", "Port forwarding", "Multiplexing"],
      right_shuffled: [
        "Manually configuring a router to send incoming traffic on a specific port to a specific internal device",
        "Combining multiple distinct streams to share one channel, then separating them again correctly",
        "A numbered channel identifying a specific program on a device",
        "Ports 0 through 1023, reserved by convention for common services",
      ],
      correct_assignments: [2, 3, 0, 1],
      hints: [
        "Port forwarding is a manual router configuration, not automatic.",
        "Multiplexing is the general principle ports are one specific implementation of.",
      ],
      solution_summary:
        "Port = numbered program-identifying channel; Well-known range = reserved 0-1023; Port forwarding = manual router configuration; Multiplexing = the general shared-channel technique.",
      key_concepts: ["port", "well-known ports", "port forwarding", "multiplexing"],
    },
  ],

  tcp_vs_udp: [
    {
      id: "tcp_vs_udp_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'TCP guarantees packets arrive and arrive in the correct order. UDP sends packets without acknowledgment or reordering overhead, making it faster but less reliable. A file download should use TCP since a single missing byte can corrupt it. And UDP is simply an inferior, sloppier version of TCP that should be avoided whenever possible.' Which claim is wrong?",
      options: [
        "TCP guarantees packets arrive and arrive in the correct order.",
        "UDP sends packets without acknowledgment or reordering overhead, making it faster but less reliable.",
        "A file download should use TCP since a single missing byte can corrupt it.",
        "UDP is simply an inferior, sloppier version of TCP that should be avoided whenever possible.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "UDP's lack of guarantees is a deliberate design choice suited to specific workloads, not a flaw.",
      ],
      solution_summary:
        "UDP's lack of reliability guarantees is a deliberate design choice for workloads like live video, not a flaw — forcing TCP's overhead onto those tasks would make the real-world experience worse.",
      key_concepts: ["TCP vs UDP tradeoffs", "common misconception"],
    },
    {
      id: "tcp_vs_udp_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A live video call drops one video frame mid-conversation over UDP. What's the likely user-facing result?",
      options: [
        "The whole call freezes and waits for the missing frame to be resent",
        "The call barely notices — it skips ahead rather than pausing to wait for the missing piece",
        "The call disconnects entirely and must be restarted",
        "The audio and video both become permanently out of sync forever"
      ],
      correct_index: 1,
      hints: [
        "UDP has no built-in guarantee a packet arrives, and no automatic resend.",
        "The topic's own opening example describes exactly this scenario.",
      ],
      solution_summary:
        "The call barely notices — UDP just moves on, skipping the missing frame rather than pausing to wait for a resend, which is exactly the tradeoff that suits real-time calls.",
      key_concepts: ["UDP packet loss", "real-time tolerance"],
    },
    {
      id: "tcp_vs_udp_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["TCP", "UDP", "Three-way handshake"],
      right_shuffled: [
        "The setup exchange establishing a connection before any real data is sent",
        "Sends packets with no acknowledgment or reordering overhead, favoring speed over reliability",
        "Guarantees packets arrive and arrive in the correct order, via acknowledgment and resend",
      ],
      correct_assignments: [2, 1, 0],
      hints: [
        "Only TCP requires that setup exchange before sending data.",
        "UDP skips the handshake entirely.",
      ],
      solution_summary:
        "TCP = reliable, ordered delivery; UDP = fast, unreliable delivery; Three-way handshake = TCP's connection setup exchange.",
      key_concepts: ["TCP", "UDP", "three-way handshake"],
    },
  ],

  mac_vs_ip_address: [
    {
      id: "mac_vs_ip_address_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A MAC address is permanently burned into a piece of network hardware at manufacturing. An IP address is a logical, reassignable address describing where a device currently sits on a network. MAC addresses matter for the local network; IP addresses matter for routing across the broader internet. And a MAC address and an IP address are simply two different formats for representing the identical underlying piece of information.' Which claim is wrong?",
      options: [
        "A MAC address is permanently burned into a piece of network hardware at manufacturing.",
        "An IP address is a logical, reassignable address describing where a device currently sits on a network.",
        "MAC addresses matter for the local network; IP addresses matter for routing across the broader internet.",
        "A MAC address and an IP address are simply two different formats for representing the identical underlying piece of information.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "They identify genuinely different things at genuinely different scopes.",
      ],
      solution_summary:
        "A MAC address identifies one specific physical piece of hardware permanently, while an IP address identifies where a device currently sits on a network — genuinely different things, not two formats of the same information.",
      key_concepts: ["MAC address vs IP address", "common misconception"],
    },
    {
      id: "mac_vs_ip_address_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A laptop travels from a home network to a coffee shop's WiFi. What changes, and what stays the same?",
      options: [
        "Both the MAC address and the IP address change",
        "The IP address changes, but the MAC address stays the same, since it's permanently tied to the hardware",
        "The MAC address changes, but the IP address stays the same",
        "Neither changes, since both are permanent",
      ],
      correct_index: 1,
      hints: [
        "One of these two addresses is described as never changing for the physical lifetime of the hardware.",
        "The topic opens with this exact scenario.",
      ],
      solution_summary:
        "The IP address changes as the laptop moves between networks, while the MAC address stays the same, since it's permanently burned into the hardware.",
      key_concepts: ["IP address reassignment", "MAC address permanence"],
    },
    {
      id: "mac_vs_ip_address_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["MAC address", "IP address", "ARP"],
      right_shuffled: [
        "A logical, reassignable address describing where a device currently sits on a network",
        "The process a device uses to discover which MAC address corresponds to a given IP address locally",
        "A unique identifier permanently assigned to a piece of network hardware at manufacturing",
      ],
      correct_assignments: [2, 0, 1],
      hints: [
        "ARP is specifically about linking the two address types on a local network.",
        "MAC is permanent hardware identity; IP is current network location.",
      ],
      solution_summary:
        "MAC address = permanent hardware identity; IP address = current network location; ARP = the lookup linking IP to MAC on a local network.",
      key_concepts: ["MAC address", "IP address", "ARP"],
    },
  ],

  cellular_generations: [
    {
      id: "cellular_generations_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: '3G was the first generation to support genuinely usable mobile internet data. 4G dramatically increased speed and reduced latency, making smooth mobile video streaming practical. 5G supports far more simultaneously connected devices per tower. And a higher generational number is simply, unconditionally faster everywhere.' Which claim is wrong?",
      options: [
        "3G was the first generation to support genuinely usable mobile internet data.",
        "4G dramatically increased speed and reduced latency, making smooth mobile video streaming practical.",
        "5G supports far more simultaneously connected devices per tower.",
        "A higher generational number is simply, unconditionally faster everywhere.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "5G's speed gains are only realized where a carrier has deployed the necessary infrastructure.",
      ],
      solution_summary:
        "A higher generation isn't unconditionally faster everywhere — real-world performance depends on whether a carrier has deployed the new infrastructure and the device supports the right frequency bands in that specific location.",
      key_concepts: ["cellular generation performance", "common misconception"],
    },
    {
      id: "cellular_generations_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A phone displays a '5G' indicator in an area where the carrier hasn't fully deployed 5G tower infrastructure. What's the likely real experience?",
      options: [
        "Full 5G speeds regardless of tower deployment",
        "The phone actually connects through 4G-level infrastructure for the real heavy lifting, despite the indicator",
        "No connection at all",
        "The phone automatically switches to WiFi instead",
      ],
      correct_index: 1,
      hints: [
        "Real-world 5G performance depends heavily on actual local tower deployment.",
        "The topic states this exact scenario directly.",
      ],
      solution_summary:
        "The phone often ends up connecting through 4G-level infrastructure for the actual heavy lifting, despite showing a 5G indicator, in areas without full deployment.",
      key_concepts: ["5G deployment variability", "indicator vs real performance"],
    },
    {
      id: "cellular_generations_ac3",
      type: "match",
      prompt: "Match each cellular generation to what it primarily changed.",
      left: ["3G", "4G / 4G LTE", "5G"],
      right_shuffled: [
        "Substantially higher speeds, lower latency, and far more devices supported per tower",
        "First generation to support genuinely usable mobile internet data",
        "Dramatically increased speed and reduced latency, enabling smooth mobile video streaming",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "3G was the first to make mobile data itself usable at all.",
        "5G's key addition beyond speed was supporting far more devices per tower.",
      ],
      solution_summary:
        "3G = first usable mobile internet data; 4G = big speed/latency leap enabling streaming; 5G = even higher speed, lower latency, more devices per tower.",
      key_concepts: ["3G", "4G", "5G"],
    },
  ],

  osi_tcpip_layers: [
    {
      id: "osi_tcpip_layers_ac1",
      type: "order",
      prompt: "Put these networking layers in order from bottom (closest to raw signals) to top (closest to the user).",
      items: [
        "Physical layer: actual electrical signals, radio waves, and light pulses",
        "Link layer: delivery across one local network segment, using MAC addresses",
        "Network layer: routing across the broader internet, using IP addresses",
        "Transport layer: TCP/UDP and ports, governing delivery guarantees",
        "Application layer: the actual programs, like a browser or email client",
      ],
      shuffled_items: [
        "Transport layer: TCP/UDP and ports, governing delivery guarantees",
        "Application layer: the actual programs, like a browser or email client",
        "Physical layer: actual electrical signals, radio waves, and light pulses",
        "Network layer: routing across the broader internet, using IP addresses",
        "Link layer: delivery across one local network segment, using MAC addresses",
      ],
      hints: [
        "Raw signals have to physically travel before any addressing or delivery logic can act on them.",
        "The application layer is what a user-facing program actually uses, sitting on top of everything else.",
      ],
      solution_summary:
        "Physical → Link (MAC addresses) → Network (IP addresses) → Transport (TCP/UDP, ports) → Application (browsers, email clients).",
      key_concepts: ["OSI/TCP-IP layers", "physical layer", "link layer", "network layer", "transport layer", "application layer"],
    },
    {
      id: "osi_tcpip_layers_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'The physical layer covers actual signals traveling through cables and the air. The link layer is where MAC addresses do their job. Data physically travels straight from the application on one device to the matching application on another, skipping directly across at the application layer. And these layers are genuinely engineered into real hardware and software, not just an academic framework.' Which claim is wrong?",
      options: [
        "The physical layer covers actual signals traveling through cables and the air.",
        "The link layer is where MAC addresses do their job.",
        "Data physically travels straight from the application on one device to the matching application on another, skipping directly across at the application layer.",
        "These layers are genuinely engineered into real hardware and software, not just an academic framework.",
      ],
      correct_index: 2,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "Data is wrapped going down through every layer, then unwrapped going back up on the receiving side — a full trip, not a shortcut.",
      ],
      solution_summary:
        "Data doesn't skip directly across at the application layer — it's wrapped layer by layer going down on the sending side and unwrapped layer by layer going back up on the receiving side, a full round trip through every layer.",
      key_concepts: ["encapsulation", "layer round trip", "common misconception"],
    },
    {
      id: "osi_tcpip_layers_ac3",
      type: "match",
      prompt: "Match each layer to the addressing or delivery concept that lives there.",
      left: ["Link layer", "Network layer", "Transport layer", "Application layer"],
      right_shuffled: [
        "The actual programs, like a browser requesting a page",
        "MAC addresses, delivering data on one local network segment",
        "TCP/UDP and ports, governing delivery guarantees",
        "IP addresses, routing data across the broader internet",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "MAC addresses are local; IP addresses cross networks.",
        "Ports and TCP/UDP sit above IP addressing, below the actual application.",
      ],
      solution_summary:
        "Link layer = MAC addresses; Network layer = IP addresses; Transport layer = TCP/UDP and ports; Application layer = the actual programs.",
      key_concepts: ["link layer", "network layer", "transport layer", "application layer"],
    },
  ],

  what_is_a_program: [
    {
      id: "what_is_a_program_ac1",
      type: "order",
      prompt: "Put these steps in order for what happens when you double-click a program's icon.",
      items: [
        "The program sits motionless as a file of binary instructions on a storage drive",
        "The operating system loads the file's instructions from storage into RAM",
        "The OS allocates the program a protected chunk of memory and creates a running process",
        "The CPU begins its fetch-decode-execute cycle, working through the program's instructions",
      ],
      shuffled_items: [
        "The OS allocates the program a protected chunk of memory and creates a running process",
        "The program sits motionless as a file of binary instructions on a storage drive",
        "The CPU begins its fetch-decode-execute cycle, working through the program's instructions",
        "The operating system loads the file's instructions from storage into RAM",
      ],
      hints: [
        "The file has to exist in storage before the OS can load it anywhere.",
        "A process has to be created before the CPU can actually start executing its instructions.",
      ],
      solution_summary:
        "Motionless file in storage → OS loads instructions into RAM → OS allocates memory and creates a process → CPU runs fetch-decode-execute on it.",
      key_concepts: ["program launch sequence", "process creation", "fetch-decode-execute"],
    },
    {
      id: "what_is_a_program_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A program is a set of instructions compiled down into binary machine code. An executable program file is fundamentally different from an ordinary file, occupying a separate, more privileged category. A compiler translates human-readable source code into binary machine code ahead of time. And installing a program and running it are two separate, distinct actions.' Which claim is wrong?",
      options: [
        "A program is a set of instructions compiled down into binary machine code.",
        "An executable program file is fundamentally different from an ordinary file, occupying a separate, more privileged category.",
        "A compiler translates human-readable source code into binary machine code ahead of time.",
        "Installing a program and running it are two separate, distinct actions.",
      ],
      correct_index: 1,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "An executable file is exactly the kind of file covered in File Types & Extensions — just one the OS knows how to load and run.",
      ],
      solution_summary:
        "An executable program file isn't a fundamentally different category of thing — it's exactly the kind of file from File Types & Extensions, just one whose format the OS knows how to load and execute rather than passively display.",
      key_concepts: ["program as file", "common misconception"],
    },
    {
      id: "what_is_a_program_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Compiler", "Foreground process", "Background process", "Executable file"],
      right_shuffled: [
        "A program continuing to run with no visible window a user is directly working in",
        "The file format a double-click actually launches, containing translated binary instructions",
        "The process a user is actively interacting with right now",
        "A program translating human-readable source code into binary machine code ahead of time",
      ],
      correct_assignments: [3, 2, 0, 1],
      hints: [
        "Foreground is what has the user's attention right now; background keeps running without it.",
        "The compiler's job happens before the program is ever run.",
      ],
      solution_summary:
        "Compiler = translates source code to machine code; Foreground process = has the user's attention; Background process = runs without a focused window; Executable file = the launchable translated file.",
      key_concepts: ["compiler", "foreground process", "background process", "executable file"],
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
