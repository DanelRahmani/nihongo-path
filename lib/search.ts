/**
 * Site search (the dialog opened with / or Ctrl/⌘K): one flat index of pages, lessons, grammar topics, kanji and
 * words, built at build time into the static /search-index.json, and ranked on the client. Matching reuses the
 * dictionary's folds (lib/dictionary.ts): katakana as hiragana, lenient romaji, English at word starts. Pure.
 */
import type { Word } from "@/content/types";
import { buildEntries, closeness, foldEnglish, looseRomaji, parseQuery, toHiragana } from "@/lib/dictionary";
import { langRuns, plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji } from "@/lib/romaji";
import { normalizeRomaji } from "@/lib/romaji-input";

export type SearchKind = "page" | "lesson" | "grammar" | "kanji" | "word";

/** Results of equal score list in this order. */
export const KIND_ORDER: SearchKind[] = ["page", "lesson", "grammar", "kanji", "word"];

export const KIND_LABELS: Record<SearchKind, string> = { page: "Page", lesson: "Lesson", grammar: "Grammar", kanji: "Kanji", word: "Word" };

export interface SearchItem {
  kind: SearchKind;
  /** What the result shows, without markup. */
  label: string;
  detail: string;
  href: string;
  /** Japanese to match, katakana folded to hiragana: written forms and readings. */
  jp: string[];
  /** Romaji to match, normalised (lib/romaji-input.ts). */
  roma: string[];
  /** English to match, folded (lower case, no accents). */
  en: string;
}

/** The app's top-level pages, so "dictionary" or 辞書 finds the page itself. */
export const SITE_PAGES: IndexSources["pages"] = [
  { title: "Path", detail: "All the lessons, unit by unit", href: "/", jp: "道" },
  { title: "Kana charts", detail: "Hiragana and katakana", href: "/kana", jp: "かな" },
  { title: "Kana drill", detail: "Spaced-repetition practice for kana", href: "/kana/drill", jp: "練習" },
  { title: "Grammar overview", detail: "Particles, grammar and verb forms on one page", href: "/grammar", jp: "文法" },
  { title: "Dictionary", detail: "Every word, by kanji, kana, romaji or English", href: "/dictionary", jp: "辞書" },
  { title: "Reading", detail: "A sign, a menu, a chat, a story and haiku", href: "/read", jp: "読む" },
];

export interface IndexSources {
  pages: { title: string; detail: string; href: string; jp: string }[];
  lessons: { href: string; title: string; summary: string; mark: string; unit: string }[];
  grammar: { slug: string; pattern: string; meaning: string }[];
  kanji: { char: string; meanings: string[]; on: string[]; kun: string[] }[];
  words: Word[];
  extra: Word[];
}

/** The Japanese stretches of English prose with Japanese in it: "Place に[行|い]く" → に行く, にいく. */
function japaneseIn(markup: string): string[] {
  const runs = (text: string) => langRuns(text).filter((r) => r.ja).map((r) => toHiragana(r.text.replace(/[\s〜・…]/g, "")));
  return [...new Set([...runs(plainOf(markup, false)), ...runs(readingOf(markup, false))])].filter(Boolean);
}

const unique = (xs: string[]) => [...new Set(xs.filter(Boolean))];

/** The whole index, in a fixed order: pages, lessons, grammar topics, kanji, then words. */
export function buildSearchIndex(src: IndexSources): SearchItem[] {
  const pages = src.pages.map(
    (p): SearchItem => ({ kind: "page", label: p.title, detail: p.detail, href: p.href, jp: [toHiragana(p.jp)], roma: [], en: foldEnglish(`${p.title} ${p.detail}`) }),
  );
  const lessons = src.lessons.map(
    (l): SearchItem => ({
      kind: "lesson",
      label: plainOf(l.title, false),
      detail: `${l.unit} · ${plainOf(l.summary, false)}`,
      href: l.href,
      jp: unique([toHiragana(plainOf(l.mark, false)), toHiragana(readingOf(l.mark, false)), ...japaneseIn(l.title)]),
      roma: [],
      en: foldEnglish(`${plainOf(l.title, false)} ${plainOf(l.summary, false)}`),
    }),
  );
  const grammar = src.grammar.map(
    (g): SearchItem => ({
      kind: "grammar",
      label: plainOf(g.pattern, false),
      detail: plainOf(g.meaning, false),
      href: `/grammar#${g.slug}`,
      jp: japaneseIn(g.pattern),
      roma: [],
      en: foldEnglish(`${plainOf(g.pattern, false)} ${plainOf(g.meaning, false)}`),
    }),
  );
  const kanji = src.kanji.map((k): SearchItem => {
    // Kun readings without the okurigana dot: た.べる → たべる, and the stem alone, た.
    const readings = unique([...k.on.map(toHiragana), ...k.kun.flatMap((r) => [r.replace(".", ""), r.split(".")[0]])]);
    return {
      kind: "kanji",
      label: k.char,
      detail: k.meanings.join(", "),
      href: `/kanji/${k.char}`,
      jp: [k.char, ...readings],
      roma: unique(readings.map((r) => normalizeRomaji(kanaToRomaji(r)))),
      en: foldEnglish(k.meanings.join(", ")),
    };
  });
  const words = buildEntries({ words: src.words, extra: src.extra }).map(
    (e): SearchItem => ({
      kind: "word",
      label: e.written,
      detail: e.reading === e.written ? plainOf(e.word.meaning, false) : `${e.reading} · ${plainOf(e.word.meaning, false)}`,
      href: `/dictionary?q=${encodeURIComponent(e.written)}`,
      jp: unique([e.keys.written, e.keys.kana]),
      roma: [e.keys.roma],
      en: e.keys.en,
    }),
  );
  return [...pages, ...lessons, ...grammar, ...kanji, ...words];
}

/**
 * Lower is better; null for no match. Japanese matches the Japanese keys (exact, start, inside). English letters
 * match the romaji (exact or start; whole word with long vowels shortened) and the English: the whole label,
 * a word in the label that starts with the query, then a word start anywhere in the text.
 */
export function scoreItem(item: SearchItem, query: ReturnType<typeof parseQuery>): number | null {
  if (query.kind === "empty") return null;
  const scores: (number | null)[] = [];
  if (query.kind === "jp") {
    for (const key of item.jp) scores.push(closeness(key, query.text));
  } else {
    for (const key of item.roma) {
      scores.push(closeness(key, query.roma, false));
      if (looseRomaji(key) === looseRomaji(query.roma)) scores.push(0.5);
    }
    const label = foldEnglish(item.label);
    if (label === query.en) scores.push(0);
    else if (query.start.test(label)) scores.push(1.5);
    else if (query.en.length >= 2 && query.start.test(item.en)) scores.push(2.5);
  }
  const found = scores.filter((s): s is number => s !== null);
  return found.length ? Math.min(...found) : null;
}

/** The best matches, best first; ties list pages, lessons, grammar, kanji, then words, shorter labels first. */
export function searchIndex(items: SearchItem[], query: string, limit = 20): SearchItem[] {
  const q = parseQuery(query);
  if (q.kind === "empty") return [];
  const hits: { item: SearchItem; score: number; order: number }[] = [];
  items.forEach((item, order) => {
    const score = scoreItem(item, q);
    if (score !== null) hits.push({ item, score, order });
  });
  return hits
    .sort(
      (a, b) =>
        a.score - b.score ||
        KIND_ORDER.indexOf(a.item.kind) - KIND_ORDER.indexOf(b.item.kind) ||
        a.item.label.length - b.item.label.length ||
        a.order - b.order,
    )
    .slice(0, limit)
    .map((h) => h.item);
}

/** The parts of a keyboard event the shortcut needs, so it is testable without a DOM. */
export interface ShortcutEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  isComposing?: boolean;
  target: EventTarget | { tagName?: string; type?: string; isContentEditable?: boolean } | null;
}

/** Inputs that take typed text (a checkbox or a radio button doesn't). */
const TEXT_INPUTS = new Set(["text", "search", "email", "url", "tel", "password", "number", "date", "time", "datetime-local", "month", "week"]);

/** True when the reader is typing into the target, where / and Ctrl/⌘K are text, not commands. */
export function isTypingTarget(target: ShortcutEvent["target"]): boolean {
  if (!target || typeof target !== "object") return false;
  const el = target as { tagName?: string; type?: string; isContentEditable?: boolean };
  const tag = el.tagName?.toUpperCase();
  return el.isContentEditable === true || tag === "TEXTAREA" || tag === "SELECT" || (tag === "INPUT" && TEXT_INPUTS.has((el.type ?? "text").toLowerCase()));
}

/** / or Ctrl/⌘K, outside text fields and outside a keyboard's composition (IME). */
export function isSearchShortcut(e: ShortcutEvent): boolean {
  if (e.isComposing || e.altKey || isTypingTarget(e.target)) return false;
  if (e.key.toLowerCase() === "k") return e.ctrlKey || e.metaKey;
  return e.key === "/" && !e.ctrlKey && !e.metaKey;
}
