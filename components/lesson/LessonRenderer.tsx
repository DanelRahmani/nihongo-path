import Link from "next/link";
import { Cell, Jp, Rich } from "@/components/Jp";
import { Quiz } from "@/components/lesson/Quiz";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import type { Block, Example } from "@/content/types";
import { lineRegister } from "@/lib/register";

/** The same line in the other register, beneath the original (content/STYLE.md §9). */
function AltLine({ jp, alt }: { jp: string; alt?: string }) {
  if (!alt) return null;
  return (
    <div className="mt-2 flex items-baseline gap-2.5">
      <span className="shrink-0 rounded-full bg-paper-3 px-2 py-0.5 text-[0.65rem] font-medium tracking-wider text-ink-2 uppercase">
        {lineRegister(jp) === "polite" ? "Casual" : "Polite"}
      </span>
      <Jp jp={alt} className="font-jp text-lg leading-relaxed text-ink-2" />
    </div>
  );
}

function ExampleRow({ ex }: { ex: Example }) {
  return (
    <div className="px-5 py-5 sm:px-6">
      <Jp jp={ex.jp} className="font-jp text-2xl leading-relaxed font-medium sm:text-[1.7rem]" />
      <AltLine jp={ex.jp} alt={ex.alt} />
      <Rich text={ex.en} className="mt-1.5 block text-[0.95rem] text-ink" />
      {ex.note && <Rich text={ex.note} className="mt-1 block text-sm leading-6 text-ink-2" />}
    </div>
  );
}

/** Each callout kind has its own seal and wash: a red warning, a quiet culture note, a green tip. */
const CALLOUT = {
  mistake: { jp: "注意", label: "Common mistake", box: "bg-accent-soft", seal: "text-accent" },
  culture: { jp: "文化", label: "Culture note", box: "bg-paper-2", seal: "text-ink" },
  tip: { jp: "コツ", label: "Tip", box: "bg-good-soft", seal: "text-good" },
} as const;

function BlockView({ block, lessonKey }: { block: Block; lessonKey: string }) {
  switch (block.type) {
    case "idea":
      return (
        <div className={panelClass("tint", "my-10 px-6 py-7 sm:px-8")}>
          <Eyebrow jp="要点">
            The idea
          </Eyebrow>
          <Rich
            text={block.text}
            className="mt-3 block font-serif text-2xl leading-snug font-medium text-pretty sm:text-[1.75rem]"
          />
        </div>
      );

    case "heading":
      return (
        <h2 className="mt-14 mb-4 flex items-center gap-3 font-serif text-2xl font-bold">
          <span aria-hidden className="h-6 w-1 shrink-0 rounded-full bg-accent" />
          <Rich text={block.text} />
        </h2>
      );

    case "text":
      return <Rich text={block.text} className="my-4 block text-[1.05rem] leading-8 text-pretty" />;

    case "examples":
      return (
        <div className={panelClass("surface", "my-5 divide-y divide-line")}>
          {block.items.map((ex, i) => (
            <ExampleRow key={i} ex={ex} />
          ))}
        </div>
      );

    case "pair":
      return (
        <figure className="my-7">
          {block.title && <Rich text={block.title} className="mb-3 block text-sm font-medium text-ink-2" />}
          <div className="grid gap-3 sm:grid-cols-2">
            {[block.a, block.b].map((ex, i) => (
              <div key={i} className={panelClass("surface", "p-5")}>
                <span
                  className={`mb-3 grid size-7 place-items-center rounded-full text-xs font-bold ${
                    i === 0 ? "bg-paper-3 text-ink" : "bg-accent text-on-accent"
                  }`}
                >
                  {i === 0 ? "A" : "B"}
                </span>
                <Jp jp={ex.jp} className="font-jp text-2xl leading-relaxed font-medium" />
                <AltLine jp={ex.jp} alt={ex.alt} />
                <Rich text={ex.en} className="mt-2 block text-[0.95rem]" />
                {ex.note && <Rich text={ex.note} className="mt-1 block text-sm leading-6 text-ink-2" />}
              </div>
            ))}
          </div>
          <figcaption className="mt-3 flex gap-3 rounded-2xl bg-accent-soft px-5 py-4 text-[0.95rem] leading-7">
            <span aria-hidden className="font-serif text-lg leading-7 text-accent">
              →
            </span>
            <Rich text={block.diff} />
          </figcaption>
        </figure>
      );

    case "table":
      return (
        <figure className="my-7">
          <div className={panelClass("surface", "overflow-x-auto")}>
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <thead className="bg-paper-2">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i} scope="col" className="px-5 py-3 text-xs font-medium tracking-wider whitespace-nowrap text-ink-2 uppercase">
                      <Rich text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-t border-line">
                    {row.map((cell, c) => (
                      <td key={c} className={`px-5 py-3.5 align-top ${c === 0 ? "font-medium" : ""}`}>
                        <Cell text={cell} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && <Rich text={block.caption} className="mt-2 block text-sm text-ink-2" />}
        </figure>
      );

    case "callout": {
      const c = CALLOUT[block.kind];
      return (
        <aside className={`my-7 rounded-card p-5 sm:p-6 ${c.box}`}>
          <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">
            <span lang="ja" className={`hanko size-8 text-[0.7rem] tracking-normal ${c.seal}`}>
              {c.jp}
            </span>
            <Rich text={block.title ?? c.label} />
          </p>
          <Rich text={block.text} className="mt-3 block leading-7 text-pretty" />
        </aside>
      );
    }

    case "dialogue": {
      // A chat: speakers alternate sides in the order they first speak.
      const speakers = [...new Set(block.lines.map((l) => l.speaker))];
      return (
        <figure className={panelClass("well", "my-7 p-4 sm:p-6")}>
          <ol className="space-y-3">
            {block.lines.map((line, i) => {
              const right = speakers.indexOf(line.speaker) % 2 === 1;
              return (
                <li key={i} className={`flex items-end gap-2.5 ${right ? "flex-row-reverse" : ""}`}>
                  <span
                    className={`grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                      right ? "bg-accent text-on-accent" : "bg-ink text-paper"
                    }`}
                  >
                    {line.speaker}
                  </span>
                  <div
                    className={`max-w-[85%] rounded-3xl px-4 py-3 shadow-card ${
                      right ? "rounded-br-md bg-accent-soft" : "rounded-bl-md bg-surface"
                    }`}
                  >
                    <Jp jp={line.jp} className="font-jp text-xl leading-relaxed font-medium" />
                    <AltLine jp={line.jp} alt={line.alt} />
                    <Rich text={line.en} className="mt-0.5 block text-sm text-ink-2" />
                  </div>
                </li>
              );
            })}
          </ol>
          {block.note && <Rich text={block.note} className="mt-5 block border-t border-line-strong pt-4 text-sm leading-6 text-ink-2" />}
        </figure>
      );
    }

    case "quiz":
      return <Quiz questions={block.questions} lessonKey={lessonKey} />;

    case "link":
      return (
        <Link
          href={block.href}
          className={panelClass(
            "surface",
            "group my-7 flex items-center justify-between gap-4 p-5 transition-[box-shadow,transform,border-color] duration-200 ease-soft hover:-translate-y-0.5 hover:border-line-strong hover:shadow-lift",
          )}
        >
          <span>
            <span className="block font-medium group-hover:text-accent">{block.label}</span>
            {block.text && <Rich text={block.text} className="mt-1 block text-sm text-ink-2" />}
          </span>
          <span
            aria-hidden
            className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent transition-transform duration-200 ease-soft group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      );
  }
}

/** A lesson's blocks. `lessonKey` ("unit/lesson") names the quiz's questions in the mistake notebook. */
export function LessonRenderer({ blocks, lessonKey }: { blocks: Block[]; lessonKey: string }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} lessonKey={lessonKey} />
      ))}
    </div>
  );
}
