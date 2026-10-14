"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { isJapanese, showKanji } from "@/components/drill/TypedDrill";
import { Jp, Rich } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { panelClass } from "@/components/ui/Panel";
import { clozeDeck } from "@/lib/cloze-deck";
import { type Check, type Deck, KANA_DECKS } from "@/lib/decks";
import { kanjiDeck } from "@/lib/kanji-deck";
import { CONJUGATION_DECK, QUIZ_DECK } from "@/lib/notebook";
import { registerDeck } from "@/lib/register-drill";
import { conjugationAsker, quizAsker } from "@/lib/review-askers";
import type { ReviewData } from "@/lib/review-data";
import { applyReview, buildQueue, type QueueItem, reviewCount } from "@/lib/review-queue";
import { notebookStore, recordActivity, srsStore } from "@/lib/stores";
import { vocabDeck } from "@/lib/vocab-deck";
import { fieldClass } from "@/components/ui/field";

let dataPromise: Promise<ReviewData> | undefined;

/** The static /review-data.json, fetched once per page view; a failed fetch is forgotten, so a reload retries. */
function loadData(): Promise<ReviewData> {
  dataPromise ??= fetch("/review-data.json")
    .then((response) => {
      if (!response.ok) throw new Error("The review data could not be loaded.");
      return response.json() as Promise<ReviewData>;
    })
    .catch((error: unknown) => {
      dataPromise = undefined;
      throw error;
    });
  return dataPromise;
}


/** The answer box's hint, by what the item asks for (as the lesson quizzes word it). */
const PLACEHOLDER = { ja: "Type it in Japanese…", romaji: "Type the reading in romaji…", name: "Type the name in English letters…" } as const;

type Load = { state: "waiting" } | { state: "error" } | { state: "done"; queue: QueueItem[]; titles: Record<string, string> };

/**
 * The queue, fixed when the data arrives: every deck built from the data, the quiz and conjugation askers, and each
 * deck's title for the card's label. Only studied cards and notebook items are asked, so no deck needs the
 * reader's finished lessons.
 */
function queueFrom(data: ReviewData): { queue: QueueItem[]; titles: Record<string, string> } {
  const path = Object.keys(data.lessons);
  const none = new Set<string>();
  const decks: Deck[] = [
    ...KANA_DECKS,
    kanjiDeck(data.kanji),
    vocabDeck(data.vocab, path, none),
    clozeDeck(data.cloze, path, none),
    registerDeck("casual", data.register.casual, path, none),
    registerDeck("polite", data.register.polite, path, none),
  ];
  const askers = { [QUIZ_DECK]: quizAsker(data.quiz, data.lessons), [CONJUGATION_DECK]: conjugationAsker(data.conjugation, data.lessons) };
  const titles = { ...Object.fromEntries(decks.map((d) => [d.id, d.title])), [QUIZ_DECK]: "Lesson quiz", [CONJUGATION_DECK]: "Conjugation" };
  return { queue: buildQueue(decks, askers, srsStore.get(), notebookStore.get(), Date.now()), titles };
}

/**
 * The one review queue: everything due across the decks, most overdue first, then the mistake notebook. Each item is
 * asked with its own deck's prompt and checker; a due card is scheduled in its own deck, and every answer goes to the
 * notebook and the daily goal. The queue is fixed when the page opens, so answering doesn't reshuffle it.
 */
export function ReviewQueue() {
  const [load, setLoad] = useState<Load>({ state: "waiting" });
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"ask" | "wrong">("ask");
  const [input, setInput] = useState("");
  const [last, setLast] = useState<{ item: QueueItem; check: Check; typed: string } | null>(null);
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not check the answer.
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);
  const doneHeading = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    let live = true;
    // Nothing due and nothing in the notebook: no need for the card data.
    const count = reviewCount(srsStore.get(), notebookStore.get(), Date.now());
    if (count.due + count.notebook === 0) {
      queueMicrotask(() => live && setLoad({ state: "done", queue: [], titles: {} }));
      return () => {
        live = false;
      };
    }
    loadData()
      .then((data) => live && setLoad({ state: "done", ...queueFrom(data) }))
      .catch(() => live && setLoad({ state: "error" }));
    return () => {
      live = false;
    };
  }, []);

  useEffect(() => {
    if (phase === "wrong") nextButton.current?.focus();
  }, [phase]);

  // After the last item the form is gone: put focus on the result.
  const finished = load.state === "done" && load.queue.length > 0 && index >= load.queue.length;
  useEffect(() => {
    if (finished) doneHeading.current?.focus();
  }, [finished]);

  if (load.state === "waiting") {
    return <div aria-hidden className={panelClass("surface", "min-h-64")} />;
  }
  if (load.state === "error") {
    return (
      <p role="alert" className={panelClass("surface", "p-6 text-center text-sm")}>
        The review couldn&apos;t load. Check your connection and reload the page.
      </p>
    );
  }

  const { queue: items, titles } = load;
  const item = items[index];
  const dueCount = items.filter((i) => i.from === "due").length;

  if (!items.length) {
    return (
      <div className={panelClass("surface", "p-8 text-center")}>
        <p lang="ja" className="font-serif text-5xl text-accent">
          お見事
        </p>
        <p className="mt-3 text-lg font-medium">Nothing to review</p>
        <p className="mt-1 text-sm text-ink-2">
          No cards are due and the mistake notebook is empty. Learn something new in a{" "}
          <Link href="/kana/drill" className="link-inline">
            drill
          </Link>{" "}
          or on the{" "}
          <Link href="/" className="link-inline">
            path
          </Link>
          .
        </p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className={panelClass("surface", "p-8 text-center")}>
        <p lang="ja" className="font-serif text-5xl text-accent">
          お見事
        </p>
        <p ref={doneHeading} tabIndex={-1} className="mt-3 text-lg font-medium">
          Review done
        </p>
        <p className="mt-1 text-sm text-ink-2 tabular-nums">
          {score.right} right, {score.wrong} to see again.
        </p>
        <p className="mt-4 text-sm">
          <Link href="/" className="link-inline">
            Back to the path
          </Link>
        </p>
      </div>
    );
  }

  const submit = () => {
    if (!input.trim() || composing.current) return;
    const check = item.check(input);
    const after = applyReview(srsStore.get(), notebookStore.get(), item, check.correct, Date.now());
    srsStore.set(after.srs);
    notebookStore.set(after.notebook);
    recordActivity();
    setScore((s) => (check.correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
    setLast({ item, check, typed: input });
    if (check.correct) next();
    else setPhase("wrong");
  };

  function next() {
    setIndex((i) => i + 1);
    setInput("");
    setPhase("ask");
  }

  const status = last?.check.correct && phase === "ask" ? `Right: ${last.check.canonical}. ${last.check.note ?? ""}` : "";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (phase === "wrong") next();
        else submit();
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-ink-2 tabular-nums">
        <span>
          {index + 1} of {items.length} · {dueCount} due, {items.length - dueCount} from the notebook
        </span>
        <span className="flex items-center gap-3">
          <span className="text-good">○ {score.right}</span>
          <span className="text-accent">✕ {score.wrong}</span>
        </span>
      </div>

      <p role="status" className="sr-only">
        {status}
      </p>

      <div
        className={`mt-4 grid min-h-64 place-items-center rounded-panel border-2 p-6 text-center transition-colors duration-200 ${
          phase === "wrong" ? "border-accent bg-accent-soft" : "border-line bg-surface shadow-card"
        }`}
      >
        <div key={`${item.deckId}|${item.cardId}`} className="rise">
          <p className="text-xs tracking-[0.15em] text-ink-2 uppercase">
            {titles[item.deckId] ?? item.deckId}
            {item.from === "notebook" && " · from the notebook"}
          </p>
          {item.prompt.lang === "ja" ? (
            <Jp jp={item.prompt.text} romaji={false} inspect={false} className="mt-3 font-jp text-3xl leading-relaxed keep-words" />
          ) : (
            <Rich text={item.prompt.text} className="mt-3 block text-xl font-medium" />
          )}
          {item.prompt.hint && <Rich text={item.prompt.hint} className="mt-3 block text-sm text-ink-2" />}
          {item.source && (
            <Link href={item.source.href} className="mt-2 inline-block text-xs text-accent hover:underline">
              {item.source.title}
            </Link>
          )}
          {phase === "wrong" && last && (
            <div id="review-answer" className="mt-5 border-t border-accent/30 pt-4">
              <p className="text-sm text-ink-2">It&apos;s</p>
              {last.item.answerJp ? (
                <Jp jp={showKanji(last.item.answerJp)} romaji={false} inspect={false} className="font-jp text-2xl font-medium keep-words" />
              ) : (
                <p className="text-2xl font-medium">{last.check.canonical}</p>
              )}
              <p className="mt-2 text-sm text-ink-2">
                You typed <span lang={isJapanese(last.typed) ? "ja" : undefined}>“{last.typed}”</span>
              </p>
              {last.check.note && <p className="mt-1 text-sm text-ink-2">{last.check.note}</p>}
              {last.item.answerNote && <Rich text={last.item.answerNote} className="mt-2 block text-sm text-ink-2" />}
              {last.item.explain && <Rich text={last.item.explain} className="mt-3 block text-sm leading-6 text-ink-2" />}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {phase === "ask" ? (
          <>
            <input
              key={`${item.deckId}|${item.cardId}|${index}`}
              autoFocus
              lang={item.prompt.answerIn && item.prompt.answerIn !== "ja" ? "en" : "ja"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onCompositionStart={() => (composing.current = true)}
              onCompositionEnd={() => (composing.current = false)}
              // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
              onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
              aria-label={item.prompt.ask}
              placeholder={PLACEHOLDER[item.prompt.answerIn ?? "ja"]}
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
        ) : (
          <Button ref={nextButton} type="submit" size="lg" aria-describedby="review-answer" className="flex-1">
            Next
          </Button>
        )}
      </div>
      <p aria-hidden className="mt-3 min-h-5 text-sm text-ink-2">
        {last?.check.correct && phase === "ask" && (
          <>
            <span className="text-good">○</span>{" "}
            {last.item.answerJp ? (
              <Jp jp={showKanji(last.item.answerJp)} romaji={false} inspect={false} />
            ) : (
              <span lang={isJapanese(last.check.canonical) ? "ja" : undefined}>{last.check.canonical}</span>
            )}
            {last.check.note && <span className="block">{last.check.note}</span>}
          </>
        )}
      </p>
    </form>
  );
}
