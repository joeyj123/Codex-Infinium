const fs = require("fs");
const path = require("path");
const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));
const t = kb.tiers.find((x) => x.id === "apprentice");
const top = t.topics.find((x) => x.id === "stacks_queues");

top.explanation = `Stack a pile of plates one on top of another, and the only plate you can actually remove without disturbing the rest is the very top one — the most recently added. Line people up at a checkout counter, and the only person actually being served next is whoever has been waiting the longest — the person at the very front. These two everyday physical patterns are the two foundational data structures this topic covers, and both are directly usable in real code, not just useful mental pictures.

A stack follows LIFO order (Last In, First Out): the most recently added item is always the first one removed. In Python, a plain list already works as a stack — no special class needed:

\`\`\`python
stack = []
stack.append("a")   # push
stack.append("b")
stack.append("c")
print(stack.pop())  # "c" — the most recently added item comes off first
print(stack.pop())  # "b"
print(stack)         # ["a"] — only the first item pushed remains
\`\`\`

\`.append()\` pushes onto the end of the list, and \`.pop()\` (with no argument) removes and returns that same end — both operations touch the same single position, which is exactly what makes this a stack rather than some other structure.

A queue follows the opposite rule, FIFO order (First In, First Out): the earliest-added item is always the first one removed. A plain list can technically do this too (\`.pop(0)\` removes the front item), but that's genuinely inefficient — removing from the front of a list means every remaining item has to shift down one position internally. Python's \`collections.deque\` is built specifically to make both ends fast:

\`\`\`python
from collections import deque
queue = deque()
queue.append("a")   # enqueue
queue.append("b")
queue.append("c")
print(queue.popleft())  # "a" — the first item added comes off first
print(queue.popleft())  # "b"
print(queue)             # deque(["c"])
\`\`\`

Same \`.append()\` to add, but \`.popleft()\` removes from the opposite end instead of \`.pop()\` — that one-line difference between \`pop()\` and \`popleft()\` is the entire practical distinction between using a list as a stack versus a queue.

Here's a mechanism tying this directly back to Functions & Scope, in an example you've already used without naming it: the call stack is a genuine stack in exactly this technical sense. When a function calls another function, that call gets pushed onto the call stack; when it returns, it gets popped back off, and execution resumes at whichever call now sits on top — LIFO order, applied to tracking which function is actually running versus paused waiting on a nested call.

Queues show up constantly in real systems too: a printer handling multiple print jobs processes them in arrival order — first job submitted, first job printed. A web server handling multiple incoming requests commonly does the same, so a request that arrived first genuinely gets handled first rather than in some arbitrary order.

This connects forward to Linked Lists, the next topic: both stacks and queues are frequently implemented using either an array or a linked list as the underlying storage, and a queue in particular benefits from a linked list's strengths there, since removing from the front of a plain array-backed list (like Python's \`.pop(0)\`) is measurably slower than a linked list's equivalent operation — a concrete reason the choice of underlying structure actually matters, not just an abstract one.

It's worth naming one useful hybrid directly: a deque (the same \`collections.deque\` used above) can add and remove from both ends, so it can behave exactly like a stack, exactly like a queue, or as something more flexible than either, depending on which methods a program actually calls.

A common misconception is assuming a stack and a queue are the same basic structure with cosmetic differences — they enforce opposite ordering guarantees, and using \`.pop()\` where you meant \`.popleft()\` produces genuinely wrong output, not just a stylistic difference. A second misconception is assuming these are rare, specialized tools — every function call in every program you'll ever write is already relying on stack behavior via the call stack, whether or not you're consciously thinking about it that way.

The real skill isn't memorizing the definitions — it's recognizing, for a given problem, which single line (\`pop()\` vs \`popleft()\`) actually matches the order the problem needs, and picking \`deque\` over a plain list the moment you're removing from the front.`;

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log("stacks_queues fixed, length:", top.explanation.length);
