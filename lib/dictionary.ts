/**
 * The dictionary page's search (/dictionary): entries built from the /dictionary-data.json payload, ranked
 * matching by kanji, kana, lenient romaji or English, the filters, the CSV export and the reducer that grows the
 * result list in batches. Pure, so all of it is unit tested; nothing here imports the 常用 table.
 */
import type { Word, WordPos, WordTopic } from "@/content/types";
import type { DictionaryData } from "@/lib/lookup";
import { plainOf, readingOf } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";
import { normalizeRomaji } from "@/lib/romaji-input";

/** Lesson words, or the rest (the kanji-example words and the expansion, content/words/expansion), shown as "Expansion". */
export type Source = "lesson" | "extra";

/** The kana rows a reading can start with, named by their first kana. */
export const KANA_ROWS = ["あ", "か", "さ", "た", "な", "は", "ま", "や", "ら", "わ"] as const;
export type KanaRow = (typeof KANA_ROWS)[number];

export const TOPIC_LABELS: Record<WordTopic, string> = {
  people: "People",
  food: "Food and drink",
  places: "Places",
  time: "Time",
  "school-work": "School and work",
  home: "Home",
  nature: "Nature",
  body: "Body and health",
  travel: "Travel",
  shopping: "Shopping",
  hobbies: "Hobbies",
  feelings: "Feelings",
  language: "Language",
  everyday: "Everyday",
  greetings: "Greetings",
  numbers: "Numbers",
};

export const POS_LABELS: Record<WordPos, string> = {
  noun: "noun",
  pronoun: "pronoun",
  verb: "verb",
  "i-adj": "い-adjective",
  "na-adj": "な-adjective",
  adverb: "adverb",
  expression: "expression",
  interjection: "interjection",
  conjunction: "conjunction",
  question: "question word",
  "pre-noun": "pre-noun word",
  counter: "counter",
  prefix: "prefix",
  suffix: "suffix",
};

export interface Entry {
  /** Stable across builds, for My words: the written form plus the part of speech (本 the noun and 本 the counter). */
  id: string;
  word: Word;
  source: Source;
  /** Kanji and kana as written, without markup: 食べる. */
  written: string;
  /** The whole reading in kana: たべる. */
  reading: string;
  /** The app's romaji: taberu. */
  romaji: string;
  row: KanaRow | null;
  /** Precomputed match keys. */
  keys: { written: string; kana: string; kanaLoose: string; roma: string; loose: string; glosses: string[]; en: string };
}

export const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

/** The row of each plain kana; voiced and p sounds are found through their plain kana. */
const ROW_OF: Record<string, KanaRow> = {};
const ROW_KANA: Record<KanaRow, string> = {
  あ: "あいうえおゔ", か: "かきくけこがぎぐげご", さ: "さしすせそざじずぜぞ", た: "たちつてとだぢづでど", な: "なにぬねの",
  は: "はひふへほばびぶべぼぱぴぷぺぽ", ま: "まみむめも", や: "やゆよ", ら: "らりるれろ", わ: "わゐゑを",
};
for (const row of KANA_ROWS) for (const c of ROW_KANA[row]) ROW_OF[c] = row;

/** The kana row a reading starts in, in hiragana or katakana: ごはん and コーヒー are both in the か row. */
export function kanaRow(reading: string): KanaRow | null {
  return ROW_OF[toHiragana(reading.trim().charAt(0))] ?? null;
}

/**
 * Romaji with long vowels shortened, so a learner who types kyo or toukyo still finds kyou and toukyou.
 * Ranked below a full match. Every ei becomes e, not only the long vowel in sensei, so mei also finds me:
 * acceptable for a fallback tier.
 */
export function looseRomaji(normalized: string): string {
  return normalized.replace(/([aiueo])\1+/g, "$1").replace(/ei/g, "e");
}

/** English as typed and as matched: lower case, accents dropped (café, jōyō), single spaces. */
export const foldEnglish = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase().replace(/\s+/g, " ").trim();

/** Without a leading "to", "a", "an" or "the": "to eat" → "eat". */
export const withoutArticle = (s: string) => s.replace(/^(to|a|an|the) /, "");

/**
 * A word's meaning as separate glosses: lower case, without notes in brackets, examples after a colon or a
 * leading "to". A meaning that is all note, as counters are ("(counts books)"), is glossed by the note.
 */
export function glossesOf(meaning: string): string[] {
  const folded = foldEnglish(meaning);
  const outside = folded.replace(/\([^)]*\)/g, " ");
  const text = /[a-z]/.test(outside.split(":")[0]) ? outside : folded.replace(/[()]/g, " ");
  return text
    .split(/[;,]/)
    .map((g) => withoutArticle(g.split(":")[0].replace(/\s+/g, " ").trim()))
    .filter(Boolean);
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/** Vowel of each kana, to read ー as the vowel it lengthens. */
const VOWEL: Record<string, string> = {};
for (const [vowel, kana] of Object.entries({
  あ: "あかさたなはまやらわがざだばぱぁゃ",
  い: "いきしちにひみりぎじぢびぴぃ",
  う: "うくすつぬふむゆるぐずづぶぷぅゅゔ",
  え: "えけせてねへめれげぜでべぺぇ",
  お: "おこそとのほもよろをごぞどぼぽぉょ",
})) for (const c of kana) VOWEL[c] = vowel;

/**
 * Kana with long vowels in one spelling, so こうひい finds コーヒー and せんせえ finds せんせい: ー becomes the
 * vowel it lengthens, then おう and えい become おお and ええ.
 */
export function looseKana(hiragana: string): string {
  let out = "";
  for (const c of hiragana) out += c === "ー" ? (VOWEL[out.at(-1) ?? ""] ?? c) : c;
  return [...out].map((c, i, all) => (i > 0 && ((c === "う" && VOWEL[all[i - 1]] === "お") || (c === "い" && VOWEL[all[i - 1]] === "え")) ? VOWEL[all[i - 1]] : c)).join("");
}

/** A meaning as plain text, its Japanese without furigana. */
export const meaningText = (word: Word) => plainOf(word.meaning, false);

function entryOf(word: Word, source: Source): Entry {
  const written = plainOf(word.jp, false);
  const reading = readingOf(word.jp, false);
  const romaji = romajiOf(word.jp);
  const roma = normalizeRomaji(romaji);
  // A few meanings show a word in markup: (polite plural of people: [先生方|せんせいがた]).
  const meaning = meaningText(word);
  return {
    id: `${word.jp}#${word.pos}`,
    word,
    source,
    written,
    reading,
    romaji,
    row: kanaRow(reading),
    keys: {
      written: toHiragana(written),
      kana: toHiragana(reading),
      kanaLoose: looseKana(toHiragana(reading)),
      roma,
      loose: looseRomaji(roma),
      glosses: glossesOf(meaning),
      en: foldEnglish(meaning),
    },
  };
}

/** Every dictionary entry, lesson words first. Names, particles and fragments aren't entries. */
export function buildEntries(data: Pick<DictionaryData, "words" | "extra">): Entry[] {
  return [...data.words.map((w) => entryOf(w, "lesson")), ...data.extra.map((w) => entryOf(w, "extra"))];
}

export type Query =
  | { kind: "empty" }
  | { kind: "jp"; text: string; loose: string }
  /** en: the English without a leading article; start: en at the start of a word. */
  | { kind: "latin"; roma: string; en: string; start: RegExp };

/** A query in Japanese (kanji or kana) or in English letters (romaji or English). */
export function parseQuery(query: string): Query {
  const text = query.normalize("NFKC").trim().replace(/[\s〜~・]+/g, "");
  if (!text) return { kind: "empty" };
  if (/[぀-ヿ\p{Script=Han}]/u.test(text)) return { kind: "jp", text: toHiragana(text), loose: looseKana(toHiragana(text)) };
  const en = withoutArticle(foldEnglish(query.normalize("NFKC")));
  return { kind: "latin", roma: normalizeRomaji(query), en, start: new RegExp(`(^|[^a-z])${escapeRegExp(en)}`) };
}

/** How well a key matches: 0 exact, 1 prefix, 2 inside it; null for no match. */
export function closeness(key: string, q: string, inside = true): number | null {
  if (!q || !key) return null;
  if (key === q) return 0;
  if (key.startsWith(q)) return 1;
  return inside && key.includes(q) ? 2 : null;
}

/**
 * Lower is better; null for no match. Japanese queries match the written form and the reading, then the
 * reading with long vowels in one spelling. English letters match the romaji (then the whole word with long
 * vowels shortened) and the English: a whole gloss, then a gloss word that starts with the query, then, for
 * three letters or more, a word start anywhere in the meaning, notes included.
 */
export function score(entry: Entry, query: Query): number | null {
  if (query.kind === "empty") return 0;
  const best = (...scores: (number | null)[]) => {
    const found = scores.filter((s): s is number => s !== null);
    return found.length ? Math.min(...found) : null;
  };
  const plus = (s: number | null, n: number) => (s === null ? null : s + n);
  if (query.kind === "jp") {
    return best(closeness(entry.keys.written, query.text), closeness(entry.keys.kana, query.text), plus(closeness(entry.keys.kanaLoose, query.loose), 0.5));
  }
  const { roma, en, start } = query;
  const strict = closeness(entry.keys.roma, roma, roma.length >= 3);
  // Shortened long vowels count only for the whole word, or "book" would find boku as a prefix.
  const loose = entry.keys.loose === looseRomaji(roma) ? 0.5 : null;
  const gloss = entry.keys.glosses.includes(en)
    ? 0
    : entry.keys.glosses.some((g) => start.test(g))
      ? 1.5
      : en.length >= 3 && start.test(entry.keys.en)
        ? 3
        : null;
  return best(strict, loose, gloss);
}

export interface Filters {
  topic: WordTopic | "all";
  source: Source | "all";
  row: KanaRow | "all";
  /** Only the words in My words. */
  mine: boolean;
}

export const DEFAULT_FILTERS: Filters = { topic: "all", source: "all", row: "all", mine: false };

export function passes(entry: Entry, filters: Filters, mine: ReadonlySet<string>): boolean {
  return (
    (filters.topic === "all" || entry.word.topic === filters.topic) &&
    (filters.source === "all" || entry.source === filters.source) &&
    (filters.row === "all" || entry.row === filters.row) &&
    (!filters.mine || mine.has(entry.id))
  );
}

/**
 * The entries that pass the filters and match the query, best first. Ties keep lesson words before the
 * expansion, then shorter readings, then dictionary order. With no query, dictionary order (My words: saved order).
 */
export function search(entries: Entry[], query: string, filters: Filters, mine: ReadonlySet<string> = new Set()): Entry[] {
  const q = parseQuery(query);
  const hits: { entry: Entry; score: number; order: number }[] = [];
  const saved = filters.mine ? [...mine] : [];
  entries.forEach((entry, i) => {
    if (!passes(entry, filters, mine)) return;
    const s = score(entry, q);
    if (s !== null) hits.push({ entry, score: s, order: filters.mine ? saved.indexOf(entry.id) : i });
  });
  if (q.kind === "empty") return hits.sort((a, b) => a.order - b.order).map((h) => h.entry);
  return hits
    .sort(
      (a, b) =>
        a.score - b.score ||
        (a.entry.source === b.entry.source ? 0 : a.entry.source === "lesson" ? -1 : 1) ||
        a.entry.reading.length - b.entry.reading.length ||
        a.order - b.order,
    )
    .map((h) => h.entry);
}

/** One CSV field (RFC 4180): quoted when it holds a comma, quote, line break or edge space; quotes doubled. */
export function csvField(value: string): string {
  return /[",\r\n]|^\s|\s$/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** Written as a code point: a literal U+FEFF is invisible, and editors strip it. */
const BOM = String.fromCharCode(0xfeff);

/**
 * My words as CSV for a spreadsheet or Anki: UTF-8 with a byte order mark, so Excel reads the Japanese, and
 * CRLF line ends.
 */
export function toCsv(entries: Entry[]): string {
  const rows = [
    ["Japanese", "Reading", "Romaji", "Meaning", "Part of speech", "Topic", "Source"],
    ...entries.map((e) => [e.written, e.reading, e.romaji, meaningText(e.word), POS_LABELS[e.word.pos], TOPIC_LABELS[e.word.topic], e.source === "lesson" ? "Lesson" : "Expansion"]),
  ];
  return BOM + rows.map((r) => r.map(csvField).join(",")).join("\r\n") + "\r\n";
}

/** How many results show at first, and how many more each time the list grows. */
export const BATCH = 40;

/** The result list's length for one search (`key`: the query and filters). A new search starts at one batch again. */
export interface Growth {
  key: string;
  limit: number;
}

export const INITIAL_GROWTH: Growth = { key: "", limit: BATCH };

/** Grows the current search by one batch, up to its total; growing past the end returns the same state. */
export function growthReducer(state: Growth, action: { type: "grow"; key: string; total: number }): Growth {
  const limit = state.key === action.key ? state.limit : BATCH;
  if (limit >= action.total) return state.key === action.key ? state : { key: action.key, limit };
  return { key: action.key, limit: Math.min(limit + BATCH, action.total) };
}

/** How many results to show for this search. */
export function visibleCount(state: Growth, key: string, total: number): number {
  return Math.min(state.key === key ? state.limit : BATCH, total);
}
