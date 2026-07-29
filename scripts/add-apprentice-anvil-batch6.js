// Batch 6: rest of AI (symbolic_vs_ml, neural_networks_basics,
// training_vs_inference, what_is_an_llm, prompting_basics,
// ai_limitations_ethics), start of AI Going Deeper (tokens_tokenization,
// model_parameters_size, context_window, finetuning_vs_prompting).
//
// All 10 are conceptual AI/ML topics with no meaningful executable Python
// demonstration of their actual subject matter (no neural net, tokenizer,
// or LLM runs inside Anvil's sandbox) — all follow the established
// print()-narration pattern used for every other purely conceptual topic
// in this tier (survey_javascript, what_is_json, what_is_git, ai_history).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  symbolic_vs_ml: [
    {
      id: "symbolic_vs_ml_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the core tradeoff between symbolic AI and machine learning.",
      shuffled_lines: [
        "print('Machine learning instead learns statistical patterns directly from training data')",
        "print('Symbolic AI represents knowledge explicitly as human-written logical rules')",
        "print('Symbolic AI trades flexibility for transparency; ML trades transparency for flexibility')",
      ],
      solution_code:
        "print('Symbolic AI represents knowledge explicitly as human-written logical rules')\n\nprint('Machine learning instead learns statistical patterns directly from training data')\n\nprint('Symbolic AI trades flexibility for transparency; ML trades transparency for flexibility')",
      expected_output:
        "Symbolic AI represents knowledge explicitly as human-written logical rules\nMachine learning instead learns statistical patterns directly from training data\nSymbolic AI trades flexibility for transparency; ML trades transparency for flexibility",
      hints: [
        "Define symbolic AI before contrasting it with machine learning.",
        "The summary tradeoff line is the conclusion, so it comes last.",
      ],
      solution_summary: "Symbolic AI uses explicit human-written rules; ML learns patterns from data instead — a real tradeoff between transparency and flexibility.",
      key_concepts: ["symbolic AI", "machine learning"],
    },
    {
      id: "symbolic_vs_ml_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A symbolic system has no way to handle a situation outside its programmed rules')\nprint('A trained ML model is much harder to trace after the fact than explicit rules')",
      solution_code: "print('A symbolic system has no way to handle a situation outside its programmed rules')\nprint('A trained ML model is much harder to trace after the fact than explicit rules')",
      expected_output: "A symbolic system has no way to handle a situation outside its programmed rules\nA trained ML model is much harder to trace after the fact than explicit rules",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["symbolic AI", "brittleness", "explainability"],
    },
    {
      id: "symbolic_vs_ml_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about decision trees actually prints.",
      buggy_code: "print('A decision tree remains genuinely traceable and human-inspectable after training)",
      solution_code: "print('A decision tree remains genuinely traceable and human-inspectable after training')",
      expected_output: "A decision tree remains genuinely traceable and human-inspectable after training",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "decision tree"],
    },
  ],

  neural_networks_basics: [
    {
      id: "neural_networks_basics_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how a neural network processes input.",
      shuffled_lines: [
        "print('Each neuron\\'s new value is a weighted sum of incoming values, then a nonlinear function')",
        "print('Input data enters at the input layer')",
        "print('This transformation repeats layer by layer until reaching the output layer')",
      ],
      solution_code:
        "print('Input data enters at the input layer')\n\nprint('Each neuron\\'s new value is a weighted sum of incoming values, then a nonlinear function')\n\nprint('This transformation repeats layer by layer until reaching the output layer')",
      expected_output:
        "Input data enters at the input layer\nEach neuron's new value is a weighted sum of incoming values, then a nonlinear function\nThis transformation repeats layer by layer until reaching the output layer",
      hints: [
        "Input has to enter before any layer can transform it.",
        "Reaching the output layer is the final step, so it comes last.",
      ],
      solution_summary: "Input enters the input layer, each layer computes a weighted sum plus nonlinearity, and this repeats until the output layer.",
      key_concepts: ["neural network", "layers", "weights"],
    },
    {
      id: "neural_networks_basics_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Weights start out essentially random and get adjusted during training')\nprint('This process is called backpropagation combined with gradient descent')",
      solution_code: "print('Weights start out essentially random and get adjusted during training')\nprint('This process is called backpropagation combined with gradient descent')",
      expected_output: "Weights start out essentially random and get adjusted during training\nThis process is called backpropagation combined with gradient descent",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["backpropagation", "gradient descent"],
    },
    {
      id: "neural_networks_basics_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about deep learning actually prints.",
      buggy_code: "print('Deep learning refers to a network with many hidden layers stacked together)",
      solution_code: "print('Deep learning refers to a network with many hidden layers stacked together')",
      expected_output: "Deep learning refers to a network with many hidden layers stacked together",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "deep learning"],
    },
  ],

  training_vs_inference: [
    {
      id: "training_vs_inference_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the cost asymmetry between training and inference.",
      shuffled_lines: [
        "print('Inference reuses those already-fixed weights to produce an answer for a new input')",
        "print('Training adjusts a network\\'s weights, requiring enormous, expensive compute')",
        "print('This cost gap lets one expensive training run serve millions of cheap inference requests')",
      ],
      solution_code:
        "print('Training adjusts a network\\'s weights, requiring enormous, expensive compute')\n\nprint('Inference reuses those already-fixed weights to produce an answer for a new input')\n\nprint('This cost gap lets one expensive training run serve millions of cheap inference requests')",
      expected_output:
        "Training adjusts a network's weights, requiring enormous, expensive compute\nInference reuses those already-fixed weights to produce an answer for a new input\nThis cost gap lets one expensive training run serve millions of cheap inference requests",
      hints: [
        "Training has to happen before there are fixed weights for inference to reuse.",
        "The economic payoff is the conclusion, so it comes last.",
      ],
      solution_summary: "Training is expensive weight-adjustment; inference cheaply reuses fixed weights, letting one training run serve many users.",
      key_concepts: ["training", "inference"],
    },
    {
      id: "training_vs_inference_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('No learning or weight adjustment happens during inference at all')\nprint('One complete pass through an entire training dataset is called an epoch')",
      solution_code: "print('No learning or weight adjustment happens during inference at all')\nprint('One complete pass through an entire training dataset is called an epoch')",
      expected_output: "No learning or weight adjustment happens during inference at all\nOne complete pass through an entire training dataset is called an epoch",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["inference", "epoch"],
    },
    {
      id: "training_vs_inference_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about deployed models actually prints.",
      buggy_code: "print('A deployed model\\'s weights are fixed and do not change between requests)",
      solution_code: "print('A deployed model\\'s weights are fixed and do not change between requests')",
      expected_output: "A deployed model's weights are fixed and do not change between requests",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "inference"],
    },
  ],

  what_is_an_llm: [
    {
      id: "what_is_an_llm_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what an LLM's core training task actually requires.",
      shuffled_lines: [
        "print('An LLM\\'s core training task is simply predicting the next token in text')",
        "print('Getting good at that task at scale implicitly requires learning grammar, facts, and reasoning')",
        "print('Generating a response means repeatedly predicting one token at a time')",
      ],
      solution_code:
        "print('An LLM\\'s core training task is simply predicting the next token in text')\n\nprint('Getting good at that task at scale implicitly requires learning grammar, facts, and reasoning')\n\nprint('Generating a response means repeatedly predicting one token at a time')",
      expected_output:
        "An LLM's core training task is simply predicting the next token in text\nGetting good at that task at scale implicitly requires learning grammar, facts, and reasoning\nGenerating a response means repeatedly predicting one token at a time",
      hints: [
        "State the deceptively simple training task before naming what it implicitly requires.",
        "How generation actually happens at inference time is the practical payoff, so it comes last.",
      ],
      solution_summary: "An LLM predicts the next token, which at scale implicitly demands grammar/facts/reasoning, and generation repeats that prediction one token at a time.",
      key_concepts: ["LLM", "next-token prediction"],
    },
    {
      id: "what_is_an_llm_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('An LLM cannot revise something it already generated earlier in a response')\nprint('Pre-training is the initial, enormous training run on a broad, general body of text')",
      solution_code: "print('An LLM cannot revise something it already generated earlier in a response')\nprint('Pre-training is the initial, enormous training run on a broad, general body of text')",
      expected_output: "An LLM cannot revise something it already generated earlier in a response\nPre-training is the initial, enormous training run on a broad, general body of text",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["autoregressive generation", "pre-training"],
    },
    {
      id: "what_is_an_llm_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about LLMs actually prints.",
      buggy_code: "print('Large refers to the total number of parameters a network contains)",
      solution_code: "print('Large refers to the total number of parameters a network contains')",
      expected_output: "Large refers to the total number of parameters a network contains",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "LLM"],
    },
  ],

  prompting_basics: [
    {
      id: "prompting_basics_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why prompt phrasing measurably affects output.",
      shuffled_lines: [
        "print('The model predicts a continuation of exactly the text it was actually given')",
        "print('Being specific rather than vague gives the model less ambiguity to resolve on its own')",
        "print('A prompt is the input text a person provides to a language model')",
      ],
      solution_code:
        "print('A prompt is the input text a person provides to a language model')\n\nprint('The model predicts a continuation of exactly the text it was actually given')\n\nprint('Being specific rather than vague gives the model less ambiguity to resolve on its own')",
      expected_output:
        "A prompt is the input text a person provides to a language model\nThe model predicts a continuation of exactly the text it was actually given\nBeing specific rather than vague gives the model less ambiguity to resolve on its own",
      hints: [
        "Define a prompt before explaining the mechanism behind why it matters.",
        "The specificity takeaway is the practical conclusion, so it comes last.",
      ],
      solution_summary: "A prompt is the model's input; it predicts a continuation of exactly that text, so specificity reduces ambiguity it would otherwise have to guess at.",
      key_concepts: ["prompt", "prompt engineering"],
    },
    {
      id: "prompting_basics_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Few-shot prompting provides concrete examples of the desired output format')\nprint('Chain-of-thought prompting asks a model to think step by step before answering')",
      solution_code: "print('Few-shot prompting provides concrete examples of the desired output format')\nprint('Chain-of-thought prompting asks a model to think step by step before answering')",
      expected_output: "Few-shot prompting provides concrete examples of the desired output format\nChain-of-thought prompting asks a model to think step by step before answering",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["few-shot prompting", "chain-of-thought prompting"],
    },
    {
      id: "prompting_basics_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about prompting actually prints.",
      buggy_code: "print('A longer prompt is not automatically a better one)",
      solution_code: "print('A longer prompt is not automatically a better one')",
      expected_output: "A longer prompt is not automatically a better one",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "prompting"],
    },
  ],

  ai_limitations_ethics: [
    {
      id: "ai_limitations_ethics_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why a model can be confidently wrong.",
      shuffled_lines: [
        "print('This confident-but-false behavior is called hallucination')",
        "print('A model generates output by predicting the statistically most likely next token')",
        "print('It has no built-in signal distinguishing that kind of wrong output from correct output')",
      ],
      solution_code:
        "print('A model generates output by predicting the statistically most likely next token')\n\nprint('It has no built-in signal distinguishing that kind of wrong output from correct output')\n\nprint('This confident-but-false behavior is called hallucination')",
      expected_output:
        "A model generates output by predicting the statistically most likely next token\nIt has no built-in signal distinguishing that kind of wrong output from correct output\nThis confident-but-false behavior is called hallucination",
      hints: [
        "Name the underlying prediction mechanism before naming its consequence.",
        "The formal term (hallucination) is the conclusion, so it comes last.",
      ],
      solution_summary: "Because a model predicts the most likely next token with no built-in correctness check, it can be confidently wrong — hallucination.",
      key_concepts: ["hallucination", "AI limitations"],
    },
    {
      id: "ai_limitations_ethics_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Bias can emerge from patterns already present in a model\\'s training data')\nprint('A human reviewing and verifying meaningful conclusions remains genuinely necessary')",
      solution_code: "print('Bias can emerge from patterns already present in a model\\'s training data')\nprint('A human reviewing and verifying meaningful conclusions remains genuinely necessary')",
      expected_output: "Bias can emerge from patterns already present in a model's training data\nA human reviewing and verifying meaningful conclusions remains genuinely necessary",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["bias", "human oversight"],
    },
    {
      id: "ai_limitations_ethics_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about AI limitations actually prints.",
      buggy_code: "print('Training a large model consumes a substantial amount of electricity)",
      solution_code: "print('Training a large model consumes a substantial amount of electricity')",
      expected_output: "Training a large model consumes a substantial amount of electricity",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "environmental cost"],
    },
  ],

  tokens_tokenization: [
    {
      id: "tokens_tokenization_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how text becomes something a model can compute over.",
      shuffled_lines: [
        "print('Text is broken down into tokens through a preprocessing step called tokenization')",
        "print('A language model doesn\\'t process raw text character by character')",
        "print('Each distinct token is then mapped to a numerical ID the network actually operates on')",
      ],
      solution_code:
        "print('A language model doesn\\'t process raw text character by character')\n\nprint('Text is broken down into tokens through a preprocessing step called tokenization')\n\nprint('Each distinct token is then mapped to a numerical ID the network actually operates on')",
      expected_output:
        "A language model doesn't process raw text character by character\nText is broken down into tokens through a preprocessing step called tokenization\nEach distinct token is then mapped to a numerical ID the network actually operates on",
      hints: [
        "State what the model doesn't do before naming what it does instead.",
        "Mapping tokens to numerical IDs is the final mechanical step, so it comes last.",
      ],
      solution_summary: "Text isn't processed raw — it's tokenized, and each token is mapped to a numerical ID the network actually computes on.",
      key_concepts: ["token", "tokenization"],
    },
    {
      id: "tokens_tokenization_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Common words typically become a single token each')\nprint('Rarer or unfamiliar words are frequently broken into multiple smaller token pieces')",
      solution_code: "print('Common words typically become a single token each')\nprint('Rarer or unfamiliar words are frequently broken into multiple smaller token pieces')",
      expected_output: "Common words typically become a single token each\nRarer or unfamiliar words are frequently broken into multiple smaller token pieces",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["token", "vocabulary"],
    },
    {
      id: "tokens_tokenization_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about tokenization actually prints.",
      buggy_code: "print('A model\\'s context window and pricing are both measured in tokens)",
      solution_code: "print('A model\\'s context window and pricing are both measured in tokens')",
      expected_output: "A model's context window and pricing are both measured in tokens",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "tokenization"],
    },
  ],

  model_parameters_size: [
    {
      id: "model_parameters_size_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the tradeoff a larger parameter count creates.",
      shuffled_lines: [
        "print('A parameter is one of a network\\'s individually adjustable connection weights')",
        "print('More parameters let a model represent more complex patterns and retain more knowledge')",
        "print('But more parameters also require more memory and computational power to run')",
      ],
      solution_code:
        "print('A parameter is one of a network\\'s individually adjustable connection weights')\n\nprint('More parameters let a model represent more complex patterns and retain more knowledge')\n\nprint('But more parameters also require more memory and computational power to run')",
      expected_output:
        "A parameter is one of a network's individually adjustable connection weights\nMore parameters let a model represent more complex patterns and retain more knowledge\nBut more parameters also require more memory and computational power to run",
      hints: [
        "Define a parameter before naming the benefit of having more of them.",
        "The cost tradeoff is the conclusion, so it comes last.",
      ],
      solution_summary: "A parameter is one adjustable weight; more of them add capacity, but at a real memory and compute cost.",
      key_concepts: ["parameter", "model size"],
    },
    {
      id: "model_parameters_size_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Quantization stores each parameter using fewer bits to reduce memory footprint')\nprint('Scaling laws relate parameter count, training data, and compute to performance')",
      solution_code: "print('Quantization stores each parameter using fewer bits to reduce memory footprint')\nprint('Scaling laws relate parameter count, training data, and compute to performance')",
      expected_output: "Quantization stores each parameter using fewer bits to reduce memory footprint\nScaling laws relate parameter count, training data, and compute to performance",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["quantization", "scaling laws"],
    },
    {
      id: "model_parameters_size_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about model size actually prints.",
      buggy_code: "print('Parameter count alone does not reliably predict which model is better)",
      solution_code: "print('Parameter count alone does not reliably predict which model is better')",
      expected_output: "Parameter count alone does not reliably predict which model is better",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "model size"],
    },
  ],

  context_window: [
    {
      id: "context_window_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what a context window actually is.",
      shuffled_lines: [
        "print('This includes the prompt, any provided documents, and prior responses in a conversation')",
        "print('The context window is the maximum amount of text a model can consider at once')",
        "print('Once that limit is exceeded, older content generally gets dropped or summarized')",
      ],
      solution_code:
        "print('The context window is the maximum amount of text a model can consider at once')\n\nprint('This includes the prompt, any provided documents, and prior responses in a conversation')\n\nprint('Once that limit is exceeded, older content generally gets dropped or summarized')",
      expected_output:
        "The context window is the maximum amount of text a model can consider at once\nThis includes the prompt, any provided documents, and prior responses in a conversation\nOnce that limit is exceeded, older content generally gets dropped or summarized",
      hints: [
        "Define the context window before naming exactly what counts toward it.",
        "What happens once the limit is exceeded is the consequence, so it comes last.",
      ],
      solution_summary: "The context window bounds total considered text (prompt, documents, prior turns); exceeding it forces older content to be dropped or summarized.",
      key_concepts: ["context window"],
    },
    {
      id: "context_window_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('The model cannot see anything beyond the context window\\'s boundary')\nprint('Attention lets every token in the window relate to every other token')",
      solution_code: "print('The model cannot see anything beyond the context window\\'s boundary')\nprint('Attention lets every token in the window relate to every other token')",
      expected_output: "The model cannot see anything beyond the context window's boundary\nAttention lets every token in the window relate to every other token",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["context window", "attention"],
    },
    {
      id: "context_window_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about context windows actually prints.",
      buggy_code: "print('A larger context window is not free, since processing more tokens costs more)",
      solution_code: "print('A larger context window is not free, since processing more tokens costs more')",
      expected_output: "A larger context window is not free, since processing more tokens costs more",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "context window"],
    },
  ],

  finetuning_vs_prompting: [
    {
      id: "finetuning_vs_prompting_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the difference between prompting and fine-tuning.",
      shuffled_lines: [
        "print('Fine-tuning continues training on a smaller dataset, permanently adjusting the weights')",
        "print('Prompting shapes output through what\\'s typed in, never changing the model\\'s weights')",
        "print('Fine-tuning is reserved for a deep, consistent shift across many future interactions')",
      ],
      solution_code:
        "print('Prompting shapes output through what\\'s typed in, never changing the model\\'s weights')\n\nprint('Fine-tuning continues training on a smaller dataset, permanently adjusting the weights')\n\nprint('Fine-tuning is reserved for a deep, consistent shift across many future interactions')",
      expected_output:
        "Prompting shapes output through what's typed in, never changing the model's weights\nFine-tuning continues training on a smaller dataset, permanently adjusting the weights\nFine-tuning is reserved for a deep, consistent shift across many future interactions",
      hints: [
        "Cover prompting (the cheaper, temporary option) before fine-tuning.",
        "When fine-tuning is actually worth its cost is the conclusion, so it comes last.",
      ],
      solution_summary: "Prompting never touches weights and is temporary; fine-tuning permanently adjusts weights and suits a lasting behavioral shift.",
      key_concepts: ["prompting", "fine-tuning"],
    },
    {
      id: "finetuning_vs_prompting_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Instruction tuning fine-tunes a base model on instruction-and-response examples')\nprint('RLHF further adjusts behavior using human ratings of candidate responses')",
      solution_code: "print('Instruction tuning fine-tunes a base model on instruction-and-response examples')\nprint('RLHF further adjusts behavior using human ratings of candidate responses')",
      expected_output: "Instruction tuning fine-tunes a base model on instruction-and-response examples\nRLHF further adjusts behavior using human ratings of candidate responses",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["instruction tuning", "RLHF"],
    },
    {
      id: "finetuning_vs_prompting_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about fine-tuning actually prints.",
      buggy_code: "print('Catastrophic forgetting can degrade a model\\'s original broader capability)",
      solution_code: "print('Catastrophic forgetting can degrade a model\\'s original broader capability')",
      expected_output: "Catastrophic forgetting can degrade a model's original broader capability",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "catastrophic forgetting"],
    },
  ],
};

let updated = 0;
for (const topic of app.topics) {
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
