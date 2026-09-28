import type { Lesson } from "@/content/types";

const DRILL = {
  type: "link",
  href: "/kana/drill",
  label: "Drill katakana",
  text: "Pick a katakana deck — rows open as you learn them.",
} as const;

export const katakana: Lesson[] = [
  {
    slug: "katakana-basics",
    title: "Katakana 1: the same sounds in sharper shapes",
    mark: "カ",
    summary: "All 46 basic katakana, and what they're used for.",
    source: "Genki I — Katakana; standard gojūon table",
    blocks: [
      {
        type: "idea",
        text: "Katakana has exactly the same sounds as hiragana, in angular shapes. It's used for **foreign words**, foreign names, sound effects and emphasis.",
      },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["—", "ア a", "イ i", "ウ u", "エ e", "オ o"],
          ["k", "カ ka", "キ ki", "ク ku", "ケ ke", "コ ko"],
          ["s", "サ sa", "シ shi", "ス su", "セ se", "ソ so"],
          ["t", "タ ta", "チ chi", "ツ tsu", "テ te", "ト to"],
          ["n", "ナ na", "ニ ni", "ヌ nu", "ネ ne", "ノ no"],
          ["h", "ハ ha", "ヒ hi", "フ fu", "ヘ he", "ホ ho"],
          ["m", "マ ma", "ミ mi", "ム mu", "メ me", "モ mo"],
          ["y", "ヤ ya", "", "ユ yu", "", "ヨ yo"],
          ["r", "ラ ra", "リ ri", "ル ru", "レ re", "ロ ro"],
          ["w", "ワ wa", "", "", "", "ヲ o"],
          ["n", "ン n", "", "", "", ""],
        ],
        caption: "Dakuten and small ャ ュ ョ work exactly as in hiragana: ガ ga, パ pa, キャ kya.",
      },
      {
        type: "examples",
        items: [
          { jp: "テレビ", en: "TV" },
          { jp: "ホテル", en: "hotel" },
          { jp: "カメラ", en: "camera" },
          { jp: "アメリカ", en: "America" },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Some pairs barely change between scripts: か/カ, へ/ヘ, り/リ, も/モ. Use them as anchors.",
      },
      DRILL,
    ],
  },
  {
    slug: "katakana-look-alikes",
    title: "Katakana 2: telling look-alikes apart (シ/ツ, ソ/ン)",
    mark: "シ・ツ",
    summary: "Stroke direction is the whole trick.",
    source: "Genki I — Katakana (stroke order)",
    blocks: [
      { type: "idea", text: "A few katakana differ only in **stroke direction**. Look at which way the long stroke travels." },
      {
        type: "table",
        headers: ["Pair", "How to tell them apart"],
        rows: [
          ["シ shi · ツ tsu", "シ: dots on the left, long stroke sweeps **up**. ツ: dots on top, long stroke falls **down**."],
          ["ソ so · ン n", "ソ: short stroke on top, long stroke falls **down**. ン: dot on the left, long stroke sweeps **up**."],
          ["ク ku · タ ta · ケ ke", "タ is ク with an extra stroke inside. ケ has a straight crossbar that runs on past its third stroke to the right; ク's top turns down into a hook."],
          ["ヌ nu · ス su", "ヌ has an extra short stroke crossing it; ス doesn't."],
          ["ワ wa · ウ u · フ fu", "ウ is ワ with a dot on top. フ has no left-hand stroke at all."],
          ["ノ no · メ me", "メ is ノ with a second stroke crossing it."],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "シャツ", en: "shirt", note: "Both in one word: シ shi, ツ tsu." },
          { jp: "ソース", en: "sauce" },
          { jp: "パン", en: "bread" },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Write each pair by hand a few times. The direction your pen travels on the long stroke is exactly what separates シ from ツ and ソ from ン.",
      },
      DRILL,
    ],
  },
  {
    slug: "katakana-long-vowels-combos",
    title: "Katakana 3: the long bar ー and new sounds (ティ, ファ)",
    mark: "ー",
    summary: "How katakana spells long vowels and sounds Japanese didn't have.",
    source: "Genki I — Katakana (long vowels and extended combinations)",
    blocks: [
      {
        type: "idea",
        text: "In katakana a long vowel is a **bar**: ー. And small ァ ィ ゥ ェ ォ build sounds Japanese didn't have, like ティ **ti** and ファ **fa**.",
      },
      {
        type: "examples",
        items: [
          { jp: "コーヒー", en: "coffee", note: "ko-o-hi-i: each ー holds the vowel for one more beat." },
          { jp: "ケーキ", en: "cake" },
          { jp: "スーパー", en: "supermarket" },
          { jp: "ベッド", en: "bed", note: "Small ッ works exactly like hiragana っ." },
        ],
      },
      {
        type: "table",
        headers: ["Combo", "Sound", "Example"],
        rows: [
          ["ティ", "ti", "パーティー (party)"],
          ["ディ", "di", "ディズニー (Disney)"],
          ["ファ", "fa", "ファン (fan)"],
          ["フィ · フェ · フォ", "fi · fe · fo", "カフェ (café), フォーク (fork)"],
          ["ウィ · ウェ", "wi · we", "ウェブ (web)"],
          ["チェ · ジェ · シェ", "che · je · she", "チェック (check), シェア (share)"],
          ["ヴ", "vu (often said bu)", "ヴァイオリン (violin)"],
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "In vertical text, the long bar turns vertical too. It always follows the direction of writing.",
      },
      DRILL,
    ],
  },
  {
    slug: "english-to-katakana",
    title: "Katakana 4: how English words become Japanese",
    mark: "ホテル",
    summary: "The sound rules behind loanwords — and why they get shortened.",
    source: "Tofugu — “Katakana loanwords”; Genki I — Katakana",
    blocks: [
      {
        type: "idea",
        text: "Japanese syllables mostly end in a vowel, so English words get **vowels added**, and sounds swap to the nearest Japanese ones.",
      },
      {
        type: "table",
        headers: ["Rule", "English", "Katakana"],
        rows: [
          ["Lone consonants get u (o after t, d)", "desk, bed", "デスク, ベッド"],
          ["l and r both become r", "lemon, rice", "レモン, ライス"],
          ["v usually becomes b", "video, vest", "ビデオ, ベスト"],
          ["-er / -or / -ar become a long a", "computer, doctor", "コンピューター, ドクター"],
          ["th becomes s or z", "three, thrill", "スリー, スリル"],
          ["ti / di: newer words use ティ / ディ, older ones チ / ジ", "party, ticket, radio", "パーティー, チケット, ラジオ"],
        ],
      },
      { type: "heading", text: "Then they get shortened" },
      {
        type: "examples",
        items: [
          { jp: "パソコン", en: "personal computer", note: "From パーソナル・コンピューター, clipped." },
          { jp: "コンビニ", en: "convenience store" },
          { jp: "スマホ", en: "smartphone" },
          { jp: "エアコン", en: "air conditioner" },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "Some loanwords changed meaning on the way: マンション is a flat in an apartment block (not a mansion), and アルバイト (from German *Arbeit*) is a part-time job.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Stuck on a katakana word? Say it out loud slowly — it's often English in disguise.",
      },
    ],
  },
];
