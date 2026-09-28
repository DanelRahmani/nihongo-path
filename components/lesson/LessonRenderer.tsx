import Link from "next/link";
import { Cell, Jp, Rich } from "@/components/Jp";
import type { Block, Example } from "@/content/types";

function ExampleRow({ ex }: { ex: Example }) {
  return (
    <div className="py-4">
      <Jp jp={ex.jp} className="font-serif text-2xl leading-relaxed font-medium sm:text-[1.7rem]" />
      <Rich text={ex.en} className="mt-1.5 block text-[0.95rem] text-ink" />
      {ex.note && <Rich text={ex.note} className="mt-1 block text-sm text-ink-2" />}
    </div>
  );
}

const CALLOUT = {
  mistake: { jp: "注意", label: "Common mistake" },
  culture: { jp: "文化", label: "Culture note" },
  tip: { jp: "コツ", label: "Tip" },
} as const;

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "idea":
      return (
        <div className="my-8 border-y border-line py-6">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            <span lang="ja" className="mr-2 font-serif text-sm tracking-normal">
              要点
            </span>
            The idea
          </p>
          <Rich text={block.text} className="mt-3 block font-serif text-2xl leading-snug font-medium sm:text-[1.75rem]" />
        </div>
      );

    case "heading":
      return (
        <h2 className="mt-12 mb-3 flex items-center gap-3 font-serif text-2xl font-bold">
          <span aria-hidden className="h-5 w-1 bg-accent" />
          <Rich text={block.text} />
        </h2>
      );

    case "text":
      return <Rich text={block.text} className="my-4 block text-[1.05rem] leading-8" />;

    case "examples":
      return (
        <div className="my-4 divide-y divide-line border-y border-line">
          {block.items.map((ex, i) => (
            <ExampleRow key={i} ex={ex} />
          ))}
        </div>
      );

    case "pair":
      return (
        <figure className="my-6">
          {block.title && <Rich text={block.title} className="mb-3 block text-sm font-medium text-ink-2" />}
          <div className="grid gap-3 sm:grid-cols-2">
            {[block.a, block.b].map((ex, i) => (
              <div key={i} className="rounded-2xl border border-line bg-paper-2 p-5">
                <span className="mb-2 block text-xs font-medium tracking-[0.18em] text-ink-2">{i === 0 ? "A" : "B"}</span>
                <Jp jp={ex.jp} className="font-serif text-2xl leading-relaxed font-medium" />
                <Rich text={ex.en} className="mt-2 block text-[0.95rem]" />
                {ex.note && <Rich text={ex.note} className="mt-1 block text-sm text-ink-2" />}
              </div>
            ))}
          </div>
          <figcaption className="mt-3 flex gap-3 rounded-xl bg-accent-soft px-4 py-3 text-[0.95rem] leading-7">
            <span aria-hidden className="font-serif text-accent">
              →
            </span>
            <Rich text={block.diff} />
          </figcaption>
        </figure>
      );

    case "table":
      return (
        <figure className="my-6">
          <div className="overflow-x-auto rounded-2xl border border-line">
            <table className="w-full border-collapse text-left text-[0.95rem]">
              <thead className="bg-paper-2">
                <tr>
                  {block.headers.map((h, i) => (
                    <th key={i} scope="col" className="px-4 py-3 text-xs font-medium tracking-wider whitespace-nowrap text-ink-2 uppercase">
                      <Rich text={h} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr key={r} className="border-t border-line">
                    {row.map((cell, c) => (
                      <td key={c} className={`px-4 py-3 align-top ${c === 0 ? "font-medium" : ""}`}>
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
        <aside className="my-6 rounded-2xl border border-line p-5">
          <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-ink-2 uppercase">
            <span lang="ja" className="hanko size-7 text-[0.7rem] tracking-normal">
              {c.jp.slice(0, 2)}
            </span>
            {block.title ?? c.label}
          </p>
          <Rich text={block.text} className="mt-3 block leading-7" />
        </aside>
      );
    }

    case "dialogue":
      return (
        <figure className="my-6 rounded-2xl border border-line p-5">
          <ol className="space-y-4">
            {block.lines.map((line, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`mt-1 grid size-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    i % 2 === 0 ? "bg-accent text-on-accent" : "bg-paper-2 text-ink"
                  }`}
                >
                  {line.speaker}
                </span>
                <div>
                  <Jp jp={line.jp} className="font-serif text-xl leading-relaxed font-medium" />
                  <Rich text={line.en} className="mt-0.5 block text-sm text-ink-2" />
                </div>
              </li>
            ))}
          </ol>
          {block.note && <Rich text={block.note} className="mt-4 block border-t border-line pt-3 text-sm text-ink-2" />}
        </figure>
      );

    case "link":
      return (
        <Link
          href={block.href}
          className="group my-6 flex items-center justify-between gap-4 rounded-2xl border border-line p-5 transition-colors hover:border-accent"
        >
          <span>
            <span className="block font-medium group-hover:text-accent">{block.label}</span>
            {block.text && <Rich text={block.text} className="mt-1 block text-sm text-ink-2" />}
          </span>
          <span aria-hidden className="text-xl text-accent transition-transform group-hover:translate-x-1">
            →
          </span>
        </Link>
      );
  }
}

export function LessonRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => (
        <BlockView key={i} block={b} />
      ))}
    </div>
  );
}
