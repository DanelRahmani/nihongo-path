/**
 * A heuristic for the register of Japanese lines (content/STYLE.md §9). Polite endings are reliable
 * markers; plain is only claimed for endings that can't be polite (だ, verb past and negative…), so
 * fragments, greetings and noun phrases come out "neutral". Pure.
 */
import { readingOf } from "@/lib/markup";

export type SentenceRegister = "polite" | "plain" | "neutral";

/** Sentence-final particles and trailing conjunctions: either register can carry them. */
const TRAILING = new Set(["よ", "ね", "よね", "か", "の", "な", "わ", "さ", "ぞ", "ぜ", "かな", "っけ", "けど", "けれど", "から", "し", "のに"]);
const POLITE_ENDINGS = ["です", "でした", "でしょう", "ます", "ました", "ません", "ましょう", "ください", "ございます", "ませ"];
const PLAIN_WORDS = new Set(["だ", "だった", "だろう", "する", "した", "しない", "くる", "きた", "こない", "なかった"]);
/** Verb past (two kana or more: みた), plain negative and dictionary forms (three or more, so short nouns don't match). */
const isPlainForm = (w: string) => (w.length >= 2 && /[ただ]$/u.test(w)) || (w.length >= 3 && /(ない|る)$/u.test(w));

/** The register of one sentence, given its kana reading with word spaces. */
export function sentenceRegister(reading: string): SentenceRegister {
  const words = reading
    .replace(/[。！？、…」』）〜]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  while (words.length > 1 && TRAILING.has(words.at(-1)!)) words.pop();
  const last = words.at(-1) ?? "";
  if (POLITE_ENDINGS.some((e) => last.endsWith(e))) return "polite";
  if (PLAIN_WORDS.has(last) || isPlainForm(last)) return "plain";
  return "neutral";
}

/** Registers of each sentence in a Jp line. Quoted speech 「…」 keeps its own register and is skipped. */
export function sentenceRegisters(jp: string): SentenceRegister[] {
  return readingOf(jp)
    .replace(/「[^」]*」/g, "")
    .split(/(?<=[。！？])/)
    .map((s) => s.trim())
    .filter((s) => /[぀-ヿ]/u.test(s))
    .map(sentenceRegister);
}

export type LineRegister = SentenceRegister | "mixed";

/** One register for a whole line: "mixed" when one sentence is polite and another plain. */
export function lineRegister(jp: string): LineRegister {
  const rs = sentenceRegisters(jp);
  const polite = rs.includes("polite");
  const plain = rs.includes("plain");
  if (polite && plain) return "mixed";
  return polite ? "polite" : plain ? "plain" : "neutral";
}
