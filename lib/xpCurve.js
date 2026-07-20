// Rank XP curve: each rank threshold is ~15% larger than the last.
// Rank is driven purely by cumulative XP — independent of Tier.
//
// xpForStep(n) = XP required to go from rank n to rank n+1
//              = round(BASE_STEP * GROWTH^(n-1))
//
// With BASE_STEP=15, GROWTH=1.15: early ranks (5, 10) come within the first
// few dozen topics, while later ranks (25+) require a large fraction of the
// full 259-topic grimoire (~25-35 XP/topic) to reach — genuine late-game grind.
const BASE_STEP = 15;
const GROWTH = 1.15;

export function xpForStep(rank) {
  return Math.round(BASE_STEP * Math.pow(GROWTH, rank - 1));
}

// Given total cumulative XP, returns { rank, xpIntoRank, xpForNextRank }.
export function rankFromXp(xp) {
  let rank = 1;
  let remaining = xp;
  while (remaining >= xpForStep(rank)) {
    remaining -= xpForStep(rank);
    rank += 1;
    if (rank > 999) break; // safety valve, never realistically reached
  }
  return {
    rank,
    xpIntoRank: remaining,
    xpForNextRank: xpForStep(rank),
  };
}
