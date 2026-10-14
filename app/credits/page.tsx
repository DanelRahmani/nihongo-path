import type { Metadata } from "next";
import { Rich } from "@/components/Jp";
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = { title: "Credits" };

const SOURCES: { name: string; href: string; by: string; licence: string; use: string }[] = [
  {
    name: "JMdict",
    href: "https://www.edrdg.org/wiki/index.php/JMdict-EDICT_Dictionary_Project",
    by: "the Electronic Dictionary Research and Development Group (EDRDG), through the jmdict-simplified JSON builds (github.com/scriptin/jmdict-simplified)",
    licence: "CC BY-SA 4.0",
    use: "The written forms, readings and parts of speech of the dictionary's words, which words are common, and a check on the meanings. The meanings themselves are written for this app.",
  },
  {
    name: "KANJIDIC2",
    href: "https://www.edrdg.org/wiki/index.php/KANJIDIC_Project",
    by: "the EDRDG",
    licence: "CC BY-SA 4.0",
    use: "Stroke counts, and a check on the kanji readings and the okurigana splits.",
  },
  {
    name: "常用漢字表 (the official list of kanji for general use, 2010)",
    href: "https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/",
    by: "the Agency for Cultural Affairs (文化庁), Japan",
    licence: "a government notice, outside copyright",
    use: "Which kanji and readings the app writes, and the readings on the kanji pages.",
  },
  {
    name: "wordfreq",
    href: "https://github.com/rspeer/wordfreq",
    by: "Robyn Speer, from many corpora (its README lists them)",
    licence: "data CC BY-SA 4.0, code Apache 2.0",
    use: "Word frequencies, to choose which words the dictionary adds beyond the lessons.",
  },
  {
    name: "Shippori Mincho and Zen Kaku Gothic New",
    href: "https://fonts.google.com/",
    by: "FONTDASU, and Yoshimichi Ohira, through Google Fonts",
    licence: "SIL Open Font License 1.1",
    use: "The Japanese typefaces.",
  },
];

export default function CreditsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10 pb-24 sm:px-6 sm:pt-14">
      <Eyebrow>Sources and licences</Eyebrow>
      <h1 className="mt-2 font-serif text-4xl font-bold">Credits</h1>
      <p className="mt-4 leading-relaxed text-ink-2">
        The lessons, examples, meanings and translations are written for this app. These sources supply the data around
        them. The dictionary and kanji data derived from JMdict, KANJIDIC2 and wordfreq is shared under the same licence,
        CC BY-SA 4.0.
      </p>
      <ul className="mt-8 space-y-5">
        {SOURCES.map((s) => (
          <li key={s.name} className="rounded-panel border border-line bg-surface p-5">
            <h2 className="font-medium">
              <a href={s.href} className="link-inline">
                <Rich text={s.name} />
              </a>
            </h2>
            <p className="mt-1 text-sm text-ink-2">
              By <Rich text={s.by} />. Licence: <Rich text={s.licence} />.
            </p>
            <p className="mt-2 text-sm">
              <Rich text={s.use} />
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-ink-2">
        Quoted texts: the haiku in the reading view are by Matsuo Bashō and Kobayashi Issa, as printed in the Iwanami Bunko
        editions of their haiku. The topic-comment example <span lang="ja">象は鼻が長い</span> is Mikami Akira&apos;s (1960).
      </p>
    </div>
  );
}
