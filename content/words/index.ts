import type { Jp, Word } from "@/content/types";
import { DESCRIBING } from "@/content/words/describing";
import { NOUNS } from "@/content/words/nouns";
import { OTHER } from "@/content/words/other";
import { VERBS } from "@/content/words/verbs";

/** The lesson dictionary: every word the lessons use (tests/words.test.ts checks the coverage). */
export const WORDS: Word[] = [...NOUNS, ...VERBS, ...DESCRIBING, ...OTHER];

/** People's names in the lessons. They resolve, but aren't dictionary words. */
export const NAMES: Jp[] = [
  "[田中|たなか]",
  "[山田|やまだ]",
  "[佐藤|さとう]",
  "[鈴木|すずき]",
  "[中村|なかむら]",
  "[森|もり]",
  "[遠藤|えんどう]",
  "[木村|きむら]",
  "[加藤|かとう]",
  "[小野|おの]",
  "[健太|けんた]",
  "あや",
  "ブラウン",
  "スミス",
];
