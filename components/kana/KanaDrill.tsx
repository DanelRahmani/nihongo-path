"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { panelClass } from "@/components/ui/Panel";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { Kana } from "@/content/kana";
import { type Check, KANA_DECKS, type KanaDeck } from "@/lib/decks";
import { deckState, deckStats, nextCard, practiceCard, type SrsState, unlockedGroupCount, unlockGroup } from "@/lib/srs";
import { answerScheduled, logAnswer, newCardsLeft, newCardsStore, srsStore, studyStore } from "@/lib/stores";
import { newLeft } from "@/lib/new-cards";
import { CaughtUp } from "@/components/drill/CaughtUp";
import { dayKey } from "@/lib/today";
import { useStore } from "@/lib/storage";
import { useAnswerClock } from "@/lib/answer-clock";
import { fieldClass } from "@/components/ui/field";

function DeckPicker({ onStart }: { onStart: (deck: KanaDeck) => void }) {
  const [srs] = useStore(srsStore);
  const [now] = useState(() => Date.now());

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {KANA_DECKS.map((deck) => {
        const s = deckStats(deck, deckState(srs, deck.id), now);
        const sample = deck.cards.slice(0, 3).map((k) => k.char).join("");
        return (
          <button
            key={deck.id}
            type="button"
            onClick={() => onStart(deck)}
            className={panelClass(
              "surface",
              "group p-5 text-left transition-[box-shadow,transform,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <span lang="ja" className="font-jp text-3xl font-bold group-hover:text-accent">
                {sample}
              </span>
              {s.due > 0 && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-on-accent tabular-nums">
                  {s.due} due
                </span>
              )}
            </div>
            <p className="mt-3 font-medium">{deck.title}</p>
            <ProgressBar value={s.learned} max={s.total} className="mt-3" />
            <p className="mt-2 text-xs text-ink-2 tabular-nums">
              {s.learned}/{s.total} learned · {s.fresh} new ready
            </p>
          </button>
        );
      })}
    </div>
  );
}

type Phase = "ask" | "wrong";

function Session({ deck, onExit }: { deck: KanaDeck; onExit: () => void }) {
  const [srs, setSrs] = useStore(srsStore);
  const [practice, setPractice] = useState(false);
  const [study] = useStore(studyStore);
  const [newCards] = useStore(newCardsStore);
  const [picked, setCurrent] = useState<Kana | null>(() => nextCard(deck, deckState(srsStore.get(), deck.id), Date.now(), undefined, newCardsLeft(Date.now())));
  const [phase, setPhase] = useState<Phase>("ask");
  const [input, setInput] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [last, setLast] = useState<{ kana: Kana; check: Check } | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const nextButton = useRef<HTMLButtonElement>(null);
  // Today's allowance, from the clock now: a limit raised in another tab, or a new day, opens new cards again.
  const left = newLeft(newCards, dayKey(new Date()), study.newPerDay);
  const current = picked === null && !practice && left > 0 ? nextCard(deck, deckState(srs, deck.id), now, undefined, left) : picked;
  const clock = useAnswerClock(current?.id);

  // After a miss the answer box is gone: put focus on "Next card", so Enter moves on (autoFocus doesn't fire here).
  useEffect(() => {
    if (phase === "wrong") nextButton.current?.focus();
  }, [phase]);

  const advance = (state: SrsState, lastId: string | undefined, inPractice = practice) => {
    const t = Date.now();
    setNow(t);
    const own = deckState(state, deck.id);
    setCurrent(inPractice ? practiceCard(deck, own, lastId, Math.random()) : nextCard(deck, own, t, lastId, newCardsLeft(t)));
    setInput("");
    setPhase("ask");
  };

  const submit = () => {
    if (!current || !input.trim()) return;
    const check = deck.check(current, input);
    const { correct } = check;
    // Practice answers count for the daily goal and the notebook, but leave the schedule alone.
    logAnswer(deck.id, current.id, correct, { answer: input, ms: clock.ms(), ...(practice ? { mode: "p" as const } : {}) });
    let state = srsStore.get();
    if (!practice) {
      const before = unlockedGroupCount(deck, deckState(state, deck.id));
      state = answerScheduled(state, deck.id, current.id, correct, Date.now());
      setSrs(state);
      const after = unlockedGroupCount(deck, deckState(state, deck.id));
      if (after > before) setUnlocked(deck.groupLabel(deck.groups[after - 1]));
    }
    setScore((s) => (correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
    setLast({ kana: current, check });
    if (correct) advance(state, current.id);
    else setPhase("wrong");
  };

  const unlockNextRow = () => {
    const state: SrsState = unlockGroup(srs, deck.id);
    setSrs(state);
    setUnlocked(deck.groupLabel(deck.groups[unlockedGroupCount(deck, deckState(state, deck.id)) - 1]));
    advance(state, undefined, false);
  };

  const rowsOpen = unlockedGroupCount(deck, deckState(srs, deck.id));
  const stats = deckStats(deck, deckState(srs, deck.id), now);
  // Nothing to ask because today's new cards are used up (I7), though new ones are waiting.
  const heldByLimit = left <= 0 && nextCard(deck, deckState(srs, deck.id), now) !== null;

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <Button variant="ghost" size="sm" onClick={onExit} className="-ml-3">
          ← All decks
        </Button>
        <span className="flex items-center gap-3 text-ink-2 tabular-nums">
          <span className="text-good">○ {score.right}</span>
          <span className="text-accent">✕ {score.wrong}</span>
          {practice && <span className="rounded-full bg-paper-3 px-2.5 py-0.5 text-xs text-ink">Practice</span>}
        </span>
      </div>
      <h3 className="mt-4 font-medium">{deck.title}</h3>
      <p className="text-xs text-ink-2">
        {rowsOpen} of {deck.groups.length} rows unlocked
      </p>

      {unlocked && (
        <p role="status" className="rise mt-4 rounded-2xl bg-good-soft px-4 py-3 text-sm">
          New row unlocked:{" "}
          <span lang="ja" className="font-serif text-base text-accent">
            {unlocked}
          </span>
        </p>
      )}

      {current ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (phase === "wrong") advance(srsStore.get(), current.id);
            else submit();
          }}
          className="mt-6"
        >
          <div
            className={`grid aspect-[4/3] place-items-center rounded-panel border-2 transition-colors duration-200 sm:aspect-[16/9] ${
              phase === "wrong" ? "border-accent bg-accent-soft" : "border-line bg-surface shadow-card"
            }`}
          >
            <div className="text-center">
              <span key={current.id} lang="ja" className="rise block font-jp text-8xl font-medium sm:text-9xl">
                {current.char}
              </span>
              {phase === "wrong" && (
                <p id="kana-answer" className="rise mt-3 text-lg">
                  It&apos;s <strong className="text-accent">{last?.check.canonical}</strong>
                  {current.romaji.length > 1 && (
                    <span className="text-sm text-ink-2"> (also {current.romaji.slice(1).join(", ")})</span>
                  )}
                  <span className="block text-sm text-ink-2">You typed “{input}”</span>
                  {last?.check.note && <span className="block text-sm text-ink-2">{last.check.note}</span>}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            {phase === "ask" ? (
              <>
                <input
                  key={`${current.id}-${score.right + score.wrong}`}
                  autoFocus
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  aria-label={deck.prompt(current).ask}
                  placeholder="Type the reading…"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className={fieldClass({ jp: false })}
                />
                <Button type="submit" size="lg">
                  Check
                </Button>
              </>
            ) : (
              <Button ref={nextButton} type="submit" size="lg" aria-describedby="kana-answer" className="flex-1">
                Next card
              </Button>
            )}
          </div>
          <p className="mt-3 h-5 text-sm text-ink-2" aria-live="polite">
            {last?.check.correct && phase === "ask" && (
              <>
                <span className="text-good">○</span>{" "}
                <span lang="ja" className="font-serif">
                  {last.kana.char}
                </span>{" "}
                = {last.check.canonical}
              </>
            )}
          </p>
        </form>
      ) : (
        <CaughtUp
          nextDue={stats.nextDue}
          now={now}
          held={heldByLimit}
          started={Object.keys(deckState(srs, deck.id).cards).length > 0}
          onPractise={() => {
            setPractice(true);
            advance(srsStore.get(), undefined, true);
          }}
          unlock={rowsOpen < deck.groups.length ? { label: "I know these: unlock the next row", onClick: unlockNextRow } : undefined}
        />
      )}
    </div>
  );
}

export function KanaDrill() {
  const [deck, setDeck] = useState<KanaDeck | null>(null);
  return deck ? <Session key={deck.id} deck={deck} onExit={() => setDeck(null)} /> : <DeckPicker onStart={setDeck} />;
}
