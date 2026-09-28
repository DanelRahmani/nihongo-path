import type { Lesson } from "@/content/types";

export const verbs: Lesson[] = [
  {
    slug: "verb-groups",
    title: "The three verb groups: る-verbs, う-verbs and two irregulars",
    mark: "[動詞|どうし]",
    summary: "Know a verb's group and you know how every form is built.",
    source: "Genki I ch. 3; Tae Kim's Guide — “Verb basics”",
    blocks: [
      {
        type: "idea",
        text: "Every verb's dictionary form ends in an **u-sound**. How it changes depends on its group — and there are only three.",
      },
      {
        type: "table",
        headers: ["Group", "How to spot it", "Examples"],
        rows: [
          ["る-verbs (ichidan)", "end in -iru or -eru", "[食|た]べる, [見|み]る, [起|お]きる, [寝|ね]る"],
          ["う-verbs (godan)", "everything else", "[飲|の]む, [書|か]く, [話|はな]す, [待|ま]つ, [買|か]う"],
          ["irregular", "just two", "する (do), [来|く]る (come)"],
        ],
      },
      {
        type: "text",
        text: "る-verbs are the easy ones: drop る and add the ending. う-verbs change their last kana. The two irregulars you simply memorise — and する is everywhere, because it turns nouns into verbs: [勉強|べんきょう]する (study), [電話|でんわ]する (phone).",
      },
      { type: "heading", text: "The trap: う-verbs that look like る-verbs" },
      {
        type: "examples",
        items: [
          { jp: "[帰|かえ]る", en: "to go home — う-verb" },
          { jp: "[入|はい]る", en: "to enter — う-verb" },
          { jp: "[走|はし]る", en: "to run — う-verb" },
          { jp: "[知|し]る", en: "to get to know — う-verb" },
          { jp: "[切|き]る", en: "to cut — う-verb" },
        ],
      },
      {
        type: "text",
        text: "These end in -iru or -eru but conjugate like う-verbs: [帰|かえ]ります, not ✗ [帰|かえ]ます. Any verb ending in -aru, -uru or -oru is a う-verb — except the two irregulars する and [来|く]る.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "When you learn a new -iru/-eru verb, check its ます form once: [食|た]べます means る-verb, [帰|かえ]ります means う-verb.",
      },
    ],
  },
  {
    slug: "masu-form",
    title: "Polite verbs: the ます form (present, negative, past)",
    mark: "ます",
    summary: "Stem + ます / ません / ました / ませんでした.",
    source: "Genki I ch. 3–4; Tae Kim's Guide — “Polite form and verb stems”",
    blocks: [
      {
        type: "idea",
        text: "The ます form is the **polite** way to end with a verb. Take the verb's **stem** and add ます, ません, ました or ませんでした.",
      },
      {
        type: "table",
        headers: ["Group", "Dictionary", "Stem", "ます form"],
        rows: [
          ["る-verb", "[食|た]べる", "[食|た]べ", "[食|た]べます"],
          ["う-verb", "[飲|の]む", "[飲|の]み", "[飲|の]みます"],
          ["う-verb", "[書|か]く", "[書|か]き", "[書|か]きます"],
          ["irregular", "する", "し", "します"],
          ["irregular", "[来|く]る", "[来|き]", "[来|き]ます"],
        ],
        caption: "る-verbs: drop る. う-verbs: change the last u-sound to its i-sound (む → み, く → き).",
      },
      {
        type: "table",
        headers: ["", "Ending", "Example"],
        rows: [
          ["present / future", "〜ます", "[飲|の]みます — I drink / will drink"],
          ["negative", "〜ません", "[飲|の]みません — I don't drink"],
          ["past", "〜ました", "[飲|の]みました — I drank"],
          ["past negative", "〜ませんでした", "[飲|の]みませんでした — I didn't drink"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[毎朝|まいあさ] コーヒー を [飲|の]みます。", en: "I drink coffee every morning." },
          {
            jp: "[明日|あした] [東京|とうきょう] に [行|い]きます。",
            en: "I'll go to Tokyo tomorrow.",
            note: "No separate future tense: the present form covers it.",
          },
          { jp: "[昨日|きのう] は [勉強|べんきょう] しませんでした。", en: "I didn't study yesterday." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Stem + ましょう = let's: [行|い]きましょう. Stem + ませんか = won't you…? — a polite invitation: [一緒|いっしょ]に[食|た]べませんか.",
      },
    ],
  },
  {
    slug: "nai-form",
    title: "Casual negative: the ない form",
    mark: "ない",
    summary: "[食|た]べない, [飲|の]まない, しない — “don't” in casual speech.",
    source: "Genki I ch. 8; Tae Kim's Guide — “Negative verbs”",
    blocks: [
      { type: "idea", text: "The casual way to say *don't* is the ない form: [食|た]べ**ない**, [飲|の]ま**ない**." },
      {
        type: "table",
        headers: ["Group", "Rule", "Dictionary → ない"],
        rows: [
          ["る-verb", "drop る, add ない", "[食|た]べる → [食|た]べない"],
          ["う-verb", "u-sound → a-sound, add ない", "[飲|の]む → [飲|の]まない"],
          ["う-verb ending in う", "う → わ, add ない", "[買|か]う → [買|か]わない"],
          ["irregular", "memorise", "する → しない, [来|く]る → [来|こ]ない"],
          ["special", "ある", "ある → ない"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[肉|にく] は [食|た]べない。", en: "I don't eat meat." },
          { jp: "[今日|きょう] は [行|い]かない。", en: "I'm not going today." },
          { jp: "バス が まだ [来|こ]ない。", en: "The bus still isn't here.", note: "Literally: the bus still doesn't come." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "う-verbs ending in う don't become あ: ✗ [買|か]あない → ✓ [買|か]わない. An old hidden w sound comes back.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "ない conjugates like an い-adjective: [食|た]べなかった = didn't eat. Adding です makes it softly polite: [食|た]べないです.",
      },
    ],
  },
  {
    slug: "te-form",
    title: "The て form: one chart that links actions",
    mark: "て",
    summary: "The sound-change chart behind て, た, ている, てください and more.",
    source: "Genki I ch. 6; Tae Kim's Guide — “The te-form”",
    blocks: [
      {
        type: "idea",
        text: "The て form links actions (“…and then…”) and powers many patterns. る-verbs just take て; う-verbs change by their **last kana** — one chart covers them all.",
      },
      {
        type: "table",
        headers: ["Verb ends in", "Becomes", "Examples"],
        rows: [
          ["う · つ · る", "って", "[買|か]う → [買|か]って, [待|ま]つ → [待|ま]って, [帰|かえ]る → [帰|かえ]って"],
          ["む · ぶ · ぬ", "んで", "[飲|の]む → [飲|の]んで, [遊|あそ]ぶ → [遊|あそ]んで, [死|し]ぬ → [死|し]んで"],
          ["く", "いて", "[書|か]く → [書|か]いて"],
          ["ぐ", "いで", "[泳|およ]ぐ → [泳|およ]いで"],
          ["す", "して", "[話|はな]す → [話|はな]して"],
          ["る-verbs", "drop る, add て", "[食|た]べる → [食|た]べて, [見|み]る → [見|み]て"],
          ["exceptions", "", "[行|い]く → [行|い]って, する → して, [来|く]る → [来|き]て"],
        ],
        caption: "Many learners memorise this chart by singing it — search for “te form song”.",
      },
      { type: "heading", text: "Linking actions: “and then”" },
      {
        type: "examples",
        items: [
          {
            jp: "[朝|あさ] [起|お]きて、シャワー を [浴|あ]びて、[学校|がっこう] に [行|い]く。",
            en: "I get up, shower, and go to school.",
            note: "Only the last verb shows the tense; the て forms borrow it.",
          },
          {
            jp: "[安|やす]くて おいしい。",
            en: "Cheap and tasty.",
            note: "い-adjectives: い → くて. な-adjectives and nouns: add で — [静|しず]かで, [学生|がくせい]で.",
          },
        ],
      },
      { type: "callout", kind: "mistake", text: "[行|い]く is the one く-verb that breaks the rule: ✗ [行|い]いて → ✓ [行|い]って." },
      { type: "link", href: "/learn/verbs/te-iru-te-kudasai", label: "Next: using the て form", text: "〜ている (is doing) and 〜てください (please)." },
    ],
  },
  {
    slug: "ta-form",
    title: "Casual past: the た form",
    mark: "た",
    summary: "[食|た]べた, [飲|の]んだ, [行|い]った — built exactly like the て form.",
    source: "Genki I ch. 9; Tae Kim's Guide — “Past tense”",
    blocks: [
      {
        type: "idea",
        text: "The casual past is the た form. Build it exactly like the て form, then swap て → た and で → だ: [飲|の]んで → [飲|の]んだ.",
      },
      {
        type: "table",
        headers: ["Dictionary", "た form", "Meaning"],
        rows: [
          ["[食|た]べる", "[食|た]べた", "ate"],
          ["[買|か]う", "[買|か]った", "bought"],
          ["[待|ま]つ", "[待|ま]った", "waited"],
          ["[帰|かえ]る", "[帰|かえ]った", "went home"],
          ["[飲|の]む", "[飲|の]んだ", "drank"],
          ["[遊|あそ]ぶ", "[遊|あそ]んだ", "played"],
          ["[書|か]く", "[書|か]いた", "wrote"],
          ["[泳|およ]ぐ", "[泳|およ]いだ", "swam"],
          ["[話|はな]す", "[話|はな]した", "talked"],
          ["[行|い]く", "[行|い]った", "went"],
          ["する", "した", "did"],
          ["[来|く]る", "[来|き]た", "came"],
        ],
      },
      { type: "heading", text: "Past negative: なかった" },
      {
        type: "pair",
        a: { jp: "[朝|あさ]ご[飯|はん] を [食|た]べた。", en: "I ate breakfast." },
        b: { jp: "[朝|あさ]ご[飯|はん] を [食|た]べ{なかった}。", en: "I didn't eat breakfast." },
        diff: "ない → なかった, just like an い-adjective.",
      },
      { type: "callout", kind: "tip", text: "Learn the て form chart once and you get the た form for free." },
    ],
  },
  {
    slug: "te-iru-te-kudasai",
    title: "Using the て form: ている (is doing) and てください (please)",
    mark: "ている",
    summary: "Ongoing actions, lasting states, and polite requests.",
    source: "Genki I ch. 6–7; Tae Kim's Guide — “Using the te-form”",
    blocks: [
      {
        type: "idea",
        text: "て form + **いる** = an ongoing action or a lasting state (“is …ing”). て form + **ください** = a polite request (“please …”).",
      },
      { type: "heading", text: "〜ている: is doing, or has done and stays that way" },
      {
        type: "examples",
        items: [
          { jp: "[今|いま]、[本|ほん] を [読|よ]んで {いる}。", en: "I'm reading a book right now." },
          { jp: "[雨|あめ] が [降|ふ]って {います}。", en: "It's raining." },
          {
            jp: "[結婚|けっこん] して {います}。",
            en: "I'm married.",
            note: "With change-of-state verbs, ている means the result lasts: got married → is married.",
          },
          { jp: "[東京|とうきょう] に [住|す]んで {いる}。", en: "I live in Tokyo." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[窓|まど] が [開|あ]いた。", en: "The window opened." },
        b: { jp: "[窓|まど] が [開|あ]いて {いる}。", en: "The window is open." },
        diff: "A single moment vs the state it leaves behind.",
      },
      { type: "callout", kind: "tip", text: "In casual speech ている often shrinks to てる: [何|なに]してる？ (What are you doing?)" },
      { type: "heading", text: "〜てください: please do" },
      {
        type: "examples",
        items: [
          { jp: "ちょっと [待|ま]って {ください}。", en: "Please wait a moment." },
          { jp: "もう [一度|いちど] [言|い]って {ください}。", en: "Could you say that again, please?" },
          { jp: "ここ に [名前|なまえ] を [書|か]いて {ください}。", en: "Please write your name here." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "〜てください is polite, but it's still a request. With a stranger or your boss, 〜ていただけますか (could I ask you to…?) sounds softer.",
      },
    ],
  },
  {
    slug: "tai-form",
    title: "Saying what you want to do: 〜たい",
    mark: "たい",
    summary: "Stem + たい, and why you don't use it about other people.",
    source: "Genki I ch. 11; Tae Kim's Guide — “Desire: たい”",
    blocks: [
      {
        type: "idea",
        text: "Verb stem + **たい** = want to do. The result is an **い-adjective**, so it conjugates like one.",
      },
      {
        type: "table",
        headers: ["", "Form"],
        rows: [
          ["want to eat", "[食|た]べたい"],
          ["don't want to eat", "[食|た]べたくない"],
          ["wanted to eat", "[食|た]べたかった"],
          ["polite", "[食|た]べたい です"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[日本|にほん] に [行|い]き{たい}。", en: "I want to go to Japan." },
          { jp: "[何|なに] が [飲|の]み{たい}？", en: "What do you want to drink?", note: "The object can take が or を with たい." },
          { jp: "[今日|きょう] は [何|なに] も し{たくない}。", en: "I don't want to do anything today." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "たい is for **your own** wishes, or for asking someone directly. For other people, use 〜たがっている: [妹|いもうと]は[行|い]きたがっている (my sister wants to go).",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Asking a superior 〜たいですか directly can feel intrusive. Offers are usually phrased as invitations instead: [飲|の]みませんか (won't you have a drink?).",
      },
    ],
  },
  {
    slug: "volitional",
    title: "Suggesting “let's”: 〜ましょう and the casual 〜よう",
    mark: "よう",
    summary: "Polite and casual ways to suggest doing something together.",
    source: "Genki I ch. 5 (ましょう); Genki II ch. 15 (volitional); Tae Kim's Guide — “Volitional form”",
    blocks: [
      {
        type: "idea",
        text: "To suggest doing something together, use polite **〜ましょう** or the casual **volitional form**: 〜よう / 〜おう.",
      },
      {
        type: "table",
        headers: ["Dictionary", "Polite: let's", "Casual: let's"],
        rows: [
          ["[食|た]べる", "[食|た]べましょう", "[食|た]べよう"],
          ["[行|い]く", "[行|い]きましょう", "[行|い]こう"],
          ["[飲|の]む", "[飲|の]みましょう", "[飲|の]もう"],
          ["する", "しましょう", "しよう"],
          ["[来|く]る", "[来|き]ましょう", "[来|こ]よう"],
        ],
        caption: "Casual form: る-verbs drop る and add よう; う-verbs change the u-sound to its o-sound and add う.",
      },
      {
        type: "examples",
        items: [
          { jp: "[一緒|いっしょ]に [帰|かえ]ろう。", en: "Let's go home together." },
          { jp: "そろそろ [行|い]きましょう か。", en: "Shall we get going?", note: "ましょうか = shall we…? — a softer suggestion." },
          { jp: "[手伝|てつだ]いましょう か？", en: "Shall I help you?", note: "ましょうか also offers help." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Volitional + と[思|おも]っている = I'm thinking of doing: [日本|にほん]に[行|い]こうと[思|おも]っている (I'm thinking of going to Japan).",
      },
    ],
  },
  {
    slug: "potential",
    title: "Saying you can: the potential form",
    mark: "れる",
    summary: "[食|た]べられる, [話|はな]せる, できる — ability and possibility.",
    source: "Genki II ch. 13; Tae Kim's Guide — “Potential form”",
    blocks: [
      {
        type: "idea",
        text: "The potential form says you **can** do something. る-verbs add **られる**; う-verbs change to the e-sound and add **る**.",
      },
      {
        type: "table",
        headers: ["Dictionary", "Can do", "Meaning"],
        rows: [
          ["[食|た]べる", "[食|た]べられる", "can eat"],
          ["[見|み]る", "[見|み]られる", "can watch, get to see"],
          ["[飲|の]む", "[飲|の]める", "can drink"],
          ["[話|はな]す", "[話|はな]せる", "can speak"],
          ["[行|い]く", "[行|い]ける", "can go"],
          ["[買|か]う", "[買|か]える", "can buy"],
          ["する", "できる", "can do"],
          ["[来|く]る", "[来|こ]られる", "can come"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[日本語|にほんご] が [話|はな]せます。", en: "I can speak Japanese.", note: "The thing you can do usually takes が." },
          { jp: "[納豆|なっとう] が [食|た]べられない。", en: "I can't eat natto." },
          { jp: "[明日|あした] [来|こ]られる？", en: "Can you come tomorrow?" },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "In casual speech many people drop the ら from る-verbs: [食|た]べれる, [見|み]れる. It's very common, but textbooks and formal writing keep the ら.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "The potential form is itself a る-verb: [話|はな]せない (can't speak), [話|はな]せた (could speak), [話|はな]せます (polite).",
      },
    ],
  },
  {
    slug: "tara-conditional",
    title: "Saying “if” and “when”: 〜たら",
    mark: "たら",
    summary: "Add ら to the past tense: the most versatile way to say if.",
    source: "Genki II ch. 17; Tae Kim's Guide — “Conditionals”",
    blocks: [
      {
        type: "idea",
        text: "Add **ら** to the casual past (the た form) and you get **if / when**: [雨|あめ]が[降|ふ]った**ら** (if it rains).",
      },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] が [降|ふ]っ{たら}、[行|い]かない。", en: "If it rains, I won't go." },
          {
            jp: "[駅|えき] に [着|つ]い{たら}、[電話|でんわ] して。",
            en: "Call me when you get to the station.",
            note: "If the first part is sure to happen, たら means “when” or “once”.",
          },
          { jp: "[安|やす]かっ{たら} [買|か]う。", en: "If it's cheap, I'll buy it.", note: "い-adjective: かった → かったら." },
          {
            jp: "[暇|ひま] だっ{たら}、[遊|あそ]ぼう。",
            en: "If you're free, let's hang out.",
            note: "Nouns and な-adjectives: だった → だったら.",
          },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Japanese has four ways to say *if*: たら, ば, と and なら. たら is the most versatile in everyday speech, so start with it.",
      },
    ],
  },
];
