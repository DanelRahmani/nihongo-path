// Checks the lesson dictionary against JMdict (jmdict-simplified JSON, EDRDG, CC BY-SA 4.0):
//   npm run check-words -- path/to/jmdict-eng-common-*.json
// Each entry's written form and reading must be a JMdict pair, and its part of speech and verb class must
// agree with JMdict's tags. Prints what doesn't match; the meanings are ours and aren't compared.
import { readFileSync } from "node:fs";
import { WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { plainOf, readingOf } from "@/lib/markup";

type Entry = { kanji: { text: string }[]; kana: { text: string }[]; sense: { partOfSpeech: string[] }[] };
const jm = JSON.parse(readFileSync(process.argv[2], "utf8")).words as Entry[];

const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

const byForm = new Map<string, Entry[]>();
for (const e of jm) for (const f of [...e.kanji, ...e.kana]) byForm.set(f.text, [...(byForm.get(f.text) ?? []), e]);

const POS: Record<string, (tags: string[]) => boolean> = {
  verb: (t) => t.some((x) => /^v(1|5|k|s)/.test(x)),
  "i-adj": (t) => t.some((x) => x === "adj-i" || x === "adj-ix"),
  "na-adj": (t) => t.includes("adj-na"),
  noun: (t) => t.some((x) => x.startsWith("n")),
};
const CLASS: Record<string, (tags: string[]) => boolean> = {
  ichidan: (t) => t.includes("v1"),
  godan: (t) => t.some((x) => x.startsWith("v5")),
  suru: (t) => t.some((x) => x.startsWith("vs")),
  kuru: (t) => t.includes("vk"),
};

let problems = 0;
for (const w of [...WORDS, ...EXTRA_WORDS]) {
  const written = plainOf(w.jp, false);
  const reading = toHiragana(readingOf(w.jp, false));
  const entries = (byForm.get(written) ?? []).filter((e) => e.kana.some((k) => toHiragana(k.text) === reading));
  const say = (msg: string) => {
    problems++;
    console.log(`${w.jp}: ${msg}`);
  };
  if (!entries.length) {
    say("not a JMdict (written, reading) pair in the common-words file");
    continue;
  }
  const tags = entries.flatMap((e) => e.sense.flatMap((s) => s.partOfSpeech));
  if (POS[w.pos] && !POS[w.pos](tags)) say(`pos ${w.pos}, JMdict has ${[...new Set(tags)].join(",")}`);
  if (w.verb && !CLASS[w.verb](tags)) say(`verb class ${w.verb}, JMdict has ${[...new Set(tags)].join(",")}`);
}
console.log(`${WORDS.length + EXTRA_WORDS.length} words, ${problems} to look at`);
