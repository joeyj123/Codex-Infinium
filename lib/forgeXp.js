import { GRADE_TIERS } from "@/lib/grading";

// Forge example XP scales on two independent axes: how strict the exposure
// level was (Gauntlet > Challenge > Guided, matching the existing design
// intent that harder modes are worth more) and how well the typed answer
// actually graded (Strong > Partial > Needs review).
const BASE_EXAMPLE_XP = 10;

const EXPOSURE_MULTIPLIER = {
  guided: 1,
  challenge: 1.4,
  gauntlet: 1.8,
};

const GRADE_MULTIPLIER = {
  [GRADE_TIERS.STRONG]: 1,
  [GRADE_TIERS.PARTIAL]: 0.65,
  [GRADE_TIERS.NEEDS_REVIEW]: 0.35,
};

export function forgeExampleXp(exposure, gradeTier) {
  const exposureMult = EXPOSURE_MULTIPLIER[exposure] ?? 1;
  const gradeMult = GRADE_MULTIPLIER[gradeTier] ?? GRADE_MULTIPLIER[GRADE_TIERS.NEEDS_REVIEW];
  return Math.max(1, Math.round(BASE_EXAMPLE_XP * exposureMult * gradeMult));
}
