/**
 * Checks a ruby reading against the 常用漢字表 (content/data/joyo.json, built by scripts/data/parse-joyo.mjs).
 * A reading passes when it splits, kanji by kanji, into 常用 readings, allowing the usual sound changes
 * (rendaku: 三本 さん+ぼん; small っ before the next kanji: 一本 いっ+ぽん), or when it is a 付表 word, or a
 * house exception from content/STYLE.md. Pure.
 *
 * Build- and test-time only: joyo.json is 135 KB, so client code shouldn't import this module.
 */
import joyo from "@/content/data/joyo.json" with { type: "json" };

type Entry = { on: string[]; kun: string[]; special: string[] };
const KANJI = joyo.kanji as Record<string, Entry>;

/** STYLE.md §5: readings outside the table that the house allows. */
export const READING_EXCEPTIONS: Record<string, string> = { 明日: "あした", 文字: "もじ", 反応: "はんのう", 天皇: "てんのう", 出来事: "できごと", 流行: "はや" };

/**
 * Words read as one unit: proper nouns (STYLE.md §5 allows names; 大阪 is in the table's own 備考) and sound
 * changes the table doesn't spell out (its note 11 says its list isn't exhaustive). Usable inside longer words.
 */
const UNITS: { base: string; reading: string }[] = [
  { base: "日本", reading: "にほん" },
  { base: "日本", reading: "にっぽん" },
  { base: "大阪", reading: "おおさか" },
  { base: "渋谷", reading: "しぶや" },
];

/** Stems a kanji takes only through conjugation, alone in its ruby: 来る → 来ます (き), 来ない (こ). */
const CONJUGATED: Record<string, string[]> = { 来: ["き", "こ"] };

const NUMERALS = "一二三四五六七八九";

const I_ROW: Record<string, string> = { う: "い", く: "き", ぐ: "ぎ", す: "し", つ: "ち", ぬ: "に", ぶ: "び", む: "み", る: "り" };

const toHiragana = (s: string) =>
  [...s].map((c) => (c >= "ァ" && c <= "ヶ" ? String.fromCodePoint(c.codePointAt(0)! - 0x60) : c)).join("");

export function isJoyo(kanji: string): boolean {
  return kanji in KANJI;
}

/**
 * Every reading a kanji may take inside a word: on readings, whole kun readings, kun stems, and a verb's
 * noun form, as in compounds (合う → 試合 しあい, 起きる → 早起き はやおき).
 */
export function joyoReadings(kanji: string): string[] {
  const e = KANJI[kanji];
  if (!e) return [];
  const kun = e.kun.flatMap((k) => {
    if (!k.includes(".")) return [k];
    const [stem, oku] = k.split(".");
    const forms = [stem, stem + oku];
    // Numbers' つ readings (みっ.つ) aren't verbs and have no noun form.
    if (oku.length === 1 && I_ROW[oku] && !NUMERALS.includes(kanji)) forms.push(stem + I_ROW[oku]);
    if (oku.length > 1 && oku.endsWith("る")) forms.push(stem + oku.slice(0, -1));
    return forms;
  });
  return [...new Set([...e.on.map(toHiragana), ...kun])];
}

const isOn = (kanji: string, r: string) => KANJI[kanji]?.on.some((o) => toHiragana(o) === r) ?? false;

/** A verb's kun stem, which can take っ before the next kanji (切 き → 切手 きって). */
const isVerbStem = (kanji: string, r: string) => KANJI[kanji]?.kun.some((k) => k.includes(".") && k.split(".")[0] === r) ?? false;

const VOICE: Record<string, string[]> = {};
const ROWS = ["かが", "きぎ", "くぐ", "けげ", "こご", "さざ", "しじ", "すず", "せぜ", "そぞ", "ただ", "ちぢじ", "つづず", "てで", "とど", "はばぱ", "ひびぴ", "ふぶぷ", "へべぺ", "ほぼぽ"];
for (const row of ROWS) VOICE[row[0]] = [...row.slice(1)];

/** Kana that may follow a small っ: the k, s, t and p rows. */
const AFTER_SOKUON = /^[かきくけこさしすせそたちつてとぱぴぷぺぽ]/;
/** After an on reading's く/き turned into っ, only the k and p rows follow (学校 がっこう, not 学生 がっせい). */
const AFTER_K_SOKUON = /^[かきくけこぱぴぷぺぽ]/;
const P_ROW = /^[ぱぴぷぺぽ]/;

/** A way a reading may sound at a position, and what the next piece must start with. */
type Sounding = { s: string; next?: RegExp };

/**
 * A reading as it may sound at a position: voiced when not first; when not last, an on reading's final
 * つ/ち/く/き as っ (一 いち → いっ, 学 がく → がっ), or a verb stem with っ added (切 き → きっ).
 */
function soundings(r: string, first: boolean, last: boolean, on: boolean, stem: boolean): Sounding[] {
  const voiced = first ? [r] : [r, ...(VOICE[r[0]] ?? []).map((v) => v + r.slice(1))];
  const out: Sounding[] = voiced.map((s) => ({ s }));
  if (!last) {
    for (const x of voiced) {
      if (on && /[つち]$/.test(x)) out.push({ s: x.slice(0, -1) + "っ", next: AFTER_SOKUON });
      if (on && /[くき]$/.test(x)) out.push({ s: x.slice(0, -1) + "っ", next: AFTER_K_SOKUON });
      if (stem) out.push({ s: x + "っ", next: AFTER_SOKUON });
    }
  }
  return out;
}

/** 付表 words as (kanji part, reading part) units: 母さん かあさん → 母 + かあ. */
const FUHYO: { base: string; reading: string }[] = joyo.fuhyo.flatMap((f) =>
  f.words.map((w) => {
    let base = w;
    let reading = f.reading;
    while (base && reading && base.at(-1) === reading.at(-1) && !/[\u3400-\u9fff]/.test(base.at(-1)!)) {
      base = base.slice(0, -1);
      reading = reading.slice(0, -1);
    }
    while (base && reading && base[0] === reading[0] && !/[\u3400-\u9fff]/.test(base[0])) {
      base = base.slice(1);
      reading = reading.slice(1);
    }
    return { base, reading };
  }),
);

/**
 * Whether `reading` is an allowed reading of the kanji word `base`. `joined`: the word follows another
 * word or a digit with no space (3[本|ぼん], [先生|せんせい][方|がた]), so its first kana may be voiced.
 */
export function joyoReadingOk(base: string, reading: string, joined = false): boolean {
  if (READING_EXCEPTIONS[base] === reading) return true;
  const chars = [...base];
  const memo = new Map<string, boolean>();
  // `need`: what the next piece must start with, after a っ made by a sound change.
  const go = (i: number, j: number, need?: RegExp): boolean => {
    if (i === chars.length) return j === reading.length;
    const key = `${i}:${j}:${need?.source ?? ""}`;
    if (memo.has(key)) return memo.get(key)!;
    // A piece fits when it matches the reading here, follows any っ rule, and a p sound made by voicing
    // comes after っ or ん (三本 さんぼん, 一本 いっぽん; not いちぽん).
    const fits = (sd: Sounding, original: string) =>
      reading.startsWith(sd.s, j) &&
      (!need || need.test(sd.s)) &&
      (j === 0 || reading[j - 1] !== "っ" || AFTER_SOKUON.test(sd.s)) &&
      (!P_ROW.test(sd.s) || P_ROW.test(original) || (j > 0 && /[っん]/.test(reading[j - 1])));
    let ok = false;
    // A 付表 word as one unit at the start (今日, 一人, 母さん's 母), or a named unit anywhere (日本 in 日本語).
    const units = i === 0 ? [...FUHYO, ...UNITS] : UNITS;
    for (const f of units) {
      if (ok) break;
      if (chars.slice(i, i + [...f.base].length).join("") !== f.base) continue;
      const end = i + [...f.base].length;
      for (const sd of soundings(f.reading, i === 0 && !joined, end === chars.length, false, false)) {
        if (fits(sd, f.reading) && go(end, j + sd.s.length, sd.next)) {
          ok = true;
          break;
        }
      }
    }
    // One kanji (々 repeats the one before it).
    const k = chars[i] === "々" && i > 0 ? chars[i - 1] : chars[i];
    const readings = [...joyoReadings(k), ...(chars.length === 1 ? (CONJUGATED[k] ?? []) : [])];
    for (const r of ok ? [] : readings) {
      for (const sd of soundings(r, i === 0 && !joined, i === chars.length - 1, isOn(k, r), isVerbStem(k, r))) {
        if (fits(sd, r) && go(i + 1, j + sd.s.length, sd.next)) {
          ok = true;
          break;
        }
      }
      if (ok) break;
    }
    memo.set(key, ok);
    return ok;
  };
  return go(0, 0);
}

/** A kanji's row in the table as printed: on (katakana), kun (hiragana, た.べる), and the indented special readings. */
export function tableReadings(kanji: string): Entry | undefined {
  return KANJI[kanji];
}
