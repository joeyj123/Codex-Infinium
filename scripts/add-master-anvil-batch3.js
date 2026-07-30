// Master Anvil batch 3: caching_vs_precomputation, database_query_optimization,
// concurrency_at_scale, what_is_devops, cicd_pipelines, containers_docker,
// what_is_the_cloud_infrastructure, infrastructure_as_code, monitoring_alerting,
// evaluating_ai_models.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "master");

const CONTENT = {
  caching_vs_precomputation: [
    {
      id: "caching_vs_precomputation_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how precomputation differs from caching, using the 2am report example.",
      shuffled_items: [
        "A report is generated automatically at 2am, before anyone has asked for it.",
        "The report sits ready, waiting patiently for whoever eventually opens it.",
        "A caching approach would instead wait until the first real request arrives.",
        "Only then would caching compute and store the value for future requests.",
      ],
      items: [
        "A report is generated automatically at 2am, before anyone has asked for it.",
        "The report sits ready, waiting patiently for whoever eventually opens it.",
        "A caching approach would instead wait until the first real request arrives.",
        "Only then would caching compute and store the value for future requests.",
      ],
      hints: [
        "Precomputation happens ahead of any actual request; caching waits for the first request.",
        "Caching's storage step only happens after that first real request triggers it.",
      ],
      solution_summary: "Precomputation generates the report at 2am ahead of demand → it sits ready waiting → caching instead waits for the first real request → only then does it compute and store the value.",
      key_concepts: ["caching", "precomputation"],
    },
    {
      id: "caching_vs_precomputation_ms2",
      type: "choice",
      prompt: "What is the key difference in assumption between caching and precomputation?",
      options: [
        "Caching and precomputation are actually identical with no meaningful difference",
        "Caching bets that work should be done the first time it's requested; precomputation bets it should be done ahead of time, before it's ever requested",
        "Precomputation only works for database queries, never for reports",
        "Caching always requires more storage than precomputation"
      ],
      correct_index: 1,
      hints: [
        "The 2am report versus 'the instant someone asks' example illustrates the timing difference.",
        "Both solve 'don't redo expensive work,' but bet on opposite assumptions about when the work is needed.",
      ],
      solution_summary: "Caching computes and stores a result the first time it's actually requested, while precomputation does the work ahead of time, before anyone has asked for it — opposite bets on timing.",
      key_concepts: ["caching", "precomputation"],
    },
    {
      id: "caching_vs_precomputation_ms3",
      type: "match",
      prompt: "Match each term to its description.",
      left: ["Caching", "Precomputation", "On-demand computation", "Scheduled job"],
      right: ["Storing a result the first time it's actually requested", "Doing expensive work ahead of time, before it's requested", "Computing a value only the instant someone asks for it", "A task run automatically at a fixed time, like 2am"],
      correct_pairs: [
        ["Caching", "Storing a result the first time it's actually requested"],
        ["Precomputation", "Doing expensive work ahead of time, before it's requested"],
        ["On-demand computation", "Computing a value only the instant someone asks for it"],
        ["Scheduled job", "A task run automatically at a fixed time, like 2am"],
      ],
      hints: [
        "A scheduled job is a common mechanism used to implement precomputation.",
        "On-demand computation is the baseline behavior caching improves on by storing results.",
      ],
      solution_summary: "Caching stores results after the first real request, precomputation does the work ahead of time, on-demand computation happens only when asked, and a scheduled job is a common way to trigger precomputation.",
      key_concepts: ["caching", "precomputation", "scheduled job"],
    },
  ],
  database_query_optimization: [
    {
      id: "database_query_optimization_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a careless loop causes the N+1 query problem.",
      shuffled_items: [
        "A query fetches a hundred orders in one round trip.",
        "A loop then fetches each order's related data with a separate query, one order at a time.",
        "The single fetch turns into a hundred and one total database round trips.",
        "Database query optimization catches and fixes this pattern before it reaches production.",
      ],
      items: [
        "A query fetches a hundred orders in one round trip.",
        "A loop then fetches each order's related data with a separate query, one order at a time.",
        "The single fetch turns into a hundred and one total database round trips.",
        "Database query optimization catches and fixes this pattern before it reaches production.",
      ],
      hints: [
        "The initial single query happens before the loop that fetches related data one at a time.",
        "The total round trip count is the consequence, calculated after the loop runs.",
      ],
      solution_summary: "A hundred orders are fetched in one query → a loop then fetches each order's related data separately → this results in a hundred and one total round trips → query optimization catches and fixes this before production.",
      key_concepts: ["N+1 query problem", "database query optimization"],
    },
    {
      id: "database_query_optimization_ms2",
      type: "choice",
      prompt: "What does the 'a hundred orders quietly turn into a hundred and one separate database round trips' example illustrate?",
      options: [
        "A well-optimized batch query pattern",
        "The N+1 query problem, where a loop triggers one extra query per item instead of a single combined query",
        "A missing index on a frequently searched column",
        "A deadlock between two competing transactions",
      ],
      correct_index: 1,
      hints: [
        "One query for the orders, plus one more per order in the loop — that's the classic N+1 pattern.",
        "The fix typically involves fetching related data in a single combined query instead of one per item.",
      ],
      solution_summary: "This illustrates the N+1 query problem: one initial query plus one additional query per item in a loop, instead of a single efficient combined query.",
      key_concepts: ["N+1 query problem"],
    },
    {
      id: "database_query_optimization_ms3",
      type: "match",
      prompt: "Match each database optimization term to its meaning.",
      left: ["N+1 query problem", "Batch query", "Round trip", "Query plan"],
      right: ["One query plus one extra query per item in a loop", "A single query fetching related data for many items at once", "One request-and-response cycle between application and database", "The database's chosen strategy for executing a given query"],
      correct_pairs: [
        ["N+1 query problem", "One query plus one extra query per item in a loop"],
        ["Batch query", "A single query fetching related data for many items at once"],
        ["Round trip", "One request-and-response cycle between application and database"],
        ["Query plan", "The database's chosen strategy for executing a given query"],
      ],
      hints: [
        "A batch query is the typical fix for the N+1 problem.",
        "A query plan reveals how the database intends to execute a specific query.",
      ],
      solution_summary: "The N+1 problem is one query plus one per loop item, a batch query fetches related data for many items at once, a round trip is one request-response cycle, and a query plan is the database's execution strategy.",
      key_concepts: ["N+1 query problem", "batch query", "query plan"],
    },
  ],
  concurrency_at_scale: [
    {
      id: "concurrency_at_scale_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a race condition silently loses an update, using the shared-value example.",
      shuffled_items: [
        "Two processes each read the exact same shared value.",
        "Each process independently computes its own update based on that value.",
        "Each process writes its own version back to the shared value.",
        "One of the two updates simply vanishes, depending on which write happened last.",
      ],
      items: [
        "Two processes each read the exact same shared value.",
        "Each process independently computes its own update based on that value.",
        "Each process writes its own version back to the shared value.",
        "One of the two updates simply vanishes, depending on which write happened last.",
      ],
      hints: [
        "Both processes must read the value before either can compute an update from it.",
        "The lost update is the final outcome, determined by which write happens last.",
      ],
      solution_summary: "Two processes read the same value → each independently computes an update → each writes its version back → one update silently vanishes depending on which write happened last.",
      key_concepts: ["race condition", "concurrency at scale"],
    },
    {
      id: "concurrency_at_scale_ms2",
      type: "choice",
      prompt: "How does concurrency at scale (across multiple processes or machines) differ from the async/await concurrency covered at Journeyman?",
      options: [
        "They are identical, with no meaningful difference",
        "Async/await manages waiting within a single process; concurrency at scale must handle multiple independent processes reading and writing shared data, risking race conditions",
        "Concurrency at scale removes the need for any coordination at all",
        "Async/await only applies to database queries",
      ],
      correct_index: 1,
      hints: [
        "Journeyman's async/await was about efficiently avoiding idle waiting within one process.",
        "The shared-value example specifically involves multiple separate processes, not just one.",
      ],
      solution_summary: "Async/await manages efficient waiting within a single process, while concurrency at scale must coordinate multiple independent processes or machines sharing data, which risks race conditions like a lost update.",
      key_concepts: ["concurrency at scale", "race condition"],
    },
    {
      id: "concurrency_at_scale_ms3",
      type: "match",
      prompt: "Match each concurrency-at-scale term to its meaning.",
      left: ["Race condition", "Lost update", "Shared value", "Coordination"],
      right: ["Outcome depends unpredictably on the timing of concurrent operations", "One process's write is silently overwritten by another's", "Data accessed and modified by multiple independent processes", "Mechanisms ensuring multiple processes don't corrupt shared data"],
      correct_pairs: [
        ["Race condition", "Outcome depends unpredictably on the timing of concurrent operations"],
        ["Lost update", "One process's write is silently overwritten by another's"],
        ["Shared value", "Data accessed and modified by multiple independent processes"],
        ["Coordination", "Mechanisms ensuring multiple processes don't corrupt shared data"],
      ],
      hints: [
        "A lost update is one specific consequence of a race condition.",
        "Coordination mechanisms are what prevent race conditions from happening in the first place.",
      ],
      solution_summary: "A race condition depends unpredictably on timing, a lost update is a write silently overwritten, a shared value is data touched by multiple processes, and coordination is what prevents corruption of shared data.",
      key_concepts: ["race condition", "lost update", "coordination"],
    },
  ],
  what_is_devops: [
    {
      id: "what_is_devops_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how DevOps replaces the old 'throw it over the wall' handoff.",
      shuffled_items: [
        "A developer finishes a feature and, in the old model, hands it off with little further involvement.",
        "Operations struggles to deploy and maintain code it didn't build and doesn't fully understand.",
        "DevOps instead closes the gap between writing code and running it in production.",
        "Development and operations collaborate throughout the feature's entire lifecycle.",
      ],
      items: [
        "A developer finishes a feature and, in the old model, hands it off with little further involvement.",
        "Operations struggles to deploy and maintain code it didn't build and doesn't fully understand.",
        "DevOps instead closes the gap between writing code and running it in production.",
        "Development and operations collaborate throughout the feature's entire lifecycle.",
      ],
      hints: [
        "The old 'throw it over the wall' handoff is described first, along with its resulting friction.",
        "DevOps's collaborative approach is presented as the fix for that friction.",
      ],
      solution_summary: "A developer hands off a feature with little involvement → operations struggles with unfamiliar code → DevOps closes that gap → development and operations collaborate throughout the whole lifecycle.",
      key_concepts: ["DevOps", "development and operations collaboration"],
    },
    {
      id: "what_is_devops_ms2",
      type: "choice",
      prompt: "What problem does DevOps specifically aim to end, based on the 'throw it over the wall' framing?",
      options: [
        "The need for any testing before deployment",
        "The traditional gap and lack of collaboration between writing code and operating it in production",
        "The use of version control systems",
        "The need for developers to ever write documentation",
      ],
      correct_index: 1,
      hints: [
        "'Throw it over the wall' describes development handing off to operations with little further collaboration.",
        "DevOps is explicitly a blend of Development and Operations aimed at closing that gap.",
      ],
      solution_summary: "DevOps aims to end the traditional gap and lack of collaboration between the people who write code and the people who operate it in production.",
      key_concepts: ["DevOps"],
    },
    {
      id: "what_is_devops_ms3",
      type: "match",
      prompt: "Match each DevOps-related term to its meaning.",
      left: ["DevOps", "Throw it over the wall", "Development", "Operations"],
      right: ["Practices closing the gap between building and running software", "The old, siloed handoff from developers to operators", "The team writing and building the software", "The team deploying and maintaining the software in production"],
      correct_pairs: [
        ["DevOps", "Practices closing the gap between building and running software"],
        ["Throw it over the wall", "The old, siloed handoff from developers to operators"],
        ["Development", "The team writing and building the software"],
        ["Operations", "The team deploying and maintaining the software in production"],
      ],
      hints: [
        "'Throw it over the wall' is the exact metaphor DevOps was created to end.",
        "Development and operations are the two roles DevOps blends together.",
      ],
      solution_summary: "DevOps closes the gap between building and running software, 'throw it over the wall' is the old siloed handoff, development builds the software, and operations deploys and maintains it in production.",
      key_concepts: ["DevOps", "development", "operations"],
    },
  ],
  cicd_pipelines: [
    {
      id: "cicd_pipelines_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how CI/CD catches a bug quickly, based on the comparison given.",
      shuffled_items: [
        "A change is made to a codebase.",
        "Continuous Integration automatically builds and tests the codebase right after that change.",
        "A bug introduced by the change is caught immediately, while it's still fresh in someone's mind.",
        "Without CI/CD, that same bug might only surface weeks later, buried under unrelated changes.",
      ],
      items: [
        "A change is made to a codebase.",
        "Continuous Integration automatically builds and tests the codebase right after that change.",
        "A bug introduced by the change is caught immediately, while it's still fresh in someone's mind.",
        "Without CI/CD, that same bug might only surface weeks later, buried under unrelated changes.",
      ],
      hints: [
        "CI's automatic build and test happens right after a change is made.",
        "The late-discovery scenario is the contrasting alternative without CI/CD in place.",
      ],
      solution_summary: "A change is made → CI automatically builds and tests it right away → a bug is caught immediately while fresh → without CI/CD, that same bug might only surface weeks later.",
      key_concepts: ["CI/CD", "continuous integration"],
    },
    {
      id: "cicd_pipelines_ms2",
      type: "choice",
      prompt: "What does Continuous Integration (CI) guarantee, according to the definition given?",
      options: [
        "The codebase is automatically built and tested every single time it's changed",
        "Code is only tested once a year, during a scheduled release",
        "Bugs are automatically fixed without any human involvement",
        "Deployment to production happens without any testing at all",
      ],
      correct_index: 0,
      hints: [
        "CI is explicitly described as automatically building and testing on every change.",
        "The bug-caught-early example depends directly on this guarantee.",
      ],
      solution_summary: "Continuous Integration automatically builds and tests a codebase every single time it's changed, catching bugs while they're still fresh rather than weeks later.",
      key_concepts: ["continuous integration", "CI/CD"],
    },
    {
      id: "cicd_pipelines_ms3",
      type: "match",
      prompt: "Match each CI/CD term to its meaning.",
      left: ["Continuous Integration (CI)", "Continuous Deployment (CD)", "Pipeline", "Build"],
      right: ["Automatically builds and tests code on every change", "Automatically deploys tested code to production", "The automated sequence of steps from code change to deployment", "Compiling or assembling code into a runnable form"],
      correct_pairs: [
        ["Continuous Integration (CI)", "Automatically builds and tests code on every change"],
        ["Continuous Deployment (CD)", "Automatically deploys tested code to production"],
        ["Pipeline", "The automated sequence of steps from code change to deployment"],
        ["Build", "Compiling or assembling code into a runnable form"],
      ],
      hints: [
        "CI focuses on build/test; CD focuses on the deployment step afterward.",
        "A pipeline is the overall automated sequence that CI and CD are both part of.",
      ],
      solution_summary: "CI automatically builds and tests on every change, CD automatically deploys tested code, a pipeline is the full automated sequence, and a build is the step compiling code into runnable form.",
      key_concepts: ["CI", "CD", "pipeline"],
    },
  ],
  containers_docker: [
    {
      id: "containers_docker_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how a container solves the 'it works on my machine' problem.",
      shuffled_items: [
        "An application runs correctly on a developer's own machine.",
        "The same application fails elsewhere due to different dependencies or runtime versions.",
        "A container packages the application together with its exact dependencies and runtime.",
        "The container runs identically wherever it's deployed, regardless of the host machine's setup.",
      ],
      items: [
        "An application runs correctly on a developer's own machine.",
        "The same application fails elsewhere due to different dependencies or runtime versions.",
        "A container packages the application together with its exact dependencies and runtime.",
        "The container runs identically wherever it's deployed, regardless of the host machine's setup.",
      ],
      hints: [
        "The 'it works on my machine' problem is described before the container-based fix.",
        "Packaging dependencies together is what enables identical behavior everywhere.",
      ],
      solution_summary: "An app works on one machine → it fails elsewhere due to environment differences → a container packages the app with its exact dependencies and runtime → it then runs identically anywhere it's deployed.",
      key_concepts: ["container", "Docker", "environment consistency"],
    },
    {
      id: "containers_docker_ms2",
      type: "choice",
      prompt: "What does a container package together, according to the definition given?",
      options: [
        "Only the application's source code, with nothing else",
        "The application together with its exact dependencies and specific runtime version",
        "Only the operating system, with no application included",
        "A complete separate physical machine for each application"
      ],
      correct_index: 1,
      hints: [
        "The definition explicitly mentions 'its exact dependencies... its specific runtime version.'",
        "This is exactly what makes 'it works on my machine' obsolete.",
      ],
      solution_summary: "A container packages an application together with everything it needs to run correctly — its exact dependencies and specific runtime version.",
      key_concepts: ["container"],
    },
    {
      id: "containers_docker_ms3",
      type: "match",
      prompt: "Match each container-related term to its meaning.",
      left: ["Container", "Image", "Docker", "Dependency"],
      right: ["A packaged, runnable unit including an app and everything it needs", "A snapshot template used to create running containers", "A widely used platform for building and running containers", "Software the application relies on to function correctly"],
      correct_pairs: [
        ["Container", "A packaged, runnable unit including an app and everything it needs"],
        ["Image", "A snapshot template used to create running containers"],
        ["Docker", "A widely used platform for building and running containers"],
        ["Dependency", "Software the application relies on to function correctly"],
      ],
      hints: [
        "An image is the template; a container is a running instance created from it.",
        "Docker is a specific tool that implements the container concept.",
      ],
      solution_summary: "A container is a packaged runnable unit, an image is the template used to create containers, Docker is a widely used container platform, and a dependency is software the app needs to function.",
      key_concepts: ["container", "image", "Docker"],
    },
  ],
  what_is_the_cloud_infrastructure: [
    {
      id: "what_is_the_cloud_infrastructure_ms1",
      type: "order",
      prompt: "Put these steps in order to describe the practical shift 'the cloud' represents beyond its basic definition.",
      shuffled_items: [
        "At a basic level, the cloud is simply someone else's physical servers accessed remotely.",
        "A team needs specific infrastructure pieces — compute, storage, networking — without running physical hardware themselves.",
        "The cloud provider has already solved the hard problem of running physical servers reliably at scale.",
        "The team rents exactly the pieces they actually need from that provider.",
      ],
      items: [
        "At a basic level, the cloud is simply someone else's physical servers accessed remotely.",
        "A team needs specific infrastructure pieces — compute, storage, networking — without running physical hardware themselves.",
        "The cloud provider has already solved the hard problem of running physical servers reliably at scale.",
        "The team rents exactly the pieces they actually need from that provider.",
      ],
      hints: [
        "The basic definition of the cloud is stated first, before the more practical, mature framing.",
        "Renting exactly the needed pieces is the final practical action described.",
      ],
      solution_summary: "The cloud is basically someone else's servers accessed remotely → a team needs infrastructure pieces without running hardware themselves → a provider has already solved running servers reliably at scale → the team rents exactly what it needs.",
      key_concepts: ["cloud infrastructure", "cloud computing"],
    },
    {
      id: "what_is_the_cloud_infrastructure_ms2",
      type: "choice",
      prompt: "What is the 'real, practical shift' the cloud represents, beyond the basic Novice-level definition?",
      options: [
        "Renting exactly the infrastructure pieces you need from a provider that's already solved running servers reliably at scale",
        "Building and maintaining your own physical data center from scratch",
        "Avoiding the use of any remote servers entirely",
        "Replacing all software with hardware-based solutions"
      ],
      correct_index: 0,
      hints: [
        "The framing explicitly moves 'past the basic definition' toward renting specific needed pieces.",
        "The provider's already-solved reliability problem is the value being rented.",
      ],
      solution_summary: "The real practical shift is renting exactly the infrastructure pieces needed from a provider that has already solved running physical servers reliably at scale.",
      key_concepts: ["cloud infrastructure"],
    },
    {
      id: "what_is_the_cloud_infrastructure_ms3",
      type: "match",
      prompt: "Match each cloud infrastructure term to its meaning.",
      left: ["Compute", "Storage", "Networking", "Cloud provider"],
      right: ["Processing power rented to run applications", "Rented capacity for holding data", "Rented capability to connect and route traffic between systems", "The company operating the physical servers being rented"],
      correct_pairs: [
        ["Compute", "Processing power rented to run applications"],
        ["Storage", "Rented capacity for holding data"],
        ["Networking", "Rented capability to connect and route traffic between systems"],
        ["Cloud provider", "The company operating the physical servers being rented"],
      ],
      hints: [
        "Compute, storage, and networking are the three infrastructure pieces explicitly listed.",
        "A cloud provider is who actually owns and operates the underlying physical hardware.",
      ],
      solution_summary: "Compute is rented processing power, storage is rented data capacity, networking is rented connectivity, and a cloud provider is the company operating the physical servers behind all of it.",
      key_concepts: ["compute", "storage", "networking", "cloud provider"],
    },
  ],
  infrastructure_as_code: [
    {
      id: "infrastructure_as_code_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how infrastructure as code prevents configuration drift.",
      shuffled_items: [
        "A team manually clicks through a cloud dashboard to configure a server.",
        "Later, an unrecorded manual change is made, drifting the real setup away from what's documented.",
        "Infrastructure as code instead defines the entire setup in version-controlled configuration files.",
        "Re-applying that code reliably reproduces the exact same infrastructure every time.",
      ],
      items: [
        "A team manually clicks through a cloud dashboard to configure a server.",
        "Later, an unrecorded manual change is made, drifting the real setup away from what's documented.",
        "Infrastructure as code instead defines the entire setup in version-controlled configuration files.",
        "Re-applying that code reliably reproduces the exact same infrastructure every time.",
      ],
      hints: [
        "The manual-dashboard problem is described before infrastructure as code's fix.",
        "Reliable reproduction is the benefit gained once the setup lives in version-controlled files.",
      ],
      solution_summary: "Manual dashboard clicking configures a server → an unrecorded change causes drift later → infrastructure as code instead defines the setup in version-controlled files → re-applying that code reliably reproduces the same infrastructure.",
      key_concepts: ["infrastructure as code", "configuration drift"],
    },
    {
      id: "infrastructure_as_code_ms2",
      type: "choice",
      prompt: "What problem does infrastructure as code specifically make structurally impossible?",
      options: [
        "The need for any cloud provider at all",
        "A live system's real configuration silently drifting away from what anyone remembers setting it up to be",
        "The need for version control on application source code",
        "Servers being physically located in different regions"
      ],
      correct_index: 1,
      hints: [
        "The definition explicitly names configuration drift from unrecorded manual clicks as the target problem.",
        "Defining infrastructure in code, tracked by version control, is what prevents that silent drift.",
      ],
      solution_summary: "Infrastructure as code makes configuration drift — a live system's real setup silently diverging from documented intent — structurally impossible by defining the setup in version-controlled code.",
      key_concepts: ["infrastructure as code", "configuration drift"],
    },
    {
      id: "infrastructure_as_code_ms3",
      type: "match",
      prompt: "Match each infrastructure-as-code term to its meaning.",
      left: ["Infrastructure as code", "Configuration drift", "Version control", "Manual configuration"],
      right: ["Defining infrastructure setup in version-controlled files", "A live system's real config silently diverging from what's documented", "Tracking changes to configuration files over time", "Manually clicking through a dashboard to set things up"],
      correct_pairs: [
        ["Infrastructure as code", "Defining infrastructure setup in version-controlled files"],
        ["Configuration drift", "A live system's real config silently diverging from what's documented"],
        ["Version control", "Tracking changes to configuration files over time"],
        ["Manual configuration", "Manually clicking through a dashboard to set things up"],
      ],
      hints: [
        "Version control is what makes infrastructure-as-code changes trackable and reproducible.",
        "Manual configuration is exactly the old approach infrastructure as code replaces.",
      ],
      solution_summary: "Infrastructure as code defines setup in version-controlled files, configuration drift is undocumented divergence, version control tracks changes over time, and manual configuration is the old dashboard-clicking approach it replaces.",
      key_concepts: ["infrastructure as code", "configuration drift", "version control"],
    },
  ],
  monitoring_alerting: [
    {
      id: "monitoring_alerting_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how monitoring and alerting close the gap between a problem occurring and a human noticing.",
      shuffled_items: [
        "A problem begins happening in a running system.",
        "Monitoring continuously tracks metrics like response times and error rates.",
        "An alerting system detects the anomaly and pages the right person.",
        "The problem is addressed within ninety seconds instead of going unnoticed for hours.",
      ],
      items: [
        "A problem begins happening in a running system.",
        "Monitoring continuously tracks metrics like response times and error rates.",
        "An alerting system detects the anomaly and pages the right person.",
        "The problem is addressed within ninety seconds instead of going unnoticed for hours.",
      ],
      hints: [
        "Monitoring must already be tracking metrics before an anomaly can be detected.",
        "Being paged happens before the problem can actually be addressed quickly.",
      ],
      solution_summary: "A problem begins → monitoring continuously tracks relevant metrics → an alert detects the anomaly and pages the right person → the problem is addressed within ninety seconds instead of hours later.",
      key_concepts: ["monitoring", "alerting"],
    },
    {
      id: "monitoring_alerting_ms2",
      type: "choice",
      prompt: "What practical value does monitoring and alerting exist to provide, based on the framing given?",
      options: [
        "Preventing all problems from ever occurring in the first place",
        "Closing the gap between when a problem starts happening and when a human actually notices and responds",
        "Replacing the need for any error handling in code",
        "Making systems run without any monitoring overhead at all",
      ],
      correct_index: 1,
      hints: [
        "The three-hours-versus-ninety-seconds contrast is exactly this gap being closed.",
        "Monitoring can't prevent problems — it closes the detection and response gap.",
      ],
      solution_summary: "Monitoring and alerting exist to close the gap between a problem starting to happen and a human actually noticing and responding to it, ideally within seconds rather than hours.",
      key_concepts: ["monitoring", "alerting"],
    },
    {
      id: "monitoring_alerting_ms3",
      type: "match",
      prompt: "Match each monitoring-related term to its meaning.",
      left: ["Monitoring", "Alerting", "Metric", "Paging"],
      right: ["Continuously tracking a system's ongoing health", "Automatically notifying someone when a problem is detected", "A specific measured value, like response time or error rate", "Directly notifying a specific responsible person about an issue"],
      correct_pairs: [
        ["Monitoring", "Continuously tracking a system's ongoing health"],
        ["Alerting", "Automatically notifying someone when a problem is detected"],
        ["Metric", "A specific measured value, like response time or error rate"],
        ["Paging", "Directly notifying a specific responsible person about an issue"],
      ],
      hints: [
        "Monitoring is the ongoing tracking; alerting is the reaction when something looks wrong.",
        "Paging is the specific act of alerting a responsible individual.",
      ],
      solution_summary: "Monitoring continuously tracks system health, alerting automatically notifies on detected problems, a metric is a specific measured value, and paging is directly notifying the responsible person.",
      key_concepts: ["monitoring", "alerting", "metric"],
    },
  ],
  evaluating_ai_models: [
    {
      id: "evaluating_ai_models_ms1",
      type: "order",
      prompt: "Put these steps in order to describe how an eval replaces a vague impression with structured measurement.",
      shuffled_items: [
        "Someone says a model 'seems better' after informally trying it.",
        "A team needs a real, repeatable way to compare model performance.",
        "An eval is designed as a structured, standardized test on a well-defined task.",
        "The model's performance is measured against that eval, replacing the vague impression with real data.",
      ],
      items: [
        "Someone says a model 'seems better' after informally trying it.",
        "A team needs a real, repeatable way to compare model performance.",
        "An eval is designed as a structured, standardized test on a well-defined task.",
        "The model's performance is measured against that eval, replacing the vague impression with real data.",
      ],
      hints: [
        "The vague impression is described as the starting, insufficient state.",
        "Measuring against the eval is the final step that replaces the vague impression.",
      ],
      solution_summary: "A vague 'it seems better' impression exists → a team needs a repeatable way to compare models → an eval is designed as a structured standardized test → the model is measured against it, replacing the vague impression with real data.",
      key_concepts: ["evals", "AI model evaluation"],
    },
    {
      id: "evaluating_ai_models_ms2",
      type: "choice",
      prompt: "What is an 'eval,' as defined in this context?",
      options: [
        "A vague, informal impression of how well a model seems to perform",
        "A structured, standardized test measuring how well a model performs on a specific, well-defined task",
        "A random sample of user opinions about a model",
        "A model's total parameter count",
      ],
      correct_index: 1,
      hints: [
        "The definition explicitly contrasts an eval with 'it seems better.'",
        "Structure, standardization, and a well-defined task are the key defining features.",
      ],
      solution_summary: "An eval is a structured, standardized test measuring how well a given AI model performs on a specific, well-defined task, replacing vague impressions with real measurement.",
      key_concepts: ["evals"],
    },
    {
      id: "evaluating_ai_models_ms3",
      type: "match",
      prompt: "Match each AI evaluation term to its meaning.",
      left: ["Eval", "Benchmark", "Well-defined task", "Vague impression"],
      right: ["A structured, standardized test of model performance", "A specific, established eval used widely for comparison", "A clearly specified problem a model's performance is measured against", "An informal, unmeasured sense that a model performs well"],
      correct_pairs: [
        ["Eval", "A structured, standardized test of model performance"],
        ["Benchmark", "A specific, established eval used widely for comparison"],
        ["Well-defined task", "A clearly specified problem a model's performance is measured against"],
        ["Vague impression", "An informal, unmeasured sense that a model performs well"],
      ],
      hints: [
        "A benchmark is a specific, widely recognized kind of eval.",
        "A well-defined task is what makes an eval's measurement meaningful and repeatable.",
      ],
      solution_summary: "An eval is a structured standardized test, a benchmark is a specific widely-used eval, a well-defined task is the clearly specified problem being measured, and a vague impression is the informal, unmeasured alternative evals replace.",
      key_concepts: ["evals", "benchmark"],
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
