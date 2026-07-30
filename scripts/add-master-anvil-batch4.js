// Master Anvil batch 4 (FINAL): multi_agent_systems, retrieval_systems_at_scale,
// ai_safety_alignment_intro, responsible_ai_deployment.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "master");

const CONTENT = {
  multi_agent_systems: [
    {
      id: "multi_agent_systems_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a multi-agent system differs from prompt chaining, using the fixed-script comparison.",
      shuffled_items: [
        "A prompt chain follows one fixed, human-written script of steps.",
        "A multi-agent system instead uses several distinct, specialized agents.",
        "Each agent decides its own next move rather than following a fixed script.",
        "The agents coordinate together toward a larger goal none of them alone is responsible for.",
      ],
      items: [
        "A prompt chain follows one fixed, human-written script of steps.",
        "A multi-agent system instead uses several distinct, specialized agents.",
        "Each agent decides its own next move rather than following a fixed script.",
        "The agents coordinate together toward a larger goal none of them alone is responsible for.",
      ],
      hints: [
        "The fixed-script prompt-chaining approach is contrasted with the multi-agent alternative.",
        "Deciding independently comes before the agents' coordination toward the shared larger goal.",
      ],
      solution_summary: "A prompt chain follows a fixed script → a multi-agent system instead uses several specialized agents → each agent decides its own next move → they coordinate together toward a larger shared goal.",
      key_concepts: ["multi-agent system", "prompt chaining", "agent coordination"],
    },
    {
      id: "multi_agent_systems_ms2",
      type: "choice",
      prompt: "What is the real structural difference between prompt chaining and a true multi-agent system?",
      options: [
        "There is no real difference — they are the same thing under different names",
        "Prompt chaining follows one fixed, human-written script; a multi-agent system has agents that genuinely decide their own next move",
        "Multi-agent systems can only ever use a single agent",
        "Prompt chaining requires more AI agents than a multi-agent system"
      ],
      correct_index: 1,
      hints: [
        "The framing explicitly contrasts 'one fixed, human-written script' with 'a team that genuinely decides its own next move.'",
        "Independent decision-making by each agent is the defining trait of a true multi-agent system.",
      ],
      solution_summary: "Prompt chaining follows one fixed, human-written script, while a true multi-agent system has several agents that genuinely decide their own next move rather than following a predetermined sequence.",
      key_concepts: ["multi-agent system", "prompt chaining"],
    },
    {
      id: "multi_agent_systems_ms3",
      type: "match",
      prompt: "Match each multi-agent system term to its meaning.",
      left: ["Multi-agent system", "Specialized agent", "Coordination", "Fixed script"],
      right: ["Several distinct agents working together toward one larger goal", "An agent focused on one specific sub-task within the larger goal", "How independent agents work together productively", "A predetermined sequence of steps, as used in prompt chaining"],
      correct_pairs: [
        ["Multi-agent system", "Several distinct agents working together toward one larger goal"],
        ["Specialized agent", "An agent focused on one specific sub-task within the larger goal"],
        ["Coordination", "How independent agents work together productively"],
        ["Fixed script", "A predetermined sequence of steps, as used in prompt chaining"],
      ],
      hints: [
        "A specialized agent is one component within the broader multi-agent system.",
        "A fixed script is exactly what a multi-agent system moves beyond.",
      ],
      solution_summary: "A multi-agent system is several agents working toward a larger goal, a specialized agent handles one sub-task, coordination is how they work together, and a fixed script is the predetermined sequence prompt chaining relies on instead.",
      key_concepts: ["multi-agent system", "specialized agent", "coordination"],
    },
  ],
  retrieval_systems_at_scale: [
    {
      id: "retrieval_systems_at_scale_ms1",
      type: "order",
      prompt: "Put these steps in order to describe why building a production-grade RAG system is harder than 'retrieve documents, then hand them to the model' suggests.",
      shuffled_items: [
        "A one-sentence summary sounds like RAG is a solved problem: retrieve, then hand off.",
        "In practice, deciding exactly what to retrieve and how to rank it involves many deliberate design choices.",
        "Those design decisions determine whether the system actually works well in production.",
        "A genuinely production-grade RAG system requires addressing all of those decisions carefully.",
      ],
      items: [
        "A one-sentence summary sounds like RAG is a solved problem: retrieve, then hand off.",
        "In practice, deciding exactly what to retrieve and how to rank it involves many deliberate design choices.",
        "Those design decisions determine whether the system actually works well in production.",
        "A genuinely production-grade RAG system requires addressing all of those decisions carefully.",
      ],
      hints: [
        "The deceptively simple one-sentence summary is described before the real complexity underneath it.",
        "The final production-grade requirement depends on already having addressed the design decisions.",
      ],
      solution_summary: "The one-sentence summary sounds solved → in practice, many deliberate design decisions live underneath it → those decisions determine real-world success → a production-grade system requires carefully addressing all of them.",
      key_concepts: ["RAG", "retrieval systems at scale"],
    },
    {
      id: "retrieval_systems_at_scale_ms2",
      type: "choice",
      prompt: "What does the phrase 'nearly every real decision that actually determines whether a RAG system works well lives inside that deceptively simple-sounding sentence' emphasize?",
      options: [
        "That RAG systems require no meaningful design decisions at all",
        "That the simple summary hides substantial complexity in decisions like what to retrieve and how to rank it",
        "That RAG systems are impossible to build at scale",
        "That vector databases are unnecessary for RAG"
      ],
      correct_index: 1,
      hints: [
        "The one-sentence summary is called 'deceptively simple-sounding' for a reason.",
        "Real success depends on the design decisions hidden beneath that simple framing.",
      ],
      solution_summary: "The phrase emphasizes that the simple one-sentence summary of RAG hides substantial real complexity — the actual design decisions that determine whether the system truly works well.",
      key_concepts: ["RAG", "retrieval systems at scale"],
    },
    {
      id: "retrieval_systems_at_scale_ms3",
      type: "match",
      prompt: "Match each retrieval-at-scale term to its meaning.",
      left: ["RAG", "Retrieval", "Ranking", "Production-grade system"],
      right: ["Retrieval-augmented generation, combining search with a model's response", "Finding relevant documents to hand to the model", "Deciding which retrieved documents matter most", "A system built to reliably handle real-world use, not just a demo"],
      correct_pairs: [
        ["RAG", "Retrieval-augmented generation, combining search with a model's response"],
        ["Retrieval", "Finding relevant documents to hand to the model"],
        ["Ranking", "Deciding which retrieved documents matter most"],
        ["Production-grade system", "A system built to reliably handle real-world use, not just a demo"],
      ],
      hints: [
        "Retrieval and ranking are two of the deliberate design decisions inside RAG.",
        "A production-grade system is held to a higher bar than a simple working demo.",
      ],
      solution_summary: "RAG combines retrieval with generation, retrieval finds relevant documents, ranking decides which matter most, and a production-grade system is built to reliably handle real-world use.",
      key_concepts: ["RAG", "retrieval", "ranking"],
    },
  ],
  ai_safety_alignment_intro: [
    {
      id: "ai_safety_alignment_intro_ms1",
      type: "order",
      prompt: "Put these steps in order to describe the structural warning behind the paperclip-maximizer thought experiment.",
      shuffled_items: [
        "A system is told to maximize paperclip production, with nothing else specified.",
        "The system, in principle, converts every available resource on Earth into paperclips.",
        "The absurd outcome isn't meant to predict any real system's literal behavior.",
        "It instead warns that a narrowly specified goal can produce wildly unintended consequences at scale.",
      ],
      items: [
        "A system is told to maximize paperclip production, with nothing else specified.",
        "The system, in principle, converts every available resource on Earth into paperclips.",
        "The absurd outcome isn't meant to predict any real system's literal behavior.",
        "It instead warns that a narrowly specified goal can produce wildly unintended consequences at scale.",
      ],
      hints: [
        "The narrow instruction is given before the extreme, unintended consequence follows from it.",
        "The final step is the real, general lesson the thought experiment is meant to teach.",
      ],
      solution_summary: "A system is told to maximize paperclips with nothing else specified → it converts all resources into paperclips → the absurd outcome isn't a literal prediction → it warns that narrowly specified goals can produce wildly unintended consequences.",
      key_concepts: ["AI alignment", "AI safety", "paperclip maximizer"],
    },
    {
      id: "ai_safety_alignment_intro_ms2",
      type: "choice",
      prompt: "What is the actual point of the paperclip-maximizer thought experiment?",
      options: [
        "To predict that a real system will literally try to convert the Earth into paperclips",
        "To illustrate the structural risk that a narrowly specified goal can lead to wildly unintended consequences",
        "To argue that AI systems should never be given any goals at all",
        "To demonstrate that paperclip manufacturing is an important AI application",
      ],
      correct_index: 1,
      hints: [
        "The text explicitly says 'the point... isn't that any real system would actually do this.'",
        "The 'structural warning underneath it' is the real lesson being taught.",
      ],
      solution_summary: "The thought experiment illustrates the structural risk that a narrowly specified goal, taken to its logical extreme, can produce wildly unintended consequences — not a literal prediction about real systems.",
      key_concepts: ["AI alignment", "paperclip maximizer"],
    },
    {
      id: "ai_safety_alignment_intro_ms3",
      type: "match",
      prompt: "Match each AI safety/alignment term to its meaning.",
      left: ["AI alignment", "Paperclip maximizer", "Narrowly specified goal", "Unintended consequence"],
      right: ["Research into making AI systems reliably do what humans actually intend", "A thought experiment illustrating the risk of a narrow, literal goal", "An objective given without accounting for broader context or values", "An outcome a system's designers never actually wanted"],
      correct_pairs: [
        ["AI alignment", "Research into making AI systems reliably do what humans actually intend"],
        ["Paperclip maximizer", "A thought experiment illustrating the risk of a narrow, literal goal"],
        ["Narrowly specified goal", "An objective given without accounting for broader context or values"],
        ["Unintended consequence", "An outcome a system's designers never actually wanted"],
      ],
      hints: [
        "The paperclip maximizer is a specific illustrative example, not the general concept itself.",
        "A narrowly specified goal is what leads to the risk of an unintended consequence.",
      ],
      solution_summary: "AI alignment studies making systems do what humans intend, the paperclip maximizer illustrates the risk of a narrow goal, a narrowly specified goal lacks broader context, and an unintended consequence is an unwanted resulting outcome.",
      key_concepts: ["AI alignment", "paperclip maximizer", "unintended consequence"],
    },
  ],
  responsible_ai_deployment: [
    {
      id: "responsible_ai_deployment_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how responsible AI deployment catches gaps that benchmarks miss.",
      shuffled_items: [
        "A model scores well on every generic industry benchmark.",
        "The model still fails its own actual users in ways no benchmark ever tested for.",
        "Responsible deployment adds concrete safeguards beyond the model's raw benchmark performance.",
        "The gap is caught and addressed before real people ever encounter it.",
      ],
      items: [
        "A model scores well on every generic industry benchmark.",
        "The model still fails its own actual users in ways no benchmark ever tested for.",
        "Responsible deployment adds concrete safeguards beyond the model's raw benchmark performance.",
        "The gap is caught and addressed before real people ever encounter it.",
      ],
      hints: [
        "Strong benchmark scores are described first, before the gap they fail to catch.",
        "Catching the gap before users encounter it is the final payoff of responsible deployment practices.",
      ],
      solution_summary: "A model scores well on benchmarks → it still fails real users in untested ways → responsible deployment adds safeguards beyond raw benchmark performance → the gap is caught before real people encounter it.",
      key_concepts: ["responsible AI deployment", "safeguards"],
    },
    {
      id: "responsible_ai_deployment_ms2",
      type: "choice",
      prompt: "Why can't strong benchmark scores alone guarantee a model is safe to deploy?",
      options: [
        "Benchmarks are always inaccurate and meaningless",
        "A model can still fail its own actual users in real-world ways that generic benchmarks were never designed to test for",
        "Benchmarks only measure a model's speed, never its accuracy",
        "Models that score well on benchmarks are always unsafe by definition"
      ],
      correct_index: 1,
      hints: [
        "The text explicitly says a model 'can still fail its own actual users in ways none of those benchmarks ever thought to test for.'",
        "Responsible deployment exists precisely to catch that gap.",
      ],
      solution_summary: "Strong benchmark scores can't guarantee safety because a model can still fail its actual users in specific real-world ways that generic benchmarks were never designed to test for.",
      key_concepts: ["responsible AI deployment", "benchmarks"],
    },
    {
      id: "responsible_ai_deployment_ms3",
      type: "match",
      prompt: "Match each responsible-deployment term to its meaning.",
      left: ["Responsible deployment", "Benchmark", "Rate limiting", "Active monitoring"],
      right: ["Concrete safeguards catching real-world gaps before users encounter them", "A generic, standardized test of model capability", "Controlling how much a system can be used in a given time period", "Ongoing observation of a deployed system's real-world behavior"],
      correct_pairs: [
        ["Responsible deployment", "Concrete safeguards catching real-world gaps before users encounter them"],
        ["Benchmark", "A generic, standardized test of model capability"],
        ["Rate limiting", "Controlling how much a system can be used in a given time period"],
        ["Active monitoring", "Ongoing observation of a deployed system's real-world behavior"],
      ],
      hints: [
        "Rate limiting and active monitoring are both examples of concrete safeguards mentioned.",
        "A benchmark measures general capability, not real-world deployment safety.",
      ],
      solution_summary: "Responsible deployment adds concrete safeguards, a benchmark is a generic capability test, rate limiting controls usage volume, and active monitoring is ongoing observation of real-world behavior.",
      key_concepts: ["responsible AI deployment", "rate limiting", "active monitoring"],
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
