/**
 * The rounds of a lesson quiz, pure: the first round asks every question; after it, the questions missed at the
 * first try can be asked again, in fresh boxes, as many rounds as it takes. A round's verdict on a question is its
 * first check in that round (later checks of the same box don't change it), as for the notebook.
 */
export interface QuizRounds {
  /** One entry per round: the question indices asked, and each one's first-check verdict in that round. */
  rounds: { asked: number[]; first: Record<number, boolean> }[];
  /**
   * Questions answered right at a round's first check, in any round: what "every answer right" means. A miss fixed
   * in the same box (the answer is on screen by then) doesn't count; the next round's fresh box does.
   */
  right: Record<number, true>;
}

export const startRounds = (count: number): QuizRounds => ({ rounds: [{ asked: [...Array(count).keys()], first: {} }], right: {} });

/** Records a check of question `i` in the current round. */
export function recordCheck(state: QuizRounds, i: number, correct: boolean): QuizRounds {
  const current = state.rounds.at(-1)!;
  const first = i in current.first ? current.first : { ...current.first, [i]: correct };
  if (first === current.first) return state;
  return {
    rounds: [...state.rounds.slice(0, -1), { ...current, first }],
    right: correct && !state.right[i] ? { ...state.right, [i]: true } : state.right,
  };
}

/** The current round's misses, once every question in it has been checked; empty while it is still going. */
export function missedInRound(state: QuizRounds): number[] {
  const { asked, first } = state.rounds.at(-1)!;
  if (!asked.every((i) => i in first)) return [];
  return asked.filter((i) => !first[i]);
}

/** Starts a round of the current round's misses. */
export function retryMissed(state: QuizRounds): QuizRounds {
  const missed = missedInRound(state);
  return missed.length ? { ...state, rounds: [...state.rounds, { asked: missed, first: {} }] } : state;
}

/** True once every question has been answered right, at the first try or a later one. */
export const allRight = (state: QuizRounds, count: number) => Object.keys(state.right).length === count;

/** "First try", "Second try", "Third try", then "Try 4". */
export function roundName(round: number): string {
  return ["First try", "Second try", "Third try"][round] ?? `Try ${round + 1}`;
}
