import type { Lesson } from "@/content/types";

const DRILL = {
  type: "link",
  href: "/kana#drill",
  label: "Drill katakana",
  text: "Pick a katakana deck — rows open as you learn them.",
} as const;

// As in the hiragana lessons: highlights mark the kana being taught, pairs are minimal pairs, and
// the quiz asks for readings in romaji (content/STYLE.md §10).

export const katakana: Lesson[] = [
  {
    slug: "katakana-basics",
    title: "Katakana 1: the same sounds in sharper shapes",
    mark: "カ",
    summary: "All 46 basic katakana, and what they're used for.",
    source: "Genki I — Katakana; the standard gojuuon chart",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "Katakana has the same sounds as hiragana in sharper shapes, and it's used for **foreign words**, foreign names, sound effects and emphasis.",
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
        caption: "Dakuten ゛ and handakuten ゜, small ャ ュ ョ and small ッ work exactly as in hiragana: ガ ga, パ pa, キャ kya, and ッ doubles the next consonant.",
      },
      {
        type: "examples",
        items: [
          { jp: "{カ}メラ", en: "camera", note: "カ is か without its small third stroke." },
          { jp: "アメ{リ}カ", en: "America", note: "リ is almost the same as り." },
          { jp: "メ{モ}", en: "memo, note", note: "モ is close to も." },
          { jp: "{ヘ}ルメット", en: "helmet", note: "ヘ and へ are practically identical." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{パ}ン", en: "bread" },
        b: { jp: "{ペ}ン", en: "pen" },
        diff: "One vowel changes the word: pa → pe. The circle and the dots work exactly as in hiragana.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Say loanwords the Japanese way",
        text: "✗ *CAM-ruh* ✓ *ka-me-ra*. In a Japanese sentence, カメラ is three beats with Japanese vowels. Loanwords follow Japanese sounds, even when they started in English.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Most foreign names are written in katakana: Smith becomes スミス, and Maria becomes マリア (Chinese names usually keep their kanji). If yours is one of them, expect to see it that way on forms and name tags in Japan.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Some pairs barely change between scripts: か/カ, へ/ヘ, り/リ, も/モ. Use them as anchors.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **テレビ** (TV)?",
            answers: ["テレビ"],
            answerIn: "romaji",
            explanation: "テ te + レ re + ビ bi: terebi, from “television”.",
          },
          {
            prompt: "How do you read **ホテル** (hotel)?",
            answers: ["ホテル"],
            answerIn: "romaji",
            explanation: "ホ ho + テ te + ル ru: hoteru. The final l of *hotel* gets a vowel: ル ru.",
          },
          {
            prompt: "How do you read **ナイフ** (knife)?",
            answers: ["ナイフ"],
            answerIn: "romaji",
            explanation: "ナ na + イ i + フ fu: naifu. The silent k is dropped, and the f gets a vowel.",
          },
          {
            prompt: "How do you read **メロン** (melon)?",
            answers: ["メロン"],
            answerIn: "romaji",
            explanation: "メ me + ロ ro + ン n: meron. Japanese has one r sound for both English l and r.",
          },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "katakana-look-alikes",
    title: "Katakana 2: telling look-alikes apart (シ/ツ, ソ/ン)",
    mark: "シ・ツ",
    summary: "Stroke direction, and one extra stroke, are the whole trick.",
    source: "Genki I — Katakana (stroke order)",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "Stroke direction separates シ from ツ and ソ from ン; for the other look-alikes, look for an extra stroke.",
      },
      {
        type: "table",
        headers: ["Pair", "How to tell them apart"],
        rows: [
          ["シ shi · ツ tsu", "シ: dots on the left, long stroke sweeps **up**. ツ: dots on top, long stroke falls **down**."],
          [
            "ソ so · ン n",
            "ソ looks like ツ with one dot: its short stroke stands upright, and the long stroke falls **down** steeply from the top right. ン looks like シ with one dot: the dot lies nearly flat, and the long stroke sweeps **up** at a shallow angle from the bottom left.",
          ],
          ["ク ku · タ ta · ケ ke", "タ is ク with an extra stroke inside. ケ has a straight crossbar that runs on past its third stroke to the right; ク's top bends down at a corner into the long sweep."],
          ["ヌ nu · ス su", "Both have a short second stroke. In ヌ it cuts across the long sweep; in ス it starts on the sweep and kicks out to the right without crossing."],
          ["ワ wa · ウ u · フ fu", "ウ is ワ with a dot on top. フ has no left-hand stroke at all."],
          ["ノ no · メ me", "メ is ノ with a second stroke crossing it."],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "{シ}ャ{ツ}", en: "shirt", note: "Both in one word: シ shi sweeps up, ツ tsu falls down." },
          { jp: "{ツ}ナ", en: "tuna (usually canned)" },
          { jp: "{ソ}ックス", en: "socks", note: "ソ: the long stroke falls from the top." },
          { jp: "ロ{ン}ド{ン}", en: "London", note: "ン twice, each sweeping up from the bottom." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{シ}ール", en: "sticker" },
        b: { jp: "{ツ}ール", en: "tool" },
        diff: "Direction is everything: シ (shi) sweeps up, ツ (tsu) falls down. The bar ー holds the vowel for an extra beat (Katakana 3).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ン sweeps up",
        text: "✗ パソ ✓ パン (bread). If your long stroke falls from the top, you've written ソ (so). For ン, the dot sits on the left and the long stroke sweeps up from the bottom.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Look-alikes turn up in emoticons, too: the face in the shrug ¯\\_(ツ)_/¯ is the katakana ツ.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Write each pair by hand a few times. The direction your pen travels on the long stroke is exactly what separates シ from ツ and ソ from ン.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Some katakana look almost like kanji: カ and [!力|ちから] (power), エ and [!工|こう] (craft), ロ and [!口|くち] (mouth), ニ and [!二|に] (two), ハ and [!八|はち] (eight), タ and [!夕|ゆう] (evening). Context tells them apart.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **タオル** (towel)?",
            answers: ["タオル"],
            answerIn: "romaji",
            explanation: "タ ta + オ o + ル ru: taoru. タ is ク with an extra stroke inside.",
          },
          {
            prompt: "How do you read **ミシン** (sewing machine)?",
            answers: ["ミシン"],
            answerIn: "romaji",
            explanation: "ミ mi + シ shi + ン n: mishin, from “machine”. Both look-alikes here sweep up.",
          },
          {
            prompt: "How do you read **ノック** (a knock)?",
            answers: ["ノック"],
            answerIn: "romaji",
            explanation: "ノ no + ッ + ク ku: nokku. ノ is a single stroke; メ has a second one crossing it.",
          },
          {
            prompt: "How do you read **ナッツ** (nuts)?",
            answers: ["ナッツ"],
            answerIn: "romaji",
            explanation: "ナ na + ッ + ツ tsu: nattsu. Both ッ and ツ have their dots on top and fall down; ッ is the small one.",
          },
          {
            prompt: "How do you read **ケチャップ** (ketchup)?",
            answers: ["ケチャップ"],
            answerIn: "romaji",
            explanation: "ケ ke + チャ cha + ッ + プ pu: kechappu. ケ's crossbar runs on past its third stroke, and the ッ doubles the p.",
          },
        ],
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
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "In katakana a long vowel is a **bar**, ー, and small ァ ィ ェ ォ build sounds Japanese didn't have, like ティ **ti** and ファ **fa**.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "コ{ー}ヒ{ー}",
            en: "coffee",
            note: "ko-o-hi-i: each ー repeats the vowel before it, so the romaji is koohii. Type it doubled (or with a macron), not with a dash.",
          },
          { jp: "ケ{ー}キ", en: "cake", note: "keeki, not keiki: ー repeats the e." },
          { jp: "ス{ー}パ{ー}", en: "supermarket", note: "Short for スーパーマーケット." },
          { jp: "{ティ}ッシュ", en: "tissues", note: "ティ is ti, a sound Japanese didn't have." },
        ],
      },
      {
        type: "pair",
        a: { jp: "ビル", en: "building" },
        b: { jp: "ビ{ー}ル", en: "beer" },
        diff: "One bar adds a beat and changes the word: biru is a building, biiru is beer.",
      },
      {
        type: "table",
        headers: ["Combo", "Sound", "Example"],
        rows: [
          ["ティ", "ti", "パーティー (party)"],
          ["ディ", "di", "ディズニー (Disney)"],
          ["ファ", "fa", "ファン (fan, supporter)"],
          ["フィ · フェ · フォ", "fi · fe · fo", "フィルム (film), カフェ (café), フォーク (fork)"],
          ["ウィ · ウェ", "wi · we", "ウィンドウ (a window on screen), ウェブ (web)"],
          ["チェ · ジェ · シェ", "che · je · she", "チェック (check), ジェット (jet), シェア (share)"],
          ["ヴ", "vu (often said bu)", "ヴァイオリン (violin; more often written バイオリン)"],
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The bar isn't a hyphen",
        text: "✗ コ-ヒ- ✓ コーヒー. The bar is a character of its own, not a hyphen or a dash. With Japanese input in romaji mode, the minus key (-) types it.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Some words are spelled two ways, with or without the final ー: コンピューター and コンピュータ (computer). Technical writing long dropped the bar; everyday writing mostly keeps it, and so does this app.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "In vertical text, the long bar turns vertical too. It always follows the direction of writing.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **ノート** (notebook)?",
            answers: ["ノート"],
            answerIn: "romaji",
            explanation: "ノ no + ー + ト to: nooto. The bar repeats the o.",
          },
          {
            prompt: "How do you read **ソファー** (sofa)?",
            answers: ["ソファー"],
            answerIn: "romaji",
            explanation: "ソ so + ファ fa + ー: sofaa. The small ァ turns フ into fa, and the bar holds the a. (Also written ソファ.)",
          },
          {
            prompt: "How do you read **メール** (email)?",
            answers: ["メール"],
            answerIn: "romaji",
            explanation: "メ me + ー + ル ru: meeru, from “mail”. The bar repeats the e.",
          },
          {
            prompt: "How do you read **シェフ** (chef)?",
            answers: ["シェフ"],
            answerIn: "romaji",
            explanation: "シェ she + フ fu: shefu. The small ェ turns シ into she.",
          },
        ],
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
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "Japanese syllables mostly end in a vowel, so English words get **vowels added**, and sounds swap to the nearest Japanese ones.",
      },
      {
        type: "examples",
        items: [
          { jp: "ミ{ルク}", en: "milk", note: "mi-ru-ku: the l becomes ru and the k becomes ku." },
          { jp: "ベッ{ド}", en: "bed", note: "After d and t, the added vowel is o: beddo." },
          { jp: "ゴ{ルフ}", en: "golf", note: "go-ru-fu: the l and the f each get a vowel." },
          { jp: "テ{キスト}", en: "textbook; text", note: "te-ki-su-to: x is k + s, and every consonant gets its own vowel." },
        ],
      },
      {
        type: "table",
        headers: ["Rule", "English", "Katakana"],
        rows: [
          ["Lone consonants get u (o after t and d, i after ch and j)", "desk, bed, match", "デスク, ベッド, マッチ"],
          ["A short vowel before a final p, t, k, d, g, ch or sh often adds ッ", "cup, hot, check", "カップ, ホット, チェック"],
          ["l and r both become r", "lemon, rice", "レモン, ライス"],
          ["v usually becomes b", "video, vest", "ビデオ, ベスト"],
          ["-er / -or / -ar become a long a", "computer, doctor", "コンピューター, ドクター"],
          ["th becomes s or z", "three, mother", "スリー, マザー"],
          ["ti / di: newer words use ティ / ディ, older ones チ / ジ", "party, ticket, radio", "パーティー, チケット, ラジオ"],
        ],
      },
      {
        type: "pair",
        a: { jp: "バッ{グ}", en: "bag" },
        b: { jp: "バッ{ク}", en: "back" },
        diff: "Only the last kana changes: グ gu for the g of *bag*, ク ku for the k of *back*.",
      },
      { type: "heading", text: "Then they get shortened" },
      {
        type: "examples",
        items: [
          { jp: "パソコン", en: "computer, PC", note: "From パーソナル・コンピューター." },
          { jp: "コンビニ", en: "convenience store", note: "From コンビニエンスストア." },
          { jp: "スマホ", en: "smartphone", note: "From スマートフォン." },
          { jp: "エアコン", en: "air conditioner", note: "From エアコンディショナー." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Loanwords can change meaning",
        text: "✗ マンション for a grand house ✓ マンション for a flat, or the block it's in (usually concrete, several storeys); a smaller, often wooden block is an アパート. On the way into Japanese, some loanwords changed meaning.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Not every loanword is English. パン (bread) came from Portuguese centuries ago, and アルバイト (a part-time job) from German *Arbeit*, “work”; everyday speech shortens it to バイト. Some “English” was made in Japan: サラリーマン, an office worker on a salary.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Stuck on a katakana word? Say it out loud slowly: it's often English in disguise.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **タクシー**? Then guess the English.",
            answers: ["タクシー"],
            answerIn: "romaji",
            explanation: "ta-ku-shi-i: takushii, “taxi”. The x is k + s: the k gets a u (ク), si becomes シ shi, and the final i is held long: シー.",
          },
          {
            prompt: "How do you read **テスト**? Then guess the English.",
            answers: ["テスト"],
            answerIn: "romaji",
            explanation: "te-su-to: tesuto, “test”. After t, the added vowel is o.",
          },
          {
            prompt: "How do you read **ハンバーガー**? Then guess the English.",
            answers: ["ハンバーガー"],
            answerIn: "romaji",
            explanation: "ha-n-ba-a-ga-a: hanbaagaa, “hamburger”. Each -er sound becomes a long a. (Traditional Hepburn writes hambaagaa; both are accepted. ハンバーグ, without the -er, is a hamburger steak served on a plate.)",
          },
          {
            prompt: "How do you read **プリン**? Then guess the English.",
            answers: ["プリン"],
            answerIn: "romaji",
            explanation: "pu-ri-n: purin, from “pudding”. In Japan it's a caramel custard.",
          },
        ],
      },
    ],
  },
];
