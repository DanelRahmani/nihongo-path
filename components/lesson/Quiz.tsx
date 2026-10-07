"use client";

import { useId, useRef, useState } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import type { QuizQuestion } from "@/content/types";
import { checkAnswer, type QuizCheck } from "@/lib/quiz";

function Question({ q, n, onResult }: { q: QuizQuestion; n: number; onResult: (correct: boolean) => void }) {
  const id = useId();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<QuizCheck | null>(null);
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not submit the answer.
  const composing = useRef(false);

  return (
    <li className="py-5 first:pt-0 last:pb-0">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (composing.current || !input.trim()) return;
          const r = checkAnswer(q.answers, input);
          setResult(r);
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
            id={id}
            lang="ja"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onCompositionStart={() => (composing.current = true)}
            onCompositionEnd={() => (composing.current = false)}
            placeholder="Type in kana or kanji"
            autoComplete="off"
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            className="h-11 min-w-0 flex-1 rounded-full border border-line-strong bg-surface px-5 font-jp text-lg placeholder:font-sans placeholder:text-sm placeholder:text-ink-2/70 focus:border-accent focus:ring-4 focus:ring-accent/20 focus:outline-none"
          />
          <Button type="submit" variant="secondary">
            Check
          </Button>
        </div>
      </form>
      <div aria-live="polite" className="sm:pl-10">
        {result && (
          <Feedback kind={result.correct ? "good" : "bad"} className="rise mt-3">
            {result.correct ? (
              <p className="font-medium">Right.</p>
            ) : (
              <p>
                <span className="font-medium">The answer: </span>
                <Jp jp={q.answers[0]} romaji={false} className="font-jp text-lg" />
              </p>
            )}
            {result.note && <p className="text-sm">{result.note}</p>}
            <Rich text={q.explanation} className="mt-1 block text-sm leading-6 text-ink-2" />
          </Feedback>
        )}
      </div>
    </li>
  );
}

/** The lesson's closing quiz: typed answers, checked exactly, each with its explanation. */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [results, setResults] = useState<Record<number, boolean>>({});
  const answered = Object.keys(results).length;
  const right = Object.values(results).filter(Boolean).length;

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
          <Question key={i} q={q} n={i + 1} onResult={(correct) => setResults((r) => ({ ...r, [i]: correct }))} />
        ))}
      </ol>
    </section>
  );
}
