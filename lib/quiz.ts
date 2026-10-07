/** Checks a typed quiz answer. Exact, never fuzzy: only the listed answers count. Pure. */
import { parse, plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji, romajiOf } from "@/lib/romaji";

export interface QuizCheck {
  correct: boolean;
  /** The answer to show: the accepted form the reader typed, or the first answer as written. */
  answer: string;
  /** Why a near miss was wrong, e.g. a katakana word typed in hiragana. */
  note?: string;
}

/** Full- and half-width folded (NFKC), spaces removed, trailing punctuation ignored. */
export function normalizeAnswer(s: string): string {
  return s
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[。、.,!?！？…~〜]+$/u, "");
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
