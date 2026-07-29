// One-off script: authors Anvil challenges for the first 6 empty Apprentice
// topics (Language Fundamentals section): what_is_a_language (idx 0),
// compilers_vs_interpreters (idx 1), source_to_machine_runtime (idx 2),
// data_in_memory (idx 4), comments_documentation (idx 9),
// pseudocode_algorithmic_thinking (idx 10).
//
// Content-tier alignment: topics 0-2 sit before variables_data_types
// (idx 3), Apprentice's first topic to teach assignment — so their
// challenges use only bare print() statements with string literals, no
// variables or operators at all, matching what's actually been taught by
// that position. data_in_memory (idx 4) sits after variables_data_types but
// before operators (idx 5) and arrays_lists (idx 25); its own topic content
// already uses list literals as its illustrating example of a reference
// type, so this script follows that same precedent with a minimal list
// literal + single-element index assignment (no .append(), slicing, or
// iteration) — documented in the chronicle as a deliberate, narrow
// exception since demonstrating aliasing requires some mutation mechanism.
// comments_documentation (idx 9) and pseudocode_algorithmic_thinking
// (idx 10) both sit after functions_scope (idx 8), so the full
// variables/operators/conditionals/loops/functions toolkit is available.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  what_is_a_language: [
    {
      id: "what_is_a_language_ac1",
      type: "reorder",
      prompt:
        "Reorder these print statements so they narrate the actual translation pipeline in the correct order, from a human's readable text to the CPU actually running it.",
      shuffled_lines: [
        "print('CPU executes the machine code')",
        "print('Human writes readable source code')",
        "print('Translator converts source into machine code')",
        "print('Language syntax rules define what counts as valid')",
      ],
      solution_code:
        "print('Human writes readable source code')\n\nprint('Language syntax rules define what counts as valid')\n\nprint('Translator converts source into machine code')\n\nprint('CPU executes the machine code')",
      expected_output:
        "Human writes readable source code\nLanguage syntax rules define what counts as valid\nTranslator converts source into machine code\nCPU executes the machine code",
      hints: [
        "A human has to write the code before any syntax rules can be checked against it.",
        "Translation only makes sense once there's valid source code to translate — and the CPU only runs what's already been translated.",
      ],
      solution_summary:
        "Source code is written first, checked against syntax rules, translated into machine code, and only then executed by the CPU.",
      key_concepts: ["programming language", "syntax", "translation pipeline"],
    },
    {
      id: "what_is_a_language_ac2",
      type: "fix",
      prompt:
        "A programming language demands exact, unambiguous structure — a missing bracket or quote can make a program fail to run at all. Fix the broken syntax below.",
      buggy_code: "print('Formal syntax matters)",
      solution_code: "print('Formal syntax matters')",
      expected_output: "Formal syntax matters",
      hints: [
        "Count the quote marks — one string literal is missing its closing quote.",
        "A language's syntax rules require every opening quote to have a matching closing quote.",
      ],
      solution_summary:
        "The string literal was missing its closing quote, which is exactly the kind of strict syntax rule that makes a program fail entirely if broken.",
      key_concepts: ["syntax", "formal grammar rules"],
    },
    {
      id: "what_is_a_language_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('High-level languages prioritize readability')\nprint('Low-level languages prioritize control')",
      solution_code: "print('High-level languages prioritize readability')\nprint('Low-level languages prioritize control')",
      expected_output: "High-level languages prioritize readability\nLow-level languages prioritize control",
      hints: [
        "Each print statement runs in order, top to bottom.",
        "Nothing here is being computed — each line just prints its own literal text.",
      ],
      solution_summary: "Each print statement runs in sequence, printing its own literal text exactly as written.",
      key_concepts: ["high-level vs low-level languages"],
    },
  ],

  compilers_vs_interpreters: [
    {
      id: "compilers_vs_interpreters_ac1",
      type: "reorder",
      prompt: "Reorder these print statements to narrate a compiled language's pipeline in the correct order.",
      shuffled_lines: [
        "print('Run the executable — translation already happened')",
        "print('Write the source code')",
        "print('Produce a standalone executable file')",
        "print('Compile the entire program ahead of time')",
      ],
      solution_code:
        "print('Write the source code')\n\nprint('Compile the entire program ahead of time')\n\nprint('Produce a standalone executable file')\n\nprint('Run the executable — translation already happened')",
      expected_output:
        "Write the source code\nCompile the entire program ahead of time\nProduce a standalone executable file\nRun the executable — translation already happened",
      hints: [
        "Compiling requires source code to already exist.",
        "The executable file is the compiler's output, not something that exists before compiling.",
      ],
      solution_summary:
        "A compiled language writes source, compiles it entirely upfront, produces an executable, then runs that already-translated executable.",
      key_concepts: ["compiler", "ahead-of-time translation", "executable"],
    },
    {
      id: "compilers_vs_interpreters_ac2",
      type: "fix",
      prompt:
        "A compiler or interpreter catches a broken syntax error before the program can run at all. Fix the syntax so this actually runs.",
      buggy_code: "print('Interpreters translate line by line'",
      solution_code: "print('Interpreters translate line by line')",
      expected_output: "Interpreters translate line by line",
      hints: [
        "Count the parentheses — one closing parenthesis is missing.",
        "print( needs a matching ) to be valid syntax.",
      ],
      solution_summary: "The print call was missing its closing parenthesis, a syntax error caught before the program can run.",
      key_concepts: ["syntax error", "translation"],
    },
    {
      id: "compilers_vs_interpreters_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Compiled code runs faster once translated')\nprint('Interpreted code skips the upfront wait')",
      solution_code: "print('Compiled code runs faster once translated')\nprint('Interpreted code skips the upfront wait')",
      expected_output: "Compiled code runs faster once translated\nInterpreted code skips the upfront wait",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["compiler vs interpreter tradeoffs"],
    },
  ],

  source_to_machine_runtime: [
    {
      id: "source_to_machine_runtime_ac1",
      type: "reorder",
      prompt: "Reorder these print statements to narrate the full source-to-execution pipeline in the correct order.",
      shuffled_lines: [
        "print('The CPU fetches, decodes, and executes the machine code')",
        "print('The programmer writes source code')",
        "print('Lexing and parsing build a structured understanding of the code')",
        "print('The parsed structure is translated toward machine code')",
      ],
      solution_code:
        "print('The programmer writes source code')\n\nprint('Lexing and parsing build a structured understanding of the code')\n\nprint('The parsed structure is translated toward machine code')\n\nprint('The CPU fetches, decodes, and executes the machine code')",
      expected_output:
        "The programmer writes source code\nLexing and parsing build a structured understanding of the code\nThe parsed structure is translated toward machine code\nThe CPU fetches, decodes, and executes the machine code",
      hints: [
        "Lexing and parsing can't happen until source code actually exists.",
        "The CPU is always the final destination of this pipeline.",
      ],
      solution_summary:
        "Source code is written, then lexed and parsed into a structured form, then translated toward machine code, which the CPU finally executes.",
      key_concepts: ["lexing and parsing", "machine code", "fetch-decode-execute"],
    },
    {
      id: "source_to_machine_runtime_ac2",
      type: "fix",
      prompt: "A syntax error is caught at compile time, before the program ever reaches runtime. Fix the broken syntax below.",
      buggy_code: "print(\"Runtime is when the program actually executes)",
      solution_code: "print(\"Runtime is when the program actually executes\")",
      expected_output: "Runtime is when the program actually executes",
      hints: [
        "The double-quoted string is missing its closing quote.",
        "This kind of error is caught before runtime ever begins.",
      ],
      solution_summary: "The string literal's closing quote was missing — a compile-time syntax error, not a runtime one.",
      key_concepts: ["compile time vs runtime", "syntax error"],
    },
    {
      id: "source_to_machine_runtime_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Compile time catches some errors before running')\nprint('Runtime errors only surface while executing')",
      solution_code: "print('Compile time catches some errors before running')\nprint('Runtime errors only surface while executing')",
      expected_output: "Compile time catches some errors before running\nRuntime errors only surface while executing",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["compile time", "runtime"],
    },
  ],

  data_in_memory: [
    {
      id: "data_in_memory_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. `b` is copied from `a`, then `b` is reassigned.",
      snippet_code: "a = 5\nb = a\nb = 10\nprint(a, b)",
      solution_code: "a = 5\nb = a\nb = 10\nprint(a, b)",
      expected_output: "5 10",
      hints: [
        "Integers are a value type — each variable holds its own independent copy.",
        "Reassigning b doesn't reach back and change a's own stored value.",
      ],
      solution_summary:
        "a and b are independent value-type copies, so reassigning b to 10 has no effect on a, which stays 5.",
      key_concepts: ["value type", "independent copies"],
    },
    {
      id: "data_in_memory_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. `b` is copied from `a`, then one element of `b` is changed.",
      snippet_code: "a = [1, 2, 3]\nb = a\nb[0] = 99\nprint(a)",
      solution_code: "a = [1, 2, 3]\nb = a\nb[0] = 99\nprint(a)",
      expected_output: "[99, 2, 3]",
      hints: [
        "A list is a reference type — `b = a` makes b point at the exact same underlying list as a, not a separate copy.",
        "Changing an element through b changes the one and only list both variables are pointing at.",
      ],
      solution_summary:
        "Since a and b reference the identical list in memory, changing an element through b is visible through a too.",
      key_concepts: ["reference type", "aliasing", "shared memory"],
    },
    {
      id: "data_in_memory_ac3",
      type: "fix",
      prompt:
        "This is supposed to model two variables referencing the exact same list in memory, so changing an element through b should show up in a too — but b was given its own separate list instead of a reference to a. Fix it.",
      buggy_code: "a = [1, 2, 3]\nb = [1, 2, 3]\nb[0] = 99\nprint(a)",
      solution_code: "a = [1, 2, 3]\nb = a\nb[0] = 99\nprint(a)",
      expected_output: "[99, 2, 3]",
      hints: [
        "`b = [1, 2, 3]` creates a brand new, separate list — not a reference to a's list.",
        "For b to actually alias a, it needs to be assigned directly from a: `b = a`.",
      ],
      solution_summary:
        "b needed to be assigned directly from a (`b = a`) to actually reference the same list — a separately created list with matching contents is not the same object in memory.",
      key_concepts: ["reference type", "aliasing", "value equality vs identity"],
    },
  ],

  comments_documentation: [
    {
      id: "comments_documentation_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. The comment is for humans reading the code — it has no effect on execution.",
      snippet_code: "# convert Celsius to Fahrenheit\ncelsius = 20\nfahrenheit = celsius * 9 / 5 + 32\nprint(fahrenheit)",
      solution_code: "# convert Celsius to Fahrenheit\ncelsius = 20\nfahrenheit = celsius * 9 / 5 + 32\nprint(fahrenheit)",
      expected_output: "68.0",
      hints: [
        "The comment is completely ignored by the interpreter — it has zero effect on the calculation.",
        "20 * 9 / 5 + 32 = 68.0",
      ],
      solution_summary:
        "The comment is discarded before translation and has no effect on runtime behavior — the actual calculation still produces 68.0.",
      key_concepts: ["comments are ignored at runtime", "zero runtime cost"],
    },
    {
      id: "comments_documentation_ac2",
      type: "fix",
      prompt:
        "The comment says this function should double its input, but the code triples it instead. Fix the code to actually match what the comment says it does.",
      buggy_code: "# double the input value\ndef process(x):\n    return x * 3\n\nprint(process(4))",
      solution_code: "# double the input value\ndef process(x):\n    return x * 2\n\nprint(process(4))",
      expected_output: "8",
      hints: [
        "The comment is the intended behavior — the code underneath it doesn't actually match that intention.",
        "Doubling means multiplying by 2, not 3.",
      ],
      solution_summary:
        "The code tripled the input instead of doubling it, contradicting its own comment — a real example of why a comment explaining intent can help catch a bug.",
      key_concepts: ["comments documenting intent", "code not matching its own comment"],
    },
    {
      id: "comments_documentation_ac3",
      type: "reorder",
      prompt: "Reorder these lines so the comment-and-code pairs run correctly — a variable has to exist before it can be printed.",
      shuffled_lines: [
        "# Step 2: print the greeting\nprint(greeting)",
        "# Step 1: define the greeting\ngreeting = 'Hello'",
      ],
      solution_code: "# Step 1: define the greeting\ngreeting = 'Hello'\n\n# Step 2: print the greeting\nprint(greeting)",
      expected_output: "Hello",
      hints: [
        "Using `greeting` before it's assigned would raise a NameError.",
        "Comments follow the same top-to-bottom order as the code they describe.",
      ],
      solution_summary:
        "greeting has to be assigned before it can be printed — the comments' own step numbers give away the correct order too.",
      key_concepts: ["comments describing sequence", "execution order"],
    },
  ],

  pseudocode_algorithmic_thinking: [
    {
      id: "pseudocode_algorithmic_thinking_ac1",
      type: "build",
      prompt:
        "Translate this pseudocode into real Python code: 'for each number from 1 to 5, print it.'",
      starter_code: "# for each number from 1 to 5, print it\n",
      solution_code: "for i in range(1, 6):\n    print(i)",
      expected_output: "1\n2\n3\n4\n5",
      hints: [
        "range(1, 6) produces 1, 2, 3, 4, 5 — range's upper bound is exclusive.",
        "The pseudocode's 'for each number... print it' maps directly onto a for loop with a print inside it.",
      ],
      solution_summary:
        "The pseudocode's logical structure — repeat, printing each number — maps directly onto a for loop over range(1, 6).",
      key_concepts: ["pseudocode to code translation", "for loop", "range"],
    },
    {
      id: "pseudocode_algorithmic_thinking_ac2",
      type: "reorder",
      prompt: "Reorder these steps of an algorithm that checks whether a number is even or odd.",
      shuffled_lines: [
        "if remainder == 0:\n    print('even')\nelse:\n    print('odd')",
        "number = 7",
        "remainder = number % 2",
      ],
      solution_code: "number = 7\n\nremainder = number % 2\n\nif remainder == 0:\n    print('even')\nelse:\n    print('odd')",
      expected_output: "odd",
      hints: [
        "The remainder can't be computed until `number` exists.",
        "The if/else check depends on `remainder` already being calculated.",
      ],
      solution_summary:
        "Each step depends on the one before it: assign the number, compute its remainder, then branch on that remainder.",
      key_concepts: ["algorithm as ordered steps", "conditionals", "operators"],
    },
    {
      id: "pseudocode_algorithmic_thinking_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. It's the direct translation of 'add up all the even numbers from 1 to 5.'",
      snippet_code: "total = 0\nfor n in range(1, 6):\n    if n % 2 == 0:\n        total += n\nprint(total)",
      solution_code: "total = 0\nfor n in range(1, 6):\n    if n % 2 == 0:\n        total += n\nprint(total)",
      expected_output: "6",
      hints: [
        "Only 2 and 4 are even numbers between 1 and 5.",
        "2 + 4 = 6.",
      ],
      solution_summary:
        "Only 2 and 4 are even in that range, and 2 + 4 = 6 — the loop and conditional together implement the pseudocode exactly.",
      key_concepts: ["algorithmic thinking", "loops", "conditionals", "accumulator pattern"],
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
