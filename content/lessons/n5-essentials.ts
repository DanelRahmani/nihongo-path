import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n5Essentials: Lesson[] = [
  {
    slug: "temo-ii",
    title: "May I? You mustn't: てもいい and てはいけない",
    mark: "てもいい",
    summary: "Ask for permission, give it, and say what isn't allowed.",
    source: "Genki I ch. 6 (〜てもいいです, 〜てはいけません); Bunpro, “Verb + てもいい” and “てはいけない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Verb て form + **もいい** says something is allowed (“it's fine if you…”, “you may”); て form + **はいけない** says it isn't (“you mustn't”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Allowed", "Not allowed"],
        rows: [
          ["Verb て form", "[座|すわ]って も いい", "[座|すわ]って は いけない"],
          ["い-adjective くて", "[高|たか]くて も いい", "[高|たか]くて は いけない"],
          ["Noun or な-adjective で", "[明日|あした] で も いい", "[明日|あした] で は いけない"],
        ],
      },
      {
        type: "text",
        text: "Polite speech adds です to いい and turns いけない into いけません. The は is the particle, said *wa*: [座|すわ]ってはいけない is *suwatte wa ikenai*. After adjectives and nouns, はいけない is rarer than もいい: it means “it won't do if it's …”.",
      },
      { type: "heading", text: "〜てもいい: it's fine, you may" },
      {
        type: "examples",
        items: [
          { jp: "ここ に [座|すわ]って {も いい} です か？", en: "May I sit here?", alt: "ここ に [座|すわ]って {も いい}？" },
          { jp: "この ペン を [使|つか]って {も いい} です か？", en: "Can I use this pen?", alt: "この ペン、 [使|つか]って {も いい}？" },
          { jp: "[写真|しゃしん] を [撮|と]って {も いい} です よ。", en: "Feel free to take photos.", alt: "[写真|しゃしん] を [撮|と]って {も いい} よ。" },
          {
            jp: "[明日|あした] で {も いい} です か？",
            en: "Would tomorrow be all right?",
            alt: "[明日|あした] で {も いい}？",
            note: "After a noun, でもいい: “tomorrow would be fine (instead)”.",
          },
        ],
      },
      { type: "heading", text: "〜てはいけない: you mustn't" },
      {
        type: "examples",
        items: [
          {
            jp: "ここ で [写真|しゃしん] を [撮|と]って {は いけません}。",
            en: "You mustn't take photos here.",
            alt: "ここ で [写真|しゃしん] を [撮|と]っちゃ だめ。",
            note: "In speech ては often shrinks to ちゃ (では to じゃ), and in casual speech だめ (no good) usually replaces いけない.",
          },
          {
            jp: "[教室|きょうしつ] で [食|た]べて {は いけません}。",
            en: "You're not allowed to eat in the classroom.",
            alt: "[教室|きょうしつ] で [食|た]べちゃ だめ だ よ。",
          },
          {
            jp: "[図書館|としょかん] で [電話|でんわ] して {は いけません}。",
            en: "You mustn't make phone calls in the library.",
            alt: "[図書館|としょかん] で [電話|でんわ] しちゃ だめ。",
          },
          {
            jp: "[授業|じゅぎょう] に [遅|おく]れて {は いけない} よ。",
            en: "You mustn't be late for class.",
            alt: "[授業|じゅぎょう] に [遅|おく]れて {は いけません} よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "ここ で [泳|およ]いで {も いい} です。", en: "You can swim here." },
        b: { jp: "ここ で [泳|およ]いで {は いけません}。", en: "You mustn't swim here." },
        diff: "Only what follows the て form changes: もいい allows it, はいけない forbids it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "It hangs on the て form",
        text: "✗ [座|すわ]るもいいですか？ ✓ [座|すわ]ってもいいですか？ もいい and はいけない always follow the て form, never the dictionary form.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Asked 〜てもいいですか, people rarely answer いいえ、いけません: it sounds like a rule being read out. They say すみません、ちょっと… and leave the “no” unsaid, or give the reason. いけません and だめです are for rules, signs, and parents talking to children.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Visitor", jp: "すみません、 [中|なか] で [写真|しゃしん] を [撮|と]って {も いい} です か？", en: "Excuse me, may I take photos inside?" },
          { speaker: "Staff", jp: "すみません、 [中|なか] は ちょっと… [外|そと] で は [撮|と]って {も いい} です よ。", en: "Sorry, not inside, I'm afraid… You're welcome to take them outside." },
          { speaker: "Visitor", jp: "わかりました。 ありがとう ございます。", en: "I see. Thank you." },
        ],
        note: "[中|なか]はちょっと… is the usual polite “no”: the staff member never says いけません.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "Casual questions often drop the も: [借|か]りていい？ (can I borrow it?).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with いい: “May I open the window?” (use [開|あ]ける): [窓|まど]を＿か？",
            answers: ["[開|あ]けて も いい です", "[開|あ]けて いい です"],
            explanation: "[開|あ]ける → [開|あ]けて, + もいい, + です: [窓|まど]を[開|あ]けてもいいですか？",
          },
          {
            prompt: "Polite rule: “You mustn't drink alcohol” (use [飲|の]む): お[酒|さけ]を＿。",
            answers: ["[飲|の]んで は いけません", "[飲|の]んで は だめ です", "[飲|の]んで は いけない です", "[飲|の]んじゃ いけません", "[飲|の]んじゃ だめ です"],
            explanation: "[飲|の]む → [飲|の]んで, + はいけません. In speech ては often becomes ちゃ, and では becomes じゃ: [飲|の]んじゃいけません.",
          },
          {
            prompt: "Casual: “Can I look at your photos?” (use [見|み]る): [写真|しゃしん]、＿？",
            answers: ["[見|み]て も いい", "[見|み]て いい"],
            explanation: "[見|み]る → [見|み]て, + もいい; casually the も often drops: [見|み]ていい？",
          },
          {
            prompt: "“It's fine if it's small” (use [小|ちい]さい): ＿もいいです。",
            answers: ["[小|ちい]さくて"],
            explanation: "An い-adjective takes くて before もいい: [小|ちい]さくてもいいです.",
          },
          {
            prompt: "Fix it: [行|い]くもいいですか？",
            answers: ["[行|い]って も いい です か？", "[行|い]って いい です か？"],
            explanation: "もいい follows the て form, and [行|い]く's is [行|い]って: [行|い]ってもいいですか？",
          },
        ],
      },
    ],
  },
  {
    slug: "naide-kudasai",
    title: "Please don't: ないでください",
    mark: "ないでください",
    summary: "Ask someone politely not to do something.",
    source: "Genki I ch. 8 (〜ないでください); Bunpro, “ないでください”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Verb ない form + **でください** asks someone not to do something: “please don't …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "ない form", "Please don't"],
        rows: [
          ["る-verb", "[忘|わす]れない", "[忘|わす]れないで ください"],
          ["う-verb", "[入|はい]らない", "[入|はい]らないで ください"],
          ["する", "しない", "しないで ください"],
          ["[来|く]る", "[来|こ]ない", "[来|こ]ないで ください"],
        ],
      },
      {
        type: "text",
        text: "It mirrors てください (please do), with the ない form in place of the て form. Casual speech drops ください: [見|み]ないで (don't look), often softened with ね.",
      },
      {
        type: "examples",
        items: [
          { jp: "[電気|でんき] を [消|け]さ{ないで ください}。", en: "Please don't turn the light off.", alt: "[電気|でんき]、 [消|け]さ{ないで}。" },
          { jp: "[廊下|ろうか] を [走|はし]ら{ないで ください}。", en: "Please don't run in the corridor.", note: "You'll see this on signs in Japanese schools." },
          {
            jp: "この こと は [誰|だれ] に も [言|い]わ{ないで ください} ね。",
            en: "Please don't tell anyone about this, OK?",
            alt: "この こと、 [誰|だれ] に も [言|い]わ{ないで} ね。",
          },
          { jp: "[私|わたし] の ケーキ、 [食|た]べ{ないで} ね。", en: "Don't eat my cake, OK?", alt: "[私|わたし] の ケーキ を [食|た]べ{ないで ください} ね。" },
          { jp: "[傘|かさ] を [忘|わす]れ{ないで ください} ね。", en: "Don't forget your umbrella." },
        ],
      },
      {
        type: "pair",
        a: { jp: "ドア を [開|あ]け{て} ください。", en: "Please open the door." },
        b: { jp: "ドア を [開|あ]け{ないで} ください。", en: "Please don't open the door." },
        diff: "て form + ください asks someone to do it; ない form + でください asks them not to.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ないで, not なくて",
        text: "✗ [食|た]べなくてください ✓ [食|た]べないでください. Before ください the negative is ないで. なくて is the ない form's own て form, used in なくてもいい and for “not …, and so …”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Teacher", jp: "[今日|きょう] の テスト は ペン で [書|か]いて ください。 [鉛筆|えんぴつ] は [使|つか]わ{ないで ください}。", en: "Please write today's test in pen. Don't use a pencil." },
          { speaker: "Student", jp: "[辞書|じしょ] は [見|み]て も いい です か？", en: "May we look at a dictionary?" },
          { speaker: "Teacher", jp: "いいえ、 [辞書|じしょ] も [見|み]{ないで ください}。", en: "No, please don't look at dictionaries either." },
        ],
        note: "A teacher giving the rules can answer いいえ directly; asking a favour of someone, people soften it.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “Please don't come into this room” (use [入|はい]る): この[部屋|へや]に＿。",
            answers: ["[入|はい]らないで ください"],
            explanation: "[入|はい]る is an う-verb: [入|はい]らない → [入|はい]らないで, + ください.",
          },
          {
            prompt: "Casual, to a friend: “Don't go yet” (use [行|い]く): まだ＿。",
            answers: ["[行|い]かないで"],
            explanation: "Casual speech drops ください: [行|い]かないで.",
          },
          {
            prompt: "Polite: “Please don't speak in English” (use [話|はな]す): [英語|えいご]で＿。",
            answers: ["[話|はな]さないで ください"],
            explanation: "[話|はな]す → [話|はな]さない → [話|はな]さないでください.",
          },
          {
            prompt: "Polite: “Please don't put your bag here” (use [置|お]く): ここにかばんを＿。",
            answers: ["[置|お]かないで ください"],
            explanation: "[置|お]く → [置|お]かない → [置|お]かないでください.",
          },
          {
            prompt: "Fix it: ここで[飲|の]まなくてください。",
            answers: ["ここ で [飲|の]まないで ください。"],
            explanation: "Before ください the negative is ないで, not なくて: ここで[飲|の]まないでください.",
          },
        ],
      },
    ],
  },
  {
    slug: "nakereba",
    title: "Must: なければならない, なくてはいけない, なきゃ",
    mark: "なければ",
    summary: "Say what you have to do, from the written なければならない to the casual なきゃ.",
    source: "Genki I ch. 12 (〜なければいけません, 〜なきゃいけない); Bunpro, “なくてはいけない”, “なければならない”, “ないと” and “なきゃ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Japanese says “must” as “if I don't, it won't do”: the ない form's ない becomes **なければ** or **なくては**, followed by **ならない** or **いけない**.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Must", "Casual short form"],
        rows: [
          ["Verb ない form: ない → なければ", "[行|い]かなければ ならない", "[行|い]かなきゃ"],
          ["Verb ない form: ない → なくては", "[行|い]かなくて は いけない", "[行|い]かなくちゃ"],
          ["Verb ない form + と", "[行|い]かない と いけない", "[行|い]かない と"],
        ],
      },
      {
        type: "text",
        text: "ならない and いけない both work. ならない sounds more general or written (rules, duties); いけない is more personal and common in speech. Polite speech says なりません and いけません. In conversation the end often drops: [行|い]かなきゃ, [行|い]かなくちゃ and [行|い]かないと all mean “I've got to go”. なきゃ and なくちゃ are spoken forms: on their own they're casual, and before いけません they're heard in everyday polite talk too.",
      },
      { type: "heading", text: "なければ: must" },
      {
        type: "examples",
        items: [
          {
            jp: "[毎日|まいにち] [薬|くすり] を [飲|の]ま{なければ} なりません。",
            en: "I have to take medicine every day.",
            alt: "[毎日|まいにち] [薬|くすり] を [飲|の]ま{なければ} ならない。",
          },
          {
            jp: "[今日|きょう] は [早|はや]く [帰|かえ]ら{なければ} いけません。",
            en: "I have to go home early today.",
            alt: "[今日|きょう] は [早|はや]く [帰|かえ]ら{なければ} いけない。",
          },
          {
            jp: "[図書館|としょかん] で は [静|しず]か に し{なければ} なりません。",
            en: "You must be quiet in the library.",
            note: "A rule for everyone, so ならない suits it.",
          },
        ],
      },
      { type: "heading", text: "なくては: must, the same" },
      {
        type: "examples",
        items: [
          {
            jp: "[明日|あした] は [六時|ろくじ] に [起|お]き{なくて は} いけません。",
            en: "I have to get up at six tomorrow.",
            alt: "[明日|あした] は [六時|ろくじ] に [起|お]き{なくて は} いけない。",
          },
          {
            jp: "[今日|きょう] は [銀行|ぎんこう] に [行|い]か{なくて は} いけません。",
            en: "I have to go to the bank today.",
            alt: "[今日|きょう] は [銀行|ぎんこう] に [行|い]か{なくて は} いけない。",
          },
          { jp: "[毎朝|まいあさ] [早|はや]く [家|いえ] を [出|で]{なくて は} なりません。", en: "I have to leave home early every morning." },
          {
            jp: "[毎晩|まいばん] [犬|いぬ] の [散歩|さんぽ] を し{なくて は} いけない。",
            en: "I have to walk the dog every evening.",
            alt: "[毎晩|まいばん] [犬|いぬ] の [散歩|さんぽ] を し{なくて は} いけません。",
          },
        ],
      },
      { type: "heading", text: "ないと, なきゃ, なくちゃ: in conversation" },
      {
        type: "examples",
        items: [
          { jp: "もう [九時|くじ] だ。 [行|い]か{なきゃ}。", en: "It's nine already. I've got to go." },
          {
            jp: "[明日|あした] テスト だ から、 [勉強|べんきょう] し{なくちゃ}。",
            en: "I've got a test tomorrow, so I need to study.",
            alt: "[明日|あした] テスト です から、 [勉強|べんきょう] し{ない と} いけません。",
          },
          { jp: "そろそろ [寝|ね]{ない と}。", en: "I should get to bed soon.", alt: "そろそろ [寝|ね]{ない と} いけません。" },
          { jp: "[田中|たなか]-さん に [電話|でんわ] し{なきゃ} いけない。", en: "I've got to call Tanaka-san." },
          { jp: "もう [遅|おそ]い から、 [帰|かえ]ら{ない と}。", en: "It's late, I'd better head home.", alt: "もう [遅|おそ]い です から、 [帰|かえ]ら{ない と} いけません。" },
          {
            jp: "もう [少|すこ]し [野菜|やさい] を [食|た]べ{ない と} いけません よ。",
            en: "You need to eat a few more vegetables.",
            alt: "もう [少|すこ]し [野菜|やさい] を [食|た]べ{ない と} いけない よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "ここ に [名前|なまえ] を [書|か]か{なければ} いけません。", en: "You have to write your name here." },
        b: { jp: "ここ に [名前|なまえ] を [書|か]い{て は} いけません。", en: "You mustn't write your name here." },
        diff: "Both end in いけません. What comes before decides: なければ (if you don't) makes it a must, ては (if you do) makes it forbidden.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "It grows out of the ない form",
        text: "✗ [行|い]くなければなりません ✓ [行|い]かなければなりません. Start from the ない form ([行|い]かない) and change its ない to なければ, never from the dictionary form.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[今日|きょう]、 カラオケ に [行|い]かない？", en: "Do you want to go to karaoke today?" },
          { speaker: "Kenta", jp: "ごめん、 [明日|あした] [早|はや]い から、 [帰|かえ]ら{なきゃ}。", en: "Sorry, I've got an early start tomorrow, so I've got to head home." },
          { speaker: "Aya", jp: "そう か。 じゃ、 また [今度|こんど] ね。", en: "Oh, OK. Next time, then." },
        ],
        note: "Between friends the short なきゃ is the natural choice; なければなりません would sound like a speech.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “I have to work on Saturday too” (use [働|はたら]く): [土曜日|どようび]も＿。",
            answers: [
              "[働|はたら]かなければ なりません",
              "[働|はたら]かなければ いけません",
              "[働|はたら]かなくて は なりません",
              "[働|はたら]かなくて は いけません",
              "[働|はたら]かない と いけません",
              "[働|はたら]かなきゃ いけません",
              "[働|はたら]かなくちゃ いけません",
            ],
            explanation: "[働|はたら]かない → [働|はたら]かなければ (or なくては), + なりません or いけません.",
          },
          {
            prompt: "Casual, with なきゃ: “I've got to clean my room” (use [掃除|そうじ]する): [部屋|へや]を＿。",
            answers: ["[掃除|そうじ] しなきゃ", "[掃除|そうじ] しなきゃ いけない", "[掃除|そうじ] しなきゃ ならない"],
            explanation: "しない → しなきゃ; the いけない after it is often dropped: [部屋|へや]を[掃除|そうじ]しなきゃ.",
          },
          {
            prompt: "Make it “must”: [待|ま]た＿ならない",
            answers: ["なければ", "なくて は"],
            explanation: "[待|ま]たない → [待|ま]たなければならない (or [待|ま]たなくてはならない).",
          },
          {
            prompt: "Fix it: [英語|えいご]で[話|はな]すなければいけません。",
            answers: ["[英語|えいご] で [話|はな]さなければ いけません。", "[英語|えいご] で [話|はな]さなくて は いけません。"],
            explanation: "Start from the ない form, [話|はな]さない: [話|はな]さなければいけません.",
          },
          {
            prompt: "Casual, with ないと: “I need to buy milk” (use [買|か]う): [牛乳|ぎゅうにゅう]を＿。",
            answers: ["[買|か]わない と", "[買|か]わない と いけない"],
            explanation: "[買|か]う → [買|か]わない, + と: [牛乳|ぎゅうにゅう]を[買|か]わないと.",
          },
        ],
      },
    ],
  },
  {
    slug: "nakute-mo-ii",
    title: "You don't have to: なくてもいい",
    mark: "なくてもいい",
    summary: "Say something isn't necessary, and keep it apart from “must” and “mustn't”.",
    source: "Bunpro, “なくてもいい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists なくてもいい at N5."),
    blocks: [
      {
        type: "idea",
        text: "The ない form with ない → **なくてもいい** says something isn't necessary: “you don't have to …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Don't have to"],
        rows: [
          ["Verb ない form: ない → なくて", "[来|こ]なくて も いい"],
          ["い-adjective: い → くなくて", "[高|たか]くなくて も いい"],
          ["Noun or な-adjective + じゃなくて", "[今日|きょう] じゃ なくて も いい"],
        ],
      },
      {
        type: "text",
        text: "Polite speech adds です. Casual speech often drops the も: [来|こ]なくていい. Three look-alikes to keep apart: なければならない (must), なくてもいい (don't have to) and てはいけない (mustn't).",
      },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [来|こ]{なくて も いい} です よ。", en: "You don't have to come tomorrow.", alt: "[明日|あした] は [来|こ]{なくて も いい} よ。" },
          { jp: "[靴|くつ] を [脱|ぬ]が{なくて も いい} です か？", en: "Is it all right to keep my shoes on?", alt: "[靴|くつ]、 [脱|ぬ]が{なくて も いい}？" },
          { jp: "[全部|ぜんぶ] [食|た]べ{なくて も いい} よ。", en: "You don't have to eat it all.", alt: "[全部|ぜんぶ] [食|た]べ{なくて も いい} です よ。" },
          {
            jp: "[急|いそ]が{なくて も いい} です。 まだ [時間|じかん] が あります から。",
            en: "There's no need to hurry. There's still time.",
            alt: "[急|いそ]が{なくて も いい} よ。 まだ [時間|じかん] が ある から。",
          },
          { jp: "[辞書|じしょ] は [新|あたら]しく{なくて も いい} です。", en: "The dictionary doesn't have to be new." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[今日|きょう] は [会社|かいしゃ] に [行|い]か{なくて も いい}。", en: "I don't have to go into the office today." },
        b: { jp: "[今日|きょう] は [会社|かいしゃ] に [行|い]か{なければ いけない}。", en: "I have to go into the office today." },
        diff: "Not necessary vs necessary. Both grow from the ない form: なくて + もいい, なければ + いけない.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Don't have to, must, mustn't",
        text: "✗ [来|こ]なくてはいけません (meaning “you needn't come”) ✓ [来|こ]なくてもいいです. They look alike, but なくてはいけない means “must”; “don't have to” is なくてもいい. And “mustn't” is てはいけない: [来|き]てはいけません.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Visitor", jp: "[子供|こども] は [切符|きっぷ] を [買|か]わ{なくて も いい} です か？", en: "Do children not need a ticket?" },
          { speaker: "Staff", jp: "はい、 [五歳|ごさい] まで は [買|か]わ{なくて も いい} です よ。", en: "That's right: children up to five don't need one." },
          { speaker: "Visitor", jp: "そう です か。 ありがとう ございます。", en: "I see. Thank you." },
        ],
        note: "はい agrees with the question as it was asked: “Right, they don't need one.”",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “You don't have to write your name” (use [書|か]く): [名前|なまえ]は＿。",
            answers: ["[書|か]かなくて も いい です", "[書|か]かなくて いい です"],
            explanation: "[書|か]かない → [書|か]かなくて, + もいいです.",
          },
          {
            prompt: "Casual: “You don't have to wash it” (use [洗|あら]う): ＿よ。",
            answers: ["[洗|あら]わなくて も いい", "[洗|あら]わなくて いい"],
            explanation: "[洗|あら]う → [洗|あら]わない → [洗|あら]わなくてもいい; casually the も often drops.",
          },
          {
            prompt: "“It doesn't have to be big” (use [大|おお]きい): ＿もいいです。",
            answers: ["[大|おお]きくなくて"],
            explanation: "An い-adjective: [大|おお]きくない → [大|おお]きくなくて, + もいいです.",
          },
          {
            prompt: "Answer politely, “No, you don't have to.”: お[金|かね]を[払|はら]わなければいけませんか？ いいえ、＿。",
            answers: ["[払|はら]わなくて も いい です", "[払|はら]わなくて いい です"],
            explanation: "The answer to “must I?” is なくてもいい: [払|はら]わなくてもいいです.",
          },
          {
            prompt: "“It doesn't have to be a pen”: ペン＿もいいです。",
            answers: ["じゃ なくて", "で なくて", "で は なくて"],
            explanation: "A noun takes じゃなくて (or でなくて, ではなくて) before もいい.",
          },
        ],
      },
    ],
  },
  {
    slug: "mae-ato",
    title: "Before and after: まえに, あとで and てから",
    mark: "[前|まえ]・[後|あと]",
    summary: "Put two actions in order.",
    source: "Bunpro, “前に”, “後で” and “てから”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**[前|まえ]に** (before) follows the dictionary form, **[後|あと]で** (after) the た form, and **てから** (after, and then) the て form.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb dictionary form + [前|まえ]に", "[寝|ね]る [前|まえ] に"],
          ["Verb た form + [後|あと]で", "[食|た]べた [後|あと] で"],
          ["Verb て form + から", "[食|た]べて から"],
          ["Noun + の[前|まえ]に · の[後|あと]で", "[授業|じゅぎょう] の [前|まえ] に · [授業|じゅぎょう] の [後|あと] で"],
        ],
      },
      {
        type: "text",
        text: "The form inside never changes with the tense: [前|まえ]に always takes the dictionary form, even about the past, and [後|あと]で always takes the た form, even about the future. てから puts the stress on the order (“first …, then …”) and is the everyday choice for routines; it can also count the time since something happened.",
      },
      { type: "heading", text: "〜[前|まえ]に: before" },
      {
        type: "examples",
        items: [
          { jp: "[寝|ね]る {[前|まえ] に} [本|ほん] を [読|よ]みます。", en: "I read before going to bed.", alt: "[寝|ね]る {[前|まえ] に} [本|ほん] を [読|よ]む。" },
          { jp: "[食|た]べる {[前|まえ] に}、 [手|て] を [洗|あら]って ください。", en: "Please wash your hands before eating.", alt: "[食|た]べる {[前|まえ] に}、 [手|て] を [洗|あら]って。" },
          {
            jp: "[日本|にほん] に [来|く]る {[前|まえ] に}、 [少|すこ]し [日本語|にほんご] を [勉強|べんきょう] しました。",
            en: "Before I came to Japan, I studied a little Japanese.",
            alt: "[日本|にほん] に [来|く]る {[前|まえ] に}、 [少|すこ]し [日本語|にほんご] を [勉強|べんきょう] した。",
            note: "The coming is in the past, but [前|まえ]に still takes the dictionary form; the past goes on the last verb.",
          },
          { jp: "[授業|じゅぎょう] の {[前|まえ] に} コーヒー を [飲|の]もう。", en: "Let's have a coffee before class.", alt: "[授業|じゅぎょう] の {[前|まえ] に} コーヒー を [飲|の]みましょう。" },
        ],
      },
      { type: "heading", text: "〜[後|あと]で: after" },
      {
        type: "examples",
        items: [
          { jp: "[晩|ばん]ご[飯|はん] を [食|た]べた {[後|あと] で}、 テレビ を [見|み]ました。", en: "After dinner, I watched TV.", alt: "[晩|ばん]ご[飯|はん] を [食|た]べた {[後|あと] で}、 テレビ を [見|み]た。" },
          { jp: "[仕事|しごと] の {[後|あと] で}、 [飲|の]み に [行|い]きません か？", en: "Shall we go for a drink after work?", alt: "[仕事|しごと] の {[後|あと] で}、 [飲|の]み に [行|い]かない？" },
          {
            jp: "[授業|じゅぎょう] が [終|お]わった {[後|あと] で}、 [図書館|としょかん] で [勉強|べんきょう] する。",
            en: "When class is over, I'll study in the library.",
            alt: "[授業|じゅぎょう] が [終|お]わった {[後|あと] で}、 [図書館|としょかん] で [勉強|べんきょう] します。",
            note: "The class hasn't ended yet, but [後|あと]で still takes the た form.",
          },
          { jp: "テスト の {[後|あと] で}、 [何|なに] を します か？", en: "What are you doing after the test?", alt: "テスト の {[後|あと] で}、 [何|なに] する？" },
        ],
      },
      { type: "heading", text: "〜てから: after doing, and then" },
      {
        type: "examples",
        items: [
          { jp: "[宿題|しゅくだい] を して {から}、 [遊|あそ]び に [行|い]く。", en: "I'll go out to play once I've done my homework.", alt: "[宿題|しゅくだい] を して {から}、 [遊|あそ]び に [行|い]きます。" },
          { jp: "お[風呂|ふろ] に [入|はい]って {から}、 [寝|ね]ます。", en: "I have a bath and then go to bed.", alt: "お[風呂|ふろ] に [入|はい]って {から}、 [寝|ね]る。" },
          { jp: "[仕事|しごと] が [終|お]わって {から}、 [会|あ]いましょう。", en: "Let's meet after work.", alt: "[仕事|しごと] が [終|お]わって {から}、 [会|あ]おう。" },
          { jp: "[日本|にほん] に [来|き]て {から}、 [三年|さんねん] に なります。", en: "It's been three years since I came to Japan.", note: "てから also counts the time since something happened." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[食|た]べる {[前|まえ] に} [薬|くすり] を [飲|の]んで ください。", en: "Please take the medicine before you eat." },
        b: { jp: "[食|た]べた {[後|あと] で} [薬|くすり] を [飲|の]んで ください。", en: "Please take the medicine after you've eaten." },
        diff: "Before eating vs after eating. The verb's form changes with the word: dictionary form before [前|まえ]に, た form before [後|あと]で.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The form never follows the tense",
        text: "✗ [寝|ね]た[前|まえ]に ✓ [寝|ね]る[前|まえ]に. [前|まえ]に always takes the dictionary form, even in a story about the past. The mirror mistake: ✗ [食|た]べる[後|あと]で ✓ [食|た]べた[後|あと]で.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[明日|あした]、 [映画|えいが] を [見|み]る {[前|まえ] に} [昼|ひる]ご[飯|はん] を [食|た]べない？", en: "Tomorrow, shall we have lunch before the film?" },
          { speaker: "Kenta", jp: "いい ね。 [見|み]た {[後|あと] で} お[茶|ちゃ] も しよう。", en: "Good idea. Let's have a cup of tea after it, too." },
          { speaker: "Aya", jp: "うん、 そう しよう。", en: "Yes, let's." },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "On its own, [後|あと]で means “later”: [後|あと]で[電話|でんわ]するね (I'll call you later).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “Please close the window before you go home” (use [帰|かえ]る): ＿、[窓|まど]を[閉|し]めてください。",
            answers: ["[帰|かえ]る [前|まえ] に"],
            explanation: "Dictionary form + [前|まえ]に: [帰|かえ]る[前|まえ]に.",
          },
          {
            prompt: "“After watching the news, I went to bed” (use [見|み]る and [後|あと]で): ニュースを＿、[寝|ね]ました。",
            answers: ["[見|み]た [後|あと] で"],
            explanation: "た form + [後|あと]で: [見|み]た[後|あと]で.",
          },
          {
            prompt: "With てから: “I'll go once I've eaten” (use [食|た]べる): ＿[行|い]きます。",
            answers: ["[食|た]べて から"],
            explanation: "て form + から: [食|た]べてから[行|い]きます.",
          },
          {
            prompt: "“Before the party, I bought a cake”: パーティー＿、ケーキを[買|か]いました。",
            answers: ["の [前|まえ] に"],
            explanation: "A noun takes の before [前|まえ]に: パーティーの[前|まえ]に.",
          },
          {
            prompt: "Fix it: [掃除|そうじ]する[後|あと]で、[出|で]かけます。",
            answers: ["[掃除|そうじ] した [後|あと] で、 [出|で]かけます。", "[掃除|そうじ] して から、 [出|で]かけます。"],
            explanation: "[後|あと]で takes the た form, even about the future: [掃除|そうじ]した[後|あと]で (or [掃除|そうじ]してから).",
          },
        ],
      },
    ],
  },
  {
    slug: "toki",
    title: "When: とき, and the tense inside it",
    mark: "とき",
    summary: "Say when something happens, and get the tense inside the とき clause right.",
    source: "Genki II ch. 16 (〜とき); Bunpro, “とき”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists とき at N5."),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **とき** means “when …”, and the tense inside it says whether that action comes before or after the main one.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[行|い]く とき · [行|い]った とき"],
          ["い-adjective", "[寒|さむ]い とき"],
          ["な-adjective + な", "[暇|ひま] な とき"],
          ["Noun + の", "[子供|こども] の とき"],
        ],
      },
      {
        type: "text",
        text: "とき is a noun (“time”), so it attaches like one, and in this use it's written in kana. は or に often follows it: ときは (as for when …), ときに (at the time …).",
      },
      { type: "heading", text: "とき after adjectives and nouns" },
      {
        type: "examples",
        items: [
          { jp: "[暇|ひま] な {とき}、 [何|なに] を します か？", en: "What do you do when you're free?", alt: "[暇|ひま] な {とき}、 [何|なに] する？" },
          { jp: "[子供|こども] の {とき}、 [大阪|おおさか] に [住|す]んで いました。", en: "When I was a child, I lived in Osaka.", alt: "[子供|こども] の {とき}、 [大阪|おおさか] に [住|す]んで いた。" },
          { jp: "[寒|さむ]い {とき} は、 [温|あたた]かい お[茶|ちゃ] が いい です ね。", en: "When it's cold, a hot cup of tea is nice, isn't it?", alt: "[寒|さむ]い {とき} は、 [温|あたた]かい お[茶|ちゃ] が いい ね。" },
          { jp: "[分|わ]からない {とき} は、 [先生|せんせい] に [聞|き]いて ください。", en: "When you don't understand, ask the teacher.", alt: "[分|わ]からない {とき} は、 [先生|せんせい] に [聞|き]いて ね。" },
        ],
      },
      { type: "heading", text: "The tense inside とき" },
      {
        type: "examples",
        items: [
          { jp: "[寝|ね]る {とき}、 [窓|まど] を [閉|し]めます。", en: "I close the window when I go to bed.", alt: "[寝|ね]る {とき}、 [窓|まど] を [閉|し]める。", note: "Before going to sleep: [寝|ね]る is still to come." },
          { jp: "[朝|あさ] [起|お]きた {とき}、 [雪|ゆき] が [降|ふ]って いました。", en: "When I woke up this morning, it was snowing.", alt: "[朝|あさ] [起|お]きた {とき}、 [雪|ゆき] が [降|ふ]って いた。" },
          { jp: "[道|みち] を [渡|わた]る {とき} は、 [右|みぎ] と [左|ひだり] を [見|み]て ね。", en: "When you cross the road, look right and left.", alt: "[道|みち] を [渡|わた]る {とき} は、 [右|みぎ] と [左|ひだり] を [見|み]て ください。" },
          {
            jp: "[疲|つか]れた {とき} は、 [甘|あま]い もの が [食|た]べたく なります。",
            en: "When I'm tired, I feel like something sweet.",
            alt: "[疲|つか]れた {とき} は、 [甘|あま]い もの が [食|た]べたく なる。",
            note: "[疲|つか]れたとき: the tiredness has already set in, so the た form.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[家|いえ] に [帰|かえ]る {とき}、 [友達|ともだち] に [電話|でんわ] しました。", en: "I called my friend on my way home." },
        b: { jp: "[家|いえ] に [帰|かえ]った {とき}、 [友達|ともだち] に [電話|でんわ] しました。", en: "I called my friend when I got home." },
        diff: "[帰|かえ]るとき: on the way, before getting home. [帰|かえ]ったとき: once home. The tense inside とき is measured from the main verb, not from now.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "とき is a noun",
        text: "✗ [学生|がくせい]とき ✓ [学生|がくせい]のとき. A noun takes の before とき, and a な-adjective takes な: [元気|げんき]なとき (when you're well).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[大学生|だいがくせい] の {とき}、 アルバイト を して いました か？", en: "Did you have a part-time job when you were at university?" },
          { speaker: "Mr Mori", jp: "はい、 [休|やす]み の {とき} は いつも [喫茶店|きっさてん] で [働|はたら]いて いました。", en: "Yes, in the holidays I always worked in a café." },
          { speaker: "Ms Sato", jp: "そう です か。 いい です ね。", en: "Really? That sounds nice." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“When I'm ill, I stay off school”: [病気|びょうき]＿、[学校|がっこう]を[休|やす]みます。",
            answers: ["の とき", "の とき は"],
            explanation: "A noun takes の before とき: [病気|びょうき]のとき.",
          },
          {
            prompt: "“You don't have to come when you're busy” (use [忙|いそが]しい): ＿は、[来|こ]なくてもいいですよ。",
            answers: ["[忙|いそが]しい とき"],
            explanation: "An い-adjective goes straight before とき: [忙|いそが]しいとき.",
          },
          {
            prompt: "“When I got to the station, the train had already gone” (use [着|つ]く): [駅|えき]に＿、[電車|でんしゃ]はもう[出|で]ていました。",
            answers: ["[着|つ]いた とき"],
            explanation: "The arriving came first, so the た form: [着|つ]いたとき.",
          },
          {
            prompt: "“We say いってきます when we leave home” (use [出|で]る): [家|いえ]を＿、「いってきます」と[言|い]います。",
            answers: ["[出|で]る とき"],
            explanation: "You say it before you've left, so the dictionary form: [出|で]るとき.",
          },
          {
            prompt: "Fix it: [暇|ひま]ときに[電話|でんわ]してね。",
            answers: ["[暇|ひま] な とき に [電話|でんわ] して ね。", "[暇|ひま] な とき [電話|でんわ] して ね。"],
            explanation: "A な-adjective takes な before とき: [暇|ひま]なとき.",
          },
        ],
      },
    ],
  },
  {
    slug: "no-nominaliser",
    title: "Actions as nouns: the の in “I like doing”",
    mark: "のが[好|す]き",
    summary: "Turn an action into a noun with の, to like it, be good at it, or talk about it.",
    source: "Genki I ch. 8 (Verb のが好きです); Bunpro, “のが好き”, “のが上手” and “のは”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A plain verb + **の** turns an action into a noun, so you can like it, be good or bad at it, or make it the topic: [泳|およ]ぐのが[好|す]き (I like swimming).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["Verb + のが[好|す]き · [嫌|きら]い", "[泳|およ]ぐ の が [好|す]き"],
          ["Verb + のが[上手|じょうず] · [下手|へた]", "[歌|うた]う の が [上手|じょうず]"],
          ["Verb + のは + a description", "[一人|ひとり] で [旅行|りょこう] する の は [楽|たの]しい"],
        ],
      },
      {
        type: "text",
        text: "The verb before の is in a plain form, usually the dictionary form. こと can take の's place before が[好|す]き ([読|よ]むことが[好|す]き), and is more common in writing.",
      },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] は [絵|え] を [描|か]く {の} が [好|す]き です。", en: "I like drawing.", alt: "[私|わたし] は [絵|え] を [描|か]く {の} が [好|す]き。" },
          { jp: "[兄|あに] は [歌|うた]う {の} が [上手|じょうず] です。", en: "My big brother is a good singer.", alt: "[兄|あに] は [歌|うた]う {の} が [上手|じょうず] だ よ。" },
          { jp: "[朝|あさ] [早|はや]く [起|お]きる {の} は [大変|たいへん] です。", en: "Getting up early is hard.", alt: "[朝|あさ] [早|はや]く [起|お]きる {の} は [大変|たいへん] だ よ。" },
          { jp: "[私|わたし] は [人|ひと] の [前|まえ] で [話|はな]す {の} が [下手|へた] です。", en: "I'm bad at speaking in front of people." },
          { jp: "[日本語|にほんご] を [読|よ]む {の} は [難|むずか]しい けど、 [話|はな]す の は [楽|たの]しい。", en: "Reading Japanese is hard, but speaking it is fun." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[映画|えいが] {が} [好|す]き です。", en: "I like films." },
        b: { jp: "[映画|えいが] を [見|み]る {の が} [好|す]き です。", en: "I like watching films." },
        diff: "A noun takes が[好|す]き directly. An action needs の first, which turns [見|み]る into a noun.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A verb can't take が on its own",
        text: "✗ [泳|およ]ぐが[好|す]きです ✓ [泳|およ]ぐのが[好|す]きです. が, は and を follow nouns, so the verb needs の (or こと) to become one first.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[休|やす]み の [日|ひ] は [何|なに] を して いる の？", en: "What do you do on your days off?" },
          { speaker: "Kenta", jp: "[山|やま] に [登|のぼ]る {の} が [好|す]き だ から、 よく [行|い]く よ。", en: "I like climbing mountains, so I go quite often." },
          { speaker: "Aya", jp: "へえ、 いい ね。 [私|わたし] は [家|いえ] で ゆっくり する {の} が [好|す]き。", en: "Oh, nice. I like taking it easy at home." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “I like listening to music” (use [聞|き]く): [音楽|おんがく]を＿です。",
            answers: ["[聞|き]く の が [好|す]き", "[聞|き]く こと が [好|す]き"],
            explanation: "[聞|き]く + の turns it into a noun: [音楽|おんがく]を[聞|き]くのが[好|す]きです.",
          },
          {
            prompt: "Polite: “My mother is good at making cakes” (use [作|つく]る and [上手|じょうず]): [母|はは]はケーキを＿。",
            answers: ["[作|つく]る の が [上手|じょうず] です"],
            explanation: "[作|つく]る + のが[上手|じょうず]です.",
          },
          {
            prompt: "“Walking in the park is fun”: [公園|こうえん]を[歩|ある]く＿は[楽|たの]しいです。",
            answers: ["の", "こと"],
            explanation: "の (or こと) makes [歩|ある]く a noun, the topic of the sentence.",
          },
          {
            prompt: "Casual: “My little brother is bad at swimming” (use [泳|およ]ぐ and [下手|へた]): [弟|おとうと]は＿。",
            answers: ["[泳|およ]ぐ の が [下手|へた]", "[泳|およ]ぐ の が [下手|へた] だ"],
            explanation: "[泳|およ]ぐ + のが[下手|へた]; casually the だ often drops.",
          },
          {
            prompt: "Fix it: [走|はし]るが[好|す]きです。",
            answers: ["[走|はし]る の が [好|す]き です。", "[走|はし]る こと が [好|す]き です。"],
            explanation: "が follows nouns, so [走|はし]る needs の first: [走|はし]るのが[好|す]きです.",
          },
        ],
      },
    ],
  },
  {
    slug: "comparing",
    title: "Comparing: より, のほうが and いちばん",
    mark: "より",
    summary: "Compare two things, ask which one, and pick the best of a group.",
    source: "Genki I ch. 10 (comparison between two items and among three or more); Bunpro, “より”, “のほうが” and “の中で一番”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**より** marks what you compare against (“than”), **のほうが** the one that wins, and **の[中|なか]で…[一番|いちばん]** the best of a group.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["A は B より …", "[東京|とうきょう] は [大阪|おおさか] より [大|おお]きい"],
          ["A のほうが B より …", "[自転車|じてんしゃ] の ほう が [車|くるま] より [安|やす]い"],
          ["A と B と どちらが …？", "[犬|いぬ] と [猫|ねこ] と、 どちら が [好|す]き です か？"],
          ["Group の[中|なか]で A が [一番|いちばん] …", "[果物|くだもの] の [中|なか] で りんご が [一番|いちばん] [好|す]き"],
        ],
      },
      {
        type: "text",
        text: "Questions about two things use どちら (casually どっち), and the answer uses のほうが. For three or more, ask with [何|なに], [誰|だれ] or どこ and [一番|いちばん]. A place or a time can set the range with で alone: [世界|せかい]で[一番|いちばん].",
      },
      { type: "link", href: "/learn/particles/de-place-means", label: "で for the range of the “most”", text: "クラスで[一番|いちばん], [世界|せかい]で[一番|いちばん]: で marks the place or group the “most” is within." },
      { type: "heading", text: "より and のほうが: comparing two" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は [昨日|きのう] {より} [暑|あつ]い です ね。", en: "Today's hotter than yesterday, isn't it?", alt: "[今日|きょう] は [昨日|きのう] {より} [暑|あつ]い ね。" },
          { jp: "バス より [電車|でんしゃ] の {ほう} が [速|はや]い よ。", en: "The train's faster than the bus.", alt: "バス より [電車|でんしゃ] の {ほう} が [速|はや]い です よ。" },
          { jp: "[私|わたし] は [夏|なつ] {より} [冬|ふゆ] の ほう が [好|す]き です。", en: "I like winter better than summer." },
          { jp: "この [店|みせ] の {ほう} が [安|やす]い です よ。", en: "This shop's cheaper, you know.", alt: "この [店|みせ] の {ほう} が [安|やす]い よ。" },
        ],
      },
      { type: "heading", text: "どちら: which of the two?" },
      {
        type: "examples",
        items: [
          { jp: "[肉|にく] と [魚|さかな] と、 {どちら} が [好|す]き です か？", en: "Which do you like better, meat or fish?", alt: "[肉|にく] と [魚|さかな]、 {どっち} が [好|す]き？" },
          { jp: "[山|やま] と [海|うみ]、 {どっち} が [好|す]き？", en: "Mountains or the sea: which do you prefer?", alt: "[山|やま] と [海|うみ] と、 {どちら} が [好|す]き です か？" },
          { jp: "[土曜日|どようび] と [日曜日|にちようび] と、 {どちら} が いい です か？", en: "Which is better for you, Saturday or Sunday?" },
          { jp: "[東京|とうきょう] と [京都|きょうと] と、 {どちら} が [古|ふる]い [町|まち] です か？", en: "Which is the older city, Tokyo or Kyoto?" },
        ],
      },
      { type: "heading", text: "の[中|なか]で…[一番|いちばん]: the most" },
      {
        type: "examples",
        items: [
          { jp: "スポーツ {の [中|なか] で}、 [何|なに] が [一番|いちばん] [好|す]き です か？", en: "What's your favourite sport?", alt: "スポーツ {の [中|なか] で}、 [何|なに] が [一番|いちばん] [好|す]き？" },
          { jp: "[家族|かぞく] の [中|なか] で、 [母|はは] が {[一番|いちばん]} [早|はや]く [起|お]きます。", en: "My mother gets up earliest in my family.", alt: "[家族|かぞく] の [中|なか] で、 [母|はは] が {[一番|いちばん]} [早|はや]く [起|お]きる。" },
          { jp: "この [三|みっ]つ の [中|なか] で、 どれ が {[一番|いちばん]} [安|やす]い？", en: "Which of these three is the cheapest?", alt: "この [三|みっ]つ の [中|なか] で、 どれ が {[一番|いちばん]} [安|やす]い です か？" },
          { jp: "[一年|いちねん] の [中|なか] で、 [八月|はちがつ] が {[一番|いちばん]} [暑|あつ]い です。", en: "August is the hottest month of the year." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[猫|ねこ] {より} [犬|いぬ] の ほう が [好|す]き です。", en: "I like dogs more than cats." },
        b: { jp: "[犬|いぬ] {より} [猫|ねこ] の ほう が [好|す]き です。", en: "I like cats more than dogs." },
        diff: "The word before より is the one that loses; the one with のほうが wins. Swap them and the preference flips.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "より means “than”, not “more”",
        text: "✗ [電車|でんしゃ]よりバスのほうが[速|はや]い (meaning “the train is faster”) ✓ バスより[電車|でんしゃ]のほうが[速|はや]い. より goes after the one that loses. And for two things, ask どちら, not どれ (which of three or more).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Shop assistant", jp: "[赤|あか] と [青|あお] と、 {どちら} が よろしい です か？", en: "Which would you like, the red or the blue?" },
          { speaker: "Customer", jp: "[青|あお] の {ほう} が いい です ね。", en: "I think I prefer the blue one." },
          { speaker: "Shop assistant", jp: "[青|あお] は [赤|あか] {より} [少|すこ]し [高|たか]い です けど、 よろしい です か？", en: "The blue is a little dearer than the red. Is that all right?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“This bag is lighter than that one”: このかばんは、あのかばん＿[軽|かる]いです。",
            answers: ["より"],
            explanation: "より marks what you compare against: あのかばんより.",
          },
          {
            prompt: "Polite: “Spring or autumn: which do you like better?”: [春|はる]と[秋|あき]と、＿が[好|す]きですか？",
            answers: ["どちら", "どっち"],
            explanation: "Two choices: どちら (casually どっち).",
          },
          {
            prompt: "Answer with のほうが: “I prefer autumn” (polite): [秋|あき]＿[好|す]きです。",
            answers: ["の ほう が"],
            explanation: "The one that wins takes のほうが: [秋|あき]のほうが[好|す]きです.",
          },
          {
            prompt: "“Of all fruit, I like strawberries best”: [果物|くだもの]の[中|なか]で、いちごが＿[好|す]きです。",
            answers: ["[一番|いちばん]"],
            explanation: "の[中|なか]で sets the group, [一番|いちばん] picks the top: いちごが[一番|いちばん][好|す]きです.",
          },
          {
            prompt: "Casual: “Which is nearer, the station or the post office?”: [駅|えき]と[郵便局|ゆうびんきょく]、＿？",
            answers: ["どっち が [近|ちか]い", "どちら が [近|ちか]い", "どっち が [近|ちか]い の", "どちら が [近|ちか]い の"],
            explanation: "Two places, so どっち (or どちら): どっちが[近|ちか]い？",
          },
        ],
      },
    ],
  },
  {
    slug: "hou-ga-ii",
    title: "Advice: たほうがいい and ないほうがいい",
    mark: "ほうがいい",
    summary: "Tell someone what they'd better do, or not do.",
    source: "Genki I ch. 12 (〜ほうがいいです); Bunpro, “ほうがいい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form + **ほうがいい** gives advice (“you'd better …”), and the ない form + ほうがいい advises against something (“you'd better not …”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb た form", "[休|やす]んだ ほう が いい"],
          ["Verb ない form", "[行|い]かない ほう が いい"],
        ],
      },
      {
        type: "text",
        text: "Advice uses the past form even about the future: [休|やす]んだほうがいい, “you'd better rest”. The dictionary form ([休|やす]むほうがいい) is heard too, but the た form is the usual way to give advice. The negative stays in the ない form. Polite speech adds です, often with よ.",
      },
      {
        type: "examples",
        items: [
          {
            jp: "[顔|かお] が [赤|あか]い です ね。 [今日|きょう] は [早|はや]く [帰|かえ]った {ほう が いい} です よ。",
            en: "You look flushed. You'd better go home early today.",
            alt: "[顔|かお] が [赤|あか]い ね。 [今日|きょう] は [早|はや]く [帰|かえ]った {ほう が いい} よ。",
          },
          { jp: "[夜|よる] は [寒|さむ]い から、 [上着|うわぎ] を [着|き]た {ほう が いい} よ。", en: "It's cold at night, so you'd better wear a jacket.", alt: "[夜|よる] は [寒|さむ]い です から、 [上着|うわぎ] を [着|き]た {ほう が いい} です よ。" },
          { jp: "この [水|みず] は [飲|の]まない {ほう が いい} です よ。", en: "You'd better not drink this water.", alt: "この [水|みず]、 [飲|の]まない {ほう が いい} よ。" },
          { jp: "[夜|よる] [遅|おそ]く [一人|ひとり] で [歩|ある]かない {ほう が いい}。", en: "You'd better not walk alone late at night." },
        ],
      },
      {
        type: "pair",
        a: { jp: "あの [映画|えいが] は [見|み]た {ほう が いい} よ。", en: "You should see that film." },
        b: { jp: "あの [映画|えいが] は [見|み]ない {ほう が いい} よ。", en: "You'd better not see that film." },
        diff: "た form + ほうがいい recommends it; ない form + ほうがいい warns against it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Only the positive goes past",
        text: "✗ [行|い]かなかったほうがいい ✓ [行|い]かないほうがいい. Advice takes the た form only when it says “do it”; “don't do it” stays ないほうがいい.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[頭|あたま] が [痛|いた]い ん だ。", en: "I've got a headache." },
          { speaker: "Aya", jp: "[大丈夫|だいじょうぶ]？ [今日|きょう] は [早|はや]く [寝|ね]た {ほう が いい} よ。", en: "Are you OK? You'd better get an early night." },
          { speaker: "Kenta", jp: "うん、 そう する。", en: "Yeah, I will." },
        ],
      },
      {
        type: "callout",
        kind: "culture",
        text: "ほうがいい is fairly direct. Between friends it's caring; said to a teacher or a boss it can sound like telling them what to do, so people often soften it or leave the advice unsaid.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “You'd better go to the doctor's” (use [行|い]く): [病院|びょういん]に＿。",
            answers: ["[行|い]った ほう が いい です", "[行|い]った ほう が いい です よ"],
            explanation: "Advice takes the た form: [行|い]ったほうがいいです.",
          },
          {
            prompt: "Casual: “You'd better not tell my mother” (use [言|い]う): [母|はは]には＿よ。",
            answers: ["[言|い]わない ほう が いい"],
            explanation: "Advising against: ない form + ほうがいい: [言|い]わないほうがいい.",
          },
          {
            prompt: "Casual: “You'd better study more” (use [勉強|べんきょう]する): もっと＿よ。",
            answers: ["[勉強|べんきょう] した ほう が いい"],
            explanation: "する → した, + ほうがいい.",
          },
          {
            prompt: "Fix it: あの[店|みせ]では[買|か]わなかったほうがいいですよ。",
            answers: ["あの [店|みせ] で は [買|か]わない ほう が いい です よ。"],
            explanation: "The negative stays in the ない form: [買|か]わないほうがいいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "deshou",
    title: "Probably: でしょう and だろう",
    mark: "でしょう",
    summary: "Say what's probably true, and ask someone to agree.",
    source: "Genki I ch. 12 (〜でしょう); Bunpro, “でしょう” and “だろう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **でしょう** (polite) or **だろう** (plain) says what you think is probably true; with a rising tone, でしょう？ asks the listener to agree.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Polite", "Plain"],
        rows: [
          ["Verb or い-adjective, plain form", "[降|ふ]る でしょう", "[降|ふ]る だろう"],
          ["Noun or な-adjective, without だ", "[雨|あめ] でしょう", "[雨|あめ] だろう"],
          ["Past", "[降|ふ]った でしょう", "[降|ふ]った だろう"],
        ],
      },
      {
        type: "text",
        text: "Nouns and な-adjectives drop だ before it. たぶん (probably) often comes first. Weather forecasts are full of でしょう. だろう is common in writing and when thinking aloud. At the end of a sentence in conversation it sounds blunt and is heard more from men, especially as だろ？ asking for agreement; most speakers say でしょ (short for でしょう) instead. Inside a sentence ([来|く]るだろうと[思|おも]う) it's neutral.",
      },
      { type: "heading", text: "でしょう · だろう: probably" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [雨|あめ] が [降|ふ]る {でしょう}。", en: "It will probably rain tomorrow.", alt: "[明日|あした] は [雨|あめ] が [降|ふ]る {だろう}。", note: "The weather forecast's way of saying it." },
          { jp: "[田中|たなか]-さん は たぶん [来|こ]ない {でしょう}。", en: "Tanaka-san probably won't come.", alt: "[田中|たなか]-さん は たぶん [来|こ]ない {だろう}。" },
          { jp: "あの [店|みせ] は [日曜日|にちようび] も [開|あ]いて いる {でしょう}。", en: "That shop is probably open on Sundays too." },
          { jp: "[山|やま] の [上|うえ] は [寒|さむ]い {でしょう} ね。", en: "It must be cold up in the mountains.", alt: "[山|やま] の [上|うえ] は [寒|さむ]い {だろう} ね。" },
        ],
      },
      { type: "heading", text: "でしょう？: asking for agreement" },
      {
        type: "examples",
        items: [
          { jp: "この ケーキ、 おいしい {でしょう}？", en: "This cake's good, isn't it?", note: "Said with a rising tone: the speaker expects a yes." },
          { jp: "だから [言|い]った {でしょう}？", en: "I told you so!" },
          { jp: "[疲|つか]れた {でしょう}？ どうぞ [座|すわ]って ください。", en: "You must be tired. Please have a seat." },
          { jp: "この [道|みち]、 [近|ちか]い {でしょう}？", en: "This way's shorter, isn't it?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] は [晴|は]れ {です}。", en: "Tomorrow will be sunny." },
        b: { jp: "[明日|あした] は [晴|は]れ {でしょう}。", en: "Tomorrow will probably be sunny." },
        diff: "です states it; でしょう hedges it: the speaker thinks so but isn't sure.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だ before it, and not about yourself",
        text: "✗ [静|しず]かだでしょう ✓ [静|しず]かでしょう. でしょう takes the place of だ. It's also a guess about things you don't control: for your own plans, ✗ [明日|あした][行|い]くでしょう sounds odd; say たぶん[行|い]きます.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[山田|やまだ]-さん、 [遅|おそ]い です ね。", en: "Yamada-san's late, isn't he?" },
          { speaker: "Mr Mori", jp: "たぶん [電車|でんしゃ] の [中|なか] {でしょう}。", en: "He's probably on the train." },
          { speaker: "Ms Sato", jp: "そう です ね。 もう [少|すこ]し [待|ま]ちましょう。", en: "I expect so. Let's wait a little longer." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite guess: “That restaurant is probably expensive” (use [高|たか]い): あのレストランは＿。",
            answers: ["[高|たか]い でしょう", "たぶん [高|たか]い でしょう", "[高|たか]い でしょう ね"],
            explanation: "An い-adjective goes straight before でしょう: [高|たか]いでしょう.",
          },
          {
            prompt: "Plain guess: “That person is probably a teacher”: あの[人|ひと]は[先生|せんせい]＿。",
            answers: ["だろう"],
            explanation: "A noun takes だろう directly, with no だ before it: [先生|せんせい]だろう.",
          },
          {
            prompt: "Fix it: [便利|べんり]だでしょう。",
            answers: ["[便利|べんり] でしょう。"],
            explanation: "でしょう replaces だ: [便利|べんり]でしょう.",
          },
          {
            prompt: "“You must be hungry, right?” (use すく): おなかが＿？",
            answers: ["すいた でしょう", "すいた でしょ", "すいて いる でしょう", "すいてる でしょう", "すいてる でしょ"],
            explanation: "The hunger has already set in, so the た form: おなかがすいたでしょう？",
          },
          {
            prompt: "Polite: “The station is probably over there”: [駅|えき]はたぶんあそこ＿。",
            answers: ["でしょう"],
            explanation: "あそこ is a noun, so でしょう follows it directly.",
          },
        ],
      },
    ],
  },
  {
    slug: "kata",
    title: "How to do it: Verb stem + かた",
    mark: "[方|かた]",
    summary: "Talk about the way to do something: [読|よ]み[方|かた], [使|つか]い[方|かた].",
    source: "Bunpro, “方 (かた)”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists 方 (かた) at N5."),
    blocks: [
      {
        type: "idea",
        text: "A verb's ます stem + **[方|かた]** makes a noun meaning “the way to …”: [読|よ]み[方|かた] (how to read it), [使|つか]い[方|かた] (how to use it).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Stem", "How to"],
        rows: [
          ["[読|よ]む", "[読|よ]み", "[読|よ]み[方|かた]"],
          ["[食|た]べる", "[食|た]べ", "[食|た]べ[方|かた]"],
          ["[作|つく]る", "[作|つく]り", "[作|つく]り[方|かた]"],
          ["[行|い]く", "[行|い]き", "[行|い]き[方|かた]"],
        ],
      },
      {
        type: "text",
        text: "The result is a noun, so the verb's object joins it with の, not を: [漢字|かんじ]の[読|よ]み[方|かた] (how to read the kanji). Here [方|かた] is read かた, not ほう as in のほうが: [読|よ]み[方|かた] is *yomikata*.",
      },
      {
        type: "examples",
        items: [
          { jp: "この [漢字|かんじ] の [読|よ]み{[方|かた]} を [教|おし]えて ください。", en: "Please tell me how to read this kanji.", alt: "この [漢字|かんじ] の [読|よ]み{[方|かた]}、 [教|おし]えて。" },
          { jp: "[駅|えき] まで の [行|い]き{[方|かた]} が [分|わ]かりません。", en: "I don't know how to get to the station.", alt: "[駅|えき] まで の [行|い]き{[方|かた]} が [分|わ]からない。" },
          { jp: "この カメラ の [使|つか]い{[方|かた]} は [簡単|かんたん] です よ。", en: "This camera is easy to use.", alt: "この カメラ の [使|つか]い{[方|かた]}、 [簡単|かんたん] だ よ。" },
          { jp: "[母|はは] に カレー の [作|つく]り{[方|かた]} を [習|なら]いました。", en: "I learnt how to make curry from my mother.", alt: "[母|はは] に カレー の [作|つく]り{[方|かた]} を [習|なら]った。" },
          { jp: "[箸|はし] の [持|も]ち{[方|かた]} が [上手|じょうず] です ね。", en: "You hold your chopsticks well." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[魚|さかな] {を} [焼|や]いて ください。", en: "Please grill the fish." },
        b: { jp: "[魚|さかな] {の} [焼|や]き[方|かた] を [教|おし]えて ください。", en: "Please show me how to grill fish." },
        diff: "A contrast of structures, not a one-word change. With the verb [焼|や]く, the fish is its object, marked を. In [焼|や]き[方|かた] the verb has become a noun, so the fish joins it with の.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Stem first, の before it",
        text: "✗ [漢字|かんじ]を[読|よ]み[方|かた] ✓ [漢字|かんじ]の[読|よ]み[方|かた]. Stem + [方|かた] is a noun, so its object takes の. And [方|かた] follows the stem, not the dictionary form: ✗ [読|よ]む[方|かた].",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Traveller", jp: "すみません、 この [切符|きっぷ] の [買|か]い{[方|かた]} が [分|わ]からない ん です が…", en: "Excuse me, I can't work out how to buy this ticket…" },
          { speaker: "Station staff", jp: "ここ に お[金|かね] を [入|い]れて、 この ボタン を [押|お]して ください。", en: "Put the money in here, then press this button." },
          { speaker: "Traveller", jp: "あ、 [分|わ]かりました。 ありがとう ございます。", en: "Oh, I see. Thank you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“How to swim”: [泳|およ]ぐ → ＿",
            answers: ["[泳|およ]ぎ[方|かた]"],
            explanation: "ます stem [泳|およ]ぎ + [方|かた].",
          },
          {
            prompt: "Polite: “Please teach me how to write it” (use [書|か]く): ＿を[教|おし]えてください。",
            answers: ["[書|か]き[方|かた]"],
            explanation: "[書|か]きます → stem [書|か]き, + [方|かた]: [書|か]き[方|かた].",
          },
          {
            prompt: "“The way of saying it”: [言|い]う → ＿",
            answers: ["[言|い]い[方|かた]"],
            explanation: "[言|い]います → stem [言|い]い, + [方|かた]: [言|い]い[方|かた].",
          },
          {
            prompt: "Which particle? この[薬|くすり]＿[飲|の]み[方|かた]を[教|おし]えてください。",
            answers: ["の"],
            explanation: "[飲|の]み[方|かた] is a noun, so the medicine joins it with の.",
          },
          {
            prompt: "Fix it: この[言葉|ことば]を[使|つか]い[方|かた]が[分|わ]かりません。",
            answers: ["この [言葉|ことば] の [使|つか]い[方|かた] が [分|わ]かりません。"],
            explanation: "[使|つか]い[方|かた] is a noun: この[言葉|ことば]の[使|つか]い[方|かた].",
          },
        ],
      },
    ],
  },
  {
    slug: "tari",
    title: "Doing things like A and B: たり〜たりする",
    mark: "たり",
    summary: "Give a few examples of what you do, without listing everything.",
    source: "Genki I ch. 11 (〜たり〜たりする); Bunpro, “たり〜たりする”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form + **り** for each action, then **する** at the end, gives a few examples of what you do: “do things like A and B”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb た form + り", "[読|よ]んだり [書|か]いたり する"],
          ["A verb and its negative", "[来|き]たり [来|こ]なかったり する"],
          ["い-adjective かった + り", "[暑|あつ]かったり [寒|さむ]かったり"],
        ],
      },
      {
        type: "text",
        text: "The する at the end carries the tense and the politeness: [読|よ]んだりします, [読|よ]んだりしました. The order of the examples doesn't matter, and one たり alone also works: “things like …”. A verb with its own negative, or two opposite verbs, says something keeps changing: [来|き]たり[来|こ]なかったり (comes some days, not others).",
      },
      { type: "heading", text: "A few examples" },
      {
        type: "examples",
        items: [
          {
            jp: "[週末|しゅうまつ] は [洗濯|せんたく] を {したり}、 [料理|りょうり] を [作|つく]ったり します。",
            en: "At the weekend I do the washing, cook, that kind of thing.",
            alt: "[週末|しゅうまつ] は [洗濯|せんたく] を {したり}、 [料理|りょうり] を [作|つく]ったり する。",
          },
          {
            jp: "[雨|あめ] の [日|ひ] は [家|いえ] で [本|ほん] を {[読|よ]んだり}、 ゲーム を したり する。",
            en: "On rainy days I stay in and read, play games and so on.",
            alt: "[雨|あめ] の [日|ひ] は [家|いえ] で [本|ほん] を {[読|よ]んだり}、 ゲーム を したり します。",
          },
          {
            jp: "[京都|きょうと] で お[寺|てら] を {[見|み]たり}、 [写真|しゃしん] を [撮|と]ったり しました。",
            en: "In Kyoto we looked round temples, took photos and so on.",
            alt: "[京都|きょうと] で お[寺|てら] を {[見|み]たり}、 [写真|しゃしん] を [撮|と]ったり した。",
          },
          {
            jp: "[日曜日|にちようび] は [友達|ともだち] と [買|か]い[物|もの] を {したり} します。",
            en: "On Sundays I do things like going shopping with friends.",
            alt: "[日曜日|にちようび] は [友達|ともだち] と [買|か]い[物|もの] を {したり} する。",
            note: "One たり gives one example and hints at others.",
          },
        ],
      },
      { type: "heading", text: "Back and forth" },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん は [授業|じゅぎょう] に {[来|き]たり} [来|こ]なかったり する。",
            en: "Tanaka-san comes to class some days and not others.",
            alt: "[田中|たなか]-さん は [授業|じゅぎょう] に {[来|き]たり} [来|こ]なかったり します。",
            note: "A verb and its own negative: sometimes it happens, sometimes it doesn't.",
          },
          {
            jp: "[部屋|へや] を {[出|で]たり} [入|はい]ったり しないで ください。",
            en: "Please stop going in and out of the room.",
            alt: "[部屋|へや] を {[出|で]たり} [入|はい]ったり しないで。",
            note: "Two opposite actions: back and forth, over and over.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[昨日|きのう] は [掃除|そうじ] を {して}、 [買|か]い[物|もの] に [行|い]きました。", en: "Yesterday I cleaned, then went shopping." },
        b: { jp: "[昨日|きのう] は [掃除|そうじ] を {したり}、 [買|か]い[物|もの] に [行|い]ったり しました。", en: "Yesterday I did some cleaning, went shopping, that sort of thing." },
        diff: "The て form lists actions in the order they happened, and that's all of them. たり picks out a few examples, in no particular order, and leaves room for more.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Every action takes たり",
        text: "✗ [映画|えいが]を[見|み]たり、[本|ほん]を[読|よ]みます ✓ [映画|えいが]を[見|み]たり、[本|ほん]を[読|よ]んだりします. Each action in the list takes たり, and する comes at the end to carry the tense.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[夏休|なつやす]み は [何|なに] を した の？", en: "What did you get up to over the summer holidays?" },
          { speaker: "Kenta", jp: "[海|うみ] で {[泳|およ]いだり}、 [友達|ともだち] と キャンプ を したり した よ。", en: "I swam in the sea, went camping with friends, that sort of thing." },
          { speaker: "Aya", jp: "いい ね。 [私|わたし] は [毎日|まいにち] アルバイト だった。", en: "Sounds great. I was at my part-time job every day." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “At parties we sing, dance and so on” (use [歌|うた]う and [踊|おど]る): パーティーでは＿。",
            answers: ["[歌|うた]ったり [踊|おど]ったり します", "[歌|うた] を [歌|うた]ったり [踊|おど]ったり します", "[踊|おど]ったり [歌|うた]ったり します"],
            explanation: "[歌|うた]う → [歌|うた]った → [歌|うた]ったり; [踊|おど]る → [踊|おど]ったり; then します.",
          },
          {
            prompt: "Casual past: “Last night I watched TV, played games and so on” (use する): [昨日|きのう]の[夜|よる]はテレビを[見|み]たり、ゲームを＿。",
            answers: ["したり した"],
            explanation: "する → した → したり, and the final する goes into the past: したりした.",
          },
          {
            prompt: "Some days yes, some days no: “I go to the library some days and not others”: [図書館|としょかん]には[行|い]ったり＿します。",
            answers: ["[行|い]かなかったり"],
            explanation: "The negative's past is [行|い]かなかった, + り: [行|い]ったり[行|い]かなかったりします.",
          },
          {
            prompt: "Fix it: [公園|こうえん]で[走|はし]ったり、[自転車|じてんしゃ]に[乗|の]ります。",
            answers: ["[公園|こうえん] で [走|はし]ったり、 [自転車|じてんしゃ] に [乗|の]ったり します。"],
            explanation: "Both actions take たり, and する ends the list: [自転車|じてんしゃ]に[乗|の]ったりします.",
          },
        ],
      },
    ],
  },
  {
    slug: "ta-koto-ga-aru",
    title: "Have you ever? たことがある",
    mark: "たことがある",
    summary: "Talk about your experiences: what you have, or have never, done.",
    source: "Genki I ch. 11 (〜たことがある); Bunpro, “たことがある”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "Verb た form + **ことがある** says you have done something at some point in your life: “I have (ever) …”; ことがない says you never have.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb た form + ことがある", "[食|た]べた こと が ある"],
          ["Never: ことがない", "[食|た]べた こと が ない"],
          ["Polite", "[食|た]べた こと が あります · [食|た]べた こと が ありません"],
        ],
      },
      {
        type: "text",
        text: "こと turns the past action into a noun, “the experience of having eaten”, and ある says you have it. It's about your life so far, so it doesn't go with a set time like [昨日|きのう], or with things everyone does all the time. The answer usually repeats ある or ない: はい、あります / いいえ、ありません. [一度|いちど] (once) and [何度|なんど]も (many times) often come with it, and [一度|いちど]も…ない means “never, not once”. After the dictionary form, ことがある means something else (“sometimes”), taught in a later unit.",
      },
      {
        type: "examples",
        items: [
          { jp: "[納豆|なっとう] を [食|た]べた {こと が あります} か？", en: "Have you ever eaten natto?", alt: "[納豆|なっとう]、 [食|た]べた {こと ある}？" },
          { jp: "[一度|いちど] [着物|きもの] を [着|き]た {こと が あります}。", en: "I've worn a kimono once.", alt: "[一度|いちど] [着物|きもの] を [着|き]た {こと が ある} よ。" },
          { jp: "[飛行機|ひこうき] に [乗|の]った {こと が ない}。", en: "I've never been on a plane.", alt: "[飛行機|ひこうき] に [乗|の]った {こと が ありません}。" },
          { jp: "この [映画|えいが]、 [何度|なんど] も [見|み]た {こと が ある} よ。", en: "I've seen this film loads of times.", alt: "この [映画|えいが] は [何度|なんど] も [見|み]た {こと が あります} よ。" },
          { jp: "[日本語|にほんご] で [手紙|てがみ] を [書|か]いた {こと が ありません}。", en: "I've never written a letter in Japanese." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[去年|きょねん]、 [京都|きょうと] に [行|い]き{ました}。", en: "I went to Kyoto last year." },
        b: { jp: "[京都|きょうと] に [行|い]った {こと が あります}。", en: "I've been to Kyoto." },
        diff: "The plain past reports one event at a time you could name (last year). たことがある reports an experience: at some point in your life, with no time attached.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "An experience, not a date",
        text: "✗ [昨日|きのう]、すしを[食|た]べたことがあります ✓ [昨日|きのう]、すしを[食|た]べました. たことがある is about your life so far, so it doesn't take a specific recent time like [昨日|きのう]. And it needs the た form: [食|た]べることがある means “I sometimes eat it”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "スキー を した {こと} ある？", en: "Have you ever been skiing?" },
          { speaker: "Kenta", jp: "ううん、 [一度|いちど] も ない。 [難|むずか]しい？", en: "No, never. Is it hard?" },
          { speaker: "Aya", jp: "[最初|さいしょ] は ね。 でも、 すぐ [上手|じょうず] に なる よ。", en: "At first, yes. But you soon get the hang of it." },
        ],
        note: "Casual speech drops the が: したことある？ And [一度|いちど]もない is “never, not once”.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “Have you ever made curry?” (use [作|つく]る): カレーを＿か？",
            answers: ["[作|つく]った こと が あります", "[作|つく]った こと あります"],
            explanation: "た form + ことがあります: カレーを[作|つく]ったことがありますか？",
          },
          {
            prompt: "Casual: “I've never been late for school” (use [遅|おく]れる): [学校|がっこう]に＿。",
            answers: ["[遅|おく]れた こと が ない", "[遅|おく]れた こと は ない", "[遅|おく]れた こと ない", "[一度|いちど] も [遅|おく]れた こと が ない"],
            explanation: "Never is ことがない: [遅|おく]れたことがない.",
          },
          {
            prompt: "Answer politely, “Yes, once”: [船|ふね]に[乗|の]ったことがありますか？ はい、[一度|いちど]＿。",
            answers: ["あります", "[乗|の]った こと が あります", "[乗|の]りました"],
            explanation: "The answer repeats ある: はい、[一度|いちど]あります.",
          },
          {
            prompt: "Fix it: [先週|せんしゅう]、その[映画|えいが]を[見|み]たことがあります。",
            answers: ["[先週|せんしゅう]、 その [映画|えいが] を [見|み]ました。", "その [映画|えいが] を [見|み]た こと が あります。"],
            explanation: "A named time like [先週|せんしゅう] takes the plain past: [見|み]ました. Without the time, [見|み]たことがあります is fine.",
          },
          {
            prompt: "An experience, not a habit: “I've played golf before” (use する): ゴルフを＿があります。",
            answers: ["した こと"],
            explanation: "An experience takes the た form: したことがあります. With the dictionary form, することがある would mean “I sometimes play”.",
          },
        ],
      },
    ],
  },
  {
    slug: "hoshii",
    title: "Wanting things: ほしい, and how it differs from たい",
    mark: "[欲|ほ]しい",
    summary: "Say what you want to have, and keep it apart from what you want to do.",
    source: "Genki II ch. 14 (ほしい); Bunpro, “がほしい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "JLPT Sensei lists がほしい at N5."),
    blocks: [
      {
        type: "idea",
        text: "Noun + **が[欲|ほ]しい** means “I want (a thing)”, while wanting to *do* something takes the verb's stem + たい.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + が", "[新|あたら]しい [靴|くつ] が [欲|ほ]しい"],
          ["To do: Verb stem + たい", "[新|あたら]しい [靴|くつ] を [買|か]いたい"],
          ["Someone else: を + [欲|ほ]しがっている", "[弟|おとうと] は [犬|いぬ] を [欲|ほ]しがって いる"],
        ],
      },
      {
        type: "text",
        text: "[欲|ほ]しい is an い-adjective: [欲|ほ]しくない (don't want), [欲|ほ]しかった (wanted), polite [欲|ほ]しいです. The thing wanted takes が, or は in negatives and contrasts. Like たい, it's for your own wishes or for asking someone directly; about someone else, say [欲|ほ]しがっている, with を, as たい becomes たがっている. After a verb's て form, ほしい means “I want someone to …”: that comes in a later unit.",
      },
      { type: "link", href: "/learn/verbs/tai-form", label: "〜たい: wanting to do", text: "Stem + たい, and たがっている for other people." },
      {
        type: "examples",
        items: [
          { jp: "[新|あたら]しい スマホ {が [欲|ほ]しい} です。", en: "I want a new smartphone.", alt: "[新|あたら]しい スマホ {が [欲|ほ]しい}。" },
          { jp: "[今|いま]、 [一番|いちばん] [何|なに] {が [欲|ほ]しい} です か？", en: "What do you want most right now?", alt: "[今|いま]、 [一番|いちばん] [何|なに] {が [欲|ほ]しい}？" },
          {
            jp: "[大|おお]きい [車|くるま] は {[欲|ほ]しくない} です。 [小|ちい]さい の が いい です。",
            en: "I don't want a big car. A small one's better.",
            alt: "[大|おお]きい [車|くるま] は {[欲|ほ]しくない}。 [小|ちい]さい の が いい。",
            note: "In a negative, the thing often takes は instead of が.",
          },
          { jp: "[子供|こども] の とき、 [犬|いぬ] {が [欲|ほ]しかった}。", en: "When I was a kid, I wanted a dog.", alt: "[子供|こども] の とき、 [犬|いぬ] {が [欲|ほ]しかった} です。" },
          {
            jp: "[妹|いもうと] は [自転車|じてんしゃ] を {[欲|ほ]しがって} います。",
            en: "My little sister wants a bike.",
            alt: "[妹|いもうと] は [自転車|じてんしゃ] を {[欲|ほ]しがって} いる。",
            note: "About someone else: [欲|ほ]しがっている, and the thing takes を.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "パソコン {が [欲|ほ]しい} です。", en: "I want a computer." },
        b: { jp: "パソコン を {[買|か]いたい} です。", en: "I want to buy a computer." },
        diff: "[欲|ほ]しい wants the thing itself; たい wants to do something, so it needs a verb. English “want” covers both.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Things take ほしい, actions take たい",
        text: "✗ [映画|えいが]を[見|み]るが[欲|ほ]しい ✓ [映画|えいが]を[見|み]たい. [欲|ほ]しい wants things (nouns); to want to *do* something, use the verb's stem + たい. And about other people, [欲|ほ]しい becomes [欲|ほ]しがっている: [兄|あに]は[車|くるま]を[欲|ほ]しがっている.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Like たい, 〜が[欲|ほ]しいですか？ is too direct to ask a teacher or a boss. To offer something, people say [何|なに]か[飲|の]みますか？ (would you like something to drink?) or name it: コーヒーはいかがですか？",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[誕生日|たんじょうび] に [何|なに]か {[欲|ほ]しい} もの ある？", en: "Is there anything you'd like for your birthday?" },
          { speaker: "Kenta", jp: "そう だ ね… [新|あたら]しい [財布|さいふ] {が [欲|ほ]しい}。 [今|いま] の は もう [古|ふる]い から。", en: "Let me think… A new wallet. Mine's getting old." },
          { speaker: "Aya", jp: "そう なん だ。 じゃ、 [一緒|いっしょ] に [見|み] に [行|い]こう か。", en: "Oh, right. Shall we go and look at some together, then?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “I want a new bag”: [新|あたら]しいかばん＿。",
            answers: ["が [欲|ほ]しい です"],
            explanation: "The thing wanted takes が: かばんが[欲|ほ]しいです.",
          },
          {
            prompt: "Wanting to do: “I want to drink coffee” (use [飲|の]む): コーヒーが＿。",
            answers: ["[飲|の]みたい", "[飲|の]みたい です"],
            explanation: "An action takes stem + たい, not [欲|ほ]しい: [飲|の]みたい.",
          },
          {
            prompt: "Casual negative: “I don't want a watch”: [時計|とけい]は＿。",
            answers: ["[欲|ほ]しくない"],
            explanation: "[欲|ほ]しい is an い-adjective: [欲|ほ]しくない.",
          },
          {
            prompt: "Polite, about your brother: “My big brother wants a camera”: [兄|あに]はカメラを＿。",
            answers: ["[欲|ほ]しがって います", "[欲|ほ]しがってます"],
            explanation: "About someone else, [欲|ほ]しがっている: [兄|あに]はカメラを[欲|ほ]しがっています.",
          },
          {
            prompt: "Fix it: [私|わたし]は[本|ほん]を[読|よ]むが[欲|ほ]しいです。",
            answers: ["[私|わたし] は [本|ほん] を [読|よ]みたい です。", "[私|わたし] は [本|ほん] が [読|よ]みたい です。"],
            explanation: "Reading is an action, so stem + たい: [本|ほん]を[読|よ]みたいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "mou-mada",
    title: "Already, not yet, still: もう and まだ",
    mark: "もう・まだ",
    summary: "Say that something has already happened, hasn't happened yet, or is still going on.",
    source: "Bunpro, “もう” and “まだ”; Makino & Tsutsui, *A Dictionary of Basic Japanese Grammar* (mada, mō)",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**もう** says a change has already happened (with a negative: no more); **まだ** says nothing has changed yet: “still”, or with a negative, “not yet”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example", "Meaning"],
        rows: [
          ["もう + past", "もう [食|た]べた", "already ate"],
          ["もう + negative", "もう [食|た]べない", "won't eat any more"],
          ["まだ + the ている form", "まだ [食|た]べて いる", "is still eating"],
          ["まだ + the ている negative", "まだ [食|た]べて いない", "hasn't eaten yet"],
        ],
      },
      {
        type: "text",
        text: "“Not yet” is まだ + the ている negative: まだ[食|た]べていない. It's about now, so it isn't the past negative: [食|た]べなかった means “didn't eat”, a finished event. The short answer to もう〜ましたか？ is いいえ、まだです (casually, just まだ). In speech ている shortens to てる: まだ[食|た]べてない. まだ also goes with nouns and adjectives: まだ[学生|がくせい]です (still a student), まだ[早|はや]い (it's still early).",
      },
      { type: "heading", text: "もう: already, no more" },
      {
        type: "examples",
        items: [
          { jp: "{もう} [昼|ひる]ご[飯|はん] を [食|た]べました か？", en: "Have you had lunch yet?", alt: "{もう} [昼|ひる]ご[飯|はん]、 [食|た]べた？" },
          { jp: "[仕事|しごと] は {もう} [終|お]わった よ。", en: "Work's already done.", alt: "[仕事|しごと] は {もう} [終|お]わりました よ。" },
          {
            jp: "おなか いっぱい。 {もう} [食|た]べられない。",
            en: "I'm full. I can't eat any more.",
            alt: "おなか が いっぱい です。 {もう} [食|た]べられません。",
          },
          { jp: "あの [店|みせ] は {もう} ない よ。", en: "That shop isn't there any more.", alt: "あの [店|みせ] は {もう} ありません よ。" },
        ],
      },
      { type: "heading", text: "まだ: still, not yet" },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] は {まだ} [降|ふ]って います か？", en: "Is it still raining?", alt: "[雨|あめ]、 {まだ} [降|ふ]ってる？" },
          { jp: "[姉|あね] は {まだ} [寝|ね]て いる。", en: "My big sister is still asleep.", alt: "[姉|あね] は {まだ} [寝|ね]て います。" },
          { jp: "その [映画|えいが]、 {まだ} [見|み]て いない。", en: "I haven't seen that film yet.", alt: "その [映画|えいが] は {まだ} [見|み]て いません。" },
          { jp: "[駅|えき] まで は {まだ} [遠|とお]い です か？", en: "Is the station still a long way?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[父|ちち] は {もう} [起|お]きて います。", en: "My father is already up." },
        b: { jp: "[父|ちち] は {まだ} [起|お]きて います。", en: "My father is still up." },
        diff: "With ている, もう says the state has already begun (she's up already: it's early), and まだ that it hasn't ended yet (she's still up: it's late). Same verb, opposite surprises.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "“Not yet” takes ていない",
        text: "✗ (Have you eaten?) いいえ、まだ[食|た]べませんでした ✓ いいえ、まだ[食|た]べていません, or just いいえ、まだです. “Not yet” is about now, so it takes the ている negative; [食|た]べませんでした is a finished past (“I didn't eat”).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mother", jp: "[宿題|しゅくだい]、 {もう} [終|お]わった？", en: "Have you finished your homework yet?" },
          { speaker: "Son", jp: "{まだ}。 [今|いま] やってる。", en: "Not yet. I'm doing it now." },
          { speaker: "Mother", jp: "じゃ、 [終|お]わったら テレビ を [見|み]て も いい よ。", en: "Well, once it's done, you can watch TV." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Answer “Not yet” politely: もう[手紙|てがみ]を[書|か]きましたか？ いいえ、＿。",
            answers: ["まだ です", "まだ [書|か]いて いません", "まだ [書|か]いてません"],
            explanation: "いいえ、まだです, or in full, まだ[書|か]いていません.",
          },
          {
            prompt: "Polite: “I haven't bought a ticket yet” (use [買|か]う): [切符|きっぷ]はまだ＿。",
            answers: ["[買|か]って いません", "[買|か]ってません"],
            explanation: "まだ + the ている negative: [買|か]っていません.",
          },
          {
            prompt: "Casual: “Is your big brother still working?” (use [働|はたら]く): お[兄|にい]さん、まだ＿？",
            answers: ["[働|はたら]いて いる", "[働|はたら]いてる", "[働|はたら]いて いる の", "[働|はたら]いてる の"],
            explanation: "Still going on: まだ + ている: まだ[働|はたら]いてる？",
          },
          {
            prompt: "もう or まだ? “I'm not going to that shop any more”: ＿あの[店|みせ]には[行|い]きません。",
            answers: ["もう"],
            explanation: "もう with a negative: no more, not any more.",
          },
          {
            prompt: "Fix it (“I haven't had breakfast yet”): まだ[朝|あさ]ご[飯|はん]を[食|た]べませんでした。",
            answers: ["まだ [朝|あさ]ご[飯|はん] を [食|た]べて いません。", "まだ [朝|あさ]ご[飯|はん] を [食|た]べてません。"],
            explanation: "“Not yet” takes the ている negative: まだ[食|た]べていません.",
          },
        ],
      },
    ],
  },
  {
    slug: "dake-shika",
    title: "Only: だけ, and しか with a negative",
    mark: "だけ・しか",
    summary: "Say “only” two ways: the plain だけ, and しか, which complains it's not enough.",
    source: "Genki II ch. 14 (number + しか + negative); Bunpro, “だけ” and “しか”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**だけ** means “only, just” in any sentence; **しか** also means “only”, but the verb is always negative, and it stresses that it's less than you'd want.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["Noun + だけ", "[水|みず] だけ [飲|の]む"],
          ["Noun + しか + negative", "[水|みず] しか [飲|の]まない"],
          ["Amount + だけ · しか", "[少|すこ]し だけ · [少|すこ]し しか ない"],
          ["Verb + だけ", "[見|み]る だけ"],
        ],
      },
      {
        type: "text",
        text: "が and を drop before しか, and go after だけ or drop: [水|みず]だけ(を)[飲|の]んだ, never ✗[水|みず]をだけ. Other particles stay, and だけ or しか usually follows them: [母|はは]にだけ, [東京|とうきょう]にしか. しか always ends in a negative, though the English is positive: [五百円|ごひゃくえん]しかない (I've only got 500 yen). だけ is neutral: it just draws the line.",
      },
      { type: "heading", text: "だけ: only, just" },
      {
        type: "examples",
        items: [
          { jp: "[朝|あさ] は コーヒー {だけ} [飲|の]みます。", en: "In the morning I just have a coffee.", alt: "[朝|あさ] は コーヒー {だけ} [飲|の]む。" },
          { jp: "[一|ひと]つ {だけ} [質問|しつもん] して も いい です か？", en: "Can I ask just one question?", alt: "[一|ひと]つ {だけ} [質問|しつもん] して も いい？" },
          { jp: "すみません、 [見|み]て いる {だけ} です。", en: "Sorry, I'm just looking.", note: "What to say when a shop assistant offers help." },
          {
            jp: "この こと は [母|はは] に {だけ} [話|はな]しました。",
            en: "I've only told my mother about this.",
            alt: "この こと は [母|はは] に {だけ} [話|はな]した。",
            note: "After another particle: [母|はは]にだけ.",
          },
        ],
      },
      { type: "heading", text: "しか…ない: only, nothing but" },
      {
        type: "examples",
        items: [
          { jp: "[財布|さいふ] に [千円|せんえん] {しか} ない。", en: "I've only got a thousand yen in my wallet.", alt: "[財布|さいふ] に [千円|せんえん] {しか} ありません。" },
          { jp: "[昨日|きのう] は [三時間|さんじかん] {しか} [寝|ね]なかった。", en: "I only got three hours' sleep yesterday.", alt: "[昨日|きのう] は [三時間|さんじかん] {しか} [寝|ね]ません でした。" },
          { jp: "[日本語|にほんご] は [少|すこ]し {しか} [話|はな]せません。", en: "I can only speak a little Japanese.", alt: "[日本語|にほんご] は [少|すこ]し {しか} [話|はな]せない。" },
          { jp: "この [町|まち] に は コンビニ が [一|ひと]つ {しか} ない。", en: "There's only one convenience store in this town.", alt: "この [町|まち] に は コンビニ が [一|ひと]つ {しか} ありません。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[学生|がくせい] が [五人|ごにん] {だけ} [来|き]ました。", en: "Just five students came." },
        b: { jp: "[学生|がくせい] が [五人|ごにん] {しか} [来|き]ません でした。", en: "Only five students came (we'd hoped for more)." },
        diff: "Same number, different feeling. だけ states the limit; しか…ない says it's too few, and the verb turns negative.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "しか needs a negative",
        text: "✗ [百円|ひゃくえん]しかあります ✓ [百円|ひゃくえん]しかありません. しか always ends in a negative, even though the English (“I only have 100 yen”) is positive. And it replaces を and が: ✗ [水|みず]をしか ✓ [水|みず]しか.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "ジュース を [買|か]いたい ん だ けど、 [百円|ひゃくえん] {だけ} [貸|か]して？", en: "I want to get a juice. Could you lend me just 100 yen?" },
          { speaker: "Kenta", jp: "いい よ。 でも、 [僕|ぼく] も [五百円|ごひゃくえん] {しか} ない よ。", en: "Sure. Mind you, I've only got 500 yen myself." },
          { speaker: "Aya", jp: "ありがとう。 [明日|あした] [返|かえ]す ね。", en: "Thanks. I'll pay you back tomorrow." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I only bought bread”: パン＿[買|か]いました。",
            answers: ["だけ"],
            explanation: "The verb is positive, so だけ: パンだけ[買|か]いました.",
          },
          {
            prompt: "Polite, with しか: “There are only two eggs”: [卵|たまご]が[二|ふた]つ＿。",
            answers: ["しか ありません", "しか ない です"],
            explanation: "しか + a negative: [二|ふた]つしかありません.",
          },
          {
            prompt: "Casual: “I can only read hiragana” (use [読|よ]む): ひらがな＿。",
            answers: ["しか [読|よ]めない", "だけ [読|よ]める", "しか [読|よ]めない よ", "だけ [読|よ]める よ"],
            explanation: "ひらがなしか[読|よ]めない (with a negative), or ひらがなだけ[読|よ]める.",
          },
          {
            prompt: "Fix it: [日本|にほん]には[一度|いちど]しか[行|い]きました。",
            answers: [
              "[日本|にほん] に は [一度|いちど] しか [行|い]きません でした。",
              "[日本|にほん] に は [一度|いちど] しか [行|い]った こと が ありません。",
              "[日本|にほん] に は [一度|いちど] だけ [行|い]きました。",
              "[日本|にほん] に は [一度|いちど] だけ [行|い]った こと が あります。",
            ],
            explanation: "しか needs a negative: [一度|いちど]しか[行|い]きませんでした. Or keep the positive verb and use だけ.",
          },
          {
            prompt: "Polite request: “Just a little, please”: [少|すこ]し＿お[願|ねが]いします。",
            answers: ["だけ"],
            explanation: "[少|すこ]しだけ: just a little.",
          },
        ],
      },
    ],
  },
  {
    slug: "sugiru",
    title: "Too much: すぎる",
    mark: "すぎる",
    summary: "Say something is too big, too hot, or that you did too much of it.",
    source: "Genki I ch. 12 (〜すぎる); Bunpro, “すぎる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A verb's ます stem, or an adjective without its い, + **すぎる** means “too …” or “… too much”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb ます stem", "[食|た]べすぎる"],
          ["い-adjective: drop い", "[高|たか]すぎる"],
          ["な-adjective, as it is", "[静|しず]かすぎる"],
        ],
      },
      {
        type: "text",
        text: "すぎる is a る-verb, so the result conjugates like one: [食|た]べすぎた (ate too much), [高|たか]すぎます. いい becomes よすぎる. It's nearly always a complaint; for “very”, without the “too”, use とても. The stem すぎ is a noun: [飲|の]みすぎ (drinking too much).",
      },
      {
        type: "examples",
        items: [
          { jp: "[昨日|きのう] は [飲|の]み{すぎました}。", en: "I drank too much last night.", alt: "[昨日|きのう] は [飲|の]み{すぎた}。" },
          { jp: "この [靴|くつ] は [小|ちい]さ{すぎる}。", en: "These shoes are too small.", alt: "この [靴|くつ] は [小|ちい]さ{すぎます}。" },
          { jp: "この [問題|もんだい] は [簡単|かんたん]{すぎます} ね。", en: "This question is too easy.", alt: "この [問題|もんだい]、 [簡単|かんたん]{すぎる} ね。" },
          {
            jp: "[部屋|へや] が [暑|あつ]{すぎて}、 [寝|ね]られなかった。",
            en: "The room was too hot to sleep.",
            alt: "[部屋|へや] が [暑|あつ]{すぎて}、 [寝|ね]られません でした。",
            note: "The て form gives the reason: too hot, so I couldn't sleep.",
          },
          { jp: "[働|はたら]き{すぎ} は [体|からだ] に よくない よ。", en: "Working too hard is bad for you.", alt: "[働|はたら]き{すぎ} は [体|からだ] に よくない です よ。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [時計|とけい] は {とても} [高|たか]い です。", en: "This watch is very expensive." },
        b: { jp: "この [時計|とけい] は [高|たか]{すぎます}。", en: "This watch is too expensive." },
        diff: "とても just says “very”: you might still buy it. すぎる says it's more than is right for you: you won't.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Drop the い first",
        text: "✗ [高|たか]いすぎる ✓ [高|たか]すぎる. An い-adjective drops its い before すぎる, and a verb takes its ます stem: ✗ [食|た]べるすぎる ✓ [食|た]べすぎる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "おなか が [痛|いた]い…", en: "My stomach hurts…" },
          { speaker: "Aya", jp: "ケーキ を [三|みっ]つ [食|た]べた から だ よ。 [食|た]べ{すぎ}。", en: "That's because you ate three cakes. You overdid it." },
          { speaker: "Kenta", jp: "うん、 [次|つぎ] は [二|ふた]つ に する。", en: "Yeah. Next time I'll stop at two." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “This bag is too heavy” (use [重|おも]い): このかばんは＿。",
            answers: ["[重|おも]すぎます"],
            explanation: "Drop the い, add すぎます: [重|おも]すぎます.",
          },
          {
            prompt: "Casual past: “I slept too much” (use [寝|ね]る): ＿。",
            answers: ["[寝|ね]すぎた"],
            explanation: "Stem [寝|ね] + すぎた.",
          },
          {
            prompt: "Casual: “This town is too quiet” (use [静|しず]か): この[町|まち]は＿。",
            answers: ["[静|しず]かすぎる"],
            explanation: "A な-adjective takes すぎる as it is: [静|しず]かすぎる.",
          },
          {
            prompt: "Fix it: このテストは[難|むずか]しいすぎます。",
            answers: ["この テスト は [難|むずか]しすぎます。"],
            explanation: "Drop the い first: [難|むずか]しすぎます.",
          },
          {
            prompt: "“I've walked too much, so my legs hurt” (use [歩|ある]く): ＿、[足|あし]が[痛|いた]いです。",
            answers: ["[歩|ある]きすぎて", "[歩|ある]きすぎた から", "[歩|ある]きすぎた ので"],
            explanation: "Stem [歩|ある]き + すぎて gives the reason: [歩|ある]きすぎて、[足|あし]が[痛|いた]いです.",
          },
        ],
      },
    ],
  },
  {
    slug: "tsumori",
    title: "Plans: つもり (I intend to)",
    mark: "つもり",
    summary: "Say what you plan to do, or plan not to do.",
    source: "Genki I ch. 10 (〜つもりだ); Bunpro, “つもり”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A plain non-past verb + **つもり** says what you intend to do: “I'm planning to …”, “I mean to …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, dictionary form", "[行|い]く つもり だ"],
          ["Verb ない form", "[行|い]かない つもり だ"],
          ["Polite", "[行|い]く つもり です"],
        ],
      },
      {
        type: "text",
        text: "つもり is a noun, so it ends with だ or です, or casually with nothing. It's for plans you've already settled on. A suggestion, or a decision made on the spot, uses the volitional ([行|い]こう); [行|い]こうと[思|おも]っている (I'm thinking of going) is softer than つもり. In the past, つもりだった means “I meant to (but …)”.",
      },
      {
        type: "examples",
        items: [
          { jp: "[来年|らいねん]、 [日本|にほん] で [勉強|べんきょう] する {つもり} です。", en: "I'm planning to study in Japan next year.", alt: "[来年|らいねん]、 [日本|にほん] で [勉強|べんきょう] する {つもり}。" },
          { jp: "[夏休|なつやす]み は どこ に も [行|い]かない {つもり} です。", en: "I'm not planning to go anywhere over the summer holidays.", alt: "[夏休|なつやす]み は どこ に も [行|い]かない {つもり}。" },
          { jp: "[週末|しゅうまつ] は [何|なに] を する {つもり}？", en: "What are you planning to do this weekend?", alt: "[週末|しゅうまつ] は [何|なに] を する {つもり} です か？" },
          {
            jp: "[今日|きょう] は お[酒|さけ] を [飲|の]まない {つもり} だった けど…",
            en: "I wasn't going to drink today, but…",
            note: "つもりだった: the plan didn't hold.",
          },
        ],
      },
      { type: "link", href: "/learn/verbs/volitional", label: "The volitional: 〜よう, 〜おう", text: "Let's …, and a decision made on the spot." },
      {
        type: "pair",
        a: { jp: "[明日|あした] は [早|はや]く [起|お]きる {つもり} です。", en: "I'm going to get up early tomorrow." },
        b: { jp: "[明日|あした] は [早|はや]く [起|お]き{よう} と [思|おも]って います。", en: "I'm thinking of getting up early tomorrow." },
        diff: "つもり states a plan you've settled on. The volitional + と[思|おも]っている is softer: you're thinking about it, and it might change.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A plan takes the dictionary form",
        text: "✗ [買|か]ったつもりです (meaning “I plan to buy it”) ✓ [買|か]うつもりです. A plan takes the dictionary form, and つもり follows the verb directly, with no の: ✗ [買|か]うのつもり.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[冬休|ふゆやす]み は [国|くに] に [帰|かえ]る {つもり} です か？", en: "Are you going home for the winter holidays?" },
          { speaker: "Ms Sato", jp: "いいえ、 [今年|ことし] は [帰|かえ]らない {つもり} です。 [友達|ともだち] と [旅行|りょこう] を します。", en: "No, I'm not going back this year. I'm going travelling with friends." },
          { speaker: "Mr Mori", jp: "いい です ね。 どこ に [行|い]く ん です か？", en: "Sounds great. Where are you going?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with つもり: “I'm planning to buy a new computer” (use [買|か]う): [新|あたら]しいパソコンを＿。",
            answers: ["[買|か]う つもり です"],
            explanation: "Dictionary form + つもりです: [買|か]うつもりです.",
          },
          {
            prompt: "Casual: “I'm not going to tell anyone” (use [言|い]う): [誰|だれ]にも＿。",
            answers: ["[言|い]わない つもり", "[言|い]わない つもり だ", "[言|い]わない つもり だ よ", "[言|い]わない つもり よ"],
            explanation: "ない form + つもり: [言|い]わないつもり.",
          },
          {
            prompt: "Polite, with つもり: “I'm not planning to work on Sunday” (use [働|はたら]く): [日曜日|にちようび]は＿。",
            answers: ["[働|はたら]かない つもり です"],
            explanation: "ない form + つもりです: [働|はたら]かないつもりです.",
          },
          {
            prompt: "Fix it: [明日|あした]、[病院|びょういん]に[行|い]ったつもりです。",
            answers: ["[明日|あした]、 [病院|びょういん] に [行|い]く つもり です。"],
            explanation: "A plan takes the dictionary form: [行|い]くつもりです.",
          },
        ],
      },
    ],
  },
  {
    slug: "dareka-daremo",
    title: "Someone, no one: question words with か and も",
    mark: "[誰|だれ]か・[誰|だれ]も",
    summary: "Turn a question word into someone, something or somewhere, and with a negative into no one, nothing or nowhere.",
    source: "Genki I ch. 8 (何か and 何も) and ch. 10 (どこかに, どこにも); Bunpro, “なにか・なにも” and “誰か・どこか・誰も・どこも”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5", "Not listed by JLPT Sensei."),
    blocks: [
      {
        type: "idea",
        text: "A question word + **か** makes “some-” ([誰|だれ]か, someone), and a question word + **も** with a negative verb makes “no-” ([誰|だれ]も…ない, no one).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Question word", "+ か", "+ も, with a negative"],
        rows: [
          ["[誰|だれ] (who)", "[誰|だれ]か", "[誰|だれ] も"],
          ["[何|なに] (what)", "[何|なに]か", "[何|なに] も"],
          ["どこ (where)", "どこか", "どこ に も"],
          ["いつ (when)", "いつか", "—"],
        ],
      },
      {
        type: "text",
        text: "が and を usually drop after か ([誰|だれ]か(が)[来|き]た, someone came) and always before も ([何|なに]も[食|た]べなかった, I ate nothing). Other particles stay, before も and after か: どこにも[行|い]かない (not going anywhere), どこかで[会|あ]おう (let's meet somewhere). In casual speech どこか often drops its に: どこか[行|い]く？ いつも is different: it means “always”, with any verb.",
      },
      { type: "link", href: "/learn/particles/mo-also", label: "も: “too”, and [何|なに]も", text: "Question word + も + negative, introduced with も." },
      { type: "heading", text: "か: someone, something, somewhere" },
      {
        type: "examples",
        items: [
          { jp: "[誰|だれ]{か} [来|き]ました よ。", en: "Someone's here.", alt: "[誰|だれ]{か} [来|き]た よ。" },
          { jp: "[何|なに]{か} [質問|しつもん] は あります か？", en: "Are there any questions?", alt: "[何|なに]{か} [質問|しつもん] ある？" },
          { jp: "[今度|こんど] の [休|やす]み、 どこ{か} [行|い]きたい ね。", en: "I'd like to go somewhere on my next day off.", alt: "[今度|こんど] の [休|やす]み、 どこ{か} [行|い]きたい です ね。" },
          { jp: "いつ{か} [日本|にほん] に [住|す]みたい です。", en: "I'd like to live in Japan someday.", alt: "いつ{か} [日本|にほん] に [住|す]みたい。" },
        ],
      },
      { type: "heading", text: "も + negative: no one, nowhere" },
      {
        type: "examples",
        items: [
          { jp: "[教室|きょうしつ] に は [誰|だれ] {も} いません。", en: "There's no one in the classroom.", alt: "[教室|きょうしつ] に は [誰|だれ] {も} いない。" },
          { jp: "[昨日|きのう] は どこ に {も} [行|い]かなかった。", en: "I didn't go anywhere yesterday.", alt: "[昨日|きのう] は どこ に {も} [行|い]きません でした。" },
          { jp: "[週末|しゅうまつ] は [誰|だれ] に {も} [会|あ]わなかった。", en: "I didn't see anyone at the weekend.", alt: "[週末|しゅうまつ] は [誰|だれ] に {も} [会|あ]いません でした。" },
          { jp: "この [箱|はこ] に は [何|なに] {も} [入|はい]って いません。", en: "There's nothing in this box." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[何|なに]{か} [食|た]べます か？", en: "Would you like something to eat?" },
        b: { jp: "[何|なに] {を} [食|た]べます か？", en: "What will you have to eat?" },
        diff: "With か it's a yes-or-no question: is there anything? The answer is はい or いいえ. With を, [何|なに] asks which thing, and the answer names it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "も makes it “no-”",
        text: "✗ [誰|だれ]も[来|き]ました ✓ [誰|だれ]も[来|き]ませんでした. With [誰|だれ]も, [何|なに]も and どこにも the verb is negative: they mean “no one”, “nothing”, “nowhere”. For “everyone”, Japanese says みんな.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "ねえ、 ここ に あった ケーキ、 [誰|だれ]{か} [食|た]べた？", en: "Hey, did someone eat the cake that was here?" },
          { speaker: "Kenta", jp: "[僕|ぼく] は [何|なに] {も} [知|し]らない よ。", en: "I don't know anything about it." },
          { speaker: "Aya", jp: "じゃあ、 [誰|だれ] が [食|た]べた の？", en: "Then who ate it?" },
        ],
        note: "[誰|だれ]か asks whether anyone did; [誰|だれ]が asks who.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “Is anyone there?”: ＿いますか？",
            answers: ["[誰|だれ]か"],
            explanation: "[誰|だれ] + か: someone. [誰|だれ]かいますか？",
          },
          {
            prompt: "Casual: “There's nothing in the fridge”: [冷蔵庫|れいぞうこ]に＿ない。",
            answers: ["[何|なに] も"],
            explanation: "[何|なに] + も with a negative: nothing. [冷蔵庫|れいぞうこ]に[何|なに]もない.",
          },
          {
            prompt: "Polite invitation: “Shall we eat somewhere?”: ＿で[食|た]べませんか？",
            answers: ["どこか"],
            explanation: "どこ + か: somewhere. で stays after it: どこかで.",
          },
          {
            prompt: "Casual: “I'm not going anywhere today”: [今日|きょう]は＿[行|い]かない。",
            answers: ["どこ に も", "どこ へ も", "どこ も"],
            explanation: "どこ + に + も with a negative: nowhere. [今日|きょう]はどこにも[行|い]かない.",
          },
          {
            prompt: "Fix it: [部屋|へや]には[誰|だれ]もいます。",
            answers: ["[部屋|へや] に は [誰|だれ] も いません。", "[部屋|へや] に は [誰|だれ]か います。"],
            explanation: "[誰|だれ]も needs a negative (no one is there: いません); for “someone is there”, use [誰|だれ]か.",
          },
        ],
      },
    ],
  },
  {
    slug: "naru-suru",
    title: "Becoming and choosing: なる and にする",
    mark: "なる・にする",
    summary: "Say how something has changed, and what you've decided on.",
    source: "Genki I ch. 10 (adjective + なる); Bunpro, “〜になる・〜くなる” and “にする”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "**なる** means “become” (an い-adjective changes its い to **く** before it, a な-adjective or a noun takes **に**), and Noun + **にする** means “decide on”, “go with”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["い-adjective: い → く", "[寒|さむ]く なる"],
          ["な-adjective + に", "[静|しず]か に なる"],
          ["Noun + に", "[医者|いしゃ] に なる"],
          ["Noun + にする", "[紅茶|こうちゃ] に する"],
        ],
      },
      {
        type: "text",
        text: "なる describes a change, so it often comes in the past: [寒|さむ]くなった (it's got cold). いい becomes よくなる. Noun + になる came up with に, the target of a change. Noun + にする is what you say when choosing, in a café or a shop; the past, にした, means you've decided.",
      },
      { type: "link", href: "/learn/particles/ni-target", label: "に: the target", text: "Noun + になる: に marks what something becomes." },
      { type: "heading", text: "なる: become" },
      {
        type: "examples",
        items: [
          { jp: "[朝|あさ] と [夜|よる] は [寒|さむ]{く なりました} ね。", en: "It's got cold in the mornings and evenings, hasn't it?", alt: "[朝|あさ] と [夜|よる] は [寒|さむ]{く なった} ね。" },
          { jp: "[部屋|へや] が きれい {に なった}。", en: "The room's nice and clean now.", alt: "[部屋|へや] が きれい {に なりました}。" },
          { jp: "[日本語|にほんご] が [上手|じょうず] {に なりました} ね。", en: "Your Japanese has improved.", alt: "[日本語|にほんご] が [上手|じょうず] {に なった} ね。" },
          { jp: "[姉|あね] は [去年|きょねん] [医者|いしゃ] {に なりました}。", en: "My big sister became a doctor last year.", alt: "[姉|あね] は [去年|きょねん] [医者|いしゃ] {に なった}。" },
          { jp: "[薬|くすり] を [飲|の]んだ から、 よ{く なった}。", en: "I took some medicine, so I'm better now.", alt: "[薬|くすり] を [飲|の]んだ から、 よ{く なりました}。" },
        ],
      },
      { type: "heading", text: "にする: decide on, choose" },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] は カレー {に します}。", en: "I'll have the curry.", alt: "[私|わたし] は カレー {に する}。" },
          { jp: "パーティー は [金曜日|きんようび] {に しましょう}。", en: "Let's have the party on Friday.", alt: "パーティー は [金曜日|きんようび] {に しよう}。" },
          { jp: "プレゼント は [花|はな] {に した}。", en: "I went with flowers for the present.", alt: "プレゼント は [花|はな] {に しました}。" },
          { jp: "どれ {に します} か？", en: "Which one will you have?", alt: "どれ {に する}？" },
        ],
      },
      {
        type: "pair",
        a: { jp: "パーティー は [土曜日|どようび] {に なりました}。", en: "The party's been set for Saturday." },
        b: { jp: "パーティー は [土曜日|どようび] {に しました}。", en: "I've set the party for Saturday." },
        diff: "になる: it turned out that way, decided by others or by circumstances. にする: someone chose it, usually the speaker.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "い-adjectives take く",
        text: "✗ [寒|さむ]いになった ✓ [寒|さむ]くなった. An い-adjective changes its い to く before なる; only な-adjectives and nouns take に. And いい becomes よくなる, never いくなる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[飲|の]み[物|もの]、 どれ {に する}？", en: "Which drink are you getting?" },
          { speaker: "Kenta", jp: "[暑|あつ]{く なった} から、 [冷|つめ]たい [紅茶|こうちゃ] に する。", en: "It's got hot, so I'll go for an iced tea." },
          { speaker: "Aya", jp: "じゃ、 [私|わたし] も そう する。", en: "Then I'll do the same." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite: “It's got dark outside” (use [暗|くら]い): [外|そと]が＿なりました。",
            answers: ["[暗|くら]く"],
            explanation: "い → く before なる: [暗|くら]くなりました.",
          },
          {
            prompt: "Casual past: “My little brother has grown” (use [大|おお]きい): [弟|おとうと]は＿。",
            answers: ["[大|おお]きく なった"],
            explanation: "[大|おお]きい → [大|おお]きく, + なった.",
          },
          {
            prompt: "Polite past: “The park went quiet” (use [静|しず]か): [公園|こうえん]が＿。",
            answers: ["[静|しず]か に なりました"],
            explanation: "A な-adjective takes に: [静|しず]かになりました.",
          },
          {
            prompt: "Choosing, polite, with する: “I'll have the ramen”: ラーメン＿。",
            answers: ["に します"],
            explanation: "Choosing is Noun + にします: ラーメンにします.",
          },
          {
            prompt: "Fix it: [天気|てんき]がいいになりました。",
            answers: ["[天気|てんき] が よく なりました。"],
            explanation: "いい is an い-adjective and becomes よく: [天気|てんき]がよくなりました.",
          },
        ],
      },
    ],
  },
  {
    slug: "gurai-goro",
    title: "About: くらい, ぐらい and ごろ",
    mark: "ぐらい・ごろ",
    summary: "Say “about” for an amount, and “around” for a time.",
    source: "Genki I ch. 3 (ごろ) and ch. 4 (ぐらい); Bunpro, “くらい” and “ごろ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5", "JLPT Sensei doesn't list くらい."),
    blocks: [
      {
        type: "idea",
        text: "**くらい** or **ぐらい** after an amount means “about”, “roughly”; **ごろ** after a point in time means “around” that time.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Amount + くらい · ぐらい", "[一時間|いちじかん] ぐらい"],
          ["Time or date + ごろ", "[三時|さんじ]ごろ"],
          ["Question word + くらい · ごろ", "どれ くらい · いつごろ"],
        ],
      },
      {
        type: "text",
        text: "くらい and ぐらい mean the same; after a number, ぐらい is the more common in speech. ごろ marks a point in time, くらい an amount: [三時|さんじ]ごろ (around three o'clock), but [三時間|さんじかん]ぐらい (about three hours). A に after ごろ is optional: [七時|しちじ]ごろ(に)[起|お]きる. In speech you'll also hear ぐらい after a time ([三時|さんじ]ぐらい), but ごろ never goes after an amount.",
      },
      { type: "heading", text: "くらい · ぐらい: about (an amount)" },
      {
        type: "examples",
        items: [
          { jp: "[学校|がっこう] まで [自転車|じてんしゃ] で [十五分|じゅうごふん] {ぐらい} です。", en: "It's about fifteen minutes to school by bike.", alt: "[学校|がっこう] まで [自転車|じてんしゃ] で [十五分|じゅうごふん] {ぐらい} だ よ。" },
          { jp: "[毎日|まいにち] [二時間|にじかん] {ぐらい} [勉強|べんきょう] して います。", en: "I study for about two hours every day.", alt: "[毎日|まいにち] [二時間|にじかん] {ぐらい} [勉強|べんきょう] してる。" },
          { jp: "この [町|まち] に は [何人|なんにん] {ぐらい} [住|す]んで います か？", en: "Roughly how many people live in this town?", alt: "この [町|まち]、 [何人|なんにん] {ぐらい} [住|す]んでる の？" },
          { jp: "どれ {くらい} [日本|にほん] に いる ん です か？", en: "How long are you in Japan for?", alt: "どれ {くらい} [日本|にほん] に いる の？" },
        ],
      },
      { type: "heading", text: "ごろ: around (a time)" },
      {
        type: "examples",
        items: [
          { jp: "[毎朝|まいあさ] [六時|ろくじ]{ごろ} [起|お]きます。", en: "I get up around six every morning.", alt: "[毎朝|まいあさ] [六時|ろくじ]{ごろ} [起|お]きる。" },
          { jp: "[八時|はちじ]{ごろ} に [電話|でんわ] する ね。", en: "I'll call you around eight.", alt: "[八時|はちじ]{ごろ} に [電話|でんわ] します ね。" },
          { jp: "[夏休|なつやす]み は いつ{ごろ} から です か？", en: "Roughly when does the summer holiday start?", alt: "[夏休|なつやす]み は いつ{ごろ} から？" },
          { jp: "[映画|えいが] は [四時|よじ]{ごろ} [終|お]わる でしょう。", en: "The film will probably finish around four.", alt: "[映画|えいが] は [四時|よじ]{ごろ} [終|お]わる だろう。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[二時|にじ]{ごろ} [寝|ね]ました。", en: "I went to bed around two." },
        b: { jp: "[二時間|にじかん] {ぐらい} [寝|ね]ました。", en: "I slept for about two hours." },
        diff: "ごろ follows a point in time: when it happened. くらい or ぐらい follows an amount: how long.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ごろ is only for a point in time",
        text: "✗ [三時間|さんじかん]ごろ[勉強|べんきょう]しました ✓ [三時間|さんじかん]ぐらい[勉強|べんきょう]しました. ごろ goes after a clock time or a date; a length of time, a number or an amount takes くらい or ぐらい.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[明日|あした]、 [何時|なんじ]{ごろ} [来|く]る？", en: "Roughly what time are you coming tomorrow?" },
          { speaker: "Kenta", jp: "[十時|じゅうじ]{ごろ} [行|い]く よ。", en: "I'll come around ten." },
          { speaker: "Aya", jp: "わかった。 [駅|えき] から [五分|ごふん] {ぐらい} だ から、 [歩|ある]いて [来|き]て ね。", en: "OK. It's about five minutes from the station, so walk over." },
        ],
        note: "Kenta says [行|い]く: in Japanese you “go” to where the listener is.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "“I waited about an hour”: [一時間|いちじかん]＿[待|ま]ちました。",
            answers: ["ぐらい", "くらい"],
            explanation: "An amount of time takes ぐらい or くらい.",
          },
          {
            prompt: "With ごろ: “I go to bed around eleven”: [十一時|じゅういちじ]＿[寝|ね]ます。",
            answers: ["ごろ", "ごろ に"],
            explanation: "A clock time takes ごろ, with or without に.",
          },
          {
            prompt: "Casual: “How long does it take?” (use かかる): ＿かかる？",
            answers: ["どれ くらい", "どれ ぐらい", "どの くらい", "どの ぐらい"],
            explanation: "どれくらい (or どのくらい) asks how long or how much.",
          },
          {
            prompt: "Fix it: [二時間|にじかん]ごろテレビを[見|み]ました。",
            answers: ["[二時間|にじかん] ぐらい テレビ を [見|み]ました。", "[二時間|にじかん] くらい テレビ を [見|み]ました。"],
            explanation: "Two hours is an amount, so ぐらい or くらい, not ごろ.",
          },
          {
            prompt: "Polite: “I'll arrive around five” (use [着|つ]く): [五時|ごじ]＿。",
            answers: ["ごろ [着|つ]きます", "ごろ に [着|つ]きます"],
            explanation: "A clock time takes ごろ: [五時|ごじ]ごろ[着|つ]きます.",
          },
        ],
      },
    ],
  },
];
