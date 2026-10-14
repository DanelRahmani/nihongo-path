import { describe, expect, it } from "vitest";
import { allRight, missedInRound, recordCheck, retryMissed, roundName, startRounds } from "@/lib/quiz-rounds";

describe("quiz rounds", () => {
  it("offers nothing until every question has been checked, then the first-try misses", () => {
    let s = startRounds(3);
    s = recordCheck(s, 0, true);
    s = recordCheck(s, 1, false);
    expect(missedInRound(s)).toEqual([]);
    s = recordCheck(s, 2, true);
    expect(missedInRound(s)).toEqual([1]);
  });

  it("keeps a round's first verdict: fixing a miss in the same box still counts it missed", () => {
    let s = startRounds(2);
    s = recordCheck(s, 0, false);
    s = recordCheck(s, 0, true);
    s = recordCheck(s, 1, true);
    expect(missedInRound(s)).toEqual([0]);
    // Copying the shown answer into the same box doesn't make it right; the next round's box can.
    expect(allRight(s, 2)).toBe(false);
    s = recordCheck(retryMissed(s), 0, true);
    expect(allRight(s, 2)).toBe(true);
  });

  it("ignores re-checks once a round is done, and starts no round while one is going", () => {
    let s = startRounds(2);
    s = recordCheck(s, 0, true);
    expect(retryMissed(s)).toBe(s);
    s = recordCheck(s, 1, false);
    expect(recordCheck(s, 1, true)).toBe(s);
    expect(missedInRound(s)).toEqual([1]);
  });

  it("asks just the misses again, round after round, until none are left", () => {
    let s = startRounds(4);
    for (const [i, ok] of [[0, false], [1, true], [2, false], [3, false]] as const) s = recordCheck(s, i, ok);
    s = retryMissed(s);
    expect(s.rounds.at(-1)!.asked).toEqual([0, 2, 3]);
    s = recordCheck(s, 0, true);
    s = recordCheck(s, 2, false);
    s = recordCheck(s, 3, true);
    expect(missedInRound(s)).toEqual([2]);
    expect(allRight(s, 4)).toBe(false);
    s = retryMissed(s);
    expect(s.rounds).toHaveLength(3);
    s = recordCheck(s, 2, true);
    expect(missedInRound(s)).toEqual([]);
    expect(allRight(s, 4)).toBe(true);
    expect(retryMissed(s)).toBe(s);
  });

  it("names the rounds", () => {
    expect([0, 1, 2, 3].map(roundName)).toEqual(["First try", "Second try", "Third try", "Try 4"]);
  });
});
