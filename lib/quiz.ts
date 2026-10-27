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

/**
 * Words the lessons write in kana (content/STYLE.md §5) that a Japanese keyboard often converts to
 * kanji. The kanji spelling is folded to kana on both sides, so it counts.
 */
export const KANA_WORDS: [string, string][] = [
  ["美味し", "おいし"],
  ["綺麗", "きれい"],
  ["可愛", "かわい"],
  ["寿司", "すし"],
  ["お腹", "おなか"],
  ["林檎", "りんご"],
  ["蜘蛛", "くも"],
  ["下さい", "ください"],
  // できる and いい: a keyboard offers 出来る and 良い (良かった, 良くない).
  ["出来", "でき"],
  ["良", "よ"],
  // Set phrases (culture/set-phrases), written in kana by the lessons.
  ["行ってきます", "いってきます"],
  ["行ってらっしゃい", "いってらっしゃい"],
  ["お帰り", "おかえり"],
  ["ご馳走様", "ごちそうさま"],
  ["御馳走様", "ごちそうさま"],
  ["頂きます", "いただきます"],
  // Keigo verbs the lessons write in kana (n4-giving-voice): いたす, いただく, おっしゃる.
  ["致し", "いたし"],
  ["致さ", "いたさ"],
  ["頂き", "いただき"],
  ["頂い", "いただい"],
  ["頂け", "いただけ"],
  ["頂か", "いただか"],
  ["仰っ", "おっしゃっ"],
  ["仰い", "おっしゃい"],
  ["仰る", "おっしゃる"],
  ["仰ら", "おっしゃら"],
];

/** Full- and half-width folded (NFKC); spaces and punctuation ignored (はい、[食|た]べました = はい [食|た]べました). */
export function normalizeAnswer(s: string): string {
  let out = s
    .normalize("NFKC")
    .replace(/\s+/g, "")
    .replace(/[。、・.,!?！？…~〜]/gu, "");
  for (const [kanji, kana] of KANA_WORDS) out = out.replaceAll(kanji, kana);
  return out;
}

const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

/**
 * Grammar words the lessons write in kana (STYLE §5) whose kanji a keyboard offers. Only as a whole word, so the
 * 時 of [七時|しちじ] never stands for とき.
 */
const FORMAL_NOUNS: Record<string, string> = {
  とき: "時", こと: "事", ところ: "所", ほう: "方", もの: "物", ごろ: "頃", ため: "為", わけ: "訳", はず: "筈", とおり: "通り", うち: "内",
};

/** Helper verbs after a て form, by the kana their forms start with: [食|た]べて みる may be typed 食べて見る. */
const TE_HELPERS: [RegExp, string][] = [
  [/^み/, "見"],
  [/^お(?=[かきくけこい])/, "置"],
  [/^い(?=[かきくけこっ])/, "行"],
  [/^[くきこ](?=[るたてなまよれさ])/, "来"],
  [/^あげ/, "上げ"],
];

/** A kana word's keyboard kanji spellings, as well as the word itself. */
function kanaOptions(text: string, whole: boolean, afterTe: boolean): string[] {
  const out = [text];
  const [, core, punct] = /^(.*?)([。、？！…」]*)$/u.exec(text)!;
  if (whole && FORMAL_NOUNS[core]) out.push(FORMAL_NOUNS[core] + punct);
  // すぎる after a stem ([食|た]べすぎた → 食べ過ぎた), and ほしい (欲しい) in any form.
  if (text.includes("すぎ")) out.push(text.replace("すぎ", "過ぎ"));
  if (whole && text.startsWith("ほし")) out.push(text.replace("ほし", "欲し"));
  if (whole && afterTe) for (const [re, kanji] of TE_HELPERS) if (re.test(text)) out.push(text.replace(re, kanji));
  return out;
}

/** Every way to write an answer: each kanji word in kanji or in kana (学生だ, がくせいだ, 学生 + だ…). */
export function acceptedForms(answer: string): string[] {
  let forms = [""];
  const tokens = parse(answer, true);
  let prevWord = "";
  let word = "";
  tokens.forEach((t, i) => {
    if (t.kind === "space" || t.kind === "join") {
      if (t.kind === "space") [prevWord, word] = [word, ""];
      return;
    }
    const before = tokens[i - 1];
    const after = tokens[i + 1];
    const whole = (!before || before.kind === "space") && (!after || after.kind === "space");
    const options = t.kind === "ruby" ? [t.base, t.reading] : kanaOptions(t.text, whole, /[てで]$/.test(prevWord));
    word += t.kind === "ruby" ? t.reading : t.text;
    forms = forms.flatMap((f) => options.map((o) => f + o));
  });
  const normal = forms.map(normalizeAnswer);
  // ている in speech drops its い in every form: [食|た]べてる, [読|よ]んでた, [待|ま]ってます.
  return [...new Set([...normal, ...normal.map((f) => f.replace(TE_IRU, "$1"))])];
}

/** The い of ている after a て or で form, before the endings of いる. */
const TE_IRU = /([てで])い(?=る|た|ま|な|て)/g;

export function checkAnswer(answers: string[], input: string): QuizCheck {
  const typed = normalizeAnswer(input);
  if (!answers.length) return { correct: false, answer: "" };
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
  // Compared through romaji with the answer's word spaces, so a particle inside it reads as one (は wa, を o).
  const sound = (a: string) => romajiOf(a).replace(/[\s.,!?]/g, "");
  if (/^[぀-ヿ]+$/u.test(typed) && answers.some((a) => sound(a) === kanaToRomaji(typed))) {
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
