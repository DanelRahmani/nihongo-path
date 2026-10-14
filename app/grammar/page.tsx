import type { Metadata } from "next";
import Link from "next/link";
import { Jp, Rich } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { panelClass } from "@/components/ui/Panel";
import { GRAMMAR, GRAMMAR_TOPICS } from "@/content/grammar";
import { ALL_LESSONS } from "@/content/units";

export const metadata: Metadata = { title: "Grammar overview" };

const LESSONS = new Map(ALL_LESSONS.map((l) => [l.key, l]));

export default function GrammarPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Reference</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">
        <span lang="ja">文法</span> <span className="text-2xl text-ink-2">Grammar overview</span>
      </h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        The constructions the particle, grammar and verb lessons teach, on one page: the pattern, what it means, and an example from its lesson. Tap a
        word for its meaning, or follow the link to the lesson for the full story.
      </p>

      <nav aria-label="Grammar groups" className="scroll-strip -mx-4 mt-8 flex gap-1.5 overflow-x-auto px-4 py-1">
        {GRAMMAR.map((g) => (
          <a
            key={g.slug}
            href={`#${g.slug}`}
            className="flex h-9 shrink-0 items-center rounded-full border border-line-strong bg-surface px-4 text-sm whitespace-nowrap text-ink-2 transition-colors duration-150 hover:border-ink-2 hover:text-ink focus-visible:-outline-offset-2"
          >
            {g.title}
          </a>
        ))}
      </nav>

      {GRAMMAR.map((group) => (
        <section key={group.slug} id={group.slug} aria-labelledby={`${group.slug}-heading`} className="mt-14 scroll-mt-24">
          <h2 id={`${group.slug}-heading`} className="font-serif text-2xl font-bold">
            {group.title}
          </h2>
          <div className="mt-5 flex flex-col gap-4">
            {group.topics.map((topic) => {
              const lesson = LESSONS.get(topic.lesson)!;
              return (
                <article key={topic.slug} id={topic.slug} aria-labelledby={`${topic.slug}-pattern`} className={panelClass("surface", "scroll-mt-24 p-5 sm:p-6")}>
                  <h3 id={`${topic.slug}-pattern`} className="font-serif text-xl font-bold">
                    <Rich text={topic.pattern} />
                  </h3>
                  <p className="mt-1.5 text-ink-2">
                    <Rich text={topic.meaning} />
                  </p>
                  <ul className="mt-4 flex flex-col gap-3 border-t border-line pt-4">
                    {topic.examples.map((example) => (
                      <li key={example.jp}>
                        <Jp jp={example.jp} className="font-jp text-lg" />
                        <p className="mt-0.5 text-sm text-ink-2">
                          {example.register && <span className="mr-2 text-xs font-medium tracking-wider uppercase">{example.register}</span>}
                          {example.en}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <Link href={lesson.href} className="mt-4 inline-block text-sm font-medium text-accent hover:underline">
                    Lesson: <Rich text={lesson.lesson.title} /> <span aria-hidden>→</span>
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <p className="mt-12 text-xs text-ink-2">{GRAMMAR_TOPICS.length} constructions from {new Set(GRAMMAR_TOPICS.map((t) => t.lesson)).size} lessons.</p>
    </div>
  );
}
