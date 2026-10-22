import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

// Quiz answers with numbers also list the digit form (3[本|ほん]): a Japanese keyboard often turns
// さんぼん into 3本, and the checker matches exactly.

export const grammar: Lesson[] = [
  {
    slug: "desu-da",
    title: "です and だ: saying “X is Y”",
    mark: "です",
    summary: "Noun sentences — is, isn't, was, wasn't — in polite and casual speech.",
    source: "Genki I ch. 1, 4, 8–9; Tae Kim's Guide — “Expressing state-of-being”; Cure Dolly — です and だ",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "**Noun + です** means “is (a) noun”, and だ is its casual version; both go at the very end." },
      {
        type: "table",
        headers: ["", "Casual", "Polite"],
        rows: [
          ["is", "[学生|がくせい] だ", "[学生|がくせい] です"],
          ["isn't", "[学生|がくせい] じゃ ない", "[学生|がくせい] じゃ ありません"],
          ["was", "[学生|がくせい] だった", "[学生|がくせい] でした"],
          ["wasn't", "[学生|がくせい] じゃ なかった", "[学生|がくせい] じゃ ありません でした"],
        ],
        caption: "ではありません is a more formal version of じゃありません, common in writing. In speech, じゃないです is a common polite negative too.",
      },
      {
        type: "examples",
        items: [
          { jp: "[田中|たなか]-さん は [先生|せんせい] {です}。", en: "Ms Tanaka is a teacher.", alt: "[田中|たなか]-さん は [先生|せんせい] {だ} よ。" },
          { jp: "[明日|あした] は [休|やす]み {じゃ ない}。", en: "Tomorrow isn't a day off.", alt: "[明日|あした] は [休|やす]み {じゃ ありません}。" },
          { jp: "[昨日|きのう] は [雨|あめ] {でした}。", en: "It rained yesterday.", alt: "[昨日|きのう] は [雨|あめ] {だった}。", note: "Literally: yesterday was rain." },
          { jp: "あれ は [郵便局|ゆうびんきょく] {じゃ なかった}。", en: "That wasn't the post office.", alt: "あれ は [郵便局|ゆうびんきょく] {じゃ ありません でした}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[先週|せんしゅう] は [休|やす]み {でした}。", en: "Last week was a holiday." },
        b: { jp: "[先週|せんしゅう] は [休|やす]み {じゃ ありません でした}。", en: "Last week wasn't a holiday." },
        diff: "The noun doesn't change: past and negative both live in the ending after it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't stack だった and です",
        text: "✗ [雨|あめ]だったです ✓ [雨|あめ]でした. でした is already the polite past of a noun; だった is the casual one. Use one or the other.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "あの [人|ひと]、 [先生|せんせい]？", en: "Is that person a teacher?" },
          { speaker: "B", jp: "ううん、 [学生|がくせい] だ よ。", en: "No, a student." },
          { speaker: "A", jp: "[本当|ほんとう]？", en: "Really?" },
        ],
        note: "In casual speech だ is often dropped, especially in questions ([先生|せんせい]？, [本当|ほんとう]？). Before よ it sounds natural; a bare だ at the end can sound blunt or emphatic.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "After a noun, です is the “is”. After an い-adjective (おいしいです), です only adds politeness: the adjective already means “is tasty”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it polite: [今日|きょう]は[日曜日|にちようび]だ。",
            answers: ["[今日|きょう] は [日曜日|にちようび] です。"],
            explanation: "だ → です: [今日|きょう]は[日曜日|にちようび]です.",
          },
          {
            prompt: "Say it casually: “It isn't my umbrella.” [私|わたし]の[傘|かさ]＿。",
            answers: ["じゃ ない", "で は ない"],
            explanation: "The casual negative of a noun is じゃない (or the more formal ではない).",
          },
          {
            prompt: "Polite past: “It was my birthday.” [誕生日|たんじょうび]＿。",
            answers: ["でした"],
            explanation: "[誕生日|たんじょうび]でした: でした is the polite past of です.",
          },
          {
            prompt: "Fix it: [仕事|しごと]だったです。",
            answers: ["[仕事|しごと] でした。", "[仕事|しごと] だった。"],
            explanation: "Polite: [仕事|しごと]でした. Casual: [仕事|しごと]だった. Not both at once.",
          },
        ],
      },
    ],
  },
  {
    slug: "i-adjectives",
    title: "い-adjectives: they change their own ending, like verbs",
    mark: "〜い",
    summary: "[高|たか]い → [高|たか]くない → [高|たか]かった, and the irregular いい.",
    source: "Genki I ch. 5; Tae Kim's Guide — “Adjectives”; Cure Dolly — adjectives as verbs",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
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
        type: "examples",
        items: [
          { jp: "この [靴|くつ] は {[高|たか]い}。", en: "These shoes are expensive.", alt: "この [靴|くつ] は {[高|たか]い です}。" },
          { jp: "[今日|きょう] は {[寒|さむ]くない}。", en: "It isn't cold today.", alt: "[今日|きょう] は {[寒|さむ]くない です}。" },
          { jp: "[昨日|きのう] の [映画|えいが] は {[面白|おもしろ]かった}。", en: "Yesterday's film was really good.", alt: "[昨日|きのう] の [映画|えいが] は {[面白|おもしろ]かった です}。" },
          { jp: "[試験|しけん] は {[難|むずか]しくなかった}。", en: "The exam wasn't hard.", alt: "[試験|しけん] は {[難|むずか]しくなかった です}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[寒|さむ]い です。", en: "It's cold." },
        b: { jp: "[寒|さむ]{かった} です。", en: "It was cold." },
        diff: "The past goes into the adjective; です stays exactly the same.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The past lives in the adjective",
        text: "✗ [高|たか]いでした ✓ [高|たか]かったです. でした is for nouns and な-adjectives; an い-adjective carries its own past.",
      },
      { type: "heading", text: "The one irregular: いい (good)" },
      {
        type: "examples",
        items: [
          { jp: "{いい} です ね。", en: "That's nice." },
          { jp: "{よくない}。", en: "It's not good.", note: "いい conjugates from よい, its more formal form: よくない, よかった." },
          { jp: "[天気|てんき] が {よかった}。", en: "The weather was good." },
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
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[新|あたら]しい ラーメン[屋|や]、 どう だった？", en: "How was the new ramen place?" },
          { speaker: "B", jp: "おいしかった よ。 でも、 ちょっと [高|たか]かった。", en: "It was good. But a bit pricey." },
          { speaker: "A", jp: "そう なん だ。", en: "Oh, I see." },
        ],
        note: "Both adjectives carry their own past (おいしかった, [高|たか]かった), so casual speech needs no だ or です.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Cure Dolly's view: an い-adjective works like a verb. [高|たか]い on its own is already a full sentence, “(it) is expensive”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it negative (casual): [新|あたら]しい → ＿",
            answers: ["[新|あたら]しくない"],
            explanation: "Swap い for くない: [新|あたら]しくない.",
          },
          {
            prompt: "Make it past (casual): [楽|たの]しい → ＿",
            answers: ["[楽|たの]しかった"],
            explanation: "Swap い for かった: [楽|たの]しかった.",
          },
          {
            prompt: "Say “It was good” politely, with いい.",
            answers: ["よかった です。", "[良|よ]かった です。"],
            explanation: "いい conjugates from よい: よかった, plus です for politeness.",
          },
          {
            prompt: "Fix it: [暑|あつ]いでした。",
            answers: ["[暑|あつ]かった です。", "[暑|あつ]かった。"],
            explanation: "The past goes into the adjective: [暑|あつ]かったです.",
          },
        ],
      },
    ],
  },
  {
    slug: "na-adjectives",
    title: "な-adjectives: describing words that behave like nouns",
    mark: "〜な",
    summary: "They take です/だ at the end and な before a noun — plus the きれい trap.",
    source: "Genki I ch. 5; Tae Kim's Guide — “Adjectives”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
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
          { jp: "{[好|す]き な} [食|た]べ[物|もの] は [何|なん] です か？", en: "What's your favourite food?", alt: "{[好|す]き な} [食|た]べ[物|もの] は [何|なに]？", note: "[好|す]き (liked) is a な-adjective." },
          { jp: "{[元気|げんき] です} か？", en: "Have you been well?", alt: "{[元気|げんき]}？", note: "Literally: are you well? Used when you haven't seen someone for a while, not as a daily “how are you?”." },
          { jp: "{[有名|ゆうめい] な} [人|ひと]", en: "a famous person" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "きれい and [嫌|きら]い are な-adjectives",
        text: "✗ きれくない ✓ きれいじゃない. きれい (pretty, clean) and [嫌|きら]い (disliked) end in い but are **な-adjectives**. These two are the commonest traps; [丁寧|ていねい] (polite) and [得意|とくい] (good at) are others.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[日本|にほん] で [一番|いちばん] [好|す]き な [街|まち] は どこ です か？", en: "What's your favourite city in Japan?" },
          { speaker: "B", jp: "[京都|きょうと] です。 とても きれい な [街|まち] です。", en: "Kyoto. It's a really beautiful city." },
          { speaker: "A", jp: "[有名|ゆうめい] な お[寺|てら] も たくさん あります ね。", en: "There are lots of famous temples too, aren't there?" },
        ],
        note: "Before a noun, each な-adjective takes な: [好|す]きな[街|まち], きれいな[街|まち], [有名|ゆうめい]なお[寺|てら].",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Before a noun: “a quiet room” ([静|しず]か, [部屋|へや])",
            answers: ["[静|しず]か な [部屋|へや]"],
            explanation: "A な-adjective takes な before a noun: [静|しず]かな[部屋|へや].",
          },
          {
            prompt: "Make it negative and polite: [有名|ゆうめい]です。",
            answers: ["[有名|ゆうめい] じゃ ありません。", "[有名|ゆうめい] で は ありません。", "[有名|ゆうめい] じゃ ない です。", "[有名|ゆうめい] で は ない です。"],
            explanation: "Just like a noun: [有名|ゆうめい]じゃありません (or ではありません, じゃないです, ではないです).",
          },
          {
            prompt: "Casual past: “It was easy.” [簡単|かんたん]＿。",
            answers: ["だった"],
            explanation: "[簡単|かんたん]だった: な-adjectives take だった, like nouns.",
          },
          {
            prompt: "Fix it: [嫌|きら]くない。",
            answers: ["[嫌|きら]い じゃ ない。", "[嫌|きら]い で は ない。"],
            explanation: "[嫌|きら]い is a な-adjective, so its negative is [嫌|きら]いじゃない.",
          },
        ],
      },
    ],
  },
  {
    slug: "aru-iru",
    title: "ある vs いる: saying something exists (or that you have it)",
    mark: "ある",
    summary: "いる for people and animals, ある for everything else.",
    source: "Genki I ch. 4; Tae Kim's Guide — “Existence: ある and いる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Both mean **there is / to be (somewhere)**: いる is for living things that move (people and animals), and ある is for everything else.",
      },
      {
        type: "pair",
        a: { jp: "[公園|こうえん] に [子供|こども] が {いる}。", en: "There are children in the park." },
        b: { jp: "[公園|こうえん] に ベンチ が {ある}。", en: "There's a bench in the park." },
        diff: "Children move by themselves, so いる. A bench doesn't, so ある.",
      },
      {
        type: "examples",
        items: [
          { jp: "[猫|ねこ] が {います}。", en: "There's a cat.", alt: "[猫|ねこ] が {いる}。" },
          { jp: "お[金|かね] が {ありません}。", en: "I don't have any money.", alt: "お[金|かね] が {ない}。", note: "ある also means “to have”: literally, money doesn't exist (for me)." },
          { jp: "[兄弟|きょうだい] が {いる}？", en: "Do you have any brothers or sisters?", alt: "[兄弟|きょうだい] が {います} か？", note: "People you have take いる." },
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
      {
        type: "callout",
        kind: "mistake",
        title: "ある's negative is ない",
        text: "✗ あらない ✓ ない. ある's casual negative is just ない.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "すみません、 この [近|ちか]く に コンビニ は あります か？", en: "Excuse me, is there a convenience store near here?" },
          { speaker: "B", jp: "はい、 あの [角|かど] に あります よ。 [前|まえ] に [犬|いぬ] が いる [店|みせ] です。", en: "Yes, there's one on that corner. It's the shop with a dog out front." },
          { speaker: "A", jp: "ありがとう ございます。", en: "Thank you." },
        ],
        note: "The shop *is* there: ある. The dog *is* there: いる.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "The standard pattern is place + に + thing + が + ある/いる: [机|つくえ]の[上|うえ]に[本|ほん]がある (there's a book on the desk).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“There are fish in the pond”: [池|いけ]に[魚|さかな]が＿。",
            answers: ["いる", "います"],
            explanation: "Fish move by themselves, so いる: [池|いけ]に[魚|さかな]がいる.",
          },
          {
            prompt: "“There's a bank over there”: あそこに[銀行|ぎんこう]が＿。",
            answers: ["ある", "あります"],
            explanation: "A building is a thing, so ある: あそこに[銀行|ぎんこう]がある.",
          },
          {
            prompt: "“I don't have time” (casual): [時間|じかん]が＿。",
            answers: ["ない"],
            explanation: "ある's casual negative is ない: [時間|じかん]がない.",
          },
          {
            prompt: "“Is there a teacher in the room?” (polite): [部屋|へや]に[先生|せんせい]が＿か？",
            answers: ["います", "いらっしゃいます"],
            explanation: "A person takes いる: [先生|せんせい]がいますか？",
          },
        ],
      },
    ],
  },
  {
    slug: "kosoado",
    title: "これ・それ・あれ・どれ: this, that, that over there, which",
    mark: "こそあど",
    summary: "One system of four prefixes for pointing at things, places and ways.",
    source: "Genki I ch. 2; Tae Kim's Guide",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Pointing words come in sets of four: **こ** = near me, **そ** = near you, **あ** = over there (away from both of us), **ど** = which?",
      },
      {
        type: "table",
        headers: ["", "こ · near me", "そ · near you", "あ · over there", "ど · question"],
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
        diff: "Japanese splits English “that” in two: それ is near the listener, あれ is away from both of you. それ also points back to something just mentioned.",
      },
      {
        type: "examples",
        items: [
          { jp: "{この} パン は おいしい。", en: "This bread is tasty.", note: "この, その, あの and どの always need a noun after them." },
          { jp: "トイレ は {どこ} です か？", en: "Where's the toilet?" },
          { jp: "{そう} です ね。", en: "That's right. / Let me think…" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "この needs a noun",
        text: "✗ これ[本|ほん] ✓ この[本|ほん]. これ stands alone; この needs a noun after it.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "すみません、 {それ} は いくら です か？", en: "Excuse me, how much is that?" },
          { speaker: "B", jp: "{これ} です か？ [三千円|さんぜんえん] です。", en: "This one? It's 3,000 yen." },
          { speaker: "A", jp: "じゃあ、 {あれ} は？", en: "And that one over there?" },
          { speaker: "B", jp: "{あれ} は [五千円|ごせんえん] です。", en: "That one's 5,000 yen." },
        ],
        note: "A says それ for the thing near B, and B says これ, because it's near B. あれ is away from both of them.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Pointing at a tower far from both of you: “What's that?” ＿は[何|なん]ですか？",
            answers: ["あれ"],
            explanation: "Away from both of you: あれ. (それ would mean something near the listener.)",
          },
          {
            prompt: "“that umbrella” (the one the listener is holding): ＿[傘|かさ]",
            answers: ["その"],
            explanation: "Before a noun, それ becomes その: その[傘|かさ].",
          },
          {
            prompt: "“Where's the station?” [駅|えき]は＿ですか？",
            answers: ["どこ"],
            explanation: "どこ asks “where”: [駅|えき]はどこですか？",
          },
          {
            prompt: "Fix it: あれ[人|ひと]は[誰|だれ]ですか？",
            answers: ["あの [人|ひと] は [誰|だれ] です か？"],
            explanation: "あれ stands alone; before a noun it's あの: あの[人|ひと]は[誰|だれ]ですか？",
          },
        ],
      },
    ],
  },
  {
    slug: "question-words",
    title: "Question words: what, who, where, when, why, how",
    mark: "[何|なに]",
    summary: "Put the question word where the answer would go — nothing else moves.",
    source: "Genki I ch. 1–3; Tae Kim's Guide — “Question words”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A question word sits **exactly where the answer would go**, so nothing is reordered: just add か (or let your pitch rise in casual speech).",
      },
      {
        type: "examples",
        items: [
          { jp: "{いつ} [日本|にほん] に [来|き]ました か？", en: "When did you come to Japan?" },
          { jp: "[一番|いちばん] [近|ちか]い [駅|えき] は {どこ} です か？", en: "Where's the nearest station?" },
          { jp: "{[誰|だれ]} が [作|つく]りました か？", en: "Who made it?" },
          { jp: "この ケーキ、 {いくら}？", en: "How much is this cake?" },
        ],
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
          ["いくら", "how much (price)", "これ、 いくら？"],
          ["どれ · どの", "which", "どれ が いい？"],
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[何|なに] or [何|なん]?",
        text: "✗ なにですか ✓ なんですか. The kanji [!何|なに] is read なん before です, before sounds starting with d, t or n, and before counters: [何|なん]ですか, [何|なん]の[本|ほん], [何時|なんじ], [何歳|なんさい]. Otherwise it's usually なに: [何|なに]を, [何|なに]が.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう] {どこ} に [行|い]った の？", en: "Where did you go yesterday?" },
          { speaker: "B", jp: "[渋谷|しぶや]。 [姉|あね] と [映画|えいが] を [見|み]た。", en: "Shibuya. I saw a film with my sister." },
          { speaker: "A", jp: "{[何|なん]} の [映画|えいが]？", en: "What film?" },
          { speaker: "B", jp: "[新|あたら]しい アニメ。 [面白|おもしろ]かった よ。", en: "A new anime. It was good." },
        ],
        note: "Each answer fills the question word's spot: どこに → [渋谷|しぶや], [何|なん]の[映画|えいが] → アニメ.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "どうして and なんで both ask “why”: どうして is a little more neutral, なんで more casual. なぜ is the formal, written “why”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Ask about the place: [田中|たなか]さんは[東京|とうきょう]に[行|い]きました。 → “Where did Tanaka go?”",
            answers: ["[田中|たなか]-さん は どこ に [行|い]きました か？", "[田中|たなか]-さん は どこ へ [行|い]きました か？"],
            explanation: "どこ takes the place of [東京|とうきょう]; nothing else moves: [田中|たなか]さんはどこに[行|い]きましたか？",
          },
          {
            prompt: "Ask “What time is it?” politely.",
            answers: ["[何時|なんじ] です か？", "[今|いま] [何時|なんじ] です か？"],
            explanation: "[何時|なんじ]ですか？ Before a counter like 〜[時|じ], the kanji [!何|なに] is read なん.",
          },
          {
            prompt: "“How much was the ticket?”: [切符|きっぷ]は＿でしたか？",
            answers: ["いくら"],
            explanation: "いくら asks a price: [切符|きっぷ]はいくらでしたか？",
          },
          {
            prompt: "“When is the exam?”: [試験|しけん]は＿ですか？",
            answers: ["いつ"],
            explanation: "いつ asks “when”: [試験|しけん]はいつですか？",
          },
        ],
      },
    ],
  },
  {
    slug: "numbers-counting",
    title: "Numbers, and counting things with counters",
    mark: "[数|かず]",
    summary: "Build any number from 1–10 and 100, then attach the right counter.",
    source: "Genki I ch. 1–2; Genki II ch. 14; Tae Kim's Guide — “Numbers and counting”",
    register: "polite",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Learn 1–10, 100, 1,000 and 10,000 and you can build any number; counting objects adds a **counter**, a small word attached to the number.",
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
        text: "Bigger numbers are built like a calculator: [十一|じゅういち] is 10 + 1 = 11, [二十|にじゅう] is 2 × 10 = 20, [三十五|さんじゅうご] is 35. Note that 10,000 is one unit, [一万|いちまん], so 50,000 is [五万|ごまん]. 100 and 1,000 take no いち ([百|ひゃく], [千|せん]), but 10,000 does: [一万|いちまん]. Watch the sound changes with 100 and 1,000: [三百|さんびゃく], [六百|ろっぴゃく], [八百|はっぴゃく], [三千|さんぜん], [八千|はっせん].",
      },
      { type: "heading", text: "Counters" },
      {
        type: "table",
        headers: ["Counter", "Used for", "Example"],
        rows: [
          ["〜つ", "general things, 1–9 (10 is とお)", "[一|ひと]つ, [二|ふた]つ, [三|みっ]つ"],
          ["〜[人|にん]", "people", "[一人|ひとり], [二人|ふたり], [三人|さんにん], [四人|よにん]"],
          ["〜[枚|まい]", "flat things: paper, tickets, shirts", "[二枚|にまい]"],
          ["〜[本|ほん]", "long thin things: bottles, pens", "[一本|いっぽん], [二本|にほん], [三本|さんぼん]"],
          ["〜[円|えん]", "yen", "[百円|ひゃくえん]"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "りんご を {[三|みっ]つ} ください。", en: "Three apples, please.", note: "The number + counter usually goes right before the verb, with no particle." },
          { jp: "[切手|きって] を {[五枚|ごまい]} ください。", en: "Five stamps, please." },
          { jp: "ビール を {[二本|にほん]} ください。", en: "Two bottles of beer, please." },
          { jp: "{[二人|ふたり]} です。", en: "Two people, please.", note: "What you say when a restaurant asks how many are in your group." },
        ],
      },
      {
        type: "pair",
        a: { jp: "ペン が {[一本|いっぽん]} あります。", en: "There's one pen." },
        b: { jp: "ペン が {[三本|さんぼん]} あります。", en: "There are three pens." },
        diff: "The counter's sound changes with the number in front: いっぽん, にほん, さんぼん.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Four and nine o'clock",
        text: "✗ よんじ ✓ [四時|よじ] (four o'clock); ✗ きゅうじ ✓ [九時|くじ] (nine o'clock). 4, 7 and 9 have two readings, and よん, なな and きゅう are safest for counting. But four o'clock is よじ, a third form, also in [四人|よにん] (four people) and [四年|よねん] (four years). Some fixed words use the other reading: [四月|しがつ] (April), [七時|しちじ] (seven o'clock; ななじ is also heard), [九時|くじ].",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "いらっしゃいませ。 [何名|なんめい][様|さま] です か？", en: "Welcome. How many in your party?" },
          { speaker: "B", jp: "[四人|よにん] です。", en: "Four." },
          { speaker: "A", jp: "こちら へ どうぞ。", en: "This way, please." },
        ],
        note: "Staff count customers politely with [何名|なんめい][様|さま]; you answer with the everyday counter: [四人|よにん] (not よんにん).",
      },
      { type: "callout", kind: "tip", text: "Forgot the counter? [一|ひと]つ, [二|ふた]つ, [三|みっ]つ… works for most objects up to ten." },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“Three bottles of water, please”: [水|みず]を＿ください。",
            answers: ["[三本|さんぼん]", "3[本|ぼん]"],
            explanation: "Bottles are long and thin, so 〜[本|ほん], which becomes ぼん with three: [三本|さんぼん].",
          },
          {
            prompt: "“Two tickets, please”: [切符|きっぷ]を＿ください。",
            answers: ["[二枚|にまい]", "2[枚|まい]"],
            explanation: "Tickets are flat, so 〜[枚|まい]: [二枚|にまい].",
          },
          {
            prompt: "“Four apples, please” with the general counter: りんごを＿ください。",
            answers: ["よっつ", "[四|よっ]つ", "4つ"],
            explanation: "The general counter: [一|ひと]つ, [二|ふた]つ, [三|みっ]つ, [四|よっ]つ.",
          },
          {
            prompt: "Asked how many are in your group: “Three people.” ＿です。",
            answers: ["[三人|さんにん]", "3[人|にん]", "[三名|さんめい]", "3[名|めい]"],
            explanation: "People take 〜[人|にん]: [三人|さんにん] (but [一人|ひとり] and [二人|ふたり]).",
          },
        ],
      },
    ],
  },
];
