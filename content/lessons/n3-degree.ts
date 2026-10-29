import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n3Degree: Lesson[] = [
  {
    slug: "sae",
    title: "Even, and as long as: さえ",
    mark: "さえ",
    summary: "Pick the most basic example to say “not even that”, and name the one condition that's enough.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (sae); Bunpro, “さえ” and “さえ〜ば”; JLPT Sensei, “さえ” and “さえ〜ば”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **さえ** picks the most basic case, so everything else goes without saying (“not even …”); with a conditional, **さえ〜ば** names the one thing that's enough (“as long as …, if only …”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + さえ (instead of が or を)", "[名前|なまえ] さえ [知|し]らない"],
          ["Noun + でさえ (a person, as the subject)", "[先生|せんせい] で さえ [分|わ]からない"],
          ["Noun + other particle + さえ", "[家族|かぞく] に さえ [話|はな]して いない"],
          ["Noun + さえ + conditional", "[時間|じかん] さえ あれば"],
          ["Verb stem + さえすれば", "[謝|あやま]り さえ すれば"],
        ],
      },
      {
        type: "text",
        text: "さえ takes the place of が and を, while other particles stay in front of it (に さえ, と さえ). After a person who is the subject, でさえ is common: [先生|せんせい]でさえ. も can also mean “even” ([名前|なまえ]も[知|し]らない), but it can just as well mean “also”; さえ is always “even”, and stronger. Many さえ sentences are negative (if not even the easiest thing works, nothing harder will), but a positive one is fine too: [子供|こども]でさえ[知|し]っている (even a child knows).",
      },
      {
        type: "text",
        text: "With a conditional, さえ says this one condition is all it takes: [時間|じかん]さえあれば (if only I had the time, as long as there's time). With a verb, さえ follows the stem, and する takes the ば: [謝|あやま]りさえすれば. A する noun works the same way: [練習|れんしゅう]さえすれば.",
      },
      { type: "heading", text: "さえ: even" },
      {
        type: "examples",
        items: [
          {
            jp: "[忙|いそが]しくて、 [昼|ひる]ご[飯|はん] を [食|た]べる [時間|じかん] {さえ} ありません でした。",
            en: "I was so busy I didn't even have time to eat lunch.",
            alt: "[忙|いそが]しくて、 [昼|ひる]ご[飯|はん] を [食|た]べる [時間|じかん] {さえ} なかった。",
          },
          {
            jp: "[隣|となり] に [住|す]んで いる [人|ひと] の [名前|なまえ] {さえ} [知|し]らない。",
            en: "I don't even know the name of the person who lives next door.",
            alt: "[隣|となり] に [住|す]んで いる [人|ひと] の [名前|なまえ] {さえ} [知|し]りません。",
          },
          {
            jp: "この [問題|もんだい] は [先生|せんせい] {で さえ} [分|わ]からなかった。",
            en: "Even the teacher couldn't work out this problem.",
            alt: "この [問題|もんだい] は [先生|せんせい] {で さえ} [分|わ]かりません でした。",
          },
          {
            jp: "[疲|つか]れて いて、 [立|た]つ こと {さえ} できなかった。",
            en: "I was so tired I couldn't even stand up.",
            alt: "[疲|つか]れて いて、 [立|た]つ こと {さえ} できません でした。",
          },
          {
            jp: "この こと は [家族|かぞく] に {さえ} [話|はな]して いません。",
            en: "I haven't even told my family about this.",
            alt: "この こと は [家族|かぞく] に {さえ} [話|はな]して いない。",
          },
        ],
      },
      { type: "heading", text: "さえ〜ば: as long as, if only" },
      {
        type: "examples",
        items: [
          {
            jp: "[時間|じかん] {さえ} あれば、 もっと [本|ほん] を [読|よ]みたい です。",
            en: "If only I had the time, I'd read more books.",
            alt: "[時間|じかん] {さえ} あれば、 もっと [本|ほん] を [読|よ]みたい。",
          },
          {
            jp: "この [薬|くすり] {さえ} [飲|の]めば、 すぐ よく なります よ。",
            en: "Just take this medicine, and you'll soon be better.",
            alt: "この [薬|くすり] {さえ} [飲|の]めば、 すぐ よく なる よ。",
          },
          {
            jp: "[天気|てんき] {さえ} よければ、 [明日|あした] は [山|やま] に [登|のぼ]る つもり だ。",
            en: "As long as the weather's good, I'm planning to climb the mountain tomorrow.",
            alt: "[天気|てんき] {さえ} よければ、 [明日|あした] は [山|やま] に [登|のぼ]る つもり です。",
          },
          {
            jp: "[住所|じゅうしょ] {さえ} [分|わ]かれば、 [地図|ちず] で [探|さが]せます。",
            en: "As long as I know the address, I can find it on a map.",
            alt: "[住所|じゅうしょ] {さえ} [分|わ]かれば、 [地図|ちず] で [探|さが]せる。",
          },
          {
            jp: "[謝|あやま]り {さえ} すれば、 [彼女|かのじょ] は [怒|おこ]らなく なる と [思|おも]う。",
            en: "If you just apologise, I think she'll stop being angry.",
            alt: "[謝|あやま]り {さえ} すれば、 [彼女|かのじょ] は [怒|おこ]らなく なる と [思|おも]います。",
            note: "With a verb, さえ follows the stem and する takes the ば.",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[弟|おとうと] は ひらがな {も} [読|よ]めない。", en: "My little brother can't read hiragana either." },
        b: { jp: "[弟|おとうと] は ひらがな {さえ} [読|よ]めない。", en: "My little brother can't even read hiragana." },
        diff: "も can mean “also” (he can't read it, like someone else) or “even”. さえ only means “even”: hiragana is the easiest script, so kanji is out of the question.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A verb: stem + さえすれば",
        text: "✗ [謝|あやま]るさえすれば ✓ [謝|あやま]りさえすれば. With a verb, さえ follows the stem ([謝|あやま]り), and する carries the conditional. After a noun, さえ simply follows it and the verb takes ば: [薬|くすり]さえ[飲|の]めば.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mika", jp: "[日本語|にほんご] の [勉強|べんきょう]、 どう？", en: "How's your Japanese going?" },
          { speaker: "Tom", jp: "[難|むずか]しい よ。 まだ [子供|こども] の [本|ほん] {さえ} [読|よ]めない ん だ。", en: "It's hard. I still can't even read children's books." },
          { speaker: "Mika", jp: "[大丈夫|だいじょうぶ]。 [毎日|まいにち] [続|つづ]け {さえ} すれば、 [読|よ]める よう に なる よ。", en: "Don't worry. As long as you keep at it every day, you'll get there." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with さえ (use する): “He doesn't even say hello”: [彼|かれ]は[挨拶|あいさつ]＿。",
            answers: ["さえ しない", "さえ も しない"],
            explanation: "さえ takes the place of を: [挨拶|あいさつ]さえしない (not even a greeting, let alone anything more).",
          },
          {
            prompt: "With さえ, after a particle: “I didn't even tell my parents”: [両親|りょうしん]＿[言|い]わなかった。",
            answers: ["に さえ"],
            explanation: "に stays, and さえ follows it: [両親|りょうしん]にさえ.",
          },
          {
            prompt: "Polite, with さえ…ば (use ある): “As long as there's rice, I'm fine”:ご[飯|はん]＿、[大丈夫|だいじょうぶ]です。",
            answers: ["さえ あれば"],
            explanation: "Noun + さえ + the conditional: ご[飯|はん]さえあれば (that's all it takes).",
          },
          {
            prompt: "With さえ (use [押|お]す): “You just press this button, and it starts”: このボタンを＿、[動|うご]きます。",
            answers: ["[押|お]し さえ すれば"],
            explanation: "A verb's stem + さえすれば: [押|お]しさえすれば.",
          },
          {
            prompt: "Fix it (“If you just rest, you'll get better”): [休|やす]むさえすれば[治|なお]りますよ。",
            answers: ["[休|やす]み さえ すれば [治|なお]ります よ。"],
            explanation: "さえ follows the verb's stem, not its plain form: [休|やす]みさえすれば.",
          },
        ],
      },
    ],
  },
  {
    slug: "koso",
    title: "This one and no other: こそ and からこそ",
    mark: "こそ",
    summary: "Put weight on one word (this time, for sure), say “likewise” politely, and give the very reason with からこそ.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (koso); Bunpro, “こそ” and “からこそ”; JLPT Sensei, “こそ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**こそ** after a word picks it out with weight (“this, and no other”: [今度|こんど]こそ, this time for sure); after a reason, **からこそ** says it's the very reason (“precisely because”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + こそ (instead of が, を or は)", "[今度|こんど] こそ"],
          ["The set reply こちらこそ", "こちら こそ"],
          ["Verb or い-adjective, plain + からこそ", "[難|むずか]しい から こそ"],
          ["な-adjective or Noun + だ + からこそ", "[家族|かぞく] だ から こそ"],
        ],
      },
      {
        type: "text",
        text: "こそ takes the place of が, を and は. It's for a choice you insist on (this year, and not some other year) or the one thing that really matters. こちらこそ answers thanks or an apology with “no, it's me who should …”: ありがとうございました ― こちらこそ.",
      },
      {
        type: "text",
        text: "からこそ stresses the reason: often one you might expect to work the other way (it's *because* it's hard that I want to do it). It goes with から, and isn't used with ので.",
      },
      { type: "heading", text: "こそ: this, and no other" },
      {
        type: "examples",
        items: [
          {
            jp: "[今度|こんど] {こそ} [試験|しけん] に [合格|ごうかく] したい。",
            en: "I want to pass the exam this time, for sure.",
            alt: "[今度|こんど] {こそ} [試験|しけん] に [合格|ごうかく] したい です。",
          },
          {
            jp: "[今年|ことし] {こそ} たばこ を やめます。",
            en: "This is the year I give up smoking, for real.",
            alt: "[今年|ことし] {こそ} たばこ を やめる。",
          },
          {
            jp: "いいえ、 こちら {こそ} ありがとう ございました。",
            en: "No, thank *you*.",
            note: "The reply to someone's thanks or apology.",
          },
          {
            jp: "これ {こそ} [私|わたし] が [探|さが]して いた [本|ほん] です。",
            en: "This is the very book I'd been looking for.",
            alt: "これ {こそ} [私|わたし] が [探|さが]して いた [本|ほん] だ。",
          },
          {
            jp: "[健康|けんこう] {こそ} [一番|いちばん] [大切|たいせつ] な もの だ と [思|おも]う。",
            en: "Health, above all, is what matters most, I think.",
            alt: "[健康|けんこう] {こそ} [一番|いちばん] [大切|たいせつ] な もの だ と [思|おも]います。",
          },
        ],
      },
      { type: "heading", text: "からこそ: precisely because" },
      {
        type: "examples",
        items: [
          {
            jp: "[好|す]き だ から {こそ}、 [厳|きび]しい こと を [言|い]う ん です。",
            en: "It's precisely because I care that I say harsh things.",
            alt: "[好|す]き だ から {こそ}、 [厳|きび]しい こと を [言|い]う ん だ よ。",
          },
          {
            jp: "[難|むずか]しい から {こそ}、 やって みたい。",
            en: "It's precisely because it's hard that I want to try it.",
            alt: "[難|むずか]しい から {こそ}、 やって みたい です。",
          },
          {
            jp: "[家族|かぞく] だ から {こそ}、 [言|い]えない こと も ある。",
            en: "There are things you can't say precisely because it's family.",
            alt: "[家族|かぞく] だ から {こそ}、 [言|い]えない こと も あります。",
          },
          {
            jp: "[毎日|まいにち] [練習|れんしゅう] した から {こそ}、 [試合|しあい] に [勝|か]てた ん です。",
            en: "We won precisely because we practised every day.",
            alt: "[毎日|まいにち] [練習|れんしゅう] した から {こそ}、 [試合|しあい] に [勝|か]てた ん だ。",
          },
          {
            jp: "[失敗|しっぱい] した から {こそ}、 [分|わ]かる こと が あります。",
            en: "Some things you only understand because you've failed.",
            alt: "[失敗|しっぱい] した から {こそ}、 [分|わ]かる こと が ある。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[難|むずか]しかった {から}、 やめた。", en: "It was hard, so I gave up." },
        b: { jp: "[難|むずか]しかった から {こそ}、 [続|つづ]けた。", en: "It was precisely because it was hard that I kept going." },
        diff: "A different second half on purpose: から gives an ordinary reason, while からこそ insists that this is the reason, often for a result you wouldn't expect from it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "からこそ, not のでこそ",
        text: "✗ [好|す]きなのでこそ ✓ [好|す]きだからこそ. こそ goes with the reason word から, and isn't used with ので.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Kato", jp: "この [間|あいだ] は ありがとう ございました。", en: "Thank you for the other day." },
          { speaker: "Mr Ito", jp: "いえ、 こちら {こそ}。 [本当|ほんとう] に [助|たす]かりました。", en: "Not at all, thank *you*. You were a real help." },
          { speaker: "Ms Kato", jp: "また [一緒|いっしょ] に [仕事|しごと] を しましょう。", en: "Let's work together again." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with こそ: “Next time, I'll win for sure!”: [次|つぎ]＿[勝|か]つ！",
            answers: ["こそ", "こそ は"],
            explanation: "こそ puts the weight on [次|つぎ]: next time, and not some later time. こそは is common too.",
          },
          {
            prompt: "Polite reply, with こそ: “Thank you for today.” “No, thank *you*.”: [今日|きょう]はありがとうございました。―＿、ありがとうございました。",
            answers: ["こちら こそ", "[私|わたし] こそ"],
            explanation: "こちらこそ is the set reply: “no, it's me who should thank you”.",
          },
          {
            prompt: "With からこそ (use [大切|たいせつ]): “I'm careful with it precisely because it matters to me”: ＿、[丁寧|ていねい]に[使|つか]っています。",
            answers: ["[大切|たいせつ] だ から こそ", "[大切|たいせつ] な もの だ から こそ"],
            explanation: "A な-adjective takes だ before から: [大切|たいせつ]だからこそ.",
          },
          {
            prompt: "Polite, with からこそ (use [信|しん]じる): “I'm telling you precisely because I trust you, Mori-san”: [森|もり]さんを＿、[話|はな]すんです。",
            answers: ["[信|しん]じて いる から こそ"],
            explanation: "The reason + からこそ: [信|しん]じているからこそ (the very reason I'm telling you).",
          },
          {
            prompt: "Fix it: [好|す]きなのでこそ、[毎日|まいにち][続|つづ]けられる。",
            answers: ["[好|す]き だ から こそ、 [毎日|まいにち] [続|つづ]けられる。"],
            explanation: "こそ goes with から, not ので: [好|す]きだからこそ.",
          },
        ],
      },
    ],
  },
  {
    slug: "hodo",
    title: "So … that, and not as … as: ほど",
    mark: "ほど",
    summary: "Measure how far something goes (so tired I could cry), and say A doesn't reach B.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (hodo); Bunpro, “ほど” and “ほど～ない”; JLPT Sensei, “ほど” and “ほど～ない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**ほど** measures how far something goes (“so … that, to the point of”: [泣|な]きたいほど[悲|かな]しい), and **AはBほど〜ない** says A doesn't reach B (“A is not as … as B”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain + ほど", "[泣|な]きたい ほど"],
          ["Verb, plain negative + ほど", "[歩|ある]けない ほど"],
          ["Noun + ほど", "[山|やま] ほど"],
          ["A は B ほど + negative", "[今年|ことし] は [去年|きょねん] ほど [暑|あつ]くない"],
        ],
      },
      {
        type: "text",
        text: "ほど, a word for degree ([程度|ていど]), is written in kana in these uses. To say how far something goes, the first half is a picture of the degree (crying, not being able to walk), and the second half is the feeling or state: [泣|な]きたいほど[悲|かな]しかった. くらい (a lesson below) does the same job and sounds more everyday; ほど is a little more formal.",
      },
      {
        type: "text",
        text: "AはBほど〜ない nearly always ends negative: A falls short of B. より compares upwards (A is more … than B); ほど〜ない says A is less. With a number, ほど also means “about”, a little more formal than くらい: [一時間|いちじかん]ほど (about an hour).",
      },
      { type: "link", href: "/learn/n5-essentials/comparing", label: "Comparing: より and のほうが", text: "A is more … than B." },
      { type: "heading", text: "ほど: so … that, to the point of" },
      {
        type: "examples",
        items: [
          {
            jp: "[泣|な]きたい {ほど} [悲|かな]しかった。",
            en: "I was so sad I wanted to cry.",
            alt: "[泣|な]きたい {ほど} [悲|かな]しかった です。",
          },
          {
            jp: "[足|あし] が [痛|いた]くて、 [歩|ある]けない {ほど} でした。",
            en: "My feet hurt so much I couldn't walk.",
            alt: "[足|あし] が [痛|いた]くて、 [歩|ある]けない {ほど} だった。",
          },
          {
            jp: "[今日|きょう] は [死|し]ぬ {ほど} [疲|つか]れた。",
            en: "I'm dead tired today.",
            note: "[死|し]ぬほど (to the point of dying) is everyday exaggeration, like “dead tired”.",
          },
          {
            jp: "[宿題|しゅくだい] が [山|やま] {ほど} あります。",
            en: "I've got a mountain of homework.",
            alt: "[宿題|しゅくだい] が [山|やま] {ほど} ある。",
          },
          {
            jp: "[信|しん]じられない {ほど} [安|やす]い です ね。",
            en: "It's unbelievably cheap, isn't it?",
            alt: "[信|しん]じられない {ほど} [安|やす]い ね。",
          },
        ],
      },
      { type: "heading", text: "AはBほど〜ない: A is not as … as B" },
      {
        type: "examples",
        items: [
          {
            jp: "[今年|ことし] の [夏|なつ] は [去年|きょねん] {ほど} [暑|あつ]くない。",
            en: "This summer isn't as hot as last year's.",
            alt: "[今年|ことし] の [夏|なつ] は [去年|きょねん] {ほど} [暑|あつ]くない です。",
          },
          {
            jp: "[日本語|にほんご] は [思|おも]った {ほど} [難|むずか]しくなかった です。",
            en: "Japanese wasn't as hard as I'd thought.",
            alt: "[日本語|にほんご] は [思|おも]った {ほど} [難|むずか]しくなかった。",
          },
          {
            jp: "[私|わたし] は [兄|あに] {ほど} [背|せ] が [高|たか]くない。",
            en: "I'm not as tall as my brother.",
            alt: "[私|わたし] は [兄|あに] {ほど} [背|せ] が [高|たか]くない です。",
          },
          {
            jp: "この [店|みせ] の ラーメン は、 [前|まえ] {ほど} おいしく ありません。",
            en: "This place's ramen isn't as good as it used to be.",
            alt: "この [店|みせ] の ラーメン は、 [前|まえ] {ほど} おいしくない。",
          },
        ],
      },
      { type: "heading", text: "About: a number + ほど" },
      {
        type: "examples",
        items: [
          {
            jp: "[一時間|いちじかん] {ほど} [待|ま]ちました。",
            en: "I waited about an hour.",
            alt: "[一時間|いちじかん] {ほど} [待|ま]った。",
          },
          {
            jp: "[五分|ごふん] {ほど} [歩|ある]けば、 [駅|えき] です。",
            en: "If you walk for about five minutes, you're at the station.",
            alt: "[五分|ごふん] {ほど} [歩|ある]けば、 [駅|えき] だ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[今日|きょう] は [昨日|きのう] {より} [寒|さむ]くない。", en: "Today isn't any colder than yesterday." },
        b: { jp: "[今日|きょう] は [昨日|きのう] {ほど} [寒|さむ]くない。", en: "Today isn't as cold as yesterday." },
        diff: "より〜ない only says today isn't colder (it may be just as cold). ほど〜ない says yesterday was cold, and today falls short of it: it's milder.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ほど〜 comparisons need a negative",
        text: "✗ [今日|きょう]は[昨日|きのう]ほど[寒|さむ]いです ✓ [今日|きょう]は[昨日|きのう]ほど[寒|さむ]くないです. ほど compares (A as … as B) almost only with a negative. To say “colder than”, use より: [今日|きょう]は[昨日|きのう]より[寒|さむ]いです.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ken", jp: "[北海道|ほっかいどう] の [冬|ふゆ] は どう だった？", en: "How was winter in Hokkaido?" },
          { speaker: "Amy", jp: "[寒|さむ]かった けど、 [思|おも]った {ほど} じゃ なかった よ。", en: "It was cold, but not as bad as I'd expected." },
          { speaker: "Ken", jp: "[雪|ゆき] は？", en: "And the snow?" },
          { speaker: "Amy", jp: "すごかった。 [前|まえ] が [見|み]えない {ほど} [降|ふ]った [日|ひ] も あった よ。", en: "Incredible. Some days it snowed so hard you couldn't see in front of you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ほど (use [眠|ねむ]る): “I was so worried I couldn't sleep”: ＿[心配|しんぱい]でした。",
            answers: ["[眠|ねむ]れない ほど"],
            explanation: "The degree + ほど: [眠|ねむ]れないほど[心配|しんぱい]でした.",
          },
          {
            prompt: "Not as … as, with ほど: “I'm not as good at cooking as my mother”: [私|わたし]は[母|はは]＿[料理|りょうり]が[上手|じょうず]じゃない。",
            answers: ["ほど", "ほど は"],
            explanation: "AはBほど + negative:[母|はは]ほど[上手|じょうず]じゃない.",
          },
          {
            prompt: "Polite, with ほど (use [高|たか]い): “The hotel wasn't as expensive as I'd thought”: ホテルは[思|おも]ったほど＿。",
            answers: ["[高|たか]くなかった です", "[高|たか]く ありません でした"],
            explanation: "ほど compares in the negative: [思|おも]ったほど[高|たか]くなかったです.",
          },
          {
            prompt: "Fix it (“The bus isn't as fast as the train”): バスは[電車|でんしゃ]ほど[速|はや]いです。",
            answers: ["バス は [電車|でんしゃ] ほど [速|はや]くない です。", "バス は [電車|でんしゃ] ほど [速|はや]く ありません。", "バス は [電車|でんしゃ] ほど [速|はや]くない。"],
            explanation: "AはBほど needs a negative ending: [速|はや]くないです.",
          },
        ],
      },
    ],
  },
  {
    slug: "ba-hodo",
    title: "The more …, the more: ば〜ほど",
    mark: "ば・ほど",
    summary: "Say that as one thing grows, so does another, as a rule.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (hodo); Bunpro, “ば〜ほど”; JLPT Sensei, “ば～ほど”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "The ば form of a word, then the same word + **ほど**, says “the more …, the more …”: [考|かんが]えれば[考|かんが]えるほど (the more I think about it).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb ば + the same verb, plain + ほど", "[食|た]べれば [食|た]べる ほど"],
          ["い-adjective ければ + the same adjective + ほど", "[安|やす]ければ [安|やす]い ほど"],
          ["な-adjective なら + the same + な + ほど", "[静|しず]か なら [静|しず]か な ほど"],
          ["The first half dropped: plain form + ほど", "[早|はや]い ほど いい"],
        ],
      },
      {
        type: "text",
        text: "The word is said twice: first in its ば form, then in its plain form before ほど. The first half can be dropped, leaving just ほど: [返事|へんじ]は[早|はや]いほどいい (the sooner the better).",
      },
      {
        type: "text",
        text: "につれて tells how a change unfolds over time: as I got older, I started getting up earlier. ば〜ほど states a rule that holds at any point, so it also fits things that don't unfold over time: the cheaper, the better; the bigger the flat, the higher the rent.",
      },
      { type: "link", href: "/learn/n3-time/ni-tsurete", label: "As things change: につれて", text: "A change that unfolds over time." },
      {
        type: "examples",
        items: [
          {
            jp: "[考|かんが]えれば [考|かんが]える {ほど}、 [分|わ]からなく なる。",
            en: "The more I think about it, the less I understand.",
            alt: "[考|かんが]えれば [考|かんが]える {ほど}、 [分|わ]からなく なります。",
          },
          {
            jp: "[日本語|にほんご] は [勉強|べんきょう] すれば する {ほど} [面白|おもしろ]く なります。",
            en: "The more you study Japanese, the more interesting it gets.",
            alt: "[日本語|にほんご] は [勉強|べんきょう] すれば する {ほど} [面白|おもしろ]く なる よ。",
          },
          {
            jp: "[野菜|やさい] は [新|あたら]しければ [新|あたら]しい {ほど} おいしい。",
            en: "The fresher vegetables are, the better they taste.",
            alt: "[野菜|やさい] は [新|あたら]しければ [新|あたら]しい {ほど} おいしい です。",
          },
          {
            jp: "[部屋|へや] は [広|ひろ]ければ [広|ひろ]い {ほど}、 [家賃|やちん] が [高|たか]く なる。",
            en: "The bigger the flat, the higher the rent.",
            alt: "[部屋|へや] は [広|ひろ]ければ [広|ひろ]い {ほど}、 [家賃|やちん] が [高|たか]く なります。",
          },
          {
            jp: "[町|まち] は [便利|べんり] なら [便利|べんり] な {ほど}、 [住|す]みたい [人|ひと] が [増|ふ]えます。",
            en: "The more convenient a town is, the more people want to live there.",
            alt: "[町|まち] は [便利|べんり] なら [便利|べんり] な {ほど}、 [住|す]みたい [人|ひと] が [増|ふ]える。",
          },
        ],
      },
      { type: "heading", text: "With the first half dropped" },
      {
        type: "examples",
        items: [
          {
            jp: "[返事|へんじ] は [早|はや]い {ほど} いい です。",
            en: "The sooner you reply, the better.",
            alt: "[返事|へんじ] は [早|はや]い {ほど} いい よ。",
          },
          {
            jp: "[家賃|やちん] は [安|やす]い {ほど} いい。",
            en: "The cheaper the rent, the better.",
            alt: "[家賃|やちん] は [安|やす]い {ほど} いい です。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[練習|れんしゅう] する {につれて}、 [上手|じょうず] に なって きた。", en: "As I practised, I got better and better." },
        b: { jp: "[練習|れんしゅう] すれば する {ほど}、 [上手|じょうず] に なる。", en: "The more you practise, the better you get." },
        diff: "The endings differ on purpose: につれて tells how something changed over time (なってきた), while ば〜ほど states a rule (なる).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "An い-adjective's ば form",
        text: "✗ [安|やす]いば[安|やす]いほど ✓ [安|やす]ければ[安|やす]いほど. An い-adjective's ば form is ければ, and a な-adjective uses なら: [静|しず]かなら[静|しず]かなほど.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Yuki", jp: "[日本語|にほんご] の [本|ほん] は、 [読|よ]めば [読|よ]む {ほど} [速|はや]く [読|よ]める よう に なる ね。", en: "With Japanese books, the more you read, the faster you can read them." },
          { speaker: "Sam", jp: "うん。 でも [難|むずか]しい [本|ほん] は、 [読|よ]めば [読|よ]む {ほど} [眠|ねむ]く なる よ。", en: "Yeah. But with hard books, the more I read, the sleepier I get." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With ば〜ほど (use [聞|き]く): “The more I listen to this song, the more I like it”: この[歌|うた]は＿、[好|す]きになる。",
            answers: ["[聞|き]けば [聞|き]く ほど"],
            explanation: "The ば form, the plain form, then ほど: [聞|き]けば[聞|き]くほど.",
          },
          {
            prompt: "With ほど (use [軽|かる]い): “The lighter a suitcase is, the better”: スーツケースは＿いい。",
            answers: ["[軽|かる]ければ [軽|かる]い ほど", "[軽|かる]い ほど"],
            explanation: "[軽|かる]ければ[軽|かる]いほど, or just [軽|かる]いほど with the first half dropped.",
          },
          {
            prompt: "Polite, with ほど (use [簡単|かんたん]): “The simpler the instructions, the better”: [説明|せつめい]は＿いいです。",
            answers: ["[簡単|かんたん] なら [簡単|かんたん] な ほど", "[簡単|かんたん] な ほど"],
            explanation: "A な-adjective uses なら, then な before ほど: [簡単|かんたん]なら[簡単|かんたん]なほど.",
          },
          {
            prompt: "With ば〜ほど (use [話|はな]す): “The more you speak, the better you get”: ＿、[上手|じょうず]になりますよ。",
            answers: ["[話|はな]せば [話|はな]す ほど"],
            explanation: "[話|はな]す → [話|はな]せば, then [話|はな]すほど.",
          },
          {
            prompt: "Fix it (“The more expensive it is, the better it sells”): [高|たか]いば[高|たか]いほど、よく[売|う]れる。",
            answers: ["[高|たか]ければ [高|たか]い ほど、 よく [売|う]れる。"],
            explanation: "An い-adjective's ば form is ければ: [高|たか]ければ[高|たか]いほど.",
          },
        ],
      },
    ],
  },
  {
    slug: "kurai-extent",
    title: "So … that, at least, the only one: くらい for extent",
    mark: "くらい",
    summary: "Use くらい beyond “about”: to measure how far something goes, to belittle (at least), and to say “about the only”.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (kurai); Bunpro, “くらい ②” and “は～くらいです”; JLPT Sensei, “くらい / ぐらい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Beyond “about”, **くらい** (or ぐらい) measures how far something goes (“so … that”), belittles a small thing (“at least …”), and with AはBくらいだ names about the only one.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Use", "Example"],
        rows: [
          ["Verb, plain + くらい: so … that", "[涙|なみだ] が [出|で]る くらい"],
          ["Noun + くらい + verb: at least", "[電話|でんわ] くらい して"],
          ["A は Noun + くらい だ: about the only", "[直|なお]せる の は [森|もり]-さん くらい だ"],
        ],
      },
      {
        type: "text",
        text: "くらい and ぐらい are the same word, written in kana. You already know it after a number: [二時間|にじかん]ぐらい (about two hours). After a verb or adjective it measures a degree, just as ほど does: [涙|なみだ]が[出|で]るくらい[笑|わら]った. くらい sounds more everyday, ほど a little more formal.",
      },
      {
        type: "text",
        text: "After a noun, くらい can make the thing small: it's the least you could do, or the least I can manage. [電話|でんわ]くらいしてよ (you could at least call). With this use, くらい is often followed by は: [返事|へんじ]くらいはしてよ. The reply ひらがなぐらい[読|よ]めますよ means “of course I can read hiragana: it's nothing much”. And AはBくらいだ says B is about the only one: [母|はは]くらいです (my mother's about the only one).",
      },
      { type: "link", href: "/learn/n5-essentials/gurai-goro", label: "About: くらい and ごろ", text: "くらい after an amount." },
      { type: "heading", text: "So … that" },
      {
        type: "examples",
        items: [
          {
            jp: "[今日|きょう] は [外|そと] に [出|で]たくない {くらい} [寒|さむ]い。",
            en: "It's so cold today I don't want to go out.",
            alt: "[今日|きょう] は [外|そと] に [出|で]たくない {くらい} [寒|さむ]い です。",
          },
          {
            jp: "[涙|なみだ] が [出|で]る {くらい} [笑|わら]った。",
            en: "I laughed so hard I cried.",
            alt: "[涙|なみだ] が [出|で]る {くらい} [笑|わら]いました。",
          },
          {
            jp: "[彼女|かのじょ] は プロ と [同|おな]じ {くらい} [歌|うた] が [上手|じょうず] です。",
            en: "She sings just as well as a professional.",
            alt: "[彼女|かのじょ] は プロ と [同|おな]じ {くらい} [歌|うた] が [上手|じょうず] だ よ。",
            note: "と[同|おな]じくらい: as … as, to the same degree.",
          },
          {
            jp: "その ニュース を [聞|き]いて、 [声|こえ] も [出|で]ない {くらい} [驚|おどろ]いた。",
            en: "When I heard the news, I was so shocked I couldn't make a sound.",
            alt: "その ニュース を [聞|き]いて、 [声|こえ] も [出|で]ない {くらい} [驚|おどろ]きました。",
          },
        ],
      },
      { type: "heading", text: "At least, only that much" },
      {
        type: "examples",
        items: [
          {
            jp: "[遅|おく]れる なら、 [電話|でんわ] {くらい} して よ。",
            en: "If you're going to be late, you could at least phone.",
            alt: "[遅|おく]れる なら、 [電話|でんわ] {くらい} して ください。",
          },
          {
            jp: "[忙|いそが]しくて も、 [朝|あさ]ご[飯|はん] {くらい} [食|た]べた ほう が いい です よ。",
            en: "However busy you are, you should at least eat breakfast.",
            alt: "[忙|いそが]しくて も、 [朝|あさ]ご[飯|はん] {くらい} [食|た]べた ほう が いい よ。",
          },
          {
            jp: "ひらがな {ぐらい} [読|よ]めます よ。",
            en: "Of course I can read hiragana: that's nothing.",
            alt: "ひらがな {ぐらい} [読|よ]める よ。",
          },
          {
            jp: "[部屋|へや] {くらい} [片付|かたづ]けなさい。",
            en: "At least tidy up your room.",
          },
        ],
      },
      { type: "heading", text: "AはBくらいだ: about the only one" },
      {
        type: "examples",
        items: [
          {
            jp: "こんな [時間|じかん] に [電話|でんわ] して くる の は [母|はは] {くらい} です。",
            en: "My mother's about the only person who'd phone at this hour.",
            alt: "こんな [時間|じかん] に [電話|でんわ] して くる の は [母|はは] {くらい} だ。",
          },
          {
            jp: "この [町|まち] で [遅|おそ]く まで [開|あ]いて いる の は コンビニ {くらい} だ。",
            en: "About the only place open late in this town is the convenience store.",
            alt: "この [町|まち] で [遅|おそ]く まで [開|あ]いて いる の は コンビニ {くらい} です。",
          },
          {
            jp: "クラス で その [漢字|かんじ] が [読|よ]めた の は [私|わたし] {くらい} だった。",
            en: "I was about the only one in the class who could read that kanji.",
            alt: "クラス で その [漢字|かんじ] が [読|よ]めた の は [私|わたし] {くらい} でした。",
          },
          {
            jp: "[冷蔵庫|れいぞうこ] に ある の は [卵|たまご] {くらい} です。",
            en: "About all there is in the fridge is eggs.",
            alt: "[冷蔵庫|れいぞうこ] に ある の は [卵|たまご] {くらい} だ よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "ひらがな {しか} [読|よ]めません。", en: "I can only read hiragana." },
        b: { jp: "ひらがな {くらい} [読|よ]めます。", en: "Hiragana? Of course I can read that." },
        diff: "Two things change on purpose, since しか needs a negative: しか says that's all I can read; くらい says hiragana is the easy part, so of course I can read it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Degree is くらい, not ごろ",
        text: "✗ [泣|な]きたいごろ[悲|かな]しかった ✓ [泣|な]きたいくらい[悲|かな]しかった. ごろ only marks a point in time ([三時|さんじ]ごろ); a degree or an amount takes くらい (or ほど).",
      },
      {
        type: "callout",
        kind: "tip",
        text: "くらいなら (rather than) is the same くらい: うそをつくくらいなら、[何|なに]も[言|い]わないほうがいい (it's better to say nothing than to lie). It belongs to a later level, so it's only mentioned here.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Rina", jp: "[昨日|きのう] の [試合|しあい]、 [見|み]た？", en: "Did you see yesterday's match?" },
          { speaker: "Dan", jp: "[見|み]た！ [声|こえ] が [出|で]なく なる {くらい} [応援|おうえん] した よ。", en: "I did! I cheered till I lost my voice." },
          { speaker: "Rina", jp: "[私|わたし] も。 [次|つぎ] の [試合|しあい] は [一緒|いっしょ] に [見|み]よう よ。", en: "Me too. Let's watch the next one together." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with くらい (use [歩|ある]く): “I was so tired I couldn't walk any further”: もう＿[疲|つか]れた。",
            answers: ["[歩|ある]けない くらい", "[歩|ある]けない ぐらい"],
            explanation: "The degree + くらい: [歩|ある]けないくらい[疲|つか]れた.",
          },
          {
            prompt: "Casual, with くらい, at least (use [言|い]う): “You could at least say thank you”: お[礼|れい]＿よ。",
            answers: ["くらい [言|い]って", "ぐらい [言|い]って", "くらい は [言|い]って", "ぐらい は [言|い]って"],
            explanation: "Noun + くらい makes it the least someone could do: お[礼|れい]くらい[言|い]ってよ.",
          },
          {
            prompt: "Polite, with くらい: “The teacher is about the only one who knows this song”: この[歌|うた]を[知|し]っているのは[先生|せんせい]＿。",
            answers: ["くらい です", "ぐらい です"],
            explanation: "AはBくらいだ: about the only one. Polite: くらいです.",
          },
          {
            prompt: "Casual, with くらい (use [作|つく]る): “I can make curry, at least”: カレー＿。",
            answers: ["くらい [作|つく]れる", "ぐらい [作|つく]れる", "くらい [作|つく]れる よ", "ぐらい [作|つく]れる よ", "くらい は [作|つく]れる", "ぐらい は [作|つく]れる", "くらい は [作|つく]れる よ", "ぐらい は [作|つく]れる よ"],
            explanation: "くらい makes curry the easy thing: カレーくらい[作|つく]れる.",
          },
          {
            prompt: "Fix it (“I was so happy I wanted to dance”): [踊|おど]りたいごろうれしかった。",
            answers: ["[踊|おど]りたい くらい うれしかった。", "[踊|おど]りたい ぐらい うれしかった。", "[踊|おど]りたい ほど うれしかった。"],
            explanation: "ごろ is for points in time; a degree takes くらい (or ほど): [踊|おど]りたいくらいうれしかった.",
          },
        ],
      },
    ],
  },
  {
    slug: "amari",
    title: "So much that: あまり and あまりに",
    mark: "あまり",
    summary: "Say something went so far that it caused something else: あまりに, あまりの…に, and のあまり.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (amari); Bunpro, “あまり” and “あまりに”; JLPT Sensei, “あまり” and “あまりにも”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**あまりに(も)** before an adjective or verb, and **あまりの** before a noun, say something went too far, so far that it caused what follows (“so … that”); Noun + **のあまり** says “out of sheer …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["あまりに(も) + adjective or verb, て or ので", "あまりに [難|むずか]しくて"],
          ["あまり + affirmative adjective, て or ので", "あまり [暑|あつ]くて"],
          ["あまりの + い-adjective さ + に", "あまり の [暑|あつ]さ に"],
          ["Noun + のあまり", "[心配|しんぱい] の あまり"],
          ["Verb, plain + あまり", "[急|いそ]ぐ あまり"],
        ],
      },
      {
        type: "text",
        text: "With a negative, あまり means “not very” (あまり[高|たか]くない, which you know). With an affirmative adjective and て or ので, it means the opposite: “so … that”. あまりに and あまりにも say the same more strongly, and are clearer, since they never mean “not very”. The second half is the result, usually something you couldn't help: you couldn't sleep, nobody could answer.",
      },
      {
        type: "text",
        text: "Before a noun it's あまりの: あまりの[暑|あつ]さに (with the heat being so intense). An い-adjective becomes a noun with さ ([暑|あつ]さ, [痛|いた]さ). After a noun of feeling, のあまり says what the feeling drove someone to: うれしさのあまり[泣|な]いた (cried out of sheer joy). These are a little written; in conversation, あまりに〜て is the everyday choice. あまりに also goes with すぎる, to stress “far too much”: あまりに[高|たか]すぎる (way too expensive).",
      },
      { type: "heading", text: "あまりに(も): so … that, too …" },
      {
        type: "examples",
        items: [
          {
            jp: "この [問題|もんだい] は {あまりに} [難|むずか]しくて、 [誰|だれ] も [答|こた]えられなかった。",
            en: "This question was so difficult that nobody could answer it.",
            alt: "この [問題|もんだい] は {あまりに} [難|むずか]しくて、 [誰|だれ] も [答|こた]えられません でした。",
          },
          {
            jp: "[値段|ねだん] が {あまりに も} [高|たか]い ので、 [買|か]う の を やめました。",
            en: "It was so expensive that I decided not to buy it.",
            alt: "[値段|ねだん] が {あまりに も} [高|たか]い ので、 [買|か]う の を やめた。",
          },
          {
            jp: "[景色|けしき] が {あまりに} きれい で、 [言葉|ことば] が [出|で]なかった。",
            en: "The view was so beautiful I was lost for words.",
            alt: "[景色|けしき] が {あまりに} きれい で、 [言葉|ことば] が [出|で]ません でした。",
          },
          {
            jp: "[話|はなし] が {あまりに も} [長|なが]くて、 [途中|とちゅう] で [眠|ねむ]く なりました。",
            en: "The talk was so long that I got sleepy halfway through.",
            alt: "[話|はなし] が {あまりに も} [長|なが]くて、 [途中|とちゅう] で [眠|ねむ]く なった。",
          },
          {
            jp: "[昨日|きのう] の [夜|よる] は {あまり} [暑|あつ]くて、 [眠|ねむ]れなかった。",
            en: "Last night was so hot I couldn't sleep.",
            alt: "[昨日|きのう] の [夜|よる] は {あまり} [暑|あつ]くて、 [眠|ねむ]れません でした。",
            note: "Without に, but with an affirmative [暑|あつ]くて: “so hot”, not “not very hot”.",
          },
        ],
      },
      { type: "heading", text: "あまりの…に, …のあまり: out of sheer …" },
      {
        type: "examples",
        items: [
          {
            jp: "{あまり の} [暑|あつ]さ に、 [倒|たお]れる [人|ひと] も いました。",
            en: "The heat was so intense that some people collapsed.",
            alt: "{あまり の} [暑|あつ]さ に、 [倒|たお]れる [人|ひと] も いた。",
          },
          {
            jp: "{あまり の} [痛|いた]さ に、 [大|おお]きな [声|こえ] を [出|だ]して しまった。",
            en: "It hurt so much that I cried out loud.",
            alt: "{あまり の} [痛|いた]さ に、 [大|おお]きな [声|こえ] を [出|だ]して しまいました。",
          },
          {
            jp: "うれしさ の {あまり}、 [泣|な]いて しまいました。",
            en: "I was so happy I burst into tears.",
            alt: "うれしさ の {あまり}、 [泣|な]いて しまった。",
          },
          {
            jp: "[母|はは] は [心配|しんぱい] の {あまり}、 [夜|よる] も [眠|ねむ]れなかった。",
            en: "My mother was so worried she couldn't sleep at night.",
            alt: "[母|はは] は [心配|しんぱい] の {あまり}、 [夜|よる] も [眠|ねむ]れません でした。",
          },
          {
            jp: "[急|いそ]ぐ {あまり}、 [財布|さいふ] を [忘|わす]れて [出|で]かけた。",
            en: "I was in such a rush that I went out without my wallet.",
            alt: "[急|いそ]ぐ {あまり}、 [財布|さいふ] を [忘|わす]れて [出|で]かけました。",
          },
        ],
      },
      { type: "heading", text: "あまりに + すぎる: far too …" },
      {
        type: "examples",
        items: [
          {
            jp: "この ゲーム は {あまりに} [簡単|かんたん]すぎて、 [面白|おもしろ]くない。",
            en: "This game is so easy it isn't fun.",
            alt: "この ゲーム は {あまりに} [簡単|かんたん]すぎて、 [面白|おもしろ]くない です。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "{あまり} [寒|さむ]くない ので、 [外|そと] で [遊|あそ]んだ。", en: "It wasn't very cold, so we played outside." },
        b: { jp: "{あまり} [寒|さむ]い ので、 [家|いえ] に いた。", en: "It was so cold that we stayed in." },
        diff: "Two things change on purpose. With a negative, あまり is “not very”; with an affirmative adjective and ので, it's “so … that”.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Before のあまり, a noun",
        text: "✗ うれしいのあまり ✓ うれしさのあまり. のあまり follows a noun, so an い-adjective turns into one with さ first: うれしさ, [悲|かな]しさ, [寒|さむ]さ.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Nao", jp: "[昨日|きのう] の コンサート、 どう だった？", en: "How was the concert yesterday?" },
          { speaker: "Lee", jp: "{あまりに も} [素晴|すば]らしくて、 [途中|とちゅう] で [泣|な]いちゃった。", en: "It was so wonderful I cried halfway through." },
          { speaker: "Nao", jp: "そんな に？ [私|わたし] も [行|い]けば よかった。", en: "That good? I wish I'd gone too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With あまりの (use [寒|さむ]い): “It was so cold that my hands hurt”: ＿に、[手|て]が[痛|いた]くなった。",
            answers: ["あまり の [寒|さむ]さ"],
            explanation: "あまりの + a noun: [寒|さむ]い becomes [寒|さむ]さ, so あまりの[寒|さむ]さに.",
          },
          {
            prompt: "With のあまり (use [驚|おどろ]き): “He was so surprised he dropped his cup”: [彼|かれ]は＿、カップを[落|お]とした。",
            answers: ["[驚|おどろ]き の あまり"],
            explanation: "A noun of feeling + のあまり: [驚|おどろ]きのあまり (out of sheer surprise).",
          },
          {
            prompt: "With あまりに (use [速|はや]い): “He spoke so fast that I couldn't understand”: [彼|かれ]は＿[話|はな]すので、[分|わ]からなかった。",
            answers: ["あまりに [速|はや]く", "あまりに も [速|はや]く"],
            explanation: "あまりに(も) + the adverb [速|はや]く: あまりに[速|はや]く[話|はな]すので.",
          },
          {
            prompt: "Fix it (“I was so sad I couldn't eat anything”): [悲|かな]しいのあまり、[何|なに]も[食|た]べられなかった。",
            answers: ["[悲|かな]しさ の あまり、 [何|なに] も [食|た]べられなかった。", "あまり の [悲|かな]しさ に、 [何|なに] も [食|た]べられなかった。"],
            explanation: "のあまり follows a noun: [悲|かな]しさのあまり (or あまりの[悲|かな]しさに).",
          },
        ],
      },
    ],
  },
  {
    slug: "dake-de-naku",
    title: "Not only … but also: だけでなく, ばかりでなく and はもちろん",
    mark: "だけでなく",
    summary: "Add a second thing to the first: not only A but B too, and A of course, and B as well.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (dake de naku); Bunpro, “だけでなく”, “だけでなく(て)～も”, “ばかりでなく” and “はもちろん”; JLPT Sensei, “だけでなく”, “ばかりでなく” and “はもちろん”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "Bunpro has だけでなく at N4 and だけでなく〜も at N3; JLPT Sensei lists だけでなく at N3."),
    blocks: [
      {
        type: "idea",
        text: "A + **だけでなく** B も says “not only A, but B too”; **ばかりでなく** says the same in a more written style, and A + **はもちろん** B も says “A goes without saying, and B as well”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + だけでなく", "[英語|えいご] だけ で なく"],
          ["Verb or い-adjective, plain + だけでなく", "[安|やす]い だけ で なく"],
          ["な-adjective + な + だけでなく", "[便利|べんり] な だけ で なく"],
          ["Noun + ばかりでなく (written)", "[体|からだ] ばかり で なく"],
          ["Noun + はもちろん", "[週末|しゅうまつ] は もちろん"],
        ],
      },
      {
        type: "text",
        text: "The second half usually has も (B too). In conversation, だけでなく becomes だけじゃなくて. では can sit inside it too: だけではなく, ばかりではなく. ばかりでなく means the same, and sounds written: reports, news, speeches.",
      },
      {
        type: "text",
        text: "はもちろん treats A as the obvious case (of course), so the news is B: [週末|しゅうまつ]はもちろん、[平日|へいじつ]も[混|こ]んでいる (it's busy on weekdays too, never mind weekends). A more formal cousin is は[言|い]うまでもなく (it goes without saying).",
      },
      { type: "heading", text: "だけでなく: not only … but also" },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん は [英語|えいご] {だけ で なく}、 [中国語|ちゅうごくご] も [話|はな]せます。",
            en: "Tanaka-san speaks not only English but Chinese too.",
            alt: "[田中|たなか]-さん は [英語|えいご] {だけ じゃ なくて}、 [中国語|ちゅうごくご] も [話|はな]せる よ。",
          },
          {
            jp: "この [店|みせ] は [安|やす]い {だけ で なく}、 [味|あじ] も いい。",
            en: "This place isn't just cheap: the food's good too.",
            alt: "この [店|みせ] は [安|やす]い {だけ で なく}、 [味|あじ] も いい です。",
          },
          {
            jp: "[雨|あめ] {だけ で なく}、 [風|かぜ] も [強|つよ]く なって きました。",
            en: "It's not just the rain: the wind's picked up too.",
            alt: "[雨|あめ] {だけ じゃ なくて}、 [風|かぜ] も [強|つよ]く なって きた。",
          },
          {
            jp: "[彼|かれ] は [勉強|べんきょう] {だけ じゃ なくて}、 スポーツ も [得意|とくい] だ よ。",
            en: "He's not only good at studying: he's good at sport too.",
            alt: "[彼|かれ] は [勉強|べんきょう] {だけ じゃ なくて}、 スポーツ も [得意|とくい] です よ。",
          },
          {
            jp: "[子供|こども] {だけ で なく}、 [大人|おとな] も [楽|たの]しめる [映画|えいが] です。",
            en: "It's a film for adults to enjoy, not just children.",
            alt: "[子供|こども] {だけ じゃ なくて}、 [大人|おとな] も [楽|たの]しめる [映画|えいが] だ よ。",
          },
        ],
      },
      { type: "heading", text: "ばかりでなく: not only (written)" },
      {
        type: "examples",
        items: [
          {
            jp: "この [町|まち] は [旅行|りょこう] で [来|く]る [人|ひと] {ばかり で なく}、 [住|す]む [人|ひと] に も [人気|にんき] が あります。",
            en: "This town is popular not only with people visiting on holiday but also with the people who live there.",
          },
          {
            jp: "[彼女|かのじょ] は [歌|うた] が [上手|じょうず] な {ばかり で なく}、 [曲|きょく] も [作|つく]れる。",
            en: "She isn't only a good singer: she can write songs too.",
            alt: "[彼女|かのじょ] は [歌|うた] が [上手|じょうず] な {ばかり で なく}、 [曲|きょく] も [作|つく]れます。",
          },
          {
            jp: "[運動|うんどう] は [体|からだ] {ばかり で なく}、 [心|こころ] に も いい そう です。",
            en: "Apparently exercise is good not only for the body but for the mind as well.",
            alt: "[運動|うんどう] は [体|からだ] {ばかり で なく}、 [心|こころ] に も いい そう だ。",
          },
          {
            jp: "[台風|たいふう] で、 [電車|でんしゃ] {ばかり で なく} [飛行機|ひこうき] も [止|と]まった。",
            en: "Because of the typhoon, not only the trains but the planes stopped too.",
            alt: "[台風|たいふう] で、 [電車|でんしゃ] {ばかり で なく} [飛行機|ひこうき] も [止|と]まりました。",
          },
        ],
      },
      { type: "heading", text: "はもちろん: A goes without saying, and B too" },
      {
        type: "examples",
        items: [
          {
            jp: "この [店|みせ] は [週末|しゅうまつ] {は もちろん}、 [平日|へいじつ] も [混|こ]んで います。",
            en: "This place is busy on weekdays too, never mind at weekends.",
            alt: "この [店|みせ] は [週末|しゅうまつ] {は もちろん}、 [平日|へいじつ] も [混|こ]んで いる。",
          },
          {
            jp: "[漢字|かんじ] {は もちろん}、 ひらがな も まだ [難|むずか]しい です。",
            en: "Kanji goes without saying: even hiragana is still hard for me.",
            alt: "[漢字|かんじ] {は もちろん}、 ひらがな も まだ [難|むずか]しい。",
          },
          {
            jp: "[兄|あに] は [料理|りょうり] {は もちろん}、 [掃除|そうじ] も [得意|とくい] です。",
            en: "My brother's good at cleaning too, and cooking, of course.",
            alt: "[兄|あに] は [料理|りょうり] {は もちろん}、 [掃除|そうじ] も [得意|とくい] だ。",
          },
          {
            jp: "[試験|しけん] の [日|ひ] は、 [鉛筆|えんぴつ] {は もちろん}、 [消|け]しゴム も [忘|わす]れないで ください。",
            en: "On the day of the exam, bring a pencil, obviously, and don't forget an eraser either.",
            alt: "[試験|しけん] の [日|ひ] は、 [鉛筆|えんぴつ] {は もちろん}、 [消|け]しゴム も [忘|わす]れないで ね。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [公園|こうえん] は [春|はる] {だけ で なく}、 [秋|あき] も きれい です。", en: "This park is lovely not only in spring but in autumn too." },
        b: { jp: "この [公園|こうえん] は [春|はる] {は もちろん}、 [秋|あき] も きれい です。", en: "This park is lovely in autumn too, never mind in spring." },
        diff: "だけでなく simply adds autumn to spring. はもちろん takes spring as the obvious case (everyone knows it's lovely then), so the news is autumn.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "はもちろん, with は",
        text: "✗ [週末|しゅうまつ]をもちろん ✓ [週末|しゅうまつ]はもちろん. The obvious case is the topic, so it takes は.",
      },
      {
        type: "callout",
        kind: "tip",
        text: "A な-adjective keeps な before だけ: [便利|べんり]なだけでなく、[安|やす]い (not only convenient but cheap).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Interviewer", jp: "[日本|にほん] の どこ が [好|す]き です か？", en: "What do you like about Japan?" },
          { speaker: "Sara", jp: "[食|た]べ[物|もの] {は もちろん}、 [町|まち] が きれい な ところ も [好|す]き です。", en: "The food, of course, and I also love how clean the towns are." },
          { speaker: "Interviewer", jp: "[日本語|にほんご] は どう です か？", en: "How's your Japanese?" },
          { speaker: "Sara", jp: "[話|はな]す こと {だけ で なく}、 [読|よ]む こと に も [慣|な]れて きました。", en: "I'm getting used to reading, not just speaking." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With だけでなく (polite): “This hotel has not only a pool but a gym too”: このホテルには、プール＿ジムもあります。",
            answers: ["だけ で なく", "だけ で なくて", "だけ じゃ なくて", "だけ じゃ なく", "だけ で は なく", "だけ で は なくて"],
            explanation: "A + だけでなく, B + も: プールだけでなく、ジムもあります.",
          },
          {
            prompt: "Casual, with だけじゃなくて (use [有名|ゆうめい]): “That shop isn't just famous: it's cheap too”: あの[店|みせ]は＿、[値段|ねだん]も[安|やす]いよ。",
            answers: ["[有名|ゆうめい] な だけ じゃ なくて", "[有名|ゆうめい] な だけ じゃ なく", "[有名|ゆうめい] な だけ で なく", "[有名|ゆうめい] な だけ で なくて", "[有名|ゆうめい] な だけ で は なく", "[有名|ゆうめい] な だけ で は なくて"],
            explanation: "A な-adjective keeps な before だけ: [有名|ゆうめい]なだけじゃなくて.",
          },
          {
            prompt: "With はもちろん: “This seaside town has lots of visitors in winter too, never mind in summer”: この[町|まち]は[夏|なつ]＿、[冬|ふゆ]も[旅行|りょこう]で[来|く]る[人|ひと]が[多|おお]い。",
            answers: ["は もちろん"],
            explanation: "The obvious case + はもちろん: [夏|なつ]はもちろん, and the news is winter.",
          },
          {
            prompt: "Written, with ばかりでなく: “Not only the students but the teachers were surprised too”: [学生|がくせい]＿、[先生|せんせい]も[驚|おどろ]いた。",
            answers: ["ばかり で なく", "ばかり で なくて", "ばかり で は なく"],
            explanation: "ばかりでなく is the written だけでなく: [学生|がくせい]ばかりでなく、[先生|せんせい]も.",
          },
        ],
      },
    ],
  },
  {
    slug: "bakari",
    title: "Nothing but: ばかり and てばかりいる",
    mark: "ばかり",
    summary: "Complain that it's always the same thing: nothing but rain, does nothing but sleep.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (bakari); Bunpro, “ばかり”; JLPT Sensei, “てばかりいる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **ばかり** says it's nothing but that, too much of one thing; Verb て form + **ばかりいる** says someone does nothing but that.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + ばかり (instead of が or を)", "[雨|あめ] ばかり"],
          ["Noun + ばかり + verb", "[甘|あま]い もの ばかり [食|た]べる"],
          ["Verb て form + ばかりいる", "[寝|ね]て ばかり いる"],
        ],
      },
      {
        type: "text",
        text: "ばかり is written in kana. It usually complains: there's too much of one thing, and not enough of anything else. だけ says “only” without that feeling. が and を drop before ばかり; other particles stay in front of it.",
      },
      {
        type: "text",
        text: "In speech it often becomes ばっかり. Don't mix it up with two other ばかり. After a た form it means “only just” (たばかり): [食|た]べたばかり. After a plain verb of change, ばかりだ means “keeps getting worse”. Here, after a noun or a て form, it's “nothing but”.",
      },
      { type: "link", href: "/learn/n4-plans/ta-bakari", label: "Only just: たばかり", text: "After a た form." },
      { type: "link", href: "/learn/n3-time/ippou-da", label: "Worse and worse: ばかりだ", text: "After a verb of change." },
      { type: "heading", text: "Noun + ばかり: nothing but" },
      {
        type: "examples",
        items: [
          {
            jp: "うち の [子供|こども] は [甘|あま]い もの {ばかり} [食|た]べて います。",
            en: "My kid eats nothing but sweet things.",
            alt: "うち の [子供|こども] は [甘|あま]い もの {ばかり} [食|た]べて いる。",
          },
          {
            jp: "この クラス は [男|おとこ]の[子|こ] {ばかり} だ。",
            en: "This class is all boys.",
            alt: "この クラス は [男|おとこ]の[子|こ] {ばかり} です。",
          },
          {
            jp: "[最近|さいきん]、 [雨|あめ] {ばかり} です ね。",
            en: "It's been nothing but rain lately, hasn't it?",
            alt: "[最近|さいきん]、 [雨|あめ] {ばかり} だ ね。",
          },
          {
            jp: "[彼|かれ] は いつも [文句|もんく] {ばかり} [言|い]って いる。",
            en: "All he ever does is complain.",
            alt: "[彼|かれ] は いつも [文句|もんく] {ばかり} [言|い]って います。",
          },
        ],
      },
      { type: "heading", text: "てばかりいる: does nothing but" },
      {
        type: "examples",
        items: [
          {
            jp: "[弟|おとうと] は [毎日|まいにち] ゲーム を して {ばかり} いる。",
            en: "My little brother does nothing but play games every day.",
            alt: "[弟|おとうと] は [毎日|まいにち] ゲーム を して {ばかり} います。",
          },
          {
            jp: "[寝|ね]て {ばかり} いないで、 [少|すこ]し は [手伝|てつだ]って よ。",
            en: "Stop lying around and help out a bit.",
            alt: "[寝|ね]て {ばかり} いないで、 [少|すこ]し は [手伝|てつだ]って ください。",
          },
          {
            jp: "[休|やす]み の [日|ひ] は [食|た]べて {ばかり} いました。",
            en: "On my days off, I did nothing but eat.",
            alt: "[休|やす]み の [日|ひ] は [食|た]べて {ばかり} いた。",
          },
          {
            jp: "[彼女|かのじょ] は [昨日|きのう] から [泣|な]いて {ばかり} いる。",
            en: "She's done nothing but cry since yesterday.",
            alt: "[彼女|かのじょ] は [昨日|きのう] から [泣|な]いて {ばかり} います。",
          },
          {
            jp: "[遊|あそ]んで {ばかり} いる と、 [試験|しけん] に [落|お]ちます よ。",
            en: "If you do nothing but play, you'll fail your exams.",
            alt: "[遊|あそ]んで {ばかり} いる と、 [試験|しけん] に [落|お]ちる よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[今|いま]、 [食|た]べた {ばかり} です。", en: "I've only just eaten." },
        b: { jp: "[最近|さいきん]、 [食|た]べて {ばかり} います。", en: "Lately I do nothing but eat." },
        diff: "The form before ばかり decides: after a た form it's “only just” (たばかり); after a て form, with いる, it's “nothing but”. The time words differ to fit.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ばかりいる needs the て form",
        text: "✗ [寝|ね]るばかりいる ✓ [寝|ね]てばかりいる. ばかり sits between the て form and いる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mother", jp: "[健太|けんた]、 また スマホ を [見|み]て {ばかり} いる ね。", en: "Kenta, you're glued to your phone again." },
          { speaker: "Kenta", jp: "[宿題|しゅくだい] は もう [終|お]わった よ。", en: "I've already finished my homework." },
          { speaker: "Mother", jp: "でも、 [目|め] に よくない から、 [外|そと] で [遊|あそ]びなさい。", en: "But it's bad for your eyes, so go and play outside." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with ばかり: “This week it's been nothing but meetings”: [今週|こんしゅう]は[会議|かいぎ]＿だ。",
            answers: ["ばかり", "ばっかり"],
            explanation: "Noun + ばかり: nothing but meetings.",
          },
          {
            prompt: "Polite, with てばかりいる (use [笑|わら]う): “The baby does nothing but laugh”: [赤|あか]ちゃんは＿。",
            answers: ["[笑|わら]って ばかり います", "[笑|わら]って ばっかり います"],
            explanation: "The て form + ばかりいる: [笑|わら]ってばかりいます.",
          },
          {
            prompt: "Casual, with てばかりいる (use [働|はたら]く): “My father does nothing but work”: [父|ちち]は＿。",
            answers: ["[働|はたら]いて ばかり いる", "[働|はたら]いて ばっかり いる"],
            explanation: "[働|はたら]く → [働|はたら]いて, then ばかりいる.",
          },
          {
            prompt: "Fix it (“Don't just watch TV all the time”): テレビを[見|み]るばかりいないで。",
            answers: ["テレビ を [見|み]て ばかり いないで。", "テレビ ばかり [見|み]て いないで。"],
            explanation: "ばかりいる follows the て form: [見|み]てばかりいないで. テレビばかり[見|み]ていないで says it too.",
          },
        ],
      },
    ],
  },
  {
    slug: "nanka-nante",
    title: "Things like, the likes of: なんか and なんて",
    mark: "なんか・なんて",
    summary: "The casual など: suggest loosely, play yourself down, wave something away, or say you can hardly believe it.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (nado, nante); Bunpro, “なんか・なんて”; JLPT Sensei, “なんか / なんて / など”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "After a noun, **なんか** and **なんて** are casual など: they offer something loosely (“… or something”), play yourself down, or wave a thing away; after a clause, **なんて** says you can hardly believe it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Use", "Example"],
        rows: [
          ["Noun + なんか: … or something", "お[茶|ちゃ] なんか どう"],
          ["[私|わたし] + なんか: modest", "[私|わたし] なんか"],
          ["Noun + なんか · なんて: dismissive", "[勉強|べんきょう] なんて"],
          ["Plain form + なんて: can't believe", "[彼|かれ] が [辞|や]める なんて"],
        ],
      },
      {
        type: "text",
        text: "など gives examples in a neutral way; なんか and なんて are how people say it in conversation. They take the place of が and を; other particles stay in front (テレビになんか). Said of yourself, they're modest ([私|わたし]なんか、まだまだです). Said of someone else's things or people, they belittle, so take care.",
      },
      {
        type: "text",
        text: "After a whole clause, なんて reacts to it: surprise, disbelief, or disapproval, often followed by [信|しん]じられない, びっくりした or ひどい. なんて belongs to conversation, though the sentence can still end politely.",
      },
      { type: "link", href: "/learn/particles/to-ya", label: "And, things like: と and や", text: "や…など: the neutral list." },
      { type: "heading", text: "Noun + なんか, なんて" },
      {
        type: "examples",
        items: [
          {
            jp: "[飲|の]み[物|もの] は、 お[茶|ちゃ] {なんか} どう？",
            en: "How about something to drink, like some tea?",
            alt: "[飲|の]み[物|もの] は、 お[茶|ちゃ] {なんか} どう です か？",
          },
          {
            jp: "[私|わたし] {なんか}、 まだ まだ です。",
            en: "Someone like me? I've still got a long way to go.",
            alt: "[私|わたし] {なんか}、 まだ まだ だ よ。",
          },
          {
            jp: "[勉強|べんきょう] {なんて}、 [嫌|きら]い だ。",
            en: "Studying? I hate it.",
          },
          {
            jp: "[彼|かれ] の [言|い]う こと {なんか}、 [信|しん]じない ほう が いい よ。",
            en: "You'd better not believe anything he says.",
            alt: "[彼|かれ] の [言|い]う こと {なんか}、 [信|しん]じない ほう が いい です よ。",
          },
          {
            jp: "[忙|いそが]しくて、 テレビ {なんか} [見|み]る [時間|じかん] が ない。",
            en: "I'm so busy I've no time for things like TV.",
            alt: "[忙|いそが]しくて、 テレビ {なんか} [見|み]る [時間|じかん] が ありません。",
          },
        ],
      },
      { type: "heading", text: "Clause + なんて: I can't believe …" },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん が [会社|かいしゃ] を [辞|や]める {なんて}、 [信|しん]じられない。",
            en: "Tanaka-san quitting the company? I can't believe it.",
            alt: "[田中|たなか]-さん が [会社|かいしゃ] を [辞|や]める {なんて}、 [信|しん]じられません。",
          },
          {
            jp: "[一人|ひとり] で [山|やま] に [登|のぼ]った {なんて}、 すごい ね。",
            en: "You climbed the mountain on your own? That's amazing.",
            alt: "[一人|ひとり] で [山|やま] に [登|のぼ]った {なんて}、 すごい です ね。",
          },
          {
            jp: "こんな ところ で [会|あ]う {なんて}、 [思|おも]わなかった。",
            en: "Fancy meeting you here! I never expected that.",
            alt: "こんな ところ で [会|あ]う {なんて}、 [思|おも]いません でした。",
          },
          {
            jp: "[約束|やくそく] を [忘|わす]れる {なんて}、 ひどい よ。",
            en: "Forgetting our plans? That's awful of you.",
            alt: "[約束|やくそく] を [忘|わす]れる {なんて}、 ひどい です よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[暑|あつ]くて、 [料理|りょうり] {など} したくない。", en: "It's so hot I don't feel like doing things like cooking." },
        b: { jp: "[暑|あつ]くて、 [料理|りょうり] {なんか} したくない。", en: "It's so hot I don't feel like doing things like cooking." },
        diff: "The same meaning: など is neutral and good in writing; なんか is how you'd say it in conversation.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Careful with other people",
        text: "✗ [先生|せんせい]なんかに[聞|き]いてみます (sounds as if the teacher is no one special) ✓ [先生|せんせい]に[聞|き]いてみます. なんか about yourself is modest; about someone else, or their things, it belittles them.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aki", jp: "[聞|き]いた？ [佐藤|さとう]-さん、 [来月|らいげつ] [結婚|けっこん] する ん だって。", en: "Have you heard? Sato-san's getting married next month." },
          { speaker: "Ben", jp: "え、 [佐藤|さとう]-さん が [結婚|けっこん] する {なんて}！ [全然|ぜんぜん] [知|し]らなかった。", en: "What, Sato-san's getting married? I had no idea!" },
          { speaker: "Aki", jp: "[私|わたし] {なんか}、 まだ [彼氏|かれし] も いない のに。", en: "And here's me without even a boyfriend." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with なんて (use [負|ま]ける): “I can't believe our team lost!”: うちのチームが＿、[信|しん]じられない！",
            answers: ["[負|ま]ける なんて", "[負|ま]けた なんて"],
            explanation: "A clause + なんて reacts to it: [負|ま]けるなんて、[信|しん]じられない.",
          },
          {
            prompt: "Modest, with なんか (polite): “Oh, my cooking's nothing special”: [私|わたし]の[料理|りょうり]＿、[大|たい]したことないです。",
            answers: ["なんか", "なんて"],
            explanation: "About your own things, なんか (or なんて) is modest.",
          },
          {
            prompt: "Casual, with なんか, suggesting: “How about something like a scarf as a present?”: プレゼントは、マフラー＿どう？",
            answers: ["なんか"],
            explanation: "Noun + なんか offers it loosely: マフラーなんかどう？",
          },
          {
            prompt: "Casual, dismissive, with なんて: “Tests? Who cares!”: テスト＿、どうでもいい。",
            answers: ["なんて", "なんか"],
            explanation: "Noun + なんて (or なんか) waves it away: テストなんて、どうでもいい.",
          },
        ],
      },
    ],
  },
  {
    slug: "shika-nai",
    title: "No choice but to: しかない",
    mark: "しかない",
    summary: "Say there's only one thing left to do.",
    source: "Bunpro, “しかない”; JLPT Sensei, “しかない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Plain non-past verb + **しかない** says there's nothing for it but to do that: it's the only way left.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain non-past + しかない", "[待|ま]つ しか ない"],
          ["Polite: しかありません", "[待|ま]つ しか ありません"],
          ["Compare: Noun + しか + negative (only)", "[少|すこ]し しか ない"],
        ],
      },
      {
        type: "text",
        text: "You know しか with a negative after a noun: [少|すこ]ししかない (there's only a little). After a plain non-past verb, it's the same idea applied to choices: of everything you could do, there's only this. Polite speech says しかありません. やるしかない (there's nothing for it but to do it) is a common way to make up your mind.",
      },
      { type: "link", href: "/learn/n5-essentials/dake-shika", label: "Only: だけ and しか", text: "しか + negative after a noun." },
      {
        type: "examples",
        items: [
          {
            jp: "もう [電車|でんしゃ] が ない から、 タクシー で [帰|かえ]る {しか ない}。",
            en: "There are no more trains, so there's nothing for it but to take a taxi home.",
            alt: "もう [電車|でんしゃ] が ない から、 タクシー で [帰|かえ]る {しか ありません}。",
          },
          {
            jp: "[誰|だれ] も [手伝|てつだ]って くれない なら、 [一人|ひとり] で やる {しか ない}。",
            en: "If nobody will help, I'll just have to do it on my own.",
            alt: "[誰|だれ] も [手伝|てつだ]って くれない なら、 [一人|ひとり] で やる {しか ありません}。",
          },
          {
            jp: "[壊|こわ]れて しまった から、 [新|あたら]しい の を [買|か]う {しか ありません}。",
            en: "It's broken, so the only thing to do is buy a new one.",
            alt: "[壊|こわ]れて しまった から、 [新|あたら]しい の を [買|か]う {しか ない}。",
          },
          {
            jp: "もう [決|き]まった こと だ から、 やる {しか ない} よ。",
            en: "It's been decided, so we've just got to do it.",
            alt: "もう [決|き]まった こと です から、 やる {しか ありません} よ。",
          },
          {
            jp: "[道|みち] が [分|わ]からない から、 [誰|だれ]か に [聞|き]く {しか ない} ね。",
            en: "We don't know the way, so we'll just have to ask someone.",
            alt: "[道|みち] が [分|わ]からない ので、 [誰|だれ]か に [聞|き]く {しか ありません} ね。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[歩|ある]いて [行|い]く {しか ない}。", en: "There's no choice but to walk." },
        b: { jp: "[歩|ある]いて {しか [行|い]けない}。", en: "You can only get there on foot." },
        diff: "Both end up walking. After a plain verb, しかない says it's the only thing left to do; しか inside the sentence, with a negative verb, says “only” about the way you can go.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The plain non-past before しかない",
        text: "✗ [待|ま]ってしかない ✓ [待|ま]つしかない. しかない follows the plain non-past form of the verb.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Emi", jp: "[雨|あめ]、 やまない ね。 [傘|かさ] [持|も]って きた？", en: "The rain isn't stopping. Did you bring an umbrella?" },
          { speaker: "Joe", jp: "ううん。 やむ まで [待|ま]つ {しか ない} ね。", en: "No. We'll just have to wait till it stops." },
          { speaker: "Emi", jp: "じゃあ、 あそこ の カフェ で お[茶|ちゃ] でも [飲|の]もう。", en: "Then let's have a cup of tea in that café over there." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with しかない (use [謝|あやま]る): “I've upset her, so all I can do is apologise”: [彼女|かのじょ]を[怒|おこ]らせてしまったから、＿。",
            answers: ["[謝|あやま]る しか ない", "[謝|あやま]る しか ない よ", "[謝|あやま]る しか ない ね"],
            explanation: "Plain non-past + しかない: [謝|あやま]るしかない.",
          },
          {
            prompt: "Polite, with しかない (use [諦|あきら]める): “There are no tickets left, so we'll have to give up”: チケットがもうないので、＿。",
            answers: ["[諦|あきら]める しか ありません", "[諦|あきら]める しか ない です"],
            explanation: "Polite: [諦|あきら]めるしかありません.",
          },
          {
            prompt: "With しか, only (casual, end with ない): “There's only one bus an hour”: バスは[一時間|いちじかん]に[一本|いっぽん]＿。",
            answers: ["しか ない"],
            explanation: "After a number, しか + negative means “only”: [一本|いっぽん]しかない.",
          },
          {
            prompt: "Fix it (“There's no bus, so we'll have to walk”): バスがないから、[歩|ある]きしかない。",
            answers: ["バス が ない から、 [歩|ある]く しか ない。"],
            explanation: "しかない follows the plain non-past: [歩|ある]くしかない.",
          },
        ],
      },
    ],
  },
  {
    slug: "negative-adverbs",
    title: "Never, rarely, not really: adverbs that need a negative",
    mark: "けっして",
    summary: "けっして, まったく, なかなか, めったに, べつに and とても: adverbs that set up a negative ending.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (nakanaka, totemo); Bunpro, “決して〜ない”, “全く～ない”, “なかなか～ない”, “めったに〜ない”, “別に〜ない” and “とても～ない”; JLPT Sensei, “決して～ない”, “なかなか”, “めったに～ない”, “別に～ない” and “とても～ない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Some adverbs announce a negative ending and say what kind of “not” it is: **けっして** (never), **まったく** (not at all), **なかなか** (not easily), **めったに** (hardly ever), **[別|べつ]に** (not particularly), **とても** (can't possibly).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Adverb … negative", "Meaning", "Example"],
        rows: [
          ["けっして … ない", "never, by no means (strong)", "けっして [忘|わす]れない"],
          ["まったく … ない", "not at all", "まったく [分|わ]からない"],
          ["なかなか … ない", "not easily, just won't", "なかなか [来|こ]ない"],
          ["めったに … ない", "hardly ever, rarely", "めったに [怒|おこ]らない"],
          ["[別|べつ]に … ない", "not particularly", "[別|べつ]に [好|す]き じゃ ない"],
          ["とても … ない (potential)", "can't possibly", "とても [食|た]べられない"],
        ],
      },
      {
        type: "text",
        text: "けっして, まったく, なかなか and めったに are written in kana. けっして is strong and a little formal: promises, warnings, firm denials. まったく is “not at all”; [全然|ぜんぜん] says the same in everyday speech.",
      },
      {
        type: "text",
        text: "なかなか〜ない is “not easily”: you wait or try, and it doesn't happen. With a positive, なかなか means “quite, pretty” (なかなかおいしい), so the ending decides. めったに〜ない is “hardly ever”, rarer than あまり〜ない. [別|べつ]に〜ない shrugs: not especially, no particular reason; [別|べつ]に alone is a curt “not really”. とても with a negative, usually a potential (can …), means “there's no way”; with a positive, it's “very”.",
      },
      { type: "heading", text: "けっして, まったく: never, not at all" },
      {
        type: "examples",
        items: [
          {
            jp: "[今日|きょう] の こと は {けっして} [忘|わす]れません。",
            en: "I'll never forget today.",
            alt: "[今日|きょう] の こと は {けっして} [忘|わす]れない よ。",
          },
          {
            jp: "[危|あぶ]ない から、 {けっして} [一人|ひとり] で [海|うみ] に [入|はい]らないで ください。",
            en: "It's dangerous, so never go into the sea on your own.",
            alt: "[危|あぶ]ない から、 {けっして} [一人|ひとり] で [海|うみ] に [入|はい]らないで ね。",
          },
          {
            jp: "[彼|かれ] は {けっして} [悪|わる]い [人|ひと] じゃ ない。",
            en: "He's by no means a bad person.",
            alt: "[彼|かれ] は {けっして} [悪|わる]い [人|ひと] じゃ ありません。",
          },
          {
            jp: "[昨日|きのう] の [試験|しけん] は {まったく} [分|わ]からなかった。",
            en: "I didn't understand a thing in yesterday's exam.",
            alt: "[昨日|きのう] の [試験|しけん] は {まったく} [分|わ]かりません でした。",
          },
          {
            jp: "この [町|まち] は [昔|むかし] と {まったく} [変|か]わって いません。",
            en: "This town hasn't changed at all since the old days.",
            alt: "この [町|まち] は [昔|むかし] と {まったく} [変|か]わって いない。",
          },
        ],
      },
      { type: "heading", text: "なかなか, めったに: not easily, hardly ever" },
      {
        type: "examples",
        items: [
          {
            jp: "バス が {なかなか} [来|こ]ない。",
            en: "The bus just won't come.",
            alt: "バス が {なかなか} [来|き]ません。",
          },
          {
            jp: "[新|あたら]しい [言葉|ことば] が {なかなか} [覚|おぼ]えられません。",
            en: "New words just won't stick, however hard I try.",
            alt: "[新|あたら]しい [言葉|ことば] が {なかなか} [覚|おぼ]えられない。",
          },
          {
            jp: "[父|ちち] は [忙|いそが]しくて、 [家|いえ] に {めったに} いません。",
            en: "My father's so busy he's hardly ever at home.",
            alt: "[父|ちち] は [忙|いそが]しくて、 [家|いえ] に {めったに} いない。",
          },
          {
            jp: "この [辺|へん] で は、 [雪|ゆき] は {めったに} [降|ふ]らない。",
            en: "It hardly ever snows around here.",
            alt: "この [辺|へん] で は、 [雪|ゆき] は {めったに} [降|ふ]りません。",
          },
          {
            jp: "[兄|あに] は {めったに} [怒|おこ]らない けど、 [怒|おこ]る と [怖|こわ]い。",
            en: "My brother hardly ever gets angry, but when he does, he's scary.",
            alt: "[兄|あに] は {めったに} [怒|おこ]らない けど、 [怒|おこ]る と [怖|こわ]い です。",
          },
        ],
      },
      { type: "heading", text: "[別|べつ]に, とても: not particularly, can't possibly" },
      {
        type: "examples",
        items: [
          {
            jp: "{[別|べつ]に} [怒|おこ]って ない よ。",
            en: "I'm not particularly angry.",
            alt: "{[別|べつ]に} [怒|おこ]って いません よ。",
          },
          {
            jp: "この [映画|えいが] は {[別|べつ]に} [面白|おもしろ]くなかった。",
            en: "This film wasn't anything special.",
            alt: "この [映画|えいが] は {[別|べつ]に} [面白|おもしろ]くなかった です。",
          },
          {
            jp: "{[別|べつ]に} [行|い]きたくない けど、 [誘|さそ]われた から [行|い]く。",
            en: "I don't especially want to go, but I was invited, so I'm going.",
            alt: "{[別|べつ]に} [行|い]きたくない けど、 [誘|さそ]われた から [行|い]きます。",
          },
          {
            jp: "こんな に たくさん、 [一日|いちにち] で は {とても} [終|お]わらない。",
            en: "There's so much of it: there's no way I'll finish in a day.",
            alt: "こんな に たくさん、 [一日|いちにち] で は {とても} [終|お]わりません。",
          },
          {
            jp: "あんな [難|むずか]しい [曲|きょく]、 [私|わたし] に は {とても} [弾|ひ]けない よ。",
            en: "A piece that hard? There's no way I could play it.",
            alt: "あんな [難|むずか]しい [曲|きょく]、 [私|わたし] に は {とても} [弾|ひ]けません よ。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [料理|りょうり] は {とても} おいしい。", en: "This dish is very good." },
        b: { jp: "この [料理|りょうり] は {とても} [食|た]べられない。", en: "There's no way I can eat this dish." },
        diff: "The same とても; only the ending changes it. With a positive, it's “very”; with a negative, usually a potential, it's “can't possibly”.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "They need the negative",
        text: "✗ [彼|かれ]はけっして[遅|おく]れます ✓ [彼|かれ]はけっして[遅|おく]れません. けっして, まったく, めったに and [別|べつ]に set up a negative ending; without it the sentence doesn't hold together. (なかなか and とても do take positives, but then they mean “quite” and “very”.)",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mai", jp: "[最近|さいきん]、 [山田|やまだ]-さん に [会|あ]った？", en: "Have you seen Yamada-san lately?" },
          { speaker: "Ken", jp: "ううん。 [仕事|しごと] が [忙|いそが]しい みたい で、 {めったに} [会|あ]わない ん だ。", en: "No. He seems really busy with work, so I hardly ever see him." },
          { speaker: "Mai", jp: "そう なん だ。 [連絡|れんらく] して も {なかなか} [返事|へんじ] が [来|こ]ない し ね。", en: "I see. And even when you message him, it takes ages to get a reply." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with けっして (use [言|い]う): “I'll never tell anyone”: [誰|だれ]にも＿。",
            answers: ["けっして [言|い]いません", "けっして [言|い]わない です"],
            explanation: "けっして + a negative: けっして[言|い]いません.",
          },
          {
            prompt: "Casual, with なかなか (use [眠|ねむ]る): “I just can't get to sleep”: ＿。",
            answers: ["なかなか [眠|ねむ]れない", "なかなか [眠|ねむ]れない よ", "なかなか [眠|ねむ]れない ん だ"],
            explanation: "なかなか + a negative: you try, and it won't happen. [眠|ねむ]れない is the potential's negative.",
          },
          {
            prompt: "Polite, with めったに (use [飲|の]む): “I hardly ever drink coffee”: コーヒーは＿。",
            answers: ["めったに [飲|の]みません", "めったに [飲|の]まない です"],
            explanation: "めったに + a negative: hardly ever.",
          },
          {
            prompt: "Casual, with [別|べつ]に (use [好|す]き): “I don't especially like sweet things”: [甘|あま]いものは＿。",
            answers: ["[別|べつ]に [好|す]き じゃ ない", "[別|べつ]に [好|す]き で は ない"],
            explanation: "[別|べつ]に + a negative shrugs: not especially.",
          },
          {
            prompt: "Fix it (“There's no way I can eat all this”): こんなにたくさん、とても[食|た]べられる。",
            answers: ["こんな に たくさん、 とても [食|た]べられない。"],
            explanation: "For “can't possibly”, とても needs a negative: とても[食|た]べられない.",
          },
        ],
      },
    ],
  },
  {
    slug: "tatoe-temo",
    title: "Even if, and no matter how: たとえ, どんなに and いくら with ても",
    mark: "たとえ",
    summary: "Make ても stronger: even supposing, and however much.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (tatoe … temo); Bunpro, “たとえ〜ても”, “どんなに〜ても” and “いくら〜でも”; JLPT Sensei, “たとえ～ても”, “どんなに～ても” and “いくら～ても”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**たとえ** before a ても clause makes “even if” stronger (“even supposing”); **どんなに** or **いくら** before it means “no matter how (much)”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["たとえ + Verb て form + も", "たとえ [雨|あめ] が [降|ふ]って も"],
          ["たとえ + Noun or な-adjective + でも", "たとえ [冗談|じょうだん] で も"],
          ["どんなに + い-adjective くても", "どんなに [忙|いそが]しくて も"],
          ["いくら + Verb て form + も", "いくら [食|た]べて も"],
        ],
      },
      {
        type: "text",
        text: "ても already means “even if”; the words before it only add weight, and the ても can't be left out. たとえ (written in kana) says “even supposing”: even in that case, my answer stands. どんなに and いくら work like the question words in [何度|なんど][聞|き]いても: “however much”, “however hard”. いくら is the same word that asks a price; with ても it means “no matter how much”.",
      },
      { type: "link", href: "/learn/n4-conditions/temo", label: "Even if: ても", text: "And question word + ても: no matter who, what." },
      { type: "heading", text: "たとえ〜ても: even if" },
      {
        type: "examples",
        items: [
          {
            jp: "{たとえ} [雨|あめ] が [降|ふ]って も、 [試合|しあい] は [行|おこな]われます。",
            en: "Even if it rains, the match will go ahead.",
            alt: "{たとえ} [雨|あめ] が [降|ふ]って も、 [試合|しあい] は [行|おこな]われる よ。",
          },
          {
            jp: "{たとえ} [親|おや] に [反対|はんたい] されて も、 [彼|かれ] と [結婚|けっこん] する。",
            en: "Even if my parents are against it, I'm marrying him.",
            alt: "{たとえ} [親|おや] に [反対|はんたい] されて も、 [彼|かれ] と [結婚|けっこん] します。",
          },
          {
            jp: "{たとえ} [冗談|じょうだん] で も、 そんな こと を [言|い]って は いけない よ。",
            en: "Even as a joke, you mustn't say things like that.",
            alt: "{たとえ} [冗談|じょうだん] で も、 そんな こと を [言|い]って は いけません よ。",
          },
          {
            jp: "{たとえ} [小|ちい]さな ミス で も、 [報告|ほうこく] して ください。",
            en: "Please report any mistake, however small.",
            alt: "{たとえ} [小|ちい]さな ミス で も、 [報告|ほうこく] して ね。",
          },
          {
            jp: "{たとえ} [一日|いちにち] [五分|ごふん] で も、 [毎日|まいにち] [続|つづ]ける こと が [大切|たいせつ] です。",
            en: "Even if it's only five minutes a day, what matters is keeping it up every day.",
            alt: "{たとえ} [一日|いちにち] [五分|ごふん] で も、 [毎日|まいにち] [続|つづ]ける こと が [大切|たいせつ] だ よ。",
          },
        ],
      },
      { type: "heading", text: "どんなに, いくら〜ても: no matter how" },
      {
        type: "examples",
        items: [
          {
            jp: "{どんなに} [忙|いそが]しくて も、 [家族|かぞく] と の [時間|じかん] は [大切|たいせつ] に したい。",
            en: "However busy I am, I want to make time for my family.",
            alt: "{どんなに} [忙|いそが]しくて も、 [家族|かぞく] と の [時間|じかん] は [大切|たいせつ] に したい です。",
          },
          {
            jp: "{どんなに} [頑張|がんば]って も、 [彼|かれ] に は [勝|か]てなかった。",
            en: "No matter how hard I tried, I couldn't beat him.",
            alt: "{どんなに} [頑張|がんば]って も、 [彼|かれ] に は [勝|か]てません でした。",
          },
          {
            jp: "{どんなに} [高|たか]くて も、 この [絵|え] が [欲|ほ]しい。",
            en: "However expensive it is, I want this painting.",
            alt: "{どんなに} [高|たか]くて も、 この [絵|え] が [欲|ほ]しい です。",
          },
          {
            jp: "{いくら} [食|た]べて も [太|ふと]らない [人|ひと] が [羨|うらや]ましい。",
            en: "I envy people who never put on weight, however much they eat.",
            alt: "{いくら} [食|た]べて も [太|ふと]らない [人|ひと] が [羨|うらや]ましい です。",
          },
          {
            jp: "{いくら} [電話|でんわ] して も、 [彼女|かのじょ] は [出|で]ません でした。",
            en: "However many times I phoned, she didn't answer.",
            alt: "{いくら} [電話|でんわ] して も、 [彼女|かのじょ] は [出|で]なかった。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[失敗|しっぱい] して {も}、 [気|き] に しない。", en: "Even if I fail, I won't let it bother me." },
        b: { jp: "{たとえ} [失敗|しっぱい] して も、 [気|き] に しない。", en: "Even supposing I fail, I won't let it bother me." },
        diff: "The same sentence: ても does the work in both. たとえ only adds weight up front, so the listener knows from the start that “even if” is coming.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "たとえ needs ても",
        text: "✗ たとえ[雨|あめ]が[降|ふ]ったら ✓ たとえ[雨|あめ]が[降|ふ]っても. たとえ, どんなに and いくら go with ても (or でも), never with たら or ば.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Yuta", jp: "[明日|あした] の [相手|あいて] は [強|つよ]い です ね。", en: "Tomorrow's opponents are strong, aren't they?" },
          { speaker: "Coach", jp: "そう だ ね。 でも、 {たとえ} [負|ま]けて も、 [最後|さいご] まで [頑張|がんば]ろう。", en: "They are. But even if we lose, let's give it everything to the end." },
          { speaker: "Yuta", jp: "はい。 {どんなに} [疲|つか]れて も、 [走|はし]り[続|つづ]けます。", en: "Yes. However tired I get, I'll keep running." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With たとえ (use [寒|さむ]い): “Even if it's cold, I swim every morning”: たとえ＿、[毎朝|まいあさ][泳|およ]ぎます。",
            answers: ["[寒|さむ]くて も"],
            explanation: "たとえ + くても: たとえ[寒|さむ]くても.",
          },
          {
            prompt: "With たとえ, after a noun: “Even if you're the company president, you have to keep the rules”: たとえ[社長|しゃちょう]＿、ルールは[守|まも]らなければならない。",
            answers: ["で も"],
            explanation: "A noun takes でも: たとえ[社長|しゃちょう]でも.",
          },
          {
            prompt: "Casual, with どんなに (use [急|いそ]ぐ): “However much we hurry, we won't make it”: ＿、[間|ま]に[合|あ]わない。",
            answers: ["どんなに [急|いそ]いで も"],
            explanation: "どんなに + the て form + も: どんなに[急|いそ]いでも.",
          },
          {
            prompt: "With いくら (use [待|ま]つ): “No matter how long I waited, he didn't come”: ＿、[彼|かれ]は[来|こ]なかった。",
            answers: ["いくら [待|ま]って も"],
            explanation: "いくら + the て form + も: いくら[待|ま]っても.",
          },
          {
            prompt: "Fix it (“Even if it's expensive, I'll buy it”): たとえ[高|たか]かったら、[買|か]います。",
            answers: ["たとえ [高|たか]くて も、 [買|か]います。"],
            explanation: "たとえ goes with ても, not たら: たとえ[高|たか]くても.",
          },
        ],
      },
    ],
  },
];
