/** Checks a typed quiz answer. Exact, never fuzzy: only the listed answers count. Pure. */
import type { QuizQuestion } from "@/content/types";
import { parse, plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji, romajiOf } from "@/lib/romaji";
import { normalizeRomaji, romajiMatches } from "@/lib/romaji-input";

export interface QuizCheck {
  correct: boolean;
  /** The answer to show: the accepted form the reader typed, or the first answer as written. */
  answer: string;
  /** Why a near miss was wrong, e.g. a katakana word typed in hiragana. */
  note?: string;
}

/** Full- and half-width folded (NFKC); spaces and punctuation ignored (はい、[食|た]べました = はい [食|た]べました). */
export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[。、・.,!?！？…~〜]/gu, "");
}

const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

/** Every way to write an answer: each kanji word in kanji or in kana (学生だ, がくせいだ, 学生 + だ…). */
export function acceptedForms(answer: string): string[] {
  let forms = [""];
  for (const t of parse(answer, true)) {
    if (t.kind === "space" || t.kind === "join") continue;
    const options = t.kind === "ruby" ? [t.base, t.reading] : [t.text];
    forms = forms.flatMap((f) => options.map((o) => f + o));
  }
  return [...new Set(forms.map(normalizeAnswer))];
}

export function checkAnswer(answers: string[], input: string): QuizCheck {
  const typed = normalizeAnswer(input);
  for (const a of answers) {
    if (acceptedForms(a).includes(typed)) return { correct: true, answer: typed };
  }
  const shown = plainOf(answers[0]);
  const reading = (a: string) => normalizeAnswer(readingOf(a));

  if (/^[a-z' -]+$/i.test(input.trim()) && answers.some((a) => romajiOf(a).replace(/[\s.,!?]/g, "") === typed.toLowerCase())) {
    return { correct: false, answer: shown, note: "Right sound: type it in Japanese (kana or kanji) with a Japanese keyboard." };
  }
  const sameKanaOtherScript = answers.find((a) => toHiragana(reading(a)) === toHiragana(typed) && reading(a) !== typed);
  if (sameKanaOtherScript) {
    const katakana = /[ァ-ヶ]/u.test(reading(sameKanaOtherScript));
    return { correct: false, answer: shown, note: `Same sound, but it's written in ${katakana ? "katakana" : "hiragana"}.` };
  }
  if (answers.some((a) => kanaToRomaji(reading(a)) === kanaToRomaji(typed) && /^[぀-ヿ]+$/u.test(typed))) {
    return { correct: false, answer: shown, note: `Same sound, different spelling: it's written ${shown}.` };
  }
  return { correct: false, answer: shown };
}

/** Doubled consonants made single (kitte → kite, matcha → macha); n is left alone (konnichiwa). */
const singleConsonants = (r: string) => r.replace(/([bcdfghjkmprstwz])\1/g, "$1").replace(/tch/g, "ch");
/** Long vowels made short (obaasan → obasan, sensei → sense). Works on normalised romaji, where ou is oo. */
const shortVowels = (r: string) => r.replace(/([aiueo])\1+/g, "$1").replace(/ei/g, "e");

/**
 * A reading typed in romaji (kana lessons), matched leniently against the app's romaji: si/shi,
 * kyō/kyou, n'/n and m/n all count. Near misses on small っ and long vowels are named.
 */
export function checkRomaji(answers: string[], input: string): QuizCheck {
  const expected = answers.map((a) => romajiOf(a).replace(/[.,!?]+$/, ""));
  const hit = expected.find((e) => romajiMatches(input, e));
  if (hit !== undefined) return { correct: true, answer: hit };
  const shown = expected[0];

  if (/[぀-ヿ㐀-鿿]/u.test(input)) {
    return { correct: false, answer: shown, note: "Type how it sounds, in romaji (the letters a to z)." };
  }
  const typed = normalizeRomaji(input);
  const note = nearMiss(typed, expected.map(normalizeRomaji));
  return note ? { correct: false, answer: shown, note } : { correct: false, answer: shown };
}

/** Names a miss that differs from an answer only in a doubled consonant or a vowel's length, either way round. */
function nearMiss(typed: string, expected: string[]): string | undefined {
  for (const e of expected) {
    if (singleConsonants(e) === singleConsonants(typed)) {
      return typed.length < e.length
        ? "Check for a small っ (ッ): it doubles the consonant after it."
        : "There's no small っ (ッ) here, so no doubled consonant.";
    }
    if (shortVowels(e) === shortVowels(typed)) {
      if (typed.length < e.length) return "Check the long vowel: it's held for two beats, and the romaji spells both.";
      if (typed.length > e.length) return "That vowel is short here: one beat.";
      if (typed.replace(/ei/g, "ee") === e) return "ー repeats the vowel before it: ee, not ei.";
    }
  }
  return undefined;
}

/** A name typed in English letters (katakana, kanji), or in Japanese in either kana. No near-miss notes. */
export function checkName(answers: string[], input: string): QuizCheck {
  const typed = toHiragana(normalizeAnswer(input));
  if (answers.some((a) => acceptedForms(a).some((f) => toHiragana(f) === typed))) return { correct: true, answer: input.trim() };
  const r = checkRomaji(answers, input);
  return r.correct ? r : { correct: false, answer: r.answer };
}

/** Checks an answer the way its question asks for it: in Japanese, as a romaji reading, or as a name. */
export function checkQuestion(q: QuizQuestion, input: string): QuizCheck {
  if (q.answerIn === "romaji") return checkRomaji(q.answers, input);
  if (q.answerIn === "name") return checkName(q.answers, input);
  return checkAnswer(q.answers, input);
}
