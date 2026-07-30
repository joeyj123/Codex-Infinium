// Master Anvil batch 1 (first authoring pass for Master tier): what_is_a_design_pattern,
// singleton_pattern, factory_pattern, observer_pattern, mvvm_and_other_variants, anti_patterns,
// scalability_basics, load_balancing, caching_at_scale, cdns.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "master");

const CONTENT = {
  what_is_a_design_pattern: [
    {
      id: "what_is_a_design_pattern_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a design pattern communicates a solution instantly between experienced engineers.",
      shuffled_items: [
        "Many engineers independently encounter the same recurring design problem.",
        "One engineer says 'just use a singleton here' to another.",
        "The named pattern is agreed upon and given a shared name across the field.",
        "The whole structural idea lands instantly, with no further explanation needed.",
      ],
      items: [
        "Many engineers independently encounter the same recurring design problem.",
        "The named pattern is agreed upon and given a shared name across the field.",
        "One engineer says 'just use a singleton here' to another.",
        "The whole structural idea lands instantly, with no further explanation needed.",
      ],
      hints: [
        "A name must exist before it can be casually used in conversation.",
        "The instant understanding is the payoff, coming after the name is already shared knowledge.",
      ],
      solution_summary: "A recurring problem is encountered by many engineers → it gets a shared, agreed-upon name → the name gets used in conversation → the whole idea lands instantly without further explanation.",
      key_concepts: ["design pattern", "shared vocabulary"],
    },
    {
      id: "what_is_a_design_pattern_ms2",
      type: "choice",
      prompt: "What is a design pattern, most accurately?",
      options: [
        "Finished code meant to be copied and pasted directly into a project",
        "A named, proven, reusable template or approach to a commonly recurring design problem",
        "A strict rule enforced by a compiler",
        "A specific programming language feature",
      ],
      correct_index: 1,
      hints: [
        "The text explicitly says it's not finished code to copy-paste.",
        "It's a general approach, not a language feature or compiler rule.",
      ],
      solution_summary: "A design pattern is a named, proven, reusable template or general approach to a recurring design problem — not literal code to copy and paste.",
      key_concepts: ["design pattern"],
    },
    {
      id: "what_is_a_design_pattern_ms3",
      type: "match",
      prompt: "Match each design pattern concept to its description.",
      left: ["Design pattern", "Template", "Recurring problem", "Shared vocabulary"],
      right: ["A named, reusable solution approach to a common design problem", "A general structure to be adapted, not exact code", "A design challenge many engineers independently encounter", "Common terminology that lets engineers communicate ideas instantly"],
      correct_pairs: [
        ["Design pattern", "A named, reusable solution approach to a common design problem"],
        ["Template", "A general structure to be adapted, not exact code"],
        ["Recurring problem", "A design challenge many engineers independently encounter"],
        ["Shared vocabulary", "Common terminology that lets engineers communicate ideas instantly"],
      ],
      hints: [
        "A template is adapted per situation, unlike literal reusable code.",
        "Shared vocabulary is what makes naming a pattern actually useful.",
      ],
      solution_summary: "A design pattern is a reusable solution approach, a template is a general structure to adapt, a recurring problem is what patterns address, and shared vocabulary is what makes naming them useful.",
      key_concepts: ["design pattern", "template"],
    },
  ],
  singleton_pattern: [
    {
      id: "singleton_pattern_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how the singleton pattern prevents configuration objects from drifting out of sync.",
      shuffled_items: [
        "Without a singleton, different parts of a program each create their own configuration object.",
        "Those separate copies can drift out of sync as one gets updated but not the other.",
        "The singleton pattern instead guarantees exactly one shared instance exists.",
        "Every part of the program accesses that same single instance through one defined access point.",
      ],
      items: [
        "Without a singleton, different parts of a program each create their own configuration object.",
        "Those separate copies can drift out of sync as one gets updated but not the other.",
        "The singleton pattern instead guarantees exactly one shared instance exists.",
        "Every part of the program accesses that same single instance through one defined access point.",
      ],
      hints: [
        "The drift problem is described before the singleton's fix for it.",
        "Guaranteeing one instance comes before describing how it's accessed everywhere.",
      ],
      solution_summary: "Separate copies drift out of sync without a singleton → the singleton pattern guarantees one shared instance → every part of the program accesses that same instance through one access point.",
      key_concepts: ["singleton pattern", "shared state"],
    },
    {
      id: "singleton_pattern_ms2",
      type: "choice",
      prompt: "What core guarantee does the singleton pattern provide?",
      options: [
        "A class can have unlimited instances, all synced automatically",
        "A class has exactly one instance for the program's lifetime, with one well-defined access point",
        "Every function must become a class method",
        "Objects are automatically deleted after use",
      ],
      correct_index: 1,
      hints: [
        "The name 'singleton' itself hints at the guarantee: exactly one.",
        "A single, well-defined access point is what every part of the program uses.",
      ],
      solution_summary: "The singleton pattern guarantees a class has exactly one instance for the program's entire lifetime, accessed through a single well-defined access point.",
      key_concepts: ["singleton pattern"],
    },
    {
      id: "singleton_pattern_ms3",
      type: "match",
      prompt: "Match each singleton-related term to its meaning.",
      left: ["Singleton", "Single instance", "Access point", "Configuration drift"],
      right: ["A pattern guaranteeing exactly one shared object", "The one object every part of the program shares", "The defined way all code reaches the shared instance", "The failure mode of separate copies falling out of sync"],
      correct_pairs: [
        ["Singleton", "A pattern guaranteeing exactly one shared object"],
        ["Single instance", "The one object every part of the program shares"],
        ["Access point", "The defined way all code reaches the shared instance"],
        ["Configuration drift", "The failure mode of separate copies falling out of sync"],
      ],
      hints: [
        "The access point is how code reaches the single instance, not the instance itself.",
        "Configuration drift is exactly the problem the singleton pattern prevents.",
      ],
      solution_summary: "A singleton guarantees one shared object, the single instance is that shared object, the access point is how code reaches it, and configuration drift is the failure mode it prevents.",
      key_concepts: ["singleton pattern", "configuration drift"],
    },
  ],
  factory_pattern: [
    {
      id: "factory_pattern_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how the factory pattern collapses duplicated construction logic.",
      shuffled_items: [
        "Logic deciding which specific class to construct is copy-pasted into a dozen places.",
        "As the underlying rules change, each copy slowly drifts out of sync.",
        "The factory pattern centralizes that construction logic into one dedicated function or class.",
        "Every part of the codebase calls the factory instead of duplicating the decision logic.",
      ],
      items: [
        "Logic deciding which specific class to construct is copy-pasted into a dozen places.",
        "As the underlying rules change, each copy slowly drifts out of sync.",
        "The factory pattern centralizes that construction logic into one dedicated function or class.",
        "Every part of the codebase calls the factory instead of duplicating the decision logic.",
      ],
      hints: [
        "The duplication problem is described before the factory pattern's fix.",
        "Centralizing the logic happens before other code is updated to call the factory.",
      ],
      solution_summary: "Construction logic is duplicated across the codebase → the copies drift out of sync as rules change → the factory pattern centralizes that logic in one place → the rest of the codebase calls the factory instead of duplicating it.",
      key_concepts: ["factory pattern", "object creation"],
    },
    {
      id: "factory_pattern_ms2",
      type: "choice",
      prompt: "What problem does the factory pattern primarily solve?",
      options: [
        "Duplicated object-construction logic scattered across many places in a codebase",
        "Slow database queries",
        "Race conditions between multiple threads",
        "Missing error handling in a function",
      ],
      correct_index: 0,
      hints: [
        "The example describes 'which specific class do I actually need to construct' logic copy-pasted repeatedly.",
        "Centralizing object creation is the factory pattern's defining trait.",
      ],
      solution_summary: "The factory pattern solves duplicated object-construction logic scattered across a codebase by centralizing it into one dedicated function or class.",
      key_concepts: ["factory pattern"],
    },
    {
      id: "factory_pattern_ms3",
      type: "match",
      prompt: "Match each factory pattern term to its meaning.",
      left: ["Factory", "Centralized creation logic", "Duplication", "Construction rule"],
      right: ["A dedicated function or class responsible for object creation", "All construction decisions living in one place instead of many", "The problem of the same logic copy-pasted repeatedly", "The specific criteria determining which class to instantiate"],
      correct_pairs: [
        ["Factory", "A dedicated function or class responsible for object creation"],
        ["Centralized creation logic", "All construction decisions living in one place instead of many"],
        ["Duplication", "The problem of the same logic copy-pasted repeatedly"],
        ["Construction rule", "The specific criteria determining which class to instantiate"],
      ],
      hints: [
        "The factory is the concrete implementation of centralized creation logic.",
        "Duplication is the original problem; a construction rule is the specific logic being duplicated.",
      ],
      solution_summary: "A factory is a dedicated creation function/class, centralized creation logic means one place for all decisions, duplication is the original scattered-logic problem, and a construction rule is the specific criteria for choosing a class.",
      key_concepts: ["factory pattern", "centralized logic"],
    },
  ],
  observer_pattern: [
    {
      id: "observer_pattern_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how the observer pattern lets a single event trigger multiple independent reactions.",
      shuffled_items: [
        "A button is clicked, acting as the subject triggering the event.",
        "Several unrelated observers are registered to that subject beforehand.",
        "The subject automatically notifies each registered observer.",
        "A counter updates, a menu closes, and a form submits, without knowing about each other.",
      ],
      items: [
        "Several unrelated observers are registered to that subject beforehand.",
        "A button is clicked, acting as the subject triggering the event.",
        "The subject automatically notifies each registered observer.",
        "A counter updates, a menu closes, and a form submits, without knowing about each other.",
      ],
      hints: [
        "Observers must be registered before the subject can notify them.",
        "The independent reactions happen only after the subject sends its notification.",
      ],
      solution_summary: "Observers are registered ahead of time → the subject (button) is clicked → the subject automatically notifies each observer → independent reactions happen without the observers knowing about each other.",
      key_concepts: ["observer pattern", "subject", "observers"],
    },
    {
      id: "observer_pattern_ms2",
      type: "choice",
      prompt: "In the observer pattern, what is the role of the 'subject'?",
      options: [
        "It passively waits to be queried by observers",
        "It automatically notifies a list of registered observers whenever a relevant event occurs",
        "It directly modifies each observer's internal code",
        "It replaces the need for observers entirely",
      ],
      correct_index: 1,
      hints: [
        "The subject is the one doing the notifying, not the one being queried.",
        "Notification happens automatically whenever the relevant event occurs.",
      ],
      solution_summary: "The subject automatically notifies a list of registered observers whenever a relevant event occurs, without those observers needing to know about each other.",
      key_concepts: ["observer pattern", "subject"],
    },
    {
      id: "observer_pattern_ms3",
      type: "match",
      prompt: "Match each observer pattern term to its role.",
      left: ["Subject", "Observer", "Notification", "Registration"],
      right: ["The object that triggers and announces an event", "An object that reacts to an event without knowing who else reacts", "The signal sent from subject to observers when an event occurs", "The step where an observer is added to the subject's notification list"],
      correct_pairs: [
        ["Subject", "The object that triggers and announces an event"],
        ["Observer", "An object that reacts to an event without knowing who else reacts"],
        ["Notification", "The signal sent from subject to observers when an event occurs"],
        ["Registration", "The step where an observer is added to the subject's notification list"],
      ],
      hints: [
        "Registration must happen before notification can reach a given observer.",
        "Observers react independently, without knowledge of other observers.",
      ],
      solution_summary: "The subject triggers events, an observer reacts independently, notification is the signal sent to observers, and registration is how an observer joins the subject's notification list.",
      key_concepts: ["observer pattern", "notification", "registration"],
    },
  ],
  mvvm_and_other_variants: [
    {
      id: "mvvm_and_other_variants_ms1",
      type: "order",
      prompt: "Put these steps in order to describe why MVVM emerged for interfaces that need automatic, immediate updates.",
      shuffled_items: [
        "MVC works well for a form submitted to a server with a fresh page loaded back.",
        "A modern interface needs a counter to visibly update the instant a value changes.",
        "MVC alone doesn't provide that automatic, no-reload update mechanism.",
        "MVVM introduces a ViewModel that automatically keeps the View in sync with the Model.",
      ],
      items: [
        "MVC works well for a form submitted to a server with a fresh page loaded back.",
        "A modern interface needs a counter to visibly update the instant a value changes.",
        "MVC alone doesn't provide that automatic, no-reload update mechanism.",
        "MVVM introduces a ViewModel that automatically keeps the View in sync with the Model.",
      ],
      hints: [
        "MVC's original fit is described before the new requirement it doesn't satisfy.",
        "MVVM's ViewModel is introduced as the specific answer to that unmet requirement.",
      ],
      solution_summary: "MVC suits page-reload-style forms → a modern interface needs instant no-reload updates → MVC alone can't automatically provide that → MVVM's ViewModel fills that gap by syncing the View automatically.",
      key_concepts: ["MVVM", "ViewModel", "MVC variants"],
    },
    {
      id: "mvvm_and_other_variants_ms2",
      type: "choice",
      prompt: "What specific gap does MVVM's ViewModel fill, compared to plain MVC?",
      options: [
        "It replaces the need for any data storage at all",
        "It automatically keeps the View synchronized with changes to the Model, without manual reloads",
        "It removes the need for a Model entirely",
        "It requires every interface to submit a full page reload"
      ],
      correct_index: 1,
      hints: [
        "The counter-updating-instantly example is exactly what MVVM's ViewModel enables.",
        "MVC's traditional flow relies on a full page reload; MVVM avoids that.",
      ],
      solution_summary: "MVVM's ViewModel automatically keeps the View synchronized with changes to the Model, enabling instant updates without a full page reload, unlike plain MVC.",
      key_concepts: ["MVVM", "ViewModel"],
    },
    {
      id: "mvvm_and_other_variants_ms3",
      type: "match",
      prompt: "Match each MVVM component to its role.",
      left: ["Model", "View", "ViewModel", "Data binding"],
      right: ["Holds the underlying data and business rules", "Displays the current state to the user", "Keeps the View automatically synced with the Model", "The mechanism connecting View and ViewModel automatically"],
      correct_pairs: [
        ["Model", "Holds the underlying data and business rules"],
        ["View", "Displays the current state to the user"],
        ["ViewModel", "Keeps the View automatically synced with the Model"],
        ["Data binding", "The mechanism connecting View and ViewModel automatically"],
      ],
      hints: [
        "The ViewModel is the new piece MVVM adds beyond plain MVC's Model and View.",
        "Data binding is the technical mechanism enabling automatic synchronization.",
      ],
      solution_summary: "The Model holds data, the View displays state, the ViewModel keeps the View synced automatically, and data binding is the mechanism that connects View and ViewModel.",
      key_concepts: ["MVVM", "data binding"],
    },
  ],
  anti_patterns: [
    {
      id: "anti_patterns_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a class becomes an anti-pattern example, using the 'god class' scenario.",
      shuffled_items: [
        "A class starts out small and reasonable.",
        "The class quietly absorbs 'just one more responsibility' repeatedly.",
        "Eventually nobody can safely touch the class without breaking something.",
        "The pattern is recognized and named so engineers can catch it earlier next time.",
      ],
      items: [
        "A class starts out small and reasonable.",
        "The class quietly absorbs 'just one more responsibility' repeatedly.",
        "Eventually nobody can safely touch the class without breaking something.",
        "The pattern is recognized and named so engineers can catch it earlier next time.",
      ],
      hints: [
        "The class must start reasonable before it can gradually calcify.",
        "Naming the anti-pattern comes after the failure mode has been widely observed.",
      ],
      solution_summary: "A class starts small and reasonable → it quietly absorbs more and more responsibility → eventually nobody can safely touch it → the pattern gets recognized and named to help catch it earlier.",
      key_concepts: ["anti-pattern", "god class"],
    },
    {
      id: "anti_patterns_ms2",
      type: "choice",
      prompt: "What defines an anti-pattern?",
      options: [
        "A solution that looks unreasonable from the start and is never used",
        "A commonly repeated approach that looks reasonable on the surface but reliably causes real problems in practice",
        "A design pattern that has been deprecated by a specific programming language",
        "Any code that fails to compile"
      ],
      correct_index: 1,
      hints: [
        "It looks reasonable at first — that's exactly why it's tempting and repeatedly falls into.",
        "The key is that it's recognized and named because so many engineers hit the same trap.",
      ],
      solution_summary: "An anti-pattern is a commonly repeated approach that looks reasonable on the surface but reliably causes real problems in practice, named because it's a widely recognized trap.",
      key_concepts: ["anti-pattern"],
    },
    {
      id: "anti_patterns_ms3",
      type: "match",
      prompt: "Match each anti-pattern-related term to its meaning.",
      left: ["Anti-pattern", "God class", "Recognizing a trap", "Reasonable surface"],
      right: ["A commonly repeated approach that reliably causes real problems", "A class that has absorbed far too many responsibilities", "Naming a repeated failure mode so it can be caught earlier", "Why an anti-pattern is tempting to fall into in the first place"],
      correct_pairs: [
        ["Anti-pattern", "A commonly repeated approach that reliably causes real problems"],
        ["God class", "A class that has absorbed far too many responsibilities"],
        ["Recognizing a trap", "Naming a repeated failure mode so it can be caught earlier"],
        ["Reasonable surface", "Why an anti-pattern is tempting to fall into in the first place"],
      ],
      hints: [
        "A god class is a specific, named example of an anti-pattern.",
        "The 'reasonable surface' is what makes an anti-pattern easy to fall into unknowingly.",
      ],
      solution_summary: "An anti-pattern reliably causes real problems despite looking reasonable, a god class is one specific example of overloaded responsibility, recognizing a trap means naming it to catch it earlier, and its reasonable surface is why it's tempting.",
      key_concepts: ["anti-pattern", "god class"],
    },
  ],
  scalability_basics: [
    {
      id: "scalability_basics_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a system responds to growing demand without scalability planning versus with it.",
      shuffled_items: [
        "A server comfortably handles a hundred users.",
        "User count grows to a hundred thousand.",
        "Without scalability planning, the server buckles under the new load.",
        "With scalability planning, the system scales (vertically or horizontally) to absorb the growth.",
      ],
      items: [
        "A server comfortably handles a hundred users.",
        "User count grows to a hundred thousand.",
        "Without scalability planning, the server buckles under the new load.",
        "With scalability planning, the system scales (vertically or horizontally) to absorb the growth.",
      ],
      hints: [
        "The initial comfortable state comes before the growth in demand.",
        "The two final steps are alternative outcomes depending on whether scalability was planned for.",
      ],
      solution_summary: "A server handles a hundred users comfortably → demand grows to a hundred thousand → without planning it buckles → with scalability planning, it scales to absorb the growth instead.",
      key_concepts: ["scalability", "vertical scaling", "horizontal scaling"],
    },
    {
      id: "scalability_basics_ms2",
      type: "choice",
      prompt: "What does vertical scaling mean?",
      options: [
        "Adding more server machines running in parallel",
        "Making a single machine more powerful, such as adding more CPU or RAM",
        "Reducing the number of users allowed to access a system",
        "Splitting an application into smaller independent services",
      ],
      correct_index: 1,
      hints: [
        "Vertical scaling is about making one machine bigger, not adding more machines.",
        "Adding CPU or RAM to an existing machine is the defining example.",
      ],
      solution_summary: "Vertical scaling means making a single machine more powerful — adding more CPU, RAM, or other resources to that one machine.",
      key_concepts: ["vertical scaling", "scalability"],
    },
    {
      id: "scalability_basics_ms3",
      type: "match",
      prompt: "Match each scalability term to its meaning.",
      left: ["Scalability", "Vertical scaling", "Horizontal scaling", "Load"],
      right: ["A system's ability to handle growing work without failing or slowing unacceptably", "Making a single machine more powerful", "Adding more machine instances to share the work", "The amount of demand — users, requests, data — placed on a system"],
      correct_pairs: [
        ["Scalability", "A system's ability to handle growing work without failing or slowing unacceptably"],
        ["Vertical scaling", "Making a single machine more powerful"],
        ["Horizontal scaling", "Adding more machine instances to share the work"],
        ["Load", "The amount of demand — users, requests, data — placed on a system"],
      ],
      hints: [
        "Vertical scaling grows one machine; horizontal scaling grows the number of machines.",
        "Load is the growing demand that scalability is designed to absorb.",
      ],
      solution_summary: "Scalability is a system's ability to absorb growing work, vertical scaling makes one machine bigger, horizontal scaling adds more machines, and load is the demand being placed on the system.",
      key_concepts: ["scalability", "vertical scaling", "horizontal scaling", "load"],
    },
  ],
  load_balancing: [
    {
      id: "load_balancing_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a load balancer distributes traffic across multiple servers.",
      shuffled_items: [
        "Multiple server instances are running behind a single public address.",
        "Incoming requests arrive at that single address.",
        "The load balancer distributes each request across the available servers.",
        "No single server becomes overwhelmed while others sit idle.",
      ],
      items: [
        "Multiple server instances are running behind a single public address.",
        "Incoming requests arrive at that single address.",
        "The load balancer distributes each request across the available servers.",
        "No single server becomes overwhelmed while others sit idle.",
      ],
      hints: [
        "The servers must exist behind the address before requests can be distributed among them.",
        "Even distribution is the outcome of the load balancer's work, not a precondition for it.",
      ],
      solution_summary: "Multiple servers sit behind one address → requests arrive at that address → the load balancer distributes them across the servers → no single server ends up overwhelmed while others idle.",
      key_concepts: ["load balancer", "horizontal scaling"],
    },
    {
      id: "load_balancing_ms2",
      type: "choice",
      prompt: "What is the core function of a load balancer?",
      options: [
        "To permanently store all incoming request data",
        "To distribute incoming requests across multiple server instances so no single one is overwhelmed",
        "To reject any request exceeding a fixed count",
        "To merge multiple servers into a single physical machine",
      ],
      correct_index: 1,
      hints: [
        "The 'one address, invisible coordination behind it' framing describes distribution, not rejection or merging.",
        "The goal is balanced load across servers, not storage or hard limits.",
      ],
      solution_summary: "A load balancer distributes incoming requests across multiple server instances, so no single server becomes overwhelmed while others sit comparatively idle.",
      key_concepts: ["load balancer"],
    },
    {
      id: "load_balancing_ms3",
      type: "match",
      prompt: "Match each load balancing term to its meaning.",
      left: ["Load balancer", "Server instance", "Overwhelmed server", "Horizontal scaling"],
      right: ["The component distributing traffic across multiple servers", "One individual running copy of the application handling requests", "A server receiving far more traffic than it can handle", "Adding more server instances to share incoming load"],
      correct_pairs: [
        ["Load balancer", "The component distributing traffic across multiple servers"],
        ["Server instance", "One individual running copy of the application handling requests"],
        ["Overwhelmed server", "A server receiving far more traffic than it can handle"],
        ["Horizontal scaling", "Adding more server instances to share incoming load"],
      ],
      hints: [
        "A load balancer's whole purpose is preventing any one server instance from becoming overwhelmed.",
        "Horizontal scaling is what a load balancer makes practically usable.",
      ],
      solution_summary: "A load balancer distributes traffic, a server instance is one running copy handling requests, an overwhelmed server has too much traffic, and horizontal scaling adds more instances to share the load.",
      key_concepts: ["load balancer", "server instance", "horizontal scaling"],
    },
  ],
  caching_at_scale: [
    {
      id: "caching_at_scale_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how caching at scale avoids repeating expensive database work.",
      shuffled_items: [
        "A database answers the exact same question ten thousand times a second.",
        "Without a caching layer, the full work is redone from scratch every single time.",
        "A dedicated caching layer stores the computed result the first time.",
        "Subsequent identical requests are served instantly from the cache instead of hitting the database again.",
      ],
      items: [
        "A database answers the exact same question ten thousand times a second.",
        "Without a caching layer, the full work is redone from scratch every single time.",
        "A dedicated caching layer stores the computed result the first time.",
        "Subsequent identical requests are served instantly from the cache instead of hitting the database again.",
      ],
      hints: [
        "The wasteful repetition is described before the caching layer's fix.",
        "The cache must store the result once before future requests can be served from it.",
      ],
      solution_summary: "The database answers the same question repeatedly → without caching, full work is redone every time → a caching layer stores the result once → future identical requests are served instantly from the cache.",
      key_concepts: ["caching at scale", "caching layer"],
    },
    {
      id: "caching_at_scale_ms2",
      type: "choice",
      prompt: "How does caching at scale differ from the basic caching concept covered at Journeyman?",
      options: [
        "It removes the need for caching entirely",
        "It treats caching as a deliberate, dedicated architectural layer, not just an ad hoc stored result",
        "It only applies to caching images and never applies to data",
        "It requires disabling the database completely"
      ],
      correct_index: 1,
      hints: [
        "At scale, caching becomes a deliberate architectural layer in its own right.",
        "The basic concept was simply storing a computed result; at scale it's formalized into its own layer.",
      ],
      solution_summary: "At scale, caching becomes a deliberate, dedicated architectural layer in its own right, rather than just an ad hoc stored computed result.",
      key_concepts: ["caching at scale", "architectural layer"],
    },
    {
      id: "caching_at_scale_ms3",
      type: "match",
      prompt: "Match each caching-at-scale term to its meaning.",
      left: ["Caching layer", "Cache hit rate", "Cache eviction", "Hot data"],
      right: ["A dedicated architectural component storing frequently requested results", "The proportion of requests successfully served from cache", "Removing older or less-used entries to make room in the cache", "Data requested so frequently it's especially valuable to cache"],
      correct_pairs: [
        ["Caching layer", "A dedicated architectural component storing frequently requested results"],
        ["Cache hit rate", "The proportion of requests successfully served from cache"],
        ["Cache eviction", "Removing older or less-used entries to make room in the cache"],
        ["Hot data", "Data requested so frequently it's especially valuable to cache"],
      ],
      hints: [
        "Cache hit rate measures how effective the caching layer is in practice.",
        "Hot data is specifically the kind of data caching at scale is most valuable for.",
      ],
      solution_summary: "A caching layer is the dedicated architectural component, cache hit rate measures effectiveness, cache eviction frees up room, and hot data is frequently requested data especially worth caching.",
      key_concepts: ["caching layer", "cache hit rate", "hot data"],
    },
  ],
  cdns: [
    {
      id: "cdns_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a CDN avoids slow cross-planet data trips.",
      shuffled_items: [
        "A user in Tokyo requests a webpage hosted on a server in Virginia.",
        "Without a CDN, data must physically cross the planet and back.",
        "A CDN stores copies of static content on servers physically closer to users worldwide.",
        "The Tokyo user's request is served from a nearby CDN server instead of the distant origin.",
      ],
      items: [
        "A user in Tokyo requests a webpage hosted on a server in Virginia.",
        "Without a CDN, data must physically cross the planet and back.",
        "A CDN stores copies of static content on servers physically closer to users worldwide.",
        "The Tokyo user's request is served from a nearby CDN server instead of the distant origin.",
      ],
      hints: [
        "The slow round trip problem is described before the CDN's fix.",
        "Distributed copies must exist before a nearby server can serve the request.",
      ],
      solution_summary: "A user requests content from a distant server → without a CDN, data crosses the planet and back → a CDN distributes copies to servers near users worldwide → the request is served from a nearby CDN server instead.",
      key_concepts: ["CDN", "content delivery network", "latency"],
    },
    {
      id: "cdns_ms2",
      type: "choice",
      prompt: "What kind of content is a CDN primarily built to serve efficiently?",
      options: [
        "Personalized, per-user dynamic content that changes on every request",
        "Static content that doesn't change per individual user, such as images, JavaScript, and CSS files",
        "Live database write operations",
        "Encrypted private user messages"
      ],
      correct_index: 1,
      hints: [
        "The description explicitly lists images, videos, JavaScript, and CSS files as examples.",
        "A CDN's value comes from distributing copies of content that stays the same for everyone.",
      ],
      solution_summary: "A CDN is primarily built to efficiently serve static content that doesn't change per user — images, videos, JavaScript, and CSS files.",
      key_concepts: ["CDN", "static content"],
    },
    {
      id: "cdns_ms3",
      type: "match",
      prompt: "Match each CDN-related term to its meaning.",
      left: ["CDN", "Edge server", "Origin server", "Static content"],
      right: ["A globally distributed network storing copies of content near users", "A CDN server physically close to a group of end users", "The original server hosting the source content", "Content that doesn't change per individual user, like images or CSS"],
      correct_pairs: [
        ["CDN", "A globally distributed network storing copies of content near users"],
        ["Edge server", "A CDN server physically close to a group of end users"],
        ["Origin server", "The original server hosting the source content"],
        ["Static content", "Content that doesn't change per individual user, like images or CSS"],
      ],
      hints: [
        "An edge server is one specific node within the broader CDN.",
        "The origin server is where content originally lives before being distributed.",
      ],
      solution_summary: "A CDN is the globally distributed network, an edge server is one CDN node near users, the origin server hosts the original content, and static content is what doesn't change per user.",
      key_concepts: ["CDN", "edge server", "origin server"],
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
