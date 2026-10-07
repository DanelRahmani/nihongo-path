"use client";

import { useState } from "react";
import { Chip } from "@/components/ui/Chip";
import { chartRows, isN, KANA, type Kana, type KanaGroup, type Script } from "@/content/kana";
import { UNLOCK_BOX } from "@/lib/srs";
import { srsStore } from "@/lib/stores";
import { useStore } from "@/lib/storage";

const GROUPS: { group: KanaGroup; title: string; note: string }[] = [
  { group: "base", title: "Basic sounds", note: "The 46 core characters, read across: a · i · u · e · o." },
  { group: "dakuten", title: "Dakuten & handakuten", note: "Two ticks (゛) voice a sound: か ka → が ga. A circle (゜) turns h into p: は → ぱ." },
  { group: "yoon", title: "Combinations", note: "An i-sound plus a small ゃ ゅ ょ merges into one beat: き + ゃ → きゃ kya." },
];

function KanaCell({ k, hideRomaji, learned }: { k: Kana; hideRomaji: boolean; learned: boolean }) {
  return (
    <div
      tabIndex={hideRomaji ? 0 : undefined}
      className="group relative flex aspect-square flex-col items-center justify-center rounded-2xl border border-line bg-surface transition-[border-color,box-shadow] duration-150 hover:border-accent hover:shadow-card"
    >
      <span lang="ja" className="font-jp text-[1.65rem] leading-none font-medium sm:text-3xl">
        {k.char}
      </span>
      <span
        className={`mt-1.5 text-[0.7rem] tracking-wide text-ink-2 transition-opacity sm:text-xs ${
          hideRomaji ? "opacity-0 group-hover:opacity-100 group-focus:opacity-100" : ""
        }`}
      >
        {k.romaji[0]}
      </span>
      {learned && <span aria-label="learned" className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-accent" />}
    </div>
  );
}

export function KanaChart() {
  const [script, setScript] = useState<Script>("hiragana");
  const [hideRomaji, setHideRomaji] = useState(false);
  const [srs] = useStore(srsStore);
  const learned = (k: Kana) => (srs.cards[k.id]?.box ?? 0) >= UNLOCK_BOX;
  const n = KANA.find((k) => k.script === script && isN(k))!;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Script" className="flex gap-2">
          {(["hiragana", "katakana"] as const).map((s) => (
            <Chip key={s} active={script === s} onClick={() => setScript(s)}>
              <span lang="ja" className="font-serif">
                {s === "hiragana" ? "ひらがな" : "カタカナ"}
              </span>
              <span className="hidden sm:inline">{s === "hiragana" ? "Hiragana" : "Katakana"}</span>
            </Chip>
          ))}
        </div>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-2">
          <input
            type="checkbox"
            checked={hideRomaji}
            onChange={(e) => setHideRomaji(e.target.checked)}
            className="size-4 accent-[var(--accent)]"
          />
          Hide romaji (hover or tap to peek)
        </label>
      </div>

      {GROUPS.map(({ group, title, note }) => (
        <section key={group} className="mt-10">
          <h2 className="font-serif text-xl font-bold">{title}</h2>
          <p className="mt-1 text-sm text-ink-2">{note}</p>
          <div className={`mt-4 grid gap-1.5 sm:gap-2 ${group === "yoon" ? "grid-cols-3 sm:max-w-md" : "grid-cols-5"}`}>
            {chartRows(script, group).flatMap(({ row, cells }) =>
              cells.map((k, i) =>
                k && !isN(k) ? (
                  <KanaCell key={k.id} k={k} hideRomaji={hideRomaji} learned={learned(k)} />
                ) : (
                  <span key={`${row}-${i}`} aria-hidden />
                ),
              ),
            )}
          </div>
          {group === "base" && (
            <div className="mt-2 grid grid-cols-5 gap-1.5 sm:gap-2">
              <KanaCell k={n} hideRomaji={hideRomaji} learned={learned(n)} />
              <p className="col-span-4 self-center pl-2 text-sm text-ink-2">
                <span lang="ja" className="font-serif text-ink">
                  {n.char}
                </span>{" "}
                is the only consonant that stands alone.
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
