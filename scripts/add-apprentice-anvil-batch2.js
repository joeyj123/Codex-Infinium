// One-off script: authors Anvil challenges for the next 10 empty Apprentice
// topics in order: errors_debugging (idx 11), package_managers_dependencies
// (idx 12), high_vs_low_level (idx 13), language_paradigms (idx 14),
// syntax_vs_semantics (idx 15), survey_javascript (idx 17), survey_java
// (idx 18), survey_c_cpp (idx 19), survey_csharp (idx 20), survey_sql
// (idx 21).
//
// Content-tier alignment: idx 11-15 sit after functions_scope (idx 8), so
// the full variables/operators/conditionals/loops/functions toolkit is
// available — but still before arrays_lists (idx 25), so no list literals
// are used here (unlike data_in_memory's documented exception last batch;
// none of these 5 topics actually require one to illustrate their subject).
//
// The 5 language-survey topics (idx 17-21) are a different kind of
// constraint entirely: Apprentice's Anvil challenges always execute as
// Python regardless of which language a topic is about (AnvilTopicClient
// only resolves a non-Python `lang` for Expert-track topics; every
// pre-Expert tier, including all of Apprentice, always runs `execute()`
// as Python). Writing "JavaScript code" or "SQL code" as a challenge's
// solution_code would either fail to execute correctly or misrepresent
// that other language's actual semantics under Python's own rules. So all
// 5 survey topics use the same pattern as this tier's very first 3 topics
// (what_is_a_language/compilers_vs_interpreters/source_to_machine_runtime):
// real, executing Python code built from nothing but print() statements
// narrating that language's actual facts and architecture, never claiming
// to run code *in* that other language.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  errors_debugging: [
    {
      id: "errors_debugging_ac1",
      type: "fix",
      prompt:
        "This is supposed to calculate an average, but count was never actually given a real value, so dividing by it crashes the program the moment it runs — a runtime error. Fix it.",
      buggy_code: "total = 10\ncount = 0\naverage = total / count\nprint(average)",
      solution_code: "total = 10\ncount = 2\naverage = total / count\nprint(average)",
      expected_output: "5.0",
      hints: [
        "Dividing by zero causes a runtime error the instant the program actually executes that line, not before.",
        "Give count a real, nonzero value.",
      ],
      solution_summary:
        "Dividing by zero is a runtime error — the code is perfectly valid syntax, but crashes the moment execution actually reaches that division.",
      key_concepts: ["runtime error", "division by zero"],
    },
    {
      id: "errors_debugging_ac2",
      type: "fix",
      prompt:
        "This is supposed to sum the numbers 1 through 5, but it runs completely successfully and just prints the wrong total — a logic error, not a crash. Fix it.",
      buggy_code: "total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)",
      solution_code: "total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)",
      expected_output: "15",
      hints: [
        "It runs without any error message at all — that's exactly what makes a logic error tricky to spot.",
        "range(1, 5) stops before actually reaching 5.",
      ],
      solution_summary:
        "range(1, 5) only reaches 1 through 4 — the code runs fine with no error, it just silently computes the wrong total, the defining trait of a logic error.",
      key_concepts: ["logic error", "off-by-one", "range"],
    },
    {
      id: "errors_debugging_ac3",
      type: "reorder",
      prompt: "Reorder these steps of a disciplined debugging process.",
      shuffled_lines: [
        "print('Use a debugger to inspect the actual variable values at that exact moment')",
        "print('Read the exact error message and its reported line number')",
        "print('Apply a fix and retest against the same reproducible case')",
        "print('Reproduce the problem with a specific, repeatable input')",
      ],
      solution_code:
        "print('Read the exact error message and its reported line number')\n\nprint('Reproduce the problem with a specific, repeatable input')\n\nprint('Use a debugger to inspect the actual variable values at that exact moment')\n\nprint('Apply a fix and retest against the same reproducible case')",
      expected_output:
        "Read the exact error message and its reported line number\nReproduce the problem with a specific, repeatable input\nUse a debugger to inspect the actual variable values at that exact moment\nApply a fix and retest against the same reproducible case",
      hints: [
        "You can't reliably fix something you can't reliably reproduce yet.",
        "Retesting is always the last step, once a fix has actually been applied.",
      ],
      solution_summary:
        "Read the error message, reproduce it reliably, inspect actual variable state with a debugger, then fix and retest.",
      key_concepts: ["debugging methodology", "reproducing a bug"],
    },
  ],

  package_managers_dependencies: [
    {
      id: "package_managers_dependencies_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. `math` is a package already included with Python itself.",
      snippet_code: "import math\nprint(math.sqrt(16))",
      solution_code: "import math\nprint(math.sqrt(16))",
      expected_output: "4.0",
      hints: [
        "math is part of Python's own standard library — a package a program depends on but didn't write itself.",
        "sqrt returns a float, so the result prints as 4.0, not 4.",
      ],
      solution_summary:
        "math.sqrt(16) returns 4.0 — a small, real example of a program depending on external, pre-written code rather than implementing the calculation from scratch.",
      key_concepts: ["package", "dependency", "import"],
    },
    {
      id: "package_managers_dependencies_ac2",
      type: "fix",
      prompt: "This code tries to use the math package's sqrt function without ever importing math first. Fix it.",
      buggy_code: "print(math.sqrt(25))",
      solution_code: "import math\nprint(math.sqrt(25))",
      expected_output: "5.0",
      hints: [
        "A package's code has to be imported before a program can actually use it.",
        "Add `import math` before the line that calls math.sqrt.",
      ],
      solution_summary: "math had never been imported, so referencing math.sqrt failed — the import has to come first.",
      key_concepts: ["import", "dependency"],
    },
    {
      id: "package_managers_dependencies_ac3",
      type: "reorder",
      prompt: "Reorder these steps of how a package manager actually gets an external dependency into a working project.",
      shuffled_lines: [
        "print('The project code imports and uses that package functionality')",
        "print('A manifest file lists which packages the project depends on')",
        "print('A lockfile records the exact version actually installed, for reliable reuse later')",
        "print('The package manager downloads the correct package files')",
      ],
      solution_code:
        "print('A manifest file lists which packages the project depends on')\n\nprint('The package manager downloads the correct package files')\n\nprint('The project code imports and uses that package functionality')\n\nprint('A lockfile records the exact version actually installed, for reliable reuse later')",
      expected_output:
        "A manifest file lists which packages the project depends on\nThe package manager downloads the correct package files\nThe project code imports and uses that package functionality\nA lockfile records the exact version actually installed, for reliable reuse later",
      hints: [
        "The manifest has to declare a dependency before anything can be downloaded.",
        "The lockfile records what actually got installed, so it comes after the download.",
      ],
      solution_summary:
        "Declare the dependency in a manifest, download it, use it in code, then lock the exact installed version for reliable reuse.",
      key_concepts: ["package manager", "manifest file", "lockfile"],
    },
  ],

  high_vs_low_level: [
    {
      id: "high_vs_low_level_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code:
        "lang = 'assembly'\nif lang == 'assembly':\n    print('low-level: maps closely to CPU instructions')\nelif lang == 'C':\n    print('mid-level: manual memory, readable structure')\nelse:\n    print('high-level: hardware detail abstracted away')",
      solution_code:
        "lang = 'assembly'\nif lang == 'assembly':\n    print('low-level: maps closely to CPU instructions')\nelif lang == 'C':\n    print('mid-level: manual memory, readable structure')\nelse:\n    print('high-level: hardware detail abstracted away')",
      expected_output: "low-level: maps closely to CPU instructions",
      hints: ["lang is set to 'assembly', which matches the first condition."],
      solution_summary: "lang equals 'assembly', matching the first branch directly.",
      key_concepts: ["low-level language", "high-level language"],
    },
    {
      id: "high_vs_low_level_ac2",
      type: "fix",
      prompt:
        "This is supposed to classify C as mid-level, but the elif condition checks for the wrong language name, so it falls through to the wrong branch entirely. Fix it.",
      buggy_code:
        "lang = 'C'\nif lang == 'assembly':\n    print('low-level: maps closely to CPU instructions')\nelif lang == 'Python':\n    print('mid-level: manual memory, readable structure')\nelse:\n    print('high-level: hardware detail abstracted away')",
      solution_code:
        "lang = 'C'\nif lang == 'assembly':\n    print('low-level: maps closely to CPU instructions')\nelif lang == 'C':\n    print('mid-level: manual memory, readable structure')\nelse:\n    print('high-level: hardware detail abstracted away')",
      expected_output: "mid-level: manual memory, readable structure",
      hints: [
        "lang is 'C', but the elif checks for 'Python' instead.",
        "Change the elif condition to actually check for 'C'.",
      ],
      solution_summary: "The elif checked for the wrong language name, so C incorrectly fell through to the high-level branch.",
      key_concepts: ["mid-level language", "conditionals"],
    },
    {
      id: "high_vs_low_level_ac3",
      type: "reorder",
      prompt: "Reorder these steps to narrate the high-level/low-level spectrum from lowest to highest.",
      shuffled_lines: [
        "print('Java and C# automate memory management through a virtual machine')",
        "print('Assembly maps nearly one-to-one onto actual CPU instructions')",
        "print('Python and JavaScript abstract away hardware detail almost entirely')",
        "print('C offers readable structure but still requires manual memory management')",
      ],
      solution_code:
        "print('Assembly maps nearly one-to-one onto actual CPU instructions')\n\nprint('C offers readable structure but still requires manual memory management')\n\nprint('Java and C# automate memory management through a virtual machine')\n\nprint('Python and JavaScript abstract away hardware detail almost entirely')",
      expected_output:
        "Assembly maps nearly one-to-one onto actual CPU instructions\nC offers readable structure but still requires manual memory management\nJava and C# automate memory management through a virtual machine\nPython and JavaScript abstract away hardware detail almost entirely",
      hints: [
        "Assembly sits at the lowest end of the spectrum, closest to raw CPU instructions.",
        "Python and JavaScript sit at the highest end, furthest from hardware detail.",
      ],
      solution_summary:
        "From lowest to highest level: assembly, then C, then Java/C#'s virtual-machine-managed memory, then Python/JavaScript's full abstraction.",
      key_concepts: ["high-level vs low-level spectrum"],
    },
  ],

  language_paradigms: [
    {
      id: "language_paradigms_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. It's imperative programming: each step directly changes the program's state.",
      snippet_code: "total = 0\ncount = 3\nstep = 1\nwhile count > 0:\n    total = total + step\n    count = count - 1\nprint(total)",
      solution_code: "total = 0\ncount = 3\nstep = 1\nwhile count > 0:\n    total = total + step\n    count = count - 1\nprint(total)",
      expected_output: "3",
      hints: [
        "The loop runs 3 times, adding 1 to total each time.",
        "This is a step-by-step sequence of instructions directly changing total's value — the imperative style.",
      ],
      solution_summary: "The loop adds 1 to total three times, directly mutating state each step — the defining trait of imperative programming.",
      key_concepts: ["imperative programming", "while loop"],
    },
    {
      id: "language_paradigms_ac2",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the three programming paradigms.",
      shuffled_lines: [
        "print('Functional programming composes pure functions that avoid changing outside state at all')",
        "print('Imperative programming changes a program state step by step, instruction by instruction')",
        "print('Object-oriented programming bundles data and behavior together into objects')",
      ],
      solution_code:
        "print('Imperative programming changes a program state step by step, instruction by instruction')\n\nprint('Object-oriented programming bundles data and behavior together into objects')\n\nprint('Functional programming composes pure functions that avoid changing outside state at all')",
      expected_output:
        "Imperative programming changes a program state step by step, instruction by instruction\nObject-oriented programming bundles data and behavior together into objects\nFunctional programming composes pure functions that avoid changing outside state at all",
      hints: [
        "This matches the order the three paradigms were introduced in the topic itself.",
        "There's no strict logical dependency here — match the narration to how each paradigm is actually described.",
      ],
      solution_summary:
        "Imperative changes state step by step; object-oriented bundles data and behavior; functional composes pure, state-avoiding functions.",
      key_concepts: ["imperative programming", "object-oriented programming", "functional programming"],
    },
    {
      id: "language_paradigms_ac3",
      type: "fix",
      prompt:
        "This function is supposed to be a pure function that simply doubles its input, with no side effects — but it's adding an extra 1. Fix it.",
      buggy_code: "def double(x):\n    return x + x + 1\n\nprint(double(5))",
      solution_code: "def double(x):\n    return x + x\n\nprint(double(5))",
      expected_output: "10",
      hints: [
        "A pure function's output should depend only on its input, computed exactly as described.",
        "Doubling 5 should give 10, not 11.",
      ],
      solution_summary: "The function added an extra 1 beyond simply doubling its input — removing it makes the function correctly pure.",
      key_concepts: ["pure function", "functional programming"],
    },
  ],

  syntax_vs_semantics: [
    {
      id: "syntax_vs_semantics_ac1",
      type: "fix",
      prompt:
        "This code uses = (assignment) where == (comparison) was intended — Python actually refuses to run this at all, treating it as invalid syntax. Fix it.",
      buggy_code: "x = 5\nif x = 5:\n    print('match')",
      solution_code: "x = 5\nif x == 5:\n    print('match')",
      expected_output: "match",
      hints: [
        "A single = assigns a value; a double == compares two values.",
        "Python treats this specific mistake as a syntax error, refusing to run the code at all rather than silently misbehaving.",
      ],
      solution_summary:
        "A stray = instead of == is invalid Python syntax, caught before the program can run at all — using == fixes it.",
      key_concepts: ["syntax error", "assignment vs comparison"],
    },
    {
      id: "syntax_vs_semantics_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. It's perfectly valid syntax — the only question is whether it means what you'd expect.",
      snippet_code: "count = 0\nfor i in range(1, 5):\n    count = count + 1\nprint(count)",
      solution_code: "count = 0\nfor i in range(1, 5):\n    count = count + 1\nprint(count)",
      expected_output: "4",
      hints: [
        "This code is completely syntactically correct — there's no error to catch here.",
        "range(1, 5) produces 1, 2, 3, 4 — four numbers, not five.",
      ],
      solution_summary:
        "The code is syntactically flawless — the only real question is semantic: range(1, 5) stops one short of 5, so count ends at 4.",
      key_concepts: ["semantics", "range"],
    },
    {
      id: "syntax_vs_semantics_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the syntax vs. semantics distinction.",
      shuffled_lines: [
        "print('A logic error only surfaces as a wrong result, with no error message pointing at it')",
        "print('Grammar rules define exactly how a valid instruction must be structured')",
        "print('Semantics is what a syntactically valid instruction actually does once executed')",
        "print('A syntax error is caught before the program ever actually runs')",
      ],
      solution_code:
        "print('Grammar rules define exactly how a valid instruction must be structured')\n\nprint('A syntax error is caught before the program ever actually runs')\n\nprint('Semantics is what a syntactically valid instruction actually does once executed')\n\nprint('A logic error only surfaces as a wrong result, with no error message pointing at it')",
      expected_output:
        "Grammar rules define exactly how a valid instruction must be structured\nA syntax error is caught before the program ever actually runs\nSemantics is what a syntactically valid instruction actually does once executed\nA logic error only surfaces as a wrong result, with no error message pointing at it",
      hints: [
        "Syntax (grammar) is checked first, before anything runs.",
        "Semantics is only observable once the (syntactically valid) code actually executes.",
      ],
      solution_summary:
        "Syntax defines valid structure and is checked before running; semantics is actual meaning, only observable once code executes — and a logic error hides in that second layer.",
      key_concepts: ["syntax", "semantics", "logic error"],
    },
  ],

  survey_javascript: [
    {
      id: "survey_javascript_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate where JavaScript actually runs.",
      shuffled_lines: [
        "print('Today the same language can cover both the browser-facing and server-facing sides of an app')",
        "print('JavaScript originally only ran inside a web browser')",
        "print('Node.js later let JavaScript run outside the browser too, as a backend server language')",
      ],
      solution_code:
        "print('JavaScript originally only ran inside a web browser')\n\nprint('Node.js later let JavaScript run outside the browser too, as a backend server language')\n\nprint('Today the same language can cover both the browser-facing and server-facing sides of an app')",
      expected_output:
        "JavaScript originally only ran inside a web browser\nNode.js later let JavaScript run outside the browser too, as a backend server language\nToday the same language can cover both the browser-facing and server-facing sides of an app",
      hints: [
        "JavaScript's browser-only origin comes first, historically.",
        "Node.js is what expanded JavaScript beyond the browser.",
      ],
      solution_summary:
        "JavaScript started browser-only, Node.js later extended it to backend servers, and today it can cover both sides of an app.",
      key_concepts: ["JavaScript", "Node.js", "browser execution"],
    },
    {
      id: "survey_javascript_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('== allows type conversion before comparing')\nprint('=== requires matching value and type with no conversion')",
      solution_code: "print('== allows type conversion before comparing')\nprint('=== requires matching value and type with no conversion')",
      expected_output: "== allows type conversion before comparing\n=== requires matching value and type with no conversion",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["loose equality", "strict equality"],
    },
    {
      id: "survey_javascript_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about JavaScript actually prints.",
      buggy_code: "print('JavaScript runs natively inside every major browser)",
      solution_code: "print('JavaScript runs natively inside every major browser')",
      expected_output: "JavaScript runs natively inside every major browser",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  survey_java: [
    {
      id: "survey_java_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how Java achieves 'write once, run anywhere.'",
      shuffled_lines: [
        "print('The JVM translates bytecode into whatever the local machine native instructions actually are')",
        "print('Java source code is compiled into bytecode')",
        "print('The Java Virtual Machine interprets or just-in-time compiles that bytecode')",
        "print('Bytecode is not tied to any one specific CPU instructions')",
      ],
      solution_code:
        "print('Java source code is compiled into bytecode')\n\nprint('Bytecode is not tied to any one specific CPU instructions')\n\nprint('The Java Virtual Machine interprets or just-in-time compiles that bytecode')\n\nprint('The JVM translates bytecode into whatever the local machine native instructions actually are')",
      expected_output:
        "Java source code is compiled into bytecode\nBytecode is not tied to any one specific CPU instructions\nThe Java Virtual Machine interprets or just-in-time compiles that bytecode\nThe JVM translates bytecode into whatever the local machine native instructions actually are",
      hints: [
        "Compilation to bytecode has to happen before the JVM can do anything with it.",
        "The JVM is what actually produces native instructions, as the final step.",
      ],
      solution_summary:
        "Java compiles to platform-independent bytecode, which the JVM interprets or JIT-compiles into the local machine's actual native instructions.",
      key_concepts: ["bytecode", "Java Virtual Machine (JVM)", "write once, run anywhere"],
    },
    {
      id: "survey_java_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Java compiles to bytecode, not directly to machine code')\nprint('The JVM makes that bytecode run on any platform')",
      solution_code: "print('Java compiles to bytecode, not directly to machine code')\nprint('The JVM makes that bytecode run on any platform')",
      expected_output: "Java compiles to bytecode, not directly to machine code\nThe JVM makes that bytecode run on any platform",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["bytecode", "JVM"],
    },
    {
      id: "survey_java_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about Java actually prints.",
      buggy_code: "print('Write once, run anywhere)",
      solution_code: "print('Write once, run anywhere')",
      expected_output: "Write once, run anywhere",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  survey_c_cpp: [
    {
      id: "survey_c_cpp_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the consequence chain of manual memory management.",
      shuffled_lines: [
        "print('Forgetting to release memory causes a memory leak')",
        "print('C compiles directly to native machine code with no virtual machine layer')",
        "print('The programmer is also responsible for releasing that memory later')",
        "print('The programmer manually allocates memory for the program to use')",
      ],
      solution_code:
        "print('C compiles directly to native machine code with no virtual machine layer')\n\nprint('The programmer manually allocates memory for the program to use')\n\nprint('The programmer is also responsible for releasing that memory later')\n\nprint('Forgetting to release memory causes a memory leak')",
      expected_output:
        "C compiles directly to native machine code with no virtual machine layer\nThe programmer manually allocates memory for the program to use\nThe programmer is also responsible for releasing that memory later\nForgetting to release memory causes a memory leak",
      hints: [
        "Allocating memory has to happen before it can ever be released.",
        "The memory leak is the consequence of forgetting the release step — it comes last.",
      ],
      solution_summary:
        "C compiles directly to machine code; the programmer manually allocates and must later release memory, and forgetting that release causes a leak.",
      key_concepts: ["manual memory management", "memory leak"],
    },
    {
      id: "survey_c_cpp_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('C compiles directly to native machine code')\nprint('C++ adds object-oriented features on top of C')",
      solution_code: "print('C compiles directly to native machine code')\nprint('C++ adds object-oriented features on top of C')",
      expected_output: "C compiles directly to native machine code\nC++ adds object-oriented features on top of C",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["C", "C++"],
    },
    {
      id: "survey_c_cpp_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about C/C++ actually prints.",
      buggy_code: "print('Manual memory management gives precise control)",
      solution_code: "print('Manual memory management gives precise control')",
      expected_output: "Manual memory management gives precise control",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  survey_csharp: [
    {
      id: "survey_csharp_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how C# achieves cross-platform execution.",
      shuffled_lines: [
        "print(\"This lets the same compiled program run on Windows, Mac, and Linux\")",
        "print(\"C# source code compiles to CIL, Microsoft's own intermediate representation\")",
        "print(\"The Common Language Runtime translates CIL into the local machine's native instructions\")",
        "print(\"CIL is similar in purpose to Java's own bytecode\")",
      ],
      solution_code:
        "print(\"C# source code compiles to CIL, Microsoft's own intermediate representation\")\n\nprint(\"CIL is similar in purpose to Java's own bytecode\")\n\nprint(\"The Common Language Runtime translates CIL into the local machine's native instructions\")\n\nprint(\"This lets the same compiled program run on Windows, Mac, and Linux\")",
      expected_output:
        "C# source code compiles to CIL, Microsoft's own intermediate representation\nCIL is similar in purpose to Java's own bytecode\nThe Common Language Runtime translates CIL into the local machine's native instructions\nThis lets the same compiled program run on Windows, Mac, and Linux",
      hints: [
        "Compilation to CIL has to happen before the CLR can translate anything.",
        "Running on multiple platforms is the final payoff, listed last.",
      ],
      solution_summary:
        "C# compiles to CIL (like Java's bytecode), and the CLR translates that into native instructions, letting the same program run cross-platform.",
      key_concepts: ["CIL", "Common Language Runtime (CLR)"],
    },
    {
      id: "survey_csharp_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('C# compiles to CIL, not directly to machine code')\nprint('The CLR is the platform-specific translation layer underneath')",
      solution_code: "print('C# compiles to CIL, not directly to machine code')\nprint('The CLR is the platform-specific translation layer underneath')",
      expected_output: "C# compiles to CIL, not directly to machine code\nThe CLR is the platform-specific translation layer underneath",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["CIL", "CLR"],
    },
    {
      id: "survey_csharp_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about C# actually prints.",
      buggy_code: "print('C# and Java share a strikingly similar architecture)",
      solution_code: "print('C# and Java share a strikingly similar architecture')",
      expected_output: "C# and Java share a strikingly similar architecture",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  survey_sql: [
    {
      id: "survey_sql_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why SQL is called a declarative language.",
      shuffled_lines: [
        "print(\"This is why SQL is called a declarative language, not an imperative one\")",
        "print(\"Every other language surveyed tells the computer exactly how to do something, step by step\")",
        "print(\"The database engine's own query optimizer decides the actual execution plan\")",
        "print(\"SQL instead declares what result is wanted\")",
      ],
      solution_code:
        "print(\"Every other language surveyed tells the computer exactly how to do something, step by step\")\n\nprint(\"SQL instead declares what result is wanted\")\n\nprint(\"The database engine's own query optimizer decides the actual execution plan\")\n\nprint(\"This is why SQL is called a declarative language, not an imperative one\")",
      expected_output:
        "Every other language surveyed tells the computer exactly how to do something, step by step\nSQL instead declares what result is wanted\nThe database engine's own query optimizer decides the actual execution plan\nThis is why SQL is called a declarative language, not an imperative one",
      hints: [
        "The contrast with imperative languages sets up the whole point, so it comes first.",
        "The conclusion ('this is why...') has to come last.",
      ],
      solution_summary:
        "Imperative languages specify how; SQL declares what result is wanted and lets the query optimizer decide how — which is exactly why it's called declarative.",
      key_concepts: ["declarative language", "query optimizer"],
    },
    {
      id: "survey_sql_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('DDL commands define a database structure')\nprint('DML commands work with the data already inside that structure')",
      solution_code: "print('DDL commands define a database structure')\nprint('DML commands work with the data already inside that structure')",
      expected_output: "DDL commands define a database structure\nDML commands work with the data already inside that structure",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["DDL", "DML"],
    },
    {
      id: "survey_sql_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about SQL actually prints.",
      buggy_code: "print('SQL declares what result is wanted, not how to get it)",
      solution_code: "print('SQL declares what result is wanted, not how to get it')",
      expected_output: "SQL declares what result is wanted, not how to get it",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
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
