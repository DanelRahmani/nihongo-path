"use client";

import Link from "next/link";
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
import { allRight, missedInRound, recordCheck, retryMissed, roundName, startRounds } from "@/lib/quiz-rounds";
import { Hanko, useLessonDone } from "@/components/Progress";
import { LangText } from "@/components/LangText";
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
  // The first keystroke of this try, for the answer history's time to answer.
  const startedAt = useRef<number | null>(null);
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
            const first = !retry && lastChecked.current === null;
            logAnswer(QUIZ_DECK, quizCardId(lessonKey, q.prompt), r.correct, {
              notebook: first,
              answer: input,
              ...(startedAt.current === null ? {} : { ms: Date.now() - startedAt.current }),
              ...(first ? {} : { mode: "x" as const }),
            });
            startedAt.current = null;
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
            onChange={(e) => {
              startedAt.current ??= Date.now();
              setInput(e.target.value);
            }}
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

/** The lesson after this one, for the quiz's "next lesson" link. */
export interface NextLesson {
  href: string;
  title: string;
}

/**
 * Once every question has been answered right (at a round's first check), the natural next step: marking the lesson
 * done, which opens its cards in the drills. Never automatic; the footer's button stays as well. Focus moves to the
 * button when the last answer lands, never on load.
 */
function FinishLesson({ lessonKey, next, focus, onDone }: { lessonKey: string; next?: NextLesson; focus: boolean; onDone: () => void }) {
  const [done, setDone] = useLessonDone(lessonKey);
  // The stamp plays once, after this panel's own click (not again when the footer marks it later).
  const [justDone, setJustDone] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const doneText = useRef<HTMLParagraphElement>(null);
  const id = useId();
  useEffect(() => {
    if (focus) button.current?.focus();
  }, [focus]);

  return (
    <div className={panelClass("tint", "mt-6 p-5")}>
      {done ? (
        <div className="flex items-center gap-4">
          <span onAnimationEnd={() => setJustDone(false)}>
            <Hanko size="md" animate={justDone} decorative />
          </span>
          <p ref={doneText} tabIndex={-1}>
            <span id={`${id}-done`} className="font-medium">
              Lesson done.
            </span>{" "}
            {next ? (
              <>
                Next:{" "}
                <Link href={next.href} aria-describedby={`${id}-done`} className="link-inline">
                  <LangText text={next.title} />
                </Link>
              </>
            ) : (
              "That was the last lesson on the path."
            )}
          </p>
        </div>
      ) : (
        <>
          <p id={`${id}-right`} className="font-medium">
            Every answer right.
          </p>
          <p id={`${id}-why`} className="mt-1 text-sm text-ink-2">
            Marking the lesson done opens its words and lines in the drills.
          </p>
          <Button
            ref={button}
            className="mt-4"
            // Read with the button when focus lands on it, so the message isn't lost to the focus move.
            aria-describedby={`${id}-right ${id}-why`}
            onClick={() => {
              setJustDone(true);
              setDone(true);
              onDone();
              // The button is gone: focus the next lesson's link, or the line that says the lesson is done.
              requestAnimationFrame(() => (doneText.current?.querySelector<HTMLElement>("a") ?? doneText.current)?.focus());
            }}
          >
            Mark this lesson as done
          </Button>
        </>
      )}
    </div>
  );
}

/**
 * The lesson's closing quiz: typed answers, checked exactly, each with its explanation. Once every question has been
 * checked, the ones missed at the first try can be asked again in fresh boxes (lib/quiz-rounds.ts), round after round.
 */
export function Quiz({ questions, lessonKey, next }: { questions: QuizQuestion[]; lessonKey: string; next?: NextLesson }) {
  const [state, setState] = useState(() => startRounds(questions.length));
  const [status, setStatus] = useState("");
  const headingId = useId();
  const [lessonDone] = useLessonDone(lessonKey);
  // Every answer has just become right in this visit: the call to action takes focus.
  const [finished, setFinished] = useState(false);
  const round = state.rounds.length - 1;
  const current = state.rounds[round];
  const missed = missedInRound(state);
  const answered = Object.keys(state.rounds[0].first).length;
  const right = Object.keys(state.right).length;

  const check = (i: number, correct: boolean) => {
    const after = recordCheck(state, i, correct);
    setState(after);
    // The end of a round: the score, and the offer to try the misses again (each box's own feedback says the rest).
    const r = after.rounds.at(-1)!;
    const ended = Object.keys(r.first).length === r.asked.length && Object.keys(current.first).length < r.asked.length;
    if (allRight(after, questions.length) && !allRight(state, questions.length)) {
      // Not yet done: focus moves to the button, which carries the message. Already done: nothing moves, so say it.
      setFinished(!lessonDone);
      setStatus(lessonDone ? "Every answer right. This lesson is already marked done." : "");
      return;
    }
    if (!ended) return;
    const still = missedInRound(after).length;
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
      {allRight(state, questions.length) && <FinishLesson lessonKey={lessonKey} next={next} focus={finished} onDone={() => setStatus("Lesson marked as done.")} />}
      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className="sr-only">
        {status}
      </p>
    </section>
  );
}
