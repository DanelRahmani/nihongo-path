import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

// Quiz answers are typed in Japanese and checked exactly (spaces and punctuation aside), so every
// particle that fits a blank is listed. Answers of two particles are written with ・ (は・が), so the
// answer shown after a wrong try doesn't read as one word (はは, “mother”).

export const particles: Lesson[] = [
  {
    slug: "wa-topic",
    title: "は marks the topic: “as for…”",
    mark: "は",
    summary: "Set up what you're talking about, then say something about it.",
    source: "Tae Kim's Guide — “The topic particle は”; Genki I ch. 1; Cure Dolly — は and the core sentence",
    register: "polite",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "は means “as for X…”: it sets the **topic**, and the rest of the sentence comments on it." },
      {
        type: "text",
        text: "As a particle, は is pronounced **wa**. It sits *outside* the core sentence: it doesn't say who does what, it says what we're talking about.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student.", note: "As for me: (I) am a student." },
          { jp: "[今日|きょう] {は} [暑|あつ]い です ね。", en: "It's hot today, isn't it?", note: "The topic doesn't have to be a person. As for today: hot." },
          { jp: "この [本|ほん] {は} [面白|おもしろ]い です。", en: "This book is interesting." },
          { jp: "[日曜日|にちようび] {は} [休|やす]み です。", en: "Sunday is my day off." },
        ],
      },
      { type: "heading", text: "The topic and the subject can be different" },
      {
        type: "pair",
        a: { jp: "この [町|まち] {は} [静|しず]か です。", en: "This town is quiet." },
        b: {
          jp: "この [町|まち] {は} [緑|みどり] {が} [多|おお]い です。",
          en: "This town has a lot of greenery.",
          note: "Topic: this town. Core sentence: greenery is plentiful.",
        },
        diff: "In A, the town is both the topic and the (unsaid) subject. In B the topic sets the stage, and the core sentence has its own subject: as for this town, greenery is plentiful.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Said wa, written は",
        text: "✗ わたしわがくせいです ✓ わたしはがくせいです. The particle is said wa but written は, so on a Japanese keyboard type it as *ha*. Inside words like はな (flower), は is still ha.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[趣味|しゅみ] {は} [何|なん] です か？", en: "What are your hobbies?" },
          { speaker: "B", jp: "[料理|りょうり] です。", en: "Cooking." },
        ],
        note: "Once the topic is set, Japanese drops it: B doesn't repeat [趣味|しゅみ]は, because the topic carries over.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Fill in the particle: [田中|たなか]さん＿[先生|せんせい]です。 (Ms Tanaka is a teacher.)",
            answers: ["は"],
            explanation: "は sets Ms Tanaka as the topic: as for Ms Tanaka, (she) is a teacher.",
          },
          {
            prompt: "Make [今日|きょう] the topic: “Today is cold.” [今日|きょう]＿[寒|さむ]いです。",
            answers: ["は"],
            explanation: "[今日|きょう]は[寒|さむ]いです: as for today, cold. Typed わ? It's said wa but written は.",
          },
          {
            prompt: "Ask “What's your name?” politely, starting with お[名前|なまえ].",
            answers: ["お[名前|なまえ] は [何|なん] です か？", "お[名前|なまえ] は？"],
            explanation: "お[名前|なまえ]は[何|なん]ですか？ As for your name: what is it? (Just お[名前|なまえ]は？ with a rising tone works too.)",
          },
          {
            prompt: "Answer without repeating the topic: [趣味|しゅみ]は[何|なん]ですか？ → “Reading.” ([読書|どくしょ])",
            answers: ["[読書|どくしょ] です。", "[読書|どくしょ]。"],
            explanation: "[読書|どくしょ]です. The topic [趣味|しゅみ]は carries over from the question, so you don't say it again.",
          },
        ],
      },
    ],
  },
  {
    slug: "ga-subject",
    title: "が marks the subject: who or what does it",
    mark: "が",
    summary: "The heart of the core sentence — and why it's there even when you can't see it.",
    source: "Cure Dolly — core sentence and zero が; Tae Kim's Guide — “The identifier particle が”; Genki I ch. 8",
    register: "plain",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "が marks the **subject** of the core sentence: the person or thing that *does* the verb or *is* the adjective.",
      },
      {
        type: "text",
        text: "Cure Dolly's key point: every Japanese sentence has a が-subject, even when nobody says it. If it's obvious from context, it stays invisible: the **zero が**.",
      },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] {が} [降|ふ]って いる。", en: "It's raining.", note: "Literally: rain is falling. The subject is the rain." },
          { jp: "[電車|でんしゃ] {が} [来|き]た。", en: "The train's here.", note: "Literally: the train came." },
          {
            jp: "おなか {が} すいた。",
            en: "I'm hungry.",
            note: "Literally: (my) stomach has become empty. The subject is your stomach, not you.",
          },
          { jp: "[頭|あたま] {が} [痛|いた]い。", en: "I have a headache.", note: "Literally: head is painful." },
        ],
      },
      { type: "heading", text: "The zero が" },
      {
        type: "pair",
        a: { jp: "[私|わたし] {が} [食|た]べる。", en: "*I'll* eat (it).", note: "Me, not someone else." },
        b: { jp: "[食|た]べる。", en: "I'll eat (it).", note: "Zero が: the subject is understood." },
        diff: "Saying a subject that context already supplies, like [私|わたし], puts a spotlight on it. Most of the time Japanese leaves such a subject invisible and lets context fill it in.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Adjectives take が, not を",
        text: "✗ [頭|あたま]を[痛|いた]い ✓ [頭|あたま]が[痛|いた]い. [痛|いた]い is an adjective, not an action, so the head is its subject: “the head is painful”. Adjectives don't take an object with を in standard Japanese.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "どう した の？", en: "What's wrong?" },
          { speaker: "B", jp: "[頭|あたま] {が} [痛|いた]い ん だ。", en: "I've got a headache." },
          { speaker: "A", jp: "[大丈夫|だいじょうぶ]？ [薬|くすり] {が} ある よ。", en: "Are you OK? I've got some medicine." },
          { speaker: "B", jp: "ありがとう。", en: "Thanks." },
        ],
        note: "が marks what hurts ([頭|あたま]が) and what there is ([薬|くすり]が). The speakers themselves are never named: zero が.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "When you read, find the verb or adjective at the end first. Then ask: *who or what* does this? That's the が-subject, even when it's invisible.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Fill in the particle: あ、[雪|ゆき]＿[降|ふ]っている！ (Oh, it's snowing!)",
            answers: ["が"],
            explanation: "The snow is what's falling, so it's the subject: [雪|ゆき]が[降|ふ]っている.",
          },
          {
            prompt: "Use が: say “My stomach hurts” with おなか and [痛|いた]い.",
            answers: [
              "おなか が [痛|いた]い。",
              "おなか が [痛|いた]い です。",
              "おなか が [痛|いた]い ん だ。",
              "おなか が [痛|いた]い ん です。",
              "[私|わたし] は おなか が [痛|いた]い。",
              "[私|わたし] は おなか が [痛|いた]い です。",
            ],
            explanation: "おなかが[痛|いた]い: the stomach is what's painful, so it takes が.",
          },
          {
            prompt: "In [象|ぞう]は[鼻|はな]が[長|なが]い, what is the subject? Type the Japanese word.",
            answers: ["[鼻|はな]", "[鼻|はな] が"],
            explanation: "[鼻|はな]: が marks the subject, the trunk that is long. [象|ぞう]は is the topic around it.",
          },
          {
            prompt: "Put a spotlight on yourself: “*I'll* do it.” ([私|わたし], やる)",
            answers: ["[私|わたし] が やる。", "[私|わたし] が やります。"],
            explanation: "[私|わたし]がやる: saying the subject with が means “me, not someone else”.",
          },
        ],
      },
    ],
  },
  {
    slug: "wa-vs-ga",
    title: "Topic は vs subject が: which one to use",
    mark: "は・が",
    summary: "Four rules of thumb for choosing は or が.",
    source: "Tae Kim's Guide — “The は and が particles”; Genki I ch. 8; Cure Dolly — core sentence and zero が",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "は sets the **topic** (“as for X…”), while が marks the **subject** inside the sentence (“X does…”, or “X is the one that…”).",
      },
      {
        type: "text",
        text: "Every Japanese sentence has a **core sentence**: a subject marked with が, plus a verb, an adjective, or a noun + です. は sits *outside* that core and tells the listener what we're talking about. Very often the topic and the subject are the same thing, so the が disappears: the **zero が**.",
      },
      { type: "heading", text: "Same sentence, one particle changed" },
      {
        type: "pair",
        a: { jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student.", note: "As for me: student." },
        b: { jp: "[私|わたし] {が} [学生|がくせい] です。", en: "*I'm* the student.", note: "It's me who is the student." },
        diff: "は just introduces a fact about you. が answers a hidden question (*who's the student?*) and points straight at you.",
      },
      { type: "heading", text: "1 · A question word as the subject takes が, and so does the answer" },
      {
        type: "examples",
        items: [
          { jp: "[誰|だれ] {が} [来|き]ました か？", en: "Who came?" },
          { jp: "[田中|たなか]-さん {が} [来|き]ました。", en: "Tanaka came. (It was Tanaka.)" },
          { jp: "[何|なに] {が} [一番|いちばん] [好|す]き です か？", en: "What do you like best?" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A question word is never the topic",
        text: "✗ [誰|だれ]は[来|き]ましたか ✓ [誰|だれ]が[来|き]ましたか. You can't say “as for who…”, because you don't know who yet.",
      },
      { type: "heading", text: "2 · New information vs something we both know" },
      {
        type: "pair",
        a: { jp: "[庭|にわ] に [猫|ねこ] {が} いる。", en: "There's a cat in the garden.", note: "New information: a cat has appeared." },
        b: { jp: "[猫|ねこ] {は} [庭|にわ] に いる。", en: "The cat is in the garden.", note: "Our cat, the one we both know about." },
        diff: "が brings something new onto the stage. Once it's on stage, you talk *about* it with は.",
      },
      { type: "heading", text: "3 · は contrasts" },
      {
        type: "text",
        text: "Put は on an object (instead of を), or on a second item, and it *can* hint at “unlike other things”. Two は in one sentence is almost always a contrast.",
      },
      {
        type: "examples",
        items: [
          { jp: "コーヒー {は} [飲|の]む けど、 お[茶|ちゃ] {は} [飲|の]まない。", en: "I drink coffee, but I don't drink tea." },
          {
            jp: "ビール {は} [飲|の]みます。",
            en: "Beer, I'll drink.",
            note: "…implying: but maybe not the other drinks. Compare the neutral ビールを[飲|の]みます.",
          },
        ],
      },
      { type: "heading", text: "4 · Inside the comment, or inside a describing clause, the subject takes が" },
      {
        type: "examples",
        items: [
          {
            jp: "[私|わたし] {は} [猫|ねこ] {が} [好|す]き です。",
            en: "I like cats.",
            note: "The core sentence is [猫|ねこ]が[好|す]き: “cats are likeable”. は says from whose point of view: as for me.",
          },
          {
            jp: "[弟|おとうと] {が} [好|す]き な [歌|うた]",
            en: "the song my little brother likes",
            note: "When a clause describes a noun, its subject takes が, not は. In short clauses it can also take の: [弟|おとうと]の[好|す]きな[歌|うた].",
          },
        ],
      },
      { type: "heading", text: "In real conversation" },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "あれ？ [私|わたし] の プリン が ない。 [誰|だれ] {が} [食|た]べた の？", en: "Huh? My pudding's gone. Who ate it?" },
          { speaker: "B", jp: "…ごめん、 [私|わたし] {が} [食|た]べた。", en: "…Sorry. It was me." },
          { speaker: "A", jp: "もう！ プリン {は} [私|わたし] の [楽|たの]しみ だった のに…", en: "Oh no! I was looking forward to that pudding…" },
        ],
        note: "が asks “who?” and answers it: [誰|だれ]が, [私|わたし]が. Then プリンは goes back to the known thing as the topic: as for the pudding, it was my treat.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Default to は for what you're talking about once it's known. Switch to が when you answer *who / what / which*, when something new appears, or inside a describing clause.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Fill in the particle: [誰|だれ]＿[来|き]ましたか？ (Who came?)",
            answers: ["が"],
            explanation: "A question-word subject can't be the topic, so it takes が: [誰|だれ]が[来|き]ましたか？",
          },
          {
            prompt: "Answer [誰|だれ]が[作|つく]りましたか？ with “Tanaka did”, using [田中|たなか]さん.",
            answers: ["[田中|たなか]-さん が [作|つく]りました。", "[田中|たなか]-さん です。", "[田中|たなか]-さん。"],
            explanation: "The answer to a が question takes が too: [田中|たなか]さんが[作|つく]りました. [田中|たなか]さんです is fine as well.",
          },
          {
            prompt: "You suddenly notice a spider. Say “Oh, there's a spider!” (あ, くも, いる)",
            answers: ["あ、 くも が いる！", "あ、 くも が います！"],
            explanation: "あ、くもがいる！ Something you've just noticed is new information, so it takes が.",
          },
          {
            prompt: "Contrast them: “I like dogs, but not cats.” [犬|いぬ]＿[好|す]きだけど、[猫|ねこ]＿[好|す]きじゃない。 Type the two particles.",
            answers: ["は・は", "が・は"],
            explanation: "[犬|いぬ]は[好|す]きだけど、[猫|ねこ]は[好|す]きじゃない. The second は does the contrasting; が in the first blank works too. (Both は are written は and said wa.)",
          },
          {
            prompt: "“My big sister likes dogs”: [姉|あね]＿[犬|いぬ]＿[好|す]きです。 Type the two particles.",
            answers: ["は・が"],
            explanation: "As for my sister (は), dogs are likeable (が): [姉|あね]は[犬|いぬ]が[好|す]きです. The topic は is written は, said wa.",
          },
        ],
      },
    ],
  },
  {
    slug: "wo-object",
    title: "を marks what the action is done to",
    mark: "を",
    summary: "The direct object: the thing you eat, read, buy or watch.",
    source: "Tae Kim's Guide — “The object particle を”; Genki I ch. 3",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "を (pronounced **o**, and often romanised wo) marks the **object**, the thing an action is done *to*." },
      {
        type: "examples",
        items: [
          { jp: "おにぎり {を} [食|た]べる。", en: "I eat a rice ball.", note: "Zero が: the eater is clear from context." },
          { jp: "[本|ほん] {を} [読|よ]みます。", en: "I read books." },
          { jp: "[手紙|てがみ] {を} [書|か]きました。", en: "I wrote a letter." },
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
        title: "Likes, wants and understanding take が",
        text: "✗ [猫|ねこ]を[好|す]き ✓ [猫|ねこ]が[好|す]き. Some things that are objects in English take が in Japanese: [猫|ねこ]が[好|す]き (like cats), [日本語|にほんご]が[分|わ]かる (understand Japanese), [車|くるま]が[欲|ほ]しい (want a car). These words describe a *state*, so the thing is their subject.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[毎朝|まいあさ] [何|なに] {を} します か？", en: "What do you do every morning?" },
          { speaker: "B", jp: "[犬|いぬ] と [公園|こうえん] {を} [歩|ある]きます。 それから [新聞|しんぶん] {を} [読|よ]みます。", en: "I walk through the park with my dog. Then I read the paper." },
          { speaker: "A", jp: "いい です ね。", en: "That sounds nice." },
        ],
        note: "を marks what you do ([何|なに]を), the route you walk ([公園|こうえん]を) and what you read ([新聞|しんぶん]を).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Fill in the particle: “I drink water.” [水|みず]＿[飲|の]みます。",
            answers: ["を"],
            explanation: "Water is what you drink, so it's the object: [水|みず]を[飲|の]みます. Typed お? It's said o but written を.",
          },
          {
            prompt: "Flip the roles, from “The cat is watching” to “I'm watching the cat”: [猫|ねこ]が[見|み]ている。 Type the new sentence.",
            answers: [
              "[猫|ねこ] を [見|み]て いる。",
              "[猫|ねこ] を [見|み]て います。",
              "[私|わたし] は [猫|ねこ] を [見|み]て いる。",
              "[私|わたし] は [猫|ねこ] を [見|み]て います。",
            ],
            explanation: "[猫|ねこ]を[見|み]ている: with を, the cat is the one being watched.",
          },
          {
            prompt: "“I like sushi”: すし＿[好|す]きです。",
            answers: ["が"],
            explanation: "[好|す]き describes a state, so sushi is its subject: すしが[好|す]きです.",
          },
          {
            prompt: "“I leave the house at eight”: [八時|はちじ]に[家|いえ]＿[出|で]ます。",
            answers: ["を", "から"],
            explanation: "[家|いえ]を[出|で]ます: を marks the place you leave. [家|いえ]から (from the house) works too.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-target",
    title: "に: the target — where to, when, and to whom",
    mark: "に",
    summary: "The place you go to, the time something happens, where something is, who receives.",
    source: "Tae Kim's Guide — “The target particle に”; Genki I ch. 3–4; Genki II ch. 14",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "に points at a **target**: the place you're going, the time something happens, the place something *is*, or the person who receives.",
      },
      {
        type: "examples",
        items: [
          { jp: "[学校|がっこう] {に} [行|い]く。", en: "I'm going to school.", note: "A destination." },
          { jp: "[七時|しちじ] {に} [起|お]きます。", en: "I get up at seven.", note: "A point in time." },
          { jp: "[猫|ねこ] は [部屋|へや] {に} いる。", en: "The cat is in the room.", note: "Where something is." },
          { jp: "[友達|ともだち] {に} プレゼント を あげた。", en: "I gave my friend a present.", note: "Who receives." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[友達|ともだち] {に} [手紙|てがみ] を [書|か]いた。", en: "I wrote a letter to a friend.", note: "The friend receives it." },
        b: { jp: "[友達|ともだち] {と} [手紙|てがみ] を [書|か]いた。", en: "I wrote a letter with a friend.", note: "The friend wrote it with you." },
        diff: "One particle changes the friend's role: に points at the receiver, と adds a partner.",
      },
      { type: "heading", text: "Time and destination together" },
      {
        type: "examples",
        items: [
          {
            jp: "[日曜日|にちようび] {に} [東京|とうきょう] {に} [行|い]く。",
            en: "I'm going to Tokyo on Sunday.",
            note: "Two に: one for the time, one for the destination. Time tends to come first, by habit rather than rule. In casual speech a day like [日曜日|にちようび] can drop its に; a clock time keeps it.",
          },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No に after “tomorrow” or “today”",
        text: "✗ [明日|あした]に[行|い]く ✓ [明日|あした][行|い]く. Relative time words take no に. The same goes for [今日|きょう], [昨日|きのう], [毎日|まいにち] and [今|いま]. (Other particles are fine: [明日|あした]は, [明日|あした]から.)",
      },
      { type: "heading", text: "Purpose and change" },
      {
        type: "examples",
        items: [
          {
            jp: "[公園|こうえん] に [遊|あそ]び {に} [行|い]く。",
            en: "I'm going to the park to play.",
            note: "The ます form minus ます ([遊|あそ]びます → [遊|あそ]び) + に + go/come = go/come *in order to* do something.",
          },
          { jp: "[水|みず] が [氷|こおり] {に} なった。", en: "The water turned into ice.", note: "に marks what something becomes." },
        ],
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[夏休|なつやす]み {に} どこか [行|い]きました か？", en: "Did you go anywhere over the summer holidays?" },
          { speaker: "B", jp: "はい、 [京都|きょうと] {に} [行|い]きました。", en: "Yes, I went to Kyoto." },
          { speaker: "A", jp: "いい です ね。 [誰|だれ] と [行|い]きました か？", en: "Nice. Who did you go with?" },
          { speaker: "B", jp: "[家族|かぞく] と です。 [祖母|そぼ] {に} [会|あ]い {に} [行|い]きました。", en: "With my family. We went to see my grandmother." },
        ],
        note: "Four kinds of に: a time ([夏休|なつやす]みに), a destination ([京都|きょうと]に), the person you meet ([祖母|そぼ]に) and a purpose ([会|あ]いに).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Fill in the particle: “I'm going to the bank.” [銀行|ぎんこう]＿[行|い]きます。",
            answers: ["に", "へ"],
            explanation: "[銀行|ぎんこう]に[行|い]きます: に marks the destination. へ works too (a later lesson compares them).",
          },
          {
            prompt: "Fill in the particle: “I go to bed at eleven.” [十一時|じゅういちじ]＿[寝|ね]ます。",
            answers: ["に"],
            explanation: "A clock time takes に: [十一時|じゅういちじ]に[寝|ね]ます.",
          },
          {
            prompt: "Remove the extra particle: [明日|あした]に[行|い]きます。",
            answers: ["[明日|あした] [行|い]きます。"],
            explanation: "[明日|あした] is a relative time word, so it takes no に: [明日|あした][行|い]きます.",
          },
          {
            prompt: "“I'm going to Tokyo to work”: [東京|とうきょう]に[働|はたら]き＿[行|い]きます。",
            answers: ["に"],
            explanation: "The ます form minus ます + に + [行|い]く means “go to do”: [働|はたら]きに[行|い]きます.",
          },
          {
            prompt: "“The cat is under the desk”: [猫|ねこ]は[机|つくえ]の[下|した]＿います。",
            answers: ["に"],
            explanation: "Where something is takes に: [机|つくえ]の[下|した]にいます.",
          },
        ],
      },
    ],
  },
  {
    slug: "de-place-means",
    title: "で: where an action happens, and what you use",
    mark: "で",
    summary: "The stage for an action, the tool or means you do it with, and the range something stands out in.",
    source: "Tae Kim's Guide — “The contextual particle で”; Genki I ch. 3, 10",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "で marks the **stage** where an action happens, the **means** you use to do it, or the **range** something stands out in.",
      },
      { type: "heading", text: "Where the action happens" },
      {
        type: "examples",
        items: [
          { jp: "[公園|こうえん] {で} [遊|あそ]ぶ。", en: "I play in the park." },
          { jp: "[喫茶店|きっさてん] {で} コーヒー を [飲|の]む。", en: "I drink coffee at a café." },
          { jp: "[台所|だいどころ] {で} [料理|りょうり] を します。", en: "I cook in the kitchen." },
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
      {
        type: "pair",
        a: { jp: "バス {で} [来|き]た。", en: "I came by bus." },
        b: { jp: "バス {が} [来|き]た。", en: "The bus came." },
        diff: "With で the bus is how you got here; with が the bus is the one that came.",
      },
      { type: "heading", text: "Within a range" },
      {
        type: "examples",
        items: [
          { jp: "[世界|せかい] {で} [一番|いちばん] おいしい ラーメン", en: "the most delicious ramen in the world" },
          { jp: "クラス {で} [一番|いちばん] [背|せ] が [高|たか]い。", en: "(I'm) the tallest in the class." },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Doing something there takes で",
        text: "✗ [図書館|としょかん]に[勉強|べんきょう]する ✓ [図書館|としょかん]で[勉強|べんきょう]する. Studying is an action, so the place takes で. に is for being somewhere or going there: the next lesson puts them side by side.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "いつも どこ {で} [昼|ひる]ご[飯|はん] を [食|た]べます か？", en: "Where do you usually eat lunch?" },
          { speaker: "B", jp: "[駅|えき] の [前|まえ] の [店|みせ] {で} [食|た]べます。", en: "At a place in front of the station." },
          { speaker: "A", jp: "[会社|かいしゃ] の [近|ちか]く です か？", en: "Is that near the office?" },
          { speaker: "B", jp: "いいえ、 [自転車|じてんしゃ] {で} [五分|ごふん] です。", en: "No, it's five minutes by bike." },
        ],
        note: "で marks where the eating happens (the restaurant) and how you get there (by bike).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I eat lunch in the cafeteria”: [食堂|しょくどう]＿[昼|ひる]ご[飯|はん]を[食|た]べます。",
            answers: ["で"],
            explanation: "Eating is an action, so the place takes で: [食堂|しょくどう]で[食|た]べます.",
          },
          {
            prompt: "“I write with a pen”: ペン＿[書|か]きます。",
            answers: ["で"],
            explanation: "The tool takes で: ペンで[書|か]きます.",
          },
          {
            prompt: "Fix the particle: [喫茶店|きっさてん]に[本|ほん]を[読|よ]みます。 (I read at a café.)",
            answers: ["[喫茶店|きっさてん] で [本|ほん] を [読|よ]みます。"],
            explanation: "Reading happens at the café, so it's で: [喫茶店|きっさてん]で[本|ほん]を[読|よ]みます.",
          },
          {
            prompt: "“I'll pay by card”: カード＿[払|はら]います。",
            answers: ["で"],
            explanation: "The means of paying takes で: カードで[払|はら]います.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-vs-de",
    title: "に vs で: being somewhere vs doing something there",
    mark: "に・で",
    summary: "Same place, different particle — the verb decides.",
    source: "Genki I ch. 3–4; Tae Kim's Guide — に and で",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "に is for **being** at or **going** to a place, and で is for **doing** something there." },
      {
        type: "examples",
        items: [
          { jp: "[駅|えき] {に} [着|つ]いた。", en: "I've arrived at the station.", note: "Arriving: に." },
          { jp: "[駅|えき] {で} [待|ま]って いる。", en: "I'm waiting at the station.", note: "Waiting is something you do there: で." },
          { jp: "[部屋|へや] {に} [猫|ねこ] が いる。", en: "There's a cat in the room.", note: "Just being there: に." },
          { jp: "[部屋|へや] {で} [本|ほん] を [読|よ]む。", en: "I read in my room.", note: "Reading happens there: で." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[図書館|としょかん] {に} いる。", en: "I'm at the library.", note: "Just existing there." },
        b: { jp: "[図書館|としょかん] {で} [勉強|べんきょう] する。", en: "I study at the library.", note: "An action happening there." },
        diff: "Same library. いる (to be somewhere) takes に; [勉強|べんきょう]する (to study, an action) takes で.",
      },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {に} [住|す]んで いる。", en: "I live in Tokyo." },
        b: { jp: "[東京|とうきょう] {で} [働|はたら]いて いる。", en: "I work in Tokyo." },
        diff: "[住|す]む (live) is about where you *are*, so it takes に. [働|はたら]く (work) is an activity, so it takes で. Learners mix these up constantly.",
      },
      {
        type: "pair",
        a: { jp: "ここ {に} [名前|なまえ] を [書|か]いて ください。", en: "Please write your name here.", note: "On this spot: where the ink lands." },
        b: { jp: "ここ {で} [名前|なまえ] を [書|か]いて ください。", en: "Please write your name here (at this desk).", note: "In this place: at this desk, not elsewhere." },
        diff: "Both are correct, with different pictures: に is the target the writing ends up on, で is where you are while you write.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Being somewhere takes に",
        text: "✗ [部屋|へや]で[猫|ねこ]がいる ✓ [部屋|へや]に[猫|ねこ]がいる. When ある and いる mean something *is* somewhere, the place takes に. (Exception: when ある means an event takes place, it's で: [東京|とうきょう]でコンサートがある.)",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[今|いま] どこ？", en: "Where are you now?" },
          { speaker: "B", jp: "[駅|えき] {に} いる よ。 [改札|かいさつ] の [前|まえ] {で} [待|ま]って いる ね。", en: "I'm at the station. I'll wait in front of the ticket gates." },
          { speaker: "A", jp: "[分|わ]かった。 すぐ [行|い]く ね。", en: "Got it. I'll be right there." },
        ],
        note: "Same station, two particles: いる (being there) takes に, and [待|ま]つ (an action) takes で.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I live in Osaka”: [大阪|おおさか]＿[住|す]んでいます。",
            answers: ["に"],
            explanation: "[住|す]む is about where you are, so it takes に: [大阪|おおさか]に[住|す]んでいます.",
          },
          {
            prompt: "“I work at a bank”: [銀行|ぎんこう]＿[働|はたら]いています。",
            answers: ["で"],
            explanation: "Working is an activity, so the place takes で: [銀行|ぎんこう]で[働|はたら]いています.",
          },
          {
            prompt: "“There's a park near my house”: [家|いえ]の[近|ちか]く＿[公園|こうえん]があります。",
            answers: ["に", "に は"],
            explanation: "ある here means the park *is* there, so the place takes に. には works too: “near my house, at least, there's a park”.",
          },
          {
            prompt: "“There's a party at my house on Saturday”: [土曜日|どようび]に[私|わたし]の[家|いえ]＿パーティーがあります。",
            answers: ["で"],
            explanation: "When ある means an event takes place, the place takes で: [家|いえ]でパーティーがあります.",
          },
        ],
      },
    ],
  },
  {
    slug: "e-vs-ni",
    title: "へ vs に: heading toward vs arriving at",
    mark: "へ",
    summary: "へ points in a direction; に points at the destination itself.",
    source: "Tae Kim's Guide — “The directional particle へ”; Genki I ch. 3",
    register: "plain",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "へ (pronounced **e**) marks a **direction**, toward somewhere, while に marks the **destination** itself." },
      {
        type: "examples",
        items: [
          { jp: "[北|きた] {へ} [向|む]かう。", en: "I head north.", note: "Pure direction: へ fits naturally." },
          { jp: "[空港|くうこう] {へ} [急|いそ]ぐ。", en: "I hurry to the airport." },
          {
            jp: "[母|はは] {へ の} [手紙|てがみ]",
            en: "a letter to my mother",
            note: "へ can link to a noun with の. に can't: ✗ [母|はは]にの[手紙|てがみ].",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {へ} [行|い]く。", en: "I'm heading to Tokyo." },
        b: { jp: "[東京|とうきょう] {に} [行|い]く。", en: "I'm going to Tokyo." },
        diff: "With motion verbs the two are nearly interchangeable. へ feels like *the direction you're heading*; に like *the point you'll arrive at*. In everyday speech, に is more common.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "へ needs a direction",
        text: "✗ [七時|しちじ]へ[起|お]きる ✓ [七時|しちじ]に[起|お]きる. へ needs a direction: movement, or something sent toward someone ([母|はは]への[手紙|てがみ]). For time, existence or change it has to be に.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Personal cards and letters often open with the name + へ, “to…”: お[母|かあ]さんへ (To Mum). They're signed with the sender's name + より, “from…”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I head east”: [東|ひがし]＿[向|む]かう。",
            answers: ["へ", "に"],
            explanation: "Both are natural: [東|ひがし]へ[向|む]かう stresses the direction, [東|ひがし]に[向|む]かう works just as well.",
          },
          {
            prompt: "“a present for my friend”, linked with の: [友達|ともだち]＿プレゼント. Type the two particles.",
            answers: ["へ の"],
            explanation: "[友達|ともだち]へのプレゼント: へ can take の to describe a noun. に can't (✗ にの).",
          },
          {
            prompt: "Fix it: [冷蔵庫|れいぞうこ]へ[牛乳|ぎゅうにゅう]がある。 (There's milk in the fridge.)",
            answers: ["[冷蔵庫|れいぞうこ] に [牛乳|ぎゅうにゅう] が ある。", "[冷蔵庫|れいぞうこ] に [牛乳|ぎゅうにゅう] が あります。"],
            explanation: "Being somewhere isn't a direction, so it takes に: [冷蔵庫|れいぞうこ]に[牛乳|ぎゅうにゅう]がある.",
          },
          {
            prompt: "Start a card to your teacher: [先生|せんせい]＿",
            answers: ["へ"],
            explanation: "[先生|せんせい]へ: “to my teacher”, the usual way to open a personal card or letter.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-ya",
    title: "と and や: “and”, “with”, and “things like”",
    mark: "と・や",
    summary: "Listing nouns — the complete list vs a few examples — and doing things with someone.",
    source: "Genki I ch. 4, 11; Tae Kim's Guide — “The inclusive particle と” and “The vague listing particle や”",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "と joins nouns into a **complete** list (A and B), や gives **examples** (A, B and so on), and と also means **with**.",
      },
      {
        type: "examples",
        items: [
          { jp: "りんご {と} バナナ を [食|た]べた。", en: "I ate an apple and a banana.", note: "That's all: a complete list." },
          { jp: "[本|ほん] {や} [雑誌|ざっし] を [読|よ]む。", en: "I read books, magazines and so on.", note: "Just examples." },
          { jp: "[友達|ともだち] {と} [映画|えいが] を [見|み]た。", en: "I watched a movie with a friend." },
          { jp: "[先生|せんせい] {と} [話|はな]しました。", en: "I talked with the teacher." },
        ],
      },
      {
        type: "pair",
        a: { jp: "パン {と} [卵|たまご] を [買|か]った。", en: "I bought bread and eggs.", note: "That's everything." },
        b: { jp: "パン {や} [卵|たまご] を [買|か]った。", en: "I bought bread, eggs and so on.", note: "Just examples." },
        diff: "と closes the list; や leaves it open. Add など to make the “etc.” explicit: パンや[卵|たまご]など.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "As “and”, と and や join nouns only",
        text: "✗ [安|やす]いとおいしい ✓ [安|やす]くておいしい (cheap and tasty). To join adjectives or sentences, use the て form, which a later lesson shows. After an adjective or a verb, と has a different job, “when”, which comes later.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう] は [何|なに] を [買|か]いました か？", en: "What did you buy yesterday?" },
          { speaker: "B", jp: "[服|ふく] {や} [靴|くつ] など を [買|か]いました。", en: "Clothes, shoes and so on." },
          { speaker: "A", jp: "いい です ね。 [一人|ひとり] で？", en: "Nice. On your own?" },
          { speaker: "B", jp: "いいえ、 [妹|いもうと] {と} [行|い]きました。", en: "No, I went with my little sister." },
        ],
        note: "や…など leaves the shopping list open: there was more. In the last line, と means “with”. In casual speech you'll often hear とか instead of や: [服|ふく]とか[靴|くつ]とか.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "と also quotes what someone said or thought: 「おはよう」と[言|い]った (said “good morning”).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I have a dog and a cat” (that's all): [犬|いぬ]＿[猫|ねこ]がいます。",
            answers: ["と"],
            explanation: "A complete list takes と: [犬|いぬ]と[猫|ねこ]がいます.",
          },
          {
            prompt: "“I like sushi, ramen and so on” (just examples): すし＿ラーメンが[好|す]きです。",
            answers: ["や", "とか"],
            explanation: "Examples from a longer list take や: すしやラーメンが[好|す]きです. Casual speech often uses とか.",
          },
          {
            prompt: "“I went with my mother”: [母|はは]＿[行|い]きました。",
            answers: ["と", "と [一緒|いっしょ] に"],
            explanation: "と also means “with”: [母|はは]と[行|い]きました. と[一緒|いっしょ]に (together with) works too.",
          },
          {
            prompt: "Quote it: 「ありがとう」＿[言|い]った。 (I said “thank you”.)",
            answers: ["と", "って"],
            explanation: "と marks what was said: 「ありがとう」と[言|い]った. Casual speech often uses って instead.",
          },
        ],
      },
    ],
  },
  {
    slug: "mo-also",
    title: "も: “too” and “also”",
    mark: "も",
    summary: "The inclusive topic — it takes the place of は, が or を.",
    source: "Genki I ch. 2; Tae Kim's Guide — “The inclusive topic particle も”; Cure Dolly — も as the inclusive は",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "も means **too** or **also**: like は it marks a topic, but an **inclusive** one (this *as well as* something else).",
      },
      {
        type: "examples",
        items: [
          { jp: "パン {も} [食|た]べる。", en: "I'll eat bread too.", note: "も takes the place of を: not ✗ パンをも (をも only appears in formal writing)." },
          { jp: "[猫|ねこ] {も} [犬|いぬ] {も} [好|す]き です。", en: "I like both cats and dogs.", note: "A も B も = both A and B." },
          { jp: "[何|なに] {も} [食|た]べなかった。", en: "I didn't eat anything.", note: "Question word + も + negative = not any." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[兄|あに] {は} [医者|いしゃ] です。", en: "My big brother is a doctor." },
        b: { jp: "[兄|あに] {も} [医者|いしゃ] です。", en: "My big brother is a doctor too." },
        diff: "は just says it about him. も adds him to someone already mentioned (inclusive): maybe your father is a doctor as well.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't stack も on は, が or を",
        text: "✗ [私|わたし]はも ✓ [私|わたし]も. も replaces は, が and を. With other particles it goes after: [東京|とうきょう]にも[行|い]った (went to Tokyo too).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[日本|にほん] の [映画|えいが] が [好|す]き です。", en: "I like Japanese films." },
          { speaker: "B", jp: "[私|わたし] {も}！ アニメ {も} よく [見|み]ます。", en: "Me too! I often watch anime as well." },
        ],
        note: "[私|わたし]も: “me too”, with the rest understood. アニメも: も takes the place of を.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I'm Japanese too”: [私|わたし]＿[日本人|にほんじん]です。",
            answers: ["も"],
            explanation: "も adds you to what was said before: [私|わたし]も[日本人|にほんじん]です.",
          },
          {
            prompt: "“I'll drink tea too”: お[茶|ちゃ]＿[飲|の]む。",
            answers: ["も"],
            explanation: "も replaces を: お[茶|ちゃ]も[飲|の]む, not お[茶|ちゃ]をも.",
          },
          {
            prompt: "“I went to Kyoto too” (as well as other places): [京都|きょうと]＿[行|い]きました。 Type the two particles.",
            answers: ["に も", "へ も"],
            explanation: "With に (or へ), も goes after it: [京都|きょうと]にも[行|い]きました. In speech, [京都|きょうと]も[行|い]きました is common too.",
          },
          {
            prompt: "“I didn't buy anything”: [何|なに]＿[買|か]いませんでした。",
            answers: ["も"],
            explanation: "Question word + も + negative: [何|なに]も[買|か]いませんでした.",
          },
          {
            prompt: "“I like both summer and winter”: [夏|なつ]＿[冬|ふゆ]＿[好|す]きです。 Type the two particles.",
            answers: ["も・も"],
            explanation: "A も B も means both A and B: [夏|なつ]も[冬|ふゆ]も[好|す]きです.",
          },
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
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "の links two nouns: in **A の B**, B is the main thing and A describes it (read it backwards: B *of* A).",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {の} [本|ほん]", en: "my book" },
          { jp: "[東京|とうきょう] {の} [大学|だいがく]", en: "a university in Tokyo" },
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
          { jp: "この [鍵|かぎ] は [誰|だれ] {の} です か？", en: "Whose key is this?", note: "As for this key: whose (one) is it?" },
          { jp: "[小|ちい]さい {の} は あります か？", en: "Do you have a small one?" },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The main noun goes last",
        text: "✗ [地図|ちず]の[東京|とうきょう] ✓ [東京|とうきょう]の[地図|ちず] (a map of Tokyo). English puts the main noun first, “map *of* Tokyo”; Japanese puts it last.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "これ、 [誰|だれ] {の} [傘|かさ] です か？", en: "Whose umbrella is this?" },
          { speaker: "B", jp: "あ、 [私|わたし] {の} です。 すみません。", en: "Oh, it's mine. Sorry." },
          { speaker: "A", jp: "じゃあ、 この [青|あお]い {の} は？", en: "And this blue one?" },
          { speaker: "B", jp: "それ は [田中|たなか]-さん {の} です。", en: "That's Tanaka's." },
        ],
        note: "[私|わたし]の means “mine”, [青|あお]いの “the blue one” and [田中|たなか]さんの “Tanaka's”: each time, の stands in for the umbrella.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“my teacher's car”: [先生|せんせい]＿[車|くるま]",
            answers: ["の"],
            explanation: "Owner + の + thing: [先生|せんせい]の[車|くるま].",
          },
          {
            prompt: "Say “a Japanese-language book” with [日本語|にほんご] and [本|ほん].",
            answers: ["[日本語|にほんご] の [本|ほん]"],
            explanation: "The main noun goes last: [日本語|にほんご]の[本|ほん], a book of Japanese.",
          },
          {
            prompt: "Answer “It's mine” to これは[誰|だれ]のですか？",
            answers: ["[私|わたし] の です。", "[私|わたし] の。", "[僕|ぼく] の です。", "[僕|ぼく] の。"],
            explanation: "[私|わたし]のです: の stands in for the thing, so [私|わたし]の means “mine”.",
          },
          {
            prompt: "“I'd like the big one”: ＿がいいです。 (use [大|おお]きい)",
            answers: ["[大|おお]きい の"],
            explanation: "Adjective + の = “the … one”: [大|おお]きいのがいいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "kara-made",
    title: "から and まで: from … until",
    mark: "から・まで",
    summary: "Start and end points in time and space — plus から as “because”.",
    source: "Genki I ch. 4, 6; Tae Kim's Guide — から and まで",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "から marks the **starting point** (from), and まで the **end point** (until, or as far as)." },
      {
        type: "examples",
        items: [
          { jp: "[九時|くじ] {から} [五時|ごじ] {まで} [働|はたら]きます。", en: "I work from nine to five." },
          { jp: "[家|いえ] {から} [駅|えき] {まで} [歩|ある]いた。", en: "I walked from home to the station." },
          { jp: "イギリス {から} [来|き]ました。", en: "I'm from the UK.", note: "Literally: I came from the UK." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[五時|ごじ] {から} [働|はたら]く。", en: "I work from five." },
        b: { jp: "[五時|ごじ] {まで} [働|はたら]く。", en: "I work until five." },
        diff: "One particle moves the whole shift: から starts it at five, まで ends it there.",
      },
      { type: "heading", text: "から after a sentence: because" },
      {
        type: "examples",
        items: [
          {
            jp: "[暑|あつ]い {から}、 [窓|まど] を [開|あ]けて。",
            en: "It's hot, so open the window.",
            note: "The reason comes first, then から, then the result.",
          },
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Deadlines take までに",
        text: "✗ [五時|ごじ]まで[宿題|しゅくだい]を[出|だ]して ✓ [五時|ごじ]までに[宿題|しゅくだい]を[出|だ]して (hand in your homework by five). まで is the whole time up to a point; a deadline, “by”, is までに.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "すみません、 [何時|なんじ] {まで} です か？", en: "Excuse me, what time do you close?" },
          { speaker: "B", jp: "[夜|よる] [九時|くじ] {まで} です。", en: "Nine in the evening." },
          { speaker: "A", jp: "[明日|あした] は [何時|なんじ] {から} です か？", en: "And what time do you open tomorrow?" },
          { speaker: "B", jp: "[十時|じゅうじ] {から} です。", en: "At ten." },
        ],
        note: "Asking about opening hours, just the time + まで or から does the job: “until what time?”, “from what time?”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“from Monday to Friday”: [月曜日|げつようび]＿[金曜日|きんようび]＿ Type the two particles.",
            answers: ["から・まで"],
            explanation: "[月曜日|げつようび]から[金曜日|きんようび]まで: から starts, まで ends.",
          },
          {
            prompt: "“The concert starts at seven”: コンサートは[七時|しちじ]＿です。",
            answers: ["から"],
            explanation: "コンサートは[七時|しちじ]からです: literally “the concert is from seven”, the usual way to give a start time.",
          },
          {
            prompt: "“Please come by three”: [三時|さんじ]＿[来|き]てください。",
            answers: ["まで に"],
            explanation: "A deadline takes までに: [三時|さんじ]までに[来|き]てください. [三時|さんじ]に would mean *at* three.",
          },
          {
            prompt: "“It's cold, so I'll close the window”: [寒|さむ]い＿、[窓|まど]を[閉|し]めます。",
            answers: ["から", "ので", "です から", "です ので"],
            explanation: "[寒|さむ]いから: the reason, then から. ので (because) works too and sounds a little softer, and the polite [寒|さむ]いですから is fine as well.",
          },
        ],
      },
    ],
  },
  {
    slug: "ka-question",
    title: "か: turning a sentence into a question",
    mark: "か",
    summary: "Add か to the end — no change in word order.",
    source: "Genki I ch. 1; Tae Kim's Guide — “The question marker か”",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "Put か at the end of a sentence and it becomes a **question**, with nothing else moved." },
      {
        type: "examples",
        items: [
          { jp: "コーヒー を [飲|の]みます {か}？", en: "Do you drink coffee?", alt: "コーヒー [飲|の]む？" },
          { jp: "どこ で [降|お]ります {か}？", en: "Where are you getting off?" },
          { jp: "[紅茶|こうちゃ] {か} コーヒー", en: "tea or coffee", note: "Between nouns, か means “or”." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[先生|せんせい] です。", en: "(I'm) a teacher." },
        b: { jp: "[先生|せんせい] です {か}？", en: "Are you a teacher?" },
        diff: "Same words; か turns the statement into a question. In formal writing, Japanese often ends with 。 even after か, since the か already does the job.",
      },
      {
        type: "text",
        text: "Casual questions usually drop か and let the pitch rise: [食|た]べる？ (Want to eat?). They often end in の instead, as in [何|なに][買|か]ったの？ (What did you buy?).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だか in casual questions",
        text: "✗ [学生|がくせい]だか？ ✓ [学生|がくせい]？ or [学生|がくせい]なの？ A casual question about a noun drops だ, and before の it turns into な.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "お[茶|ちゃ] {か} コーヒー、 どちら が いい です か？", en: "Tea or coffee: which would you like?" },
          { speaker: "B", jp: "じゃあ、 コーヒー を お[願|ねが]い します。", en: "Coffee, then, please." },
          { speaker: "A", jp: "[砂糖|さとう] は [入|い]れます {か}？", en: "Do you take sugar?" },
          { speaker: "B", jp: "いいえ、 [結構|けっこう] です。", en: "No, thank you." },
        ],
        note: "Between nouns, か means “or” (お[茶|ちゃ]かコーヒー); at the end of a sentence, it makes a question.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Question word + か = some-: [誰|だれ]か (someone), [何|なに]か (something), どこか (somewhere), いつか (someday).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it a question: [日本人|にほんじん]です。",
            answers: ["[日本人|にほんじん] です か？"],
            explanation: "Add か at the end, and nothing else moves: [日本人|にほんじん]ですか？",
          },
          {
            prompt: "“train or bus”: [電車|でんしゃ]＿バス",
            answers: ["か"],
            explanation: "Between nouns, か means “or”: [電車|でんしゃ]かバス.",
          },
          {
            prompt: "Ask a friend casually: [行|い]きますか？ → (plain form, no か)",
            answers: ["[行|い]く？", "[行|い]く の？"],
            explanation: "[行|い]く？ with your pitch rising, or [行|い]くの？. A bare か after a plain verb sounds rough.",
          },
          {
            prompt: "“Did anyone come?”: [誰|だれ]＿[来|き]ましたか？",
            answers: ["か"],
            explanation: "Question word + か = some-: [誰|だれ]か, someone. ([誰|だれ]が[来|き]ましたか？ would ask *who* came.)",
          },
        ],
      },
    ],
  },
  {
    slug: "yo-ne",
    title: "よ and ね: telling vs checking",
    mark: "よ・ね",
    summary: "Sentence-ending particles that add feeling: よ tells, ね shares.",
    source: "Genki I ch. 2; Tae Kim's Guide — “Sentence-ending particles”",
    register: "both",
    kinds: ["particles"],
    jlpt: jlpt("N5"),
    blocks: [
      { type: "idea", text: "よ tells the listener something **new** (“you know”), and ね checks something you **share** (“right?”)." },
      {
        type: "examples",
        items: [
          { jp: "この [道|みち]、 [危|あぶ]ない です {よ}。", en: "This road's dangerous, you know." },
          { jp: "[雨|あめ]、 よく [降|ふ]ります {ね}。", en: "It really keeps raining, doesn't it?", note: "Classic small talk: the weather plus ね." },
          { jp: "[明日|あした] [来|く]る {よね}？", en: "You're coming tomorrow, right?", note: "よね: I think so, just checking." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] は [休|やす]み だ {よ}。", en: "Tomorrow's a day off, you know.", note: "They might not know." },
        b: { jp: "[明日|あした] は [休|やす]み だ {ね}。", en: "Tomorrow's a day off, right?", note: "You both know; you're sharing it." },
        diff: "よ hands information over. ね reaches for agreement. Using よ when you both already know can sound pushy.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Agree with ね",
        text: "When you agree with what someone just said: ✗ そうですよ ✓ そうですね (or そうですよね). A bare よ would sound as if you knew better. よ is right when you confirm a fact you were asked about: これ、[田中|たなか]さんの[傘|かさ]ですか？ そうですよ.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "この ケーキ、 おいしい {よ}。 [食|た]べて みて。", en: "This cake's good, you know. Try it." },
          { speaker: "B", jp: "…ほんと だ。 おいしい {ね}！", en: "…You're right. It's good!" },
        ],
        note: "A has tasted it and tells B with よ. Once B has tasted it too, they share it with ね.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "ね keeps a conversation warm: Japanese speakers use it constantly to include the listener. Too many よ can sound like lecturing.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Tell a friend something they don't know: “The shop's closed today, you know.” [店|みせ]は[今日|きょう][休|やす]みだ＿。",
            answers: ["よ"],
            explanation: "New information for the listener takes よ: [休|やす]みだよ.",
          },
          {
            prompt: "Share a feeling: “Nice weather, isn't it?” いい[天気|てんき]です＿。",
            answers: ["ね", "よね"],
            explanation: "You're both enjoying it, so ね: いい[天気|てんき]ですね. よね works too.",
          },
          {
            prompt: "Check something you think is true: “The test is tomorrow, right?” [試験|しけん]は[明日|あした]だ＿？",
            answers: ["よね", "ね"],
            explanation: "よね (or ね) checks what you already think: [試験|しけん]は[明日|あした]だよね？",
          },
          {
            prompt: "Agree: A says [人|ひと]が[多|おお]いですね。 You reply: そうです＿。",
            answers: ["ね", "よね"],
            explanation: "そうですね (or そうですよね) agrees with what they just said. A bare そうですよ would sound like correcting them.",
          },
        ],
      },
    ],
  },
];
