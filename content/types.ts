/**
 * Content model for lessons.
 *
 * Japanese markup used in every `Jp` / `Rich` string:
 *   [漢字|かんじ]  kanji with its reading — rendered per the reader's script mode
 *   {text}        highlighted ("red pen") span; may contain ruby markup
 *   **text**      bold, *text* italic
 *   spaces        word boundaries: hidden in Japanese, used to space romaji
 */
export type Jp = string;
export type Rich = string;


export interface Example {
  jp: Jp;
  en: string;
  note?: Rich;
}

export interface DialogueLine {
  speaker: string;
  jp: Jp;
  en: string;
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
  | { type: "link"; href: string; label: string; text?: Rich };

export interface Lesson {
  slug: string;
  /** Plain-English title that says what the lesson teaches. */
  title: string;
  /** Short Japanese label shown as the lesson's mark, e.g. "は・が". */
  mark: Jp;
  summary: string;
  /** Reference the rules were checked against. */
  source: string;
  blocks: Block[];
}

/** Lesson type, used to filter the path. */
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
