"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { Jp } from "@/components/Jp";
import { Button } from "@/components/ui/Button";
import { panelClass } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Check } from "@/lib/decks";
import { type KanjiCard, kanjiDeck, readingOfCard, writtenOf } from "@/lib/kanji-deck";
import { answerCard, deckState, deckStats, formatWait, nextCard, practiceCard, type SrsState, unlockedGroupCount, unlockGroup } from "@/lib/srs";
import { useStore } from "@/lib/storage";
import { logAnswer, srsStore } from "@/lib/stores";

type Phase = "ask" | "wrong";

/**
 * The answer side's word, with the kanji and furigana shown in Kana only mode too (`[!…]`). In the other modes it
 * follows the reader's furigana setting, like any line: the reading was the question anyway.
 */
const shown = (word: string) => word.replace(/\[(?!!)/g, "[!");

/** False on the server and while hydrating, true after: the schedule lives in the browser only. */
const noSubscribe = () => () => {};
const useMounted = () => useSyncExternalStore(noSubscribe, () => true, () => false);

const isJapanese = (s: string) => /[぀-ヿ\p{Script=Han}]/u.test(s);

/**
 * The kanji cards: a word's reading and meaning on the front; the learner types it with a Japanese keyboard and
 * picks the kanji spelling. Scheduled in its own deck (lib/srs.ts); misses go to the notebook. The server sends
 * an empty card: which card comes first depends on the reader's schedule.
 */
export function KanjiDrill({ cards }: { cards: KanjiCard[] }) {
  const deck = useMemo(() => kanjiDeck(cards), [cards]);
  const mounted = useMounted();
  const [srs, setSrs] = useStore(srsStore);
  const [practice, setPractice] = useState(false);
  // undefined: no card picked yet, so the first comes from the schedule; null: nothing left to ask.
  const [picked, setPicked] = useState<KanjiCard | null | undefined>(undefined);
  const [phase, setPhase] = useState<Phase>("ask");
  const [input, setInput] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [last, setLast] = useState<{ card: KanjiCard; check: Check; typed: string } | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  // Enter also confirms a Japanese keyboard's conversion; that Enter must not check the answer.
  const composing = useRef(false);
  const nextButton = useRef<HTMLButtonElement>(null);

  const own = (state: SrsState) => deckState(state, deck.id);
  const current = picked === undefined ? (mounted ? nextCard(deck, own(srs), now) : null) : picked;

  // After a miss the answer box is gone: put focus on "Next card", so Enter moves on.
  useEffect(() => {
    if (phase === "wrong") nextButton.current?.focus();
  }, [phase]);

  const advance = (state: SrsState, lastId: string | undefined, inPractice = practice) => {
    const t = Date.now();
    setNow(t);
    setPicked(inPractice ? practiceCard(deck, own(state), lastId, Math.random()) : nextCard(deck, own(state), t, lastId));
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
      state = answerCard(state, deck.id, current.id, check.correct, Date.now());
      setSrs(state);
      const after = unlockedGroupCount(deck, own(state));
      if (after > before) setUnlocked(deck.groupLabel(deck.groups[after - 1]));
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
  const status = unlocked
    ? `New kanji open: ${unlocked}`
    : last?.check.correct && phase === "ask"
      ? `Right: ${writtenOf(last.card)}. ${last.card.id}: ${last.card.meanings.join(", ")}`
      : "";

  return (
    <div>
      <div className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm ${mounted ? "" : "invisible"}`}>
        <span className="text-ink-2 tabular-nums">
          {stats.learned}/{stats.total} learned · {open} of {deck.groups.length} groups open
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
                <p lang="ja" className="font-jp text-4xl font-medium sm:text-5xl">
                  {readingOfCard(current)}
                </p>
                <p className="mt-4 text-lg">{current.wordMeaning}</p>
              </div>
            ) : (
              <div id="kanji-answer" className="rise">
                <p className="text-sm text-ink-2">It&apos;s</p>
                <Jp jp={shown(current.word)} romaji={false} inspect={false} className="mt-1 font-jp text-4xl font-medium sm:text-5xl" />
                <p className="mt-3 text-sm text-ink-2">
                  You typed <span lang={isJapanese(last?.typed ?? "") ? "ja" : undefined}>“{last?.typed}”</span>
                </p>
                {last?.check.note && <p className="mt-1 text-sm text-ink-2">{last.check.note}</p>}
                <p className="mt-4 text-sm">
                  <span className="text-ink-2">This card&apos;s kanji: </span>
                  <Link href={`/kanji/${encodeURIComponent(current.id)}`} className="font-jp text-2xl text-accent hover:underline">
                    {current.id}
                  </Link>{" "}
                  <span className="text-ink-2">{current.meanings.join(", ")}</span>
                </p>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-2">
            {phase === "ask" ? (
              <>
                <input
                  key={`${current.id}-${score.right + score.wrong}`}
                  autoFocus
                  lang="ja"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onCompositionStart={() => (composing.current = true)}
                  onCompositionEnd={() => (composing.current = false)}
                  // Safari ends the composition before the Enter that confirms it, which then has keyCode 229.
                  onKeyDown={(e) => e.key === "Enter" && e.nativeEvent.keyCode === 229 && e.preventDefault()}
                  aria-label={deck.prompt(current).ask}
                  placeholder="Type it in kanji…"
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
              <Button ref={nextButton} type="submit" size="lg" aria-describedby="kanji-answer" className="flex-1">
                Next card
              </Button>
            )}
          </div>
          <p aria-hidden className="mt-3 min-h-5 text-sm text-ink-2">
            {last?.check.correct && phase === "ask" && (
              <>
                <span className="text-good">○</span>{" "}
                <span lang="ja" className="font-jp">
                  {writtenOf(last.card)}
                </span>{" "}
                · <span lang="ja">{last.card.id}</span> {last.card.meanings.join(", ")}
              </>
            )}
          </p>
          {practice && (
            <Button variant="ghost" size="sm" className="-ml-3" onClick={() => {
                setPractice(false);
                advance(srsStore.get(), undefined, false);
              }}>
              ← Back to reviews
            </Button>
          )}
        </form>
      ) : (
        <div className={panelClass("surface", "rise mt-6 p-8 text-center")}>
          <p lang="ja" className="font-serif text-5xl text-accent">
            お見事
          </p>
          <p className="mt-3 text-lg font-medium">All caught up</p>
          <p className="mt-1 text-sm text-ink-2">
            {stats.nextDue
              ? `The next card is due in ${formatWait(stats.nextDue - now)}. Spacing reviews out is what makes them stick.`
              : "Nothing is scheduled yet."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              variant="secondary"
              onClick={() => {
                setPractice(true);
                advance(srsStore.get(), undefined, true);
              }}
            >
              Practise anyway
            </Button>
            {open < deck.groups.length && <Button onClick={unlockNext}>I know these: open the next group</Button>}
          </div>
          <p className="mt-4 text-xs text-ink-2">Practice doesn&apos;t change your review schedule.</p>
        </div>
      )}
    </div>
  );
}
