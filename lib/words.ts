/**
 * Resolves the words of a lesson line against the lesson dictionary (content/words). A word resolves when it
 * is a dictionary entry, a form the conjugation engine builds from one, an entry with a prefix or suffix
 * (お[茶|ちゃ], [会議|かいぎ][中|ちゅう]), a number with a counter ([三本|さんぼん], 3[人|にん]), a name joined to its
 * suffix, or a function word. Matching uses the written form and the reading together, so a highlight inside
 * a word ([日本|にほん]{[語|ご]}) doesn't matter. Pure.
 */
import type { Jp, Word } from "@/content/types";
import { type AdjectiveForm, conjugateAdjective, conjugateVerb, type VerbClass, VERB_FORMS } from "@/lib/conjugate";
import { plainOf, readingOf } from "@/lib/markup";

/** Particles, the copula and other grammar words: resolved, but not dictionary entries. */
export const FUNCTION_WORDS = new Set([
  ..."は が を に で へ と や も の か ね よ な".split(" "),
  ..."よね から まで より って とか けど でも し など".split(" "),
  ..."だ です でした だった じゃ だったら なら でしょう だろう ん なん なの ので のに".split(" "),
]);

/**
 * Not words: the sounds, endings and particle pairs that kana charts and conjugation tables show on their own
 * (ティ, んで, ったら, は・が). Resolved so the coverage test can pass, never shown in the dictionary.
 */
export const FRAGMENTS = new Set([
  ..."ティ ディ ファ フィ フェ フォ ウィ ウェ チェ ジェ シェ ヴ うう えい おう おお".split(" "),
  ..."う く ぐ す つ ぬ ぶ む る しち".split(" "),
  ..."ます ません ました ませんでした んで いで って ったら かったら たら がは はが からまで".split(" "),
]);

const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

/** A number at the start of a word, in digits or kanji (何 asks the number). */
const NUMBER = /^([0-9０-９]+|[〇一二三四五六七八九十百千万何]+)/;

const ADJECTIVE_FORMS: AdjectiveForm[] = [
  "plain", "plainNeg", "plainPast", "plainPastNeg", "polite", "politeNeg", "politePast", "politePastNeg", "te", "adverb", "attributive", "ba", "tara",
];

/** A word's lookup key: written form and reading, with markup, highlights and word spaces removed. */
export function keyOf(jp: Jp): string {
  const clean = jp.replace(/[{}*]/g, "");
  return `${plainOf(clean, false)}|${readingOf(clean, false).replace(/\s+/g, "")}`;
}

/** The words of a lesson line: split at word spaces, with punctuation and highlights removed. */
export function lineWords(jp: Jp): Jp[] {
  return jp
    .replace(/[{}*]/g, "")
    .split(/\s+/)
    .map((w) => w.replace(/[。、？！…「」『』・〜＿,.!?()（）:：/→✗✓]+/g, ""))
    .filter((w) => w && /[぀-ヿ\p{Script=Han}0-9０-９]/u.test(w));
}

type Hit = { word: Word; form?: string };

const firstWord = (jp: Jp) => jp.split(" ")[0];

/** ている contracted onto a て form: [食|た]べてる, [食|た]べてます. */
function teContractions(te: Jp, form: string): [Jp, string][] {
  if (!/[てで]$/.test(te)) return [];
  return ["る", "た", "ます", "ません", "ました", "ない", "なかった"].map((end) => [te + end, `${form}+${end}`]);
}

/** Every one-word form the engine builds from a verb: [食|た]べ, [食|た]べた, [食|た]べられない, [食|た]べてる… */
function verbForms(jp: Jp, cls: VerbClass): [Jp, string][] {
  const out: [Jp, string][] = [];
  for (const { form } of VERB_FORMS) {
    const r = conjugateVerb(jp, cls, form);
    if (!r.ok) continue;
    for (const f of [r.jp, ...r.variants, ...(r.colloquial ?? [])]) {
      out.push([firstWord(f), form]);
      // Forms that conjugate again: たい and ない like い-adjectives, the potential and passive like る-verbs.
      if (form === "tai" || form === "plainNeg") {
        for (const af of ADJECTIVE_FORMS) {
          const a = conjugateAdjective(f, "i", af);
          if (a.ok) out.push([firstWord(a.jp), `${form}+${af}`]);
        }
      }
      if (form === "potential" || form === "passive" || form === "causative") {
        for (const { form: vf } of VERB_FORMS) {
          const v = conjugateVerb(f, "ichidan", vf);
          if (v.ok) out.push([firstWord(v.jp), `${form}+${vf}`]);
        }
      }
      if (form === "te") out.push(...teContractions(f, "te"));
      // たがる (wants to, of someone else): stem + たがる, a godan verb.
      if (form === "stem") {
        for (const { form: vf } of VERB_FORMS) {
          const v = conjugateVerb(`${f}たがる`, "godan", vf);
          if (!v.ok) continue;
          out.push([firstWord(v.jp), `tagaru+${vf}`]);
          if (vf === "te") out.push(...teContractions(v.jp, "tagaru+te"));
        }
      }
    }
  }
  return out;
}

export interface WordIndex {
  hits: Map<string, Hit[]>;
  /** Kana words by reading (in hiragana), for words a line writes in kana: ねこ → [猫|ねこ]. */
  byReading: Map<string, Hit[]>;
  suffixes: Word[];
  prefixes: Word[];
  counters: Word[];
  names: Set<string>;
}

export function buildIndex(words: Word[], names: Jp[]): WordIndex {
  const hits = new Map<string, Hit[]>();
  const byReading = new Map<string, Hit[]>();
  const add = (jp: Jp, hit: Hit) => {
    const k = keyOf(jp);
    hits.set(k, [...(hits.get(k) ?? []), hit]);
    const r = toHiragana(k.split("|")[1]);
    byReading.set(r, [...(byReading.get(r) ?? []), hit]);
  };
  for (const word of words) {
    add(word.jp, { word });
    if (word.pos === "verb" && word.verb) for (const [f, form] of verbForms(word.jp, word.verb)) add(f, { word, form });
    if (word.pos === "i-adj" || word.pos === "na-adj") {
      const cls = word.pos === "i-adj" ? "i" : "na";
      for (const af of ADJECTIVE_FORMS) {
        const a = conjugateAdjective(word.jp, cls, af);
        if (a.ok) for (const f of [a.jp, ...a.variants]) add(firstWord(f), { word, form: af });
      }
      // The さ noun: [高|たか]い → [高|たか]さ.
      if (word.pos === "i-adj") add(word.jp.replace(/い$/, "さ"), { word, form: "sa" });
    }
  }
  return {
    hits,
    byReading,
    suffixes: words.filter((w) => w.pos === "suffix" || w.pos === "counter"),
    prefixes: words.filter((w) => w.pos === "prefix"),
    counters: words.filter((w) => w.pos === "counter"),
    names: new Set(names.map(keyOf)),
  };
}

export type Resolution =
  | { how: "entry" | "form"; word: Word; form?: string }
  | { how: "affix"; word: Word; affix: Word }
  | { how: "counter"; counter: Word }
  | { how: "number" | "name" | "function" | "fragment" };

/** Kanji a keyboard offers for words the lessons write in kana: 良かった for よかった, 良さ for よさ. */
const KEYBOARD_KANJI: [string, string][] = [["良", "よ"]];

/**
 * Kana words that several entries share, and the one the lessons mean (すき in the hiragana lessons is 好き,
 * not the stem of すく). tests/words.test.ts checks that every ambiguous kana word in the lessons is listed.
 */
export const KANA_CHOICES: Record<string, Jp> = {
  つき: "[月|つき]",
  かき: "[柿|かき]",
  よる: "[夜|よる]",
  きた: "[来|く]る",
};

/** Titles that follow a name like a suffix: [山田|やまだ]-[先生|せんせい]. */
const TITLES = new Set(["先生", "先輩", "部長", "社長"]);

const VOICED: Record<string, string> = {
  か: "が", き: "ぎ", く: "ぐ", け: "げ", こ: "ご", さ: "ざ", し: "じ", す: "ず", せ: "ぜ", そ: "ぞ", た: "だ", ち: "ぢ", つ: "づ", て: "で", と: "ど",
  は: "ばぱ", ひ: "びぴ", ふ: "ぶぷ", へ: "べぺ", ほ: "ぼぽ",
};

/** Whether a word's reading ends in a counter's reading, plain or voiced (三本 さんぼん, 一本 いっぽん). */
function endsWithCounter(reading: string, counter: string): boolean {
  const forms = [counter, ...[...(VOICED[counter[0]] ?? "")].map((v) => v + counter.slice(1))];
  return forms.some((f) => reading.length > f.length && reading.endsWith(f));
}

const split = (key: string) => key.split("|") as [string, string];
const asHit = (h: Hit): Resolution => ({ how: h.form ? "form" : "entry", word: h.word, form: h.form });
/** Several hits for one key: an entry before a form (よく the adverb, not いい's よく). */
const best = (hits: Hit[]) => hits.find((h) => !h.form) ?? hits[0];

export interface ResolveOptions {
  /** Accept FRAGMENTS: only in kana charts, conjugation tables and the answers that show an ending. */
  fragments?: boolean;
}

function resolveKey(key: string, ix: WordIndex, depth: number, opts: ResolveOptions): Resolution | null {
  const [written, reading] = split(key);
  const hits = ix.hits.get(key);
  if (hits?.length) return asHit(best(hits));
  if (written === reading) {
    if (FUNCTION_WORDS.has(written)) return { how: "function" };
    if (opts.fragments && FRAGMENTS.has(written)) return { how: "fragment" };
    // A word written in kana that the dictionary writes with kanji: ねこ → [猫|ねこ].
    const kana = ix.byReading.get(toHiragana(reading)) ?? [];
    const words = new Set(kana.map((h) => h.word));
    if (words.size === 1) return asHit(best(kana));
    if (words.size > 1) {
      const choice = kana.filter((h) => h.word.jp === KANA_CHOICES[toHiragana(written)]);
      return choice.length ? asHit(best(choice)) : null;
    }
  }
  if (ix.names.has(key)) return { how: "name" };
  // A number, alone or with a counter whose reading ends the word (三本 さんぼん, but not さんさつ).
  const num = written.match(NUMBER)?.[0];
  if (num) {
    const rest = written.slice(num.length);
    if (!rest) return { how: "number" };
    const counter = ix.counters.find((c) => {
      const [cw, cr] = split(keyOf(c.jp));
      return cw === rest && endsWithCounter(reading, cr);
    });
    if (counter) return { how: "counter", counter };
  }
  for (const [kanji, kana] of KEYBOARD_KANJI) {
    if (!written.includes(kanji)) continue;
    const alt = resolveKey(`${written.replaceAll(kanji, kana)}|${reading}`, ix, depth, opts);
    if (alt) return alt;
  }
  if (depth >= 2) return null;
  // An entry with a suffix: [会議|かいぎ][中|ちゅう], お[客|きゃく][様|さま], [何名|なんめい][様|さま].
  for (const s of ix.suffixes) {
    const [sw, sr] = split(keyOf(s.jp));
    if (written.length > sw.length && written.endsWith(sw) && reading.endsWith(sr)) {
      const core = resolveKey(`${written.slice(0, -sw.length)}|${reading.slice(0, -sr.length)}`, ix, depth + 1, opts);
      if (core?.how === "entry" || core?.how === "affix") return { how: "affix", word: core.word, affix: s };
      if (core?.how === "counter") return core;
    }
  }
  // An entry with a prefix: お[茶|ちゃ], ご[家族|かぞく], and お + a verb stem (お[願|ねが]い).
  for (const p of ix.prefixes) {
    const [pw, pr] = split(keyOf(p.jp));
    if (written.length > pw.length && written.startsWith(pw) && reading.startsWith(pr)) {
      const core = resolveKey(`${written.slice(pw.length)}|${reading.slice(pr.length)}`, ix, depth + 1, opts);
      const nounLike = (w: Word) => w.pos === "noun" || w.pos === "na-adj";
      if (((core?.how === "entry" || core?.how === "affix") && nounLike(core.word)) || (core?.how === "form" && core.form === "stem")) {
        return { how: "affix", word: core.word, affix: p };
      }
    }
  }
  return null;
}

/** How one word of a lesson line resolves, or null when the dictionary is missing it. */
export function resolveWord(jp: Jp, ix: WordIndex, opts: ResolveOptions = {}): Resolution | null {
  // A name joined to its suffix or title: [田中|たなか]-さん, [山田|やまだ]-[先生|せんせい], [田中|たなか]-さん-たち.
  if (jp.includes("-")) {
    const [name, ...rest] = jp.split("-");
    if (!ix.names.has(keyOf(name))) return null;
    const ok = rest.every((p) => {
      const r = resolveKey(keyOf(p), ix, 0, opts);
      return r && "word" in r && (r.word.pos === "suffix" || TITLES.has(split(keyOf(r.word.jp))[0]));
    });
    return ok ? { how: "name" } : null;
  }
  return resolveKey(keyOf(jp), ix, 0, opts);
}
