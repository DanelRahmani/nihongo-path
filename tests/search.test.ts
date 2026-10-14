import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { GRAMMAR_TOPICS } from "@/content/grammar";
import { KANJI } from "@/content/kanji";
import { ALL_LESSONS } from "@/content/units";
import { parseQuery } from "@/lib/dictionary";
import { buildSearchIndex, KIND_ORDER, type SearchItem, scoreItem, searchIndex, SITE_PAGES } from "@/lib/search";
import { isSearchShortcut, isTypingTarget, type ShortcutEvent } from "@/lib/search-shortcut";
import { indexSources } from "@/lib/search-sources";

const INDEX = buildSearchIndex(indexSources());
const find = (query: string, limit = 20) => searchIndex(INDEX, query, limit);
const first = (query: string) => find(query)[0];
const tag = (item: SearchItem | undefined) => (item ? `${item.kind}:${item.label}` : undefined);
const tags = (query: string, limit = 20) => find(query, limit).map(tag);
const scoreOf = (item: SearchItem, query: string) => scoreItem(item, parseQuery(query));

describe("the index", () => {
  it("holds every page, lesson, grammar topic and kanji, then the words, in that order", () => {
    const count = (kind: SearchItem["kind"]) => INDEX.filter((i) => i.kind === kind).length;
    expect(count("page")).toBe(SITE_PAGES.length);
    expect(count("lesson")).toBe(ALL_LESSONS.length);
    expect(count("grammar")).toBe(GRAMMAR_TOPICS.length);
    expect(count("kanji")).toBe(KANJI.length);
    expect(count("word")).toBeGreaterThan(600);
    const kinds = INDEX.map((i) => KIND_ORDER.indexOf(i.kind));
    expect(kinds).toEqual([...kinds].sort((a, b) => a - b));
  });

  it("links each result to a page the app builds", () => {
    const lessons = new Set(ALL_LESSONS.map((l) => l.href));
    const topics = new Set(GRAMMAR_TOPICS.map((t) => t.slug));
    for (const item of INDEX) {
      if (item.kind === "lesson") expect(lessons.has(item.href), item.href).toBe(true);
      if (item.kind === "grammar") expect(topics.has(item.href.replace("/grammar#", "")), item.href).toBe(true);
      if (item.kind === "kanji") expect(item.href).toBe(`/kanji/${item.label}`);
      if (item.kind === "word") expect(decodeURIComponent(item.href)).toBe(`/dictionary?q=${item.label}`);
    }
  });

  it("shows text without markup", () => {
    for (const item of INDEX) expect(item.label + item.detail, item.href).not.toMatch(/[[\]|{}]/);
  });

  it("has Japanese keys in hiragana with no word spaces, and romaji normalised", () => {
    for (const item of INDEX) {
      for (const key of item.jp) expect(key, item.href).not.toMatch(/[ァ-ヶ\s・〜]/);
      for (const key of item.roma) expect(key, item.href).toMatch(/^[a-z]+$/);
    }
  });

  it("splits a two-part lesson mark, and reads a kana lesson's mark as kana, not as a particle", () => {
    const waGa = INDEX.find((i) => i.href === "/learn/particles/wa-vs-ga")!;
    expect(waGa.jp).toEqual(expect.arrayContaining(["は", "が"]));
    expect(waGa.roma).toEqual(expect.arrayContaining(["wa", "ga"]));
    const hiragana2 = INDEX.find((i) => i.kind === "lesson" && i.label.startsWith("Hiragana 2"))!;
    expect(hiragana2.roma).toContain("ha");
    expect(hiragana2.roma).not.toContain("wa");
  });

  it("reads a kanji's readings as letters, never as particles, without the bare kun stems", () => {
    const sei = INDEX.find((i) => i.kind === "kanji" && i.label === "生")!;
    expect(sei.jp).toEqual(expect.arrayContaining(["生", "せい", "いきる", "はえる"]));
    expect(sei.jp).not.toContain("い");
    expect(sei.roma).toContain("haeru");
    expect(sei.roma).not.toContain("wa");
    expect(tags("i")).not.toContain("kanji:生");
  });

  it("splits Japanese at its punctuation, and reads a stacked particle as two words", () => {
    const kosoado = INDEX.find((i) => i.href === "/learn/grammar/kosoado")!;
    expect(kosoado.jp).not.toContain("これそれあれどれ");
    expect(tags("e no")).toContain("grammar:Place へ Verb · A への B");
  });
});

describe("ranking", () => {
  it("finds kanji by the character, then the words that start with it", () => {
    expect(tag(first("食"))).toBe("kanji:食");
    expect(tags("食")).toEqual(expect.arrayContaining(["word:食べる", "word:食堂"]));
  });

  it("finds kana in hiragana or katakana, long vowels in either spelling", () => {
    expect(tags("たべる")).toEqual(expect.arrayContaining(["kanji:食", "word:食べる"]));
    expect(tag(first("コーヒー"))).toBe("word:コーヒー");
    expect(tag(first("こーひー"))).toBe("word:コーヒー");
    expect(tag(first("こうひい"))).toBe("word:コーヒー");
  });

  it("matches lenient romaji: Kunrei, macrons and shortened long vowels", () => {
    // The word typed in full beats the kanji that is read that way.
    expect(tags("taberu").slice(0, 2)).toEqual(["word:食べる", "kanji:食"]);
    expect(tags("tabe")).toContain("word:食べ物");
    expect(tag(first("zisyo"))).toBe("page:Dictionary");
    expect(tags("toukyou")).toContain("word:東京");
    expect(tags("tōkyō")).toContain("word:東京");
    expect(tags("tokyo")).toContain("word:東京");
  });

  it("reads particles as particles: wa finds the は lessons, e the へ lesson", () => {
    expect(tag(first("wa"))).toBe("lesson:は marks the topic: “as for…”");
    expect(first("e")?.href).toBe("/learn/particles/e-vs-ni");
    expect(first("te")?.href).toBe("/learn/verbs/te-form");
  });

  it("matches English at word starts only: eat finds 食, not meat or weather", () => {
    expect(tag(first("eat"))).toBe("kanji:食");
    expect(tags("eat")).toContain("word:食べる");
    for (const item of find("eat", 50)) expect(item.en).toMatch(/(^|[^a-z])eat/);
    expect(tag(first("to eat"))).toBe("kanji:食");
  });

  it("finds a lesson by its title with the Japanese in romaji: te form", () => {
    expect(first("te form")?.href).toBe("/learn/verbs/te-form");
    expect(tags("you", 5)).toContain("word:あなた");
  });

  it("lists lesson words before expansion words of equal score", () => {
    const words = find("you", 40).filter((i) => i.kind === "word");
    const firstExtra = words.findIndex((i) => i.extra);
    expect(firstExtra).toBeGreaterThan(0);
    expect(words.slice(firstExtra).some((i) => !i.extra && scoreOf(i, "you") === scoreOf(words[firstExtra], "you"))).toBe(false);
  });

  it("lists equal scores by kind: pages, lessons, grammar, kanji, then words", () => {
    expect(tags("dictionary")).toEqual(["page:Dictionary", "word:辞書"]);
    const hits = find("ni", 50);
    const scores = hits.map((h) => KIND_ORDER.indexOf(h.kind));
    // ni is exact for the に lessons, the に topics, 二 and に: within that tier, the kinds come in order.
    const exact = hits.filter((h) => h.roma.includes("ni")).map((h) => KIND_ORDER.indexOf(h.kind));
    expect(exact).toEqual([...exact].sort((a, b) => a - b));
    expect(scores.length).toBeGreaterThan(5);
  });

  it("finds nothing for an empty query, and caps the list", () => {
    expect(find("")).toEqual([]);
    expect(find("   ")).toEqual([]);
    expect(find("a", 5)).toHaveLength(5);
  });
});

describe("the shortcut", () => {
  const key = (k: string, extra: Partial<ShortcutEvent> = {}): ShortcutEvent => ({
    key: k,
    ctrlKey: false,
    metaKey: false,
    altKey: false,
    shiftKey: false,
    target: { tagName: "BODY" },
    ...extra,
  });

  it("opens on / and on Ctrl/⌘K", () => {
    expect(isSearchShortcut(key("/"))).toBe(true);
    expect(isSearchShortcut(key("k", { ctrlKey: true }))).toBe(true);
    expect(isSearchShortcut(key("k", { metaKey: true }))).toBe(true);
    // Caps Lock gives a capital K without Shift.
    expect(isSearchShortcut(key("K", { ctrlKey: true }))).toBe(true);
    // Ctrl+Shift+K is Firefox's web console.
    expect(isSearchShortcut(key("K", { ctrlKey: true, shiftKey: true }))).toBe(false);
    expect(isSearchShortcut(key("k"))).toBe(false);
    expect(isSearchShortcut(key("/", { ctrlKey: true }))).toBe(false);
  });

  it("ignores keys typed into text inputs, textareas, selects and contenteditable", () => {
    for (const target of [
      { tagName: "INPUT", type: "text" },
      { tagName: "INPUT", type: "search" },
      { tagName: "input" },
      { tagName: "TEXTAREA" },
      { tagName: "SELECT" },
      { tagName: "DIV", isContentEditable: true },
    ]) {
      expect(isTypingTarget(target), JSON.stringify(target)).toBe(true);
      expect(isSearchShortcut(key("/", { target }))).toBe(false);
      expect(isSearchShortcut(key("k", { target, ctrlKey: true }))).toBe(false);
    }
  });

  it("still opens from checkboxes, radio buttons, buttons and links", () => {
    for (const target of [{ tagName: "INPUT", type: "checkbox" }, { tagName: "INPUT", type: "radio" }, { tagName: "BUTTON" }, { tagName: "A" }, null]) {
      expect(isSearchShortcut(key("/", { target })), JSON.stringify(target)).toBe(true);
    }
  });

  it("ignores keys while an IME is composing or Alt is held", () => {
    expect(isSearchShortcut(key("/", { isComposing: true }))).toBe(false);
    expect(isSearchShortcut(key("k", { ctrlKey: true, isComposing: true }))).toBe(false);
    expect(isSearchShortcut(key("/", { altKey: true }))).toBe(false);
    expect(isSearchShortcut(key("k", { ctrlKey: true, altKey: true }))).toBe(false);
  });
});

describe("client code", () => {
  const CLIENT = ["lib/search.ts", "lib/search-shortcut.ts", "lib/dictionary.ts", "lib/romaji.ts", "lib/romaji-input.ts", "components/search/SearchLauncher.tsx", "components/search/SearchDialog.tsx"];

  it("never imports the 常用 table, the index sources or lesson content", () => {
    for (const file of CLIENT) {
      const src = readFileSync(file, "utf8");
      expect(src, file).not.toMatch(/from "@\/(lib\/joyo|content\/data\/joyo|lib\/search-sources)"/);
      // The kana table is small, and the romaji needs it; lessons, words and kanji stay in the JSON index.
      expect(src, file).not.toMatch(/^import (?!type )[^;]*?from "@\/content\/(?!kana")/m);
    }
  });

  it("keeps the header's launcher light: it imports the shortcut, not the search code", () => {
    const src = readFileSync("components/search/SearchLauncher.tsx", "utf8");
    expect(src).not.toMatch(/from "@\/lib\/(search|dictionary)"/);
    expect(readFileSync("lib/search-shortcut.ts", "utf8")).not.toMatch(/^import /m);
  });
});
