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

export type ScriptMode = "kana" | "furigana" | "kanji";

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
  title: string;
  /** Short Japanese label shown as the lesson's mark, e.g. "は・が". */
  mark: Jp;
  summary: string;
  /** Reference the rules were checked against. */
  source: string;
  blocks: Block[];
}

export interface Unit {
  slug: string;
  title: string;
  /** Japanese unit name, e.g. "助詞". */
  titleJp: Jp;
  description: string;
  lessons: Lesson[];
}
