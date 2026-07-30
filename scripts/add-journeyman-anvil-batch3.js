// Journeyman Anvil batch 3: separation_of_concerns, what_is_state, mvc_pattern,
// building_an_api, middleware, error_handling_patterns, logging, testing_unit_tests,
// environment_variables_config, software_development_lifecycle.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  separation_of_concerns: [
    {
      id: "separation_of_concerns_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how separation of concerns keeps a change contained to one part of a system.",
      shuffled_items: [
        "A developer needs to change how data is displayed.",
        "Because display logic is isolated from data-fetching logic, only the display code needs to change.",
        "The rest of the system continues working without modification.",
        "The codebase is organized so each part has one distinct responsibility.",
      ],
      items: [
        "The codebase is organized so each part has one distinct responsibility.",
        "A developer needs to change how data is displayed.",
        "Because display logic is isolated from data-fetching logic, only the display code needs to change.",
        "The rest of the system continues working without modification.",
      ],
      hints: [
        "The organizing principle must exist before a change can benefit from it.",
        "Isolation is what limits the blast radius of the change.",
      ],
      solution_summary: "Distinct responsibilities are separated → a change targets one concern → isolation limits the change to that part → everything else stays untouched.",
      key_concepts: ["separation of concerns", "modularity", "isolation of change"],
    },
    {
      id: "separation_of_concerns_jv2",
      type: "choice",
      prompt: "Which of these best describes a violation of separation of concerns?",
      options: [
        "A function that formats dates lives in its own module.",
        "A single function both queries the database and renders HTML for the page.",
        "Business logic and database access are in separate files.",
        "Validation logic is reused across multiple forms.",
      ],
      correct_index: 1,
      hints: [
        "A violation mixes two distinct responsibilities into one unit.",
        "Querying data and rendering output are different concerns.",
      ],
      solution_summary: "Mixing database access and HTML rendering in one function combines two distinct concerns into a single unit, which is exactly what separation of concerns argues against.",
      key_concepts: ["separation of concerns", "coupling", "single responsibility"],
    },
    {
      id: "separation_of_concerns_jv3",
      type: "match",
      prompt: "Match each system layer to the concern it is responsible for.",
      left: ["Data access layer", "Business logic layer", "Presentation layer", "Configuration"],
      right: ["Reading and writing persisted data", "Applying rules and computing results", "Displaying information to the user", "Storing environment-specific settings"],
      correct_pairs: [
        ["Data access layer", "Reading and writing persisted data"],
        ["Business logic layer", "Applying rules and computing results"],
        ["Presentation layer", "Displaying information to the user"],
        ["Configuration", "Storing environment-specific settings"],
      ],
      hints: [
        "Each layer should own exactly one kind of responsibility.",
        "Presentation is about what the user sees, not how data is computed or stored.",
      ],
      solution_summary: "Data access reads/writes data, business logic applies rules, presentation displays results, and configuration holds environment-specific settings — each a distinct concern.",
      key_concepts: ["layered architecture", "separation of concerns"],
    },
  ],
  what_is_state: [
    {
      id: "what_is_state_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a program's state changes over time.",
      shuffled_items: [
        "The program holds an initial set of values, such as score = 0.",
        "An event occurs, such as the player scoring a point.",
        "The program reads the updated state to decide what to display next.",
        "The program updates its stored values in response, such as score = 1.",
      ],
      items: [
        "The program holds an initial set of values, such as score = 0.",
        "An event occurs, such as the player scoring a point.",
        "The program updates its stored values in response, such as score = 1.",
        "The program reads the updated state to decide what to display next.",
      ],
      hints: [
        "State must exist before it can be changed by an event.",
        "The updated values must be read after they are written.",
      ],
      solution_summary: "Initial state exists → an event happens → the state is updated → the updated state is read to determine what happens next.",
      key_concepts: ["state", "state transitions", "mutable values"],
    },
    {
      id: "what_is_state_jv2",
      type: "choice",
      prompt: "Which of these is the best example of program state?",
      options: [
        "The source code file that defines a function",
        "The current value of a shopping cart's item list at a given moment",
        "The name of the programming language used",
        "A comment explaining what a function does",
      ],
      correct_index: 1,
      hints: [
        "State is data that can change over the course of execution.",
        "Source code and comments don't change while the program runs.",
      ],
      solution_summary: "A shopping cart's current item list is state: it changes as the program runs, and the program's behavior depends on its current value.",
      key_concepts: ["state", "runtime data", "mutable values"],
    },
    {
      id: "what_is_state_jv3",
      type: "match",
      prompt: "Match each scenario to whether it involves state or not.",
      left: ["A video game's current health total", "A function's fixed docstring text", "A logged-in user's session data", "The name of a variable in source code"],
      right: ["State — changes during execution", "Not state — fixed at authoring time", "State — changes during execution", "Not state — fixed at authoring time"],
      correct_pairs: [
        ["A video game's current health total", "State — changes during execution"],
        ["A function's fixed docstring text", "Not state — fixed at authoring time"],
        ["A logged-in user's session data", "State — changes during execution"],
        ["The name of a variable in source code", "Not state — fixed at authoring time"],
      ],
      hints: [
        "State is data that changes while the program is running.",
        "Anything fixed at the moment the code was written is not state.",
      ],
      solution_summary: "Health totals and session data change at runtime and are state; docstring text and variable names are fixed at authoring time and are not.",
      key_concepts: ["state", "runtime vs authoring time"],
    },
  ],
  mvc_pattern: [
    {
      id: "mvc_pattern_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a request flows through an MVC application.",
      shuffled_items: [
        "The Model retrieves or updates the underlying data.",
        "A user request arrives at the Controller.",
        "The Controller decides what should happen and asks the Model for data.",
        "The View renders the data returned by the Model into a response.",
      ],
      items: [
        "A user request arrives at the Controller.",
        "The Controller decides what should happen and asks the Model for data.",
        "The Model retrieves or updates the underlying data.",
        "The View renders the data returned by the Model into a response.",
      ],
      hints: [
        "The Controller is always the first point of contact for a request.",
        "The View renders only after the Model has produced data.",
      ],
      solution_summary: "A request hits the Controller → the Controller consults the Model → the Model handles the data → the View renders the result.",
      key_concepts: ["MVC", "Model-View-Controller", "request flow"],
    },
    {
      id: "mvc_pattern_jv2",
      type: "choice",
      prompt: "In the MVC pattern, which component is responsible for displaying data to the user?",
      options: [
        "Model",
        "View",
        "Controller",
        "Router",
      ],
      correct_index: 1,
      hints: [
        "The Model holds and manages data, not presentation.",
        "The component named for what the user 'sees' is the answer.",
      ],
      solution_summary: "The View is responsible for rendering and displaying data to the user; the Model manages data and the Controller coordinates between them.",
      key_concepts: ["MVC", "View", "presentation layer"],
    },
    {
      id: "mvc_pattern_jv3",
      type: "match",
      prompt: "Match each MVC component to its responsibility.",
      left: ["Model", "View", "Controller"],
      right: ["Manages data and business rules", "Renders output for the user", "Handles input and coordinates Model and View"],
      correct_pairs: [
        ["Model", "Manages data and business rules"],
        ["View", "Renders output for the user"],
        ["Controller", "Handles input and coordinates Model and View"],
      ],
      hints: [
        "Each component has exactly one of these three roles.",
        "The Controller sits between incoming requests and the other two components.",
      ],
      solution_summary: "The Model manages data and rules, the View renders output, and the Controller handles input and coordinates between the two.",
      key_concepts: ["MVC", "architectural pattern"],
    },
  ],
  building_an_api: [
    {
      id: "building_an_api_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a client uses an API to get data without knowing internal implementation details.",
      shuffled_items: [
        "The server processes the request internally and prepares a response.",
        "The client sends a request to a defined API endpoint.",
        "The client receives the response and uses the returned data.",
        "The server returns only the response, without exposing its internal logic.",
      ],
      items: [
        "The client sends a request to a defined API endpoint.",
        "The server processes the request internally and prepares a response.",
        "The server returns only the response, without exposing its internal logic.",
        "The client receives the response and uses the returned data.",
      ],
      hints: [
        "The request must reach the server before any processing happens.",
        "The response is sent back before the client can use the data.",
      ],
      solution_summary: "The client sends a request → the server processes it internally → the server returns just the response → the client uses the returned data.",
      key_concepts: ["API", "client-server", "abstraction"],
    },
    {
      id: "building_an_api_jv2",
      type: "choice",
      prompt: "What is the primary purpose of an API's defined endpoints?",
      options: [
        "To expose the server's entire internal source code to clients",
        "To provide a fixed, well-defined set of ways clients can request data or actions",
        "To replace the need for any server-side logic",
        "To store a user's session state permanently",
      ],
      correct_index: 1,
      hints: [
        "An API is defined by a controlled, agreed-upon surface, not an open window into internals.",
        "Endpoints are the specific, documented ways a client can interact with the server.",
      ],
      solution_summary: "API endpoints provide a fixed, well-defined set of ways for clients to request data or trigger actions, without exposing internal implementation.",
      key_concepts: ["API", "endpoint", "abstraction"],
    },
    {
      id: "building_an_api_jv3",
      type: "match",
      prompt: "Match each API concept to its description.",
      left: ["Endpoint", "Request", "Response", "Client"],
      right: ["A specific URL path that exposes a piece of functionality", "A message sent to an endpoint asking for data or an action", "The data sent back after processing a request", "The program or user consuming the API"],
      correct_pairs: [
        ["Endpoint", "A specific URL path that exposes a piece of functionality"],
        ["Request", "A message sent to an endpoint asking for data or an action"],
        ["Response", "The data sent back after processing a request"],
        ["Client", "The program or user consuming the API"],
      ],
      hints: [
        "The client always initiates by sending a request to an endpoint.",
        "A response is what comes back after the server processes a request.",
      ],
      solution_summary: "An endpoint exposes functionality, a request asks for something, a response is what's sent back, and the client is whoever is consuming the API.",
      key_concepts: ["API", "endpoint", "request", "response"],
    },
  ],
  middleware: [
    {
      id: "middleware_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a request passes through middleware before reaching its final handler.",
      shuffled_items: [
        "A logging middleware records that the request arrived.",
        "An incoming request reaches the server.",
        "The final route handler processes the request and produces a response.",
        "An authentication middleware checks whether the request is authorized.",
      ],
      items: [
        "An incoming request reaches the server.",
        "A logging middleware records that the request arrived.",
        "An authentication middleware checks whether the request is authorized.",
        "The final route handler processes the request and produces a response.",
      ],
      hints: [
        "Middleware runs before the final route handler, in the order it's registered.",
        "Logging typically happens early, before authorization decisions are made.",
      ],
      solution_summary: "A request arrives → logging middleware records it → authentication middleware checks authorization → the final handler processes the request.",
      key_concepts: ["middleware", "request pipeline"],
    },
    {
      id: "middleware_jv2",
      type: "choice",
      prompt: "Which of these is a typical responsibility of middleware in a web application?",
      options: [
        "Permanently storing all application data",
        "Rendering the final HTML shown to the user",
        "Inspecting or modifying a request before it reaches the route handler",
        "Defining the visual layout of a webpage",
      ],
      correct_index: 2,
      hints: [
        "Middleware sits between the incoming request and the route handler.",
        "Think of the mailroom analogy: sorting and checking mail before delivery.",
      ],
      solution_summary: "Middleware inspects or modifies a request as it passes through, before it reaches the final route handler — like logging or authentication checks.",
      key_concepts: ["middleware", "request pipeline"],
    },
    {
      id: "middleware_jv3",
      type: "match",
      prompt: "Match each middleware type to what it typically does.",
      left: ["Authentication middleware", "Logging middleware", "Error-handling middleware", "CORS middleware"],
      right: ["Verifies the requester's identity", "Records details about each request", "Catches and formats errors before responding", "Controls which origins can access the API"],
      correct_pairs: [
        ["Authentication middleware", "Verifies the requester's identity"],
        ["Logging middleware", "Records details about each request"],
        ["Error-handling middleware", "Catches and formats errors before responding"],
        ["CORS middleware", "Controls which origins can access the API"],
      ],
      hints: [
        "Each middleware type handles one specific cross-cutting concern.",
        "Authentication is about identity; CORS is about which origins are allowed.",
      ],
      solution_summary: "Authentication middleware verifies identity, logging middleware records requests, error-handling middleware catches errors, and CORS middleware controls allowed origins.",
      key_concepts: ["middleware", "cross-cutting concerns"],
    },
  ],
  error_handling_patterns: [
    {
      id: "error_handling_patterns_jv1",
      type: "order",
      prompt: "Put these steps in order to describe a well-structured error handling flow.",
      shuffled_items: [
        "The program attempts a risky operation, such as reading a file.",
        "If an error occurs, the program catches it instead of crashing.",
        "The program responds in a controlled way, such as logging the error and returning a default value.",
        "The program continues running normally afterward.",
      ],
      items: [
        "The program attempts a risky operation, such as reading a file.",
        "If an error occurs, the program catches it instead of crashing.",
        "The program responds in a controlled way, such as logging the error and returning a default value.",
        "The program continues running normally afterward.",
      ],
      hints: [
        "The risky operation must be attempted before an error can occur.",
        "The controlled response comes after the error is caught, not before.",
      ],
      solution_summary: "A risky operation is attempted → an error is caught rather than crashing the program → the program responds in a controlled way → execution continues.",
      key_concepts: ["error handling", "try/catch", "graceful degradation"],
    },
    {
      id: "error_handling_patterns_jv2",
      type: "choice",
      prompt: "What is the main goal of a good error handling pattern?",
      options: [
        "To prevent all errors from ever occurring",
        "To hide errors completely so users never notice anything went wrong",
        "To detect and respond to errors in a controlled, predictable way instead of crashing",
        "To rewrite the entire program every time an error happens",
      ],
      correct_index: 2,
      hints: [
        "Errors can't always be prevented, but the response to them can be controlled.",
        "The pilot analogy: a rehearsed, predictable response, not silence or crashing.",
      ],
      solution_summary: "Good error handling detects and responds to problems in a controlled, predictable way rather than letting the program crash unpredictably.",
      key_concepts: ["error handling", "graceful degradation"],
    },
    {
      id: "error_handling_patterns_jv3",
      type: "match",
      prompt: "Match each error handling concept to its description.",
      left: ["try/catch block", "Fallback value", "Error logging", "Re-throwing an error"],
      right: ["Wraps risky code and catches failures", "A default result used when an operation fails", "Recording what went wrong for later review", "Passing an error up to a caller that can handle it better"],
      correct_pairs: [
        ["try/catch block", "Wraps risky code and catches failures"],
        ["Fallback value", "A default result used when an operation fails"],
        ["Error logging", "Recording what went wrong for later review"],
        ["Re-throwing an error", "Passing an error up to a caller that can handle it better"],
      ],
      hints: [
        "A try/catch block is the structural mechanism that catches failures.",
        "Re-throwing means the current code can't handle the error, so it passes it along.",
      ],
      solution_summary: "try/catch wraps risky code, a fallback value substitutes on failure, logging records what happened, and re-throwing passes the error to a better-equipped caller.",
      key_concepts: ["error handling", "try/catch", "fallback"],
    },
  ],
  logging: [
    {
      id: "logging_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how logging helps diagnose a problem after the fact.",
      shuffled_items: [
        "A developer investigating a bug reads the log entries in order.",
        "The program runs and records significant events as log entries.",
        "The developer reconstructs the sequence of events leading to the failure.",
        "Something goes wrong in production.",
      ],
      items: [
        "The program runs and records significant events as log entries.",
        "Something goes wrong in production.",
        "A developer investigating a bug reads the log entries in order.",
        "The developer reconstructs the sequence of events leading to the failure.",
      ],
      hints: [
        "Logs must be recorded before they can be useful for investigation.",
        "Reading the log entries comes before reconstructing the full sequence of events.",
      ],
      solution_summary: "The program records events as they happen → a failure occurs → a developer reads the logged entries → the developer reconstructs what led to the failure.",
      key_concepts: ["logging", "debugging", "observability"],
    },
    {
      id: "logging_jv2",
      type: "choice",
      prompt: "What is the primary purpose of logging in a software system?",
      options: [
        "To make the program run faster",
        "To permanently record significant events so they can be reviewed after the fact",
        "To replace the need for testing",
        "To display messages only to the end user",
      ],
      correct_index: 1,
      hints: [
        "The black box analogy: logging exists for reconstruction after something happens, not for performance.",
        "Logs are primarily read by developers, not end users.",
      ],
      solution_summary: "Logging records significant events as they happen so a developer can later reconstruct what occurred, similar to a flight data recorder.",
      key_concepts: ["logging", "observability"],
    },
    {
      id: "logging_jv3",
      type: "match",
      prompt: "Match each log level to when it's typically used.",
      left: ["DEBUG", "INFO", "WARNING", "ERROR"],
      right: ["Detailed diagnostic information for developers", "Routine events confirming normal operation", "Something unexpected but not yet broken", "A failure that prevented an operation from completing"],
      correct_pairs: [
        ["DEBUG", "Detailed diagnostic information for developers"],
        ["INFO", "Routine events confirming normal operation"],
        ["WARNING", "Something unexpected but not yet broken"],
        ["ERROR", "A failure that prevented an operation from completing"],
      ],
      hints: [
        "Log levels increase in severity from DEBUG to ERROR.",
        "WARNING indicates a concern that hasn't caused failure yet.",
      ],
      solution_summary: "DEBUG is for detailed diagnostics, INFO confirms normal operation, WARNING flags a concern short of failure, and ERROR marks an actual failed operation.",
      key_concepts: ["logging", "log levels"],
    },
  ],
  testing_unit_tests: [
    {
      id: "testing_unit_tests_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a unit test verifies a single function.",
      shuffled_items: [
        "The test calls the function with known input.",
        "A developer writes a small automated test targeting one function.",
        "The test compares the actual output to the expected output.",
        "The test reports pass or fail based on whether they match.",
      ],
      items: [
        "A developer writes a small automated test targeting one function.",
        "The test calls the function with known input.",
        "The test compares the actual output to the expected output.",
        "The test reports pass or fail based on whether they match.",
      ],
      hints: [
        "The test must be written before it can be run against the function.",
        "Comparing actual to expected output happens before the pass/fail verdict.",
      ],
      solution_summary: "A unit test is written for one function → it calls the function with known input → it compares actual output to expected output → it reports pass or fail.",
      key_concepts: ["unit test", "testing", "expected vs actual"],
    },
    {
      id: "testing_unit_tests_jv2",
      type: "choice",
      prompt: "What distinguishes a unit test from other kinds of testing?",
      options: [
        "It tests the entire application end to end, including the UI",
        "It verifies one small, individual piece of code in isolation",
        "It can only be run manually by a human tester",
        "It tests performance under heavy load",
      ],
      correct_index: 1,
      hints: [
        "The furniture-maker analogy: checking one piece before assembly, not the whole finished product.",
        "Isolation is the key characteristic — testing one unit, not the whole system.",
      ],
      solution_summary: "A unit test verifies one small, individual piece of code in isolation, unlike end-to-end or load testing which cover much larger scope.",
      key_concepts: ["unit test", "testing", "isolation"],
    },
    {
      id: "testing_unit_tests_jv3",
      type: "match",
      prompt: "Match each testing term to its meaning.",
      left: ["Unit test", "Assertion", "Test case", "Regression"],
      right: ["Tests one isolated piece of code", "A statement checking that a condition is true", "A specific scenario with defined input and expected output", "A previously working feature breaking due to a new change"],
      correct_pairs: [
        ["Unit test", "Tests one isolated piece of code"],
        ["Assertion", "A statement checking that a condition is true"],
        ["Test case", "A specific scenario with defined input and expected output"],
        ["Regression", "A previously working feature breaking due to a new change"],
      ],
      hints: [
        "An assertion is the actual check inside a test case.",
        "Regression describes something that used to work and no longer does.",
      ],
      solution_summary: "A unit test targets one piece of code, an assertion checks a condition, a test case defines input and expected output, and a regression is a break in previously working behavior.",
      key_concepts: ["unit test", "assertion", "regression"],
    },
  ],
  environment_variables_config: [
    {
      id: "environment_variables_config_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how environment variables let the same code run differently across environments.",
      shuffled_items: [
        "The application is deployed to a new environment, such as production.",
        "The code is written once, referencing a configuration value by name rather than hardcoding it.",
        "The application reads the environment variable at startup and uses its value.",
        "An environment variable specific to that environment is set, such as DATABASE_URL.",
      ],
      items: [
        "The code is written once, referencing a configuration value by name rather than hardcoding it.",
        "The application is deployed to a new environment, such as production.",
        "An environment variable specific to that environment is set, such as DATABASE_URL.",
        "The application reads the environment variable at startup and uses its value.",
      ],
      hints: [
        "The code must reference the variable by name before deployment happens.",
        "The variable must be set in the new environment before the app can read it.",
      ],
      solution_summary: "Code references a config value by name → it's deployed to a new environment → an environment-specific variable is set → the app reads that variable at startup.",
      key_concepts: ["environment variables", "configuration", "deployment"],
    },
    {
      id: "environment_variables_config_jv2",
      type: "choice",
      prompt: "Why do developers use environment variables instead of hardcoding values like database URLs directly in the source code?",
      options: [
        "Hardcoded values run faster than environment variables",
        "Environment variables let the same code adapt to different environments without being rewritten",
        "Environment variables are required by every programming language's syntax",
        "Hardcoding is not technically possible in modern languages",
      ],
      correct_index: 1,
      hints: [
        "The touring band analogy: the same show adapts to each venue without being rewritten.",
        "The key benefit is adapting to different contexts, not performance.",
      ],
      solution_summary: "Environment variables let the same code run correctly across different environments (development, staging, production) without rewriting the source for each one.",
      key_concepts: ["environment variables", "configuration", "portability"],
    },
    {
      id: "environment_variables_config_jv3",
      type: "match",
      prompt: "Match each configuration concept to its description.",
      left: ["Environment variable", "Config file", "Secret", "Hardcoded value"],
      right: ["A named value set outside the source code, read at runtime", "A file holding settings, sometimes per-environment", "Sensitive configuration data like an API key, kept out of source control", "A fixed value written directly into the code itself"],
      correct_pairs: [
        ["Environment variable", "A named value set outside the source code, read at runtime"],
        ["Config file", "A file holding settings, sometimes per-environment"],
        ["Secret", "Sensitive configuration data like an API key, kept out of source control"],
        ["Hardcoded value", "A fixed value written directly into the code itself"],
      ],
      hints: [
        "Environment variables are set outside the code and read when the program runs.",
        "A hardcoded value is the opposite of configurable — it never changes without editing the code.",
      ],
      solution_summary: "Environment variables are external named values read at runtime, config files hold settings, secrets are sensitive values kept out of source control, and hardcoded values are fixed in the code itself.",
      key_concepts: ["environment variables", "configuration", "secrets"],
    },
  ],
  software_development_lifecycle: [
    {
      id: "software_development_lifecycle_jv1",
      type: "order",
      prompt: "Put these SDLC phases in their typical order.",
      shuffled_items: [
        "Deployment: the finished software is released to users.",
        "Requirements gathering: the team determines what the software needs to do.",
        "Testing: the built software is verified against requirements.",
        "Design: the team plans the software's structure and approach.",
        "Implementation: the software is actually built according to the design.",
      ],
      items: [
        "Requirements gathering: the team determines what the software needs to do.",
        "Design: the team plans the software's structure and approach.",
        "Implementation: the software is actually built according to the design.",
        "Testing: the built software is verified against requirements.",
        "Deployment: the finished software is released to users.",
      ],
      hints: [
        "You must know requirements before you can design a solution.",
        "Testing happens after implementation, before deployment.",
      ],
      solution_summary: "Requirements are gathered → the software is designed → it's implemented → it's tested against requirements → it's deployed to users.",
      key_concepts: ["SDLC", "software development lifecycle"],
    },
    {
      id: "software_development_lifecycle_jv2",
      type: "choice",
      prompt: "What is the primary purpose of following a software development lifecycle (SDLC)?",
      options: [
        "To guarantee the software will have zero bugs",
        "To provide a deliberate, recognizable sequence of phases from planning through release",
        "To eliminate the need for testing entirely",
        "To require that all software be written by a single person",
      ],
      correct_index: 1,
      hints: [
        "The construction analogy: blueprints, foundation, framing, inspection — a deliberate sequence, not a guarantee of perfection.",
        "SDLC is about structure and order, not eliminating all risk.",
      ],
      solution_summary: "The SDLC provides a deliberate, recognizable sequence of phases — from requirements through deployment — rather than guaranteeing bug-free software.",
      key_concepts: ["SDLC", "process", "software development lifecycle"],
    },
    {
      id: "software_development_lifecycle_jv3",
      type: "match",
      prompt: "Match each SDLC phase to what happens during it.",
      left: ["Requirements gathering", "Design", "Implementation", "Testing", "Deployment"],
      right: ["Determining what the software must do", "Planning the software's structure and approach", "Writing the actual code", "Verifying the software meets its requirements", "Releasing the software to users"],
      correct_pairs: [
        ["Requirements gathering", "Determining what the software must do"],
        ["Design", "Planning the software's structure and approach"],
        ["Implementation", "Writing the actual code"],
        ["Testing", "Verifying the software meets its requirements"],
        ["Deployment", "Releasing the software to users"],
      ],
      hints: [
        "Each phase produces something the next phase depends on.",
        "Testing checks the implementation against what requirements originally specified.",
      ],
      solution_summary: "Requirements define what's needed, design plans the approach, implementation writes the code, testing verifies it, and deployment releases it to users.",
      key_concepts: ["SDLC", "software development lifecycle"],
    },
  ],
};

let added = 0;
for (const [topicId, challenges] of Object.entries(CONTENT)) {
  const topic = tier.topics.find((t) => t.id === topicId);
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
