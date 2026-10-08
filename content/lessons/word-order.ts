import type { Lesson } from "@/content/types";

export const wordOrder: Lesson[] = [
  {
    slug: "verb-last",
    title: "The verb comes last",
    mark: "[最後|さいご]",
    summary: "Subject – object – verb: why Japanese listeners wait for the end.",
    source: "Tae Kim's Guide — “Basic grammar”; Genki I ch. 3; Cure Dolly — the core sentence",
    register: "both",
    kinds: ["word-order"],
    blocks: [
      {
        type: "idea",
        text: "English goes subject – verb – object, but Japanese goes **subject – object – verb**: in a normal sentence the verb (or adjective, or です/だ) comes **last**, and only small endings like か, よ and ね follow it.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[私|わたし] は パン を {[食|た]べます}。",
            en: "I eat bread.",
            alt: "[私|わたし] は パン を {[食|た]べる}。",
            note: "Word by word: I (topic) · bread (object) · eat.",
          },
          {
            jp: "[毎朝|まいあさ] [駅|えき] で コーヒー を {[買|か]う}。",
            en: "Every morning I buy coffee at the station.",
            alt: "[毎朝|まいあさ] [駅|えき] で コーヒー を {[買|か]います}。",
            note: "Every morning · at the station · coffee (object) · buy.",
          },
          {
            jp: "この [部屋|へや] は {[広|ひろ]い}。",
            en: "This room is spacious.",
            alt: "この [部屋|へや] は {[広|ひろ]い です}。",
            note: "An adjective can end the sentence too.",
          },
          {
            jp: "[週末|しゅうまつ] は [何|なに] を {します} か？",
            en: "What do you do at the weekend?",
            alt: "[週末|しゅうまつ] は [何|なに] {する}？",
            note: "Only the question marker か comes after the verb. (Casual speech often drops を too.)",
          },
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
        kind: "mistake",
        title: "Don't put the verb in the middle",
        text: "✗ [私|わたし]は[食|た]べますパンを。 ✓ [私|わたし]はパンを[食|た]べます。 English puts the verb second; Japanese saves it for the end.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[肉|にく] を [食|た]べます か？", en: "Do you eat meat?" },
          { speaker: "B", jp: "[肉|にく] は [食|た]べません。 [魚|さかな] は [食|た]べます。", en: "Meat, no. Fish, yes." },
          { speaker: "A", jp: "じゃあ、 すし は どう です か？", en: "Then how about sushi?" },
          { speaker: "B", jp: "いい です ね！", en: "Sounds good!" },
        ],
        note: "B's answer turns on the last word of each sentence: [食|た]べません, then [食|た]べます. B also swaps を for は to contrast meat with fish: the Particles unit explains how.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Building a sentence? Start from the verb at the end, then add pieces in front of it, each with its particle.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Put the pieces in order to say “I drink tea”: [飲|の]みます · お[茶|ちゃ]を",
            answers: ["お[茶|ちゃ] を [飲|の]みます"],
            explanation: "The object and its particle come first, the verb last: お[茶|ちゃ]を[飲|の]みます.",
          },
          {
            prompt: "Make it “I don't eat meat”: [肉|にく]を[食|た]べます。",
            answers: ["[肉|にく] を [食|た]べません", "[肉|にく] は [食|た]べません"],
            explanation: "Only the end changes: [食|た]べます → [食|た]べません. That's why you listen to the last word. ([肉|にく]は[食|た]べません works too: は adds “meat, at least”.)",
          },
          {
            prompt: "Turn it into a question: [明日|あした][来|き]ます。",
            answers: ["[明日|あした] [来|き]ます か"],
            explanation: "か goes after the verb, at the very end: [明日|あした][来|き]ますか？",
          },
          {
            prompt: "Put the pieces in order to say “I watch TV every day”: [見|み]ます · テレビを · [毎日|まいにち]",
            answers: ["[毎日|まいにち] テレビ を [見|み]ます", "テレビ を [毎日|まいにち] [見|み]ます"],
            explanation: "Time usually comes first ([毎日|まいにち]テレビを[見|み]ます), but テレビを[毎日|まいにち][見|み]ます works too. Either way the verb is last.",
          },
        ],
      },
    ],
  },
  {
    slug: "topic-comment",
    title: "Topic first: set the scene, then comment on it",
    mark: "[主題|しゅだい]",
    summary: "Japanese sentences often open with “as for X” and then say something about it.",
    source:
      "Cure Dolly — は and the core sentence; Tae Kim's Guide — “The topic particle は”; the elephant sentence is the title of Mikami Akira's 1960 book Zou wa hana ga nagai",
    register: "both",
    kinds: ["word-order", "particles"],
    blocks: [
      {
        type: "idea",
        text: "Many sentences open with a **topic** marked by は (“as for X…”) and then comment on it.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "{[象|ぞう] は} [鼻|はな] が [長|なが]い。",
            en: "Elephants have long trunks.",
            alt: "{[象|ぞう] は} [鼻|はな] が [長|なが]い です。",
            note: "The famous example: as for elephants, the trunk is long. The topic (elephants) and the subject (the trunk) are different. Inside the frame sits the core sentence, [鼻|はな]が[長|なが]い: a subject with が, plus its verb, adjective or noun + です.",
          },
          {
            jp: "{[今日|きょう] は} [天気|てんき] が いい。",
            en: "The weather's nice today.",
            alt: "{[今日|きょう] は} [天気|てんき] が いい です。",
            note: "As for today: the weather is good.",
          },
          {
            jp: "{[日本|にほん] は} [電車|でんしゃ] が [便利|べんり] です。",
            en: "Trains are convenient in Japan.",
            alt: "{[日本|にほん] は} [電車|でんしゃ] が [便利|べんり] だ よ。",
            note: "As for Japan: trains are convenient.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[昨日|きのう] その [本|ほん] を [読|よ]んだ。", en: "I read that book yesterday." },
        b: { jp: "その [本|ほん] {は} [昨日|きのう] [読|よ]んだ。", en: "That book: I read it yesterday." },
        diff: "Moving the object to the front with は makes it the topic, and を disappears. It sounds like you're answering “what about that book?”",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "は doesn't mean “is”",
        text: "✗ は = “is” ✓ は = “as for”. In [私|わたし]は[学生|がくせい]です, the “is” is です; は only sets the topic. That's why [象|ぞう]は[鼻|はな]が[長|なが]い has no “is” for the elephant at all.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[何|なに] に する？", en: "What are you getting?" },
          { speaker: "B", jp: "[私|わたし] は ラーメン。", en: "I'll have ramen." },
          { speaker: "C", jp: "[僕|ぼく] は カレー。", en: "Curry for me." },
        ],
        note: "Word for word, B says “As for me: ramen”, not “I am ramen”. The topic says who we're talking about, and the comment only has to answer the question.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Once a topic is set in a conversation, it's usually dropped from the following sentences. It carries over until someone changes it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make その[本|ほん] the topic: [昨日|きのう]その[本|ほん]を[読|よ]んだ。 → その[本|ほん]＿[昨日|きのう][読|よ]んだ。",
            answers: ["は"],
            explanation: "は makes it the topic and replaces を: その[本|ほん]は[昨日|きのう][読|よ]んだ.",
          },
          {
            prompt: "Type the two missing particles in order: [私|わたし]＿[目|め]＿[悪|わる]い。 (My eyesight is bad.)",
            answers: ["は が"],
            explanation: "As for me (は), the eyes (が) are bad: the same shape as [象|ぞう]は[鼻|はな]が[長|なが]い.",
          },
          {
            prompt: "Put the pieces in order to say “Tokyo has a lot of people”: [多|おお]い · [人|ひと]が · [東京|とうきょう]は",
            answers: ["[東京|とうきょう] は [人|ひと] が [多|おお]い", "[東京|とうきょう] は [人|ひと] が [多|おお]い です"],
            explanation: "Topic first, then the core sentence: [東京|とうきょう]は[人|ひと]が[多|おお]い. As for Tokyo, people are many.",
          },
          {
            prompt: "Ordering with friends, say “I'll have curry” the short way, starting with [私|わたし].",
            answers: ["[私|わたし] は カレー"],
            explanation: "[私|わたし]はカレー: as for me, curry. With friends you don't need a verb at all.",
          },
        ],
      },
    ],
  },
  {
    slug: "particles-move",
    title: "Particles label each word, so the order can move",
    mark: "[順番|じゅんばん]",
    summary: "Why you can shuffle the pieces before the verb — and the usual default order.",
    source: "Genki I ch. 3; Tae Kim's Guide — “Basic grammar”",
    register: "plain",
    kinds: ["word-order", "particles"],
    blocks: [
      {
        type: "idea",
        text: "Particles label each word's job, so the pieces before the verb can be **reordered** without changing who did what.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[昨日|きのう] [友達|ともだち] {と} [公園|こうえん] {で} [遊|あそ]んだ。",
            en: "Yesterday I hung out with a friend in the park.",
          },
          {
            jp: "[昨日|きのう] [公園|こうえん] {で} [友達|ともだち] {と} [遊|あそ]んだ。",
            en: "Yesterday I hung out in the park with a friend.",
            note: "と still marks who with, で still marks where, so swapping them keeps the facts the same.",
          },
          {
            jp: "[友達|ともだち] {と} [昨日|きのう] [公園|こうえん] {で} [遊|あそ]んだ。",
            en: "I hung out with a friend in the park yesterday.",
            note: "Time, partner and place can shuffle. The verb stays last.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[田中|たなか]-さん {が} [花|はな] {を} [買|か]った。", en: "Tanaka bought flowers." },
        b: {
          jp: "[花|はな] {を} [田中|たなか]-さん {が} [買|か]った。",
          en: "It was Tanaka who bought the flowers.",
          note: "The flowers are now the known thing, and the focus falls on [田中|たなか]さん, right before the verb, like an answer to “who bought the flowers?”",
        },
        diff: "Same facts: が still marks the buyer and を the thing bought. In English, swapping the words would flip the meaning.",
      },
      {
        type: "text",
        text: "The usual default is roughly **topic (は) or subject (が) → time → place → partner or target (と, に) → object (を) → verb**. You can move pieces out of that order: whatever sits just before the verb tends to carry the new or important information, and things moved to the front feel like background.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Read the particles, not the order",
        text: "✗ [魚|さかな]を[猫|ねこ]が[食|た]べた = “the fish ate the cat” ✓ “the cat ate the fish”. が marks the eater wherever it sits, so read the particles, not the order.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "この [写真|しゃしん]、 [誰|だれ] が [撮|と]った の？", en: "Who took this photo?" },
          { speaker: "B", jp: "[姉|あね] が [撮|と]った よ。", en: "My big sister took it." },
          { speaker: "A", jp: "え、 すごい！ [上手|じょうず] だ ね。", en: "Wow! She's good." },
        ],
        note: "A starts with the photo, the thing both can see, and asks who. B answers with the new information, [姉|あね]が, right before the verb.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "In casual speech, people sometimes add a word after the verb as an afterthought, after a clear pause: [食|た]べた？ケーキ (Did you eat it? The cake?). That's an add-on, not the sentence order.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Put the pieces in order, verb last: [買|か]った · [花|はな]を · [母|はは]が",
            answers: ["[母|はは] が [花|はな] を [買|か]った", "[花|はな] を [母|はは] が [買|か]った"],
            explanation: "Both orders work: [母|はは]が[花|はな]を[買|か]った, or [花|はな]を[母|はは]が[買|か]った. The particles say who bought what.",
          },
          {
            prompt: "In [手紙|てがみ]を[兄|あに]が[書|か]いた, who did the writing? Type the Japanese word.",
            answers: ["[兄|あに]", "[兄|あに] が"],
            explanation: "が marks the one who wrote, wherever it sits: my big brother wrote the letter.",
          },
          {
            prompt: "Fix the order: [弟|おとうと]が[食|た]べたケーキを。 (My brother ate the cake.)",
            answers: ["[弟|おとうと] が ケーキ を [食|た]べた", "ケーキ を [弟|おとうと] が [食|た]べた"],
            explanation: "The verb goes last: [弟|おとうと]がケーキを[食|た]べた. With the verb in the middle, it reads as “the cake my brother ate…”, a phrase still waiting for its own verb.",
          },
          {
            prompt: "Move [公園|こうえん]で to the front: [昨日|きのう][公園|こうえん]で[遊|あそ]んだ。",
            answers: ["[公園|こうえん] で [昨日|きのう] [遊|あそ]んだ"],
            explanation: "[公園|こうえん]で[昨日|きのう][遊|あそ]んだ: で still marks the place, so the facts stay the same, and the focus now falls on [昨日|きのう], right before the verb.",
          },
        ],
      },
    ],
  },
  {
    slug: "dropping-words",
    title: "Leaving words out: the invisible “I” and “you”",
    mark: "[省略|しょうりゃく]",
    summary: "Japanese drops whatever context already makes clear — and that's normal.",
    source: "Cure Dolly — zero が; Genki I ch. 1; Tae Kim's Guide",
    register: "polite",
    kinds: ["word-order"],
    blocks: [
      {
        type: "idea",
        text: "Japanese leaves out whatever the listener can work out from context, especially **I** and **you**.",
      },
      {
        type: "examples",
        items: [
          { jp: "[昨日|きのう] [映画|えいが] を {[見|み]ました}。", en: "(I) watched a movie yesterday.", note: "A statement: the unsaid subject is “I”." },
          { jp: "[明日|あした] {[来|き]ます} か？", en: "Are (you) coming tomorrow?", note: "A question: the unsaid subject is “you”." },
          { jp: "{おいしい です} ね。", en: "(This) is delicious, isn't it?", note: "Whatever you're both eating: no need to name it." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[私|わたし] は [昨日|きのう] [映画|えいが] を [見|み]ました。", en: "I watched a movie yesterday.", note: "Correct, but heavy in conversation." },
        b: {
          jp: "[昨日|きのう] [映画|えいが] を [見|み]ました。",
          en: "(I) watched a movie yesterday.",
          note: "Natural: the unsaid subject (Cure Dolly's “zero が”) is clearly “I”.",
        },
        diff: "Repeating [私|わたし]は in every sentence sounds like a textbook, or like you're stressing *I* as opposed to someone else.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Leave out あなた",
        text: "✗ あなたは[明日|あした][来|き]ますか？ ✓ [明日|あした][来|き]ますか？ Saying あなた to the person in front of you can sound distant, even rude. Leave it out, or use their name with さん.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう] [何|なに] を しました か？", en: "What did you do yesterday?" },
          { speaker: "B", jp: "[映画|えいが] を [見|み]ました。", en: "(I) watched a movie." },
          { speaker: "A", jp: "[面白|おもしろ]かった です か？", en: "Was (it) interesting?" },
          { speaker: "B", jp: "はい、 とても。", en: "Yes, very." },
        ],
        note: "No “I”, “you” or “it” anywhere: context fills in every subject.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Who's the invisible subject? Statements lean towards **I**, questions towards **you**. Everything else comes from context.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it sound natural by dropping the obvious: [私|わたし]は[毎朝|まいあさ]コーヒーを[飲|の]みます。",
            answers: ["[毎朝|まいあさ] コーヒー を [飲|の]みます"],
            explanation: "When you're talking about yourself, [私|わたし]は usually gets dropped: [毎朝|まいあさ]コーヒーを[飲|の]みます.",
          },
          {
            prompt: "Drop あなた: あなたは[明日|あした][来|き]ますか？",
            answers: ["[明日|あした] [来|き]ます か"],
            explanation: "[明日|あした][来|き]ますか？ A question is about “you” unless it says otherwise.",
          },
          {
            prompt: "Answer “Yes, I ate it” without saying “I” or “it”: [昨日|きのう]のケーキ、[食|た]べましたか？ → はい、＿＿",
            answers: ["[食|た]べました", "はい [食|た]べました"],
            explanation: "はい、[食|た]べました. The cake and the eater are both clear from the question.",
          },
          {
            prompt: "Answer “Yes, it was interesting” the short way: [映画|えいが]は[面白|おもしろ]かったですか？ → はい、＿＿",
            answers: ["[面白|おもしろ]かった です", "はい [面白|おもしろ]かった です"],
            explanation: "はい、[面白|おもしろ]かったです. No need to say [映画|えいが]は again.",
          },
        ],
      },
      { type: "link", href: "/learn/culture/avoid-anata", label: "Why Japanese avoids あなた" },
    ],
  },
  {
    slug: "modifiers-first",
    title: "Describing words and phrases go before the noun",
    mark: "[修飾|しゅうしょく]",
    summary: "Adjectives, の-phrases and whole sentences all sit in front of what they describe.",
    source: "Genki I ch. 9 and Genki II ch. 15 (noun-modifying clauses); Tae Kim's Guide — “Relative clauses”",
    register: "plain",
    kinds: ["word-order"],
    blocks: [
      {
        type: "idea",
        text: "Everything that describes a noun comes **before** it: adjectives, の-phrases, even whole sentences.",
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
          {
            jp: "{[父|ちち] が [焼|や]いた} パン",
            en: "the bread my dad baked",
            note: "Inside a describing sentence the subject takes が, not は; in short clauses it can also take の (see the dialogue).",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[車|くるま] は [赤|あか]い。", en: "The car is red." },
        b: { jp: "[赤|あか]い [車|くるま]", en: "a red car" },
        diff: "After the noun, the adjective *states* something: it's a full sentence. Before the noun, it just *describes* it: a phrase.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No の after an i-adjective",
        text: "✗ [赤|あか]いの[車|くるま] ✓ [赤|あか]い[車|くるま]. の links a noun to a noun ([日本|にほん]の[車|くるま]); an i-adjective or a verb goes straight before the noun it describes, and a na-adjective takes な ([静|しず]かな[町|まち], in Core grammar). On its own, [赤|あか]いの means “the red one”: [赤|あか]いのがいい, “I'd like the red one”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "どの [人|ひと] が [田中|たなか]-さん？", en: "Which one is Tanaka?" },
          { speaker: "B", jp: "あそこ で コーヒー を [飲|の]んで いる [人|ひと] だ よ。", en: "The person drinking coffee over there." },
          { speaker: "A", jp: "あの [背|せ] の [高|たか]い [人|ひと]？", en: "The tall one?" },
          { speaker: "B", jp: "うん、 その [人|ひと]。", en: "Yes, that one." },
        ],
        note: "Each description sits right before [人|ひと]: a whole clause (あそこでコーヒーを[飲|の]んでいる, “is drinking coffee over there”: the Verbs unit covers 〜ている) or a short one ([背|せ]の[高|たか]い). In a short describing clause like this, が often becomes の: [背|せ]が[高|たか]い → [背|せ]の[高|たか]い[人|ひと].",
      },
      {
        type: "callout",
        kind: "tip",
        text: "English puts long descriptions after the noun (the car *that I bought yesterday*). Japanese puts them before, so find the noun at the end first, then read the description in front of it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Say “a cold drink” with [冷|つめ]たい and [飲|の]み[物|もの].",
            answers: ["[冷|つめ]たい [飲|の]み[物|もの]"],
            explanation: "The adjective goes straight before the noun: [冷|つめ]たい[飲|の]み[物|もの].",
          },
          {
            prompt: "Say “my friend's bag” with [友達|ともだち] and かばん.",
            answers: ["[友達|ともだち] の かばん"],
            explanation: "Noun + の + noun: [友達|ともだち]のかばん. The owner comes first.",
          },
          {
            prompt: "Say “the book I read yesterday” with [昨日|きのう], [読|よ]んだ and [本|ほん].",
            answers: ["[昨日|きのう] [読|よ]んだ [本|ほん]"],
            explanation: "The whole describing sentence goes before the noun: [昨日|きのう][読|よ]んだ[本|ほん].",
          },
          {
            prompt: "Fix it: [高|たか]いの[山|やま] (a high mountain)",
            answers: ["[高|たか]い [山|やま]"],
            explanation: "No の between an i-adjective and its noun: [高|たか]い[山|やま].",
          },
        ],
      },
    ],
  },
];
