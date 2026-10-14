import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { KANJI } from "@/content/kanji";
import { NAMES, WORDS } from "@/content/words";
import { EXTRA_WORDS } from "@/content/words/extra";
import { tableReadings } from "@/lib/joyo";
import { formLabel, kunLabel, lookupWord } from "@/lib/lookup";

const DATA = {
  words: WORDS,
  extra: EXTRA_WORDS,
  names: NAMES,
  kanji: KANJI.map((k) => {
    const row = tableReadings(k.char);
    if (!row) throw new Error(`${k.char} has no row in the 常用漢字表`);
    return { ...k, ...row };
  }),
};

describe("lookupWord", () => {
  it("finds an exact authored form using both writing and reading", () => {
    expect(lookupWord("[今日|きょう]", DATA)).toMatchObject({ kind: "word", word: { meaning: "today" } });
    expect(lookupWord("[今日|こんにち]", DATA)).toBeNull();
  });

  it("finds generated inflected forms and names the form", () => {
    expect(lookupWord("[食|た]べました", DATA)).toMatchObject({ word: { jp: "[食|た]べる" }, form: "politePast" });
    expect(formLabel("politePast")).toBe("polite past");
    expect(formLabel("tai+plainNeg")).toBe("たい form → plain negative");
  });

  it("does not perform a fuzzy match", () => {
    expect(lookupWord("[食|しょく]べる", DATA)).toBeNull();
    expect(lookupWord("[食|た]べさ", DATA)).toBeNull();
  });

  it("finds every kanji example word, including the extra words", () => {
    const missing = KANJI.flatMap((k) => k.examples).filter((jp) => lookupWord(jp, DATA)?.kind !== "word");
    expect(missing).toEqual([]);
  });

  it("prefers a lesson word, then an extra word over a bare name or number", () => {
    expect(lookupWord("[森|もり]", DATA)).toMatchObject({ kind: "word", word: { meaning: "forest" } });
    expect(lookupWord("[森|もり]-さん", DATA)).toMatchObject({ kind: "name" });
    expect(lookupWord("きた", DATA)).toMatchObject({ word: { jp: "[来|く]る" } });
  });

  it("carries the table's special readings for the card to mark", () => {
    expect(lookupWord("[何|なに]", DATA)?.kanji[0].special).toContain("なん");
  });

  it("ignores the line's punctuation", () => {
    expect(lookupWord("[食|た]べました。", DATA)).toMatchObject({ form: "politePast" });
  });

  it("tells a counter from the noun by its number", () => {
    expect(lookupWord("[本|ほん]", DATA)).toMatchObject({ word: { meaning: "book" } });
    expect(lookupWord("[三本|さんぼん]", DATA)).toMatchObject({ word: { pos: "counter" }, counter: true });
  });

  it("names words without an entry of their own", () => {
    expect(lookupWord("は", DATA)).toMatchObject({ kind: "function" });
    expect(lookupWord("[田中|たなか]-さん", DATA)).toMatchObject({ kind: "name" });
    expect(lookupWord("[三|さん]", DATA)).toMatchObject({ kind: "number" });
    expect(lookupWord("〜ます", DATA)).toMatchObject({ kind: "fragment" });
  });

  it("lists the word's kanji in order, once each, with their 常用 readings", () => {
    const hit = lookupWord("[日本語|にほんご]", DATA)!;
    expect(hit.kanji.map((k) => k.char)).toEqual(["日", "本", "語"]);
    expect(hit.kanji[0].on).toContain("ニチ");
  });

  it("prints kun readings with their okurigana in brackets", () => {
    expect(kunLabel("た.べる")).toBe("た(べる)");
    expect(kunLabel("ひと")).toBe("ひと");
  });
});

describe("client code", () => {
  it("never imports the 常用 table or the lessons", () => {
    // InspectorLine is a client component: it and what it imports must not pull in joyo.json (135 KB).
    for (const file of ["components/InspectorLine.tsx", "components/LangText.tsx", "lib/load-dictionary.ts", "lib/lookup.ts", "lib/words.ts", "lib/conjugate.ts", "lib/markup.ts"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/from "@\/(lib\/joyo|content\/data\/joyo|lib\/word-lessons|content\/units)/);
    }
  });
});
