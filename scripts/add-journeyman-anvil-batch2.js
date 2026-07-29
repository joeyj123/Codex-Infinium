// Journeyman Anvil batch 2: string_manipulation, type_casting,
// trees_binary_general, graphs_data_structure, heaps_priority_queues,
// divide_and_conquer_paradigm, graph_traversal_bfs_dfs, shortest_path_dijkstra,
// dynamic_programming_intro, greedy_algorithms.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  string_manipulation: [
    {
      id: "string_manipulation_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how to split a sentence into individual words and then rejoin them with a different separator.",
      shuffled_items: [
        "Call join() on the new separator, passing the word list, to produce the new string.",
        "Start with an original sentence string.",
        "Confirm the result is a list of individual word strings.",
        "Call split() on the string to divide it at each whitespace boundary.",
      ],
      items: [
        "Start with an original sentence string.",
        "Call split() on the string to divide it at each whitespace boundary.",
        "Confirm the result is a list of individual word strings.",
        "Call join() on the new separator, passing the word list, to produce the new string.",
      ],
      hints: [
        "You must have the string before you can split it.",
        "split() produces a list; join() consumes a list.",
      ],
      solution_summary: "Start with the string → split() into a list of words → confirm the list → rejoin with join().",
      key_concepts: ["split", "join", "string manipulation"],
    },
    {
      id: "string_manipulation_jv2",
      type: "choice",
      prompt: "Which string method searches for a substring and returns the index of its first occurrence, or raises a ValueError if not found?",
      options: [
        "str.find(sub)",
        "str.index(sub)",
        "str.search(sub)",
        "str.locate(sub)",
      ],
      correct_index: 1,
      hints: [
        "One of these two real methods returns -1 on failure; the other raises an exception.",
        "The method that raises ValueError on failure is the one described.",
      ],
      solution_summary: "str.index(sub) raises ValueError if the substring is absent; str.find(sub) returns -1 instead — both are real Python methods.",
      key_concepts: ["str.index", "substring search", "ValueError"],
    },
    {
      id: "string_manipulation_jv3",
      type: "match",
      prompt: "Match each string method to what it does.",
      left: ["str.strip()", "str.replace(old, new)", "str.upper()", "str.split(sep)"],
      right_shuffled: [
        "Returns a new string with every character converted to uppercase",
        "Removes leading and trailing whitespace (or a specified character)",
        "Splits the string at each occurrence of sep, returning a list of substrings",
        "Returns a new string with every occurrence of old replaced by new",
      ],
      correct_assignments: [1, 3, 0, 2],
      hints: [
        "strip removes whitespace from the edges; replace substitutes substrings throughout.",
        "split breaks one string into many; upper changes case.",
      ],
      solution_summary: "strip() removes edge whitespace; replace() substitutes; upper() upcases; split() divides into a list.",
      key_concepts: ["strip", "replace", "upper", "split"],
    },
  ],

  type_casting: [
    {
      id: "type_casting_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to safely convert a user's text input into an integer for arithmetic.",
      shuffled_items: [
        "Use the integer value in arithmetic — it is now a proper number, not a string.",
        "Receive the raw input, which arrives as a string even if the user typed digits.",
        "Wrap the conversion in error handling in case the user typed non-numeric text.",
        "Pass the string to int() to produce an integer value.",
      ],
      items: [
        "Receive the raw input, which arrives as a string even if the user typed digits.",
        "Wrap the conversion in error handling in case the user typed non-numeric text.",
        "Pass the string to int() to produce an integer value.",
        "Use the integer value in arithmetic — it is now a proper number, not a string.",
      ],
      hints: [
        "Input always arrives as a string — you cannot use it as a number without converting it.",
        "Error handling should surround the conversion, not come after the arithmetic.",
      ],
      solution_summary: "Input arrives as string → wrap in error handling → convert with int() → use the resulting integer.",
      key_concepts: ["type casting", "int()", "input validation"],
    },
    {
      id: "type_casting_jv2",
      type: "choice",
      prompt: "What does `int(\"3.7\")` produce in Python?",
      options: [
        "The integer 3",
        "The integer 4 (rounded up)",
        "A ValueError — int() cannot parse a decimal string directly",
        "The float 3.7 unchanged",
      ],
      correct_index: 2,
      hints: [
        "int() accepts strings that look like whole integers — '3', '-5', '100' — not decimals.",
        "To convert '3.7' to an integer in Python you must go via float() first.",
      ],
      solution_summary: "int('3.7') raises ValueError because the string contains a decimal point — use float('3.7') first, then int(), to convert a decimal string to an integer.",
      key_concepts: ["int()", "float()", "ValueError", "type casting"],
    },
    {
      id: "type_casting_jv3",
      type: "match",
      prompt: "Match each Python built-in to the type it converts its argument into.",
      left: ["int(x)", "float(x)", "str(x)", "bool(x)"],
      right_shuffled: [
        "A Boolean — True or False based on truthiness",
        "A whole number with no decimal part",
        "A text representation of the value",
        "A decimal number with a fractional part",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "int and float are both numeric; str produces text; bool produces True/False.",
      ],
      solution_summary: "int() → whole number; float() → decimal; str() → text; bool() → True/False.",
      key_concepts: ["int", "float", "str", "bool", "type casting"],
    },
  ],

  trees_binary_general: [
    {
      id: "trees_binary_general_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how a value is inserted into a binary search tree (BST).",
      shuffled_items: [
        "If the current node is empty (null), insert the new node here.",
        "Start at the root node.",
        "If the value is less than the current node, move to the left child; if greater, move to the right child.",
        "Compare the new value with the current node's value.",
      ],
      items: [
        "Start at the root node.",
        "Compare the new value with the current node's value.",
        "If the value is less than the current node, move to the left child; if greater, move to the right child.",
        "If the current node is empty (null), insert the new node here.",
      ],
      hints: [
        "Every traversal begins at the root.",
        "You navigate left or right based on the comparison before checking for an empty slot.",
      ],
      solution_summary: "Start at root → compare → go left if smaller, right if larger → insert when an empty slot is reached.",
      key_concepts: ["BST", "insertion", "binary search tree"],
    },
    {
      id: "trees_binary_general_jv2",
      type: "choice",
      prompt: "What is a leaf node in a tree?",
      options: [
        "The topmost node that has no parent",
        "Any node that has exactly two children",
        "A node that has no children",
        "The node at the exact middle of the tree",
      ],
      correct_index: 2,
      hints: [
        "The topmost node with no parent is called the root, not a leaf.",
        "Think of an actual tree — leaves are at the tips, where nothing grows further.",
      ],
      solution_summary: "A leaf node is a node with no children — it sits at the outermost edge of the tree with nowhere to branch further.",
      key_concepts: ["leaf node", "tree", "children"],
    },
    {
      id: "trees_binary_general_jv3",
      type: "match",
      prompt: "Match each tree term to its definition.",
      left: ["root", "leaf", "parent", "height"],
      right_shuffled: [
        "The length of the longest path from the root to any leaf",
        "The topmost node in the tree — it has no parent",
        "A node with at least one child — it is directly above those children",
        "A node with no children — it sits at the outermost edge",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Root is the top; leaf is the bottom; parent is above its children.",
        "Height measures depth — the longest root-to-leaf path.",
      ],
      solution_summary: "Root = top/no parent; leaf = bottom/no children; parent = above its children; height = longest root-to-leaf path.",
      key_concepts: ["root", "leaf", "parent", "height", "tree"],
    },
  ],

  graphs_data_structure: [
    {
      id: "graphs_data_structure_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to add an undirected edge between two vertices in an adjacency list representation.",
      shuffled_items: [
        "Add vertex B to vertex A's neighbor list.",
        "Confirm both vertices A and B exist in the adjacency list.",
        "Add vertex A to vertex B's neighbor list (because the edge is undirected).",
        "Verify that the edge now appears in both neighbor lists.",
      ],
      items: [
        "Confirm both vertices A and B exist in the adjacency list.",
        "Add vertex B to vertex A's neighbor list.",
        "Add vertex A to vertex B's neighbor list (because the edge is undirected).",
        "Verify that the edge now appears in both neighbor lists.",
      ],
      hints: [
        "Both vertices must exist before an edge between them can be added.",
        "An undirected edge must be recorded in both directions.",
      ],
      solution_summary: "Confirm vertices exist → add B to A's list → add A to B's list (undirected = both directions) → verify.",
      key_concepts: ["graph", "adjacency list", "undirected edge"],
    },
    {
      id: "graphs_data_structure_jv2",
      type: "choice",
      prompt: "What property distinguishes a graph from a tree?",
      options: [
        "A graph uses nodes while a tree uses vertices.",
        "A graph can contain cycles — paths that loop back to an already-visited node.",
        "A graph always has fewer edges than a tree of the same size.",
        "A graph stores values in sorted order; a tree does not.",
      ],
      correct_index: 1,
      hints: [
        "Trees are actually a special case of graphs — the distinguishing restriction involves cycles.",
        "A tree is defined as an acyclic connected graph.",
      ],
      solution_summary: "A graph can have cycles; a tree is a graph with no cycles (acyclic) and exactly one path between any two nodes.",
      key_concepts: ["graph", "tree", "cycle", "acyclic"],
    },
    {
      id: "graphs_data_structure_jv3",
      type: "match",
      prompt: "Match each graph term to its definition.",
      left: ["vertex (node)", "edge", "directed graph", "weighted graph"],
      right_shuffled: [
        "A graph where each edge has a numeric cost or distance",
        "A fundamental element — a point in the graph",
        "A graph where edges have a direction (A → B does not imply B → A)",
        "A connection between two vertices",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Vertices are the points; edges are the connections between them.",
        "Directed means one-way; weighted means edges have costs.",
      ],
      solution_summary: "Vertex = point; edge = connection; directed = one-way edges; weighted = edges have numeric costs.",
      key_concepts: ["vertex", "edge", "directed graph", "weighted graph"],
    },
  ],

  heaps_priority_queues: [
    {
      id: "heaps_priority_queues_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe extracting the minimum element from a min-heap.",
      shuffled_items: [
        "Remove the root (the minimum element) and save it to return.",
        "The heap property is restored — the new root is the next smallest element.",
        "Move the last element in the heap to the root position.",
        "Repeatedly swap the new root with its smaller child until the heap property holds (sift down).",
      ],
      items: [
        "Remove the root (the minimum element) and save it to return.",
        "Move the last element in the heap to the root position.",
        "Repeatedly swap the new root with its smaller child until the heap property holds (sift down).",
        "The heap property is restored — the new root is the next smallest element.",
      ],
      hints: [
        "You must replace the removed root with something before sifting down.",
        "Sift-down restores the heap property after the root is replaced.",
      ],
      solution_summary: "Remove root → put last element at root → sift down (swap with smaller child) until heap property holds → done.",
      key_concepts: ["min-heap", "extract-min", "sift down", "heap property"],
    },
    {
      id: "heaps_priority_queues_jv2",
      type: "choice",
      prompt: "In a min-heap, where is the smallest element always located?",
      options: [
        "At the leftmost leaf node",
        "At the root",
        "At the rightmost leaf node",
        "At the node with the fewest children",
      ],
      correct_index: 1,
      hints: [
        "The heap property guarantees that every parent is smaller than its children.",
        "Follow that rule to its logical conclusion about the very top of the heap.",
      ],
      solution_summary: "The min-heap property — every parent ≤ its children — guarantees the root is always the smallest element in the entire heap.",
      key_concepts: ["min-heap", "root", "heap property"],
    },
    {
      id: "heaps_priority_queues_jv3",
      type: "match",
      prompt: "Match each heap / priority queue term to its meaning.",
      left: ["min-heap", "sift up (bubble up)", "sift down (bubble down)", "priority queue"],
      right_shuffled: [
        "An abstract data type that always serves the highest-priority element next",
        "A heap where every parent is smaller than or equal to its children; the root is the minimum",
        "The process of moving a newly inserted element up until the heap property is restored",
        "The process of moving an element down after it is placed at the root, restoring the heap property",
      ],
      correct_assignments: [1, 2, 3, 0],
      hints: [
        "Sift up happens after insertion; sift down happens after extraction.",
        "A priority queue is the abstract concept; a heap is one concrete implementation of it.",
      ],
      solution_summary: "Min-heap = parent ≤ children; sift up = fix after insert; sift down = fix after extract; priority queue = serve highest-priority first.",
      key_concepts: ["min-heap", "sift up", "sift down", "priority queue"],
    },
  ],

  divide_and_conquer_paradigm: [
    {
      id: "divide_and_conquer_paradigm_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe the divide-and-conquer strategy.",
      shuffled_items: [
        "Combine the solutions to the subproblems into the solution to the original problem.",
        "Divide the problem into two or more smaller subproblems of the same type.",
        "Base case: if the problem is small enough, solve it directly without recursing.",
        "Conquer: recursively apply the same strategy to each subproblem.",
      ],
      items: [
        "Base case: if the problem is small enough, solve it directly without recursing.",
        "Divide the problem into two or more smaller subproblems of the same type.",
        "Conquer: recursively apply the same strategy to each subproblem.",
        "Combine the solutions to the subproblems into the solution to the original problem.",
      ],
      hints: [
        "The base case must be checked before attempting to divide.",
        "Divide comes before conquer; combine comes last.",
      ],
      solution_summary: "Check base case → divide into subproblems → conquer each recursively → combine results.",
      key_concepts: ["divide and conquer", "base case", "recursion", "combine"],
    },
    {
      id: "divide_and_conquer_paradigm_jv2",
      type: "choice",
      prompt: "Merge sort is a classic divide-and-conquer algorithm. Which step does the merging of two sorted halves correspond to?",
      options: [
        "The divide step — splitting the array in half",
        "The base case — handling a single-element array",
        "The combine step — reconstructing the sorted whole from sorted parts",
        "The conquer step — recursively sorting each half",
      ],
      correct_index: 2,
      hints: [
        "Merge sort splits (divide), recursively sorts each half (conquer), then merges (?).",
        "The merging operation is the step that reconstructs the final sorted array from two sorted subarrays.",
      ],
      solution_summary: "In merge sort, splitting is the divide step, recursive sorting is the conquer step, and merging the two sorted halves is the combine step.",
      key_concepts: ["merge sort", "divide and conquer", "combine"],
    },
    {
      id: "divide_and_conquer_paradigm_jv3",
      type: "match",
      prompt: "Match each divide-and-conquer phase to its description.",
      left: ["divide", "conquer", "combine", "base case"],
      right_shuffled: [
        "Merge, concatenate, or otherwise assemble the subproblem results into the final answer",
        "The smallest input that is solved directly, without further splitting",
        "Break the problem into smaller instances of the same problem",
        "Recursively apply the full algorithm to each subproblem",
      ],
      correct_assignments: [2, 3, 0, 1],
      hints: [
        "Divide breaks; conquer recurses; combine assembles; base case terminates.",
      ],
      solution_summary: "Divide = break apart; conquer = recurse on parts; combine = assemble results; base case = direct solution for the smallest input.",
      key_concepts: ["divide", "conquer", "combine", "base case"],
    },
  ],

  graph_traversal_bfs_dfs: [
    {
      id: "graph_traversal_bfs_dfs_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe breadth-first search (BFS) starting from a source vertex.",
      shuffled_items: [
        "Dequeue the front vertex, mark it visited, and process it.",
        "Enqueue the source vertex and mark it as visited.",
        "For each unvisited neighbor of the dequeued vertex, mark it visited and enqueue it.",
        "Repeat until the queue is empty.",
      ],
      items: [
        "Enqueue the source vertex and mark it as visited.",
        "Dequeue the front vertex, mark it visited, and process it.",
        "For each unvisited neighbor of the dequeued vertex, mark it visited and enqueue it.",
        "Repeat until the queue is empty.",
      ],
      hints: [
        "BFS uses a queue — enqueue the start before the loop begins.",
        "Each iteration dequeues one vertex and enqueues its unvisited neighbors.",
      ],
      solution_summary: "Enqueue source → dequeue front → enqueue unvisited neighbors → repeat until queue empty.",
      key_concepts: ["BFS", "queue", "graph traversal", "visited"],
    },
    {
      id: "graph_traversal_bfs_dfs_jv2",
      type: "choice",
      prompt: "Which data structure does breadth-first search (BFS) use to track which vertex to visit next?",
      options: [
        "A stack — last in, first out",
        "A queue — first in, first out",
        "A priority queue — highest priority first",
        "A set — unordered, no duplicates",
      ],
      correct_index: 1,
      hints: [
        "BFS explores all neighbors at the current depth before going deeper — which structure matches that level-by-level order?",
        "DFS uses a stack (or the call stack via recursion); BFS uses the other one.",
      ],
      solution_summary: "BFS uses a queue (FIFO) — vertices are visited in the order they are discovered, producing level-by-level exploration.",
      key_concepts: ["BFS", "queue", "FIFO"],
    },
    {
      id: "graph_traversal_bfs_dfs_jv3",
      type: "match",
      prompt: "Match each traversal characteristic to the algorithm it describes.",
      left: ["Uses a queue (FIFO)", "Uses a stack or recursion", "Finds shortest path in unweighted graphs", "May explore very deep before backtracking"],
      right_shuffled: [
        "Depth-first search (DFS)",
        "Both BFS and DFS",
        "Breadth-first search (BFS)",
        "Depth-first search (DFS) only",
      ],
      correct_assignments: [2, 0, 2, 3],
      hints: [
        "BFS's queue gives it level-by-level order, which is why it finds shortest paths in unweighted graphs.",
        "DFS follows a path as deep as possible before backtracking.",
      ],
      solution_summary: "Queue = BFS; stack/recursion = DFS; shortest unweighted path = BFS; deep-before-backtrack = DFS.",
      key_concepts: ["BFS", "DFS", "queue", "stack", "shortest path"],
    },
  ],

  shortest_path_dijkstra: [
    {
      id: "shortest_path_dijkstra_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe Dijkstra's shortest-path algorithm.",
      shuffled_items: [
        "Extract the unvisited vertex with the smallest tentative distance from the priority queue.",
        "Initialize: set the source vertex's distance to 0 and all others to infinity.",
        "For each neighbor of the extracted vertex, update its distance if a shorter path through the current vertex exists.",
        "Mark the extracted vertex as visited; repeat until the destination is reached or the queue is empty.",
      ],
      items: [
        "Initialize: set the source vertex's distance to 0 and all others to infinity.",
        "Extract the unvisited vertex with the smallest tentative distance from the priority queue.",
        "For each neighbor of the extracted vertex, update its distance if a shorter path through the current vertex exists.",
        "Mark the extracted vertex as visited; repeat until the destination is reached or the queue is empty.",
      ],
      hints: [
        "Initialization comes first; the source starts at distance 0.",
        "At each step, greedily pick the closest unvisited vertex.",
      ],
      solution_summary: "Set source to 0, rest to ∞ → extract closest unvisited → relax neighbors → mark visited → repeat.",
      key_concepts: ["Dijkstra", "shortest path", "priority queue", "relaxation"],
    },
    {
      id: "shortest_path_dijkstra_jv2",
      type: "choice",
      prompt: "What type of edge weights does Dijkstra's algorithm require to guarantee a correct result?",
      options: [
        "All edges must be unweighted (treated as weight 1).",
        "Edge weights must be non-negative.",
        "Edge weights must be integers only.",
        "Edge weights must all be equal.",
      ],
      correct_index: 1,
      hints: [
        "Dijkstra's greedy approach relies on the assumption that once a vertex is finalized, no shorter path can be found later.",
        "A negative-weight edge can violate that assumption — a later path could turn out shorter.",
      ],
      solution_summary: "Dijkstra requires non-negative edge weights — a negative weight can produce a 'shorter' path discovered after a vertex is already finalized, breaking the algorithm.",
      key_concepts: ["Dijkstra", "non-negative weights", "shortest path"],
    },
    {
      id: "shortest_path_dijkstra_jv3",
      type: "match",
      prompt: "Match each Dijkstra component to its role.",
      left: ["tentative distance", "relaxation", "priority queue", "visited set"],
      right_shuffled: [
        "Tracks vertices already finalized so they are not processed again",
        "The current best-known cost to reach a vertex — updated as shorter paths are discovered",
        "Efficiently retrieves the unvisited vertex with the smallest current distance",
        "Updating a neighbor's tentative distance when a shorter path through the current vertex is found",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Tentative distance is the value stored per vertex; relaxation is the act of improving it.",
        "The priority queue serves the greedy 'pick closest' step; the visited set prevents re-processing.",
      ],
      solution_summary: "Tentative distance = current best cost; relaxation = improving it; priority queue = greedy selection; visited set = finalized vertices.",
      key_concepts: ["Dijkstra", "tentative distance", "relaxation", "priority queue"],
    },
  ],

  dynamic_programming_intro: [
    {
      id: "dynamic_programming_intro_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe the memoization approach to dynamic programming.",
      shuffled_items: [
        "Before computing a subproblem, check whether its result is already in the cache.",
        "Identify overlapping subproblems — the same smaller computation needed more than once.",
        "If cached, return the stored result immediately without recomputing.",
        "If not cached, compute the result, store it in the cache, then return it.",
      ],
      items: [
        "Identify overlapping subproblems — the same smaller computation needed more than once.",
        "Before computing a subproblem, check whether its result is already in the cache.",
        "If cached, return the stored result immediately without recomputing.",
        "If not cached, compute the result, store it in the cache, then return it.",
      ],
      hints: [
        "You must recognize overlapping subproblems before applying memoization makes sense.",
        "Check the cache before computing; store after computing.",
      ],
      solution_summary: "Identify overlapping subproblems → check cache → return if found → compute, store, and return if not.",
      key_concepts: ["memoization", "dynamic programming", "cache", "overlapping subproblems"],
    },
    {
      id: "dynamic_programming_intro_jv2",
      type: "choice",
      prompt: "What is the key property that makes dynamic programming applicable to a problem — the property that plain divide-and-conquer does not exploit?",
      options: [
        "The problem can be divided into independent subproblems that do not share any overlap.",
        "The subproblems overlap — the same smaller subproblem is solved repeatedly in a naive approach.",
        "The problem always has a single unique optimal solution.",
        "The input is always pre-sorted before the algorithm begins.",
      ],
      correct_index: 1,
      hints: [
        "Divide-and-conquer (like merge sort) splits into fully independent halves — no subproblem is solved twice.",
        "DP is valuable precisely when subproblems repeat — you trade memory for speed by caching.",
      ],
      solution_summary: "Overlapping subproblems are the key: DP caches results to avoid recomputing the same subproblem repeatedly, which plain divide-and-conquer never needs to do.",
      key_concepts: ["overlapping subproblems", "dynamic programming", "memoization"],
    },
    {
      id: "dynamic_programming_intro_jv3",
      type: "match",
      prompt: "Match each dynamic programming term to its meaning.",
      left: ["memoization", "tabulation", "overlapping subproblems", "optimal substructure"],
      right_shuffled: [
        "The property that an optimal solution to the whole problem contains optimal solutions to its subproblems",
        "Top-down DP: recursively solve subproblems and cache each result as it is computed",
        "The property that the same smaller subproblem appears multiple times in the recursion tree",
        "Bottom-up DP: fill a table of subproblem results iteratively, starting from the smallest",
      ],
      correct_assignments: [1, 3, 2, 0],
      hints: [
        "Memoization is top-down (recursive + cache); tabulation is bottom-up (iterative table).",
        "Overlapping subproblems and optimal substructure are the two conditions that make DP applicable.",
      ],
      solution_summary: "Memoization = top-down cache; tabulation = bottom-up table; overlapping subproblems = repeated calls; optimal substructure = optimal sub-answers build optimal full answer.",
      key_concepts: ["memoization", "tabulation", "overlapping subproblems", "optimal substructure"],
    },
  ],

  greedy_algorithms: [
    {
      id: "greedy_algorithms_jv1",
      type: "order",
      prompt: "Put these steps in the correct order to describe how a greedy algorithm makes decisions.",
      shuffled_items: [
        "From the remaining options, choose the one that looks best right now (locally optimal).",
        "Never revisit or undo that choice — greedy commits permanently.",
        "Check whether the problem is fully solved; if not, repeat.",
        "Start with an empty or initial solution.",
      ],
      items: [
        "Start with an empty or initial solution.",
        "From the remaining options, choose the one that looks best right now (locally optimal).",
        "Never revisit or undo that choice — greedy commits permanently.",
        "Check whether the problem is fully solved; if not, repeat.",
      ],
      hints: [
        "An empty/initial state comes first.",
        "The defining property is that the choice is committed to immediately — no backtracking.",
      ],
      solution_summary: "Start empty → pick locally best option → commit (no backtracking) → repeat until done.",
      key_concepts: ["greedy", "locally optimal", "no backtracking"],
    },
    {
      id: "greedy_algorithms_jv2",
      type: "choice",
      prompt: "In which scenario is a greedy algorithm NOT guaranteed to find the globally optimal solution?",
      options: [
        "Making change with standard coin denominations (e.g., 25¢, 10¢, 5¢, 1¢)",
        "Finding the minimum spanning tree of a weighted graph (Kruskal's algorithm)",
        "The 0/1 knapsack problem — where each item can be taken at most once",
        "Selecting the fewest intervals to cover a range (interval scheduling)",
      ],
      correct_index: 2,
      hints: [
        "The 0/1 knapsack cannot be solved greedily because committing to a large item may prevent a better combination of smaller items.",
        "Standard coin change, minimum spanning trees, and interval scheduling are classic problems where greedy provably works.",
      ],
      solution_summary: "The 0/1 knapsack is a classic case where greedy fails — dynamic programming is needed because each choice depends on the full combination of items taken.",
      key_concepts: ["greedy", "0/1 knapsack", "globally optimal", "dynamic programming"],
    },
    {
      id: "greedy_algorithms_jv3",
      type: "match",
      prompt: "Match each term to whether it describes a greedy algorithm, dynamic programming, or a shared property of both.",
      left: ["Makes locally optimal choices without backtracking", "Caches and reuses results of overlapping subproblems", "Requires optimal substructure to guarantee a correct result", "Commits to each choice permanently"],
      right_shuffled: [
        "Greedy only",
        "Both greedy and dynamic programming",
        "Dynamic programming only",
        "Greedy only",
      ],
      correct_assignments: [0, 2, 1, 3],
      hints: [
        "Both greedy and DP require optimal substructure — that property alone does not distinguish them.",
        "Caching is DP's hallmark; permanent commitment with no backtracking is greedy's hallmark.",
      ],
      solution_summary: "Locally optimal without backtracking = greedy; caching overlapping results = DP; optimal substructure = both; permanent commitment = greedy.",
      key_concepts: ["greedy", "dynamic programming", "optimal substructure", "backtracking"],
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
