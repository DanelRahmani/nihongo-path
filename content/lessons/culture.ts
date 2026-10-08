import type { Lesson } from "@/content/types";

export const culture: Lesson[] = [
  {
    slug: "polite-or-casual",
    title: "Polite or casual: choosing how to speak",
    mark: "[敬語|けいご]",
    summary: "Who gets です/ます, who gets casual speech, and who decides when to switch.",
    source: "Genki I ch. 8 (casual speech); Tae Kim's Guide — “Polite form”",
    register: "both",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "Japanese makes you choose a **speech level** in every sentence, and polite (です/ます) is the default with anyone you're not close to.",
      },
      {
        type: "table",
        headers: ["Who you're talking to", "Speech level"],
        rows: [
          ["strangers, shop staff, teachers, bosses, older people", "polite: です / ます"],
          ["friends, family, children, close classmates", "casual: plain forms"],
          ["customers (when you're staff), formal speeches", "keigo: special honorific and humble forms"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "[今|いま]、 [忙|いそが]しい {です} か？", en: "Are you busy right now?", alt: "[今|いま]、 [忙|いそが]しい？" },
          { jp: "この [本|ほん]、 もう [読|よ]み{ました} か？", en: "Have you read this book yet?", alt: "この [本|ほん]、 もう [読|よ]{んだ}？" },
          { jp: "[一緒|いっしょ] に [行|い]き{ません} か？", en: "Shall we go together?", alt: "[一緒|いっしょ] に [行|い]{かない}？" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[今夜|こんや] [電話|でんわ] し{ます}。", en: "I'll call you tonight.", note: "Polite." },
        b: { jp: "[今夜|こんや] [電話|でんわ] {する}。", en: "I'll call you tonight.", note: "Casual." },
        diff: "Same words, different distance: polite keeps a respectful gap, casual signals you're close.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Casual to a stranger sounds rude",
        text: "✗ (to a shop assistant) これ、いくら？ ✓ これ、いくらですか？ Casual speech to a stranger can sound rude or over-familiar.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Switching from polite to casual is a step in a relationship. Usually the older or more senior person suggests it: [敬語|けいご]じゃなくていいよ (you don't have to be formal). Strictly, [敬語|けいご] means the special honorific and humble forms, but in everyday talk it often just means です/ます.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "As a learner, polite speech is your safe base. People forgive over-politeness; unexpected casualness can sound rude.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Make it polite (to a stranger): [駅|えき]はどこ？",
            answers: [
              "[駅|えき] は どこ です か？",
              "すみません、 [駅|えき] は どこ です か？",
              "[駅|えき] は どちら です か？",
              "すみません、 [駅|えき] は どちら です か？",
            ],
            explanation: "Add です and か: [駅|えき]はどこですか？",
          },
          {
            prompt: "Make it casual (to a friend): [週末|しゅうまつ]は[何|なに]をしますか？",
            answers: [
              "[週末|しゅうまつ] は [何|なに] を する？",
              "[週末|しゅうまつ] は [何|なに] する？",
              "[週末|しゅうまつ] [何|なに] を する？",
              "[週末|しゅうまつ] [何|なに] する？",
              "[週末|しゅうまつ] は [何|なに] を する の？",
              "[週末|しゅうまつ] は [何|なに] する の？",
              "[週末|しゅうまつ] [何|なに] する の？",
            ],
            explanation: "します → する, and drop か: [週末|しゅうまつ]は[何|なに]をする？ (Casual speech often drops は and を too.)",
          },
          {
            prompt: "Make it casual: [寒|さむ]いですね。",
            answers: ["[寒|さむ]い ね。"],
            explanation: "An い-adjective just drops です: [寒|さむ]いね.",
          },
          {
            prompt: "Make it polite: [週末|しゅうまつ]、[海|うみ]に[行|い]った。",
            answers: ["[週末|しゅうまつ]、 [海|うみ] に [行|い]きました。", "[週末|しゅうまつ] は [海|うみ] に [行|い]きました。"],
            explanation: "[行|い]った → [行|い]きました: [週末|しゅうまつ]、[海|うみ]に[行|い]きました.",
          },
        ],
      },
    ],
  },
  {
    slug: "avoid-anata",
    title: "Why you rarely say あなた (“you”)",
    mark: "あなた",
    summary: "Use the person's name or title, or nothing at all.",
    source: "Genki I ch. 1 (note on あなた); Tae Kim's Guide",
    register: "polite",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "あなた exists, but saying it to someone's face can sound **distant or even rude**, so use their **name + さん**, their title, or nothing at all.",
      },
      {
        type: "examples",
        items: [
          { jp: "{[田中|たなか]-さん} は [学生|がくせい] です か？", en: "Are you a student?", note: "Talking to Tanaka: their name stands in for “you”." },
          { jp: "{[先生|せんせい]} は どう [思|おも]います か？", en: "What do you think? (to a teacher)", note: "Titles replace “you” for teachers, bosses and seniors." },
          { jp: "{[部長|ぶちょう]} も [行|い]きます か？", en: "Are you coming too? (to your boss)" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{あなた} は [学生|がくせい] です か？", en: "Are you a student?", note: "Grammatical, but feels cold or confrontational." },
        b: { jp: "[学生|がくせい] です か？", en: "Are you a student?", note: "The most natural of all: a question already points at the listener." },
        diff: "Japanese avoids pointing at people with “you”: leave it out, or use the name.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Leave あなた out",
        text: "✗ あなたは[何|なに]を[食|た]べますか？ ✓ [何|なに]を[食|た]べますか？ The question already points at the listener. [君|きみ] and お[前|まえ] are no better: [君|きみ] is usually said downwards, by a superior or between male friends, and お[前|まえ] is blunt.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "You'll see あなた in songs, adverts, and on forms and instructions addressed to an unknown reader. Some wives also call their husbands あなた, like “dear”, though that's old-fashioned now. That's part of why it feels odd between strangers.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Ask your colleague Ms Mori, “Is this your bag?”: これ、＿のかばんですか？",
            answers: ["[森|もり]-さん"],
            explanation: "Her name stands in for “you”: [森|もり]さんのかばんですか？",
          },
          {
            prompt: "Ask your teacher, “Are you busy?”, without あなた: ＿、[忙|いそが]しいですか？",
            answers: ["[先生|せんせい]"],
            explanation: "The title replaces “you”: [先生|せんせい]、[忙|いそが]しいですか？",
          },
          {
            prompt: "Ask your department head, Ms Endo, “Do you drink coffee?”, without あなた: ＿はコーヒーを[飲|の]みますか？",
            answers: ["[遠藤|えんどう]-[部長|ぶちょう]", "[部長|ぶちょう]"],
            explanation: "A boss's title stands in for “you”: [部長|ぶちょう]はコーヒーを[飲|の]みますか？",
          },
        ],
      },
    ],
  },
  {
    slug: "sumimasen",
    title: "すみません: sorry, excuse me, and thank you",
    mark: "すみません",
    summary: "One word for apologising, getting attention and thanking.",
    source: "Genki I — Greetings and ch. 2; Tae Kim's Guide",
    register: "both",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "すみません **apologises**, gets **attention**, and even **thanks** someone who went to trouble for you.",
      },
      {
        type: "examples",
        items: [
          { jp: "あ、 {すみません}！", en: "Oh, sorry!", note: "Bumping into someone." },
          { jp: "{すみません}、 [駅|えき] は どこ です か？", en: "Excuse me, where's the station?" },
          { jp: "{すみません}、 [注文|ちゅうもん] いい です か？", en: "Excuse me, could I order?", note: "Calling staff in a restaurant." },
          { jp: "わざわざ {すみません}。", en: "Thank you for going to all that trouble.", note: "Thanks mixed with “sorry for the bother”." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{ありがとう ございます}。", en: "Thank you." },
        b: { jp: "{すみません}。", en: "Thank you (sorry for the trouble)." },
        diff: "ありがとう focuses on the kindness; すみません on the bother you caused. When someone picks up something you dropped, すみません is very natural.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ごめん is for friends",
        text: "✗ (to your boss) ごめん ✓ すみません, or [申|もう]し[訳|わけ]ありません for something serious. ごめん is far too casual outside friends and family.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "すみません、 これ、 [落|お]としました よ。", en: "Excuse me, you dropped this." },
          { speaker: "B", jp: "あ、 すみません！ ありがとう ございます。", en: "Oh, sorry! Thank you so much." },
        ],
        note: "A's すみません gets attention; B's すみません thanks A for the trouble.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "ごめんなさい is a personal “I'm sorry”, mostly for friends and family. すみません is mostly for everyone else. At work, [申|もう]し[訳|わけ]ありません is a deeper apology.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Call a waiter over: “Excuse me!”",
            answers: ["すみません！", "すいません！", "あの、 すみません！"],
            explanation: "すみません gets attention. In speech it often becomes すいません, which is more casual: not for writing or a formal apology.",
          },
          {
            prompt: "A stranger holds a door for you. Thank them with a word that also says “sorry for the bother”.",
            answers: ["すみません。", "すいません。", "どうも すみません。", "どうも すいません。", "あ、 すみません。"],
            explanation: "すみません thanks someone for going to trouble.",
          },
          {
            prompt: "Apologise to a friend, casually: “Sorry!”",
            answers: ["ごめん！", "ごめんなさい！", "ごめん ね。"],
            explanation: "With friends: ごめん, ごめんね or ごめんなさい.",
          },
          {
            prompt: "A deep apology at work: “I'm terribly sorry.”",
            answers: [
              "[申|もう]し[訳|わけ] ありません。",
              "[申|もう]し[訳|わけ] ございません。",
              "[大変|たいへん] [申|もう]し[訳|わけ] ありません。",
              "[大変|たいへん] [申|もう]し[訳|わけ] ございません。",
              "[申|もう]し[訳|わけ] ありません でした。",
              "[申|もう]し[訳|わけ] ございません でした。",
            ],
            explanation: "[申|もう]し[訳|わけ]ありません is deeper than すみません; ございません is deeper still.",
          },
        ],
      },
    ],
  },
  {
    slug: "aizuchi",
    title: "Aizuchi: little words that show you're listening",
    mark: "あいづち",
    summary: "うん, そうですね, なるほど, and why silence can feel rude.",
    source: "Tofugu — “Aizuchi”; Genki I ch. 2",
    register: "both",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "Japanese listeners give constant small responses, **aizuchi**, to show they're following, and silence can feel like you're not listening.",
      },
      {
        type: "table",
        headers: ["Aizuchi", "Roughly"],
        rows: [
          ["うん · はい", "yeah · yes (I'm following)"],
          ["そう です ね", "that's right, I see"],
          ["なるほど", "I see, that makes sense"],
          ["へえ", "oh, really? (interested)"],
          ["そう なん だ", "oh, is that so (casual)"],
          ["[本当|ほんとう]？", "really?"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "{へえ}、 そう なん です か。", en: "Oh, really." },
          { jp: "{なるほど}。", en: "I see." },
          { jp: "{うん}、 {うん}。", en: "Mm-hm." },
          { jp: "{[本当|ほんとう]}？ すごい ね！", en: "Really? That's amazing!" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{はい}。", en: "Yes (I'm listening)." },
        b: { jp: "はい、 {そう です}。", en: "Yes, that's right." },
        diff: "A lone はい while someone talks is often just aizuchi, not agreement; to confirm, say so outright.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't listen in silence",
        text: "✗ (listening without a sound) ✓ うん、うん… / はい… Total silence makes the speaker wonder whether you're still with them.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう]、 [京都|きょうと] に [行|い]って…", en: "So yesterday I went to Kyoto…" },
          { speaker: "B", jp: "うん、 うん。", en: "Mm-hm." },
          { speaker: "A", jp: "お[寺|てら] を [見|み]て きた ん だ けど…", en: "I went to see some temples, and…" },
          { speaker: "B", jp: "へえ、 いい ね！", en: "Oh, nice!" },
        ],
        note: "B isn't interrupting: the aizuchi keep A talking.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "はい as aizuchi means “I'm listening”, not “I agree”: don't take a string of はい as a yes to your proposal. And some people find なるほど a little presumptuous towards a superior; そうですか is safer.",
      },
      { type: "callout", kind: "tip", text: "Nodding counts too. On the phone, where nobody can see you nod, aizuchi get even more frequent." },
      {
        type: "quiz",
        questions: [
          {
            prompt: "A friend tells you something surprising. React casually: “Really?”",
            answers: ["[本当|ほんとう]？", "ほんと？", "[本当|ほんとう] に？", "ほんと に？", "え、 [本当|ほんとう]？", "え、 ほんと？"],
            explanation: "[本当|ほんとう]？ (often shortened to ほんと？) shows surprise and interest.",
          },
          {
            prompt: "A classmate explains a trick, and now you get it: “I see!”",
            answers: ["なるほど。", "なるほど ね。", "あ、 なるほど。"],
            explanation: "なるほど: I see, that makes sense.",
          },
          {
            prompt: "A friend tells you some news. Say “oh, is that so” casually.",
            answers: ["そう なん だ。", "そう なの？", "そう か。", "そっか。", "へえ、 そう なん だ。", "へえ、 そう なの？", "へえ、 そっか。"],
            explanation: "そうなんだ is the casual “oh, is that so”; そっか and そうか work too.",
          },
        ],
      },
    ],
  },
  {
    slug: "soft-refusals",
    title: "Saying no without saying no: ちょっと…",
    mark: "ちょっと",
    summary: "How Japanese turns down invitations by trailing off.",
    source: "Genki I ch. 8; Tofugu — “How to say no in Japanese”",
    register: "both",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "A direct **no** (いいえ) is rare when turning down invitations or requests: Japanese trails off instead, and everyone understands.",
      },
      {
        type: "examples",
        items: [
          { jp: "{ちょっと} [難|むずか]しい です ね。", en: "That's a bit difficult.", note: "Often a polite no, especially at work." },
          { jp: "{[考|かんが]えて おきます}。", en: "I'll think about it.", note: "Can genuinely mean that, but is often a soft no." },
          { jp: "{また [今度|こんど]}。", en: "Maybe next time." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[今日|きょう] は [行|い]けません。", en: "I can't go today." },
        b: { jp: "[今日|きょう] は {ちょっと}…", en: "Today's a bit…" },
        diff: "Both mean no; B leaves it unsaid, which sounds far kinder.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[今晩|こんばん]、 [飲|の]み に [行|い]きません か？", en: "Do you want to go for a drink tonight?" },
          { speaker: "B", jp: "[今晩|こんばん] は ちょっと…", en: "Tonight's a bit…" },
          { speaker: "A", jp: "そう です か。 じゃあ、 また [今度|こんど]。", en: "I see. Next time, then." },
        ],
        note: "The unfinished sentence *is* the no, and A takes it gracefully.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't push after ちょっと…",
        text: "✗ じゃあ、だめってことですか？ (so is that a no?) ✓ そうですか。じゃあ、また[今度|こんど]。 Asking for a clear answer puts the other person on the spot.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "いいえ is fine for facts (“Is this yours?” “No.”). When refusing a person, softening protects everyone's face.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "A colleague asks for help on Saturday. Say no softly: [土曜日|どようび]は＿…",
            answers: ["ちょっと"],
            explanation: "ちょっと… and trailing off is the soft no: [土曜日|どようび]はちょっと….",
          },
          {
            prompt: "A plain fact: “Is this your umbrella?” “No, it isn't.” ＿、[違|ちが]います。",
            answers: ["いいえ", "いえ", "いや"],
            explanation: "For facts, a direct いいえ (or the shorter いえ) is fine.",
          },
          {
            prompt: "A colleague answers your lunch invitation with ちょっと…. Let it go kindly: “No problem. Another time.” [大丈夫|だいじょうぶ]です。また＿。",
            answers: ["[今度|こんど]"],
            explanation: "また[今度|こんど] closes the topic without pressure.",
          },
        ],
      },
    ],
  },
  {
    slug: "uchi-soto",
    title: "Uchi and soto: talking about your group vs outsiders",
    mark: "[内|うち]・[外|そと]",
    summary: "Humble words for your own side, polite words for theirs.",
    source: "Genki I ch. 7 (family terms); Tae Kim's Guide — “Honorific and humble forms”",
    register: "polite",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "Speech changes with whether someone is **inside** your group (uchi) or **outside** it (soto): you lower your own side and raise theirs.",
      },
      {
        type: "examples",
        items: [
          { jp: "{[父|ちち]} は [病院|びょういん] で [働|はたら]いて います。", en: "My father works at a hospital." },
          { jp: "{お[父|とう]さん} は お[元気|げんき] です か？", en: "Is your father well?" },
          { jp: "{[姉|あね]} は [大学生|だいがくせい] です。", en: "My older sister is a university student." },
          { jp: "{ご[家族|かぞく]} は [何人|なんにん] です か？", en: "How many are in your family?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{[母|はは]} は [料理|りょうり] が [上手|じょうず] です。", en: "My mother is a good cook.", note: "Your own mother, mentioned to others." },
        b: { jp: "{お[母|かあ]さん} は [料理|りょうり] が [上手|じょうず] です ね。", en: "Your mother is a good cook, isn't she?", note: "Someone else's mother." },
        diff: "Family words come in two sets: plain, humble ones for your own family, and polite ones for other people's.",
      },
      {
        type: "table",
        headers: ["", "My (humble)", "Your / their (polite)"],
        rows: [
          ["mother", "[母|はは]", "お[母|かあ]さん"],
          ["father", "[父|ちち]", "お[父|とう]さん"],
          ["older brother", "[兄|あに]", "お[兄|にい]さん"],
          ["older sister", "[姉|あね]", "お[姉|ねえ]さん"],
          ["family", "[家族|かぞく]", "ご[家族|かぞく]"],
        ],
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Your own colleague, to a client",
        text: "✗ (to a client) [田中|たなか]さんは[会議中|かいぎちゅう]です ✓ [田中|たなか]は[会議中|かいぎちゅう]です. To an outsider, your own colleague is uchi, so the さん goes. It feels backwards at first, but it's respect for the outsider.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Uchi and soto shift with the situation: at home your mother is uchi; talking to a client, your whole company is uchi, boss included.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Inside the family, people do call their mum お[母|かあ]さん when talking *to* her. The humble [母|はは] is for talking *about* her to outsiders.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Telling a colleague about your own older brother: ＿は[会社員|かいしゃいん]です。",
            answers: ["[兄|あに]", "うち の [兄|あに]"],
            explanation: "Your own brother, to an outsider: [兄|あに].",
          },
          {
            prompt: "Asking an acquaintance about their mother: ＿はお[元気|げんき]ですか？",
            answers: ["お[母|かあ]さん"],
            explanation: "Someone else's mother: お[母|かあ]さん.",
          },
          {
            prompt: "To a client, about your boss Mr Sato: ＿は[今日|きょう][休|やす]みです。",
            answers: ["[佐藤|さとう]", "[部長|ぶちょう] の [佐藤|さとう]"],
            explanation: "To an outsider, your own boss takes no さん or title: [佐藤|さとう]は[今日|きょう][休|やす]みです (or [部長|ぶちょう]の[佐藤|さとう]は…).",
          },
          {
            prompt: "Telling your teacher about your own family: [私|わたし]の＿は[四人|よにん]です。",
            answers: ["[家族|かぞく]"],
            explanation: "Your own family is plain [家族|かぞく]; ご[家族|かぞく] is for other people's.",
          },
        ],
      },
    ],
  },
  {
    slug: "set-phrases",
    title: "Set phrases for everyday moments",
    mark: "[挨拶|あいさつ]",
    summary: "What to say before eating, leaving, coming home and meeting people.",
    source: "Genki I — Greetings; Tae Kim's Guide",
    register: "both",
    kinds: ["culture"],
    blocks: [
      {
        type: "idea",
        text: "Japanese has fixed phrases for specific moments (eating, leaving, coming home, meeting someone), and using them right sounds instantly natural.",
      },
      {
        type: "table",
        headers: ["Phrase", "When", "Meaning"],
        rows: [
          ["いただきます", "before eating", "I humbly receive (this food)"],
          ["ごちそうさま でした", "after eating", "Thank you for the meal"],
          ["いってきます", "leaving home", "I'm off (and will be back)"],
          ["いってらっしゃい", "to someone leaving", "See you later, take care"],
          ["ただいま", "arriving home", "I'm home"],
          ["おかえりなさい", "to someone arriving home", "Welcome back"],
          ["お[疲|つか]れ[様|さま] です", "to colleagues and classmates", "Thanks for your hard work"],
          ["よろしく お[願|ねが]い します", "meeting someone, asking a favour", "I'm counting on you / please treat me well"],
        ],
      },
      {
        type: "examples",
        items: [
          {
            jp: "{[初|はじ]めまして}。 スミス です。 {よろしく お[願|ねが]い します}。",
            en: "Nice to meet you. I'm Smith. I look forward to getting to know you.",
            note: "The standard self-introduction. よろしくお[願|ねが]いします has no real English equivalent.",
          },
          { jp: "{いただきます}。", en: "Thank you for the food. (before eating)" },
          { jp: "{ごちそうさま でした}。", en: "Thank you for the meal. (after eating)" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{いってきます}。", en: "I'm off.", note: "The one leaving." },
        b: { jp: "{いってらっしゃい}。", en: "See you later.", note: "The one staying." },
        diff: "The person leaving says いってきます; whoever stays answers いってらっしゃい.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not さようなら at work",
        text: "✗ (leaving the office before others) さようなら ✓ お[先|さき]に[失礼|しつれい]します. さようなら sounds final, as if you won't meet again soon; colleagues leave with お[先|さき]に[失礼|しつれい]します (excuse me for leaving first). (At school, さようなら between teachers and pupils is normal.)",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "ただいま！", en: "I'm home!" },
          { speaker: "B", jp: "おかえり！ ご[飯|はん]、 できてる よ。", en: "Welcome back! Dinner's ready." },
          { speaker: "A", jp: "いただきます！", en: "Thanks, let's eat!" },
        ],
        note: "おかえり is the casual おかえりなさい. いただきます is said by everyone, at any level of politeness.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "お[疲|つか]れ[様|さま]です is the all-purpose greeting at work: hello, goodbye and “thanks for the effort” all in one. Its cousin ご[苦労|くろう][様|さま] is said only to people below you, never to a boss.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "You're leaving home in the morning: ＿！",
            answers: ["いってきます", "[行|い]って くる ね"],
            explanation: "The one leaving says いってきます.",
          },
          {
            prompt: "Your flatmate comes home: ＿！",
            answers: ["おかえりなさい", "おかえり"],
            explanation: "おかえりなさい, or casually おかえり.",
          },
          {
            prompt: "You've just finished a meal at a friend's house: ＿。",
            answers: ["ごちそうさま でした", "ごちそうさま"],
            explanation: "After eating: ごちそうさまでした (casually ごちそうさま).",
          },
          {
            prompt: "Leaving the office before your colleagues: お[先|さき]に＿。",
            answers: ["[失礼|しつれい] します", "[失礼|しつれい] いたします"],
            explanation: "お[先|さき]に[失礼|しつれい]します: excuse me for leaving first.",
          },
        ],
      },
    ],
  },
];
