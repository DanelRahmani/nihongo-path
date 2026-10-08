import type { Lesson } from "@/content/types";

// The conjugation tables here are checked against lib/conjugate.ts (tests/lesson-tables.test.ts).

export const verbs: Lesson[] = [
  {
    slug: "verb-groups",
    title: "The three verb groups: る-verbs, う-verbs and two irregulars",
    mark: "[動詞|どうし]",
    summary: "Know a verb's group and you know how every form is built.",
    source: "Genki I ch. 3; Tae Kim's Guide — “Verb basics”",
    register: "both",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "Every verb's dictionary form ends in an **u-sound**, and how it changes depends on which of three groups it belongs to.",
      },
      {
        type: "table",
        headers: ["Group", "How to spot it", "Examples"],
        rows: [
          ["る-verbs (ichidan)", "end in -iru or -eru (most of them)", "[食|た]べる, [見|み]る, [起|お]きる, [寝|ね]る"],
          ["う-verbs (godan)", "everything else, plus some -iru/-eru verbs (below)", "[飲|の]む, [書|か]く, [話|はな]す, [待|ま]つ, [買|か]う"],
          ["irregular", "just two", "する (do), [来|く]る (come)"],
        ],
      },
      {
        type: "text",
        text: "る-verbs are the easy ones: drop る and add the ending. う-verbs change their last kana (before ます, its u-sound becomes an i-sound: [飲|の]む → [飲|の]みます). The two irregulars you simply memorise, and する is everywhere, because it turns nouns into verbs: [勉強|べんきょう]する (study), [電話|でんわ]する (phone).",
      },
      { type: "heading", text: "The trap: う-verbs that look like る-verbs" },
      {
        type: "examples",
        items: [
          { jp: "[帰|かえ]{る}", en: "to go home (う-verb)" },
          { jp: "[入|はい]{る}", en: "to enter (う-verb)" },
          { jp: "[走|はし]{る}", en: "to run (う-verb)" },
          { jp: "[知|し]{る}", en: "to get to know (う-verb)" },
          { jp: "[切|き]{る}", en: "to cut (う-verb)" },
        ],
      },
      {
        type: "text",
        text: "These end in -iru or -eru but conjugate like う-verbs. Any verb ending in -aru, -uru or -oru is a う-verb, except the two irregulars する and [来|く]る.",
      },
      {
        type: "pair",
        a: { jp: "[帰|かえ]{り}ます", en: "(I) go home", note: "[帰|かえ]る is a う-verb." },
        b: { jp: "[変|か]え{ます}", en: "(I) change (it)", note: "[変|か]える is a る-verb." },
        diff: "Both dictionary forms are spelled かえる, but they belong to different groups: かえります for “go home”, かえます for “change”.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[帰|かえ]る is a う-verb",
        text: "✗ [帰|かえ]ます ✓ [帰|かえ]ります. [帰|かえ]る ends in -eru but is a う-verb, so its る turns into り.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Japanese dictionaries and grammars call the groups [五段|ごだん] (godan, “five rows”) and [一段|いちだん] (ichidan, “one row”): a godan verb's ending moves through all five vowel rows of the kana chart (まない, みます, む, めば, もう), an ichidan verb's stays on one.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "When you learn a new -iru/-eru verb, check its ます form once: [食|た]べます means る-verb, [帰|かえ]ります means う-verb.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it polite: [減|へ]る (to decrease) → ＿",
            answers: ["[減|へ]ります"],
            explanation: "[減|へ]る looks like a る-verb but is a う-verb: [減|へ]ります.",
          },
          {
            prompt: "Make it polite: [借|か]りる (to borrow) → ＿",
            answers: ["[借|か]ります"],
            explanation: "A る-verb: drop る, add ます.",
          },
          {
            prompt: "Make it polite: [要|い]る (to need) → ＿",
            answers: ["[要|い]ります"],
            explanation: "Another う-verb in disguise: [要|い]ります.",
          },
          {
            prompt: "Make it polite: [勉強|べんきょう]する → ＿",
            answers: ["[勉強|べんきょう] します"],
            explanation: "する → します, and the noun stays as it is.",
          },
        ],
      },
    ],
  },
  {
    slug: "masu-form",
    title: "Polite verbs: the ます form (present, negative, past)",
    mark: "ます",
    summary: "Stem + ます / ません / ました / ませんでした.",
    source: "Genki I ch. 3–4; Tae Kim's Guide — “Polite form and verb stems”",
    register: "polite",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "The ます form is the **polite** way to end with a verb: take the verb's **stem** and add ます, ません, ました or ませんでした.",
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
          ["present / future", "〜ます", "[飲|の]みます: I drink / will drink"],
          ["negative", "〜ません", "[飲|の]みません: I don't drink"],
          ["past", "〜ました", "[飲|の]みました: I drank"],
          ["past negative", "〜ません でした", "[飲|の]みませんでした: I didn't drink"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[毎晩|まいばん] [日記|にっき] を [書|か]{きます}。", en: "I write in my diary every night." },
          {
            jp: "[明日|あした] [東京|とうきょう] に [行|い]{きます}。",
            en: "I'll go to Tokyo tomorrow.",
            note: "No separate future tense: the present form covers it.",
          },
          { jp: "[昨日|きのう] は [勉強|べんきょう] {しません でした}。", en: "I didn't study yesterday." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[週末|しゅうまつ] は [掃除|そうじ] を し{ました}。", en: "I cleaned at the weekend." },
        b: { jp: "[週末|しゅうまつ] は [掃除|そうじ] を し{ません でした}。", en: "I didn't clean at the weekend." },
        diff: "Past and negative both go on the end: ました (did) vs ませんでした (didn't).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ます goes on the stem",
        text: "✗ [食|た]べるます ✓ [食|た]べます. ます attaches to the stem, not to the dictionary form.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[明日|あした] の [夜|よる]、 [時間|じかん] が あります か？", en: "Are you free tomorrow evening?" },
          { speaker: "B", jp: "はい、 あります。", en: "Yes, I am." },
          { speaker: "A", jp: "[一緒|いっしょ] に [晩|ばん]ご[飯|はん] を [食|た]べません か？", en: "Would you like to have dinner together?" },
          { speaker: "B", jp: "いい です ね。 [行|い]きましょう。", en: "Sounds good. Let's go." },
        ],
        note: "〜ませんか is a polite invitation (won't you…?), and 〜ましょう accepts it (let's).",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Stem + ましょう = let's: [行|い]きましょう. Stem + ませんか = won't you…?, a polite invitation: [一緒|いっしょ]に[食|た]べませんか.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it polite: [読|よ]む → ＿",
            answers: ["[読|よ]みます"],
            explanation: "む → み, then ます: [読|よ]みます.",
          },
          {
            prompt: "Polite negative: [来|く]る → ＿",
            answers: ["[来|き]ません"],
            explanation: "[来|く]る's stem is [来|き]: [来|き]ません.",
          },
          {
            prompt: "Polite past negative: [起|お]きる → ＿",
            answers: ["[起|お]きません でした"],
            explanation: "Stem + ませんでした: [起|お]きませんでした.",
          },
          {
            prompt: "Invite politely: “Won't you have some tea?” お[茶|ちゃ]を＿か？",
            answers: ["[飲|の]みません"],
            explanation: "〜ませんか invites: お[茶|ちゃ]を[飲|の]みませんか？",
          },
        ],
      },
    ],
  },
  {
    slug: "nai-form",
    title: "Casual negative: the ない form",
    mark: "ない",
    summary: "[食|た]べない, [飲|の]まない, しない — “don't” in casual speech.",
    source: "Genki I ch. 8; Tae Kim's Guide — “Negative verbs”",
    register: "plain",
    kinds: ["verbs"],
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
          { jp: "お[酒|さけ] は [飲|の]{まない}。", en: "I don't drink alcohol." },
          { jp: "[今日|きょう] は [行|い]{かない}。", en: "I'm not going today." },
          { jp: "バス が まだ [来|こ]{ない}。", en: "The bus still isn't here.", note: "Literally: the bus still doesn't come." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] [行|い]{く}。", en: "I'm going tomorrow." },
        b: { jp: "[明日|あした] [行|い]{かない}。", en: "I'm not going tomorrow." },
        diff: "Only the ending changes: く → かない.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "う becomes わ, not あ",
        text: "✗ [買|か]あない ✓ [買|か]わない. These verbs' root ends in w, which only shows before a: kaw-anai.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[今夜|こんや] の パーティー、 [行|い]く？", en: "Are you going to tonight's party?" },
          { speaker: "B", jp: "ううん、 [行|い]かない。 [明日|あした]、 [試験|しけん] が ある から。", en: "No, I'm not. I've got an exam tomorrow." },
          { speaker: "A", jp: "そっか。 [頑張|がんば]って ね。", en: "I see. Good luck!" },
        ],
        note: "ううん is a casual “no”, and [行|い]かない the plain negative of [行|い]く.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "ない conjugates like an い-adjective: [食|た]べなかった = didn't eat. [食|た]べないです is a common, slightly less formal alternative to [食|た]べません.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual negative: [書|か]く → ＿",
            answers: ["[書|か]かない"],
            explanation: "く → か, then ない: [書|か]かない.",
          },
          {
            prompt: "Casual negative: [見|み]る → ＿",
            answers: ["[見|み]ない"],
            explanation: "A る-verb: drop る, add ない.",
          },
          {
            prompt: "Casual negative: [会|あ]う → ＿",
            answers: ["[会|あ]わない"],
            explanation: "う → わ, not あ: [会|あ]わない.",
          },
          {
            prompt: "Casual negative: ある → ＿",
            answers: ["ない"],
            explanation: "ある's negative is just ない.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-form",
    title: "The て form: one chart that links actions",
    mark: "て",
    summary: "The sound-change chart behind て, た, ている, てください and more.",
    source: "Genki I ch. 6; Tae Kim's Guide — “The te-form”",
    register: "plain",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "The て form links actions (“…and then…”) and powers many patterns: る-verbs drop る and take て, and う-verbs change by their **last kana**.",
      },
      {
        type: "table",
        headers: ["Verb ends in", "Becomes", "Examples"],
        rows: [
          ["う · つ · る (う-verbs)", "って", "[買|か]う → [買|か]って, [待|ま]つ → [待|ま]って, [帰|かえ]る → [帰|かえ]って"],
          ["む · ぶ · ぬ", "んで", "[飲|の]む → [飲|の]んで, [遊|あそ]ぶ → [遊|あそ]んで, [死|し]ぬ → [死|し]んで"],
          ["く", "いて", "[書|か]く → [書|か]いて"],
          ["ぐ", "いで", "[泳|およ]ぐ → [泳|およ]いで"],
          ["す", "して", "[話|はな]す → [話|はな]して"],
          ["る-verbs", "drop る, add て", "[食|た]べる → [食|た]べて, [見|み]る → [見|み]て"],
          ["exceptions", "", "[行|い]く → [行|い]って, する → して, [来|く]る → [来|き]て"],
        ],
        caption: "Many learners memorise this chart by singing it: search for “te form song”.",
      },
      { type: "heading", text: "Linking actions: “and then”" },
      {
        type: "examples",
        items: [
          {
            jp: "[朝|あさ] {[起|お]きて}、 シャワー を {[浴|あ]びて}、 [学校|がっこう] に [行|い]く。",
            en: "I get up, shower, and go to school.",
            note: "Only the last verb shows the tense; the て forms borrow it.",
          },
          { jp: "[家|いえ] に {[帰|かえ]って}、 すぐ [寝|ね]た。", en: "I went home and went straight to bed." },
          {
            jp: "この [店|みせ] は [安|やす]{くて} おいしい。",
            en: "This place is cheap and tasty.",
            note: "い-adjectives: い → くて. な-adjectives and nouns: add で, as in [静|しず]かで and [学生|がくせい]で.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[窓|まど] を [開|あ]け{て}。", en: "Open the window." },
        b: { jp: "[窓|まど] を [開|あ]け{た}。", en: "I opened the window.", note: "た is the casual past: the next lesson." },
        diff: "On its own at the end, the て form is a casual request; た is the past.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[行|い]く is the exception",
        text: "✗ [行|い]いて ✓ [行|い]って. [行|い]く (and verbs built on it) is the one く-verb that breaks the rule.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう]、 [何|なに] した？", en: "What did you do yesterday?" },
          { speaker: "B", jp: "[海|うみ] に {[行|い]って}、 {[泳|およ]いで}、 [魚|さかな] を [食|た]べた。", en: "I went to the beach, swam, and ate fish." },
          { speaker: "A", jp: "いい な！", en: "Lucky you!" },
        ],
        note: "Only the last verb, [食|た]べた, carries the past; the て forms before it borrow it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "て form: [読|よ]む → ＿",
            answers: ["[読|よ]んで"],
            explanation: "む, ぶ and ぬ become んで: [読|よ]んで.",
          },
          {
            prompt: "て form: [持|も]つ → ＿",
            answers: ["[持|も]って"],
            explanation: "う, つ and る (in う-verbs) become って: [持|も]って.",
          },
          {
            prompt: "て form: [急|いそ]ぐ → ＿",
            answers: ["[急|いそ]いで"],
            explanation: "ぐ becomes いで: [急|いそ]いで.",
          },
          {
            prompt: "て form: [行|い]く → ＿",
            answers: ["[行|い]って"],
            explanation: "The exception: [行|い]って, not [行|い]いて.",
          },
          {
            prompt: "Link them: “I got up and ate breakfast.” ([起|お]きる, [朝|あさ]ご[飯|はん]を[食|た]べた)",
            answers: ["[起|お]きて [朝|あさ]ご[飯|はん] を [食|た]べた。"],
            explanation: "The first verb takes the て form, the last carries the past: [起|お]きて、[朝|あさ]ご[飯|はん]を[食|た]べた.",
          },
        ],
      },
      { type: "link", href: "/learn/verbs/te-iru-te-kudasai", label: "Next: using the て form", text: "〜ている (is doing) and 〜てください (please)." },
    ],
  },
  {
    slug: "ta-form",
    title: "Casual past: the た form",
    mark: "た",
    summary: "[食|た]べた, [飲|の]んだ, [行|い]った — built exactly like the て form.",
    source: "Genki I ch. 9; Tae Kim's Guide — “Past tense”",
    register: "plain",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "The casual past is the た form: build it exactly like the て form, then swap て → た and で → だ ([飲|の]んで → [飲|の]んだ).",
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
      {
        type: "examples",
        items: [
          { jp: "[昨日|きのう]、 [友達|ともだち] に [会|あ]{った}。", en: "I met a friend yesterday." },
          { jp: "[本|ほん] を [三冊|さんさつ] [読|よ]{んだ}。", en: "I read three books.", note: "〜[冊|さつ] counts books." },
          { jp: "[宿題|しゅくだい] は もう {した}？", en: "Have you done your homework yet?" },
        ],
      },
      { type: "heading", text: "Past negative: なかった" },
      {
        type: "pair",
        a: { jp: "[朝|あさ]ご[飯|はん] を [食|た]べ{た}。", en: "I ate breakfast." },
        b: { jp: "[朝|あさ]ご[飯|はん] を [食|た]べ{なかった}。", en: "I didn't eat breakfast." },
        diff: "ない → なかった, just like an い-adjective.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[帰|かえ]る takes った",
        text: "✗ [帰|かえ]た ✓ [帰|かえ]った. [帰|かえ]る is a う-verb, so its る becomes った, just as in the て form.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう] の [試合|しあい]、 [見|み]た？", en: "Did you watch yesterday's match?" },
          { speaker: "B", jp: "うん、 [見|み]た。 すごかった よ！", en: "Yeah, I did. It was amazing!" },
          { speaker: "A", jp: "いい な。 [私|わたし] は [見|み]なかった。", en: "Lucky you. I didn't see it." },
        ],
        note: "Casual answers repeat the verb: [見|み]た？ → うん、[見|み]た. The past negative is [見|み]なかった.",
      },
      { type: "callout", kind: "tip", text: "Learn the て form chart once and you get the た form for free." },
      {
        type: "quiz",
        questions: [
          {
            prompt: "た form: [聞|き]く → ＿",
            answers: ["[聞|き]いた"],
            explanation: "Like [聞|き]いて: [聞|き]いた.",
          },
          {
            prompt: "た form: [呼|よ]ぶ → ＿",
            answers: ["[呼|よ]んだ"],
            explanation: "Like [呼|よ]んで: [呼|よ]んだ.",
          },
          {
            prompt: "た form: [貸|か]す → ＿",
            answers: ["[貸|か]した"],
            explanation: "Like [貸|か]して: [貸|か]した.",
          },
          {
            prompt: "Casual past negative: [行|い]く → ＿",
            answers: ["[行|い]かなかった"],
            explanation: "[行|い]かない → [行|い]かなかった.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-iru-te-kudasai",
    title: "Using the て form: ている (is doing) and てください (please)",
    mark: "ている",
    summary: "Ongoing actions, lasting states, and polite requests.",
    source: "Genki I ch. 6–7; Tae Kim's Guide — “Using the te-form”",
    register: "both",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "て form + **いる** means an ongoing action or a lasting state (“is …ing”), and て form + **ください** a polite request (“please …”).",
      },
      { type: "heading", text: "〜ている: is doing, or has done and stays that way" },
      {
        type: "examples",
        items: [
          { jp: "[今|いま]、 [本|ほん] を [読|よ]んで {いる}。", en: "I'm reading a book right now." },
          { jp: "[雨|あめ] が [降|ふ]って {います}。", en: "It's raining." },
          {
            jp: "[結婚|けっこん] して {います}。",
            en: "I'm married.",
            note: "With change-of-state verbs, ている means the result lasts: got married → is married.",
          },
          { jp: "[姉|あね] は [京都|きょうと] に [住|す]んで {いる}。", en: "My sister lives in Kyoto." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[窓|まど] が [開|あ]い{た}。", en: "The window opened." },
        b: { jp: "[窓|まど] が [開|あ]いて {いる}。", en: "The window is open." },
        diff: "A single moment vs the state it leaves behind.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "“I know” is [知|し]っています",
        text: "✗ [知|し]ります ✓ [知|し]っています (I know). [知|し]る means “to get to know”, so knowing is the lasting state: 〜ている. The negative is just [知|し]りません.",
      },
      { type: "callout", kind: "tip", text: "In casual speech ている often shrinks to てる: [何|なに]してる？ (What are you doing?)" },
      { type: "heading", text: "〜てください: please do" },
      {
        type: "examples",
        items: [
          { jp: "ちょっと [待|ま]って {ください}。", en: "Please wait a moment." },
          { jp: "もう [一度|いちど] [言|い]って {ください}。", en: "Could you say that again, please?" },
          { jp: "[靴|くつ] を [脱|ぬ]いで {ください}。", en: "Please take off your shoes." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "〜てください is polite, but it's still a request. With a stranger or your boss, 〜ていただけますか (could I ask you to…?) sounds softer.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I'm eating now” (use [食|た]べる): [今|いま]、＿。",
            answers: ["[食|た]べて いる", "[食|た]べて います", "[食|た]べてる", "[食|た]べてます"],
            explanation: "て form + いる: [食|た]べている (casually [食|た]べてる).",
          },
          {
            prompt: "“Please close the door” (use [閉|し]める): ドアを＿。",
            answers: ["[閉|し]めて ください"],
            explanation: "て form + ください: [閉|し]めてください.",
          },
          {
            prompt: "Say “I don't know” politely, from [知|し]る.",
            answers: ["[知|し]りません。"],
            explanation: "“I know” is [知|し]っています, but “I don't know” is just [知|し]りません, not [知|し]っていません.",
          },
          {
            prompt: "“Please speak slowly” (use [話|はな]す): ゆっくり＿。",
            answers: ["[話|はな]して ください"],
            explanation: "[話|はな]す → [話|はな]して, + ください.",
          },
        ],
      },
    ],
  },
  {
    slug: "tai-form",
    title: "Saying what you want to do: 〜たい",
    mark: "たい",
    summary: "Stem + たい, and why you don't use it about other people.",
    source: "Genki I ch. 11; Tae Kim's Guide — “Desire: たい”",
    register: "both",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "Verb stem + **たい** means “want to do”, and the result is an **い-adjective**, so it conjugates like one.",
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
          {
            jp: "[弟|おとうと] は ゲーム を [買|か]い{たがって いる}。",
            en: "My little brother wants to buy a game.",
            note: "For other people: stem + たがっている.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[水|みず] {を} [飲|の]みたい。", en: "I want to drink some water." },
        b: { jp: "[水|みず] {が} [飲|の]みたい。", en: "I want some *water*." },
        diff: "Both are fine with たい: を is neutral, and が puts a little more weight on the thing you want.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "たい is for your own wishes",
        text: "✗ [妹|いもうと]は[行|い]きたい ✓ [妹|いもうと]は[行|い]きたがっている (my sister wants to go). たい is for your own wishes, or for asking someone directly; for other people, use 〜たがっている, or quote them: [行|い]きたいって.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Asking a superior 〜たいですか directly can feel intrusive. Offers are usually phrased as invitations instead: [飲|の]みませんか (won't you have a drink?).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I want to sleep” (use [寝|ね]る)",
            answers: ["[寝|ね]たい。", "[寝|ね]たい です。"],
            explanation: "Stem + たい: [寝|ね]たい.",
          },
          {
            prompt: "“I don't want to go” (use [行|い]く)",
            answers: ["[行|い]きたくない。", "[行|い]きたくない です。", "[行|い]きたく ありません。"],
            explanation: "たい conjugates like an い-adjective: [行|い]きたくない.",
          },
          {
            prompt: "“I wanted to see it” (use [見|み]る)",
            answers: ["[見|み]たかった。", "[見|み]たかった です。"],
            explanation: "たい → たかった: [見|み]たかった.",
          },
          {
            prompt: "Your sister wants to come: [妹|いもうと]は＿。 (use [来|く]る)",
            answers: ["[来|き]たがって いる", "[来|き]たがって います", "[来|き]たがってる", "[来|き]たがってます"],
            explanation: "For other people, 〜たがっている: [来|き]たがっている.",
          },
        ],
      },
    ],
  },
  {
    slug: "volitional",
    title: "Suggesting “let's”: 〜ましょう and the casual 〜よう",
    mark: "よう",
    summary: "Polite and casual ways to suggest doing something together.",
    source: "Genki I ch. 5 (ましょう); Genki II ch. 15 (volitional); Tae Kim's Guide — “Volitional form”",
    register: "both",
    kinds: ["verbs"],
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
          { jp: "[一緒|いっしょ] に [帰|かえ]{ろう}。", en: "Let's go home together." },
          { jp: "そろそろ [行|い]き{ましょう} か。", en: "Shall we get going?", note: "ましょうか = shall we…?, a softer suggestion." },
          { jp: "[手伝|てつだ]い{ましょう} か？", en: "Shall I help you?", note: "ましょうか also offers help." },
          { jp: "もう [寝|ね]{よう}。", en: "I think I'll go to bed now.", note: "Said to yourself, the volitional is a decision: “I'll…”." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[行|い]き{ましょう}。", en: "Let's go." },
        b: { jp: "[行|い]{こう}。", en: "Let's go." },
        diff: "Same suggestion: ましょう with people you're polite to, the volitional with friends.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "る-verbs take よう",
        text: "✗ [食|た]べろう ✓ [食|た]べよう. る-verbs drop る and add よう; only う-verbs take the o-sound + う ([帰|かえ]ろう is right, because [帰|かえ]る is a う-verb).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "おなか すいた ね。 [何|なに]か [食|た]べよう か。", en: "I'm hungry. Shall we eat something?" },
          { speaker: "B", jp: "うん、 ラーメン は どう？", en: "Sure. How about ramen?" },
          { speaker: "A", jp: "いい ね。 [行|い]こう！", en: "Good idea. Let's go!" },
        ],
        note: "[食|た]べようか softens the suggestion (shall we…?); [行|い]こう！ settles it.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Volitional + と[思|おも]っている = I'm thinking of doing: [日本|にほん]に[行|い]こうと[思|おも]っている (I'm thinking of going to Japan).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual “let's”: [泳|およ]ぐ → ＿",
            answers: ["[泳|およ]ごう"],
            explanation: "ぐ → ご, then う: [泳|およ]ごう.",
          },
          {
            prompt: "Casual “let's”: [見|み]る → ＿",
            answers: ["[見|み]よう"],
            explanation: "A る-verb: drop る, add よう.",
          },
          {
            prompt: "Polite “let's”: [始|はじ]める → ＿",
            answers: ["[始|はじ]めましょう"],
            explanation: "Stem + ましょう: [始|はじ]めましょう.",
          },
          {
            prompt: "Offer help politely: “Shall I carry it?” (use [持|も]つ)",
            answers: ["[持|も]ちましょう か？"],
            explanation: "ましょうか offers to do something: [持|も]ちましょうか？",
          },
        ],
      },
    ],
  },
  {
    slug: "potential",
    title: "Saying you can: the potential form",
    mark: "れる",
    summary: "[食|た]べられる, [話|はな]せる, できる — ability and possibility.",
    source: "Genki II ch. 13; Tae Kim's Guide — “Potential form”",
    register: "both",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "The potential form says you **can** do something: る-verbs drop る and add **られる**, and う-verbs change to the e-sound and add **る**.",
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
        caption: "[食|た]べられる and [見|み]られる are also the passive, a later topic; context tells them apart.",
      },
      {
        type: "examples",
        items: [
          { jp: "[日本語|にほんご] が {[話|はな]せます}。", en: "I can speak Japanese.", note: "The thing you can do usually takes が (を is also heard)." },
          { jp: "[納豆|なっとう] が {[食|た]べられない}。", en: "I can't eat natto." },
          { jp: "[明日|あした] {[来|こ]られる}？", en: "Can you come tomorrow?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[一人|ひとり] で [行|い]{く}。", en: "I'll go alone." },
        b: { jp: "[一人|ひとり] で [行|い]{ける}。", en: "I can go alone." },
        diff: "Only the ending changes: く → ける, and doing becomes being able to do.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[見|み]える isn't “can watch”",
        text: "✗ [映画|えいが]が[見|み]える for “I can watch the film” ✓ [映画|えいが]が[見|み]られる. [見|み]える means something is visible ([山|やま]が[見|み]える, the mountain is in view); [見|み]られる means you're able to watch.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "In casual speech many people drop the ら from る-verbs: [食|た]べれる, [見|み]れる, [来|こ]れる. It's very common, but textbooks and formal writing keep the ら.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "The potential form is itself a る-verb: [話|はな]せない (can't speak), [話|はな]せた (could speak), [話|はな]せます (polite).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Can: [書|か]く → ＿",
            answers: ["[書|か]ける"],
            explanation: "く → け, then る: [書|か]ける.",
          },
          {
            prompt: "Can: [起|お]きる → ＿",
            answers: ["[起|お]きられる", "[起|お]きれる"],
            explanation: "A る-verb takes られる: [起|お]きられる (casually, [起|お]きれる).",
          },
          {
            prompt: "Can: する → ＿",
            answers: ["できる"],
            explanation: "する's potential is a different verb: できる.",
          },
          {
            prompt: "“I can't swim” (casual, use [泳|およ]ぐ)",
            answers: ["[泳|およ]げない。"],
            explanation: "[泳|およ]げる is a る-verb, so its negative is [泳|およ]げない.",
          },
        ],
      },
    ],
  },
  {
    slug: "tara-conditional",
    title: "Saying “if” and “when”: 〜たら",
    mark: "たら",
    summary: "Add ら to the past tense: the most versatile way to say if.",
    source: "Genki II ch. 17; Tae Kim's Guide — “Conditionals”",
    register: "plain",
    kinds: ["verbs"],
    blocks: [
      {
        type: "idea",
        text: "Add **ら** to the casual past (the た form) and you get **if / when**: [雨|あめ]が[降|ふ]った**ら** (if it rains).",
      },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] が [降|ふ]っ{たら}、 [行|い]かない。", en: "If it rains, I won't go." },
          {
            jp: "[駅|えき] に [着|つ]い{たら}、 [電話|でんわ] して。",
            en: "Call me when you get to the station.",
            note: "If the first part is sure to happen, たら means “when” or “once”.",
          },
          { jp: "[安|やす]かっ{たら}、 [買|か]う。", en: "If it's cheap, I'll buy it.", note: "い-adjective: かった → かったら." },
          {
            jp: "[暇|ひま] だっ{たら}、 [遊|あそ]ぼう。",
            en: "If you're free, let's hang out.",
            note: "Nouns and な-adjectives: だった → だったら.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[宿題|しゅくだい] が [終|お]わっ{た}。 [遊|あそ]ぶ。", en: "My homework's done. I'll go and play." },
        b: { jp: "[宿題|しゅくだい] が [終|お]わっ{たら}、 [遊|あそ]ぶ。", en: "When my homework's done, I'll go and play." },
        diff: "た reports what happened; たら hangs the next part on it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "たら goes on the past form",
        text: "✗ [降|ふ]るたら ✓ [降|ふ]ったら. たら attaches to the た form, not the dictionary form.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[明日|あした]、 [晴|は]れ{たら} どこか [行|い]かない？", en: "If it's sunny tomorrow, want to go somewhere?" },
          { speaker: "B", jp: "いい ね。 [雨|あめ] だっ{たら}？", en: "Sure. And if it rains?" },
          { speaker: "A", jp: "[雨|あめ] だっ{たら}、 [家|いえ] で [映画|えいが] を [見|み]よう。", en: "If it rains, let's watch a film at home." },
        ],
        note: "[行|い]かない？ with a rising tone is a casual invitation: “want to go (together)?”.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Japanese has four ways to say *if*: たら, ば, と and なら. たら is the most versatile in everyday speech, so start with it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“If it's expensive, I won't buy it”: [高|たか]＿、[買|か]わない。",
            answers: ["かったら", "[高|たか]かったら"],
            explanation: "[高|たか]かった + ら: [高|たか]かったら.",
          },
          {
            prompt: "“When you get home, call me”: [家|いえ]に[帰|かえ]＿、[電話|でんわ]して。",
            answers: ["ったら", "[帰|かえ]ったら"],
            explanation: "[帰|かえ]った + ら: [帰|かえ]ったら.",
          },
          {
            prompt: "“If you're busy…”: [忙|いそが]しい → ＿",
            answers: ["[忙|いそが]しかったら"],
            explanation: "い-adjective: かった + ら: [忙|いそが]しかったら.",
          },
          {
            prompt: "Fix it: [行|い]くたら",
            answers: ["[行|い]ったら"],
            explanation: "たら goes on the た form: [行|い]った → [行|い]ったら.",
          },
          {
            prompt: "“If it's a holiday…”: [休|やす]み → ＿",
            answers: ["[休|やす]み だったら"],
            explanation: "Nouns take だった + ら: [休|やす]みだったら.",
          },
        ],
      },
    ],
  },
];
