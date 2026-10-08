import { describe, expect, it } from "vitest";
import type { Block } from "@/content/types";
import { ALL_LESSONS } from "@/content/units";
import { conjugateAdjective, conjugateVerb, type AdjectiveClass, type AdjectiveForm, type VerbClass, type VerbForm } from "@/lib/conjugate";

/*
 * Every conjugation in the Verbs and Core grammar tables, checked against lib/conjugate.ts. A table is
 * found by its lesson and a header it has, so blocks can move; a table that disappears fails the test.
 */

/** The class of each verb the tables use (the dictionary in D1 will hold these). */
const CLASS: Record<string, VerbClass> = {
  "[食|た]べる": "ichidan",
  "[見|み]る": "ichidan",
  "[起|お]きる": "ichidan",
  "[寝|ね]る": "ichidan",
  "[飲|の]む": "godan",
  "[書|か]く": "godan",
  "[話|はな]す": "godan",
  "[待|ま]つ": "godan",
  "[買|か]う": "godan",
  "[帰|かえ]る": "godan",
  "[遊|あそ]ぶ": "godan",
  "[死|し]ぬ": "godan",
  "[泳|およ]ぐ": "godan",
  "[行|い]く": "godan",
  ある: "godan",
  する: "suru",
  "[来|く]る": "kuru",
};

function table(lesson: string, header: string): Extract<Block, { type: "table" }> {
  const l = ALL_LESSONS.find((x) => x.key === lesson);
  const t = l?.lesson.blocks.find((b): b is Extract<Block, { type: "table" }> => b.type === "table" && b.headers.includes(header));
  if (!t) throw new Error(`No table with header “${header}” in ${lesson}`);
  return t;
}

function verb(dict: string, form: VerbForm): string {
  const cls = CLASS[dict];
  if (!cls) throw new Error(`Add ${dict} to CLASS`);
  return verbAs(dict, cls, form);
}

function verbAs(dict: string, cls: VerbClass, form: VerbForm): string {
  const r = conjugateVerb(dict, cls, form);
  if (!r.ok) throw new Error(`${dict} has no ${form}: ${r.reason}`);
  return r.jp;
}

function adjective(dict: string, cls: AdjectiveClass, form: AdjectiveForm): string {
  const r = conjugateAdjective(dict, cls, form);
  if (!r.ok) throw new Error(`${dict} has no ${form}`);
  return r.jp;
}

/** Arrow cells in prose: "[買|か]う → [買|か]って, [待|ま]つ → [待|ま]って". Word spaces don't count there. */
function arrows(cell: string): [string, string][] {
  return cell.split(", ").map((pair) => pair.split(" → ") as [string, string]);
}
const unspaced = (s: string) => s.replace(/ /g, "");

/** Row labels of the four-tense tables, in the forms they stand for. */
const TENSES: Record<string, [AdjectiveForm, AdjectiveForm]> = {
  is: ["plain", "polite"],
  "isn't": ["plainNeg", "politeNeg"],
  was: ["plainPast", "politePast"],
  "wasn't": ["plainPastNeg", "politePastNeg"],
};

describe("conjugation tables match the engine", () => {
  it.each([
    ["grammar/desu-da", "[学生|がくせい]", "noun"],
    ["grammar/i-adjectives", "[高|たか]い", "i"],
    ["grammar/na-adjectives", "[静|しず]か", "na"],
  ] as const)("%s", (lesson, dict, cls) => {
    const t = table(lesson, "Casual");
    const casual = t.headers.indexOf("Casual");
    const polite = t.headers.indexOf("Polite");
    expect(t.rows.length).toBe(4);
    for (const row of t.rows) {
      const [plainForm, politeForm] = TENSES[row[0]];
      expect(row[casual], `${row[0]} casual`).toBe(adjective(dict, cls, plainForm));
      expect(row[polite], `${row[0]} polite`).toBe(adjective(dict, cls, politeForm));
    }
  });

  it("grammar/aru-iru: ある and いる", () => {
    const t = table("grammar/aru-iru", "ある");
    const FORMS: Record<string, VerbForm> = { polite: "polite", negative: "plainNeg", "polite negative": "politeNeg", past: "plainPast" };
    for (const row of t.rows) {
      expect(row[1], `ある ${row[0]}`).toBe(verbAs("ある", "godan", FORMS[row[0]]));
      expect(row[2], `いる ${row[0]}`).toBe(verbAs("いる", "ichidan", FORMS[row[0]]));
    }
  });

  it("verbs/verb-groups: each example is in its group", () => {
    const t = table("verbs/verb-groups", "Examples");
    const GROUP: Record<string, VerbClass[]> = { "る-verbs (ichidan)": ["ichidan"], "う-verbs (godan)": ["godan"], irregular: ["suru", "kuru"] };
    for (const row of t.rows) {
      for (const ex of row[2].split(", ")) {
        const dict = ex.split(" (")[0];
        expect(GROUP[row[0]], `${dict} in ${row[0]}`).toContain(CLASS[dict]);
      }
    }
  });

  it("verbs/masu-form: stems and ます forms", () => {
    const t = table("verbs/masu-form", "Stem");
    for (const [, dict, stem, masu] of t.rows) {
      expect(stem, dict).toBe(verb(dict, "stem"));
      expect(masu, dict).toBe(verb(dict, "polite"));
    }
  });

  it("verbs/masu-form: the four polite endings of [飲|の]む", () => {
    const t = table("verbs/masu-form", "Ending");
    const FORMS: VerbForm[] = ["polite", "politeNeg", "politePast", "politePastNeg"];
    t.rows.forEach((row, i) => expect(unspaced(row[2].split(/: | — /)[0]), row[0]).toBe(unspaced(verb("[飲|の]む", FORMS[i]))));
  });

  it("verbs/nai-form: dictionary → ない", () => {
    const t = table("verbs/nai-form", "Dictionary → ない");
    for (const row of t.rows) {
      for (const [dict, nai] of arrows(row[2])) expect(nai, dict).toBe(unspaced(verb(dict, "plainNeg")));
    }
  });

  it("verbs/te-form: dictionary → て", () => {
    const t = table("verbs/te-form", "Examples");
    for (const row of t.rows) {
      for (const [dict, te] of arrows(row[2])) expect(te, dict).toBe(unspaced(verb(dict, "te")));
    }
  });

  it("verbs/ta-form: dictionary → た", () => {
    for (const [dict, ta] of table("verbs/ta-form", "た form").rows) expect(ta, dict).toBe(verb(dict, "plainPast"));
  });

  it("verbs/tai-form: [食|た]べたい and its forms", () => {
    const tai = verb("[食|た]べる", "tai");
    const FORMS: Record<string, AdjectiveForm> = {
      "want to eat": "plain",
      "don't want to eat": "plainNeg",
      "wanted to eat": "plainPast",
      polite: "polite",
    };
    for (const [label, cell] of table("verbs/tai-form", "Form").rows) expect(cell, label).toBe(adjective(tai, "i", FORMS[label]));
  });

  it("verbs/volitional: polite and casual “let's”", () => {
    for (const [dict, polite, casual] of table("verbs/volitional", "Polite: let's").rows) {
      expect(polite, dict).toBe(verb(dict, "politeVolitional"));
      expect(casual, dict).toBe(verb(dict, "volitional"));
    }
  });

  it("verbs/potential: can do", () => {
    for (const [dict, can] of table("verbs/potential", "Can do").rows) expect(can, dict).toBe(verb(dict, "potential"));
  });
});
