import type { Lesson } from "@/content/types";

const DRILL = {
  type: "link",
  href: "/kana/drill",
  label: "Drill hiragana",
  text: "Start with the first row — new rows open as you learn them.",
} as const;

export const hiragana: Lesson[] = [
  {
    slug: "hiragana-vowels-kstn",
    title: "Hiragana 1: the vowels and the K, S, T, N rows",
    mark: "あ",
    summary: "Five vowels, then a consonant in front of each — 25 characters.",
    source: "Genki I — Hiragana; standard gojūon table",
    blocks: [
      {
        type: "idea",
        text: "Each hiragana is one beat. Learn the five vowels — **a i u e o** — then put a consonant in front: ka ki ku ke ko.",
      },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["—", "あ a", "い i", "う u", "え e", "お o"],
          ["k", "か ka", "き ki", "く ku", "け ke", "こ ko"],
          ["s", "さ sa", "し shi", "す su", "せ se", "そ so"],
          ["t", "た ta", "ち chi", "つ tsu", "て te", "と to"],
          ["n", "な na", "に ni", "ぬ nu", "ね ne", "の no"],
        ],
      },
      {
        type: "text",
        text: "Three sounds break the pattern: し is **shi**, ち is **chi**, つ is **tsu**. Vowels are short and pure: a as in *father*, i as in *machine*, u as in *put* (lips relaxed), e as in *bed*, o as in *off*.",
      },
      {
        type: "examples",
        items: [
          { jp: "あい", en: "love" },
          { jp: "いえ", en: "house" },
          { jp: "かさ", en: "umbrella" },
          { jp: "すし", en: "sushi" },
          { jp: "ねこ", en: "cat" },
          { jp: "ちかてつ", en: "subway" },
        ],
      },
      { type: "callout", kind: "tip", text: "Read each row out loud: ka ki ku ke ko. Then drill the あ row until it's instant." },
      DRILL,
    ],
  },
  {
    slug: "hiragana-hmyrw",
    title: "Hiragana 2: the H, M, Y, R, W rows and ん",
    mark: "は",
    summary: "The second half of the basic chart, including the only lone consonant.",
    source: "Genki I — Hiragana; standard gojūon table",
    blocks: [
      { type: "idea", text: "Five more rows finish the basic 46 hiragana. The Y and W rows are short, and ん stands alone." },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["h", "は ha", "ひ hi", "ふ fu", "へ he", "ほ ho"],
          ["m", "ま ma", "み mi", "む mu", "め me", "も mo"],
          ["y", "や ya", "", "ゆ yu", "", "よ yo"],
          ["r", "ら ra", "り ri", "る ru", "れ re", "ろ ro"],
          ["w", "わ wa", "", "", "", "を o"],
          ["n", "ん n", "", "", "", ""],
        ],
      },
      {
        type: "text",
        text: "ふ is **fu** — soft, lips barely touching. The Japanese r is a light tap, somewhere between English r, l and d. を is only used as the object particle. ん is a full beat on its own: ほん (book) is two beats, ho-n.",
      },
      {
        type: "examples",
        items: [
          { jp: "はな", en: "flower" },
          { jp: "ふね", en: "boat" },
          { jp: "やま", en: "mountain" },
          { jp: "よる", en: "night" },
          { jp: "みかん", en: "mandarin orange" },
          { jp: "わたし", en: "I, me" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "As particles, は is read **wa**, を is read **o** and へ is read **e**. The spelling kept the old sounds; the pronunciation moved on.",
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-dakuten",
    title: "Hiragana 3: two dots and a circle make new sounds (が, ぱ…)",
    mark: "が",
    summary: "Dakuten ゛ and handakuten ゜ turn 20 kana into 25 new kana.",
    source: "Genki I — Hiragana (diacritics)",
    blocks: [
      {
        type: "idea",
        text: "Two small dots ゛ (**dakuten**) voice a sound: k → g, s → z, t → d, h → b. A small circle ゜ (**handakuten**) turns h into **p**.",
      },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["g", "が ga", "ぎ gi", "ぐ gu", "げ ge", "ご go"],
          ["z", "ざ za", "じ ji", "ず zu", "ぜ ze", "ぞ zo"],
          ["d", "だ da", "ぢ ji", "づ zu", "で de", "ど do"],
          ["b", "ば ba", "び bi", "ぶ bu", "べ be", "ぼ bo"],
          ["p", "ぱ pa", "ぴ pi", "ぷ pu", "ぺ pe", "ぽ po"],
        ],
      },
      {
        type: "pair",
        a: { jp: "ふた", en: "lid" },
        b: { jp: "ぶた", en: "pig" },
        diff: "Two tiny dots change the word completely. Always check for them.",
      },
      {
        type: "pair",
        a: { jp: "かき", en: "persimmon" },
        b: { jp: "かぎ", en: "key" },
        diff: "Same idea on the second kana: き ki → ぎ gi.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "ぢ and づ sound the same as じ and ず and are rare. You'll mostly meet them in words like つづく (to continue).",
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-combos",
    title: "Hiragana 4: small ゃ ゅ ょ merge into one sound (きゃ, しゅ…)",
    mark: "きゃ",
    summary: "An i-sound plus a small ya, yu or yo becomes a single beat.",
    source: "Genki I — Hiragana (combinations)",
    blocks: [
      {
        type: "idea",
        text: "An i-sound kana plus a **small** ゃ, ゅ or ょ merges into one beat: き + ゃ = きゃ **kya**.",
      },
      {
        type: "table",
        headers: ["", "ya", "yu", "yo"],
        rows: [
          ["k", "きゃ kya", "きゅ kyu", "きょ kyo"],
          ["s", "しゃ sha", "しゅ shu", "しょ sho"],
          ["ch", "ちゃ cha", "ちゅ chu", "ちょ cho"],
          ["n", "にゃ nya", "にゅ nyu", "にょ nyo"],
          ["h", "ひゃ hya", "ひゅ hyu", "ひょ hyo"],
          ["m", "みゃ mya", "みゅ myu", "みょ myo"],
          ["r", "りゃ rya", "りゅ ryu", "りょ ryo"],
          ["g", "ぎゃ gya", "ぎゅ gyu", "ぎょ gyo"],
          ["j", "じゃ ja", "じゅ ju", "じょ jo"],
          ["b", "びゃ bya", "びゅ byu", "びょ byo"],
          ["p", "ぴゃ pya", "ぴゅ pyu", "ぴょ pyo"],
        ],
      },
      {
        type: "pair",
        a: { jp: "びょういん", en: "hospital", note: "byo-u-i-n: four beats." },
        b: { jp: "びよういん", en: "hair salon", note: "bi-yo-u-i-n: five beats." },
        diff: "Small ょ merges with び; a full-size よ is its own beat. Size matters!",
      },
      {
        type: "examples",
        items: [
          { jp: "きょう", en: "today" },
          { jp: "しゃしん", en: "photo" },
          { jp: "おちゃ", en: "tea (usually green tea)" },
          { jp: "じゅぎょう", en: "class, lesson" },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-small-tsu-long-vowels",
    title: "Hiragana 5: small っ doubles a sound, and long vowels",
    mark: "っ",
    summary: "The silent beat of っ, and vowels held for two beats.",
    source: "Genki I — Hiragana (double consonants and long vowels)",
    blocks: [
      {
        type: "idea",
        text: "A small **っ** doubles the next consonant — a tiny pause before it. A **long vowel** holds the sound for two beats.",
      },
      {
        type: "pair",
        a: { jp: "きて", en: "come (and…)", note: "ki-te: two beats." },
        b: { jp: "きって", en: "stamp", note: "ki-t-te: three beats, with a short stop." },
        diff: "The small っ adds a silent beat, like the catch in *hot tub*. In romaji it doubles the consonant: kitte.",
      },
      { type: "heading", text: "Long vowels" },
      {
        type: "pair",
        a: { jp: "おばさん", en: "aunt, middle-aged woman" },
        b: { jp: "おばあさん", en: "grandmother, elderly woman" },
        diff: "One extra beat of あ adds a generation. Hold long vowels for their full length.",
      },
      {
        type: "table",
        headers: ["Written", "Sounds like", "Example"],
        rows: [
          ["ああ · いい · うう", "a, i, u held", "おかあさん (mother)"],
          ["えい · ええ", "a long e", "せんせい (teacher)"],
          ["おう · おお", "a long o", "ありがとう (thank you)"],
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "The romaji in these lessons spells long vowels out — ou, ei, ii — exactly as they're written in kana, so you can always map it back.",
      },
      DRILL,
    ],
  },
];
