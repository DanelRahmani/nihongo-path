"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Jp } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { Segmented } from "@/components/ui/Segmented";
import { KANA_DECKS } from "@/lib/decks";
import { whenIdle } from "@/lib/idle";
import { KANJI_DECK_ID } from "@/lib/kanji-deck";
import { plainOf } from "@/lib/markup";
import { CASUAL_DECK_ID, CLOZE_DECK_ID, POLITE_DECK_ID, VOCAB_DECK_ID } from "@/lib/notebook";
import { deckState, deckStats } from "@/lib/srs";
import { reviewCount } from "@/lib/review-queue";
import { useStore } from "@/lib/storage";
import { activityStore, notebookStore, srsStore } from "@/lib/stores";
import { dayKey, englishDate, GOALS, type Goal, japaneseDate, setGoal, streak, todayProgress, wordOfTheDay } from "@/lib/today";
import type { TodayWord } from "@/lib/today-words";


/**
 * The current minute, so due cards and midnight show up while the page is open, and at once when a sleeping tab
 * comes back; null on the server.
 */
const subscribeMinute = (onChange: () => void) => {
  const id = setInterval(onChange, 60_000);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    clearInterval(id);
    document.removeEventListener("visibilitychange", onChange);
  };
};
const useMinute = () => useSyncExternalStore(subscribeMinute, () => Math.floor(Date.now() / 60_000), () => null);

let idsPromise: Promise<Record<string, string[]>> | undefined;

/** The static /review-ids.json (the card ids this build can ask); a failed fetch is forgotten. */
function loadIds(): Promise<Record<string, string[]>> {
  idsPromise ??= fetch("/review-ids.json")
    .then((response) => {
      if (!response.ok) throw new Error("The review index could not be loaded.");
      return response.json() as Promise<Record<string, string[]>>;
    })
    .catch((error: unknown) => {
      idsPromise = undefined;
      throw error;
    });
  return idsPromise;
}

let wordsPromise: Promise<TodayWord[]> | undefined;

/** The static /today-words.json, fetched once per page view; a failed fetch is forgotten, so a later visit retries. */
function loadWords(): Promise<TodayWord[]> {
  wordsPromise ??= fetch("/today-words.json")
    .then((response) => {
      if (!response.ok) throw new Error("The words could not be loaded.");
      return response.json() as Promise<TodayWord[]>;
    })
    .catch((error: unknown) => {
      wordsPromise = undefined;
      throw error;
    });
  return wordsPromise;
}

/** The daily goal as a ring: the share of today's goal answered so far. */
function GoalRing({ answered, goal }: { answered: number; goal: number }) {
  const r = 26;
  const circumference = 2 * Math.PI * r;
  const share = Math.min(answered / goal, 1);
  return (
    <div className="relative size-20 shrink-0">
      <svg aria-hidden viewBox="0 0 64 64" className="size-full -rotate-90">
        <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className="stroke-paper-3" />
        <circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - share)}
          className={`transition-[stroke-dashoffset] duration-500 ease-soft ${share >= 1 ? "stroke-good" : "stroke-accent"}`}
        />
      </svg>
      <span aria-hidden className="absolute inset-0 grid place-items-center text-sm font-bold tabular-nums">
        {answered}/{goal}
      </span>
    </div>
  );
}

/**
 * The home page's Today card: today's date with its era, the daily goal ring and streak, the reviews waiting
 * (everything due and the notebook's mistakes, linked to the review page), the drills and the word of the day. The
 * numbers depend on the reader's day and stored answers, so the server sends the card with them hidden (same
 * layout, no jump) and the browser fills them in.
 */
export function TodayCard() {
  const minute = useMinute();
  const [activity, setActivity] = useStore(activityStore);
  const [srs] = useStore(srsStore);
  const [notebook] = useStore(notebookStore);
  const [words, setWords] = useState<TodayWord[] | null>(null);
  const [ids, setIds] = useState<Record<string, Set<string>> | null>(null);

  useEffect(() => {
    let live = true;
    const cancel = whenIdle(() => {
      loadWords()
        .then((w) => live && setWords(w))
        // No word of the day this visit; the rest of the card doesn't need it.
        .catch(() => {});
      loadIds()
        .then((index) => live && setIds(Object.fromEntries(Object.entries(index).map(([deck, list]) => [deck, new Set(list)]))))
        // Without the index the count includes ids a later build removed.
        .catch(() => {});
    });
    return () => {
      live = false;
      cancel();
    };
  }, []);

  // On the server, a fixed day stands in, hidden, to lay the card out.
  const now = new Date(minute === null ? Date.UTC(2026, 9, 14, 12) : minute * 60_000);
  const today = dayKey(now);
  const hidden = minute === null ? "invisible" : "";
  const progress = todayProgress(activity, today);
  const days = streak(activity, today);
  const due = KANA_DECKS.reduce((n, d) => n + deckStats(d, deckState(srs, d.id), now.getTime()).due, 0);
  const started = KANA_DECKS.some((d) => Object.keys(deckState(srs, d.id).cards).length > 0);
  // Kanji, vocabulary, cloze and register cards due, from the schedule alone: the cards themselves load only on their pages.
  const dueIn = (deckId: string) => Object.values(deckState(srs, deckId).cards).filter((c) => c.due <= now.getTime()).length;
  const kanjiDue = dueIn(KANJI_DECK_ID);
  const vocabDue = dueIn(VOCAB_DECK_ID);
  const clozeDue = dueIn(CLOZE_DECK_ID);
  const registerDue = dueIn(CASUAL_DECK_ID) + dueIn(POLITE_DECK_ID);
  // The review page's queue, counted from the stores; once the id index has loaded, only what it can ask.
  const counts = reviewCount(srs, notebook, now.getTime(), ids ? (deck, card) => ids[deck]?.has(card) ?? false : undefined);
  const allDue = counts.due;
  const mistakes = counts.notebook;
  const reviews = allDue + mistakes;
  const word = words?.length ? words[wordOfTheDay(today, words.length)] : null;
  const date = japaneseDate(now);

  return (
    <div className={panelClass("surface", "p-5 sm:p-7")}>
      <Eyebrow as="h2" id="today-heading" jp="今日">
        Today
      </Eyebrow>
      <div className={hidden} aria-hidden={minute === null || undefined}>
        {date && (
          <p className="mt-3">
            {/* keep-words: in Kana only mode the date breaks between words (じゅうよっか stays whole), never inside one. */}
            <Jp jp={date} inspect={false} className="font-jp text-lg keep-words" />
          </p>
        )}
        <p className="mt-1 text-sm text-ink-2">{englishDate(now)}</p>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className={`flex items-center gap-4 ${hidden}`} aria-hidden={minute === null || undefined}>
          <GoalRing answered={progress.answered} goal={progress.goal} />
          <div className="min-w-0">
            <p className="font-medium">{progress.met ? "Today's goal is done" : `${progress.goal - progress.answered} to go today`}</p>
            <p className="text-sm text-ink-2">
              {progress.answered} of {progress.goal} answers · drill cards and quiz questions
            </p>
            <p className="mt-1 text-sm text-ink-2">
              {days === 0 ? "Meet the goal to start a streak" : `Streak: ${days} day${days === 1 ? "" : "s"}`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/kana/drill"
            className="group inline-flex h-11 items-center gap-3 self-start rounded-full border border-line-strong bg-surface pr-4 pl-1.5 text-sm shadow-card transition-colors duration-150 hover:border-accent"
          >
            <span className={`grid h-8 min-w-8 place-items-center rounded-full px-2 text-xs font-bold tabular-nums ${due > 0 ? "bg-accent text-on-accent" : "bg-paper-3 text-ink-2"}`}>
              {due}
            </span>
            {!started ? "Start the hiragana drill" : due > 0 ? "Kana due for review" : "Kana all caught up"}
            <span aria-hidden className="text-accent transition-transform duration-200 ease-soft group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <p className={`flex flex-wrap gap-x-4 text-sm ${hidden}`}>
            <Link href="/kanji/drill" className="text-accent hover:underline">
              {kanjiDue === 0 ? "Kanji cards" : `${kanjiDue} kanji card${kanjiDue === 1 ? "" : "s"} due`} <span aria-hidden>→</span>
            </Link>
            <Link href="/vocabulary" className="text-accent hover:underline">
              {vocabDue === 0 ? "Vocabulary" : `${vocabDue} word${vocabDue === 1 ? "" : "s"} due`} <span aria-hidden>→</span>
            </Link>
            <Link href="/cloze" className="text-accent hover:underline">
              {clozeDue === 0 ? "Fill the gap" : `${clozeDue} line${clozeDue === 1 ? "" : "s"} due`} <span aria-hidden>→</span>
            </Link>
            <Link href="/register" className="text-accent hover:underline">
              {registerDue === 0 ? "Polite and casual" : `${registerDue} to convert`} <span aria-hidden>→</span>
            </Link>
          </p>
          <Link
            href="/review"
            aria-hidden={minute === null || undefined}
            className={`group inline-flex min-h-11 items-center gap-3 self-start rounded-full border px-4 py-2 text-sm transition-colors duration-150 ${
              reviews > 0 ? "border-accent bg-accent-soft text-accent hover:bg-accent hover:text-on-accent" : "border-line-strong text-ink-2 hover:border-accent"
            } ${hidden}`}
          >
            {reviews === 0
              ? "Nothing to review"
              : `Review ${[allDue && `${allDue} due`, mistakes && `${mistakes} mistake${mistakes === 1 ? "" : "s"}`].filter(Boolean).join(" and ")}`}
            <span aria-hidden>→</span>
          </Link>
          <div>
            <Segmented
              legend="Daily goal"
              name="daily-goal"
              value={String(activity.goal)}
              onChange={(goal) => setActivity((a) => setGoal(a, Number(goal) as Goal, today))}
              options={GOALS.map((g) => ({ value: String(g), label: <span className="text-sm">{g} a day</span> }))}
            />
            {progress.next !== null && <p className="mt-2 text-xs text-ink-2">Today is done; {progress.next} a day starts tomorrow.</p>}
          </div>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-5">
        <Eyebrow as="h3" jp="今日の言葉">
          Word of the day
        </Eyebrow>
        {/* The word arrives after the card: its space is kept so nothing below moves. */}
        <div className="mt-3 flex min-h-[4.75rem] flex-wrap items-end justify-between gap-x-6 gap-y-2">
          {word && (
            <>
              <div className="min-w-0">
                <Jp jp={word.jp} className="font-jp text-2xl" />
                <p className="mt-1 text-sm text-ink-2">{word.meaning}</p>
              </div>
              <Link href={`/dictionary?q=${encodeURIComponent(plainOf(word.jp, false))}`} className="text-sm text-accent hover:underline">
                In the dictionary <span aria-hidden>→</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
