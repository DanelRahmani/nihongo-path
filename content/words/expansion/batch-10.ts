import type { Word } from "@/content/types";
import { x } from "@/content/words/expansion/make";

/**
 * Expansion batch 10: the owner's choices (2026-10-15). 出来事 and 流行る in kanji (the candidate list gave them in
 * kana, since lib/joyo.ts couldn't confirm the readings; both are now named exceptions there and in STYLE §5), and
 * the five modern era names, which G2 left out as proper nouns (令和 isn't in the candidate list: wordfreq's counts
 * mostly predate 2019).
 * Meanings are ours; forms from JMdict (© EDRDG, CC BY-SA 4.0).
 */
export const BATCH_10: Word[] = [
  x("1340570", "[出来事|できごと]", "noun", "event, incident, something that happened", "everyday"),
  x("1552310", "[流行|はや]る", "verb", "to be popular, to be in fashion; to spread (illness)", "everyday", "godan"),
  x("1611970", "[明治|めいじ]", "noun", "Meiji (era, 1868–1912)", "time"),
  x("1414250", "[大正|たいしょう]", "noun", "Taishō (era, 1912–1926)", "time"),
  x("1349820", "[昭和|しょうわ]", "noun", "Shōwa (era, 1926–1989); old-fashioned (casual)", "time"),
  x("1608110", "[平成|へいせい]", "noun", "Heisei (era, 1989–2019)", "time"),
  x("2839013", "[令和|れいわ]", "noun", "Reiwa (era, from 2019)", "time"),
];
