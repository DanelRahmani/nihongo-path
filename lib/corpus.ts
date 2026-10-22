import { GRAMMAR } from "@/content/grammar";
import { READING } from "@/content/reading";
import type { Block, Lesson } from "@/content/types";
import { KINDS } from "@/content/types";
import { ALL_LESSONS, UNITS } from "@/content/units";
import { hasJapanese, isJpOnly, plainOf, readingOf } from "@/lib/markup";
import { romajiOf } from "@/lib/romaji";

/** One piece of curriculum text. */
export interface Field {
  /** Lesson key ("start/three-scripts"), or "units" / "kinds" for the curriculum labels. */
  lesson: string;
  /** Position in the lesson, e.g. "block 3 (pair) A jp". */
  where: string;
  text: string;
  /** A word-spaced Japanese line (examples, dialogue, marks, Japanese-only table cells): it gets romaji. */
  jp: boolean;
  /** The English for a Japanese line, when the lesson gives one. */
  en?: string;
  /** A label (lesson mark, unit or kind name): shown in Japanese but never with romaji. */
  label?: true;
  /**
   * A quoted text (the reading view's haiku): it keeps its edition's kanji, so the 常用, kanji-data and
   * dictionary checks skip it (content/STYLE.md §5).
   */
  quoted?: true;
  /** A line flagged for a native speaker (`needsReview` on an example, dialogue line or quiz question). */
  needsReview?: string;
}

/** Every piece of text in a lesson, in reading order. */
export function lessonFields(lesson: Lesson, key: string): Field[] {
  const out: Field[] = [];
  const add = (text: string | undefined, jp: boolean, where: string, en?: string, needsReview?: string) => {
    if (text !== undefined) out.push({ lesson: key, where, text, jp, en, ...(needsReview ? { needsReview } : {}) });
  };
  out.push({ lesson: key, where: "mark", text: lesson.mark, jp: true, label: true });
  add(lesson.summary, false, "summary");
  lesson.blocks.forEach((b: Block, i) => {
    const at = `block ${i} (${b.type})`;
    switch (b.type) {
      case "idea":
      case "heading":
      case "text":
        add(b.text, false, at);
        break;
      case "callout":
        add(b.title, false, `${at} title`);
        add(b.text, false, at);
        break;
      case "examples":
        b.items.forEach((ex, j) => {
          add(ex.jp, true, `${at} #${j} jp`, ex.en, ex.needsReview);
          add(ex.alt, true, `${at} #${j} alt`, ex.en);
          add(ex.en, false, `${at} #${j} en`);
          add(ex.note, false, `${at} #${j} note`);
        });
        break;
      case "pair":
        add(b.title, false, `${at} title`);
        [b.a, b.b].forEach((ex, j) => {
          const side = j ? "B" : "A";
          add(ex.jp, true, `${at} ${side} jp`, ex.en, ex.needsReview);
          add(ex.alt, true, `${at} ${side} alt`, ex.en);
          add(ex.en, false, `${at} ${side} en`);
          add(ex.note, false, `${at} ${side} note`);
        });
        add(b.diff, false, `${at} diff`);
        break;
      case "table":
        add(b.caption, false, `${at} caption`);
        b.headers.forEach((h) => add(h, false, `${at} header`));
        b.rows.forEach((r, j) => r.forEach((c, k) => add(c, isJpOnly(c), `${at} row ${j} cell ${k}`)));
        break;
      case "dialogue":
        b.lines.forEach((l, j) => {
          add(l.jp, true, `${at} line ${j} jp`, l.en, l.needsReview);
          add(l.alt, true, `${at} line ${j} alt`, l.en);
          add(l.en, false, `${at} line ${j} en`);
        });
        add(b.note, false, `${at} note`);
        break;
      case "link":
        add(b.text, false, `${at} text`);
        break;
      case "quiz":
        b.questions.forEach((q, j) => {
          add(q.prompt, false, `${at} q${j + 1} prompt`, undefined, q.needsReview);
          q.answers.forEach((a, k) => add(a, true, `${at} q${j + 1} answer ${k + 1}${q.answerIn ? " (typed in romaji)" : ""}`));
          add(q.explanation, false, `${at} q${j + 1} explanation`);
        });
        break;
    }
  });
  return out;
}

/** The whole curriculum: unit and kind labels, then every lesson in path order. */
export function corpusFields(): Field[] {
  return [
    ...UNITS.map((u): Field => ({ lesson: "units", where: u.slug, text: u.titleJp, jp: true, en: u.title, label: true })),
    ...KINDS.map((k): Field => ({ lesson: "kinds", where: k.kind, text: k.jp, jp: true, en: k.label, label: true })),
    ...ALL_LESSONS.flatMap((l) => lessonFields(l.lesson, l.key)),
    ...grammarFields(),
    ...readingFields(),
  ];
}

/** The reading view's texts (content/reading.ts): every line, and each menu price. */
export function readingFields(): Field[] {
  return READING.flatMap((text) =>
    text.lines.flatMap((line, i): Field[] => {
      const base = { lesson: `read/${text.slug}`, ...(text.kind === "haiku" ? { quoted: true as const } : {}) };
      return [
        { ...base, where: `line ${i + 1}`, text: line.jp, jp: true, en: line.en },
        ...(line.price ? [{ ...base, where: `line ${i + 1} price`, text: line.price, jp: true }] : []),
      ];
    }),
  );
}

/**
 * The grammar overview's own prose: its patterns and meanings. Its examples are copies of lesson
 * lines (tests/grammar.test.ts), so they are checked, and pinned in the snapshot, where they are taught.
 */
export function grammarFields(): Field[] {
  return GRAMMAR.flatMap((g) =>
    g.topics.flatMap((t): Field[] => [
      { lesson: "grammar-overview", where: `${t.slug} pattern`, text: t.pattern, jp: false },
      { lesson: "grammar-overview", where: `${t.slug} meaning`, text: t.meaning, jp: false },
    ]),
  );
}

/** The romaji the app shows for a Japanese line; labels show none. */
export function shownRomaji(f: Field): string {
  return f.label ? "(label: no romaji)" : romajiOf(f.text);
}

function groupByLesson(fields: Field[]): Map<string, Field[]> {
  const out = new Map<string, Field[]>();
  for (const f of fields) out.set(f.lesson, [...(out.get(f.lesson) ?? []), f]);
  return out;
}

/**
 * The reading snapshot: every Japanese line as written | kana reading | romaji, grouped by lesson.
 * No block positions or English, so adding a block shows up as added lines, and any change to
 * the reading engine shows up as changed lines.
 */
export function snapshotText(fields: Field[]): string {
  const parts: string[] = [];
  for (const [lesson, fs] of groupByLesson(fields.filter((f) => f.jp))) {
    parts.push(`## ${lesson}`);
    for (const f of fs) parts.push(`${plainOf(f.text)} | ${readingOf(f.text)} | ${shownRomaji(f)}`);
    parts.push("");
  }
  return parts.join("\n");
}

/**
 * The reviewers' printed dump: every Japanese line with its location, reading, romaji and English,
 * plus English prose that contains Japanese (shown with its kana reading).
 */
export function dumpText(fields: Field[]): string {
  const parts: string[] = [];
  for (const [lesson, fs] of groupByLesson(fields)) {
    parts.push(`=== ${lesson}`);
    for (const f of fs) {
      if (f.jp) {
        parts.push(`[${f.where}]`, `  jp      ${plainOf(f.text)}`, `  reading ${readingOf(f.text)}`, `  romaji  ${shownRomaji(f)}`);
        if (f.en) parts.push(`  en      ${f.en}`);
      } else if (hasJapanese(f.text) || f.needsReview) {
        const text = plainOf(f.text, false);
        const reading = readingOf(f.text, false);
        parts.push(`[${f.where}] (prose)`, `  text    ${text}`);
        if (reading !== text) parts.push(`  reading ${reading}`);
      }
      if (f.needsReview) parts.push(`  REVIEW  ${f.needsReview}`);
    }
    parts.push("");
  }
  return parts.join("\n");
}
