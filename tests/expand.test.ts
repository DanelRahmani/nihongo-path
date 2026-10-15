import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { isJoyo, joyoReadingOk } from "@/lib/joyo";
import { plainOf, readingOf } from "@/lib/markup";
import { chooseForm, classify, credit, fits, frequencies, indexEntries, isFragment, isUnsuitable, type JmEntry, lemmaForms, lessonEntryIds, markupOf } from "@/scripts/expand/expand";
import { decodeMsgpack } from "@/scripts/expand/msgpack";

/** A JMdict entry in jmdict-simplified's shape, with only what the pipeline reads. */
function entry(kanji: (string | [string, string[]])[], kana: (string | [string, string[]])[], pos: string[], misc: string[] = [], field: string[] = [], id = "1", gloss = "gloss"): JmEntry {
  const form = (f: string | [string, string[]]) => (typeof f === "string" ? { text: f, common: true, tags: [] } : { text: f[0], common: true, tags: f[1] });
  return {
    id,
    kanji: kanji.map(form),
    kana: kana.map((k) => ({ ...form(k), appliesToKanji: ["*"] })),
    sense: [{ partOfSpeech: pos, misc, field, appliesToKanji: ["*"], appliesToKana: ["*"], gloss: [{ text: gloss }] }],
  };
}

describe("msgpack", () => {
  it("decodes the types wordfreq's files use", () => {
    // [{"format": "cB"}, [], ["a", "あ"], 300, -1, null, true, 1.5]
    const bytes = new Uint8Array([
      0x98, 0x81, 0xa6, ...new TextEncoder().encode("format"), 0xa2, 0x63, 0x42, 0x90, 0x92, 0xa1, 0x61, 0xa3, 0xe3, 0x81, 0x82,
      0xcd, 0x01, 0x2c, 0xff, 0xc0, 0xc3, 0xcb, 0x3f, 0xf8, 0, 0, 0, 0, 0, 0,
    ]);
    expect(decodeMsgpack(bytes)).toEqual([{ format: "cB" }, [], ["a", "あ"], 300, -1, null, true, 1.5]);
  });

  it("keeps __proto__ an ordinary key", () => {
    const key = new TextEncoder().encode("__proto__");
    const decoded = decodeMsgpack(new Uint8Array([0x81, 0xa9, ...key, 0x01])) as Record<string, unknown>;
    expect(Object.getPrototypeOf(decoded)).toBe(Object.prototype);
    expect(Object.keys(decoded)).toEqual(["__proto__"]);
  });
});

describe("frequencies", () => {
  it("reads list i as 10^(-i/100), the first listing of a word winning", () => {
    const f = frequencies([{ format: "cB" }, [], ["自分", "思っ"], ["自分", "認め"]]);
    expect(f.get("自分")).toBeCloseTo(10 ** -0.02);
    expect(f.get("認め")).toBeCloseTo(10 ** -0.03);
    expect(f.has("format")).toBe(false);
  });
});

describe("lemmaForms", () => {
  const forms = (t: string) => lemmaForms(t).map((x) => `${x.form}:${x.need}`);
  it("folds the forms wordfreq counts into dictionary words, each with what its entry must be", () => {
    expect(forms("認め")).toContain("認める:ichidan");
    expect(forms("読み")).toContain("読む:godan");
    expect(forms("読ま")).toContain("読む:godan");
    expect(forms("思っ")).toContain("思う:godan");
    expect(forms("読ん")).toEqual(expect.arrayContaining(["読む:godan", "読ぶ:godan"]));
    expect(forms("書い")).toContain("書く:godan");
    expect(forms("高く")).toContain("高い:i-adj");
    expect(forms("高かっ")).toContain("高い:i-adj");
    expect(forms("自分")[0]).toBe("自分:any");
  });

  it("only lands on entries of the needed kind", () => {
    const v1 = entry(["認める"], ["みとめる"], ["v1", "vt"]);
    const noun = entry(["思る"], ["おもる"], ["n"]);
    expect(fits(v1, "ichidan")).toBe(true);
    expect(fits(noun, "godan")).toBe(false);
    expect(fits(noun, "any")).toBe(true);
  });
});

describe("classify", () => {
  it("names our part of speech from the first tag JMdict lists", () => {
    expect(classify(entry(["内"], ["うち"], ["n", "adv"]))).toEqual({ pos: "noun" });
    expect(classify(entry(["少し"], ["すこし"], ["adv", "n"]))).toEqual({ pos: "adverb" });
    expect(classify(entry(["使う"], ["つかう"], ["v5u", "vt"]))).toEqual({ pos: "verb", verb: "godan" });
    expect(classify(entry(["静か"], ["しずか"], ["adj-na"]))).toEqual({ pos: "na-adj" });
  });

  it("leaves out particles, affixes, counters, expressions, unsuitable words and verbs the engine refuses, but keeps nouns that are also suffixes", () => {
    for (const pos of [["prt"], ["suf"], ["ctr"], ["exp"], ["vs-s"], ["v5aru"], ["aux-v"]]) expect(classify(entry(["x"], ["x"], pos)), pos[0]).toHaveProperty("reason");
    expect(classify(entry(["市"], ["し"], ["n", "n-suf"]))).toEqual({ pos: "noun" });
    expect(classify(entry(["確認"], ["かくにん"], ["n", "vs", "vt"]))).toEqual({ pos: "noun", suru: true });
    expect(classify(entry(["x"], ["x"], ["n"], ["vulg"]))).toHaveProperty("reason");
    expect(classify(entry(["x"], ["x"], ["n"], ["arch"]))).toHaveProperty("reason");
    // Specialist fields: chemistry goes, food stays.
    expect(classify(entry(["x"], ["x"], ["n"], [], ["chem"]))).toHaveProperty("reason");
    expect(classify(entry([], ["ケーキ"], ["n"], [], ["food"]))).toEqual({ pos: "noun" });
    expect(isUnsuitable("エロ", "えろ")).toBe(true);
    // ばか is written in kana (馬鹿 is uk), so the reading is checked too.
    expect(isUnsuitable("ばか", "ばか")).toBe(true);
    expect(isFragment("て")).toBe(true);
    expect(isFragment("木")).toBe(false);
  });
});

describe("markupOf and chooseForm", () => {
  it("writes one ruby group per kanji run, okurigana outside", () => {
    expect(markupOf("食べる", "たべる")).toBe("[食|た]べる");
    expect(markupOf("勉強", "べんきょう")).toBe("[勉強|べんきょう]");
    expect(markupOf("取り戻す", "とりもどす")).toBe("[取|と]り[戻|もど]す");
    expect(markupOf("お願い", "おねがい")).toBe("お[願|ねが]い");
    expect(markupOf("食べる", "のむ")).toBeNull();
  });

  it("writes kana for uk words, and kanji only when they and their readings are in the 常用 table", () => {
    expect(chooseForm(entry(["沢山"], ["たくさん"], ["adv"], ["uk"]))).toMatchObject({ jp: "たくさん", kanaBecause: "uk" });
    expect(chooseForm(entry(["使う"], ["つかう"], ["v5u"]))).toMatchObject({ jp: "[使|つか]う" });
    // Forms marked rare or irregular are skipped for the next one.
    expect(chooseForm(entry([["想う", ["rK"]], "思う"], ["おもう"], ["v5u"]))).toMatchObject({ jp: "[思|おも]う" });
    expect(chooseForm(entry(["ＣＤ"], ["シーディー"], ["n"]))).toHaveProperty("reason");
    expect(chooseForm(entry([], ["コーヒー"], ["n"]))).toMatchObject({ jp: "コーヒー", reading: "こーひー" });
  });

  it("falls back to hiragana when the kanji or the reading is outside the table (STYLE §5: きれい, うそ)", () => {
    expect(chooseForm(entry(["綺麗"], ["きれい"], ["adj-na"]))).toMatchObject({ jp: "きれい", kanaBecause: "kanji" });
    expect(chooseForm(entry(["嘘"], ["うそ"], ["n"]))).toMatchObject({ jp: "うそ", kanaBecause: "kanji" });
    expect(chooseForm(entry(["今日"], ["けふ"], ["n"]))).toMatchObject({ jp: "けふ", kanaBecause: "reading" });
    // A native word prefers its hiragana form (眼鏡: めがね, not メガネ).
    expect(chooseForm(entry(["眼鏡"], ["メガネ", "めがね"], ["n"], ["uk"]))).toMatchObject({ jp: "めがね" });
  });

  it("keeps 付表 readings (tagged gikun by JMdict), 々, and okurigana with a sound change", () => {
    expect(chooseForm(entry(["今日"], [["きょう", ["gikun"]], "こんにち"], ["n"]))).toMatchObject({ jp: "[今日|きょう]" });
    expect(chooseForm(entry(["大人"], [["おとな", ["gikun"]]], ["n"]))).toMatchObject({ jp: "[大人|おとな]" });
    expect(chooseForm(entry(["人々"], ["ひとびと"], ["n"]))).toMatchObject({ jp: "[人々|ひとびと]" });
    expect(chooseForm(entry(["真っ赤"], ["まっか"], ["adj-na"]))).toMatchObject({ jp: "[真|ま]っ[赤|か]" });
    // The owner's exceptions (lib/joyo.ts): 文字 もじ and the 連声 words.
    expect(chooseForm(entry(["文字"], ["もじ"], ["n"]))).toMatchObject({ jp: "[文字|もじ]" });
    expect(chooseForm(entry(["反応"], ["はんのう"], ["n"]))).toMatchObject({ jp: "[反応|はんのう]" });
    expect(chooseForm(entry(["出来事"], ["できごと"], ["n"]))).toMatchObject({ jp: "[出来事|できごと]" });
    expect(chooseForm(entry(["流行る"], ["はやる"], ["v5r"]))).toMatchObject({ jp: "[流行|はや]る" });
  });
});

describe("crediting counts", () => {
  const ant = entry(["蟻"], ["あり"], ["n"], ["uk"], [], "ant");
  const aru = entry(["有る"], ["ある"], ["v5r"], ["uk"], [], "aru");
  const kau = entry(["買う"], ["かう"], ["v5u"], [], [], "kau");
  const shimau = entry(["仕舞う"], ["しまう"], ["v5u"], ["uk"], [], "shimau");
  const ue = entry(["上"], ["うえ"], ["n"], [], [], "ue");
  const kami = entry(["上"], ["かみ"], ["n"], [], [], "kami");
  const duck = entry(["鴨"], ["かも"], ["n"], ["uk"], [], "duck");
  const kamoPrt = entry([], ["かも"], ["prt"], [], [], "kamo-prt");
  const mie = entry(["見え"], ["みえ"], ["n"], [], [], "mie");
  const mieru = entry(["見える"], ["みえる"], ["v1"], [], [], "mieru");
  const ix = indexEntries([ant, aru, kau, shimau, ue, kami, duck, kamoPrt, mie, mieru]);
  const none = () => false;

  it("counts a kana token only for words written in kana: かう isn't 買う, あり is ある's stem, しまっ is しまう", () => {
    expect([...credit("かう", 1, ix, none).keys()]).toEqual([]);
    expect([...credit("あり", 1, ix, none).keys()]).toEqual(["aru"]);
    expect([...credit("しまっ", 1, ix, none).keys()]).toEqual(["shimau"]);
  });

  it("weights shared tokens: the lessons' reading first, grammar over content, a verb over a noun of its spelling", () => {
    const up = credit("上", 1, ix, (e) => e.id === "ue");
    expect(up.get("kami")! * 10).toBeCloseTo(up.get("ue")!);
    const kamo = credit("かも", 1, ix, none);
    expect(kamo.get("duck")! * 5).toBeCloseTo(kamo.get("kamo-prt")!);
    const seen = credit("見え", 1, ix, none);
    expect(seen.get("mie")! * 5).toBeCloseTo(seen.get("mieru")!);
  });

  it("finds the lessons' entries by id: the kana lesson's かき is 柿, not 牡蠣", () => {
    const kaki = entry(["柿"], ["かき"], ["n"], [], [], "persimmon", "persimmon");
    const oyster = entry(["牡蠣"], ["かき"], ["n"], [], [], "oyster", "oyster");
    const hashi = entry(["箸"], ["はし"], ["n"], [], [], "chopsticks", "chopsticks");
    const ids = lessonEntryIds([kaki, oyster, hashi], [
      { written: "かき", reading: "かき", meaning: "persimmon" },
      { written: "はし", reading: "はし", meaning: "bridge" },
    ]);
    expect([...ids]).toEqual(["persimmon"]);
  });
});

describe("the candidate list", () => {
  const file = JSON.parse(readFileSync("content/data/expand-candidates.json", "utf8")) as {
    note: string;
    candidates: { id: string; jp: string; pos: string; verb?: string; gloss: string; zipf: number }[];
  };
  const list = file.candidates;

  it("credits its sources and states its own licence, and is most frequent first", () => {
    expect(file.note).toMatch(/This file is licensed CC BY-SA 4\.0/);
    expect(file.note).toMatch(/JMdict.*Electronic Dictionary Research and Development Group.*edrdg\.org\/edrdg\/licence\.html/);
    expect(file.note).toMatch(/wordfreq/);
    expect(list.length).toBeGreaterThanOrEqual(2000);
    for (let i = 1; i < list.length; i++) expect(list[i].zipf).toBeLessThanOrEqual(list[i - 1].zipf);
  });

  it("keeps basic words and drops the readings and grammar it shouldn't list", () => {
    const has = new Set(list.map((c) => c.jp));
    for (const jp of ["[涼|すず]しい", "[親切|しんせつ]", "[下手|へた]", "なぜ", "[田舎|いなか]", "[人々|ひとびと]", "うそ", "[市|し]"]) expect(has.has(jp), jp).toBe(true);
    for (const jp of ["[今日|こんにち]", "[明日|みょうにち]", "[昨日|さくじつ]", "かも", "ちゃう", "けど", "ので", "こと", "ない"]) expect(has.has(jp), jp).toBe(false);
  });

  it("holds no lesson word, no duplicate, and only 常用 kanji with 常用 readings, in hiragana ruby", () => {
    const lesson = new Set([...WORDS, ...EXTRA_WORDS].map((w) => w.jp));
    const names = new Set(NAMES.map((n) => plainOf(n, false)));
    const keys = new Set<string>();
    for (const c of list) {
      expect(lesson.has(c.jp), c.jp).toBe(false);
      expect(names.has(plainOf(c.jp, false)), c.jp).toBe(false);
      const key = `${plainOf(c.jp, false)}|${readingOf(c.jp, false)}`;
      expect(keys.has(key), c.jp).toBe(false);
      keys.add(key);
      for (const [, base, reading] of c.jp.matchAll(/\[([^|\]]+)\|([^\]]+)\]/g)) {
        expect([...base].every((ch, i) => (ch === "々" ? i > 0 : isJoyo(ch))), c.jp).toBe(true);
        expect(joyoReadingOk(base, reading), c.jp).toBe(true);
        expect(reading, c.jp).toMatch(/^[ぁ-ゖー]+$/);
      }
      if (c.pos === "verb") expect(c.verb, c.jp).toBeDefined();
      expect(isUnsuitable(plainOf(c.jp, false), readingOf(c.jp, false)), c.jp).toBe(false);
    }
  });
});
