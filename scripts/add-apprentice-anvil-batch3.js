// One-off script: authors Anvil challenges for the next 10 empty Apprentice
// topics in order: survey_html_css, evaluating_language_fit,
// frontend_frameworks_intro (languages section closers), stacks_queues,
// linked_lists, hash_tables_internals (data_structures section closers),
// what_is_json, what_is_csv, reading_writing_files, what_is_a_schema (data
// section openers).
//
// Content-tier alignment: Apprentice's Anvil challenges always execute as
// Python regardless of which topic they're actually about (AnvilTopicClient
// only resolves a non-Python `lang` for Expert-track topics). The three
// languages-section topics here (HTML/CSS, evaluating language fit, frontend
// frameworks) are conceptual/narrative subjects with no actual executable
// semantics of their own, so — matching the established pattern from
// survey_javascript/survey_java/survey_c_cpp/survey_csharp/survey_sql in
// batch 2 — they use real, executing Python code built from print()
// statements narrating facts, never claiming to run HTML/CSS/JS in Python.
//
// linked_lists and hash_tables_internals are genuine data structures, but
// Apprentice has not yet taught custom classes (no node/pointer object
// syntax is available), so implementing an actual linked list or hash table
// in executable Python isn't possible at this tier — these two follow the
// same print()-narration pattern for the same structural reason. json/csv
// module usage is also not established anywhere in the tier, so
// what_is_json/what_is_csv/reading_writing_files/what_is_a_schema follow it
// too, staying narrative rather than reaching for import json/csv.
//
// stacks_queues is the one exception: arrays_lists (already authored) gives
// Apprentice real list operations, and a Python list's own .append()/.pop()
// directly implement stack push/pop, so stacks_queues challenges use real,
// executing list code rather than narration.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  survey_html_css: [
    {
      id: "survey_html_css_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how a browser turns HTML and CSS into a visible page.",
      shuffled_lines: [
        "print('The browser renders the final, visible result on screen')",
        "print('The browser parses HTML into the DOM, a structured representation of the page')",
        "print('The browser applies CSS rules to determine how each element should look')",
      ],
      solution_code:
        "print('The browser parses HTML into the DOM, a structured representation of the page')\n\nprint('The browser applies CSS rules to determine how each element should look')\n\nprint('The browser renders the final, visible result on screen')",
      expected_output:
        "The browser parses HTML into the DOM, a structured representation of the page\nThe browser applies CSS rules to determine how each element should look\nThe browser renders the final, visible result on screen",
      hints: [
        "Parsing the HTML into the DOM has to happen before any styling can be applied to it.",
        "Rendering the final visible result is always the last step.",
      ],
      solution_summary:
        "The browser first parses HTML into the DOM, then applies CSS rules to it, then renders the final visible page.",
      key_concepts: ["HTML", "CSS", "DOM"],
    },
    {
      id: "survey_html_css_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('HTML structures and describes a page\\'s content')\nprint('CSS controls how that content actually looks')",
      solution_code: "print('HTML structures and describes a page\\'s content')\nprint('CSS controls how that content actually looks')",
      expected_output: "HTML structures and describes a page's content\nCSS controls how that content actually looks",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["HTML", "CSS", "separation of concerns"],
    },
    {
      id: "survey_html_css_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about HTML/CSS actually prints.",
      buggy_code: "print('HTML and CSS are not programming languages)",
      solution_code: "print('HTML and CSS are not programming languages')",
      expected_output: "HTML and CSS are not programming languages",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  evaluating_language_fit: [
    {
      id: "evaluating_language_fit_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the evaluation criteria for choosing a language, from most concrete to most organizational.",
      shuffled_lines: [
        "print('Team and organizational familiarity is a real, legitimate factor too')",
        "print('Performance requirements: does the task genuinely need raw speed and manual memory control')",
        "print('Ecosystem and available libraries matter directly for a task\\'s specific domain')",
      ],
      solution_code:
        "print('Performance requirements: does the task genuinely need raw speed and manual memory control')\n\nprint('Ecosystem and available libraries matter directly for a task\\'s specific domain')\n\nprint('Team and organizational familiarity is a real, legitimate factor too')",
      expected_output:
        "Performance requirements: does the task genuinely need raw speed and manual memory control\nEcosystem and available libraries matter directly for a task's specific domain\nTeam and organizational familiarity is a real, legitimate factor too",
      hints: [
        "This matches the order the criteria were introduced in the topic itself.",
        "Performance comes first, then ecosystem, then team familiarity.",
      ],
      solution_summary:
        "Language fit weighs performance needs, ecosystem/library strength, and team familiarity together, none of them in isolation.",
      key_concepts: ["language fit", "tradeoffs"],
    },
    {
      id: "evaluating_language_fit_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "task = 'browser interactivity'\nif task == 'browser interactivity':\n    print('JavaScript is close to a structurally forced choice')\nelse:\n    print('multiple languages could reasonably fit')",
      solution_code: "task = 'browser interactivity'\nif task == 'browser interactivity':\n    print('JavaScript is close to a structurally forced choice')\nelse:\n    print('multiple languages could reasonably fit')",
      expected_output: "JavaScript is close to a structurally forced choice",
      hints: ["task is set to 'browser interactivity', which matches the if condition."],
      solution_summary: "task equals 'browser interactivity', so the if branch runs, since no other mainstream language runs natively in every major browser.",
      key_concepts: ["language fit", "conditionals"],
    },
    {
      id: "evaluating_language_fit_ac3",
      type: "fix",
      prompt:
        "This is supposed to reward Python for data-analysis tasks, but the condition checks the wrong variable entirely, so the message never actually prints for a data-analysis task. Fix it.",
      buggy_code: "task = 'data analysis'\nlanguage = 'Python'\nif language == 'data analysis':\n    print('Python\\'s ecosystem is especially strong here')",
      solution_code: "task = 'data analysis'\nlanguage = 'Python'\nif task == 'data analysis':\n    print('Python\\'s ecosystem is especially strong here')",
      expected_output: "Python's ecosystem is especially strong here",
      hints: [
        "task holds the actual task description; language holds the language name — they were swapped in the condition.",
        "Compare task to 'data analysis', not language.",
      ],
      solution_summary: "The condition compared the wrong variable — checking task against 'data analysis' instead of language fixes it.",
      key_concepts: ["language fit", "conditionals"],
    },
  ],

  frontend_frameworks_intro: [
    {
      id: "frontend_frameworks_intro_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why frontend frameworks exist.",
      shuffled_lines: [
        "print('Frontend frameworks provide reusable patterns for building complex interfaces more manageably')",
        "print('As websites grew more complex, hand-coordinating HTML, CSS, and JavaScript became hard to sustain')",
        "print('Components let an interface be broken into smaller, independently manageable, reusable pieces')",
      ],
      solution_code:
        "print('As websites grew more complex, hand-coordinating HTML, CSS, and JavaScript became hard to sustain')\n\nprint('Frontend frameworks provide reusable patterns for building complex interfaces more manageably')\n\nprint('Components let an interface be broken into smaller, independently manageable, reusable pieces')",
      expected_output:
        "As websites grew more complex, hand-coordinating HTML, CSS, and JavaScript became hard to sustain\nFrontend frameworks provide reusable patterns for building complex interfaces more manageably\nComponents let an interface be broken into smaller, independently manageable, reusable pieces",
      hints: [
        "The coordination problem has to be named before the solution to it makes sense.",
        "Components are the specific mechanism frameworks use to solve that problem, so they come last.",
      ],
      solution_summary:
        "Hand-coordinating HTML/CSS/JS got hard to sustain at scale, so frameworks provide reusable patterns, built around breaking interfaces into components.",
      key_concepts: ["frontend framework", "component"],
    },
    {
      id: "frontend_frameworks_intro_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A component bundles structure, styling, and behavior into one reusable unit')\nprint('A single Button component can be reused dozens of times across an app')",
      solution_code: "print('A component bundles structure, styling, and behavior into one reusable unit')\nprint('A single Button component can be reused dozens of times across an app')",
      expected_output: "A component bundles structure, styling, and behavior into one reusable unit\nA single Button component can be reused dozens of times across an app",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["component", "reusability"],
    },
    {
      id: "frontend_frameworks_intro_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about frontend frameworks actually prints.",
      buggy_code: "print('React, Vue, and Angular are the most widely used examples today)",
      solution_code: "print('React, Vue, and Angular are the most widely used examples today')",
      expected_output: "React, Vue, and Angular are the most widely used examples today",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error"],
    },
  ],

  stacks_queues: [
    {
      id: "stacks_queues_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. append() pushes onto the top of a list used as a stack, and pop() removes from that same top.",
      snippet_code: "stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())\nprint(stack.pop())",
      solution_code: "stack = []\nstack.append(1)\nstack.append(2)\nstack.append(3)\nprint(stack.pop())\nprint(stack.pop())",
      expected_output: "3\n2",
      hints: [
        "A stack is LIFO: the most recently pushed item is the first one popped.",
        "3 was pushed last, so it pops first; 2 pops second.",
      ],
      solution_summary: "pop() removes from the top of the stack, so the most recently pushed values (3, then 2) come off first — LIFO order.",
      key_concepts: ["stack", "LIFO", "push", "pop"],
    },
    {
      id: "stacks_queues_ac2",
      type: "fix",
      prompt:
        "This is supposed to process a queue in FIFO order, printing whoever has been waiting longest first, but pop() removes from the end of the list, not the front. Fix it.",
      buggy_code: "queue = ['Ana', 'Bo', 'Cy']\nprint(queue.pop())",
      solution_code: "queue = ['Ana', 'Bo', 'Cy']\nprint(queue.pop(0))",
      expected_output: "Ana",
      hints: [
        "A queue is FIFO: the earliest-added item is removed first, from the front.",
        "pop(0) removes the item at index 0, the front of the list.",
      ],
      solution_summary: "pop() with no argument removes from the end (LIFO); pop(0) removes from the front, correctly matching a queue's FIFO order.",
      key_concepts: ["queue", "FIFO", "enqueue", "dequeue"],
    },
    {
      id: "stacks_queues_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the difference between a stack and a queue.",
      shuffled_lines: [
        "print('A queue follows FIFO order: the earliest-added item is removed first')",
        "print('A stack follows LIFO order: the most recently added item is removed first')",
        "print('A stack\\'s push and pop both happen at the same end')",
        "print('A queue\\'s enqueue and dequeue happen at opposite ends')",
      ],
      solution_code:
        "print('A stack follows LIFO order: the most recently added item is removed first')\n\nprint('A stack\\'s push and pop both happen at the same end')\n\nprint('A queue follows FIFO order: the earliest-added item is removed first')\n\nprint('A queue\\'s enqueue and dequeue happen at opposite ends')",
      expected_output:
        "A stack follows LIFO order: the most recently added item is removed first\nA stack's push and pop both happen at the same end\nA queue follows FIFO order: the earliest-added item is removed first\nA queue's enqueue and dequeue happen at opposite ends",
      hints: [
        "Cover the stack's order and its single-end behavior together, before moving to the queue.",
        "The queue's order and its opposite-ends behavior come last.",
      ],
      solution_summary:
        "A stack is LIFO with push/pop at the same end; a queue is FIFO with enqueue/dequeue at opposite ends.",
      key_concepts: ["stack", "queue", "LIFO", "FIFO"],
    },
  ],

  linked_lists: [
    {
      id: "linked_lists_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the tradeoff a linked list makes compared to an array.",
      shuffled_lines: [
        "print('Reaching a specific position requires following references one node at a time from the start')",
        "print('A linked list\\'s nodes can live scattered anywhere in memory, connected by pointers')",
        "print('Inserting a new node only requires updating a small handful of pointer references')",
        "print('This means a linked list has no true random access, unlike an array')",
      ],
      solution_code:
        "print('A linked list\\'s nodes can live scattered anywhere in memory, connected by pointers')\n\nprint('Inserting a new node only requires updating a small handful of pointer references')\n\nprint('Reaching a specific position requires following references one node at a time from the start')\n\nprint('This means a linked list has no true random access, unlike an array')",
      expected_output:
        "A linked list's nodes can live scattered anywhere in memory, connected by pointers\nInserting a new node only requires updating a small handful of pointer references\nReaching a specific position requires following references one node at a time from the start\nThis means a linked list has no true random access, unlike an array",
      hints: [
        "Start with what a linked list's memory layout actually looks like.",
        "The random-access conclusion follows from needing to traverse node by node, so it comes last.",
      ],
      solution_summary:
        "Scattered, pointer-connected nodes make insertion cheap but force sequential traversal to reach a position, so a linked list has no true random access.",
      key_concepts: ["linked list", "pointer", "random access"],
    },
    {
      id: "linked_lists_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Each node holds data and a reference to the next node')\nprint('The final node\\'s next reference points at nothing, conventionally called null')",
      solution_code: "print('Each node holds data and a reference to the next node')\nprint('The final node\\'s next reference points at nothing, conventionally called null')",
      expected_output: "Each node holds data and a reference to the next node\nThe final node's next reference points at nothing, conventionally called null",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["linked list", "node", "null"],
    },
    {
      id: "linked_lists_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about doubly linked lists actually prints.",
      buggy_code: "print('A doubly linked list gives each node a next and a previous reference)",
      solution_code: "print('A doubly linked list gives each node a next and a previous reference')",
      expected_output: "A doubly linked list gives each node a next and a previous reference",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "doubly linked list"],
    },
  ],

  hash_tables_internals: [
    {
      id: "hash_tables_internals_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how a hash table stores and looks up a key.",
      shuffled_lines: [
        "print('Looking the key up later reruns the identical hash function, landing on the identical bucket')",
        "print('A hash function takes a key and deterministically produces a hash code')",
        "print('That hash code is converted into a specific bucket index in the underlying array')",
      ],
      solution_code:
        "print('A hash function takes a key and deterministically produces a hash code')\n\nprint('That hash code is converted into a specific bucket index in the underlying array')\n\nprint('Looking the key up later reruns the identical hash function, landing on the identical bucket')",
      expected_output:
        "A hash function takes a key and deterministically produces a hash code\nThat hash code is converted into a specific bucket index in the underlying array\nLooking the key up later reruns the identical hash function, landing on the identical bucket",
      hints: [
        "Producing the hash code has to happen before it can be converted into a bucket index.",
        "Lookup reruns the same process later, so it comes last.",
      ],
      solution_summary:
        "A hash function produces a hash code from a key, that code maps to a bucket index, and lookup later reruns the same function to land on the same bucket.",
      key_concepts: ["hash table", "hash function", "bucket"],
    },
    {
      id: "hash_tables_internals_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A collision happens when two different keys hash to the same bucket index')\nprint('Chaining handles a collision by storing a small list at that one bucket')",
      solution_code: "print('A collision happens when two different keys hash to the same bucket index')\nprint('Chaining handles a collision by storing a small list at that one bucket')",
      expected_output: "A collision happens when two different keys hash to the same bucket index\nChaining handles a collision by storing a small list at that one bucket",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["collision", "chaining"],
    },
    {
      id: "hash_tables_internals_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about hash tables actually prints.",
      buggy_code: "print('A dictionary\\'s near-instant lookup is powered by a hash table underneath)",
      solution_code: "print('A dictionary\\'s near-instant lookup is powered by a hash table underneath')",
      expected_output: "A dictionary's near-instant lookup is powered by a hash table underneath",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "hash table"],
    },
  ],

  what_is_json: [
    {
      id: "what_is_json_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why JSON exists.",
      shuffled_lines: [
        "print('Any language that can read that text format can parse it into its own native data structure')",
        "print('Two different languages each have their own internal way of representing data')",
        "print('JSON is a text-based format both languages can read and write, acting as a shared go-between')",
      ],
      solution_code:
        "print('Two different languages each have their own internal way of representing data')\n\nprint('JSON is a text-based format both languages can read and write, acting as a shared go-between')\n\nprint('Any language that can read that text format can parse it into its own native data structure')",
      expected_output:
        "Two different languages each have their own internal way of representing data\nJSON is a text-based format both languages can read and write, acting as a shared go-between\nAny language that can read that text format can parse it into its own native data structure",
      hints: [
        "Name the actual problem — mismatched internal representations — before naming JSON as the solution.",
        "Parsing into a native structure is the payoff, so it comes last.",
      ],
      solution_summary:
        "Different languages represent data differently internally, so JSON provides a shared text format any of them can parse into their own native structure.",
      key_concepts: ["JSON", "data format"],
    },
    {
      id: "what_is_json_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('JSON objects use curly braces for key-value pairs')\nprint('JSON arrays use square brackets for ordered lists of values')",
      solution_code: "print('JSON objects use curly braces for key-value pairs')\nprint('JSON arrays use square brackets for ordered lists of values')",
      expected_output: "JSON objects use curly braces for key-value pairs\nJSON arrays use square brackets for ordered lists of values",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["JSON object", "JSON array"],
    },
    {
      id: "what_is_json_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about JSON actually prints.",
      buggy_code: "print('JSON stands for JavaScript Object Notation)",
      solution_code: "print('JSON stands for JavaScript Object Notation')",
      expected_output: "JSON stands for JavaScript Object Notation",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "JSON"],
    },
  ],

  what_is_csv: [
    {
      id: "what_is_csv_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how a CSV file's rows relate to its header.",
      shuffled_lines: [
        "print('Every line after that header represents one complete data record')",
        "print('A CSV file\\'s first line conventionally contains a header row naming the columns')",
        "print('Values in each row appear in the same order the header row already established')",
      ],
      solution_code:
        "print('A CSV file\\'s first line conventionally contains a header row naming the columns')\n\nprint('Every line after that header represents one complete data record')\n\nprint('Values in each row appear in the same order the header row already established')",
      expected_output:
        "A CSV file's first line conventionally contains a header row naming the columns\nEvery line after that header represents one complete data record\nValues in each row appear in the same order the header row already established",
      hints: [
        "The header row has to be named first, since every later row is matched against it.",
        "Explaining column order is the final clarifying detail.",
      ],
      solution_summary:
        "The header row names the columns first, each following line is one record, and its values line up in that same header order.",
      key_concepts: ["CSV", "header row"],
    },
    {
      id: "what_is_csv_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('CSV is more compact than JSON for large, flat, uniform tabular data')\nprint('A value containing a comma gets wrapped in quotation marks')",
      solution_code: "print('CSV is more compact than JSON for large, flat, uniform tabular data')\nprint('A value containing a comma gets wrapped in quotation marks')",
      expected_output: "CSV is more compact than JSON for large, flat, uniform tabular data\nA value containing a comma gets wrapped in quotation marks",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["CSV", "quoting"],
    },
    {
      id: "what_is_csv_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about CSV actually prints.",
      buggy_code: "print('CSV has no clean, native way to represent nested or hierarchical data)",
      solution_code: "print('CSV has no clean, native way to represent nested or hierarchical data')",
      expected_output: "CSV has no clean, native way to represent nested or hierarchical data",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "CSV"],
    },
  ],

  reading_writing_files: [
    {
      id: "reading_writing_files_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what happens when a program opens, uses, and closes a file.",
      shuffled_lines: [
        "print('The OS returns a file handle the program uses for every subsequent read or write')",
        "print('Closing the file flushes any buffered data out to the actual physical drive')",
        "print('The program asks the operating system for access to a file, identified by its path')",
      ],
      solution_code:
        "print('The program asks the operating system for access to a file, identified by its path')\n\nprint('The OS returns a file handle the program uses for every subsequent read or write')\n\nprint('Closing the file flushes any buffered data out to the actual physical drive')",
      expected_output:
        "The program asks the operating system for access to a file, identified by its path\nThe OS returns a file handle the program uses for every subsequent read or write\nClosing the file flushes any buffered data out to the actual physical drive",
      hints: [
        "Requesting access has to happen before a handle can be returned.",
        "Flushing buffered data to disk happens when the file is closed, so it comes last.",
      ],
      solution_summary:
        "The program requests file access by path, the OS returns a handle for reads/writes, and closing the file flushes buffered data to disk.",
      key_concepts: ["file handle", "buffering", "closing a file"],
    },
    {
      id: "reading_writing_files_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Reading a file loads its contents from storage into working memory')\nprint('Writing a file saves data from working memory out to storage')",
      solution_code: "print('Reading a file loads its contents from storage into working memory')\nprint('Writing a file saves data from working memory out to storage')",
      expected_output: "Reading a file loads its contents from storage into working memory\nWriting a file saves data from working memory out to storage",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["reading a file", "writing a file"],
    },
    {
      id: "reading_writing_files_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about files actually prints.",
      buggy_code: "print('Forgetting to close a file can mean data never actually reaches the drive)",
      solution_code: "print('Forgetting to close a file can mean data never actually reaches the drive')",
      expected_output: "Forgetting to close a file can mean data never actually reaches the drive",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "closing a file"],
    },
  ],

  what_is_a_schema: [
    {
      id: "what_is_a_schema_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what a schema does for incoming data.",
      shuffled_lines: [
        "print('Validating data against a schema catches a structural problem the instant it arrives')",
        "print('Without a schema, malformed data often only surfaces once a program tries to use it and fails')",
        "print('A schema formally defines which fields must be present and what type each one holds')",
      ],
      solution_code:
        "print('A schema formally defines which fields must be present and what type each one holds')\n\nprint('Without a schema, malformed data often only surfaces once a program tries to use it and fails')\n\nprint('Validating data against a schema catches a structural problem the instant it arrives')",
      expected_output:
        "A schema formally defines which fields must be present and what type each one holds\nWithout a schema, malformed data often only surfaces once a program tries to use it and fails\nValidating data against a schema catches a structural problem the instant it arrives",
      hints: [
        "Define what a schema actually is before contrasting the without-a-schema failure mode.",
        "Catching the problem early is the payoff of having a schema, so it comes last.",
      ],
      solution_summary:
        "A schema defines required fields and types; without one, bad data only surfaces on use, but validating against a schema catches it immediately.",
      key_concepts: ["schema", "validation"],
    },
    {
      id: "what_is_a_schema_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('JSON Schema is a standard for formally defining a valid JSON document\\'s structure')\nprint('A schema is, in a real sense, a static type system for data itself')",
      solution_code: "print('JSON Schema is a standard for formally defining a valid JSON document\\'s structure')\nprint('A schema is, in a real sense, a static type system for data itself')",
      expected_output: "JSON Schema is a standard for formally defining a valid JSON document's structure\nA schema is, in a real sense, a static type system for data itself",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["JSON Schema", "static type system"],
    },
    {
      id: "what_is_a_schema_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about schemas actually prints.",
      buggy_code: "print('A database table\\'s column definitions are themselves a kind of schema)",
      solution_code: "print('A database table\\'s column definitions are themselves a kind of schema')",
      expected_output: "A database table's column definitions are themselves a kind of schema",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "schema"],
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
