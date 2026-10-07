import type { Lesson } from "@/content/types";

export const suffixes: Lesson[] = [
  {
    slug: "name-suffixes",
    title: "Name suffixes: さん, くん, ちゃん, さま",
    mark: "さん",
    summary: "What to put after someone's name — and never after your own.",
    source: "Genki I ch. 1; Tofugu — “Japanese honorifics”",
    blocks: [
      {
        type: "idea",
        text: "Japanese adds a **suffix after names** to show the relationship. さん is the safe default for almost anyone.",
      },
      {
        type: "table",
        headers: ["Suffix", "Used for", "Feel"],
        rows: [
          ["〜さん", "almost anyone: colleagues, strangers, shop staff", "polite, neutral"],
          ["〜くん", "boys, younger men, male juniors", "friendly, a little familiar"],
          ["〜ちゃん", "children, close friends, family, pets", "cute, affectionate"],
          ["〜[様|さま]", "customers, letters, very respected people", "very formal"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[田中|たなか]-さん、おはよう ございます。", en: "Good morning, Mr/Ms Tanaka." },
          { jp: "[健太|けんた]-くん、[元気|げんき]？", en: "Kenta, how's it going?" },
          { jp: "お[客|きゃく][様|さま]", en: "customer (honoured guest)", note: "Staff call customers this — you'll hear it in every shop." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Never put a suffix on **your own** name: ✗ スミスさんです → ✓ スミスです.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Talking to someone outside your company, you drop さん even for your own boss: [田中|たなか]は[今|いま][席|せき]を[外|はず]しております (Tanaka is away from the desk right now). See the uchi/soto lesson.",
      },
    ],
  },
  {
    slug: "titles",
    title: "Titles used like name suffixes: せんせい and せんぱい",
    mark: "[先生|せんせい]",
    summary: "Job titles and seniority words that follow a name — or replace it.",
    source: "Genki I ch. 1; Tofugu — “Japanese honorifics”",
    blocks: [
      {
        type: "idea",
        text: "Some job titles and relationship words work as **suffixes** — or replace the name entirely.",
      },
      {
        type: "table",
        headers: ["Title", "Used for", "Example"],
        rows: [
          ["〜[先生|せんせい]", "teachers, doctors, lawyers, authors", "[山田|やまだ]-[先生|せんせい]"],
          ["〜[先輩|せんぱい]", "someone senior to you at school, in a club or at work", "[佐藤|さとう]-[先輩|せんぱい]"],
          ["〜[部長|ぶちょう] · 〜[社長|しゃちょう]", "department head · company president", "[鈴木|すずき]-[部長|ぶちょう]"],
        ],
      },
      {
        type: "examples",
        items: [
          {
            jp: "[先生|せんせい]、[質問|しつもん] が あります。",
            en: "Excuse me (teacher), I have a question.",
            note: "Students call their teacher just [先生|せんせい] — no name, and never あなた.",
          },
          { jp: "[先輩|せんぱい]、お[疲|つか]れ[様|さま] です。", en: "Thanks for today, (senpai)." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "[先生|せんせい] already carries the respect — don't add さん: ✗ [山田|やまだ][先生|せんせい]さん.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "The [先輩|せんぱい] / [後輩|こうはい] (senior / junior) relationship matters in schools, clubs and companies. The junior speaks more politely; the senior looks out for them.",
      },
    ],
  },
  {
    slug: "tachi-plural",
    title: "Talking about groups: 〜たち and 〜ら",
    mark: "たち",
    summary: "Japanese has no plural — but it can say “and the others”.",
    source: "Genki I ch. 1; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "Japanese nouns have no plural form. **〜たち** after a person means “and their group” or “people like them”.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし]たち", en: "we, us" },
          { jp: "[子供|こども]たち", en: "the children" },
          { jp: "[田中|たなか]-さん-たち", en: "Tanaka and the others", note: "Not several Tanakas — Tanaka and the group they're with." },
          { jp: "[彼|かれ]ら", en: "they", note: "〜ら is less respectful than たち (don't use it for people you look up to), but [彼|かれ]ら itself is the normal, neutral word for “they”." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[猫|ねこ] が いる。", en: "There's a cat. / There are cats." },
        b: { jp: "[猫|ねこ] が [三匹|さんびき] いる。", en: "There are three cats." },
        diff: "Without a number, Japanese doesn't say whether it's one or many. Add a number when it matters.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Don't add たち to objects: ✗ [本|ほん]たち. It's for people (and sometimes pets or things treated like people).",
      },
    ],
  },
  {
    slug: "jin-go",
    title: "Nationality and language: 〜じん and 〜ご",
    mark: "[語|ご]",
    summary: "Country + じん = its people; country + ご = its language.",
    source: "Genki I ch. 1",
    blocks: [
      {
        type: "idea",
        text: "Add **[人|じん]** to a country for its people, and **[語|ご]** for its language.",
      },
      {
        type: "table",
        headers: ["Country", "Person · 〜[人|じん]", "Language · 〜[語|ご]"],
        rows: [
          ["Japan · [日本|にほん]", "[日本人|にほんじん]", "[日本語|にほんご]"],
          ["Netherlands · オランダ", "オランダ[人|じん]", "オランダ[語|ご]"],
          ["UK · イギリス", "イギリス[人|じん]", "[英語|えいご]"],
          ["USA · アメリカ", "アメリカ[人|じん]", "[英語|えいご]"],
          ["China · [中国|ちゅうごく]", "[中国人|ちゅうごくじん]", "[中国語|ちゅうごくご]"],
          ["France · フランス", "フランス[人|じん]", "フランス[語|ご]"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] は オランダ[人|じん] です。", en: "I'm Dutch." },
          { jp: "[日本語|にほんご] が [少|すこ]し [話|はな]せます。", en: "I can speak a little Japanese." },
        ],
      },
      { type: "callout", kind: "mistake", text: "English is [英語|えいご] — not ✗ アメリカ[語|ご] or ✗ イギリス[語|ご]." },
      {
        type: "callout",
        kind: "culture",
        text: "[何人|なにじん]ですか (what nationality are you?) can sound blunt. どちらからですか (where are you from?) is the gentler question.",
      },
    ],
  },
  {
    slug: "chuu-juu",
    title: "〜ちゅう vs 〜じゅう: “in the middle of” vs “all through”",
    mark: "[中|ちゅう]",
    summary: "One kanji, two readings as a suffix — and two different meanings.",
    source: "Genki II ch. 20 (〜中); IMABI — 〜中",
    blocks: [
      {
        type: "idea",
        text: "One suffix, two readings: **〜ちゅう** means *in the middle of* something; **〜じゅう** means *all through* a time or place. In kanji they look identical.",
      },
      {
        type: "pair",
        a: { jp: "[会議中|かいぎちゅう]", en: "in a meeting (right now)" },
        b: { jp: "[一日中|いちにちじゅう]", en: "all day long" },
        diff: "ちゅう: busy in the middle of something. じゅう: across the whole time or place.",
      },
      {
        type: "examples",
        items: [
          { jp: "[電話中|でんわちゅう] です。", en: "(They're) on the phone." },
          { jp: "[世界中|せかいじゅう] で [人気|にんき] が ある。", en: "It's popular all over the world." },
          { jp: "[夏休|なつやす]み[中|ちゅう] に [旅行|りょこう] した。", en: "I travelled during the summer holidays." },
        ],
      },
      {
        type: "table",
        headers: ["Reading", "Examples"],
        rows: [
          ["ちゅう · in the middle of", "[勉強中|べんきょうちゅう], [工事中|こうじちゅう], [営業中|えいぎょうちゅう]"],
          ["じゅう · all through", "[一年中|いちねんじゅう], [日本中|にほんじゅう], [一晩中|ひとばんじゅう]"],
        ],
        caption: "[営業中|えいぎょうちゅう] on a shop door means “open for business”.",
      },
    ],
  },
  {
    slug: "ya-shops",
    title: "〜や: shops and the people who run them",
    mark: "[屋|や]",
    summary: "Product + や = the shop that sells it.",
    source: "Genki I ch. 4 vocabulary; IMABI — 〜屋",
    blocks: [
      { type: "idea", text: "**〜[屋|や]** after a product names the **shop** that sells it — and, casually, the person who runs it." },
      {
        type: "examples",
        items: [
          { jp: "[本屋|ほんや]", en: "bookshop" },
          { jp: "パン[屋|や]", en: "bakery" },
          { jp: "[花屋|はなや]", en: "florist" },
          { jp: "[居酒屋|いざかや]", en: "izakaya (Japanese pub)" },
          { jp: "[八百屋|やおや]", en: "greengrocer", note: "Literally “800 shop” — it sells countless things." },
        ],
      },
      {
        type: "text",
        text: "Add さん and it becomes the shopkeeper — [本屋|ほんや]さん (the bookseller) — or simply a friendlier way to say the shop itself.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "〜[屋|や] can also describe someone's character: [恥|は]ずかしがり[屋|や] (a shy person), [頑張|がんば]り[屋|や] (a hard worker).",
      },
    ],
  },
  {
    slug: "sa-nouns",
    title: "〜さ: turning adjectives into nouns (“-ness”)",
    mark: "さ",
    summary: "[高|たか]い (high) → [高|たか]さ (height).",
    source: "Genki II ch. 16 vocabulary; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "Drop the final い (or the な) and add **さ** to turn an adjective into a noun: [高|たか]い (high) → [高|たか]さ (height).",
      },
      {
        type: "table",
        headers: ["Adjective", "〜さ noun"],
        rows: [
          ["[高|たか]い · high", "[高|たか]さ · height"],
          ["[長|なが]い · long", "[長|なが]さ · length"],
          ["[重|おも]い · heavy", "[重|おも]さ · weight"],
          ["[大|おお]きい · big", "[大|おお]きさ · size"],
          ["[優|やさ]しい · kind", "[優|やさ]しさ · kindness"],
          ["[静|しず]か · quiet", "[静|しず]かさ · quietness"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "この [山|やま] の [高|たか]さ は [何|なん]メートル です か？", en: "How high is this mountain?" },
          { jp: "[彼女|かのじょ] の [優|やさ]しさ に [感動|かんどう] した。", en: "I was moved by her kindness." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Measurements are the most common use: [高|たか]さ, [長|なが]さ, [広|ひろ]さ (area), [重|おも]さ. いい becomes よさ (good points, merit).",
      },
    ],
  },
  {
    slug: "o-go-prefixes",
    title: "お〜 and ご〜: the polite prefixes",
    mark: "お・ご",
    summary: "Small prefixes that make a word polite — mostly for other people's things.",
    source: "Genki I ch. 3–4 vocabulary; Tae Kim's Guide — “Honorifics”",
    blocks: [
      {
        type: "idea",
        text: "**お〜** and **ご〜** in front of a noun make it polite or refined. お usually goes on native Japanese words, ご on words borrowed from Chinese — but many everyday Chinese-origin words take お: お[茶|ちゃ], お[電話|でんわ], お[時間|じかん].",
      },
      {
        type: "examples",
        items: [
          { jp: "お[茶|ちゃ]", en: "tea" },
          { jp: "お[水|みず]", en: "water" },
          { jp: "ご[飯|はん]", en: "rice, a meal" },
          { jp: "ご[家族|かぞく]", en: "(your) family", note: "Polite when talking about someone else's family." },
          { jp: "お[名前|なまえ] は？", en: "What's your name?", note: "You'd never use お[名前|なまえ] for your own name." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "Some words almost always carry the prefix — ご[飯|はん], お[茶|ちゃ], お[金|かね] — and sound rough without it. Others are polite only about *other* people: ご[家族|かぞく], お[仕事|しごと].",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Don't add お/ご to your own things when describing them: ✗ [私|わたし]のお[名前|なまえ] → ✓ [私|わたし]の[名前|なまえ].",
      },
      { type: "callout", kind: "tip", text: "Katakana loanwords almost never take お: ✗ おコーヒー." },
    ],
  },
];
