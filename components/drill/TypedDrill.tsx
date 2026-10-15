"use client";

import { type ReactNode, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Check, Deck } from "@/lib/decks";
import { deckState, deckStats, nextCard, practiceCard, type SrsState, unlockedGroupCount, unlockGroup } from "@/lib/srs";
import { useStore } from "@/lib/storage";
import { answerScheduled, logAnswer, newCardsLeft, newCardsStore, srsStore, studyStore } from "@/lib/stores";
import { newLeft } from "@/lib/new-cards";
import { CaughtUp } from "@/components/drill/CaughtUp";
import { dayKey } from "@/lib/today";
import { fieldClass } from "@/components/ui/field";
import { KeyboardHelp, typedWithoutJapanese } from "@/components/ui/KeyboardHelp";

type Phase = "ask" | "wrong";

/** False on the server and while hydrating, true after: the schedule lives in the browser only. */
const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

/**
 * An answer side's word, with its kanji and their furigana shown in Kana only mode too (`[!…]`): the drills are
 * about the spelling. In the other modes it follows the reader's furigana setting, like any line.
 */
export const showKanji = (word: string) => word.replace(/\[(?!!)/g, "[!");

export const isJapanese = (s: string) => /[぀-ヿ\p{Script=Han}]/u.test(s);

export interface TypedDrillProps<C extends { id: string }> {
  deck: Deck<C>;
  /** The card's question side. */
  front: (card: C) => ReactNode;
  /** What the answer side adds below "It's …": the right answer, and anything else worth showing. */
  answer: (card: C) => ReactNode;
  /** The line under the answer box after a right answer (aria-hidden; `said` is read out instead). */
  right: (card: C, check: Check) => ReactNode;
  said: (card: C, check: Check) => string;
  /** The stats line's name for a group: "groups", "lessons". */
  groupsName: string;
  placeholder: string;
  /** Shown when nothing is open (a deck whose cards open with lessons). */
  empty?: ReactNode;
  /** The stats line's count, when "N of M groups open" doesn't fit the deck: "3 lessons done". */
  openLabel?: string;
  /** The announcement's start when a group opens: "New kanji open". */
  unlockLabel?: string;
  /** The deck may open groups by hand ("I know these"). */
  manualUnlock?: boolean;
  /**
   * Focus the answer box when the first card shows (default). Off when the drill remounts after a choice the
   * reader is still making, such as the polite/casual switch.
   */
  focusFirst?: boolean;
}

/**
 * A drill answered by typing with a Japanese keyboard (the kanji cards, the vocabulary deck): the next due or new
 * card of a deck, checked by the deck, scheduled in its own deck (lib/srs.ts), misses to the notebook. The server
 * sends an empty card: which card comes first depends on the reader's schedule.
 */
export function TypedDrill<C extends { id: string }>({
  deck,
  front,
  answer,
  right,
  said,
  groupsName,
  placeholder,
  empty,
  openLabel,
  unlockLabel = "New cards open",
  manualUnlock = false,
  focusFirst = true,
}: TypedDrillProps<C>) {
  const mounted = useMounted();
  const [srs, setSrs] = useStore(srsStore);
  const [practice, setPractice] = useState(false);
  // undefined: no card picked yet, so the first comes from the schedule; null: nothing left to ask.
  const [picked, setPicked] = useState<C | null | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("ask");
  const [input, setInput] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [last, setLast] = useState<{ card: C; check: Check; typed: string } | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not check the answer.
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);

  const own = (state: SrsState) => deckState(state, deck.id);
  const [study] = useStore(studyStore);
  const [newCards] = useStore(newCardsStore);
  // Today's allowance, from the clock now: a limit raised in another tab, or a new day, opens new cards again.
  const left = newLeft(newCards, dayKey(new Date()), study.newPerDay);
  const fromSchedule = picked === undefined || (picked === null && !practice && left > 0);
  const current = fromSchedule ? (mounted ? nextCard(deck, own(srs), now, undefined, left) : null) : picked;

  // After a miss the answer box is gone: put focus on "Next card", so Enter moves on.
  useEffect(() => {
    if (phase === "wrong") nextButton.current?.focus();
  }, [phase]);

  const advance = (state: SrsState, lastId: string | undefined, inPractice = practice) => {
    const t = Date.now();
    setNow(t);
    setPicked(inPractice ? practiceCard(deck, own(state), lastId, Math.random()) : nextCard(deck, own(state), t, lastId, newCardsLeft(t)));
    setInput("");
    setPhase("ask");
  };

  const submit = () => {
    if (!current || !input.trim()) return;
    const check = deck.check(current, input);
    logAnswer(deck.id, current.id, check.correct);
    let state = srsStore.get();
    if (!practice) {
      const before = unlockedGroupCount(deck, own(state));
      state = answerScheduled(state, deck.id, current.id, check.correct, Date.now());
      setSrs(state);
      const after = unlockedGroupCount(deck, own(state));
      if (after > before && !deck.isOpen) setUnlocked(deck.groupLabel(deck.groups[after - 1]));
    }
    setScore((s) => (check.correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
    setLast({ card: current, check, typed: input });
    if (check.correct) advance(state, current.id);
    else {
      setPicked(current);
      setPhase("wrong");
    }
  };

  const unlockNext = () => {
    const state = unlockGroup(srs, deck.id);
    setSrs(state);
    setUnlocked(deck.groupLabel(deck.groups[unlockedGroupCount(deck, own(state)) - 1]));
    advance(state, undefined, false);
  };

  const open = unlockedGroupCount(deck, own(srs));
  const stats = deckStats(deck, own(srs), now);
  // Nothing to ask because today's new cards are used up (I7), though new ones are waiting.
  const heldByLimit = left <= 0 && nextCard(deck, own(srs), now) !== null;
  const status = unlocked ? `${unlockLabel}: ${unlocked}` : last?.check.correct && phase === "ask" ? said(last.card, last.check) : "";

  // Nothing to ask at all; a card studied before its lesson was unmarked still counts.
  if (mounted && stats.unlocked === 0 && empty) return <>{empty}</>;

  return (
    <div>
      <div className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm ${mounted ? "" : "invisible"}`}>
        <span className="text-ink-2 tabular-nums">
          {stats.learned}/{stats.total} learned · {openLabel ?? `${open} of ${deck.groups.length} ${groupsName} open`}
        </span>
        <span className="flex items-center gap-3 text-ink-2 tabular-nums">
          <span className="text-good">○ {score.right}</span>
          <span className="text-accent">✕ {score.wrong}</span>
          {practice && <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-xs text-ink">Practice</span>}
        </span>
      </div>
      <ProgressBar value={stats.learned} max={stats.total} className="mt-3" />

      {/* Always mounted, so screen readers announce each change. */}
      <p role="status" className={`mt-4 text-sm ${unlocked ? "rounded-2xl bg-good-soft px-4 py-3" : "sr-only"}`}>
        {status}
      </p>

      {!mounted ? (
        <div aria-hidden className="mt-6 min-h-64 rounded-panel border-2 border-line bg-surface" />
      ) : current ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (phase === "wrong") advance(srsStore.get(), current.id);
            else if (!composing.current) submit();
          }}
          className="mt-6"
        >
          <div
            className={`grid min-h-64 place-items-center rounded-panel border-2 p-6 text-center transition-colors duration-200 ${
              phase === "wrong" ? "border-accent bg-accent-soft" : "border-line bg-surface shadow-card"
            }`}
          >
            {phase === "ask" ? (
              <div key={current.id} className="rise">
                {front(current)}
              </div>
            ) : (
              <div id={`${deck.id}-answer`} className="rise">
                <p className="text-sm text-ink-2">It&apos;s</p>
                {answer(current)}
                <p className="mt-3 text-sm text-ink-2">
                  You typed <span lang={isJapanese(last?.typed ?? "") ? "ja" : undefined}>“{last?.typed}”</span>
                </p>
                {last?.check.note && <p className="mt-1 text-sm text-ink-2">{last.check.note}</p>}
                {(deck.prompt(current).answerIn ?? "ja") === "ja" && typedWithoutJapanese(last?.typed ?? "") && <KeyboardHelp className="mt-1" />}
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {phase === "ask" ? (
              <>
                <input
                  key={`${current.id}-${score.right + score.wrong}`}
                  // Every later card is focused; the first only when the page asked for it.
                  autoFocus={focusFirst || score.right + score.wrong > 0}
                  lang="ja"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onCompositionStart={() => (composing.current = true)}
                  onCompositionEnd={() => (composing.current = false)}
                  // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
                  onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
                  aria-label={deck.prompt(current).ask}
                  placeholder={placeholder}
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
              <Button ref={nextButton} type="submit" size="lg" aria-describedby={`${deck.id}-answer`} className="flex-1">
                Next card
              </Button>
            )}
          </div>
          <p aria-hidden className="mt-3 min-h-5 text-sm text-ink-2">
            {last?.check.correct && phase === "ask" && right(last.card, last.check)}
          </p>
          {practice && (
            <Button
              variant="ghost"
              size="sm"
              className="-ml-3"
              onClick={() => {
                setPractice(false);
                advance(srsStore.get(), undefined, false);
              }}
            >
              ← Back to reviews
            </Button>
          )}
        </form>
      ) : (
        <CaughtUp
          nextDue={stats.nextDue}
          now={now}
          held={heldByLimit}
          started={Object.keys(own(srs).cards).length > 0}
          onPractise={() => {
            setPractice(true);
            advance(srsStore.get(), undefined, true);
          }}
          unlock={manualUnlock && open < deck.groups.length ? { label: "I know these: open the next group", onClick: unlockNext } : undefined}
        />
      )}
    </div>
  );
}
