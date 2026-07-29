// Batch 5: rest of Git (commits_branches_repos, merge_conflicts,
// pull_requests, why_github_gitlab), all of Reading Code (reading_others_code,
// naming_conventions, code_style_formatting, what_is_clean_code,
// common_beginner_mistakes), and ai_history (AI section opener).
//
// Git topics have no executable Git commands to run in Anvil's Python
// sandbox, so all 4 stay print()-narration, matching what_is_git (batch 4).
// reading_others_code is purely a reading-skill topic, also narration.
// naming_conventions, code_style_formatting, and what_is_clean_code get
// real, executing Python where the topic itself is concretely demonstrable
// (descriptive vs. cryptic names; Python's enforced-indentation syntax
// error; splitting an overloaded function into focused ones).
// common_beginner_mistakes is the strongest fit for real code in this
// batch: off-by-one, assignment-vs-comparison, and mutate-while-iterating
// are all genuine, reproducible Python bugs. ai_history is pure historical
// narration, no executable content of its own.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  commits_branches_repos: [
    {
      id: "commits_branches_repos_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate Git's core vocabulary.",
      shuffled_lines: [
        "print('A commit is a saved snapshot of the project\\'s exact state at one point in time')",
        "print('A repository is a specific project being actively tracked by Git')",
        "print('A branch is an independent line of development diverging from the project\\'s history')",
      ],
      solution_code:
        "print('A repository is a specific project being actively tracked by Git')\n\nprint('A commit is a saved snapshot of the project\\'s exact state at one point in time')\n\nprint('A branch is an independent line of development diverging from the project\\'s history')",
      expected_output:
        "A repository is a specific project being actively tracked by Git\nA commit is a saved snapshot of the project's exact state at one point in time\nA branch is an independent line of development diverging from the project's history",
      hints: [
        "The repository is the overall project being tracked, so it comes first.",
        "Branches build on top of a chain of commits, so that comes last.",
      ],
      solution_summary: "A repository is the tracked project; a commit is one saved snapshot; a branch is an independent line of commits.",
      key_concepts: ["repository", "commit", "branch"],
    },
    {
      id: "commits_branches_repos_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A branch is a lightweight, movable label pointing at one specific commit')\nprint('Merging combines two branches\\' separate histories back into one')",
      solution_code: "print('A branch is a lightweight, movable label pointing at one specific commit')\nprint('Merging combines two branches\\' separate histories back into one')",
      expected_output: "A branch is a lightweight, movable label pointing at one specific commit\nMerging combines two branches' separate histories back into one",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["branch", "merge"],
    },
    {
      id: "commits_branches_repos_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about commits actually prints.",
      buggy_code: "print('Frequent, small, well-described commits produce a more useful history)",
      solution_code: "print('Frequent, small, well-described commits produce a more useful history')",
      expected_output: "Frequent, small, well-described commits produce a more useful history",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "commit"],
    },
  ],

  merge_conflicts: [
    {
      id: "merge_conflicts_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why a merge conflict happens.",
      shuffled_lines: [
        "print('Git can usually combine changes from two branches completely automatically')",
        "print('A conflict happens only when both branches changed the exact same lines differently')",
        "print('Git then pauses and asks a human to manually resolve the conflicting section')",
      ],
      solution_code:
        "print('Git can usually combine changes from two branches completely automatically')\n\nprint('A conflict happens only when both branches changed the exact same lines differently')\n\nprint('Git then pauses and asks a human to manually resolve the conflicting section')",
      expected_output:
        "Git can usually combine changes from two branches completely automatically\nA conflict happens only when both branches changed the exact same lines differently\nGit then pauses and asks a human to manually resolve the conflicting section",
      hints: [
        "Start with the common case (automatic merging) before naming the exception.",
        "Pausing for human resolution is what happens once a conflict is actually detected, so it comes last.",
      ],
      solution_summary:
        "Most merges succeed automatically; a conflict only arises when the same lines were changed differently, and then Git pauses for a human to resolve it.",
      key_concepts: ["merge conflict"],
    },
    {
      id: "merge_conflicts_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A merge conflict is not a sign that Git is broken')\nprint('It is Git correctly recognizing it cannot guess which change should win')",
      solution_code: "print('A merge conflict is not a sign that Git is broken')\nprint('It is Git correctly recognizing it cannot guess which change should win')",
      expected_output: "A merge conflict is not a sign that Git is broken\nIt is Git correctly recognizing it cannot guess which change should win",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["merge conflict"],
    },
    {
      id: "merge_conflicts_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about merge conflicts actually prints.",
      buggy_code: "print('Conflicts cluster around files many team members frequently edit)",
      solution_code: "print('Conflicts cluster around files many team members frequently edit')",
      expected_output: "Conflicts cluster around files many team members frequently edit",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "merge conflict"],
    },
  ],

  pull_requests: [
    {
      id: "pull_requests_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the pull request workflow.",
      shuffled_lines: [
        "print('Automated checks and human reviewers evaluate the proposed change')",
        "print('A pull request proposes merging one branch\\'s changes into another')",
        "print('Once approved, the change is actually merged into the shared, stable branch')",
      ],
      solution_code:
        "print('A pull request proposes merging one branch\\'s changes into another')\n\nprint('Automated checks and human reviewers evaluate the proposed change')\n\nprint('Once approved, the change is actually merged into the shared, stable branch')",
      expected_output:
        "A pull request proposes merging one branch's changes into another\nAutomated checks and human reviewers evaluate the proposed change\nOnce approved, the change is actually merged into the shared, stable branch",
      hints: [
        "Opening the pull request has to happen before it can be reviewed.",
        "The actual merge only happens after review and checks pass, so it comes last.",
      ],
      solution_summary: "A pull request proposes a merge, gets reviewed by checks and people, and is merged only once approved.",
      key_concepts: ["pull request", "code review"],
    },
    {
      id: "pull_requests_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('A draft pull request signals work-in-progress, not ready for full review')\nprint('Reviewers can leave comments directly on individual lines of a proposed change')",
      solution_code: "print('A draft pull request signals work-in-progress, not ready for full review')\nprint('Reviewers can leave comments directly on individual lines of a proposed change')",
      expected_output: "A draft pull request signals work-in-progress, not ready for full review\nReviewers can leave comments directly on individual lines of a proposed change",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["pull request", "draft pull request"],
    },
    {
      id: "pull_requests_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about pull requests actually prints.",
      buggy_code: "print('A pull request is a hosting-platform feature, not a Git feature itself)",
      solution_code: "print('A pull request is a hosting-platform feature, not a Git feature itself')",
      expected_output: "A pull request is a hosting-platform feature, not a Git feature itself",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "pull request"],
    },
  ],

  why_github_gitlab: [
    {
      id: "why_github_gitlab_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why hosting platforms exist alongside Git.",
      shuffled_lines: [
        "print('GitHub and GitLab host Git repositories remotely, on servers accessible over the internet')",
        "print('Git itself is purely local software, requiring no internet connection at all')",
        "print('Team members push their own commits up and pull everyone else\\'s down through that shared host')",
      ],
      solution_code:
        "print('Git itself is purely local software, requiring no internet connection at all')\n\nprint('GitHub and GitLab host Git repositories remotely, on servers accessible over the internet')\n\nprint('Team members push their own commits up and pull everyone else\\'s down through that shared host')",
      expected_output:
        "Git itself is purely local software, requiring no internet connection at all\nGitHub and GitLab host Git repositories remotely, on servers accessible over the internet\nTeam members push their own commits up and pull everyone else's down through that shared host",
      hints: [
        "Name Git's own local-first nature before naming the hosting platforms built on top of it.",
        "The push/pull collaboration payoff is what hosting actually enables, so it comes last.",
      ],
      solution_summary: "Git is purely local; GitHub/GitLab add remote hosting on top, letting team members push and pull through one shared copy.",
      key_concepts: ["GitHub", "GitLab", "remote hosting"],
    },
    {
      id: "why_github_gitlab_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('GitHub and GitLab are genuinely competing platforms, not the same service')\nprint('Both are built around the identical underlying Git technology')",
      solution_code: "print('GitHub and GitLab are genuinely competing platforms, not the same service')\nprint('Both are built around the identical underlying Git technology')",
      expected_output: "GitHub and GitLab are genuinely competing platforms, not the same service\nBoth are built around the identical underlying Git technology",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["GitHub", "GitLab"],
    },
    {
      id: "why_github_gitlab_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about Git vs. GitHub actually prints.",
      buggy_code: "print('Git and GitHub are two genuinely distinct pieces of technology)",
      solution_code: "print('Git and GitHub are two genuinely distinct pieces of technology')",
      expected_output: "Git and GitHub are two genuinely distinct pieces of technology",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "Git vs. GitHub"],
    },
  ],

  reading_others_code: [
    {
      id: "reading_others_code_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the practical approach to reading unfamiliar code.",
      shuffled_lines: [
        "print('From that entry point, follow the data to see how values get transformed')",
        "print('Identify the entry point where execution actually starts for the behavior you care about')",
        "print('Focus narrowly on the one relevant path rather than the entire codebase at once')",
      ],
      solution_code:
        "print('Identify the entry point where execution actually starts for the behavior you care about')\n\nprint('From that entry point, follow the data to see how values get transformed')\n\nprint('Focus narrowly on the one relevant path rather than the entire codebase at once')",
      expected_output:
        "Identify the entry point where execution actually starts for the behavior you care about\nFrom that entry point, follow the data to see how values get transformed\nFocus narrowly on the one relevant path rather than the entire codebase at once",
      hints: [
        "Finding the entry point comes before tracing data through it.",
        "The narrow-focus discipline is the overarching takeaway, so it comes last.",
      ],
      solution_summary: "Find the entry point, trace the data from there, and stay narrowly focused on the one relevant path.",
      key_concepts: ["reading code", "entry point"],
    },
    {
      id: "reading_others_code_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Reading code from the outside in builds a rough map before diving into detail')\nprint('A function\\'s existing tests often show realistic example inputs and outputs')",
      solution_code: "print('Reading code from the outside in builds a rough map before diving into detail')\nprint('A function\\'s existing tests often show realistic example inputs and outputs')",
      expected_output: "Reading code from the outside in builds a rough map before diving into detail\nA function's existing tests often show realistic example inputs and outputs",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["reading code", "outside-in reading"],
    },
    {
      id: "reading_others_code_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about reading code actually prints.",
      buggy_code: "print('Struggling to read unfamiliar code is universal, not a personal shortcoming)",
      solution_code: "print('Struggling to read unfamiliar code is universal, not a personal shortcoming')",
      expected_output: "Struggling to read unfamiliar code is universal, not a personal shortcoming",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "reading code"],
    },
  ],

  naming_conventions: [
    {
      id: "naming_conventions_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. A descriptive name communicates purpose without needing to trace the surrounding logic.",
      snippet_code: "subtotal = 40\ntax_rate = 0.1\ntotal_price = subtotal + subtotal * tax_rate\nprint(total_price)",
      solution_code: "subtotal = 40\ntax_rate = 0.1\ntotal_price = subtotal + subtotal * tax_rate\nprint(total_price)",
      expected_output: "44.0",
      hints: ["40 plus 40 times 0.1 (4.0) equals 44.0."],
      solution_summary: "total_price is subtotal plus subtotal times tax_rate: 40 + 4.0 = 44.0.",
      key_concepts: ["naming convention", "descriptive naming"],
    },
    {
      id: "naming_conventions_ac2",
      type: "fix",
      prompt:
        "This boolean's name reads as a bare noun, leaving it ambiguous whether True means the status is good or bad. Rename it to a clear yes-or-no question so its meaning is unambiguous, and update every reference.",
      buggy_code: "status = True\nif status:\n    print('proceed')",
      solution_code: "is_valid = True\nif is_valid:\n    print('proceed')",
      expected_output: "proceed",
      hints: [
        "A boolean reads more clearly when phrased as a yes-or-no claim, like is_valid, rather than a bare noun like status.",
        "Rename status to is_valid everywhere it appears.",
      ],
      solution_summary: "Renaming status to is_valid removes the ambiguity a bare noun leaves about what True or False actually means.",
      key_concepts: ["naming convention", "boolean naming"],
    },
    {
      id: "naming_conventions_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why naming conventions matter.",
      shuffled_lines: [
        "print('The machine treats any variable name identically, regardless of what it is')",
        "print('Naming conventions exist entirely for human readers, not for the machine')",
        "print('Consistent, descriptive naming lets a reader understand code without tracing every line')",
      ],
      solution_code:
        "print('The machine treats any variable name identically, regardless of what it is')\n\nprint('Naming conventions exist entirely for human readers, not for the machine')\n\nprint('Consistent, descriptive naming lets a reader understand code without tracing every line')",
      expected_output:
        "The machine treats any variable name identically, regardless of what it is\nNaming conventions exist entirely for human readers, not for the machine\nConsistent, descriptive naming lets a reader understand code without tracing every line",
      hints: [
        "Establish that naming is mechanically invisible to the machine first.",
        "The human-readability payoff is the conclusion, so it comes last.",
      ],
      solution_summary: "Names don't affect how code runs — they exist purely for human readers, and good ones speed up understanding.",
      key_concepts: ["naming convention"],
    },
  ],

  code_style_formatting: [
    {
      id: "code_style_formatting_ac1",
      type: "fix",
      prompt:
        "In Python, indentation is enforced, meaningful syntax, not just a stylistic choice. This function body isn't indented at all, so Python refuses to run it. Fix it.",
      buggy_code: "def greet(name):\nprint('Hello, ' + name)\n\ngreet('Ana')",
      solution_code: "def greet(name):\n    print('Hello, ' + name)\n\ngreet('Ana')",
      expected_output: "Hello, Ana",
      hints: [
        "Unlike most languages, Python requires a function's body to actually be indented — it's enforced syntax, not optional style.",
        "Indent the print statement so it's inside greet's body.",
      ],
      solution_summary: "Python requires an indented block for a function's body; without it, the code is invalid syntax and won't run at all.",
      key_concepts: ["indentation", "syntax error"],
    },
    {
      id: "code_style_formatting_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Formatting choices like indentation and spacing have zero effect on execution')\nprint('Python is the notable exception: indentation is enforced, meaningful syntax there')",
      solution_code: "print('Formatting choices like indentation and spacing have zero effect on execution')\nprint('Python is the notable exception: indentation is enforced, meaningful syntax there')",
      expected_output: "Formatting choices like indentation and spacing have zero effect on execution\nPython is the notable exception: indentation is enforced, meaningful syntax there",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["code style", "formatting"],
    },
    {
      id: "code_style_formatting_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why consistent formatting helps a reader.",
      shuffled_lines: [
        "print('Consistent indentation visually communicates a code\\'s nested structure at a glance')",
        "print('A reader can trace a block\\'s boundaries instantly, without manually counting brackets')",
        "print('Automated formatting tools enforce one agreed style consistently across a team')",
      ],
      solution_code:
        "print('Consistent indentation visually communicates a code\\'s nested structure at a glance')\n\nprint('A reader can trace a block\\'s boundaries instantly, without manually counting brackets')\n\nprint('Automated formatting tools enforce one agreed style consistently across a team')",
      expected_output:
        "Consistent indentation visually communicates a code's nested structure at a glance\nA reader can trace a block's boundaries instantly, without manually counting brackets\nAutomated formatting tools enforce one agreed style consistently across a team",
      hints: [
        "Name what consistent indentation communicates before naming its direct reading benefit.",
        "The team-wide automation point is the broader conclusion, so it comes last.",
      ],
      solution_summary: "Consistent indentation shows structure at a glance, speeding up reading, and automated tools keep that consistency team-wide.",
      key_concepts: ["code style", "formatting"],
    },
  ],

  what_is_clean_code: [
    {
      id: "what_is_clean_code_ac1",
      type: "fix",
      prompt:
        "This function is doing three unrelated things at once (validating, doubling, and printing), making it hard to test or reuse in isolation. Split it into two focused functions: one that validates and doubles and returns the result, and one call that prints it.",
      buggy_code: "def process(x):\n    if x < 0:\n        return None\n    result = x * 2\n    print(result)\n\nprocess(5)",
      solution_code: "def double_positive(x):\n    if x < 0:\n        return None\n    return x * 2\n\nresult = double_positive(5)\nprint(result)",
      expected_output: "10",
      hints: [
        "A function that validates, computes, and prints all at once is hard to describe in one sentence without 'and'.",
        "Have the function only validate and compute, returning the result; print it separately, outside the function.",
      ],
      solution_summary:
        "Splitting the mixed validate-compute-print function into a focused compute function, with printing handled separately, gives each piece one clear responsibility.",
      key_concepts: ["clean code", "single responsibility"],
    },
    {
      id: "what_is_clean_code_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Clean code is easy for a human to read, understand, and safely modify later')\nprint('Correctness and cleanliness are two distinct qualities, and neither guarantees the other')",
      solution_code: "print('Clean code is easy for a human to read, understand, and safely modify later')\nprint('Correctness and cleanliness are two distinct qualities, and neither guarantees the other')",
      expected_output: "Clean code is easy for a human to read, understand, and safely modify later\nCorrectness and cleanliness are two distinct qualities, and neither guarantees the other",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["clean code"],
    },
    {
      id: "what_is_clean_code_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what makes code clean.",
      shuffled_lines: [
        "print('Functions that each do exactly one clearly defined thing are easier to understand and test')",
        "print('Clean code prioritizes clarity for future readers over cleverness or brevity')",
        "print('Avoiding needless duplication means a fix only ever needs to be made in one place')",
      ],
      solution_code:
        "print('Clean code prioritizes clarity for future readers over cleverness or brevity')\n\nprint('Functions that each do exactly one clearly defined thing are easier to understand and test')\n\nprint('Avoiding needless duplication means a fix only ever needs to be made in one place')",
      expected_output:
        "Clean code prioritizes clarity for future readers over cleverness or brevity\nFunctions that each do exactly one clearly defined thing are easier to understand and test\nAvoiding needless duplication means a fix only ever needs to be made in one place",
      hints: [
        "State the overall priority (clarity over cleverness) before naming specific practices.",
        "Duplication avoidance is one specific supporting practice, so it comes last.",
      ],
      solution_summary: "Clean code prioritizes clarity; single-responsibility functions and avoiding duplication are two concrete ways that shows up.",
      key_concepts: ["clean code", "single responsibility", "duplication"],
    },
  ],

  common_beginner_mistakes: [
    {
      id: "common_beginner_mistakes_ac1",
      type: "fix",
      prompt: "This is supposed to sum the numbers 1 through 5 using range, but it stops one short — a classic off-by-one error. Fix it.",
      buggy_code: "total = 0\nfor i in range(1, 5):\n    total = total + i\nprint(total)",
      solution_code: "total = 0\nfor i in range(1, 6):\n    total = total + i\nprint(total)",
      expected_output: "15",
      hints: [
        "range(1, 5) only reaches 1 through 4, not 5.",
        "range's second argument is exclusive, so summing through 5 needs range(1, 6).",
      ],
      solution_summary: "range(1, 5) stops one short of 5 — a textbook off-by-one error, fixed by using range(1, 6).",
      key_concepts: ["off-by-one error", "range"],
    },
    {
      id: "common_beginner_mistakes_ac2",
      type: "fix",
      prompt:
        "This is supposed to check whether x equals 5 using ==, but uses = (assignment) instead — Python refuses to run this at all as invalid syntax. Fix it.",
      buggy_code: "x = 5\nif x = 5:\n    print('match')",
      solution_code: "x = 5\nif x == 5:\n    print('match')",
      expected_output: "match",
      hints: [
        "A single = assigns; a double == compares. Python treats a stray = in a condition as invalid syntax.",
        "Change = to == inside the if condition.",
      ],
      solution_summary: "Confusing = with == is a classic beginner mistake — Python catches it as a syntax error, fixed by using ==.",
      key_concepts: ["assignment vs comparison", "syntax error"],
    },
    {
      id: "common_beginner_mistakes_ac3",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. Building a new list instead of mutating the original while looping avoids the mutate-while-iterating pitfall.",
      snippet_code: "numbers = [1, 2, 3, 4]\nevens = []\nfor n in numbers:\n    if n % 2 == 0:\n        evens.append(n)\nprint(evens)",
      solution_code: "numbers = [1, 2, 3, 4]\nevens = []\nfor n in numbers:\n    if n % 2 == 0:\n        evens.append(n)\nprint(evens)",
      expected_output: "[2, 4]",
      hints: ["Building a separate evens list avoids the unpredictable behavior of modifying numbers while looping over it."],
      solution_summary: "Building a new evens list while looping over the original avoids the mutate-while-iterating pitfall entirely, correctly collecting [2, 4].",
      key_concepts: ["mutating while iterating", "beginner mistakes"],
    },
  ],

  ai_history: [
    {
      id: "ai_history_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate AI's historical arc.",
      shuffled_lines: [
        "print('Machine learning let programs work out statistical patterns from data instead')",
        "print('Early symbolic AI relied on hand-coded logical rules written by human experts')",
        "print('Symbolic AI\\'s rules could not generalize beyond the narrow domain they were written for')",
      ],
      solution_code:
        "print('Early symbolic AI relied on hand-coded logical rules written by human experts')\n\nprint('Symbolic AI\\'s rules could not generalize beyond the narrow domain they were written for')\n\nprint('Machine learning let programs work out statistical patterns from data instead')",
      expected_output:
        "Early symbolic AI relied on hand-coded logical rules written by human experts\nSymbolic AI's rules could not generalize beyond the narrow domain they were written for\nMachine learning let programs work out statistical patterns from data instead",
      hints: [
        "Symbolic AI came first, historically.",
        "Its limitation is what motivated the shift to machine learning, which comes last.",
      ],
      solution_summary: "Symbolic AI used hand-written rules, hit a generalization limit, and machine learning emerged to learn patterns from data instead.",
      key_concepts: ["symbolic AI", "machine learning", "AI history"],
    },
    {
      id: "ai_history_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('AI as a formal field is generally dated to 1956, at the Dartmouth workshop')\nprint('The Turing test, proposed in 1950, predates that workshop')",
      solution_code: "print('AI as a formal field is generally dated to 1956, at the Dartmouth workshop')\nprint('The Turing test, proposed in 1950, predates that workshop')",
      expected_output: "AI as a formal field is generally dated to 1956, at the Dartmouth workshop\nThe Turing test, proposed in 1950, predates that workshop",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["AI history", "Turing test"],
    },
    {
      id: "ai_history_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about AI history actually prints.",
      buggy_code: "print('Large Language Models train one very large model on a general body of text)",
      solution_code: "print('Large Language Models train one very large model on a general body of text')",
      expected_output: "Large Language Models train one very large model on a general body of text",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "large language models"],
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
