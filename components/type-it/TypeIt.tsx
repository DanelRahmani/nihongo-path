"use client";

import Link from "next/link";
import { Fragment, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Jp, Rich } from "@/components/Jp";
import { isJapanese, showKanji } from "@/components/drill/TypedDrill";
import { Button } from "@/components/ui/Button";
import { Feedback } from "@/components/ui/Feedback";
import { panelClass } from "@/components/ui/Panel";
import { Segmented } from "@/components/ui/Segmented";
import { readingOf } from "@/lib/markup";
import { useStore } from "@/lib/storage";
import { useAnswerClock } from "@/lib/answer-clock";
import { progressStore, recordActivity, recordReview } from "@/lib/stores";
import type { TypeLine } from "@/lib/type-lines";
import { type Comparison, compareLine, describeSlip, type Script } from "@/lib/type-it";
import { fieldClass } from "@/components/ui/field";
import { KeyboardHelp, typedWithoutJapanese } from "@/components/ui/KeyboardHelp";

const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

/** A random line of the pool other than `current`, when there is another. */
function pick(pool: TypeLine[], current: TypeLine | null): TypeLine {
  const others = pool.length > 1 && current ? pool.filter((l) => l !== current) : pool;
  return others[Math.floor(Math.random() * others.length)];
}

/**
 * The "Type it" game: copy a lesson line through a Japanese keyboard, in kana or in kanji. Lines come from the
 * finished lessons (all lessons until one is finished). The feedback names keyboard slips. Each line counts toward
 * the daily goal once, when it is first typed exactly; pasting is turned off, since the point is the typing.
 */
export function TypeIt({ lines }: { lines: TypeLine[] }) {
  const mounted = useMounted();
  const [progress] = useStore(progressStore);
  const [script, setScript] = useState<Script>("kana");
  const pool = useMemo(() => {
    const done = lines.filter((l) => progress[l.lesson]);
    return done.length ? done : lines;
  }, [lines, progress]);
  // The line itself, not an index: finishing a lesson in another tab changes the pool, not the line being typed.
  const [line, setLine] = useState<TypeLine | null>(null);
  const clock = useAnswerClock(line);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Comparison | null>(null);
  // The last check was typed in English letters only: the keyboard set-up link shows under the result.
  const [latin, setLatin] = useState(false);
  const [status, setStatus] = useState("");
  const [typedCount, setTypedCount] = useState(0);
  const [pasted, setPasted] = useState(false);
  // The line already counted toward the goal, so switching scripts and checking again can't count it twice.
  const counted = useRef<TypeLine | null>(null);
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not check the line.
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Set by Start, Next and Skip, so the box takes focus only then (not when the script switch is used).
  const focusBox = useRef(false);

  useEffect(() => {
    if (result?.exact) nextButton.current?.focus();
  }, [result]);
  useEffect(() => {
    if (focusBox.current) {
      focusBox.current = false;
      inputRef.current?.focus();
    }
  }, [line]);

  if (!mounted) return <div aria-hidden className={panelClass("surface", "min-h-64")} />;

  const next = () => {
    const chosen = pick(pool, line);
    focusBox.current = true;
    setLine(chosen);
    setInput("");
    setResult(null);
    setPasted(false);
    setStatus(`New line: ${chosen.en}`);
  };

  if (!line) {
    return (
      <div className={panelClass("surface", "p-6")}>
        <p>
          A line from the lessons{pool === lines ? "" : " you've finished"}: copy it with a Japanese keyboard, exactly. The
          feedback names the slips keyboards make, like a space or a “,” typed in, or the wrong kanji chosen.
        </p>
        <p className="mt-2 text-sm text-ink-2">
          No Japanese keyboard yet?{" "}
          <Link href="/keyboard" className="link-inline">
            Set up a Japanese keyboard
          </Link>
        </p>
        <Button className="mt-5" onClick={next}>
          Start
        </Button>
      </div>
    );
  }

  const check = () => {
    if (!input || composing.current) return;
    const r = compareLine(line.jp, script, input);
    // Every check is a try: the card is the line itself, as the lessons write it.
    recordReview("type", line.jp, r.exact, { answer: input, ms: clock.ms() });
    setPasted(false);
    setResult(r);
    setLatin(typedWithoutJapanese(input));
    if (r.exact) {
      setStatus("Exactly right.");
      if (counted.current !== line) {
        counted.current = line;
        recordActivity();
        setTypedCount((n) => n + 1);
      }
    } else if (r.differsAt === null) {
      setStatus(`Nearly: ${r.slips.map(describeSlip).join(" ")}`);
    } else {
      setStatus(`Not yet: it differs from “${r.target.slice(r.differsAt) || "the end"}”.`);
    }
  };

  const otherKanji = result?.slips.some((s) => s.kind === "other-kanji");

  return (
    <div>
      <Segmented
        legend="Type it in"
        name="type-it-script"
        value={script}
        onChange={(s) => {
          setScript(s);
          setInput("");
          setResult(null);
        }}
        options={[
          { value: "kana", label: <span className="text-sm">Kana</span> },
          { value: "kanji", label: <span className="text-sm">Kanji</span> },
        ]}
      />
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (result?.exact) next();
          else check();
        }}
      >
        <p className="text-sm text-ink-2 tabular-nums">{typedCount} typed exactly</p>
        <div id="type-it-line" className={panelClass("surface", "mt-3 p-6 text-center")}>
          {script === "kana" ? (
            // Shown without spaces, as it is typed; a narrow screen wraps it only between the lesson's words.
            <p lang="ja" className="font-jp text-2xl leading-relaxed break-keep [overflow-wrap:anywhere]">
              {readingOf(line.jp, false)
                .replace(/-/g, "")
                .split(/\s+/)
                .map((word, i) => (
                  <Fragment key={i}>
                    {i > 0 && <wbr />}
                    {word}
                  </Fragment>
                ))}
            </p>
          ) : (
            <Jp jp={showKanji(line.jp)} romaji={false} inspect={false} className="typed-line font-jp text-2xl leading-relaxed" />
          )}
          <Rich text={line.en} className="mt-3 block text-sm text-ink-2" />
        </div>

        {/* Always mounted, so screen readers announce each change. */}
        <p role="status" className="sr-only">
          {status}
        </p>

        {result && (
          <div id="type-it-result" className="mt-4 text-sm">
            {result.exact ? (
              <Feedback kind="good">Exactly right.</Feedback>
            ) : (
              <Feedback kind="bad">
                {result.typedInKanji ? (
                  <p>That&apos;s the line in kanji. This round asks for kana: type the reading, or switch to Kanji above.</p>
                ) : result.differsAt === null ? (
                  <p>{otherKanji ? "Check the kanji, then try again:" : `Nearly: fix ${result.slips.length === 1 ? "this" : "these"} and check again.`}</p>
                ) : result.differsAt === result.target.length ? (
                  <p>
                    Extra at the end: <span lang={isJapanese(result.typedFrom) ? "ja" : undefined}>“{result.typedFrom}”</span>
                  </p>
                ) : (
                  <p>
                    It differs from here:{" "}
                    <span lang="ja" className="font-jp">
                      {result.target.slice(0, result.differsAt)}
                      <mark className="rounded bg-accent-soft px-0.5 text-accent">{result.target.slice(result.differsAt)}</mark>
                    </span>
                    {result.typedFrom && (
                      <span className="block text-ink-2">
                        You typed <span lang={isJapanese(result.typedFrom) ? "ja" : undefined}>“{result.typedFrom}”</span> there.
                      </span>
                    )}
                  </p>
                )}
                {result.slips.length > 0 && !result.typedInKanji && (
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-ink-2">
                    {result.slips.map((s, i) => (
                      <li key={i}>{describeSlip(s)}</li>
                    ))}
                  </ul>
                )}
                {latin && <KeyboardHelp className="mt-2" />}
              </Feedback>
            )}
          </div>
        )}
        <div className="mt-4 flex gap-2">
          {result?.exact ? (
            <Button ref={nextButton} type="submit" size="lg" className="flex-1">
              Next line
            </Button>
          ) : (
            <>
              <input
                ref={inputRef}
                lang="ja"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onCompositionStart={() => (composing.current = true)}
                onCompositionEnd={() => (composing.current = false)}
                // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
                onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
                onPaste={(e) => {
                  e.preventDefault();
                  setPasted(true);
                  setStatus("Pasting is off here: type the line.");
                }}
                onDrop={(e) => e.preventDefault()}
                aria-label={`Copy the line in ${script}`}
                aria-describedby={result ? "type-it-line type-it-result" : "type-it-line"}
                placeholder="Copy the line…"
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
        {pasted && <p className="mt-2 text-sm text-ink-2">Pasting is off here: type the line.</p>}
        {!result?.exact && (
          <button type="button" onClick={next} className="mt-3 text-sm text-accent hover:underline">
            Skip this line
          </button>
        )}
      </form>
    </div>
  );
}
