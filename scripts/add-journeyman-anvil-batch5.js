// Journeyman Anvil batch 5: normalization_1nf_2nf_3nf, nosql_database_types, http_methods,
// status_codes, request_response_headers, cookies_sessions, auth_vs_authz, cors,
// caching_basics, concurrency_intro.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  normalization_1nf_2nf_3nf: [
    {
      id: "normalization_1nf_2nf_3nf_jv1",
      type: "order",
      prompt: "Put these steps in order to describe why normalization prevents an update from silently becoming inconsistent.",
      shuffled_items: [
        "A customer's address is stored once in a customers table, referenced by orders instead of repeated.",
        "The customer moves and their address needs to change.",
        "A spreadsheet repeats a customer's address on every one of their orders.",
        "Only a single row needs to be updated, so no copy can be missed.",
      ],
      items: [
        "A spreadsheet repeats a customer's address on every one of their orders.",
        "The customer moves and their address needs to change.",
        "A customer's address is stored once in a customers table, referenced by orders instead of repeated.",
        "Only a single row needs to be updated, so no copy can be missed.",
      ],
      hints: [
        "The problem (repeated data) is described before the normalized solution (storing it once).",
        "Updating a single row is only possible once the data is no longer duplicated.",
      ],
      solution_summary: "Repeated address data risks inconsistency when it changes → normalization stores it once in its own table → an update touches only that single row → no copy can be missed.",
      key_concepts: ["normalization", "redundancy", "data integrity"],
    },
    {
      id: "normalization_1nf_2nf_3nf_jv2",
      type: "choice",
      prompt: "What core problem does normalization primarily aim to solve?",
      options: [
        "Making queries run without any indexes",
        "Redundant, duplicated data that risks becoming inconsistent when updated",
        "Preventing tables from ever having more than one column",
        "Making the database run entirely in memory",
      ],
      correct_index: 1,
      hints: [
        "The customer-address-on-every-order example is the exact problem normalization targets.",
        "The risk is that one of many duplicated copies gets missed during an update.",
      ],
      solution_summary: "Normalization primarily aims to eliminate redundant, duplicated data so an update only ever needs to touch one place, avoiding silent inconsistency.",
      key_concepts: ["normalization", "redundancy", "data integrity"],
    },
    {
      id: "normalization_1nf_2nf_3nf_jv3",
      type: "match",
      prompt: "Match each normal form to what it addresses.",
      left: ["1NF", "2NF", "3NF", "Redundancy"],
      right: ["Ensures each column holds a single, atomic value", "Ensures non-key columns depend on the whole primary key", "Ensures non-key columns don't depend on other non-key columns", "The core problem normalization overall reduces"],
      correct_pairs: [
        ["1NF", "Ensures each column holds a single, atomic value"],
        ["2NF", "Ensures non-key columns depend on the whole primary key"],
        ["3NF", "Ensures non-key columns don't depend on other non-key columns"],
        ["Redundancy", "The core problem normalization overall reduces"],
      ],
      hints: [
        "1NF is about the shape of individual column values.",
        "2NF and 3NF both concern dependencies, but on different things (the key vs other columns).",
      ],
      solution_summary: "1NF requires atomic column values, 2NF requires full dependency on the primary key, 3NF requires no dependency on other non-key columns, and all three work together to reduce redundancy.",
      key_concepts: ["1NF", "2NF", "3NF", "normalization"],
    },
  ],
  nosql_database_types: [
    {
      id: "nosql_database_types_jv1",
      type: "order",
      prompt: "Put these steps in order to describe choosing among different NoSQL database types for a given job.",
      shuffled_items: [
        "A team identifies the shape and access pattern of their data.",
        "If the data is simple key-to-value lookups, they consider a key-value store.",
        "If the data is deeply relationship-driven, they consider a graph database.",
        "The team picks the NoSQL type matching that specific job, not a one-size-fits-all tool.",
      ],
      items: [
        "A team identifies the shape and access pattern of their data.",
        "If the data is simple key-to-value lookups, they consider a key-value store.",
        "If the data is deeply relationship-driven, they consider a graph database.",
        "The team picks the NoSQL type matching that specific job, not a one-size-fits-all tool.",
      ],
      hints: [
        "The access pattern must be identified before a matching database type can be chosen.",
        "The toolbox analogy: different jobs call for different specific tools, not one universal tool.",
      ],
      solution_summary: "The data's shape and access pattern are identified → a matching NoSQL type is considered for that pattern → the team ultimately picks the type suited to that specific job.",
      key_concepts: ["NoSQL", "database types", "key-value store", "graph database"],
    },
    {
      id: "nosql_database_types_jv2",
      type: "choice",
      prompt: "What does the toolbox-and-screwdriver analogy illustrate about NoSQL databases?",
      options: [
        "That NoSQL databases are all functionally identical",
        "That NoSQL is a single category containing genuinely different types of tools suited to different jobs",
        "That NoSQL databases should never be used together with relational databases",
        "That only one NoSQL type exists and it fits every job",
      ],
      correct_index: 1,
      hints: [
        "One screwdriver doesn't fit every bolt — some jobs need a wrench instead.",
        "NoSQL is described as a general category, not one uniform kind of tool.",
      ],
      solution_summary: "The analogy illustrates that NoSQL is a category of genuinely different tools (document, key-value, graph, etc.), each suited to a different specific job, not one uniform solution.",
      key_concepts: ["NoSQL", "database types"],
    },
    {
      id: "nosql_database_types_jv3",
      type: "match",
      prompt: "Match each NoSQL database type to its best-fit use case.",
      left: ["Key-value store", "Document database", "Column-family database", "Graph database"],
      right: ["Fast lookups by a unique identifier", "Nested, flexible JSON-like records", "Large-scale analytics across wide datasets", "Data defined mainly by relationships"],
      correct_pairs: [
        ["Key-value store", "Fast lookups by a unique identifier"],
        ["Document database", "Nested, flexible JSON-like records"],
        ["Column-family database", "Large-scale analytics across wide datasets"],
        ["Graph database", "Data defined mainly by relationships"],
      ],
      hints: [
        "A key-value store is the simplest possible lookup structure.",
        "Graph databases specialize in modeling connections between entities.",
      ],
      solution_summary: "Key-value stores suit fast unique-key lookups, document databases suit nested flexible records, column-family databases suit large-scale analytics, and graph databases suit relationship-heavy data.",
      key_concepts: ["NoSQL", "key-value store", "document database", "graph database"],
    },
  ],
  http_methods: [
    {
      id: "http_methods_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how an HTTP method tells a server what kind of action a request wants.",
      shuffled_items: [
        "A client wants to create a new resource on the server.",
        "The client sends a request using the POST method.",
        "The server recognizes POST as meaning 'create something new.'",
        "The server creates the resource and responds accordingly.",
      ],
      items: [
        "A client wants to create a new resource on the server.",
        "The client sends a request using the POST method.",
        "The server recognizes POST as meaning 'create something new.'",
        "The server creates the resource and responds accordingly.",
      ],
      hints: [
        "The client's intent exists before it's expressed as a specific HTTP method.",
        "The server must recognize the method's meaning before it acts on it.",
      ],
      solution_summary: "The client wants to create something → it sends a POST request → the server recognizes POST as 'create' → the server creates the resource and responds.",
      key_concepts: ["HTTP methods", "POST", "REST"],
    },
    {
      id: "http_methods_jv2",
      type: "choice",
      prompt: "Which HTTP method is used to retrieve data without modifying anything on the server?",
      options: [
        "GET",
        "POST",
        "DELETE",
        "PUT",
      ],
      correct_index: 0,
      hints: [
        "Think of the library counter: 'ask to see' something versus 'change' something.",
        "This method is the most common one used for simply fetching a webpage or resource.",
      ],
      solution_summary: "GET retrieves data without modifying it; POST creates, PUT updates/replaces, and DELETE removes.",
      key_concepts: ["HTTP methods", "GET"],
    },
    {
      id: "http_methods_jv3",
      type: "match",
      prompt: "Match each HTTP method to the library-counter action it corresponds to.",
      left: ["GET", "POST", "PUT", "DELETE"],
      right: ["Ask to see a book without changing anything", "Submit a brand new request to add something", "Replace an existing record entirely with new information", "Remove an existing record"],
      correct_pairs: [
        ["GET", "Ask to see a book without changing anything"],
        ["POST", "Submit a brand new request to add something"],
        ["PUT", "Replace an existing record entirely with new information"],
        ["DELETE", "Remove an existing record"],
      ],
      hints: [
        "GET is read-only; the other three all modify server state in some way.",
        "PUT replaces an existing resource, while POST is generally used to create a new one.",
      ],
      solution_summary: "GET reads without changing, POST creates something new, PUT replaces an existing resource, and DELETE removes it.",
      key_concepts: ["HTTP methods", "GET", "POST", "PUT", "DELETE"],
    },
  ],
  status_codes: [
    {
      id: "status_codes_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how an HTTP status code communicates the outcome of a request.",
      shuffled_items: [
        "A client sends a request to the server.",
        "The server processes the request and determines the outcome.",
        "The server attaches a status code summarizing that outcome, such as 200 or 404.",
        "The client reads the status code to immediately understand what happened.",
      ],
      items: [
        "A client sends a request to the server.",
        "The server processes the request and determines the outcome.",
        "The server attaches a status code summarizing that outcome, such as 200 or 404.",
        "The client reads the status code to immediately understand what happened.",
      ],
      hints: [
        "The outcome must be determined before a status code can be attached to it.",
        "The client reads the code after the response has already been sent.",
      ],
      solution_summary: "A request is sent → the server processes it and determines the outcome → a status code summarizes that outcome → the client reads the code to understand what happened.",
      key_concepts: ["HTTP status codes", "response"],
    },
    {
      id: "status_codes_jv2",
      type: "choice",
      prompt: "What does an HTTP status code in the 404 range typically mean?",
      options: [
        "The request succeeded and returned data",
        "The requested resource could not be found",
        "The server crashed unexpectedly",
        "The client must wait and retry later",
      ],
      correct_index: 1,
      hints: [
        "Think of the delivery driver reporting 'the address doesn't actually exist.'",
        "404 is one of the most commonly seen client-error status codes.",
      ],
      solution_summary: "A 404 status code means the requested resource could not be found on the server.",
      key_concepts: ["HTTP status codes", "404"],
    },
    {
      id: "status_codes_jv3",
      type: "match",
      prompt: "Match each status code range to its general meaning.",
      left: ["2xx", "3xx", "4xx", "5xx"],
      right: ["Success — the request was handled as expected", "Redirection — further action is needed to complete the request", "Client error — the request itself had a problem", "Server error — something went wrong on the server's side"],
      correct_pairs: [
        ["2xx", "Success — the request was handled as expected"],
        ["3xx", "Redirection — further action is needed to complete the request"],
        ["4xx", "Client error — the request itself had a problem"],
        ["5xx", "Server error — something went wrong on the server's side"],
      ],
      hints: [
        "2xx is the 'delivered successfully' range.",
        "4xx blames the request; 5xx blames the server.",
      ],
      solution_summary: "2xx means success, 3xx means redirection, 4xx means a client-side error, and 5xx means a server-side error.",
      key_concepts: ["HTTP status codes", "2xx", "4xx", "5xx"],
    },
  ],
  request_response_headers: [
    {
      id: "request_response_headers_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how HTTP headers carry metadata alongside a request.",
      shuffled_items: [
        "A client sends a request containing the actual data being requested.",
        "The client attaches headers describing metadata, such as content type and authorization.",
        "The server reads the headers before processing the request body.",
        "The server uses that metadata to decide how to handle the request.",
      ],
      items: [
        "A client sends a request containing the actual data being requested.",
        "The client attaches headers describing metadata, such as content type and authorization.",
        "The server reads the headers before processing the request body.",
        "The server uses that metadata to decide how to handle the request.",
      ],
      hints: [
        "Headers are attached alongside the request's actual data, not instead of it.",
        "The server reads the metadata before deciding how to process the request further.",
      ],
      solution_summary: "A request carries its actual data → headers attach metadata describing it → the server reads the headers first → the server uses that metadata to decide how to handle the request.",
      key_concepts: ["HTTP headers", "metadata"],
    },
    {
      id: "request_response_headers_jv2",
      type: "choice",
      prompt: "Based on the shipping-label analogy, what best describes an HTTP header?",
      options: [
        "The actual contents of the request or response body",
        "Metadata attached alongside the data, describing it without being the data itself",
        "A separate HTTP request sent before the main one",
        "A permanent record stored in the database",
      ],
      correct_index: 1,
      hints: [
        "A shipping label isn't the package's contents — it's information attached to the outside.",
        "Headers describe the request/response; they aren't the payload itself.",
      ],
      solution_summary: "An HTTP header is metadata attached alongside the actual request or response data, describing it, much like a shipping label describes a package's outside.",
      key_concepts: ["HTTP headers", "metadata"],
    },
    {
      id: "request_response_headers_jv3",
      type: "match",
      prompt: "Match each HTTP header to what it typically communicates.",
      left: ["Content-Type", "Authorization", "User-Agent", "Cache-Control"],
      right: ["The format of the data being sent, such as JSON", "Credentials proving who is making the request", "Information about the client software making the request", "Rules for how long a response may be cached"],
      correct_pairs: [
        ["Content-Type", "The format of the data being sent, such as JSON"],
        ["Authorization", "Credentials proving who is making the request"],
        ["User-Agent", "Information about the client software making the request"],
        ["Cache-Control", "Rules for how long a response may be cached"],
      ],
      hints: [
        "Content-Type describes the format, not who sent it.",
        "Authorization carries credentials; User-Agent identifies the client software.",
      ],
      solution_summary: "Content-Type describes the data format, Authorization carries credentials, User-Agent identifies the client, and Cache-Control governs caching rules.",
      key_concepts: ["HTTP headers", "Content-Type", "Authorization"],
    },
  ],
  cookies_sessions: [
    {
      id: "cookies_sessions_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a session cookie lets a user stay logged in, using the hotel key-card analogy.",
      shuffled_items: [
        "The hotel issues a room key after that check-in.",
        "A guest checks in and their identity is verified once.",
        "The guest uses the key to re-enter their room without re-verifying identity each time.",
        "The front desk trusts the key as a stand-in for a full identity check.",
      ],
      items: [
        "A guest checks in and their identity is verified once.",
        "The hotel issues a room key after that check-in.",
        "The front desk trusts the key as a stand-in for a full identity check.",
        "The guest uses the key to re-enter their room without re-verifying identity each time.",
      ],
      hints: [
        "Identity is verified before a key can be issued as its stand-in.",
        "Trusting the key is what makes repeated re-entry possible without a full identity check.",
      ],
      solution_summary: "Identity is verified once at check-in → a key is issued → the key is trusted as a stand-in for identity → the guest re-enters without re-verifying each time.",
      key_concepts: ["cookies", "sessions", "authentication"],
    },
    {
      id: "cookies_sessions_jv2",
      type: "choice",
      prompt: "What does a session cookie actually prove about a user, according to the hotel-key analogy?",
      options: [
        "It proves the user's identity in a deep, cryptographically verified sense every time",
        "It doesn't prove identity itself — it's trusted as a stand-in because it was issued after a real identity check",
        "It replaces the need for any login at all, ever",
        "It stores the user's full password in plain text",
      ],
      correct_index: 1,
      hints: [
        "The room key itself doesn't prove who someone is — the hotel trusts it because of when it was issued.",
        "A cookie is a trusted token, not a re-verification of identity each time.",
      ],
      solution_summary: "A session cookie doesn't itself prove identity — it's trusted as a stand-in because it was only issued after a real identity check already happened once.",
      key_concepts: ["cookies", "sessions"],
    },
    {
      id: "cookies_sessions_jv3",
      type: "match",
      prompt: "Match each cookie/session term to its meaning.",
      left: ["Cookie", "Session", "Session ID", "Login"],
      right: ["A small piece of data stored by the browser and sent with requests", "The server-side record of a logged-in user's ongoing state", "The unique value linking a cookie to its server-side session", "The event where identity is originally verified"],
      correct_pairs: [
        ["Cookie", "A small piece of data stored by the browser and sent with requests"],
        ["Session", "The server-side record of a logged-in user's ongoing state"],
        ["Session ID", "The unique value linking a cookie to its server-side session"],
        ["Login", "The event where identity is originally verified"],
      ],
      hints: [
        "A cookie lives in the browser; a session lives on the server.",
        "A session ID is the link connecting the two.",
      ],
      solution_summary: "A cookie is browser-stored data, a session is the server-side record it points to, the session ID links the two, and login is the original identity verification event.",
      key_concepts: ["cookies", "sessions", "session ID"],
    },
  ],
  auth_vs_authz: [
    {
      id: "auth_vs_authz_jv1",
      type: "order",
      prompt: "Put these steps in order to describe the two separate checks that happen when a user tries to access a restricted resource.",
      shuffled_items: [
        "The system checks authorization: does this verified user have permission for this specific resource?",
        "A user attempts to access a restricted resource.",
        "The system checks authentication: is this user genuinely who they claim to be?",
        "Access is granted only if both checks succeed.",
      ],
      items: [
        "A user attempts to access a restricted resource.",
        "The system checks authentication: is this user genuinely who they claim to be?",
        "The system checks authorization: does this verified user have permission for this specific resource?",
        "Access is granted only if both checks succeed.",
      ],
      hints: [
        "Identity must be confirmed before permissions for that identity can be checked.",
        "Both checks must pass before access is actually granted.",
      ],
      solution_summary: "A user attempts access → authentication confirms who they are → authorization checks what they're allowed to do → access is granted only if both succeed.",
      key_concepts: ["authentication", "authorization", "security"],
    },
    {
      id: "auth_vs_authz_jv2",
      type: "choice",
      prompt: "Based on the building-keycard analogy, what does authorization determine that authentication does not?",
      options: [
        "Whether the person is who they claim to be",
        "Which specific floors or resources the verified person is allowed to access",
        "Whether the building has a front desk at all",
        "The person's physical location in the building",
      ],
      correct_index: 1,
      hints: [
        "Showing your ID proves identity; the keycard's floor access is a separate question.",
        "Authorization is about permissions, checked after identity is already established.",
      ],
      solution_summary: "Authorization determines what a verified identity is allowed to access, distinct from authentication, which only confirms who someone is.",
      key_concepts: ["authentication", "authorization"],
    },
    {
      id: "auth_vs_authz_jv3",
      type: "match",
      prompt: "Match each security term to its meaning.",
      left: ["Authentication", "Authorization", "Credential", "Permission"],
      right: ["Verifying who a user genuinely is", "Determining what a verified user is allowed to do", "Evidence used to prove identity, such as a password", "A specific granted right to access something"],
      correct_pairs: [
        ["Authentication", "Verifying who a user genuinely is"],
        ["Authorization", "Determining what a verified user is allowed to do"],
        ["Credential", "Evidence used to prove identity, such as a password"],
        ["Permission", "A specific granted right to access something"],
      ],
      hints: [
        "Authentication answers 'who,' authorization answers 'what are they allowed to do.'",
        "A credential is used during authentication; a permission is checked during authorization.",
      ],
      solution_summary: "Authentication verifies identity, authorization determines allowed actions, a credential is identity evidence, and a permission is a specific granted access right.",
      key_concepts: ["authentication", "authorization", "credential"],
    },
  ],
  cors: [
    {
      id: "cors_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a browser enforces CORS for a cross-origin request.",
      shuffled_items: [
        "The browser checks the response for permission headers, such as Access-Control-Allow-Origin.",
        "JavaScript on one website attempts to request data from a different origin.",
        "If the target origin hasn't granted permission, the browser blocks the response from being used.",
        "If permission is granted, the browser allows the requesting script to use the response.",
      ],
      items: [
        "JavaScript on one website attempts to request data from a different origin.",
        "The browser checks the response for permission headers, such as Access-Control-Allow-Origin.",
        "If the target origin hasn't granted permission, the browser blocks the response from being used.",
        "If permission is granted, the browser allows the requesting script to use the response.",
      ],
      hints: [
        "The request must be attempted before the browser can check for permission headers.",
        "The permission check determines whether the response is blocked or allowed.",
      ],
      solution_summary: "A cross-origin request is attempted → the browser checks for permission headers → without permission, the response is blocked → with permission, the response is allowed to be used.",
      key_concepts: ["CORS", "cross-origin", "security"],
    },
    {
      id: "cors_jv2",
      type: "choice",
      prompt: "Based on the bank-teller analogy, what is the purpose of CORS?",
      options: [
        "To make cross-origin requests faster",
        "To ensure a website only releases sensitive data to origins it has explicitly authorized",
        "To prevent any website from ever making requests to another website",
        "To encrypt all data sent between browser and server",
      ],
      correct_index: 1,
      hints: [
        "The bank teller verifies the request is genuinely authorized before releasing anything sensitive.",
        "CORS is about controlling which origins are allowed, not blocking all cross-origin traffic outright.",
      ],
      solution_summary: "CORS ensures a server only releases data to origins it has explicitly authorized, the same caution a bank teller applies before releasing sensitive information.",
      key_concepts: ["CORS", "cross-origin", "security"],
    },
    {
      id: "cors_jv3",
      type: "match",
      prompt: "Match each CORS-related term to its meaning.",
      left: ["Origin", "Access-Control-Allow-Origin", "Cross-origin request", "Same-origin policy"],
      right: ["The combination of protocol, domain, and port a request comes from", "A response header specifying which origins are permitted", "A request made from one origin targeting a different origin", "The browser default of restricting requests to the same origin unless permitted"],
      correct_pairs: [
        ["Origin", "The combination of protocol, domain, and port a request comes from"],
        ["Access-Control-Allow-Origin", "A response header specifying which origins are permitted"],
        ["Cross-origin request", "A request made from one origin targeting a different origin"],
        ["Same-origin policy", "The browser default of restricting requests to the same origin unless permitted"],
      ],
      hints: [
        "An origin is defined by protocol, domain, and port together.",
        "CORS headers exist specifically to relax the same-origin policy when explicitly permitted.",
      ],
      solution_summary: "An origin is protocol+domain+port, Access-Control-Allow-Origin is the permission header, a cross-origin request targets a different origin, and the same-origin policy is the browser's default restriction.",
      key_concepts: ["CORS", "origin", "same-origin policy"],
    },
  ],
  caching_basics: [
    {
      id: "caching_basics_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how caching avoids repeating an expensive operation, using the milk-in-the-fridge analogy.",
      shuffled_items: [
        "A copy of the milk is kept close at hand, in the fridge.",
        "Fetching milk from the store is an expensive trip.",
        "A future request for milk is served from the fridge instead of another store trip.",
        "The fridge copy is refreshed only once it runs out or goes bad.",
      ],
      items: [
        "Fetching milk from the store is an expensive trip.",
        "A copy of the milk is kept close at hand, in the fridge.",
        "A future request for milk is served from the fridge instead of another store trip.",
        "The fridge copy is refreshed only once it runs out or goes bad.",
      ],
      hints: [
        "The expensive trip must happen before a copy can be kept close at hand.",
        "Refreshing the cached copy only happens once it's no longer valid.",
      ],
      solution_summary: "Fetching is expensive → a copy is cached close at hand → future requests are served from the cache → the cache is refreshed only once it's stale.",
      key_concepts: ["caching", "cache invalidation"],
    },
    {
      id: "caching_basics_jv2",
      type: "choice",
      prompt: "What is the primary goal of caching in software?",
      options: [
        "To permanently replace the original data source",
        "To avoid repeating an expensive fetch or computation by storing a fast, nearby copy of the result",
        "To make data harder for the application to access",
        "To guarantee data is always perfectly up to date, with no staleness ever possible",
      ],
      correct_index: 1,
      hints: [
        "The milk-in-the-fridge analogy: a nearby copy avoids repeated expensive store trips.",
        "Caching trades some risk of staleness for speed.",
      ],
      solution_summary: "Caching's primary goal is avoiding repeated expensive fetches or computations by storing a fast, nearby copy of the result.",
      key_concepts: ["caching", "performance"],
    },
    {
      id: "caching_basics_jv3",
      type: "match",
      prompt: "Match each caching term to its meaning.",
      left: ["Cache hit", "Cache miss", "Cache invalidation", "TTL (time to live)"],
      right: ["The requested data was found in the cache", "The requested data was not in the cache and had to be fetched fresh", "Removing or refreshing stale cached data", "How long a cached value is considered still valid"],
      correct_pairs: [
        ["Cache hit", "The requested data was found in the cache"],
        ["Cache miss", "The requested data was not in the cache and had to be fetched fresh"],
        ["Cache invalidation", "Removing or refreshing stale cached data"],
        ["TTL (time to live)", "How long a cached value is considered still valid"],
      ],
      hints: [
        "A hit avoids the expensive fetch; a miss requires it.",
        "TTL defines when a cached value should be treated as stale and invalidated.",
      ],
      solution_summary: "A cache hit finds data already cached, a cache miss requires a fresh fetch, cache invalidation clears stale data, and TTL defines how long a value stays valid.",
      key_concepts: ["caching", "cache hit", "cache miss", "TTL"],
    },
  ],
  concurrency_intro: [
    {
      id: "concurrency_intro_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a single chef manages multiple tasks concurrently.",
      shuffled_items: [
        "The chef checks the roasting vegetables and adjusts them.",
        "The chef starts a pot simmering and moves attention elsewhere.",
        "The chef stirs the bread dough while the pot continues simmering unattended.",
        "The chef rapidly switches attention between tasks that each keep independently progressing.",
      ],
      items: [
        "The chef starts a pot simmering and moves attention elsewhere.",
        "The chef stirs the bread dough while the pot continues simmering unattended.",
        "The chef checks the roasting vegetables and adjusts them.",
        "The chef rapidly switches attention between tasks that each keep independently progressing.",
      ],
      hints: [
        "The chef starts one task before moving attention to the next.",
        "The final step describes the overall pattern created by the earlier individual actions.",
      ],
      solution_summary: "The chef starts the pot simmering → attends to the dough while the pot continues unattended → checks the vegetables → the overall effect is rapidly switching attention between independently progressing tasks.",
      key_concepts: ["concurrency", "task switching"],
    },
    {
      id: "concurrency_intro_jv2",
      type: "choice",
      prompt: "Based on the single-chef analogy, what does concurrency actually mean in software?",
      options: [
        "Multiple tasks are physically executed at the exact same instant, always",
        "Tasks make independent progress by having attention switch rapidly between them, even with only one worker",
        "Only one task can ever exist in a concurrent system",
        "Concurrency requires multiple separate physical computers",
      ],
      correct_index: 1,
      hints: [
        "The chef can only physically do one thing at any instant, yet multiple dishes progress 'at once.'",
        "Concurrency is about managing multiple independently progressing tasks, not necessarily true simultaneous execution.",
      ],
      solution_summary: "Concurrency means multiple tasks make independent progress by rapidly switching attention between them, even with only one worker doing the switching — not necessarily true simultaneous execution.",
      key_concepts: ["concurrency", "task switching"],
    },
    {
      id: "concurrency_intro_jv3",
      type: "match",
      prompt: "Match each concurrency-related term to its meaning.",
      left: ["Concurrency", "Parallelism", "Task", "Context switch"],
      right: ["Multiple tasks making independent progress, possibly by switching attention", "Multiple tasks physically executing at the exact same instant on separate workers", "An independent unit of work being progressed", "The act of switching attention from one task to another"],
      correct_pairs: [
        ["Concurrency", "Multiple tasks making independent progress, possibly by switching attention"],
        ["Parallelism", "Multiple tasks physically executing at the exact same instant on separate workers"],
        ["Task", "An independent unit of work being progressed"],
        ["Context switch", "The act of switching attention from one task to another"],
      ],
      hints: [
        "Concurrency doesn't require true simultaneity; parallelism does.",
        "A context switch is the mechanism that makes single-worker concurrency possible.",
      ],
      solution_summary: "Concurrency is independent progress via switching attention, parallelism is true simultaneous execution, a task is an independent unit of work, and a context switch is the act of switching between tasks.",
      key_concepts: ["concurrency", "parallelism", "context switch"],
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
