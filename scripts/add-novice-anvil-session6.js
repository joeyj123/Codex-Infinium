// One-off script: adds no-code Anvil challenges (order/choice/match types)
// to Novice topics 51-57 (doping through chip_manufacturing) — the final
// batch of the Novice Anvil no-code content project.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const novice = kb.tiers.find((t) => t.id === "novice");

const CONTENT = {
  doping: [
    {
      id: "doping_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Doping introduces a small, precisely controlled number of impurity atoms into silicon's crystal lattice. N-type silicon has mobile electrons as its charge carrier; P-type has mobile \"holes.\" A P-N junction is the boundary where N-type and P-type silicon meet. And doping is an unwanted contamination process, the same everyday sense the word \"impurity\" usually carries.' Which claim is wrong?",
      options: [
        "Doping introduces a small, precisely controlled number of impurity atoms into silicon's crystal lattice.",
        "N-type silicon has mobile electrons as its charge carrier; P-type has mobile \"holes.\"",
        "A P-N junction is the boundary where N-type and P-type silicon meet.",
        "Doping is an unwanted contamination process, the same everyday sense the word \"impurity\" usually carries.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "Doping is the precise opposite of accidental contamination — it's deliberate and carefully measured.",
      ],
      solution_summary:
        "Doping is the opposite of accidental contamination — it's a deliberate, carefully controlled introduction of exact, tiny quantities of dopant atoms to precisely engineer the silicon's electrical behavior.",
      key_concepts: ["doping", "common misconception"],
    },
    {
      id: "doping_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "Silicon is doped with phosphorus, an element with five outer electrons instead of silicon's four. What type of silicon results?",
      options: [
        "P-type silicon, with mobile \"holes\" as the charge carrier",
        "N-type silicon, since each dopant atom brings one extra, comparatively loosely bound mobile electron",
        "Pure, undoped silicon with no change in behavior",
        "An insulator with no ability to conduct current at all",
      ],
      correct_index: 1,
      hints: [
        "Silicon's own lattice bonding only needs four electrons per atom — a fifth electron is extra.",
        "The topic names phosphorus as the common dopant producing this exact result.",
      ],
      solution_summary:
        "N-type silicon results — phosphorus's fifth outer electron is extra beyond what the lattice bonding needs, leaving it comparatively loosely bound and mobile.",
      key_concepts: ["N-type silicon", "phosphorus doping"],
    },
    {
      id: "doping_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["N-type silicon", "P-type silicon", "P-N junction", "Ion implantation"],
      right_shuffled: [
        "A manufacturing technique that fires ionized dopant atoms into a silicon wafer at high speed",
        "Silicon doped with an element with three outer electrons, creating mobile \"holes\"",
        "The boundary where excess-electron and excess-hole regions meet, giving a transistor its switching behavior",
        "Silicon doped with an element with five outer electrons, creating mobile electrons",
      ],
      correct_assignments: [3, 1, 2, 0],
      hints: [
        "N is for the negative charge carrier (electrons); P is for the positive-acting carrier (holes).",
        "Ion implantation is the real physical manufacturing step, not a chemical mixing process.",
      ],
      solution_summary:
        "N-type = mobile electrons (5-electron dopant); P-type = mobile holes (3-electron dopant); P-N junction = the boundary giving switching behavior; Ion implantation = firing dopant atoms into a wafer.",
      key_concepts: ["N-type silicon", "P-type silicon", "P-N junction", "ion implantation"],
    },
  ],

  electricity_basics: [
    {
      id: "electricity_basics_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Current is the organized flow of electrons through a conductive material, measured in amperes. Voltage is the electrical push driving that flow, measured in volts. Ohm's Law states voltage equals current multiplied by resistance. And current flows instantly, with individual electrons themselves racing physically from a switch to a light bulb the instant it closes.' Which claim is wrong?",
      options: [
        "Current is the organized flow of electrons through a conductive material, measured in amperes.",
        "Voltage is the electrical push driving that flow, measured in volts.",
        "Ohm's Law states voltage equals current multiplied by resistance.",
        "Current flows instantly, with individual electrons themselves racing physically from a switch to a light bulb the instant it closes.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "The electric field's effect propagates fast, but individual electrons actually drift quite slowly.",
      ],
      solution_summary:
        "Individual electrons actually drift through a conductor quite slowly — what makes a light seem instant is the near-instantaneous propagation of the electric field's effect, not electrons literally racing to the bulb.",
      key_concepts: ["electron drift vs field propagation", "common misconception"],
    },
    {
      id: "electricity_basics_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "In a circuit with fixed resistance, the voltage is increased. According to Ohm's Law (V = I × R), what happens to the current?",
      options: [
        "Current decreases proportionally",
        "Current increases proportionally, since more voltage pushes more current through a fixed resistance",
        "Current stays exactly the same regardless of voltage",
        "Resistance automatically increases to compensate",
      ],
      correct_index: 1,
      hints: [
        "The water-pressure analogy: more pressure pushes more flow through a fixed pipe.",
        "The topic states this exact relationship directly.",
      ],
      solution_summary:
        "Current increases proportionally — for a fixed resistance, more voltage genuinely produces more current, in an exact, predictable proportion per Ohm's Law.",
      key_concepts: ["Ohm's Law", "voltage-current relationship"],
    },
    {
      id: "electricity_basics_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Voltage", "Current", "Resistance", "Circuit"],
      right_shuffled: [
        "A material's inherent opposition to letting current flow through it",
        "The electrical push, or difference in potential energy, driving current",
        "A complete, closed loop current can actually flow around",
        "The organized flow of electrons (or holes) through a conductive material",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "Voltage is the pressure; current is the flow rate; resistance is the opposition.",
        "A circuit has to be complete and unbroken for current to flow at all.",
      ],
      solution_summary:
        "Voltage = electrical push; Current = organized flow of charge; Resistance = opposition to flow; Circuit = a complete closed loop current flows around.",
      key_concepts: ["voltage", "current", "resistance", "circuit"],
    },
  ],

  signals_analog_digital: [
    {
      id: "signals_analog_digital_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'An analog signal represents information as a continuously variable quantity. A digital signal restricts information to a limited set of discrete values. Digital systems are more resistant to noise than analog systems, thanks to threshold-based interpretation. And digital is simply, unconditionally more accurate than analog in every possible sense.' Which claim is wrong?",
      options: [
        "An analog signal represents information as a continuously variable quantity.",
        "A digital signal restricts information to a limited set of discrete values.",
        "Digital systems are more resistant to noise than analog systems, thanks to threshold-based interpretation.",
        "Digital is simply, unconditionally more accurate than analog in every possible sense.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "Analog can represent infinitely fine continuous detail; digital always involves quantization.",
      ],
      solution_summary:
        "Digital isn't unconditionally more accurate — analog can represent infinitely fine continuous detail, while digital always involves quantization, technically an approximation, just one precise enough to be practically indistinguishable.",
      key_concepts: ["analog vs digital accuracy", "common misconception"],
    },
    {
      id: "signals_analog_digital_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A small amount of electrical noise slightly nudges a digital signal's voltage up or down. What's the likely outcome?",
      options: [
        "The signal is permanently corrupted, exactly like an analog signal would be",
        "The signal is still correctly read as the same 1 or 0, since it generally stays within the same broad high/low threshold region",
        "The digital system crashes entirely",
        "The noise is amplified into a much larger error",
      ],
      correct_index: 1,
      hints: [
        "Digital systems only care whether voltage is above or below a threshold, not its exact value.",
        "The topic states this exact contrast with analog directly.",
      ],
      solution_summary:
        "The signal is generally still read correctly — a small noise nudge usually stays within the same broad high/low region, unlike an analog signal where the precise value itself is the information.",
      key_concepts: ["digital noise resistance", "threshold-based interpretation"],
    },
    {
      id: "signals_analog_digital_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Analog signal", "Digital signal", "Sample rate", "Quantization"],
      right_shuffled: [
        "Rounding a continuous value to the nearest available discrete step",
        "A continuously variable quantity with meaning in its exact, precise shape",
        "How many times per second an analog signal's value is measured and converted",
        "A restricted, limited set of discrete, distinct values representing information",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Sample rate is itself a frequency, measured in Hertz.",
        "Quantization is the rounding step that makes digital representation an approximation.",
      ],
      solution_summary:
        "Analog signal = continuous variable quantity; Digital signal = restricted discrete values; Sample rate = how often an analog value is measured; Quantization = rounding to the nearest discrete step.",
      key_concepts: ["analog signal", "digital signal", "sample rate", "quantization"],
    },
  ],

  waves_frequency_clock_speed: [
    {
      id: "waves_frequency_clock_speed_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A wave is a periodic disturbance that repeats over time. Frequency is how many complete repetitions occur per second, measured in Hertz. Wavelength is the physical distance a wave travels over one complete cycle. And a higher clock speed number always, simply, unconditionally means a computer is faster overall.' Which claim is wrong?",
      options: [
        "A wave is a periodic disturbance that repeats over time.",
        "Frequency is how many complete repetitions occur per second, measured in Hertz.",
        "Wavelength is the physical distance a wave travels over one complete cycle.",
        "A higher clock speed number always, simply, unconditionally means a computer is faster overall.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim, echoing CPU Basics' original clock speed warning.",
        "Clock speed measures pace, not total work done per cycle, which depends on chip architecture.",
      ],
      solution_summary:
        "Clock speed measures pace, not total useful work per cycle — that depends heavily on a chip's architecture, so comparing raw clock speed alone across different designs is misleading.",
      key_concepts: ["clock speed limits", "common misconception"],
    },
    {
      id: "waves_frequency_clock_speed_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "Comparing 2.4GHz and 5GHz WiFi, which one has the longer wavelength, and what real-world effect does that produce?",
      options: [
        "5GHz has the longer wavelength, penetrating walls better",
        "2.4GHz has the longer wavelength, penetrating walls more effectively and traveling farther",
        "Both have identical wavelengths since they're both WiFi",
        "Wavelength has no relationship to frequency at all",
      ],
      correct_index: 1,
      hints: [
        "Higher frequency means shorter wavelength, and vice versa.",
        "The topic directly connects this inverse relationship to WiFi's real-world range tradeoff.",
      ],
      solution_summary:
        "2.4GHz has the longer wavelength (since higher frequency means shorter wavelength), which is exactly why it penetrates walls more effectively and travels farther than 5GHz.",
      key_concepts: ["frequency-wavelength relationship", "WiFi range tradeoff"],
    },
    {
      id: "waves_frequency_clock_speed_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Wave", "Frequency", "Period", "Wavelength"],
      right_shuffled: [
        "The physical distance a wave travels over one complete cycle",
        "A periodic disturbance or oscillation that repeats over time",
        "The amount of time one single complete cycle takes to occur",
        "How many complete repetitions of a pattern occur per second",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Period is frequency's direct inverse.",
        "Wavelength is a distance, not a time.",
      ],
      solution_summary:
        "Wave = a repeating periodic disturbance; Frequency = repetitions per second; Period = time per one cycle; Wavelength = distance traveled per cycle.",
      key_concepts: ["wave", "frequency", "period", "wavelength"],
    },
  ],

  transistor_switching: [
    {
      id: "transistor_switching_ac1",
      type: "order",
      prompt: "Put these steps of a MOSFET transistor switching on in the correct order.",
      items: [
        "The transistor rests unpowered, with a P-N junction blocking current between source and drain",
        "A sufficiently strong voltage is applied to the gate terminal",
        "The gate voltage creates an electric field that forms a temporary conductive channel",
        "Current flows freely from source to drain — the transistor is 'on'",
      ],
      shuffled_items: [
        "The gate voltage creates an electric field that forms a temporary conductive channel",
        "Current flows freely from source to drain — the transistor is 'on'",
        "The transistor rests unpowered, with a P-N junction blocking current between source and drain",
        "A sufficiently strong voltage is applied to the gate terminal",
      ],
      hints: [
        "The transistor starts in its resting, blocking state before anything is applied.",
        "The channel has to form before current can actually flow through it.",
      ],
      solution_summary:
        "Resting/blocked state → gate voltage applied → electric field forms a conductive channel → current flows, transistor is 'on'.",
      key_concepts: ["MOSFET switching", "gate voltage", "conductive channel"],
    },
    {
      id: "transistor_switching_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A MOSFET has a source and drain region separated by an oppositely doped region. Applying gate voltage creates a temporary conductive channel connecting source and drain. CMOS pairs NMOS and PMOS transistors for power efficiency. And a transistor's \"on\" and \"off\" states are two entirely separate, structurally different physical configurations of the material.' Which claim is wrong?",
      options: [
        "A MOSFET has a source and drain region separated by an oppositely doped region.",
        "Applying gate voltage creates a temporary conductive channel connecting source and drain.",
        "CMOS pairs NMOS and PMOS transistors for power efficiency.",
        "A transistor's \"on\" and \"off\" states are two entirely separate, structurally different physical configurations of the material.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "It's the identical physical device — only whether an electric field is present or absent changes.",
      ],
      solution_summary:
        "On and off are the same physical device and structure — only whether the gate's electric field is present or absent changes, temporarily reshaping charge distribution one way or the other.",
      key_concepts: ["transistor on/off states", "common misconception"],
    },
    {
      id: "transistor_switching_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["MOSFET", "Gate terminal", "CMOS"],
      right_shuffled: [
        "A design pairing NMOS and PMOS transistors so current only flows briefly during switching",
        "The most common transistor type in modern chips, controlling current via a gate over an insulating layer",
        "The terminal applying an electric field to open or close the conductive channel, without carrying current itself",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "The gate is separated from the current path by an insulating layer.",
        "CMOS is specifically about pairing two transistor types for efficiency.",
      ],
      solution_summary:
        "MOSFET = the common modern transistor type; Gate terminal = controls the channel via an electric field, without carrying current; CMOS = pairs NMOS/PMOS for power efficiency.",
      key_concepts: ["MOSFET", "gate terminal", "CMOS"],
    },
  ],

  cpu_from_transistors: [
    {
      id: "cpu_from_transistors_ac1",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'Moore's Law observed that transistor counts on a chip had roughly doubled about every two years. A modern CPU's billions of transistors are wired together into logic gates switching in synchronized rhythm. 3D stacking builds multiple layers of transistors vertically as individual transistors become harder to shrink further. And Moore's Law is a strict, unbreakable physical law, guaranteed to hold forever no matter what.' Which claim is wrong?",
      options: [
        "Moore's Law observed that transistor counts on a chip had roughly doubled about every two years.",
        "A modern CPU's billions of transistors are wired together into logic gates switching in synchronized rhythm.",
        "3D stacking builds multiple layers of transistors vertically as individual transistors become harder to shrink further.",
        "Moore's Law is a strict, unbreakable physical law, guaranteed to hold forever no matter what.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "It was always fundamentally an economic and engineering trend, not a law of physics like Ohm's Law.",
      ],
      solution_summary:
        "Moore's Law was always an economic/engineering observation, not a physical law — and its pace has genuinely slowed as transistors approach fundamental atomic-scale physical limits.",
      key_concepts: ["Moore's Law", "common misconception"],
    },
    {
      id: "cpu_from_transistors_ac2",
      type: "choice",
      variant: "predict_outcome",
      prompt: "A transistor is manufactured slightly smaller than before. What compounding benefits does this typically produce?",
      options: [
        "Only more transistors fit on the chip, with no other effects",
        "More transistors fit on the same area, each can switch faster, and each consumes less energy per switch — several benefits compounding at once",
        "The chip becomes slower and less efficient",
        "Nothing changes except the chip's physical size"
      ],
      correct_index: 1,
      hints: [
        "The topic names several benefits that compound together from smaller transistors.",
        "More density, faster switching, and lower per-switch energy all improve together.",
      ],
      solution_summary:
        "Several benefits compound at once: more transistors fit in the same area, each switches its channel faster (supporting higher clock frequency), and each consumes less energy and heat per switch.",
      key_concepts: ["transistor miniaturization benefits", "Moore's Law mechanism"],
    },
    {
      id: "cpu_from_transistors_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Moore's Law", "3D stacking", "Fetch-decode-execute cycle"],
      right_shuffled: [
        "The CPU's basic operational cycle, built from transistors wired into logic gates",
        "The historical observation of chip transistor counts roughly doubling every two years",
        "Building multiple layers of transistors vertically as further shrinking becomes difficult",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "3D stacking is a response to Moore's Law's recent slowdown, not the law itself.",
        "The fetch-decode-execute cycle is what all those transistors are ultimately built to carry out.",
      ],
      solution_summary:
        "Moore's Law = the historical transistor-doubling observation; 3D stacking = building layers vertically as an alternative to further shrinking; Fetch-decode-execute cycle = the CPU's basic operation built from those transistors.",
      key_concepts: ["Moore's Law", "3D stacking", "fetch-decode-execute cycle"],
    },
  ],

  chip_manufacturing: [
    {
      id: "chip_manufacturing_ac1",
      type: "order",
      prompt: "Put these chip manufacturing steps in the correct order.",
      items: [
        "A thin, precisely cut and polished silicon wafer is prepared",
        "Photolithography projects a precise pattern of light to mark where structures need to be built",
        "Doping introduces exact dopant atoms at the precisely marked locations",
        "Chips are tested for yield, then diced apart from the finished wafer",
      ],
      shuffled_items: [
        "Doping introduces exact dopant atoms at the precisely marked locations",
        "A thin, precisely cut and polished silicon wafer is prepared",
        "Chips are tested for yield, then diced apart from the finished wafer",
        "Photolithography projects a precise pattern of light to mark where structures need to be built",
      ],
      hints: [
        "The wafer has to exist before any pattern can be projected onto it.",
        "Dicing only happens after every manufacturing layer is fully completed across the wafer.",
      ],
      solution_summary:
        "Prepare the silicon wafer → photolithography marks the pattern → doping at the marked locations → testing for yield and dicing into individual chips.",
      key_concepts: ["silicon wafer", "photolithography", "doping", "dicing", "yield"],
    },
    {
      id: "chip_manufacturing_ac2",
      type: "choice",
      variant: "spot_wrong",
      prompt:
        "A student explains: 'A fab is an extraordinarily specialized, extraordinarily expensive manufacturing facility. Fabs operate as cleanrooms, filtered dramatically cleaner than a hospital operating room. A fabless company designs chips but pays a separate foundry to manufacture them. And chip manufacturing is essentially a single step, \"building a chip,\" rather than dozens of precise sequential stages.' Which claim is wrong?",
      options: [
        "A fab is an extraordinarily specialized, extraordinarily expensive manufacturing facility.",
        "Fabs operate as cleanrooms, filtered dramatically cleaner than a hospital operating room.",
        "A fabless company designs chips but pays a separate foundry to manufacture them.",
        "Chip manufacturing is essentially a single step, \"building a chip,\" rather than dozens of precise sequential stages.",
      ],
      correct_index: 3,
      hints: [
        "The topic directly rebuts this claim as a common misconception.",
        "A modern chip can require several hundred distinct, sequential manufacturing steps.",
      ],
      solution_summary:
        "Chip manufacturing isn't one step — a modern chip can require several hundred distinct, tightly sequential manufacturing steps, with any single error potentially ruining the chip entirely.",
      key_concepts: ["chip manufacturing complexity", "common misconception"],
    },
    {
      id: "chip_manufacturing_ac3",
      type: "match",
      prompt: "Match each term to its correct definition.",
      left: ["Fab", "Silicon wafer", "Photolithography", "Yield"],
      right_shuffled: [
        "The percentage of chips on a wafer that pass testing and actually work correctly",
        "A thin, precisely cut and polished disc of purified silicon serving as the base material",
        "An extraordinarily precise, extraordinarily expensive semiconductor manufacturing facility",
        "Projecting a precise pattern of light onto a wafer to define where structures are built",
      ],
      correct_assignments: [2, 1, 3, 0],
      hints: [
        "Yield is about the outcome of manufacturing, not a manufacturing step itself.",
        "Photolithography is the patterning step, conceptually like developing a photograph.",
      ],
      solution_summary:
        "Fab = the specialized manufacturing facility; Silicon wafer = the base material disc; Photolithography = projecting the precise pattern; Yield = the percentage of working chips produced.",
      key_concepts: ["fab", "silicon wafer", "photolithography", "yield"],
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
