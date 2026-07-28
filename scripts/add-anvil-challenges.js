// One-time content-authoring script for Anvil A (The Anvil, Forge F pilot).
// Adds a `anvil_challenges` array to a small batch of Expert Python topics.
// Run once with `node scripts/add-anvil-challenges.js`, then delete/leave as a record.

const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

const py = kb.tiers.find((t) => t.id === "expert").language_tracks.python;

const CHALLENGES = {
  py_list_comprehensions: [
    {
      id: "py_list_comprehensions_wc1",
      type: "reorder",
      prompt:
        "Reorder these lines into a working program that builds a list comprehension squaring only the even numbers in `nums`, then prints the result.",
      shuffled_lines: [
        "print(squares)",
        "squares = [n * n for n in nums if n % 2 == 0]",
        "nums = [1, 2, 3, 4, 5, 6]",
      ],
      solution_code:
        "nums = [1, 2, 3, 4, 5, 6]\nsquares = [n * n for n in nums if n % 2 == 0]\nprint(squares)",
      expected_output: "[4, 16, 36]",
      hints: [
        "The data has to exist before a comprehension can iterate over it.",
        "The comprehension itself has to run before its result can be printed.",
      ],
      solution_summary:
        "Define `nums` first, build `squares` with `[n * n for n in nums if n % 2 == 0]`, then print it.",
      key_concepts: ["list comprehension", "filtering", "execution order"],
    },
    {
      id: "py_list_comprehensions_wc2",
      type: "fix",
      prompt:
        "This comprehension is meant to keep only words longer than 3 letters, but it has a syntax bug — the `for` and `if` clauses are out of order. Fix it so it runs and prints the long words.",
      buggy_code:
        'words = ["cat", "elephant", "dog", "hippopotamus"]\nlong_words = [w for w if len(w) > 3 in words]\nprint(long_words)',
      solution_code:
        'words = ["cat", "elephant", "dog", "hippopotamus"]\nlong_words = [w for w in words if len(w) > 3]\nprint(long_words)',
      expected_output: "['elephant', 'hippopotamus']",
      hints: [
        "A comprehension's clauses always go `for ... in ... if ...`, in that order.",
        "`w if len(w) > 3 in words` is not valid — the `for` clause has to name the source iterable directly after `in`.",
      ],
      solution_summary:
        "The `for item in iterable` clause always comes before the `if condition` clause in a comprehension.",
      key_concepts: ["list comprehension", "syntax", "filtering"],
    },
    {
      id: "py_list_comprehensions_wc3",
      type: "reorder",
      prompt:
        "Reorder these lines into a program that uses a nested comprehension to flatten a list of lists into one flat list of numbers, then prints it.",
      shuffled_lines: [
        "print(flat)",
        "matrix = [[1, 2], [3, 4], [5, 6]]",
        "flat = [num for row in matrix for num in row]",
      ],
      solution_code:
        "matrix = [[1, 2], [3, 4], [5, 6]]\nflat = [num for row in matrix for num in row]\nprint(flat)",
      expected_output: "[1, 2, 3, 4, 5, 6]",
      hints: [
        "`matrix` has to be defined before anything can iterate over it.",
        "In a nested comprehension, the `for` clauses read left to right like nested loops — the outer `for row in matrix` has to come before `for num in row`.",
      ],
      solution_summary:
        "`[num for row in matrix for num in row]` iterates rows, then characters within each row, flattening as it goes.",
      key_concepts: ["nested list comprehension", "flattening", "execution order"],
    },
  ],

  py_decorators: [
    {
      id: "py_decorators_wc1",
      type: "reorder",
      prompt:
        "Reorder these three blocks into a working `@log_call` decorator that prints the function name before calling it, applied to `add(a, b)`.",
      shuffled_lines: [
        'print(add(3, 4))',
        'def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper',
        '@log_call\ndef add(a, b):\n    return a + b',
      ],
      solution_code:
        'def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))',
      expected_output: "Calling add\n7",
      hints: [
        "`log_call` has to be defined before `@log_call` can reference it.",
        "`add` has to be decorated before it's called.",
      ],
      solution_summary:
        "`log_call` must be defined first, then applied with `@log_call` above `add`, then `add` can be called.",
      key_concepts: ["decorator", "closures", "definition order"],
    },
    {
      id: "py_decorators_wc2",
      type: "fix",
      prompt:
        "This decorator crashes when the wrapped function is called with arguments. Fix `wrapper` so it can forward any arguments through to the original function.",
      buggy_code:
        'def log_call(func):\n    def wrapper():\n        print(f"Calling {func.__name__}")\n        return func()\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))',
      solution_code:
        'def log_call(func):\n    def wrapper(*args, **kwargs):\n        print(f"Calling {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@log_call\ndef add(a, b):\n    return a + b\n\nprint(add(3, 4))',
      expected_output: "Calling add\n7",
      hints: [
        "`wrapper` takes no arguments right now, but `add` needs two.",
        "`*args, **kwargs` lets `wrapper` accept and forward any combination of arguments to `func`.",
      ],
      solution_summary:
        "`wrapper(*args, **kwargs)` forwarding to `func(*args, **kwargs)` lets the decorator work with any function signature, not just zero-argument ones.",
      key_concepts: ["decorator", "*args/**kwargs", "closures"],
    },
    {
      id: "py_decorators_wc3",
      type: "reorder",
      prompt:
        "Reorder these blocks into a program using a `@count_calls` decorator that tracks and prints how many times a function has been called, applied to `greet(name)`.",
      shuffled_lines: [
        'print(greet("Ada"))\nprint(greet("Grace"))',
        'def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        print(f"Call #{wrapper.calls}")\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper',
        '@count_calls\ndef greet(name):\n    return f"Hello, {name}!"',
      ],
      solution_code:
        'def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        print(f"Call #{wrapper.calls}")\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper\n\n@count_calls\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("Ada"))\nprint(greet("Grace"))',
      expected_output: "Call #1\nHello, Ada!\nCall #2\nHello, Grace!",
      hints: [
        "The decorator itself has to exist before it can be applied with `@count_calls`.",
        "A function can carry its own state as an attribute — `wrapper.calls` persists across calls because `wrapper` itself is only created once.",
      ],
      solution_summary:
        "`wrapper.calls`, initialized once outside the inner function, persists across every call to the decorated function, letting the decorator count invocations.",
      key_concepts: ["decorator", "function attributes", "closures", "state"],
    },
  ],

  py_generators: [
    {
      id: "py_generators_wc1",
      type: "reorder",
      prompt:
        "Reorder these two blocks into a working `countdown(n)` generator that yields numbers from `n` down to 1, printed by a for loop.",
      shuffled_lines: [
        "for num in countdown(3):\n    print(num)",
        "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1",
      ],
      solution_code:
        "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)",
      expected_output: "3\n2\n1",
      hints: [
        "`countdown` has to be defined before the for loop can call it.",
        "`yield` inside a function is what makes calling it produce a generator instead of running the body immediately.",
      ],
      solution_summary:
        "`countdown` must be defined before it's iterated; each loop iteration resumes the generator right after its last `yield`.",
      key_concepts: ["generator function", "yield", "lazy iteration", "definition order"],
    },
    {
      id: "py_generators_wc2",
      type: "fix",
      prompt:
        "This `countdown` generator produces no output at all instead of counting down. Find and fix the bug.",
      buggy_code:
        "def countdown(n):\n    while n > 0:\n        return n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)",
      solution_code:
        "def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor num in countdown(3):\n    print(num)",
      expected_output: "3\n2\n1",
      hints: [
        "`return` inside a generator ends the generator immediately (raising `StopIteration`) rather than producing a value and pausing.",
        "The function needs `yield`, not `return`, to hand back a value and resume from that point on the next iteration.",
      ],
      solution_summary:
        "`yield n` pauses and hands back a value each iteration; `return n` inside a generator instead ends it immediately, producing no values at all.",
      key_concepts: ["generator function", "yield vs return", "lazy iteration"],
    },
    {
      id: "py_generators_wc3",
      type: "reorder",
      prompt:
        "Reorder these three lines into a program that lazily generates the squares of 1 through n, sums them with `sum()`, and prints the total.",
      shuffled_lines: [
        "print(total)",
        "total = sum(squares(4))",
        "def squares(n):\n    for i in range(1, n + 1):\n        yield i * i",
      ],
      solution_code:
        "def squares(n):\n    for i in range(1, n + 1):\n        yield i * i\n\ntotal = sum(squares(4))\nprint(total)",
      expected_output: "30",
      hints: [
        "`squares` has to be defined before it can be called inside `sum(...)`.",
        "`sum()` has to run and produce `total` before `total` can be printed.",
      ],
      solution_summary:
        "`sum()` can consume a generator directly, pulling one value at a time from `squares(4)` without ever materializing a full list.",
      key_concepts: ["generator function", "yield", "lazy iteration", "sum() with generators"],
    },
  ],

  py_error_handling_idioms: [
    {
      id: "py_error_handling_idioms_wc1",
      type: "reorder",
      prompt:
        "Reorder these three blocks into a working EAFP-style `get_config_value` function, then call it once for a key that exists and once for a key that doesn't.",
      shuffled_lines: [
        "print(get_config_value(config, 'host'))\nprint(get_config_value(config, 'timeout'))",
        "def get_config_value(config, key):\n    try:\n        return config[key]\n    except KeyError:\n        return 'unset'",
        "config = {'host': 'localhost', 'port': 8080}",
      ],
      solution_code:
        "def get_config_value(config, key):\n    try:\n        return config[key]\n    except KeyError:\n        return 'unset'\n\nconfig = {'host': 'localhost', 'port': 8080}\nprint(get_config_value(config, 'host'))\nprint(get_config_value(config, 'timeout'))",
      expected_output: "localhost\nunset",
      hints: [
        "The function has to be defined, and `config` has to exist, before either can be used in the final calls.",
        "EAFP means attempting `config[key]` directly inside a `try`, then catching `KeyError` if it fails — no `if key in config` pre-check.",
      ],
      solution_summary:
        "`try: return config[key] except KeyError: return 'unset'` attempts the lookup directly and only handles the failure case if it actually happens.",
      key_concepts: ["EAFP", "try/except", "KeyError", "execution order"],
    },
    {
      id: "py_error_handling_idioms_wc2",
      type: "fix",
      prompt:
        "This function is supposed to return `'unset'` when a dictionary key is missing, but it crashes instead. Find and fix the bug.",
      buggy_code:
        "def get_config_value(config, key):\n    try:\n        return config[key]\n    except IndexError:\n        return 'unset'\n\nconfig = {'host': 'localhost', 'port': 8080}\nprint(get_config_value(config, 'host'))\nprint(get_config_value(config, 'timeout'))",
      solution_code:
        "def get_config_value(config, key):\n    try:\n        return config[key]\n    except KeyError:\n        return 'unset'\n\nconfig = {'host': 'localhost', 'port': 8080}\nprint(get_config_value(config, 'host'))\nprint(get_config_value(config, 'timeout'))",
      expected_output: "localhost\nunset",
      hints: [
        "A missing dictionary key raises `KeyError`, not `IndexError` — `IndexError` is for sequences like lists.",
        "The `except` clause has to name the exception type that's actually being raised, or it won't catch it.",
      ],
      solution_summary:
        "A missing dict key raises `KeyError`; catching `IndexError` instead lets the real exception propagate uncaught.",
      key_concepts: ["EAFP", "KeyError vs IndexError", "exception types"],
    },
    {
      id: "py_error_handling_idioms_wc3",
      type: "reorder",
      prompt:
        "Reorder these blocks into a `safe_divide` function using `try`/`except`/`else`/`finally` together, then call it once with valid input and once with a division by zero.",
      shuffled_lines: [
        "print(safe_divide(10, 2))\nprint(safe_divide(5, 0))",
        "def safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print(\"Cannot divide by zero\")\n        return None\n    else:\n        print(\"Division succeeded\")\n        return result\n    finally:\n        print(\"Done attempting division\")",
      ],
      solution_code:
        "def safe_divide(a, b):\n    try:\n        result = a / b\n    except ZeroDivisionError:\n        print(\"Cannot divide by zero\")\n        return None\n    else:\n        print(\"Division succeeded\")\n        return result\n    finally:\n        print(\"Done attempting division\")\n\nprint(safe_divide(10, 2))\nprint(safe_divide(5, 0))",
      expected_output:
        "Division succeeded\nDone attempting division\n5.0\nCannot divide by zero\nDone attempting division\nNone",
      hints: [
        "`safe_divide` has to be defined before it can be called.",
        "`else` only runs when the `try` block succeeds with no exception; `finally` always runs regardless of which path was taken.",
      ],
      solution_summary:
        "`else` runs only on success, `except` only on a caught failure, and `finally` runs either way — here always printing 'Done attempting division' last.",
      key_concepts: ["try/except/else/finally", "ZeroDivisionError", "control flow"],
    },
  ],
};

let addedTopics = 0;
let addedChallenges = 0;

for (const [topicId, challenges] of Object.entries(CHALLENGES)) {
  const topic = py.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    process.exit(1);
  }
  topic.anvil_challenges = challenges;
  addedTopics += 1;
  addedChallenges += challenges.length;
}

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added anvil_challenges to ${addedTopics} topics (${addedChallenges} challenges total).`);
