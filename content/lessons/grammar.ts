import type { Lesson } from "@/content/types";

export const grammar: Lesson[] = [
  {
    slug: "desu-da",
    title: "です and だ: saying “X is Y”",
    mark: "です",
    summary: "Noun sentences — is, isn't, was, wasn't — in polite and casual speech.",
    source: "Genki I ch. 1, 4, 8; Tae Kim's Guide — “Expressing state-of-being”; Cure Dolly — です and だ",
    blocks: [
      { type: "idea", text: "**Noun + です** means “is (a) noun”. だ is the casual version. Both go at the very end." },
      {
        type: "table",
        headers: ["", "Polite", "Casual"],
        rows: [
          ["is", "[学生|がくせい] です", "[学生|がくせい] だ"],
          ["isn't", "[学生|がくせい] じゃ ありません", "[学生|がくせい] じゃ ない"],
          ["was", "[学生|がくせい] でした", "[学生|がくせい] だった"],
          ["wasn't", "[学生|がくせい] じゃ ありません でした", "[学生|がくせい] じゃ なかった"],
        ],
        caption: "ではありません is a more formal version of じゃありません — common in writing.",
      },
      {
        type: "examples",
        items: [
          { jp: "[田中|たなか]-さん は [先生|せんせい] です。", en: "Tanaka is a teacher." },
          { jp: "[明日|あした] は [休|やす]み じゃ ない。", en: "Tomorrow isn't a day off." },
          { jp: "[昨日|きのう] は [雨|あめ] でした。", en: "It rained yesterday.", note: "Literally: yesterday was rain." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "In casual speech だ is often dropped: [学生|がくせい]？ (a student?), [本当|ほんとう]？ (really?). A bare だ at the end can sound blunt or emphatic.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "After a noun, です is the “is”. After an い-adjective (おいしいです), です only adds politeness — the adjective already means “is tasty”.",
      },
    ],
  },
  {
    slug: "i-adjectives",
    title: "い-adjectives: they change their own ending, like verbs",
    mark: "〜い",
    summary: "[高|たか]い → [高|たか]くない → [高|たか]かった, and the irregular いい.",
    source: "Genki I ch. 5; Tae Kim's Guide — “Adjectives”; Cure Dolly — adjectives as verbs",
    blocks: [
      {
        type: "idea",
        text: "い-adjectives end in い and **conjugate by themselves**: [高|たか]い (is expensive) → [高|たか]くない (isn't) → [高|たか]かった (was).",
      },
      {
        type: "table",
        headers: ["", "Casual", "Polite"],
        rows: [
          ["is", "[高|たか]い", "[高|たか]い です"],
          ["isn't", "[高|たか]くない", "[高|たか]くない です"],
          ["was", "[高|たか]かった", "[高|たか]かった です"],
          ["wasn't", "[高|たか]くなかった", "[高|たか]くなかった です"],
        ],
        caption: "Swap the final い: くない = not, かった = was, くなかった = wasn't. For politeness, add です and leave it alone.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "✗ [高|たか]いでした → ✓ [高|たか]かったです. The past lives in the adjective, not in です.",
      },
      { type: "heading", text: "The one irregular: いい (good)" },
      {
        type: "examples",
        items: [
          { jp: "いい です ね。", en: "That's nice." },
          { jp: "よくない。", en: "It's not good.", note: "いい conjugates from よい, which is still the usual form in writing: よくない, よかった." },
          { jp: "[天気|てんき] が よかった。", en: "The weather was good." },
        ],
      },
      { type: "heading", text: "Before a noun: no change" },
      {
        type: "examples",
        items: [
          { jp: "[高|たか]い [時計|とけい]", en: "an expensive watch" },
          { jp: "[新|あたら]しい [靴|くつ]", en: "new shoes" },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Cure Dolly's view: an い-adjective works like a verb. [高|たか]い on its own is already a full sentence — “(it) is expensive.”",
      },
    ],
  },
  {
    slug: "na-adjectives",
    title: "な-adjectives: describing words that behave like nouns",
    mark: "〜な",
    summary: "They take です/だ at the end and な before a noun — plus the きれい trap.",
    source: "Genki I ch. 5; Tae Kim's Guide — “Adjectives”",
    blocks: [
      {
        type: "idea",
        text: "な-adjectives behave like **nouns**: they take です or だ to end a sentence, and **な** when they sit before a noun.",
      },
      {
        type: "pair",
        a: { jp: "この [町|まち] は {[静|しず]か} です。", en: "This town is quiet." },
        b: { jp: "{[静|しず]か な} [町|まち]", en: "a quiet town" },
        diff: "At the end of a sentence: + です/だ. Before a noun: + な. That な is where the name comes from.",
      },
      {
        type: "table",
        headers: ["", "Casual", "Polite"],
        rows: [
          ["is", "[静|しず]か だ", "[静|しず]か です"],
          ["isn't", "[静|しず]か じゃ ない", "[静|しず]か じゃ ありません"],
          ["was", "[静|しず]か だった", "[静|しず]か でした"],
          ["wasn't", "[静|しず]か じゃ なかった", "[静|しず]か じゃ ありません でした"],
        ],
        caption: "Exactly the same pattern as a noun with です and だ.",
      },
      {
        type: "examples",
        items: [
          { jp: "[好|す]き な [食|た]べ[物|もの] は [何|なん] です か？", en: "What's your favourite food?", note: "[好|す]き (liked) is a な-adjective." },
          { jp: "[元気|げんき] です か？", en: "Have you been well?", note: "Literally: are you well? Used when you haven't seen someone for a while — not a daily “how are you?”." },
          { jp: "[有名|ゆうめい] な [人|ひと]", en: "a famous person" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "きれい (pretty, clean) and きらい (disliked) end in い but are **な-adjectives**: ✗ きれくない → ✓ きれいじゃない. Learn these two traps by heart.",
      },
    ],
  },
  {
    slug: "aru-iru",
    title: "ある vs いる: saying something exists (or that you have it)",
    mark: "ある",
    summary: "いる for people and animals, ある for everything else.",
    source: "Genki I ch. 4; Tae Kim's Guide — “Existence: ある and いる”",
    blocks: [
      {
        type: "idea",
        text: "Both mean **there is / to be (somewhere)**. いる is for living things that move — people and animals. ある is for everything else.",
      },
      {
        type: "pair",
        a: { jp: "[公園|こうえん] に [子供|こども] が {いる}。", en: "There are children in the park." },
        b: { jp: "[公園|こうえん] に ベンチ が {ある}。", en: "There's a bench in the park." },
        diff: "Children move by themselves → いる. A bench doesn't → ある.",
      },
      {
        type: "examples",
        items: [
          { jp: "[猫|ねこ] が {います}。", en: "There's a cat." },
          { jp: "お[金|かね] が {ありません}。", en: "I don't have any money.", note: "ある also means “to have”: literally, money doesn't exist (for me)." },
          { jp: "[兄弟|きょうだい] が {いる}？", en: "Do you have any brothers or sisters?", note: "People you have take いる." },
        ],
      },
      {
        type: "table",
        headers: ["", "ある", "いる"],
        rows: [
          ["polite", "あります", "います"],
          ["negative", "ない", "いない"],
          ["polite negative", "ありません", "いません"],
          ["past", "あった", "いた"],
        ],
      },
      { type: "callout", kind: "mistake", text: "ある's casual negative is just **ない**: ✗ あらない." },
      {
        type: "callout",
        kind: "tip",
        text: "The standard pattern is place + に + thing + が + ある/いる: [机|つくえ]の[上|うえ]に[本|ほん]がある (there's a book on the desk).",
      },
    ],
  },
  {
    slug: "kosoado",
    title: "これ・それ・あれ・どれ: this, that, that over there, which",
    mark: "こそあど",
    summary: "One system of four prefixes for pointing at things, places and ways.",
    source: "Genki I ch. 2; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "Pointing words come in sets of four: **こ** = near me, **そ** = near you, **あ** = over there (away from both of us), **ど** = which?",
      },
      {
        type: "table",
        headers: ["", "こ · near me", "そ · near you", "あ · over there", "ど · which?"],
        rows: [
          ["thing", "これ", "それ", "あれ", "どれ"],
          ["+ noun", "この [本|ほん]", "その [本|ほん]", "あの [本|ほん]", "どの [本|ほん]"],
          ["place", "ここ", "そこ", "あそこ", "どこ"],
          ["way", "こう", "そう", "ああ", "どう"],
        ],
      },
      {
        type: "pair",
        a: { jp: "{これ} は [何|なん] です か？", en: "What's this?", note: "Something in your own hand." },
        b: { jp: "{それ} は [何|なん] です か？", en: "What's that?", note: "Something the listener is holding." },
        diff: "Japanese splits English “that” in two: それ is near the listener, あれ is away from both of you.",
      },
      {
        type: "examples",
        items: [
          { jp: "{この} [本|ほん] は [面白|おもしろ]い。", en: "This book is interesting.", note: "この, その, あの and どの always need a noun after them." },
          { jp: "トイレ は {どこ} です か？", en: "Where's the toilet?" },
          { jp: "{そう} です ね。", en: "That's right. / Let me think…" },
        ],
      },
      { type: "callout", kind: "mistake", text: "✗ これ[本|ほん] → ✓ この[本|ほん]. これ stands alone; この needs a noun after it." },
    ],
  },
  {
    slug: "question-words",
    title: "Question words: what, who, where, when, why, how",
    mark: "[何|なに]",
    summary: "Put the question word where the answer would go — nothing else moves.",
    source: "Genki I ch. 1–3; Tae Kim's Guide — “Question words”",
    blocks: [
      {
        type: "idea",
        text: "A question word sits **exactly where the answer would go** — no reordering. Then add か (or a rising tone in casual speech).",
      },
      {
        type: "pair",
        a: { jp: "[昨日|きのう] すし を [食|た]べた。", en: "I ate sushi yesterday." },
        b: { jp: "[昨日|きのう] {[何|なに]} を [食|た]べた？", en: "What did you eat yesterday?" },
        diff: "Swap the answer for the question word; everything else stays put.",
      },
      {
        type: "table",
        headers: ["Word", "Meaning", "Example"],
        rows: [
          ["[何|なに] · [何|なん]", "what", "[何|なに] を [食|た]べる？"],
          ["[誰|だれ]", "who", "[誰|だれ] が [来|き]た？"],
          ["どこ", "where", "どこ に [行|い]く？"],
          ["いつ", "when", "いつ [来|く]る？"],
          ["どうして · なんで", "why", "どうして [遅|おく]れた の？"],
          ["どう", "how", "どう [思|おも]う？"],
          ["いくら", "how much (price)", "これ は いくら です か？"],
          ["どれ · どの", "which", "どれ が いい？"],
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "[何|なに] or [何|なん]? It's なん before です, before sounds starting with d, t or n, and before counters: [何|なん]ですか, [何|なん]の[本|ほん], [何時|なんじ], [何歳|なんさい]. Otherwise it's なに: [何|なに]を, [何|なに]が.",
      },
      { type: "callout", kind: "mistake", text: "Question words take が, not は: ✗ [誰|だれ]は[来|き]た？ → ✓ [誰|だれ]が[来|き]た？" },
    ],
  },
  {
    slug: "numbers-counting",
    title: "Numbers, and counting things with counters",
    mark: "[数|かず]",
    summary: "Build any number from 1–10 and 100, then attach the right counter.",
    source: "Genki I ch. 1–2, 14; Tae Kim's Guide — “Numbers and counting”",
    blocks: [
      {
        type: "idea",
        text: "Learn 1–10, 100, 1,000 and 10,000 and you can build any number. Counting objects adds a **counter** — a small word attached to the number.",
      },
      {
        type: "table",
        headers: ["Number", "Japanese"],
        rows: [
          ["1 · 2 · 3", "[一|いち] · [二|に] · [三|さん]"],
          ["4 · 5 · 6", "[四|よん] (し) · [五|ご] · [六|ろく]"],
          ["7 · 8 · 9", "[七|なな] (しち) · [八|はち] · [九|きゅう] (く)"],
          ["10 · 100", "[十|じゅう] · [百|ひゃく]"],
          ["1,000 · 10,000", "[千|せん] · [万|まん]"],
        ],
      },
      {
        type: "text",
        text: "Bigger numbers are built like a calculator: [十一|じゅういち] is 10 + 1 = 11, [二十|にじゅう] is 2 × 10 = 20, [三十五|さんじゅうご] is 35. Note that 10,000 is one unit, [一万|いちまん], so 50,000 is [五万|ごまん]. Watch the sound changes with 100 and 1,000: [三百|さんびゃく], [六百|ろっぴゃく], [八百|はっぴゃく], [三千|さんぜん], [八千|はっせん].",
      },
      { type: "heading", text: "Counters" },
      {
        type: "table",
        headers: ["Counter", "Used for", "Example"],
        rows: [
          ["〜つ", "general things, 1–9 (10 is とお)", "ひとつ, ふたつ, みっつ"],
          ["〜[人|にん]", "people", "[一人|ひとり], [二人|ふたり], [三人|さんにん]"],
          ["〜[枚|まい]", "flat things: paper, tickets, shirts", "[二枚|にまい]"],
          ["〜[本|ほん]", "long thin things: bottles, pens", "[一本|いっぽん], [二本|にほん], [三本|さんぼん]"],
          ["〜[円|えん]", "yen", "[百円|ひゃくえん]"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "りんご を {みっつ} ください。", en: "Three apples, please.", note: "The number + counter usually goes right before the verb, with no particle." },
          { jp: "[二人|ふたり] です。", en: "Two people, please.", note: "What you say when a restaurant asks how many are in your group." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "4, 7 and 9 have two readings. よん, なな and きゅう are safest for counting, but some fixed words use the other: [四月|しがつ] (April), [七時|しちじ] (seven o'clock), [九時|くじ] (nine o'clock).",
      },
      { type: "callout", kind: "tip", text: "Forgot the counter? ひとつ, ふたつ, みっつ… works for most objects up to ten." },
    ],
  },
];
