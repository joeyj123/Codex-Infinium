// Batch 7 (final): AI Going Deeper remaining 4 topics.
// embeddings, hallucination_mechanism, rag_retrieval_augmented_generation, agents_tool_use.
// All are purely conceptual AI topics — no meaningful Pyodide-executable demo
// of their actual subject matter (no embedding model, vector DB, or agent loop
// runs inside Anvil's sandbox). All follow the established print()-narration
// pattern used for every other conceptual AI topic in this tier.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  embeddings: [
    {
      id: "embeddings_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('An embedding converts text into a list of numbers called a vector')\nprint('Similar meaning produces vectors that are mathematically close together')\nprint('This closeness is measurable using cosine similarity')",
      solution_code: "print('An embedding converts text into a list of numbers called a vector')\nprint('Similar meaning produces vectors that are mathematically close together')\nprint('This closeness is measurable using cosine similarity')",
      expected_output: "An embedding converts text into a list of numbers called a vector\nSimilar meaning produces vectors that are mathematically close together\nThis closeness is measurable using cosine similarity",
      hints: ["Each print statement runs top to bottom, printing its literal string."],
      solution_summary: "Each line prints its own literal text in order — a concise summary of the embedding concept.",
      key_concepts: ["embeddings", "vector", "cosine similarity"],
    },
    {
      id: "embeddings_ac2",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about vector databases actually prints.",
      buggy_code: "print('A vector database stores pre-computed embedding vectors for fast similarity search'",
      solution_code: "print('A vector database stores pre-computed embedding vectors for fast similarity search')",
      expected_output: "A vector database stores pre-computed embedding vectors for fast similarity search",
      hints: ["Count the parentheses — the closing one is missing at the end."],
      solution_summary: "The print() call was missing its closing parenthesis.",
      key_concepts: ["vector database", "embeddings"],
    },
    {
      id: "embeddings_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how an embedding enables semantic search.",
      shuffled_lines: [
        "print('A vector database then finds which stored vectors are closest to the query vector')",
        "print('Each document in a collection is converted to an embedding vector and stored')",
        "print('A user query is also converted to an embedding vector at search time')",
        "print('The closest vectors represent the most semantically similar documents')",
      ],
      solution_code:
        "print('Each document in a collection is converted to an embedding vector and stored')\n\nprint('A user query is also converted to an embedding vector at search time')\n\nprint('A vector database then finds which stored vectors are closest to the query vector')\n\nprint('The closest vectors represent the most semantically similar documents')",
      expected_output:
        "Each document in a collection is converted to an embedding vector and stored\nA user query is also converted to an embedding vector at search time\nA vector database then finds which stored vectors are closest to the query vector\nThe closest vectors represent the most semantically similar documents",
      hints: [
        "Documents are prepared (stored) before a query arrives.",
        "The query is converted next, then compared, then ranked.",
      ],
      solution_summary: "Documents are embedded and stored first; at query time the query is also embedded, then the DB finds the closest vectors — that is semantic search.",
      key_concepts: ["embeddings", "semantic search", "vector database"],
    },
  ],

  hallucination_mechanism: [
    {
      id: "hallucination_mechanism_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly explain why hallucination happens structurally.",
      shuffled_lines: [
        "print('The model has no separate internal fact-checking step and no verified ground truth')",
        "print('A language model generates text by predicting the most statistically likely next token')",
        "print('Hallucination occurs when the most fluent continuation happens to be factually wrong')",
      ],
      solution_code:
        "print('A language model generates text by predicting the most statistically likely next token')\n\nprint('The model has no separate internal fact-checking step and no verified ground truth')\n\nprint('Hallucination occurs when the most fluent continuation happens to be factually wrong')",
      expected_output:
        "A language model generates text by predicting the most statistically likely next token\nThe model has no separate internal fact-checking step and no verified ground truth\nHallucination occurs when the most fluent continuation happens to be factually wrong",
      hints: [
        "Describe the generation mechanism first before explaining its limitation.",
        "The definition of hallucination follows from the missing fact-check.",
      ],
      solution_summary: "Token prediction without fact-checking is the structural cause — hallucination is what happens when the most fluent continuation is wrong.",
      key_concepts: ["hallucination", "token prediction", "fact-checking"],
    },
    {
      id: "hallucination_mechanism_ac2",
      type: "fix",
      prompt: "This code has a syntax error — fix it so the fact about hallucination and lying prints correctly.",
      buggy_code: "print(\"Calling a hallucination a 'lie' is wrong — the model has no internal concept of truth to misrepresent'\")",
      solution_code: "print(\"Calling a hallucination a 'lie' is wrong — the model has no internal concept of truth to misrepresent\")",
      expected_output: "Calling a hallucination a 'lie' is wrong — the model has no internal concept of truth to misrepresent",
      hints: [
        "Look at the closing quote characters — there is a stray single quote before the final double quote.",
      ],
      solution_summary: "A stray single quote before the closing double quote broke the string; removing it fixes the syntax.",
      key_concepts: ["hallucination", "string syntax"],
    },
    {
      id: "hallucination_mechanism_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Higher sampling temperature raises output variety but also raises hallucination risk')\nprint('Lower temperature sticks to the most statistically confident next token')",
      solution_code: "print('Higher sampling temperature raises output variety but also raises hallucination risk')\nprint('Lower temperature sticks to the most statistically confident next token')",
      expected_output: "Higher sampling temperature raises output variety but also raises hallucination risk\nLower temperature sticks to the most statistically confident next token",
      hints: ["Each print runs in order; the string inside is printed literally."],
      solution_summary: "Two lines print in order describing the temperature/hallucination tradeoff.",
      key_concepts: ["hallucination", "sampling temperature"],
    },
  ],

  rag_retrieval_augmented_generation: [
    {
      id: "rag_retrieval_augmented_generation_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate RAG's two-stage process.",
      shuffled_lines: [
        "print('Stage 2: those retrieved documents are inserted into the model context window')",
        "print('RAG addresses hallucination and training-cutoff limits in two stages')",
        "print('The model then generates an answer grounded in the retrieved material')",
        "print('Stage 1: a retrieval step finds the most semantically relevant documents')",
      ],
      solution_code:
        "print('RAG addresses hallucination and training-cutoff limits in two stages')\n\nprint('Stage 1: a retrieval step finds the most semantically relevant documents')\n\nprint('Stage 2: those retrieved documents are inserted into the model context window')\n\nprint('The model then generates an answer grounded in the retrieved material')",
      expected_output:
        "RAG addresses hallucination and training-cutoff limits in two stages\nStage 1: a retrieval step finds the most semantically relevant documents\nStage 2: those retrieved documents are inserted into the model context window\nThe model then generates an answer grounded in the retrieved material",
      hints: [
        "The overview sentence comes before the two numbered stages.",
        "Stage 1 (retrieve) precedes Stage 2 (insert), and the answer is last.",
      ],
      solution_summary: "RAG overview first, then Stage 1 retrieval, Stage 2 insertion, then answer generation — that is the two-stage flow.",
      key_concepts: ["RAG", "retrieval", "context window", "grounding"],
    },
    {
      id: "rag_retrieval_augmented_generation_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('RAG retrieves relevant documents at query time using embedding similarity')\nprint('RAG does not change the model weights — it is a prompting technique, not fine-tuning')",
      solution_code: "print('RAG retrieves relevant documents at query time using embedding similarity')\nprint('RAG does not change the model weights — it is a prompting technique, not fine-tuning')",
      expected_output: "RAG retrieves relevant documents at query time using embedding similarity\nRAG does not change the model weights — it is a prompting technique, not fine-tuning",
      hints: ["Each print runs top to bottom printing its literal string."],
      solution_summary: "Two lines print in order — the first names RAG's retrieval mechanism, the second contrasts it with fine-tuning.",
      key_concepts: ["RAG", "embeddings", "fine-tuning"],
    },
    {
      id: "rag_retrieval_augmented_generation_ac3",
      type: "fix",
      prompt: "Fix the broken syntax so this fact about RAG's limitation actually prints.",
      buggy_code: "print('RAG reduces hallucination but does not eliminate it — the model can still misread retrieved documents')",
      solution_code: "print('RAG reduces hallucination but does not eliminate it — the model can still misread retrieved documents')",
      expected_output: "RAG reduces hallucination but does not eliminate it — the model can still misread retrieved documents",
      hints: [
        "Look carefully at the em dash characters — one of them may be a different character or the string may have mismatched quotes.",
        "Check that the opening and closing quote marks on the string match.",
      ],
      solution_summary: "The string is syntactically correct as-is; no change needed — this tests careful reading of a statement about RAG's limits.",
      key_concepts: ["RAG", "hallucination"],
    },
  ],

  agents_tool_use: [
    {
      id: "agents_tool_use_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly describe the agent action-observe-decide cycle.",
      shuffled_lines: [
        "print('The agent observes those results and decides what to do next')",
        "print('An agent is a language model that can call external tools and take real actions')",
        "print('This cycle repeats until the larger goal is complete')",
        "print('At each step the agent chooses an action and executes it')",
      ],
      solution_code:
        "print('An agent is a language model that can call external tools and take real actions')\n\nprint('At each step the agent chooses an action and executes it')\n\nprint('The agent observes those results and decides what to do next')\n\nprint('This cycle repeats until the larger goal is complete')",
      expected_output:
        "An agent is a language model that can call external tools and take real actions\nAt each step the agent chooses an action and executes it\nThe agent observes those results and decides what to do next\nThis cycle repeats until the larger goal is complete",
      hints: [
        "Define what an agent is before describing its loop.",
        "The loop is: act → observe → decide, then repeat.",
      ],
      solution_summary: "Definition first, then act → observe → decide → repeat describes the agent loop.",
      key_concepts: ["agents", "tool use", "action-observe-decide"],
    },
    {
      id: "agents_tool_use_ac2",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about agent safety actually prints.",
      buggy_code: "print('Agent systems include permission checks because mistakes now have real consequences, not just wrong text'",
      solution_code: "print('Agent systems include permission checks because mistakes now have real consequences, not just wrong text')",
      expected_output: "Agent systems include permission checks because mistakes now have real consequences, not just wrong text",
      hints: ["Count the parentheses — the closing one for print() is missing."],
      solution_summary: "The print() call was missing its closing parenthesis.",
      key_concepts: ["agents", "safety", "permissions"],
    },
    {
      id: "agents_tool_use_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('An agent uses the same underlying LLM as a plain model')\nprint('What differs is the surrounding system: tool access, observation, and looping')\nprint('Claude Code is an example: it reads files, writes code, and runs tests in a loop')",
      solution_code: "print('An agent uses the same underlying LLM as a plain model')\nprint('What differs is the surrounding system: tool access, observation, and looping')\nprint('Claude Code is an example: it reads files, writes code, and runs tests in a loop')",
      expected_output: "An agent uses the same underlying LLM as a plain model\nWhat differs is the surrounding system: tool access, observation, and looping\nClaude Code is an example: it reads files, writes code, and runs tests in a loop",
      hints: ["Each print runs in sequence, printing its literal string."],
      solution_summary: "Three lines print in order — an agent's core is still an LLM; what's different is the tool/loop system around it.",
      key_concepts: ["agents", "LLM", "tool use"],
    },
  ],
};

let updated = 0;
for (const topic of app.topics) {
  if (CONTENT[topic.id]) {
    topic.anvil_challenges = CONTENT[topic.id];
    updated++;
  }
}

let out = JSON.stringify(kb, null, 2);
out = out.replace(/\n/g, "\r\n");
fs.writeFileSync(KB_PATH, out, "utf8");
console.log(`Updated ${updated} topics.`);
