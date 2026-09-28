import type { Lesson } from "@/content/types";

export const wordOrder: Lesson[] = [
  {
    slug: "verb-last",
    title: "The verb always comes last",
    mark: "[最後|さいご]",
    summary: "Subject – object – verb: why Japanese listeners wait for the end.",
    source: "Tae Kim's Guide — “Basic grammar”; Genki I ch. 3; Cure Dolly — the core sentence",
    blocks: [
      {
        type: "idea",
        text: "English goes subject – verb – object. Japanese goes **subject – object – verb**: the verb (or adjective, or です) always comes **last**.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] は パン を {[食|た]べます}。", en: "I eat bread.", note: "Word by word: I (topic) · bread (object) · eat." },
          {
            jp: "[毎朝|まいあさ] [駅|えき] で コーヒー を {[買|か]う}。",
            en: "Every morning I buy coffee at the station.",
            note: "Every morning · at the station · coffee (object) · buy.",
          },
          { jp: "この [部屋|へや] は {[広|ひろ]い}。", en: "This room is spacious.", note: "An adjective can end the sentence too." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[肉|にく] を [食|た]べ{ます}。", en: "I eat meat." },
        b: { jp: "[肉|にく] を [食|た]べ{ません}。", en: "I don't eat meat." },
        diff: "Yes or no is decided in the very last syllables. Always listen to the end of a Japanese sentence!",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Building a sentence? Start from the verb at the end, then add pieces in front of it, each with its particle.",
      },
    ],
  },
  {
    slug: "topic-comment",
    title: "Topic first: set the scene, then comment on it",
    mark: "[話題|わだい]",
    summary: "Japanese sentences often open with “as for X” and then say something about it.",
    source: "Cure Dolly — は and the core sentence; Tae Kim's Guide — “The topic particle は”",
    blocks: [
      {
        type: "idea",
        text: "Many sentences open with a **topic** (with は), then comment on it: “As for X — …”. The core sentence sits inside that frame.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[象|ぞう] は [鼻|はな] が [長|なが]い。",
            en: "Elephants have long trunks.",
            note: "The famous example: as for elephants — trunk is long. The topic (elephants) and the subject (trunk) are different.",
          },
          { jp: "[今日|きょう] は [天気|てんき] が いい。", en: "The weather's nice today.", note: "As for today — the weather is good." },
          { jp: "[日本|にほん] は [電車|でんしゃ] が [便利|べんり] です。", en: "Trains are convenient in Japan." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[昨日|きのう] [本|ほん] を [読|よ]んだ。", en: "I read a book yesterday." },
        b: { jp: "その [本|ほん] {は} [昨日|きのう] [読|よ]んだ。", en: "That book — I read it yesterday." },
        diff: "Moving the object to the front with は makes it the topic, and を disappears. It sounds like you're answering “what about that book?”",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Once a topic is set in a conversation, it's dropped from the following sentences. It carries over until someone changes it.",
      },
    ],
  },
  {
    slug: "particles-move",
    title: "Particles label each word, so the order can move",
    mark: "[順番|じゅんばん]",
    summary: "Why you can shuffle the pieces before the verb — and the usual default order.",
    source: "Genki I ch. 3; Tae Kim's Guide — “Basic grammar”",
    blocks: [
      {
        type: "idea",
        text: "Particles label each word's job, so the pieces before the verb can be **reordered** without changing who did what.",
      },
      {
        type: "pair",
        a: { jp: "[田中|たなか]さん が [花|はな] を [買|か]った。", en: "Tanaka bought flowers." },
        b: { jp: "[花|はな] を [田中|たなか]さん が [買|か]った。", en: "Tanaka bought the flowers.", note: "A little more weight on the flowers." },
        diff: "Same meaning: が still marks the buyer, を the thing bought. In English, swapping the words would flip the meaning.",
      },
      {
        type: "examples",
        items: [
          { jp: "[昨日|きのう] [友達|ともだち] と [公園|こうえん] で [遊|あそ]んだ。", en: "Yesterday I hung out in the park with a friend." },
          {
            jp: "[友達|ともだち] と [昨日|きのう] [公園|こうえん] で [遊|あそ]んだ。",
            en: "Same meaning.",
            note: "Time, partner and place can shuffle. The verb stays last.",
          },
        ],
      },
      {
        type: "text",
        text: "The usual default is roughly **topic (は) → time → place → object (を) → verb**. You can move pieces out of that order; whatever comes first gets a little extra weight.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "The verb doesn't move. In casual speech people sometimes tack a word on afterwards — [食|た]べた？ケーキ (Did you eat it? The cake?) — but that's an afterthought, not the sentence order.",
      },
    ],
  },
  {
    slug: "dropping-words",
    title: "Leaving words out: the invisible “I” and “you”",
    mark: "[省略|しょうりゃく]",
    summary: "Japanese drops whatever context already makes clear — and that's normal.",
    source: "Cure Dolly — zero が and zero は; Genki I ch. 1; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "Japanese leaves out anything the listener can work out — especially **I** and **you**. It isn't lazy: saying them every time sounds odd.",
      },
      {
        type: "pair",
        a: { jp: "[私|わたし] は [昨日|きのう] [映画|えいが] を [見|み]ました。", en: "I watched a movie yesterday.", note: "Correct, but heavy in conversation." },
        b: { jp: "[昨日|きのう] [映画|えいが] を [見|み]ました。", en: "(I) watched a movie yesterday.", note: "Natural — the zero が is clearly “I”." },
        diff: "Repeating [私|わたし]は in every sentence sounds like a textbook, or like you're stressing *I* as opposed to someone else.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう] [何|なに] を しました か？", en: "What did you do yesterday?" },
          { speaker: "B", jp: "[映画|えいが] を [見|み]ました。", en: "(I) watched a movie." },
          { speaker: "A", jp: "[面白|おもしろ]かった です か？", en: "Was (it) good?" },
          { speaker: "B", jp: "はい、とても。", en: "Yes, very." },
        ],
        note: "No “I”, “you” or “it” anywhere — context fills in every subject.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Who's the invisible subject? Statements lean towards **I**, questions towards **you**. Everything else comes from context.",
      },
    ],
  },
  {
    slug: "modifiers-first",
    title: "Describing words and phrases go before the noun",
    mark: "[修飾|しゅうしょく]",
    summary: "Adjectives, の-phrases and whole sentences all sit in front of what they describe.",
    source: "Genki I ch. 9 (noun-modifying clauses); Tae Kim's Guide — “Relative clauses”",
    blocks: [
      {
        type: "idea",
        text: "Everything that describes a noun comes **before** it — adjectives, の-phrases, even whole sentences.",
      },
      {
        type: "examples",
        items: [
          { jp: "{[赤|あか]い} [車|くるま]", en: "a red car" },
          { jp: "{[日本|にほん] の} [車|くるま]", en: "a Japanese car" },
          {
            jp: "{[昨日|きのう] [買|か]った} [車|くるま]",
            en: "the car I bought yesterday",
            note: "A whole sentence (I bought it yesterday) describes the car. No word for “that” or “which” is needed.",
          },
          { jp: "{[母|はは] が [作|つく]った} ケーキ", en: "the cake my mum made", note: "Inside a describing sentence, the subject takes が." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[車|くるま] は [赤|あか]い。", en: "The car is red." },
        b: { jp: "[赤|あか]い [車|くるま]", en: "a red car" },
        diff: "After the noun, the adjective *states* something — it's a full sentence. Before the noun, it just *describes* it — a phrase.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "English puts long descriptions after the noun (the car *that I bought yesterday*). Japanese puts them before, so read long noun phrases from the end backwards.",
      },
    ],
  },
];
