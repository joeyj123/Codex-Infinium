// Real, offline correctness grading for Python/JS Forge examples — unlike
// lib/grading.js's prose pattern-matching, this compares actual captured
// program output against an authored expected_output string. A match here
// means the code actually produced the right result, not that the wording
// merely resembled a sample answer.
//
// Returns the same { tier, label, ... } shape as lib/grading.js's
// gradeAnswer() so callers (lib/forgeXp.js, the Forge UI) don't need to
// branch on shape between the two grading paths.

import { GRADE_TIERS, GRADE_TIER_LABELS } from "./grading";

// Whitespace-normalizes output before comparing: trims each line, collapses
// repeated internal whitespace, and drops leading/trailing blank lines, so
// harmless formatting differences (trailing spaces, an extra blank line at
// the end) don't fail an otherwise-correct answer.
function normalizeOutput(text) {
  return (text || "")
    .split("\n")
    .map((line) => line.trim().replace(/\s+/g, " "))
    .filter((line, i, arr) => {
      // Keep interior blank lines (they may be meaningful), only trim
      // leading/trailing blank lines from the whole block.
      const isBlank = line.length === 0;
      if (!isBlank) return true;
      const isEdge = i === 0 || i === arr.length - 1;
      return !isEdge;
    })
    .join("\n");
}

function wordSet(text) {
  return new Set(
    (text || "")
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 0)
  );
}

function jaccard(a, b) {
  if (a.size === 0 || b.size === 0) return 0;
  let intersection = 0;
  a.forEach((w) => {
    if (b.has(w)) intersection += 1;
  });
  const unionSize = new Set([...a, ...b]).size;
  return unionSize === 0 ? 0 : intersection / unionSize;
}

const PARTIAL_THRESHOLD = 0.4;

// `execResult` is the { ok, output, error, timedOut } object returned by
// runJavaScript/runPython. A runtime error or timeout is always
// Needs review, regardless of any partial output produced before the crash.
export function gradeCodeOutput(execResult, expectedOutput) {
  const expectedNorm = normalizeOutput(expectedOutput);

  if (!execResult || !execResult.ok) {
    return {
      tier: GRADE_TIERS.NEEDS_REVIEW,
      label: GRADE_TIER_LABELS[GRADE_TIERS.NEEDS_REVIEW],
      similarity: 0,
      exact: false,
    };
  }

  const actualNorm = normalizeOutput(execResult.output);

  if (actualNorm === expectedNorm && expectedNorm.length > 0) {
    return {
      tier: GRADE_TIERS.STRONG,
      label: GRADE_TIER_LABELS[GRADE_TIERS.STRONG],
      similarity: 1,
      exact: true,
    };
  }

  const similarity = jaccard(wordSet(actualNorm), wordSet(expectedNorm));
  const tier = similarity >= PARTIAL_THRESHOLD ? GRADE_TIERS.PARTIAL : GRADE_TIERS.NEEDS_REVIEW;

  return {
    tier,
    label: GRADE_TIER_LABELS[tier],
    similarity,
    exact: false,
  };
}
