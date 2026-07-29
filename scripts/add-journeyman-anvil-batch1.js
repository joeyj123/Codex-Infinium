// Journeyman Anvil batch 1: first 10 empty mechanics topics.
// All use no-code concept types: order, choice, match.
// No Python execution — these are graded by gradeConcept.js against authored keys.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  pointers_references: [
    {
      id: "pointers_references_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how a pointer is used.",
      shuffled_items: [
        "The pointer is dereferenced — the program follows the address to reach the actual data.",
        "Memory is allocated somewhere; the OS records its starting address.",
        "The data at that address is read or modified.",
        "A pointer variable is created and assigned that memory address as its value.",
      ],
      items: [
        "Memory is allocated somewhere; the OS records its starting address.",
        "A pointer variable is created and assigned that memory address as its value.",
        "The pointer is dereferenced — the program follows the address to reach the actual data.",
        "The data at that address is read or modified.",
      ],
      hints: [
        "Memory must exist before anything can point to it.",
        "Dereferencing (following the address) comes before you can read or write the data.",
      ],
      solution_summary: "Memory is allocated first, a pointer stores the address, the pointer is dereferenced to reach the data, and then the data is used.",
      key_concepts: ["pointer", "memory address", "dereference"],
    },
    {
      id: "pointers_references_jv2",
      type: "choice",
      prompt: "Which of the following best describes what a pointer stores?",
      options: [
        "A copy of the data it refers to",
        "The memory address where the data is located",
        "The size of the data in bytes",
        "A human-readable name for the data",
      ],
      correct_index: 1,
      hints: [
        "A pointer is a variable, but it holds a very specific kind of value.",
        "It is not the data itself — it is something that tells you where the data lives.",
      ],
      solution_summary: "A pointer stores the memory address where the actual data is located — not a copy of the data itself.",
      key_concepts: ["pointer", "memory address"],
    },
    {
      id: "pointers_references_jv3",
      type: "match",
      prompt: "Match each pointer-related term to its definition.",
      left: ["pointer", "dereference", "memory address"],
      right_shuffled: [
        "Following a pointer to access the data at the location it stores",
        "A variable that holds the location of data in memory",
        "A numeric identifier for a specific location in RAM",
      ],
      correct_assignments: [1, 0, 2],
      hints: [
        "A pointer is a kind of variable — what kind of value does it hold?",
        "Dereferencing is the act of following the pointer.",
      ],
      solution_summary: "A pointer holds a memory address; dereferencing follows that address; a memory address is the numeric RAM location.",
      key_concepts: ["pointer", "dereference", "memory address"],
    },
  ],

  value_vs_reference_types: [
    {
      id: "value_vs_reference_types_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe what happens when two variables both point to the same reference-type object.",
      shuffled_items: [
        "Variable B is assigned from A — B gets a copy of the address, not a copy of the data.",
        "An object is created in memory at a specific address.",
        "Modifying the object through B also changes what A sees, because both point to the same location.",
        "Variable A is assigned the object — A stores the address, not a copy of the data.",
      ],
      items: [
        "An object is created in memory at a specific address.",
        "Variable A is assigned the object — A stores the address, not a copy of the data.",
        "Variable B is assigned from A — B gets a copy of the address, not a copy of the data.",
        "Modifying the object through B also changes what A sees, because both point to the same location.",
      ],
      hints: [
        "The object must exist before any variable can reference it.",
        "Assignment of a reference type copies the address, not the underlying data.",
      ],
      solution_summary: "Object created, A stores its address, B copies that address, so both share the same object — mutations through either variable affect both.",
      key_concepts: ["reference type", "shared state", "aliasing"],
    },
    {
      id: "value_vs_reference_types_jv2",
      type: "choice",
      prompt: "If you copy a value-type variable into a second variable and then change the second variable, what happens to the original?",
      options: [
        "The original also changes, because both variables share the same memory location.",
        "The original is unaffected, because value types copy the data itself.",
        "The original is automatically deleted to free memory.",
        "The original changes only if the value is a number.",
      ],
      correct_index: 1,
      hints: [
        "Think about what 'value type' means — is the data shared or duplicated?",
        "Value types copy the actual data; reference types copy an address.",
      ],
      solution_summary: "Value types store a copy of the data in the variable itself, so changing one copy has no effect on the other.",
      key_concepts: ["value type", "copy semantics"],
    },
    {
      id: "value_vs_reference_types_jv3",
      type: "match",
      prompt: "Match each item to whether it is typically a value type, a reference type, or describes value-type assignment behavior.",
      left: ["integer (int)", "list / array", "assignment of an int to a new variable"],
      right_shuffled: [
        "Copies the actual data — changes to the copy leave the original unchanged",
        "Reference type — stores an address; copies share the same underlying object",
        "Value type — stores the data directly in the variable",
      ],
      correct_assignments: [2, 1, 0],
      hints: [
        "Primitive numeric types are typically value types.",
        "Collections like lists store their contents elsewhere; the variable holds a reference.",
      ],
      solution_summary: "int is a value type; a list is a reference type; assigning an int copies the data, so the original is unaffected.",
      key_concepts: ["value type", "reference type", "copy semantics"],
    },
  ],

  recursion: [
    {
      id: "recursion_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe what happens when a recursive function runs.",
      shuffled_items: [
        "Each pending call returns in reverse order, building up the final result.",
        "The function is called with an initial argument.",
        "If not at the base case, it calls itself with a smaller or simpler argument.",
        "It checks whether the argument satisfies the base case.",
        "Eventually a call satisfies the base case and returns without recursing further.",
      ],
      items: [
        "The function is called with an initial argument.",
        "It checks whether the argument satisfies the base case.",
        "If not at the base case, it calls itself with a smaller or simpler argument.",
        "Eventually a call satisfies the base case and returns without recursing further.",
        "Each pending call returns in reverse order, building up the final result.",
      ],
      hints: [
        "The function starts with a check before deciding to recurse.",
        "The base case stops the recursion; unwinding happens after that.",
      ],
      solution_summary: "Called with initial arg → check base case → recurse with smaller arg → base case hit → calls unwind in reverse.",
      key_concepts: ["recursion", "base case", "call stack"],
    },
    {
      id: "recursion_jv2",
      type: "choice",
      prompt: "What is the role of a base case in a recursive function?",
      options: [
        "It is the version of the function that runs the most times.",
        "It is the condition that stops the recursion from continuing indefinitely.",
        "It is the recursive call that reduces the problem size.",
        "It is a special loop that replaces the recursive call.",
      ],
      correct_index: 1,
      hints: [
        "Without it, the recursion would never stop — what prevents that?",
        "It is a termination condition, not a repeated step.",
      ],
      solution_summary: "The base case is the condition under which the function returns immediately without recursing — it terminates the chain of calls.",
      key_concepts: ["base case", "recursion termination"],
    },
    {
      id: "recursion_jv3",
      type: "match",
      prompt: "Match each recursion term to its meaning.",
      left: ["base case", "recursive case", "call stack", "stack overflow"],
      right_shuffled: [
        "The structure that tracks each function call waiting for a result",
        "The condition under which the function returns without calling itself again",
        "What occurs when recursion goes too deep and exhausts available stack memory",
        "The branch that calls the function again with a reduced version of the problem",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "The base case and recursive case are the two branches inside the function.",
        "The call stack is the data structure; stack overflow is what happens when it is exceeded.",
      ],
      solution_summary: "Base case stops recursion; recursive case shrinks the problem; call stack tracks pending calls; stack overflow happens when the stack is exhausted.",
      key_concepts: ["base case", "recursive case", "call stack", "stack overflow"],
    },
  ],

  big_o_notation: [
    {
      id: "big_o_notation_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how to determine an algorithm's Big-O time complexity.",
      shuffled_items: [
        "Drop constant multipliers and lower-order terms.",
        "Identify the basic operation that executes most often (the dominant operation).",
        "Express the remaining term as O(…) — that is the algorithm's Big-O complexity.",
        "Count how many times that operation runs as a function of input size n.",
      ],
      items: [
        "Identify the basic operation that executes most often (the dominant operation).",
        "Count how many times that operation runs as a function of input size n.",
        "Drop constant multipliers and lower-order terms.",
        "Express the remaining term as O(…) — that is the algorithm's Big-O complexity.",
      ],
      hints: [
        "Start with what runs the most, then count, then simplify, then express.",
        "Dropping constants and lower-order terms comes before writing the final O(…).",
      ],
      solution_summary: "Find the dominant operation, count its executions, drop constants/lower-order terms, then express as O(…).",
      key_concepts: ["Big-O", "dominant operation", "complexity analysis"],
    },
    {
      id: "big_o_notation_jv2",
      type: "choice",
      prompt: "An algorithm has a nested loop where the outer loop runs n times and the inner loop also runs n times for each outer iteration. What is its Big-O time complexity?",
      options: [
        "O(n) — because each loop is O(n) and they are treated as one",
        "O(2n) — because there are two separate loops",
        "O(n²) — because the loops multiply together",
        "O(log n) — because each iteration narrows the remaining work",
      ],
      correct_index: 2,
      hints: [
        "When one loop is nested inside another, the operations multiply rather than add.",
        "n iterations × n iterations = how many total operations?",
      ],
      solution_summary: "A loop nested inside another runs n × n = n² times in the worst case, so the complexity is O(n²).",
      key_concepts: ["Big-O", "nested loops", "O(n²)"],
    },
    {
      id: "big_o_notation_jv3",
      type: "match",
      prompt: "Match each Big-O class to the best plain-English description.",
      left: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
      right_shuffled: [
        "Time grows proportionally to the square of input size — typical of a nested loop",
        "Time is constant regardless of input size",
        "Time grows proportionally with input size — checking every element once",
        "Each step halves the remaining problem — typical of binary search",
      ],
      correct_assignments: [1, 2, 3, 0],
      hints: [
        "O(1) is the best possible: size does not matter at all.",
        "O(log n) shrinks the problem each step; O(n²) has a nested structure.",
      ],
      solution_summary: "O(1) constant; O(n) linear; O(log n) halving each step; O(n²) quadratic/nested.",
      key_concepts: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    },
  ],

  sorting_algorithms: [
    {
      id: "sorting_algorithms_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe one full pass of the bubble sort algorithm.",
      shuffled_items: [
        "After reaching the end, the largest unsorted element has 'bubbled' to its correct position.",
        "Compare the current element with the next one.",
        "Start at the beginning of the array.",
        "Move one position forward and repeat the comparison.",
        "If the two elements are out of order, swap them.",
      ],
      items: [
        "Start at the beginning of the array.",
        "Compare the current element with the next one.",
        "If the two elements are out of order, swap them.",
        "Move one position forward and repeat the comparison.",
        "After reaching the end, the largest unsorted element has 'bubbled' to its correct position.",
      ],
      hints: [
        "The pass starts at the beginning and moves forward one step at a time.",
        "Each comparison may or may not produce a swap; either way, you advance before repeating.",
      ],
      solution_summary: "Start at index 0 → compare adjacent pair → swap if out of order → advance → repeat until the end; the largest element has bubbled to its final place.",
      key_concepts: ["bubble sort", "comparison", "swap", "pass"],
    },
    {
      id: "sorting_algorithms_jv2",
      type: "choice",
      prompt: "Which sorting algorithm guarantees O(n log n) time complexity on every input, including the worst case?",
      options: [
        "Bubble sort",
        "Selection sort",
        "Merge sort",
        "Quicksort",
      ],
      correct_index: 2,
      hints: [
        "Quicksort is O(n log n) on average but can degrade to O(n²) with a poor pivot choice.",
        "Merge sort divides the input in half at every level — its depth is always log n.",
      ],
      solution_summary: "Merge sort always divides and recombines in O(n log n) time regardless of input order — no worst-case O(n²) scenario exists.",
      key_concepts: ["merge sort", "O(n log n)", "worst case"],
    },
    {
      id: "sorting_algorithms_jv3",
      type: "match",
      prompt: "Match each sorting algorithm to its average-case Big-O time complexity.",
      left: ["Bubble sort", "Merge sort", "Quicksort"],
      right_shuffled: [
        "O(n log n) — guaranteed on every input by always dividing in half",
        "O(n²) — compares and swaps adjacent pairs each pass",
        "O(n log n) average — but O(n²) in the worst case with a poor pivot",
      ],
      correct_assignments: [1, 0, 2],
      hints: [
        "Bubble sort is the simplest and slowest of the three.",
        "Merge sort and quicksort are both O(n log n) on average, but differ in their worst case.",
      ],
      solution_summary: "Bubble sort O(n²); merge sort O(n log n) guaranteed; quicksort O(n log n) average, O(n²) worst case.",
      key_concepts: ["bubble sort", "merge sort", "quicksort", "Big-O"],
    },
  ],

  searching_algorithms: [
    {
      id: "searching_algorithms_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how binary search works.",
      shuffled_items: [
        "Set a low pointer at the start and a high pointer at the end.",
        "Confirm the array is sorted — binary search requires this precondition.",
        "Repeat: if the target is smaller than the midpoint, move the high pointer below it; if larger, move the low pointer above it.",
        "Calculate the midpoint index and check the element there.",
        "Stop when the target is found or the pointers cross (meaning the target is absent).",
      ],
      items: [
        "Confirm the array is sorted — binary search requires this precondition.",
        "Set a low pointer at the start and a high pointer at the end.",
        "Calculate the midpoint index and check the element there.",
        "Repeat: if the target is smaller than the midpoint, move the high pointer below it; if larger, move the low pointer above it.",
        "Stop when the target is found or the pointers cross (meaning the target is absent).",
      ],
      hints: [
        "The sorted precondition must be satisfied before anything else.",
        "Set the initial boundaries, then probe the midpoint, then adjust bounds.",
      ],
      solution_summary: "Verify sorted → set low/high pointers → probe midpoint → narrow the search range → repeat until found or exhausted.",
      key_concepts: ["binary search", "sorted array", "midpoint", "O(log n)"],
    },
    {
      id: "searching_algorithms_jv2",
      type: "choice",
      prompt: "What is the key prerequisite for binary search to work correctly?",
      options: [
        "The array must contain only integers.",
        "The array must be sorted in order.",
        "The array length must be a power of two.",
        "The target element must appear more than once.",
      ],
      correct_index: 1,
      hints: [
        "Binary search works by eliminating half the remaining candidates each step — what must be true for that to be valid?",
        "If elements were in random order, knowing the midpoint tells you nothing about which half to search.",
      ],
      solution_summary: "Binary search relies on the sorted order to safely discard half the remaining elements at each step — without it, the logic breaks.",
      key_concepts: ["binary search", "sorted precondition"],
    },
    {
      id: "searching_algorithms_jv3",
      type: "match",
      prompt: "Match each characteristic to the search algorithm it describes.",
      left: ["O(n) worst-case", "Requires a sorted array", "Works on any unsorted collection"],
      right_shuffled: [
        "Linear search only",
        "Both linear search and binary search",
        "Binary search only",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "Binary search is O(log n), not O(n).",
        "Linear search makes no assumptions about order — it checks every element if needed.",
      ],
      solution_summary: "O(n) worst case applies to both; sorted requirement is binary search only; working on unsorted input is linear search only.",
      key_concepts: ["linear search", "binary search", "O(n)", "O(log n)"],
    },
  ],

  multidim_arrays: [
    {
      id: "multidim_arrays_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how to access a specific element in a 2D array.",
      shuffled_items: [
        "Write grid[row][col] to retrieve the element at that intersection.",
        "Identify the row index you want (the first, outer dimension).",
        "Use or modify the retrieved value.",
        "Identify the column index you want (the second, inner dimension).",
      ],
      items: [
        "Identify the row index you want (the first, outer dimension).",
        "Identify the column index you want (the second, inner dimension).",
        "Write grid[row][col] to retrieve the element at that intersection.",
        "Use or modify the retrieved value.",
      ],
      hints: [
        "Row comes first (outer index), column second (inner index).",
        "You retrieve the element before you can use it.",
      ],
      solution_summary: "Identify row → identify column → access grid[row][col] → use the value.",
      key_concepts: ["2D array", "row", "column", "indexing"],
    },
    {
      id: "multidim_arrays_jv2",
      type: "choice",
      prompt: "Given `grid = [['a','b','c'], ['d','e','f']]`, what does `grid[1][2]` return?",
      options: [
        "'b'",
        "'d'",
        "'f'",
        "'e'",
      ],
      correct_index: 2,
      hints: [
        "Index 1 selects the second row: ['d','e','f'].",
        "Index 2 within that row selects the third element.",
      ],
      solution_summary: "grid[1] = ['d','e','f']; grid[1][2] = 'f' (the element at row 1, column 2).",
      key_concepts: ["2D array", "indexing", "row", "column"],
    },
    {
      id: "multidim_arrays_jv3",
      type: "match",
      prompt: "Match each 2D array concept to its description.",
      left: ["row", "column", "grid[2][0]"],
      right_shuffled: [
        "The element in the third row, first column (zero-indexed)",
        "A horizontal slice — selected by the outer (first) index",
        "A vertical slice — selected by the inner (second) index",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "In grid[row][col], the first number is the row — rows are horizontal.",
        "grid[2][0] uses zero-based indexing: row 2 is the third row, column 0 is the first column.",
      ],
      solution_summary: "Row is horizontal (outer index); column is vertical (inner index); grid[2][0] is the third row's first element.",
      key_concepts: ["2D array", "row", "column", "zero-based indexing"],
    },
  ],

  null_none: [
    {
      id: "null_none_jv1",
      type: "order",
      prompt: "Put these steps in order to describe what happens when code tries to call a method on a None/null reference.",
      shuffled_items: [
        "A NullPointerException or AttributeError is raised, halting the program unless caught.",
        "A variable is declared but assigned None or null instead of a real object.",
        "The runtime checks the reference and finds there is no real object there.",
        "Code attempts to access a property or call a method on that variable.",
      ],
      items: [
        "A variable is declared but assigned None or null instead of a real object.",
        "Code attempts to access a property or call a method on that variable.",
        "The runtime checks the reference and finds there is no real object there.",
        "A NullPointerException or AttributeError is raised, halting the program unless caught.",
      ],
      hints: [
        "The variable is assigned None first, before any method call is attempted.",
        "The runtime only detects the problem when the missing object is actually accessed.",
      ],
      solution_summary: "Variable assigned None → method called on it → runtime finds no object → exception raised.",
      key_concepts: ["None", "null", "NullPointerException", "AttributeError"],
    },
    {
      id: "null_none_jv2",
      type: "choice",
      prompt: "What does `None` represent in Python?",
      options: [
        "The integer value zero",
        "An empty string with no characters",
        "The deliberate absence of a value",
        "A boolean False",
      ],
      correct_index: 2,
      hints: [
        "None, 0, '', and False are all different values in Python — they are not interchangeable.",
        "None means 'no value here' rather than 'a zero-value here'.",
      ],
      solution_summary: "None is Python's explicit representation of 'no value' — distinct from 0, False, or an empty string, which are all real values.",
      key_concepts: ["None", "absent value", "null"],
    },
    {
      id: "null_none_jv3",
      type: "match",
      prompt: "Match each null-related term to its description.",
      left: ["None (Python)", "NullPointerException", "null guard / None check"],
      right_shuffled: [
        "Testing whether a variable is None before using it, to prevent a crash",
        "Python's built-in singleton representing the absence of a value",
        "A runtime error raised when code dereferences a null/None reference as if it were a real object",
      ],
      correct_assignments: [1, 2, 0],
      hints: [
        "None is a specific Python object; the other two describe a failure mode and its prevention.",
        "A null guard is defensive code — it prevents the exception from ever being raised.",
      ],
      solution_summary: "None = Python's absent-value singleton; NullPointerException = crash from dereferencing null; null guard = check before use.",
      key_concepts: ["None", "NullPointerException", "defensive programming"],
    },
  ],

  regular_expressions: [
    {
      id: "regular_expressions_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how a regex engine matches a pattern against an input string.",
      shuffled_items: [
        "If a mismatch occurs at this position, advance one character and try again.",
        "The engine starts at the first character of the input string.",
        "If no position produces a full match, the engine reports no match found.",
        "Attempt to match the full pattern starting at the current position.",
        "When the full pattern matches a substring, return that match.",
      ],
      items: [
        "The engine starts at the first character of the input string.",
        "Attempt to match the full pattern starting at the current position.",
        "If a mismatch occurs at this position, advance one character and try again.",
        "When the full pattern matches a substring, return that match.",
        "If no position produces a full match, the engine reports no match found.",
      ],
      hints: [
        "The engine tries each starting position in order from left to right.",
        "A successful match is reported as soon as it is found; a failed match is reported only after all positions are exhausted.",
      ],
      solution_summary: "Start at position 0 → try to match → mismatch? advance and retry → match found? return it → all positions exhausted? report no match.",
      key_concepts: ["regex", "pattern matching", "engine traversal"],
    },
    {
      id: "regular_expressions_jv2",
      type: "choice",
      prompt: "In a regular expression, what does the `.` (dot) metacharacter match?",
      options: [
        "A literal period character only",
        "Any single character except a newline",
        "Zero or more of the preceding character",
        "The start of a line",
      ],
      correct_index: 1,
      hints: [
        "The dot is a wildcard — but it has one common exception.",
        "To match a literal period, you must escape it: `\\.`",
      ],
      solution_summary: "A dot matches any single character except a newline — it is a single-character wildcard, not a literal period.",
      key_concepts: ["regex", "dot metacharacter", "wildcard"],
    },
    {
      id: "regular_expressions_jv3",
      type: "match",
      prompt: "Match each regex metacharacter to its meaning.",
      left: ["*", "+", "^", "$"],
      right_shuffled: [
        "Anchors the match to the end of the string",
        "Matches zero or more of the preceding element",
        "Anchors the match to the start of the string",
        "Matches one or more of the preceding element",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "* and + are quantifiers — they both repeat, but one allows zero occurrences.",
        "^ and $ are anchors — ^ is the start, $ is the end.",
      ],
      solution_summary: "* = zero or more; + = one or more; ^ = start anchor; $ = end anchor.",
      key_concepts: ["regex", "quantifiers", "anchors", "metacharacters"],
    },
  ],

  debugging_tools_breakpoints: [
    {
      id: "debugging_tools_breakpoints_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how to use a debugger to track down a bug.",
      shuffled_items: [
        "Step through lines one at a time, watching how variable values change.",
        "Inspect the current values of variables in the debugger's watch panel.",
        "Run the program in debug mode — execution pauses at the breakpoint.",
        "Set a breakpoint on or near the line you suspect is causing the problem.",
        "Identify the line where a variable holds an unexpected value and fix the logic.",
      ],
      items: [
        "Set a breakpoint on or near the line you suspect is causing the problem.",
        "Run the program in debug mode — execution pauses at the breakpoint.",
        "Inspect the current values of variables in the debugger's watch panel.",
        "Step through lines one at a time, watching how variable values change.",
        "Identify the line where a variable holds an unexpected value and fix the logic.",
      ],
      hints: [
        "The breakpoint must be set before the program is run.",
        "Inspection and stepping happen after the program has paused; the fix comes last.",
      ],
      solution_summary: "Set breakpoint → run in debug mode → inspect state → step through → find the bad value → fix.",
      key_concepts: ["debugger", "breakpoint", "step", "inspect"],
    },
    {
      id: "debugging_tools_breakpoints_jv2",
      type: "choice",
      prompt: "What does setting a breakpoint in a debugger do?",
      options: [
        "It permanently removes that line of code from the program.",
        "It pauses execution at that line so you can inspect program state.",
        "It skips over that line without executing it.",
        "It marks the line as a known bug for future reference only.",
      ],
      correct_index: 1,
      hints: [
        "The breakpoint does not change the code itself — it only affects execution flow.",
        "A breakpoint is like a pause button placed at a specific line.",
      ],
      solution_summary: "A breakpoint pauses execution when reached, giving you the opportunity to inspect variable values and understand program state at that moment.",
      key_concepts: ["breakpoint", "debugger", "execution pause"],
    },
    {
      id: "debugging_tools_breakpoints_jv3",
      type: "match",
      prompt: "Match each debugger feature to what it does.",
      left: ["breakpoint", "step over", "watch expression", "call stack panel"],
      right_shuffled: [
        "A list of currently active function calls, showing the path that led to the current line",
        "A marker that pauses execution when the program reaches that line",
        "A variable or expression whose value is tracked and updated continuously as you step",
        "Executes the current line and moves to the next without stepping into any function it calls",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "'Step over' moves forward one line at a time without entering function bodies.",
        "The call stack shows where you are and how you got there.",
      ],
      solution_summary: "Breakpoint = pause marker; step over = advance one line without entering functions; watch = live value tracker; call stack = active call chain.",
      key_concepts: ["breakpoint", "step over", "watch expression", "call stack"],
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
