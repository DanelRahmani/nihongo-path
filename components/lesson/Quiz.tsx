"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import type { QuizQuestion } from "@/content/types";
import { checkQuestion, type QuizCheck } from "@/lib/quiz";
import { QUIZ_DECK, quizCardId } from "@/lib/notebook";
import { logAnswer } from "@/lib/stores";
import { missedInRound, recordCheck, retryMissed, roundName, startRounds } from "@/lib/quiz-rounds";
import { fieldClass } from "@/components/ui/field";
import { KeyboardHelp, typedWithoutJapanese } from "@/components/ui/KeyboardHelp";

const PLACEHOLDER = {
  japanese: "Type in kana or kanji",
  romaji: "Type the reading in romaji",
  name: "Type the name in English letters",
} as const;

/**
 * One question. `retry` marks a box in a later round: its checks count toward the daily goal but never reach the
 * notebook, which sees first tries only. `focus` puts the cursor in the box when it appears (the first retry box).
 */
function Question({
  q,
  n,
  lessonKey,
  retry = false,
  focus = false,
  hideAnswer = false,
  describedBy,
  onResult,
}: {
  q: QuizQuestion;
  n: number;
  lessonKey: string;
  retry?: boolean;
  focus?: boolean;
  /** Being asked again below: its feedback no longer shows the answer, so the next try isn't a copy. */
  hideAnswer?: boolean;
  /** The round's heading, so a retry box can be told from the first box for the same question. */
  describedBy?: string;
  onResult: (correct: boolean) => void;
}) {
  const id = useId();
  const box = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focus) box.current?.focus();
  }, [focus]);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<QuizCheck | null>(null);
  const [typed, setTyped] = useState("");
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not submit the answer.
  const composing = useRef(false);
  const lastChecked = useRef<string | null>(null);
  // Romaji readings and names are typed in English letters, and the answer shown is the romaji.
  const romaji = q.answerIn !== undefined;

  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (composing.current || !input.trim()) return;
          const r = checkQuestion(q, input);
          // Checking the same answer again isn't another answer. Only the first try goes to the notebook: after a
          // miss the answer is on screen, and copying it isn't remembering it.
          if (input.trim() !== lastChecked.current) {
            logAnswer(QUIZ_DECK, quizCardId(lessonKey, q.prompt), r.correct, { notebook: !retry && lastChecked.current === null });
          }
          lastChecked.current = input.trim();
          setResult(r);
          setTyped(input);
          onResult(r.correct);
        }}
      >
        <label htmlFor={id} className="flex gap-3 leading-7">
          <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper-3 text-xs font-bold tabular-nums">
            {n}
          </span>
          <Rich text={q.prompt} className="pt-px" />
        </label>
        <div className="mt-3 flex gap-2 sm:pl-10">
          <input
            ref={box}
            id={id}
            aria-describedby={describedBy}
            lang={romaji ? "en" : "ja"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => (composing.current = true)}
            onCompositionEnd={() => (composing.current = false)}
            // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
            onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
            placeholder={PLACEHOLDER[q.answerIn ?? "japanese"]}
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className={fieldClass({ size: "md", jp: !romaji })}
          />
          <Button type="submit" variant="secondary">
            Check
          </Button>
        </div>
      </form>
      <div aria-live="polite" className="sm:pl-10">
        {result && hideAnswer && <p className="mt-3 text-sm text-ink-2">Missed at the first try: it&apos;s asked again below.</p>}
        {result && !hideAnswer && (
          <Feedback kind={result.correct ? "good" : "bad"} className="rise mt-3">
            {result.correct ? (
              <p className="font-medium">Right.</p>
            ) : (
              <p>
                <span className="font-medium">The answer: </span>
                {romaji ? (
                  <span className="text-lg font-medium">{result.answer}</span>
                ) : (
                  <Jp jp={q.answers[0]} romaji={false} inspect={false} className="font-jp text-lg" />
                )}
              </p>
            )}
            {result.note && <p className="text-sm">{result.note}</p>}
            {!result.correct && !romaji && typedWithoutJapanese(typed) && <KeyboardHelp />}
            <Rich text={q.explanation} className="mt-1 block text-sm leading-6 text-ink-2" />
          </Feedback>
        )}
      </div>
    </li>
  );
}

/**
 * The lesson's closing quiz: typed answers, checked exactly, each with its explanation. Once every question has been
 * checked, the ones missed at the first try can be asked again in fresh boxes (lib/quiz-rounds.ts), round after round.
 */
export function Quiz({ questions, lessonKey }: { questions: QuizQuestion[]; lessonKey: string }) {
  const [state, setState] = useState(() => startRounds(questions.length));
  const [status, setStatus] = useState("");
  const headingId = useId();
  const round = state.rounds.length - 1;
  const current = state.rounds[round];
  const missed = missedInRound(state);
  const answered = Object.keys(state.rounds[0].first).length;
  const right = Object.keys(state.right).length;

  const check = (i: number, correct: boolean) => {
    const next = recordCheck(state, i, correct);
    setState(next);
    // The end of a round: the score, and the offer to try the misses again (each box's own feedback says the rest).
    const r = next.rounds.at(-1)!;
    const ended = Object.keys(r.first).length === r.asked.length && Object.keys(current.first).length < r.asked.length;
    if (!ended) return;
    const still = missedInRound(next).length;
    const offer = `“Try the ${still === 1 ? "one" : still} you missed again” is below the quiz.`;
    if (round === 0) setStatus(still ? `${r.asked.length - still} of ${r.asked.length} right at the first try. ${offer}` : "");
    else setStatus(still ? `${roundName(round)}: ${r.asked.length - still} of ${r.asked.length} right. ${offer}` : `${roundName(round)}: all right.`);
  };

  const retry = () => {
    setStatus(`${roundName(round + 1)}: ${missed.length} ${missed.length === 1 ? "question" : "questions"} to answer again.`);
    setState(retryMissed);
  };

  return (
    <section aria-labelledby="quiz-heading" className={panelClass("surface", "my-10 p-5 sm:p-7")}>
      <div className="flex items-baseline justify-between gap-3">
        <Eyebrow as="h2" id="quiz-heading" jp="確認">
          Check yourself
        </Eyebrow>
        {answered > 0 && (
          <span className="text-sm text-ink-2 tabular-nums">
            {right}/{questions.length} right
          </span>
        )}
      </div>
      <ol className="mt-5 divide-y divide-line">
        {questions.map((q, i) => (
          <Question
            key={i}
            q={q}
            n={i + 1}
            lessonKey={lessonKey}
            hideAnswer={round > 0 && current.asked.includes(i)}
            onResult={(correct) => round === 0 && check(i, correct)}
          />
        ))}
      </ol>

      {round > 0 && (
        <div className="mt-8 border-t border-line pt-6">
          <h3 id={`${headingId}-round`} className="font-medium">
            {roundName(round)} <span className="font-normal text-ink-2">· the {current.asked.length === 1 ? "one" : "ones"} you missed</span>
          </h3>
          <ol className="mt-4 divide-y divide-line">
            {current.asked.map((i, k) => (
              <Question key={`${round}-${i}`} q={questions[i]} n={i + 1} lessonKey={lessonKey} retry focus={k === 0} describedBy={`${headingId}-round`} onResult={(correct) => check(i, correct)} />
            ))}
          </ol>
        </div>
      )}

      {missed.length > 0 && (
        <div className="mt-6 border-t border-line pt-5">
          <Button variant="secondary" onClick={retry}>
            Try the {missed.length === 1 ? "one" : `${missed.length}`} you missed again
          </Button>
        </div>
      )}
      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className="sr-only">
        {status}
      </p>
    </section>
  );
}
