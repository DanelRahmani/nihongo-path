import type { Lesson } from "@/content/types";

export const suffixes: Lesson[] = [
  {
    slug: "name-suffixes",
    title: "Name suffixes: さん, くん, ちゃん, さま",
    mark: "さん",
    summary: "What to put after someone's name, and never after your own.",
    source: "Genki I ch. 1; Tofugu — “Japanese honorifics”",
    register: "both",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "Japanese puts a **suffix after a name** to show the relationship, and さん is the safe default for almost anyone.",
      },
      {
        type: "table",
        headers: ["Suffix", "Used for", "Feel"],
        rows: [
          ["〜さん", "almost anyone: colleagues, strangers, shop staff", "polite, neutral"],
          ["〜くん", "boys, male friends and juniors (at work, a boss may use it for any junior, women included)", "friendly, a little familiar"],
          ["〜ちゃん", "children, close friends, family, pets", "cute, affectionate"],
          ["〜[様|さま]", "customers, letters, very respected people", "very formal"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[田中|たなか]-{さん}、 [今|いま] [少|すこ]し いい です か？", en: "Mr/Ms Tanaka, do you have a moment?" },
          { jp: "[健太|けんた]-{くん}、 [元気|げんき]？", en: "Kenta, how's it going?" },
          { jp: "あや-{ちゃん}、 [一緒|いっしょ] に [帰|かえ]ろう。", en: "Aya, let's walk home together." },
          {
            jp: "お[客|きゃく]{[様|さま]}、 こちら へ どうぞ。",
            en: "This way, please (to a customer).",
            note: "Staff address customers as お[客|きゃく][様|さま]: you'll hear it in every shop.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山田|やまだ]-{さん} は [来|き]ます か？", en: "Is Yamada-san coming?" },
        b: { jp: "[山田|やまだ]-{くん} は [来|き]ます か？", en: "Is Yamada-kun coming?", note: "Yamada is a boy or a younger man you know." },
        diff: "Same person, different relationship: さん keeps a polite distance; くん is for a boy, or a male friend or junior, and sounds familiar.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Never on your own name",
        text: "✗ スミスさんです ✓ スミスです. A name suffix shows respect for someone else, so it never goes on your own name.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Talking to someone outside your company, you drop さん even for your own boss: [田中|たなか]は[今|いま][席|せき]を[外|はず]しております (Tanaka is away from the desk right now). See the uchi/soto lesson.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "To a new colleague, Mr Kimura: [木村|きむら]＿、[明日|あした][時間|じかん]ありますか？",
            answers: ["さん"],
            explanation: "さん is the safe default for a colleague: [木村|きむら]さん.",
          },
          {
            prompt: "To your friend's little daughter, Hana: はな＿、いくつ？ (how old are you?)",
            answers: ["ちゃん"],
            explanation: "Small children get ちゃん: はなちゃん.",
          },
          {
            prompt: "Introduce yourself (you're Brown), politely: “I'm Brown.”",
            answers: ["ブラウン です。", "[私|わたし] は ブラウン です。", "[僕|ぼく] は ブラウン です。", "はじめまして、 ブラウン です。"],
            explanation: "No suffix on your own name: ブラウンです.",
          },
          {
            prompt: "Addressing a letter to a customer, Ms Ito: [伊藤|いとう]＿",
            answers: ["[様|さま]"],
            explanation: "Letters and customers take the very formal [様|さま]: [伊藤|いとう][様|さま].",
          },
        ],
      },
    ],
  },
  {
    slug: "titles",
    title: "Titles used like name suffixes: せんせい and せんぱい",
    mark: "[先生|せんせい]",
    summary: "Job titles and seniority words that follow a name, or replace it.",
    source: "Genki I ch. 1; Tofugu — “Japanese honorifics”",
    register: "polite",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "Some job titles and seniority words work like **name suffixes**, and they can also replace the name entirely.",
      },
      {
        type: "table",
        headers: ["Title", "Used for", "Example"],
        rows: [
          ["〜[先生|せんせい]", "teachers, doctors, lawyers, authors", "[山田|やまだ]-[先生|せんせい]"],
          ["〜[先輩|せんぱい]", "someone senior to you at school or in a club (at work, seniors are usually 〜さん)", "[佐藤|さとう]-[先輩|せんぱい]"],
          ["〜[部長|ぶちょう] · 〜[社長|しゃちょう]", "department head · company president", "[鈴木|すずき]-[部長|ぶちょう]"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[山田|やまだ]-{[先生|せんせい]}、 おはよう ございます。", en: "Good morning, Mr/Ms Yamada (to a teacher)." },
          {
            jp: "{[先生|せんせい]}、 [質問|しつもん] が あります。",
            en: "Excuse me (teacher), I have a question.",
            note: "Students call their teacher just [先生|せんせい]: no name, and never あなた.",
          },
          { jp: "{[先輩|せんぱい]}、 お[疲|つか]れ[様|さま] です。", en: "Thanks for today (to a senior).", note: "お[疲|つか]れ[様|さま]です is also a greeting, at any time of day." },
          { jp: "[鈴木|すずき]-{[部長|ぶちょう]} は [今日|きょう] [休|やす]み です。", en: "Mr/Ms Suzuki, our department head, is off today.", note: "Said inside the company. To a client you'd say [部長|ぶちょう]の[鈴木|すずき]: see the uchi/soto lesson." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[佐藤|さとう]-{さん}、 これ を [見|み]て ください。", en: "Sato-san, please look at this." },
        b: { jp: "[佐藤|さとう]-{[先輩|せんぱい]}、 これ を [見|み]て ください。", en: "Sato, please look at this (to a senior in your club)." },
        diff: "Same request: [先輩|せんぱい] marks Sato as senior to you and shows respect that さん alone doesn't.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No さん after a title",
        text: "✗ [山田|やまだ][先生|せんせい]さん ✓ [山田|やまだ][先生|せんせい]. [先生|せんせい] already carries the respect, so it takes no さん.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "The [先輩|せんぱい] / [後輩|こうはい] (senior / junior) relationship matters in schools, clubs and companies. The junior speaks more politely; the senior looks out for them.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Thanking your doctor, Dr Kato: [加藤|かとう]＿、ありがとうございました。",
            answers: ["[先生|せんせい]"],
            explanation: "Doctors are [先生|せんせい] too: [加藤|かとう][先生|せんせい].",
          },
          {
            prompt: "Greeting a senior student in your club, without her name: ＿、おはようございます。",
            answers: ["[先輩|せんぱい]"],
            explanation: "The title can replace the name: [先輩|せんぱい]、おはようございます.",
          },
          {
            prompt: "The company president, Mr Ono: [小野|おの]＿",
            answers: ["[社長|しゃちょう]"],
            explanation: "[社長|しゃちょう] is the company president: [小野|おの][社長|しゃちょう].",
          },
          {
            prompt: "Fix it: [中村|なかむら][先生|せんせい]さん",
            answers: ["[中村|なかむら]-[先生|せんせい]"],
            explanation: "[先生|せんせい] already shows respect, so drop さん: [中村|なかむら][先生|せんせい].",
          },
        ],
      },
    ],
  },
  {
    slug: "tachi-plural",
    title: "Talking about groups: 〜たち and 〜ら",
    mark: "たち",
    summary: "Japanese has no plural, but it can say “and the others”.",
    source: "Genki I ch. 1; Tae Kim's Guide",
    register: "plain",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "Japanese nouns have no plural form, but **〜たち** after a person means “and their group” or “people like them”.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし]{たち}", en: "we, us" },
          { jp: "[子供|こども]{たち}", en: "the children" },
          { jp: "[田中|たなか]-さん-{たち}", en: "Tanaka and the others", note: "Not several Tanakas: Tanaka and the group they're with." },
          {
            jp: "[彼|かれ]{ら}",
            en: "they",
            note: "〜ら is less respectful than たち, so don't use it for people you look up to. [彼|かれ]ら is common in writing and among friends; in polite speech people usually say あの[人|ひと]たち.",
          },
          { jp: "[先生|せんせい]{[方|がた]}", en: "the teachers (respectful)", note: "〜[方|がた] is the polite たち." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[猫|ねこ] が いる。", en: "There's a cat. / There are cats." },
        b: { jp: "[猫|ねこ] が {[三匹|さんびき]} いる。", en: "There are three cats.", note: "〜[匹|ひき] counts small animals." },
        diff: "Without a number, Japanese doesn't say whether it's one or many. Add a number when it matters.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "たち is for people",
        text: "✗ [本|ほん]たち ✓ [本|ほん]. たち is for people (and sometimes pets or things treated like people); objects don't take it.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[連休|れんきゅう]、 どこか [行|い]く？", en: "Going anywhere over the long weekend?" },
          { speaker: "B", jp: "[会社|かいしゃ] の [人|ひと]{たち} と キャンプ に [行|い]く。", en: "I'm going camping with some people from work." },
          { speaker: "A", jp: "いい ね。 [何人|なんにん] で？", en: "Nice. How many of you?" },
          { speaker: "B", jp: "[五人|ごにん]。", en: "Five." },
        ],
        note: "[人|ひと] alone could be one person or many; [人|ひと]たち makes it a group.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“The teachers came”: [先生|せんせい]＿が[来|き]た。",
            answers: ["たち", "[方|がた]"],
            explanation: "[先生|せんせい]たち, or more respectfully [先生方|せんせいがた].",
          },
          {
            prompt: "“Yamada and the others went home first”: [山田|やまだ]さん＿は[先|さき]に[帰|かえ]った。",
            answers: ["たち"],
            explanation: "たち after a name means that person and their group: [山田|やまだ]さんたち.",
          },
          {
            prompt: "Fix it: [車|くるま]たちが[多|おお]い。 (There are lots of cars.)",
            answers: ["[車|くるま] が [多|おお]い。"],
            explanation: "Cars aren't people, so no たち: [車|くるま]が[多|おお]い.",
          },
          {
            prompt: "“they” for a group of women: [彼女|かのじょ]＿",
            answers: ["ら", "たち"],
            explanation: "Both are used: [彼女|かのじょ]ら and [彼女|かのじょ]たち.",
          },
        ],
      },
    ],
  },
  {
    slug: "jin-go",
    title: "Nationality and language: 〜じん and 〜ご",
    mark: "[語|ご]",
    summary: "Country + じん = its people; country + ご = its language.",
    source: "Genki I ch. 1",
    register: "polite",
    kinds: ["suffixes"],
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
          { jp: "[私|わたし] は オランダ{[人|じん]} です。", en: "I'm Dutch." },
          { jp: "[日本|にほん]{[語|ご]} が [少|すこ]し [話|はな]せます。", en: "I can speak a little Japanese." },
          { jp: "[妻|つま] は [中国|ちゅうごく]{[人|じん]} です。", en: "My wife is Chinese." },
          { jp: "フランス{[語|ご]} を [勉強|べんきょう] して います。", en: "I'm studying French." },
        ],
      },
      {
        type: "pair",
        a: { jp: "スペイン{[人|じん]} です。", en: "I'm Spanish." },
        b: { jp: "スペイン{[語|ご]} です。", en: "It's Spanish (the language)." },
        diff: "[人|じん] is the person; [語|ご] is the language.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "English is [英語|えいご]",
        text: "✗ アメリカ[語|ご] ✓ [英語|えいご]. English is [英語|えいご] wherever it's spoken: there's no アメリカ[語|ご] or イギリス[語|ご]. (American English is アメリカ[英語|えいご].)",
      },
      {
        type: "callout",
        kind: "culture",
        text: "[何人|なにじん]ですか (what nationality are you?) can sound blunt. どちらからですか (where are you from?) is the gentler question. Careful: the same kanji read [何人|なんにん] means “how many people”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I'm Canadian”: カナダ＿です。",
            answers: ["[人|じん]", "カナダ[人|じん]"],
            explanation: "Country + [人|じん]: カナダ[人|じん].",
          },
          {
            prompt: "“Korean (the language)”: [韓国|かんこく]＿",
            answers: ["[語|ご]", "[韓国語|かんこくご]"],
            explanation: "Country + [語|ご]: [韓国語|かんこくご].",
          },
          {
            prompt: "“Do you speak English?”: ＿が[話|はな]せますか？",
            answers: ["[英語|えいご]"],
            explanation: "English is [英語|えいご], wherever it's spoken.",
          },
          {
            prompt: "“I'm studying German”: ドイツ＿を[勉強|べんきょう]しています。",
            answers: ["[語|ご]", "ドイツ[語|ご]"],
            explanation: "A language takes [語|ご]: ドイツ[語|ご].",
          },
        ],
      },
    ],
  },
  {
    slug: "chuu-juu",
    title: "〜ちゅう vs 〜じゅう: “in the middle of” vs “all through”",
    mark: "[中|ちゅう]",
    summary: "One kanji, two readings as a suffix, and two different meanings.",
    source: "Genki II ch. 20 (〜中); IMABI — 〜中",
    register: "both",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "One suffix, two readings: **〜[中|ちゅう]** means *during* or *in the middle of*, and **〜[中|じゅう]** means *all through* a time or *all over* a place.",
      },
      {
        type: "examples",
        items: [
          { jp: "[電話|でんわ]{[中|ちゅう]} です。", en: "(They're) on the phone." },
          { jp: "[午前|ごぜん]{[中|ちゅう]} は [家|いえ] に います。", en: "I'm at home during the morning." },
          { jp: "[世界|せかい]{[中|じゅう]} で [人気|にんき] が ある。", en: "It's popular all over the world." },
          { jp: "[一晩|ひとばん]{[中|じゅう]} [雨|あめ] が [降|ふ]って いた。", en: "It rained all night." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[夏休|なつやす]み{[中|ちゅう]} に [京都|きょうと] へ [行|い]った。", en: "I went to Kyoto during the summer holidays." },
        b: { jp: "[夏休|なつやす]み{[中|じゅう]} [雨|あめ] だった。", en: "It rained all through the summer holidays." },
        diff: "Same word, two readings: ちゅう picks a time within the holidays, じゅう covers all of them.",
      },
      {
        type: "table",
        headers: ["Reading", "Examples"],
        rows: [
          ["ちゅう · in the middle of", "[勉強中|べんきょうちゅう], [工事中|こうじちゅう], [営業中|えいぎょうちゅう]"],
          ["ちゅう · during, within", "[午前中|ごぜんちゅう], [今週中|こんしゅうちゅう], [授業中|じゅぎょうちゅう]"],
          ["じゅう · all through, all over", "[一年中|いちねんじゅう], [日本中|にほんじゅう], [学校中|がっこうじゅう]"],
        ],
        caption: "Time words have to be learned one by one: [今日中|きょうじゅう] (by the end of today) takes じゅう.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "All day is いちにちじゅう",
        text: "✗ [一日中|いちにちちゅう] ✓ [一日中|いちにちじゅう]. “All day long” covers the whole day, so it takes じゅう; ちゅう is for an activity you're in the middle of, or a time within a period.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Shop signs use ちゅう all the time: [営業中|えいぎょうちゅう] (open), [準備中|じゅんびちゅう] (getting ready, so closed for now), [工事中|こうじちゅう] (under construction).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I'm driving, so I can't talk”: [運転|うんてん]＿です。 (Type the ending in hiragana.)",
            answers: ["ちゅう"],
            explanation: "In the middle of an activity: [運転中|うんてんちゅう].",
          },
          {
            prompt: "“all over the house”: [家|いえ]＿ (Type the ending in hiragana.)",
            answers: ["じゅう"],
            explanation: "All over a place: [家中|いえじゅう].",
          },
          {
            prompt: "The phone is busy (someone is talking): [話|はな]し＿です。 (Type the ending in hiragana.)",
            answers: ["ちゅう"],
            explanation: "In the middle of talking: [話|はな]し[中|ちゅう], the word for a busy line.",
          },
          {
            prompt: "“all over the classroom”: [教室|きょうしつ]＿ (Type the ending in hiragana.)",
            answers: ["じゅう"],
            explanation: "All over a place: [教室中|きょうしつじゅう].",
          },
        ],
      },
    ],
  },
  {
    slug: "ya-shops",
    title: "〜や: shops and the people who run them",
    mark: "[屋|や]",
    summary: "Product + や = the shop that sells it.",
    source: "Genki I ch. 4 vocabulary; IMABI — 〜屋",
    register: "both",
    kinds: ["suffixes"],
    blocks: [
      { type: "idea", text: "**〜[屋|や]** names a **shop** by what it sells or does and, casually, the person who runs it." },
      {
        type: "examples",
        items: [
          { jp: "[駅|えき] の [前|まえ] に [本|ほん]{[屋|や]} が ある。", en: "There's a bookshop in front of the station." },
          { jp: "[毎朝|まいあさ] パン{[屋|や]} に [寄|よ]ります。", en: "I stop at the bakery every morning." },
          { jp: "[花|はな]{[屋|や]} で バラ を [買|か]った。", en: "I bought roses at the florist." },
          { jp: "[今夜|こんや]、 [居酒|いざか]{[屋|や]} に [行|い]かない？", en: "Want to go to an izakaya (a Japanese pub) tonight?" },
          { jp: "{[八百屋|やおや]} は [野菜|やさい] の [店|みせ] です。", en: "A yaoya is a greengrocer.", note: "Literally “800 shop”: it sells countless things." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[本屋|ほんや]", en: "a bookshop" },
        b: { jp: "[本屋|ほんや]{さん}", en: "the bookshop / the bookseller" },
        diff: "Adding さん makes it friendlier, and can mean the person who runs the shop.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Only for shops named by what they sell",
        text: "✗ コンビニ[屋|や] ✓ コンビニ. [屋|や] names a shop by what it sells or does; a kind of shop with its own name (コンビニ, スーパー, デパート) takes no [屋|や].",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Signs and formal writing use 〜[店|てん] instead: [書店|しょてん] for a bookshop. On its own, [屋|や] for a person can sound a little blunt, which is why people add さん.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "〜[屋|や] can also describe someone's character: [恥|は]ずかしがり[屋|や] (a shy person), がんばり[屋|や] (a hard worker).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“a fishmonger”: [魚|さかな]＿",
            answers: ["[屋|や]", "[屋|や]さん"],
            explanation: "Fish + [屋|や]: [魚屋|さかなや].",
          },
          {
            prompt: "“a shoe shop”: [靴|くつ]＿",
            answers: ["[屋|や]", "[屋|や]さん"],
            explanation: "Shoes + [屋|や]: [靴屋|くつや].",
          },
          {
            prompt: "The friendly way to say “the butcher's”: [肉|にく]＿",
            answers: ["[屋|や]さん"],
            explanation: "Add さん for a friendlier feel: [肉屋|にくや]さん.",
          },
          {
            prompt: "Fix it: スーパー[屋|や]に[行|い]く。",
            answers: ["スーパー に [行|い]く。", "スーパー へ [行|い]く。"],
            explanation: "スーパー is already the shop's name, so no [屋|や]: スーパーに[行|い]く.",
          },
        ],
      },
    ],
  },
  {
    slug: "sa-nouns",
    title: "〜さ: turning adjectives into nouns (“-ness”)",
    mark: "さ",
    summary: "[高|たか]い (high) → [高|たか]さ (height).",
    source: "Genki II ch. 16 vocabulary; Tae Kim's Guide",
    register: "both",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "Swap an い-adjective's final い for **さ**, or add さ straight to a な-adjective, and you get a noun: [高|たか]い (high) → [高|たか]さ (height).",
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
          ["[大切|たいせつ] · important", "[大切|たいせつ]さ · importance"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "この [山|やま] の [高|たか]{さ} は [何|なん]メートル です か？", en: "How high is this mountain?" },
          { jp: "[彼女|かのじょ] の [優|やさ]し{さ} に [感動|かんどう] した。", en: "I was moved by her kindness." },
          { jp: "[部屋|へや] の [広|ひろ]{さ} を [測|はか]りました。", en: "I measured the size of the room." },
          { jp: "[東京|とうきょう] の [夏|なつ] の [暑|あつ]{さ} に びっくり した。", en: "The heat of a Tokyo summer took me by surprise." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[重|おも]い [荷物|にもつ]", en: "a heavy bag" },
        b: { jp: "[荷物|にもつ] の [重|おも]{さ}", en: "the weight of the bag" },
        diff: "The adjective describes the bag; さ turns the quality itself into a noun.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "いい becomes よさ",
        text: "✗ いいさ ✓ よさ (good points). いい takes its older form よい before さ. And な-adjectives take no な: [大切|たいせつ]さ, not [大切|たいせつ]なさ.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "どっち の カバン に する？", en: "Which bag are you going with?" },
          { speaker: "B", jp: "[大|おお]きさ は こっち が いい けど、 [重|おも]さ が ちょっと…", en: "This one's the better size, but the weight is a bit…" },
          { speaker: "A", jp: "じゃあ、 あっち は？", en: "Then what about that one?" },
        ],
        note: "[大|おお]きさ and [重|おも]さ talk about the bag's size and weight as things in themselves.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Measurements are the most common use: [高|たか]さ, [長|なが]さ, [広|ひろ]さ (area), [重|おも]さ.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“depth”: [深|ふか]い → ＿",
            answers: ["[深|ふか]さ"],
            explanation: "Drop い, add さ: [深|ふか]さ.",
          },
          {
            prompt: "“strength”: [強|つよ]い → ＿",
            answers: ["[強|つよ]さ"],
            explanation: "Drop い, add さ: [強|つよ]さ.",
          },
          {
            prompt: "“good points, merit”: いい → ＿",
            answers: ["よさ", "[良|よ]さ"],
            explanation: "いい uses its older form よい: よさ.",
          },
          {
            prompt: "“convenience”: [便利|べんり] → ＿",
            answers: ["[便利|べんり]さ"],
            explanation: "A な-adjective just adds さ: [便利|べんり]さ.",
          },
        ],
      },
    ],
  },
  {
    slug: "o-go-prefixes",
    title: "お〜 and ご〜: the polite prefixes",
    mark: "お・ご",
    summary: "Small prefixes that make a word polite, mostly for other people's things.",
    source: "Genki I ch. 3–4 vocabulary; Tae Kim's Guide — “Honorifics”",
    register: "both",
    kinds: ["suffixes"],
    blocks: [
      {
        type: "idea",
        text: "**お〜** and **ご〜** in front of a noun make it polite or refined: お usually goes on native Japanese words, ご on words borrowed from Chinese.",
      },
      {
        type: "examples",
        items: [
          { jp: "{お}[茶|ちゃ] を どうぞ。", en: "Have some tea." },
          { jp: "{ご}[家族|かぞく] は お[元気|げんき] です か？", en: "Is your family well?", note: "Polite when talking about someone else's family." },
          { jp: "{お}[名前|なまえ] は？", en: "What's your name?", note: "You'd never use お[名前|なまえ] for your own name." },
          { jp: "{ご}[飯|はん]、 [食|た]べた？", en: "Have you eaten?", note: "ご[飯|はん] almost always carries its ご." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[仕事|しごと] は [楽|たの]しい です か？", en: "Is (your) work fun?" },
        b: { jp: "{お}[仕事|しごと] は [楽|たの]しい です か？", en: "Is your work fun?" },
        diff: "お adds respect for the listener and their work; without it the question sounds plainer, fine between friends.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not on your own things",
        text: "✗ [私|わたし]のお[名前|なまえ] ✓ [私|わたし]の[名前|なまえ]. Don't add お or ご to your own things when you describe them. (Set words like ご[飯|はん], お[茶|ちゃ] and お[金|かね] keep their prefix even when they're yours.)",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Some words almost always carry the prefix (ご[飯|はん], お[茶|ちゃ], お[金|かね]) and sound rough without it. Others are polite only about *other* people: ご[家族|かぞく], お[仕事|しごと]. And many everyday Chinese-origin words take お, not ご: お[茶|ちゃ], お[電話|でんわ], お[時間|じかん].",
      },
      { type: "callout", kind: "tip", text: "Katakana loanwords rarely take お: コーヒー, not おコーヒー. A few do, like おビール in a restaurant." },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Ask politely: “Is your father well?” ＿[父|とう]さんはお[元気|げんき]ですか？",
            answers: ["お"],
            explanation: "Someone else's father: お[父|とう]さん.",
          },
          {
            prompt: "“your address”, politely: ＿[住所|じゅうしょ]",
            answers: ["ご"],
            explanation: "[住所|じゅうしょ] is a Chinese-origin word, so ご: ご[住所|じゅうしょ].",
          },
          {
            prompt: "“your time”, politely (one of the exceptions): ＿[時間|じかん]",
            answers: ["お"],
            explanation: "[時間|じかん] is Chinese-origin but takes お: お[時間|じかん].",
          },
          {
            prompt: "Fix it (about your own family): [私|わたし]のご[家族|かぞく]は[四人|よにん]です。",
            answers: [
              "[私|わたし] の [家族|かぞく] は [四人|よにん] です。",
              "[私|わたし] の [家族|かぞく] は 4[人|にん] です。",
              "[家族|かぞく] は [四人|よにん] です。",
              "[家族|かぞく] は 4[人|にん] です。",
            ],
            explanation: "Your own family takes no ご: [私|わたし]の[家族|かぞく]は[四人|よにん]です.",
          },
        ],
      },
    ],
  },
];
