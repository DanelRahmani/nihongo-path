import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { UNITS } from "@/content/units";
import { type Band, lessonsBefore, PER_BAND, placement } from "@/lib/placement";
import { kanaLessons, PICKS, placementBands, questionLessonTitles } from "@/lib/placement-bands";

const BANDS = placementBands();

describe("the bands", () => {
  it("are the units after the kana, in path order, two lesson-quiz questions each, typed in Japanese", () => {
    expect(BANDS.map((b) => b.unit)).toEqual(UNITS.map((u) => u.slug).filter((s) => s !== "hiragana" && s !== "katakana"));
    expect(BANDS).toHaveLength(15);
    for (const b of BANDS) {
      expect(b.questions, b.unit).toHaveLength(PER_BAND);
      expect(new Set(b.questions.map((q) => q.prompt)).size, b.unit).toBe(PER_BAND);
      for (const q of b.questions) {
        expect(q.answerIn, q.prompt).toBeUndefined();
        expect(b.lessons, q.prompt).toContain(q.lesson);
      }
    }
  });

  it("are the hand-picked questions, pinned", () => {
    expect(Object.keys(PICKS)).toEqual(BANDS.map((b) => b.unit));
    expect(BANDS.flatMap((b) => b.questions.map((q) => `${q.lesson}: ${q.prompt}`))).toMatchInlineSnapshot(`
      [
        "start/polite-and-casual: Make it casual: [本|ほん]を[読|よ]みます。 → [本|ほん]を＿＿",
        "start/polite-and-casual: Make it casual: [学生|がくせい]です。",
        "word-order/topic-comment: Type the two missing particles in order: [私|わたし]＿[目|め]＿[悪|わる]い。 (My eyesight is bad.)",
        "word-order/modifiers-first: Say “the book I read yesterday” with [昨日|きのう], [読|よ]んだ and [本|ほん].",
        "particles/wa-vs-ga: Fill in the particle: [誰|だれ]＿[来|き]ましたか？ (Who came?)",
        "particles/ni-vs-de: “I work at a bank”: [銀行|ぎんこう]＿[働|はたら]いています。",
        "grammar/na-adjectives: Before a noun: “a quiet room” ([静|しず]か, [部屋|へや])",
        "grammar/kosoado: Pointing at a tower far from both of you: “What's that?” ＿は[何|なん]ですか？",
        "verbs/te-form: て form: [読|よ]む → ＿",
        "verbs/nai-form: Casual negative: [会|あ]う → ＿",
        "suffixes/name-suffixes: To your friend's little daughter, Hana: はな＿、いくつ？ (how old are you?)",
        "suffixes/titles: Thanking your doctor, Dr Kato: [加藤|かとう]＿、ありがとうございました。",
        "culture/uchi-soto: Telling a colleague about your own older brother: ＿は[会社員|かいしゃいん]です。",
        "culture/soft-refusals: A colleague asks for help on Saturday. Say no softly: [土曜日|どようび]は＿…",
        "n5-essentials/temo-ii: Polite, with いい: “May I open the window?” (use [開|あ]ける): [窓|まど]を＿か？",
        "n5-essentials/temo-ii: Polite rule: “You mustn't drink alcohol” (use [飲|の]む): お[酒|さけ]を＿。",
        "n4-conditions/conditionals-compared: Pick the “if”, polite request: “When you've finished, please tell me” (use [終|お]わる): ＿、[教|おし]えてください。",
        "n4-conditions/noni: With のに: “Even though it's summer, it's cold” (use [夏|なつ]): ＿、[寒|さむ]いです。",
        "n4-plans/you-ni-suru-naru: Casual, with ようになる: “My little brother can read hiragana now” (use [読|よ]む): [弟|おとうと]はひらがなが＿。",
        "n4-plans/te-shimau: Polite, with てしまう: “I've lost the ticket” (use なくす): [切符|きっぷ]を＿。",
        "n4-giving-voice/ageru-kureru-morau: Casual: “My grandmother gave me some money”: [祖母|そぼ]がお[金|かね]を＿。",
        "n4-giving-voice/passive: Casual passive: “I got woken up by my little brother” (use [起|お]こす): [弟|おとうと]に＿。",
        "n4-seeming/sou-hearsay: Fix it (you heard it): [山田|やまだ]さんは[先生|せんせい]そうです。",
        "n4-seeming/to-omou: Casual, with と[思|おも]う: “I think he's Japanese”: [彼|かれ]は[日本人|にほんじん]＿。",
        "n3-reasons/you-ni-iu: Casual, with ように and the passive of [言|い]う: “My dad told me not to come home late” (use [帰|かえ]る): [父|ちち]に[夜|よる][遅|おそ]く＿。",
        "n3-reasons/wake-da: Polite, with わけ (use [得意|とくい]): “She practises every day? No wonder she's good at it”: [毎日|まいにち][練習|れんしゅう]しているんですか？＿ですね。",
        "n3-time/uchi-ni: With ないうちに (use [始|はじ]まる): “Let's buy drinks before the film starts”: [映画|えいが]が＿、[飲|の]み[物|もの]を[買|か]いましょう。",
        "n3-time/ippou-da: Polite, with [一方|いっぽう] (use [増|ふ]える): “The number of foreigners working in Japan just keeps growing”: [日本|にほん]で[働|はたら]く[外国人|がいこくじん]は＿。",
        "n3-relations/ni-taishite: Whereas, with に[対|たい]して (use [多|おお]い): “The north gets a lot of snow, whereas the south gets hardly any”: [北|きた]は[雪|ゆき]が＿、[南|みなみ]はほとんど[降|ふ]らない。",
        "n3-relations/n-datte: Casual, with んだって (use [引|ひ]っ[越|こ]す): “Apparently Mori-san is moving next month”: [森|もり]さん、[来月|らいげつ]＿。",
      ]
    `);
  });

  it("leave the kana lessons to their own offer, and title every question's lesson", () => {
    const all = lessonsBefore(BANDS, null);
    expect(all).toHaveLength(UNITS.reduce((n, u) => n + u.lessons.length, 0) - kanaLessons().length);
    expect(all.some((l) => /^(hiragana|katakana)\//.test(l))).toBe(false);
    expect(kanaLessons().every((l) => /^(hiragana|katakana)\//.test(l))).toBe(true);
    const titles = questionLessonTitles(BANDS);
    for (const b of BANDS) for (const q of b.questions) expect(titles[q.lesson], q.lesson).toBeTruthy();
  });
});

describe("placement", () => {
  /** Answers for the first bands: "RR" right right, "RW" a slip, "WW" two misses. */
  const run = (...bands: string[]) => bands.map((b) => [...b].map((c) => c === "R"));
  const fake: Band[] = Array.from({ length: 4 }, (_, i) => ({
    unit: `u${i}`,
    title: `Unit ${i}`,
    lessons: [`u${i}/a`, `u${i}/b`],
    questions: [0, 1].map((n) => ({ prompt: `${i}-${n}`, answers: ["は"], explanation: "", lesson: `u${i}/a` })),
  }));

  it("starts at the first band with two misses", () => {
    expect(placement(fake, run("RR", "WW"))).toEqual({ start: 1, done: true });
    expect(placement(fake, run("WW"))).toEqual({ start: 0, done: true });
    expect(placement(fake, run("RR", "RW", "RR", "WW"))).toEqual({ start: 3, done: true });
  });

  it("treats a single miss as a slip", () => {
    expect(placement(fake, run("RW", "WR", "RW", "WR"))).toEqual({ start: null, done: true });
  });

  it("stops as soon as a band places, and waits while questions remain", () => {
    expect(placement(fake, run("RR", "W"))).toEqual({ start: null, done: false });
    expect(placement(fake, run("RR", "R"))).toEqual({ start: null, done: false });
    expect(placement(fake, [])).toEqual({ start: null, done: false });
  });

  it("offers every earlier band's lessons to mark finished", () => {
    expect(lessonsBefore(fake, 2)).toEqual(["u0/a", "u0/b", "u1/a", "u1/b"]);
    expect(lessonsBefore(fake, 0)).toEqual([]);
    expect(lessonsBefore(fake, null)).toHaveLength(8);
  });

  it("never places in a band with fewer questions than misses needed, and passes it once answered", () => {
    const short: Band[] = [{ ...fake[0], questions: fake[0].questions.slice(0, 1) }, fake[1]];
    expect(placement(short, run("W", "RR"))).toEqual({ start: null, done: true });
  });
});

describe("client code", () => {
  it("keeps the lessons out of the check's client modules", () => {
    for (const file of ["lib/placement.ts", "components/placement/PlacementCheck.tsx"]) {
      expect(readFileSync(file, "utf8"), file).not.toMatch(/^import (?!type )[^;]*?from "@\/(content\/(?!kana")|lib\/placement-bands|lib\/joyo|lib\/corpus)/m);
    }
  });
});
