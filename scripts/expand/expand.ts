/**
 * The dictionary expansion pipeline (G1), pure parts: wordfreq's frequency lists, a lemmatiser that turns the
 * word forms wordfreq counts (思っ, 認め, 高かっ) back into dictionary words, the crediting of counts to JMdict
 * entries, the filter that keeps the content words a learner needs, and the written form under content/STYLE.md §5
 * (常用 kanji and readings, kana where JMdict marks a word as usually written in kana or the table doesn't cover it).
 * scripts/expand/candidates.ts runs it over the downloaded files.
 * Data: JMdict © EDRDG (CC BY-SA 4.0), wordfreq © Robyn Speer (data CC BY-SA 4.0).
 */
import type { Jp, WordPos } from "@/content/types";
import { isJoyo, joyoReadingOk } from "@/lib/joyo";

export interface JmForm {
  text: string;
  common: boolean;
  tags: string[];
  appliesToKanji?: string[];
}
export interface JmSense {
  partOfSpeech: string[];
  misc: string[];
  field: string[];
  appliesToKanji: string[];
  appliesToKana: string[];
  gloss: { text: string }[];
}
export interface JmEntry {
  id: string;
  kanji: JmForm[];
  kana: JmForm[];
  sense: JmSense[];
}

/**
 * wordfreq's "cB" format: after a header, list i holds the words whose frequency is 10^(-i/100) (i centibels
 * below 1). Returns each word's frequency.
 */
export function frequencies(lists: unknown[]): Map<string, number> {
  const out = new Map<string, number>();
  lists.forEach((list, i) => {
    if (i === 0 || !Array.isArray(list)) return;
    for (const word of list) if (typeof word === "string" && !out.has(word)) out.set(word, 10 ** (-i / 100));
  });
  return out;
}

export const toHiragana = (s: string) => [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");
export const hasKanji = (s: string) => /\p{Script=Han}/u.test(s);
const isHan = (c: string) => /\p{Script=Han}/u.test(c) || c === "々";
const isUk = (e: JmEntry) => !!e.sense[0]?.misc.includes("uk");

/** What a lemma rule needs of the entry it lands on. */
export type LemmaNeed = "any" | "ichidan" | "godan" | "i-adj";

const I_TO_U: Record<string, string> = { い: "う", き: "く", ぎ: "ぐ", し: "す", ち: "つ", に: "ぬ", び: "ぶ", み: "む", り: "る" };
const A_TO_U: Record<string, string> = { わ: "う", か: "く", が: "ぐ", さ: "す", た: "つ", な: "ぬ", ば: "ぶ", ま: "む", ら: "る" };

/**
 * The dictionary forms a counted word form may come from, each with what its entry must be: the form itself;
 * an ichidan stem + る (認め → 認める); a godan stem from its い-row (読み → 読む), あ-row (読ま → 読む), っ
 * (思っ → 思う, 待つ, 取る, 行く), ん (読ん → 読む, 遊ぶ, 死ぬ) or い (書い → 書く, 泳ぐ) form; an い-adjective from
 * its く or かっ form (高く, 高かっ → 高い). Some outputs are no word at all; they simply match nothing.
 */
export function lemmaForms(token: string): { form: string; need: LemmaNeed }[] {
  const out: { form: string; need: LemmaNeed }[] = [{ form: token, need: "any" }];
  if (token.length < 2 && !hasKanji(token)) return out;
  const head = token.slice(0, -1);
  const last = token.at(-1)!;
  const add = (form: string, need: LemmaNeed) => out.push({ form, need });
  add(`${token}る`, "ichidan");
  if (I_TO_U[last]) add(head + I_TO_U[last], "godan");
  if (A_TO_U[last]) add(head + A_TO_U[last], "godan");
  if (last === "っ") for (const end of ["う", "つ", "る", "く"]) add(head + end, "godan");
  if (last === "ん") for (const end of ["む", "ぶ", "ぬ"]) add(head + end, "godan");
  if (last === "い") for (const end of ["く", "ぐ"]) add(head + end, "godan");
  if (last === "く") add(`${head}い`, "i-adj");
  if (token.endsWith("かっ")) add(`${token.slice(0, -2)}い`, "i-adj");
  return out;
}

/** Whether an entry has the part of speech a lemma rule needs. */
export function fits(entry: JmEntry, need: LemmaNeed): boolean {
  const tags = entry.sense.flatMap((s) => s.partOfSpeech);
  if (need === "any") return true;
  if (need === "ichidan") return tags.includes("v1");
  if (need === "godan") return tags.some((t) => t.startsWith("v5"));
  return tags.includes("adj-i");
}

/** Tags of a word a learner looks up on its own. */
const CONTENT_POS = /^(n|n-t|n-adv|adj-no|pn|v1|vk|vs-i|adj-i|adj-ix|adj-na|adj-pn|adv|adv-to|int|conj)$|^v5/;
/** Verb classes the conjugation engine doesn't build, or builds only as exceptions it lists itself. */
const REFUSED_VERBS = /^(vs-s|vs-c|v5aru|v5r-i|v2|v4|vr|vn|vz)/;
/** Notes on the first sense that make a word wrong for a learner's dictionary. */
const DROP_MISC = new Set(["vulg", "X", "derog", "sens", "arch", "obs", "rare", "sl", "joc", "net-sl", "dated", "poet"]);
/** Specialist fields whose words a learner at this level doesn't need (food, sport, computing, anatomy… stay). */
const DROP_FIELD = new Set([
  "chem", "math", "physics", "law", "finc", "mil", "sumo", "golf", "baseb", "biol", "elec", "geol", "astron", "bot", "zool", "ling", "phil",
  "stat", "engr", "mahj", "shogi", "go", "hanaf", "kabuki", "noh", "rail", "mining", "min", "pharm", "genet", "biochem", "electr", "telec",
  "print", "archeol", "logic",
]);
/**
 * Grammar STYLE §5 keeps in kana (formal nouns こと, ため, わけ; ない; 〜かも; the helper しまう): the lessons teach
 * them as grammar, and as entries their counts are the grammar's.
 */
export const FUNCTION_WORDS = new Set([
  "ない", "こと", "もの", "ため", "ほど", "まま", "つもり", "わけ", "[訳|わけ]", "はず", "ところ", "よう", "うち", "とおり", "ほか", "とき", "かも", "など",
  "くらい", "ぐらい", "ちゃう", "きり", "しまう", "とく", "がる",
  // Particles and endings JMdict also tags as conjunctions or adjectives: the lessons teach them as grammar.
  "けど", "けれど", "けれども", "ので", "のに", "とか", "たら", "なら", "みたい", "らしい", "による", "によって", "について", "ながら", "ばかり", "だけ", "しか",
]);

/** Our part of speech (and verb class, and whether it takes する) for the entry's first sense, or why it's left out. */
export function classify(entry: JmEntry): { pos: WordPos; verb?: "godan" | "ichidan" | "suru" | "kuru"; suru?: true } | { reason: string } {
  const first = entry.sense[0];
  if (!first) return { reason: "no sense" };
  const tags = first.partOfSpeech;
  if (tags.some((t) => REFUSED_VERBS.test(t))) return { reason: "verb class the engine doesn't build" };
  // A noun that is also a suffix or counter (市, 県, 番) stays; only a sense with no content tag goes.
  if (!tags.some((t) => CONTENT_POS.test(t))) return { reason: "part of speech" };
  if (first.misc.some((m) => DROP_MISC.has(m))) return { reason: "usage" };
  if (first.field.some((f) => DROP_FIELD.has(f))) return { reason: "specialist field" };
  const suru = tags.includes("vs") ? { suru: true as const } : {};
  // The first content tag JMdict lists decides ([内|うち] is n before adv; [少|すこ]し is adv before n).
  for (const t of tags) {
    if (t === "v1") return { pos: "verb", verb: "ichidan" };
    if (/^v5/.test(t)) return { pos: "verb", verb: "godan" };
    if (t === "vk") return { pos: "verb", verb: "kuru" };
    if (t === "vs-i") return { pos: "verb", verb: "suru" };
    if (t === "adj-i" || t === "adj-ix") return { pos: "i-adj" };
    if (t === "adj-na") return { pos: "na-adj", ...suru };
    if (t === "adj-pn") return { pos: "pre-noun" };
    if (t === "pn") return { pos: "pronoun" };
    if (t === "int") return { pos: "interjection" };
    if (t === "conj") return { pos: "conjunction" };
    if (t === "adv" || t === "adv-to") return { pos: "adverb", ...suru };
    if (t === "n" || t === "adj-no" || t === "n-t" || t === "n-adv") return { pos: "noun", ...suru };
  }
  return { reason: "part of speech" };
}

/** Whether the entry's first sense is only grammar or an affix (a particle, suffix, counter…): no content tag. */
export const isFunctionEntry = (entry: JmEntry) => !(entry.sense[0]?.partOfSpeech ?? []).some((t) => CONTENT_POS.test(t));

const OUT_OF_USE = new Set(["rK", "sK", "iK", "oK", "ik", "ok", "rk", "sk"]);

/**
 * Lesson markup for a written form and its reading, one ruby group per kanji run ([食|た]べる, [勉強|べんきょう],
 * [人々|ひとびと]), or null when the kana around the kanji don't line up with the reading.
 */
export function markupOf(written: string, reading: string): Jp | null {
  if (![...written].some(isHan)) return written;
  const runs = written.match(/[\p{Script=Han}々]+|[^\p{Script=Han}々]+/gu) ?? [];
  const pattern = runs.map((r) => (isHan(r[0]) ? "(.+?)" : toHiragana(r).replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))).join("");
  const m = toHiragana(reading).match(new RegExp(`^${pattern}$`, "u"));
  if (!m) return null;
  let group = 1;
  return runs.map((r) => (isHan(r[0]) ? `[${r}|${m[group++]}]` : r)).join("");
}

/**
 * Readings the 常用 table can't confirm that may be right all the same: held for the owner's word (CLAUDE.md), then
 * added to lib/joyo.ts's exceptions (文字 もじ, 反応 はんのう and 天皇 てんのう were, 2026-10-14). Empty for now.
 */
export const CHECK_BY_HAND = new Set<string>();

export type Choice =
  | { jp: Jp; written: string; reading: string; kanaBecause?: "uk" | "kanji" | "reading" }
  | { reason: string; check?: true };

/**
 * The written form under STYLE §5: kana when JMdict marks the first sense "usually written in kana" (uk) or the
 * entry has no kanji form in use; otherwise the first kanji form in use whose kanji are all 常用 and whose reading
 * the 常用 table allows (付表 words such as 今日 きょう included). When no kanji form passes, the word is written in
 * hiragana, as STYLE does for a word outside the table (きれい, うそ), with the reason. Native words prefer a
 * hiragana form over a katakana one.
 */
export function chooseForm(entry: JmEntry): Choice {
  const kana = entry.kana.filter((k) => !k.tags.some((t) => OUT_OF_USE.has(t)));
  if (!kana.length) return { reason: "no kana form in use" };
  const kanji = entry.kanji.filter((k) => !k.tags.some((t) => OUT_OF_USE.has(t)));
  const inKana = (because?: "uk" | "kanji" | "reading"): Choice => {
    // A katakana form first only when every form is katakana (a loanword); 眼鏡 is めがね, not メガネ.
    const k = kanji.length ? (kana.find((f) => /^[ぁ-ゖー]+$/.test(f.text)) ?? kana[0]) : kana[0];
    if (!/^[ぁ-ゖァ-ヺー]+$/.test(k.text)) return { reason: "not written in kana or kanji" };
    return { jp: k.text, written: k.text, reading: toHiragana(k.text), ...(because ? { kanaBecause: because } : {}) };
  };
  if (!kanji.length) return inKana();
  // Written with letters or digits (ＣＤ, Ｔシャツ): the kana alone would misrepresent it.
  if (kanji.some((k) => /[A-Za-zＡ-Ｚａ-ｚ0-9０-９]/.test(k.text))) return { reason: "written with letters or digits" };
  if (isUk(entry)) return inKana("uk");
  const ordered = [...kanji.filter((k) => k.common), ...kanji.filter((k) => !k.common)];
  let because: "kanji" | "reading" = "kanji";
  for (const k of ordered) {
    const chars = [...k.text];
    const allowed = chars.every((c, i) => (c === "々" ? i > 0 && hasKanji(chars[i - 1]) : hasKanji(c) ? isJoyo(c) : /[ぁ-ゖァ-ヺーー]/.test(c)));
    if (!allowed) continue;
    const reading = kana.find((r) => !r.appliesToKanji || r.appliesToKanji.includes("*") || r.appliesToKanji.includes(k.text));
    if (!reading) continue;
    because = "reading";
    const jp = markupOf(k.text, reading.text);
    if (!jp) continue;
    const r = toHiragana(reading.text);
    if (CHECK_BY_HAND.has(`${k.text}|${r}`)) return { reason: "reading to check by hand", check: true };
    const rubies = [...jp.matchAll(/\[([^|\]]+)\|([^\]]+)\]/g)];
    // Ruby by ruby, or the whole word at once when its okurigana carry a sound change (真っ赤, 決して, 引っ張る).
    if (rubies.every(([, base, rr]) => joyoReadingOk(base, rr)) || joyoReadingOk(k.text, r)) return { jp, written: k.text, reading: r };
  }
  return inKana(because);
}

/** A word of one kana is almost always a fragment wordfreq split off (て, ね, お). */
export const isFragment = (written: string) => [...written].length === 1 && !hasKanji(written);

/**
 * Words JMdict doesn't mark vulgar but a study app for all ages leaves out: adult and sexual terms, and insults.
 * Matched on the written form and on the reading.
 */
export const UNSUITABLE = new Set([
  "エロ", "アダルト", "セックス", "ヌード", "変態", "へんたい", "風俗", "ふうぞく", "痴漢", "ちかん", "売春", "淫乱", "エッチ", "オナニー", "おっぱい",
  "ちんこ", "ちんぽ", "まんこ", "ブス", "ぶす", "デブ", "でぶ", "ハゲ", "はげ", "馬鹿", "ばか", "バカ", "あほ", "アホ", "くそ", "クソ", "死ね", "しね",
  "麻薬", "覚醒剤", "やくざ", "ヤクザ",
]);
export const isUnsuitable = (written: string, reading: string) => UNSUITABLE.has(written) || UNSUITABLE.has(reading);

/**
 * Proper nouns JMdict files as plain nouns (places, eras, surnames), spotted by the first gloss: a capitalised
 * first word, or the words city, prefecture, era, surname. Kept, but flagged for the writer, who keeps countries
 * and major cities.
 */
export function looksProper(entry: JmEntry): boolean {
  const gloss = entry.sense[0]?.gloss[0]?.text ?? "";
  return /\b(city|prefecture|era|surname|region|district)\b/i.test(gloss) || /^[A-Z][a-z]/.test(gloss);
}

// ---- Crediting counts to entries ----

export interface Index {
  byForm: Map<string, JmEntry[]>;
}

/**
 * Entries by the forms a token can match: every kanji form, and for entries written in kana (uk, or no kanji
 * form) their kana forms in use, so the kana token かう doesn't count for 買う, nor う for うさぎ.
 */
export function indexEntries(entries: JmEntry[]): Index {
  const byForm = new Map<string, JmEntry[]>();
  const add = (form: string, e: JmEntry) => byForm.set(form, [...(byForm.get(form) ?? []), e]);
  for (const e of entries) {
    for (const k of e.kanji) add(k.text, e);
    if (!e.kanji.length || isUk(e)) for (const k of e.kana.filter((f) => !f.tags.some((t) => OUT_OF_USE.has(t)))) add(k.text, e);
  }
  return { byForm };
}

/**
 * Credits one token's frequency to the entries it may be. A kana token matches itself, and through the lemma
 * rules only verbs and adjectives written in kana, and only when it isn't a word of its own (しまっ → しまう); a
 * kana token that is a kana godan verb's stem (あり) counts for the verb only. The count is shared between the
 * matches, weighted: when the lessons teach one of them, the others get a tenth (上 is うえ); grammar and affix
 * entries (the particle かも, the suffix 〜者) leave content entries a fifth; a verb reached through a lemma rule
 * leaves a noun of the same spelling a fifth (見え as 見える, not "pretensions").
 */
export function credit(token: string, f: number, ix: Index, taught: (e: JmEntry) => boolean): Map<string, number> {
  const kanaOnly = !hasKanji(token);
  const own = ix.byForm.get(token) ?? [];
  const lemmas = (accept: (e: JmEntry, need: LemmaNeed) => boolean) => {
    const found = new Map<string, { e: JmEntry; viaLemma: boolean }>();
    for (const { form, need } of lemmaForms(token)) for (const e of ix.byForm.get(form) ?? []) if (fits(e, need) && !found.has(e.id) && accept(e, need)) found.set(e.id, { e, viaLemma: need !== "any" });
    return [...found.values()];
  };
  let counted: { e: JmEntry; viaLemma: boolean }[];
  if (!kanaOnly) counted = lemmas(() => true);
  else {
    // A kana token reaches only words written in kana through the lemma rules.
    const kanaVerbs = lemmas((e, need) => need !== "any" && (isUk(e) || !e.kanji.length));
    const stemOfGodan = kanaVerbs.some((m) => m.e.sense.some((s) => s.partOfSpeech.some((t) => t.startsWith("v5"))));
    // あり is ある's stem, not the noun "ant"; しまっ (no entry of its own) is しまう; otherwise the token is itself.
    counted = stemOfGodan || !own.length ? kanaVerbs : own.map((e) => ({ e, viaLemma: false }));
  }
  const anyTaught = counted.some((m) => taught(m.e));
  const grammar = counted.some((m) => isFunctionEntry(m.e));
  const verbLemma = counted.some((m) => m.viaLemma);
  const out = new Map<string, number>();
  for (const { e, viaLemma } of counted) {
    let w = 1;
    if (anyTaught && !taught(e)) w *= 0.1;
    if (grammar && !isFunctionEntry(e)) w *= 0.2;
    if (verbLemma && !viaLemma) w *= 0.2;
    out.set(e.id, (f / counted.length) * w);
  }
  return out;
}

/**
 * The JMdict entries the lesson dictionary already has, by id: exact (written, reading) pairs for words in kanji,
 * and for words the lessons write in kana either the kana-written entry or the one whose glosses share a word with
 * the lesson's meaning, so the kana lesson's かき (persimmon) is 柿 but not 牡蠣.
 */
export function lessonEntryIds(entries: JmEntry[], lesson: { written: string; reading: string; meaning: string }[]): Set<string> {
  const ids = new Set<string>();
  const byReading = new Map<string, JmEntry[]>();
  for (const e of entries) for (const k of e.kana) byReading.set(toHiragana(k.text), [...(byReading.get(toHiragana(k.text)) ?? []), e]);
  const words = (s: string) => new Set(s.toLowerCase().match(/[a-z]{3,}/g) ?? []);
  for (const w of lesson) {
    const same = byReading.get(w.reading) ?? [];
    if (hasKanji(w.written)) {
      for (const e of same) if (e.kanji.some((k) => k.text === w.written)) ids.add(e.id);
      continue;
    }
    const meaning = words(w.meaning);
    for (const e of same) {
      const kanaWritten = e.kana.some((k) => k.text === w.written) && (!e.kanji.length || isUk(e));
      const sameSense = e.sense.slice(0, 2).some((s) => s.gloss.some((g) => [...words(g.text)].some((x) => meaning.has(x))));
      if (kanaWritten || sameSense) ids.add(e.id);
    }
  }
  return ids;
}
