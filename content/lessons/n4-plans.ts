import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n4Plans: Lesson[] = [
  {
    slug: "noni-purpose",
    title: "What it's for: のに (for doing)",
    mark: "〜のに",
    summary: "Say what something is used for, good for, or what it takes to do something.",
    source: "Bunpro, “のに (in order to)”; JLPT Sensei, “のに (in order to)”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "JLPT Sensei lists のに (in order to) at N4."),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **のに** says what something is for, when a word like [使|つか]う (use), いい (good), [便利|べんり] (handy), [必要|ひつよう] (needed) or かかる (take time) follows: パンを[切|き]るのに[使|つか]う (I use it for cutting bread).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past + のに", "[切|き]る のに [使|つか]う"],
          ["Verb + のに + いい · [便利|べんり]", "[旅行|りょこう] する のに いい"],
          ["Verb + のに + time or money", "[行|い]く のに [一時間|いちじかん] かかる"],
          ["Noun + に", "[料理|りょうり] に [使|つか]う"],
        ],
      },
      {
        type: "text",
        text: "The の turns the verb into a noun, and に marks what it's for; a noun needs no の: [料理|りょうり]に[使|つか]う (use it for cooking). You'll often hear のには, with は for emphasis: [会社|かいしゃ]まで[行|い]くのには[一時間|いちじかん]かかる. This のに only works before words of use, need, cost and suitability. It looks like the のに of “even though” (its own lesson), but that one joins two facts that clash: [走|はし]ったのに、[間|ま]に[合|あ]わなかった (I ran, and still didn't make it).",
      },
      { type: "link", href: "/learn/n4-conditions/noni", label: "のに: even though", text: "The other のに: two facts that clash." },
      {
        type: "examples",
        items: [
          { jp: "この ナイフ は パン を [切|き]る {のに} [使|つか]います。", en: "I use this knife for cutting bread.", alt: "この ナイフ は パン を [切|き]る {のに} [使|つか]う。" },
          { jp: "[会社|かいしゃ] まで [行|い]く {のに} [一時間|いちじかん] かかります。", en: "It takes an hour to get to work.", alt: "[会社|かいしゃ] まで [行|い]く {のに} [一時間|いちじかん] かかる。" },
          { jp: "この [辞書|じしょ] は [漢字|かんじ] を [調|しら]べる {のに} [便利|べんり] です。", en: "This dictionary is handy for looking up kanji.", alt: "この [辞書|じしょ] は [漢字|かんじ] を [調|しら]べる {のに} [便利|べんり] だ よ。" },
          { jp: "この [仕事|しごと] を する {のに} [日本語|にほんご] が [必要|ひつよう] です か？", en: "Do you need Japanese to do this job?", alt: "この [仕事|しごと] を する {のに} [日本語|にほんご] が [必要|ひつよう]？" },
          { jp: "この かばん は [旅行|りょこう] する {のに} ちょうど いい。", en: "This bag is just right for travelling.", alt: "この かばん は [旅行|りょこう] する {のに} ちょうど いい です。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[駅|えき] まで [歩|ある]く {のに} [十五分|じゅうごふん] かかります。", en: "It takes fifteen minutes to walk to the station." },
        b: { jp: "[駅|えき] まで [走|はし]った {のに}、 [間|ま]に[合|あ]いません でした。", en: "I ran to the station, and still didn't make it." },
        diff: "The purpose のに takes a plain non-past verb and a word like かかる after it: what the walk takes. The “even though” のに links two facts, and the second goes against the first.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A verb needs の before に",
        text: "✗ パンを[切|き]るに[使|つか]います ✓ パンを[切|き]るのに[使|つか]います. A verb takes の first; only a noun takes に directly ([料理|りょうり]に[使|つか]います). And this のに doesn't say why you do something in general: “I study in order to go to Japan” uses ために, a pattern for later (N3).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "これ、 [何|なに] に [使|つか]う の？", en: "What do you use this for?" },
          { speaker: "Kenta", jp: "[卵|たまご] を [焼|や]く {のに} [使|つか]う ん だ よ。", en: "It's for frying eggs." },
          { speaker: "Aya", jp: "へえ、 [便利|べんり] だ ね。", en: "Oh, that's handy." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With のに: “I use this bag for carrying my laptop” (use [入|い]れる): このかばんは、パソコンを＿[使|つか]っています。",
            answers: ["[入|い]れる のに", "[入|い]れる のに は"],
            explanation: "Plain non-past + のに, then [使|つか]う: パソコンを[入|い]れるのに[使|つか]っています.",
          },
          {
            prompt: "With のに: “It takes two hours to clean the house” (use [掃除|そうじ]する): [家|いえ]を＿[二時間|にじかん]かかります。",
            answers: ["[掃除|そうじ] する のに", "[掃除|そうじ] する のに は"],
            explanation: "What it takes: [掃除|そうじ]するのに[二時間|にじかん]かかります.",
          },
          {
            prompt: "With のに: “Learning kanji takes time” (use [覚|おぼ]える): [漢字|かんじ]を＿[時間|じかん]がかかります。",
            answers: ["[覚|おぼ]える のに", "[覚|おぼ]える のに は"],
            explanation: "[覚|おぼ]える + のに, then [時間|じかん]がかかる.",
          },
          {
            prompt: "With のに: “This bike is good for going shopping”: この[自転車|じてんしゃ]は[買|か]い[物|もの]に[行|い]く＿です。",
            answers: ["のに いい", "のに は いい"],
            explanation: "Verb + のに + いい: [買|か]い[物|もの]に[行|い]くのにいいです.",
          },
          {
            prompt: "Fix it, keeping [描|か]く: このペンは[絵|え]を[描|か]くに[使|つか]います。",
            answers: ["この ペン は [絵|え] を [描|か]く のに [使|つか]います。"],
            explanation: "A verb needs の before に: [絵|え]を[描|か]くのに[使|つか]います.",
          },
        ],
      },
    ],
  },
  {
    slug: "you-ni",
    title: "So that: ように",
    mark: "ように",
    summary: "Say what you do so that something can happen, or so that it doesn't.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (yoo ni); Bunpro, “ように”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists ように (so that) at N3; its N4 ように・ような is the “like, as” sense."),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb, usually one you can't simply do at will (a potential, a ない form, or a verb like [聞|き]こえる or [分|わ]かる) + **ように** says what you're aiming for: “so that …”, “so as not to …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Potential form", "[読|よ]める よう に"],
          ["Verb ない form", "[忘|わす]れない よう に"],
          ["A verb of what happens", "[聞|き]こえる よう に · [間|ま]に[合|あ]う よう に"],
        ],
      },
      {
        type: "text",
        text: "よう is written in kana. What comes after ように is the thing you do to get there: speak loudly, write it down, leave early. The ように part is usually a result that depends on more than your will: being able to read, hearing, not forgetting, making the train.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[後|うし]ろ の [人|ひと] に も [聞|き]こえる {よう に}、 [大|おお]きい [声|こえ] で [話|はな]して ください。",
            en: "Please speak up so the people at the back can hear too.",
            alt: "[後|うし]ろ の [人|ひと] に も [聞|き]こえる {よう に}、 [大|おお]きい [声|こえ] で [話|はな]して。",
          },
          { jp: "[忘|わす]れない {よう に}、 [名前|なまえ] を ノート に [書|か]きました。", en: "I wrote the name in my notebook so I wouldn't forget it.", alt: "[忘|わす]れない {よう に}、 [名前|なまえ] を ノート に [書|か]いた。" },
          { jp: "[風邪|かぜ] を [引|ひ]かない {よう に}、 [早|はや]く [寝|ね]て ください ね。", en: "Get an early night so you don't catch a cold.", alt: "[風邪|かぜ] を [引|ひ]かない {よう に}、 [早|はや]く [寝|ね]て ね。" },
          { jp: "[日本語|にほんご] が [話|はな]せる {よう に}、 [毎日|まいにち] [練習|れんしゅう] して います。", en: "I practise every day so that I can speak Japanese.", alt: "[日本語|にほんご] が [話|はな]せる {よう に}、 [毎日|まいにち] [練習|れんしゅう] してる。" },
          { jp: "[電車|でんしゃ] に [間|ま]に[合|あ]う {よう に}、 [早|はや]く [家|いえ] を [出|で]た。", en: "I left home early so I'd make the train.", alt: "[電車|でんしゃ] に [間|ま]に[合|あ]う {よう に}、 [早|はや]く [家|いえ] を [出|で]ました。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "みんな に [聞|き]こえる {よう に}、 [大|おお]きい [声|こえ] で [話|はな]しました。", en: "I spoke loudly so everyone could hear." },
        b: { jp: "みんな に [聞|き]こえない {よう に}、 [小|ちい]さい [声|こえ] で [話|はな]しました。", en: "I spoke quietly so no one else could hear." },
        diff: "ように follows the result you want: [聞|き]こえる (so they hear) or [聞|き]こえない (so they don't). What you do to get there follows it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A result, not a plain action",
        text: "✗ [日本語|にほんご]を[話|はな]すように[練習|れんしゅう]します ✓ [日本語|にほんご]が[話|はな]せるように[練習|れんしゅう]します. Before ように goes a result you can't just choose: the potential ([話|はな]せる), a ない form, or a verb like [聞|き]こえる. When the doer is the same and the action is simply up to you, Japanese uses ために, a pattern for later (N3). When someone else is to do it, any verb works: [子供|こども]が[食|た]べるように、[小|ちい]さく[切|き]りました (I cut it up small so the children would eat it).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[明日|あした] の [会議|かいぎ]、 [九時|くじ] から です よ。", en: "Tomorrow's meeting starts at nine." },
          { speaker: "Mr Mori", jp: "[遅|おく]れない {よう に}、 [早|はや]く [来|き]ます。", en: "I'll come in early so I'm not late." },
          { speaker: "Ms Sato", jp: "お[願|ねが]い します。", en: "Thanks." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ように: “Take your umbrella so you don't get wet” (use ぬれる): ＿、[傘|かさ]を[持|も]っていってください。",
            answers: ["ぬれない よう に"],
            explanation: "The result you want to avoid, in the ない form: ぬれないように.",
          },
          {
            prompt: "With ように: “I'm studying so that I can read Japanese newspapers” (use [読|よ]む): [日本語|にほんご]の[新聞|しんぶん]が＿、[勉強|べんきょう]しています。",
            answers: ["[読|よ]める よう に", "[読|よ]める よう に なる よう に"],
            explanation: "Being able to read is a result, so the potential: [読|よ]めるように (or, a little more explicitly, [読|よ]めるようになるように).",
          },
          {
            prompt: "With ように: “Write it big so everyone can see” (use [見|み]える): みんなに＿、[大|おお]きく[書|か]いてください。",
            answers: ["[見|み]える よう に"],
            explanation: "[見|み]える (be visible) is a result: [見|み]えるように.",
          },
          {
            prompt: "With ように: “Please speak slowly so the children understand” (use [分|わ]かる): [子供|こども]たちが＿、ゆっくり[話|はな]してください。",
            answers: ["[分|わ]かる よう に"],
            explanation: "[分|わ]かる isn't something you do at will, so it takes ように: [分|わ]かるように.",
          },
          {
            prompt: "Fix it (you want to be able to swim): [泳|およ]ぐように、[毎週|まいしゅう]プールで[練習|れんしゅう]しています。",
            answers: [
              "[泳|およ]げる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] して います。",
              "[泳|およ]げる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] を して います。",
              "[泳|およ]げる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] してます。",
              "[泳|およ]げる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] を してます。",
              "[泳|およ]げる よう に なる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] して います。",
              "[泳|およ]げる よう に なる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] を して います。",
              "[泳|およ]げる よう に なる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] してます。",
              "[泳|およ]げる よう に なる よう に、 [毎週|まいしゅう] プール で [練習|れんしゅう] を してます。",
            ],
            explanation: "Being able to swim is the result you want, so the potential: [泳|およ]げるように.",
          },
        ],
      },
    ],
  },
  {
    slug: "you-ni-suru-naru",
    title: "Making a point of it, and coming to: ようにする and ようになる",
    mark: "ようにする",
    summary: "Say what you make a habit of, and what you can do now or have started doing.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (yoo ni suru, yoo ni naru); Bunpro, “ようにする” and “ようになる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain verb + **ようにする** means you make a point of doing it, or try to; + **ようになる** means a change came about: you can do it now, or you've started doing it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Before it", "Example"],
        rows: [
          ["Make a point of: ようにする", "Verb, plain non-past", "[歩|ある]く よう に する"],
          ["Make a point of: ようにする", "Verb ない form", "[食|た]べない よう に する"],
          ["Come to: ようになる", "Potential form", "[泳|およ]げる よう に なる"],
          ["Come to: ようになる", "Verb, plain non-past", "[飲|の]む よう に なる"],
        ],
      },
      {
        type: "text",
        text: "ようにしている is the habit you keep up (“I make a point of …”), and ようにしてください asks someone to make sure of something. ようになる often comes in the past: [読|よ]めるようになった (I can read it now). For a habit you've dropped, Japanese usually says なくなる: [飲|の]まなくなった (I don't drink any more).",
      },
      { type: "heading", text: "ようにする: make a point of" },
      {
        type: "examples",
        items: [
          { jp: "[毎日|まいにち] [野菜|やさい] を [食|た]べる {よう に して います}。", en: "I try to eat vegetables every day.", alt: "[毎日|まいにち] [野菜|やさい] を [食|た]べる {よう に して いる}。" },
          { jp: "[夜|よる] は コーヒー を [飲|の]まない {よう に して いる}。", en: "I try not to drink coffee in the evening.", alt: "[夜|よる] は コーヒー を [飲|の]まない {よう に して います}。" },
          { jp: "できるだけ [階段|かいだん] を [使|つか]う {よう に して います}。", en: "I try to take the stairs whenever I can." },
          { jp: "[明日|あした] から [早|はや]く [寝|ね]る {よう に する}。", en: "From tomorrow, I'll try to get to bed early.", alt: "[明日|あした] から [早|はや]く [寝|ね]る {よう に します}。" },
          { jp: "[遅|おく]れない {よう に して ください}。", en: "Please make sure you're not late.", alt: "[遅|おく]れない {よう に して} ね。" },
        ],
      },
      { type: "heading", text: "ようになる: come to, can now" },
      {
        type: "examples",
        items: [
          { jp: "[日本語|にほんご] が [少|すこ]し [話|はな]せる {よう に なりました}。", en: "I can speak a little Japanese now.", alt: "[日本語|にほんご] が [少|すこ]し [話|はな]せる {よう に なった}。" },
          { jp: "[子供|こども] が [一人|ひとり] で [自転車|じてんしゃ] に [乗|の]れる {よう に なった}。", en: "My child can ride a bike on their own now.", alt: "[子供|こども] が [一人|ひとり] で [自転車|じてんしゃ] に [乗|の]れる {よう に なりました}。" },
          { jp: "[最近|さいきん]、 [朝|あさ] [早|はや]く [起|お]きる {よう に なりました}。", en: "Lately I've started getting up early.", alt: "[最近|さいきん]、 [朝|あさ] [早|はや]く [起|お]きる {よう に なった}。" },
          { jp: "[日本|にほん] に [来|き]て から、 [魚|さかな] を よく [食|た]べる {よう に なった}。", en: "Since coming to Japan, I've started eating a lot of fish.", alt: "[日本|にほん] に [来|き]て から、 [魚|さかな] を よく [食|た]べる {よう に なりました}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[毎朝|まいあさ] [走|はし]る {よう に して います}。", en: "I make a point of running every morning." },
        b: { jp: "[毎朝|まいあさ] [走|はし]る {よう に なりました}。", en: "I've got into running every morning." },
        diff: "ようにしている is an effort you keep up. ようになった is a change that has come about, however it happened.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "“Can now” needs the potential",
        text: "✗ [泳|およ]ぐようになりました (meaning “I can swim now”) ✓ [泳|およ]げるようになりました. With the plain verb, ようになった means you've started doing it: [泳|およ]ぐようになった is “I've taken up swimming”. Being able to takes the potential.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[最近|さいきん]、 [元気|げんき] だ ね。", en: "You've been looking well lately." },
          { speaker: "Aya", jp: "[毎晩|まいばん] [十二時|じゅうにじ] まで に [寝|ね]る {よう に してる} ん だ。", en: "I've been trying to get to bed by midnight." },
          { speaker: "Kenta", jp: "そう なん だ。 [僕|ぼく] も [早|はや]く [起|お]きられる {よう に なりたい} な。", en: "Really? I'd like to be able to get up early too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ようにする, a habit: “I try to drink a lot of water” (use [飲|の]む): [水|みず]をたくさん＿。",
            answers: ["[飲|の]む よう に して います", "[飲|の]む よう に してます"],
            explanation: "A habit you keep up: [飲|の]むようにしています.",
          },
          {
            prompt: "Casual, with ようになる: “My little brother can read hiragana now” (use [読|よ]む): [弟|おとうと]はひらがなが＿。",
            answers: ["[読|よ]める よう に なった"],
            explanation: "Being able to: the potential [読|よ]める, + ようになった.",
          },
          {
            prompt: "Polite request, with ようにする: “Please try not to use your phone in class” (use [使|つか]う): [授業|じゅぎょう]ではスマホを＿ください。",
            answers: ["[使|つか]わない よう に して"],
            explanation: "ない form + ようにしてください: [使|つか]わないようにしてください.",
          },
          {
            prompt: "Polite, with ようになる: “Lately I've started cooking at home” (use [作|つく]る): [最近|さいきん]、[家|いえ]で[料理|りょうり]を＿。",
            answers: ["[作|つく]る よう に なりました"],
            explanation: "A change in habit: [作|つく]るようになりました.",
          },
          {
            prompt: "Fix it (meaning “I can drive now”): [車|くるま]を[運転|うんてん]するようになりました。",
            answers: ["[車|くるま] を [運転|うんてん] できる よう に なりました。", "[車|くるま] が [運転|うんてん] できる よう に なりました。"],
            explanation: "Being able to drive: [運転|うんてん]する → [運転|うんてん]できる, + ようになりました.",
          },
        ],
      },
    ],
  },
  {
    slug: "koto-ni-suru-naru",
    title: "I've decided, it's been decided: ことにする and ことになる",
    mark: "ことにする",
    summary: "Say what you've decided to do, and what has been decided or arranged for you.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (koto ni suru, koto ni naru); Bunpro, “ことにする” and “ことになる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "JLPT Sensei lists ことにする and ことになる at N4, and ことになっている separately at N3."),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **ことにする** means you decide to do it; + **ことになる** means it has been decided or has turned out that way, by others or by circumstances.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "I decide", "It's decided"],
        rows: [
          ["Verb, plain non-past", "[行|い]く こと に する", "[行|い]く こと に なる"],
          ["Verb ない form", "[行|い]かない こと に する", "[行|い]かない こと に なる"],
        ],
      },
      {
        type: "text",
        text: "Both are most often in the past: ことにした (I've decided), ことになった (it's been decided). ことにしている is a rule you've set yourself, and ことになっている a rule that applies. People also announce their own news with ことになりました: it sounds modest, as if it simply came about. It's the verb version of にする and になる with nouns ([土曜日|どようび]にした, [土曜日|どようび]になった).",
      },
      { type: "link", href: "/learn/n5-essentials/naru-suru", label: "なる and にする", text: "The same contrast with nouns: パーティーは[土曜日|どようび]にしました / になりました." },
      { type: "heading", text: "ことにする: I decide" },
      {
        type: "examples",
        items: [
          { jp: "[今年|ことし] から [日記|にっき] を [書|か]く {こと に しました}。", en: "I've decided to keep a diary from this year.", alt: "[今年|ことし] から [日記|にっき] を [書|か]く {こと に した}。" },
          { jp: "[雨|あめ] だ から、 [今日|きょう] は [出|で]かけない {こと に した}。", en: "It's raining, so I've decided not to go out today.", alt: "[雨|あめ] です から、 [今日|きょう] は [出|で]かけない {こと に しました}。" },
          { jp: "[車|くるま] は [高|たか]い から、 [自転車|じてんしゃ] を [買|か]う {こと に しました}。", en: "Cars are expensive, so I've decided to buy a bike.", alt: "[車|くるま] は [高|たか]い から、 [自転車|じてんしゃ] を [買|か]う {こと に した}。" },
          {
            jp: "[毎朝|まいあさ] [一時間|いちじかん] [歩|ある]く {こと に して います}。",
            en: "I make it a rule to walk for an hour every morning.",
            note: "ことにしている: a rule you've set yourself and keep.",
          },
        ],
      },
      { type: "heading", text: "ことになる: it's been decided" },
      {
        type: "examples",
        items: [
          { jp: "[来月|らいげつ] から [大阪|おおさか] で [働|はたら]く {こと に なりました}。", en: "It's been decided that I'll work in Osaka from next month.", alt: "[来月|らいげつ] から [大阪|おおさか] で [働|はたら]く {こと に なった}。" },
          { jp: "[来週|らいしゅう]、 [会社|かいしゃ] の [人|ひと] と [京都|きょうと] に [行|い]く {こと に なった}。", en: "It's been arranged that I'll go to Kyoto with people from work next week.", alt: "[来週|らいしゅう]、 [会社|かいしゃ] の [人|ひと] と [京都|きょうと] に [行|い]く {こと に なりました}。" },
          { jp: "[結婚|けっこん] する {こと に なりました}。", en: "We're getting married.", note: "Announcing your own news with ことになりました sounds modest." },
          {
            jp: "この [店|みせ] で は、 [先|さき] に お[金|かね] を [払|はら]う {こと に なって います}。",
            en: "In this shop, you pay first.",
            note: "ことになっている: the rule here.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[来年|らいねん]、 [東京|とうきょう] に [行|い]く {こと に しました}。", en: "I've decided to go to Tokyo next year." },
        b: { jp: "[来年|らいねん]、 [東京|とうきょう] に [行|い]く {こと に なりました}。", en: "It's been decided that I'm going to Tokyo next year." },
        diff: "ことにした: the speaker chose. ことになった: it was decided by someone else (a company, a school) or by how things worked out.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A verb needs こと",
        text: "✗ [走|はし]るにしました ✓ [走|はし]ることにしました. A noun takes にする directly (カレーにします), but a verb needs こと first. And when your company or school made the choice, say ことになった, not ことにした.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[来年|らいねん]、 [国|くに] に [帰|かえ]る {こと に なりました}。", en: "It's been decided that I'm going back to my home country next year." },
          { speaker: "Ms Sato", jp: "そう です か。 [寂|さび]しく なります ね。", en: "Oh, really? We'll miss you." },
          { speaker: "Mr Mori", jp: "ええ。 でも、 [帰|かえ]る [前|まえ] に [京都|きょうと] を [旅行|りょこう] する {こと に しました}。", en: "Yes. But I've decided to travel around Kyoto before I go." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ことにする: “I've decided to learn the piano” (use [習|なら]う): ピアノを＿。",
            answers: ["[習|なら]う こと に しました"],
            explanation: "Your own decision: [習|なら]うことにしました.",
          },
          {
            prompt: "Casual, with ことにする: “I've decided not to eat sweet things” (use [食|た]べる): [甘|あま]いものは＿。",
            answers: ["[食|た]べない こと に した"],
            explanation: "ない form + ことにした: [食|た]べないことにした.",
          },
          {
            prompt: "Polite, the company decided: “It's been decided that I'll go to America” (use [行|い]く): アメリカに＿。",
            answers: ["[行|い]く こと に なりました"],
            explanation: "Decided by others: [行|い]くことになりました.",
          },
          {
            prompt: "Polite, it's the rule: “In this office, the lights are turned off at night” (use [消|け]す): この[会社|かいしゃ]では、[夜|よる][電気|でんき]を＿。",
            answers: ["[消|け]す こと に なって います", "[消|け]す こと に なってます"],
            explanation: "A rule that applies: ことになっている, politely ことになっています.",
          },
          {
            prompt: "Fix it (you decided): [明日|あした]から[走|はし]るにしました。",
            answers: ["[明日|あした] から [走|はし]る こと に しました。"],
            explanation: "A verb needs こと before にする: [走|はし]ることにしました.",
          },
        ],
      },
    ],
  },
  {
    slug: "koto-ga-dekiru",
    title: "Can, the fuller way: ことができる",
    mark: "ことができる",
    summary: "Say what you can do, or what is allowed, with ことができる, and how it differs from the potential.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (koto ga dekiru); Bunpro, “ことができる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **ことができる** means “can”: what you're able to do, or what is possible or allowed.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example", "Potential form"],
        rows: [
          ["Verb, plain non-past + ことができる", "[泳|およ]ぐ こと が できる", "[泳|およ]げる"],
          ["Polite", "[泳|およ]ぐ こと が できます", "[泳|およ]げます"],
          ["Negative", "[泳|およ]ぐ こと が できない", "[泳|およ]げない"],
        ],
      },
      {
        type: "text",
        text: "It means the same as the potential form ([泳|およ]げる), but it's longer and a little more formal: you'll see it on signs and in rules (ここで…ことができます), while conversation mostly uses the potential. A noun takes ができる directly: [料理|りょうり]ができる (can cook).",
      },
      { type: "link", href: "/learn/verbs/potential", label: "The potential form", text: "[話|はな]せる, [食|た]べられる: the everyday “can”." },
      {
        type: "examples",
        items: [
          { jp: "この [図書館|としょかん] で は、 [本|ほん] を [三冊|さんさつ] まで [借|か]りる {こと が できます}。", en: "At this library you can borrow up to three books." },
          { jp: "[私|わたし] は [漢字|かんじ] を [百|ひゃく] ぐらい [書|か]く {こと が できます}。", en: "I can write about a hundred kanji.", alt: "[私|わたし] は [漢字|かんじ] を [百|ひゃく] ぐらい [書|か]く {こと が できる} よ。" },
          { jp: "この [部屋|へや] から [海|うみ] を [見|み]る {こと が できます}。", en: "You can see the sea from this room.", note: "As a hotel would describe a room; in conversation, [海|うみ]が[見|み]えます." },
          { jp: "[残念|ざんねん] です が、 [明日|あした] は [行|い]く {こと が できません}。", en: "I'm afraid I can't come tomorrow." },
          { jp: "カード で [払|はら]う {こと が できます} か？", en: "Can I pay by card?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [店|みせ] で は カード が {[使|つか]えます}。", en: "You can use cards in this shop." },
        b: { jp: "この [店|みせ] で は カード を [使|つか]う {こと が できます}。", en: "Cards can be used in this shop." },
        diff: "The same meaning. The potential is what people say; ことができる sounds like a notice or an announcement.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't say “can” twice",
        text: "✗ [泳|およ]げることができます ✓ [泳|およ]ぐことができます, or [泳|およ]げます. ことができる already means “can”, so the verb before it stays in the plain non-past.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Customer", jp: "この [自転車|じてんしゃ]、 [一日|いちにち] [借|か]りる {こと が できます} か？", en: "Can I hire this bike for the day?" },
          { speaker: "Staff", jp: "はい、 [朝|あさ] [九時|くじ] から [夜|よる] [八時|はちじ] まで [使|つか]う {こと が できます}。", en: "Yes, you can use it from nine in the morning until eight at night." },
          { speaker: "Customer", jp: "じゃ、 お[願|ねが]い します。", en: "Great, I'll take it." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ことができる: “I can play the guitar” (use [弾|ひ]く): ギターを＿。",
            answers: ["[弾|ひ]く こと が できます"],
            explanation: "Plain non-past + ことができます: [弾|ひ]くことができます.",
          },
          {
            prompt: "Say it with ことができる: [読|よ]める → ＿",
            answers: ["[読|よ]む こと が できる"],
            explanation: "The verb goes back to its plain non-past: [読|よ]むことができる.",
          },
          {
            prompt: "Polite, with ことができる: “You can't smoke here” (use [吸|す]う): ここでたばこを＿。",
            answers: ["[吸|す]う こと が できません", "[吸|す]う こと は できません"],
            explanation: "The negative: [吸|す]うことができません (or ことはできません, which stresses the “not”).",
          },
          {
            prompt: "Say it with the potential form: [話|はな]すことができる → ＿",
            answers: ["[話|はな]せる"],
            explanation: "The potential of [話|はな]す is [話|はな]せる.",
          },
          {
            prompt: "Fix it: [私|わたし]は[日本語|にほんご]の[新聞|しんぶん]が[読|よ]めることができます。",
            answers: [
              "[私|わたし] は [日本語|にほんご] の [新聞|しんぶん] を [読|よ]む こと が できます。",
              "[私|わたし] は [日本語|にほんご] の [新聞|しんぶん] が [読|よ]めます。",
              "[私|わたし] は [日本語|にほんご] の [新聞|しんぶん] を [読|よ]めます。",
            ],
            explanation: "One “can” is enough: [読|よ]むことができます, or just [読|よ]めます.",
          },
        ],
      },
    ],
  },
  {
    slug: "you-to-omou",
    title: "I'm thinking of it, and it's planned: the volitional + と, and よてい",
    mark: "〜ようと[思|おも]う",
    summary: "Say what you're thinking of doing, and what's on the schedule, and keep them apart from つもり.",
    source: "Genki II ch. 15 (volitional + と思っています); Bunpro, “〜ようと思う・〜おうと思う” and “よていだ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The volitional + **と[思|おも]う** says what you're thinking of doing (“I think I'll …”), and **[予定|よてい]** says what is planned or scheduled.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["Volitional + と[思|おも]う", "[行|い]こう と [思|おも]う"],
          ["Volitional + と[思|おも]っている", "[行|い]こう と [思|おも]って いる"],
          ["Verb, plain non-past + [予定|よてい]だ", "[行|い]く [予定|よてい] だ"],
          ["Noun + の[予定|よてい]", "[旅行|りょこう] の [予定|よてい]"],
        ],
      },
      {
        type: "text",
        text: "と[思|おも]う is a decision taking shape as you speak; と[思|おも]っている (politely と[思|おも]っています) is something you've been thinking of for a while, and it's the form for other people's plans too. つもり is firmer: an intention you've settled on. [予定|よてい] is on the calendar: a timetable, a booking, an arrangement with others.",
      },
      { type: "link", href: "/learn/n5-essentials/tsumori", label: "つもり: I intend to", text: "A plan you've settled on." },
      { type: "heading", text: "〜ようと[思|おも]う: I'm thinking of" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は [早|はや]く [寝|ね]{よう と [思|おも]う}。", en: "I think I'll get to bed early today.", alt: "[今日|きょう] は [早|はや]く [寝|ね]{よう と [思|おも]います}。" },
          { jp: "[週末|しゅうまつ] は [部屋|へや] を [掃除|そうじ] し{よう と [思|おも]って います}。", en: "I'm thinking of cleaning my room at the weekend.", alt: "[週末|しゅうまつ] は [部屋|へや] を [掃除|そうじ] し{よう と [思|おも]ってる}。" },
          { jp: "[来年|らいねん]、 [新|あたら]しい [車|くるま] を [買|か]{おう と [思|おも]って います}。", en: "I'm thinking of buying a new car next year.", alt: "[来年|らいねん]、 [新|あたら]しい [車|くるま] を [買|か]{おう と [思|おも]ってる}。" },
          {
            jp: "[昼|ひる]ご[飯|はん] は [駅|えき] の [前|まえ] の [店|みせ] で [食|た]べ{よう と [思|おも]ってる} ん だ けど、 [一緒|いっしょ] に [行|い]かない？",
            en: "I'm thinking of having lunch at the place by the station. Want to come?",
            alt: "[昼|ひる]ご[飯|はん] は [駅|えき] の [前|まえ] の [店|みせ] で [食|た]べ{よう と [思|おも]って いる} ん です けど、 [一緒|いっしょ] に [行|い]きません か？",
          },
        ],
      },
      { type: "heading", text: "[予定|よてい]: the plan, the schedule" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [十時|じゅうじ] に [東京|とうきょう] に [着|つ]く {[予定|よてい] です}。", en: "I'm due to arrive in Tokyo at ten tomorrow.", alt: "[明日|あした] は [十時|じゅうじ] に [東京|とうきょう] に [着|つ]く {[予定|よてい] だ}。" },
          { jp: "[会議|かいぎ] は [三時|さんじ] に [終|お]わる {[予定|よてい] です}。", en: "The meeting is scheduled to finish at three." },
          { jp: "[来週|らいしゅう] の [土曜日|どようび] は [友達|ともだち] と [会|あ]う {[予定|よてい]} が ある。", en: "I'm meeting a friend next Saturday.", alt: "[来週|らいしゅう] の [土曜日|どようび] は [友達|ともだち] と [会|あ]う {[予定|よてい]} が あります。" },
          { jp: "[今夜|こんや] は {[予定|よてい]} が ある から、 [行|い]けない。", en: "I've got plans tonight, so I can't go.", alt: "[今夜|こんや] は {[予定|よてい]} が あります から、 [行|い]けません。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[来月|らいげつ]、 [京都|きょうと] に [行|い]く {[予定|よてい]} です。", en: "I'm due to go to Kyoto next month." },
        b: { jp: "[来月|らいげつ]、 [京都|きょうと] に [行|い]{こう と [思|おも]って います}。", en: "I'm thinking of going to Kyoto next month." },
        diff: "[予定|よてい]: it's arranged, perhaps booked. と[思|おも]っている: an idea you have, which might change. つもり sits between them: your firm intention.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A plan takes the volitional",
        text: "✗ [行|い]くと[思|おも]っています (meaning “I'm thinking of going”) ✓ [行|い]こうと[思|おも]っています. With the plain non-past, [行|い]くと[思|おも]う is a guess: “I think (someone) will go”. Your own plan takes the volitional.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[夏休|なつやす]み、 [何|なに]か {[予定|よてい]} ある？", en: "Got any plans for the summer holidays?" },
          { speaker: "Aya", jp: "[山|やま] に [登|のぼ]{ろう と [思|おも]ってる} ん だ。", en: "I'm thinking of going up a mountain." },
          { speaker: "Kenta", jp: "いい ね。 [僕|ぼく] は [家|いえ] で ゆっくり する {つもり}。", en: "Nice. I'm planning to just take it easy at home." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with と[思|おも]う: “I think I'll have a bath” (use [入|はい]る): お[風呂|ふろ]に＿。",
            answers: ["[入|はい]ろう と [思|おも]う"],
            explanation: "[入|はい]る is an う-verb: [入|はい]ろう, + と[思|おも]う.",
          },
          {
            prompt: "Polite, with と[思|おも]っている: “I'm thinking of selling my car” (use [売|う]る): [車|くるま]を＿。",
            answers: ["[売|う]ろう と [思|おも]って います", "[売|う]ろう と [思|おも]ってます"],
            explanation: "Volitional [売|う]ろう + と[思|おも]っています.",
          },
          {
            prompt: "Polite, with [予定|よてい]: “The film is scheduled to start at seven” (use [始|はじ]まる): [映画|えいが]は[七時|しちじ]に＿。",
            answers: ["[始|はじ]まる [予定|よてい] です"],
            explanation: "Plain non-past + [予定|よてい]です: [始|はじ]まる[予定|よてい]です.",
          },
          {
            prompt: "Casual, with と[思|おも]う or と[思|おも]っている: “I'm thinking of asking the teacher” (use [聞|き]く): [先生|せんせい]に＿。",
            answers: ["[聞|き]こう と [思|おも]う", "[聞|き]こう と [思|おも]って いる", "[聞|き]こう と [思|おも]ってる"],
            explanation: "[聞|き]く → [聞|き]こう, + と[思|おも]う (or と[思|おも]っている).",
          },
          {
            prompt: "Fix it, keeping と[思|おも]っています (you're thinking of going): [来年|らいねん]、[日本|にほん]に[行|い]くと[思|おも]っています。",
            answers: ["[来年|らいねん]、 [日本|にほん] に [行|い]こう と [思|おも]って います。", "[来年|らいねん]、 [日本|にほん] に [行|い]こう と [思|おも]ってます。"],
            explanation: "Your own plan takes the volitional: [行|い]こうと[思|おも]っています.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-shimau",
    title: "All done, or oh no: てしまう and ちゃう",
    mark: "てしまう",
    summary: "Say something is completely finished, or that something happened that you didn't want.",
    source: "Genki II ch. 18 (〜てしまう); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (shimau); Bunpro, “てしまう・ちゃう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **しまう** says an action is completely done, or that it happened when you wish it hadn't: “I've gone and …”, “I'm afraid I …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Full form", "Casual"],
        rows: [
          ["Verb て form in て", "[食|た]べて しまう · [食|た]べて しまった", "[食|た]べちゃう · [食|た]べちゃった"],
          ["Verb て form in で", "[飲|の]んで しまう · [飲|の]んで しまった", "[飲|の]んじゃう · [飲|の]んじゃった"],
        ],
      },
      {
        type: "text",
        text: "The past, てしまった, is the most common. Which meaning it has depends on the situation, and often it's both: [全部|ぜんぶ][食|た]べちゃった is “I ate the lot (oops)”. In casual speech てしまう shrinks to ちゃう and でしまう to じゃう. ちゃう and じゃう are casual; in polite speech the full てしまいました is the safe choice, though 〜ちゃいました is heard in friendly polite talk.",
      },
      { type: "heading", text: "All done" },
      {
        type: "examples",
        items: [
          { jp: "[宿題|しゅくだい] は もう [全部|ぜんぶ] やって {しまいました}。", en: "I've already done all my homework.", alt: "[宿題|しゅくだい] は もう [全部|ぜんぶ] やっ{ちゃった}。" },
          { jp: "この [本|ほん]、 [一日|いちにち] で [読|よ]ん{じゃった}。", en: "I read this whole book in a day.", alt: "この [本|ほん]、 [一日|いちにち] で [読|よ]んで {しまいました}。" },
          { jp: "[今日中|きょうじゅう] に [洗濯|せんたく] を して {しまおう}。", en: "Let's get the washing done today.", alt: "[今日中|きょうじゅう] に [洗濯|せんたく] を して {しまいましょう}。" },
          { jp: "[週末|しゅうまつ] に [映画|えいが] を [三本|さんぼん] [見|み]て {しまった}。", en: "I got through three films in one weekend.", alt: "[週末|しゅうまつ] に [映画|えいが] を [三本|さんぼん] [見|み]て {しまいました}。" },
        ],
      },
      { type: "heading", text: "Oh no: it happened" },
      {
        type: "examples",
        items: [
          { jp: "[電車|でんしゃ] に [傘|かさ] を [忘|わす]れて {しまいました}。", en: "I've gone and left my umbrella on the train.", alt: "[電車|でんしゃ] に [傘|かさ] を [忘|わす]れ{ちゃった}。" },
          { jp: "[友達|ともだち] の カップ を [割|わ]って {しまった}。", en: "I've gone and broken my friend's cup.", alt: "[友達|ともだち] の カップ を [割|わ]って {しまいました}。" },
          { jp: "[会議|かいぎ] に [遅|おく]れて {しまって}、 すみません。", en: "I'm sorry I was late for the meeting.", alt: "[会議|かいぎ] に [遅|おく]れ{ちゃって}、 ごめん。" },
          { jp: "[財布|さいふ] を [落|お]として {しまいました}。", en: "I've gone and lost my wallet.", alt: "[財布|さいふ] を [落|お]とし{ちゃった}。" },
          { jp: "ケーキ を [全部|ぜんぶ] [食|た]べ{ちゃった}。", en: "I've gone and eaten all the cake.", alt: "ケーキ を [全部|ぜんぶ] [食|た]べて {しまいました}。", note: "Both meanings at once: all of it, and a little guilty." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[宿題|しゅくだい] を [忘|わす]れ{ました}。", en: "I forgot my homework." },
        b: { jp: "[宿題|しゅくだい] を [忘|わす]れて {しまいました}。", en: "I'm afraid I've forgotten my homework." },
        diff: "The plain past states the fact. てしまいました adds the feeling: it's done, and you're sorry about it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "で takes じゃう",
        text: "✗ [飲|の]んちゃった ✓ [飲|の]んじゃった. A て form in で takes じゃう: [飲|の]んで → [飲|の]んじゃう, [遊|あそ]んで → [遊|あそ]んじゃう. Only a て form in て takes ちゃう: [書|か]いて → [書|か]いちゃう.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "あれ、 [鍵|かぎ] が ない。", en: "Huh, my key's not here." },
          { speaker: "Kenta", jp: "え、 また？", en: "What, again?" },
          { speaker: "Aya", jp: "[家|いえ] に [忘|わす]れて き{ちゃった}。", en: "Oh no, I've left it at home." },
          { speaker: "Kenta", jp: "じゃ、 [一緒|いっしょ] に [取|と]り に [行|い]こう。", en: "Let's go and get it together, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with ちゃう: “I've spent all my money” (use [使|つか]う): お[金|かね]、[全部|ぜんぶ]＿。",
            answers: ["[使|つか]っちゃった"],
            explanation: "[使|つか]って → [使|つか]っちゃう, past [使|つか]っちゃった.",
          },
          {
            prompt: "Polite, with てしまう: “I've lost the ticket” (use なくす): [切符|きっぷ]を＿。",
            answers: ["なくして しまいました", "なくしちゃいました"],
            explanation: "なくして + しまいました. Among friends, なくしちゃいました is heard too.",
          },
          {
            prompt: "Casual, with じゃう: “I've drunk all the juice” (use [飲|の]む): ジュース、[全部|ぜんぶ]＿。",
            answers: ["[飲|の]んじゃった"],
            explanation: "[飲|の]んで ends in で, so it takes じゃう: [飲|の]んじゃった.",
          },
          {
            prompt: "The casual form of [書|か]いてしまう: ＿",
            answers: ["[書|か]いちゃう"],
            explanation: "てしまう → ちゃう: [書|か]いちゃう.",
          },
          {
            prompt: "Fix it: [弟|おとうと]のゲームで[遊|あそ]んちゃった。",
            answers: ["[弟|おとうと] の ゲーム で [遊|あそ]んじゃった。", "[弟|おとうと] の ゲーム で [遊|あそ]んで しまった。"],
            explanation: "[遊|あそ]んで ends in で, so じゃう: [遊|あそ]んじゃった (or [遊|あそ]んでしまった).",
          },
        ],
      },
    ],
  },
  {
    slug: "te-oku",
    title: "Getting ready: ておく and とく",
    mark: "ておく",
    summary: "Say you do something in advance, or leave something as it is.",
    source: "Genki II ch. 15 (〜ておく); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (oku); Bunpro, “ておく”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **おく** says you do something now with later in mind (“in advance”, “ready for”), or leave something the way it is.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Full form", "Casual"],
        rows: [
          ["Verb て form in て", "[買|か]って おく · [買|か]って おいた", "[買|か]っとく · [買|か]っといた"],
          ["Verb て form in で", "[読|よ]んで おく · [読|よ]んで おいた", "[読|よ]んどく · [読|よ]んどいた"],
          ["Request", "[開|あ]けて おいて ください", "[開|あ]けといて"],
        ],
      },
      {
        type: "text",
        text: "おく is written in kana after the て form. In casual speech ておく shrinks to とく and でおく to どく; とく is casual only, so to a teacher or a customer say ておきます.",
      },
      { type: "heading", text: "Ready for later" },
      {
        type: "examples",
        items: [
          { jp: "[旅行|りょこう] の [前|まえ] に、 [天気|てんき] を [調|しら]べて {おきます}。", en: "I'll check the weather before the trip.", alt: "[旅行|りょこう] の [前|まえ] に、 [天気|てんき] を [調|しら]べて {おく}。" },
          { jp: "[授業|じゅぎょう] の [前|まえ] に、 この ページ を [読|よ]んで {おいて} ください。", en: "Please read this page before the class.", alt: "[授業|じゅぎょう] の [前|まえ] に、 この ページ を [読|よ]ん{どいて} ね。" },
          { jp: "ご[飯|はん] を [作|つく]っ{とく} ね。", en: "I'll make dinner for when you get back.", alt: "ご[飯|はん] を [作|つく]って {おきます} ね。" },
          { jp: "パーティー の [前|まえ] に [部屋|へや] を [掃除|そうじ] して {おいた}。", en: "I cleaned the room before the party.", alt: "パーティー の [前|まえ] に [部屋|へや] を [掃除|そうじ] して {おきました}。" },
        ],
      },
      { type: "heading", text: "Leave it as it is" },
      {
        type: "examples",
        items: [
          { jp: "[暑|あつ]い から、 [窓|まど] を [開|あ]けて {おいて} ください。", en: "It's hot, so please leave the window open.", alt: "[暑|あつ]い から、 [窓|まど] を [開|あ]け{といて}。" },
          { jp: "その まま に して {おいて} ください。", en: "Please leave it as it is.", alt: "その まま に し{といて}。" },
          { jp: "[使|つか]った お[皿|さら] は、 [後|あと] で [洗|あら]う から、 そこ に [置|お]いて {おいて}。", en: "Leave the plates there; I'll wash them later.", alt: "[使|つか]った お[皿|さら] は、 [後|あと] で [洗|あら]います から、 そこ に [置|お]いて {おいて} ください。" },
          { jp: "[寒|さむ]い から、 エアコン は つけて {おきます} ね。", en: "It's cold, so I'll leave the heating on.", alt: "[寒|さむ]い から、 エアコン は つけ{とく} ね。", note: "In Japan the エアコン heats as well as cools." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[切符|きっぷ] を [買|か]い{ました}。", en: "I bought the tickets." },
        b: { jp: "[切符|きっぷ] を [買|か]って {おきました}。", en: "I've got the tickets in (ready for the day)." },
        diff: "The plain past just says it happened. ておいた says it was done ahead, with a later use in mind.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "で takes どく",
        text: "✗ [読|よ]んとく ✓ [読|よ]んどく. A て form in で takes どく: [読|よ]んで → [読|よ]んどく. Only a て form in て takes とく: [買|か]って → [買|か]っとく. And とく is casual: to your teacher, say [読|よ]んでおきます.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[明日|あした] の [会議|かいぎ] の [部屋|へや]、 [予約|よやく] を お[願|ねが]い できます か？", en: "Could you book a room for tomorrow's meeting?" },
          { speaker: "Mr Mori", jp: "はい、 [今日中|きょうじゅう] に [予約|よやく] して {おきます}。", en: "Sure, I'll book it today." },
          { speaker: "Ms Sato", jp: "ありがとう ございます。", en: "Thank you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ておく: “I'll buy drinks before the party” (use [買|か]う): パーティーの[前|まえ]に[飲|の]み[物|もの]を＿。",
            answers: ["[買|か]って おきます"],
            explanation: "[買|か]って + おきます: in advance, for the party.",
          },
          {
            prompt: "Casual, with とく: “I'll put it on the desk” (use [置|お]く): [机|つくえ]の[上|うえ]に＿ね。",
            answers: ["[置|お]いとく"],
            explanation: "[置|お]いて + おく → [置|お]いとく.",
          },
          {
            prompt: "Casual request, with とく: “Leave the light on” (use つける): [電気|でんき]、＿。",
            answers: ["つけといて"],
            explanation: "つけて + おいて → つけといて.",
          },
          {
            prompt: "Casual, with ておく or とく: “I'll memorise the words before the test” (use [覚|おぼ]える): テストの[前|まえ]に[言葉|ことば]を＿。",
            answers: ["[覚|おぼ]えて おく", "[覚|おぼ]えとく"],
            explanation: "[覚|おぼ]えて + おく, casually [覚|おぼ]えとく.",
          },
          {
            prompt: "Fix it: [明日|あした]までにこれを[読|よ]んといて。",
            answers: ["[明日|あした] まで に これ を [読|よ]んどいて。", "[明日|あした] まで に これ を [読|よ]んで おいて。"],
            explanation: "[読|よ]んで ends in で, so どく: [読|よ]んどいて (or [読|よ]んでおいて).",
          },
        ],
      },
    ],
  },
  {
    slug: "te-aru",
    title: "Done and left that way: てある and ている",
    mark: "てある",
    summary: "Say something has been done and the result is still there, and tell it apart from ている.",
    source: "Genki II ch. 21 (〜てある); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (aru²); Bunpro, “てある”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists てある at N5."),
    blocks: [
      {
        type: "idea",
        text: "A transitive verb's て form + **ある** says someone has done it and the result is still there, usually on purpose; an intransitive verb + **いる** just describes the state.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Someone does it", "Done: てある", "It happens", "The state: ている"],
        rows: [
          ["[開|あ]ける", "[窓|まど] が [開|あ]けて ある", "[開|あ]く", "[窓|まど] が [開|あ]いて いる"],
          ["[閉|し]める", "ドア が [閉|し]めて ある", "[閉|し]まる", "ドア が [閉|し]まって いる"],
          ["つける", "[電気|でんき] が つけて ある", "つく", "[電気|でんき] が ついて いる"],
        ],
      },
      {
        type: "text",
        text: "The thing that was done usually takes が (or は): [窓|まど]が[開|あ]けてある. てある hints at a person and a reason (someone opened it, to let air in); ている with an intransitive verb only says how things are. You'll also hear を ([窓|まど]を[開|あ]けてある), which puts the stress on the doing. Don't confuse it with ておいた: [窓|まど]を[開|あ]けておいた says what you did ahead of time, [窓|まど]が[開|あ]けてある how things stand now. ある is written in kana after the て form.",
      },
      { type: "link", href: "/learn/verbs/te-iru-te-kudasai", label: "ている: a lasting state", text: "[窓|まど]が[開|あ]いている: the state an action leaves." },
      {
        type: "examples",
        items: [
          { jp: "[壁|かべ] に [絵|え] が かけて {あります}。", en: "There's a picture hanging on the wall.", alt: "[壁|かべ] に [絵|え] が かけて {ある}。" },
          { jp: "ホテル は もう [予約|よやく] して {あります}。", en: "The hotel's already booked.", alt: "ホテル は もう [予約|よやく] して {ある} よ。" },
          { jp: "この [本|ほん] に は [名前|なまえ] が [書|か]いて {ある}。", en: "This book's got a name written in it.", alt: "この [本|ほん] に は [名前|なまえ] が [書|か]いて {あります}。" },
          { jp: "[飲|の]み[物|もの] は テーブル の [上|うえ] に [並|なら]べて {あります}。", en: "The drinks are set out on the table." },
          { jp: "[部屋|へや] の エアコン は もう つけて {あります}。", en: "The air conditioning in the room has already been switched on." },
        ],
      },
      {
        type: "pair",
        a: { jp: "カーテン が [閉|し]めて {あります}。", en: "The curtains have been drawn." },
        b: { jp: "カーテン が [閉|し]まって {います}。", en: "The curtains are closed." },
        diff: "[閉|し]めてある: someone drew them, and they've been left that way. [閉|し]まっている: they're closed; who did it doesn't come into it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "てある needs a verb someone does",
        text: "✗ [窓|まど]が[開|あ]いてあります ✓ [窓|まど]が[開|あ]けてあります, or [窓|まど]が[開|あ]いています. てある goes with a verb someone does to something ([開|あ]ける, [閉|し]める, つける); a verb of what happens by itself ([開|あ]く, [閉|し]まる, つく) takes ている.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[誕生日|たんじょうび] パーティー の [準備|じゅんび]、 できた？", en: "Is everything ready for the birthday party?" },
          { speaker: "Kenta", jp: "うん。 ケーキ も [買|か]って {ある} し、 [部屋|へや] も [飾|かざ]って {ある} よ。", en: "Yes. The cake's bought, and the room's decorated." },
          { speaker: "Aya", jp: "ありがとう！", en: "Thanks!" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with てある: “The window's been left open” (use [開|あ]ける): [窓|まど]が＿。",
            answers: ["[開|あ]けて あります"],
            explanation: "[開|あ]ける is something someone does: [開|あ]けてあります.",
          },
          {
            prompt: "Casual, with てある: “The bread's already been cut” (use [切|き]る): パンはもう＿よ。",
            answers: ["[切|き]って ある"],
            explanation: "[切|き]って + ある: someone cut it, and it's ready.",
          },
          {
            prompt: "Polite, with ている: “The shop is closed” (use [閉|し]まる): [店|みせ]が＿。",
            answers: ["[閉|し]まって います", "[閉|し]まってます"],
            explanation: "[閉|し]まる happens by itself, so ている: [閉|し]まっています.",
          },
          {
            prompt: "Polite, with てある: “The light's been switched off” (use [消|け]す): [電気|でんき]が＿。",
            answers: ["[消|け]して あります"],
            explanation: "[消|け]す is something someone does: [消|け]してあります.",
          },
          {
            prompt: "Fix it: ドアが[閉|し]まってあります。",
            answers: ["ドア が [閉|し]めて あります。", "ドア が [閉|し]まって います。", "ドア が [閉|し]まってます。"],
            explanation: "てある needs [閉|し]める: [閉|し]めてあります. Or describe the state with ている: [閉|し]まっています.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-miru",
    title: "Try it and see: てみる",
    mark: "てみる",
    summary: "Say you'll try something out to see what it's like, and ask someone else to try it.",
    source: "Genki II ch. 13 (〜てみる); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (miru); Bunpro, “～てみる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **みる** says you do something to find out how it goes or what it's like: “try …”, “… and see”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Form", "Example"],
        rows: [
          ["Verb て form + みる", "[着|き]て みる"],
          ["Tried it: みた", "[着|き]て みた"],
          ["Want to try: みたい", "[着|き]て みたい"],
          ["Let's try: みよう · みましょう", "[着|き]て みよう"],
          ["Please try: みてください", "[着|き]て みて ください"],
        ],
      },
      {
        type: "text",
        text: "After the て form, みる is written in kana; [見|み]る in kanji is “look”. みる conjugates like [見|み]る, so it takes every ending: みた, みたい, みよう, みて. The action itself really happens: you try the dish, the shirt, the new shop, to see what you think. Trying hard to do something you can't quite manage is another pattern, the volitional + とする, for later (N3): [起|お]きようとしたけど、[起|お]きられなかった (I tried to get up, but couldn't).",
      },
      {
        type: "examples",
        items: [
          { jp: "この シャツ、 [着|き]て {みて} も いい です か？", en: "Can I try this shirt on?", alt: "この シャツ、 [着|き]て {みて} も いい？" },
          { jp: "[新|あたら]しい ラーメン[屋|や] に [行|い]って {みました}。", en: "I tried the new ramen place.", alt: "[新|あたら]しい ラーメン[屋|や] に [行|い]って {みた}。" },
          { jp: "[分|わ]からない [言葉|ことば] は、 [辞書|じしょ] で [調|しら]べて {みて ください}。", en: "If there's a word you don't know, try looking it up in a dictionary.", alt: "[分|わ]からない [言葉|ことば] は、 [辞書|じしょ] で [調|しら]べて {みて}。" },
          { jp: "[日本|にほん] の お[祭|まつ]り に [行|い]って {みたい} です。", en: "I'd like to go and see a festival in Japan.", alt: "[日本|にほん] の お[祭|まつ]り に [行|い]って {みたい}。" },
          { jp: "[今度|こんど]、 [一緒|いっしょ] に [作|つく]って {みよう}。", en: "Let's try making it together next time.", alt: "[今度|こんど]、 [一緒|いっしょ] に [作|つく]って {みましょう}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[駅|えき] の [前|まえ] の [店|みせ] で カレー を [食|た]べ{ました}。", en: "I had a curry at the place by the station." },
        b: { jp: "[駅|えき] の [前|まえ] の [店|みせ] で カレー を [食|た]べて {みました}。", en: "I tried the curry at the place by the station." },
        diff: "The plain past just reports what you did. てみた adds that you did it to see what it was like, often for the first time.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "It hangs on the て form",
        text: "✗ [着|き]るみます ✓ [着|き]てみます. みる follows the て form, never the dictionary form. And after the て form it's written みる in kana: [食|た]べてみる, not [食|た]べて[見|み]る.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "これ、 [母|はは] が [作|つく]った クッキー。 [食|た]べて {みて}。", en: "My mum made these biscuits. Try one." },
          { speaker: "Aya", jp: "ありがとう。 おいしい！ [私|わたし] も [作|つく]って {みたい}。", en: "Thanks. They're lovely! I'd like to try making them too." },
          { speaker: "Kenta", jp: "じゃあ、 [作|つく]り[方|かた] を [母|はは] に [聞|き]いて {みる} ね。", en: "I'll ask my mum how she makes them, then." },
        ],
        note: "[食|た]べてみて is the usual way to offer food: “go on, try it”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite past, with てみる: “I tried swimming in the sea” (use [泳|およ]ぐ): [海|うみ]で＿。",
            answers: ["[泳|およ]いで みました"],
            explanation: "[泳|およ]ぐ → [泳|およ]いで, + みました: [泳|およ]いでみました.",
          },
          {
            prompt: "Casual, with てみたい: “I'd like to try living in Tokyo” (use [住|す]む): [東京|とうきょう]に＿。",
            answers: ["[住|す]んで みたい", "[住|す]んで みたい な"],
            explanation: "[住|す]む → [住|す]んで, + みたい: [住|す]んでみたい.",
          },
          {
            prompt: "Polite request, with てみる: “Please try saying it once more” (use [言|い]う): もう[一度|いちど]＿。",
            answers: ["[言|い]って みて ください"],
            explanation: "[言|い]う → [言|い]って, + みてください.",
          },
          {
            prompt: "Casual, with てみる: “Let's try phoning the shop” (use [電話|でんわ]する): [店|みせ]に＿。",
            answers: ["[電話|でんわ] して みよう", "[電話|でんわ] を して みよう"],
            explanation: "[電話|でんわ]する → [電話|でんわ]して, + みよう (let's).",
          },
          {
            prompt: "Fix it: このお[茶|ちゃ]を[飲|の]むみてください。",
            answers: ["この お[茶|ちゃ] を [飲|の]んで みて ください。"],
            explanation: "みる follows the て form: [飲|の]んでみてください.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-iku-kuru",
    title: "Going and coming: ていく and てくる",
    mark: "ていく・てくる",
    summary: "Say which way an action moves, away or towards you, and how something has changed or will go on changing.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (iku², kuru²); Bunpro, “～ていく” and “～てくる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **いく** moves away from where you are, or carries on into the future; + **くる** comes towards you, or has been building up until now.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Meaning", "Example"],
        rows: [
          ["て form + いく", "take, go off with", "[持|も]って いく"],
          ["て form + くる", "bring, come with", "[持|も]って くる"],
          ["て form + くる", "go and do it, then come back", "[買|か]って くる"],
          ["A change + てくる", "has been changing until now", "[寒|さむ]く なって くる"],
          ["A change + ていく", "will go on changing", "[増|ふ]えて いく"],
        ],
      },
      {
        type: "text",
        text: "After the て form, いく and くる are written in kana, and くる's forms too (きた, きて, きます). With movement, the て form says how you go or come: [持|も]っていく is “take” (have it, and go), [持|も]ってくる “bring”, and [連|つ]れていく “take (a person)”. てくる also means going off to do something and coming back: [買|か]ってくる (go and buy it). With a change, てくる looks back from now (it's got colder, I'm starting to understand), and ていく looks ahead (it'll keep on growing).",
      },
      { type: "heading", text: "Away and towards" },
      {
        type: "examples",
        items: [
          { jp: "ピクニック に は お[弁当|べんとう] を [持|も]って {いきます}。", en: "I'll take a packed lunch to the picnic.", alt: "ピクニック に は お[弁当|べんとう] を [持|も]って {いく}。" },
          { jp: "[友達|ともだち] の [家|いえ] に は [花|はな] を [持|も]って {いきます}。", en: "I'll take some flowers to my friend's house.", alt: "[友達|ともだち] の [家|いえ] に は [花|はな] を [持|も]って {いく}。" },
          { jp: "[飲|の]み[物|もの] を [買|か]って {くる} ね。", en: "I'll go and get some drinks.", alt: "[飲|の]み[物|もの] を [買|か]って {きます} ね。" },
          {
            jp: "ちょっと [郵便局|ゆうびんきょく] に [行|い]って {きます}。",
            en: "I'm just popping to the post office.",
            alt: "ちょっと [郵便局|ゆうびんきょく] に [行|い]って {くる} ね。",
            note: "[行|い]ってきます: go and come back. The greeting いってきます is the same words.",
          },
          { jp: "[夕方|ゆうがた] に は [帰|かえ]って {きます}。", en: "I'll be back by the evening.", alt: "[夕方|ゆうがた] に は [帰|かえ]って {くる} よ。" },
        ],
      },
      { type: "heading", text: "Changing over time" },
      {
        type: "examples",
        items: [
          { jp: "[最近|さいきん]、 [寒|さむ]く なって {きました} ね。", en: "It's been getting colder lately, hasn't it?", alt: "[最近|さいきん]、 [寒|さむ]く なって {きた} ね。" },
          { jp: "[日本語|にほんご] が [少|すこ]し [分|わ]かって {きた}。", en: "I'm starting to understand Japanese a little.", alt: "[日本語|にほんご] が [少|すこ]し [分|わ]かって {きました}。" },
          { jp: "[眠|ねむ]く なって {きた}。", en: "I'm getting sleepy.", alt: "[眠|ねむ]く なって {きました}。" },
          {
            jp: "これ から [日本|にほん] に [来|く]る [人|ひと] は [増|ふ]えて {いく} でしょう。",
            en: "The number of people coming to Japan will probably keep growing.",
            alt: "これ から [日本|にほん] に [来|く]る [人|ひと] は [増|ふ]えて {いく} だろう。",
            note: "ていく: from now on, into the future.",
          },
          { jp: "これ から も [日本語|にほんご] を [勉強|べんきょう] して {いきたい} です。", en: "I want to keep on studying Japanese.", alt: "これ から も [日本語|にほんご] を [勉強|べんきょう] して {いきたい}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[辞書|じしょ] を [持|も]って {いきます}。", en: "I'll take a dictionary (with me)." },
        b: { jp: "[辞書|じしょ] を [持|も]って {きます}。", en: "I'll bring a dictionary (here)." },
        diff: "Seen from where you're talking: ていく goes off with it, away from here; てくる brings it to where you will be when you do it (here, or the place you're heading for).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "People aren't carried",
        text: "✗ [友達|ともだち]を[持|も]っていきます ✓ [友達|ともだち]を[連|つ]れていきます. [持|も]っていく and [持|も]ってくる are for things; a person or an animal takes [連|つ]れていく and [連|つ]れてくる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[明日|あした] の パーティー、 [何|なに] か [持|も]って {いこう} か？", en: "Shall I bring something to tomorrow's party?" },
          { speaker: "Kenta", jp: "じゃあ、 ジュース を [持|も]って {きて}。 [僕|ぼく] は ケーキ を [買|か]って {くる} よ。", en: "Bring some juice, then. I'll go and get a cake." },
          { speaker: "Aya", jp: "[分|わ]かった。 [妹|いもうと] も [連|つ]れて {いって} も いい？", en: "OK. Can I bring my little sister along?" },
          { speaker: "Kenta", jp: "もちろん！", en: "Of course!" },
        ],
        note: "Aya says [持|も]っていく and [連|つ]れていく: she is thinking from where she is now. Kenta says [持|も]ってきて, as if he were already at the party.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with ていく: “I'll take the dog to the vet” (use [連|つ]れる): [犬|いぬ]を[病院|びょういん]に＿。",
            answers: ["[連|つ]れて いく", "[連|つ]れて く"],
            explanation: "A dog is taken, not carried: [連|つ]れて + いく.",
          },
          {
            prompt: "Casual, go and come back: “I'll go and borrow a book from the library” (use [借|か]りる): [図書館|としょかん]で[本|ほん]を＿ね。",
            answers: ["[借|か]りて くる"],
            explanation: "Go, do it, come back: [借|か]りて + くる.",
          },
          {
            prompt: "Polite, with てくる: “It's been getting hotter” (use [暑|あつ]い): だんだん＿ね。",
            answers: ["[暑|あつ]く なって きました"],
            explanation: "A change up to now: [暑|あつ]くなる → [暑|あつ]くなって, + きました.",
          },
          {
            prompt: "With ていく, a change from now on: “The number of students will keep falling” (use [減|へ]る): [学生|がくせい]は＿でしょう。",
            answers: ["[減|へ]って いく"],
            explanation: "Looking ahead: [減|へ]って + いく.",
          },
          {
            prompt: "Fix it, keeping いく: [子供|こども]を[公園|こうえん]に[持|も]っていきました。",
            answers: ["[子供|こども] を [公園|こうえん] に [連|つ]れて いきました。"],
            explanation: "A person takes [連|つ]れる: [連|つ]れていきました.",
          },
        ],
      },
    ],
  },
  {
    slug: "tokoro",
    title: "About to, in the middle of, just done: ところだ",
    mark: "ところ",
    summary: "Say exactly where you are in an action: about to start it, in the middle of it, or just finished.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (tokoro da); Bunpro, “～るところだ”, “～ているところだ” and “～たところだ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A verb + **ところだ** pins down the stage of an action: the plain non-past is “just about to”, the ている form “in the middle of”, and the た form “have just”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Stage", "Before it", "Example"],
        rows: [
          ["About to", "Verb, plain non-past", "[食|た]べる ところ だ"],
          ["In the middle of", "Verb ている form", "[食|た]べて いる ところ だ"],
          ["Just done", "Verb た form", "[食|た]べた ところ だ"],
        ],
      },
      {
        type: "text",
        text: "ところ is written in kana here; politely it's ところです, and casually ところ alone or ところだよ. It's about one moment: it answers “what are you doing right now?”, or explains why now isn't a good time. ちょうど (just) often comes with it: ちょうど[今|いま]…ところです. ところだった is “was just about to”, and also “nearly”: [忘|わす]れるところだった (I nearly forgot). たところ is right after the moment; for something that still feels recent though more time has passed, there's たばかり.",
      },
      { type: "link", href: "/learn/n4-plans/ta-bakari", label: "たばかり: only just", text: "How new it feels, not the exact moment." },
      { type: "heading", text: "るところ: about to" },
      {
        type: "examples",
        items: [
          { jp: "これ から [晩|ばん]ご[飯|はん] を [作|つく]る {ところ です}。", en: "I'm just about to make dinner.", alt: "これ から [晩|ばん]ご[飯|はん] を [作|つく]る {ところ} だ よ。" },
          { jp: "ちょうど [今|いま]、 [家|いえ] を [出|で]る {ところ だ} よ。", en: "I'm just leaving home right now.", alt: "ちょうど [今|いま]、 [家|いえ] を [出|で]る {ところ です}。" },
          { jp: "[電車|でんしゃ] が [出|で]る {ところ だった} ので、 [走|はし]りました。", en: "The train was about to leave, so I ran.", alt: "[電車|でんしゃ] が [出|で]る {ところ だった} から、 [走|はし]った。" },
          { jp: "もう [寝|ね]る {ところ だった} けど、 [大丈夫|だいじょうぶ] だ よ。", en: "I was just about to go to bed, but it's fine.", alt: "もう [寝|ね]る {ところ でした} けど、 [大丈夫|だいじょうぶ] です よ。" },
        ],
      },
      { type: "heading", text: "ているところ: in the middle of" },
      {
        type: "examples",
        items: [
          { jp: "[今|いま]、 [宿題|しゅくだい] を して いる {ところ です}。", en: "I'm in the middle of my homework.", alt: "[今|いま]、 [宿題|しゅくだい] を してる {ところ}。" },
          { jp: "[田中|たなか]-さん は [今|いま]、 お[客|きゃく][様|さま] と [話|はな]して いる {ところ です}。", en: "Mr Tanaka is talking with a customer at the moment." },
          { jp: "[今|いま]、 [調|しら]べて いる {ところ} だ から、 ちょっと [待|ま]って。", en: "I'm looking into it right now, so hang on a moment.", alt: "[今|いま]、 [調|しら]べて いる {ところ} です から、 ちょっと [待|ま]って ください。" },
          { jp: "[駅|えき] に [向|む]かって いる {ところ です}。", en: "I'm on my way to the station.", alt: "[駅|えき] に [向|む]かってる {ところ}。" },
        ],
      },
      { type: "heading", text: "たところ: just done" },
      {
        type: "examples",
        items: [
          { jp: "[今|いま]、 [家|いえ] に [着|つ]いた {ところ です}。", en: "I've just got home.", alt: "[今|いま]、 [家|いえ] に [着|つ]いた {ところ} だ よ。" },
          { jp: "ちょうど [昼|ひる]ご[飯|はん] を [食|た]べた {ところ} だ から、 [今|いま] は [大丈夫|だいじょうぶ]。", en: "I've just had lunch, so I'm fine for now.", alt: "ちょうど [昼|ひる]ご[飯|はん] を [食|た]べた {ところ} です から、 [今|いま] は [大丈夫|だいじょうぶ] です。" },
          { jp: "ちょうど [今|いま]、 メール を [送|おく]った {ところ です}。", en: "I've just this minute sent the email." },
          { jp: "[今|いま]、 [仕事|しごと] が [終|お]わった {ところ} だ よ。", en: "I've just this minute finished work.", alt: "[今|いま]、 [仕事|しごと] が [終|お]わった {ところ です}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[映画|えいが] が [始|はじ]まる {ところ です}。", en: "The film's about to start." },
        b: { jp: "[映画|えいが] が [始|はじ]まった {ところ です}。", en: "The film's just started." },
        diff: "The verb's tense says which side of the moment you're on: the non-past is just before it, the た form just after. ている + ところ is in the middle.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "About to isn't in the middle",
        text: "✗ [今|いま]、[食|た]べるところです (meaning “I'm eating”) ✓ [今|いま]、[食|た]べているところです. With the plain non-past, ところ means you haven't started yet: “I'm about to eat”. In the middle of it takes ている.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "もしもし、 [森|もり]-さん、 [今|いま] [大丈夫|だいじょうぶ] です か？", en: "Hello, Mr Mori, is now a good time?" },
          { speaker: "Mr Mori", jp: "すみません、 [今|いま] [電車|でんしゃ] に [乗|の]る {ところ} なん です。", en: "Sorry, I'm just about to get on a train." },
          { speaker: "Ms Sato", jp: "じゃあ、 [後|あと] で また [電話|でんわ] します ね。", en: "I'll call you back later, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, about to: “I'm just about to have a bath” (use [入|はい]る): これからお[風呂|ふろ]に＿。",
            answers: ["[入|はい]る ところ です"],
            explanation: "Before it starts: the plain non-past + ところです.",
          },
          {
            prompt: "Casual, in the middle of: “I'm cleaning my room right now” (use [掃除|そうじ]する): [今|いま]、[部屋|へや]を＿。",
            answers: ["[掃除|そうじ] して いる ところ", "[掃除|そうじ] して いる ところ だ", "[掃除|そうじ] して いる ところ だ よ"],
            explanation: "In the middle: [掃除|そうじ]している + ところ; in speech, [掃除|そうじ]してるところ.",
          },
          {
            prompt: "Polite, with たところ: “The bus has just left” (use [出|で]る): バスは[今|いま]＿。",
            answers: ["[出|で]た ところ です"],
            explanation: "Just after it: the た form + ところです.",
          },
          {
            prompt: "Casual, with ところだった: “I was just about to call you” (use [電話|でんわ]する): ちょうど＿よ。",
            answers: ["[電話|でんわ] する ところ だった", "[電話|でんわ] を する ところ だった"],
            explanation: "Was about to: the plain non-past + ところだった.",
          },
          {
            prompt: "Fix it (you're in the middle of it): [今|いま]、[手紙|てがみ]を[書|か]くところです。",
            answers: ["[今|いま]、 [手紙|てがみ] を [書|か]いて いる ところ です。"],
            explanation: "In the middle takes ている: [書|か]いているところです. [書|か]くところ would mean you're about to start.",
          },
        ],
      },
    ],
  },
  {
    slug: "ta-bakari",
    title: "Only just: たばかり",
    mark: "たばかり",
    summary: "Say something happened only a short while ago, and how that differs from たところ.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (bakari); Bunpro, “～たばかり”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form + **ばかり** says something happened only a short while ago, as the speaker feels it: “have only just …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Form", "Example"],
        rows: [
          ["Verb た form + ばかり", "[買|か]った ばかり"],
          ["With です or だ", "[買|か]った ばかり です"],
          ["Before a noun: の", "[買|か]った ばかり の [車|くるま]"],
          ["Even though: なのに", "[買|か]った ばかり な のに"],
        ],
      },
      {
        type: "text",
        text: "ばかり is written in kana. たばかり is about how recent it feels, so the time can be fairly long: [日本|にほん]に[来|き]たばかり can be said a month after arriving. たところ is the moment just after, and doesn't stretch like that. たばかり often explains a problem or a surprise: it's so new that you're still sleepy, still lost, or annoyed it's already broken.",
      },
      { type: "link", href: "/learn/n4-plans/tokoro", label: "ところだ", text: "About to, in the middle of, just done." },
      {
        type: "examples",
        items: [
          { jp: "[先月|せんげつ] [日本|にほん] に [来|き]た {ばかり です}。", en: "I only came to Japan last month.", alt: "[先月|せんげつ] [日本|にほん] に [来|き]た {ばかり} なん だ。" },
          { jp: "この パソコン、 [買|か]った {ばかり} な のに、 もう [壊|こわ]れて しまった。", en: "I've only just bought this computer, and it's already broken.", alt: "この パソコン、 [買|か]った {ばかり} な のに、 もう [壊|こわ]れて しまいました。" },
          { jp: "[起|お]きた {ばかり} で、 まだ [眠|ねむ]い。", en: "I've only just got up, so I'm still sleepy.", alt: "[起|お]きた {ばかり} で、 まだ [眠|ねむ]い です。" },
          { jp: "[入|はい]った {ばかり} の [会社|かいしゃ] を、 もう [辞|や]めたい。", en: "I've only just joined the company, and I already want to quit.", alt: "[入|はい]った {ばかり} の [会社|かいしゃ] を、 もう [辞|や]めたい です。" },
          { jp: "[先週|せんしゅう] [結婚|けっこん] した {ばかり です}。", en: "We only got married last week.", alt: "[先週|せんしゅう] [結婚|けっこん] した {ばかり} なん だ。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[日本|にほん] に [着|つ]いた {ところ です}。", en: "I've just this minute arrived in Japan." },
        b: { jp: "[日本|にほん] に [着|つ]いた {ばかり です}。", en: "I've not long arrived in Japan." },
        diff: "たところ is right after the moment: you've just landed. たばかり is how new it feels: it could be today, or a week ago.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "It takes the た form",
        text: "✗ [食|た]べるばかりです (meaning “I've just eaten”) ✓ [食|た]べたばかりです. The “only just” ばかり follows the た form. After a noun or a て form, ばかり means “nothing but” ([肉|にく]ばかり[食|た]べている, all I eat is meat), a pattern for later (N3).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Customer", jp: "この パン、 [温|あたた]かい です ね。", en: "This bread's warm." },
          { speaker: "Staff", jp: "はい、 [焼|や]いた {ばかり} です よ。", en: "Yes, it's fresh out of the oven." },
          { speaker: "Customer", jp: "じゃあ、 [二|ふた]つ ください。", en: "I'll have two, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with たばかり: “I've only just come home” (use [帰|かえ]る): [家|いえ]に＿です。",
            answers: ["[帰|かえ]って きた ばかり", "[帰|かえ]った ばかり"],
            explanation: "The た form + ばかり: [帰|かえ]ったばかり, or [帰|かえ]ってきたばかり (come back home).",
          },
          {
            prompt: "Casual, with たばかり: “I've only just learned this word” (use [覚|おぼ]える): この[言葉|ことば]、＿なんだ。",
            answers: ["[覚|おぼ]えた ばかり"],
            explanation: "[覚|おぼ]えた + ばかり.",
          },
          {
            prompt: "Before a noun, with たばかり: “a just-washed shirt” (use [洗|あら]う): ＿のシャツ",
            answers: ["[洗|あら]った ばかり"],
            explanation: "たばかり + の + Noun: [洗|あら]ったばかりのシャツ.",
          },
          {
            prompt: "Polite, with たところ (this very moment): “Class has just finished” (use [終|お]わる): [授業|じゅぎょう]が[今|いま]＿。",
            answers: ["[終|お]わった ところ です"],
            explanation: "Right after the moment: [終|お]わったところです.",
          },
          {
            prompt: "Fix it: [昨日|きのう][来|く]るばかりです。",
            answers: ["[昨日|きのう] [来|き]た ばかり です。"],
            explanation: "“Only just” takes the た form: [来|き]たばかりです.",
          },
        ],
      },
    ],
  },
  {
    slug: "nagara",
    title: "Two things at once: ながら",
    mark: "ながら",
    summary: "Say you do one thing while doing another, and which of the two is the main action.",
    source: "Genki II ch. 18 (〜ながら); Bunpro, “ながら”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Verb stem + **ながら** + the main action says one person does both at the same time: “while …ing”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Stem", "+ ながら"],
        rows: [
          ["る-verb [見|み]る", "[見|み]", "[見|み] ながら"],
          ["う-verb [歩|ある]く", "[歩|ある]き", "[歩|ある]き ながら"],
          ["する", "し", "し ながら"],
        ],
      },
      {
        type: "text",
        text: "The stem is the ます form without ます. The main action comes last, after ながら: [音楽|おんがく]を[聞|き]きながら[走|はし]る is mainly running, with music on. Both actions are the same person's, and the tense and politeness go on the last verb only. For two people (“while she was cooking, I read”), use [間|あいだ], in the next lesson.",
      },
      {
        type: "examples",
        items: [
          { jp: "[音楽|おんがく] を [聞|き]き {ながら} [勉強|べんきょう] します。", en: "I study while listening to music.", alt: "[音楽|おんがく] を [聞|き]き {ながら} [勉強|べんきょう] する。" },
          { jp: "テレビ を [見|み] {ながら} [食|た]べないで。", en: "Don't eat while you're watching TV.", alt: "テレビ を [見|み] {ながら} [食|た]べないで ください。" },
          { jp: "[歩|ある]き {ながら} スマホ を [使|つか]う の は [危|あぶ]ない よ。", en: "It's dangerous to use your phone while you're walking.", alt: "[歩|ある]き {ながら} スマホ を [使|つか]う の は [危|あぶ]ない です よ。" },
          { jp: "コーヒー を [飲|の]み {ながら}、 [少|すこ]し [話|はな]しましょう。", en: "Let's have a chat over coffee.", alt: "コーヒー を [飲|の]み {ながら}、 [少|すこ]し [話|はな]そう。" },
          {
            jp: "[兄|あに] は [働|はたら]き {ながら} [大学|だいがく] に [通|かよ]って います。",
            en: "My brother goes to university while working.",
            alt: "[兄|あに] は [働|はたら]き {ながら} [大学|だいがく] に [通|かよ]って いる。",
            note: "ながら can also cover a longer stretch: two things kept up over the same months or years.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[歌|うた] を [歌|うた]い {ながら} [料理|りょうり] を します。", en: "I cook, singing as I go." },
        b: { jp: "[料理|りょうり] を し {ながら} [歌|うた] を [歌|うた]います。", en: "I sing while I'm cooking." },
        diff: "The verb at the end is the main action, and the ながら one comes along with it. In the first, cooking is what you're doing; in the second, singing is.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The stem, and one person",
        text: "✗ [見|み]るながら ✓ [見|み]ながら: ながら takes the stem. And it joins two actions of one person: ✗ [母|はは]が[料理|りょうり]をしながら、[私|わたし]は[本|ほん]を[読|よ]みました ✓ [母|はは]が[料理|りょうり]をしている[間|あいだ]、[私|わたし]は[本|ほん]を[読|よ]みました.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[運転|うんてん] し {ながら} [電話|でんわ] しちゃ だめ だ よ。", en: "You mustn't be on the phone while you're driving." },
          { speaker: "Kenta", jp: "ごめん。 [着|つ]いて から かける よ。", en: "Sorry. I'll call once I get there." },
          { speaker: "Aya", jp: "うん。 [気|き] を つけて ね。", en: "OK. Drive carefully." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ながら: “I listen to the radio while I drive” (use [聞|き]く): ラジオを＿[運転|うんてん]します。",
            answers: ["[聞|き]き ながら"],
            explanation: "[聞|き]く → the stem [聞|き]き, + ながら.",
          },
          {
            prompt: "With ながら: “We walked along, chatting” (use [話|はな]す): [友達|ともだち]と＿[歩|ある]きました。",
            answers: ["[話|はな]し ながら"],
            explanation: "[話|はな]す → [話|はな]し, + ながら; walking is the main action, so it comes last.",
          },
          {
            prompt: "With ながら: “She spoke, laughing” (use [笑|わら]う): [彼女|かのじょ]は＿[話|はな]した。",
            answers: ["[笑|わら]い ながら"],
            explanation: "[笑|わら]う → [笑|わら]い, + ながら.",
          },
          {
            prompt: "With ながら: “I learned Japanese while living in Japan” (use [住|す]む): [日本|にほん]に＿[日本語|にほんご]を[勉強|べんきょう]しました。",
            answers: ["[住|す]み ながら"],
            explanation: "[住|す]む → [住|す]み, + ながら: two things over the same stretch of time.",
          },
          {
            prompt: "Fix it: [歌|うた]を[歌|うた]うながらシャワーを[浴|あ]びます。",
            answers: ["[歌|うた] を [歌|うた]い ながら シャワー を [浴|あ]びます。"],
            explanation: "ながら takes the stem: [歌|うた]いながら.",
          },
        ],
      },
    ],
  },
  {
    slug: "made-ni-aida",
    title: "By, while and during: までに, あいだ and あいだに",
    mark: "までに・[間|あいだ]",
    summary: "Give a deadline with までに, say what fills a stretch of time with あいだ, and what happens inside it with あいだに.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (made ni, aida, aida ni); Bunpro, “までに” and “～ているあいだに”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro lists ている間に at N4 and Noun の間に at N3; JLPT Sensei lists 間 and 間に at N4."),
    blocks: [
      {
        type: "idea",
        text: "**までに** is a deadline (“by”); **[間|あいだ]** is all through a stretch of time (“while”, “the whole time”); **[間|あいだ]に** is at some point inside it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Before it", "Example"],
        rows: [
          ["By: までに", "Noun (a time)", "[金曜日|きんようび] まで に"],
          ["By: までに", "Verb, plain non-past", "[帰|かえ]る まで に"],
          ["All through: [間|あいだ]", "Verb ている form", "[寝|ね]て いる [間|あいだ]"],
          ["All through: [間|あいだ]", "Noun + の", "[夏休|なつやす]み の [間|あいだ]"],
          ["Some time during: [間|あいだ]に", "Verb ている form · Noun + の", "[寝|ね]て いる [間|あいだ] に"],
        ],
      },
      {
        type: "text",
        text: "まで alone is “until”: the action goes on right up to that point ([五時|ごじ]まで[働|はたら]く). までに is “by”: it happens once, some time before the deadline. [間|あいだ] works the same way: with [間|あいだ] the main action fills the whole stretch, so it's often a ている form or ずっと (all the time); with [間|あいだ]に it happens at one point inside it. Before [間|あいだ], a verb is usually in the ている form, or one of being (いる, ない), and a noun takes の. The two halves can have different people in them: [私|わたし]が[寝|ね]ている[間|あいだ]に、[雪|ゆき]が[降|ふ]りました。",
      },
      { type: "link", href: "/learn/particles/kara-made", label: "から and まで", text: "まで alone: until." },
      { type: "heading", text: "までに: by" },
      {
        type: "examples",
        items: [
          { jp: "[金曜日|きんようび] {まで に} レポート を [出|だ]して ください。", en: "Please hand in your report by Friday.", alt: "[金曜日|きんようび] {まで に} レポート を [出|だ]して ね。" },
          { jp: "[七時|しちじ] {まで に} [帰|かえ]る よ。", en: "I'll be home by seven.", alt: "[七時|しちじ] {まで に} [帰|かえ]ります。" },
          { jp: "[暗|くら]く なる {まで に} [家|いえ] に [着|つ]きたい。", en: "I want to get home by the time it gets dark.", alt: "[暗|くら]く なる {まで に} [家|いえ] に [着|つ]きたい です。" },
          { jp: "[来月|らいげつ] {まで に} この [本|ほん] を [全部|ぜんぶ] [読|よ]みたい です。", en: "I want to read this whole book by next month.", alt: "[来月|らいげつ] {まで に} この [本|ほん] を [全部|ぜんぶ] [読|よ]みたい。" },
        ],
      },
      { type: "heading", text: "[間|あいだ]: all through" },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] が [料理|りょうり] を [作|つく]って いる {[間|あいだ]}、 [子供|こども]たち は テレビ を [見|み]て いました。", en: "While I was cooking, the children were watching TV.", alt: "[私|わたし] が [料理|りょうり] を [作|つく]って いる {[間|あいだ]}、 [子供|こども]たち は テレビ を [見|み]て いた。" },
          { jp: "[夏休|なつやす]み の {[間|あいだ]}、 ずっと [祖母|そぼ] の [家|いえ] に いました。", en: "I stayed at my grandmother's all through the summer holidays.", alt: "[夏休|なつやす]み の {[間|あいだ]}、 ずっと [祖母|そぼ] の [家|いえ] に いた。" },
          { jp: "[電車|でんしゃ] に [乗|の]って いる {[間|あいだ]}、 ずっと [寝|ね]て いた。", en: "I slept the whole time I was on the train.", alt: "[電車|でんしゃ] に [乗|の]って いる {[間|あいだ]}、 ずっと [寝|ね]て いました。" },
          { jp: "[待|ま]って いる {[間|あいだ]}、 この [雑誌|ざっし] を [読|よ]んで いて ください。", en: "Have a read of this magazine while you wait.", alt: "[待|ま]って いる {[間|あいだ]}、 この [雑誌|ざっし] を [読|よ]んで いて。" },
        ],
      },
      { type: "heading", text: "[間|あいだ]に: at some point during" },
      {
        type: "examples",
        items: [
          { jp: "[休|やす]み の {[間|あいだ] に}、 [髪|かみ] を [切|き]って きます。", en: "I'll get my hair cut some time during the holidays.", alt: "[休|やす]み の {[間|あいだ] に}、 [髪|かみ] を [切|き]って くる ね。" },
          { jp: "[連休|れんきゅう] の {[間|あいだ] に}、 [部屋|へや] を [掃除|そうじ] したい です。", en: "I want to clean my room some time over the long weekend.", alt: "[連休|れんきゅう] の {[間|あいだ] に}、 [部屋|へや] を [掃除|そうじ] したい。" },
          { jp: "[日本|にほん] に いる {[間|あいだ] に}、 [一度|いちど] [京都|きょうと] に [行|い]きたい です。", en: "While I'm in Japan, I want to go to Kyoto at least once.", alt: "[日本|にほん] に いる {[間|あいだ] に}、 [一度|いちど] [京都|きょうと] に [行|い]きたい。" },
          { jp: "[弟|おとうと] が いない {[間|あいだ] に}、 [弟|おとうと] の ケーキ を [食|た]べちゃった。", en: "I ate my brother's cake while he wasn't around.", alt: "[弟|おとうと] が いない {[間|あいだ] に}、 [弟|おとうと] の ケーキ を [食|た]べて しまいました。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[彼|かれ] が [話|はな]して いる {[間|あいだ]}、 [私|わたし] は ずっと [聞|き]いて いました。", en: "I listened the whole time he was talking." },
        b: { jp: "[彼|かれ] が [話|はな]して いる {[間|あいだ] に}、 [私|わたし] は [寝|ね]て しまいました。", en: "I fell asleep while he was talking." },
        diff: "[間|あいだ]: the main action fills the whole stretch. [間|あいだ]に: it happens at one point inside it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Until is まで, by is までに",
        text: "✗ [十時|じゅうじ]までに[寝|ね]ていました (meaning “I slept until ten”) ✓ [十時|じゅうじ]まで[寝|ね]ていました. まで is “until”: the action lasts up to that point. までに is “by”: it happens once, before the deadline ([十時|じゅうじ]までに[起|お]きます, I'll be up by ten).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "これ、 [明日|あした] の [朝|あさ] {まで に} お[願|ねが]い できます か？", en: "Could you do this by tomorrow morning?" },
          { speaker: "Mr Mori", jp: "はい、 [今日|きょう] [帰|かえ]る {まで に} やって おきます。", en: "Sure, I'll get it done before I go home today." },
          { speaker: "Ms Sato", jp: "ありがとう ございます。 [助|たす]かります。", en: "Thank you. That's a great help." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "A deadline: “I have to hand in my homework by Monday”: [月曜日|げつようび]＿[宿題|しゅくだい]を[出|だ]さなければなりません。",
            answers: ["まで に", "まで に は"],
            explanation: "By a time is までに: [月曜日|げつようび]までに.",
          },
          {
            prompt: "まで or までに: “I'll wait until six”: [六時|ろくじ]＿[待|ま]ちます。",
            answers: ["まで"],
            explanation: "Waiting goes on right up to six, so まで.",
          },
          {
            prompt: "[間|あいだ] or [間|あいだ]に: “I read a book the whole time I was on the bus”: バスに[乗|の]っている＿、ずっと[本|ほん]を[読|よ]んでいた。",
            answers: ["[間|あいだ]"],
            explanation: "Reading fills the whole stretch, so [間|あいだ] (ずっと says so too).",
          },
          {
            prompt: "[間|あいだ] or [間|あいだ]に, at some point during: “Clean the room some time while I'm at the shops”: [私|わたし]が[買|か]い[物|もの]に[行|い]っている＿、[部屋|へや]を[掃除|そうじ]しておいてね。",
            answers: ["[間|あいだ] に"],
            explanation: "The cleaning gets done at some point while you're out, so [間|あいだ]に.",
          },
          {
            prompt: "Fix it (meaning “until twelve”): [十二時|じゅうにじ]までに[友達|ともだち]と[話|はな]していました。",
            answers: ["[十二時|じゅうにじ] まで [友達|ともだち] と [話|はな]して いました。"],
            explanation: "Talking went on up to twelve, so まで: までに is a deadline.",
          },
        ],
      },
    ],
  },
  {
    slug: "naide-zuni",
    title: "Without doing, instead of doing: ないで",
    mark: "〜ないで",
    summary: "Say you did something without doing something else, or instead of it.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (naide); Bunpro, “Verb[ないで]”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists ないで at N5."),
    blocks: [
      {
        type: "idea",
        text: "Verb ない form + **で** + another verb says you do the second without doing the first (“without …ing”), or instead of it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "ない form + で", "Example"],
        rows: [
          ["る-verb", "[食|た]べないで", "[食|た]べないで [出|で]かける"],
          ["う-verb", "[持|も]たないで", "[持|も]たないで [行|い]く"],
          ["する", "しないで", "しないで [寝|ね]る"],
        ],
      },
      {
        type: "text",
        text: "It's the same ないで as in ないでください, followed here by another verb instead of ください. It has two uses: “without” (I left without breakfast), and “instead of”, when the sentence names the usual choice and what you did instead (I walked instead of taking the bus). Don't confuse it with なくて, which gives a reason: [分|わ]からなくて[困|こま]った (I didn't understand, so I was stuck). In writing and formal speech you'll also meet ずに for ないで ([食|た]べずに; する becomes せずに), a pattern for later (N3).",
      },
      { type: "link", href: "/learn/n5-essentials/naide-kudasai", label: "ないでください", text: "Please don't …" },
      { type: "heading", text: "Without" },
      {
        type: "examples",
        items: [
          { jp: "[今朝|けさ] は [朝|あさ]ご[飯|はん] を [食|た]べ{ないで} [家|いえ] を [出|で]ました。", en: "This morning I left home without having breakfast.", alt: "[今朝|けさ] は [朝|あさ]ご[飯|はん] を [食|た]べ{ないで} [家|いえ] を [出|で]た。" },
          { jp: "[傘|かさ] を [持|も]た{ないで} [出|で]かけて しまった。", en: "I ended up going out without my umbrella.", alt: "[傘|かさ] を [持|も]た{ないで} [出|で]かけて しまいました。" },
          { jp: "[昨日|きのう] は お[風呂|ふろ] に [入|はい]ら{ないで} [寝|ね]た。", en: "Last night I went to bed without having a bath.", alt: "[昨日|きのう] は お[風呂|ふろ] に [入|はい]ら{ないで} [寝|ね]ました。" },
          { jp: "[辞書|じしょ] を [使|つか]わ{ないで} [読|よ]んで みて ください。", en: "Try reading it without a dictionary.", alt: "[辞書|じしょ] を [使|つか]わ{ないで} [読|よ]んで みて。" },
        ],
      },
      { type: "heading", text: "Instead of" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は バス に [乗|の]ら{ないで}、 [駅|えき] まで [歩|ある]きました。", en: "Today I walked to the station instead of taking the bus.", alt: "[今日|きょう] は バス に [乗|の]ら{ないで}、 [駅|えき] まで [歩|ある]いた。" },
          { jp: "[外|そと] で [食|た]べ{ないで}、 [家|いえ] で [作|つく]ろう。", en: "Let's cook at home instead of eating out.", alt: "[外|そと] で [食|た]べ{ないで}、 [家|いえ] で [作|つく]りましょう。" },
          { jp: "[電話|でんわ] し{ないで}、 メール を [送|おく]りました。", en: "I sent an email instead of phoning.", alt: "[電話|でんわ] し{ないで}、 メール を [送|おく]った。" },
          { jp: "[映画|えいが] を [見|み]{ないで}、 [家|いえ] で [本|ほん] を [読|よ]みました。", en: "I read a book at home instead of going to see a film.", alt: "[映画|えいが] を [見|み]{ないで}、 [家|いえ] で [本|ほん] を [読|よ]んだ。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[砂糖|さとう] を [入|い]れ{ないで} コーヒー を [飲|の]みます。", en: "I drink my coffee without sugar." },
        b: { jp: "[砂糖|さとう] が {なくて}、 [困|こま]りました。", en: "There was no sugar, so I was stuck." },
        diff: "ないで + a verb says how you do something (without sugar). なくて gives the reason for what follows: not having it caused the problem.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Without is ないで, not なくて",
        text: "✗ [宿題|しゅくだい]をしなくて[学校|がっこう]に[行|い]った (meaning “I went to school without doing my homework”) ✓ [宿題|しゅくだい]をしないで[学校|がっこう]に[行|い]った. “Without” and “instead of” take ないで; なくて links a cause to its result.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[疲|つか]れてる ね。", en: "You look tired." },
          { speaker: "Kenta", jp: "うん、 [昨日|きのう] [寝|ね]{ないで} [勉強|べんきょう] した ん だ。", en: "Yeah, I stayed up all night studying." },
          { speaker: "Aya", jp: "[寝|ね]{ないで} [勉強|べんきょう] して も、 [覚|おぼ]えられない よ。", en: "If you study without sleeping, you won't remember any of it." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ないで, casual, without: “I came without a coat” (use [着|き]る): コートを＿[来|き]た。",
            answers: ["[着|き]ないで"],
            explanation: "[着|き]る → [着|き]ない → [着|き]ないで.",
          },
          {
            prompt: "With ないで, instead of: “I made a packed lunch at home instead of buying one” (use [買|か]う): お[弁当|べんとう]を＿、[家|いえ]で[作|つく]りました。",
            answers: ["[買|か]わないで"],
            explanation: "[買|か]う → [買|か]わない → [買|か]わないで.",
          },
          {
            prompt: "With ないで, without: “Please answer without looking at your notes” (use [見|み]る): ノートを＿[答|こた]えてください。",
            answers: ["[見|み]ないで"],
            explanation: "[見|み]る → [見|み]ない → [見|み]ないで.",
          },
          {
            prompt: "ないで or なくて: “I didn't have any money, so I couldn't buy it”: お[金|かね]が＿、[買|か]えなかった。",
            answers: ["なくて"],
            explanation: "A reason takes なくて: お[金|かね]がなくて、[買|か]えなかった.",
          },
          {
            prompt: "Fix it, keeping ないで (meaning “without locking it”): [鍵|かぎ]をかけなくて[出|で]かけてしまった。",
            answers: ["[鍵|かぎ] を かけないで [出|で]かけて しまった。", "[鍵|かぎ] を かけないで [出|で]かけちゃった。"],
            explanation: "“Without” takes ないで: かけないで.",
          },
        ],
      },
    ],
  },
  {
    slug: "koto-ga-aru",
    title: "Sometimes: ことがある",
    mark: "ことがある",
    summary: "Say something happens now and then, and tell it apart from たことがある (have ever).",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (koto ga aru); Bunpro, “ことがある”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "JLPT Sensei lists ことがある (sometimes) at N4."),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **ことがある** says something happens now and then: “sometimes …”, “there are times when …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past + ことがある", "[遅|おく]れる こと が ある"],
          ["Verb ない form + ことがある", "[来|こ]ない こと が ある"],
          ["Softer: こともある", "[遅|おく]れる こと も ある"],
          ["Have ever: た form + ことがある", "[遅|おく]れた こと が ある"],
        ],
      },
      {
        type: "text",
        text: "It's about how often: not usually, but it does happen, so it often comes as the exception to what normally happens. こともある (も, also) is softer: “it can happen too”. After the た form the same words mean something else, an experience: [遅|おく]れたことがある is “I've been late (at some point)”.",
      },
      { type: "link", href: "/learn/n5-essentials/ta-koto-ga-aru", label: "たことがある", text: "Have you ever …?" },
      {
        type: "examples",
        items: [
          { jp: "[朝|あさ] は [電車|でんしゃ] が [遅|おく]れる {こと が あります}。", en: "The trains are sometimes late in the morning.", alt: "[朝|あさ] は [電車|でんしゃ] が [遅|おく]れる {こと が ある}。" },
          { jp: "[忙|いそが]しい とき は、 [昼|ひる]ご[飯|はん] を [食|た]べない {こと が ある}。", en: "When I'm busy, I sometimes skip lunch.", alt: "[忙|いそが]しい とき は、 [昼|ひる]ご[飯|はん] を [食|た]べない {こと が あります}。" },
          { jp: "[父|ちち] は [日曜日|にちようび] も [会社|かいしゃ] に [行|い]く {こと が あります}。", en: "My father sometimes goes to work on Sundays too.", alt: "[父|ちち] は [日曜日|にちようび] も [会社|かいしゃ] に [行|い]く {こと が ある}。" },
          { jp: "[東京|とうきょう] で も [冬|ふゆ] に [雪|ゆき] が [降|ふ]る {こと が ある} よ。", en: "It does sometimes snow in Tokyo in winter.", alt: "[東京|とうきょう] で も [冬|ふゆ] に [雪|ゆき] が [降|ふ]る {こと が あります} よ。" },
          { jp: "[母|はは] と は、 [電話|でんわ] で [二時間|にじかん] [話|はな]す {こと も ある}。", en: "My mum and I sometimes even talk on the phone for two hours.", alt: "[母|はは] と は、 [電話|でんわ] で [二時間|にじかん] [話|はな]す {こと も あります}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[会議|かいぎ] に [遅|おく]れる {こと が あります}。", en: "I'm sometimes late for meetings." },
        b: { jp: "[会議|かいぎ] に [遅|おく]れた {こと が あります}。", en: "I've been late for a meeting before." },
        diff: "With the non-past, it happens from time to time. With the た form, it has happened, at least once.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Sometimes keeps the non-past",
        text: "✗ [朝|あさ]ご[飯|はん]を[食|た]べなかったことがあります (meaning “I sometimes skip breakfast”) ✓ [朝|あさ]ご[飯|はん]を[食|た]べないことがあります. For “sometimes” the verb stays in the non-past; the た form turns it into an experience (“there's been a time when I skipped breakfast”).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "いつも [自転車|じてんしゃ] で [来|く]る の？", en: "Do you always come by bike?" },
          { speaker: "Kenta", jp: "うん。 でも、 [雨|あめ] の [日|ひ] は バス で [来|く]る {こと も ある} よ。", en: "Yes. But on rainy days I sometimes get the bus." },
          { speaker: "Aya", jp: "[私|わたし] は、 [朝|あさ] [急|いそ]ぐ とき は タクシー に [乗|の]る {こと が ある}。", en: "When I'm in a rush in the morning, I sometimes take a taxi." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, sometimes: “This shop is sometimes closed on Mondays” (use [休|やす]む): この[店|みせ]は[月曜日|げつようび]に＿。",
            answers: ["[休|やす]む こと が あります", "[休|やす]む こと も あります"],
            explanation: "The non-past + ことがあります (or the softer こともあります).",
          },
          {
            prompt: "Casual, sometimes: “I sometimes cry at films” (use [泣|な]く): [映画|えいが]を[見|み]て＿。",
            answers: ["[泣|な]く こと が ある", "[泣|な]く こと も ある", "[泣|な]く こと ある"],
            explanation: "The non-past + ことがある (or こともある).",
          },
          {
            prompt: "Casual, an experience: “I've worked in a hotel before” (use [働|はたら]く): ホテルで＿。",
            answers: ["[働|はたら]いた こと が ある", "[働|はたら]いた こと ある"],
            explanation: "An experience takes the た form: [働|はたら]いたことがある.",
          },
          {
            prompt: "Polite, sometimes not: “Sometimes my brother doesn't come home at night” (use [帰|かえ]る): [兄|あに]は[夜|よる]、[家|いえ]に＿。",
            answers: ["[帰|かえ]らない こと が あります", "[帰|かえ]らない こと も あります"],
            explanation: "The ない form + ことがあります.",
          },
          {
            prompt: "Fix it (meaning “sometimes”): [週末|しゅうまつ]は[友達|ともだち]と[山|やま]に[登|のぼ]ったことがあります。",
            answers: [
              "[週末|しゅうまつ] は [友達|ともだち] と [山|やま] に [登|のぼ]る こと が あります。",
              "[週末|しゅうまつ] は [友達|ともだち] と [山|やま] に [登|のぼ]る こと も あります。",
            ],
            explanation: "“Sometimes” keeps the non-past: [登|のぼ]ることがあります.",
          },
        ],
      },
    ],
  },
  {
    slug: "hajimeru",
    title: "Start, finish, keep on, burst out: verb stem + はじめる, おわる, つづける, だす",
    mark: "〜[始|はじ]める",
    summary: "Join a verb stem to はじめる, おわる, つづける or だす to say which part of an action you mean.",
    source: "Bunpro, “はじめる”, “おわる”, “つづける” and “だす”; JLPT Sensei, “始める”, “終わる”, “続ける” and “出す”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A verb stem + **[始|はじ]める** (start), **[終|お]わる** (finish), **[続|つづ]ける** (keep on) or **[出|だ]す** (suddenly start) makes one compound verb that says which part of the action you mean.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Ending", "Meaning", "Example"],
        rows: [
          ["[始|はじ]める", "start …ing", "[読|よ]み[始|はじ]める"],
          ["[終|お]わる", "finish …ing", "[読|よ]み[終|お]わる"],
          ["[続|つづ]ける", "keep on …ing", "[読|よ]み[続|つづ]ける"],
          ["[出|だ]す", "suddenly start, burst out", "[泣|な]き[出|だ]す"],
        ],
      },
      {
        type: "text",
        text: "The stem is the ます form without ます, and the compound is one verb, written in kanji as one word. It conjugates as its last part does: [始|はじ]める and [続|つづ]ける are る-verbs, [終|お]わる and [出|だ]す are う-verbs. A する verb keeps its noun apart: [勉強|べんきょう]し[始|はじ]める. [出|だ]す is for a start that's sudden or that you didn't expect (crying, laughing, running off); [始|はじ]める just says it started. [終|お]わる goes with actions that have an end: reading a book, eating a meal, writing a report.",
      },
      { type: "heading", text: "[始|はじ]める: start" },
      {
        type: "examples",
        items: [
          { jp: "[三年|さんねん] [前|まえ] に [日本語|にほんご] を [勉強|べんきょう] し{[始|はじ]めました}。", en: "I started studying Japanese three years ago.", alt: "[三年|さんねん] [前|まえ] に [日本語|にほんご] を [勉強|べんきょう] し{[始|はじ]めた}。" },
          { jp: "[先月|せんげつ] から ピアノ を [習|なら]い{[始|はじ]めた}。", en: "I started learning the piano last month.", alt: "[先月|せんげつ] から ピアノ を [習|なら]い{[始|はじ]めました}。" },
          { jp: "[子供|こども] が [歩|ある]き{[始|はじ]めました}。", en: "Our little one has started walking.", alt: "[子供|こども] が [歩|ある]き{[始|はじ]めた}。" },
          { jp: "この [本|ほん]、 [昨日|きのう] [読|よ]み{[始|はじ]めた} ん だ けど、 [面白|おもしろ]い よ。", en: "I started this book yesterday, and it's good.", alt: "この [本|ほん]、 [昨日|きのう] [読|よ]み{[始|はじ]めた} ん です けど、 [面白|おもしろ]い です よ。" },
        ],
      },
      { type: "heading", text: "[終|お]わる: finish" },
      {
        type: "examples",
        items: [
          { jp: "[宿題|しゅくだい] を やり{[終|お]わったら}、 [遊|あそ]び に [行|い]こう。", en: "Once you've finished your homework, let's go out.", alt: "[宿題|しゅくだい] を やり{[終|お]わったら}、 [遊|あそ]び に [行|い]きましょう。" },
          { jp: "みんな が [食|た]べ{[終|お]わる} まで、 [待|ま]って ください。", en: "Please wait until everyone has finished eating.", alt: "みんな が [食|た]べ{[終|お]わる} まで、 [待|ま]って ね。" },
          { jp: "レポート を [書|か]き{[終|お]わった} の は [夜中|よなか] の [二時|にじ] だった。", en: "It was two in the morning by the time I finished writing the report.", alt: "レポート を [書|か]き{[終|お]わった} の は [夜中|よなか] の [二時|にじ] でした。" },
          { jp: "[映画|えいが] を [見|み]{[終|お]わって} から、 [晩|ばん]ご[飯|はん] を [食|た]べました。", en: "After we'd finished watching the film, we had dinner.", alt: "[映画|えいが] を [見|み]{[終|お]わって} から、 [晩|ばん]ご[飯|はん] を [食|た]べた。" },
        ],
      },
      { type: "heading", text: "[続|つづ]ける: keep on" },
      {
        type: "examples",
        items: [
          { jp: "[三時間|さんじかん] [歩|ある]き{[続|つづ]けて}、 [足|あし] が [痛|いた]く なった。", en: "After three hours of walking non-stop, my feet started to hurt.", alt: "[三時間|さんじかん] [歩|ある]き{[続|つづ]けて}、 [足|あし] が [痛|いた]く なりました。" },
          { jp: "[彼|かれ] は [十年|じゅうねん] [同|おな]じ [会社|かいしゃ] で [働|はたら]き{[続|つづ]けて} います。", en: "He's been working at the same company for ten years.", alt: "[彼|かれ] は [十年|じゅうねん] [同|おな]じ [会社|かいしゃ] で [働|はたら]き{[続|つづ]けて} いる。" },
          { jp: "[分|わ]からなくて も、 [聞|き]き{[続|つづ]けて} ください。", en: "Even if you don't understand, keep listening.", alt: "[分|わ]からなくて も、 [聞|き]き{[続|つづ]けて}。" },
          { jp: "[彼女|かのじょ] は [一時間|いちじかん] も [話|はな]し{[続|つづ]けた}。", en: "She kept talking for a whole hour.", alt: "[彼女|かのじょ] は [一時間|いちじかん] も [話|はな]し{[続|つづ]けました}。" },
        ],
      },
      { type: "heading", text: "[出|だ]す: suddenly start" },
      {
        type: "examples",
        items: [
          { jp: "[子供|こども] が [急|きゅう] に [泣|な]き{[出|だ]した}。", en: "The child suddenly burst into tears.", alt: "[子供|こども] が [急|きゅう] に [泣|な]き{[出|だ]しました}。" },
          { jp: "その [話|はなし] を [聞|き]いて、 みんな [笑|わら]い{[出|だ]しました}。", en: "When they heard that, everyone burst out laughing.", alt: "その [話|はなし] を [聞|き]いて、 みんな [笑|わら]い{[出|だ]した}。" },
          { jp: "[音楽|おんがく] が [始|はじ]まる と、 [子供|こども]たち が [歌|うた]い{[出|だ]しました}。", en: "When the music started, the children burst into song.", alt: "[音楽|おんがく] が [始|はじ]まる と、 [子供|こども]たち が [歌|うた]い{[出|だ]した}。" },
          { jp: "[犬|いぬ] が [急|きゅう] に [走|はし]り{[出|だ]した}。", en: "The dog suddenly broke into a run.", alt: "[犬|いぬ] が [急|きゅう] に [走|はし]り{[出|だ]しました}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] が [降|ふ]り{[始|はじ]めました}。", en: "It's started to rain." },
        b: { jp: "[雨|あめ] が [降|ふ]り{[出|だ]しました}。", en: "It's suddenly started to rain." },
        diff: "[始|はじ]める just says it started. [出|だ]す adds that it was sudden, or came without warning.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The stem, and はじめる",
        text: "✗ [読|よ]む[始|はじ]めます ✓ [読|よ]み[始|はじ]めます. These verbs follow the stem (the ます form without ます), not the dictionary form. And the ending is [始|はじ]める, not [始|はじ]まる: ✗ [読|よ]み[始|はじ]まる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "その [本|ほん]、 もう [読|よ]み{[終|お]わった}？", en: "Have you finished that book yet?" },
          { speaker: "Aya", jp: "まだ。 でも [面白|おもしろ]くて、 [昨日|きのう] は [夜中|よなか] まで [読|よ]み{[続|つづ]けた}。", en: "Not yet. But it's so good I kept reading till the middle of the night." },
          { speaker: "Kenta", jp: "[読|よ]み{[終|お]わったら}、 [貸|か]して。", en: "Lend it to me when you've finished." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite past, with [始|はじ]める: “I started working here in April” (use [働|はたら]く): [四月|しがつ]からここで＿。",
            answers: ["[働|はたら]き[始|はじ]めました"],
            explanation: "The stem [働|はたら]き + [始|はじ]めました.",
          },
          {
            prompt: "Casual, with [終|お]わる: “Have you finished using the computer?” (use [使|つか]う): パソコン、もう＿？",
            answers: ["[使|つか]い[終|お]わった"],
            explanation: "The stem [使|つか]い + [終|お]わった.",
          },
          {
            prompt: "Polite past, with [続|つづ]ける: “I kept on waiting for two hours” (use [待|ま]つ): [二時間|にじかん]＿。",
            answers: ["[待|ま]ち[続|つづ]けました"],
            explanation: "The stem [待|ま]ち + [続|つづ]けました.",
          },
          {
            prompt: "Casual past, with [出|だ]す: “My father suddenly got angry” (use [怒|おこ]る): [父|ちち]が[急|きゅう]に＿。",
            answers: ["[怒|おこ]り[出|だ]した"],
            explanation: "Sudden, so [出|だ]す: the stem [怒|おこ]り + [出|だ]した.",
          },
          {
            prompt: "Fix it: ご[飯|はん]を[作|つく]る[始|はじ]めました。",
            answers: ["ご[飯|はん] を [作|つく]り[始|はじ]めました。"],
            explanation: "[始|はじ]める takes the stem: [作|つく]り[始|はじ]めました.",
          },
        ],
      },
    ],
  },
];
