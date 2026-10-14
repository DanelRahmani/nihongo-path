import type { Block, Jp, Word } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { NAMES, WORDS } from "@/content/words";
import { plainOf } from "@/lib/markup";
import { buildIndex, lineWords, resolveWord } from "@/lib/words";

/** Words the lessons use in one fixed form only, which the trainers don't ask: ござる appears only as ございます. */
export const FIXED_FORM = new Set(["ござる"]);

/** The Japanese lines of a lesson's examples, pairs and dialogue, alternative registers included. */
function lessonLines(blocks: Block[]): Jp[] {
  return blocks
    .flatMap((b): (Jp | undefined)[] => {
      if (b.type === "examples") return b.items.flatMap((ex) => [ex.jp, ex.alt]);
      if (b.type === "pair") return [b.a.jp, b.a.alt, b.b.jp, b.b.alt];
      if (b.type === "dialogue") return b.lines.flatMap((l) => [l.jp, l.alt]);
      return [];
    })
    .filter((l): l is Jp => l !== undefined);
}

/**
 * For each lesson word (by its markup), every lesson, in path order, whose examples, pairs or dialogue use it in
 * some form. A word inside another isn't counted (お願い doesn't teach 願う). The kana lessons count only with
 * `kanaLessons`, and then only whole words: their words are reading practice, and a kana like {す}き would read as
 * the stem of すく. Words only in prose, tables or quizzes have none. Build time only; it reads the lessons
 * through lib/words.ts, never through lib/corpus.ts.
 */
export function wordLessons({ kanaLessons = false } = {}): ReadonlyMap<Jp, readonly string[]> {
  // Worked out once per build process: the trainers, the vocabulary cards and the dictionary data all ask.
  const cached = CACHE.get(kanaLessons);
  if (cached) return cached;
  const ix = buildIndex(WORDS, NAMES);
  const lessons = new Map<Jp, string[]>();
  for (const { key, lesson } of ALL_LESSONS) {
    const kana = lesson.register === "neutral";
    if (kana && !kanaLessons) continue;
    for (const line of lessonLines(lesson.blocks)) {
      for (const w of lineWords(line)) {
        const r = resolveWord(w, ix);
        if (!r || (r.how !== "entry" && (r.how !== "form" || kana))) continue;
        add(lessons, r.word.jp, key);
      }
    }
  }
  CACHE.set(kanaLessons, lessons);
  return lessons;
}

const CACHE = new Map<boolean, Map<Jp, string[]>>();

function add<K>(map: Map<K, string[]>, k: K, lesson: string) {
  const list = map.get(k) ?? [];
  if (!list.includes(lesson)) map.set(k, [...list, lesson]);
}

/** Lesson keys in path order. */
const PATH = ALL_LESSONS.map((l) => l.key);
const inPathOrder = (keys: Iterable<string>) => {
  const set = new Set(keys);
  return PATH.filter((k) => set.has(k));
};

/** The lesson lines of every lesson but the kana lessons, with their lesson's key. */
export function sentenceLines(): { key: string; line: Jp }[] {
  return ALL_LESSONS.filter((l) => l.lesson.register !== "neutral").flatMap(({ key, lesson }) => lessonLines(lesson.blocks).map((line) => ({ key, line })));
}

/**
 * The lessons whose examples, pairs or dialogue show this kanji, in path order: the kanji page's "In the lessons".
 * Any word counts here (names, counters, numbers, 電話中), unlike wordLessons; the kana lessons don't. Build time only.
 */
export function kanjiLessons(char: string): string[] {
  return inPathOrder(sentenceLines().flatMap(({ key, line }) => (plainOf(line, false).includes(char) ? [key] : [])));
}

/** A dictionary entry's id, as /dictionary and the word card use it: 本 the noun and 本 the counter differ. */
export const entryId = (w: Word) => `${w.jp}#${w.pos}`;

/**
 * For the word card: each lesson word's lessons, keyed by entryId, counting every way the card can find a word in a
 * lesson line: as itself or a form of it, with an affix (お客様 credits 客 and 様), or as a counter (二本 credits the
 * counter 本, not the noun). Kana lessons don't count.
 */
function cardLessons(): Map<string, string[]> {
  const ix = buildIndex(WORDS, NAMES);
  const lessons = new Map<string, string[]>();
  for (const { key, line } of sentenceLines()) {
    for (const w of lineWords(line)) {
      const r = resolveWord(w, ix);
      if (!r) continue;
      if (r.how === "entry" || r.how === "form") add(lessons, entryId(r.word), key);
      else if (r.how === "affix") for (const word of [r.word, r.affix]) add(lessons, entryId(word), key);
      else if (r.how === "counter") add(lessons, entryId(r.counter), key);
    }
  }
  return lessons;
}

/** The lessons a word card can link: each lesson as [key, title], and each entry's lessons as indices into it. */
export interface WordLessonLinks {
  list: [key: string, title: string][];
  words: Record<string, number[]>;
}

/** cardLessons() packed for /dictionary-data.json: only lessons some word uses, each title once. Build time only. */
export function wordLessonLinks(): WordLessonLinks {
  const byEntry = cardLessons();
  const used = inPathOrder([...byEntry.values()].flat());
  const index = new Map(used.map((k, i) => [k, i]));
  const title = new Map(ALL_LESSONS.map((l) => [l.key, l.lesson.title]));
  const words: Record<string, number[]> = {};
  for (const [id, lessons] of byEntry) words[id] = lessons.map((k) => index.get(k)!);
  return { list: used.map((k) => [k, title.get(k)!]), words };
}
