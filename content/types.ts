/**
 * Content model for lessons. The rules for writing it are in content/STYLE.md.
 *
 * Japanese markup used in every `Jp` / `Rich` string:
 *   [漢字|かんじ]  kanji with its reading — rendered per the reader's furigana mode
 *   {text}        highlighted ("red pen") span; may contain ruby markup
 *   **text**      bold, *text* italic
 *   spaces        word boundaries in Jp strings: shown in kana-only mode, used to space romaji
 *   -             in Jp strings, joins a name to its suffix: [田中|たなか]-さん (tanaka-san)
 */
export type Jp = string;
export type Rich = string;

export interface Example {
  jp: Jp;
  en: string;
  note?: Rich;
  /** The same line in the other register (polite ↔ plain), shown beneath it. */
  alt?: Jp;
}

export interface DialogueLine {
  speaker: string;
  jp: Jp;
  en: string;
  /** The same line in the other register, shown beneath it. */
  alt?: Jp;
}

/** A typed quiz question. Answers are Jp markup; the kanji form and the kana reading of each are accepted. */
export interface QuizQuestion {
  prompt: Rich;
  answers: Jp[];
  /** Shown after the reader checks their answer, right or wrong. */
  explanation: Rich;
}

export type Block =
  | { type: "idea"; text: Rich }
  | { type: "heading"; text: Rich }
  | { type: "text"; text: Rich }
  | { type: "examples"; items: Example[] }
  | { type: "pair"; title?: Rich; a: Example; b: Example; diff: Rich }
  | { type: "table"; caption?: Rich; headers: Rich[]; rows: Rich[][] }
  | { type: "callout"; kind: "mistake" | "culture" | "tip"; title?: string; text: Rich }
  | { type: "dialogue"; lines: DialogueLine[]; note?: Rich }
  | { type: "link"; href: string; label: string; text?: Rich }
  | { type: "quiz"; questions: QuizQuestion[] };

/** Which register a lesson's Japanese is in (content/STYLE.md §9). */
export type Register = "polite" | "plain" | "both";

/** Parts of the lesson template (content/STYLE.md §10) a lesson may skip, with the reason. */
export type TemplatePart = "examples" | "pair" | "mistake" | "conversation" | "quiz";

export interface Lesson {
  slug: string;
  /** Plain-English title that says what the lesson teaches. */
  title: string;
  /** Short Japanese label shown as the lesson's mark, e.g. "は・が". */
  mark: Jp;
  summary: string;
  /** Reference the rules were checked against. */
  source: string;
  /** Required once a lesson follows the template (tests/template.test.ts). */
  register?: Register;
  /** What the lesson is about, for search and the grammar overview. Required with the template. */
  kinds?: LessonKind[];
  /** Template parts this lesson leaves out, each with the reason. */
  exempt?: Partial<Record<TemplatePart, string>>;
  blocks: Block[];
}

/** Lesson type: each unit has one, and each lesson lists its own in `kinds`. */
export type LessonKind = "basics" | "kana" | "word-order" | "particles" | "grammar" | "verbs" | "suffixes" | "culture";

export const KINDS: { kind: LessonKind; label: string; jp: string }[] = [
  { kind: "basics", label: "Basics", jp: "[基本|きほん]" },
  { kind: "kana", label: "Kana", jp: "かな" },
  { kind: "word-order", label: "Word order", jp: "[語順|ごじゅん]" },
  { kind: "particles", label: "Particles", jp: "[助詞|じょし]" },
  { kind: "grammar", label: "Grammar", jp: "[文法|ぶんぽう]" },
  { kind: "verbs", label: "Verbs", jp: "[動詞|どうし]" },
  { kind: "suffixes", label: "Suffixes", jp: "[接尾辞|せつびじ]" },
  { kind: "culture", label: "Culture", jp: "[文化|ぶんか]" },
];

export interface Unit {
  slug: string;
  kind: LessonKind;
  title: string;
  /** Japanese unit name, e.g. "助詞". */
  titleJp: Jp;
  description: string;
  lessons: Lesson[];
}
