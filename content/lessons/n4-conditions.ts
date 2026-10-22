import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n4Conditions: Lesson[] = [
  {
    slug: "ba",
    title: "If: the ば form",
    mark: "〜ば",
    summary: "Say what it takes: if this holds, that follows.",
    source: "Genki II ch. 22 (〜ば); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ba); Bunpro, “ば”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The **ば** form states a condition, “if A holds, B follows”: the “if” of general truths, directions and advice.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Plain form", "ば form"],
        rows: [
          ["う-verb: the final u sound becomes e, + ば", "[行|い]く", "[行|い]けば"],
          ["る-verb: る → れば", "[食|た]べる", "[食|た]べれば"],
          ["Irregular", "する · [来|く]る", "すれば · [来|く]れば"],
          ["Verb ない form: ない → なければ", "[行|い]かない", "[行|い]かなければ"],
          ["い-adjective: い → ければ", "[高|たか]い · いい", "[高|たか]ければ · よければ"],
          ["Noun or な-adjective: なら", "[雨|あめ] · [暇|ひま]", "[雨|あめ] なら · [暇|ひま] なら"],
        ],
      },
      {
        type: "text",
        text: "いい becomes よければ, as its other forms do. After a noun or な-adjective, ば has no form of its own: なら (its own lesson) or だったら does the job. ば is at home with states: ある, いる, adjectives and ない forms. When the ば part is an action and the second half asks, invites or says what you'll do, use たら instead.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "この [薬|くすり] を [飲|の]{めば}、 [元気|げんき] に なります よ。",
            en: "Take this medicine and you'll feel better.",
            alt: "この [薬|くすり] を [飲|の]{めば}、 [元気|げんき] に なる よ。",
          },
          {
            jp: "[天気|てんき] が {よければ}、 [山|やま] に [登|のぼ]ります。",
            en: "If the weather's good, I'll climb the mountain.",
            alt: "[天気|てんき] が {よければ}、 [山|やま] に [登|のぼ]る。",
            note: "The weather is a state, so ば can lead into a plan.",
          },
          {
            jp: "お[金|かね] が {あれば}、 [新|あたら]しい パソコン を [買|か]います。",
            en: "If I have the money, I'll buy a new computer.",
            alt: "お[金|かね] が {あれば}、 [新|あたら]しい パソコン を [買|か]う。",
          },
          {
            jp: "[毎日|まいにち] [勉強|べんきょう] {すれば}、 [日本語|にほんご] が [上手|じょうず] に なります よ。",
            en: "If you study every day, your Japanese will get better.",
            alt: "[毎日|まいにち] [勉強|べんきょう] {すれば}、 [日本語|にほんご] が [上手|じょうず] に なる よ。",
          },
          {
            jp: "[早|はや]く [寝|ね]{なければ}、 [明日|あした] [起|お]きられません よ。",
            en: "If you don't go to bed early, you won't be able to get up tomorrow.",
            note: "In conversation, [寝|ね]ないと is the more usual way to say this.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[時間|じかん] が {あれば}、 [来|き]て ください。", en: "If you have time, please come." },
        b: { jp: "[時間|じかん] が {あったら}、 [来|き]て ください。", en: "If you have time, please come." },
        diff: "After a state like ある, ば and たら both take a request, with little difference. After an action, only たら does (see the mistake below).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "An action, then a request: たら",
        text: "✗ [仕事|しごと]が[終|お]われば、[電話|でんわ]してください。 ✓ [仕事|しごと]が[終|お]わったら、[電話|でんわ]してください。 Finishing work is an action, and the second half is a request, so it takes たら, not ば.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Tourist", jp: "すみません、 [郵便局|ゆうびんきょく] は どこ です か？", en: "Excuse me, where's the post office?" },
          { speaker: "Local", jp: "あの [角|かど] を [右|みぎ] に [曲|ま]が{れば}、 すぐ です よ。", en: "Turn right at that corner and it's just there." },
          { speaker: "Tourist", jp: "ありがとう ございます。", en: "Thank you." },
        ],
        note: "Directions take ば as well as と: do this, and you'll find it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "ば form: [書|か]く → ＿",
            answers: ["[書|か]けば"],
            explanation: "う-verb: く becomes け, + ば: [書|か]けば.",
          },
          {
            prompt: "ば form: [来|く]る → ＿",
            answers: ["[来|く]れば"],
            explanation: "[来|く]る is irregular but keeps its く: [来|く]れば (kureba).",
          },
          {
            prompt: "ば form: [寒|さむ]い → ＿",
            answers: ["[寒|さむ]ければ"],
            explanation: "い-adjective: い → ければ: [寒|さむ]ければ.",
          },
          {
            prompt: "ば form: いい → ＿",
            answers: ["よければ"],
            explanation: "いい conjugates from よい: よければ, never いければ.",
          },
          {
            prompt: "With ば: “If you take the express, you'll be there in an hour” (use [乗|の]る): [急行|きゅうこう]に＿、[一時間|いちじかん]で[着|つ]きますよ。",
            answers: ["[乗|の]れば"],
            explanation: "う-verb in る: る becomes れ, + ば: [乗|の]れば.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-natural",
    title: "Whenever, and what follows: と",
    mark: "〜と",
    summary: "Say what always or naturally happens next, give directions, and tell what you found.",
    source: "Genki II ch. 18 (〜と); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (to); Bunpro, “と”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past form + **と** says that B follows A naturally or every time: “when A happens, B happens”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past", "[押|お]す と · [押|お]さない と"],
          ["い-adjective", "[寒|さむ]い と"],
          ["な-adjective or noun + だ", "[静|しず]か だ と · [雨|あめ] だ と"],
        ],
      },
      {
        type: "text",
        text: "The verb before と stays in the non-past, even when the story is in the past. What comes after と is what happens: a fact, a habit, a result you can't control. It can't be a request, an invitation, an intention or an order.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[秋|あき] に なる {と}、 [山|やま] が [赤|あか]く なります。",
            en: "When autumn comes, the mountains turn red.",
            alt: "[秋|あき] に なる {と}、 [山|やま] が [赤|あか]く なる。",
          },
          {
            jp: "お[金|かね] を [入|い]れる {と}、 [切符|きっぷ] が [出|で]ます。",
            en: "Put the money in and the ticket comes out.",
            alt: "お[金|かね] を [入|い]れる {と}、 [切符|きっぷ] が [出|で]る よ。",
          },
          {
            jp: "[駅|えき] を [出|で]る {と}、 [前|まえ] に [公園|こうえん] が あります。",
            en: "As you come out of the station, there's a park in front of you.",
            alt: "[駅|えき] を [出|で]る {と}、 [前|まえ] に [公園|こうえん] が ある よ。",
          },
          {
            jp: "[私|わたし] は コーヒー を [飲|の]む {と}、 [眠|ねむ]れません。",
            en: "When I drink coffee, I can't sleep.",
            alt: "[私|わたし] は コーヒー を [飲|の]む {と}、 [眠|ねむ]れない。",
          },
        ],
      },
      { type: "heading", text: "What happened next, or what you found" },
      {
        type: "examples",
        items: [
          {
            jp: "[外|そと] に [出|で]る {と}、 [雪|ゆき] が [降|ふ]って いました。",
            en: "When I went outside, it was snowing.",
            alt: "[外|そと] に [出|で]る {と}、 [雪|ゆき] が [降|ふ]って いた。",
            note: "With a past ending, と tells what happened next or what you found.",
          },
          {
            jp: "[家|いえ] に [帰|かえ]る {と}、 [友達|ともだち] から [手紙|てがみ] が [来|き]て いました。",
            en: "When I got home, there was a letter from a friend.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[夜|よる] に なる {と}、 [寒|さむ]く なります。", en: "It gets cold at night." },
        b: { jp: "[夜|よる] に なっ{たら}、 [寒|さむ]く なります。", en: "It'll get cold once night falls." },
        diff: "と states a rule: every night, it gets cold. たら looks ahead to this evening, as a prediction or a warning.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No plans or requests after と",
        text: "✗ [家|いえ]に[帰|かえ]ると、[宿題|しゅくだい]をしよう。 ✓ [家|いえ]に[帰|かえ]ったら、[宿題|しゅくだい]をしよう。 After と comes what happens, not what you want. For a plan, an invitation, a request or an order, use たら.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Guest", jp: "すみません、 この ドア、 [開|あ]きません。", en: "Excuse me, this door won't open." },
          { speaker: "Staff", jp: "その ボタン を [押|お]す {と}、 [開|あ]きます よ。", en: "It opens when you press that button." },
          { speaker: "Guest", jp: "あ、 [開|あ]きました。 ありがとう ございます。", en: "Oh, it's open. Thank you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With と: “When summer comes, it gets hot”: [夏|なつ]に＿、[暑|あつ]くなります。",
            answers: ["なる と"],
            explanation: "なる stays in the non-past before と: [夏|なつ]になると.",
          },
          {
            prompt: "With と: “When you get off the bus, there's a convenience store right there” (use [降|お]りる): バスを＿、すぐコンビニがあります。",
            answers: ["[降|お]りる と"],
            explanation: "Directions and what you'll find: [降|お]りると.",
          },
          {
            prompt: "Fix it with たら (it's an invitation): [授業|じゅぎょう]が[終|お]わると、[図書館|としょかん]に[行|い]こう。",
            answers: ["[授業|じゅぎょう] が [終|お]わったら、 [図書館|としょかん] に [行|い]こう。"],
            explanation: "An invitation can't follow と. Use たら: [終|お]わったら.",
          },
          {
            prompt: "Fill in the particle: “When I opened the door, my cat was there”: ドアを[開|あ]ける＿、[猫|ねこ]がいました。",
            answers: ["と"],
            explanation: "と with a past ending tells what you found; the verb before it stays non-past: [開|あ]けると.",
          },
          {
            prompt: "With と: “If you don't hurry, you'll be late” (use [急|いそ]ぐ): ＿、[遅|おく]れますよ。",
            answers: ["[急|いそ]がない と"],
            explanation: "The ない form takes と too: [急|いそ]がないと.",
          },
        ],
      },
    ],
  },
  {
    slug: "nara",
    title: "If that's the case: なら",
    mark: "なら",
    summary: "Pick up what was just said, or what someone plans, and say something about that case.",
    source: "Genki II ch. 13 (〜なら); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (nara); Bunpro, “なら”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "**なら** takes something as given, often what the other person has just said, and says something about that case: “if it's X (you mean), …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[行|い]く なら"],
          ["い-adjective", "[寒|さむ]い なら"],
          ["な-adjective, without だ", "[暇|ひま] なら"],
          ["Noun, without だ", "コーヒー なら"],
        ],
      },
      {
        type: "text",
        text: "After a noun or な-adjective, なら is the ば-style “if” (だったら is just as common in speech). After a verb it often gives advice about someone's plan, and the advice comes before the plan happens: [行|い]くなら, “if you're going (then before you go) …”.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "コーヒー {なら}、 [私|わたし] が [作|つく]ります よ。",
            en: "If it's coffee you want, I'll make it.",
            alt: "コーヒー {なら}、 [私|わたし] が [作|つく]る よ。",
          },
          {
            jp: "カメラ を [買|か]う {なら}、 この [店|みせ] が [安|やす]い です よ。",
            en: "If you're buying a camera, this shop is cheap.",
            alt: "カメラ を [買|か]う {なら}、 この [店|みせ] が [安|やす]い よ。",
          },
          {
            jp: "[明日|あした] [暇|ひま] {なら}、 [一緒|いっしょ] に [買|か]い[物|もの] に [行|い]きません か？",
            en: "If you're free tomorrow, shall we go shopping together?",
            alt: "[明日|あした] [暇|ひま] {なら}、 [一緒|いっしょ] に [買|か]い[物|もの] に [行|い]かない？",
          },
          {
            jp: "[疲|つか]れて いる {なら}、 [少|すこ]し [休|やす]んで ください。",
            en: "If you're tired, take a little rest.",
            alt: "[疲|つか]れて いる {なら}、 [少|すこ]し [休|やす]んで。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[空港|くうこう] に [行|い]く {なら}、 [電話|でんわ] して ください。", en: "If you're going to the airport, give me a call (before you set off)." },
        b: { jp: "[空港|くうこう] に [行|い]っ{たら}、 [電話|でんわ] して ください。", en: "Give me a call when you get to the airport." },
        diff: "[行|い]くなら: you're going, so call first. [行|い]ったら: call once the going is done and you're there.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "なら replaces だ",
        text: "✗ [静|しず]かだなら ✓ [静|しず]かなら. A noun or な-adjective takes なら directly; だ drops.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ken", jp: "[週末|しゅうまつ]、 [京都|きょうと] に [行|い]く ん だ。", en: "I'm going to Kyoto at the weekend." },
          { speaker: "Aya", jp: "[京都|きょうと] に [行|い]く {なら}、 [朝|あさ] [早|はや]く [出|で]た ほう が いい よ。 [人|ひと] が [多|おお]い から。", en: "If you're going to Kyoto, you'd better set off early. It gets crowded." },
          { speaker: "Ken", jp: "そう なん だ。 ありがとう。", en: "Oh, right. Thanks." },
        ],
        note: "Aya picks up Ken's plan with なら and gives advice for it: the most typical use.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with なら: “If it's English, I can teach you”: [英語|えいご]＿、[教|おし]えられるよ。",
            answers: ["なら"],
            explanation: "A noun takes なら directly: [英語|えいご]なら.",
          },
          {
            prompt: "Your friend says they're going to the sea. Reply “If you're going to the sea, take a towel”: [海|うみ]に＿、タオルを[持|も]っていってね。",
            answers: ["[行|い]く なら", "[行|い]く ん なら", "[行|い]く の なら"],
            explanation: "なら picks up the friend's plan: [海|うみ]に[行|い]くなら. In speech you'll also hear [行|い]くんなら (or [行|い]くのなら).",
          },
          {
            prompt: "With なら: “If you're cold, close the window” (use [寒|さむ]い): ＿、[窓|まど]を[閉|し]めてね。",
            answers: ["[寒|さむ]い なら", "[寒|さむ]い ん なら", "[寒|さむ]い の なら"],
            explanation: "An い-adjective goes straight before なら: [寒|さむ]いなら.",
          },
          {
            prompt: "Fix it, keeping なら: [上手|じょうず]だなら、[歌|うた]ってください。",
            answers: ["[上手|じょうず] なら、 [歌|うた]って ください。"],
            explanation: "なら replaces だ: [上手|じょうず]なら.",
          },
        ],
      },
    ],
  },
  {
    slug: "conditionals-compared",
    title: "Which “if”? たら, と, ば and なら compared",
    mark: "たら・と・ば・なら",
    summary: "Choose between the four ways to say “if”, and know which one is always safe.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ba, nara, tara, to); Bunpro, “たら”, “と”, “ば” and “なら”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "A contrast lesson, not an item on either list; each of the four forms is N4 on both."),
    blocks: [
      {
        type: "idea",
        text: "Japanese has four “if”s: **たら** is the safe default, **と** gives natural results, **ば** says what it takes, and **なら** picks up what the listener said.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Form", "Best for", "Not followed by", "Example"],
        rows: [
          ["With たら", "One-off events: once A happens, B. Requests and plans are fine.", "Advice for before A happens (use なら)", "[着|つ]いたら [電話|でんわ] して"],
          ["With と", "What always or naturally follows; directions; what you found.", "Requests, invitations, plans, wishes", "[押|お]す と [開|あ]く"],
          ["With ば", "What it takes: general conditions and advice.", "Requests or plans after an action", "[急|いそ]げば [乗|の]れる"],
          ["With なら", "The listener's topic or plan: advice for that case.", "Natural consequences", "[行|い]く なら [秋|あき] が いい"],
        ],
      },
      {
        type: "text",
        text: "When in doubt, use たら: it fits almost everywhere the others do, and wherever the second half asks, invites or decides. The exception is advice for a plan before it happens: that's なら ([行|い]くなら, not [行|い]ったら). と and ば overlap for general truths; なら is the odd one out, since it looks at a case someone has raised rather than at what happens first.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん が [来|き]{たら}、 [呼|よ]んで ください。",
            en: "When Tanaka gets here, please come and get me.",
            alt: "[田中|たなか]-さん が [来|き]{たら}、 [呼|よ]んで ね。",
            note: "An action, then a request: only たら fits here ([来|く]れば can't lead into a request).",
          },
          {
            jp: "[冬|ふゆ] に なる {と}、 この [町|まち] は [静|しず]か に なります。",
            en: "When winter comes, this town goes quiet.",
            alt: "[冬|ふゆ] に なる {と}、 この [町|まち] は [静|しず]か に なる。",
            note: "と: what happens every year.",
          },
          {
            jp: "[急|いそ]{げば}、 [電車|でんしゃ] に [乗|の]れます よ。",
            en: "If you hurry, you'll make the train.",
            alt: "[急|いそ]{げば}、 [電車|でんしゃ] に [乗|の]れる よ。",
            note: "ば: hurrying is what it takes.",
          },
          {
            jp: "[日本|にほん] を [旅行|りょこう] する {なら}、 [秋|あき] が いい です よ。",
            en: "If you're travelling round Japan, autumn is a good time.",
            alt: "[日本|にほん] を [旅行|りょこう] する {なら}、 [秋|あき] が いい よ。",
            note: "なら: advice about the listener's plan.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] が [降|ふ]っ{たら}、 [試合|しあい] は ありません。", en: "If it rains, there's no match." },
        b: { jp: "[雨|あめ] {なら}、 [試合|しあい] は ありません。", en: "If it's raining, there's no match." },
        diff: "Both work here. [降|ふ]ったら pictures the rain falling; [雨|あめ]なら takes rainy weather as the case, as a notice would.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A wish needs たら",
        text: "✗ [日本|にほん]に[行|い]くと、[京都|きょうと]に[行|い]きたいです。 ✓ [日本|にほん]に[行|い]ったら、[京都|きょうと]に[行|い]きたいです。 A wish, like a plan or a request, can't follow と, and ば after an action can't lead into one either.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mika", jp: "この [映画|えいが]、 [見|み]た？", en: "Have you seen this film?" },
          { speaker: "Taro", jp: "まだ。 [面白|おもしろ]い {なら}、 [見|み]たい な。", en: "Not yet. If it's good, I'd like to see it." },
          { speaker: "Mika", jp: "[見|み]れ{ば}、 [分|わ]かる よ。 すごく [面白|おもしろ]い から。", en: "Watch it and you'll see. It's really good." },
        ],
        note: "Taro takes Mika's hint that it's good as the case (なら); Mika says what it takes (ば).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Pick the “if”, polite request: “When you've finished, please tell me” (use [終|お]わる): ＿、[教|おし]えてください。",
            answers: ["[終|お]わったら"],
            explanation: "A request after an action takes たら: [終|お]わったら. と and ば don't work here.",
          },
          {
            prompt: "Your friend says 「[来月|らいげつ]、[車|くるま]を[買|か]うんだ」. Reply “If you're buying a car, ask me first”: [車|くるま]を＿、[先|さき]に[私|わたし]に[聞|き]いてね。",
            answers: ["[買|か]う なら", "[買|か]う ん なら", "[買|か]う の なら"],
            explanation: "Advice about the friend's plan, before it happens: [買|か]うなら. [買|か]ったら would put the asking after the purchase.",
          },
          {
            prompt: "Fix it (a request): [東京|とうきょう]に[着|つ]けば、メールしてください。",
            answers: ["[東京|とうきょう] に [着|つ]いたら、 メール して ください。"],
            explanation: "Arriving is an action and the second half is a request, so たら: [着|つ]いたら.",
          },
          {
            prompt: "Always true, with と: “When you add sugar, it gets sweet” (use [入|い]れる): [砂糖|さとう]を＿、[甘|あま]くなります。",
            answers: ["[入|い]れる と"],
            explanation: "A natural result: [入|い]れると.",
          },
        ],
      },
    ],
  },
  {
    slug: "temo",
    title: "Even if: ても and でも",
    mark: "ても",
    summary: "Say that something happens anyway, even if or even though something else is true.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (temo); Bunpro, “ても”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The て form + **も** means “even if” (what follows holds whatever happens), and after a question word “no matter who, what, when …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb て form + も", "[降|ふ]って も"],
          ["Verb ない form: ない → なくても", "[行|い]かなくて も"],
          ["い-adjective くて + も", "[高|たか]くて も"],
          ["Noun or な-adjective + でも", "[雨|あめ] で も · [静|しず]か で も"],
          ["Question word … ても", "[何|なに] を [食|た]べて も"],
        ],
      },
      {
        type: "text",
        text: "It's the same ても as in てもいい (it's fine even if…). Casual speech often uses たって for it, but ても is right everywhere.",
      },
      { type: "heading", text: "Even if" },
      {
        type: "examples",
        items: [
          {
            jp: "[雨|あめ] が [降|ふ]って {も}、 [自転車|じてんしゃ] で [行|い]きます。",
            en: "Even if it rains, I'll go by bike.",
            alt: "[雨|あめ] が [降|ふ]って {も}、 [自転車|じてんしゃ] で [行|い]く よ。",
          },
          {
            jp: "[高|たか]くて {も}、 この [靴|くつ] を [買|か]います。",
            en: "Even if they're expensive, I'm buying these shoes.",
            alt: "[高|たか]くて {も}、 この [靴|くつ] を [買|か]う。",
          },
          {
            jp: "[日曜日|にちようび] で {も}、 この [店|みせ] は [開|あ]いて います。",
            en: "This shop is open even on Sundays.",
            alt: "[日曜日|にちようび] で {も}、 この [店|みせ] は [開|あ]いて いる よ。",
          },
          {
            jp: "[今|いま] [出|で]て {も}、 [間|ま]に[合|あ]いません よ。",
            en: "Even if we leave now, we won't make it.",
            alt: "[今|いま] [出|で]て {も}、 [間|ま]に[合|あ]わない よ。",
          },
        ],
      },
      { type: "heading", text: "No matter who, what, how many times" },
      {
        type: "examples",
        items: [
          {
            jp: "[何度|なんど] [聞|き]いて {も}、 [分|わ]かりません。",
            en: "No matter how many times I ask, I don't get it.",
            alt: "[何度|なんど] [聞|き]いて {も}、 [分|わ]からない。",
          },
          {
            jp: "[誰|だれ] が [来|き]て {も}、 ドア を [開|あ]けないで ね。",
            en: "Whoever comes, don't open the door.",
            alt: "[誰|だれ] が [来|き]て {も}、 ドア を [開|あ]けないで ください。",
          },
          {
            jp: "どこ を [探|さが]して {も}、 [鍵|かぎ] が [見|み]つかりません。",
            en: "Wherever I look, I can't find my keys.",
            alt: "どこ を [探|さが]して {も}、 [鍵|かぎ] が [見|み]つからない。",
          },
          {
            jp: "この [店|みせ] は [何|なに] を [食|た]べて {も} おいしい。",
            en: "Whatever you eat at this place, it's good.",
            alt: "この [店|みせ] は [何|なに] を [食|た]べて {も} おいしい です。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雪|ゆき] が [降|ふ]っ{たら}、 [行|い]きます か？", en: "Will you go if it snows?" },
        b: { jp: "[雪|ゆき] が [降|ふ]って {も}、 [行|い]きます か？", en: "Will you go even if it snows?" },
        diff: "たら makes the snow the condition for going; ても says the snow doesn't change it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "い-adjectives take くても",
        text: "✗ [高|たか]いでも、[買|か]います。 ✓ [高|たか]くても、[買|か]います。 でも follows nouns and な-adjectives; an い-adjective takes くても.",
      },
      {
        type: "callout",
        kind: "tip",
        title: "Not the same でも",
        text: "The particle でも after a noun suggests something loosely: お[茶|ちゃ]でも[飲|の]みませんか？ (shall we have tea or something?). It's “or something”, not “even if”. At the start of a sentence, でも means “but”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mika", jp: "[明日|あした]、 [雨|あめ] で {も} [山|やま] に [行|い]く？", en: "Are you going to the mountains tomorrow even if it rains?" },
          { speaker: "Taro", jp: "うん、 [少|すこ]し [降|ふ]って {も} [行|い]く よ。", en: "Yeah, I'm going even if it rains a bit." },
          { speaker: "Mika", jp: "じゃあ、 [傘|かさ] を [持|も]って いこう。", en: "Then let's take umbrellas." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“Even if I'm tired, I'll go” (use [疲|つか]れる): ＿、[行|い]きます。",
            answers: ["[疲|つか]れて も", "[疲|つか]れて いて も"],
            explanation: "て form + も: [疲|つか]れても.",
          },
          {
            prompt: "“Even if it's far, I want to go” (use [遠|とお]い): ＿、[行|い]きたいです。",
            answers: ["[遠|とお]くて も"],
            explanation: "An い-adjective takes くても: [遠|とお]くても.",
          },
          {
            prompt: "Use でも: “I get up early even on my days off”: [休|やす]みの[日|ひ]＿、[早|はや]く[起|お]きます。",
            answers: ["で も"],
            explanation: "A noun takes でも: [休|やす]みの[日|ひ]でも.",
          },
          {
            prompt: "“No matter when I call, he's never in” (use [電話|でんわ]する): いつ＿、いません。",
            answers: ["[電話|でんわ] して も", "[電話|でんわ] を して も"],
            explanation: "Question word + ても: いつ[電話|でんわ]しても, “no matter when I call”.",
          },
          {
            prompt: "Fix it: [寒|さむ]いでも、[窓|まど]を[開|あ]けます。",
            answers: ["[寒|さむ]くて も、 [窓|まど] を [開|あ]けます。"],
            explanation: "An い-adjective takes くても, not でも: [寒|さむ]くても.",
          },
        ],
      },
    ],
  },
  {
    slug: "noni",
    title: "Even though, and yet: のに",
    mark: "のに",
    summary: "Say that something turned out against what you'd expect, often with surprise or a complaint.",
    source: "Genki II ch. 22 (〜のに); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (noni); Bunpro, “のに (Even Though)”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **のに** means “even though”: what follows goes against what you'd expect, and the speaker usually feels something about it (surprise, regret, annoyance).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[待|ま]った のに"],
          ["い-adjective", "[安|やす]い のに"],
          ["な-adjective + な", "[静|しず]か な のに"],
          ["Noun + な", "[日曜日|にちようび] な のに"],
        ],
      },
      {
        type: "text",
        text: "After a noun or な-adjective it's なのに. The part after のに is a fact or a reproachful question ([使|つか]わないの？), not a request, invitation or plan; for those, use けど. Said alone at the end, のに is a complaint or regret: [待|ま]っていたのに… (and I was waiting…).",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[一時間|いちじかん] [待|ま]った {のに}、 [彼|かれ] は [来|き]ません でした。",
            en: "I waited an hour, and he still didn't come.",
            alt: "[一時間|いちじかん] [待|ま]った {のに}、 [彼|かれ] は [来|こ]なかった。",
          },
          {
            jp: "[日曜日|にちようび] な {のに}、 [会社|かいしゃ] に [行|い]かなければ なりません。",
            en: "It's Sunday, and yet I have to go to work.",
            alt: "[日曜日|にちようび] な {のに}、 [会社|かいしゃ] に [行|い]かなきゃ。",
          },
          {
            jp: "この [店|みせ] は [安|やす]い {のに}、 おいしい です。",
            en: "This place is cheap, and yet the food is good.",
            alt: "この [店|みせ] は [安|やす]い {のに}、 おいしい ね。",
            note: "The surprise can be a pleasant one.",
          },
        ],
      },
      { type: "heading", text: "A reproachful question, or a complaint left unsaid" },
      {
        type: "examples",
        items: [
          {
            jp: "[傘|かさ] を [持|も]って いる {のに}、 [使|つか]わない ん です か？",
            en: "You've got an umbrella and you're not using it?",
            alt: "[傘|かさ] を [持|も]って いる {のに}、 [使|つか]わない の？",
          },
          {
            jp: "[病気|びょうき] な {のに}、 [仕事|しごと] に [行|い]った ん です か？",
            en: "You're ill, and you went to work?",
            alt: "[病気|びょうき] な {のに}、 [仕事|しごと] に [行|い]った の？",
          },
          {
            jp: "[待|ま]って いた {のに}…",
            en: "And I was waiting for you…",
            note: "のに at the end, with the rest left unsaid: a complaint.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[薬|くすり] を [飲|の]んだ {けど}、 まだ [頭|あたま] が [痛|いた]い。", en: "I took some medicine, but my head still hurts." },
        b: { jp: "[薬|くすり] を [飲|の]んだ {のに}、 まだ [頭|あたま] が [痛|いた]い。", en: "I took some medicine, and my head *still* hurts!" },
        diff: "けど just sets the two facts side by side. のに adds that it shouldn't be so: the speaker is surprised or fed up.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No requests or plans after のに",
        text: "✗ [高|たか]いのに、[買|か]いましょう。 ✓ [高|たか]いけど、[買|か]いましょう。 のに leads into a fact the speaker reacts to, never into a request, invitation or what you'll do. けど takes any of those.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Yuki", jp: "あれ、 [田中|たなか]-さん は？", en: "Huh, where's Tanaka?" },
          { speaker: "Ken", jp: "[今日|きょう] は [休|やす]み だ って。", en: "Apparently she's off today." },
          { speaker: "Yuki", jp: "え、 [昨日|きのう]、 [来|く]る って [言|い]って いた {のに}…", en: "What? She said yesterday she'd come…" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With のに: “Even though it's summer, it's cold” (use [夏|なつ]): ＿、[寒|さむ]いです。",
            answers: ["[夏|なつ] な のに"],
            explanation: "A noun takes な before のに: [夏|なつ]なのに.",
          },
          {
            prompt: "With のに: “I went to bed early, and yet I'm tired” (use [寝|ね]る): [早|はや]く＿、[疲|つか]れています。",
            answers: ["[寝|ね]た のに"],
            explanation: "The plain past + のに: [寝|ね]たのに.",
          },
          {
            prompt: "With のに: “It's close, and yet he came by taxi” (use [近|ちか]い): ＿、タクシーで[来|き]ました。",
            answers: ["[近|ちか]い のに"],
            explanation: "An い-adjective goes straight before のに: [近|ちか]いのに.",
          },
          {
            prompt: "Your own plan: “It's raining, but I'll go”: [雨|あめ]だ＿、[行|い]きます。",
            answers: ["けど", "けれど", "けれども", "が"],
            explanation: "What you'll do can't follow のに, so “but”: [雨|あめ]だけど、[行|い]きます.",
          },
          {
            prompt: "Fix it: [便利|べんり]のに、[誰|だれ]も[使|つか]いません。",
            answers: ["[便利|べんり] な のに、 [誰|だれ] も [使|つか]いません。"],
            explanation: "A な-adjective takes な before のに: [便利|べんり]なのに.",
          },
        ],
      },
    ],
  },
  {
    slug: "kedo",
    title: "But: けど, けれども and が",
    mark: "けど",
    summary: "Join two contrasting facts, choose the right “but” for the situation, and soften a request.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ga, keredomo); Bunpro, “けど・だけど”, “けれども” and “が-But”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**けど**, **けれども** and **が** after a clause all mean “but”, from everyday to formal, and けど also softens a request by leaving it open.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Plain form", "[高|たか]い けど · [行|い]く けど"],
          ["Polite form", "[高|たか]い です けど · [行|い]きます けど"],
          ["Noun or な-adjective + だ", "[学生|がくせい] だ けど · [静|しず]か だ けど"],
        ],
      },
      {
        type: "text",
        text: "けど is everyday speech, polite or casual. けれど and けれども are fuller and a little more formal. が after a clause is the formal one, common in writing and after です and ます in polite speech: [難|むずか]しいですが. All three can also introduce a topic or a request, with the “but” barely there.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "この [料理|りょうり] は [高|たか]い {けど}、 おいしい。",
            en: "This dish is expensive, but it's good.",
            alt: "この [料理|りょうり] は [高|たか]い です {けど}、 おいしい です。",
          },
          {
            jp: "[行|い]きたい です {けど}、 [時間|じかん] が ありません。",
            en: "I'd like to go, but I don't have time.",
            alt: "[行|い]きたい {けど}、 [時間|じかん] が ない。",
          },
          {
            jp: "[日本語|にほんご] は [難|むずか]しい です {が}、 [面白|おもしろ]い です。",
            en: "Japanese is difficult, but it's interesting.",
            note: "が after です: polite and a touch formal.",
          },
          {
            jp: "[昨日|きのう] は [雨|あめ] でした {けれども}、 [試合|しあい] は ありました。",
            en: "It rained yesterday, but the match went ahead.",
          },
        ],
      },
      { type: "heading", text: "Leaving it open: a soft けど" },
      {
        type: "examples",
        items: [
          {
            jp: "すみません、 [駅|えき] に [行|い]きたい ん です {けど}…",
            en: "Excuse me, I'm trying to get to the station…",
            alt: "あの、 [駅|えき] に [行|い]きたい ん だ {けど}…",
            note: "The question “how do I get there?” is left for the listener to pick up.",
          },
          {
            jp: "ちょっと [聞|き]きたい こと が ある ん です {けど}…",
            en: "There's something I'd like to ask you…",
            alt: "ちょっと [聞|き]きたい こと が ある ん だ {けど}…",
          },
          {
            jp: "[先生|せんせい]、 [宿題|しゅくだい] を [忘|わす]れた ん です {けど}…",
            en: "Sir, I've forgotten my homework…",
          },
          {
            jp: "[明日|あした] の [会議|かいぎ] の こと なん です {けど}…",
            en: "It's about tomorrow's meeting…",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[安|やす]い です {けど}、 [小|ちい]さい です。", en: "It's cheap, but it's small." },
        b: { jp: "[安|やす]い です {が}、 [小|ちい]さい です。", en: "It's cheap, but it's small." },
        diff: "The same “but”: けど is everyday speech, が sounds more formal, like a shop assistant or a written review.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "だ before けど",
        text: "✗ [学生|がくせい]けど ✓ [学生|がくせい]だけど. After a noun or な-adjective, casual speech needs だ before けど; polite speech says ですけど.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Customer", jp: "すみません、 この シャツ、 もう [少|すこ]し [大|おお]きい の が [欲|ほ]しい ん です {けど}…", en: "Excuse me, I'd like this shirt a little bigger…" },
          { speaker: "Assistant", jp: "はい、 こちら は いかが です か？", en: "Certainly. How about this one?" },
          { speaker: "Customer", jp: "あ、 いい です ね。 これ に します。", en: "Oh, that's good. I'll take it." },
        ],
        note: "The customer never asks outright: …んですけど… leaves the request for the assistant to pick up, which is the polite way.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual: “It's a nice bag, but it's heavy”: いいかばんだ＿、[重|おも]い。",
            answers: ["けど", "けれど", "けれども"],
            explanation: "After だ, casual speech uses けど: いいかばんだけど、[重|おも]い. けれど and けれども are fuller.",
          },
          {
            prompt: "Polite, trailing off at a ticket window: “I'd like to buy a ticket…”: [切符|きっぷ]を[買|か]いたいんです＿…",
            answers: ["けど", "けれど", "けれども", "が"],
            explanation: "…んですけど… states the situation and leaves the request open. が and けれども sound more formal.",
          },
          {
            prompt: "Fix it, keeping けど: [日曜日|にちようび]けど、[仕事|しごと]です。",
            answers: ["[日曜日|にちようび] だ けど、 [仕事|しごと] です。", "[日曜日|にちようび] です けど、 [仕事|しごと] です。"],
            explanation: "A noun needs だ or です before けど: [日曜日|にちようび]だけど (or ですけど).",
          },
          {
            prompt: "Written style, in a report: “The new station is convenient, but small”: [新|あたら]しい[駅|えき]は[便利|べんり]だ＿、[小|ちい]さい。",
            answers: ["が", "けれども", "けれど"],
            explanation: "Writing prefers が (or けれども): [便利|べんり]だが、[小|ちい]さい.",
          },
        ],
      },
    ],
  },
  {
    slug: "shi",
    title: "And what's more: 〜し",
    mark: "〜し",
    summary: "List reasons one after another, and let them add up.",
    source: "Genki II ch. 13 (〜し); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (shi); Bunpro, “し”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **し** lists one point and implies there are more (“and what's more”), usually as reasons for a conclusion.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[行|い]く し · [行|い]った し"],
          ["い-adjective", "[安|やす]い し"],
          ["な-adjective or noun + だ", "[静|しず]か だ し · [雨|あめ] だ し"],
          ["Polite form", "[安|やす]い です し"],
        ],
      },
      {
        type: "text",
        text: "One し can stand for a whole list: [時間|じかん]もないし (we're short of time, among other things). The clause often has も, which adds to the pile. The conclusion can also stay unsaid. For a single reason on its own, use から or ので (Particles: から, ので and ですから).",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[今日|きょう] は [雨|あめ] だ {し}、 [家|いえ] に いよう。",
            en: "It's raining today, so let's stay in.",
            alt: "[今日|きょう] は [雨|あめ] です {し}、 [家|いえ] に いましょう。",
          },
          {
            jp: "[時間|じかん] も ない {し}、 タクシー で [行|い]きましょう。",
            en: "We're short of time, so let's take a taxi.",
            alt: "[時間|じかん] も ない {し}、 タクシー で [行|い]こう。",
          },
          {
            jp: "あの [店|みせ] は [安|やす]い し、 おいしい {し}、 いつも [人|ひと] が [多|おお]い です。",
            en: "That place is cheap, the food's good, and it's always busy.",
            alt: "あの [店|みせ] は [安|やす]い し、 おいしい {し}、 いつも [人|ひと] が [多|おお]い よ。",
          },
          {
            jp: "[頭|あたま] も [痛|いた]い {し}、 [今日|きょう] は [早|はや]く [帰|かえ]ります。",
            en: "I've got a headache too, so I'm going home early today.",
            alt: "[頭|あたま] も [痛|いた]い {し}、 [今日|きょう] は [早|はや]く [帰|かえ]る。",
          },
        ],
      },
      { type: "heading", text: "Adding a point, not a reason" },
      {
        type: "examples",
        items: [
          {
            jp: "この [町|まち] は [静|しず]か です {し}、 [人|ひと] も [優|やさ]しい です。",
            en: "This town is quiet, and the people are kind too.",
            alt: "この [町|まち] は [静|しず]か だ {し}、 [人|ひと] も [優|やさ]しい よ。",
          },
          {
            jp: "[兄|あに] は [背|せ] も [高|たか]い {し}、 [頭|あたま] も いい。",
            en: "My brother's tall, and he's clever too.",
            alt: "[兄|あに] は [背|せ] も [高|たか]い です {し}、 [頭|あたま] も いい です。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] だ {から}、 [行|い]かない。", en: "It's raining, so I'm not going." },
        b: { jp: "[雨|あめ] だ {し}、 [行|い]かない。", en: "It's raining (and there are other reasons), so I'm not going." },
        diff: "から (or ので) gives the reason. し gives one reason of several, and sounds softer for it.",
      },
      {
        type: "link",
        href: "/learn/particles/kara-made",
        label: "から and ので: because",
        text: "One reason on its own: から, or the softer ので.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "だ before し",
        text: "✗ [静|しず]かし ✓ [静|しず]かだし. A noun or な-adjective needs だ (or です) before し.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "どうして この [部屋|へや] に した の？", en: "Why did you go for this flat?" },
          { speaker: "Ken", jp: "[駅|えき] から [近|ちか]い し、 [広|ひろ]い {し}。", en: "Well, it's near the station, it's roomy…" },
          { speaker: "Aya", jp: "いい ね。", en: "Nice." },
        ],
        note: "Ken stops after the reasons: the conclusion (so I chose it) goes without saying.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual: “This computer is light, and what's more it's fast”: このパソコンは[軽|かる]い＿、[速|はや]いよ。",
            answers: ["し"],
            explanation: "An い-adjective goes straight before し: [軽|かる]いし.",
          },
          {
            prompt: "“It's my day off, and the weather's good, so let's go out”: [休|やす]み＿、[天気|てんき]もいいし、[出|で]かけよう。",
            answers: ["だ し"],
            explanation: "A noun needs だ before し: [休|やす]みだし.",
          },
          {
            prompt: "Fix it: [彼|かれ]は[元気|げんき]し、[面白|おもしろ]い。",
            answers: ["[彼|かれ] は [元気|げんき] だ し、 [面白|おもしろ]い。"],
            explanation: "A な-adjective needs だ before し: [元気|げんき]だし.",
          },
          {
            prompt: "Polite: “I'm tired, and it's already late, so I'll go home” (use [疲|つか]れる): ＿し、もう[遅|おそ]いし、[帰|かえ]ります。",
            answers: ["[疲|つか]れた", "[疲|つか]れて いる", "[疲|つか]れてる", "[疲|つか]れて います", "[疲|つか]れました"],
            explanation: "し follows the plain or polite form: [疲|つか]れたし (or [疲|つか]れているし).",
          },
        ],
      },
    ],
  },
  {
    slug: "advice",
    title: "Why don't you…? What should I do? たらどう, たらいい, ばよかった",
    mark: "たらどう",
    summary: "Make a suggestion, ask for advice, and say what you should have done.",
    source: "Genki II ch. 14 (〜たらどうですか) and ch. 18 (〜ばよかったです); Bunpro, “たらどう” and “ばよかった”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "“If” builds three set patterns: **たらどう** for suggestions, **たらいい** and **ばいい** for advice, and **ばよかった** for regrets.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Use", "Example"],
        rows: [
          ["Verb た form + らどう", "Suggesting: why don't you…?", "[行|い]ったら どう"],
          ["Verb たら or ば + いい", "Asking for advice, or giving it: you can just…", "どう したら いい · [聞|き]けば いい"],
          ["Verb ば + よかった", "Regret: I should have…", "[行|い]けば よかった"],
        ],
      },
      {
        type: "text",
        text: "たらどうですか is direct, and to someone above you it can sound pushy. Casual speech often stops early: [寝|ね]たら？ or [寝|ね]れば？ (why don't you get some sleep?); a bare ば？ can sound a little offhand. ばよかった looks back: with a ない form it regrets something done, [言|い]わなければよかった (I shouldn't have said it).",
      },
      { type: "heading", text: "Suggesting: たらどう" },
      {
        type: "examples",
        items: [
          {
            jp: "[病院|びょういん] に [行|い]っ{たら どう}？",
            en: "Why don't you go to the doctor?",
            alt: "[病院|びょういん] に [行|い]っ{たら どう です か}？",
          },
          { jp: "[少|すこ]し [散歩|さんぽ] し{たら どう}？", en: "Why don't you go for a little walk?" },
          {
            jp: "[窓|まど] を [開|あ]け{たら どう}？",
            en: "Why don't you open the window?",
            alt: "[窓|まど] を [開|あ]け{たら どう です か}？",
          },
          {
            jp: "[一度|いちど] [先生|せんせい] に [相談|そうだん] し{たら どう}？",
            en: "Why don't you talk to your teacher about it?",
            alt: "[一度|いちど] [先生|せんせい] に [相談|そうだん] し{たら どう です か}？",
          },
        ],
      },
      { type: "heading", text: "Asking and giving advice: たらいい · ばいい" },
      {
        type: "examples",
        items: [
          {
            jp: "どこ で [降|お]り{たら いい} です か？",
            en: "Where should I get off?",
            alt: "どこ で [降|お]り{たら いい}？",
          },
          {
            jp: "[何|なに] を [持|も]って いけ{ば いい} です か？",
            en: "What should I bring?",
            alt: "[何|なに] を [持|も]って いけ{ば いい}？",
          },
          {
            jp: "[辞書|じしょ] を [見|み]れ{ば いい} よ。",
            en: "You can just look it up in a dictionary.",
            alt: "[辞書|じしょ] を [見|み]れ{ば いい} です よ。",
          },
          {
            jp: "[誰|だれ] に [聞|き]い{たら いい} です か？",
            en: "Who should I ask?",
            alt: "[誰|だれ] に [聞|き]い{たら いい}？",
          },
        ],
      },
      { type: "heading", text: "Regret: ばよかった" },
      {
        type: "examples",
        items: [
          {
            jp: "もっと [勉強|べんきょう] すれ{ば よかった}。",
            en: "I should have studied more.",
            alt: "もっと [勉強|べんきょう] すれ{ば よかった} です。",
          },
          {
            jp: "[傘|かさ] を [持|も]って くれ{ば よかった}。",
            en: "I should have brought an umbrella.",
            alt: "[傘|かさ] を [持|も]って くれ{ば よかった} です。",
          },
          { jp: "[彼|かれ] に [言|い]わなけれ{ば よかった}。", en: "I shouldn't have told him." },
          {
            jp: "[写真|しゃしん] を [撮|と]れ{ば よかった}。",
            en: "I should have taken a photo.",
            alt: "[写真|しゃしん] を [撮|と]れ{ば よかった} です。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[駅|えき] で [聞|き]け{ば いい}。", en: "I can just ask at the station." },
        b: { jp: "[駅|えき] で [聞|き]け{ば よかった}。", en: "I should have asked at the station." },
        diff: "ばいい looks ahead: that's all it takes. ばよかった looks back: it's too late now.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "らどう hangs on the た form",
        text: "✗ [休|やす]むらどう？ ✓ [休|やす]んだらどう？ The suggestion is たら + どう, so it follows the た form: [休|やす]んだ → [休|やす]んだら.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Student", jp: "[漢字|かんじ] が [難|むずか]しい です。 どう し{たら いい} です か？", en: "Kanji are hard. What should I do?" },
          { speaker: "Teacher", jp: "[毎日|まいにち] [少|すこ]し [書|か]い{たら どう} です か？", en: "Why not write a few every day?" },
          { speaker: "Student", jp: "はい、 そう します。", en: "OK, I'll do that." },
        ],
        note: "A teacher can suggest with たらどうですか; a student to a teacher would choose a softer way.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Suggest, casually: “Why don't you call him?” (use [電話|でんわ]する): [彼|かれ]に＿？",
            answers: [
              "[電話|でんわ] したら どう",
              "[電話|でんわ] したら",
              "[電話|でんわ] すれば",
              "[電話|でんわ] を したら どう",
              "[電話|でんわ] を したら",
              "[電話|でんわ] を すれば",
            ],
            explanation: "た form + らどう: [電話|でんわ]したらどう？ Casually the どう often drops: [電話|でんわ]したら？ or [電話|でんわ]すれば？",
          },
          {
            prompt: "Polite, asking for advice with たら or ば: “Which bus should I take?” (use [乗|の]る): どのバスに＿いいですか？",
            answers: ["[乗|の]ったら", "[乗|の]れば"],
            explanation: "たらいい or ばいい ask what to do: [乗|の]ったらいいですか (or [乗|の]ればいいですか).",
          },
          {
            prompt: "Regret: “I should have got up earlier” (use [起|お]きる): もっと[早|はや]く＿。",
            answers: ["[起|お]きれば よかった", "[起|お]きれば よかった です", "[起|お]きたら よかった", "[起|お]きたら よかった です"],
            explanation: "ば + よかった: [起|お]きればよかった. In speech you'll also hear [起|お]きたらよかった.",
          },
          {
            prompt: "Regret: “I wish I hadn't bought it” (use [買|か]う): ＿よかった。",
            answers: ["[買|か]わなければ", "[買|か]わなきゃ", "[買|か]わなかったら"],
            explanation: "ない → なければ, + よかった: [買|か]わなければよかった. In speech, [買|か]わなきゃよかった or [買|か]わなかったらよかった.",
          },
          {
            prompt: "Fix it: [帰|かえ]るらどうですか？",
            answers: ["[帰|かえ]ったら どう です か？"],
            explanation: "らどう follows the た form, and [帰|かえ]る is an う-verb: [帰|かえ]った → [帰|かえ]ったらどうですか.",
          },
        ],
      },
    ],
  },
];
