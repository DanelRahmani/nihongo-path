import type { Lesson } from "@/content/types";

export const waVsGa: Lesson = {
  slug: "wa-vs-ga",
  title: "は vs が",
  mark: "は・が",
  summary: "Topic or subject? The four situations where が wins, and why は is the default.",
  source: "Tae Kim's Guide — “The は and が particles”; Genki I ch. 8; Cure Dolly — core sentence and zero が",
  blocks: [
    {
      type: "idea",
      text: "は sets the **topic**: “as for X…”. が marks the **subject** inside the sentence: “X is the one that…”.",
    },
    {
      type: "text",
      text: "Every Japanese sentence has a **core sentence**: a subject marked with が, plus a verb, an adjective, or a noun + です. は sits *outside* that core and tells the listener what we're talking about. Very often the topic and the subject are the same thing, so the が disappears — Cure Dolly calls this the **zero が**.",
    },

    { type: "heading", text: "Same sentence, one particle changed" },
    {
      type: "pair",
      a: { jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student.", note: "As for me — student." },
      b: { jp: "[私|わたし] {が} [学生|がくせい] です。", en: "*I'm* the student.", note: "It's me who is the student." },
      diff: "は just introduces a fact about you. が answers a hidden question — *who's the student?* — and points straight at you.",
    },

    { type: "heading", text: "1 · Question words take が — and so do their answers" },
    {
      type: "examples",
      items: [
        { jp: "[誰|だれ] {が} [来|き]ました か？", en: "Who came?" },
        { jp: "[田中|たなか]さん {が} [来|き]ました。", en: "Tanaka came. (It was Tanaka.)" },
        { jp: "[何|なに] {が} [一番|いちばん] [好|す]き です か？", en: "What do you like best?" },
      ],
    },
    {
      type: "callout",
      kind: "mistake",
      text: "A question word can never be the topic. ✗ [誰|だれ]は[来|き]ましたか → ✓ [誰|だれ]が[来|き]ましたか. You can't say “as for who…”, because you don't know who yet.",
    },

    { type: "heading", text: "2 · New information vs. something we both know" },
    {
      type: "pair",
      a: { jp: "あ、[猫|ねこ] {が} いる！", en: "Oh, there's a cat!", note: "You just noticed it — brand-new information." },
      b: { jp: "[猫|ねこ] {は} [庭|にわ] に いる よ。", en: "The cat's in the garden.", note: "Our cat, the one we both know about." },
      diff: "が brings something new onto the stage. Once it's on stage, you talk *about* it with は.",
    },

    { type: "heading", text: "3 · は contrasts" },
    {
      type: "text",
      text: "Put は on something that would normally take が or を, and you hint at “unlike other things”. Two は in one sentence is almost always a contrast.",
    },
    {
      type: "examples",
      items: [
        {
          jp: "[肉|にく] {は} [食|た]べる けど、[魚|さかな] {は} [食|た]べない。",
          en: "I eat meat, but I don't eat fish.",
        },
        {
          jp: "ビール {は} [飲|の]みます。",
          en: "Beer, I'll drink.",
          note: "…implying: but maybe not the other drinks. Compare neutral ビールを[飲|の]みます.",
        },
      ],
    },

    { type: "heading", text: "4 · Inside a description, the subject takes が" },
    {
      type: "examples",
      items: [
        {
          jp: "[私|わたし] {は} [猫|ねこ] {が} [好|す]き です。",
          en: "I like cats.",
          note: "The core sentence is [猫|ねこ]が[好|す]き — “cats are likeable”. は says from whose point of view: as for me.",
        },
        {
          jp: "[母|はは] {が} [作|つく]った ケーキ",
          en: "the cake my mum made",
          note: "When a clause describes a noun, its subject uses が, never は.",
        },
      ],
    },

    { type: "heading", text: "In real conversation" },
    {
      type: "dialogue",
      lines: [
        { speaker: "A", jp: "これ、[誰|だれ] {が} [作|つく]った の？", en: "Who made this?" },
        { speaker: "B", jp: "[私|わたし] {が} [作|つく]った よ。", en: "I did! (It was me.)" },
        { speaker: "A", jp: "すごい！ [私|わたし] {は} [料理|りょうり] {が} [苦手|にがて] で…", en: "Amazing! Me, I'm bad at cooking…" },
      ],
      note: "が answers “who?”. Then は switches the topic to A — with a little contrast: *you* can cook, *I* can't.",
    },
    {
      type: "callout",
      kind: "tip",
      text: "Default to は when you introduce what you're talking about. Switch to が when you answer *who / what / which*, when you notice something new, or inside a describing clause.",
    },
  ],
};
