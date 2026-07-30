// Journeyman Anvil batch 7 (FINAL): risc_cisc_pipelining_cache, calling_an_api_practically,
// system_vs_user_prompts, structured_output, prompt_chaining, vector_databases,
// cost_latency_tradeoffs, vibecoding_backstage.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  risc_cisc_pipelining_cache: [
    {
      id: "risc_cisc_pipelining_cache_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how pipelining speeds up work, using the assembly-line analogy.",
      shuffled_items: [
        "The build process is split into distinct stages, such as weld, paint, and install engine.",
        "One car sits at the welding stage while another is already at the painting stage.",
        "A factory wants to build cars faster without making any single worker move faster.",
        "Multiple cars progress simultaneously, each at a different stage.",
      ],
      items: [
        "A factory wants to build cars faster without making any single worker move faster.",
        "The build process is split into distinct stages, such as weld, paint, and install engine.",
        "One car sits at the welding stage while another is already at the painting stage.",
        "Multiple cars progress simultaneously, each at a different stage.",
      ],
      hints: [
        "Splitting into stages must happen before different cars can occupy different stages at once.",
        "The final step describes the overall throughput gain from the earlier setup.",
      ],
      solution_summary: "The goal is faster output without faster individual workers → the process is split into stages → different cars occupy different stages at once → multiple cars progress simultaneously.",
      key_concepts: ["pipelining", "CPU throughput"],
    },
    {
      id: "risc_cisc_pipelining_cache_jv2",
      type: "choice",
      prompt: "What is the core idea behind CPU pipelining, based on the assembly-line analogy?",
      options: [
        "Making each individual instruction execute faster in isolation",
        "Overlapping different stages of multiple instructions so overall throughput increases",
        "Running only one instruction at a time from start to finish before starting the next",
        "Physically increasing the number of CPUs in a machine",
      ],
      correct_index: 1,
      hints: [
        "The assembly line doesn't speed up any single worker — it overlaps different cars' stages.",
        "Throughput increases because multiple instructions are in different stages simultaneously.",
      ],
      solution_summary: "Pipelining overlaps different stages of multiple instructions at once, increasing overall throughput without making any single instruction execute faster in isolation.",
      key_concepts: ["pipelining", "CPU throughput"],
    },
    {
      id: "risc_cisc_pipelining_cache_jv3",
      type: "match",
      prompt: "Match each CPU architecture concept to its meaning.",
      left: ["RISC", "CISC", "Pipelining", "Cache"],
      right: ["A design using a small set of simple, fast instructions", "A design using a larger set of complex, multi-step instructions", "Overlapping instruction stages to increase throughput", "Small, fast memory close to the CPU storing frequently used data"],
      correct_pairs: [
        ["RISC", "A design using a small set of simple, fast instructions"],
        ["CISC", "A design using a larger set of complex, multi-step instructions"],
        ["Pipelining", "Overlapping instruction stages to increase throughput"],
        ["Cache", "Small, fast memory close to the CPU storing frequently used data"],
      ],
      hints: [
        "RISC and CISC are two different philosophies for instruction set design.",
        "Cache and pipelining are both performance techniques, but one is about memory and the other about instruction overlap.",
      ],
      solution_summary: "RISC uses simple fast instructions, CISC uses complex multi-step instructions, pipelining overlaps instruction stages, and cache is fast memory near the CPU for frequently used data.",
      key_concepts: ["RISC", "CISC", "pipelining", "cache"],
    },
  ],
  calling_an_api_practically: [
    {
      id: "calling_an_api_practically_jv1",
      type: "order",
      prompt: "Put these steps in order to describe calling an LLM API in real code, using the restaurant-ordering analogy.",
      shuffled_items: [
        "A request is formatted exactly the way the API expects.",
        "The request is sent to the API endpoint.",
        "The caller waits a genuine amount of time for the response.",
        "The response is received and used in the calling code.",
      ],
      items: [
        "A request is formatted exactly the way the API expects.",
        "The request is sent to the API endpoint.",
        "The caller waits a genuine amount of time for the response.",
        "The response is received and used in the calling code.",
      ],
      hints: [
        "The request must be properly formatted before it can be sent.",
        "Waiting happens after the request is sent, before the response arrives.",
      ],
      solution_summary: "A request is formatted as expected → it's sent to the endpoint → the caller waits for a response → the response is received and used.",
      key_concepts: ["API call", "LLM API", "request/response"],
    },
    {
      id: "calling_an_api_practically_jv2",
      type: "choice",
      prompt: "What does the restaurant-ordering analogy emphasize about calling an LLM API?",
      options: [
        "That responses arrive instantly with no wait at all",
        "That the request must be in the specific form the service expects, and some real wait time is involved",
        "That the caller can order anything, regardless of what the API actually supports",
        "That APIs never return anything usable",
      ],
      correct_index: 1,
      hints: [
        "Ordering from a menu means choosing from what's actually offered, in the expected form.",
        "The analogy explicitly mentions waiting a real amount of time before the food (response) comes back.",
      ],
      solution_summary: "The analogy emphasizes that a request must be formatted the way the API expects, and a genuine wait time is involved before the response comes back.",
      key_concepts: ["API call", "LLM API"],
    },
    {
      id: "calling_an_api_practically_jv3",
      type: "match",
      prompt: "Match each LLM API term to its meaning.",
      left: ["API key", "Endpoint", "Payload", "Response"],
      right: ["Credential authorizing access to the API", "The specific URL the request is sent to", "The formatted data sent as part of the request", "The data returned back after the request is processed"],
      correct_pairs: [
        ["API key", "Credential authorizing access to the API"],
        ["Endpoint", "The specific URL the request is sent to"],
        ["Payload", "The formatted data sent as part of the request"],
        ["Response", "The data returned back after the request is processed"],
      ],
      hints: [
        "The API key proves who is making the request, similar to a credential.",
        "The payload is what's sent; the response is what comes back.",
      ],
      solution_summary: "An API key authorizes access, the endpoint is the target URL, the payload is the sent data, and the response is what's returned after processing.",
      key_concepts: ["API key", "endpoint", "payload"],
    },
  ],
  system_vs_user_prompts: [
    {
      id: "system_vs_user_prompts_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a system prompt and user prompt work together, using the theater-actor analogy.",
      shuffled_items: [
        "A director gives an actor private notes on who the character fundamentally is.",
        "The actor takes the stage, already shaped by those private notes.",
        "Another character says a specific line to the actor in a given scene.",
        "The actor responds according to both the underlying character notes and the specific line.",
      ],
      items: [
        "A director gives an actor private notes on who the character fundamentally is.",
        "The actor takes the stage, already shaped by those private notes.",
        "Another character says a specific line to the actor in a given scene.",
        "The actor responds according to both the underlying character notes and the specific line.",
      ],
      hints: [
        "The director's notes (system prompt) are established before the actor ever performs a scene.",
        "The specific in-scene line (user prompt) triggers the actual response.",
      ],
      solution_summary: "The director gives underlying character notes → the actor takes the stage shaped by them → a specific line is delivered in-scene → the actor responds based on both.",
      key_concepts: ["system prompt", "user prompt", "LLM prompting"],
    },
    {
      id: "system_vs_user_prompts_jv2",
      type: "choice",
      prompt: "Based on the theater-actor analogy, what does a system prompt correspond to?",
      options: [
        "A single line spoken by another character in one scene",
        "The director's private, overarching notes on who the character fundamentally is",
        "The applause from the audience after a performance",
        "A random line the actor improvises with no direction at all",
      ],
      correct_index: 1,
      hints: [
        "The system prompt sets the model's overall persona and behavior, like the director's private notes.",
        "The user prompt is closer to the specific line spoken in a given scene.",
      ],
      solution_summary: "A system prompt corresponds to the director's private, overarching notes on who the character fundamentally is and how they should generally behave.",
      key_concepts: ["system prompt", "user prompt"],
    },
    {
      id: "system_vs_user_prompts_jv3",
      type: "match",
      prompt: "Match each prompting term to its role.",
      left: ["System prompt", "User prompt", "Persona", "Instruction"],
      right: ["Sets overall behavior and context before any conversation starts", "The specific message a user sends in a given exchange", "The overall character or role the model is meant to adopt", "A directive telling the model what to do in this specific case"],
      correct_pairs: [
        ["System prompt", "Sets overall behavior and context before any conversation starts"],
        ["User prompt", "The specific message a user sends in a given exchange"],
        ["Persona", "The overall character or role the model is meant to adopt"],
        ["Instruction", "A directive telling the model what to do in this specific case"],
      ],
      hints: [
        "The system prompt is set once, before the conversation begins; the user prompt happens per turn.",
        "A persona is often established via the system prompt.",
      ],
      solution_summary: "The system prompt sets overall behavior before the conversation, the user prompt is the per-turn message, a persona is the adopted role, and an instruction directs a specific action.",
      key_concepts: ["system prompt", "user prompt", "persona"],
    },
  ],
  structured_output: [
    {
      id: "structured_output_jv1",
      type: "order",
      prompt: "Put these steps in order to describe why structured output is requested instead of free-form text.",
      shuffled_items: [
        "A developer needs specific numbers to feed directly into a spreadsheet formula.",
        "Asking the model to 'just tell me the important numbers' returns a well-written paragraph.",
        "The developer instead explicitly requests a clean, predictable table or JSON format.",
        "The returned structured data can be parsed and used directly by code.",
      ],
      items: [
        "Asking the model to 'just tell me the important numbers' returns a well-written paragraph.",
        "A developer needs specific numbers to feed directly into a spreadsheet formula.",
        "The developer instead explicitly requests a clean, predictable table or JSON format.",
        "The returned structured data can be parsed and used directly by code.",
      ],
      hints: [
        "The free-form paragraph problem is described before the concrete downstream need for exact numbers.",
        "Requesting structured output is the fix that comes after realizing the need.",
      ],
      solution_summary: "A free-form request returns a paragraph → the developer actually needs exact numbers for a spreadsheet → structured output is explicitly requested → the result can be parsed and used directly by code.",
      key_concepts: ["structured output", "JSON", "parsing"],
    },
    {
      id: "structured_output_jv2",
      type: "choice",
      prompt: "Why does structured output matter for feeding LLM responses into other software?",
      options: [
        "Because free-form paragraphs are always factually wrong",
        "Because a predictable, consistent format like JSON can be parsed reliably by code, unlike unpredictable prose",
        "Because structured output is always shorter than free text",
        "Because only structured output can ever be shown to a user",
      ],
      correct_index: 1,
      hints: [
        "The spreadsheet example: exact numbers, not prose, are needed to feed a formula.",
        "Predictability is what makes code able to reliably extract the data.",
      ],
      solution_summary: "Structured output matters because a predictable, consistent format can be reliably parsed by code, unlike unpredictable free-form prose.",
      key_concepts: ["structured output", "JSON"],
    },
    {
      id: "structured_output_jv3",
      type: "match",
      prompt: "Match each structured-output term to its meaning.",
      left: ["Structured output", "JSON schema", "Parsing", "Free-form text"],
      right: ["A response in a predictable, consistent format like a table or JSON", "A definition specifying the exact expected shape of a structured response", "Extracting specific data programmatically from a response", "Unstructured prose that varies in format each time"],
      correct_pairs: [
        ["Structured output", "A response in a predictable, consistent format like a table or JSON"],
        ["JSON schema", "A definition specifying the exact expected shape of a structured response"],
        ["Parsing", "Extracting specific data programmatically from a response"],
        ["Free-form text", "Unstructured prose that varies in format each time"],
      ],
      hints: [
        "A JSON schema is what enforces the exact shape of the structured output.",
        "Parsing is only reliable once the output's format is predictable.",
      ],
      solution_summary: "Structured output is a predictable format, a JSON schema defines its exact shape, parsing extracts data from it programmatically, and free-form text is unpredictable prose by contrast.",
      key_concepts: ["structured output", "JSON schema", "parsing"],
    },
  ],
  prompt_chaining: [
    {
      id: "prompt_chaining_jv1",
      type: "order",
      prompt: "Put these steps in order to describe prompt chaining, using the research-report analogy.",
      shuffled_items: [
        "Raw notes are gathered first.",
        "The notes are organized into a rough outline.",
        "A full section is drafted from that outline.",
        "The draft is carefully revised afterward.",
      ],
      items: [
        "Raw notes are gathered first.",
        "The notes are organized into a rough outline.",
        "A full section is drafted from that outline.",
        "The draft is carefully revised afterward.",
      ],
      hints: [
        "Notes must exist before they can be organized into an outline.",
        "Revision happens only after a full draft already exists.",
      ],
      solution_summary: "Raw notes are gathered → they're organized into an outline → a section is drafted from the outline → the draft is revised, each step feeding the next.",
      key_concepts: ["prompt chaining", "multi-step LLM workflow"],
    },
    {
      id: "prompt_chaining_jv2",
      type: "choice",
      prompt: "What defines prompt chaining, based on the research-report analogy?",
      options: [
        "Sending the exact same prompt to the model multiple times with no change",
        "Breaking a task into multiple steps, where each step's output feeds directly into the next",
        "Asking multiple unrelated questions in a single request",
        "Only ever using one single prompt for an entire complex task",
      ],
      correct_index: 1,
      hints: [
        "Notes → outline → draft → revision: each step depends on the one before it.",
        "The core idea is a chain of dependent steps, not repetition or unrelated questions.",
      ],
      solution_summary: "Prompt chaining breaks a complex task into multiple steps where each step's output feeds directly into the next, like drafting a report in stages.",
      key_concepts: ["prompt chaining"],
    },
    {
      id: "prompt_chaining_jv3",
      type: "match",
      prompt: "Match each prompt-chaining term to its meaning.",
      left: ["Prompt chain", "Intermediate output", "Final output", "Step"],
      right: ["A sequence of prompts where each depends on the previous result", "The result of one step used as input to the next", "The end result after all steps in the chain complete", "One individual stage within the overall chain"],
      correct_pairs: [
        ["Prompt chain", "A sequence of prompts where each depends on the previous result"],
        ["Intermediate output", "The result of one step used as input to the next"],
        ["Final output", "The end result after all steps in the chain complete"],
        ["Step", "One individual stage within the overall chain"],
      ],
      hints: [
        "An intermediate output is not the end goal — it feeds the next step.",
        "The final output only exists once every step in the chain has run.",
      ],
      solution_summary: "A prompt chain is a sequence of dependent prompts, an intermediate output feeds the next step, the final output is the end result, and a step is one individual stage.",
      key_concepts: ["prompt chaining", "intermediate output"],
    },
  ],
  vector_databases: [
    {
      id: "vector_databases_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a vector database finds similar items, using the music-recommendation analogy.",
      shuffled_items: [
        "A song is converted into a vector representing its deeper qualities.",
        "A user's liked songs are each converted into their own vectors.",
        "The database searches for vectors that are close to the user's liked vectors.",
        "Songs with similar vectors are recommended, even if their titles share no words.",
      ],
      items: [
        "A song is converted into a vector representing its deeper qualities.",
        "A user's liked songs are each converted into their own vectors.",
        "The database searches for vectors that are close to the user's liked vectors.",
        "Songs with similar vectors are recommended, even if their titles share no words.",
      ],
      hints: [
        "A song must first be converted into a vector before any comparison can happen.",
        "Recommendations are the final result of comparing closeness between vectors.",
      ],
      solution_summary: "A song becomes a vector → liked songs are each converted into vectors too → the database finds vectors close to those → similar songs are recommended, regardless of title overlap.",
      key_concepts: ["vector database", "embeddings", "similarity search"],
    },
    {
      id: "vector_databases_jv2",
      type: "choice",
      prompt: "What problem does a vector database solve, based on the music-recommendation analogy?",
      options: [
        "Matching items by literal, character-for-character title comparison",
        "Finding items that are similar in some deeper sense, even when their surface text shares nothing in common",
        "Storing only exact duplicate copies of data",
        "Sorting items alphabetically by title",
      ],
      correct_index: 1,
      hints: [
        "The recommendation isn't based on matching titles character-for-character.",
        "Vectors capture deeper similarity, not literal text matching.",
      ],
      solution_summary: "A vector database finds items that are similar in some deeper sense, even when their titles or surface text share nothing in common.",
      key_concepts: ["vector database", "similarity search"],
    },
    {
      id: "vector_databases_jv3",
      type: "match",
      prompt: "Match each vector database term to its meaning.",
      left: ["Vector", "Embedding", "Similarity search", "Nearest neighbor"],
      right: ["A numeric representation capturing an item's deeper qualities", "The process of converting an item into its vector representation", "Finding items whose vectors are close to a given vector", "The closest matching vector(s) found for a given query"],
      correct_pairs: [
        ["Vector", "A numeric representation capturing an item's deeper qualities"],
        ["Embedding", "The process of converting an item into its vector representation"],
        ["Similarity search", "Finding items whose vectors are close to a given vector"],
        ["Nearest neighbor", "The closest matching vector(s) found for a given query"],
      ],
      hints: [
        "Embedding is the verb — the act of producing a vector.",
        "Nearest neighbor is the specific result returned by a similarity search.",
      ],
      solution_summary: "A vector numerically represents deeper qualities, embedding is the process producing a vector, similarity search finds close vectors, and nearest neighbor is the closest match found.",
      key_concepts: ["vector database", "embedding", "nearest neighbor"],
    },
  ],
  cost_latency_tradeoffs: [
    {
      id: "cost_latency_tradeoffs_jv1",
      type: "order",
      prompt: "Put these steps in order to describe the cost/latency tradeoff when choosing an LLM setup, using the shipping analogy.",
      shuffled_items: [
        "A developer needs to decide how to serve LLM responses to users.",
        "Overnight shipping costs more but arrives faster; standard shipping costs less but takes longer.",
        "A faster, more expensive model call reduces latency but increases cost per request.",
        "The developer picks the tradeoff that fits their actual budget and speed needs.",
      ],
      items: [
        "A developer needs to decide how to serve LLM responses to users.",
        "Overnight shipping costs more but arrives faster; standard shipping costs less but takes longer.",
        "A faster, more expensive model call reduces latency but increases cost per request.",
        "The developer picks the tradeoff that fits their actual budget and speed needs.",
      ],
      hints: [
        "The shipping analogy is introduced to illustrate the tradeoff before it's applied to LLMs.",
        "The final decision depends on the specific tradeoff already described.",
      ],
      solution_summary: "A developer must decide how to serve responses → the shipping analogy illustrates cost vs speed → a faster model call reduces latency but costs more → the developer picks what fits their needs.",
      key_concepts: ["cost", "latency", "tradeoffs"],
    },
    {
      id: "cost_latency_tradeoffs_jv2",
      type: "choice",
      prompt: "What does the shipping analogy illustrate about cost and latency when building with LLMs?",
      options: [
        "That one option is always unconditionally better than the other",
        "That lower cost and lower latency are always achieved together automatically",
        "That there's a real tradeoff between how much you're willing to pay and how long you're willing to wait",
        "That latency has no relationship to cost at all",
      ],
      correct_index: 2,
      hints: [
        "Overnight shipping costs more but arrives faster; standard shipping costs less but takes longer.",
        "The analogy explicitly frames this as a genuine tradeoff, not a simple 'better vs worse' choice.",
      ],
      solution_summary: "The shipping analogy illustrates a genuine tradeoff between how much you're willing to pay and how long you're willing to wait, directly paralleling cost vs latency in LLM systems.",
      key_concepts: ["cost", "latency", "tradeoffs"],
    },
    {
      id: "cost_latency_tradeoffs_jv3",
      type: "match",
      prompt: "Match each cost/latency term to its meaning.",
      left: ["Latency", "Cost per request", "Throughput", "Model size"],
      right: ["The time it takes to receive a response", "The price paid for a single API call", "How many requests can be handled over a given time", "A factor that often increases both cost and latency"],
      correct_pairs: [
        ["Latency", "The time it takes to receive a response"],
        ["Cost per request", "The price paid for a single API call"],
        ["Throughput", "How many requests can be handled over a given time"],
        ["Model size", "A factor that often increases both cost and latency"],
      ],
      hints: [
        "Latency is about speed of a single response; throughput is about overall volume handled.",
        "Larger models often cost more and take longer to run per request.",
      ],
      solution_summary: "Latency is response time, cost per request is the price of one call, throughput is overall request-handling capacity, and model size often drives both cost and latency up.",
      key_concepts: ["latency", "cost", "throughput"],
    },
  ],
  vibecoding_backstage: [
    {
      id: "vibecoding_backstage_jv1",
      type: "order",
      prompt: "Put these steps in order to describe what actually underlies effective 'vibecoding,' using the musician analogy.",
      shuffled_items: [
        "A musician improvises fluidly on stage, looking effortless.",
        "Years of deliberate scales and exercises sit quietly underneath every note.",
        "A developer directs an AI fluidly, appearing to skip traditional coding entirely.",
        "Real understanding of what's being built still underlies that fluid direction.",
      ],
      items: [
        "A musician improvises fluidly on stage, looking effortless.",
        "Years of deliberate scales and exercises sit quietly underneath every note.",
        "A developer directs an AI fluidly, appearing to skip traditional coding entirely.",
        "Real understanding of what's being built still underlies that fluid direction.",
      ],
      hints: [
        "The musician's practice room is revealed as underlying the seemingly effortless performance.",
        "The developer's real understanding parallels the musician's hidden practice.",
      ],
      solution_summary: "A musician appears to improvise effortlessly → years of hidden practice actually underlie it → a developer appears to fluidly direct an AI → real understanding still underlies that fluid direction.",
      key_concepts: ["vibecoding", "AI-assisted development"],
    },
    {
      id: "vibecoding_backstage_jv2",
      type: "choice",
      prompt: "What does the musician-improvisation analogy suggest about effective 'vibecoding'?",
      options: [
        "That no underlying understanding or fundamentals are ever needed",
        "That apparent effortlessness is actually built on genuine underlying understanding and fundamentals",
        "That AI tools eliminate the need for any technical judgment whatsoever",
        "That vibecoding is identical to having no plan or direction at all",
      ],
      correct_index: 1,
      hints: [
        "The musician's practice room shows deliberate fundamentals underlying the effortless performance.",
        "The analogy is about hidden preparation, not the absence of skill.",
      ],
      solution_summary: "The analogy suggests that apparent effortlessness in vibecoding is actually built on genuine underlying understanding and fundamentals, just like a musician's hidden practice.",
      key_concepts: ["vibecoding", "AI-assisted development"],
    },
    {
      id: "vibecoding_backstage_jv3",
      type: "match",
      prompt: "Match each vibecoding-related term to its meaning.",
      left: ["Vibecoding", "Fundamentals", "AI-assisted development", "Practice room"],
      right: ["Directing an AI fluidly to build software, appearing effortless on the surface", "The deliberate underlying skills that make fluid direction possible", "Using AI tools as part of the software-building process", "The unglamorous, hidden preparation behind a skilled performance"],
      correct_pairs: [
        ["Vibecoding", "Directing an AI fluidly to build software, appearing effortless on the surface"],
        ["Fundamentals", "The deliberate underlying skills that make fluid direction possible"],
        ["AI-assisted development", "Using AI tools as part of the software-building process"],
        ["Practice room", "The unglamorous, hidden preparation behind a skilled performance"],
      ],
      hints: [
        "Fundamentals are what's hidden behind the effortless-looking surface.",
        "The practice room is the direct analogy for that hidden preparation.",
      ],
      solution_summary: "Vibecoding is fluidly directing an AI to build software, fundamentals are the underlying skills enabling it, AI-assisted development broadly describes using AI tools, and the practice room represents the hidden preparation behind it.",
      key_concepts: ["vibecoding", "fundamentals"],
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
