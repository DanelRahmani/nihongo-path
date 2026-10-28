import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n3Reasons: Lesson[] = [
  {
    slug: "tame-ni",
    title: "In order to, and because of: ために",
    mark: "ために",
    summary: "Say what you do something for, and, more formally, what caused something.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (tame (ni)); Bunpro, “ため(に)”, “ために” and “そのため(に)”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "After a plain non-past verb or Noun + の, **ために** says what you do something for (“in order to”, “for the sake of”); after a past or a state, it says what caused something (“because of”, rather formal).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Sense", "Before it", "Example"],
        rows: [
          ["Purpose", "Verb, plain non-past", "[留学|りゅうがく] する ため に"],
          ["Purpose", "Noun + の", "[家族|かぞく] の ため に"],
          ["Cause", "Verb, plain past · a state (ある, ている)", "[事故|じこ] が あった ため に"],
          ["Cause", "い-adjective · な-adjective + な", "[寒|さむ]い ため に · [不便|ふべん] な ため に"],
          ["Cause", "Noun + の", "[雪|ゆき] の ため に"],
        ],
      },
      {
        type: "text",
        text: "ため is a noun, written in kana, so it takes の after a noun, as はず does. The に is often dropped: ために and ため mean the same. For a purpose, it's usually the same person who does both halves, and the verb before ために is usually something they choose to do; when the subjects differ, it must still be something somebody chooses to do. A result you can't simply choose ([話|はな]せる, [分|わ]かる) or something someone else is to do takes ように (its own lesson). Noun + のために also means “for the good of”: [家族|かぞく]のために (for my family). Ending a sentence, it becomes ためだ: [健康|けんこう]のためです (it's for my health).",
      },
      {
        type: "text",
        text: "For a cause, ために is formal: the news, announcements, notices and writing. In conversation people say から or ので. After a past verb, a state (ある, いる, ている) or an adjective, ために gives a cause; after a non-past verb of action, a purpose. A cause is not followed by a request, a command, an invitation or your own wish: for those, use ので or から.",
      },
      { type: "link", href: "/learn/n4-plans/you-ni", label: "So that: ように", text: "For a result you can't simply choose." },
      { type: "heading", text: "ために: in order to, for" },
      {
        type: "examples",
        items: [
          {
            jp: "[日本|にほん] の [大学|だいがく] に [入|はい]る {ため に}、 [毎日|まいにち] [勉強|べんきょう] して います。",
            en: "I study every day to get into a Japanese university.",
            alt: "[日本|にほん] の [大学|だいがく] に [入|はい]る {ため に}、 [毎日|まいにち] [勉強|べんきょう] してる。",
          },
          {
            jp: "[新|あたら]しい [車|くるま] を [買|か]う {ため に}、 [貯金|ちょきん] して います。",
            en: "I'm saving up to buy a new car.",
            alt: "[新|あたら]しい [車|くるま] を [買|か]う {ため に}、 [貯金|ちょきん] してる。",
          },
          {
            jp: "[父|ちち] は [家族|かぞく] の {ため に} [遅|おそ]く まで [働|はたら]いて います。",
            en: "My father works late for his family's sake.",
            note: "Noun + のために: for the good of someone.",
          },
          { jp: "[健康|けんこう] の {ため に}、 [毎朝|まいあさ] [走|はし]って います。", en: "I run every morning for my health." },
          {
            jp: "[何|なん] の {ため に} [日本語|にほんご] を [勉強|べんきょう] して いる の？",
            en: "What are you learning Japanese for?",
            alt: "[何|なん] の {ため に} [日本語|にほんご] を [勉強|べんきょう] して いる ん です か？",
          },
        ],
      },
      { type: "heading", text: "ために: because of (formal)" },
      {
        type: "examples",
        items: [
          { jp: "[大雪|おおゆき] の {ため に}、 [電車|でんしゃ] が [止|と]まって います。", en: "Due to the heavy snow, trains are not running." },
          { jp: "[事故|じこ] が あった {ため に}、 [道|みち] が [混|こ]んで います。", en: "There's been an accident, and as a result the roads are congested." },
          {
            jp: "[台風|たいふう] の {ため}、 [明日|あした] の [試合|しあい] は [中止|ちゅうし] に なりました。",
            en: "Owing to the typhoon, tomorrow's match has been cancelled.",
            note: "Without the に: notices and the news often say just ため.",
          },
          { jp: "[町|まち] の [人口|じんこう] が [増|ふ]えた {ため に}、 [新|あたら]しい [学校|がっこう] が できました。", en: "As the town's population grew, a new school was built." },
        ],
      },
      { type: "heading", text: "そのため(に): for that reason, to that end" },
      {
        type: "examples",
        items: [
          {
            jp: "[昨日|きのう] は [大雨|おおあめ] でした。 {その ため}、 [多|おお]く の [電車|でんしゃ] が [遅|おく]れました。",
            en: "There was heavy rain yesterday. Because of that, many trains ran late.",
          },
          {
            jp: "[兄|あに] は [先生|せんせい] に なりたい ん です。 {その ため に}、 [毎晩|まいばん] [遅|おそ]く まで [勉強|べんきょう] して います。",
            en: "My brother wants to be a teacher. To that end, he studies late every night.",
            note: "そのために can point back to a goal (to that end) as well as a cause.",
          },
          {
            jp: "この [町|まち] は [駅|えき] から [遠|とお]い です。 {その ため}、 [車|くるま] が ない と [不便|ふべん] です。",
            en: "This town is a long way from the station. For that reason, it's hard to get by without a car.",
          },
          {
            jp: "[私|わたし] は [日本|にほん] で [働|はたら]きたい です。 {その ため に}、 [日本語|にほんご] を [勉強|べんきょう] して います。",
            en: "I want to work in Japan. To that end, I'm studying Japanese.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[早|はや]く [着|つ]く {ため に}、 タクシー に [乗|の]りました。", en: "I took a taxi so as to get there early." },
        b: { jp: "[早|はや]く [着|つ]いた {ため に}、 [一時間|いちじかん] [待|ま]ちました。", en: "Because I got there early, I had an hour's wait." },
        diff: "Before ために, a non-past verb you choose to do ([着|つ]く) is the aim; a past ([着|つ]いた) is the cause. The tense tells you which ために it is.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ために needs a verb you can choose to do",
        text: "✗ [日本語|にほんご]が[話|はな]せるために[練習|れんしゅう]します ✓ [日本語|にほんご]が[話|はな]せるように[練習|れんしゅう]します. A potential ([話|はな]せる) or a verb of what happens ([分|わ]かる, [聞|き]こえる) takes ように. With ために, name the action itself: [日本語|にほんご]を[話|はな]すために (in order to speak Japanese). And a cause ために can't lead into a request: ✗ [雨|あめ]のために、[早|はや]く[帰|かえ]ってください ✓ [雨|あめ]ですから、[早|はや]く[帰|かえ]ってください.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[最近|さいきん]、 [週末|しゅうまつ] も アルバイト してる ね。", en: "You're working at weekends too these days." },
          { speaker: "Kenta", jp: "うん。 [夏休|なつやす]み の [旅行|りょこう] の {ため に}、 [貯金|ちょきん] してる ん だ。", en: "Yeah. I'm saving up for a trip in the summer holidays." },
          { speaker: "Aya", jp: "いい ね！ どこ に [行|い]く の？", en: "Nice! Where are you going?" },
          { speaker: "Kenta", jp: "[京都|きょうと]。 [友達|ともだち] と [行|い]く ん だ。", en: "Kyoto. I'm going with a friend." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "Notices give the cause with ため and no に: [雨|あめ]のため[中止|ちゅうし] (cancelled because of rain).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ために: “I went to the airport to meet my friend” (use [迎|むか]える): [友達|ともだち]を＿、[空港|くうこう]へ[行|い]きました。",
            answers: ["[迎|むか]える ため に", "[迎|むか]える ため"],
            explanation: "Meeting your friend is the aim, and you choose to do it: [迎|むか]えるために (or just ため).",
          },
          {
            prompt: "With ために, after a noun: “I'm learning English for my work”: [仕事|しごと]＿、[英語|えいご]を[習|なら]っています。",
            answers: ["の ため に", "の ため"],
            explanation: "ため is a noun, so a noun takes の before it: [仕事|しごと]のために.",
          },
          {
            prompt: "Formal, with ために: “The plane didn't fly because of the strong wind”: [強|つよ]い[風|かぜ]＿、[飛行機|ひこうき]が[飛|と]びませんでした。",
            answers: ["の ため に", "の ため"],
            explanation: "A cause, after a noun: [風|かぜ]のために. The news would say exactly this; in conversation, [風|かぜ]で or [風|かぜ]が[強|つよ]かったから.",
          },
          {
            prompt: "With ために, a cause (use [暑|あつ]い): “I couldn't sleep because the room was hot”: [部屋|へや]が＿、[眠|ねむ]れませんでした。",
            answers: ["[暑|あつ]かった ため に", "[暑|あつ]かった ため", "[暑|あつ]い ため に", "[暑|あつ]い ため"],
            explanation: "An adjective before ために gives a cause: [暑|あつ]かったために, or [暑|あつ]いために for the state.",
          },
          {
            prompt: "Fix it, keeping [読|よ]める: [漢字|かんじ]が[読|よ]めるために、[毎日|まいにち][練習|れんしゅう]しています。",
            answers: [
              "[漢字|かんじ] が [読|よ]める よう に、 [毎日|まいにち] [練習|れんしゅう] して います。",
              "[漢字|かんじ] が [読|よ]める よう に、 [毎日|まいにち] [練習|れんしゅう] を して います。",
              "[漢字|かんじ] が [読|よ]める よう に、 [毎日|まいにち] [練習|れんしゅう] してます。",
              "[漢字|かんじ] が [読|よ]める よう に、 [毎日|まいにち] [練習|れんしゅう] を してます。",
              "[漢字|かんじ] が [読|よ]める よう に なる ため に、 [毎日|まいにち] [練習|れんしゅう] して います。",
              "[漢字|かんじ] が [読|よ]める よう に なる ため に、 [毎日|まいにち] [練習|れんしゅう] を して います。",
              "[漢字|かんじ] が [読|よ]める よう に なる ため に、 [毎日|まいにち] [練習|れんしゅう] してます。",
              "[漢字|かんじ] が [読|よ]める よう に なる ため に、 [毎日|まいにち] [練習|れんしゅう] を してます。",
            ],
            explanation: "Being able to read is a result, not an action you choose: [読|よ]めるように. Or make the aim an action: [読|よ]めるようになるために (in order to come to read them).",
          },
        ],
      },
    ],
  },
  {
    slug: "you-ni-iu",
    title: "Told to, asked to: ように for requests passed on",
    mark: "ように[言|い]う",
    summary: "Pass on a request, an order or a warning: “told me to”, “asked him not to”.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (yoo ni); Bunpro, “ようにいう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists ように at N3, this “tell someone to” use included; Bunpro has ようにいう at N4."),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb or a ない form + **ように** + [言|い]う, [頼|たの]む, [注意|ちゅうい]する or [伝|つた]える reports what someone was told or asked to do: “told me to …”, “asked him not to …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past", "[早|はや]く [来|く]る よう に [言|い]う"],
          ["Verb ない form", "[遅|おく]れない よう に [言|い]う"],
          ["Then [言|い]う · [頼|たの]む · [注意|ちゅうい]する · [伝|つた]える", "[休|やす]む よう に [頼|たの]む"],
          ["Passive: be told to", "[待|ま]つ よう に [言|い]われる"],
        ],
      },
      {
        type: "text",
        text: "The person told takes に: [学生|がくせい]に[待|ま]つように[言|い]う. ように gives the gist of a request in your own words, with a plain verb; the words themselves go in 「」 with と: 「[待|ま]ってください」と[言|い]われた. ように[言|い]われた (I was told to) is the usual way to say what a doctor, a teacher or your boss told you to do. [注意|ちゅうい]する is “warn”, “tell off”; ように[伝|つた]えてください asks someone to pass a message on. It's the ように of “so that” (its own lesson), now naming what someone should do.",
      },
      { type: "heading", text: "ように[言|い]う · [頼|たの]む: told to, asked to" },
      {
        type: "examples",
        items: [
          {
            jp: "[医者|いしゃ] に お[酒|さけ] を [飲|の]まない {よう に} [言|い]われました。",
            en: "The doctor told me not to drink alcohol.",
            alt: "[医者|いしゃ] に お[酒|さけ] を [飲|の]まない {よう に} [言|い]われた。",
          },
          {
            jp: "[先生|せんせい] は [学生|がくせい]たち に [静|しず]か に する {よう に} [言|い]いました。",
            en: "The teacher told the students to be quiet.",
            alt: "[先生|せんせい] は [学生|がくせい]たち に [静|しず]か に する {よう に} [言|い]った。",
          },
          {
            jp: "[母|はは] に [牛乳|ぎゅうにゅう] を [買|か]って くる {よう に} [頼|たの]まれた。",
            en: "My mum asked me to pick up some milk.",
            alt: "[母|はは] に [牛乳|ぎゅうにゅう] を [買|か]って くる {よう に} [頼|たの]まれました。",
          },
          {
            jp: "[部長|ぶちょう] に [明日|あした] まで に [資料|しりょう] を [送|おく]る {よう に} [言|い]われて います。",
            en: "My manager has told me to send the documents by tomorrow.",
          },
        ],
      },
      { type: "heading", text: "[注意|ちゅうい]する · [伝|つた]える: warned to, pass on" },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん に [電話|でんわ] を くれる {よう に} [伝|つた]えて ください。",
            en: "Please ask Tanaka-san to give me a call.",
            alt: "[田中|たなか]-さん に [電話|でんわ] くれる {よう に} [伝|つた]えて。",
          },
          {
            jp: "[先生|せんせい] に [字|じ] を もっと きれい に [書|か]く {よう に} [注意|ちゅうい] されました。",
            en: "My teacher had a word with me about writing more neatly.",
            alt: "[先生|せんせい] に [字|じ] を もっと きれい に [書|か]く {よう に} [注意|ちゅうい] された。",
          },
          { jp: "[子供|こども]たち に [道|みち] で [遊|あそ]ばない {よう に} [注意|ちゅうい] しました。", en: "I warned the children not to play in the street." },
          {
            jp: "[友達|ともだち] に [写真|しゃしん] を [送|おく]って くれる {よう に} [頼|たの]みました。",
            en: "I asked my friend to send me the photos.",
            alt: "[友達|ともだち] に [写真|しゃしん] を [送|おく]って くれる {よう に} [頼|たの]んだ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[医者|いしゃ] に 「[毎日|まいにち] [歩|ある]いて {ください}」 と [言|い]われました。", en: "The doctor said to me, “Please walk every day.”" },
        b: { jp: "[医者|いしゃ] に [毎日|まいにち] [歩|ある]く {よう に} [言|い]われました。", en: "The doctor told me to walk every day." },
        diff: "「」と quotes the doctor's own words, ください and all. ように passes on what you were told to do, with the plain verb.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No ください before ように",
        text: "✗ [母|はは]に[早|はや]く[寝|ね]てくださいように[言|い]われた ✓ [母|はは]に[早|はや]く[寝|ね]るように[言|い]われた. ように takes the plain verb (or the ない form), never a request form; ください belongs only inside a quote: 「[早|はや]く[寝|ね]てください」と[言|い]われた.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[山田|やまだ]-さん、 [部長|ぶちょう] が [呼|よ]んで います よ。", en: "Yamada-san, the manager is asking for you." },
          { speaker: "Ms Yamada", jp: "え、 [何|なん] でしょう か？", en: "Oh, what about?" },
          { speaker: "Mr Mori", jp: "[会議|かいぎ] の [前|まえ] に [部屋|へや] に [来|く]る {よう に} [言|い]って いました。", en: "He said to come to his office before the meeting." },
          { speaker: "Ms Yamada", jp: "わかりました。 すぐ [行|い]きます。", en: "Right. I'll go straight away." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ように: “The teacher told us to bring a dictionary” (use [持|も]ってくる): [先生|せんせい]は[辞書|じしょ]を＿[言|い]いました。",
            answers: ["[持|も]って くる よう に"],
            explanation: "The plain verb + ように, then [言|い]う: [持|も]ってくるように[言|い]いました.",
          },
          {
            prompt: "Casual, with ように and the passive of [言|い]う: “My dad told me not to come home late” (use [帰|かえ]る): [父|ちち]に[夜|よる][遅|おそ]く＿。",
            answers: ["[帰|かえ]らない よう に [言|い]われた", "[帰|かえ]って こない よう に [言|い]われた"],
            explanation: "The ない form + ように, then [言|い]われた (I was told): [帰|かえ]らないように[言|い]われた.",
          },
          {
            prompt: "Polite, with ように and [頼|たの]む: “I asked my sister to clean the room” (use [掃除|そうじ]する): [妹|いもうと]に[部屋|へや]を＿。",
            answers: ["[掃除|そうじ] する よう に [頼|たの]みました", "[掃除|そうじ] して くれる よう に [頼|たの]みました"],
            explanation: "[掃除|そうじ]するように[頼|たの]みました; with くれる, it's a favour to you: [掃除|そうじ]してくれるように.",
          },
          {
            prompt: "Polite, with ように and [伝|つた]えてください: “Please tell Kimura-san not to worry” (use [心配|しんぱい]する): [木村|きむら]-さんに＿。",
            answers: ["[心配|しんぱい] しない よう に [伝|つた]えて ください"],
            explanation: "The ない form + ように, then [伝|つた]えてください: pass the message on.",
          },
          {
            prompt: "Fix it: [先生|せんせい]に[宿題|しゅくだい]を[出|だ]してくださいように[言|い]われました。",
            answers: [
              "[先生|せんせい] に [宿題|しゅくだい] を [出|だ]す よう に [言|い]われました。",
              "[先生|せんせい] に 「[宿題|しゅくだい] を [出|だ]して ください」 と [言|い]われました。",
            ],
            explanation: "ように takes the plain verb: [出|だ]すように[言|い]われました. To keep ください, quote the words with と: 「[宿題|しゅくだい]を[出|だ]してください」と[言|い]われました.",
          },
        ],
      },
    ],
  },
  {
    slug: "okage-sei",
    title: "Thanks to, and it's the fault of: おかげで and せいで",
    mark: "おかげ・せい",
    summary: "Give the credit for a good result, or the blame for a bad one.",
    source: "Bunpro, “おかげで” and “せいで”; JLPT Sensei, “おかげで” and “せいで”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**おかげで** credits something for a good result (“thanks to”); **せいで** blames it for a bad one (“because of”, “it's … fault”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Thanks to", "It's the fault of"],
        rows: [
          ["Noun + の", "[先生|せんせい] の おかげ で", "[雨|あめ] の せい で"],
          ["Verb, plain form", "[手伝|てつだ]って くれた おかげ で", "[寝坊|ねぼう] した せい で"],
          ["い-adjective", "[近|ちか]い おかげ で", "[狭|せま]い せい で"],
          ["な-adjective + な", "[静|しず]か な おかげ で", "[下手|へた] な せい で"],
        ],
      },
      {
        type: "text",
        text: "おかげ and せい are nouns, written in kana, so they take の and な like はず. Both can end the sentence with だ: [君|きみ]のおかげだ (it's thanks to you), [私|わたし]のせいです (it's my fault). ため (its own lesson) gives a cause without credit or blame. Said with a sigh, おかげで turns ironic: [雨|あめ]のおかげで、びしょびしょだ (thanks a lot, rain: I'm soaked). Ending a sentence or before a comma, the で can drop: [雨|あめ]のせい (it's the rain's fault); and a せい phrase can stand as the subject: [誰|だれ]のせいでもない (it's nobody's fault).",
      },
      { type: "heading", text: "おかげで: thanks to" },
      {
        type: "examples",
        items: [
          {
            jp: "[先生|せんせい] の {おかげ で}、 [試験|しけん] に [合格|ごうかく] できました。",
            en: "Thanks to my teacher, I passed the exam.",
            alt: "[先生|せんせい] の {おかげ で}、 [試験|しけん] に [合格|ごうかく] できた。",
          },
          {
            jp: "[友達|ともだち] が [手伝|てつだ]って くれた {おかげ で}、 [掃除|そうじ] が [早|はや]く [終|お]わった。",
            en: "Thanks to my friend helping out, the cleaning was done in no time.",
            alt: "[友達|ともだち] が [手伝|てつだ]って くれた {おかげ で}、 [掃除|そうじ] が [早|はや]く [終|お]わりました。",
          },
          {
            jp: "この [薬|くすり] の {おかげ で}、 [熱|ねつ] が [下|さ]がりました。",
            en: "Thanks to this medicine, my temperature has come down.",
            alt: "この [薬|くすり] の {おかげ で}、 [熱|ねつ] が [下|さ]がった。",
          },
          { jp: "[駅|えき] が [近|ちか]い {おかげ で}、 [通勤|つうきん] が [楽|らく] です。", en: "Thanks to the station being close, my commute is easy." },
          { jp: "みなさん の {おかげ です}。 [本当|ほんとう] に ありがとう ございました。", en: "It's all thanks to you. Thank you so much." },
        ],
      },
      { type: "heading", text: "せいで: it's the fault of" },
      {
        type: "examples",
        items: [
          {
            jp: "[雨|あめ] の {せい で}、 [洗濯物|せんたくもの] が [乾|かわ]かない。",
            en: "The washing won't dry, and it's all the rain's fault.",
            alt: "[雨|あめ] の {せい で}、 [洗濯物|せんたくもの] が [乾|かわ]きません。",
          },
          {
            jp: "[寝坊|ねぼう] した {せい で}、 [会議|かいぎ] に [遅|おく]れました。",
            en: "I overslept, and that made me late for the meeting.",
            alt: "[寝坊|ねぼう] した {せい で}、 [会議|かいぎ] に [遅|おく]れた。",
          },
          {
            jp: "[部屋|へや] が [狭|せま]い {せい で}、 [机|つくえ] が [置|お]けない。",
            en: "The room's so small I can't fit a desk in.",
            alt: "[部屋|へや] が [狭|せま]い {せい で}、 [机|つくえ] が [置|お]けません。",
          },
          {
            jp: "[私|わたし] の {せい で}、 [試合|しあい] に [負|ま]けて しまった。",
            en: "We lost the match, and it's my fault.",
            alt: "[私|わたし] の {せい で}、 [試合|しあい] に [負|ま]けて しまいました。",
          },
          {
            jp: "[遅|おく]れた の は [私|わたし] の {せい です}。 すみません。",
            en: "It's my fault we're late. I'm sorry.",
            alt: "[遅|おく]れた の は [私|わたし] の {せい だ}。 ごめん。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[弟|おとうと] が [来|き]た {おかげ で}、 [家|いえ] が にぎやか に なりました。", en: "Thanks to my little brother coming, the house has livened up." },
        b: { jp: "[弟|おとうと] が [来|き]た {せい で}、 [家|いえ] が にぎやか に なりました。", en: "Because my little brother came, the house has got all lively (and I'm not pleased)." },
        diff: "The facts are the same; the feeling isn't. おかげで is pleased (a livelier house is welcome), せいで resentful (the same liveliness is a nuisance someone caused).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Bad news takes せい",
        text: "✗ [風邪|かぜ]のおかげで、[旅行|りょこう]に[行|い]けなかった ✓ [風邪|かぜ]のせいで、[旅行|りょこう]に[行|い]けなかった. おかげで with a bad result sounds sarcastic (“thanks a lot, cold”); for a plain complaint, use せいで. And a noun needs の: ✗ [風邪|かぜ]せいで.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[試験|しけん]、 どう だった？", en: "How did the exam go?" },
          { speaker: "Kenta", jp: "[合格|ごうかく] した よ！ ノート を [貸|か]して くれた {おかげ だ} よ。 ありがとう。", en: "I passed! It's thanks to you lending me your notes. Thanks." },
          { speaker: "Aya", jp: "よかった！ [私|わたし] は [前|まえ] の [日|ひ] に [寝|ね]なかった {せい で}、 [全然|ぜんぜん] だめ だった…", en: "Great! I didn't sleep the night before, so mine was a disaster…" },
        ],
        note: "Kenta credits Aya with おかげだ; Aya blames herself with せいで.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "おかげさまで, with さま, is the polite reply to “How are you?” or “How did it go?”: “thanks to you (all), fine”. It's said even when the listener had no part in it, as a nod to everyone's goodwill: [元気|げんき]です、おかげさまで. It is also the polite reply to a kind enquiry such as お[元気|げんき]ですか.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With おかげで: “Thanks to the map, I didn't get lost”: [地図|ちず]＿、[道|みち]に[迷|まよ]いませんでした。",
            answers: ["の おかげ で"],
            explanation: "A noun takes の before おかげで: [地図|ちず]のおかげで.",
          },
          {
            prompt: "Casual, with せいで: “I couldn't sleep, all because of the noise next door”: [隣|となり]の[部屋|へや]の[音|おと]＿、[眠|ねむ]れなかった。",
            answers: ["の せい で"],
            explanation: "A bad result, and the noise is to blame: [音|おと]のせいで.",
          },
          {
            prompt: "Polite, with せい: “It's all my fault”: [全部|ぜんぶ][私|わたし]の＿。",
            answers: ["せい です", "せい でした", "せい なん です"],
            explanation: "せい ends the sentence with だ, politely です: [私|わたし]のせいです.",
          },
          {
            prompt: "With おかげで: “It went well thanks to your help” (keep [手伝|てつだ]って): [手伝|てつだ]って＿、うまくいきました。",
            answers: ["くれた おかげ で", "もらった おかげ で", "いただいた おかげ で", "くださった おかげ で"],
            explanation: "A verb goes straight before おかげで, here the past of てくれる (or もらう, いただく): [手伝|てつだ]ってくれたおかげで.",
          },
          {
            prompt: "Fix it with せい (it's a complaint): [雪|ゆき]のおかげで、[電車|でんしゃ]が[遅|おく]れて[大変|たいへん]でした。",
            answers: ["[雪|ゆき] の せい で、 [電車|でんしゃ] が [遅|おく]れて [大変|たいへん] でした。"],
            explanation: "Late trains are bad news: [雪|ゆき]のせいで. With おかげで the line sounds sarcastic.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-yotte",
    title: "By, because of, depending on: によって and による",
    mark: "によって",
    summary: "Say who made something, what caused something or how it's done, and what something depends on.",
    source: "Bunpro, “によって・による” and “〜かは〜によって違う”; JLPT Sensei, “によって / による”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **によって** (before a noun, **による**) says what something comes from: who made it (“by”), what caused it, how it's done, or what it changes with (“depending on”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Use", "Example"],
        rows: [
          ["Who made it (passive): Noun + によって", "[少女|しょうじょ] によって [書|か]かれた"],
          ["Cause or means (formal): Noun + によって", "[地震|じしん] によって [壊|こわ]れた"],
          ["Before a noun: Noun + による + Noun", "インターネット による [買|か]い[物|もの]"],
          ["Depending on: Noun + によって[違|ちが]う", "[人|ひと] によって [違|ちが]う"],
        ],
      },
      {
        type: "text",
        text: "In most passives the doer takes に ([母|はは]に[呼|よ]ばれた). For things made, written, built, found or invented, the doer takes によって: [小説|しょうせつ]は…によって[書|か]かれた. For a cause or a means, によって is the formal で of the news, notices and writing. 〜によって[違|ちが]う (or [変|か]わる) says something varies with something else, and a question before it takes か は: [何|なに]を[選|えら]ぶかは[人|ひと]によって[違|ちが]う (what you choose depends on the person). A bare による is the spoken “it depends”: それは[人|ひと]によるよ (that depends on the person).",
      },
      {
        type: "text",
        text: "によると (or によれば), from the lesson on hearsay, is a different pattern: it names where you heard something (“according to”).",
      },
      { type: "link", href: "/learn/n4-seeming/sou-hearsay", label: "I hear: そうだ and によると", text: "によると names the source." },
      { type: "heading", text: "によって: by (who made it)" },
      {
        type: "examples",
        items: [
          {
            jp: "この [小説|しょうせつ] は [十五歳|じゅうごさい] の [少女|しょうじょ] {によって} [書|か]かれた。",
            en: "This novel was written by a fifteen-year-old girl.",
            alt: "この [小説|しょうせつ] は [十五歳|じゅうごさい] の [少女|しょうじょ] {によって} [書|か]かれました。",
          },
          {
            jp: "この [橋|はし] は [百年|ひゃくねん] [前|まえ] に [町|まち] の [人|ひと]たち {によって} [作|つく]られました。",
            en: "This bridge was built a hundred years ago by the people of the town.",
          },
          {
            jp: "この [料理|りょうり] は [昔|むかし]、 [中国|ちゅうごく] から [来|き]た [人|ひと] {によって} [日本|にほん] に [伝|つた]えられました。",
            en: "This dish was brought to Japan long ago by people from China.",
          },
          { jp: "この [星|ほし] は [日本|にほん] の [研究者|けんきゅうしゃ] {によって} [発見|はっけん] されました。", en: "This star was discovered by a Japanese researcher." },
        ],
      },
      { type: "heading", text: "によって · による: because of, by means of (formal)" },
      {
        type: "examples",
        items: [
          { jp: "[地震|じしん] {によって}、 [多|おお]く の [建物|たてもの] が [壊|こわ]れました。", en: "Many buildings were destroyed in the earthquake." },
          { jp: "[雪|ゆき] {による} [電車|でんしゃ] の [遅|おく]れ が [出|で]て います。", en: "Trains are running late because of the snow.", note: "Before a noun, によって becomes による." },
          { jp: "[試験|しけん] の [結果|けっか] は メール {によって} [知|し]らせます。", en: "We'll let you know the exam results by email." },
          { jp: "この [問題|もんだい] は [話|はな]し[合|あ]い {によって} [決|き]まりました。", en: "This matter was settled through discussion." },
          { jp: "インターネット {による} [買|か]い[物|もの] が [増|ふ]えて います。", en: "Shopping over the internet is on the rise." },
        ],
      },
      { type: "heading", text: "によって: depending on" },
      {
        type: "examples",
        items: [
          {
            jp: "[人|ひと] {によって} [考|かんが]え[方|かた] が [違|ちが]います。",
            en: "The way people think differs from person to person.",
            alt: "[人|ひと] {によって} [考|かんが]え[方|かた] が [違|ちが]う。",
          },
          {
            jp: "[国|くに] {によって}、 [食事|しょくじ] の マナー は [全然|ぜんぜん] [違|ちが]う。",
            en: "Table manners are completely different from country to country.",
            alt: "[国|くに] {によって}、 [食事|しょくじ] の マナー は [全然|ぜんぜん] [違|ちが]います。",
          },
          {
            jp: "[天気|てんき] {によって}、 [行|い]く か どう か [決|き]めます。",
            en: "We'll decide whether to go depending on the weather.",
            alt: "[天気|てんき] {によって}、 [行|い]く か どう か [決|き]める。",
          },
          { jp: "いつ [休|やす]める か は [仕事|しごと] {によって} [違|ちが]います。", en: "When you can take time off depends on the job." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] {で} お[祭|まつ]り が [中止|ちゅうし] に なりました。", en: "The festival was cancelled because of the rain." },
        b: { jp: "[雨|あめ] {によって} お[祭|まつ]り が [中止|ちゅうし] に なりました。", en: "The festival was cancelled owing to the rain." },
        diff: "Same meaning, different style: で is everyday speech, によって the formal word of the news and notices.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "によって isn't “according to”",
        text: "✗ [天気予報|てんきよほう]によって、[明日|あした]は[雨|あめ]だそうです ✓ [天気予報|てんきよほう]によると、[明日|あした]は[雨|あめ]だそうです. によると names where you heard something; によって says who made something, what caused it, or what it depends on.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "For whoever makes, writes or finds something, the passive takes によって, not に: [作家|さっか]によって[書|か]かれた[本|ほん] (a book written by an author).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Guest", jp: "すみません、 この [部屋|へや] は いくら です か？", en: "Excuse me, how much is this room?" },
          { speaker: "Receptionist", jp: "[季節|きせつ] {によって} [違|ちが]います が、 [今|いま] は [一万円|いちまんえん] です。", en: "It depends on the season, but at the moment it's 10,000 yen." },
          { speaker: "Guest", jp: "[週末|しゅうまつ] も [同|おな]じ です か？", en: "Is it the same at the weekend?" },
          { speaker: "Receptionist", jp: "いいえ、 [曜日|ようび] {によって} も [変|か]わります。 [土曜日|どようび] は [少|すこ]し [高|たか]く なります。", en: "No, it also changes with the day of the week. Saturdays are a little more." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with によって: “This picture was painted by a child” (use [描|か]く): この[絵|え]は[子供|こども]＿。",
            answers: ["によって [描|か]かれました"],
            explanation: "Something made takes によって in the passive: [子供|こども]によって[描|か]かれました.",
          },
          {
            prompt: "With によって: “The price changes depending on the time”: [値段|ねだん]は[時間|じかん]＿[変|か]わります。",
            answers: ["によって"],
            explanation: "Noun + によって[変|か]わる: it changes with the time.",
          },
          {
            prompt: "Formal, with による: “Fires caused by cigarettes are increasing”: タバコ＿[火事|かじ]が[増|ふ]えています。",
            answers: ["による"],
            explanation: "Before a noun, によって becomes による: タバコによる[火事|かじ].",
          },
          {
            prompt: "“Which train is faster depends on the time of day”: どの[電車|でんしゃ]が[速|はや]い＿[時間|じかん]によって[違|ちが]います。",
            answers: ["か は"],
            explanation: "A question word's clause takes か, then は before によって[違|ちが]う: どの[電車|でんしゃ]が[速|はや]いかは.",
          },
          {
            prompt: "Fix it (you heard it on the news): ニュースによって、[明日|あした]は[寒|さむ]くなるそうです。",
            answers: ["ニュース によると、 [明日|あした] は [寒|さむ]く なる そう です。", "ニュース によれば、 [明日|あした] は [寒|さむ]く なる そう です。"],
            explanation: "For where you heard it, によると (or によれば): ニュースによると.",
          },
        ],
      },
    ],
  },
  {
    slug: "wake-da",
    title: "No wonder, that's why: わけだ",
    mark: "わけだ",
    summary: "Draw the conclusion that explains something: “no wonder”, “that's why”, “so you mean”.",
    source: "Bunpro, “わけだ”; JLPT Sensei, “わけだ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **わけだ** says something follows from what you've just learnt: “no wonder”, “that's why”, or, checking you've understood, “so you mean …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[混|こ]んで いる わけ だ"],
          ["い-adjective", "[寒|さむ]い わけ だ"],
          ["な-adjective + な", "[上手|じょうず] な わけ だ"],
          ["Noun + な · という", "[最後|さいご] な わけ だ · [最後|さいご] と いう わけ だ"],
        ],
      },
      {
        type: "text",
        text: "わけ is a noun, written in kana ([言|い]い[訳|わけ] and [申|もう]し[訳|わけ] keep their kanji), so it takes な after a noun or な-adjective. わけだ links a fact you've just learnt to something you'd noticed: だから, それで and なるほど often come before it. Politely: わけです. With という (casually って), it restates or sums up: つまり、[休|やす]みというわけですね (so you mean it's a day off).",
      },
      {
        type: "text",
        text: "はずだ (its own lesson) mostly looks forward: given what you know, it should be so. わけだ looks back: you've found the reason for what's already so. Once you know the reason, はずだ can also say “no wonder” ([寒|さむ]いはずだ), so the two often overlap there.",
      },
      { type: "link", href: "/learn/n4-seeming/hazu", label: "Should be: はずだ", text: "An expectation from what you know." },
      { type: "heading", text: "わけだ: no wonder, that's why" },
      {
        type: "examples",
        items: [
          {
            jp: "[窓|まど] が [開|あ]いて いる。 [寒|さむ]い {わけ だ}。",
            en: "The window's open. No wonder it's cold.",
            alt: "[窓|まど] が [開|あ]いて います。 [寒|さむ]い {わけ です}。",
          },
          {
            jp: "[彼|かれ] は [十年|じゅうねん] も [日本|にほん] に [住|す]んで いた ん です か？ [日本語|にほんご] が [上手|じょうず] な {わけ です} ね。",
            en: "He lived in Japan for ten years? No wonder his Japanese is so good.",
            alt: "[彼|かれ] は [十年|じゅうねん] も [日本|にほん] に [住|す]んで いた の？ [日本語|にほんご] が [上手|じょうず] な {わけ だ} ね。",
          },
          {
            jp: "[毎晩|まいばん] [三時|さんじ] まで ゲーム を して いる の？ [眠|ねむ]い {わけ だ} よ。",
            en: "You play games till three every night? No wonder you're sleepy.",
            alt: "[毎晩|まいばん] [三時|さんじ] まで ゲーム を して いる ん です か？ [眠|ねむ]い {わけ です} よ。",
          },
          {
            jp: "[駅|えき] の [前|まえ] に [大|おお]きい [会社|かいしゃ] が できた。 だから [朝|あさ] の [電車|でんしゃ] が [混|こ]んで いる {わけ だ}。",
            en: "A big company has opened by the station. That's why the morning trains are packed.",
            alt: "[駅|えき] の [前|まえ] に [大|おお]きい [会社|かいしゃ] が できました。 だから [朝|あさ] の [電車|でんしゃ] が [混|こ]んで いる {わけ です}。",
          },
          {
            jp: "[昨日|きのう] は [三時間|さんじかん] しか [寝|ね]て いなかった の？ [眠|ねむ]そう だった {わけ だ} ね。",
            en: "You slept only three hours last night? No wonder you looked sleepy.",
            alt: "[昨日|きのう] は [三時間|さんじかん] しか [寝|ね]て いなかった ん です か？ [眠|ねむ]そう だった {わけ です} ね。",
          },
        ],
      },
      { type: "heading", text: "(という)わけだ: so you mean, which means" },
      {
        type: "examples",
        items: [
          {
            jp: "つまり、 [明日|あした] の [会議|かいぎ] は ない {と いう わけ です} か？",
            en: "So you mean there's no meeting tomorrow?",
            alt: "つまり、 [明日|あした] の [会議|かいぎ] は ない {って わけ}？",
          },
          {
            jp: "[一日|いちにち] [二時間|にじかん] なら、 [一週間|いっしゅうかん] で [十四時間|じゅうよじかん] {と いう わけ だ}。",
            en: "Two hours a day makes fourteen hours a week.",
            alt: "[一日|いちにち] [二時間|にじかん] なら、 [一週間|いっしゅうかん] で [十四時間|じゅうよじかん] {と いう わけ です}。",
          },
          { jp: "[部長|ぶちょう] は [来月|らいげつ] から [大阪|おおさか] です か？ [今週|こんしゅう] が [最後|さいご] {と いう わけ です} ね。", en: "The manager moves to Osaka next month? So this is his last week." },
          {
            jp: "じゃあ、 [今日|きょう] は [誰|だれ] も [来|こ]ない {わけ}？",
            en: "So nobody's coming today, then?",
            alt: "じゃあ、 [今日|きょう] は [誰|だれ] も [来|こ]ない {わけ です} か？",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[会議|かいぎ] に [山田|やまだ]-さん が いません ね。 [今日|きょう] は [休|やす]み な {わけ です}。", en: "Yamada-san isn't at the meeting. He must be off today (that explains it)." },
        b: { jp: "[山田|やまだ]-さん は [今日|きょう] [休|やす]み です。 だから [会議|かいぎ] に [来|こ]ない {はず です}。", en: "Yamada-san is off today. So he shouldn't be coming to the meeting." },
        diff: "With わけです the absence is already in front of you and the day off is the explanation; with はずです you start from the day off and predict the absence.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "わけだ explains; it doesn't predict",
        text: "✗ [雲|くも]が[多|おお]いから、[明日|あした]は[雨|あめ]が[降|ふ]るわけです (as a forecast) ✓ [雲|くも]が[多|おお]いから、[明日|あした]は[雨|あめ]が[降|ふ]るでしょう. わけだ explains something you already know from a fact you've just learnt; for a prediction, use でしょう or はずだ. And a noun takes な: ✗ [休|やす]みわけです ✓ [休|やす]みなわけです.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[田中|たなか]-さん、 [来月|らいげつ] [結婚|けっこん] する そう だ よ。", en: "I hear Tanaka-san is getting married next month." },
          { speaker: "Aya", jp: "え、 そう なん だ！", en: "Oh, really!" },
          { speaker: "Kenta", jp: "うん。 [毎日|まいにち] [早|はや]く [帰|かえ]って いた の も、 [準備|じゅんび] が ある から だ って。", en: "Yeah. Apparently that's why Tanaka-san has been going home early every day: getting ready." },
          { speaker: "Aya", jp: "なるほど。 [最近|さいきん] うれしそう だった {わけ だ}。", en: "I see. No wonder Tanaka-san has looked so happy lately." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with わけ: “The air conditioner's broken? No wonder it's hot”: エアコンが[壊|こわ]れてるの？[暑|あつ]い＿。",
            answers: ["わけ だ", "わけ だ よ", "わけ だ ね"],
            explanation: "The broken air conditioner explains the heat: [暑|あつ]いわけだ.",
          },
          {
            prompt: "Polite, with わけ (use [得意|とくい]): “She practises every day? No wonder she's good at it”: [毎日|まいにち][練習|れんしゅう]しているんですか？＿ですね。",
            answers: ["[得意|とくい] な わけ"],
            explanation: "A な-adjective takes な before わけ: [得意|とくい]なわけですね.",
          },
          {
            prompt: "Polite, with という and わけ: “So you mean the party's off?”: つまり、パーティーは[中止|ちゅうし]＿か？",
            answers: ["と いう わけ です"],
            explanation: "という + わけです restates what you've understood: [中止|ちゅうし]というわけですか？",
          },
          {
            prompt: "Fix it (“So he's a teacher”): [彼|かれ]は[先生|せんせい]わけですね。",
            answers: ["[彼|かれ] は [先生|せんせい] な わけ です ね。", "[彼|かれ] は [先生|せんせい] と いう わけ です ね。"],
            explanation: "A noun takes な (or という) before わけ: [先生|せんせい]なわけですね.",
          },
        ],
      },
    ],
  },
  {
    slug: "wake-dewa-nai",
    title: "It's not that, there's no way: わけではない and わけがない",
    mark: "わけではない",
    summary: "Take back part of an idea without denying it all, or deny it flatly.",
    source: "Bunpro, “わけではない” and “わけがない”; JLPT Sensei, “わけではない” and “わけがない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **わけではない** denies only part of an idea (“it's not that …”, “not necessarily”); **わけがない** denies it flatly (“there's no way …”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "It's not that", "There's no way"],
        rows: [
          ["Verb, plain form", "[行|い]きたくない わけ で は ない", "[勝|か]てる わけ が ない"],
          ["い-adjective", "[高|たか]い わけ で は ない", "[高|たか]い わけ が ない"],
          ["な-adjective + な", "[嫌|きら]い な わけ で は ない", "[簡単|かんたん] な わけ が ない"],
          ["Noun + な", "[休|やす]み な わけ で は ない", "[休|やす]み な わけ が ない"],
        ],
      },
      {
        type: "text",
        text: "わけではない takes back what someone might assume, and often follows words like [全部|ぜんぶ], いつも, みんな or [嫌|きら]い: not all, not always, not that I dislike it. Casually it becomes わけじゃない; politely わけではありません or わけじゃないです. A “but” often follows: …わけじゃないけど.",
      },
      {
        type: "text",
        text: "わけがない is a flat “no way”, and casual speech often drops the が: わけない. It's close to はずがない (its own lesson), and often both fit: はずがない sounds like a conclusion from what you know, わけがない a more emotional “of course not”. わけがない also fits what you feel or will yourself ([怒|おこ]るわけがない, [忘|わす]れるわけがない); はずがない is about facts. Beware: わけない on its own can also mean “easy” (そんなの、わけない: that's a piece of cake), so the context tells which.",
      },
      { type: "link", href: "/learn/n4-seeming/hazu", label: "Can't be: はずがない", text: "A conclusion from what you know." },
      { type: "heading", text: "わけではない: it's not that …" },
      {
        type: "examples",
        items: [
          {
            jp: "[肉|にく] が [嫌|きら]い な {わけ で は ない} けど、 あまり [食|た]べない。",
            en: "It's not that I dislike meat; I just don't eat much of it.",
            alt: "[肉|にく] が [嫌|きら]い な {わけ で は ありません} けど、 あまり [食|た]べません。",
          },
          {
            jp: "[日本人|にほんじん] が みんな すし が [好|す]き な {わけ じゃ ない} よ。",
            en: "Not every Japanese person likes sushi, you know.",
            alt: "[日本人|にほんじん] が みんな すし が [好|す]き な {わけ じゃ ありません} よ。",
          },
          {
            jp: "いつも [暇|ひま] な {わけ で は ありません}。 [今日|きょう] は たまたま です。",
            en: "It's not that I'm always free. Today just happens to be quiet.",
            alt: "いつも [暇|ひま] な {わけ じゃ ない}。 [今日|きょう] は たまたま だ よ。",
          },
          {
            jp: "[高|たか]い [物|もの] が いつも いい {わけ で は ない}。",
            en: "Expensive things aren't always good.",
            alt: "[高|たか]い [物|もの] が いつも いい {わけ で は ありません}。",
          },
          {
            jp: "[全部|ぜんぶ] [分|わ]かった {わけ じゃ ない} けど、 [話|はなし] は [面白|おもしろ]かった。",
            en: "I didn't understand all of it, but the talk was interesting.",
            alt: "[全部|ぜんぶ] [分|わ]かった {わけ じゃ ありません} けど、 [話|はなし] は [面白|おもしろ]かった です。",
          },
        ],
      },
      { type: "heading", text: "わけがない: there's no way" },
      {
        type: "examples",
        items: [
          {
            jp: "こんな [難|むずか]しい [問題|もんだい]、 [私|わたし] に [解|と]ける {わけ が ない}。",
            en: "There's no way I can solve a problem this hard.",
            alt: "こんな [難|むずか]しい [問題|もんだい]、 [私|わたし] に [解|と]ける {わけ が ありません}。",
          },
          {
            jp: "[一週間|いっしゅうかん] で [英語|えいご] が [話|はな]せる よう に なる {わけ が ない}。",
            en: "There's no way you'll learn to speak English in a week.",
            alt: "[一週間|いっしゅうかん] で [英語|えいご] が [話|はな]せる よう に なる {わけ が ありません}。",
          },
          { jp: "あの [店|みせ] の ラーメン が まずい {わけ が ない}。 いつも たくさん の [人|ひと] が [並|なら]んで いる ん だ から。", en: "That ramen can't possibly be bad. There's always a queue." },
          {
            jp: "[約束|やくそく] を [忘|わす]れる {わけ が ない} よ。",
            en: "There's no way I'd forget my promise.",
            alt: "[約束|やくそく] を [忘|わす]れる {わけ が ありません} よ。",
          },
          {
            jp: "そんな [高|たか]い [車|くるま]、 [買|か]える {わけ ない} よ。",
            en: "There's no way I could afford a car like that.",
            alt: "そんな [高|たか]い [車|くるま]、 [買|か]える {わけ が ありません} よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[彼|かれ] の こと が [嫌|きら]い な {わけ じゃ ない}。", en: "It's not that I dislike him." },
        b: { jp: "[彼|かれ] の こと が [嫌|きら]い な {わけ が ない}。", en: "There's no way I'd dislike him." },
        diff: "わけじゃない takes back an idea someone might have (I don't dislike him, but there's something…). わけがない rules it out completely (of course I don't).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A “but” needs わけではない",
        text: "✗ [野菜|やさい]が[嫌|きら]いなわけがないけど、あまり[食|た]べない ✓ [野菜|やさい]が[嫌|きら]いなわけではないけど、あまり[食|た]べない. The meaning clashes: わけがない says “there's no way I dislike them”, which “but I hardly eat them” contradicts. For “it's not that …, but”, use わけではない.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[最近|さいきん]、 パーティー に [来|こ]ない ね。 [忙|いそが]しい の？", en: "You haven't been coming to the parties lately. Are you busy?" },
          { speaker: "Kenta", jp: "[忙|いそが]しい {わけ じゃ ない} ん だ けど、 [週末|しゅうまつ] は [早|はや]く [寝|ね]たくて。", en: "It's not that I'm busy. I just want early nights at the weekend." },
          { speaker: "Aya", jp: "そう なん だ。 [怒|おこ]って いる の か と [思|おも]った。", en: "Oh, I see. I thought you might be cross with us." },
          { speaker: "Kenta", jp: "[怒|おこ]る {わけ ない} よ！", en: "Of course I'm not cross!" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with わけ: “It's not that I can't swim, but I'm not keen on the sea”: [泳|およ]げない＿けど、[海|うみ]は[苦手|にがて]だ。",
            answers: ["わけ じゃ ない", "わけ で は ない"],
            explanation: "Taking back part of the idea: [泳|およ]げないわけじゃない (in writing, わけではない).",
          },
          {
            prompt: "Polite, with わけ: “Not all old houses are cold”: [古|ふる]い[家|いえ]がみんな[寒|さむ]い＿。",
            answers: ["わけ で は ありません", "わけ じゃ ありません", "わけ で は ない です", "わけ じゃ ない です"],
            explanation: "みんな + わけではありません: not all of them.",
          },
          {
            prompt: "Casual, with わけがない: “There's no way this will be finished by tomorrow” (use [終|お]わる): これが[明日|あした]までに＿。",
            answers: ["[終|お]わる わけ が ない", "[終|お]わる わけ ない"],
            explanation: "A flat “no way”: [終|お]わるわけがない, casually without が.",
          },
          {
            prompt: "Polite, with わけがない: “There's no way it's that easy”: そんなに[簡単|かんたん]＿。",
            answers: ["な わけ が ありません", "な わけ が ない です"],
            explanation: "A な-adjective takes な before わけ: [簡単|かんたん]なわけがありません.",
          },
          {
            prompt: "Fix it: [嫌|きら]いわけじゃない。",
            answers: ["[嫌|きら]い な わけ じゃ ない。", "[嫌|きら]い な わけ で は ない。"],
            explanation: "[嫌|きら]い is a な-adjective, so it takes な before わけ: [嫌|きら]いなわけじゃない.",
          },
        ],
      },
    ],
  },
  {
    slug: "wake-ni-wa-ikanai",
    title: "Can't very well: わけにはいかない",
    mark: "わけにはいかない",
    summary: "Say you can't do something because it wouldn't be right, and that you can't get out of doing something.",
    source: "Bunpro, “わけにはいかない” and “ないわけにはいかない”; JLPT Sensei, “わけにはいかない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **わけにはいかない** says you can't do it, not because it's impossible but because it wouldn't be right (“I can't very well …”); after a ない form it says you can't get out of it (“I can hardly not …”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past: can't very well", "[休|やす]む わけ に は いかない"],
          ["Verb ない form: can't get out of it", "[行|い]かない わけ に は いかない"],
          ["Polite", "[休|やす]む わけ に は いきません"],
        ],
      },
      {
        type: "text",
        text: "The いく is [行|い]く in the sense “work out”, written in kana here. [休|やす]めない reports the circumstance (there is no way to take the day off); [休|やす]むわけにはいかない presents it as something you can't allow yourself to do, because others are counting on you. ないわけにはいかない is a reluctant “have to”: a duty to people, not a rule. Casual speech sometimes drops the は: わけにいかない.",
      },
      { type: "heading", text: "わけにはいかない: can't very well" },
      {
        type: "examples",
        items: [
          {
            jp: "[明日|あした] は [大事|だいじ] な [会議|かいぎ] が ある から、 [休|やす]む {わけ に は いかない}。",
            en: "There's an important meeting tomorrow, so I can't very well take the day off.",
            alt: "[明日|あした] は [大事|だいじ] な [会議|かいぎ] が ある から、 [休|やす]む {わけ に は いきません}。",
          },
          {
            jp: "[車|くるま] を [運転|うんてん] する ので、 お[酒|さけ] を [飲|の]む {わけ に は いきません}。",
            en: "I'm driving, so I can't very well have a drink.",
            alt: "[車|くるま] を [運転|うんてん] する から、 お[酒|さけ] を [飲|の]む {わけ に は いかない}。",
          },
          {
            jp: "[約束|やくそく] した ん だ から、 やめる {わけ に は いかない} よ。",
            en: "I promised, so I can't back out now.",
            alt: "[約束|やくそく] した ん です から、 やめる {わけ に は いきません} よ。",
          },
          { jp: "[会社|かいしゃ] の [秘密|ひみつ] な ので、 [教|おし]える {わけ に は いきません}。", en: "It's a company secret, so I'm afraid I can't tell you." },
          {
            jp: "みんな が [待|ま]って いる から、 [私|わたし] だけ [帰|かえ]る {わけ に は いかない}。",
            en: "Everyone's waiting, so I can't just go home on my own.",
            alt: "みんな が [待|ま]って いる から、 [私|わたし] だけ [帰|かえ]る {わけ に は いきません}。",
          },
        ],
      },
      { type: "heading", text: "ないわけにはいかない: can hardly not, have to" },
      {
        type: "examples",
        items: [
          {
            jp: "[部長|ぶちょう] に [誘|さそ]われた から、 [行|い]かない {わけ に は} いかない。",
            en: "My manager invited me, so I can hardly not go.",
            alt: "[部長|ぶちょう] に [誘|さそ]われた から、 [行|い]かない {わけ に は} いきません。",
          },
          { jp: "[友達|ともだち] の [結婚式|けっこんしき] だ から、 [出|で]ない {わけ に は} いきません。", en: "It's my friend's wedding, so I can't very well miss it." },
          { jp: "[頼|たの]まれた [仕事|しごと] だ から、 やらない {わけ に は} いかない。", en: "Someone asked me to do this job, so I can't just not do it." },
          {
            jp: "[明日|あした] は [試験|しけん] だ から、 [今夜|こんや] は [勉強|べんきょう] しない {わけ に は} いかない。",
            en: "There's an exam tomorrow, so there's no getting out of studying tonight.",
            alt: "[明日|あした] は [試験|しけん] です から、 [今夜|こんや] は [勉強|べんきょう] しない {わけ に は} いきません。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[熱|ねつ] が ある けど、 [今日|きょう] は [休|やす]む {わけ に は いかない}。", en: "I've got a temperature, but I can't very well take today off." },
        b: { jp: "[熱|ねつ] が ある けど、 [今日|きょう] は {[休|やす]めない}。", en: "I've got a temperature, but I can't take today off." },
        diff: "[休|やす]めない reports the circumstance: there's no way to take the day off. わけにはいかない presents it as something you can't allow yourself to do, because others are counting on you.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not for what you're unable to do",
        text: "✗ [足|あし]が[痛|いた]くて、[歩|ある]くわけにはいかない ✓ [足|あし]が[痛|いた]くて、[歩|ある]けない. わけにはいかない is for something you could do but shouldn't; when you simply can't, use the potential.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[今夜|こんや]、 [飲|の]み に [行|い]かない？", en: "Fancy going for a drink tonight?" },
          { speaker: "Ryo", jp: "[行|い]きたい けど、 [明日|あした] は [朝|あさ] [早|はや]い ん だ。 [遅|おく]れる {わけ に は いかない} から。", en: "I'd love to, but I've got an early start tomorrow. I can't afford to be late." },
          { speaker: "Kenta", jp: "そっか。 じゃあ、 また [今度|こんど] ね。", en: "Fair enough. Next time, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with わけにはいかない: “I'm on a diet, so I can't very well eat cake” (use [食|た]べる): ダイエット[中|ちゅう]だから、ケーキを＿。",
            answers: ["[食|た]べる わけ に は いかない", "[食|た]べる わけ に いかない"],
            explanation: "You could eat it, but you won't let yourself: [食|た]べるわけにはいかない.",
          },
          {
            prompt: "Polite, with わけにはいかない: “I can't very well go home before the manager” (use [帰|かえ]る): [部長|ぶちょう]より[先|さき]に＿。",
            answers: ["[帰|かえ]る わけ に は いきません", "[帰|かえ]る わけ に は いかない です", "[帰|かえ]る わけ に いきません"],
            explanation: "A social reason, not an inability: [帰|かえ]るわけにはいきません.",
          },
          {
            prompt: "Casual, with ないわけにはいかない: “It's my sister's birthday, so I can't not buy her a present” (use [買|か]う): [妹|いもうと]の[誕生日|たんじょうび]だから、プレゼントを＿。",
            answers: ["[買|か]わない わけ に は いかない", "[買|か]わない わけ に いかない"],
            explanation: "The ない form + わけにはいかない: you can't get out of it. [買|か]う → [買|か]わない.",
          },
          {
            prompt: "Polite, with ないわけにはいかない: “It's a meeting with the company president, so I can't not attend” (use [出|で]る): [社長|しゃちょう]との[会議|かいぎ]なので、＿。",
            answers: ["[出|で]ない わけ に は いきません", "[出|で]ない わけ に は いかない です", "[出|で]ない わけ に いきません"],
            explanation: "[出|で]る → [出|で]ない, + わけにはいきません.",
          },
          {
            prompt: "Fix it (he simply can't: his leg hurts): [足|あし]が[痛|いた]くて、[走|はし]るわけにはいかない。",
            answers: ["[足|あし] が [痛|いた]くて、 [走|はし]れない。", "[足|あし] が [痛|いた]くて、 [走|はし]る こと が できない。"],
            explanation: "Being unable takes the potential: [走|はし]れない. わけにはいかない is for what you could do but shouldn't.",
          },
        ],
      },
    ],
  },
];
