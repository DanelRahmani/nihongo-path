/**
 * The conjugation engine: verbs, i-adjectives, na-adjectives and nouns with the copula. Pure.
 *
 * Input and output are Jp markup (content/types.ts), so kanji and their furigana come through:
 * [食|た]べる → [食|た]べます. Output follows the word spaces of content/STYLE.md §7 ([行|い]きません でした,
 * [高|たか]い です, [静|しず]か じゃ ない). A form a word doesn't have comes back with the reason.
 */
import type { Jp } from "@/content/types";

export type VerbClass = "godan" | "ichidan" | "suru" | "kuru";
export type AdjectiveClass = "i" | "na" | "noun";

export type VerbForm =
  | "plain"
  | "plainNeg"
  | "plainPast"
  | "plainPastNeg"
  | "stem"
  | "polite"
  | "politeNeg"
  | "politePast"
  | "politePastNeg"
  | "te"
  | "tai"
  | "potential"
  | "volitional"
  | "politeVolitional"
  | "passive"
  | "causative"
  | "ba"
  | "tara"
  | "imperative"
  | "prohibitive"
  | "nasai"
  | "teKudasai";

export type AdjectiveForm =
  | "plain"
  | "plainNeg"
  | "plainPast"
  | "plainPastNeg"
  | "polite"
  | "politeNeg"
  | "politePast"
  | "politePastNeg"
  | "te"
  | "adverb"
  | "attributive"
  | "ba"
  | "tara";

/**
 * A form, or the reason the word has no such form.
 * - variants: other standard ways to say it, accepted as equally right ([食|た]べない です for [食|た]べません).
 * - colloquial: everyday forms that textbooks don't use (ら-less potentials: [食|た]べれる), for a trainer to
 *   name as casual rather than mark right or wrong.
 * - note: what's unusual about this result (the honorific verbs' commands are polite, not blunt).
 */
export type Conjugated =
  | { ok: true; jp: Jp; variants: Jp[]; colloquial?: Jp[]; note?: string }
  | { ok: false; reason: string };

/** Each verb form with a plain-English name and, for requests and commands, the register it belongs to. */
export const VERB_FORMS: { form: VerbForm; label: string; register?: "polite" | "plain" }[] = [
  { form: "plain", label: "dictionary form", register: "plain" },
  { form: "plainNeg", label: "plain negative (ない form)", register: "plain" },
  { form: "plainPast", label: "plain past (た form)", register: "plain" },
  { form: "plainPastNeg", label: "plain past negative", register: "plain" },
  { form: "stem", label: "ます stem" },
  { form: "polite", label: "polite (ます form)", register: "polite" },
  { form: "politeNeg", label: "polite negative", register: "polite" },
  { form: "politePast", label: "polite past", register: "polite" },
  { form: "politePastNeg", label: "polite past negative", register: "polite" },
  { form: "te", label: "て form" },
  { form: "tai", label: "want to (たい)" },
  { form: "potential", label: "can (potential)" },
  { form: "volitional", label: "let's (plain volitional)", register: "plain" },
  { form: "politeVolitional", label: "let's (polite volitional)", register: "polite" },
  { form: "passive", label: "passive" },
  { form: "causative", label: "causative" },
  { form: "ba", label: "ば conditional" },
  { form: "tara", label: "たら conditional" },
  { form: "imperative", label: "plain command (blunt)", register: "plain" },
  { form: "prohibitive", label: "don't (な, blunt)", register: "plain" },
  { form: "nasai", label: "なさい command (to children and students; exam instructions)", register: "plain" },
  { form: "teKudasai", label: "please (〜て ください)", register: "polite" },
];

const ok = (jp: Jp, ...variants: Jp[]): Conjugated => ({ ok: true, jp, variants });
const missing = (reason: string): Conjugated => ({ ok: false, reason });

/** Godan endings by vowel row: a, i, e, o. */
const ROWS: Record<string, [string, string, string, string]> = {
  う: ["わ", "い", "え", "お"],
  く: ["か", "き", "け", "こ"],
  ぐ: ["が", "ぎ", "げ", "ご"],
  す: ["さ", "し", "せ", "そ"],
  つ: ["た", "ち", "て", "と"],
  ぬ: ["な", "に", "ね", "の"],
  ぶ: ["ば", "び", "べ", "ぼ"],
  む: ["ま", "み", "め", "も"],
  る: ["ら", "り", "れ", "ろ"],
};

/** Godan て and た endings. */
const TE: Record<string, [string, string]> = {
  う: ["って", "った"],
  つ: ["って", "った"],
  る: ["って", "った"],
  む: ["んで", "んだ"],
  ぶ: ["んで", "んだ"],
  ぬ: ["んで", "んだ"],
  く: ["いて", "いた"],
  ぐ: ["いで", "いだ"],
  す: ["して", "した"],
};

/** Splits a compound at its last word space: "[勉強|べんきょう] する" → ["[勉強|べんきょう] ", "する"]. */
function lastWord(dict: Jp): [string, string] {
  const at = dict.lastIndexOf(" ");
  return [dict.slice(0, at + 1), dict.slice(at + 1)];
}

/** The word as written, without markup: [行|い]く → 行く. */
const written = (word: string) => word.replace(/\[!?([^|\]]+)\|[^\]]+\]/g, "$1");
/** The word's reading: [行|い]く → いく. */
const read = (word: string) => word.replace(/\[!?[^|\]]+\|([^\]]+)\]/g, "$1");

/** Honorific godan verbs: ます stem and command end in い (いらっしゃいます, いらっしゃい). Keyed by written form. */
const HONORIFIC = new Set(["いらっしゃる", "くださる", "なさる", "おっしゃる", "ござる"]);

/** Forms an honorific verb doesn't take (the honorific “can” is お〜に なれる). */
const HONORIFIC_LACKS: Partial<Record<VerbForm, string>> = {
  potential: "Honorific verbs have no potential in standard use; the honorific “can” is お〜に なれる.",
  volitional: "Honorific verbs aren't used in the plain “let's” form.",
  politeVolitional: "Honorific verbs aren't used in the “let's” form.",
  passive: "Honorific verbs have no passive.",
  causative: "Honorific verbs have no causative.",
  prohibitive: "Honorific verbs aren't used with the blunt な.",
  nasai: "Honorific verbs aren't used with なさい.",
};

/** Verbs of state: no “can”, “let's”, commands, requests, passive or causative. Keyed by written form. */
const STATIVE = new Set(["見える", "聞こえる", "要る"]);
const STATIVE_LACKS: Partial<Record<VerbForm, string>> = {
  potential: "A verb of state has no potential form.",
  volitional: "A verb of state has no “let's” form.",
  politeVolitional: "A verb of state has no “let's” form.",
  passive: "A verb of state has no passive.",
  causative: "A verb of state has no causative in use.",
  imperative: "A verb of state isn't used as a command.",
  prohibitive: "A verb of state isn't used as a command.",
  nasai: "A verb of state isn't used as a command.",
  teKudasai: "A verb of state isn't used as a request.",
};

/** Forms particular verbs lack, with the reason. Keyed by written form (both spellings where both are used). */
const ARU: Partial<Record<VerbForm, string>> = {
  potential: "ある (to exist) has no potential form; “can happen” is あり[得|う]る.",
  volitional: "ある has no “let's” form in everyday use (あろう is literary).",
  politeVolitional: "ある has no “let's” form.",
  tai: "ありたい is used only after で, in formal writing (〜で ありたい).",
  passive: "ある has no passive in use.",
  causative: "ある has no causative in use.",
  imperative: "ある isn't used as a command (あれ is literary).",
  prohibitive: "ある isn't used as a command.",
  nasai: "ある isn't used as a command.",
  teKudasai: "ある isn't used as a request.",
};
const WAKARU: Partial<Record<VerbForm, string>> = {
  potential: "分かる already means “can understand”, so it has no potential form.",
  volitional: "分かる has no “let's” form (分かろう と する, “try to understand”, is a different pattern).",
  politeVolitional: "分かる has no “let's” form.",
  imperative: "分かる has no plain command in normal use.",
  prohibitive: "分かる isn't used with the blunt な.",
  nasai: "分かる isn't used with なさい in everyday speech.",
  passive: "分かる has no passive in use.",
};
const DEKIRU: Partial<Record<VerbForm, string>> = {
  potential: "できる already means “can do”, so it has no potential form.",
  tai: "できる has no たい form; “want to be able to” is できる ように なりたい.",
  volitional: "できる describes ability, so it has no “let's” form.",
  politeVolitional: "できる describes ability, so it has no “let's” form.",
  passive: "できる has no passive.",
  causative: "できる has no causative.",
  imperative: "できる describes ability, so it has no plain command.",
  prohibitive: "できる isn't used as a command.",
  nasai: "できる isn't used as a command.",
  teKudasai: "できる isn't used as a request.",
};
/** くれる gives to the speaker's side, so it can't be wanted, attempted or made to happen. */
const KURERU: Partial<Record<VerbForm, string>> = {
  tai: "くれる (someone gives to me) has no たい form.",
  potential: "くれる has no potential form.",
  volitional: "くれる has no “let's” form.",
  politeVolitional: "くれる has no “let's” form.",
  passive: "くれる has no passive.",
  causative: "くれる has no causative.",
  nasai: "くれる isn't used with なさい.",
  teKudasai: "くれる isn't used with ください; ください itself is the request.",
};
const LACKS: Record<string, Partial<Record<VerbForm, string>>> = {
  ある: ARU,
  分かる: WAKARU,
  わかる: WAKARU,
  できる: DEKIRU,
  くれる: KURERU,
  なさる: { nasai: "なさい is itself なさる's command." },
  くださる: {
    tai: "くださる has no たい form.",
    politeVolitional: "くださる has no “let's” form.",
    teKudasai: "くださる isn't used with ください; ください is its own command.",
  },
};

function godan(prefix: string, word: string, form: VerbForm): Conjugated {
  const last = word.at(-1)!;
  const row = ROWS[last];
  if (!row) throw new Error(`Not a godan verb ending: ${word}`);
  const base = word.slice(0, -1);
  const reading = read(word);
  const w = written(word);
  const honorific = HONORIFIC.has(w);
  if (w === "ござる" && !/^polite/.test(form)) return missing("ござる is used only in its polite forms (ございます).");
  // ゆく borrows its て and た forms from いく; the kana ゆいて would be classical.
  if (reading === "ゆく" && (form === "te" || form === "plainPast" || form === "tara" || form === "teKudasai")) {
    return missing("ゆく borrows these forms from いく: [行|い]って, [行|い]った.");
  }

  const [a, rawI, e, o] = row.map((k) => base + k);
  // The honorific verbs' い stem (いらっしゃい) is used only before ます and as the command; elsewhere it's り.
  const i = honorific ? base + "い" : rawI;
  // 行く has って/った; 問う and 請う keep う before て (問うて).
  const ik = w.endsWith("行く") || reading === "いく";
  const uTe = reading === "とう" || reading === "こう";
  const [te, ta] = ik ? [base + "って", base + "った"] : uTe ? [word + "て", word + "た"] : [base + TE[last][0], base + TE[last][1]];
  const isAru = w === "ある";
  const p = (s: string, ...v: string[]) => ok(prefix + s, ...v.map((x) => prefix + x));
  // いらっしゃる also has the common short forms いらして, いらした.
  const irashi = w === "いらっしゃる";

  switch (form) {
    case "plain": return p(word);
    case "plainNeg": return p(isAru ? "ない" : a + "ない");
    case "plainPast": return irashi ? p(ta, "いらした") : p(ta);
    case "plainPastNeg": return p(isAru ? "なかった" : a + "なかった");
    case "stem": return p(i);
    case "polite": return p(i + "ます");
    case "politeNeg": return p(i + "ません");
    case "politePast": return p(i + "ました");
    case "politePastNeg": return p(i + "ません でした");
    case "te": return irashi ? p(te, "いらして") : p(te);
    case "tai": return p(rawI + "たい");
    case "potential": return p(e + "る");
    case "volitional": return p(o + "う");
    case "politeVolitional": return p(i + "ましょう");
    case "passive": return p(a + "れる");
    case "causative": return p(a + "せる");
    case "ba": return p(e + "ば");
    case "tara": return p(ta + "ら");
    case "imperative":
      return honorific
        ? { ok: true, jp: prefix + i, variants: [], note: "The command of an honorific verb is polite, not blunt (ください, いらっしゃい)." }
        : p(e);
    case "prohibitive": return p(word + " な");
    case "nasai": return p(rawI + "なさい");
    case "teKudasai": return irashi ? p(te + " ください", "いらして ください") : p(te + " ください");
  }
}

function ichidan(prefix: string, word: string, form: VerbForm): Conjugated {
  if (!word.endsWith("る")) throw new Error(`Not an ichidan verb: ${word}`);
  const b = word.slice(0, -1);
  const p = (s: string, ...v: string[]) => ok(prefix + s, ...v.map((x) => prefix + x));
  switch (form) {
    case "plain": return p(word);
    case "plainNeg": return p(b + "ない");
    case "plainPast": return p(b + "た");
    case "plainPastNeg": return p(b + "なかった");
    case "stem": return p(b);
    case "polite": return p(b + "ます");
    case "politeNeg": return p(b + "ません");
    case "politePast": return p(b + "ました");
    case "politePastNeg": return p(b + "ません でした");
    case "te": return p(b + "て");
    case "tai": return p(b + "たい");
    // Everyday speech often drops the ら ([食|た]べれる); textbooks and formal writing keep it.
    case "potential": return { ok: true, jp: prefix + b + "られる", variants: [], colloquial: [prefix + b + "れる"] };
    case "volitional": return p(b + "よう");
    case "politeVolitional": return p(b + "ましょう");
    case "passive": return p(b + "られる");
    case "causative": return p(b + "させる");
    case "ba": return p(b + "れば");
    case "tara": return p(b + "たら");
    // くれる is the one ichidan verb whose command is くれ, not くれろ. 〜よ is the written command ([見|み]よ).
    case "imperative": return written(word) === "くれる" ? p(b) : p(b + "ろ", b + "よ");
    case "prohibitive": return p(word + " な");
    case "nasai": return p(b + "なさい");
    case "teKudasai": return p(b + "て ください");
  }
}

function suru(prefix: string, word: string, form: VerbForm): Conjugated {
  if (!word.endsWith("する")) throw new Error(`Not a する verb: ${word}`);
  // A one-word compound keeps its noun: [勉強|べんきょう]する → [勉強|べんきょう]します.
  const head = word.slice(0, -2);
  // One-kanji する verbs (愛する, 訳する) take some godan forms (愛さない, 愛せる); they need a class of their own.
  if (/^\[!?[^|\]]\|[^\]]+\]$/.test(head)) return missing("One-kanji する verbs like [愛|あい]する conjugate partly like godan verbs; not supported yet.");
  const p = (s: string, ...v: string[]) => ok(prefix + head + s, ...v.map((x) => prefix + head + x));
  switch (form) {
    case "plain": return p("する");
    case "plainNeg": return p("しない");
    case "plainPast": return p("した");
    case "plainPastNeg": return p("しなかった");
    case "stem": return p("し");
    case "polite": return p("します");
    case "politeNeg": return p("しません");
    case "politePast": return p("しました");
    case "politePastNeg": return p("しません でした");
    case "te": return p("して");
    case "tai": return p("したい");
    case "potential": return p("できる");
    case "volitional": return p("しよう");
    case "politeVolitional": return p("しましょう");
    case "passive": return p("される");
    case "causative": return p("させる");
    case "ba": return p("すれば");
    case "tara": return p("したら");
    case "imperative": return p("しろ", "せよ");
    case "prohibitive": return p("する な");
    case "nasai": return p("しなさい");
    case "teKudasai": return p("して ください");
  }
}

function kuru(prefix: string, word: string, form: VerbForm): Conjugated {
  // 来る changes the reading of its kanji: [来|く]る, [来|き]ます, [来|こ]ない. A head before it is kept.
  const m = /^(.*?)(\[(!?)来\|く\]る|くる)$/.exec(word);
  if (!m) throw new Error(`Not a 来る verb: ${word}`);
  const [, head, kanji, show] = m;
  const k = (r: string) => head + (kanji.startsWith("[") ? `[${show}来|${r}]` : r);
  const p = (s: string) => ok(prefix + s);
  switch (form) {
    case "plain": return p(k("く") + "る");
    case "plainNeg": return p(k("こ") + "ない");
    case "plainPast": return p(k("き") + "た");
    case "plainPastNeg": return p(k("こ") + "なかった");
    case "stem": return p(k("き"));
    case "polite": return p(k("き") + "ます");
    case "politeNeg": return p(k("き") + "ません");
    case "politePast": return p(k("き") + "ました");
    case "politePastNeg": return p(k("き") + "ません でした");
    case "te": return p(k("き") + "て");
    case "tai": return p(k("き") + "たい");
    case "potential": return { ok: true, jp: prefix + k("こ") + "られる", variants: [], colloquial: [prefix + k("こ") + "れる"] };
    case "volitional": return p(k("こ") + "よう");
    case "politeVolitional": return p(k("き") + "ましょう");
    case "passive": return p(k("こ") + "られる");
    case "causative": return p(k("こ") + "させる");
    case "ba": return p(k("く") + "れば");
    case "tara": return p(k("き") + "たら");
    case "imperative": return p(k("こ") + "い");
    case "prohibitive": return p(k("く") + "る な");
    case "nasai": return p(k("き") + "なさい");
    case "teKudasai": return p(k("き") + "て ください");
  }
}

function lacks(word: string, cls: VerbClass, form: VerbForm): string | undefined {
  const w = written(word);
  if (LACKS[w]?.[form]) return LACKS[w][form];
  if (cls === "godan" && HONORIFIC.has(w) && !(w === "なさる" && form === "politeVolitional")) return HONORIFIC_LACKS[form];
  if (STATIVE.has(w)) return STATIVE_LACKS[form];
  return undefined;
}

function conjugateRaw(prefix: string, word: string, cls: VerbClass, form: VerbForm): Conjugated {
  const reason = lacks(word, cls, form);
  if (reason) return missing(reason);
  switch (cls) {
    case "godan": return godan(prefix, word, form);
    case "ichidan": return ichidan(prefix, word, form);
    case "suru": return suru(prefix, word, form);
    case "kuru": return kuru(prefix, word, form);
  }
}

/** One form of a verb, given its dictionary form (Jp markup) and class. する compounds: "[勉強|べんきょう] する", "suru". */
export function conjugateVerb(dict: Jp, cls: VerbClass, form: VerbForm): Conjugated {
  const [prefix, word] = lastWord(dict);
  const result = conjugateRaw(prefix, word, cls, form);
  // A polite negative can also be the plain negative + です ([食|た]べない です, [食|た]べなかった です).
  if (result.ok && (form === "politeNeg" || form === "politePastNeg")) {
    const plain = conjugateRaw(prefix, word, cls, form === "politeNeg" ? "plainNeg" : "plainPastNeg");
    if (plain.ok) return { ...result, variants: [...result.variants, plain.jp + " です"] };
  }
  return result;
}

/** いい and the compounds built on it, which conjugate from よ (よくない, かっこよかった). Keyed by written form. */
const II_WORDS = new Set(["いい", "かっこいい", "格好いい", "ちょうどいい", "気持ちいい", "きもちいい", "心地いい", "居心地いい", "仲いい"]);

/**
 * One form of an i-adjective, a na-adjective, or a noun with the copula (だ/です).
 * いい and its compounds conjugate from よ: よくない, よかった. Phrases like [頭|あたま] が いい end in the word いい.
 */
export function conjugateAdjective(dict: Jp, cls: AdjectiveClass, form: AdjectiveForm): Conjugated {
  if (cls === "i") {
    if (!dict.endsWith("い")) throw new Error(`Not an i-adjective: ${dict}`);
    const ii = II_WORDS.has(written(lastWord(dict)[1]));
    const b = ii ? dict.slice(0, -2) + "よ" : dict.slice(0, -1);
    // いい itself also has the written form よい.
    const yoi = dict === "いい";
    switch (form) {
      case "plain": return yoi ? ok(dict, "よい") : ok(dict);
      case "plainNeg": return ok(b + "くない");
      case "plainPast": return ok(b + "かった");
      case "plainPastNeg": return ok(b + "くなかった");
      case "polite": return yoi ? ok(dict + " です", "よい です") : ok(dict + " です");
      case "politeNeg": return ok(b + "くない です", b + "く ありません");
      case "politePast": return ok(b + "かった です");
      case "politePastNeg": return ok(b + "くなかった です", b + "く ありません でした");
      case "te": return ok(b + "くて");
      case "adverb": return ok(b + "く");
      case "attributive": return yoi ? ok(dict, "よい") : ok(dict);
      case "ba": return ok(b + "ければ");
      case "tara": return ok(b + "かったら");
    }
  }
  const x = dict + " ";
  switch (form) {
    case "plain": return ok(x + "だ");
    case "plainNeg": return ok(x + "じゃ ない", x + "で は ない");
    case "plainPast": return ok(x + "だった");
    case "plainPastNeg": return ok(x + "じゃ なかった", x + "で は なかった");
    case "polite": return ok(x + "です");
    case "politeNeg": return ok(x + "じゃ ありません", x + "で は ありません", x + "じゃ ない です", x + "で は ない です");
    case "politePast": return ok(x + "でした");
    case "politePastNeg": return ok(x + "じゃ ありません でした", x + "で は ありません でした", x + "じゃ なかった です", x + "で は なかった です");
    case "te": return ok(x + "で");
    case "adverb": return cls === "na" ? ok(x + "に") : missing("A noun has no adverb form.");
    case "attributive": return ok(x + (cls === "na" ? "な" : "の"));
    case "ba": return ok(x + "なら");
    case "tara": return ok(x + "だったら");
  }
}
