// Offline, client-side answer grading for The Forge. No AI, no network call —
// this is pattern-matching against authored content (key_concepts + answer_bank),
// not real understanding-checking. That's an accepted tradeoff (see The Chronicle,
// "Forge A2") in exchange for staying free and infrastructure-free forever.

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "then", "than", "so", "because",
  "of", "in", "on", "at", "to", "for", "with", "without", "from", "by", "as",
  "is", "are", "was", "were", "be", "been", "being", "am",
  "it", "its", "this", "that", "these", "those", "there", "here",
  "you", "your", "yours", "i", "we", "our", "ours", "they", "their", "he", "she",
  "him", "her", "his", "them", "which", "what", "who", "whom", "when", "where",
  "how", "why", "not", "no", "do", "does", "did", "doing", "can", "could",
  "would", "should", "will", "shall", "may", "might", "must", "have", "has",
  "had", "having", "into", "out", "up", "down", "over", "under", "again",
  "just", "also", "very", "more", "most", "some", "any", "each", "other",
  "such", "only", "own", "same", "too", "s", "t", "one", "two", "basically",
]);

// A small, intentionally non-exhaustive synonym map for common novice-CS
// vocabulary, so an answer that says "processor" instead of "CPU" isn't
// penalized just for using different (but equally correct) wording.
const SYNONYMS = {
  cpu: ["processor", "central processing unit"],
  processor: ["cpu", "central processing unit"],
  ram: ["memory", "random access memory"],
  memory: ["ram"],
  storage: ["disk", "hard drive", "hard disk", "ssd"],
  disk: ["storage", "hard drive", "hard disk", "ssd"],
  software: ["program", "application", "app", "code"],
  program: ["software", "application", "app", "code"],
  hardware: ["device", "component", "machine"],
  input: ["data entering", "incoming data"],
  output: ["result", "response"],
  network: ["internet", "connection"],
  internet: ["network", "web"],
  binary: ["bits", "ones and zeros", "1s and 0s"],
  bit: ["binary digit"],
  os: ["operating system"],
  operating: ["os"],
  cli: ["command line", "terminal", "command prompt"],
  terminal: ["cli", "command line", "command prompt"],
  firmware: ["bios", "embedded software"],
  bios: ["firmware"],
  general_purpose: ["general purpose", "multi purpose", "reprogrammable"],
};

function normalize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0 && !STOPWORDS.has(w));
}

function jaccardSimilarity(wordsA, wordsB) {
  const setA = new Set(wordsA);
  const setB = new Set(wordsB);
  if (setA.size === 0 || setB.size === 0) return 0;
  let intersection = 0;
  setA.forEach((w) => {
    if (setB.has(w)) intersection += 1;
  });
  const unionSize = new Set([...setA, ...setB]).size;
  return unionSize === 0 ? 0 : intersection / unionSize;
}

function conceptWords(concept) {
  return normalize(concept.replace(/[-/]/g, " "));
}

function synonymsFor(word) {
  return SYNONYMS[word] || [];
}

// Returns true if every significant word of the concept shows up in the
// answer (directly or via a known synonym) — a loose "did they touch on
// this idea at all" check, not exact-phrase matching.
function conceptPresent(concept, answerWords) {
  const answerSet = new Set(answerWords);
  const words = conceptWords(concept);
  if (words.length === 0) return false;
  return words.every((w) => {
    if (answerSet.has(w)) return true;
    const syns = synonymsFor(w);
    return syns.some((syn) => normalize(syn).every((sw) => answerSet.has(sw)));
  });
}

export function conceptCoverage(answerText, keyConcepts) {
  if (!keyConcepts || keyConcepts.length === 0) return 0;
  const answerWords = normalize(answerText);
  if (answerWords.length === 0) return 0;
  const hits = keyConcepts.filter((c) => conceptPresent(c, answerWords)).length;
  return hits / keyConcepts.length;
}

export function bestAnswerBankSimilarity(answerText, answerBank) {
  if (!answerBank || answerBank.length === 0) return 0;
  const answerWords = normalize(answerText);
  if (answerWords.length === 0) return 0;
  let best = 0;
  answerBank.forEach((candidate) => {
    const score = jaccardSimilarity(answerWords, normalize(candidate));
    if (score > best) best = score;
  });
  return best;
}

export const GRADE_TIERS = {
  STRONG: "strong",
  PARTIAL: "partial",
  NEEDS_REVIEW: "needs_review",
};

export const GRADE_TIER_LABELS = {
  [GRADE_TIERS.STRONG]: "Strong match",
  [GRADE_TIERS.PARTIAL]: "Partial match",
  [GRADE_TIERS.NEEDS_REVIEW]: "Needs review",
};

// Combined score weights concept coverage and best-match similarity evenly —
// an answer can earn a Strong match either by naming the right ideas or by
// closely echoing a phrasing from the answer bank, since both are reasonable
// signs of a correct answer.
const STRONG_THRESHOLD = 0.55;
const PARTIAL_THRESHOLD = 0.28;

export function gradeAnswer(answerText, example) {
  const coverage = conceptCoverage(answerText, example.key_concepts);
  const similarity = bestAnswerBankSimilarity(answerText, example.answer_bank);
  const combined = coverage * 0.5 + similarity * 0.5;

  let tier = GRADE_TIERS.NEEDS_REVIEW;
  if (combined >= STRONG_THRESHOLD) tier = GRADE_TIERS.STRONG;
  else if (combined >= PARTIAL_THRESHOLD) tier = GRADE_TIERS.PARTIAL;

  return {
    tier,
    label: GRADE_TIER_LABELS[tier],
    coverage,
    similarity,
    combined,
  };
}
