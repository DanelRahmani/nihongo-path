"use client";

import { useState } from "react";
import { type Deck, DECKS, deckCards, type Kana } from "@/content/kana";
import {
  deckStats,
  isCorrect,
  nextCard,
  practiceCard,
  schedule,
  type SrsState,
  unlockedRowCount,
} from "@/lib/srs";
import { srsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

function formatWait(ms: number): string {
  const min = Math.ceil(ms / 60_000);
  if (min < 60) return `${min} min`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"}`;
  const d = Math.round(h / 24);
  return `${d} day${d === 1 ? "" : "s"}`;
}

function rowLabel(deck: Deck, row: string): string {
  const chars = deckCards(deck)
    .filter((k) => k.row === row)
    .map((k) => k.char);
  return chars.join(" ");
}

function DeckPicker({ onStart }: { onStart: (deck: Deck) => void }) {
  const [srs] = useStore(srsStore);
  const [now] = useState(() => Date.now());

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {DECKS.map((deck) => {
        const s = deckStats(deck, srs, now);
        const pct = Math.round((s.learned / s.total) * 100);
        const sample = deckCards(deck).slice(0, 3).map((k) => k.char).join("");
        return (
          <button
            key={deck.id}
            type="button"
            onClick={() => onStart(deck)}
            className="group rounded-2xl border border-line p-5 text-left transition-colors hover:border-accent"
          >
            <div className="flex items-start justify-between gap-3">
              <span lang="ja" className="font-serif text-3xl font-bold group-hover:text-accent">
                {sample}
              </span>
              {s.due > 0 && (
                <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-bold text-on-accent tabular-nums">
                  {s.due} due
                </span>
              )}
            </div>
            <p className="mt-3 font-medium">{deck.title}</p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-2">
              <div className="h-full bg-accent transition-[width]" style={{ width: `${pct}%` }} />
            </div>
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

function Session({ deck, onExit }: { deck: Deck; onExit: () => void }) {
  const [srs, setSrs] = useStore(srsStore);
  const [practice, setPractice] = useState(false);
  const [current, setCurrent] = useState<Kana | null>(() => nextCard(deck, srsStore.get(), Date.now()));
  const [phase, setPhase] = useState<Phase>("ask");
  const [input, setInput] = useState("");
  const [score, setScore] = useState({ right: 0, wrong: 0 });
  const [last, setLast] = useState<{ kana: Kana; correct: boolean } | null>(null);
  const [unlocked, setUnlocked] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const advance = (state: SrsState, lastId: string | undefined, inPractice = practice) => {
    const t = Date.now();
    setNow(t);
    setCurrent(inPractice ? practiceCard(deck, state, lastId, Math.random()) : nextCard(deck, state, t, lastId));
    setInput("");
    setPhase("ask");
  };

  const submit = () => {
    if (!current || !input.trim()) return;
    const correct = isCorrect(current, input);
    let state = srsStore.get();
    if (!practice) {
      const before = unlockedRowCount(deck, state);
      state = { ...state, cards: { ...state.cards, [current.id]: schedule(state.cards[current.id], correct, Date.now()) } };
      setSrs(state);
      const after = unlockedRowCount(deck, state);
      if (after > before) setUnlocked(rowLabel(deck, deck.rows[after - 1]));
    }
    setScore((s) => (correct ? { ...s, right: s.right + 1 } : { ...s, wrong: s.wrong + 1 }));
    setLast({ kana: current, correct });
    if (correct) advance(state, current.id);
    else setPhase("wrong");
  };

  const unlockNextRow = () => {
    const state: SrsState = {
      ...srs,
      extraRows: { ...srs.extraRows, [deck.id]: (srs.extraRows[deck.id] ?? 0) + 1 },
    };
    setSrs(state);
    setUnlocked(rowLabel(deck, deck.rows[unlockedRowCount(deck, state) - 1]));
    advance(state, undefined, false);
  };

  const rowsOpen = unlockedRowCount(deck, srs);
  const stats = deckStats(deck, srs, now);

  return (
    <div>
      <div className="flex items-center justify-between gap-4 text-sm">
        <button type="button" onClick={onExit} className="text-ink-2 hover:text-accent">
          ← All decks
        </button>
        <span className="text-ink-2 tabular-nums">
          <span className="text-accent">○ {score.right}</span> · ✕ {score.wrong}
          {practice && <span className="ml-2 rounded-full border border-line px-2 py-0.5 text-xs">Practice</span>}
        </span>
      </div>
      <h2 className="mt-4 font-medium">{deck.title}</h2>
      <p className="text-xs text-ink-2">
        {rowsOpen} of {deck.rows.length} rows unlocked
      </p>

      {unlocked && (
        <p role="status" className="rise mt-4 rounded-xl bg-accent-soft px-4 py-3 text-sm">
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
            className={`grid aspect-[4/3] place-items-center rounded-3xl border-2 transition-colors sm:aspect-[16/9] ${
              phase === "wrong" ? "border-accent bg-accent-soft" : "border-line bg-paper-2"
            }`}
          >
            <div className="text-center">
              <span key={current.id} lang="ja" className="rise block font-serif text-8xl font-medium sm:text-9xl">
                {current.char}
              </span>
              {phase === "wrong" && (
                <p className="rise mt-3 text-lg">
                  It&apos;s <strong className="text-accent">{current.romaji[0]}</strong>
                  {current.romaji.length > 1 && (
                    <span className="text-sm text-ink-2"> (also {current.romaji.slice(1).join(", ")})</span>
                  )}
                  <span className="block text-sm text-ink-2">You typed “{input}”</span>
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
                  aria-label="Type the romaji"
                  placeholder="Type the reading…"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  className="h-14 min-w-0 flex-1 rounded-2xl border border-line bg-paper px-5 text-xl placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
                />
                <button type="submit" className="h-14 rounded-2xl bg-accent px-6 font-medium text-on-accent hover:opacity-90">
                  Check
                </button>
              </>
            ) : (
              <button
                type="submit"
                autoFocus
                className="h-14 flex-1 rounded-2xl bg-accent font-medium text-on-accent hover:opacity-90"
              >
                Next card
              </button>
            )}
          </div>
          <p className="mt-3 h-5 text-sm text-ink-2" aria-live="polite">
            {last?.correct && phase === "ask" && (
              <>
                <span className="text-accent">○</span>{" "}
                <span lang="ja" className="font-serif">
                  {last.kana.char}
                </span>{" "}
                = {last.kana.romaji[0]}
              </>
            )}
          </p>
        </form>
      ) : (
        <div className="rise mt-6 rounded-3xl border border-line p-8 text-center">
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
            <button
              type="button"
              onClick={() => {
                setPractice(true);
                advance(srsStore.get(), undefined, true);
              }}
              className="rounded-full border border-line px-5 py-2.5 text-sm hover:border-accent"
            >
              Practise anyway
            </button>
            {rowsOpen < deck.rows.length && (
              <button
                type="button"
                onClick={unlockNextRow}
                className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-on-accent hover:opacity-90"
              >
                I know these — unlock the next row
              </button>
            )}
          </div>
          <p className="mt-4 text-xs text-ink-2">Practice doesn&apos;t change your review schedule.</p>
        </div>
      )}
    </div>
  );
}

export function KanaDrill() {
  const [deck, setDeck] = useState<Deck | null>(null);
  return deck ? <Session key={deck.id} deck={deck} onExit={() => setDeck(null)} /> : <DeckPicker onStart={setDeck} />;
}
