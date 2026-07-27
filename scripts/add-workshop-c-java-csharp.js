// Workshop C follow-up: adds Java and C# pilot topics to The Workshop,
// same pattern as the JS/C++ batch (scripts/add-workshop-c-challenges.js).
// Every expected_output here was verified against the real bundled
// toolchains (Temurin JDK, .NET 10 SDK via csc.exe + apphost patching),
// staged to a space-free path exactly like java_runner.rs/csharp_runner.rs
// do at runtime — see CHRONICLE_OF_INFINIUM.md for the verification method.

const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

const expert = kb.tiers.find((t) => t.id === "expert");

const JAVA_CHALLENGES = [
  {
    id: "java_collections_framework_wc1",
    type: "reorder",
    prompt:
      "Reorder these two blocks into a program that builds an ArrayList of two words and prints it.",
    shuffled_lines: [
      'public class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words);\n    }\n}',
      "import java.util.ArrayList;\nimport java.util.List;",
    ],
    solution_code:
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words);\n    }\n}',
    expected_output: "[java, code]",
    hints: [
      "The `import` statements have to come before the class that uses `List`/`ArrayList`.",
      "Printing a `List` directly uses its built-in `toString()`, rendering as `[item1, item2]`.",
    ],
    solution_summary: "`ArrayList`'s inherited `toString()` renders the list as `[java, code]`, in insertion order.",
    key_concepts: ["ArrayList", "List interface", "toString()", "import order"],
    answer_bank: [
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words);\n    }\n}',
    ],
  },
  {
    id: "java_collections_framework_wc2",
    type: "reorder",
    prompt: "Reorder these two blocks into a program that stores two values in a HashMap and prints their sum.",
    shuffled_lines: [
      'public class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        counts.put("b", 2);\n        System.out.println(counts.get("a") + counts.get("b"));\n    }\n}',
      "import java.util.HashMap;\nimport java.util.Map;",
    ],
    solution_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        counts.put("b", 2);\n        System.out.println(counts.get("a") + counts.get("b"));\n    }\n}',
    expected_output: "3",
    hints: [
      "`import`s have to precede the class body that uses `Map`/`HashMap`.",
      "`.get(key)` retrieves a stored value back out of the map by its key.",
    ],
    solution_summary: "`counts.get(\"a\") + counts.get(\"b\")` reads both stored values back out and adds them: 1 + 2 = 3.",
    key_concepts: ["HashMap", "Map interface", "get()", "put()"],
    answer_bank: [
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        counts.put("b", 2);\n        System.out.println(counts.get("a") + counts.get("b"));\n    }\n}',
    ],
  },
  {
    id: "java_collections_framework_wc3",
    type: "fix",
    prompt:
      "This program fails to compile because it tries to index into a List with array-bracket syntax. Fix it.",
    buggy_code:
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words[0]);\n    }\n}',
    solution_code:
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words.get(0));\n    }\n}',
    expected_output: "java",
    hints: [
      "Unlike a raw array, a `List` isn't indexed with `[]` — that syntax only works on true Java arrays.",
      "Reading an element out of a `List` by position uses the `.get(index)` method instead.",
    ],
    solution_summary: "`List` (unlike a raw array) has no `[]` operator — `.get(0)` is the correct way to read the first element.",
    key_concepts: ["List.get()", "array vs List", "compile error"],
    answer_bank: [
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> words = new ArrayList<>();\n        words.add("java");\n        words.add("code");\n        System.out.println(words.get(0));\n    }\n}',
    ],
  },
  {
    id: "java_collections_framework_wc4",
    type: "fix",
    prompt:
      "This program crashes with a NullPointerException when a key hasn't been stored yet. Fix it so a missing key contributes 0 instead of crashing.",
    buggy_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        int total = counts.get("a") + counts.get("b");\n        System.out.println(total);\n    }\n}',
    solution_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        int total = counts.get("a") + counts.getOrDefault("b", 0);\n        System.out.println(total);\n    }\n}',
    expected_output: "1",
    hints: [
      "`.get(key)` returns `null` if the key was never stored — and unboxing `null` into a primitive `int` throws `NullPointerException`.",
      "`.getOrDefault(key, fallback)` returns the fallback value instead of `null` when the key is missing.",
    ],
    solution_summary: "`.getOrDefault(\"b\", 0)` avoids the `null`-unboxing crash by supplying 0 when `\"b\"` was never stored.",
    key_concepts: ["getOrDefault", "NullPointerException", "autoboxing", "HashMap"],
    answer_bank: [
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("a", 1);\n        int total = counts.get("a") + counts.getOrDefault("b", 0);\n        System.out.println(total);\n    }\n}',
    ],
  },
  {
    id: "java_collections_framework_wc5",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>();\n        nums.add(10);\n        nums.add(20);\n        nums.add(30);\n        System.out.println(nums);\n    }\n}',
    solution_code:
      'import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>();\n        nums.add(10);\n        nums.add(20);\n        nums.add(30);\n        System.out.println(nums);\n    }\n}',
    expected_output: "[10, 20, 30]",
    hints: [
      "Printing a `List` directly calls its inherited `toString()`.",
      "The elements print in insertion order, comma-and-space separated, inside square brackets.",
    ],
    solution_summary: "`ArrayList`'s `toString()` renders the elements in insertion order as `[10, 20, 30]`.",
    key_concepts: ["ArrayList toString()", "tracing execution"],
    answer_bank: [],
  },
  {
    id: "java_collections_framework_wc6",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] letters = {"x", "y", "x", "z", "x"};\n        Map<String, Integer> counts = new HashMap<>();\n        for (String l : letters) {\n            counts.put(l, counts.getOrDefault(l, 0) + 1);\n        }\n        System.out.println(counts.get("x"));\n    }\n}',
    solution_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] letters = {"x", "y", "x", "z", "x"};\n        Map<String, Integer> counts = new HashMap<>();\n        for (String l : letters) {\n            counts.put(l, counts.getOrDefault(l, 0) + 1);\n        }\n        System.out.println(counts.get("x"));\n    }\n}',
    expected_output: "3",
    hints: [
      "`getOrDefault(l, 0) + 1` starts a letter's count at 1 the first time it's seen, then increments on each repeat.",
      "\"x\" appears three times in `letters` — trace the loop to confirm.",
    ],
    solution_summary: "\"x\" occurs three times in the array, so the loop's counting pattern leaves `counts.get(\"x\")` at 3.",
    key_concepts: ["getOrDefault", "frequency counting", "tracing execution"],
    answer_bank: [],
  },
  {
    id: "java_collections_framework_wc7",
    type: "build",
    prompt:
      "Write a program that builds an ArrayList<Integer> containing 5, 10, 15, then prints the sum of its elements using a for-each loop.",
    starter_code:
      "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        // build the list and sum it here\n    }\n}",
    solution_code:
      "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>();\n        nums.add(5);\n        nums.add(10);\n        nums.add(15);\n        int sum = 0;\n        for (int n : nums) {\n            sum += n;\n        }\n        System.out.println(sum);\n    }\n}",
    expected_output: "30",
    hints: [
      "A for-each loop (`for (int n : nums)`) walks every element of a `List<Integer>` directly, auto-unboxing each one to `int`.",
      "Accumulate into a running total the same way you would with any loop-based sum.",
    ],
    solution_summary: "A for-each loop over `nums` accumulates 5 + 10 + 15 = 30 into `sum`.",
    key_concepts: ["ArrayList", "for-each loop", "accumulation"],
    answer_bank: [
      "import java.util.ArrayList;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = new ArrayList<>();\n        nums.add(5);\n        nums.add(10);\n        nums.add(15);\n        int sum = 0;\n        for (int n : nums) {\n            sum += n;\n        }\n        System.out.println(sum);\n    }\n}",
    ],
  },
  {
    id: "java_collections_framework_wc8",
    type: "build",
    prompt:
      'Write a program that uses a HashMap<String, Integer> to count occurrences of each word in the array {"cat", "dog", "cat", "bird", "cat"}, then prints the count for "cat".',
    starter_code:
      "import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] words = {\"cat\", \"dog\", \"cat\", \"bird\", \"cat\"};\n        // count occurrences here\n    }\n}",
    solution_code:
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] words = {"cat", "dog", "cat", "bird", "cat"};\n        Map<String, Integer> counts = new HashMap<>();\n        for (String w : words) {\n            counts.put(w, counts.getOrDefault(w, 0) + 1);\n        }\n        System.out.println(counts.get("cat"));\n    }\n}',
    expected_output: "3",
    hints: [
      "The `getOrDefault(word, 0) + 1` pattern is the standard idiom for frequency counting with a `HashMap`.",
      "\"cat\" appears three times in the array.",
    ],
    solution_summary: "Looping with `counts.put(w, counts.getOrDefault(w, 0) + 1)` tallies each word; \"cat\" ends at 3.",
    key_concepts: ["HashMap", "getOrDefault", "frequency counting"],
    answer_bank: [
      'import java.util.HashMap;\nimport java.util.Map;\n\npublic class Main {\n    public static void main(String[] args) {\n        String[] words = {"cat", "dog", "cat", "bird", "cat"};\n        Map<String, Integer> counts = new HashMap<>();\n        for (String w : words) {\n            counts.put(w, counts.getOrDefault(w, 0) + 1);\n        }\n        System.out.println(counts.get("cat"));\n    }\n}',
    ],
  },
];

const CSHARP_CHALLENGES = [
  {
    id: "cs_linq_wc1",
    type: "reorder",
    prompt: "Reorder these three blocks into a program that filters a list to even numbers and prints them.",
    shuffled_lines: [
      'Console.WriteLine(string.Join(", ", evens));\n    }\n}',
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;",
      "class Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();",
    ],
    solution_code:
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();\n        Console.WriteLine(string.Join(", ", evens));\n    }\n}',
    expected_output: "8, 6",
    hints: [
      "`using System.Linq;` has to be present before `Where` can be used as an extension method.",
      "`evens` has to be computed before it can be printed.",
    ],
    solution_summary: "`Where(n => n % 2 == 0)` keeps only the even numbers, in their original order: 8, then 6.",
    key_concepts: ["LINQ Where", "lambda predicate", "ToList()"],
    answer_bank: [
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();\n        Console.WriteLine(string.Join(", ", evens));\n    }\n}',
    ],
  },
  {
    id: "cs_linq_wc2",
    type: "reorder",
    prompt: "Reorder these three blocks into a program that sorts a list of names alphabetically and prints them.",
    shuffled_lines: [
      'Console.WriteLine(string.Join(", ", sorted));\n    }\n}',
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;",
      'class Program {\n    static void Main() {\n        List<string> names = new List<string> { "Charlie", "Alice", "Bob" };\n        var sorted = names.OrderBy(n => n).ToList();',
    ],
    solution_code:
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<string> names = new List<string> { "Charlie", "Alice", "Bob" };\n        var sorted = names.OrderBy(n => n).ToList();\n        Console.WriteLine(string.Join(", ", sorted));\n    }\n}',
    expected_output: "Alice, Bob, Charlie",
    hints: [
      "`OrderBy(n => n)` sorts strings alphabetically by default.",
      "The `using` directives must come before the class that uses `List`/LINQ.",
    ],
    solution_summary: "`OrderBy(n => n)` sorts the names alphabetically: Alice, Bob, Charlie.",
    key_concepts: ["LINQ OrderBy", "lambda", "string.Join"],
    answer_bank: [
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<string> names = new List<string> { "Charlie", "Alice", "Bob" };\n        var sorted = names.OrderBy(n => n).ToList();\n        Console.WriteLine(string.Join(", ", sorted));\n    }\n}',
    ],
  },
  {
    id: "cs_linq_wc3",
    type: "fix",
    prompt:
      "This program crashes because First() finds no matching element. Fix it so it prints a default value (0) instead of crashing.",
    buggy_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 1, 3, 5 };\n        int firstEven = nums.Where(n => n % 2 == 0).First();\n        Console.WriteLine(firstEven);\n    }\n}",
    solution_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 1, 3, 5 };\n        int firstEven = nums.Where(n => n % 2 == 0).FirstOrDefault();\n        Console.WriteLine(firstEven);\n    }\n}",
    expected_output: "0",
    hints: [
      "`First()` throws `InvalidOperationException` if the sequence is empty — none of `{1, 3, 5}` are even.",
      "`FirstOrDefault()` returns the type's default value (`0` for `int`) instead of throwing when nothing matches.",
    ],
    solution_summary: "`FirstOrDefault()` returns 0 (int's default) instead of throwing when no element satisfies the predicate.",
    key_concepts: ["First() vs FirstOrDefault()", "InvalidOperationException", "LINQ Where"],
    answer_bank: [
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 1, 3, 5 };\n        int firstEven = nums.Where(n => n % 2 == 0).FirstOrDefault();\n        Console.WriteLine(firstEven);\n    }\n}",
    ],
  },
  {
    id: "cs_linq_wc4",
    type: "fix",
    prompt:
      "This program fails to compile because it's missing the using directive that provides LINQ's extension methods. Fix it.",
    buggy_code:
      'using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();\n        Console.WriteLine(string.Join(", ", evens));\n    }\n}',
    solution_code:
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();\n        Console.WriteLine(string.Join(", ", evens));\n    }\n}',
    expected_output: "8, 6",
    hints: [
      "`Where` isn't a method `List<int>` defines itself — it's an extension method that only becomes available with `using System.Linq;`.",
      "Without that `using`, the compiler reports `Where` as not found on `List<int>`.",
    ],
    solution_summary: "Adding `using System.Linq;` brings `Where`'s extension method into scope for `List<int>`.",
    key_concepts: ["System.Linq", "extension methods", "missing using directive", "compile error"],
    answer_bank: [
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 3, 8, 15, 6, 21 };\n        var evens = nums.Where(n => n % 2 == 0).ToList();\n        Console.WriteLine(string.Join(", ", evens));\n    }\n}',
    ],
  },
  {
    id: "cs_linq_wc5",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 2, 4, 6 };\n        int total = nums.Select(n => n * n).Sum();\n        Console.WriteLine(total);\n    }\n}",
    solution_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 2, 4, 6 };\n        int total = nums.Select(n => n * n).Sum();\n        Console.WriteLine(total);\n    }\n}",
    expected_output: "56",
    hints: [
      "`Select(n => n * n)` squares each number before `Sum()` adds them all up.",
      "2² + 4² + 6² = 4 + 16 + 36.",
    ],
    solution_summary: "Squaring 2, 4, 6 gives 4, 16, 36 — `Sum()` adds those to 56.",
    key_concepts: ["LINQ Select", "LINQ Sum", "method chaining"],
    answer_bank: [],
  },
  {
    id: "cs_linq_wc6",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<string> words = new List<string> { "cat", "elephant", "dog", "hippopotamus" };\n        int longCount = words.Count(w => w.Length > 3);\n        Console.WriteLine(longCount);\n    }\n}',
    solution_code:
      'using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<string> words = new List<string> { "cat", "elephant", "dog", "hippopotamus" };\n        int longCount = words.Count(w => w.Length > 3);\n        Console.WriteLine(longCount);\n    }\n}',
    expected_output: "2",
    hints: [
      "`Count(predicate)` counts how many elements satisfy the condition, without building an intermediate filtered list.",
      "Only \"elephant\" and \"hippopotamus\" have more than 3 letters.",
    ],
    solution_summary: "`Count(w => w.Length > 3)` counts \"elephant\" and \"hippopotamus\" — 2 words longer than 3 letters.",
    key_concepts: ["LINQ Count with predicate", "tracing execution"],
    answer_bank: [],
  },
  {
    id: "cs_linq_wc7",
    type: "build",
    prompt: "Write a program that uses LINQ's Sum() to add up the List<int> { 10, 20, 30, 40 } and prints the total.",
    starter_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        // sum the list here\n    }\n}",
    solution_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 10, 20, 30, 40 };\n        int total = nums.Sum();\n        Console.WriteLine(total);\n    }\n}",
    expected_output: "100",
    hints: [
      "`Sum()` with no arguments adds up every element of a `List<int>` directly.",
      "10 + 20 + 30 + 40 = 100.",
    ],
    solution_summary: "`nums.Sum()` adds every element directly: 10 + 20 + 30 + 40 = 100.",
    key_concepts: ["LINQ Sum"],
    answer_bank: [
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 10, 20, 30, 40 };\n        int total = nums.Sum();\n        Console.WriteLine(total);\n    }\n}",
    ],
  },
  {
    id: "cs_linq_wc8",
    type: "build",
    prompt:
      "Write a program that uses LINQ's Where() and Count() together to count how many numbers in List<int> { 4, 7, 2, 9, 12, 3 } are greater than 5, and prints the count.",
    starter_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        // count numbers greater than 5 here\n    }\n}",
    solution_code:
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 4, 7, 2, 9, 12, 3 };\n        int count = nums.Where(n => n > 5).Count();\n        Console.WriteLine(count);\n    }\n}",
    expected_output: "3",
    hints: [
      "`Where(n => n > 5)` filters to only the numbers greater than 5, then `Count()` counts how many survived.",
      "7, 9, and 12 are the three numbers greater than 5.",
    ],
    solution_summary: "`Where(n => n > 5).Count()` filters then counts: 7, 9, 12 survive, giving 3.",
    key_concepts: ["LINQ Where", "LINQ Count", "method chaining"],
    answer_bank: [
      "using System;\nusing System.Collections.Generic;\nusing System.Linq;\n\nclass Program {\n    static void Main() {\n        List<int> nums = new List<int> { 4, 7, 2, 9, 12, 3 };\n        int count = nums.Where(n => n > 5).Count();\n        Console.WriteLine(count);\n    }\n}",
    ],
  },
];

function addTo(track, topicId, challenges) {
  const topic = track.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    process.exit(1);
  }
  if (topic.workshop_challenges) {
    console.error(`Topic ${topicId} already has workshop_challenges — refusing to overwrite.`);
    process.exit(1);
  }
  topic.workshop_challenges = challenges;
  return challenges.length;
}

let total = 0;
total += addTo(expert.language_tracks.java, "java_collections_framework", JAVA_CHALLENGES);
total += addTo(expert.language_tracks.csharp, "cs_linq", CSHARP_CHALLENGES);

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added ${total} new Workshop challenges across 2 new pilot topics (Java, C#).`);
