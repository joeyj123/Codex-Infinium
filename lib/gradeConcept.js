// Offline grading for the three no-code Anvil mechanics used by Novice
// content: order (reorder-a-process), choice (spot-the-wrong-concept /
// predict-the-outcome, both single-select multiple choice), and match
// (match/build-the-system pairing). Unlike lib/gradeCode.js, there's no
// execution involved — these compare learner selections directly against
// authored answer keys, so grading is exact rather than fuzzy.

import { GRADE_TIERS, GRADE_TIER_LABELS } from "./grading";

function tierFromFraction(fraction) {
  let tier = GRADE_TIERS.NEEDS_REVIEW;
  if (fraction >= 0.999) tier = GRADE_TIERS.STRONG;
  else if (fraction >= 0.5) tier = GRADE_TIERS.PARTIAL;
  return { tier, label: GRADE_TIER_LABELS[tier], fraction };
}

// `arranged` is the learner's current arrangement (array of strings);
// `correct` is the authored correct-order array of the same strings.
export function gradeOrder(arranged, correct) {
  const correctCount = arranged.reduce((acc, val, pos) => acc + (val === correct[pos] ? 1 : 0), 0);
  return tierFromFraction(correct.length === 0 ? 0 : correctCount / correct.length);
}

// `selectedIndex` is the option the learner picked; `correctIndex` is the
// authored answer key.
export function gradeChoice(selectedIndex, correctIndex) {
  return tierFromFraction(selectedIndex === correctIndex ? 1 : 0);
}

// `assignments` is an array (one entry per left-side pair item) holding the
// index into the shuffled right-side options the learner assigned to it.
// `correctAssignments` is the authored answer key in the same shape.
export function gradeMatch(assignments, correctAssignments) {
  const total = correctAssignments.length;
  const correctCount = assignments.reduce(
    (acc, val, i) => acc + (val === correctAssignments[i] ? 1 : 0),
    0
  );
  return tierFromFraction(total === 0 ? 0 : correctCount / total);
}
