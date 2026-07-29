// Batch 4: serialization (data closer), classes_objects, attributes_properties,
// methods, inheritance, encapsulation (OOP section, full), pure_functions,
// first_class_functions, map_filter_reduce (functional section, full),
// what_is_git (git section opener).
//
// classes_objects onward is the first point real Python `class` syntax is
// available, so those 5 OOP topics use genuine, executing class-based code
// (unlike linked_lists/hash_tables_internals in batch 3, authored before
// classes existed). encapsulation uses Python's single-underscore naming
// convention plus manual getter/setter methods, not @property decorators
// (not yet taught). serialization uses `import json` (json.dumps/loads),
// the first real use of the json module now that the concept is the
// explicit topic. pure_functions/first_class_functions/map_filter_reduce
// use real functions, lambdas, and (for reduce) `import functools`.
// what_is_git has no executable Git commands, so it stays print()-narration
// like other purely conceptual topics (survey_javascript, what_is_json).
const fs = require("fs");
const path = require("path");

const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const raw = fs.readFileSync(KB_PATH, "utf8");
const kb = JSON.parse(raw);
const app = kb.tiers.find((t) => t.id === "apprentice");

const CONTENT = {
  serialization: [
    {
      id: "serialization_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. json.dumps() serializes a Python dictionary into a JSON text string.",
      snippet_code: "import json\ndata = {'name': 'Maria', 'age': 34}\nprint(json.dumps(data))",
      solution_code: "import json\ndata = {'name': 'Maria', 'age': 34}\nprint(json.dumps(data))",
      expected_output: '{"name": "Maria", "age": 34}',
      hints: [
        "json.dumps() converts an in-memory Python dict into a JSON-formatted string.",
        "The keys and values print using JSON's double-quote convention, not Python's original single quotes.",
      ],
      solution_summary: "json.dumps() serializes the dict into a JSON string, using JSON's own double-quote convention.",
      key_concepts: ["serialization", "json.dumps"],
    },
    {
      id: "serialization_ac2",
      type: "fix",
      prompt:
        "This is supposed to deserialize a JSON string back into a usable Python dict and read its name field, but it calls dumps() (serialize) instead of loads() (deserialize). Fix it.",
      buggy_code: "import json\ntext = '{\"name\": \"Rex\"}'\ndata = json.dumps(text)\nprint(data['name'])",
      solution_code: "import json\ntext = '{\"name\": \"Rex\"}'\ndata = json.loads(text)\nprint(data['name'])",
      expected_output: "Rex",
      hints: [
        "dumps() serializes a Python object into a JSON string; loads() deserializes a JSON string back into a Python object.",
        "text is already a JSON string, so it needs loads(), not dumps().",
      ],
      solution_summary: "dumps() goes from Python to JSON text; loads() goes the reverse direction, from JSON text back to a usable Python dict.",
      key_concepts: ["deserialization", "json.loads"],
    },
    {
      id: "serialization_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the full serialization round trip.",
      shuffled_lines: [
        "print('That portable format is stored on disk or transmitted across a network')",
        "print('A program\\'s in-memory data structure gets converted into a portable format like JSON')",
        "print('Deserialization reconstructs that data back into a native, usable structure again')",
      ],
      solution_code:
        "print('A program\\'s in-memory data structure gets converted into a portable format like JSON')\n\nprint('That portable format is stored on disk or transmitted across a network')\n\nprint('Deserialization reconstructs that data back into a native, usable structure again')",
      expected_output:
        "A program's in-memory data structure gets converted into a portable format like JSON\nThat portable format is stored on disk or transmitted across a network\nDeserialization reconstructs that data back into a native, usable structure again",
      hints: [
        "Serialization has to happen before the data can be stored or transmitted.",
        "Deserialization is the reverse step, reconstructing usable data afterward.",
      ],
      solution_summary:
        "Serialization converts in-memory data into a portable format, that format is stored or sent, and deserialization reconstructs it back into usable data.",
      key_concepts: ["serialization", "deserialization"],
    },
  ],

  classes_objects: [
    {
      id: "classes_objects_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog('Rex')\nprint(my_dog.name)",
      solution_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\nmy_dog = Dog('Rex')\nprint(my_dog.name)",
      expected_output: "Rex",
      hints: [
        "__init__ is the constructor, run automatically when Dog('Rex') creates a new object.",
        "It sets self.name to whatever was passed in, so my_dog.name holds 'Rex'.",
      ],
      solution_summary: "Dog('Rex') runs the constructor, storing 'Rex' as that object's own name attribute.",
      key_concepts: ["class", "object", "constructor"],
    },
    {
      id: "classes_objects_ac2",
      type: "fix",
      prompt:
        "This is supposed to create two independent Dog objects with their own separate names, but changing one's name is wrongly expected to change the other too — that's not how separate object instances work. Fix the assertion by printing both names correctly instead.",
      buggy_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog_a = Dog('Rex')\ndog_b = Dog('Fido')\ndog_a.name = 'Max'\nprint(dog_a.name)\nprint(dog_a.name)",
      solution_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\ndog_a = Dog('Rex')\ndog_b = Dog('Fido')\ndog_a.name = 'Max'\nprint(dog_a.name)\nprint(dog_b.name)",
      expected_output: "Max\nFido",
      hints: [
        "dog_a and dog_b are two separate objects, each with its own separate memory.",
        "Changing dog_a.name has zero effect on dog_b.name — print dog_b.name for the second line, not dog_a.name again.",
      ],
      solution_summary: "Each object created from a class has its own independent memory, so changing dog_a's name never affects dog_b's.",
      key_concepts: ["object", "instance", "independent memory"],
    },
    {
      id: "classes_objects_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate the relationship between a class and an object.",
      shuffled_lines: [
        "print('An object is one specific, actual thing created from that blueprint')",
        "print('A class is a blueprint defining what data and behavior its objects will have')",
        "print('Each object created from the class gets its own separate, dedicated memory')",
      ],
      solution_code:
        "print('A class is a blueprint defining what data and behavior its objects will have')\n\nprint('An object is one specific, actual thing created from that blueprint')\n\nprint('Each object created from the class gets its own separate, dedicated memory')",
      expected_output:
        "A class is a blueprint defining what data and behavior its objects will have\nAn object is one specific, actual thing created from that blueprint\nEach object created from the class gets its own separate, dedicated memory",
      hints: [
        "The blueprint (class) has to be defined before any object can be created from it.",
        "The separate-memory detail is a consequence of instantiation, so it comes last.",
      ],
      solution_summary: "A class is a blueprint; an object is a specific thing built from it, with its own dedicated memory.",
      key_concepts: ["class", "object", "instantiation"],
    },
  ],

  attributes_properties: [
    {
      id: "attributes_properties_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nmy_dog = Dog('Rex', 3)\nprint(my_dog.name)\nprint(my_dog.age)",
      solution_code: "class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nmy_dog = Dog('Rex', 3)\nprint(my_dog.name)\nprint(my_dog.age)",
      expected_output: "Rex\n3",
      hints: ["Each attribute holds its own value in the object's own dedicated memory."],
      solution_summary: "my_dog.name and my_dog.age each print the value the constructor stored for this specific object.",
      key_concepts: ["attribute", "instance attribute"],
    },
    {
      id: "attributes_properties_ac2",
      type: "fix",
      prompt:
        "This is supposed to give a new Dog a default age of 0 when none is provided, but the default value is missing from the parameter, so calling Dog('Rex') with no age crashes. Fix it.",
      buggy_code: "class Dog:\n    def __init__(self, name, age):\n        self.name = name\n        self.age = age\n\nmy_dog = Dog('Rex')\nprint(my_dog.age)",
      solution_code: "class Dog:\n    def __init__(self, name, age=0):\n        self.name = name\n        self.age = age\n\nmy_dog = Dog('Rex')\nprint(my_dog.age)",
      expected_output: "0",
      hints: [
        "A default value lets a parameter be skipped entirely when the object is created.",
        "Give age a default value of 0 in the constructor's parameter list, directly analogous to a function's own default parameter.",
      ],
      solution_summary: "Adding age=0 as a default parameter value lets Dog('Rex') be created without an age, defaulting to 0.",
      key_concepts: ["attribute", "default value"],
    },
    {
      id: "attributes_properties_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate instance attributes vs. class attributes.",
      shuffled_lines: [
        "print('A class attribute belongs to the class itself, with only one shared copy')",
        "print('An instance attribute belongs to one specific object, with each object holding its own value')",
        "print('Changing a class attribute is visible to every single object sharing that class')",
      ],
      solution_code:
        "print('An instance attribute belongs to one specific object, with each object holding its own value')\n\nprint('A class attribute belongs to the class itself, with only one shared copy')\n\nprint('Changing a class attribute is visible to every single object sharing that class')",
      expected_output:
        "An instance attribute belongs to one specific object, with each object holding its own value\nA class attribute belongs to the class itself, with only one shared copy\nChanging a class attribute is visible to every single object sharing that class",
      hints: [
        "Cover the default, more common case (instance attributes) before the class-attribute contrast.",
        "The shared-visibility consequence follows from there being only one copy, so it comes last.",
      ],
      solution_summary:
        "Instance attributes belong to one object each; class attributes have one shared copy, so changing one is visible to every object.",
      key_concepts: ["instance attribute", "class attribute"],
    },
  ],

  methods: [
    {
      id: "methods_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. self refers to the specific object the method was called on.",
      snippet_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return self.name + ' says woof'\n\nmy_dog = Dog('Rex')\nprint(my_dog.bark())",
      solution_code: "class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return self.name + ' says woof'\n\nmy_dog = Dog('Rex')\nprint(my_dog.bark())",
      expected_output: "Rex says woof",
      hints: [
        "Calling my_dog.bark() automatically passes my_dog in as self.",
        "self.name inside bark() refers to my_dog's own name, 'Rex'.",
      ],
      solution_summary: "bark() uses self.name to access the specific calling object's own attribute, producing 'Rex says woof'.",
      key_concepts: ["method", "self"],
    },
    {
      id: "methods_ac2",
      type: "fix",
      prompt: "This method is supposed to increase a Dog's own age by one, but it forgets to reference self, so it never actually changes the object's own attribute. Fix it.",
      buggy_code: "class Dog:\n    def __init__(self, age):\n        self.age = age\n\n    def have_birthday(self):\n        age = age + 1\n\nmy_dog = Dog(3)\nmy_dog.have_birthday()\nprint(my_dog.age)",
      solution_code: "class Dog:\n    def __init__(self, age):\n        self.age = age\n\n    def have_birthday(self):\n        self.age = self.age + 1\n\nmy_dog = Dog(3)\nmy_dog.have_birthday()\nprint(my_dog.age)",
      expected_output: "4",
      hints: [
        "age alone refers to nothing defined in this method's scope — the attribute is self.age.",
        "Read and write self.age, not a bare, undefined age.",
      ],
      solution_summary: "The method must read and write self.age to actually change the calling object's own attribute, not a bare undefined name.",
      key_concepts: ["method", "self", "mutating an attribute"],
    },
    {
      id: "methods_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how a method call actually works.",
      shuffled_lines: [
        "print('Calling my_dog.bark() runs that method\\'s own code')",
        "print('self lets the method\\'s code read or modify that specific object\\'s own attributes')",
        "print('The method automatically receives a reference to the object it was called on, as self')",
      ],
      solution_code:
        "print('Calling my_dog.bark() runs that method\\'s own code')\n\nprint('The method automatically receives a reference to the object it was called on, as self')\n\nprint('self lets the method\\'s code read or modify that specific object\\'s own attributes')",
      expected_output:
        "Calling my_dog.bark() runs that method's own code\nThe method automatically receives a reference to the object it was called on, as self\nself lets the method's code read or modify that specific object's own attributes",
      hints: [
        "The call itself has to happen before self is received.",
        "What self actually enables (reading/modifying attributes) is the payoff, so it comes last.",
      ],
      solution_summary: "Calling a method runs its code and automatically passes self, the calling object, letting that code read or modify its attributes.",
      key_concepts: ["method", "self"],
    },
  ],

  inheritance: [
    {
      id: "inheritance_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. Manager extends Employee, inheriting its attributes and methods.",
      snippet_code: "class Employee:\n    def __init__(self, name):\n        self.name = name\n\n    def describe(self):\n        return self.name + ' is an employee'\n\nclass Manager(Employee):\n    pass\n\nm = Manager('Ana')\nprint(m.describe())",
      solution_code: "class Employee:\n    def __init__(self, name):\n        self.name = name\n\n    def describe(self):\n        return self.name + ' is an employee'\n\nclass Manager(Employee):\n    pass\n\nm = Manager('Ana')\nprint(m.describe())",
      expected_output: "Ana is an employee",
      hints: [
        "class Manager(Employee) makes Manager a subclass, automatically receiving Employee's own methods.",
        "Manager doesn't define its own describe(), so it uses Employee's own inherited version.",
      ],
      solution_summary: "Manager inherits describe() and __init__ directly from Employee, so m.describe() runs Employee's own logic.",
      key_concepts: ["inheritance", "subclass", "superclass"],
    },
    {
      id: "inheritance_ac2",
      type: "fix",
      prompt:
        "This is supposed to have Manager override describe() with its own more specific version, but Manager was never actually declared as a subclass of Employee, so the wrong version runs. Fix it.",
      buggy_code: "class Employee:\n    def describe(self):\n        return 'a regular employee'\n\nclass Manager:\n    def describe(self):\n        return 'a manager, overriding the base version'\n\nm = Manager()\nprint(m.describe())",
      solution_code: "class Employee:\n    def describe(self):\n        return 'a regular employee'\n\nclass Manager(Employee):\n    def describe(self):\n        return 'a manager, overriding the base version'\n\nm = Manager()\nprint(m.describe())",
      expected_output: "a manager, overriding the base version",
      hints: [
        "class Manager: with no parentheses means Manager doesn't actually inherit from Employee at all.",
        "Write class Manager(Employee): to make Manager a genuine subclass.",
      ],
      solution_summary:
        "Manager wasn't declared as a subclass of Employee at all; adding (Employee) makes the inheritance relationship real, so the override applies correctly.",
      key_concepts: ["inheritance", "method overriding"],
    },
    {
      id: "inheritance_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate how inheritance and overriding work together.",
      shuffled_lines: [
        "print('A subclass automatically receives every attribute and method its superclass defines')",
        "print('A subclass can define its own version of an inherited method, called overriding')",
        "print('Calling that method on a subclass object runs the subclass\\'s own overriding version')",
      ],
      solution_code:
        "print('A subclass automatically receives every attribute and method its superclass defines')\n\nprint('A subclass can define its own version of an inherited method, called overriding')\n\nprint('Calling that method on a subclass object runs the subclass\\'s own overriding version')",
      expected_output:
        "A subclass automatically receives every attribute and method its superclass defines\nA subclass can define its own version of an inherited method, called overriding\nCalling that method on a subclass object runs the subclass's own overriding version",
      hints: [
        "Inheritance itself has to be established before overriding makes sense.",
        "The actual runtime effect of overriding is the payoff, so it comes last.",
      ],
      solution_summary: "A subclass inherits everything from its superclass, can override an inherited method, and calling it runs that overriding version.",
      key_concepts: ["inheritance", "method overriding"],
    },
  ],

  encapsulation: [
    {
      id: "encapsulation_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. balance is treated as private by convention (a leading underscore), accessed only through the withdraw method.",
      snippet_code: "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    def withdraw(self, amount):\n        if amount <= self._balance:\n            self._balance = self._balance - amount\n        return self._balance\n\naccount = BankAccount(100)\nprint(account.withdraw(30))",
      solution_code: "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    def withdraw(self, amount):\n        if amount <= self._balance:\n            self._balance = self._balance - amount\n        return self._balance\n\naccount = BankAccount(100)\nprint(account.withdraw(30))",
      expected_output: "70",
      hints: [
        "withdraw checks that amount doesn't exceed the current balance before changing it.",
        "100 minus 30 is 70, and the method returns the new balance.",
      ],
      solution_summary: "withdraw(30) passes the sufficient-funds check and returns the updated balance, 70.",
      key_concepts: ["encapsulation", "getter/setter-style method"],
    },
    {
      id: "encapsulation_ac2",
      type: "fix",
      prompt:
        "This withdraw method is supposed to enforce that a balance never goes negative, but it's missing the sufficient-funds check entirely, letting a withdrawal larger than the balance succeed anyway. Fix it.",
      buggy_code: "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    def withdraw(self, amount):\n        self._balance = self._balance - amount\n        return self._balance\n\naccount = BankAccount(100)\nprint(account.withdraw(500))",
      solution_code: "class BankAccount:\n    def __init__(self, balance):\n        self._balance = balance\n\n    def withdraw(self, amount):\n        if amount <= self._balance:\n            self._balance = self._balance - amount\n        return self._balance\n\naccount = BankAccount(100)\nprint(account.withdraw(500))",
      expected_output: "100",
      hints: [
        "Add a check that amount doesn't exceed self._balance before changing it.",
        "If the check fails, the balance should stay unchanged and still be returned as-is.",
      ],
      solution_summary:
        "Without the sufficient-funds check, withdrawing more than the balance held was allowed anyway — adding the check keeps balance at 100 for an invalid withdrawal.",
      key_concepts: ["encapsulation", "validation"],
    },
    {
      id: "encapsulation_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate why encapsulation matters.",
      shuffled_lines: [
        "print('A class instead exposes only a controlled set of methods to interact with that data')",
        "print('Encapsulation keeps an object\\'s own internal data hidden or deliberately restricted')",
        "print('This lets a class reliably enforce rules, like a balance never going negative')",
      ],
      solution_code:
        "print('Encapsulation keeps an object\\'s own internal data hidden or deliberately restricted')\n\nprint('A class instead exposes only a controlled set of methods to interact with that data')\n\nprint('This lets a class reliably enforce rules, like a balance never going negative')",
      expected_output:
        "Encapsulation keeps an object's own internal data hidden or deliberately restricted\nA class instead exposes only a controlled set of methods to interact with that data\nThis lets a class reliably enforce rules, like a balance never going negative",
      hints: [
        "Define encapsulation itself before naming the controlled-methods mechanism it uses.",
        "The rule-enforcement payoff is the conclusion, so it comes last.",
      ],
      solution_summary: "Encapsulation restricts direct access to data, exposing only controlled methods, which lets a class reliably enforce its own rules.",
      key_concepts: ["encapsulation"],
    },
  ],

  pure_functions: [
    {
      id: "pure_functions_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. double() is pure: its output depends only on its input, with no outside state touched.",
      snippet_code: "def double(x):\n    return x * 2\n\nprint(double(5))\nprint(double(5))",
      solution_code: "def double(x):\n    return x * 2\n\nprint(double(5))\nprint(double(5))",
      expected_output: "10\n10",
      hints: ["A pure function called with the identical input always produces the identical output, every single time."],
      solution_summary: "double(5) reliably returns 10 both times, since a pure function's output depends only on its input.",
      key_concepts: ["pure function", "referential transparency"],
    },
    {
      id: "pure_functions_ac2",
      type: "fix",
      prompt:
        "This function is supposed to be pure, simply returning a new total without changing anything outside itself, but it mutates the external running_total list as a side effect. Fix it so it only returns the result.",
      buggy_code: "running_total = [0]\n\ndef add(x, y):\n    running_total[0] = x + y\n    return running_total[0]\n\nprint(add(2, 3))\nprint(running_total[0])",
      solution_code: "def add(x, y):\n    return x + y\n\nprint(add(2, 3))",
      expected_output: "5",
      hints: [
        "A pure function shouldn't touch anything outside its own input and return value.",
        "Remove the running_total list entirely and just return x + y directly.",
      ],
      solution_summary: "The original version mutated an external list as a side effect — a pure version simply computes and returns the result, touching nothing else.",
      key_concepts: ["pure function", "side effect"],
    },
    {
      id: "pure_functions_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what makes a function pure.",
      shuffled_lines: [
        "print('Calling it with the identical input always produces the identical output')",
        "print('A pure function\\'s output depends only on its given input')",
        "print('It has zero observable side effects on anything outside itself')",
      ],
      solution_code:
        "print('A pure function\\'s output depends only on its given input')\n\nprint('It has zero observable side effects on anything outside itself')\n\nprint('Calling it with the identical input always produces the identical output')",
      expected_output:
        "A pure function's output depends only on its given input\nIt has zero observable side effects on anything outside itself\nCalling it with the identical input always produces the identical output",
      hints: [
        "State the input-only dependency first, then the no-side-effects property.",
        "The reliable-repeatability consequence follows from both, so it comes last.",
      ],
      solution_summary: "A pure function depends only on its input, has no side effects, and therefore always returns the same output for the same input.",
      key_concepts: ["pure function"],
    },
  ],

  first_class_functions: [
    {
      id: "first_class_functions_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. Assigning a function to a variable is only possible because functions are first-class values here.",
      snippet_code: "def double(x):\n    return x * 2\n\nmy_func = double\nprint(my_func(5))",
      solution_code: "def double(x):\n    return x * 2\n\nmy_func = double\nprint(my_func(5))",
      expected_output: "10",
      hints: [
        "my_func = double assigns the function itself to a new variable, not the result of calling it.",
        "my_func(5) calls that same function, exactly like double(5) would.",
      ],
      solution_summary: "my_func now refers to the same function double does, so my_func(5) returns 10, identical to double(5).",
      key_concepts: ["first-class function"],
    },
    {
      id: "first_class_functions_ac2",
      type: "fix",
      prompt:
        "This is supposed to pass the square function into apply_twice as an argument, but it accidentally calls square() first, passing its returned number instead of the function itself. Fix it.",
      buggy_code: "def square(x):\n    return x * x\n\ndef apply_twice(func, value):\n    return func(func(value))\n\nprint(apply_twice(square(), 3))",
      solution_code: "def square(x):\n    return x * x\n\ndef apply_twice(func, value):\n    return func(func(value))\n\nprint(apply_twice(square, 3))",
      expected_output: "81",
      hints: [
        "square() with parentheses calls the function immediately; square without them passes the function itself.",
        "apply_twice needs the function itself as its first argument, not the result of already calling it.",
      ],
      solution_summary: "Passing square (no parentheses) hands the function itself to apply_twice, which then calls it twice: 3 squared is 9, 9 squared is 81.",
      key_concepts: ["first-class function", "higher-order function"],
    },
    {
      id: "first_class_functions_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what first-class functions make possible.",
      shuffled_lines: [
        "print('A higher-order function is one that accepts or returns another function')",
        "print('A language supports first-class functions when functions can be assigned, passed, or returned like any other value')",
        "print('Without first-class functions, no function could ever meaningfully accept another function as an argument')",
      ],
      solution_code:
        "print('A language supports first-class functions when functions can be assigned, passed, or returned like any other value')\n\nprint('A higher-order function is one that accepts or returns another function')\n\nprint('Without first-class functions, no function could ever meaningfully accept another function as an argument')",
      expected_output:
        "A language supports first-class functions when functions can be assigned, passed, or returned like any other value\nA higher-order function is one that accepts or returns another function\nWithout first-class functions, no function could ever meaningfully accept another function as an argument",
      hints: [
        "Define first-class functions before naming the higher-order-function concept they enable.",
        "The dependency conclusion (why higher-order functions need first-class functions) comes last.",
      ],
      solution_summary: "First-class functions can be assigned, passed, and returned like any value, which is exactly what makes higher-order functions possible.",
      key_concepts: ["first-class function", "higher-order function"],
    },
  ],

  map_filter_reduce: [
    {
      id: "map_filter_reduce_ac1",
      type: "output",
      prompt: "Trace this code and type exactly what it prints. map() applies a function to every item, producing a new collection of the results.",
      snippet_code: "def double(x):\n    return x * 2\n\nresult = list(map(double, [1, 2, 3]))\nprint(result)",
      solution_code: "def double(x):\n    return x * 2\n\nresult = list(map(double, [1, 2, 3]))\nprint(result)",
      expected_output: "[2, 4, 6]",
      hints: ["map(double, [1, 2, 3]) applies double to each item, producing 2, 4, and 6."],
      solution_summary: "map applies double to every item in [1, 2, 3], producing [2, 4, 6], with the original list left untouched.",
      key_concepts: ["map", "higher-order function"],
    },
    {
      id: "map_filter_reduce_ac2",
      type: "fix",
      prompt:
        "This is supposed to filter a list down to only its even numbers, but is_even() has its logic backwards, keeping the odd numbers instead. Fix it.",
      buggy_code: "def is_even(x):\n    return x % 2 != 0\n\nresult = list(filter(is_even, [1, 2, 3, 4]))\nprint(result)",
      solution_code: "def is_even(x):\n    return x % 2 == 0\n\nresult = list(filter(is_even, [1, 2, 3, 4]))\nprint(result)",
      expected_output: "[2, 4]",
      hints: [
        "filter() keeps only the items for which the given function returns True.",
        "x % 2 == 0 is true for even numbers; != 0 is true for odd numbers, the opposite of what's wanted.",
      ],
      solution_summary: "is_even's condition was inverted (!= instead of ==) — fixing it to == 0 correctly keeps only the even numbers, [2, 4].",
      key_concepts: ["filter", "higher-order function"],
    },
    {
      id: "map_filter_reduce_ac3",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what map, filter, and reduce each do.",
      shuffled_lines: [
        "print('Filter keeps only the items for which a given function returns true')",
        "print('Map applies a function to every item, producing a new transformed collection')",
        "print('Reduce combines every item down into one single, final combined value')",
      ],
      solution_code:
        "print('Map applies a function to every item, producing a new transformed collection')\n\nprint('Filter keeps only the items for which a given function returns true')\n\nprint('Reduce combines every item down into one single, final combined value')",
      expected_output:
        "Map applies a function to every item, producing a new transformed collection\nFilter keeps only the items for which a given function returns true\nReduce combines every item down into one single, final combined value",
      hints: [
        "This matches the order the three operations were introduced in the topic itself.",
        "Reduce, the most general of the three, is named last.",
      ],
      solution_summary: "Map transforms every item, filter keeps only matching items, and reduce combines every item into one final value.",
      key_concepts: ["map", "filter", "reduce"],
    },
  ],

  what_is_git: [
    {
      id: "what_is_git_ac1",
      type: "reorder",
      prompt: "Reorder these lines to correctly narrate what Git actually does.",
      shuffled_lines: [
        "print('Git tracks a project\\'s history as an ordered series of deliberately saved snapshots')",
        "print('Git is a version control system tracking every change made to a project\\'s files over time')",
        "print('This lets you revert back to any previous, known-working state if something breaks')",
      ],
      solution_code:
        "print('Git is a version control system tracking every change made to a project\\'s files over time')\n\nprint('Git tracks a project\\'s history as an ordered series of deliberately saved snapshots')\n\nprint('This lets you revert back to any previous, known-working state if something breaks')",
      expected_output:
        "Git is a version control system tracking every change made to a project's files over time\nGit tracks a project's history as an ordered series of deliberately saved snapshots\nThis lets you revert back to any previous, known-working state if something breaks",
      hints: [
        "Define what Git is before naming the specific mechanism (snapshots) it uses.",
        "The practical payoff (reverting safely) is the conclusion, so it comes last.",
      ],
      solution_summary: "Git is a version control system that tracks history as deliberate snapshots, letting you revert to any earlier working state.",
      key_concepts: ["version control", "Git"],
    },
    {
      id: "what_is_git_ac2",
      type: "output",
      prompt: "Trace this code and type exactly what it prints.",
      snippet_code: "print('Git runs entirely locally, with no internet connection required')\nprint('Git only records a new commit when a programmer explicitly chooses to make one')",
      solution_code: "print('Git runs entirely locally, with no internet connection required')\nprint('Git only records a new commit when a programmer explicitly chooses to make one')",
      expected_output: "Git runs entirely locally, with no internet connection required\nGit only records a new commit when a programmer explicitly chooses to make one",
      hints: ["Each print statement executes in order, top to bottom."],
      solution_summary: "Each line prints its own literal text in sequence.",
      key_concepts: ["Git", "local-first design"],
    },
    {
      id: "what_is_git_ac3",
      type: "fix",
      prompt: "Fix the broken syntax below so this fact about Git actually prints.",
      buggy_code: "print('Git and GitHub are not the same underlying thing)",
      solution_code: "print('Git and GitHub are not the same underlying thing')",
      expected_output: "Git and GitHub are not the same underlying thing",
      hints: ["The string literal is missing its closing quote."],
      solution_summary: "The string literal was missing its closing quote.",
      key_concepts: ["syntax error", "Git vs. GitHub"],
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
