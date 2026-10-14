"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { panelClass } from "@/components/ui/Panel";
import {
  checkConjugation,
  conjugate,
  CONJUGATION_DECK,
  formLabel,
  formLesson,
  openQuestions,
  pickQuestion,
  type Question,
  questionId,
  type TrainerWord,
} from "@/lib/conjugation-trainer";
import type { Check } from "@/lib/decks";
import { useStore } from "@/lib/storage";
import { logAnswer, notebookStore, progressStore } from "@/lib/stores";

type Lessons = Record<string, { title: string; href: string }>;

/** A question's answer in lesson markup ([多|おお]くない), for display. */
const answerJp = (q: Question) => {
  const c = conjugate(q.word, q.form);
  return c.ok ? c.jp : "";
};

/** False on the server and while hydrating, true after: progress lives in the browser only. */
const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

const isJapanese = (s: string) => /[぀-ヿ\p{Script=Han}]/u.test(s);

/** The lesson that opens the trainer: the ます form, where the first forms are taught. */
const FIRST_LESSON = "verbs/masu-form";

/**
 * The conjugation trainer: a word and a form name; the learner types the form. Questions are random among the open
 * ones (not scheduled), with the notebook's missed ones coming back now and then; misses go to the notebook, like
 * every trainer's.
 */
export function ConjugationTrainer({ words, lessons }: { words: TrainerWord[]; lessons: Lessons }) {
  const mounted = useMounted();
  const [progress] = useStore(progressStore);
  const [notebook] = useStore(notebookStore);
  const [everything, setEverything] = useState(false);
  const open = useMemo(
    () => openQuestions(words, everything ? new Set(Object.keys(lessons)) : new Set(Object.keys(progress))),
    [words, lessons, progress, everything],
  );
  const [current, setCurrent] = useState<Question | null>(null);
  const [phase, setPhase] = useState<"ask" | "wrong">("ask");
  const [input, setInput] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [last, setLast] = useState<{ q: Question; check: Check; typed: string } | null>(null);
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not check the answer.
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);

  // The question shown, while it is still open (finishing or unfinishing a lesson can close it).
  const asked = current && open.some((q) => questionId(q) === questionId(current)) ? current : null;

  // The notebook's conjugation misses, as questions.
  const missed = useMemo(
    () => open.filter((q) => notebook[`${CONJUGATION_DECK}|${questionId(q)}`] !== undefined),
    [open, notebook],
  );

  const next = (lastQ?: Question) => {
    setCurrent(pickQuestion(open, Math.random(), lastQ, missed));
    setInput("");
    setPhase("ask");
  };

  // After a miss the answer box is gone: put focus on "Next", so Enter moves on.
  useEffect(() => {
    if (phase === "wrong") nextButton.current?.focus();
  }, [phase]);

  const submit = () => {
    if (!asked || !input.trim()) return;
    const check = checkConjugation(asked, input);
    logAnswer(CONJUGATION_DECK, questionId(asked), check.correct);
    setScore((s) => (check.correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
    setLast({ q: asked, check, typed: input });
    if (check.correct) next(asked);
    else setPhase("wrong");
  };

  if (!mounted) return <div aria-hidden className={panelClass("surface", "min-h-40")} />;

  if (!open.length) {
    const first = lessons[FIRST_LESSON];
    return (
      <div className={panelClass("surface", "p-6 text-center")}>
        <p className="font-medium">No forms open yet</p>
        <p className="mt-1 text-sm text-ink-2">
          Forms open as you mark their lessons finished. The first ones come with{" "}
          <Link href={first.href} className="text-accent hover:underline">
            {first.title}
          </Link>
          .
        </p>
        <Button variant="secondary" className="mt-5" onClick={() => setEverything(true)}>
          Practise every form anyway
        </Button>
      </div>
    );
  }

  if (!asked) {
    return (
      <div className={panelClass("surface", "p-6 text-center")}>
        <p className="font-medium">
          {open.length} question{open.length === 1 ? "" : "s"} open
        </p>
        <p className="mt-1 text-sm text-ink-2">
          From {new Set(open.map((q) => q.word.jp)).size} words and {new Set(open.map((q) => q.form)).size} forms.
        </p>
        <Button className="mt-5" onClick={() => next()}>
          Start
        </Button>
      </div>
    );
  }

  const lesson = lessons[formLesson(asked.word, asked.form)];
  const status = last?.check.correct && phase === "ask" ? `Right: ${last.check.canonical}. ${last.check.note ?? ""}` : "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (phase === "wrong") next(asked);
        else if (!composing.current) submit();
      }}
    >
      <div className="flex items-center justify-between gap-4 text-sm text-ink-2 tabular-nums">
        <span>
          {everything ? (
            <button type="button" onClick={() => {
                setEverything(false);
                setCurrent(null);
              }} className="text-accent hover:underline">
              Every form · back to my forms
            </button>
          ) : (
            `${open.length} question${open.length === 1 ? "" : "s"} open`
          )}
        </span>
        <span className="flex items-center gap-3">
          <span className="text-good">○ {score.right}</span>
          <span className="text-accent">✕ {score.wrong}</span>
        </span>
      </div>

      <div
        className={`mt-4 rounded-panel border-2 p-6 text-center transition-colors duration-200 ${
          phase === "wrong" ? "border-accent bg-accent-soft" : "border-line bg-surface shadow-card"
        }`}
      >
        <div key={questionId(asked)} className="rise">
          <Jp jp={asked.word.jp} romaji={false} inspect={false} className="font-jp text-4xl font-medium" />
          <Rich text={asked.word.meaning} className="mt-2 block text-sm text-ink-2" />
          <p className="mt-5 text-lg">
            <span aria-hidden>→ </span>
            <strong className="font-medium">{formLabel(asked.word, asked.form)}</strong>
          </p>
          {lesson && (
            <Link href={lesson.href} className="mt-1 inline-block text-xs text-accent hover:underline">
              {lesson.title}
            </Link>
          )}
        </div>
        {phase === "wrong" && last && (
          <div id="conjugation-answer" className="rise mt-5 border-t border-accent/30 pt-4">
            <p className="text-sm text-ink-2">It&apos;s</p>
            {/* The engine's markup, so the answer follows the reader's furigana setting. */}
            <Jp jp={answerJp(last.q)} romaji={false} inspect={false} className="font-jp text-2xl font-medium" />
            <p className="mt-2 text-sm text-ink-2">
              You typed <span lang={isJapanese(last.typed) ? "ja" : undefined}>“{last.typed}”</span>
            </p>
            {last.check.note && <p className="mt-1 text-sm text-ink-2">{last.check.note}</p>}
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {phase === "ask" ? (
          <>
            <input
              key={`${questionId(asked)}-${score.right + score.wrong}`}
              autoFocus
              lang="ja"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onCompositionStart={() => (composing.current = true)}
              onCompositionEnd={() => (composing.current = false)}
              // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
              onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
              aria-label={`The ${formLabel(asked.word, asked.form)} of ${asked.word.meaning}`}
              placeholder="Type the form…"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className="h-14 min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-6 font-jp text-xl placeholder:font-sans placeholder:text-base placeholder:text-ink-2/70 focus:border-accent focus:ring-4 focus:ring-accent/20 focus:outline-none"
            />
            <Button type="submit" size="lg">
              Check
            </Button>
          </>
        ) : (
          <Button ref={nextButton} type="submit" size="lg" aria-describedby="conjugation-answer" className="flex-1">
            Next
          </Button>
        )}
      </div>
      {/* Always mounted, so screen readers announce each change; the line below is the same for the eye. */}
      <p role="status" className="sr-only">
        {status}
      </p>
      <p aria-hidden className="mt-3 min-h-5 text-sm text-ink-2">
        {last?.check.correct && phase === "ask" && (
          <>
            <span className="text-good">○</span> <Jp jp={answerJp(last.q)} romaji={false} inspect={false} />
            {last.check.note && <span className="block">{last.check.note}</span>}
          </>
        )}
      </p>
    </form>
  );
}
