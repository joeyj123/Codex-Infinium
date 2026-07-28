// One-time content-authoring script for Anvil C (extending Anvil's
// challenge types to more languages). Adds a fresh `anvil_challenges`
// array to one pilot topic each in the JavaScript and C++ Expert tracks —
// the first Anvil content outside Python. Does not touch the existing
// Python pilot topics/challenges from Anvil A/B.
//
// Unlike Anvil A/B's Python content, every challenge here also carries
// `key_concepts` + `answer_bank`, needed for the offline fallback grading
// path (Forge A2's engine) used when C++ isn't running inside Tauri.

const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));

const expert = kb.tiers.find((t) => t.id === "expert");

const JS_CHALLENGES = [
  {
    id: "js_json_native_wc1",
    type: "reorder",
    prompt:
      "Reorder these lines into a program that builds a small object, converts it to a JSON string, and prints that string.",
    shuffled_lines: [
      "console.log(json);",
      'const data = { id: 7, tags: ["a", "b"] };',
      "const json = JSON.stringify(data);",
    ],
    solution_code: 'const data = { id: 7, tags: ["a", "b"] };\nconst json = JSON.stringify(data);\nconsole.log(json);',
    expected_output: '{"id":7,"tags":["a","b"]}',
    hints: [
      "`data` has to exist before it can be passed to `JSON.stringify`.",
      "`json` has to be produced before it can be printed.",
    ],
    solution_summary: "Define the object, stringify it, then print the resulting JSON text — in that order.",
    key_concepts: ["JSON.stringify", "serialization", "execution order"],
    answer_bank: [
      'const data = { id: 7, tags: ["a", "b"] };\nconst json = JSON.stringify(data);\nconsole.log(json);',
    ],
  },
  {
    id: "js_json_native_wc2",
    type: "reorder",
    prompt:
      "Reorder these lines into a program that parses a JSON string into a real object, then prints two of its properties.",
    shuffled_lines: [
      "console.log(obj.name, obj.age);",
      'const json = \'{"name":"Ada","age":30}\';',
      "const obj = JSON.parse(json);",
    ],
    solution_code: 'const json = \'{"name":"Ada","age":30}\';\nconst obj = JSON.parse(json);\nconsole.log(obj.name, obj.age);',
    expected_output: "Ada 30",
    hints: [
      "The raw JSON string has to exist before `JSON.parse` can convert it.",
      "`obj` has to exist (as a real object) before its properties can be read.",
    ],
    solution_summary: "`JSON.parse` turns the string into a real object, whose properties can then be accessed normally.",
    key_concepts: ["JSON.parse", "deserialization", "property access"],
    answer_bank: [
      'const json = \'{"name":"Ada","age":30}\';\nconst obj = JSON.parse(json);\nconsole.log(obj.name, obj.age);',
    ],
  },
  {
    id: "js_json_native_wc3",
    type: "fix",
    prompt:
      "This code is supposed to convert an object to a JSON string, but it calls the wrong JSON function and crashes. Fix it.",
    buggy_code: "const data = { x: 1, y: 2 };\nconst json = JSON.parse(data);\nconsole.log(json);",
    solution_code: "const data = { x: 1, y: 2 };\nconst json = JSON.stringify(data);\nconsole.log(json);",
    expected_output: "{\"x\":1,\"y\":2}",
    hints: [
      "`JSON.parse` expects a JSON-formatted *string* as input, not a live object.",
      "Converting an object *into* a JSON string is `JSON.stringify`, not `JSON.parse` — they're inverses of each other.",
    ],
    solution_summary: "`JSON.stringify` converts an object to a string; `JSON.parse` does the reverse — using the wrong one here caused a parse error.",
    key_concepts: ["JSON.stringify", "JSON.parse", "serialization vs deserialization"],
    answer_bank: ["const data = { x: 1, y: 2 };\nconst json = JSON.stringify(data);\nconsole.log(json);"],
  },
  {
    id: "js_json_native_wc4",
    type: "fix",
    prompt:
      "This code is supposed to confirm a round-trip through JSON worked, but comparing the objects directly with `===` always prints false, even when the data matches. Fix the comparison to check by value.",
    buggy_code:
      "const order = { id: 1, total: 9.99 };\nconst json = JSON.stringify(order);\nconst parsedBack = JSON.parse(json);\nconsole.log(parsedBack === order);",
    solution_code:
      "const order = { id: 1, total: 9.99 };\nconst json = JSON.stringify(order);\nconst parsedBack = JSON.parse(json);\nconsole.log(JSON.stringify(parsedBack) === JSON.stringify(order));",
    expected_output: "true",
    hints: [
      "`===` on two objects checks whether they're the *same object in memory*, not whether their contents match.",
      "`parsedBack` is a brand-new object `JSON.parse` created — comparing its JSON text against the original's JSON text checks the data itself instead.",
    ],
    solution_summary:
      "Comparing `JSON.stringify(parsedBack) === JSON.stringify(order)` checks the underlying data, not object identity.",
    key_concepts: ["object identity vs value equality", "JSON.stringify", "reference types"],
    answer_bank: [
      "const order = { id: 1, total: 9.99 };\nconst json = JSON.stringify(order);\nconst parsedBack = JSON.parse(json);\nconsole.log(JSON.stringify(parsedBack) === JSON.stringify(order));",
    ],
  },
  {
    id: "js_json_native_wc5",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      'const item = { id: 3, tags: ["x", "y"], price: 4.5, inStock: true };\nconsole.log(JSON.stringify(item));',
    solution_code:
      'const item = { id: 3, tags: ["x", "y"], price: 4.5, inStock: true };\nconsole.log(JSON.stringify(item));',
    expected_output: '{"id":3,"tags":["x","y"],"price":4.5,"inStock":true}',
    hints: [
      "`JSON.stringify` keeps every property in the same order they were defined in the object.",
      "Strings inside the JSON output are always double-quoted, regardless of how they were quoted in the source.",
    ],
    solution_summary: "`JSON.stringify` serializes every property, in order, into one compact JSON-formatted string.",
    key_concepts: ["JSON.stringify", "tracing execution"],
    answer_bank: [],
  },
  {
    id: "js_json_native_wc6",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print, including the newlines and indentation.",
    snippet_code: "const point = { x: 1, y: 2 };\nconsole.log(JSON.stringify(point, null, 2));",
    solution_code: "const point = { x: 1, y: 2 };\nconsole.log(JSON.stringify(point, null, 2));",
    expected_output: '{\n  "x": 1,\n  "y": 2\n}',
    hints: [
      "The third argument to `JSON.stringify` (here, `2`) controls indentation — it pretty-prints the output across multiple lines instead of one compact line.",
      "Each property lands on its own line, indented by that many spaces.",
    ],
    solution_summary:
      "`JSON.stringify(point, null, 2)`'s third argument requests 2-space indentation, spreading each property onto its own line.",
    key_concepts: ["JSON.stringify indentation argument", "pretty-printing"],
    answer_bank: [],
  },
  {
    id: "js_json_native_wc7",
    type: "build",
    prompt:
      "Write a program that builds an object `user` with `name: 'Sam'` and `age: 25`, converts it to a JSON string, and prints both the string and its `typeof`.",
    starter_code: "// build user here\n\nconsole.log(json, typeof json);",
    solution_code: 'const user = { name: "Sam", age: 25 };\nconst json = JSON.stringify(user);\nconsole.log(json, typeof json);',
    expected_output: '{"name":"Sam","age":25} string',
    hints: [
      "`JSON.stringify` always returns a string, no matter how complex the object it's given.",
      "`typeof` on the result of `JSON.stringify` will always report `\"string\"`.",
    ],
    solution_summary: "`JSON.stringify(user)` produces a string; `typeof` on it confirms that directly.",
    key_concepts: ["JSON.stringify", "typeof"],
    answer_bank: ['const user = { name: "Sam", age: 25 };\nconst json = JSON.stringify(user);\nconsole.log(json, typeof json);'],
  },
  {
    id: "js_json_native_wc8",
    type: "build",
    prompt:
      'Write a program that parses the JSON string `\'{"count":5,"active":false}\'` into a real object, then prints the value of `count` plus 1.',
    starter_code: "// parse the JSON string here\n\nconsole.log(obj.count + 1);",
    solution_code: 'const json = \'{"count":5,"active":false}\';\nconst obj = JSON.parse(json);\nconsole.log(obj.count + 1);',
    expected_output: "6",
    hints: [
      "`JSON.parse` turns the raw string into a real object whose properties can be read and used in normal arithmetic.",
      "Once parsed, `obj.count` behaves like any ordinary number.",
    ],
    solution_summary: "`JSON.parse(json).count` gives back a real number, which `+ 1` can then operate on normally.",
    key_concepts: ["JSON.parse", "property access", "arithmetic on parsed values"],
    answer_bank: ['const json = \'{"count":5,"active":false}\';\nconst obj = JSON.parse(json);\nconsole.log(obj.count + 1);'],
  },
];

const CPP_CHALLENGES = [
  {
    id: "cpp_stl_wc1",
    type: "reorder",
    prompt:
      "Reorder these three blocks into a program that sorts a vector of scores, then prints the highest score and the count using std::sort and vector member functions.",
    shuffled_lines: [
      'cout << "Max: " << scores.back() << endl;\n    cout << "Count: " << scores.size() << endl;\n    return 0;\n}',
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;",
      "int main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.end());",
    ],
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.end());\n    cout << \"Max: \" << scores.back() << endl;\n    cout << \"Count: \" << scores.size() << endl;\n    return 0;\n}",
    expected_output: "Max: 95\nCount: 5",
    hints: [
      "The `#include`s and `using namespace std;` have to come before anything that uses them.",
      "`scores` must be sorted before `.back()` reliably returns the largest value.",
    ],
    solution_summary: "After `std::sort`, `.back()` gives the largest element and `.size()` gives the count — both real vector member functions.",
    key_concepts: ["vector", "std::sort", "algorithm", "iterator", "back()", "size()"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.end());\n    cout << \"Max: \" << scores.back() << endl;\n    cout << \"Count: \" << scores.size() << endl;\n    return 0;\n}",
    ],
  },
  {
    id: "cpp_stl_wc2",
    type: "reorder",
    prompt: "Reorder these three blocks into a program that sums a vector of numbers using std::accumulate.",
    shuffled_lines: [
      'cout << "Total: " << total << endl;\n    return 0;\n}',
      "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;",
      "int main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);",
    ],
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Total: \" << total << endl;\n    return 0;\n}",
    expected_output: "Total: 66",
    hints: [
      "`accumulate` lives in `<numeric>`, a different header than `<algorithm>`.",
      "`total` has to be computed before it can be printed.",
    ],
    solution_summary: "`accumulate(nums.begin(), nums.end(), 0)` sums every element, starting from 0.",
    key_concepts: ["accumulate", "numeric header", "vector", "iterator"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Total: \" << total << endl;\n    return 0;\n}",
    ],
  },
  {
    id: "cpp_stl_wc3",
    type: "fix",
    prompt:
      "This program fails to compile — std::sort is being called with the wrong second argument. Fix it so it compiles and prints the max score.",
    buggy_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.size());\n    cout << \"Max: \" << scores.back() << endl;\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.end());\n    cout << \"Max: \" << scores.back() << endl;\n    return 0;\n}",
    expected_output: "Max: 95",
    hints: [
      "`std::sort` takes two *iterators* marking a range — `scores.size()` returns a count (a number), not an iterator.",
      "The matching end-of-range iterator for a vector is `.end()`, not `.size()`.",
    ],
    solution_summary: "`std::sort` needs `scores.begin()` and `scores.end()` — a `size_t` count isn't a valid iterator argument.",
    key_concepts: ["std::sort", "iterator", "begin()", "end()", "compile error"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {82, 95, 67, 74, 88};\n    sort(scores.begin(), scores.end());\n    cout << \"Max: \" << scores.back() << endl;\n    return 0;\n}",
    ],
  },
  {
    id: "cpp_stl_wc4",
    type: "fix",
    prompt:
      "This program fails to compile because it uses accumulate without including the header that declares it. Fix it.",
    buggy_code:
      "#include <iostream>\n#include <vector>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Total: \" << total << endl;\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Total: \" << total << endl;\n    return 0;\n}",
    expected_output: "Total: 66",
    hints: [
      "`accumulate` isn't declared by `<vector>` or `<iostream>` — it needs its own header.",
      "The header that declares STL numeric algorithms like `accumulate` is `<numeric>`.",
    ],
    solution_summary: "Adding `#include <numeric>` declares `accumulate`, which `<vector>`/`<iostream>` alone don't provide.",
    key_concepts: ["numeric header", "accumulate", "missing include", "compile error"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <numeric>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {4, 8, 15, 16, 23};\n    int total = accumulate(nums.begin(), nums.end(), 0);\n    cout << \"Total: \" << total << endl;\n    return 0;\n}",
    ],
  },
  {
    id: "cpp_stl_wc5",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print, including any trailing space before the newline.",
    snippet_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {30, 10, 20};\n    sort(nums.begin(), nums.end());\n    for (int n : nums) {\n        cout << n << \" \";\n    }\n    cout << endl;\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {30, 10, 20};\n    sort(nums.begin(), nums.end());\n    for (int n : nums) {\n        cout << n << \" \";\n    }\n    cout << endl;\n    return 0;\n}",
    expected_output: "10 20 30 ",
    hints: [
      "`sort` puts the numbers in ascending order before the loop ever prints anything.",
      "The loop prints every number followed by a space, including after the last one.",
    ],
    solution_summary: "After sorting, {30, 10, 20} becomes {10, 20, 30}; the loop prints each one followed by a space.",
    key_concepts: ["std::sort", "range-based for loop", "tracing execution"],
    answer_bank: [],
  },
  {
    id: "cpp_stl_wc6",
    type: "output",
    prompt: "Read this code carefully and type exactly what it will print.",
    snippet_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 8, 12, 3};\n    auto it = find(nums.begin(), nums.end(), 12);\n    if (it != nums.end()) {\n        cout << \"Found at index: \" << (it - nums.begin()) << endl;\n    } else {\n        cout << \"Not found\" << endl;\n    }\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 8, 12, 3};\n    auto it = find(nums.begin(), nums.end(), 12);\n    if (it != nums.end()) {\n        cout << \"Found at index: \" << (it - nums.begin()) << endl;\n    } else {\n        cout << \"Not found\" << endl;\n    }\n    return 0;\n}",
    expected_output: "Found at index: 2",
    hints: [
      "`std::find` returns an iterator pointing at the first matching element, or `.end()` if nothing matched.",
      "Subtracting `nums.begin()` from that iterator gives its numeric index — `12` is the third element, index 2.",
    ],
    solution_summary: "`find` locates `12` at index 2 (0-based); subtracting `begin()` from the returned iterator converts it to that index.",
    key_concepts: ["std::find", "iterator arithmetic", "index calculation"],
    answer_bank: [],
  },
  {
    id: "cpp_stl_wc7",
    type: "build",
    prompt:
      "Write a program that stores the words {\"pear\", \"apple\", \"kiwi\", \"banana\"} in a vector<string>, sorts them alphabetically with std::sort, and prints them separated by spaces on one line.",
    starter_code:
      "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // build, sort, and print words here\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<string> words = {\"pear\", \"apple\", \"kiwi\", \"banana\"};\n    sort(words.begin(), words.end());\n    for (const string& w : words) {\n        cout << w << \" \";\n    }\n    cout << endl;\n    return 0;\n}",
    expected_output: "apple banana kiwi pear ",
    hints: [
      "`std::sort` works on `vector<string>` the same way it does on `vector<int>` — alphabetical order for strings.",
      "A range-based for loop (`for (const string& w : words)`) avoids copying each string unnecessarily.",
    ],
    solution_summary: "`sort(words.begin(), words.end())` sorts strings alphabetically; a range-based for loop then prints each one.",
    key_concepts: ["vector<string>", "std::sort", "range-based for loop"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<string> words = {\"pear\", \"apple\", \"kiwi\", \"banana\"};\n    sort(words.begin(), words.end());\n    for (const string& w : words) {\n        cout << w << \" \";\n    }\n    cout << endl;\n    return 0;\n}",
    ],
  },
  {
    id: "cpp_stl_wc8",
    type: "build",
    prompt:
      "Write a program that uses std::count to count how many times the value 7 appears in the vector<int> {7, 3, 7, 9, 7, 1}, and prints the count.",
    starter_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    // count occurrences of 7 here\n    return 0;\n}",
    solution_code:
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {7, 3, 7, 9, 7, 1};\n    int c = count(nums.begin(), nums.end(), 7);\n    cout << \"Count: \" << c << endl;\n    return 0;\n}",
    expected_output: "Count: 3",
    hints: [
      "`std::count(begin, end, value)` counts how many elements in the range equal `value`.",
      "It's declared in `<algorithm>`, the same header `sort` and `find` come from.",
    ],
    solution_summary: "`count(nums.begin(), nums.end(), 7)` returns how many elements equal 7 — three, in this vector.",
    key_concepts: ["std::count", "algorithm header", "vector"],
    answer_bank: [
      "#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {7, 3, 7, 9, 7, 1};\n    int c = count(nums.begin(), nums.end(), 7);\n    cout << \"Count: \" << c << endl;\n    return 0;\n}",
    ],
  },
];

function addTo(track, topicId, challenges) {
  const topic = track.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`Topic not found: ${topicId}`);
    process.exit(1);
  }
  if (topic.anvil_challenges) {
    console.error(`Topic ${topicId} already has anvil_challenges — refusing to overwrite.`);
    process.exit(1);
  }
  topic.anvil_challenges = challenges;
  return challenges.length;
}

let total = 0;
total += addTo(expert.language_tracks.javascript, "js_json_native", JS_CHALLENGES);
total += addTo(expert.language_tracks.cpp, "cpp_stl", CPP_CHALLENGES);

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added ${total} new Anvil challenges across 2 new pilot topics (JavaScript, C++).`);
