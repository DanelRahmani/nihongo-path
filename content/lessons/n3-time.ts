import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n3Time: Lesson[] = [
  {
    slug: "uchi-ni",
    title: "While you still can: うちに and ないうちに",
    mark: "うちに",
    summary: "Do something while a state lasts, or before something happens.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (uchi ni); Bunpro, “うちに” and “ないうちに”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**うちに** says to do something while a state lasts, before it changes (“while it's still …”); after a ない form, **ないうちに** says “before … happens”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past (a state: いる, ある)", "[日本|にほん] に いる うち に"],
          ["Verb ている form", "[覚|おぼ]えて いる うち に"],
          ["い-adjective", "[若|わか]い うち に"],
          ["な-adjective + な", "[元気|げんき] な うち に"],
          ["Noun + の", "[学生|がくせい] の うち に"],
          ["Verb ない form", "[暗|くら]く ならない うち に"],
        ],
      },
      {
        type: "text",
        text: "うち (inside, within) is a noun, written in kana here, so it takes な after a な-adjective and の after a noun. What comes before it is a state that won't last: youth, hot food, your stay somewhere. The second half is what you do while you still can, so it's often 〜たい, 〜ておく, ほうがいい, an invitation or a request.",
      },
      {
        type: "text",
        text: "ないうちに looks at the same thing from the other side: [雨|あめ]が[降|ふ]らないうちに is “while it isn't raining yet”, so “before it rains”. It's close to [前|まえ]に, but adds that you'd better be quick, or that you can't tell when it will happen. [間|あいだ]に (its own lesson) only places an event inside a stretch of time; うちに adds “before the chance is gone”. With an action under way, うちに has one more use: something changed while it went on, almost without your noticing ([本|ほん]を[読|よ]んでいるうちに[寝|ね]てしまった: I fell asleep while reading).",
      },
      { type: "link", href: "/learn/n4-plans/made-ni-aida", label: "By and while: までに and [間|あいだ]", text: "[間|あいだ]に: at some point during." },
      { type: "heading", text: "うちに: while it's still …" },
      {
        type: "examples",
        items: [
          { jp: "[温|あたた]かい {うち に} [食|た]べて ください。", en: "Please eat it while it's warm.", alt: "[温|あたた]かい {うち に} [食|た]べて。" },
          {
            jp: "[若|わか]い {うち に}、 たくさん の [国|くに] へ [行|い]って みたい。",
            en: "I want to see lots of countries while I'm still young.",
            alt: "[若|わか]い {うち に}、 たくさん の [国|くに] へ [行|い]って みたい です。",
          },
          {
            jp: "[両親|りょうしん] が [元気|げんき] な {うち に}、 [一緒|いっしょ] に [旅行|りょこう] したい です。",
            en: "I want to go travelling with my parents while they're still in good health.",
            alt: "[両親|りょうしん] が [元気|げんき] な {うち に}、 [一緒|いっしょ] に [旅行|りょこう] したい。",
          },
          {
            jp: "[学生|がくせい] の {うち に}、 たくさん [本|ほん] を [読|よ]んで おいた ほう が いい よ。",
            en: "You should read lots of books while you're still a student.",
            alt: "[学生|がくせい] の {うち に}、 たくさん [本|ほん] を [読|よ]んで おいた ほう が いい です よ。",
          },
          {
            jp: "[覚|おぼ]えて いる {うち に}、 メモ して おこう。",
            en: "I'll jot it down while I still remember it.",
            alt: "[覚|おぼ]えて いる {うち に}、 メモ して おきます。",
          },
        ],
      },
      { type: "heading", text: "ないうちに: before … happens" },
      {
        type: "examples",
        items: [
          {
            jp: "[雨|あめ] が [降|ふ]らない {うち に}、 [帰|かえ]りましょう。",
            en: "Let's head home before it starts to rain.",
            alt: "[雨|あめ] が [降|ふ]らない {うち に}、 [帰|かえ]ろう。",
          },
          { jp: "[冷|さ]めない {うち に}、 どうぞ。", en: "Do have it before it gets cold.", note: "A host's set phrase, offering food or tea." },
          {
            jp: "[忘|わす]れない {うち に}、 [今|いま] [払|はら]って おきます。",
            en: "I'll pay you now, before I forget.",
            alt: "[忘|わす]れない {うち に}、 [今|いま] [払|はら]って おく ね。",
          },
          {
            jp: "[暗|くら]く ならない {うち に}、 [洗濯物|せんたくもの] を [入|い]れよう。",
            en: "Let's bring the washing in before it gets dark.",
            alt: "[暗|くら]く ならない {うち に}、 [洗濯物|せんたくもの] を [入|い]れましょう。",
          },
          {
            jp: "[子供|こども]たち が [起|お]きない {うち に}、 プレゼント を [置|お]いて おきました。",
            en: "I put the presents out before the children woke up.",
            alt: "[子供|こども]たち が [起|お]きない {うち に}、 プレゼント を [置|お]いて おいた。",
          },
        ],
      },
      { type: "heading", text: "Without noticing, and changes over time" },
      {
        type: "examples",
        items: [
          {
            jp: "[知|し]らない {うち に}、 [冬|ふゆ] に なって いた。",
            en: "Before I knew it, it had turned winter.",
            alt: "[知|し]らない {うち に}、 [冬|ふゆ] に なって いました。",
            note: "Another use of ないうちに: “without realising”.",
          },
          {
            jp: "[気|き]づかない {うち に}、 [財布|さいふ] が なく なって いた。",
            en: "My wallet had gone missing without my noticing.",
            alt: "[気|き]づかない {うち に}、 [財布|さいふ] が なく なって いました。",
          },
          {
            jp: "[話|はな]して いる {うち に}、 [夜|よる] に なって いた。",
            en: "While we were talking, night had fallen.",
            alt: "[話|はな]して いる {うち に}、 [夜|よる] に なって いました。",
            note: "With an action under way, うちに also says something changed while it went on.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[子供|こども] が [寝|ね]て いる {[間|あいだ] に}、 [掃除|そうじ] を しました。", en: "I did the cleaning while the child was asleep." },
        b: { jp: "[子供|こども] が [寝|ね]て いる {うち に}、 [掃除|そうじ] を しました。", en: "I got the cleaning done while the child was still asleep." },
        diff: "[間|あいだ]に only places the cleaning inside the nap. うちに adds that you used the chance before the child woke up.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "“Before it rains” takes the ない form",
        text: "✗ [雨|あめ]が[降|ふ]るうちに[帰|かえ]ろう ✓ [雨|あめ]が[降|ふ]らないうちに[帰|かえ]ろう. うちに means “while … lasts”, and what lasts until the rain is “not raining”. And a noun needs の: ✗ [学生|がくせい]うちに ✓ [学生|がくせい]のうちに.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[来月|らいげつ] から [大阪|おおさか] で [働|はたら]く ん だ。", en: "I start work in Osaka next month." },
          {
            speaker: "Kenta",
            jp: "そう なん だ。 じゃあ、 [東京|とうきょう] に いる {うち に}、 [一緒|いっしょ] に [飲|の]み に [行|い]こう よ。",
            en: "Oh, really? Then let's go for a drink while you're still in Tokyo.",
          },
          { speaker: "Aya", jp: "いい ね。 [忙|いそが]しく ならない {うち に}、 [来週|らいしゅう] は どう？", en: "Sounds good. How about next week, before things get busy?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With うちに (use [冷|つめ]たい): “Drink the beer while it's cold”: ビールは＿[飲|の]んでください。",
            answers: ["[冷|つめ]たい うち に"],
            explanation: "The beer won't stay cold, so drink it while it is: [冷|つめ]たいうちに.",
          },
          {
            prompt: "With ないうちに (use [始|はじ]まる): “Let's buy drinks before the film starts”: [映画|えいが]が＿、[飲|の]み[物|もの]を[買|か]いましょう。",
            answers: ["[始|はじ]まらない うち に"],
            explanation: "While the film hasn't started yet: [始|はじ]まらないうちに.",
          },
          {
            prompt: "With うちに, after a noun: “Let's go to the beach while it's still summer”: [夏|なつ]＿[海|うみ]に[行|い]こう。",
            answers: ["の うち に"],
            explanation: "A noun takes の before うちに: [夏|なつ]のうちに.",
          },
          {
            prompt: "With うちに (use [静|しず]か): “Let's study while the room is quiet”: [部屋|へや]が＿、[勉強|べんきょう]しよう。",
            answers: ["[静|しず]か な うち に"],
            explanation: "A な-adjective takes な before うちに: [静|しず]かなうちに.",
          },
          {
            prompt: "Fix it, keeping うちに (“before the shop closes”): [店|みせ]が[閉|し]まるうちに、[買|か]いに[行|い]こう。",
            answers: [
              "[店|みせ] が [閉|し]まらない うち に、 [買|か]い に [行|い]こう。",
              "[店|みせ] が [閉|し]まって いない うち に、 [買|か]い に [行|い]こう。",
              "[店|みせ] が [開|あ]いて いる うち に、 [買|か]い に [行|い]こう。",
              "[店|みせ] が やって いる うち に、 [買|か]い に [行|い]こう。",
            ],
            explanation: "“Before it closes” is “while it isn't closed yet”: [閉|し]まらないうちに. Or name the state that lasts: [開|あ]いているうちに.",
          },
        ],
      },
    ],
  },
  {
    slug: "ta-totan",
    title: "The moment that: たとたん",
    mark: "たとたん",
    summary: "Say that something sudden happened the very moment something else did.",
    source: "Bunpro, “たとたんに”; JLPT Sensei, “たとたん”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form + **とたん(に)** says that something happened the very moment something else did, usually something sudden or unexpected: “the moment …”, “just as …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb た form", "[家|いえ] を [出|で]た とたん に"],
          ["Verb た form, に dropped", "[窓|まど] を [開|あ]けた とたん"],
        ],
      },
      {
        type: "text",
        text: "とたん (the very moment) is a noun, written in kana here, and the に is often dropped. The verb before it is always in the た form, and the whole sentence reports something that has already happened. The second half is something that happened, often to the speaker's surprise: it's in the past, and it isn't something the speaker chose to do. So no request, invitation, plan or will comes after とたん; for “as soon as I get home, I'll call you”, say [帰|かえ]ったらすぐ or [帰|かえ]ってすぐ.",
      },
      {
        type: "text",
        text: "てすぐ (right after) is matter-of-fact and fits plans too. たら with a past ending also says “when …, (I found)”, without the suddenness. とたん is the one that says “the very instant”, and something you didn't expect.",
      },
      { type: "heading", text: "たとたん(に): the moment …" },
      {
        type: "examples",
        items: [
          {
            jp: "[家|いえ] を [出|で]た {とたん に}、 [雨|あめ] が [降|ふ]り[出|だ]した。",
            en: "The moment I stepped out of the house, it started to rain.",
            alt: "[家|いえ] を [出|で]た {とたん に}、 [雨|あめ] が [降|ふ]り[出|だ]しました。",
          },
          {
            jp: "ベッド に [入|はい]った {とたん}、 [寝|ね]て しまった。",
            en: "I was asleep the moment I got into bed.",
            alt: "ベッド に [入|はい]った {とたん}、 [寝|ね]て しまいました。",
          },
          {
            jp: "[試験|しけん] が [終|お]わった {とたん}、 おなか が すいて きた。",
            en: "The moment the exam was over, I suddenly felt hungry.",
            alt: "[試験|しけん] が [終|お]わった {とたん}、 おなか が すいて きました。",
          },
          {
            jp: "[窓|まど] を [開|あ]けた {とたん}、 [強|つよ]い [風|かぜ] が [入|はい]って きました。",
            en: "The moment I opened the window, a strong wind blew in.",
            alt: "[窓|まど] を [開|あ]けた {とたん}、 [強|つよ]い [風|かぜ] が [入|はい]って きた。",
          },
          {
            jp: "[彼|かれ] は [私|わたし] の [顔|かお] を [見|み]た {とたん に}、 [笑|わら]い[出|だ]した。",
            en: "He burst out laughing the moment he saw my face.",
            alt: "[彼|かれ] は [私|わたし] の [顔|かお] を [見|み]た {とたん に}、 [笑|わら]い[出|だ]しました。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[家|いえ] に [帰|かえ]った {とたん に}、 [電話|でんわ] が [鳴|な]った。", en: "The phone rang the very moment I got home." },
        b: { jp: "[家|いえ] に [帰|かえ]って {すぐ}、 [電話|でんわ] が [鳴|な]った。", en: "The phone rang just after I got home." },
        diff: "とたんに is the very instant, with a touch of “of all moments”. てすぐ is soon after, said matter-of-factly.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No plans after とたん",
        text: "✗ [駅|えき]に[着|つ]いたとたん、[電話|でんわ]します ✓ [駅|えき]に[着|つ]いたらすぐ、[電話|でんわ]します. とたん reports something that happened, sudden and out of your hands; a plan, a promise or a request doesn't follow it. And it takes the た form: ✗ [出|で]るとたん ✓ [出|で]たとたん.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[昨日|きのう] の [試合|しあい]、 [見|み]た？", en: "Did you watch yesterday's match?" },
          { speaker: "Aya", jp: "[見|み]たかった ん だ けど、 テレビ を つけた {とたん に} [終|お]わっちゃった。", en: "I wanted to, but it ended the very moment I turned on the TV." },
          { speaker: "Kenta", jp: "え、 [本当|ほんとう] に？ [残念|ざんねん] だった ね。", en: "What, really? What a shame." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With とたん (use [座|すわ]る): “The moment I sat down on the sofa, I felt sleepy”: ソファーに＿、[眠|ねむ]くなった。",
            answers: ["[座|すわ]った とたん に", "[座|すわ]った とたん"],
            explanation: "The た form + とたん(に): [座|すわ]ったとたんに.",
          },
          {
            prompt: "With とたん (use [聞|き]く): “The moment she heard the news, she started crying”: [彼女|かのじょ]はそのニュースを＿、[泣|な]き[出|だ]した。",
            answers: ["[聞|き]いた とたん に", "[聞|き]いた とたん"],
            explanation: "Her tears came at once, unplanned: [聞|き]いたとたん(に).",
          },
          {
            prompt: "With とたん (use [開|あ]く): “The moment the door opened, the children ran outside”: ドアが＿、[子供|こども]たちが[外|そと]へ[走|はし]り[出|だ]しました。",
            answers: ["[開|あ]いた とたん に", "[開|あ]いた とたん"],
            explanation: "[開|あ]く → [開|あ]いた, + とたん(に): the children were off at once.",
          },
          {
            prompt: "Fix it (a promise: “I'll email you as soon as I arrive”): [着|つ]いたとたん、メールします。",
            answers: [
              "[着|つ]いたら、 メール します。",
              "[着|つ]いたら すぐ、 メール します。",
              "[着|つ]いたら すぐ に メール します。",
              "[着|つ]いて すぐ、 メール します。",
              "[着|つ]いて すぐ に メール します。",
            ],
            explanation: "A promise is your own plan, so not とたん: [着|つ]いたらすぐ (or [着|つ]いてすぐ) メールします.",
          },
        ],
      },
    ],
  },
  {
    slug: "saichuu-ni",
    title: "Right in the middle of: さいちゅうに",
    mark: "[最中|さいちゅう]",
    summary: "Say that something broke in right in the middle of an activity.",
    source: "Bunpro, “最中に”; JLPT Sensei, “最中に”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Verb ている form or Noun + の + **[最中|さいちゅう]に** says something happened right in the middle of an activity, usually an interruption; ending the sentence, **[最中|さいちゅう]だ** says you're in the thick of it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb ている form", "[料理|りょうり] を [作|つく]って いる [最中|さいちゅう] に"],
          ["Noun + の", "[会議|かいぎ] の [最中|さいちゅう] に"],
          ["Ending the sentence: [最中|さいちゅう]だ", "[準備|じゅんび] の [最中|さいちゅう] だ"],
        ],
      },
      {
        type: "text",
        text: "[最中|さいちゅう] (the very middle, the height) is written in kanji. It takes an activity with a beginning and an end: a meeting, a meal, a match, cooking. What follows [最中|さいちゅう]に is something that broke in, often at a bad moment. [最中|さいちゅう]だ (politely です, and often なんです) says you're busy with something right now.",
      },
      {
        type: "text",
        text: "ている[間|あいだ]に (its own lesson) simply places an event at some point during an activity; [最中|さいちゅう]に stresses that it came right in the thick of it. ているところだ (also its own lesson) says which stage an action is at; [最中|さいちゅう]だ adds that you're fully taken up with it.",
      },
      { type: "link", href: "/learn/n4-plans/tokoro", label: "About to, in the middle of, just done: ところだ", text: "The stage an action is at." },
      { type: "heading", text: "[最中|さいちゅう]に: right in the middle of" },
      {
        type: "examples",
        items: [
          {
            jp: "[会議|かいぎ] の {[最中|さいちゅう] に}、 [電話|でんわ] が [鳴|な]って しまった。",
            en: "My phone went off right in the middle of the meeting.",
            alt: "[会議|かいぎ] の {[最中|さいちゅう] に}、 [電話|でんわ] が [鳴|な]って しまいました。",
          },
          {
            jp: "[料理|りょうり] を [作|つく]って いる {[最中|さいちゅう] に}、 [友達|ともだち] が [来|き]ました。",
            en: "A friend turned up right while I was in the middle of cooking.",
            alt: "[料理|りょうり] を [作|つく]って いる {[最中|さいちゅう] に}、 [友達|ともだち] が [来|き]た。",
          },
          {
            jp: "[試験|しけん] の {[最中|さいちゅう] に}、 [気分|きぶん] が [悪|わる]く なった。",
            en: "Right in the middle of the exam, I started to feel ill.",
            alt: "[試験|しけん] の {[最中|さいちゅう] に}、 [気分|きぶん] が [悪|わる]く なりました。",
          },
          {
            jp: "[試合|しあい] の {[最中|さいちゅう] に}、 [雨|あめ] が [降|ふ]り[出|だ]しました。",
            en: "It started to rain right in the middle of the match.",
            alt: "[試合|しあい] の {[最中|さいちゅう] に}、 [雨|あめ] が [降|ふ]り[出|だ]した。",
          },
        ],
      },
      { type: "heading", text: "[最中|さいちゅう]だ: in the thick of it" },
      {
        type: "examples",
        items: [
          {
            jp: "[今|いま]、 [会議|かいぎ] の [準備|じゅんび] の {[最中|さいちゅう] です}。",
            en: "We're right in the thick of getting ready for the meeting.",
            alt: "[今|いま]、 [会議|かいぎ] の [準備|じゅんび] の {[最中|さいちゅう]} なん だ。",
          },
          {
            jp: "[今|いま] [話|はな]し[合|あ]い の {[最中|さいちゅう]} だ から、 [静|しず]か に して。",
            en: "We're in the middle of a discussion, so keep it down.",
            alt: "[今|いま] [話|はな]し[合|あ]い の {[最中|さいちゅう]} です から、 [静|しず]か に して ください。",
          },
          { jp: "[父|ちち] は [今|いま]、 [食事|しょくじ] の {[最中|さいちゅう] です}。", en: "My father is in the middle of his meal just now." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[電話|でんわ] を して いる {[間|あいだ] に}、 [誰|だれ]か が [来|き]た。", en: "Someone came by while I was on the phone." },
        b: { jp: "[電話|でんわ] を して いる {[最中|さいちゅう] に}、 [誰|だれ]か が [来|き]た。", en: "Someone came by right in the middle of my phone call." },
        diff: "[間|あいだ]に: at some point during the call. [最中|さいちゅう]に: right in the thick of it, an interruption at a bad moment.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "の after a noun, ている after a verb",
        text: "✗ [会議|かいぎ][最中|さいちゅう]に ✓ [会議|かいぎ]の[最中|さいちゅう]に. ✗ [料理|りょうり]を[作|つく]る[最中|さいちゅう]に ✓ [料理|りょうり]を[作|つく]っている[最中|さいちゅう]に. A noun takes の, and a verb takes the ている form: [最中|さいちゅう] is about an action already under way.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[森|もり]-さん、 ちょっと いい です か？", en: "Mori-san, have you got a moment?" },
          {
            speaker: "Mr Mori",
            jp: "すみません、 [今|いま] [資料|しりょう] を [作|つく]って いる {[最中|さいちゅう]} なん です。 [後|あと] で も いい です か？",
            en: "Sorry, I'm right in the middle of putting the documents together. Could it wait a bit?",
          },
          { speaker: "Ms Sato", jp: "もちろん です。 [終|お]わったら [声|こえ] を かけて ください。", en: "Of course. Give me a shout when you're done." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With [最中|さいちゅう]に, after a noun: “An earthquake struck right in the middle of the lesson”: [授業|じゅぎょう]＿、[地震|じしん]が[起|お]きた。",
            answers: ["の [最中|さいちゅう] に"],
            explanation: "A noun takes の before [最中|さいちゅう]に: [授業|じゅぎょう]の[最中|さいちゅう]に.",
          },
          {
            prompt: "With [最中|さいちゅう]に (use [寝|ね]る): “Someone came round right while I was asleep”: ＿、[誰|だれ]かが[来|き]た。",
            answers: ["[寝|ね]て いる [最中|さいちゅう] に"],
            explanation: "A verb takes the ている form: [寝|ね]ている[最中|さいちゅう]に.",
          },
          {
            prompt: "Polite, with [最中|さいちゅう] (use [掃除|そうじ]する): “I'm right in the middle of cleaning the house just now”: [今|いま]、[家|いえ]を＿。",
            answers: ["[掃除|そうじ] して いる [最中|さいちゅう] です", "[掃除|そうじ] して いる [最中|さいちゅう] なん です"],
            explanation: "The ている form + [最中|さいちゅう]です: [掃除|そうじ]している[最中|さいちゅう]です.",
          },
          {
            prompt: "Fix it: [映画|えいが][最中|さいちゅう]に、[電話|でんわ]が[鳴|な]った。",
            answers: ["[映画|えいが] の [最中|さいちゅう] に、 [電話|でんわ] が [鳴|な]った。", "[映画|えいが] を [見|み]て いる [最中|さいちゅう] に、 [電話|でんわ] が [鳴|な]った。"],
            explanation: "A noun needs の: [映画|えいが]の[最中|さいちゅう]に. Or use the verb: [見|み]ている[最中|さいちゅう]に.",
          },
        ],
      },
    ],
  },
  {
    slug: "tabi-ni",
    title: "Every time: たびに",
    mark: "たびに",
    summary: "Say that something happens every time something else does.",
    source: "Bunpro, “たびに”; JLPT Sensei, “たびに”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb or Noun + の + **たびに** says something happens each time another thing does: “every time …”, “whenever …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past", "[会|あ]う たび に"],
          ["Noun + の", "[旅行|りょこう] の たび に"],
        ],
      },
      {
        type: "text",
        text: "たび (time, occasion) is a noun, written in kana here, and the に may drop. The verb before it stays in the plain non-past even about the past: [行|い]くたびに…[買|か]った. たびに is for things that come round again and again, and it counts each one: “every single time”. と (its own lesson) can also state a habit ([春|はる]になると…), but it reads as a rule of how things go; たびに stresses that it happens without fail, and a noun can come before it.",
      },
      { type: "link", href: "/learn/n4-conditions/to-natural", label: "When … always: と", text: "A natural result, or a habit." },
      { type: "heading", text: "たびに: every time" },
      {
        type: "examples",
        items: [
          {
            jp: "この [歌|うた] を [聞|き]く {たび に}、 [昔|むかし] の こと を [思|おも]い[出|だ]す。",
            en: "Every time I hear this song, I think of the old days.",
            alt: "この [歌|うた] を [聞|き]く {たび に}、 [昔|むかし] の こと を [思|おも]い[出|だ]します。",
          },
          {
            jp: "[祖母|そぼ] の [家|いえ] に [行|い]く {たび に}、 [料理|りょうり] を [教|おし]えて もらいました。",
            en: "Every time I went to my grandmother's, she taught me some cooking.",
            alt: "[祖母|そぼ] の [家|いえ] に [行|い]く {たび に}、 [料理|りょうり] を [教|おし]えて もらった。",
          },
          {
            jp: "[旅行|りょこう] の {たび に}、 [写真|しゃしん] を [何百枚|なんびゃくまい] も [撮|と]って しまう。",
            en: "Every trip, I end up taking hundreds of photos.",
            alt: "[旅行|りょこう] の {たび に}、 [写真|しゃしん] を [何百枚|なんびゃくまい] も [撮|と]って しまいます。",
          },
          { jp: "[彼|かれ] は [会|あ]う {たび に} [違|ちが]う [車|くるま] に [乗|の]って いる。", en: "Every time I see him, he's driving a different car." },
          {
            jp: "[地震|じしん] の ニュース を [見|み]る {たび に}、 [家族|かぞく] の こと が [心配|しんぱい] に なります。",
            en: "Every time I see news of an earthquake, I worry about my family.",
            alt: "[地震|じしん] の ニュース を [見|み]る {たび に}、 [家族|かぞく] の こと が [心配|しんぱい] に なる。",
          },
        ],
      },
      { type: "heading", text: "Noun + の + たびに" },
      {
        type: "examples",
        items: [
          {
            jp: "[試合|しあい] の {たび に}、 [家族|かぞく] が [来|き]て くれる。",
            en: "My family comes along to every match.",
            alt: "[試合|しあい] の {たび に}、 [家族|かぞく] が [来|き]て くれます。",
          },
          {
            jp: "[会議|かいぎ] の {たび に}、 [資料|しりょう] を [作|つく]る の が [大変|たいへん] です。",
            en: "Every meeting, putting the documents together is a lot of work.",
            alt: "[会議|かいぎ] の {たび に}、 [資料|しりょう] を [作|つく]る の が [大変|たいへん] だ。",
          },
          {
            jp: "[授業|じゅぎょう] の {たび に}、 [新|あたら]しい [言葉|ことば] を [覚|おぼ]える。",
            en: "In every class, I learn some new words.",
            alt: "[授業|じゅぎょう] の {たび に}、 [新|あたら]しい [言葉|ことば] を [覚|おぼ]えます。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [写真|しゃしん] を [見|み]る {と}、 [笑|わら]って しまう。", en: "When I look at this photo, I can't help laughing." },
        b: { jp: "この [写真|しゃしん] を [見|み]る {たび に}、 [笑|わら]って しまう。", en: "Every single time I look at this photo, I can't help laughing." },
        diff: "と says what follows whenever you look; たびに counts each time and stresses that it never fails.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A noun needs の",
        text: "✗ [旅行|りょこう]たびに ✓ [旅行|りょこう]のたびに. たび is a noun, so a noun takes の before it. And the verb stays in the plain non-past, even about the past: [行|い]くたびに…[買|か]った.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "また [新|あたら]しい かばん？", en: "Another new bag?" },
          { speaker: "Kenta", jp: "うん。 [東京|とうきょう] に [行|い]く {たび に}、 [何|なに] か [買|か]っちゃう ん だ。", en: "Yeah. Every time I go to Tokyo, I end up buying something." },
          { speaker: "Aya", jp: "[私|わたし] も。 [買|か]い[物|もの] の {たび に}、 [財布|さいふ] が [軽|かる]く なる よ。", en: "Me too. Every shopping trip, my purse gets lighter." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With たびに (use [見|み]る): “Every time I watch this film, I cry”: この[映画|えいが]を＿、[泣|な]いてしまう。",
            answers: ["[見|み]る たび に", "[見|み]る たび"],
            explanation: "The plain non-past + たびに: [見|み]るたびに.",
          },
          {
            prompt: "With たびに, after a noun: “Every time there's a typhoon, the trains stop”: [台風|たいふう]＿、[電車|でんしゃ]が[止|と]まる。",
            answers: ["の たび に", "の たび"],
            explanation: "A noun takes の before たびに: [台風|たいふう]のたびに.",
          },
          {
            prompt: "With たびに (use [来|く]る): “Every time my brother comes over, he brings a present”: [兄|あに]は[家|いえ]に＿、お[土産|みやげ]を[持|も]ってきてくれます。",
            answers: ["[来|く]る たび に", "[来|く]る たび"],
            explanation: "[来|く]るたびに: every visit, without fail.",
          },
          {
            prompt: "Fix it: [休|やす]みたびに、[海|うみ]へ[行|い]きます。",
            answers: [
              "[休|やす]み の たび に、 [海|うみ] へ [行|い]きます。",
              "[休|やす]み の たび、 [海|うみ] へ [行|い]きます。",
              "[休|やす]み に なる たび に、 [海|うみ] へ [行|い]きます。",
              "[休|やす]み に なる たび、 [海|うみ] へ [行|い]きます。",
            ],
            explanation: "[休|やす]み is a noun here, so it needs の: [休|やす]みのたびに.",
          },
        ],
      },
    ],
  },
  {
    slug: "goto-oki-ni",
    title: "Every and every other: ごとに and おきに",
    mark: "ごと・おき",
    summary: "Say how often something comes round, and how many are skipped in between.",
    source: "Bunpro, “ごとに” and “おきに”; JLPT Sensei, “ごとに”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "Bunpro has ごとに at N4 and おきに at N3; JLPT Sensei has ごとに at N3 and no おきに."),
    blocks: [
      {
        type: "idea",
        text: "A number and counter + **ごとに** says how often something comes round (“every two days”), + **おきに** counts the units skipped in between (“every other day”), and after a noun ごとに means “each” ([駅|えき]ごとに: at every station).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Before it", "Example"],
        rows: [
          ["Every: ごとに", "Number + counter", "[一時間|いちじかん]ごと に"],
          ["Each: ごとに", "Noun", "[駅|えき]ごと に"],
          ["Every other: おきに", "Number + counter", "[一日|いちにち]おき に"],
        ],
      },
      {
        type: "text",
        text: "Both are suffixes, written in kana and joined to the word before them. With days, weeks, months and years, ごとに counts from one time to the next: [二日|ふつか]ごとに is every two days (Monday, Wednesday, Friday). おきに counts the units skipped: [一日|いちにち]おきに skips one day each time, so it is every other day (Monday, Wednesday, Friday too). [二日|ふつか]おきに skips two days: every three days.",
      },
      {
        type: "text",
        text: "With minutes, hours and distances, the two usually mean the same: [五分|ごふん]おきに and [五分|ごふん]ごとに are both “every five minutes”, and so are “every ten metres” with either. After a noun only ごとに fits: [国|くに]ごとに (in each country), [季節|きせつ]ごとに (every season).",
      },
      { type: "heading", text: "ごとに: every" },
      {
        type: "examples",
        items: [
          {
            jp: "この バス は [十五分|じゅうごふん]{ごと に} [来|き]ます。",
            en: "This bus comes every fifteen minutes.",
            alt: "この バス は [十五分|じゅうごふん]{ごと に} [来|く]る よ。",
          },
          {
            jp: "[一時間|いちじかん]{ごと に} [休|やす]み を [取|と]りましょう。",
            en: "Let's take a break every hour.",
            alt: "[一時間|いちじかん]{ごと に} [休|やす]み を [取|と]ろう。",
          },
          { jp: "この [薬|くすり] は [六時間|ろくじかん]{ごと に} [飲|の]んで ください。", en: "Take this medicine every six hours." },
        ],
      },
      { type: "heading", text: "Noun + ごとに: each" },
      {
        type: "examples",
        items: [
          {
            jp: "[駅|えき]{ごと に} [乗|の]る [人|ひと] が [増|ふ]えて いった。",
            en: "At every station, more and more people got on.",
            alt: "[駅|えき]{ごと に} [乗|の]る [人|ひと] が [増|ふ]えて いきました。",
          },
          {
            jp: "あの [店|みせ] の メニュー は [季節|きせつ]{ごと に} [変|か]わります。",
            en: "That restaurant's menu changes every season.",
            alt: "あの [店|みせ] の メニュー は [季節|きせつ]{ごと に} [変|か]わる。",
          },
          {
            jp: "[国|くに]{ごと に} [法律|ほうりつ] が [違|ちが]います。",
            en: "The laws differ from country to country.",
            alt: "[国|くに]{ごと に} [法律|ほうりつ] が [違|ちが]う。",
          },
        ],
      },
      { type: "heading", text: "おきに: every other, at intervals of" },
      {
        type: "examples",
        items: [
          {
            jp: "[一日|いちにち]{おき に} プール に [通|かよ]って います。",
            en: "I go to the pool every other day.",
            alt: "[一日|いちにち]{おき に} プール に [通|かよ]って いる。",
          },
          {
            jp: "[母|はは] に は [一週間|いっしゅうかん]{おき に} [電話|でんわ] して います。",
            en: "I ring my mother every other week.",
            alt: "[母|はは] に は [一週間|いっしゅうかん]{おき に} [電話|でんわ] して いる。",
          },
          {
            jp: "[一年|いちねん]{おき に} [国|くに] へ [帰|かえ]ります。",
            en: "I go back to my home country every other year.",
            alt: "[一年|いちねん]{おき に} [国|くに] へ [帰|かえ]る。",
          },
          {
            jp: "[席|せき] は [一|ひと]つ{おき に} [座|すわ]って ください。",
            en: "Please sit in every other seat.",
            alt: "[席|せき] は [一|ひと]つ{おき に} [座|すわ]って ね。",
          },
          {
            jp: "[五分|ごふん]{おき に} [電車|でんしゃ] が [来|き]ます。",
            en: "There's a train every five minutes.",
            alt: "[五分|ごふん]{おき に} [電車|でんしゃ] が [来|く]る。",
            note: "With minutes, [五分|ごふん]ごとに means the same.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[二日|ふつか]{ごと} に [走|はし]って います。", en: "I go running every two days." },
        b: { jp: "[二日|ふつか]{おき} に [走|はし]って います。", en: "I go running every three days (with two days off in between)." },
        diff: "With days, ごとに counts from one run to the next; おきに counts the days skipped in between, so it's one more.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[一日|いちにち]おき isn't every day",
        text: "✗ [一日|いちにち]おきに[日本語|にほんご]を[勉強|べんきょう]します (meaning every day) ✓ [毎日|まいにち][日本語|にほんご]を[勉強|べんきょう]します. [一日|いちにち]おきに skips a day: every other day. For every day, say [毎日|まいにち]; for every two days, [二日|ふつか]ごとに or [一日|いちにち]おきに.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Customer", jp: "この [花|はな]、 [水|みず] は [毎日|まいにち] やった ほう が いい です か？", en: "Should I water these flowers every day?" },
          { speaker: "Florist", jp: "いいえ、 [二日|ふつか]{おき} ぐらい で [大丈夫|だいじょうぶ] です よ。", en: "No, every three days or so is fine (leave two days in between)." },
          { speaker: "Customer", jp: "わかりました。 ありがとう ございます。", en: "I see. Thank you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ごとに: “This festival is held every four years”: このお[祭|まつ]りは＿[行|おこな]われます。",
            answers: ["[四年|よねん]ごと に", "4[年|ねん]ごと に"],
            explanation: "Every four years, counting from one festival to the next: [四年|よねん]ごとに.",
          },
          {
            prompt: "With おきに: “I wash my hair every other day”: [髪|かみ]は＿[洗|あら]います。",
            answers: ["[一日|いちにち]おき に", "1[日|にち]おき に"],
            explanation: "Every other day skips one day: [一日|いちにち]おきに.",
          },
          {
            prompt: "After a noun, with ごとに: “Prices differ from shop to shop”: [値段|ねだん]は[店|みせ]＿[違|ちが]います。",
            answers: ["ごと に"],
            explanation: "Noun + ごとに: each shop has its own price.",
          },
          {
            prompt: "With おきに: “The meeting is every other week”: [会議|かいぎ]は＿あります。",
            answers: ["[一週間|いっしゅうかん]おき に", "1[週間|しゅうかん]おき に", "[一週|いっしゅう]おき に", "1[週|しゅう]おき に"],
            explanation: "Every other week skips one week: [一週間|いっしゅうかん]おきに.",
          },
          {
            prompt: "Fix it (“I write my diary every day”): [一日|いちにち]おきに[日記|にっき]を[書|か]いています。",
            answers: ["[毎日|まいにち] [日記|にっき] を [書|か]いて います。", "[一日|いちにち]ごと に [日記|にっき] を [書|か]いて います。", "1[日|にち]ごと に [日記|にっき] を [書|か]いて います。"],
            explanation: "[一日|いちにち]おきに is every other day; every day is [毎日|まいにち].",
          },
        ],
      },
    ],
  },
  {
    slug: "ippou-da",
    title: "More and more, and worse and worse: いっぽうだ and ばかりだ",
    mark: "[一方|いっぽう]だ",
    summary: "Say a trend keeps going one way, and that things keep getting worse.",
    source: "Bunpro, “一方だ” and “ばかりだ”; JLPT Sensei, “一方だ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb of change + **[一方|いっぽう]だ** says a trend keeps going one way and shows no sign of turning (“keeps …ing”, “more and more”), and **ばかりだ** after the same verbs says it keeps getting worse (usually an unwelcome change).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Before it", "Example"],
        rows: [
          ["Keeps going: [一方|いっぽう]だ", "Verb, plain non-past (a change)", "[増|ふ]える [一方|いっぽう] だ"],
          ["Getting worse: ばかりだ", "Verb, plain non-past (a change for the worse)", "[悪|わる]く なる ばかり だ"],
        ],
      },
      {
        type: "text",
        text: "[一方|いっぽう] is a noun (one way, one direction). The verb before it is one of change: [増|ふ]える, [減|へ]る, [上|あ]がる, [下|さ]がる, 〜くなる. It's mostly said of things getting worse, or a change no one seems able to stop, but a good trend can take it too: [人気|にんき]が[上|あ]がる[一方|いっぽう]だ. Politely it's [一方|いっぽう]です; in the past, [一方|いっぽう]だった.",
      },
      {
        type: "text",
        text: "ばかりだ (in kana) is narrower and sounds more fed up: it is usually used of unwelcome changes, so for good news [一方|いっぽう]だ is the safer choice. Beware: [一方|いっぽう]で (with で, not だ) usually means “on the other hand”, so [増|ふ]える[一方|いっぽう]で… in reading is not always “keeps increasing”. ていく and てくる (their own lesson) describe a change as it goes on from now or comes up to now, without saying it won't stop. Another ばかり, “nothing but”, comes in a later unit.",
      },
      { type: "link", href: "/learn/n4-plans/te-iku-kuru", label: "Going and coming: ていく and てくる", text: "A change coming up to now, or going on from now." },
      { type: "heading", text: "[一方|いっぽう]だ: keeps going one way" },
      {
        type: "examples",
        items: [
          {
            jp: "[最近|さいきん]、 [物|もの] の [値段|ねだん] が [上|あ]がる {[一方|いっぽう] だ}。",
            en: "Prices just keep going up these days.",
            alt: "[最近|さいきん]、 [物|もの] の [値段|ねだん] が [上|あ]がる {[一方|いっぽう] です}。",
          },
          {
            jp: "この [町|まち] の [人口|じんこう] は [減|へ]る {[一方|いっぽう] です}。",
            en: "This town's population keeps on falling.",
            alt: "この [町|まち] の [人口|じんこう] は [減|へ]る {[一方|いっぽう] だ}。",
          },
          {
            jp: "[仕事|しごと] は [忙|いそが]しく なる {[一方|いっぽう] です}。",
            en: "Work just keeps getting busier.",
            alt: "[仕事|しごと] は [忙|いそが]しく なる {[一方|いっぽう] だ}。",
          },
          {
            jp: "[彼|かれ] の [病気|びょうき] は [悪|わる]く なる {[一方|いっぽう] だった}。",
            en: "His illness only kept getting worse.",
            alt: "[彼|かれ] の [病気|びょうき] は [悪|わる]く なる {[一方|いっぽう] でした}。",
          },
          { jp: "あの [店|みせ] の [人気|にんき] は [上|あ]がる {[一方|いっぽう] です}。", en: "That shop keeps getting more and more popular." },
        ],
      },
      { type: "heading", text: "ばかりだ: getting worse and worse" },
      {
        type: "examples",
        items: [
          {
            jp: "[薬|くすり] を [飲|の]んで も、 [熱|ねつ] は [上|あ]がる {ばかり だ}。",
            en: "Even with medicine, my temperature just keeps going up.",
            alt: "[薬|くすり] を [飲|の]んで も、 [熱|ねつ] は [上|あ]がる {ばかり です}。",
          },
          {
            jp: "[練習|れんしゅう] しない から、 ピアノ が [下手|へた] に なる {ばかり です}。",
            en: "I don't practise, so my piano playing just gets worse and worse.",
            alt: "[練習|れんしゅう] しない から、 ピアノ が [下手|へた] に なる {ばかり だ}。",
          },
          {
            jp: "[雨|あめ] は [強|つよ]く なる {ばかり で}、 [困|こま]って います。",
            en: "The rain just keeps getting heavier, and I don't know what to do.",
            alt: "[雨|あめ] は [強|つよ]く なる {ばかり で}、 [困|こま]って いる。",
          },
          {
            jp: "[問題|もんだい] は [大|おお]きく なる {ばかり だ}。",
            en: "The problem only keeps getting bigger.",
            alt: "[問題|もんだい] は [大|おお]きく なる {ばかり です}。",
          },
          {
            jp: "[二人|ふたり] の [関係|かんけい] は [悪|わる]く なる {ばかり でした}。",
            en: "Things between the two of them only got worse.",
            alt: "[二人|ふたり] の [関係|かんけい] は [悪|わる]く なる {ばかり だった}。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[町|まち] の [小|ちい]さい [店|みせ] が [減|へ]って {きました}。", en: "The town's little shops have been getting fewer." },
        b: { jp: "[町|まち] の [小|ちい]さい [店|みせ] が [減|へ]る {[一方|いっぽう] です}。", en: "The town's little shops just keep on disappearing." },
        diff: "てきました reports a change that has come up to now. [一方|いっぽう]です says it keeps going the one way, with no sign of stopping.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A verb of change, not a state",
        text: "✗ [値段|ねだん]が[高|たか]い[一方|いっぽう]だ ✓ [値段|ねだん]が[高|たか]くなる[一方|いっぽう]だ. [一方|いっぽう]だ and ばかりだ need a change, not a state. ばかりだ usually sounds fed up, so for good news [一方|いっぽう]だ is the safer choice.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[最近|さいきん]、 [毎晩|まいばん] [遅|おそ]く まで [働|はたら]いて います ね。", en: "You've been working late every night lately." },
          { speaker: "Mr Mori", jp: "ええ。 [人|ひと] は [減|へ]った のに、 [仕事|しごと] は [増|ふ]える {[一方|いっぽう] です}。", en: "Yes. We've fewer people, yet the work just keeps piling up." },
          { speaker: "Ms Sato", jp: "この まま だ と、 みんな の [仕事|しごと] は [大変|たいへん] に なる {ばかり です} よね。", en: "If it carries on like this, work is just going to get harder and harder for everyone." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with [一方|いっぽう] (use [減|へ]る): “The number of students at this school keeps falling”: この[学校|がっこう]の[学生|がくせい]は＿。",
            answers: ["[減|へ]る [一方|いっぽう] です"],
            explanation: "A verb of change + [一方|いっぽう]です: [減|へ]る[一方|いっぽう]です.",
          },
          {
            prompt: "Casual, with ばかり (use [悪|わる]い): “The weather just keeps getting worse”: [天気|てんき]は＿。",
            answers: ["[悪|わる]く なる ばかり だ", "[悪|わる]く なる ばかり"],
            explanation: "[悪|わる]い → [悪|わる]くなる (a change), + ばかりだ.",
          },
          {
            prompt: "Polite, with [一方|いっぽう] (use [増|ふ]える): “The number of foreigners working in Japan just keeps growing”: [日本|にほん]で[働|はたら]く[外国人|がいこくじん]は＿。",
            answers: ["[増|ふ]える [一方|いっぽう] です"],
            explanation: "[増|ふ]える[一方|いっぽう]です: more and more, with no sign of stopping.",
          },
          {
            prompt: "Fix it, keeping [一方|いっぽう] (“It just keeps getting colder”): [寒|さむ]い[一方|いっぽう]です。",
            answers: ["[寒|さむ]く なる [一方|いっぽう] です。"],
            explanation: "[一方|いっぽう]だ needs a change: [寒|さむ]くなる[一方|いっぽう]です.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-tsurete",
    title: "As one thing changes, so does another: につれて",
    mark: "につれて",
    summary: "Say that as one thing changes, another changes along with it.",
    source: "Bunpro, “につれて”; JLPT Sensei, “につれて”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A verb or noun of change + **につれて** says that as one thing changes, another changes along with it: “as …”, “the more …, the more …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past", "[年|とし] を [取|と]る につれて"],
          ["Noun (a change)", "[季節|きせつ] の [変化|へんか] につれて"],
        ],
      },
      {
        type: "text",
        text: "Both halves are changes that go on gradually, side by side. The first is a verb of change ([増|ふ]える, [上|あ]がる, 〜くなる, [近|ちか]づく) or a noun that names one ([変化|へんか]); the second is a change too, often 〜てくる, 〜ていく or 〜ようになる. A single event or the speaker's will doesn't follow it: ✗ [暑|あつ]くなるにつれて、[海|うみ]に[行|い]こう. Formal writing drops the て: につれ.",
      },
      {
        type: "text",
        text: "とともに (along with) is close, and more formal. ば〜ほど (the more …, the more), coming in a later unit, says the same as a rule. と (its own lesson) says one thing follows another, without the step-by-step link.",
      },
      { type: "heading", text: "につれて: as …" },
      {
        type: "examples",
        items: [
          {
            jp: "[年|とし] を [取|と]る {につれて}、 [朝|あさ] [早|はや]く [起|お]きる よう に なった。",
            en: "As I've got older, I've started getting up earlier.",
            alt: "[年|とし] を [取|と]る {につれて}、 [朝|あさ] [早|はや]く [起|お]きる よう に なりました。",
          },
          {
            jp: "[日本語|にほんご] が [上手|じょうず] に なる {につれて}、 [日本|にほん] の [生活|せいかつ] が [楽|たの]しく なって きました。",
            en: "As my Japanese got better, life in Japan got more and more fun.",
            alt: "[日本語|にほんご] が [上手|じょうず] に なる {につれて}、 [日本|にほん] の [生活|せいかつ] が [楽|たの]しく なって きた。",
          },
          {
            jp: "[台風|たいふう] が [近|ちか]づく {につれて}、 [風|かぜ] が [強|つよ]く なって きた。",
            en: "As the typhoon drew nearer, the wind grew stronger.",
            alt: "[台風|たいふう] が [近|ちか]づく {につれて}、 [風|かぜ] が [強|つよ]く なって きました。",
          },
          {
            jp: "[町|まち] が [大|おお]きく なる {につれて}、 [緑|みどり] が [減|へ]って いきました。",
            en: "As the town grew, there was less and less greenery.",
            alt: "[町|まち] が [大|おお]きく なる {につれて}、 [緑|みどり] が [減|へ]って いった。",
          },
          {
            jp: "[季節|きせつ] の [変化|へんか] {につれて}、 [山|やま] の [色|いろ] も [変|か]わって いく。",
            en: "The colours of the mountains change with the seasons.",
            alt: "[季節|きせつ] の [変化|へんか] {につれて}、 [山|やま] の [色|いろ] も [変|か]わって いきます。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山|やま] を [登|のぼ]る {につれて}、 [寒|さむ]く なる。", en: "The higher you climb, the colder it gets." },
        b: { jp: "[山|やま] を [登|のぼ]る {と}、 [寒|さむ]く なる。", en: "When you climb a mountain, it gets cold." },
        diff: "につれて links the two step by step: each bit of the climb brings more cold. と just says the cold follows the climb.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Both halves are changes",
        text: "✗ [大人|おとな]になるにつれて、[車|くるま]を[買|か]った ✓ [大人|おとな]になるにつれて、[考|かんが]え[方|かた]が[変|か]わった. Buying a car is one event, not a change that grows step by step, so it can't follow につれて.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[最近|さいきん]、 [暗|くら]く なる の が [早|はや]く なった ね。", en: "It's been getting dark earlier lately." },
          { speaker: "Kenta", jp: "うん。 [寒|さむ]く なる {につれて}、 [朝|あさ] [起|お]きる の が [大変|たいへん] に なる よ。", en: "Yeah. The colder it gets, the harder it is to get up in the morning." },
          { speaker: "Aya", jp: "わかる。 [毎朝|まいあさ]、 ベッド から [出|で]たくない。", en: "I know. Every morning, I don't want to get out of bed." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With につれて (use [増|ふ]える): “As more visitors came, the town grew livelier”: [町|まち]に[来|く]る[人|ひと]が＿、[町|まち]がにぎやかになった。",
            answers: ["[増|ふ]える につれて", "[増|ふ]える につれ"],
            explanation: "A verb of change + につれて: [増|ふ]えるにつれて.",
          },
          {
            prompt: "With につれて (use [慣|な]れる): “As I got used to the job, it started to be fun”: [仕事|しごと]に＿、[楽|たの]しくなってきた。",
            answers: ["[慣|な]れる につれて", "[慣|な]れる につれ", "[慣|な]れて くる につれて"],
            explanation: "Getting used to it is gradual, and so is the fun: [慣|な]れるにつれて.",
          },
          {
            prompt: "With につれて, after a noun: “Our meals changed along with our way of life”: [生活|せいかつ]の[変化|へんか]＿、[食|た]べ[物|もの]も[変|か]わってきた。",
            answers: ["につれて", "につれ"],
            explanation: "A noun of change goes straight before につれて: [変化|へんか]につれて.",
          },
          {
            prompt: "With につれて (use [難|むずか]しい): “As the lessons got harder, the homework grew too”: [授業|じゅぎょう]が＿、[宿題|しゅくだい]も[多|おお]くなった。",
            answers: ["[難|むずか]しく なる につれて", "[難|むずか]しく なる につれ", "[難|むずか]しく なって くる につれて", "[難|むずか]しく なって くる につれ"],
            explanation: "The homework grows step by step with the difficulty: [難|むずか]しくなるにつれて.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-hajimete",
    title: "Only after: てはじめて",
    mark: "て[初|はじ]めて",
    summary: "Say that something happened only once something else had: “not until”.",
    source: "Bunpro, “て初めて”; JLPT Sensei, “てはじめて”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **[初|はじ]めて** says something happened only once something else had: “only after … did I …”, “not until …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb て form", "[言|い]われて [初|はじ]めて"],
          ["Noun + に なって", "[大人|おとな] に なって [初|はじ]めて"],
        ],
      },
      {
        type: "text",
        text: "[初|はじ]めて on its own is “for the first time”: [初|はじ]めて[日本|にほん]に[来|き]ました. After a て form, it says the second half didn't happen until the first did, and often that it came late: a realisation ([分|わ]かる, [気|き]づく, [知|し]る) you only reached by going through something. The second half is something that happened, or a general truth, not a request or a plan.",
      },
      {
        type: "text",
        text: "てから (its own lesson) just puts two things in order: after this, that. て[初|はじ]めて adds “and not before”: until then, you didn't see it.",
      },
      { type: "link", href: "/learn/n5-essentials/mae-ato", label: "Before and after: まえに, あとで and てから", text: "てから: one thing after another." },
      { type: "heading", text: "て[初|はじ]めて: only after" },
      {
        type: "examples",
        items: [
          {
            jp: "[病気|びょうき] に なって {[初|はじ]めて}、 [健康|けんこう] の [大切|たいせつ]さ が [分|わ]かった。",
            en: "It was only when I fell ill that I realised how precious good health is.",
            alt: "[病気|びょうき] に なって {[初|はじ]めて}、 [健康|けんこう] の [大切|たいせつ]さ が [分|わ]かりました。",
          },
          {
            jp: "[一人|ひとり] で [生活|せいかつ] して {[初|はじ]めて}、 [親|おや] の ありがたさ が [分|わ]かりました。",
            en: "Only after living on my own did I see how much I owed my parents.",
            alt: "[一人|ひとり] で [生活|せいかつ] して {[初|はじ]めて}、 [親|おや] の ありがたさ が [分|わ]かった。",
          },
          {
            jp: "[日本|にほん] に [来|き]て {[初|はじ]めて}、 [国|くに] の こと を あまり [知|し]らない と [気|き]づいた。",
            en: "It wasn't until I came to Japan that I realised how little I knew about my home country.",
            alt: "[日本|にほん] に [来|き]て {[初|はじ]めて}、 [国|くに] の こと を あまり [知|し]らない と [気|き]づきました。",
          },
          {
            jp: "[実際|じっさい] に やって みて {[初|はじ]めて}、 その [難|むずか]しさ が [分|わ]かる。",
            en: "You only see how hard it is once you actually try it.",
            alt: "[実際|じっさい] に やって みて {[初|はじ]めて}、 その [難|むずか]しさ が [分|わ]かります。",
          },
          {
            jp: "[言|い]われて {[初|はじ]めて}、 [約束|やくそく] を [忘|わす]れて いた こと に [気|き]づきました。",
            en: "I didn't realise I'd forgotten the appointment until someone mentioned it.",
            alt: "[言|い]われて {[初|はじ]めて}、 [約束|やくそく] を [忘|わす]れて いた こと に [気|き]づいた。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[会社|かいしゃ] に [入|はい]って {から}、 [仕事|しごと] の [大変|たいへん]さ が [分|わ]かった。", en: "After I joined the company, I came to see how hard the work is." },
        b: { jp: "[会社|かいしゃ] に [入|はい]って {[初|はじ]めて}、 [仕事|しごと] の [大変|たいへん]さ が [分|わ]かった。", en: "It wasn't until I joined the company that I saw how hard the work is." },
        diff: "てから just puts the two in order. て[初|はじ]めて says that before joining, you had no idea.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not for plans",
        text: "✗ [大学|だいがく]を[出|で]て[初|はじ]めて、[旅行|りょこう]したいです ✓ [大学|だいがく]を[出|で]てから、[旅行|りょこう]したいです. て[初|はじ]めて looks back at something that only happened, or only became clear, after the first event. For a plan or a wish, use てから.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[最近|さいきん]、 [毎日|まいにち] [料理|りょうり] して いる ん だ。", en: "I've been cooking every day lately." },
          { speaker: "Kenta", jp: "へえ、 [大変|たいへん] じゃ ない？", en: "Oh? Isn't that hard work?" },
          { speaker: "Aya", jp: "うん。 [毎日|まいにち] [作|つく]って {[初|はじ]めて}、 [母|はは] の [料理|りょうり] の すごさ が [分|わ]かった よ。", en: "Yeah. Only now that I cook every day do I see how amazing my mum's cooking was." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With て[初|はじ]めて (use なくす): “Only after losing my wallet did I realise how much I needed it”: [財布|さいふ]を＿、その[大切|たいせつ]さが[分|わ]かった。",
            answers: ["なくして [初|はじ]めて"],
            explanation: "The て form + [初|はじ]めて: なくして[初|はじ]めて.",
          },
          {
            prompt: "With て[初|はじ]めて (use [聞|き]く): “I didn't know about the accident until I heard it from a friend”: [友達|ともだち]から＿、その[事故|じこ]のことを[知|し]りました。",
            answers: ["[聞|き]いて [初|はじ]めて"],
            explanation: "[聞|き]く → [聞|き]いて, + [初|はじ]めて: not until then.",
          },
          {
            prompt: "On its own, [初|はじ]めて is “for the first time”: “I went abroad for the first time last year”: [去年|きょねん]、＿[外国|がいこく]へ[行|い]きました。",
            answers: ["[初|はじ]めて"],
            explanation: "Without a て form before it, [初|はじ]めて is just “for the first time”.",
          },
          {
            prompt: "With て[初|はじ]めて (use [住|す]む): “It wasn't until I lived there that I saw what was good about the town”: その[町|まち]に＿、[町|まち]のよさが[分|わ]かった。",
            answers: ["[住|す]んで [初|はじ]めて", "[住|す]んで みて [初|はじ]めて"],
            explanation: "[住|す]む → [住|す]んで, + [初|はじ]めて (or [住|す]んでみて[初|はじ]めて: only after trying it).",
          },
        ],
      },
    ],
  },
  {
    slug: "ue-de",
    title: "After, and in doing: うえで",
    mark: "[上|うえ]で",
    summary: "Do one thing first and the next on the strength of it; and say what matters in doing something.",
    source: "Bunpro, “上で”; JLPT Sensei, “上で”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form or Noun + の + **[上|うえ]で** says you do the second thing after the first, and on the strength of it (“after …, and then”); after a plain non-past verb, **[上|うえ]で** means “in doing”, “for”: what matters when you do something.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Sense", "Before it", "Example"],
        rows: [
          ["After, on that basis", "Verb た form", "よく [考|かんが]えた [上|うえ] で"],
          ["After, on that basis", "Noun + の", "[相談|そうだん] の [上|うえ] で"],
          ["In doing, for", "Verb, plain non-past", "[生活|せいかつ] する [上|うえ] で"],
        ],
      },
      {
        type: "text",
        text: "[上|うえ] is the noun “top”, here “on top of that”, “on that basis”. In the first sense, the first step is done so that the second can be decided or done properly: you read, check, think it over or talk it through, and then act. It's like てから, but more formal and with a point, so it's common in instructions, at work and in careful speech. With の, the noun must name an action ([相談|そうだん], [話|はな]し[合|あ]い): [仕事|しごと]の[上|うえ]で is “in terms of work”, a different use.",
      },
      {
        type: "text",
        text: "In the second sense, a plain non-past verb names an activity, and the rest says what is [大切|たいせつ], [大事|だいじ], [必要|ひつよう] or a problem in doing it: [生活|せいかつ]する[上|うえ]で[大切|たいせつ]なこと (what matters in daily life). The tense tells you which: た form, “after”; non-past, “in doing”.",
      },
      { type: "heading", text: "た[上|うえ]で: after, on that basis" },
      {
        type: "examples",
        items: [
          {
            jp: "よく [考|かんが]えた {[上|うえ] で}、 [決|き]めます。",
            en: "I'll decide once I've thought it over carefully.",
            alt: "よく [考|かんが]えた {[上|うえ] で}、 [決|き]める よ。",
          },
          { jp: "[説明|せつめい] を よく [読|よ]んだ {[上|うえ] で}、 [名前|なまえ] を [書|か]いて ください。", en: "Please read the explanation carefully before writing your name." },
          {
            jp: "[家族|かぞく] と [相談|そうだん] の {[上|うえ] で}、 [返事|へんじ] します。",
            en: "I'll give you my answer after talking it over with my family.",
            alt: "[家族|かぞく] と [相談|そうだん] の {[上|うえ] で}、 [返事|へんじ] する ね。",
          },
          {
            jp: "[両親|りょうしん] に [話|はな]した {[上|うえ] で}、 [留学|りゅうがく] する こと に した。",
            en: "I decided to study abroad after discussing it with my parents.",
            alt: "[両親|りょうしん] に [話|はな]した {[上|うえ] で}、 [留学|りゅうがく] する こと に しました。",
          },
        ],
      },
      { type: "heading", text: "[上|うえ]で: in doing, for" },
      {
        type: "examples",
        items: [
          {
            jp: "[日本|にほん] で [生活|せいかつ] する {[上|うえ] で}、 [一番|いちばん] [大切|たいせつ] な の は [言葉|ことば] です。",
            en: "In living in Japan, the most important thing is the language.",
            alt: "[日本|にほん] で [生活|せいかつ] する {[上|うえ] で}、 [一番|いちばん] [大切|たいせつ] な の は [言葉|ことば] だ。",
          },
          {
            jp: "[日本語|にほんご] を [勉強|べんきょう] する {[上|うえ] で}、 [毎日|まいにち] [続|つづ]ける こと が [大事|だいじ] です。",
            en: "In learning Japanese, what matters is keeping at it every day.",
            alt: "[日本語|にほんご] を [勉強|べんきょう] する {[上|うえ] で}、 [毎日|まいにち] [続|つづ]ける こと が [大事|だいじ] だ。",
          },
          {
            jp: "[仕事|しごと] を する {[上|うえ] で}、 [大切|たいせつ] な の は [時間|じかん] を [守|まも]る こと だ。",
            en: "In any job, what matters is being on time.",
            alt: "[仕事|しごと] を する {[上|うえ] で}、 [大切|たいせつ] な の は [時間|じかん] を [守|まも]る こと です。",
          },
          {
            jp: "[部屋|へや] を [探|さが]す {[上|うえ] で}、 [駅|えき] に [近|ちか]い か どう か は [大事|だいじ] です。",
            en: "When you're looking for a flat, whether it's near the station matters.",
            alt: "[部屋|へや] を [探|さが]す {[上|うえ] で}、 [駅|えき] に [近|ちか]い か どう か は [大事|だいじ] だ よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[先生|せんせい] に [相談|そうだん] して {から}、 [決|き]めました。", en: "I decided after talking to my teacher." },
        b: { jp: "[先生|せんせい] に [相談|そうだん] した {[上|うえ] で}、 [決|き]めました。", en: "I decided after talking it over with my teacher, taking their advice into account." },
        diff: "てから only puts the two in order. た[上|うえ]で says the decision rests on the talk.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "[上|うえ]で isn't just “and then”",
        text: "✗ [起|お]きた[上|うえ]で、[顔|かお]を[洗|あら]います ✓ [起|お]きてから、[顔|かお]を[洗|あら]います. [上|うえ]で is for a step taken so the next one can rest on it (checked, discussed, thought over); for plain “and then”, use てから. And “after” takes the た form: ✗ [調|しら]べる[上|うえ]で、[決|き]めます.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Visitor", jp: "この [部屋|へや]、 [広|ひろ]くて いい です ね。 すぐ [決|き]めたい です。", en: "This flat is nice and roomy. I'd like to decide straight away." },
          { speaker: "Agent", jp: "ありがとう ございます。 [一度|いちど] [中|なか] を よく [見|み]た {[上|うえ] で}、 [決|き]めて ください。", en: "Thank you. Please have a good look round first, and then decide." },
          { speaker: "Visitor", jp: "そう です ね。 [台所|だいどころ] も [見|み]せて ください。", en: "Good idea. Could I see the kitchen too?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With [上|うえ]で (use [調|しら]べる): “I'll buy it after I've looked into it properly”: よく＿、[買|か]います。",
            answers: ["[調|しら]べた [上|うえ] で"],
            explanation: "The た form + [上|うえ]で: the buying rests on the research.",
          },
          {
            prompt: "With [上|うえ]で, after a noun: “Let's decide after discussing it”: [話|はな]し[合|あ]い＿[決|き]めましょう。",
            answers: ["の [上|うえ] で"],
            explanation: "A noun takes の before [上|うえ]で: [話|はな]し[合|あ]いの[上|うえ]で.",
          },
          {
            prompt: "With [上|うえ]で, “in doing” (use [働|はたら]く): “In working at a Japanese company, polite language is a must”: [日本|にほん]の[会社|かいしゃ]で＿、[丁寧|ていねい]な[言葉|ことば]が[必要|ひつよう]です。",
            answers: ["[働|はたら]く [上|うえ] で"],
            explanation: "“In doing” takes the plain non-past: [働|はたら]く[上|うえ]で.",
          },
          {
            prompt: "Fix it (“I'll decide after asking the price”): [値段|ねだん]を[聞|き]く[上|うえ]で、[決|き]めます。",
            answers: ["[値段|ねだん] を [聞|き]いた [上|うえ] で、 [決|き]めます。", "[値段|ねだん] を [聞|き]いて から、 [決|き]めます。"],
            explanation: "“After” takes the た form: [聞|き]いた[上|うえ]で. Or simply てから: [聞|き]いてから.",
          },
        ],
      },
    ],
  },
];
