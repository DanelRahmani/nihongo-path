"use client";

import { useId, useRef, useState } from "react";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import type { QuizQuestion } from "@/content/types";
import { checkQuestion, type QuizCheck } from "@/lib/quiz";
import { QUIZ_DECK, quizCardId } from "@/lib/notebook";
import { logAnswer } from "@/lib/stores";
import { fieldClass } from "@/components/ui/field";

const PLACEHOLDER = {
  japanese: "Type in kana or kanji",
  romaji: "Type the reading in romaji",
  name: "Type the name in English letters",
} as const;

function Question({ q, n, lessonKey, onResult }: { q: QuizQuestion; n: number; lessonKey: string; onResult: (correct: boolean) => void }) {
  const id = useId();
  const [input, setInput] = useState("");
  const [result, setResult] = useState<QuizCheck | null>(null);
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
            logAnswer(QUIZ_DECK, quizCardId(lessonKey, q.prompt), r.correct, { notebook: lastChecked.current === null });
          }
          lastChecked.current = input.trim();
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
        {result && (
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
            <Rich text={q.explanation} className="mt-1 block text-sm leading-6 text-ink-2" />
          </Feedback>
        )}
      </div>
    </li>
  );
}

/** The lesson's closing quiz: typed answers, checked exactly, each with its explanation. */
export function Quiz({ questions, lessonKey }: { questions: QuizQuestion[]; lessonKey: string }) {
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
          <Question key={i} q={q} n={i + 1} lessonKey={lessonKey} onResult={(correct) => setResults((r) => ({ ...r, [i]: correct }))} />
        ))}
      </ol>
    </section>
  );
}
