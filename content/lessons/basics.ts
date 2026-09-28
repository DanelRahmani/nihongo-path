import type { Lesson } from "@/content/types";

export const basics: Lesson[] = [
  {
    slug: "three-scripts",
    title: "Three scripts in one sentence: hiragana, katakana, kanji",
    mark: "あ・ア",
    summary: "What each writing system is for, and how this app shows them.",
    source: "Genki I — Introduction: the Japanese writing system; Tae Kim's Guide — “The writing system”",
    blocks: [
      {
        type: "idea",
        text: "Japanese is written with three scripts at once: **hiragana** for grammar and native words, **katakana** for foreign words, and **kanji** for meaning.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[私|わたし] は コーヒー が [好|す]き です。",
            en: "I like coffee.",
            note: "Katakana: コーヒー. Hiragana: は, が, です and the word endings. The rest are kanji — switch Display to Furigana or Kanji to see them.",
          },
        ],
      },
      {
        type: "table",
        headers: ["Script", "Looks like", "Used for"],
        rows: [
          ["Hiragana", "ひらがな", "Particles, word endings, native words"],
          ["Katakana", "カタカナ", "Foreign words and names, sound effects, emphasis"],
          ["Kanji", "[漢字|かんじ]", "The core of most nouns, verbs and adjectives"],
        ],
      },
      {
        type: "text",
        text: "This app teaches hiragana and katakana. Kanji are shown according to your **Display** setting: written in kana, with furigana (small kana above), or as plain kanji.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Learn hiragana first — every sentence needs it. Katakana second. Kanji can wait: everything in these lessons can be read in kana.",
      },
      { type: "link", href: "/learn/hiragana/hiragana-vowels-kstn", label: "Start hiragana", text: "The vowels and the first four rows." },
    ],
  },
  {
    slug: "polite-and-casual",
    title: "Polite and casual: two ways to end a sentence",
    mark: "です",
    summary: "Why some sentences end in です/ます and others don't.",
    source: "Genki I ch. 3 and 8; Tae Kim's Guide — “Polite form and verb stems”",
    blocks: [
      {
        type: "idea",
        text: "Every Japanese sentence ends either **polite** (です / ます) or **casual** (the plain form). You'll see both throughout these lessons.",
      },
      {
        type: "pair",
        a: { jp: "[学生|がくせい] {です}。", en: "I'm a student.", note: "Polite." },
        b: { jp: "[学生|がくせい] {だ}。", en: "I'm a student.", note: "Casual." },
        diff: "Same meaning, different relationship. です/ます for strangers, teachers, shops and work; casual with friends and family.",
      },
      {
        type: "pair",
        a: { jp: "[毎日|まいにち] [走|はし]り{ます}。", en: "I run every day.", note: "Polite ます form." },
        b: { jp: "[毎日|まいにち] [走|はし]{る}。", en: "I run every day.", note: "Casual dictionary form." },
        diff: "Verbs switch between the ます form and the dictionary form. The Verbs unit shows how.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "When in doubt, be polite. Speaking casually too early can come across as rude; being a little too polite is rarely a problem.",
      },
      { type: "link", href: "/learn/culture/polite-or-casual", label: "More on choosing polite or casual" },
    ],
  },
];
