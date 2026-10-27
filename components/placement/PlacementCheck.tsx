"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isJapanese } from "@/components/drill/TypedDrill";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import { type Band, lessonsBefore, placement } from "@/lib/placement";
import { checkQuestion, type QuizCheck } from "@/lib/quiz";
import { useStore } from "@/lib/storage";
import { placementStore, progressStore, setLessonsDone } from "@/lib/stores";
import { fieldClass } from "@/components/ui/field";
import { typedWithoutJapanese } from "@/components/ui/KeyboardHelp";

/** Kana or kanji anywhere in the answer: without them it was typed without a Japanese keyboard. */
const HAS_JAPANESE = /[぀-ヿ一-鿿]/;

const lessonHref = (lesson: string) => `/learn/${lesson}`;

/**
 * The placement check: two lesson-quiz questions per unit (kana units left out), in path order, stopping at the
 * first unit with two misses. It then offers to mark the earlier units' lessons finished, and the kana units with
 * them, with an undo. Answers here don't go to the notebook or the daily goal: this is a check, not practice. An
 * answer with no kana or kanji isn't counted: the reader is asked to switch to a Japanese keyboard.
 */
export function PlacementCheck({ bands, kanaLessons, lessonTitles }: { bands: Band[]; kanaLessons: string[]; lessonTitles: Record<string, string> }) {
  const [progress] = useStore(progressStore);
  const [started, setStarted] = useState(false);
  const [answers, setAnswers] = useState<boolean[][]>([]);
  const [input, setInput] = useState("");
  // A missed answer, shown until Next; right answers move on at once.
  const [missed, setMissed] = useState<{ check: QuizCheck; typed: string } | null>(null);
  const [status, setStatus] = useState("");
  // The last answer was typed in English letters: the keyboard set-up link shows under the status.
  const [noJapanese, setNoJapanese] = useState(false);
  const [withKana, setWithKana] = useState(true);
  // The progress before "Mark them finished", for Undo, and how many lessons it marked.
  const [marked, setMarked] = useState<{ keys: string[]; count: number } | null>(null);
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const markButton = useRef<HTMLButtonElement>(null);
  const undoButton = useRef<HTMLButtonElement>(null);

  const result = placement(bands, answers);
  // The next question: the first band with fewer answers than questions.
  const band = bands.findIndex((b, i) => (answers[i]?.length ?? 0) < b.questions.length);
  const question = band >= 0 ? bands[band].questions[answers[band]?.length ?? 0] : null;
  const asked = answers.flat().length;
  const total = bands.reduce((n, b) => n + b.questions.length, 0);
  const finished = result.done && !missed;

  useEffect(() => {
    if (missed) nextButton.current?.focus();
  }, [missed]);
  useEffect(() => {
    if (finished) resultHeading.current?.focus();
  }, [finished]);
  // Each finished check is kept for the progress export, once.
  const saved = useRef(false);
  useEffect(() => {
    if (!finished) {
      saved.current = false;
      return;
    }
    if (saved.current) return;
    saved.current = true;
    const answered = bands.flatMap((b, i) => (answers[i] ?? []).map((correct, j) => ({ unit: b.unit, lesson: b.questions[j].lesson, correct })));
    const start = result.start === null ? null : bands[result.start].unit;
    placementStore.set((list) => [...list, { at: Date.now(), start, answers: answered }]);
  }, [finished, bands, answers, result.start]);
  const markedCount = marked?.count ?? null;
  useEffect(() => {
    if (markedCount !== null) undoButton.current?.focus();
  }, [markedCount]);

  const restart = () => {
    setAnswers([]);
    setMissed(null);
    setInput("");
    setStatus("");
    setMarked(null);
  };

  if (!started) {
    return (
      <div className={panelClass("surface", "p-6")}>
        <p>
          {total} questions at most, two from each unit except the kana. It stops at the first unit where you miss both;
          one miss is just a slip.
        </p>
        <p className="mt-2 text-sm text-ink-2">
          Type the answers with a Japanese keyboard (
          <Link href="/keyboard" className="link-inline">
            set one up
          </Link>{" "}
          first if you need to). An answer typed in romaji isn&apos;t counted: you&apos;ll be asked to switch keyboards and try again.
        </p>
        <Button className="mt-5" onClick={() => setStarted(true)}>
          Start the check
        </Button>
      </div>
    );
  }

  if (finished) {
    const start = result.start === null ? null : bands[result.start];
    const before = lessonsBefore(bands, result.start);
    const toMark = [...before, ...(withKana ? kanaLessons : [])].filter((l) => !progress[l]);
    // The lessons of the questions missed as slips: worth a look even though their unit passed.
    const slips = bands.flatMap((b, i) => (b === start ? [] : b.questions.filter((_, j) => answers[i]?.[j] === false).map((q) => q.lesson)));
    const level = start?.jlpt ? `: around JLPT ${start.jlpt}` : "";
    const title = result.start === 0 ? "Start at the beginning" : start ? `Start with ${start.title}${level}` : "No unit stopped you";
    return (
      <div className={panelClass("surface", "p-6")}>
        <h2 ref={resultHeading} tabIndex={-1} className="text-lg font-medium focus:outline-none">
          {title}
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          {start
            ? `You missed both questions from ${start.title}.`
            : "You got at least one of each unit's two questions. The lessons are still there for reference."}{" "}
          {before.length > 0 &&
            (start
              ? `The ${before.length} lessons of the units before it can be marked finished, so the drills open their words and lines.`
              : `All ${before.length} lessons after the kana can be marked finished, so the drills open their words and lines.`)}
        </p>
        {slips.length > 0 && (
          <p className="mt-3 text-sm">
            Worth a look, for the question you missed:{" "}
            {slips.map((l, i) => (
              <span key={l}>
                {i > 0 && ", "}
                <Link href={lessonHref(l)} className="link-inline">
                  {lessonTitles[l] ?? l}
                </Link>
              </span>
            ))}
          </p>
        )}

        <div className="mt-5 border-t border-line pt-5">
          {marked ? (
            <p className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
              <span className="text-good">
                {marked.count} lesson{marked.count === 1 ? "" : "s"} marked finished.
              </span>
              <Button
                ref={undoButton}
                variant="secondary"
                onClick={() => {
                  setLessonsDone(marked.keys, false);
                  setMarked(null);
                  requestAnimationFrame(() => markButton.current?.focus());
                }}
              >
                Undo
              </Button>
            </p>
          ) : (
            <>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" checked={withKana} onChange={(e) => setWithKana(e.target.checked)} className="mt-1 size-4 accent-[var(--color-accent)]" />
                <span>Mark the {kanaLessons.length} kana lessons finished too: you&apos;ve just read every question in kana.</span>
              </label>
              {toMark.length > 0 ? (
                <Button
                  ref={markButton}
                  className="mt-4"
                  onClick={() => {
                    setMarked({ keys: toMark, count: toMark.length });
                    setLessonsDone(toMark, true, true);
                  }}
                >
                  Mark {toMark.length} lesson{toMark.length === 1 ? "" : "s"} finished
                </Button>
              ) : (
                <p className="mt-4 text-sm text-ink-2">Those lessons are already finished.</p>
              )}
            </>
          )}
          <p className="mt-3 text-xs text-ink-2">The home page&apos;s next lesson is the first one not finished, so it follows what you mark.</p>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Link href={start ? lessonHref(start.lessons[0]) : "/"} className="inline-flex h-11 items-center text-sm text-accent hover:underline">
            {start ? `Go to the first ${start.title} lesson` : "Go to the path"} <span aria-hidden>→</span>
          </Link>
          <button type="button" onClick={restart} className="h-11 text-sm text-accent hover:underline">
            Take it again
          </button>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const record = (correct: boolean) =>
    setAnswers((a) => {
      const copy = bands.map((_, i) => [...(a[i] ?? [])]);
      copy[band].push(correct);
      return copy;
    });

  const submit = () => {
    if (!input.trim() || composing.current) return;
    setNoJapanese(typedWithoutJapanese(input));
    if (!HAS_JAPANESE.test(input)) {
      setStatus("That has no kana or kanji, so it isn't counted. Switch to a Japanese keyboard and try again.");
      return;
    }
    const check = checkQuestion(question, input);
    if (check.correct) {
      record(true);
      setInput("");
      setStatus("○ Right. Next question.");
    } else {
      setMissed({ check, typed: input });
      setStatus("");
    }
  };
  const next = () => {
    record(false);
    setMissed(null);
    setInput("");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (missed) next();
        else submit();
      }}
    >
      <p className="text-sm text-ink-2 tabular-nums">
        Question {asked + 1} of up to {total} · {bands[band].title}
      </p>
      <div className={panelClass("surface", "mt-3 p-6")}>
        <p id="placement-prompt" className="text-lg leading-relaxed">
          <Rich text={question.prompt} />
        </p>
        {missed && (
          <div id="placement-answer" className="mt-4 border-t border-line pt-4">
            <Feedback kind="bad">
              <p>
                The answer: <Jp jp={question.answers[0]} romaji={false} inspect={false} className="font-jp text-base" />
              </p>
              <p className="text-sm text-ink-2">
                You typed <span lang={isJapanese(missed.typed) ? "ja" : undefined}>“{missed.typed}”</span>
              </p>
              {missed.check.note && <p className="text-sm text-ink-2">{missed.check.note}</p>}
              <Rich text={question.explanation} className="mt-1 block text-sm text-ink-2" />
            </Feedback>
          </div>
        )}
      </div>
      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className={status ? "mt-3 text-sm text-ink-2" : "sr-only"}>
        {status}
      </p>
      {/* Outside the status, so the announcement stays the same. */}
      {noJapanese && (
        <p className="mt-1 text-sm text-ink-2">
          No Japanese keyboard yet?{" "}
          <Link href="/keyboard" className="link-inline">
            Set up a Japanese keyboard
          </Link>{" "}
          (this check starts again when you come back).
        </p>
      )}
      <div className="mt-4 flex gap-2">
        {missed ? (
          <Button ref={nextButton} type="submit" size="lg" aria-describedby="placement-answer" className="flex-1">
            Next
          </Button>
        ) : (
          <>
            <input
              key={asked}
              autoFocus
              lang="ja"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onCompositionStart={() => (composing.current = true)}
              onCompositionEnd={() => (composing.current = false)}
              // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
              onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
              aria-label="Your answer"
              aria-describedby="placement-prompt"
              placeholder="Type it in Japanese…"
              autoComplete="off"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              className={fieldClass()}
            />
            <Button type="submit" size="lg">
              Check
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
