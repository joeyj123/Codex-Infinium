// Journeyman Anvil batch 4: agile_scrum_practically, code_review_practice, software_licensing,
// accessibility_a11y, relational_vs_nonrelational, tables_rows_columns_keys, basic_sql_crud,
// joins, indexes, acid_properties_transactions.
// All no-code concept types: order, choice, match.
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const tier = kb.tiers.find((t) => t.id === "journeyman");

const CONTENT = {
  agile_scrum_practically: [
    {
      id: "agile_scrum_practically_jv1",
      type: "order",
      prompt: "Put these steps in order to describe a single Scrum sprint.",
      shuffled_items: [
        "The team commits to a specific set of work for the next couple of weeks.",
        "At sprint planning, the team selects which work items to tackle next.",
        "The team holds a sprint review to show completed work to stakeholders.",
        "The team works through the sprint, adjusting day to day as needed.",
      ],
      items: [
        "At sprint planning, the team selects which work items to tackle next.",
        "The team commits to a specific set of work for the next couple of weeks.",
        "The team works through the sprint, adjusting day to day as needed.",
        "The team holds a sprint review to show completed work to stakeholders.",
      ],
      hints: [
        "Selecting the work happens before committing to it as a sprint's scope.",
        "The review comes at the end, after the work has actually been done.",
      ],
      solution_summary: "Sprint planning selects the work → the team commits to it → the team executes the sprint, adjusting as needed → a sprint review shows the completed work.",
      key_concepts: ["agile", "scrum", "sprint"],
    },
    {
      id: "agile_scrum_practically_jv2",
      type: "choice",
      prompt: "What is the core idea behind Agile/Scrum planning, compared to planning an entire project upfront in rigid detail?",
      options: [
        "Plan every detail a year in advance and never revisit it",
        "Plan a rough overall direction, but commit firmly only to the next short iteration",
        "Avoid planning entirely and build whatever seems interesting",
        "Only the project manager is allowed to make any planning decisions",
      ],
      correct_index: 1,
      hints: [
        "The road-trip analogy: a rough direction, with firm commitment only to the next couple of weeks.",
        "Agile responds to change rather than following a rigid year-long schedule.",
      ],
      solution_summary: "Agile/Scrum plans a rough overall direction but commits firmly only to the next short iteration (a sprint), allowing the team to adapt as things change.",
      key_concepts: ["agile", "scrum", "iterative planning"],
    },
    {
      id: "agile_scrum_practically_jv3",
      type: "match",
      prompt: "Match each Scrum term to its meaning.",
      left: ["Sprint", "Backlog", "Standup", "Sprint review"],
      right: ["A fixed short time period of focused work", "The full list of work still to be done", "A brief daily check-in on progress and blockers", "A meeting showing completed work to stakeholders"],
      correct_pairs: [
        ["Sprint", "A fixed short time period of focused work"],
        ["Backlog", "The full list of work still to be done"],
        ["Standup", "A brief daily check-in on progress and blockers"],
        ["Sprint review", "A meeting showing completed work to stakeholders"],
      ],
      hints: [
        "A sprint is bounded in time; the backlog is the full pool of pending work.",
        "The standup happens daily; the sprint review happens once per sprint.",
      ],
      solution_summary: "A sprint is a fixed work period, the backlog holds pending work, a standup is a daily check-in, and a sprint review presents completed work to stakeholders.",
      key_concepts: ["scrum", "sprint", "backlog"],
    },
  ],
  code_review_practice: [
    {
      id: "code_review_practice_jv1",
      type: "order",
      prompt: "Put these steps in order to describe a typical code review workflow.",
      shuffled_items: [
        "A reviewer reads through the changes and leaves comments or questions.",
        "A developer finishes writing a change and submits it for review.",
        "The developer merges the change into the shared codebase.",
        "The developer addresses the feedback and updates the change.",
      ],
      items: [
        "A developer finishes writing a change and submits it for review.",
        "A reviewer reads through the changes and leaves comments or questions.",
        "The developer addresses the feedback and updates the change.",
        "The developer merges the change into the shared codebase.",
      ],
      hints: [
        "A change must be submitted before a reviewer can look at it.",
        "Feedback must be addressed before the change is merged in.",
      ],
      solution_summary: "A change is submitted for review → a reviewer leaves feedback → the developer addresses it → the change is merged into the shared codebase.",
      key_concepts: ["code review", "software development practice"],
    },
    {
      id: "code_review_practice_jv2",
      type: "choice",
      prompt: "What is the main purpose of code review before merging changes into a shared codebase?",
      options: [
        "To slow down development for no real benefit",
        "To catch issues the original author, having stared at their own code, no longer notices",
        "To replace the need for any automated testing",
        "To assign blame if something breaks later",
      ],
      correct_index: 1,
      hints: [
        "The proofreading-an-email analogy: a second pair of eyes catches what the writer stopped seeing.",
        "Review is about catching issues before they reach the shared codebase, not assigning blame.",
      ],
      solution_summary: "Code review's main purpose is a second pair of eyes catching mistakes or issues the original author no longer notices, before the change is merged.",
      key_concepts: ["code review", "quality assurance"],
    },
    {
      id: "code_review_practice_jv3",
      type: "match",
      prompt: "Match each code review term to its meaning.",
      left: ["Reviewer", "Pull request", "Approval", "Comment"],
      right: ["The person reading and evaluating the proposed change", "The submitted change awaiting review", "A signal that the change is ready to merge", "Specific feedback left on a piece of the change"],
      correct_pairs: [
        ["Reviewer", "The person reading and evaluating the proposed change"],
        ["Pull request", "The submitted change awaiting review"],
        ["Approval", "A signal that the change is ready to merge"],
        ["Comment", "Specific feedback left on a piece of the change"],
      ],
      hints: [
        "A pull request is the submitted unit of work being reviewed.",
        "Approval and comments are both outputs of the review process, but approval signals readiness to merge.",
      ],
      solution_summary: "A reviewer evaluates the change, a pull request is the submission itself, approval signals it's ready to merge, and a comment is specific feedback on part of it.",
      key_concepts: ["code review", "pull request"],
    },
  ],
  software_licensing: [
    {
      id: "software_licensing_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a software license governs reuse of code.",
      shuffled_items: [
        "A developer writes and publishes a piece of software.",
        "Another developer wants to use or modify that software.",
        "The developer attaches a license specifying what others may and may not do with it.",
        "The second developer checks the license before reusing the code.",
      ],
      items: [
        "A developer writes and publishes a piece of software.",
        "The developer attaches a license specifying what others may and may not do with it.",
        "Another developer wants to use or modify that software.",
        "The second developer checks the license before reusing the code.",
      ],
      hints: [
        "The license must be attached before anyone else can consult it.",
        "Checking the license happens once someone else wants to actually use the code.",
      ],
      solution_summary: "Software is published → a license is attached specifying the rules → someone else wants to use it → they check the license before reusing it.",
      key_concepts: ["software license", "legal permissions"],
    },
    {
      id: "software_licensing_jv2",
      type: "choice",
      prompt: "Why does published software need an explicit license, even though copying code is often technically trivial?",
      options: [
        "Because technical ease of copying has no bearing on whether it's legally permitted",
        "Because software cannot be copied without a license technically preventing it",
        "Because licenses are only required for paid software",
        "Because licenses make code run faster",
      ],
      correct_index: 0,
      hints: [
        "The library-book analogy: you can technically rip out pages, but the rules still forbid it.",
        "A license is a legal permission structure, not a technical barrier.",
      ],
      solution_summary: "Copying code is often technically trivial, but a license is what makes clear what's actually legally permitted, independent of technical ease.",
      key_concepts: ["software license", "legal vs technical"],
    },
    {
      id: "software_licensing_jv3",
      type: "match",
      prompt: "Match each licensing term to its description.",
      left: ["Open source license", "Proprietary license", "Permissive license", "Copyleft license"],
      right: ["Source code is publicly available under defined terms", "Source code and usage rights are restricted by the owner", "Allows reuse with few restrictions, even in closed-source projects", "Requires derivative works to also be released under the same license"],
      correct_pairs: [
        ["Open source license", "Source code is publicly available under defined terms"],
        ["Proprietary license", "Source code and usage rights are restricted by the owner"],
        ["Permissive license", "Allows reuse with few restrictions, even in closed-source projects"],
        ["Copyleft license", "Requires derivative works to also be released under the same license"],
      ],
      hints: [
        "Permissive and copyleft are both types of open source license with different obligations.",
        "Proprietary licenses restrict access, unlike open source ones.",
      ],
      solution_summary: "Open source licenses share source publicly, proprietary licenses restrict it, permissive licenses allow broad reuse, and copyleft licenses require derivatives to stay under the same license.",
      key_concepts: ["software license", "open source", "copyleft"],
    },
  ],
  accessibility_a11y: [
    {
      id: "accessibility_a11y_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a team addresses an accessibility gap in an application.",
      shuffled_items: [
        "A team notices a screen reader user cannot navigate the page's key controls.",
        "The team audits the page for accessibility issues.",
        "The team implements fixes such as proper labels and keyboard navigation.",
        "The team verifies the fix works with assistive technology.",
      ],
      items: [
        "A team notices a screen reader user cannot navigate the page's key controls.",
        "The team audits the page for accessibility issues.",
        "The team implements fixes such as proper labels and keyboard navigation.",
        "The team verifies the fix works with assistive technology.",
      ],
      hints: [
        "Noticing the problem comes before formally auditing for its full scope.",
        "Verification happens after the fix has actually been implemented.",
      ],
      solution_summary: "A gap is noticed → the team audits the page → fixes are implemented → the fix is verified with assistive technology.",
      key_concepts: ["accessibility", "a11y", "assistive technology"],
    },
    {
      id: "accessibility_a11y_jv2",
      type: "choice",
      prompt: "What does the accessibility analogy of 'a building with only stairs and no ramp' illustrate?",
      options: [
        "That an entrance can technically exist while still excluding some users",
        "That all buildings must legally have ramps",
        "That stairs are inherently better than ramps",
        "That accessibility only applies to physical buildings, not software",
      ],
      correct_index: 0,
      hints: [
        "The entrance technically exists, but it doesn't work for everyone who needs it.",
        "The analogy is meant to translate directly to digital interfaces excluding some users.",
      ],
      solution_summary: "The analogy illustrates that something can technically exist and function for some users while silently excluding others — the core problem accessibility addresses.",
      key_concepts: ["accessibility", "a11y", "inclusive design"],
    },
    {
      id: "accessibility_a11y_jv3",
      type: "match",
      prompt: "Match each accessibility concept to its purpose.",
      left: ["Alt text", "Keyboard navigation", "Color contrast", "Screen reader"],
      right: ["Describes an image for users who can't see it", "Lets users operate the interface without a mouse", "Ensures text remains readable for users with low vision", "Software that reads on-screen content aloud"],
      correct_pairs: [
        ["Alt text", "Describes an image for users who can't see it"],
        ["Keyboard navigation", "Lets users operate the interface without a mouse"],
        ["Color contrast", "Ensures text remains readable for users with low vision"],
        ["Screen reader", "Software that reads on-screen content aloud"],
      ],
      hints: [
        "Alt text and screen readers both address the same category of user need, from different sides.",
        "Keyboard navigation addresses users who cannot or do not use a mouse.",
      ],
      solution_summary: "Alt text describes images, keyboard navigation enables mouse-free use, color contrast supports low vision, and a screen reader reads content aloud.",
      key_concepts: ["accessibility", "a11y", "assistive technology"],
    },
  ],
  relational_vs_nonrelational: [
    {
      id: "relational_vs_nonrelational_jv1",
      type: "order",
      prompt: "Put these steps in order to describe choosing between a relational and non-relational database for a given dataset.",
      shuffled_items: [
        "A team examines the shape of their data — consistent fields versus deeply varying structure.",
        "If the data fits a consistent, uniform shape, the team considers a relational database.",
        "If the data has wildly varying, nested structure, the team considers a non-relational database.",
        "The team builds the system around the chosen database type.",
      ],
      items: [
        "A team examines the shape of their data — consistent fields versus deeply varying structure.",
        "If the data fits a consistent, uniform shape, the team considers a relational database.",
        "If the data has wildly varying, nested structure, the team considers a non-relational database.",
        "The team builds the system around the chosen database type.",
      ],
      hints: [
        "Examining the data's shape comes before deciding which database type fits.",
        "Building the system comes only after the database type has been chosen.",
      ],
      solution_summary: "The data's shape is examined → uniform data suggests relational → varying/nested data suggests non-relational → the system is built around that choice.",
      key_concepts: ["relational database", "non-relational database", "NoSQL"],
    },
    {
      id: "relational_vs_nonrelational_jv2",
      type: "choice",
      prompt: "Which scenario is best suited to a relational database, based on the spreadsheet analogy?",
      options: [
        "A list of customers who all share the exact same fields: name, email, address",
        "A deeply nested chat conversation with wildly varying reply structures",
        "A collection of documents with no consistent shape at all",
        "Data that changes shape completely from one record to the next",
      ],
      correct_index: 0,
      hints: [
        "A relational database fits data that looks like a clean, consistent spreadsheet.",
        "Wildly varying or nested structures are a poor fit for a rigid grid.",
      ],
      solution_summary: "A relational database suits data with a consistent, uniform shape — like a list of customers sharing the same fields — much like a well-organized spreadsheet.",
      key_concepts: ["relational database", "structured data"],
    },
    {
      id: "relational_vs_nonrelational_jv3",
      type: "match",
      prompt: "Match each database type to the data shape it fits best.",
      left: ["Relational database", "Document-based NoSQL database", "Key-value store", "Graph database"],
      right: ["Consistent rows and columns shared across records", "Nested, varying-structure documents", "Simple lookups by a unique identifier", "Data defined mainly by relationships between entities"],
      correct_pairs: [
        ["Relational database", "Consistent rows and columns shared across records"],
        ["Document-based NoSQL database", "Nested, varying-structure documents"],
        ["Key-value store", "Simple lookups by a unique identifier"],
        ["Graph database", "Data defined mainly by relationships between entities"],
      ],
      hints: [
        "Relational databases favor rigid consistency; document databases favor flexibility.",
        "Graph databases specialize in modeling connections, not just individual records.",
      ],
      solution_summary: "Relational databases fit consistent rows/columns, document databases fit varying nested structures, key-value stores fit simple lookups, and graph databases fit relationship-heavy data.",
      key_concepts: ["relational database", "NoSQL", "database types"],
    },
  ],
  tables_rows_columns_keys: [
    {
      id: "tables_rows_columns_keys_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a relational table represents data, using the student-spreadsheet analogy.",
      shuffled_items: [
        "A consistent set of columns is defined, such as name, grade, and email.",
        "Each individual student is stored as one row.",
        "Every row repeats the exact same set of columns.",
        "A primary key uniquely identifies each row so it can be reliably referenced.",
      ],
      items: [
        "A consistent set of columns is defined, such as name, grade, and email.",
        "Each individual student is stored as one row.",
        "Every row repeats the exact same set of columns.",
        "A primary key uniquely identifies each row so it can be reliably referenced.",
      ],
      hints: [
        "Columns must be defined before rows can be filled in using them.",
        "A primary key is what makes each row reliably distinguishable from the others.",
      ],
      solution_summary: "Columns are defined → each student becomes a row → every row shares the same columns → a primary key uniquely identifies each row.",
      key_concepts: ["table", "row", "column", "primary key"],
    },
    {
      id: "tables_rows_columns_keys_jv2",
      type: "choice",
      prompt: "What is the role of a primary key in a relational database table?",
      options: [
        "It stores a duplicate copy of every column's data",
        "It uniquely identifies each row so it can be reliably referenced",
        "It determines the visual formatting of the table",
        "It is only used for tables containing numbers",
      ],
      correct_index: 1,
      hints: [
        "A primary key's defining feature is uniqueness per row.",
        "Reliable reference between tables depends on rows being uniquely identifiable.",
      ],
      solution_summary: "A primary key uniquely identifies each row in a table, making it possible to reliably reference that specific row from elsewhere.",
      key_concepts: ["primary key", "table", "row"],
    },
    {
      id: "tables_rows_columns_keys_jv3",
      type: "match",
      prompt: "Match each relational database term to its meaning.",
      left: ["Table", "Row", "Column", "Primary key"],
      right: ["A structured grid holding one kind of entity's data", "A single record within a table", "A named field shared across all rows", "A unique identifier for each row"],
      correct_pairs: [
        ["Table", "A structured grid holding one kind of entity's data"],
        ["Row", "A single record within a table"],
        ["Column", "A named field shared across all rows"],
        ["Primary key", "A unique identifier for each row"],
      ],
      hints: [
        "A table holds many rows; a column is one field repeated across all of them.",
        "The primary key is a special column (or set of columns) guaranteeing uniqueness.",
      ],
      solution_summary: "A table holds records of one entity type, a row is a single record, a column is a shared field, and a primary key uniquely identifies each row.",
      key_concepts: ["table", "row", "column", "primary key"],
    },
  ],
  basic_sql_crud: [
    {
      id: "basic_sql_crud_jv1",
      type: "order",
      prompt: "Put these CRUD operations in the order they're typically first encountered when working with a new record's lifecycle.",
      shuffled_items: [
        "Read the record back to confirm it exists.",
        "Create the new record with an INSERT statement.",
        "Delete the record once it's no longer needed.",
        "Update the record's fields with an UPDATE statement.",
      ],
      items: [
        "Create the new record with an INSERT statement.",
        "Read the record back to confirm it exists.",
        "Update the record's fields with an UPDATE statement.",
        "Delete the record once it's no longer needed.",
      ],
      hints: [
        "A record must be created before it can be read, updated, or deleted.",
        "Deletion is typically the final stage of a record's lifecycle.",
      ],
      solution_summary: "A record is created (INSERT) → read back (SELECT) → updated (UPDATE) as needed → eventually deleted (DELETE).",
      key_concepts: ["CRUD", "SQL", "INSERT", "UPDATE", "DELETE"],
    },
    {
      id: "basic_sql_crud_jv2",
      type: "choice",
      prompt: "Which SQL statement corresponds to the 'Read' operation in CRUD?",
      options: [
        "INSERT",
        "SELECT",
        "UPDATE",
        "DELETE",
      ],
      correct_index: 1,
      hints: [
        "Reading data means retrieving it, not modifying or removing it.",
        "The SQL statement for retrieving rows is the one used to answer this.",
      ],
      solution_summary: "SELECT is the SQL statement used to read existing data; INSERT creates, UPDATE modifies, and DELETE removes.",
      key_concepts: ["CRUD", "SQL", "SELECT"],
    },
    {
      id: "basic_sql_crud_jv3",
      type: "match",
      prompt: "Match each CRUD operation to its corresponding SQL statement.",
      left: ["Create", "Read", "Update", "Delete"],
      right: ["INSERT", "SELECT", "UPDATE", "DELETE"],
      correct_pairs: [
        ["Create", "INSERT"],
        ["Read", "SELECT"],
        ["Update", "UPDATE"],
        ["Delete", "DELETE"],
      ],
      hints: [
        "Each CRUD verb maps directly to one SQL keyword.",
        "The SQL keyword for reading data is not literally named 'Read'.",
      ],
      solution_summary: "Create maps to INSERT, Read maps to SELECT, Update maps to UPDATE, and Delete maps to DELETE.",
      key_concepts: ["CRUD", "SQL"],
    },
  ],
  joins: [
    {
      id: "joins_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a join combines data from two separate tables.",
      shuffled_items: [
        "The database matches rows between the two tables using a shared key, such as customer_id.",
        "A customers table and an orders table are stored separately.",
        "A query requests a join between the two tables.",
        "The database returns combined rows containing both customer and order information.",
      ],
      items: [
        "A customers table and an orders table are stored separately.",
        "A query requests a join between the two tables.",
        "The database matches rows between the two tables using a shared key, such as customer_id.",
        "The database returns combined rows containing both customer and order information.",
      ],
      hints: [
        "The tables must exist separately before a join can combine them.",
        "Matching rows by a shared key happens before the combined result is returned.",
      ],
      solution_summary: "Two tables exist separately → a query requests a join → rows are matched by a shared key → combined rows are returned.",
      key_concepts: ["join", "SQL", "relational database"],
    },
    {
      id: "joins_jv2",
      type: "choice",
      prompt: "Why does a well-organized database keep customer information and order information in separate tables, using a join to combine them when needed?",
      options: [
        "To make queries slower on purpose",
        "To avoid redundant duplication of customer data across every order",
        "Because SQL does not allow more than one table per database",
        "To prevent orders from ever being linked to a customer",
      ],
      correct_index: 1,
      hints: [
        "Keeping data separate avoids storing the same customer info duplicated on every order row.",
        "This directly ties back to normalization's goal of avoiding redundancy.",
      ],
      solution_summary: "Separate tables avoid redundantly duplicating customer information on every single order row; a join brings the two back together only when needed.",
      key_concepts: ["join", "normalization", "redundancy"],
    },
    {
      id: "joins_jv3",
      type: "match",
      prompt: "Match each join-related term to its meaning.",
      left: ["Join", "Foreign key", "Inner join", "Shared key"],
      right: ["An operation combining rows from two or more tables", "A column referencing a row in another table", "Returns only rows with matches in both tables", "The common value used to match rows across tables"],
      correct_pairs: [
        ["Join", "An operation combining rows from two or more tables"],
        ["Foreign key", "A column referencing a row in another table"],
        ["Inner join", "Returns only rows with matches in both tables"],
        ["Shared key", "The common value used to match rows across tables"],
      ],
      hints: [
        "A foreign key is what makes a join between two tables possible in the first place.",
        "An inner join is one specific kind of join, excluding unmatched rows.",
      ],
      solution_summary: "A join combines rows from multiple tables, a foreign key references another table's row, an inner join returns only matched rows, and a shared key is the value used to match them.",
      key_concepts: ["join", "foreign key", "inner join"],
    },
  ],
  indexes: [
    {
      id: "indexes_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a database index speeds up a lookup.",
      shuffled_items: [
        "Without an index, the database would scan every row one at a time.",
        "A table grows to contain a large number of rows.",
        "An index is created on the column commonly searched, such as email.",
        "A query searching by email uses the index to jump directly to matching rows.",
      ],
      items: [
        "A table grows to contain a large number of rows.",
        "Without an index, the database would scan every row one at a time.",
        "An index is created on the column commonly searched, such as email.",
        "A query searching by email uses the index to jump directly to matching rows.",
      ],
      hints: [
        "The scanning problem exists before an index is introduced to solve it.",
        "The index must be created before a query can actually use it.",
      ],
      solution_summary: "A table grows large → scanning every row becomes slow → an index is created on a commonly searched column → queries use the index to jump directly to matches.",
      key_concepts: ["index", "database performance", "lookup"],
    },
    {
      id: "indexes_jv2",
      type: "choice",
      prompt: "What is the purpose of a database index, based on the textbook-index analogy?",
      options: [
        "To physically reorder every row in the table permanently",
        "To let the database find matching rows directly without scanning every row",
        "To prevent the table from ever being searched",
        "To delete rows that are rarely accessed",
      ],
      correct_index: 1,
      hints: [
        "A textbook index lets you jump straight to a page without reading the whole book.",
        "The goal is faster lookups, not reordering or deleting data.",
      ],
      solution_summary: "A database index lets the database find matching rows directly and quickly, without scanning the entire table row by row.",
      key_concepts: ["index", "database performance"],
    },
    {
      id: "indexes_jv3",
      type: "match",
      prompt: "Match each indexing concept to its description.",
      left: ["Index", "Indexed column", "Full table scan", "Lookup speed"],
      right: ["A separate structure enabling fast row lookup", "A column an index has been built on", "Checking every row one at a time without an index", "What an index is primarily built to improve"],
      correct_pairs: [
        ["Index", "A separate structure enabling fast row lookup"],
        ["Indexed column", "A column an index has been built on"],
        ["Full table scan", "Checking every row one at a time without an index"],
        ["Lookup speed", "What an index is primarily built to improve"],
      ],
      hints: [
        "An index only helps queries filtering on the specific column it was built for.",
        "A full table scan is exactly what an index is meant to avoid.",
      ],
      solution_summary: "An index is a structure enabling fast lookup, built on a specific indexed column, avoiding a full table scan, and improving lookup speed.",
      key_concepts: ["index", "database performance"],
    },
  ],
  acid_properties_transactions: [
    {
      id: "acid_properties_transactions_jv1",
      type: "order",
      prompt: "Put these steps in order to describe how a bank transfer transaction behaves under ACID guarantees.",
      shuffled_items: [
        "The database subtracts the amount from the sender's account.",
        "A transaction begins, bundling both steps of the transfer together.",
        "If the system crashes before both steps finish, the entire transaction is rolled back.",
        "The database adds the amount to the receiver's account.",
      ],
      items: [
        "A transaction begins, bundling both steps of the transfer together.",
        "The database subtracts the amount from the sender's account.",
        "The database adds the amount to the receiver's account.",
        "If the system crashes before both steps finish, the entire transaction is rolled back.",
      ],
      hints: [
        "The transaction must begin before either individual step is performed.",
        "A crash mid-transaction is handled by undoing everything, not by leaving it half-done.",
      ],
      solution_summary: "A transaction begins bundling both steps → money is subtracted from the sender → money is added to the receiver → a crash mid-way rolls back the entire transaction.",
      key_concepts: ["transaction", "ACID", "atomicity"],
    },
    {
      id: "acid_properties_transactions_jv2",
      type: "choice",
      prompt: "Why does a bank transfer need to be wrapped in a single transaction, according to the two-step transfer example?",
      options: [
        "So the transfer runs faster than two separate operations",
        "So that a crash between the two steps can't cause money to vanish or be duplicated",
        "So that only one account can ever be modified at a time in the whole database",
        "Because SQL requires every operation to be part of a transaction",
      ],
      correct_index: 1,
      hints: [
        "The two steps (subtract, add) must succeed or fail together as one unit.",
        "Atomicity is the ACID property guaranteeing all-or-nothing execution.",
      ],
      solution_summary: "Wrapping both steps in one transaction guarantees they succeed or fail together, so a mid-transfer crash can't make money vanish or be duplicated.",
      key_concepts: ["transaction", "ACID", "atomicity"],
    },
    {
      id: "acid_properties_transactions_jv3",
      type: "match",
      prompt: "Match each ACID property to what it guarantees.",
      left: ["Atomicity", "Consistency", "Isolation", "Durability"],
      right: ["All steps in a transaction succeed or none of them do", "The database moves from one valid state to another valid state", "Concurrent transactions don't interfere with each other", "Once committed, a transaction's changes survive a crash"],
      correct_pairs: [
        ["Atomicity", "All steps in a transaction succeed or none of them do"],
        ["Consistency", "The database moves from one valid state to another valid state"],
        ["Isolation", "Concurrent transactions don't interfere with each other"],
        ["Durability", "Once committed, a transaction's changes survive a crash"],
      ],
      hints: [
        "Atomicity is the all-or-nothing guarantee; durability is about surviving crashes after commit.",
        "Isolation concerns transactions running at the same time as each other.",
      ],
      solution_summary: "Atomicity guarantees all-or-nothing, consistency guarantees valid states, isolation guarantees concurrent transactions don't interfere, and durability guarantees committed changes survive a crash.",
      key_concepts: ["ACID", "transaction", "atomicity", "durability"],
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
