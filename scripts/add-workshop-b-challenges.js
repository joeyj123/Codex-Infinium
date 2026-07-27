// One-time content-authoring script for Workshop B (output-matching +
// build-to-spec challenge types). Appends to the `workshop_challenges`
// arrays Workshop A already created on the same 4 pilot topics — does not
// touch existing reorder/fix entries.

const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

const py = kb.tiers.find((t) => t.id === "expert").language_tracks.python;

const NEW_CHALLENGES = {
  py_list_comprehensions: [
    {
      id: "py_list_comprehensions_wc4",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print — don't run it in your head loosely, trace it.",
      snippet_code: 'nums = [3, 7, 2, 9, 4]\nresult = [n for n in nums if n > 4]\nprint(result)',
      solution_code: 'nums = [3, 7, 2, 9, 4]\nresult = [n for n in nums if n > 4]\nprint(result)',
      expected_output: "[7, 9]",
      hints: [
        "The comprehension keeps only the numbers where `n > 4` — check each number in `nums` against that condition in order.",
        "The result keeps the original relative order of the numbers that pass the filter.",
      ],
      solution_summary: "Only 7 and 9 are greater than 4, and they keep their original order: `[7, 9]`.",
      key_concepts: ["list comprehension", "filtering", "tracing execution"],
    },
    {
      id: "py_list_comprehensions_wc5",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print, including punctuation.",
      snippet_code:
        'pairs = [("a", 1), ("b", 2), ("c", 3)]\nlookup = {k: v * 10 for k, v in pairs}\nprint(lookup)',
      solution_code:
        'pairs = [("a", 1), ("b", 2), ("c", 3)]\nlookup = {k: v * 10 for k, v in pairs}\nprint(lookup)',
      expected_output: "{'a': 10, 'b': 20, 'c': 30}",
      hints: [
        "This is a dict comprehension: `{k: v * 10 for k, v in pairs}` builds a dictionary, not a list.",
        "Each tuple `(k, v)` in `pairs` unpacks into a key `k` and a value `v`, which gets multiplied by 10.",
      ],
      solution_summary: "Each `(key, value)` pair becomes a dict entry with the value multiplied by 10.",
      key_concepts: ["dict comprehension", "tuple unpacking", "tracing execution"],
    },
    {
      id: "py_list_comprehensions_wc6",
      type: "build",
      prompt:
        "Write a program that builds a list comprehension producing the cubes of every number from 1 to 5 (inclusive), then prints the result.",
      starter_code: "# build the cubes list here\nprint(cubes)",
      solution_code: "cubes = [n ** 3 for n in range(1, 6)]\nprint(cubes)",
      expected_output: "[1, 8, 27, 64, 125]",
      hints: [
        "`range(1, 6)` produces the numbers 1 through 5 — `range`'s upper bound is exclusive.",
        "Cubing a number is `n ** 3`.",
      ],
      solution_summary: "`[n ** 3 for n in range(1, 6)]` cubes each number from 1 through 5 in one comprehension.",
      key_concepts: ["list comprehension", "range()", "exponentiation"],
    },
    {
      id: "py_list_comprehensions_wc7",
      type: "build",
      prompt:
        "Write a program that uses a list comprehension to extract only the vowels (a, e, i, o, u) from the string `text = 'hello world'`, then prints them as a list.",
      starter_code: "text = \"hello world\"\n# build the vowels list here\nprint(vowels)",
      solution_code: 'text = "hello world"\nvowels = [c for c in text if c in "aeiou"]\nprint(vowels)',
      expected_output: "['e', 'o', 'o']",
      hints: [
        "A string is iterable — `for c in text` walks it one character at a time.",
        "`if c in \"aeiou\"` checks whether a single character is one of the five vowels.",
      ],
      solution_summary: "`[c for c in text if c in \"aeiou\"]` keeps only the characters that are vowels.",
      key_concepts: ["list comprehension", "string iteration", "membership test"],
    },
  ],

  py_decorators: [
    {
      id: "py_decorators_wc4",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print.",
      snippet_code:
        'def shout(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n@shout\ndef greet(name):\n    return f"hello {name}"\n\nprint(greet("sam"))',
      solution_code:
        'def shout(func):\n    def wrapper(*args, **kwargs):\n        result = func(*args, **kwargs)\n        return result.upper()\n    return wrapper\n\n@shout\ndef greet(name):\n    return f"hello {name}"\n\nprint(greet("sam"))',
      expected_output: "HELLO SAM",
      hints: [
        "`greet(\"sam\")` actually calls `wrapper(\"sam\")`, since `@shout` replaced `greet` with `wrapper`.",
        "`wrapper` calls the real `greet`, then uppercases whatever string it returned before handing it back.",
      ],
      solution_summary: "`greet(\"sam\")` returns `\"hello sam\"`, which `wrapper` then uppercases to `\"HELLO SAM\"`.",
      key_concepts: ["decorator", "closures", "tracing execution"],
    },
    {
      id: "py_decorators_wc5",
      type: "output",
      prompt: "This function has two decorators stacked on top of each other. Read carefully and type exactly what it will print.",
      snippet_code:
        'def bracket(func):\n    def wrapper(*args, **kwargs):\n        return f"[{func(*args, **kwargs)}]"\n    return wrapper\n\ndef shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@bracket\n@shout\ndef greet(name):\n    return f"hi {name}"\n\nprint(greet("ada"))',
      solution_code:
        'def bracket(func):\n    def wrapper(*args, **kwargs):\n        return f"[{func(*args, **kwargs)}]"\n    return wrapper\n\ndef shout(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs).upper()\n    return wrapper\n\n@bracket\n@shout\ndef greet(name):\n    return f"hi {name}"\n\nprint(greet("ada"))',
      expected_output: "[HI ADA]",
      hints: [
        "Stacked decorators apply bottom-up: `@shout` wraps `greet` first, then `@bracket` wraps the *result* of that.",
        "So the call order is `bracket(shout(greet))` — `shout` uppercases first, then `bracket` adds the brackets around that.",
      ],
      solution_summary:
        "`shout` runs first (closest to `greet`), uppercasing to `\"HI ADA\"`; `bracket` then wraps that in `[...]`.",
      key_concepts: ["decorator", "stacked decorators", "order of application"],
    },
    {
      id: "py_decorators_wc6",
      type: "build",
      prompt:
        "Write a decorator called `double_result` that takes a function returning a number and doubles whatever it returns. Apply it to a function `square(x)` that returns `x * x`, and call `square(5)`, printing the result.",
      starter_code: "# define double_result here\n\n# define and decorate square here\n\nprint(square(5))",
      solution_code:
        "def double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper\n\n@double_result\ndef square(x):\n    return x * x\n\nprint(square(5))",
      expected_output: "50",
      hints: [
        "A decorator is a function that takes a function and returns a new function.",
        "`square(5)` returns 25 before decoration; doubling that after the fact gives 50.",
      ],
      solution_summary: "`wrapper` calls the original function and multiplies its return value by 2 before handing it back.",
      key_concepts: ["decorator", "closures", "*args/**kwargs"],
    },
    {
      id: "py_decorators_wc7",
      type: "build",
      prompt:
        "Write a decorator called `require_positive` that raises a `ValueError` with the message 'must be positive' if the first argument passed to the wrapped function is less than or equal to zero, otherwise calls the function normally. Apply it to a function `half(n)` that returns `n / 2`. Call it once with 10 and print the result, then call it with -4 inside a try/except that catches the ValueError and prints its message.",
      starter_code: "# define require_positive here\n\n# define and decorate half here\n\nprint(half(10))\n\n# call half(-4) inside a try/except here",
      solution_code:
        'def require_positive(func):\n    def wrapper(*args, **kwargs):\n        if args[0] <= 0:\n            raise ValueError("must be positive")\n        return func(*args, **kwargs)\n    return wrapper\n\n@require_positive\ndef half(n):\n    return n / 2\n\nprint(half(10))\n\ntry:\n    half(-4)\nexcept ValueError as e:\n    print(e)',
      expected_output: "5.0\nmust be positive",
      hints: [
        "Inside `wrapper`, `args[0]` is the first positional argument the decorated function was called with.",
        "`raise ValueError(\"must be positive\")` inside the wrapper stops the real function from ever running when the check fails.",
      ],
      solution_summary:
        "`wrapper` checks `args[0]` before calling the real function, raising `ValueError` instead of running it when the check fails.",
      key_concepts: ["decorator", "raise", "try/except", "argument validation"],
    },
  ],

  py_generators: [
    {
      id: "py_generators_wc4",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print.",
      snippet_code:
        "def evens_up_to(n):\n    for i in range(0, n + 1, 2):\n        yield i\n\ngen = evens_up_to(10)\nprint(list(gen))",
      solution_code:
        "def evens_up_to(n):\n    for i in range(0, n + 1, 2):\n        yield i\n\ngen = evens_up_to(10)\nprint(list(gen))",
      expected_output: "[0, 2, 4, 6, 8, 10]",
      hints: [
        "`range(0, n + 1, 2)` steps by 2, starting at 0, up to and including `n` if `n` is even.",
        "`list(gen)` drains the generator completely, collecting every yielded value into a list.",
      ],
      solution_summary: "`range(0, 11, 2)` yields 0, 2, 4, 6, 8, 10 — every even number from 0 through 10.",
      key_concepts: ["generator function", "range() step", "list() draining a generator"],
    },
    {
      id: "py_generators_wc5",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print, across all three print calls.",
      snippet_code:
        "def one_two_three():\n    yield 1\n    yield 2\n    yield 3\n\ng = one_two_three()\nprint(next(g))\nprint(next(g))\nprint(list(g))",
      solution_code:
        "def one_two_three():\n    yield 1\n    yield 2\n    yield 3\n\ng = one_two_three()\nprint(next(g))\nprint(next(g))\nprint(list(g))",
      expected_output: "1\n2\n[3]",
      hints: [
        "Each call to `next(g)` resumes the generator right after its last `yield` and runs until the next one.",
        "By the time `list(g)` runs, two values have already been consumed — only the remaining, un-yielded value(s) are left to collect.",
      ],
      solution_summary:
        "`next(g)` pulls 1, then 2, one at a time; `list(g)` then drains whatever's left — just `3` — into a list.",
      key_concepts: ["generator function", "next()", "generator state"],
    },
    {
      id: "py_generators_wc6",
      type: "build",
      prompt:
        "Write a generator function `powers_of_two(n)` that lazily yields 2**0, 2**1, ..., 2**n (inclusive). Use it in a for loop to print each value.",
      starter_code: "# define powers_of_two here\n\nfor p in powers_of_two(4):\n    print(p)",
      solution_code: "def powers_of_two(n):\n    for i in range(n + 1):\n        yield 2 ** i\n\nfor p in powers_of_two(4):\n    print(p)",
      expected_output: "1\n2\n4\n8\n16",
      hints: [
        "`range(n + 1)` produces 0 through `n` inclusive, since `range`'s upper bound is exclusive.",
        "`yield 2 ** i` produces one power of two per iteration, lazily.",
      ],
      solution_summary: "`yield 2 ** i` inside a loop over `range(n + 1)` lazily produces 2⁰ through 2ⁿ.",
      key_concepts: ["generator function", "yield", "range()"],
    },
    {
      id: "py_generators_wc7",
      type: "build",
      prompt:
        "Write a generator function `filter_positive(nums)` that lazily yields only the positive numbers from an input list `nums`. Use it to filter `[-2, 5, -1, 8, 0, 3]` and print the resulting list by wrapping the generator in `list(...)`.",
      starter_code:
        "# define filter_positive here\n\nresult = list(filter_positive([-2, 5, -1, 8, 0, 3]))\nprint(result)",
      solution_code:
        "def filter_positive(nums):\n    for n in nums:\n        if n > 0:\n            yield n\n\nresult = list(filter_positive([-2, 5, -1, 8, 0, 3]))\nprint(result)",
      expected_output: "[5, 8, 3]",
      hints: [
        "\"Positive\" means strictly greater than zero — 0 itself doesn't count.",
        "`yield n` inside an `if n > 0:` check only produces the numbers that pass the condition.",
      ],
      solution_summary: "The generator loops over `nums` and only `yield`s the values where `n > 0`.",
      key_concepts: ["generator function", "yield", "filtering", "list() draining a generator"],
    },
  ],

  py_error_handling_idioms: [
    {
      id: "py_error_handling_idioms_wc4",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print, across both print calls.",
      snippet_code:
        'def parse_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None\n\nprint(parse_int("42"))\nprint(parse_int("abc"))',
      solution_code:
        'def parse_int(s):\n    try:\n        return int(s)\n    except ValueError:\n        return None\n\nprint(parse_int("42"))\nprint(parse_int("abc"))',
      expected_output: "42\nNone",
      hints: [
        "`int(\"42\")` succeeds and returns the integer 42.",
        "`int(\"abc\")` raises `ValueError` because `\"abc\"` isn't a valid number — the `except` clause catches it and returns `None` instead.",
      ],
      solution_summary: "`\"42\"` converts cleanly to `42`; `\"abc\"` raises `ValueError`, caught and turned into `None`.",
      key_concepts: ["try/except", "ValueError", "int() conversion"],
    },
    {
      id: "py_error_handling_idioms_wc5",
      type: "output",
      prompt: "Read this code carefully and type exactly what it will print, across all three print calls.",
      snippet_code:
        'def safe_access(data, index):\n    try:\n        return data[index]\n    except IndexError:\n        return "out of range"\n    except TypeError:\n        return "wrong type"\n\nprint(safe_access([1, 2, 3], 1))\nprint(safe_access([1, 2, 3], 10))\nprint(safe_access(None, 0))',
      solution_code:
        'def safe_access(data, index):\n    try:\n        return data[index]\n    except IndexError:\n        return "out of range"\n    except TypeError:\n        return "wrong type"\n\nprint(safe_access([1, 2, 3], 1))\nprint(safe_access([1, 2, 3], 10))\nprint(safe_access(None, 0))',
      expected_output: "2\nout of range\nwrong type",
      hints: [
        "A `try` block can have multiple `except` clauses, each catching a different exception type.",
        "Indexing a list out of bounds raises `IndexError`; indexing `None` (which isn't subscriptable at all) raises `TypeError`.",
      ],
      solution_summary:
        "Valid index 1 returns the real element; index 10 is out of range; `None[0]` raises `TypeError`, caught by the second `except`.",
      key_concepts: ["try/except", "multiple except clauses", "IndexError vs TypeError"],
    },
    {
      id: "py_error_handling_idioms_wc6",
      type: "build",
      prompt:
        "Write a function `divide_safely(a, b)` that returns the result of `a / b`, but catches `ZeroDivisionError` and returns the string 'undefined' instead of crashing. Call it once with (10, 2) and once with (7, 0), printing both results.",
      starter_code:
        "# define divide_safely here\n\nprint(divide_safely(10, 2))\nprint(divide_safely(7, 0))",
      solution_code:
        "def divide_safely(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return 'undefined'\n\nprint(divide_safely(10, 2))\nprint(divide_safely(7, 0))",
      expected_output: "5.0\nundefined",
      hints: [
        "Dividing by zero raises `ZeroDivisionError`, not a silent wrong answer.",
        "Attempt the division inside a `try`, and return `'undefined'` from the matching `except ZeroDivisionError:` block.",
      ],
      solution_summary: "`try: return a / b except ZeroDivisionError: return 'undefined'` handles the crash-prone case directly.",
      key_concepts: ["try/except", "ZeroDivisionError"],
    },
    {
      id: "py_error_handling_idioms_wc7",
      type: "build",
      prompt:
        "Write a function `validate_age(age)` that raises a `ValueError` with the message 'age must be non-negative' if `age` is less than 0, and otherwise returns the age unchanged. Call it with 25 and print the result. Then call it with -5 inside a try/except that catches the ValueError and prints its message instead of crashing.",
      starter_code:
        "# define validate_age here\n\nprint(validate_age(25))\n\n# call validate_age(-5) inside a try/except here",
      solution_code:
        "def validate_age(age):\n    if age < 0:\n        raise ValueError('age must be non-negative')\n    return age\n\nprint(validate_age(25))\n\ntry:\n    validate_age(-5)\nexcept ValueError as e:\n    print(e)",
      expected_output: "25\nage must be non-negative",
      hints: [
        "`raise ValueError('...')` immediately stops normal execution and hands control to a matching `except` block, if one exists.",
        "`except ValueError as e:` binds the raised exception to `e` — printing `e` prints the message it was raised with.",
      ],
      solution_summary:
        "A guard clause raises `ValueError` for invalid input; the caller's `try/except` catches it and prints the message via `e`.",
      key_concepts: ["raise", "try/except", "custom validation", "exception messages"],
    },
  ],
};

let addedTopics = 0;
let addedChallenges = 0;

for (const [topicId, challenges] of Object.entries(NEW_CHALLENGES)) {
  const topic = py.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    process.exit(1);
  }
  if (!Array.isArray(topic.workshop_challenges)) {
    console.error(`Topic ${topicId} has no existing workshop_challenges array — Workshop A content missing?`);
    process.exit(1);
  }
  topic.workshop_challenges.push(...challenges);
  addedTopics += 1;
  addedChallenges += challenges.length;
}

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Appended ${addedChallenges} new challenges (output + build) across ${addedTopics} topics.`);
