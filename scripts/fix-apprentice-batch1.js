const fs = require("fs");
const path = require("path");
const KB_PATH = path.join(__dirname, "..", "data", "knowledge_base.json");
const kb = JSON.parse(fs.readFileSync(KB_PATH, "utf8"));
const t = kb.tiers.find((x) => x.id === "apprentice");

function setExplanation(id, text) {
  const top = t.topics.find((x) => x.id === id);
  top.explanation = text;
}

setExplanation(
  "loops",
  `A conditional lets a program branch once based on a condition; a loop lets a program repeat a block of code, over and over, for as long as some condition holds — the difference between a fork in the road and a track that keeps circling back until a specific point is reached. Loops are what let a program process a thousand items, or a million, using the identical handful of lines of code each time, rather than writing that logic out separately for every single item.

The two most common forms are the while loop and the for loop:

\`\`\`python
count = 0
while count < 3:
    print(count)
    count += 1
# prints: 0, 1, 2 — the loop checks the condition fresh before each pass

for name in ["Ann", "Bo", "Cid"]:
    print(name)
# prints each name in turn, once per item, with no counter to manage by hand
\`\`\`

A while loop repeats its block for as long as its condition — evaluated using the comparison and logical operators from Operators — stays true, checked fresh before each repetition. A for loop is built around a known, countable number of repetitions — "do this once for each item in a list" — bundling the starting point, the continuation condition, and the step forward into one compact structure, which is exactly why the \`for name in [...]\` version above needs no manual counter at all.

Here's the mechanism, tying directly back to conditionals and the fetch-decode-execute cycle. Each pass through a loop's body is, mechanically, the CPU executing that block's instructions, then jumping back to re-evaluate the loop's continuation condition using the identical branching mechanism a conditional statement uses — true, keep going and execute the block again; false, stop looping and continue on to whatever code comes after the loop. A loop is, underneath, really just a conditional combined with an instruction to jump backward in the program's instruction sequence rather than simply falling through to what comes next.

A genuinely costly mistake worth naming directly: an infinite loop is a loop whose continuation condition never actually becomes false. This commonly happens when a loop's condition depends on a variable the loop's own body forgets to update:

\`\`\`python
count = 0
while count < 10:
    print(count)
    # forgot count += 1 — this never stops
\`\`\`

Writing loops correctly means always being certain the loop's own body does something, each pass, that eventually makes the continuation condition false.

This connects directly forward to Functions & Scope, the very next topic: loops are frequently used inside functions to process collections of data. It also connects back to Processes & Threads from Novice: a single-core CPU running a loop is doing real, sequential work, one iteration after another — the exact fetch-decode-execute mechanics already familiar, just repeating the identical instruction sequence rather than moving on to different instructions each cycle.

It's worth naming the off-by-one error directly, since it's the single most common mistake programmers make with loops:

\`\`\`python
items = ["a", "b", "c"]
for i in range(len(items) + 1):   # bug: should be range(len(items))
    print(items[i])                # crashes on the last iteration
\`\`\`

The list has 3 valid positions (0, 1, 2), but \`range(len(items) + 1)\` counts one too many, so the loop tries to read a position that doesn't exist. This mistake is common enough to have its own name specifically because the logic is nearly correct, off by exactly one iteration, which makes it easy to make and often subtle to spot just by reading the code.

A common misconception is assuming a for loop and a while loop are fundamentally different mechanisms rather than two syntactic conveniences for the same underlying idea — a for loop can always be rewritten as an equivalent while loop; the for loop's syntax just bundles setup, condition, and step together for the "repeat a known number of times" case. A second misconception is assuming an infinite loop is always an obvious bug — a subtle one, whose condition almost always becomes false except in one rare edge case, can run correctly the overwhelming majority of the time and only reveal itself under an uncommon input.

A loop is nothing more exotic than a conditional combined with an instruction to jump backward through the program's own instruction sequence — the exact same true/false branching mechanism already covered, simply pointed at itself, repeatedly, until its own condition finally says stop.`
);

setExplanation(
  "linked_lists",
  `Arrays & Lists established that an array's elements sit contiguously — back-to-back, in one unbroken block of memory — which is exactly what makes fast, direct index-based access possible, but it comes with a real cost: inserting a new element anywhere except the very end requires physically shifting every subsequent element over by one position, genuinely expensive for a large array. A linked list solves this specific problem by abandoning contiguous memory entirely.

A linked list is made of individual nodes, where each node holds both a piece of data and a reference pointing to the next node in the sequence. Here's a minimal one in Python:

\`\`\`python
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# build 1 -> 2 -> 3 by hand
head = Node(1)
head.next = Node(2)
head.next.next = Node(3)

# traverse it
current = head
while current is not None:
    print(current.value)
    current = current.next
# prints: 1, 2, 3
\`\`\`

Rather than sitting physically back-to-back in memory the way an array's elements do, a linked list's nodes can live scattered anywhere in memory, connected purely through these \`.next\` pointer references. Traversing means following one reference after another until reaching the final node, whose \`.next\` points at nothing at all (\`None\` in Python), signaling the end of the sequence — exactly what the \`while current is not None\` loop above is checking.

Inserting a new node requires nothing more than updating a small handful of pointer references — the new node's own \`.next\`, and the immediately preceding node's \`.next\`, redirected to point at the new node instead — with zero need to shift any other existing elements, regardless of how large the list has grown. This trades away something else in return: reaching a specific position (element number 47, say) requires following that chain of references one node at a time from the beginning, since there's no equivalent of an array's direct address-plus-offset calculation — a linked list has no true random access.

A doubly linked list extends this by giving each node two references instead of one — a \`.next\` and a \`.prev\` — allowing traversal in either direction, at the cost of each node now storing one additional reference.

This connects directly back to Stacks & Queues: a linked list is frequently the preferred underlying implementation for a queue, since adding to one end and removing from the other are both fast, constant-time pointer operations, while a plain array's equivalent front-removal would require the same costly element-shifting problem this topic opened with.

A common misconception is assuming a linked list is simply a "better" version of an array — it's a genuine tradeoff in both directions: an array's fast, direct index access and better memory-cache performance (from contiguous storage) are real advantages a linked list gives up in exchange for cheap insertion and removal. A second misconception is assuming a linked list's nodes are stored in any meaningful physical order in memory — they can be scattered anywhere at all; the order that matters is purely the logical chain of \`.next\` references connecting them.

A linked list trades an array's fast, direct positional access for fast, cheap insertion and removal anywhere in the sequence, by abandoning contiguous memory entirely and connecting scattered nodes through explicit pointer references instead — no single data structure wins at everything, only at the things it was actually designed for.`
);

setExplanation(
  "data_in_memory",
  `Variables & Data Types deliberately left one question open: when a variable is reassigned, does the original value in memory get physically overwritten, or does something else happen entirely? The answer depends on the data type involved, and understanding why closes the loop back to Novice's Memory Management and RAM vs. Storage in concrete detail.

Here's the distinction, made directly visible:

\`\`\`python
# value type (int) — copying makes a fully independent value
a = 5
b = a
b = 10
print(a)  # 5 — unaffected by changing b

# reference type (list) — copying shares the same underlying data
x = [1, 2, 3]
y = x
y.append(4)
print(x)  # [1, 2, 3, 4] — x sees the change made through y
\`\`\`

A value type (integers, floats, booleans) is typically stored directly at the variable's own memory location — the actual value sits right there, which is why reassigning \`b\` in the example above has zero effect on \`a\`. A reference type (a list, an object, in many languages a string) stores something different at the variable's location: not the data itself, but a reference — the memory address of where the real data actually lives. \`x\` and \`y\` above both hold the identical reference, pointing at the same underlying list, which is exactly why \`.append()\` through \`y\` is visible through \`x\` too.

This is a genuinely common source of confusing bugs for programmers new to a language, precisely because it's invisible from simply reading a variable's name — you can't tell whether you're looking at a value or a reference just by glancing at the variable itself; it depends entirely on the data type involved.

This connects directly forward to Functions & Scope: passing a value type into a function gives it its own independent copy to work with, while passing a reference type gives the function access to the exact same underlying data the calling code is also looking at — meaning changes made inside the function can be visible outside it too.

It's worth naming garbage collection directly, since it resolves a question the reference-type discussion leaves open: once nothing in a program still holds a reference pointing at some piece of data, what happens to that now-unreachable data sitting in memory? Many modern languages (Python included) run a garbage collector in the background, periodically identifying memory no longer reachable through any variable and reclaiming it automatically. Some languages (C, notably) instead require the programmer to manually manage this reclamation.

A related everyday consequence: comparing two variables for equality behaves differently depending on this same distinction.

\`\`\`python
list1 = [1, 2, 3]
list2 = [1, 2, 3]
print(list1 == list2)  # True — Python's == compares contents for lists
print(list1 is list2)  # False — they're two separate objects in memory
\`\`\`

\`==\` checks whether the contents match; \`is\` checks whether both names point at the exact same underlying object — two independently created lists holding identical items are still two genuinely separate pieces of data in memory.

A common misconception is assuming a reference type variable "contains" its data the way a value type does — it genuinely holds a memory address pointing elsewhere, not the data itself. A second misconception is assuming this reference/value split is some obscure, rarely-relevant detail — it directly explains everyday behavior nearly every programmer eventually runs into, like why modifying a list passed into a function sometimes affects the original list outside it, and sometimes doesn't.

Whether a variable stores its actual value directly or merely a reference pointing elsewhere in memory isn't a cosmetic detail — it's a real, physical fact about what's sitting at that variable's own memory address, and it directly determines how copying, comparing, and passing that variable around actually behaves in practice.`
);

fs.writeFileSync(KB_PATH, JSON.stringify(kb, null, 2) + "\n", "utf8");
console.log("Fixed: loops, linked_lists, data_in_memory");
