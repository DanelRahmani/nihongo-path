import { describe, expect, it } from "vitest";
import type { Word } from "@/content/types";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { conjugateAdjective, conjugateVerb } from "@/lib/conjugate";
import { corpusFields } from "@/lib/corpus";
import { isJoyo, joyoReadingOk } from "@/lib/joyo";
import { parse, plainOf } from "@/lib/markup";
import { buildIndex, keyOf, lineWords, resolveWord } from "@/lib/words";

const IX = buildIndex(WORDS, NAMES);
const how = (jp: string) => resolveWord(jp, IX)?.how ?? null;

describe("resolveWord", () => {
  it("finds entries, also with a highlight inside or written in kana", () => {
    expect(how("[食|た]べる")).toBe("entry");
    expect(how("[日本|にほん][語|ご]")).toBe("entry");
    expect(how("ねこ")).toBe("entry");
    expect(how("カバン")).toBe("entry");
    // A keyboard's kanji for a word the lessons write in kana.
    expect(resolveWord("[良|よ]かった", IX)).toMatchObject({ how: "form", form: "plainPast" });
  });

  it("finds engine forms, including forms of forms", () => {
    expect(resolveWord("[食|た]べませんでした", IX)).toBeNull(); // two words in the lessons: ません でした
    expect(resolveWord("[食|た]べません", IX)).toMatchObject({ how: "form", form: "politeNeg" });
    expect(resolveWord("[食|た]べたくない", IX)).toMatchObject({ how: "form", form: "tai+plainNeg" });
    expect(resolveWord("[話|はな]せます", IX)).toMatchObject({ how: "form", form: "potential+polite" });
    expect(resolveWord("[食|た]べてる", IX)).toMatchObject({ how: "form", form: "te+る" });
    expect(resolveWord("[来|き]たがってる", IX)).toMatchObject({ how: "form", form: "tagaru+te+る" });
    expect(resolveWord("[高|たか]かった", IX)).toMatchObject({ how: "form", form: "plainPast" });
    expect(resolveWord("[高|たか]さ", IX)).toMatchObject({ how: "form", form: "sa" });
  });

  it("finds affixes, counters, names and function words", () => {
    expect(how("お[客|きゃく][様|さま]")).toBe("affix");
    expect(how("[会議|かいぎ][中|ちゅう]")).toBe("affix");
    expect(how("[三本|さんぼん]")).toBe("counter");
    expect(how("3[人|にん]")).toBe("counter");
    expect(how("[何名|なんめい][様|さま]")).toBe("counter");
    expect(how("[田中|たなか]-さん")).toBe("name");
    expect(how("でした")).toBe("function");
    expect(resolveWord("ティ", IX, { fragments: true })?.how).toBe("fragment");
    expect(how("ティ")).toBeNull();
  });

  it("finds nothing for a word the dictionary lacks", () => {
    expect(how("[宇宙|うちゅう]")).toBeNull();
    expect(how("[知|し]らない[人|ひと]")).toBeNull();
    // Loopholes the D1 review found.
    expect(how("[三|さん]")).toBe("number"); // not the suffix さん
    expect(how("[居|い]る")).toBeNull(); // not いる in a kanji the lessons don't use
    expect(how("[三本|さんさつ]")).toBeNull(); // the counter's reading must end the word
    expect(how("[田中|たなか]-[犬|いぬ]")).toBeNull(); // a name takes a suffix or title
    expect(how("お[行|い]く")).toBeNull(); // お on a verb's dictionary form
    expect(how("[食|た]べ[屋|や]")).toBeNull(); // a suffix on a verb stem
    expect(how("うさん")).toBeNull(); // a fragment + さん
  });

  it("names the meaning of every kana word the lessons share between entries", () => {
    expect(resolveWord("きた", IX)).toMatchObject({ how: "form", word: { jp: "[来|く]る" } });
    expect(resolveWord("よく", IX)).toMatchObject({ how: "entry", word: { pos: "adverb" } });
  });
});

describe("the lesson dictionary (content/words)", () => {
  it("covers every word in the lessons", () => {
    const missing = new Set<string>();
    for (const f of corpusFields()) {
      if (!f.jp || f.label || f.quoted) continue;
      // Sounds and endings on their own only in kana charts, conjugation tables and quiz answers.
      const fragments = /^(hiragana|katakana|verbs)\//.test(f.lesson) || f.where.includes("(table)") || f.where.includes(" answer ");
      for (const word of lineWords(f.text)) if (!resolveWord(word, IX, { fragments })) missing.add(`${word} (${f.lesson} ${f.where})`);
    }
    expect([...missing]).toEqual([]);
  });

  it("covers the kanji words in English prose too (each is part of a dictionary word)", () => {
    const WITH_EXTRA = buildIndex([...WORDS, ...EXTRA_WORDS], NAMES);
    const written = [...WORDS, ...EXTRA_WORDS].map((w) => plainOf(w.jp, false)).concat(NAMES.map((n) => plainOf(n, false)));
    const missing = new Set<string>();
    for (const f of corpusFields()) {
      if (f.jp || f.label) continue;
      for (const t of parse(f.text, false)) {
        if (t.kind === "ruby" && !resolveWord(`[${t.base}|${t.reading}]`, WITH_EXTRA) && !written.some((w) => w.includes(t.base))) {
          missing.add(`${t.base} (${f.lesson})`);
        }
      }
    }
    expect([...missing]).toEqual([]);
  });

  it("has each word once", () => {
    const keys = WORDS.map((w) => `${keyOf(w.jp)} ${w.pos}`);
    expect(keys.filter((k, i) => keys.indexOf(k) !== i)).toEqual([]);
  });

  it("writes every word with 常用 kanji and readings (content/STYLE.md §5)", () => {
    // Suffixes and counters always follow a word, so their first kana may be voiced ([方|がた]).
    const entries = [...WORDS.map((w) => ({ jp: w.jp, joined: w.pos === "suffix" || w.pos === "counter" })), ...NAMES.map((jp) => ({ jp, joined: false }))];
    const bad = entries.flatMap(({ jp, joined }) =>
      parse(jp, true).flatMap((t) =>
        t.kind === "ruby" && (![...t.base].every((c) => isJoyo(c)) || !joyoReadingOk(t.base, t.reading, joined)) ? [`${t.base}|${t.reading}`] : [],
      ),
    );
    expect(bad).toEqual([]);
  });

  it("gives every verb a class the engine accepts, and only verbs", () => {
    const bad = WORDS.flatMap((w: Word) => {
      if ((w.pos === "verb") !== Boolean(w.verb)) return [`${w.jp}: class on a ${w.pos}`];
      if (w.verb && !conjugateVerb(w.jp, w.verb, "polite").ok) return [`${w.jp}: no polite form`];
      if (w.pos === "i-adj" && !conjugateAdjective(w.jp, "i", "plainNeg").ok) return [`${w.jp}: no negative`];
      return [];
    });
    expect(bad).toEqual([]);
  });

  it("gives every word a short meaning", () => {
    expect(WORDS.filter((w) => !w.meaning.trim() || w.meaning.length > 90).map((w) => w.jp)).toEqual([]);
  });
});
