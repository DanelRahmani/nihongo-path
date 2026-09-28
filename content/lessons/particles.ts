import type { Lesson } from "@/content/types";

export const particles: Lesson[] = [
  {
    slug: "wa-topic",
    title: "は marks the topic: “as for…”",
    mark: "は",
    summary: "Set up what you're talking about, then say something about it.",
    source: "Tae Kim's Guide — “The topic particle は”; Genki I ch. 1; Cure Dolly — は and the core sentence",
    blocks: [
      { type: "idea", text: "は means “as for X…”. It sets the **topic**, and the rest of the sentence comments on it." },
      {
        type: "text",
        text: "As a particle, は is pronounced **wa**. It sits *outside* the core sentence: it doesn't say who does what, it says what we're talking about.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student.", note: "As for me — (I) am a student." },
          { jp: "[今日|きょう] {は} [暑|あつ]い です ね。", en: "It's hot today, isn't it?", note: "The topic doesn't have to be a person. As for today — hot." },
          { jp: "この [本|ほん] {は} [面白|おもしろ]い。", en: "This book is interesting." },
          { jp: "[日曜日|にちようび] {は} [休|やす]み です。", en: "Sunday is my day off." },
        ],
      },
      { type: "heading", text: "The topic and the subject can be different" },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {は} [大|おお]きい です。", en: "Tokyo is big." },
        b: {
          jp: "[東京|とうきょう] {は} [人|ひと] {が} [多|おお]い です。",
          en: "Tokyo has a lot of people.",
          note: "Topic: Tokyo. Core sentence: people are many.",
        },
        diff: "In A, Tokyo is both the topic and the (invisible) subject. In B the topic sets the stage, and the core sentence has its own subject: as for Tokyo — people are many.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "The particle は is pronounced **wa**, not ha. Only the particle, though: inside words like はな (flower) it's still ha.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[趣味|しゅみ] {は} [何|なん] です か？", en: "What are your hobbies?" },
          { speaker: "B", jp: "[料理|りょうり] です。", en: "Cooking." },
        ],
        note: "Once the topic is set, Japanese drops it. B doesn't repeat [趣味|しゅみ]は — the topic carries over.",
      },
    ],
  },
  {
    slug: "ga-subject",
    title: "が marks the subject: who or what does it",
    mark: "が",
    summary: "The heart of the core sentence — and why it's there even when you can't see it.",
    source: "Cure Dolly — core sentence and zero が; Tae Kim's Guide — “The identifier particle が”; Genki I ch. 8",
    blocks: [
      {
        type: "idea",
        text: "が marks the **subject** of the core sentence: the person or thing that *does* the verb or *is* the adjective.",
      },
      {
        type: "text",
        text: "Cure Dolly's key point: every Japanese sentence has a が-subject, even when nobody says it. If it's obvious from context, it stays invisible — the **zero が**.",
      },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] {が} [降|ふ]って いる。", en: "It's raining.", note: "Literally: rain is falling. The subject is the rain." },
          { jp: "[電車|でんしゃ] {が} [来|き]た。", en: "The train's here.", note: "Literally: the train came." },
          {
            jp: "お[腹|なか] {が} すいた。",
            en: "I'm hungry.",
            note: "Literally: (my) stomach has become empty. The subject is your stomach, not you.",
          },
          { jp: "[頭|あたま] {が} [痛|いた]い。", en: "I have a headache.", note: "Literally: head is painful." },
        ],
      },
      { type: "heading", text: "The zero が" },
      {
        type: "pair",
        a: { jp: "[私|わたし] {が} [食|た]べる。", en: "*I'll* eat it.", note: "Me, not someone else." },
        b: { jp: "[食|た]べる。", en: "I'll eat.", note: "Zero が: the subject is understood." },
        diff: "Saying the が-subject out loud puts a spotlight on it. Most of the time Japanese leaves it invisible and lets context fill it in.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Don't translate が as “is”. が only points at the subject. The verb or adjective at the end is what the sentence *says* about it.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "When you read, find the verb or adjective at the end first. Then ask: *who or what* does this? That's the が-subject — even when it's invisible.",
      },
    ],
  },
  {
    slug: "wa-vs-ga",
    title: "Topic は vs subject が: which one to use",
    mark: "は・が",
    summary: "The four situations where が wins, and why は is the default.",
    source: "Tae Kim's Guide — “The は and が particles”; Genki I ch. 8; Cure Dolly — core sentence and zero が",
    blocks: [
      {
        type: "idea",
        text: "は sets the **topic**: “as for X…”. が marks the **subject** inside the sentence: “X is the one that…”.",
      },
      {
        type: "text",
        text: "Every Japanese sentence has a **core sentence**: a subject marked with が, plus a verb, an adjective, or a noun + です. は sits *outside* that core and tells the listener what we're talking about. Very often the topic and the subject are the same thing, so the が disappears — the **zero が**.",
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
          { jp: "[肉|にく] {は} [食|た]べる けど、[魚|さかな] {は} [食|た]べない。", en: "I eat meat, but I don't eat fish." },
          {
            jp: "ビール {は} [飲|の]みます。",
            en: "Beer, I'll drink.",
            note: "…implying: but maybe not the other drinks. Compare the neutral ビールを[飲|の]みます.",
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
          { jp: "[母|はは] {が} [作|つく]った ケーキ", en: "the cake my mum made", note: "When a clause describes a noun, its subject uses が, never は." },
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
  },
  {
    slug: "wo-object",
    title: "を marks what the action is done to",
    mark: "を",
    summary: "The direct object: the thing you eat, read, buy or watch.",
    source: "Tae Kim's Guide — “The object particle を”; Genki I ch. 3",
    blocks: [
      { type: "idea", text: "を marks the **object**: the thing an action is done *to*. It's written wo but pronounced **o**." },
      {
        type: "examples",
        items: [
          { jp: "パン {を} [食|た]べる。", en: "I eat bread.", note: "Zero が: the eater is clear from context." },
          { jp: "[本|ほん] {を} [読|よ]みます。", en: "I read books." },
          { jp: "[映画|えいが] {を} [見|み]ました。", en: "I watched a movie." },
          { jp: "コーヒー {を} ください。", en: "Coffee, please.", note: "Literally: please give (me) coffee." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[猫|ねこ] {が} [見|み]て いる。", en: "The cat is watching." },
        b: { jp: "[猫|ねこ] {を} [見|み]て いる。", en: "(I'm) watching the cat." },
        diff: "One particle flips the roles. With が the cat does the watching; with を the cat is being watched.",
      },
      { type: "heading", text: "Moving through or out of a place also takes を" },
      {
        type: "examples",
        items: [
          { jp: "[公園|こうえん] {を} [歩|ある]く。", en: "I walk through the park." },
          { jp: "[道|みち] {を} [渡|わた]る。", en: "I cross the road." },
          { jp: "[家|いえ] {を} [出|で]る。", en: "I leave the house.", note: "With [出|で]る (leave), を marks the place you exit." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Some things that are objects in English take が in Japanese: [猫|ねこ]が[好|す]き (like cats), [日本語|にほんご]が[分|わ]かる (understand Japanese), [車|くるま]が[欲|ほ]しい (want a car). These words describe a *state*, so the thing is their subject.",
      },
    ],
  },
  {
    slug: "ni-target",
    title: "に: the target — where to, when, and to whom",
    mark: "に",
    summary: "The place you go to, the time something happens, where something is, who receives.",
    source: "Tae Kim's Guide — “The target particle に”; Genki I ch. 3–4, 14",
    blocks: [
      {
        type: "idea",
        text: "に points at a **target**: the place you're going, the time something happens, the place something *is*, or the person who receives.",
      },
      { type: "heading", text: "Destination" },
      {
        type: "examples",
        items: [
          { jp: "[学校|がっこう] {に} [行|い]く。", en: "I'm going to school." },
          { jp: "[日本|にほん] {に} [来|き]ました。", en: "I came to Japan." },
        ],
      },
      { type: "heading", text: "A point in time" },
      {
        type: "examples",
        items: [
          { jp: "[七時|しちじ] {に} [起|お]きます。", en: "I get up at seven." },
          {
            jp: "[日曜日|にちようび] {に} [東京|とうきょう] {に} [行|い]く。",
            en: "I'm going to Tokyo on Sunday.",
            note: "Two に: one for the time, one for the destination. Time tends to come first — a habit, not a strict rule.",
          },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Relative time words take no particle: ✗ [明日|あした]に[行|い]く → ✓ [明日|あした][行|い]く. The same goes for [今日|きょう], [昨日|きのう], [毎日|まいにち] and [今|いま].",
      },
      { type: "heading", text: "Where something exists" },
      {
        type: "examples",
        items: [
          { jp: "[猫|ねこ] は [部屋|へや] {に} いる。", en: "The cat is in the room." },
          { jp: "[駅|えき] の [前|まえ] {に} コンビニ が ある。", en: "There's a convenience store in front of the station." },
        ],
      },
      { type: "heading", text: "Purpose, change, and receivers" },
      {
        type: "examples",
        items: [
          {
            jp: "[公園|こうえん] に [遊|あそ]び {に} [行|い]く。",
            en: "I'm going to the park to play.",
            note: "Verb stem + に + go/come = go/come *in order to* do something.",
          },
          { jp: "[水|みず] が [氷|こおり] {に} なった。", en: "The water turned into ice.", note: "に marks what something becomes." },
          { jp: "[友達|ともだち] {に} プレゼント を あげた。", en: "I gave my friend a present." },
        ],
      },
    ],
  },
  {
    slug: "de-place-means",
    title: "で: where an action happens, and what you use",
    mark: "で",
    summary: "The stage for an action, and the tool or means you do it with.",
    source: "Tae Kim's Guide — “The contextual particle で”; Genki I ch. 3, 10",
    blocks: [
      { type: "idea", text: "で marks the **stage** where an action happens, or the **means** you use to do it." },
      { type: "heading", text: "Where the action happens" },
      {
        type: "examples",
        items: [
          { jp: "[公園|こうえん] {で} [遊|あそ]ぶ。", en: "I play in the park." },
          { jp: "[喫茶店|きっさてん] {で} コーヒー を [飲|の]む。", en: "I drink coffee at a café." },
          { jp: "[図書館|としょかん] {で} [勉強|べんきょう] します。", en: "I study at the library." },
        ],
      },
      { type: "heading", text: "By means of" },
      {
        type: "examples",
        items: [
          { jp: "[電車|でんしゃ] {で} [東京|とうきょう] に [行|い]く。", en: "I go to Tokyo by train." },
          { jp: "[日本語|にほんご] {で} [話|はな]しましょう。", en: "Let's talk in Japanese." },
          { jp: "[箸|はし] {で} [食|た]べる。", en: "I eat with chopsticks." },
        ],
      },
      { type: "heading", text: "Within a range" },
      {
        type: "examples",
        items: [
          { jp: "[世界|せかい] {で} [一番|いちばん] おいしい ラーメン", en: "the most delicious ramen in the world" },
          { jp: "クラス {で} [一番|いちばん] [背|せ] が [高|たか]い。", en: "(She's) the tallest in the class." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Ask yourself: is something *happening* there? Then it's で. Is something just *there*, or going there? Then it's に. The next lesson puts them side by side.",
      },
    ],
  },
  {
    slug: "ni-vs-de",
    title: "に vs で: being somewhere vs doing something there",
    mark: "に・で",
    summary: "Same place, different particle — the verb decides.",
    source: "Genki I ch. 3–4; Tae Kim's Guide — に and で",
    blocks: [
      { type: "idea", text: "に is for **being** at or **going** to a place. で is for **doing** something at a place." },
      {
        type: "pair",
        a: { jp: "[図書館|としょかん] {に} いる。", en: "I'm at the library.", note: "Just existing there." },
        b: { jp: "[図書館|としょかん] {で} [勉強|べんきょう] する。", en: "I study at the library.", note: "An action happening there." },
        diff: "Same library. いる (to be somewhere) takes に; [勉強|べんきょう]する (to study — an action) takes で.",
      },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {に} [住|す]んで いる。", en: "I live in Tokyo." },
        b: { jp: "[東京|とうきょう] {で} [働|はたら]いて いる。", en: "I work in Tokyo." },
        diff: "[住|す]む (live) is about where you *are*, so it takes に. [働|はたら]く (work) is an activity, so it takes で. Learners mix these up constantly.",
      },
      {
        type: "pair",
        a: { jp: "ここ {に} [名前|なまえ] を [書|か]いて ください。", en: "Please write your name here.", note: "On this spot — where the ink lands." },
        b: { jp: "ここ {で} [名前|なまえ] を [書|か]いて ください。", en: "Please write your name here.", note: "In this place — at this desk, not elsewhere." },
        diff: "Both are correct, with different pictures: に is the target the writing ends up on, で is where you are while you write.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "✗ [部屋|へや]で[猫|ねこ]がいる → ✓ [部屋|へや]に[猫|ねこ]がいる. ある and いる always take に for their location.",
      },
    ],
  },
  {
    slug: "e-vs-ni",
    title: "へ vs に: heading toward vs arriving at",
    mark: "へ",
    summary: "へ points in a direction; に points at the destination itself.",
    source: "Tae Kim's Guide — “The directional particle へ”; Genki I ch. 3",
    blocks: [
      { type: "idea", text: "へ (pronounced **e**) marks a **direction**: toward. に marks the **destination** itself." },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {へ} [行|い]く。", en: "I'm heading to Tokyo." },
        b: { jp: "[東京|とうきょう] {に} [行|い]く。", en: "I'm going to Tokyo." },
        diff: "With motion verbs the two are nearly interchangeable. へ feels like *the direction you're heading*; に like *the point you'll arrive at*. In everyday speech, に is more common.",
      },
      {
        type: "examples",
        items: [
          { jp: "[北|きた] {へ} [向|む]かう。", en: "I head north.", note: "Pure direction — へ fits naturally." },
          {
            jp: "[母|はは] {へ の} [手紙|てがみ]",
            en: "a letter to my mother",
            note: "へ can link to a noun with の. に can't: ✗ [母|はは]にの[手紙|てがみ].",
          },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "へ only works with movement. For time, existence or change it has to be に: ✗ [七時|しちじ]へ → ✓ [七時|しちじ]に.",
      },
    ],
  },
  {
    slug: "to-ya",
    title: "と and や: “and”, “with”, and “things like”",
    mark: "と・や",
    summary: "Listing nouns — the complete list vs a few examples — and doing things with someone.",
    source: "Genki I ch. 4, 11; Tae Kim's Guide — “The inclusive particle と” and “The vague listing particle や”",
    blocks: [
      {
        type: "idea",
        text: "と joins nouns into a **complete** list: A and B. や gives **examples**: A, B, and so on. と also means **with**.",
      },
      {
        type: "pair",
        a: { jp: "パン {と} [卵|たまご] を [買|か]った。", en: "I bought bread and eggs.", note: "That's everything." },
        b: { jp: "パン {や} [卵|たまご] を [買|か]った。", en: "I bought bread, eggs and so on.", note: "Just examples." },
        diff: "と closes the list; や leaves it open. Add など to make the “etc.” explicit: パンや[卵|たまご]など.",
      },
      { type: "heading", text: "と as “with”" },
      {
        type: "examples",
        items: [
          { jp: "[友達|ともだち] {と} [映画|えいが] を [見|み]た。", en: "I watched a movie with a friend." },
          { jp: "[先生|せんせい] {と} [話|はな]しました。", en: "I talked with the teacher." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "と and や only join **nouns**. To join adjectives or sentences, use the て form: ✗ [安|やす]いとおいしい → ✓ [安|やす]くておいしい (cheap and tasty).",
      },
      {
        type: "callout",
        kind: "tip",
        text: "と also quotes what someone said or thought: 「おはよう」と[言|い]った (said “good morning”).",
      },
    ],
  },
  {
    slug: "mo-also",
    title: "も: “too” and “also”",
    mark: "も",
    summary: "The inclusive topic — it takes the place of は, が or を.",
    source: "Genki I ch. 2; Tae Kim's Guide — “The inclusive topic particle も”; Cure Dolly — も as the inclusive は",
    blocks: [
      {
        type: "idea",
        text: "も means **too / also**. Like は it marks a topic — but an **inclusive** one: this *as well as* something else.",
      },
      {
        type: "pair",
        a: { jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student." },
        b: { jp: "[私|わたし] {も} [学生|がくせい] です。", en: "I'm a student too." },
        diff: "は singles you out (exclusive). も adds you to what was said before (inclusive).",
      },
      {
        type: "examples",
        items: [
          { jp: "パン {も} [食|た]べる。", en: "I'll eat bread too.", note: "も takes the place of を — never ✗ パンをも." },
          { jp: "[猫|ねこ] {も} [犬|いぬ] {も} [好|す]き です。", en: "I like both cats and dogs.", note: "A も B も = both A and B." },
          { jp: "[何|なに] {も} [食|た]べなかった。", en: "I didn't eat anything.", note: "Question word + も + negative = not any." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "も replaces は, が and を — don't stack them: ✗ [私|わたし]はも → ✓ [私|わたし]も. With other particles it goes after: [東京|とうきょう]にも[行|い]った (went to Tokyo too).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[日本|にほん] の [映画|えいが] が [好|す]き です。", en: "I like Japanese films." },
          { speaker: "B", jp: "[私|わたし] {も}！", en: "Me too!" },
        ],
      },
    ],
  },
  {
    slug: "no-linking",
    title: "の: linking nouns — “’s” and “of”",
    mark: "の",
    summary: "Possession, description, and の as “the one”.",
    source: "Genki I ch. 1–2; Tae Kim's Guide — “The の particle”",
    blocks: [
      {
        type: "idea",
        text: "の links two nouns: in **A の B**, the B is the main thing and A describes it. Read it backwards: B *of* A.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {の} [本|ほん]", en: "my book" },
          { jp: "[日本|にほん] {の} [車|くるま]", en: "a Japanese car" },
          { jp: "[友達|ともだち] {の} お[母|かあ]さん", en: "my friend's mother" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[日本語|にほんご] {の} [先生|せんせい]", en: "a Japanese teacher", note: "A teacher *of Japanese*." },
        b: { jp: "[先生|せんせい] {の} [日本語|にほんご]", en: "the teacher's Japanese" },
        diff: "Order matters: the last noun is the main thing, and everything before の describes it.",
      },
      { type: "heading", text: "の as “the one”" },
      {
        type: "examples",
        items: [
          { jp: "この [傘|かさ] は [誰|だれ] {の} です か？", en: "Whose umbrella is this?", note: "Literally: whose one is it?" },
          { jp: "[赤|あか]い {の} が いい。", en: "I'd like the red one." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        text: "い-adjectives connect straight to nouns — no の: ✗ [赤|あか]いの[車|くるま] → ✓ [赤|あか]い[車|くるま].",
      },
    ],
  },
  {
    slug: "kara-made",
    title: "から and まで: from … until",
    mark: "から",
    summary: "Start and end points in time and space — plus から as “because”.",
    source: "Genki I ch. 4, 6; Tae Kim's Guide — から and まで",
    blocks: [
      { type: "idea", text: "から marks the **starting point**: from. まで marks the **end point**: until, or as far as." },
      {
        type: "examples",
        items: [
          { jp: "[九時|くじ] {から} [五時|ごじ] {まで} [働|はたら]きます。", en: "I work from nine to five." },
          { jp: "[家|いえ] {から} [駅|えき] {まで} [歩|ある]いた。", en: "I walked from home to the station." },
          { jp: "イギリス {から} [来|き]ました。", en: "I'm from the UK.", note: "Literally: I came from the UK." },
        ],
      },
      { type: "heading", text: "から after a sentence: because" },
      {
        type: "examples",
        items: [
          {
            jp: "[暑|あつ]い {から}、[窓|まど] を [開|あ]けて。",
            en: "It's hot, so open the window.",
            note: "The reason comes first, then から, then the result.",
          },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "まで vs までに: まで = until (the whole time up to that point); までに = by (a deadline). [五時|ごじ]までに[来|き]て = come by five.",
      },
    ],
  },
  {
    slug: "ka-question",
    title: "か: turning a sentence into a question",
    mark: "か",
    summary: "Add か to the end — no change in word order.",
    source: "Genki I ch. 1; Tae Kim's Guide — “The question marker か”",
    blocks: [
      { type: "idea", text: "Put か at the end of a sentence and it becomes a **question**. Nothing else moves." },
      {
        type: "pair",
        a: { jp: "[学生|がくせい] です。", en: "(I'm) a student." },
        b: { jp: "[学生|がくせい] です {か}？", en: "Are you a student?" },
        diff: "Same words; か turns the statement into a question. In writing, Japanese often ends with 。 even after か — the か already does the job.",
      },
      {
        type: "examples",
        items: [
          { jp: "コーヒー を [飲|の]みます {か}？", en: "Do you drink coffee?" },
          { jp: "[何|なに] を [食|た]べます {か}？", en: "What will you eat?" },
          { jp: "[紅茶|こうちゃ] {か} コーヒー", en: "tea or coffee", note: "Between nouns, か means “or”." },
        ],
      },
      {
        type: "text",
        text: "Casual questions usually drop か and just rise in tone: [食|た]べる？ (Want to eat?). A casual か can sound blunt, or like you're asking yourself.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Question word + か = some-: [誰|だれ]か (someone), [何|なに]か (something), どこか (somewhere), いつか (someday).",
      },
    ],
  },
  {
    slug: "yo-ne",
    title: "よ and ね: telling vs checking",
    mark: "よ・ね",
    summary: "Sentence-ending particles that add feeling: よ tells, ね shares.",
    source: "Genki I ch. 2; Tae Kim's Guide — “Sentence-ending particles”",
    blocks: [
      { type: "idea", text: "よ tells the listener something **new**: “you know”. ね checks something you **share**: “right?”" },
      {
        type: "pair",
        a: { jp: "おいしい {よ}。", en: "It's good, you know! (Try it.)", note: "You know something they don't." },
        b: { jp: "おいしい {ね}。", en: "It's good, isn't it?", note: "You're both tasting it." },
        diff: "よ hands information over. ね reaches for agreement. Using よ when you both already know can sound pushy.",
      },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [休|やす]み です {よ}。", en: "Tomorrow's a day off, you know." },
          { jp: "[今日|きょう] は [寒|さむ]い です {ね}。", en: "It's cold today, isn't it?", note: "The classic small-talk opener." },
          { jp: "[明日|あした] [来|く]る {よね}？", en: "You're coming tomorrow, right?", note: "よね: I think so — just checking." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "ね keeps a conversation warm: Japanese speakers use it constantly to include the listener. Too many よ can sound like lecturing.",
      },
    ],
  },
];
