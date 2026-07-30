// Master Anvil batch 2: microservices_vs_monolith, message_queues, common_vulnerabilities,
// encryption_basics, password_hashing, https_tls, least_privilege_principle,
// api_keys_secrets_management, profiling, premature_optimization.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "master");

const CONTENT = {
  microservices_vs_monolith: [
    {
      id: "microservices_vs_monolith_ms1",
      type: "order",
      prompt: "Put these steps in order to describe the architectural tradeoff between a monolith and microservices as a system grows.",
      shuffled_items: [
        "A system starts as one codebase deployed as a single program.",
        "The team wants to scale or update one specific piece independently of the rest.",
        "A monolithic architecture requires redeploying the entire program for any change.",
        "A microservices architecture instead splits the system into independently deployable pieces.",
      ],
      items: [
        "A system starts as one codebase deployed as a single program.",
        "The team wants to scale or update one specific piece independently of the rest.",
        "A monolithic architecture requires redeploying the entire program for any change.",
        "A microservices architecture instead splits the system into independently deployable pieces.",
      ],
      hints: [
        "The initial monolithic state comes before the desire to change just one piece.",
        "The monolith's limitation is described before microservices are presented as the alternative.",
      ],
      solution_summary: "A system starts as one monolithic codebase → the team wants to change just one piece independently → a monolith forces redeploying everything → microservices instead allow independent deployment of each piece.",
      key_concepts: ["monolith", "microservices"],
    },
    {
      id: "microservices_vs_monolith_ms2",
      type: "choice",
      prompt: "What best describes a monolithic architecture?",
      options: [
        "Dozens of small, independently deployable pieces talking over the network",
        "One codebase, one deployment, everything running together as a single program",
        "A system with no codebase at all",
        "A system that only runs on multiple physical servers"
      ],
      correct_index: 1,
      hints: [
        "The monolith is defined as a single unified program, unlike microservices' many small pieces.",
        "Deployment as one unit is the defining trait of a monolith.",
      ],
      solution_summary: "A monolithic architecture is one codebase, one deployment, with everything running together as a single program — in contrast to microservices' many independently deployable pieces.",
      key_concepts: ["monolith"],
    },
    {
      id: "microservices_vs_monolith_ms3",
      type: "match",
      prompt: "Match each architecture term to its meaning.",
      left: ["Monolith", "Microservice", "Independent deployment", "Network communication"],
      right: ["A single unified codebase and deployment", "One small, independently deployable service among many", "Updating one piece of a system without redeploying the rest", "How separate microservices talk to each other"],
      correct_pairs: [
        ["Monolith", "A single unified codebase and deployment"],
        ["Microservice", "One small, independently deployable service among many"],
        ["Independent deployment", "Updating one piece of a system without redeploying the rest"],
        ["Network communication", "How separate microservices talk to each other"],
      ],
      hints: [
        "Independent deployment is the key capability microservices provide that a monolith doesn't.",
        "Network communication is required specifically because microservices are separate processes.",
      ],
      solution_summary: "A monolith is a single unified codebase, a microservice is one independently deployable piece, independent deployment lets one piece update without redeploying everything, and network communication is how microservices talk to each other.",
      key_concepts: ["monolith", "microservices", "independent deployment"],
    },
  ],
  message_queues: [
    {
      id: "message_queues_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a message queue lets two parts of a system communicate asynchronously.",
      shuffled_items: [
        "One part of the system places a message on the queue.",
        "That part immediately moves on to other work without waiting.",
        "The receiving part processes the message from the queue whenever it's ready.",
        "Neither part had to wait around for the other to be ready right now.",
      ],
      items: [
        "One part of the system places a message on the queue.",
        "That part immediately moves on to other work without waiting.",
        "The receiving part processes the message from the queue whenever it's ready.",
        "Neither part had to wait around for the other to be ready right now.",
      ],
      hints: [
        "Placing the message must happen before the sender can move on.",
        "The final step describes the overall benefit gained from the earlier steps.",
      ],
      solution_summary: "A message is placed on the queue → the sender immediately moves on to other work → the receiver processes it whenever ready → neither part had to wait on the other.",
      key_concepts: ["message queue", "asynchronous communication"],
    },
    {
      id: "message_queues_ms2",
      type: "choice",
      prompt: "What is the core benefit a message queue provides, based on the 'I'll take it from here' framing?",
      options: [
        "It forces both parts of a system to process everything at the exact same instant",
        "It lets one part hand off work asynchronously without either side waiting on the other right now",
        "It permanently deletes messages after a fixed time regardless of processing",
        "It requires all communication to happen synchronously",
      ],
      correct_index: 1,
      hints: [
        "The phrase 'I'll take it from here' is about deferring work without blocking anyone.",
        "Asynchronous communication is the defining benefit described.",
      ],
      solution_summary: "A message queue lets one part hand off work to another asynchronously, without either side having to wait around for the other to be ready right now.",
      key_concepts: ["message queue", "asynchronous communication"],
    },
    {
      id: "message_queues_ms3",
      type: "match",
      prompt: "Match each message queue term to its meaning.",
      left: ["Message queue", "Producer", "Consumer", "Asynchronous communication"],
      right: ["A structure holding messages until they're processed", "The part of the system placing messages onto the queue", "The part of the system reading and processing messages", "Communication where sender and receiver don't have to act at the same time"],
      correct_pairs: [
        ["Message queue", "A structure holding messages until they're processed"],
        ["Producer", "The part of the system placing messages onto the queue"],
        ["Consumer", "The part of the system reading and processing messages"],
        ["Asynchronous communication", "Communication where sender and receiver don't have to act at the same time"],
      ],
      hints: [
        "A producer adds to the queue; a consumer takes from it.",
        "Asynchronous communication is the overall pattern the queue enables.",
      ],
      solution_summary: "A message queue holds messages, a producer places them, a consumer processes them, and asynchronous communication is the pattern where sender and receiver don't act at the same time.",
      key_concepts: ["message queue", "producer", "consumer"],
    },
  ],
  common_vulnerabilities: [
    {
      id: "common_vulnerabilities_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how SQL injection compromises a system through an unsanitized input field.",
      shuffled_items: [
        "A username field accepts raw user input.",
        "That input is inserted directly into a database query without sanitization.",
        "The attacker crafts input that changes the query's actual meaning.",
        "The database executes the attacker's altered query, potentially exposing or deleting data.",
      ],
      items: [
        "A username field accepts raw user input.",
        "That input is inserted directly into a database query without sanitization.",
        "The attacker crafts input that changes the query's actual meaning.",
        "The database executes the attacker's altered query, potentially exposing or deleting data.",
      ],
      hints: [
        "The lack of sanitization is what makes the field vulnerable in the first place.",
        "The attacker's crafted input happens before the database actually executes the altered query.",
      ],
      solution_summary: "A username field accepts raw input → the input is inserted directly into a query unsanitized → an attacker crafts input that changes the query's meaning → the database executes the altered query, exposing or deleting data.",
      key_concepts: ["SQL injection", "vulnerability", "sanitization"],
    },
    {
      id: "common_vulnerabilities_ms2",
      type: "choice",
      prompt: "What is the core mistake behind both SQL injection and XSS, according to the framing given?",
      options: [
        "Using too much encryption on user data",
        "Trusting user-provided input without properly sanitizing or escaping it before using it",
        "Storing data in a relational database instead of NoSQL",
        "Using HTTPS instead of HTTP",
      ],
      correct_index: 1,
      hints: [
        "Both are described as 'the exact same mistake wearing two different disguises.'",
        "The mistake is failing to safely separate user input from executable code or queries.",
      ],
      solution_summary: "Both SQL injection and XSS stem from trusting user-provided input without properly sanitizing or escaping it before it's used in a query or rendered as code.",
      key_concepts: ["SQL injection", "XSS", "sanitization"],
    },
    {
      id: "common_vulnerabilities_ms3",
      type: "match",
      prompt: "Match each vulnerability term to its meaning.",
      left: ["SQL injection", "XSS", "Sanitization", "Unsanitized input"],
      right: ["Attacker input alters a database query's meaning", "Attacker input gets executed as code in another user's browser", "Safely escaping or validating input before using it", "Raw user input used directly without safety checks"],
      correct_pairs: [
        ["SQL injection", "Attacker input alters a database query's meaning"],
        ["XSS", "Attacker input gets executed as code in another user's browser"],
        ["Sanitization", "Safely escaping or validating input before using it"],
        ["Unsanitized input", "Raw user input used directly without safety checks"],
      ],
      hints: [
        "SQL injection targets a database query; XSS targets what runs in a browser.",
        "Sanitization is the fix for the unsanitized-input problem.",
      ],
      solution_summary: "SQL injection alters a database query, XSS executes attacker code in a browser, sanitization safely escapes input, and unsanitized input is raw input used without safety checks.",
      key_concepts: ["SQL injection", "XSS", "sanitization"],
    },
  ],
  encryption_basics: [
    {
      id: "encryption_basics_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how asymmetric encryption solves the 'locked box anyone can drop a message into' problem.",
      shuffled_items: [
        "A public key is shared openly, letting anyone encrypt a message with it.",
        "A private key is kept secret by only one person.",
        "Anyone can drop an encrypted message into the 'locked box' using the public key.",
        "Only the holder of the private key can actually open and read the message.",
      ],
      items: [
        "A public key is shared openly, letting anyone encrypt a message with it.",
        "A private key is kept secret by only one person.",
        "Anyone can drop an encrypted message into the 'locked box' using the public key.",
        "Only the holder of the private key can actually open and read the message.",
      ],
      hints: [
        "Both keys must exist before either can be used to encrypt or decrypt.",
        "Decrypting the message is the final capability, reserved for the private key holder.",
      ],
      solution_summary: "A public key is shared openly → a private key is kept secret by one person → anyone can encrypt using the public key → only the private key holder can decrypt and read the message.",
      key_concepts: ["encryption", "asymmetric encryption", "public key", "private key"],
    },
    {
      id: "encryption_basics_ms2",
      type: "choice",
      prompt: "What is the fundamental difference between a public key and a private key in asymmetric encryption?",
      options: [
        "They are identical and interchangeable",
        "The public key can be shared openly for encrypting; the private key is kept secret for decrypting",
        "The public key is used only for decrypting; the private key is used only for encrypting",
        "Only the private key can ever be transmitted over a network",
      ],
      correct_index: 1,
      hints: [
        "The 'locked box anyone can drop a message into' is the public key; only one person holds the key to open it.",
        "Sharing openly versus keeping secret is the core distinction.",
      ],
      solution_summary: "The public key can be shared openly and used to encrypt messages; the private key is kept secret and used to decrypt them.",
      key_concepts: ["public key", "private key", "asymmetric encryption"],
    },
    {
      id: "encryption_basics_ms3",
      type: "match",
      prompt: "Match each encryption term to its meaning.",
      left: ["Encryption", "Public key", "Private key", "Asymmetric encryption"],
      right: ["Scrambling data using an algorithm and a key so it's unreadable without the key", "A key that can be shared openly to encrypt data", "A secret key kept by one person to decrypt data", "An encryption scheme using a public/private key pair rather than one shared secret"],
      correct_pairs: [
        ["Encryption", "Scrambling data using an algorithm and a key so it's unreadable without the key"],
        ["Public key", "A key that can be shared openly to encrypt data"],
        ["Private key", "A secret key kept by one person to decrypt data"],
        ["Asymmetric encryption", "An encryption scheme using a public/private key pair rather than one shared secret"],
      ],
      hints: [
        "Asymmetric encryption is the overall scheme; public and private keys are its two components.",
        "Encryption is the general concept both symmetric and asymmetric schemes rely on.",
      ],
      solution_summary: "Encryption scrambles data with an algorithm and key, a public key can be shared to encrypt, a private key is kept secret to decrypt, and asymmetric encryption is the scheme using both key types together.",
      key_concepts: ["encryption", "public key", "private key", "asymmetric encryption"],
    },
  ],
  password_hashing: [
    {
      id: "password_hashing_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a system verifies a password without ever storing it directly.",
      shuffled_items: [
        "A user creates a password during signup.",
        "The system runs the password through a one-way hash function and stores only the resulting hash.",
        "On login, the user enters their password again.",
        "The system hashes the entered password and compares it to the stored hash.",
      ],
      items: [
        "A user creates a password during signup.",
        "The system runs the password through a one-way hash function and stores only the resulting hash.",
        "On login, the user enters their password again.",
        "The system hashes the entered password and compares it to the stored hash.",
      ],
      hints: [
        "The password must be hashed and stored before any later login attempt can be compared against it.",
        "Comparing hashes happens only after the login attempt's password has itself been hashed.",
      ],
      solution_summary: "A user creates a password → the system hashes it and stores only the hash → on login, the user re-enters their password → the system hashes that entry and compares it to the stored hash.",
      key_concepts: ["password hashing", "one-way function"],
    },
    {
      id: "password_hashing_ms2",
      type: "choice",
      prompt: "Why is it a serious problem if a system can tell a user their own password back?",
      options: [
        "It means the system is using too much encryption",
        "It means the system stored the literal password instead of a one-way hash, which a properly built system never does",
        "It means the password is too short",
        "It means the system is using HTTPS incorrectly",
      ],
      correct_index: 1,
      hints: [
        "A hash is one-way — it can't be reversed to recover the original password.",
        "Being able to return the literal password proves the system stored it directly, not hashed.",
      ],
      solution_summary: "A system that can tell you your own password back has failed at storing it properly — a correctly built system stores only a one-way hash and never the literal password.",
      key_concepts: ["password hashing", "one-way function"],
    },
    {
      id: "password_hashing_ms3",
      type: "match",
      prompt: "Match each password hashing term to its meaning.",
      left: ["Hash", "One-way function", "Salt", "Hash comparison"],
      right: ["The fixed-length output of transforming a password through a hash function", "A function that can't practically be reversed to recover the original input", "Random data added before hashing to make identical passwords hash differently", "Checking a freshly hashed login attempt against the stored hash"],
      correct_pairs: [
        ["Hash", "The fixed-length output of transforming a password through a hash function"],
        ["One-way function", "A function that can't practically be reversed to recover the original input"],
        ["Salt", "Random data added before hashing to make identical passwords hash differently"],
        ["Hash comparison", "Checking a freshly hashed login attempt against the stored hash"],
      ],
      hints: [
        "A hash is the output; a one-way function is the property that makes it secure.",
        "Salt is added specifically to prevent identical passwords from producing identical hashes.",
      ],
      solution_summary: "A hash is the fixed-length transformed output, a one-way function can't be reversed, a salt makes identical passwords hash differently, and hash comparison is how login is verified without storing the raw password.",
      key_concepts: ["hash", "one-way function", "salt"],
    },
  ],
  https_tls: [
    {
      id: "https_tls_ms1",
      type: "order",
      prompt: "Put these steps in order to describe what happens when a browser establishes an HTTPS connection.",
      shuffled_items: [
        "A browser requests a page over HTTPS.",
        "TLS negotiates an encrypted connection between browser and server.",
        "Data traveling between browser and server is encrypted in transit.",
        "The padlock icon appears in the browser's address bar.",
      ],
      items: [
        "A browser requests a page over HTTPS.",
        "TLS negotiates an encrypted connection between browser and server.",
        "Data traveling between browser and server is encrypted in transit.",
        "The padlock icon appears in the browser's address bar.",
      ],
      hints: [
        "The TLS negotiation must complete before any data can actually be encrypted in transit.",
        "The padlock icon is the visible signal shown after the secure connection is established.",
      ],
      solution_summary: "A browser requests a page over HTTPS → TLS negotiates an encrypted connection → data traveling between browser and server is encrypted → the padlock icon appears signaling the secure connection.",
      key_concepts: ["HTTPS", "TLS", "encryption in transit"],
    },
    {
      id: "https_tls_ms2",
      type: "choice",
      prompt: "What is HTTPS, based on its relationship to HTTP and TLS?",
      options: [
        "A completely separate protocol unrelated to HTTP",
        "Ordinary HTTP layered on top of TLS, which encrypts data traveling between browser and server",
        "A replacement for TLS that removes the need for encryption",
        "A feature only available on certain browsers",
      ],
      correct_index: 1,
      hints: [
        "HTTPS is explicitly described as HTTP layered on top of TLS.",
        "TLS is what actually provides the encryption of the traffic.",
      ],
      solution_summary: "HTTPS is ordinary HTTP layered on top of TLS, which encrypts data traveling between a browser and a server so intercepted traffic can't be read.",
      key_concepts: ["HTTPS", "TLS"],
    },
    {
      id: "https_tls_ms3",
      type: "match",
      prompt: "Match each HTTPS/TLS term to its meaning.",
      left: ["HTTPS", "TLS", "Encryption in transit", "Padlock icon"],
      right: ["HTTP layered on top of an encrypting protocol", "The protocol that actually encrypts data between browser and server", "Protecting data specifically while it travels over the network", "The browser's visual signal that a connection is secured"],
      correct_pairs: [
        ["HTTPS", "HTTP layered on top of an encrypting protocol"],
        ["TLS", "The protocol that actually encrypts data between browser and server"],
        ["Encryption in transit", "Protecting data specifically while it travels over the network"],
        ["Padlock icon", "The browser's visual signal that a connection is secured"],
      ],
      hints: [
        "TLS is the mechanism; HTTPS is the combination of HTTP with that mechanism.",
        "Encryption in transit specifically concerns data while it's moving across the network.",
      ],
      solution_summary: "HTTPS is HTTP layered on TLS, TLS is the protocol doing the actual encrypting, encryption in transit protects data while it travels, and the padlock icon visually signals the secured connection.",
      key_concepts: ["HTTPS", "TLS", "encryption in transit"],
    },
  ],
  least_privilege_principle: [
    {
      id: "least_privilege_principle_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how least privilege prevents unnecessary access, using the master-key analogy.",
      shuffled_items: [
        "An employee only ever needs access to one specific room down the hall.",
        "Without least privilege, that employee might be handed a master key to every room.",
        "Least privilege instead grants access only to the one room genuinely needed.",
        "If that employee's credentials are ever compromised, the exposure is limited to just that one room.",
      ],
      items: [
        "An employee only ever needs access to one specific room down the hall.",
        "Without least privilege, that employee might be handed a master key to every room.",
        "Least privilege instead grants access only to the one room genuinely needed.",
        "If that employee's credentials are ever compromised, the exposure is limited to just that one room.",
      ],
      hints: [
        "The employee's actual need is established before contrasting it with excessive access.",
        "Limited exposure is the payoff that comes from granting only minimal necessary access.",
      ],
      solution_summary: "An employee needs access to just one room → without least privilege, they might get a master key to everything → least privilege grants only what's genuinely needed → a compromise is limited to just that one room.",
      key_concepts: ["least privilege", "access control"],
    },
    {
      id: "least_privilege_principle_ms2",
      type: "choice",
      prompt: "What does the principle of least privilege state?",
      options: [
        "Every user should be granted full administrative access by default",
        "A user, process, or component should be granted only the minimum access genuinely necessary for its specific task",
        "Access should never be granted to anyone under any circumstances",
        "Only system administrators should ever need any access at all",
      ],
      correct_index: 1,
      hints: [
        "The master-key analogy warns against overprovisioning access beyond what's actually needed.",
        "Minimum necessary access is the core of the principle.",
      ],
      solution_summary: "The principle of least privilege states that any user, process, or component should be granted only the minimum access genuinely necessary to do its specific job.",
      key_concepts: ["least privilege"],
    },
    {
      id: "least_privilege_principle_ms3",
      type: "match",
      prompt: "Match each least-privilege term to its meaning.",
      left: ["Least privilege", "Overprovisioned access", "Minimum necessary access", "Blast radius"],
      right: ["Granting only the minimum access genuinely needed", "Access far exceeding what a task actually requires", "The precise scope of access required to do a specific job", "The extent of damage possible if credentials are compromised"],
      correct_pairs: [
        ["Least privilege", "Granting only the minimum access genuinely needed"],
        ["Overprovisioned access", "Access far exceeding what a task actually requires"],
        ["Minimum necessary access", "The precise scope of access required to do a specific job"],
        ["Blast radius", "The extent of damage possible if credentials are compromised"],
      ],
      hints: [
        "Overprovisioned access is exactly what least privilege aims to prevent.",
        "Blast radius shrinks when access is limited to only what's minimally necessary.",
      ],
      solution_summary: "Least privilege grants only minimum necessary access, overprovisioned access exceeds what's needed, minimum necessary access is the precise required scope, and blast radius is the potential damage if credentials are compromised.",
      key_concepts: ["least privilege", "blast radius"],
    },
  ],
  api_keys_secrets_management: [
    {
      id: "api_keys_secrets_management_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a leaked secret can unravel a system's security, based on the framing given.",
      shuffled_items: [
        "An API key is accidentally committed to a public repository.",
        "The key had previously been kept out of source code via environment variables.",
        "An attacker discovers the leaked key in the public repository's history.",
        "The attacker uses the key to access whatever it was trusted to authorize.",
      ],
      items: [
        "The key had previously been kept out of source code via environment variables.",
        "An API key is accidentally committed to a public repository.",
        "An attacker discovers the leaked key in the public repository's history.",
        "The attacker uses the key to access whatever it was trusted to authorize.",
      ],
      hints: [
        "The good practice (environment variables) is described before the accidental leak that undoes it.",
        "Discovery must happen before the attacker can actually use the leaked key.",
      ],
      solution_summary: "A key is normally kept out of source code via environment variables → it's accidentally committed to a public repository anyway → an attacker discovers it → the attacker uses it to access whatever it authorized.",
      key_concepts: ["API key", "secrets management", "leaked credentials"],
    },
    {
      id: "api_keys_secrets_management_ms2",
      type: "choice",
      prompt: "According to the framing given, how do a genuinely large share of real security breaches actually begin?",
      options: [
        "Through an elaborate, highly sophisticated novel attack technique",
        "Through a single leaked string of characters, such as an API key accidentally committed to a public repository",
        "Through a hardware failure in a data center",
        "Through a slow, gradual memory leak"
      ],
      correct_index: 1,
      hints: [
        "The text explicitly contrasts this with 'some elaborate novel attack.'",
        "A simple accidental leak of credentials is described as the common real-world cause.",
      ],
      solution_summary: "A genuinely large share of real security breaches begin with something as simple as a single leaked API key or secret, not an elaborate novel attack technique.",
      key_concepts: ["API key", "secrets management"],
    },
    {
      id: "api_keys_secrets_management_ms3",
      type: "match",
      prompt: "Match each secrets management term to its meaning.",
      left: ["API key", "Secrets manager", "Leaked credential", "Key rotation"],
      right: ["A credential authorizing access to an API", "A dedicated system for securely storing and retrieving secrets", "A credential exposed to unauthorized parties, often by accident", "Periodically replacing a credential to limit exposure if it leaks"],
      correct_pairs: [
        ["API key", "A credential authorizing access to an API"],
        ["Secrets manager", "A dedicated system for securely storing and retrieving secrets"],
        ["Leaked credential", "A credential exposed to unauthorized parties, often by accident"],
        ["Key rotation", "Periodically replacing a credential to limit exposure if it leaks"],
      ],
      hints: [
        "A secrets manager is a dedicated tool, beyond just environment variables.",
        "Key rotation limits how long a leaked credential stays useful to an attacker.",
      ],
      solution_summary: "An API key authorizes API access, a secrets manager securely stores secrets, a leaked credential is exposed accidentally, and key rotation periodically replaces credentials to limit leak exposure.",
      key_concepts: ["API key", "secrets manager", "key rotation"],
    },
  ],
  profiling: [
    {
      id: "profiling_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how profiling reveals the true source of a performance problem.",
      shuffled_items: [
        "A developer assumes a nested loop is the program's slowest part, based on intuition.",
        "The developer runs a profiler to measure where the program actually spends its time.",
        "The profiler reveals an unremarkable database query is actually consuming ninety percent of runtime.",
        "The developer optimizes the database query instead of the loop.",
      ],
      items: [
        "A developer assumes a nested loop is the program's slowest part, based on intuition.",
        "The developer runs a profiler to measure where the program actually spends its time.",
        "The profiler reveals an unremarkable database query is actually consuming ninety percent of runtime.",
        "The developer optimizes the database query instead of the loop.",
      ],
      hints: [
        "The intuitive assumption comes before the measurement that contradicts it.",
        "Optimizing the actual bottleneck happens only after profiling reveals where it really is.",
      ],
      solution_summary: "A developer assumes the nested loop is slow based on intuition → they profile the program to measure actual runtime → the profiler reveals a query is the real bottleneck → they optimize the query instead of the loop.",
      key_concepts: ["profiling", "performance bottleneck"],
    },
    {
      id: "profiling_ms2",
      type: "choice",
      prompt: "Why does profiling exist, according to the reasoning given?",
      options: [
        "Because intuition about where a program spends its time is almost always correct",
        "Because intuition gets performance bottlenecks wrong far more often than experienced engineers like to admit",
        "Because profiling replaces the need for writing any code at all",
        "Because profiling is only useful for database queries",
      ],
      correct_index: 1,
      hints: [
        "The nested-loop-versus-database-query example illustrates intuition being wrong.",
        "Profiling exists specifically to correct for unreliable intuition with real measurement.",
      ],
      solution_summary: "Profiling exists because intuition about where a program spends its time gets it wrong far more often than experienced engineers like to admit, so real measurement is needed instead.",
      key_concepts: ["profiling"],
    },
    {
      id: "profiling_ms3",
      type: "match",
      prompt: "Match each profiling term to its meaning.",
      left: ["Profiling", "Performance bottleneck", "Runtime measurement", "Intuition"],
      right: ["Directly measuring where a running program spends its time", "The specific part of a program actually limiting overall speed", "Concrete, precise data about how a program behaves while running", "A guess about performance that profiling often contradicts"],
      correct_pairs: [
        ["Profiling", "Directly measuring where a running program spends its time"],
        ["Performance bottleneck", "The specific part of a program actually limiting overall speed"],
        ["Runtime measurement", "Concrete, precise data about how a program behaves while running"],
        ["Intuition", "A guess about performance that profiling often contradicts"],
      ],
      hints: [
        "A performance bottleneck is what profiling is specifically trying to find.",
        "Intuition is the unreliable guess that profiling's runtime measurement corrects for.",
      ],
      solution_summary: "Profiling directly measures where a program spends its time, a performance bottleneck is what's actually limiting speed, runtime measurement is the concrete data gathered, and intuition is the guess profiling often proves wrong.",
      key_concepts: ["profiling", "performance bottleneck"],
    },
  ],
  premature_optimization: [
    {
      id: "premature_optimization_ms1",
      type: "order",
      prompt: "Put these steps in order to describe why Knuth's warning against premature optimization applies, using the profiling connection.",
      shuffled_items: [
        "A developer wants to make a piece of code run faster.",
        "Without measurement, they guess which part is actually slow and spend significant effort optimizing it.",
        "Profiling would have revealed the real bottleneck was somewhere else entirely.",
        "The effort spent on the wrong part was wasted, and the real bottleneck remains unaddressed.",
      ],
      items: [
        "A developer wants to make a piece of code run faster.",
        "Without measurement, they guess which part is actually slow and spend significant effort optimizing it.",
        "Profiling would have revealed the real bottleneck was somewhere else entirely.",
        "The effort spent on the wrong part was wasted, and the real bottleneck remains unaddressed.",
      ],
      hints: [
        "Guessing without measurement happens before the missed opportunity to profile is revealed.",
        "The wasted effort is the consequence described last, after the guess turns out wrong.",
      ],
      solution_summary: "A developer wants faster code → they guess and optimize without measuring → profiling would have shown the real bottleneck elsewhere → the effort was wasted and the actual bottleneck remains unaddressed.",
      key_concepts: ["premature optimization", "profiling", "Donald Knuth"],
    },
    {
      id: "premature_optimization_ms2",
      type: "choice",
      prompt: "What does Knuth's maxim 'premature optimization is the root of all evil' actually warn against?",
      options: [
        "Ever optimizing code under any circumstances",
        "Spending significant effort optimizing code before measurement confirms it's actually a genuine bottleneck",
        "Using a profiler at any point in development",
        "Writing readable code instead of fast code"
      ],
      correct_index: 1,
      hints: [
        "The warning is specifically about optimizing before knowing, through profiling, that a part is actually a bottleneck.",
        "It's not against optimization itself, but against doing it without measurement first.",
      ],
      solution_summary: "Knuth's maxim warns against spending significant effort optimizing code before measurement (profiling) confirms that part is actually a genuine performance bottleneck.",
      key_concepts: ["premature optimization", "Donald Knuth"],
    },
    {
      id: "premature_optimization_ms3",
      type: "match",
      prompt: "Match each premature-optimization term to its meaning.",
      left: ["Premature optimization", "Donald Knuth", "Measurement-first approach", "Wasted effort"],
      right: ["Optimizing code before confirming it's a real bottleneck through measurement", "The computer scientist who coined the famous warning about this", "Profiling before optimizing to confirm where effort is actually needed", "Time spent improving a part of the code that wasn't actually slow"],
      correct_pairs: [
        ["Premature optimization", "Optimizing code before confirming it's a real bottleneck through measurement"],
        ["Donald Knuth", "The computer scientist who coined the famous warning about this"],
        ["Measurement-first approach", "Profiling before optimizing to confirm where effort is actually needed"],
        ["Wasted effort", "Time spent improving a part of the code that wasn't actually slow"],
      ],
      hints: [
        "The measurement-first approach is the direct fix for premature optimization.",
        "Wasted effort is the negative outcome premature optimization risks producing.",
      ],
      solution_summary: "Premature optimization is optimizing before confirming a real bottleneck, Donald Knuth coined the famous warning, a measurement-first approach profiles before optimizing, and wasted effort is time spent on a part that wasn't actually slow.",
      key_concepts: ["premature optimization", "profiling"],
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
