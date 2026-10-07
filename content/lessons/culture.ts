import type { Lesson } from "@/content/types";

export const culture: Lesson[] = [
  {
    slug: "polite-or-casual",
    title: "Polite or casual: choosing how to speak",
    mark: "[敬語|けいご]",
    summary: "Who gets です/ます, who gets casual speech, and who decides when to switch.",
    source: "Genki I ch. 8 (casual speech); Tae Kim's Guide — “Polite form”",
    blocks: [
      {
        type: "idea",
        text: "Japanese makes you choose a **speech level** in every sentence. Default to polite (です/ます) with anyone you're not close to.",
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
        type: "pair",
        a: { jp: "[明日|あした] [来|き]ます か？", en: "Are you coming tomorrow?", note: "Polite." },
        b: { jp: "[明日|あした] [来|く]る？", en: "You coming tomorrow?", note: "Casual." },
        diff: "Same question, different distance. Polite keeps a respectful gap; casual signals you're close.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Switching from polite to casual is a step in a relationship. Usually the older or more senior person suggests it: [敬語|けいご]じゃなくていいよ (you don't have to be formal).",
      },
      {
        type: "callout",
        kind: "tip",
        text: "As a learner, polite speech is your safe base. People forgive over-politeness; unexpected casualness can sound rude.",
      },
    ],
  },
  {
    slug: "avoid-anata",
    title: "Why you rarely say あなた (“you”)",
    mark: "あなた",
    summary: "Use the person's name or title — or nothing at all.",
    source: "Genki I ch. 1 (note on あなた); Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "あなた exists, but saying it to someone's face can sound **distant or even rude**. Use their **name + さん**, their title, or nothing at all.",
      },
      {
        type: "pair",
        a: { jp: "あなた は [学生|がくせい] です か？", en: "Are you a student?", note: "Grammatical, but feels cold or confrontational." },
        b: { jp: "[田中|たなか]-さん は [学生|がくせい] です か？", en: "Are you a student?", note: "Natural: use their name." },
        diff: "Japanese avoids pointing at people with “you”. The name — or the invisible subject — does the job.",
      },
      {
        type: "examples",
        items: [
          { jp: "[学生|がくせい] です か？", en: "Are you a student?", note: "Most natural of all: questions lean towards “you”, so leave it out." },
          { jp: "[先生|せんせい] は どう [思|おも]います か？", en: "What do you think, (teacher)?", note: "Titles replace “you” for teachers, bosses and seniors." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "You'll see あなた in songs, adverts and on forms (where it means “your”), and some couples use it like “dear”. That's part of why it feels odd between strangers.",
      },
      {
        type: "callout",
        kind: "mistake",
        text: "Avoid [君|きみ] and お[前|まえ] too: they range from casual to blunt, and can be rude coming from someone you don't know well.",
      },
    ],
  },
  {
    slug: "sumimasen",
    title: "すみません: sorry, excuse me, and thank you",
    mark: "すみません",
    summary: "One word for apologising, getting attention and thanking.",
    source: "Genki I — Greetings and ch. 2; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "すみません is the Swiss Army knife of Japanese: it **apologises**, gets **attention**, and even **thanks** someone who went to trouble for you.",
      },
      {
        type: "examples",
        items: [
          { jp: "あ、すみません！", en: "Oh, sorry!", note: "Bumping into someone." },
          { jp: "すみません、[注文|ちゅうもん] いい です か？", en: "Excuse me, could I order?", note: "Calling staff in a restaurant." },
          { jp: "わざわざ すみません。", en: "Thank you for going to all that trouble.", note: "Thanks mixed with “sorry for the bother”." },
        ],
      },
      {
        type: "pair",
        a: { jp: "ありがとう ございます。", en: "Thank you." },
        b: { jp: "すみません。", en: "Thank you — sorry for the trouble." },
        diff: "ありがとう focuses on the kindness; すみません on the bother you caused. When someone picks up something you dropped, すみません is very natural.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "ごめんなさい is a personal “I'm sorry” for friends and family. すみません is for everyone else. At work, [申|もう]し[訳|わけ]ありません is a deeper apology.",
      },
    ],
  },
  {
    slug: "aizuchi",
    title: "Aizuchi: little words that show you're listening",
    mark: "あいづち",
    summary: "うん, そうですね, なるほど — and why silence can feel rude.",
    source: "Tofugu — “Aizuchi”; Genki I ch. 2",
    blocks: [
      {
        type: "idea",
        text: "Japanese listeners give constant small responses — **aizuchi** — to show they're following. Staying silent can feel like you're not listening.",
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
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[昨日|きのう]、[京都|きょうと] に [行|い]って…", en: "So yesterday I went to Kyoto…" },
          { speaker: "B", jp: "うん、うん。", en: "Mm-hm." },
          { speaker: "A", jp: "お[寺|てら] を [見|み]て きた ん だ けど…", en: "I went to see some temples, and…" },
          { speaker: "B", jp: "へえ、いい ね！", en: "Oh, nice!" },
        ],
        note: "B isn't interrupting — the aizuchi keep A talking.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "はい as aizuchi means “I'm listening”, not “I agree”. Don't take a string of はい as a yes to your proposal!",
      },
      { type: "callout", kind: "tip", text: "Nodding counts too. On the phone, where nobody can see you nod, aizuchi get even more frequent." },
    ],
  },
  {
    slug: "soft-refusals",
    title: "Saying no without saying no: ちょっと…",
    mark: "ちょっと",
    summary: "How Japanese turns down invitations by trailing off.",
    source: "Genki I ch. 8; Tofugu — “How to say no in Japanese”",
    blocks: [
      {
        type: "idea",
        text: "A direct **no** (いいえ) is rare when turning down invitations or requests. Japanese trails off instead — and everyone understands.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "[今晩|こんばん]、[飲|の]み に [行|い]きません か？", en: "Do you want to go for a drink tonight?" },
          { speaker: "B", jp: "[今晩|こんばん] は ちょっと…", en: "Tonight's a bit…" },
        ],
        note: "The unfinished sentence *is* the no. Pushing for a clearer answer would be awkward.",
      },
      {
        type: "examples",
        items: [
          { jp: "ちょっと [難|むずか]しい です ね。", en: "That's a bit difficult.", note: "Often a polite no — especially at work." },
          { jp: "[考|かんが]えて おきます。", en: "I'll think about it.", note: "Can genuinely mean that, but is often a soft no." },
          { jp: "また [今度|こんど]。", en: "Maybe next time." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "いいえ is fine for facts (“Is this yours?” — “No”). When refusing a person, softening protects everyone's face.",
      },
      { type: "callout", kind: "mistake", text: "Don't push after ちょっと…. Asking “so is that a no?” puts the other person on the spot." },
    ],
  },
  {
    slug: "uchi-soto",
    title: "Uchi and soto: talking about your group vs outsiders",
    mark: "[内|うち]・[外|そと]",
    summary: "Humble words for your own side, polite words for theirs.",
    source: "Genki I ch. 7 (family terms); Tae Kim's Guide — “Honorific and humble forms”",
    blocks: [
      {
        type: "idea",
        text: "Speech changes depending on whether someone is **inside** your group (uchi) or **outside** it (soto). You lower your own side and raise theirs.",
      },
      {
        type: "pair",
        a: { jp: "[母|はは] は [元気|げんき] です。", en: "My mother is well.", note: "Your own mother, mentioned to others." },
        b: { jp: "お[母|かあ]さん は [元気|げんき] です か？", en: "Is your mother well?", note: "Someone else's mother." },
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
        kind: "culture",
        text: "The same applies at work: to a client, your own boss is uchi, so you'd say [田中|たなか]は… without さん. It feels backwards at first, but it's respect for the outsider.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Inside the family, people do call their mum お[母|かあ]さん when talking *to* her. The humble [母|はは] is for talking *about* her to outsiders.",
      },
    ],
  },
  {
    slug: "set-phrases",
    title: "Set phrases for everyday moments",
    mark: "[挨拶|あいさつ]",
    summary: "What to say before eating, leaving, coming home and meeting people.",
    source: "Genki I — Greetings; Tae Kim's Guide",
    blocks: [
      {
        type: "idea",
        text: "Japanese has fixed phrases for specific moments — eating, leaving, coming home, meeting someone. Using them right sounds instantly natural.",
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
            jp: "[初|はじ]めまして。 スミス です。 よろしく お[願|ねが]い します。",
            en: "Nice to meet you. I'm Smith. I look forward to getting to know you.",
            note: "The standard self-introduction. よろしくお[願|ねが]いします has no real English equivalent.",
          },
        ],
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "A", jp: "ただいま！", en: "I'm home!" },
          { speaker: "B", jp: "おかえり！", en: "Welcome back!" },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "お[疲|つか]れ[様|さま]です is the all-purpose greeting at work: hello, goodbye and “thanks for the effort” all in one.",
      },
    ],
  },
];
