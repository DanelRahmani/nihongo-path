import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { Jp } from "@/components/Jp";
import { applyAttributes, applyThemeColor, DEFAULT_ATTRIBUTES, furiganaCss, HEAD_SCRIPT, settingsToAttributes, THEME_COLOR_ID, THEME_COLORS, themeColorFor } from "@/lib/display";
import { decode } from "@/lib/envelope";
import { DEFAULT_SETTINGS, settingsSchema } from "@/lib/schemas";

/** Runs the real head script against a stub localStorage and <html>, and returns the attributes it set. */
function runHeadScript(getItem: () => string | null): Record<string, string> {
  const attrs: Record<string, string> = {};
  const documentElement = { setAttribute: (k: string, v: string) => void (attrs[k] = v) };
  new Function("localStorage", "document", HEAD_SCRIPT)({ getItem }, { documentElement });
  return attrs;
}

const envelope = (v: number, data: unknown) => JSON.stringify({ v, data });

const CASES: [string, string | null][] = [
  ["nothing stored", null],
  ["corrupt JSON", "{oops"],
  ["JSON null", "null"],
  ["a bare string", '"furigana"'],
  ["an array", "[1,2]"],
  ["legacy v0 furigana + romaji", JSON.stringify({ script: "furigana", romaji: true })],
  ["legacy v0 kanji", JSON.stringify({ script: "kanji", romaji: false })],
  ["v1 kana", envelope(1, { script: "kana", romaji: true })],
  ["v1 unknown script", envelope(1, { script: "hieroglyphs", romaji: "yes" })],
  ["v1 prototype key", envelope(1, { script: "constructor", romaji: true })],
  ["v2 everything set", envelope(2, { furigana: "none", romaji: true, size: "l", font: "gothic", theme: "dark" })],
  ["v2 partly invalid", envelope(2, { furigana: "all", romaji: 1, size: "xl", font: "comic", theme: "light" })],
  ["v2 new-kanji mode", envelope(2, { furigana: "new", romaji: false, size: "s", font: "mincho", theme: "system" })],
  ["v2 data not an object", envelope(2, "kana")],
  ["a newer build's data", envelope(9, { furigana: "none", romaji: true })],
  ["an envelope with an extra key", JSON.stringify({ v: 2, data: { furigana: "none" }, x: 1 })],
  ["version 0 as an envelope", envelope(0, { furigana: "none" })],
];

describe("HEAD_SCRIPT", () => {
  it.each(CASES)("agrees with decode(settingsSchema) for %s", (_, raw) => {
    expect(runHeadScript(() => raw)).toEqual(settingsToAttributes(decode(raw, settingsSchema).value));
  });

  it("falls back to the defaults when localStorage throws", () => {
    expect(
      runHeadScript(() => {
        throw new Error("blocked");
      }),
    ).toEqual(DEFAULT_ATTRIBUTES);
  });
});

describe("display attributes", () => {
  it("maps settings to <html> attributes", () => {
    expect(settingsToAttributes({ furigana: "all", romaji: true, size: "l", font: "gothic", theme: "dark" })).toEqual({
      "data-furigana": "all",
      "data-romaji": "on",
      "data-size": "l",
      "data-font": "gothic",
      "data-theme": "dark",
    });
  });

  it("server-renders the defaults", () => {
    expect(DEFAULT_ATTRIBUTES).toEqual(settingsToAttributes(DEFAULT_SETTINGS));
    expect(DEFAULT_ATTRIBUTES["data-furigana"]).toBe("kana");
  });

  it("applies every attribute", () => {
    const set: string[] = [];
    applyAttributes({ setAttribute: (k, v) => void set.push(`${k}=${v}`) }, DEFAULT_SETTINGS);
    expect(set).toEqual(Object.entries(DEFAULT_ATTRIBUTES).map(([k, v]) => `${k}=${v}`));
  });
});

describe("furiganaCss", () => {
  it("writes one rule per kanji on the page that isn't learned yet", () => {
    expect(furiganaCss(["学", "生", "学", "日"], new Set(["生"]))).toBe(
      '[data-furigana=new] .w[data-k*="学"] rt{display:revert}\n[data-furigana=new] .w[data-k*="日"] rt{display:revert}',
    );
  });

  it("writes nothing once every kanji is learned", () => {
    expect(furiganaCss(["学"], new Set(["学"]))).toBe("");
  });
});

describe("Jp renders every display variant", () => {
  const html = renderToStaticMarkup(createElement(Jp, { jp: "[学生|がくせい] {です}。" }));

  it("has the ruby with its reading, and the reading alone for kana-only mode", () => {
    expect(html).toContain('<span class="w" data-k="学生"><ruby>学生<rp>(</rp><rt>がくせい</rt><rp>)</rp></ruby><span class="yomi">がくせい</span></span>');
  });

  it("has the word space for kana-only mode", () => {
    expect(html).toContain('<span class="ws"> </span>');
  });

  it("has the romaji line, shown only when romaji is on", () => {
    expect(html).toContain(">gakusei desu.</span>");
    expect(html).toMatch(/<span class="romaji[^"]*">gakusei desu\.<\/span>/);
  });

  it("leaves the romaji line out where the caller asks", () => {
    expect(renderToStaticMarkup(createElement(Jp, { jp: "[学生|がくせい]", romaji: false }))).not.toContain("romaji");
  });
});

describe("the theme colour", () => {
  /** A stub document with a <head> that records its children, enough for the head script and applyThemeColor. */
  function stubDocument() {
    const children: { id: string; attrs: Record<string, string> }[] = [];
    const make = () => {
      const el = {
        id: "",
        attrs: {} as Record<string, string>,
        setAttribute: (k: string, v: string) => void (el.attrs[k] = v),
        remove: () => void children.splice(children.indexOf(el), 1),
      };
      return el;
    };
    type El = ReturnType<typeof make>;
    const head = {
      get firstChild() {
        return children[0] ?? null;
      },
      insertBefore: (el: El) => void children.unshift(el),
      prepend: (el: El) => {
        if (children.includes(el)) children.splice(children.indexOf(el), 1);
        children.unshift(el);
      },
    };
    const doc = { head, documentElement: { setAttribute() {} }, createElement: make, getElementById: (id: string) => children.find((c) => c.id === id) ?? null };
    return { doc, children };
  }

  it("is left to the system with the system theme, and follows the chosen theme otherwise", () => {
    expect(themeColorFor("system")).toBeNull();
    expect([themeColorFor("light"), themeColorFor("dark")]).toEqual([THEME_COLORS.light, THEME_COLORS.dark]);
  });

  it("is set the same way by the head script and by applyThemeColor, which also takes it back off", () => {
    for (const theme of ["system", "light", "dark"] as const) {
      const script = stubDocument();
      const stored = JSON.stringify({ v: 2, data: { ...DEFAULT_SETTINGS, theme } });
      new Function("localStorage", "document", HEAD_SCRIPT)({ getItem: () => stored }, script.doc);
      const app = stubDocument();
      applyThemeColor(app.doc as unknown as Document, theme);
      applyThemeColor(app.doc as unknown as Document, theme);
      const tags = (c: typeof app.children) => c.map((e) => `${e.id} ${e.attrs.name} ${e.attrs.content}`);
      expect(tags(script.children), theme).toEqual(tags(app.children));
      expect(tags(app.children), theme).toEqual(theme === "system" ? [] : [`${THEME_COLOR_ID} theme-color ${THEME_COLORS[theme]}`]);
      applyThemeColor(app.doc as unknown as Document, "system");
      expect(app.children).toEqual([]);
    }
  });
});
