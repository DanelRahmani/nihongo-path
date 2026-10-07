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
    source: "Genki I ch. 3, 8 and 9; Tae Kim's Guide — “Polite form and verb stems”",
    register: "both",
    kinds: ["basics"],
    blocks: [
      {
        type: "idea",
        text: "In speech, a Japanese sentence ends either **polite** (です/ます) or **casual** (the plain form), depending on who you're talking to.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[毎朝|まいあさ] コーヒー を [飲|の]{みます}。",
            en: "I drink coffee every morning.",
            alt: "[毎朝|まいあさ] コーヒー を [飲|の]{む}。",
          },
          {
            jp: "[今日|きょう] は [寒|さむ]い {です} ね。",
            en: "It's cold today, isn't it?",
            alt: "[今日|きょう] は [寒|さむ]い ね。",
            note: "Casual simply drops です: an i-adjective can end a sentence on its own.",
          },
          {
            jp: "[昨日|きのう] [映画|えいが] を [見|み]{ました}。",
            en: "I watched a film yesterday.",
            alt: "[昨日|きのう] [映画|えいが] を [見|み]{た}。",
          },
          {
            jp: "[一緒|いっしょ] に [行|い]{きます} か？",
            en: "Are you coming with us?",
            alt: "[一緒|いっしょ] に [行|い]{く}？",
            note: "Casual questions usually drop か and just rise in tone; a bare か after a casual verb can sound rough.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[学生|がくせい] {です}。", en: "I'm a student.", note: "Polite." },
        b: { jp: "[学生|がくせい] {だ}。", en: "I'm a student.", note: "Casual. In conversation it's usually softened — [学生|がくせい]だよ — or just [学生|がくせい]; a bare だ can sound blunt." },
        diff: "Same meaning, different relationship. です/ます for strangers, teachers, shops and work; casual with friends and family.",
      },
      {
        type: "pair",
        a: { jp: "[毎日|まいにち] [走|はし]{ります}。", en: "I run every day.", note: "Polite ます form." },
        b: { jp: "[毎日|まいにち] [走|はし]{る}。", en: "I run every day.", note: "Casual dictionary form." },
        diff: "Same meaning: the polite form keeps a respectful distance, the casual one sounds close and relaxed. Verbs switch between the ます form and the dictionary form; the Verbs unit shows how.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't add だ to an i-adjective",
        text: "✗ [寒|さむ]いだ。 ✓ [寒|さむ]い。 An i-adjective takes です when you're polite ([寒|さむ]いです), but stands alone when you're casual. As a sentence ending, だ follows nouns and na-adjectives, not i-adjectives.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[何|なに] [飲|の]む？", en: "What are you having?", alt: "[何|なに] を [飲|の]みます か？" },
          { speaker: "B", jp: "コーヒー に する。", en: "I'll get a coffee.", alt: "コーヒー に します。" },
          { speaker: "B", jp: "すみません、 コーヒー を [一|ひと]つ ください。", en: "Excuse me, one coffee, please." },
          { speaker: "C", jp: "はい、 かしこまりました。", en: "Certainly." },
        ],
        note: "B answers a friend (A) casually, then turns to the café staff (C) and switches to polite: switching mid-scene like this is completely normal. Casual speech often drops を ([何|なに][飲|の]む？); the polite version puts it back. かしこまりました is staff's very polite “certainly”: you'll hear it, but won't need to say it.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "When in doubt, be polite: speaking casually too early can come across as rude, and a little too polite is rarely a problem. Once a friend or peer switches to casual with you, following their lead is friendly; staying polite can feel distant.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it casual: [本|ほん]を[読|よ]みます。 → [本|ほん]を＿＿",
            answers: ["[読|よ]む"],
            explanation: "The casual form of 〜ます is the dictionary form: [読|よ]みます → [読|よ]む, just like [飲|の]みます → [飲|の]む. (〜ました becomes the た form: [見|み]ました → [見|み]た.)",
          },
          {
            prompt: "Make it polite: [水|みず]を[飲|の]む。 → [水|みず]を＿＿",
            answers: ["[飲|の]みます"],
            explanation: "As in the examples, [飲|の]む → [飲|の]みます: for verbs like this, the final u sound becomes i, then ます. The Verbs unit covers every verb group.",
          },
          {
            prompt: "Make it casual: [学生|がくせい]です。",
            answers: ["[学生|がくせい] だ よ", "[学生|がくせい]", "[学生|がくせい] だ"],
            explanation: "です becomes だ, which usually softens to だよ in conversation, or drops away entirely.",
          },
          {
            prompt: "Fix the mistake in this casual sentence: [暑|あつ]いだ。",
            answers: ["[暑|あつ]い", "[暑|あつ]い よ", "[暑|あつ]い ね"],
            explanation: "An i-adjective doesn't end a sentence with だ. Polite adds です ([暑|あつ]いです); casual leaves the adjective on its own.",
          },
        ],
      },
      { type: "link", href: "/learn/culture/polite-or-casual", label: "More on choosing polite or casual" },
    ],
  },
];
