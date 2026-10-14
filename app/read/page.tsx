import type { Metadata } from "next";
import { Jp } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { READING, type ReadingLine, type ReadingText } from "@/content/reading";
import { plainOf } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";

export const metadata: Metadata = { title: "Reading" };

/** A line's romaji and English, folded away so the reader tries the Japanese first. */
function Meaning({ line, center = false }: { line: ReadingLine; center?: boolean }) {
  return (
    <details className="mt-1 text-sm">
      <summary className={`w-fit cursor-pointer rounded py-1 text-xs text-ink-2 hover:text-ink ${center ? "mx-auto" : ""}`}>
        Meaning
        <span className="sr-only">
          {" "}of <span lang="ja">{plainOf(line.jp)}</span>
        </span>
      </summary>
      <p className="mt-1 text-ink-2">{romajiOf(line.price ? `${line.jp} ${line.price}` : line.jp)}</p>
      <p className="text-ink">{line.en}</p>
    </details>
  );
}

function Line({ line, className = "", center = false, inspect = true }: { line: ReadingLine; className?: string; center?: boolean; inspect?: boolean }) {
  return (
    <div>
      <Jp jp={line.jp} romaji={false} inspect={inspect} className={className} />
      <Meaning line={line} center={center} />
    </div>
  );
}

function Text({ text }: { text: ReadingText }) {
  switch (text.kind) {
    case "sign":
      return (
        <div className="mx-auto max-w-xs rounded-lg border-4 border-double border-ink bg-surface px-6 py-7 text-center">
          {text.lines.map((line, i) => (
            <Line key={i} line={line} center className={i === 0 ? "font-jp text-3xl font-bold" : i === text.lines.length - 1 ? "mt-4 font-jp text-base" : "mt-4 font-jp text-lg"} />
          ))}
        </div>
      );
    case "menu":
      return (
        <div className={panelClass("surface", "px-5 py-6 sm:px-7")}>
          <p lang="ja" className="text-center font-serif text-2xl font-bold tracking-[0.3em]">
            メニュー
          </p>
          <ul className="mt-5 flex flex-col gap-3">
            {text.lines.map((line, i) =>
              line.price ? (
                <li key={i}>
                  <div className="flex items-baseline gap-2 font-jp text-lg">
                    <Jp jp={line.jp} romaji={false} />
                    <span aria-hidden className="mb-1 flex-1 border-b border-dotted border-line-strong" />
                    <Jp jp={line.price} romaji={false} />
                  </div>
                  <Meaning line={line} />
                </li>
              ) : (
                <li key={i} className="mt-2 border-t border-line pt-4">
                  <Line line={line} className="font-jp text-base" />
                </li>
              ),
            )}
          </ul>
        </div>
      );
    case "chat":
      return (
        <ol className={panelClass("well", "flex flex-col gap-3 p-4 sm:p-5")}>
          {text.lines.map((line, i) => {
            const mine = line.from === "me";
            return (
              <li key={i} className={`flex max-w-[85%] flex-col ${mine ? "items-end self-end" : "items-start self-start"}`}>
                {mine ? (
                  <span className="sr-only">You:</span>
                ) : (
                  text.them && (
                    <span className="mb-1 px-1 font-jp text-xs text-ink-2">
                      <Jp jp={text.them} romaji={false} inspect={false} />
                      <span className="sr-only">:</span>
                    </span>
                  )
                )}
                <div className={`rounded-2xl px-4 py-2.5 ${mine ? "rounded-br-md bg-accent-soft" : "rounded-bl-md bg-surface shadow-card"}`}>
                  <Line line={line} className="font-jp text-base" />
                </div>
              </li>
            );
          })}
        </ol>
      );
    case "news":
      return (
        <div className="border-y-2 border-ink py-5">
          <p className="text-xs font-bold tracking-[0.2em] text-accent uppercase">News</p>
          {text.lines.map((line, i) => (
            <Line key={i} line={line} className={i === 0 ? "mt-2 font-jp text-3xl font-bold" : "mt-4 font-jp text-base"} />
          ))}
        </div>
      );
    case "story":
      return (
        <div className={panelClass("surface", "flex flex-col gap-4 px-5 py-6 sm:px-7")}>
          {text.lines.map((line, i) => (
            <Line key={i} line={line} className="font-jp text-lg leading-relaxed" />
          ))}
        </div>
      );
    case "haiku":
      return (
        <figure aria-label={`${text.title} by ${text.author}`} className="py-2 text-center">
          {/* Not inspectable: most of their words and kanji are outside the app's dictionary (STYLE.md §5). */}
          {text.lines.map((line, i) => (
            <Line key={i} line={line} center inspect={false} className="font-serif text-2xl leading-loose" />
          ))}
          <figcaption className="mt-3 text-sm text-ink-2">
            {text.author} · <span className="text-xs">{text.source}</span>
          </figcaption>
        </figure>
      );
  }
}

export default function ReadPage() {
  const original = READING.filter((t) => t.kind !== "haiku");
  const haiku = READING.filter((t) => t.kind === "haiku");
  return (
    <div className="reading-view mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Practice reading</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">読む</span> <span className="text-2xl text-ink-2">Reading</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        Japanese as you meet it: a sign, a menu, a chat, a headline, a short story and four haiku. The kanji show without
        readings; try each line first, then open its meaning, or tap a word.
      </p>

      <label className="reading-toggle sticky z-10 mt-6 flex w-fit cursor-pointer items-center gap-2.5 rounded-full border border-line-strong bg-surface px-4 py-2 text-sm shadow-card ring-within">
        <input type="checkbox" className="show-readings size-4 accent-[var(--accent)]" />
        Show readings over the kanji
      </label>

      {original.map((text) => (
        <section key={text.slug} aria-labelledby={`${text.slug}-title`} className="mt-12">
          <h2 id={`${text.slug}-title`} className="mb-4 text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">
            {text.title}
          </h2>
          <Text text={text} />
        </section>
      ))}

      <section aria-labelledby="haiku-title" className="mt-14">
        <h2 id="haiku-title" className="mb-4 text-xs font-medium tracking-[0.2em] text-ink-2 uppercase">
          Haiku
        </h2>
        <div className={panelClass("tint", "flex flex-col gap-8 px-5 py-8 sm:px-8")}>
          {haiku.map((text) => (
            <Text key={text.slug} text={text} />
          ))}
        </div>
        <p className="mt-4 text-xs leading-relaxed text-ink-2">
          The haiku are in the public domain; the translations are ours. Their texts and readings are to be checked against the
          editions named under each one.
        </p>
      </section>
    </div>
  );
}
