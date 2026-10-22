/**
 * The conjugation trainer (E3): one form of one verb or adjective at a time, typed with a Japanese keyboard.
 * Each form opens with the lesson that teaches it, and each word with any lesson that uses it. A wrong answer
 * that is another form of the word is named ("That's the plain past"). The words are data (TrainerWord), built at
 * build time by lib/conjugation-words.ts. Pure.
 */
import type { Jp } from "@/content/types";
import { type AdjectiveClass, type AdjectiveForm, conjugateAdjective, conjugateVerb, type Conjugated, type VerbClass, type VerbForm } from "@/lib/conjugate";
import type { Check } from "@/lib/decks";
import { plainOf } from "@/lib/markup";
import { checkAnswer } from "@/lib/quiz";

export { CONJUGATION_DECK } from "@/lib/notebook";

/** `lessons`: every lesson ("unit/lesson") whose lines use the word, in path order; any one done opens it. */
export type TrainerWord =
  | { kind: "verb"; jp: Jp; meaning: string; cls: VerbClass; lessons: string[] }
  | { kind: "adjective"; jp: Jp; meaning: string; cls: Exclude<AdjectiveClass, "noun">; lessons: string[] };

export type TrainerForm = { kind: "verb"; form: VerbForm } | { kind: "adjective"; form: AdjectiveForm };

/** A form the trainer asks: its name, and the lesson ("unit/lesson") that teaches it. */
interface FormInfo {
  label: string;
  lesson: string;
}

/** The verb forms the lessons teach. Forms no lesson teaches yet (passive, causative, ば, commands) aren't asked. */
export const VERB_FORM_INFO: Partial<Record<VerbForm, FormInfo>> = {
  plain: { label: "dictionary form", lesson: "verbs/verb-groups" },
  polite: { label: "polite (ます)", lesson: "verbs/masu-form" },
  politeNeg: { label: "polite negative", lesson: "verbs/masu-form" },
  politePast: { label: "polite past", lesson: "verbs/masu-form" },
  politePastNeg: { label: "polite past negative", lesson: "verbs/masu-form" },
  plainNeg: { label: "casual negative (ない)", lesson: "verbs/nai-form" },
  te: { label: "て form", lesson: "verbs/te-form" },
  plainPast: { label: "casual past (た)", lesson: "verbs/ta-form" },
  plainPastNeg: { label: "casual past negative", lesson: "verbs/ta-form" },
  teKudasai: { label: "please form (〜て ください)", lesson: "verbs/te-iru-te-kudasai" },
  tai: { label: "want-to form (たい)", lesson: "verbs/tai-form" },
  volitional: { label: "casual volitional (let's)", lesson: "verbs/volitional" },
  politeVolitional: { label: "polite volitional (〜ましょう)", lesson: "verbs/volitional" },
  potential: { label: "potential (can)", lesson: "verbs/potential" },
  tara: { label: "たら conditional (if, when)", lesson: "verbs/tara-conditional" },
  ba: { label: "ば conditional (if)", lesson: "n4-conditions/ba" },
};

/** The adjective forms the lessons teach, by the lesson that teaches each class's forms. */
export function adjectiveFormInfo(cls: "i" | "na"): Partial<Record<AdjectiveForm, FormInfo>> {
  const own = cls === "i" ? "grammar/i-adjectives" : "grammar/na-adjectives";
  return {
    // For an い-adjective the casual form is the word itself (the prompt); a な-adjective's is 静か だ.
    plain: { label: cls === "i" ? "dictionary form" : "casual (だ)", lesson: own },
    polite: { label: "polite", lesson: own },
    plainNeg: { label: "casual negative", lesson: own },
    politeNeg: { label: "polite negative", lesson: own },
    plainPast: { label: "casual past", lesson: own },
    politePast: { label: "polite past", lesson: own },
    plainPastNeg: { label: "casual past negative", lesson: own },
    politePastNeg: { label: "polite past negative", lesson: own },
    te: { label: "て form", lesson: "verbs/te-form" },
    tara: { label: "たら conditional (if, when)", lesson: "verbs/tara-conditional" },
  };
}

const infoOf = (word: TrainerWord, form: string): FormInfo | undefined =>
  word.kind === "verb" ? VERB_FORM_INFO[form as VerbForm] : adjectiveFormInfo(word.cls)[form as AdjectiveForm];

/** Forms that make no sense for verbs of things that happen by themselves: you can't want or ask the rain to fall. */
const NOT_BY_WILL = ["volitional", "politeVolitional", "tai", "teKudasai", "potential"];

/**
 * Forms the engine builds but the trainer doesn't ask, by word. 降る's たい form is spelled like 降りる's, and 開く's
 * potential is the verb 開ける. 知る: the lessons teach "I know" as 知っています, so 知ります and "let's know" aren't
 * asked.
 */
const NOT_ASKED: Record<string, string[]> = {
  "[降|ふ]る": NOT_BY_WILL,
  "[晴|は]れる": NOT_BY_WILL,
  "すく": NOT_BY_WILL,
  "[開|あ]く": NOT_BY_WILL,
  "[知|し]る": ["polite", "volitional", "politeVolitional", "potential"],
};

/** The forms the trainer can ask of a word, in teaching order. */
export function formsOf(word: TrainerWord): string[] {
  const skip = NOT_ASKED[word.jp] ?? [];
  return Object.keys(word.kind === "verb" ? VERB_FORM_INFO : adjectiveFormInfo(word.cls)).filter((f) => !skip.includes(f));
}

/** The engine's result for one form of a word. */
export function conjugate(word: TrainerWord, form: string): Conjugated {
  return word.kind === "verb" ? conjugateVerb(word.jp, word.cls, form as VerbForm) : conjugateAdjective(word.jp, word.cls, form as AdjectiveForm);
}

export const formLabel = (word: TrainerWord, form: string) => infoOf(word, form)?.label ?? form;
export const formLesson = (word: TrainerWord, form: string) => infoOf(word, form)?.lesson ?? "";

export interface Question {
  word: TrainerWord;
  form: string;
}

/** The prompt itself isn't asked: a verb's or い-adjective's dictionary form (a な-adjective's 静か だ is). */
const isPrompt = (word: TrainerWord, form: string) => form === "plain" && !(word.kind === "adjective" && word.cls === "na");

/**
 * Every question open to the reader: a word used in a lesson they've done, and a form whose lesson is done, that
 * the word has.
 */
export function openQuestions(words: TrainerWord[], done: ReadonlySet<string>): Question[] {
  return words
    .filter((w) => w.lessons.some((l) => done.has(l)))
    .flatMap((word) =>
      formsOf(word)
        .filter((form) => !isPrompt(word, form) && done.has(formLesson(word, form)) && conjugate(word, form).ok)
        .map((form) => ({ word, form })),
    );
}

/** How often a pick comes from the notebook's missed questions, when there are some: one in four. */
export const NOTEBOOK_SHARE = 0.25;

/**
 * One question, picked with `rand` in [0, 1), avoiding the last one asked when there's another. Some picks come
 * from `missed` (open questions in the notebook), so a miss comes back and can be cleared.
 */
export function pickQuestion(open: Question[], rand: number, last?: Question, missed: Question[] = []): Question | null {
  const notLast = (qs: Question[]) => (qs.length > 1 && last ? qs.filter((q) => questionId(q) !== questionId(last)) : qs);
  const fromNotebook = notLast(missed.filter((m) => open.some((q) => questionId(q) === questionId(m))));
  if (fromNotebook.length && rand < NOTEBOOK_SHARE && (fromNotebook.length > 1 || !last || questionId(fromNotebook[0]) !== questionId(last))) {
    return fromNotebook[Math.floor((rand / NOTEBOOK_SHARE) * fromNotebook.length)];
  }
  const pool = notLast(open);
  return pool.length ? pool[Math.floor(rand * pool.length)] : null;
}

/** The answers that count for a form: the engine's form and its standard variants. */
const answersOf = (c: Conjugated) => (c.ok ? [c.jp, ...c.variants] : []);

/**
 * The forms of a word an answer matches, as their names: 食べられる is the potential and the passive (both are
 * named: they are different forms that share a spelling). Forms the word lacks are skipped. An adjective's forms
 * written the same (an い-adjective's dictionary form and its form before a noun) are named once. A ら-less potential
 * is named as such. Used to name a wrong answer that is another real form.
 */
export function identifyForm(word: TrainerWord, answer: string): string[] {
  const forms = word.kind === "verb" ? ALL_VERB_FORMS : ALL_ADJECTIVE_FORMS;
  const seen = new Set<string>();
  const names: string[] = [];
  for (const form of forms) {
    const c = conjugate(word, form);
    if (!c.ok) continue;
    const key = answersOf(c).join("|");
    if (word.kind === "adjective" && seen.has(key)) continue;
    seen.add(key);
    if (checkAnswer(answersOf(c), answer).correct) names.push(anyLabel(word, form));
    else if (c.colloquial && checkAnswer(c.colloquial, answer).correct) names.push(`casual ${anyLabel(word, form)} (ら-less)`);
  }
  return names;
}

/** Every engine form, for naming answers, including those the trainer doesn't ask. */
const ALL_VERB_FORMS: VerbForm[] = [
  "plain", "plainNeg", "plainPast", "plainPastNeg", "stem", "polite", "politeNeg", "politePast", "politePastNeg", "te", "tai",
  "potential", "volitional", "politeVolitional", "passive", "causative", "ba", "tara", "imperative", "prohibitive", "nasai", "teKudasai",
  "causativePassive", "honorific", "humble",
];
const ALL_ADJECTIVE_FORMS: AdjectiveForm[] = ["plain", "plainNeg", "plainPast", "plainPastNeg", "polite", "politeNeg", "politePast", "politePastNeg", "te", "adverb", "attributive", "ba", "tara"];

/** Names for the forms the trainer doesn't ask, so a wrong answer can still be named. */
const OTHER_LABELS: Record<string, string> = {
  stem: "ます stem",
  passive: "passive",
  causative: "causative",
  ba: "ば conditional",
  imperative: "plain command",
  prohibitive: "don't (な)",
  nasai: "なさい command",
  causativePassive: "causative-passive",
  honorific: "honorific (尊敬語)",
  humble: "humble (謙譲語)",
  adverb: "adverb (く / に)",
  attributive: "form before a noun",
};
const anyLabel = (word: TrainerWord, form: string) => infoOf(word, form)?.label ?? OTHER_LABELS[form] ?? form;

/**
 * Checks an answer to one question. Right: the engine's form or a standard variant, in kanji or kana (the quiz
 * checker's rules). A ら-less potential (見れる) counts and is named as casual. A wrong answer that is another form
 * of the word is named.
 */
export function checkConjugation(q: Question, answer: string): Check {
  const c = conjugate(q.word, q.form);
  if (!c.ok) return { correct: false, canonical: "", note: c.reason };
  const canonical = plainOf(c.jp, false);
  const result = checkAnswer(answersOf(c), answer);
  if (result.correct) return { correct: true, canonical };
  if (c.colloquial && checkAnswer(c.colloquial, answer).correct) {
    return { correct: true, canonical, note: `Right, in casual speech. Textbooks and writing use ${canonical}.` };
  }
  const others = identifyForm(q.word, answer).filter((label) => label !== formLabel(q.word, q.form));
  if (others.length) return { correct: false, canonical, note: `That's the ${others.join(" or the ")}.` };
  // A casual form made polite with です (食べたい です for want-to): right form, wrong register.
  if (!/です$/.test(canonical) && checkAnswer(answersOf(c).map((a) => `${a} です`), answer).correct) {
    return { correct: false, canonical, note: `That's polite. The form asked is casual: ${canonical}.` };
  }
  if (result.note) return { correct: false, canonical, note: result.note };
  if (/^[a-z'\s-]+$/i.test(answer.trim())) return { correct: false, canonical, note: "Type it with a Japanese keyboard." };
  return { correct: false, canonical };
}

/** The notebook card id of a question. */
export const questionId = (q: Question) => `${q.word.jp}#${q.form}`;
