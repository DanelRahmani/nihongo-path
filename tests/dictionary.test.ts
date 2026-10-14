import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import type { Word } from "@/content/types";
import { WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import {
  BATCH,
  buildEntries,
  csvField,
  DEFAULT_FILTERS,
  type Entry,
  glossesOf,
  growthReducer,
  INITIAL_GROWTH,
  kanaRow,
  looseKana,
  looseRomaji,
  parseQuery,
  search,
  toCsv,
  visibleCount,
} from "@/lib/dictionary";
import { normalizeRomaji } from "@/lib/romaji-input";
import { myWordsSchema } from "@/lib/schemas";

const ENTRIES = buildEntries({ words: WORDS, extra: EXTRA_WORDS });
const written = (entries: Entry[]) => entries.map((e) => e.written);
const top = (query: string, filters = DEFAULT_FILTERS) => search(ENTRIES, query, filters)[0]?.written;

describe("entries", () => {
  it("have one id per entry, stable across builds", () => {
    const ids = ENTRIES.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ENTRIES.find((e) => e.id === "[本|ほん]#counter")?.word.pos).toBe("counter");
    expect(ENTRIES.find((e) => e.id === "[本|ほん]#noun")?.word.meaning).toBe("book");
  });

  it("carry the written form, the kana reading and the app's romaji", () => {
    expect(ENTRIES.find((e) => e.id === "[食|た]べる#verb")).toMatchObject({ written: "食べる", reading: "たべる", romaji: "taberu", source: "lesson" });
    expect(ENTRIES.every((e) => e.reading && e.romaji && !/[[\]|{}]/.test(e.written + e.reading))).toBe(true);
  });

  it("mark the expansion words", () => {
    expect(ENTRIES.filter((e) => e.source === "extra")).toHaveLength(EXTRA_WORDS.length);
  });
});

describe("romaji normaliser", () => {
  it.each([
    ["kyo", "kyou"],
    ["kyō", "kyou"],
    ["kyoo", "kyou"],
    ["toukyo", "toukyou"],
    ["sense", "sensei"],
  ])("loosely matches %s with %s", (typed, app) => expect(looseRomaji(normalizeRomaji(typed))).toBe(looseRomaji(normalizeRomaji(app))));

  it("folds si/shi, tu/tsu and a typed nn", () => {
    expect(parseQuery("sinbunn")).toMatchObject({ kind: "latin", roma: normalizeRomaji("shinbun") });
    expect(parseQuery("tukue")).toMatchObject({ roma: "tsukue" });
  });

  it("tells Japanese from English letters, folding katakana to hiragana", () => {
    expect(parseQuery("  ")).toEqual({ kind: "empty" });
    expect(parseQuery("コーヒー")).toMatchObject({ kind: "jp", text: "こーひー" });
    expect(parseQuery("〜中")).toMatchObject({ kind: "jp", text: "中" });
    expect(parseQuery("Eat")).toMatchObject({ kind: "latin", en: "eat" });
    expect(parseQuery("To  Eat")).toMatchObject({ kind: "latin", en: "eat" });
    expect(parseQuery("café")).toMatchObject({ kind: "latin", en: "cafe" });
    expect(parseQuery("ｔａｂｅｒｕ")).toMatchObject({ kind: "latin", roma: "taberu" });
  });
});

describe("search ranking", () => {
  it("finds a word by kanji, by its reading in either kana, and by romaji", () => {
    expect(top("食べる")).toBe("食べる");
    expect(top("たべる")).toBe("食べる");
    expect(top("タベル")).toBe("食べる");
    expect(top("taberu")).toBe("食べる");
  });

  it("matches romaji leniently", () => {
    for (const q of ["kyou", "kyō", "kyoo", "kyo"]) expect(written(search(ENTRIES, q, DEFAULT_FILTERS)), q).toContain("今日");
    expect(top("kyou")).toBe("今日");
    expect(top("sinbun")).toBe("新聞");
    expect(top("shinbunn")).toBe("新聞");
    expect(top("toukyou")).toBe("東京");
  });

  it("finds katakana words typed in hiragana, with long vowels spelled either way", () => {
    expect(top("こーひー")).toBe("コーヒー");
    expect(top("こうひい")).toBe("コーヒー");
    expect(top("せんせえ")).toBe("先生");
    expect(looseKana("こーひー")).toBe("こおひい");
    expect(looseKana("きょう")).toBe("きょお");
  });

  it("ranks an exact match before a prefix, and a prefix before a match inside", () => {
    const hits = written(search(ENTRIES, "本", DEFAULT_FILTERS));
    expect(hits[0]).toBe("本");
    expect(hits.indexOf("本屋")).toBeGreaterThan(0);
    expect(hits.indexOf("本屋")).toBeLessThan(hits.indexOf("日本"));
  });

  it("matches English whole glosses first, then word starts, never partial words under three letters", () => {
    expect(top("eat")).toBe("食べる");
    expect(top("to eat")).toBe("食べる");
    expect(top("coffee")).toBe("コーヒー");
    const hits = written(search(ENTRIES, "book", DEFAULT_FILTERS));
    expect(hits[0]).toBe("本");
    expect(hits).toContain("本屋");
    expect(hits).not.toContain("僕");
    expect(search(ENTRIES, "ea", DEFAULT_FILTERS).some((e) => /[a-z]ea/.test(e.keys.en) && !e.keys.roma.includes("ea"))).toBe(false);
  });

  it("ignores a leading to, a or the in English", () => {
    expect(top("to go")).toBe("行く");
    expect(top("a book")).toBe("本");
    expect(top("the weather")).toBe("天気");
  });

  it("matches English at the start of a word only", () => {
    const hits = written(search(ENTRIES, "eat", DEFAULT_FILTERS));
    expect(hits).not.toContain("肉");
    expect(hits).not.toContain("天気");
  });

  it("finds counters and affixes by their note", () => {
    expect(written(search(ENTRIES, "counts books", DEFAULT_FILTERS))).toContain("冊");
  });

  it("lists lesson words before expansion words when there's no query", () => {
    const hits = search(ENTRIES, "", { ...DEFAULT_FILTERS });
    expect(hits.findIndex((e) => e.source === "extra")).toBe(WORDS.length);
  });

  it("puts a lesson word before an expansion word on a tie, whatever the saved order", () => {
    const entries = buildEntries({
      words: [{ jp: "[川|かわ]", meaning: "river", pos: "noun", topic: "nature" }],
      extra: [{ jp: "[皮|かわ]", meaning: "skin", pos: "noun", topic: "body" }],
    });
    const mine = new Set(["[皮|かわ]#noun", "[川|かわ]#noun"]);
    expect(written(search(entries, "kawa", { ...DEFAULT_FILTERS, mine: true }, mine))).toEqual(["川", "皮"]);
    expect(written(search(entries, "", { ...DEFAULT_FILTERS, mine: true }, mine))).toEqual(["皮", "川"]);
  });

  it("returns nothing for a query that matches nothing", () => {
    expect(search(ENTRIES, "zzzq", DEFAULT_FILTERS)).toEqual([]);
  });
});

describe("filters", () => {
  it("filter by topic, source and starting kana row", () => {
    const food = search(ENTRIES, "", { ...DEFAULT_FILTERS, topic: "food" });
    expect(food.length).toBeGreaterThan(0);
    expect(food.every((e) => e.word.topic === "food")).toBe(true);
    const extra = search(ENTRIES, "", { ...DEFAULT_FILTERS, source: "extra" });
    expect(extra).toHaveLength(EXTRA_WORDS.length);
    const ka = search(ENTRIES, "", { ...DEFAULT_FILTERS, row: "か" });
    expect(written(ka)).toEqual(expect.arrayContaining(["コーヒー", "今日", "学校"]));
    expect(ka.every((e) => e.row === "か")).toBe(true);
  });

  it("combine with a query", () => {
    expect(search(ENTRIES, "taberu", { ...DEFAULT_FILTERS, topic: "people" })).toEqual([]);
  });

  it("show My words in the order they were saved", () => {
    const mine = new Set(["[新聞|しんぶん]#noun", "[食|た]べる#verb"]);
    expect(written(search(ENTRIES, "", { ...DEFAULT_FILTERS, mine: true }, mine))).toEqual(["新聞", "食べる"]);
  });

  it("put every entry in a kana row", () => {
    expect(ENTRIES.filter((e) => !e.row).map((e) => e.written)).toEqual([]);
  });

  it.each([
    ["ごはん", "か"],
    ["パン", "は"],
    ["ジュース", "さ"],
    ["を", "わ"],
    ["ゔぁ", "あ"],
    ["ん", null],
    ["3", null],
  ])("kanaRow(%s) is %s", (reading, row) => expect(kanaRow(reading)).toBe(row));
});

describe("glosses", () => {
  it("split a meaning and drop notes and a leading to", () => {
    expect(glossesOf("to eat")).toEqual(["eat"]);
    expect(glossesOf("teacher; doctor (also a title after a name)")).toEqual(["teacher", "doctor"]);
    expect(glossesOf("he; boyfriend")).toEqual(["he", "boyfriend"]);
    expect(glossesOf("that (over there) one")).toEqual(["that one"]);
    expect(glossesOf("shop (selling…): 本屋")).toEqual(["shop"]);
    expect(glossesOf("(counts books)")).toEqual(["counts books"]);
    expect(glossesOf("Café")).toEqual(["cafe"]);
  });

  it("give every entry at least one gloss", () => {
    expect(ENTRIES.filter((e) => e.keys.glosses.length === 0).map((e) => e.word.meaning)).toEqual([]);
  });

  it("read meanings with Japanese in them without the markup", () => {
    const e = buildEntries({ words: [{ jp: "[方|がた]", meaning: "plural, as in [先生方|せんせいがた]", pos: "suffix", topic: "people" } as Word], extra: [] })[0];
    expect(e.keys.en).toBe("plural, as in 先生方");
  });
});

describe("CSV", () => {
  it("escapes commas, quotes, line breaks and edge spaces", () => {
    expect(csvField("plain")).toBe("plain");
    expect(csvField("he, she")).toBe('"he, she"');
    expect(csvField('say "hi"')).toBe('"say ""hi"""');
    expect(csvField("one\ntwo")).toBe('"one\ntwo"');
    expect(csvField(" pad")).toBe('" pad"');
    expect(csvField("食べる")).toBe("食べる");
  });

  it("starts with a UTF-8 byte order mark, a header and CRLF rows", () => {
    const entries = search(ENTRIES, "", { ...DEFAULT_FILTERS, mine: true }, new Set(["[彼|かれ]#pronoun"]));
    const csv = toCsv(entries);
    expect(csv.charCodeAt(0)).toBe(0xfeff);
    expect(csv.slice(1).split("\r\n")).toEqual([
      "Japanese,Reading,Romaji,Meaning,Part of speech,Topic,Source",
      "彼,かれ,kare,he; boyfriend,pronoun,People,Lesson",
      "",
    ]);
    const quoted = buildEntries({ words: [{ jp: "[私|わたし]", meaning: "I, me", pos: "pronoun", topic: "people" }], extra: [] });
    expect(toCsv(quoted).split("\r\n")[1]).toBe('私,わたし,watashi,"I, me",pronoun,People,Lesson');
    expect(toCsv([]).slice(1)).toBe("Japanese,Reading,Romaji,Meaning,Part of speech,Topic,Source\r\n");
  });
});

describe("batch growth", () => {
  it("shows one batch, grows by a batch up to the total, then stops", () => {
    let s = INITIAL_GROWTH;
    expect(visibleCount(s, "q", 100)).toBe(BATCH);
    s = growthReducer(s, { type: "grow", key: "q", total: 100 });
    expect(visibleCount(s, "q", 100)).toBe(2 * BATCH);
    s = growthReducer(s, { type: "grow", key: "q", total: 100 });
    expect(visibleCount(s, "q", 100)).toBe(100);
    expect(growthReducer(s, { type: "grow", key: "q", total: 100 })).toBe(s);
  });

  it("starts a new search at one batch again", () => {
    let s = growthReducer(INITIAL_GROWTH, { type: "grow", key: "a", total: 500 });
    expect(visibleCount(s, "b", 500)).toBe(BATCH);
    s = growthReducer(s, { type: "grow", key: "b", total: 500 });
    expect(s).toEqual({ key: "b", limit: 2 * BATCH });
  });

  it("never shows more than the total", () => {
    expect(visibleCount(INITIAL_GROWTH, "", 3)).toBe(3);
    expect(growthReducer(INITIAL_GROWTH, { type: "grow", key: "x", total: 3 })).toEqual({ key: "x", limit: BATCH });
  });
});

describe("My words store", () => {
  it("keeps each readable id once", () => {
    expect(myWordsSchema.validate(["a#noun", 3, "", "a#noun", "b#verb"])).toEqual(["a#noun", "b#verb"]);
    expect(myWordsSchema.validate({ ids: [] })).toBeNull();
  });
});

describe("client code", () => {
  it("never imports the 常用 table", () => {
    for (const file of ["lib/dictionary.ts", "lib/load-dictionary.ts", "components/dictionary/DictionaryBrowser.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/from "@\/(lib\/joyo|content\/data\/joyo)/);
    }
  });
});
