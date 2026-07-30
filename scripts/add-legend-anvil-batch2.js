// Legend Anvil batch 2 (FINAL): turing_machines_computability, halting_problem,
// p_vs_np_np_completeness, choosing_a_capstone_project, open_source_contribution,
// reading_code_at_scale, staying_current_in_tech, bridging_construction_and_tech.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");
const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));
const tier = kb.tiers.find((t) => t.id === "legend");

const CONTENT = {
  turing_machines_computability: [
    {
      id: "turing_machines_computability_lg1", type: "order",
      prompt: "Put these steps in order to describe how Turing answered the question of what 'computable' means.",
      shuffled_items: [
        "In 1936, Turing asked what it actually means for something to be computable.",
        "He imagined a simple device manipulating symbols on an infinite tape.",
        "This device, now called a Turing machine, formally defined computation itself.",
        "Anything a Turing machine can compute is considered computable in the formal sense.",
      ],
      items: [
        "In 1936, Turing asked what it actually means for something to be computable.",
        "He imagined a simple device manipulating symbols on an infinite tape.",
        "This device, now called a Turing machine, formally defined computation itself.",
        "Anything a Turing machine can compute is considered computable in the formal sense.",
      ],
      hints: ["The question came before the imagined device that answered it.", "The final line defines computability in terms of the Turing machine."],
      solution_summary: "Turing asked what 'computable' means → he imagined a symbol-manipulating device on an infinite tape → this Turing machine formally defined computation → anything it can compute is formally computable.",
      key_concepts: ["Turing machine", "computability"],
    },
    {
      id: "turing_machines_computability_lg2", type: "choice",
      prompt: "What did Turing's imagined machine formally define?",
      options: ["The physical design of the first electronic computer", "What it means for something to be computable at all", "The fastest possible programming language", "How to manufacture computer hardware"],
      correct_index: 1,
      hints: ["Turing's question in 1936 was fundamentally about the definition of computability, before any electronic computer existed.", "The Turing machine is a theoretical tool, not a hardware design."],
      solution_summary: "Turing's imagined machine formally defined what it means for something to be computable, answering a question posed before any electronic computer was ever built.",
      key_concepts: ["Turing machine", "computability"],
    },
    {
      id: "turing_machines_computability_lg3", type: "match",
      prompt: "Match each computability term to its meaning.",
      left: ["Turing machine", "Computable", "Tape", "Alan Turing"],
      right: ["A theoretical device formally defining computation", "Something a Turing machine can, in principle, compute", "The infinite storage medium a Turing machine reads and writes symbols on", "The mathematician who defined the Turing machine in 1936"],
      correct_pairs: [
        ["Turing machine", "A theoretical device formally defining computation"],
        ["Computable", "Something a Turing machine can, in principle, compute"],
        ["Tape", "The infinite storage medium a Turing machine reads and writes symbols on"],
        ["Alan Turing", "The mathematician who defined the Turing machine in 1936"],
      ],
      hints: ["The tape is one specific component of the Turing machine model.", "'Computable' is defined directly in terms of what the Turing machine can do."],
      solution_summary: "A Turing machine formally defines computation, computable means calculable by such a machine, the tape is its storage medium, and Alan Turing is the mathematician who defined it in 1936.",
      key_concepts: ["Turing machine", "computability", "Alan Turing"],
    },
  ],
  halting_problem: [
    {
      id: "halting_problem_lg1", type: "order",
      prompt: "Put these steps in order to describe why a universal program-halting checker is impossible, using the mechanic analogy.",
      shuffled_items: [
        "A mechanic claims to have a tool that reliably predicts whether any car will break down or run forever.",
        "This sounds enormously useful at first.",
        "The claim turns out to be logically impossible to satisfy in general.",
        "The halting problem proves no program can universally determine whether any other program will halt.",
      ],
      items: [
        "A mechanic claims to have a tool that reliably predicts whether any car will break down or run forever.",
        "This sounds enormously useful at first.",
        "The claim turns out to be logically impossible to satisfy in general.",
        "The halting problem proves no program can universally determine whether any other program will halt.",
      ],
      hints: ["The claim's appeal is described before the impossibility is revealed.", "The final line states the direct computer-science parallel."],
      solution_summary: "The mechanic's claim sounds useful → but it's logically impossible to satisfy in general → the halting problem proves the same about programs: none can universally predict whether any other program halts.",
      key_concepts: ["halting problem"],
    },
    {
      id: "halting_problem_lg2", type: "choice",
      prompt: "What does the halting problem prove?",
      options: ["That some specific programs are simply too complex to analyze with current tools", "That no general algorithm can determine, for every possible program and input, whether that program will halt", "That all programs eventually halt if given enough time", "That halting can always be predicted using a sufficiently large test suite"],
      correct_index: 1,
      hints: ["The mechanic analogy: no tool can reliably predict this for every car, in general.", "This is a proven impossibility, not merely a current technical limitation."],
      solution_summary: "The halting problem proves that no general algorithm can determine, for every possible program and input, whether that program will eventually halt.",
      key_concepts: ["halting problem"],
    },
    {
      id: "halting_problem_lg3", type: "match",
      prompt: "Match each halting-problem term to its meaning.",
      left: ["Halting problem", "Halt", "Undecidable problem", "Universal checker"],
      right: ["The proven impossibility of a general program that predicts halting for all programs", "A program finishing execution rather than running forever", "A problem no algorithm can solve for all possible inputs", "The impossible universal tool the mechanic analogy imagines"],
      correct_pairs: [
        ["Halting problem", "The proven impossibility of a general program that predicts halting for all programs"],
        ["Halt", "A program finishing execution rather than running forever"],
        ["Undecidable problem", "A problem no algorithm can solve for all possible inputs"],
        ["Universal checker", "The impossible universal tool the mechanic analogy imagines"],
      ],
      hints: ["The halting problem is itself the classic example of an undecidable problem.", "The universal checker is the analogy's stand-in for a general halting-detector."],
      solution_summary: "The halting problem is the proven impossibility of a general halting-predictor, halting means finishing execution, an undecidable problem has no general algorithmic solution, and a universal checker is the impossible tool the analogy imagines.",
      key_concepts: ["halting problem", "undecidable problem"],
    },
  ],
  p_vs_np_np_completeness: [
    {
      id: "p_vs_np_np_completeness_lg1", type: "order",
      prompt: "Put these steps in order to describe the asymmetry between solving and checking, using the jigsaw puzzle analogy.",
      shuffled_items: [
        "Solving a jigsaw puzzle from scratch can take an open-ended amount of time.",
        "Someone hands you a completed puzzle and asks if it's correct.",
        "Checking that answer takes almost no time at all.",
        "This asymmetry between solving and checking is the heart of the P vs NP question.",
      ],
      items: [
        "Solving a jigsaw puzzle from scratch can take an open-ended amount of time.",
        "Someone hands you a completed puzzle and asks if it's correct.",
        "Checking that answer takes almost no time at all.",
        "This asymmetry between solving and checking is the heart of the P vs NP question.",
      ],
      hints: ["Solving from scratch is described before the much easier checking task.", "The final line names the formal question this asymmetry represents."],
      solution_summary: "Solving from scratch takes a long time → but checking a given completed solution is quick → this solving-vs-checking asymmetry is exactly what the P vs NP question is about.",
      key_concepts: ["P vs NP"],
    },
    {
      id: "p_vs_np_np_completeness_lg2", type: "choice",
      prompt: "What does the P vs NP question fundamentally ask?",
      options: ["Whether computers will ever be fast enough to solve any problem instantly", "Whether every problem whose solution can be quickly checked can also be quickly solved", "Whether programming languages should use static or dynamic typing", "Whether more RAM always makes software run faster"],
      correct_index: 1,
      hints: ["The jigsaw analogy: checking is fast, but is solving from scratch always equally fast? That's the open question.", "P vs NP is specifically about the relationship between quick-to-check and quick-to-solve problems."],
      solution_summary: "P vs NP asks whether every problem whose solution can be quickly checked can also be quickly solved from scratch — an unsolved question in computer science.",
      key_concepts: ["P vs NP"],
    },
    {
      id: "p_vs_np_np_completeness_lg3", type: "match",
      prompt: "Match each P vs NP term to its meaning.",
      left: ["P", "NP", "NP-complete", "Checking a solution"],
      right: ["Problems solvable quickly (in polynomial time)", "Problems whose given solutions can be checked quickly", "The hardest problems within NP, to which all NP problems can be reduced", "Confirming a proposed answer is correct, as with the jigsaw puzzle"],
      correct_pairs: [
        ["P", "Problems solvable quickly (in polynomial time)"],
        ["NP", "Problems whose given solutions can be checked quickly"],
        ["NP-complete", "The hardest problems within NP, to which all NP problems can be reduced"],
        ["Checking a solution", "Confirming a proposed answer is correct, as with the jigsaw puzzle"],
      ],
      hints: ["P is a subset of NP; the open question is whether they're actually the same set.", "NP-complete problems represent the hardest cases within NP."],
      solution_summary: "P is quickly-solvable problems, NP is quickly-checkable problems, NP-complete problems are the hardest within NP, and checking a solution is confirming a proposed answer, as with the jigsaw puzzle.",
      key_concepts: ["P", "NP", "NP-complete"],
    },
  ],
  choosing_a_capstone_project: [
    {
      id: "choosing_a_capstone_project_lg1", type: "order",
      prompt: "Put these steps in order to describe why a generic tutorial portfolio fails to impress an employer.",
      shuffled_items: [
        "A portfolio is filled with the same to-do app and weather widget built by thousands of other learners.",
        "It follows the exact same instructions everyone else followed too.",
        "This tells an employer almost nothing about what the candidate can do without hand-holding.",
        "A single, genuinely original capstone project demonstrates real independent capability instead.",
      ],
      items: [
        "A portfolio is filled with the same to-do app and weather widget built by thousands of other learners.",
        "It follows the exact same instructions everyone else followed too.",
        "This tells an employer almost nothing about what the candidate can do without hand-holding.",
        "A single, genuinely original capstone project demonstrates real independent capability instead.",
      ],
      hints: ["The generic-portfolio problem is described before the capstone project's fix.", "Demonstrating independent capability is the payoff of an original project."],
      solution_summary: "A generic tutorial portfolio follows the same instructions as everyone else → it tells employers almost nothing about independent capability → a genuinely original capstone project demonstrates that capability instead.",
      key_concepts: ["capstone project"],
    },
    {
      id: "choosing_a_capstone_project_lg2", type: "choice",
      prompt: "Why does a capstone project matter more than another tutorial-following exercise, for demonstrating skill to an employer?",
      options: ["It uses a more expensive programming language", "It demonstrates what someone can actually do without step-by-step instructions to follow", "It's always shorter to build than a tutorial project", "It requires no planning or independent decision-making at all"],
      correct_index: 1,
      hints: ["The core distinction is following instructions versus working independently.", "A capstone project's value comes precisely from the absence of hand-holding."],
      solution_summary: "A capstone project matters because it demonstrates what someone can actually do without step-by-step instructions, unlike a generic tutorial-following exercise.",
      key_concepts: ["capstone project"],
    },
    {
      id: "choosing_a_capstone_project_lg3", type: "match",
      prompt: "Match each capstone-project term to its meaning.",
      left: ["Capstone project", "Tutorial project", "Independent capability", "Portfolio"],
      right: ["An original, self-directed project demonstrating real skill", "A project built by following someone else's step-by-step instructions", "The ability to build something without being told exactly how", "A collection of projects showcasing a developer's work"],
      correct_pairs: [
        ["Capstone project", "An original, self-directed project demonstrating real skill"],
        ["Tutorial project", "A project built by following someone else's step-by-step instructions"],
        ["Independent capability", "The ability to build something without being told exactly how"],
        ["Portfolio", "A collection of projects showcasing a developer's work"],
      ],
      hints: ["A tutorial project is exactly what a capstone project is meant to stand apart from.", "Independent capability is what a capstone project is specifically meant to demonstrate."],
      solution_summary: "A capstone project is original and self-directed, a tutorial project follows given instructions, independent capability is building without being told how, and a portfolio is the overall collection of a developer's work.",
      key_concepts: ["capstone project", "portfolio"],
    },
  ],
  open_source_contribution: [
    {
      id: "open_source_contribution_lg1", type: "order",
      prompt: "Put these steps in order to describe the relationship every developer has with open source, even before contributing.",
      shuffled_items: [
        "A developer uses popular tools like Linux, Python, or React.",
        "These tools are built and maintained largely by volunteered, often unpaid, time.",
        "The developer has been quietly relying on strangers' generosity all along.",
        "Contributing back is a way of participating in that same system, not just consuming from it.",
      ],
      items: [
        "A developer uses popular tools like Linux, Python, or React.",
        "These tools are built and maintained largely by volunteered, often unpaid, time.",
        "The developer has been quietly relying on strangers' generosity all along.",
        "Contributing back is a way of participating in that same system, not just consuming from it.",
      ],
      hints: ["Using the tools comes before recognizing the volunteered effort behind them.", "Contributing back is presented as the natural next step after recognizing that reliance."],
      solution_summary: "A developer uses popular open-source tools → those tools rely on volunteered, often unpaid time → the developer has been relying on that generosity all along → contributing back means participating, not just consuming.",
      key_concepts: ["open source contribution"],
    },
    {
      id: "open_source_contribution_lg2", type: "choice",
      prompt: "What point does the text make about developers' relationship to popular open-source tools?",
      options: ["Most developers have never used any open-source software", "Nearly every developer has already been relying on volunteered, often unpaid work, whether they've contributed or not", "Open-source tools are always maintained by large paid corporate teams", "Contributing to open source requires being an expert programmer first"],
      correct_index: 1,
      hints: ["The text names Linux, Python, and React as examples nearly every developer has already used.", "The reliance point comes before any discussion of skill level required to contribute."],
      solution_summary: "Nearly every developer has already been relying on volunteered, often unpaid open-source work, regardless of whether they've ever contributed themselves.",
      key_concepts: ["open source contribution"],
    },
    {
      id: "open_source_contribution_lg3", type: "match",
      prompt: "Match each open-source term to its meaning.",
      left: ["Open source", "Maintainer", "Pull request", "Contribution"],
      right: ["Software whose source code is publicly available and often community-built", "A person responsible for reviewing and merging changes to a project", "A proposed code change submitted for review", "Any work — code, docs, bug reports — given back to a project"],
      correct_pairs: [
        ["Open source", "Software whose source code is publicly available and often community-built"],
        ["Maintainer", "A person responsible for reviewing and merging changes to a project"],
        ["Pull request", "A proposed code change submitted for review"],
        ["Contribution", "Any work — code, docs, bug reports — given back to a project"],
      ],
      hints: ["A maintainer is the person who reviews pull requests submitted as contributions.", "A contribution can be more than just code — documentation and bug reports count too."],
      solution_summary: "Open source is publicly available, often community-built software, a maintainer reviews and merges changes, a pull request is a proposed change, and a contribution is any work given back to a project.",
      key_concepts: ["open source", "maintainer", "pull request"],
    },
  ],
  reading_code_at_scale: [
    {
      id: "reading_code_at_scale_lg1", type: "order",
      prompt: "Put these steps in order to describe the challenge of navigating an unfamiliar large codebase, using the city analogy.",
      shuffled_items: [
        "A developer is handed an unfamiliar codebase spanning hundreds of thousands of lines.",
        "They're asked to fix a specific bug somewhere within it.",
        "It feels like being dropped into an unfamiliar city with no map.",
        "Reading code at scale is the skill of navigating this kind of unfamiliar territory effectively.",
      ],
      items: [
        "A developer is handed an unfamiliar codebase spanning hundreds of thousands of lines.",
        "They're asked to fix a specific bug somewhere within it.",
        "It feels like being dropped into an unfamiliar city with no map.",
        "Reading code at scale is the skill of navigating this kind of unfamiliar territory effectively.",
      ],
      hints: ["The codebase's scale is described before the specific task assigned within it.", "The final line names the skill this whole scenario is illustrating."],
      solution_summary: "A developer is handed a huge unfamiliar codebase → asked to fix a specific bug in it → it feels like navigating an unfamiliar city with no map → reading code at scale is the skill of navigating this effectively.",
      key_concepts: ["reading code at scale"],
    },
    {
      id: "reading_code_at_scale_lg2", type: "choice",
      prompt: "What does the city analogy illustrate about working in a large, unfamiliar codebase?",
      options: ["That large codebases are always poorly written", "That navigating unfamiliar, large-scale code without guidance feels disorienting, much like an unfamiliar city with no map", "That only the original authors of a codebase can ever understand it", "That small personal projects are inherently harder to navigate than large codebases"],
      correct_index: 1,
      hints: ["The disorientation of being dropped into an unfamiliar city with no map is the direct parallel drawn.", "This isn't a claim about code quality, but about the challenge of unfamiliarity at scale."],
      solution_summary: "The city analogy illustrates that navigating an unfamiliar, large-scale codebase without guidance feels genuinely disorienting, much like being dropped into an unfamiliar city with no map.",
      key_concepts: ["reading code at scale"],
    },
    {
      id: "reading_code_at_scale_lg3", type: "match",
      prompt: "Match each reading-code-at-scale term to its meaning.",
      left: ["Codebase", "Onboarding", "Code navigation", "Unfamiliar territory"],
      right: ["The full collection of source code making up a project", "The process of getting oriented in a new project or team", "Finding your way through a project's structure to locate relevant code", "A large, complex system a developer hasn't worked in before"],
      correct_pairs: [
        ["Codebase", "The full collection of source code making up a project"],
        ["Onboarding", "The process of getting oriented in a new project or team"],
        ["Code navigation", "Finding your way through a project's structure to locate relevant code"],
        ["Unfamiliar territory", "A large, complex system a developer hasn't worked in before"],
      ],
      hints: ["Onboarding is the broader process; code navigation is one specific skill within it.", "Unfamiliar territory is the city analogy's direct parallel for a new codebase."],
      solution_summary: "A codebase is the full source code collection, onboarding is getting oriented in a new project, code navigation is finding relevant code, and unfamiliar territory is the analogy for a new, complex system.",
      key_concepts: ["reading code at scale", "onboarding", "code navigation"],
    },
  ],
  staying_current_in_tech: [
    {
      id: "staying_current_in_tech_lg1", type: "order",
      prompt: "Put these steps in order to describe why staying current in tech is an ongoing necessity, not a one-time task.",
      shuffled_items: [
        "A framework that was the obvious professional choice five years ago is now considered legacy.",
        "Today's obvious default choice will, with near certainty, face the same fate eventually.",
        "This isn't a flaw unique to any one framework — it's a pattern across the whole field.",
        "Staying current means treating learning as an ongoing practice, not a one-time achievement.",
      ],
      items: [
        "A framework that was the obvious professional choice five years ago is now considered legacy.",
        "Today's obvious default choice will, with near certainty, face the same fate eventually.",
        "This isn't a flaw unique to any one framework — it's a pattern across the whole field.",
        "Staying current means treating learning as an ongoing practice, not a one-time achievement.",
      ],
      hints: ["The past example is described before the prediction about today's tools facing the same fate.", "The final line draws the general conclusion about ongoing learning."],
      solution_summary: "A five-year-old default framework is now legacy → today's default will likely face the same fate → this pattern isn't unique to one tool, it's field-wide → staying current means ongoing learning, not a one-time achievement.",
      key_concepts: ["staying current in tech"],
    },
    {
      id: "staying_current_in_tech_lg2", type: "choice",
      prompt: "What does the framework example illustrate about the tech industry?",
      options: ["That once a framework becomes popular, it stays the default choice forever", "That today's default tools will very likely eventually be replaced, just as past defaults were", "That only frameworks specifically are subject to change, unlike other technologies", "That learning one framework thoroughly means never needing to learn another"],
      correct_index: 1,
      hints: ["The five-years-ago example is explicitly said to predict today's tools facing the same fate.", "This is framed as a pattern across the whole field, not a one-off exception."],
      solution_summary: "The example illustrates that today's default tools will very likely eventually be replaced, just as past defaults were — an ongoing pattern across the tech field.",
      key_concepts: ["staying current in tech"],
    },
    {
      id: "staying_current_in_tech_lg3", type: "match",
      prompt: "Match each staying-current term to its meaning.",
      left: ["Legacy technology", "Default choice", "Continuous learning", "Tech churn"],
      right: ["A tool once standard, now outdated or being phased out", "The tool most commonly picked for new projects at a given time", "Treating skill development as an ongoing, never-finished practice", "The recurring cycle of tools rising and falling out of favor"],
      correct_pairs: [
        ["Legacy technology", "A tool once standard, now outdated or being phased out"],
        ["Default choice", "The tool most commonly picked for new projects at a given time"],
        ["Continuous learning", "Treating skill development as an ongoing, never-finished practice"],
        ["Tech churn", "The recurring cycle of tools rising and falling out of favor"],
      ],
      hints: ["A default choice eventually becomes legacy technology as tech churn continues.", "Continuous learning is the practical response to that ongoing churn."],
      solution_summary: "Legacy technology is a once-standard now-outdated tool, a default choice is today's commonly picked tool, continuous learning is ongoing skill development, and tech churn is the recurring cycle driving both.",
      key_concepts: ["staying current in tech", "tech churn"],
    },
  ],
  bridging_construction_and_tech: [
    {
      id: "bridging_construction_and_tech_lg1", type: "order",
      prompt: "Put these steps in order to describe why construction experience transfers to tech work.",
      shuffled_items: [
        "Someone spends years reading blueprints and coordinating a job site.",
        "They troubleshoot problems discovered mid-project with no convenient way to start over.",
        "They communicate clearly and precisely with a team under real deadline pressure.",
        "This person has already been practicing core skills that transfer directly to software work.",
      ],
      items: [
        "Someone spends years reading blueprints and coordinating a job site.",
        "They troubleshoot problems discovered mid-project with no convenient way to start over.",
        "They communicate clearly and precisely with a team under real deadline pressure.",
        "This person has already been practicing core skills that transfer directly to software work.",
      ],
      hints: ["The individual construction skills are listed before the general conclusion about transferability.", "The final line ties the specific experiences together into one broader point."],
      solution_summary: "Reading blueprints and coordinating a site, troubleshooting mid-project without restarting, and communicating clearly under deadline pressure are all construction skills that transfer directly to software work.",
      key_concepts: ["bridging construction and tech", "transferable skills"],
    },
    {
      id: "bridging_construction_and_tech_lg2", type: "choice",
      prompt: "What is the core argument for why construction experience is valuable preparation for tech work?",
      options: ["Construction and software use identical tools and materials", "Skills like coordinating complex projects, troubleshooting under pressure, and clear team communication transfer directly", "Construction workers are required to learn programming as part of their job", "Tech work and construction work have no meaningful skills in common"],
      correct_index: 1,
      hints: ["The examples given — blueprints, coordination, troubleshooting, communication under deadline pressure — are all transferable skills, not shared tools.", "The argument is about transferable underlying skills, not literal overlap in tools."],
      solution_summary: "The core argument is that skills like coordinating complex projects, troubleshooting under real pressure, and precise team communication transfer directly from construction to tech work.",
      key_concepts: ["bridging construction and tech"],
    },
    {
      id: "bridging_construction_and_tech_lg3", type: "match",
      prompt: "Match each transferable-skill term to its construction-world origin.",
      left: ["Reading blueprints", "Coordinating a job site", "Troubleshooting mid-project", "Communicating under deadline pressure"],
      right: ["Parallels reading technical documentation or system architecture diagrams", "Parallels coordinating multiple team members and moving pieces on a software project", "Parallels debugging a live system without being able to just start over", "Parallels clear team communication during a tight software release"],
      correct_pairs: [
        ["Reading blueprints", "Parallels reading technical documentation or system architecture diagrams"],
        ["Coordinating a job site", "Parallels coordinating multiple team members and moving pieces on a software project"],
        ["Troubleshooting mid-project", "Parallels debugging a live system without being able to just start over"],
        ["Communicating under deadline pressure", "Parallels clear team communication during a tight software release"],
      ],
      hints: ["Each construction skill has a direct, named parallel in software work.", "Troubleshooting mid-project without restarting is especially close to debugging a live production system."],
      solution_summary: "Reading blueprints parallels reading technical docs, coordinating a job site parallels team coordination, troubleshooting mid-project parallels live debugging, and communicating under pressure parallels team communication during a release.",
      key_concepts: ["bridging construction and tech", "transferable skills"],
    },
  ],
};

let added = 0;
for (const [topicId, challenges] of Object.entries(CONTENT)) {
  const topic = tier.topics.find((t) => t.id === topicId);
  if (!topic) { console.error(`MISSING: ${topicId}`); continue; }
  if (!Array.isArray(topic.anvil_challenges)) topic.anvil_challenges = [];
  topic.anvil_challenges.push(...challenges);
  added += challenges.length;
}
fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added ${added} across ${Object.keys(CONTENT).length} topics.`);
