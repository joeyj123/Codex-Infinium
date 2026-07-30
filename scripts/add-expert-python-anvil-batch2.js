// NOTE (2026-07-30 follow-up fix): originally used broken_code for fix challenges and
// omitted snippet_code (output type) / starter_code (build type) entirely — the app
// actually reads buggy_code/snippet_code/starter_code (see AnvilTopicClient.js). This
// file was patched to buggy_code; snippet_code/starter_code were added directly to
// data/knowledge_base.json by a follow-up one-off patch, not reflected in this script.
// Expert Anvil (Python track) batch 2: py_project_structure (finishes the Python track).
// Project structure is about multi-file/folder layout, not something demonstrable
// as a single executing script, so this uses real, executing print()-narration of
// the facts, matching the pattern used for other tooling-only topics in batch 1.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "expert");
const pythonTrack = tier.language_tracks.python;

const CONTENT = {
  py_project_structure: [
    {
      id: "py_project_structure_wc1",
      type: "reorder",
      prompt: "Reorder these lines into a working program narrating how project structure applies separation of concerns to a whole codebase's files.",
      shuffled_lines: [
        "print(\"Separation of concerns, covered in Journeyman, applies within a single file to functions and classes.\")",
        "print(\"A well-organized project extends that same principle to how files and folders are arranged on disk.\")",
        "print(\"Each module or folder is named and organized around one clear responsibility.\")",
      ],
      items: [
        "print(\"Separation of concerns, covered in Journeyman, applies within a single file to functions and classes.\")",
        "print(\"A well-organized project extends that same principle to how files and folders are arranged on disk.\")",
        "print(\"Each module or folder is named and organized around one clear responsibility.\")",
      ],
      solution_code: "print(\"Separation of concerns, covered in Journeyman, applies within a single file to functions and classes.\")\nprint(\"A well-organized project extends that same principle to how files and folders are arranged on disk.\")\nprint(\"Each module or folder is named and organized around one clear responsibility.\")",
      expected_output: "Separation of concerns, covered in Journeyman, applies within a single file to functions and classes.\nA well-organized project extends that same principle to how files and folders are arranged on disk.\nEach module or folder is named and organized around one clear responsibility.",
      hints: ["The original, narrower Journeyman concept is described before its extension to whole-project layout.", "The specific per-module responsibility principle is the final, most concrete statement."],
      solution_summary: "Separation of concerns originally applies within a file, a well-organized project extends it to files and folders on disk, with each one organized around one clear responsibility.",
      key_concepts: ["project structure", "separation of concerns"],
    },
    {
      id: "py_project_structure_wc2",
      type: "fix",
      prompt: "Fix this code so it accurately describes conventional Python project structure instead of claiming everything belongs in one single file.",
      buggy_code: "print(\"A well-organized Python project keeps every single line of code in one giant file.\")",
      solution_code: "print(\"A well-organized Python project separates its code into clearly named modules and folders by responsibility.\")",
      expected_output: "A well-organized Python project separates its code into clearly named modules and folders by responsibility.",
      hints: ["The whole point of project structure is splitting code across multiple organized files, not one giant file.", "Modules and folders should be named around what they're responsible for."],
      solution_summary: "The corrected statement accurately describes a well-organized project as separated into clearly named modules and folders, not crammed into one giant file.",
      key_concepts: ["project structure", "modules"],
    },
    {
      id: "py_project_structure_wc3",
      type: "reorder",
      prompt: "Reorder these lines into a working program narrating a typical top-level Python project layout.",
      shuffled_lines: [
        "print(\"A top-level package folder, named after the project, holds the actual application code.\")",
        "print(\"A separate tests folder holds the test suite, kept apart from the application code itself.\")",
        "print(\"A requirements.txt or pyproject.toml file at the root lists the project's dependencies.\")",
      ],
      items: [
        "print(\"A top-level package folder, named after the project, holds the actual application code.\")",
        "print(\"A separate tests folder holds the test suite, kept apart from the application code itself.\")",
        "print(\"A requirements.txt or pyproject.toml file at the root lists the project's dependencies.\")",
      ],
      solution_code: "print(\"A top-level package folder, named after the project, holds the actual application code.\")\nprint(\"A separate tests folder holds the test suite, kept apart from the application code itself.\")\nprint(\"A requirements.txt or pyproject.toml file at the root lists the project's dependencies.\")",
      expected_output: "A top-level package folder, named after the project, holds the actual application code.\nA separate tests folder holds the test suite, kept apart from the application code itself.\nA requirements.txt or pyproject.toml file at the root lists the project's dependencies.",
      hints: ["The application code folder, the tests folder, and the dependency file are each separate, named parts of the same conventional layout."],
      solution_summary: "A conventional layout has a top-level package folder for application code, a separate tests folder, and a root-level dependency file like requirements.txt.",
      key_concepts: ["project structure", "package folder", "tests folder"],
    },
    {
      id: "py_project_structure_wc4",
      type: "output",
      prompt: "What does this code print, simulating a project's structure as a nested dictionary of folders and files?",
      solution_code: "project = {\n    \"my_app\": [\"__init__.py\", \"main.py\"],\n    \"tests\": [\"test_main.py\"],\n}\nfor folder, files in project.items():\n    print(f\"{folder}/: {files}\")",
      expected_output: "my_app/: ['__init__.py', 'main.py']\ntests/: ['test_main.py']",
      hints: ["The dictionary is iterated in insertion order.", "Each folder's file list is printed using its default Python list representation."],
      solution_summary: "The loop iterates the project dictionary in order, printing each folder name followed by its list of files.",
      key_concepts: ["project structure", "package layout"],
    },
    {
      id: "py_project_structure_wc5",
      type: "output",
      prompt: "What does this code print?",
      solution_code: "def responsibility(folder_name):\n    responsibilities = {\"tests\": \"holds automated tests\", \"my_app\": \"holds application code\"}\n    return responsibilities.get(folder_name, \"unknown\")\n\nprint(responsibility(\"tests\"))",
      expected_output: "holds automated tests",
      hints: ["responsibilities.get('tests') looks up the 'tests' key directly in the dictionary."],
      solution_summary: "responsibility('tests') looks up 'tests' in the responsibilities dictionary and returns 'holds automated tests'.",
      key_concepts: ["project structure", "separation of concerns"],
    },
    {
      id: "py_project_structure_wc6",
      type: "build",
      prompt: "Write code representing a project's folders and their responsibilities in a dictionary, then print each as '<folder>: <responsibility>'.",
      solution_code: "layout = {\"my_app\": \"application code\", \"tests\": \"automated tests\", \"docs\": \"project documentation\"}\nfor folder, responsibility in layout.items():\n    print(f\"{folder}: {responsibility}\")",
      expected_output: "my_app: application code\ntests: automated tests\ndocs: project documentation",
      hints: ["Iterate the dictionary's items() to access both the folder name and its responsibility together."],
      solution_summary: "The loop iterates layout.items() in insertion order, printing each folder alongside its responsibility.",
      key_concepts: ["project structure", "separation of concerns"],
    },
    {
      id: "py_project_structure_wc7",
      type: "build",
      prompt: "Write a function `belongs_in(file_type)` that returns \"tests\" for \"test_case\" and \"my_app\" for anything else, then print `belongs_in(\"test_case\")`.",
      solution_code: "def belongs_in(file_type):\n    if file_type == \"test_case\":\n        return \"tests\"\n    return \"my_app\"\n\nprint(belongs_in(\"test_case\"))",
      expected_output: "tests",
      hints: ["Check specifically whether file_type equals \"test_case\" first."],
      solution_summary: "file_type is \"test_case\", so the function returns \"tests\" via the first branch.",
      key_concepts: ["project structure", "separation of concerns"],
    },
  ],
};

let added = 0;
for (const [topicId, challenges] of Object.entries(CONTENT)) {
  const topic = pythonTrack.topics.find((t) => t.id === topicId);
  if (!topic) {
    console.error(`MISSING TOPIC: ${topicId}`);
    continue;
  }
  if (!Array.isArray(topic.anvil_challenges)) topic.anvil_challenges = [];
  topic.anvil_challenges.push(...challenges);
  added += challenges.length;
}

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log(`Added ${added} challenges across ${Object.keys(CONTENT).length} topics.`);
