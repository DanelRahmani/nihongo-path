import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n3Relations: Lesson[] = [
  {
    slug: "ni-tsuite",
    title: "About, concerning: について and にかんして",
    mark: "について",
    summary: "Say what you talk, think, write or ask about, and the more formal にかんして and にかんする.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ni tsuite); Bunpro, “について” and “に関する・に関して”; JLPT Sensei, “について” and “に関する / に関して”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **について** says what something is about: what you talk, think, write, ask or learn about, and **に[関|かん]して** says the same more formally; before a noun they become **についての** and **に[関|かん]する**.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + について + verb", "[日本|にほん] の [歴史|れきし] について [話|はな]す"],
          ["Noun + についての + Noun", "[環境|かんきょう] について の [本|ほん]"],
          ["Noun + に[関|かん]して + verb (formal)", "[試験|しけん] に[関|かん]して [説明|せつめい] する"],
          ["Noun + に[関|かん]する + Noun (formal)", "[試験|しけん] に[関|かん]する [質問|しつもん]"],
        ],
      },
      {
        type: "text",
        text: "について is written in kana. It links a topic to a verb of speaking, thinking, writing, asking or studying: [話|はな]す, [考|かんが]える, [書|か]く, [聞|き]く, [調|しら]べる. Before a noun it takes の: [日本|にほん]の[本|ほん] is any book from Japan, [日本|にほん]についての[本|ほん] is a book about Japan.",
      },
      {
        type: "text",
        text: "に[関|かん]して means the same, but sounds formal and written: notices, the news, emails at work. Before a noun, に[関|かん]する is the usual form (に[関|かん]しての is also heard). In conversation, について is the everyday choice. Both can take は to make it the topic: [時間|じかん]については… (as for the time…).",
      },
      { type: "heading", text: "について: about" },
      {
        type: "examples",
        items: [
          {
            jp: "[明日|あした] の [会議|かいぎ] で、 [新|あたら]しい [計画|けいかく] {について} [話|はな]します。",
            en: "At tomorrow's meeting, I'll talk about the new plan.",
            alt: "[明日|あした] の [会議|かいぎ] で、 [新|あたら]しい [計画|けいかく] {について} [話|はな]す よ。",
          },
          {
            jp: "[日本|にほん] の [歴史|れきし] {について} [調|しら]べて います。",
            en: "I'm looking into Japanese history.",
            alt: "[日本|にほん] の [歴史|れきし] {について} [調|しら]べて いる。",
          },
          {
            jp: "その [問題|もんだい] {について}、 どう [思|おも]う？",
            en: "What do you think about that problem?",
            alt: "その [問題|もんだい] {について}、 どう [思|おも]います か？",
          },
          {
            jp: "[母|はは] に [将来|しょうらい] {について} [聞|き]かれました。",
            en: "My mother asked me about my future.",
            alt: "[母|はは] に [将来|しょうらい] {について} [聞|き]かれた。",
          },
          {
            jp: "[環境|かんきょう] {について の} [本|ほん] を [読|よ]んで います。",
            en: "I'm reading a book about the environment.",
            alt: "[環境|かんきょう] {について の} [本|ほん] を [読|よ]んで いる。",
            note: "Before a noun, について takes の.",
          },
        ],
      },
      { type: "heading", text: "に[関|かん]して, に[関|かん]する: regarding (formal)" },
      {
        type: "examples",
        items: [
          { jp: "[試験|しけん] {に[関|かん]して} [質問|しつもん] が ある [人|ひと] は、 [手|て] を [上|あ]げて ください。", en: "Anyone with a question regarding the exam, please raise your hand." },
          { jp: "[来週|らいしゅう] の [旅行|りょこう] {に[関|かん]して}、 メール で [連絡|れんらく] します。", en: "I'll be in touch by email regarding next week's trip." },
          { jp: "[日本|にほん] の [文化|ぶんか] {に[関|かん]する} [本|ほん] を [探|さが]して います。", en: "I'm looking for books on Japanese culture.", alt: "[日本|にほん] の [文化|ぶんか] {に[関|かん]する} [本|ほん] を [探|さが]して いる。" },
          { jp: "[事故|じこ] {に[関|かん]する} ニュース を [見|み]ました か？", en: "Did you see the news about the accident?", alt: "[事故|じこ] {に[関|かん]する} ニュース、 [見|み]た？" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[日本|にほん] {の} [本|ほん] を [買|か]いました。", en: "I bought a Japanese book." },
        b: { jp: "[日本|にほん] {について の} [本|ほん] を [買|か]いました。", en: "I bought a book about Japan." },
        diff: "の only links the two nouns, so (a) could be any book from Japan. についての says what the book is about.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Before a noun: についての",
        text: "✗ [環境|かんきょう]について[本|ほん] ✓ [環境|かんきょう]についての[本|ほん], or more formally [環境|かんきょう]に[関|かん]する[本|ほん]. について joins a noun to a verb; to describe another noun it needs の, while に[関|かん]して changes to に[関|かん]する.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Student", jp: "[先生|せんせい]、 [来週|らいしゅう] の [発表|はっぴょう] は [何|なに] {について} [話|はな]せば いい です か？", en: "Sensei, what should I talk about in next week's presentation?" },
          { speaker: "Teacher", jp: "[国|くに] の [文化|ぶんか] {について} [話|はな]して ください。", en: "Please talk about the culture of your country." },
          { speaker: "Student", jp: "わかりました。 [食|た]べ[物|もの] {について} は どう です か？", en: "I see. How about food?" },
          { speaker: "Teacher", jp: "もちろん いい です よ。", en: "Of course." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with について (use [話|はな]す): “Let's talk about the summer holidays”: [夏休|なつやす]み＿。",
            answers: ["について [話|はな]しましょう"],
            explanation: "Topic + について + the verb of speaking: [夏休|なつやす]みについて[話|はな]しましょう.",
          },
          {
            prompt: "With について, before a noun: “a film about a dog”: [犬|いぬ]＿[映画|えいが]",
            answers: ["について の"],
            explanation: "Before a noun, について takes の: [犬|いぬ]についての[映画|えいが].",
          },
          {
            prompt: "Formal, with [関|かん]する, before a noun: “questions about the new rules”: [新|あたら]しいルール＿[質問|しつもん]",
            answers: ["に[関|かん]する"],
            explanation: "に[関|かん]して becomes に[関|かん]する before a noun: ルールに[関|かん]する[質問|しつもん].",
          },
          {
            prompt: "Polite, in a work email: “Regarding the meeting time, I'll contact you again”: [会議|かいぎ]の[時間|じかん]＿、また[連絡|れんらく]します。",
            answers: ["に[関|かん]して", "に[関|かん]して は", "について", "について は"],
            explanation: "Both fit; に[関|かん]して sounds more formal, and は makes it the topic (“as for the time”).",
          },
          {
            prompt: "Fix it (“I want to read a book about the stars”): [星|ほし]について[本|ほん]を[読|よ]みたい。",
            answers: ["[星|ほし] について の [本|ほん] を [読|よ]みたい。", "[星|ほし] に[関|かん]する [本|ほん] を [読|よ]みたい。", "[星|ほし] に[関|かん]して の [本|ほん] を [読|よ]みたい。"],
            explanation: "Before a noun, について needs の: [星|ほし]についての[本|ほん] (or [星|ほし]に[関|かん]する[本|ほん]).",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-taishite",
    title: "Towards, and whereas: にたいして",
    mark: "に[対|たい]して",
    summary: "Name who or what an attitude or action is aimed at, and set two facts side by side.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (ni taishite); Bunpro, “に対して”; JLPT Sensei, “に対して”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **に[対|たい]して** names who or what a feeling, attitude or action is aimed at (“towards, to, against”); after a clause, **のに[対|たい]して** sets two facts side by side (“whereas”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + に[対|たい]して", "お[客|きゃく][様|さま] に[対|たい]して"],
          ["Noun + に[対|たい]する + Noun", "[学生|がくせい] に[対|たい]する [態度|たいど]"],
          ["Verb or い-adjective, plain + のに[対|たい]して", "[兄|あに] は [背|せ] が [高|たか]い の に[対|たい]して"],
          ["な-adjective or Noun + な + のに[対|たい]して", "[姉|あね] は [料理|りょうり] が [上手|じょうず] な の に[対|たい]して"],
        ],
      },
      {
        type: "text",
        text: "In the first use, the second half is an attitude or a reaction: [丁寧|ていねい], [厳|きび]しい, [優|やさ]しい, [反対|はんたい]する, [答|こた]える. に alone often does the same job ([子供|こども]に[優|やさ]しい); に[対|たい]して makes the target stand out and sounds more careful. Before a noun it becomes に[対|たい]する.",
      },
      {
        type: "text",
        text: "In the second use, a whole clause + の + に[対|たい]して contrasts two facts: “A is so, whereas B is so”. It's a careful, rather written way to compare; in conversation people use けど or が. Don't confuse it with のに (“even though”): the の here makes the clause a noun, and に[対|たい]して follows it.",
      },
      { type: "heading", text: "に[対|たい]して: towards, to" },
      {
        type: "examples",
        items: [
          {
            jp: "[田中|たなか]-さん は お[客|きゃく][様|さま] {に[対|たい]して} いつも [丁寧|ていねい] です。",
            en: "Tanaka-san is always polite to customers.",
            alt: "[田中|たなか]-さん は お[客|きゃく][様|さま] {に[対|たい]して} いつも [丁寧|ていねい] だ よ。",
          },
          {
            jp: "[子供|こども] {に[対|たい]して}、 そんな [言|い]い[方|かた] は よくない よ。",
            en: "That's no way to speak to a child.",
            alt: "[子供|こども] {に[対|たい]して}、 そんな [言|い]い[方|かた] は よくない です よ。",
          },
          {
            jp: "[部長|ぶちょう] の [意見|いけん] {に[対|たい]して}、 [反対|はんたい] する [人|ひと] は いません でした。",
            en: "Nobody spoke against the manager's view.",
            alt: "[部長|ぶちょう] の [意見|いけん] {に[対|たい]して}、 [反対|はんたい] する [人|ひと] は いなかった。",
          },
          {
            jp: "[学生|がくせい] {に[対|たい]する} [先生|せんせい] の [態度|たいど] が [厳|きび]しすぎる と [思|おも]います。",
            en: "I think the teacher's attitude towards the students is too strict.",
            alt: "[学生|がくせい] {に[対|たい]する} [先生|せんせい] の [態度|たいど] が [厳|きび]しすぎる と [思|おも]う。",
          },
        ],
      },
      { type: "heading", text: "のに[対|たい]して: whereas" },
      {
        type: "examples",
        items: [
          {
            jp: "[兄|あに] は スポーツ が [好|す]き な {の に[対|たい]して}、 [弟|おとうと] は [本|ほん] ばかり [読|よ]んで います。",
            en: "My older brother loves sport, whereas my younger brother mostly reads.",
            alt: "[兄|あに] は スポーツ が [好|す]き な {の に[対|たい]して}、 [弟|おとうと] は [本|ほん] ばかり [読|よ]んで いる。",
          },
          {
            jp: "[東京|とうきょう] は [人口|じんこう] が [増|ふ]えて いる {の に[対|たい]して}、 [田舎|いなか] は [減|へ]って いる。",
            en: "Tokyo's population is growing, whereas the countryside's is shrinking.",
            alt: "[東京|とうきょう] は [人口|じんこう] が [増|ふ]えて いる {の に[対|たい]して}、 [田舎|いなか] は [減|へ]って います。",
          },
          {
            jp: "[去年|きょねん] は [雨|あめ] が [多|おお]かった {の に[対|たい]して}、 [今年|ことし] は ほとんど [降|ふ]って いない。",
            en: "Last year was rainy, whereas this year it's hardly rained at all.",
            alt: "[去年|きょねん] は [雨|あめ] が [多|おお]かった {の に[対|たい]して}、 [今年|ことし] は ほとんど [降|ふ]って いません。",
          },
          {
            jp: "[姉|あね] は [料理|りょうり] が [上手|じょうず] な {の に[対|たい]して}、 [私|わたし] は まったく できません。",
            en: "My sister is good at cooking, whereas I can't cook at all.",
            alt: "[姉|あね] は [料理|りょうり] が [上手|じょうず] な {の に[対|たい]して}、 [私|わたし] は まったく できない。",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[兄|あに] は [背|せ] が [高|たか]い {の に[対|たい]して}、 [弟|おとうと] は [低|ひく]い。", en: "My older brother is tall, whereas my younger brother is short." },
        b: { jp: "[兄|あに] は [背|せ] が [高|たか]い {けど}、 [弟|おとうと] は [低|ひく]い。", en: "My older brother is tall, but my younger brother is short." },
        diff: "The same two facts. のに[対|たい]して lays them side by side like a careful comparison; けど is how you'd say it to a friend.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A clause needs の",
        text: "✗ [兄|あに]は[背|せ]が[高|たか]いに[対|たい]して ✓ [兄|あに]は[背|せ]が[高|たか]いのに[対|たい]して. に[対|たい]して follows a noun, so a clause is turned into one with の (a な-adjective or noun keeps な: [上手|じょうず]なのに[対|たい]して). This の + に is not のに “even though”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[新|あたら]しい ルール {に[対|たい]して}、 [何|なに]か [意見|いけん] は あります か？", en: "Does anyone have any views on the new rules?" },
          { speaker: "Mr Mori", jp: "はい。 [若|わか]い [人|ひと] は いい と [言|い]って いる {の に[対|たい]して}、 [年|とし] が [上|うえ] の [人|ひと] は [反対|はんたい] して います。", en: "Yes. The younger staff say they're good, whereas the older ones are against them." },
          { speaker: "Ms Sato", jp: "そう です か。 じゃあ、 もう [一度|いちど] [話|はな]し[合|あ]いましょう。", en: "I see. Then let's talk it over again." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with に[対|たい]して: “She's always kind to animals”: [彼女|かのじょ]は[動物|どうぶつ]＿いつも[優|やさ]しいです。",
            answers: ["に[対|たい]して", "に[対|たい]して は"],
            explanation: "The one the kindness is aimed at + に[対|たい]して: [動物|どうぶつ]に[対|たい]して[優|やさ]しい.",
          },
          {
            prompt: "With に[対|たい]して, before a noun: “his attitude towards work”: [仕事|しごと]＿[彼|かれ]の[態度|たいど]",
            answers: ["に[対|たい]する", "に[対|たい]して の"],
            explanation: "Before a noun, に[対|たい]して usually becomes に[対|たい]する: [仕事|しごと]に[対|たい]する[態度|たいど].",
          },
          {
            prompt: "Whereas, with に[対|たい]して (use [多|おお]い): “The north gets a lot of snow, whereas the south gets hardly any”: [北|きた]は[雪|ゆき]が＿、[南|みなみ]はほとんど[降|ふ]らない。",
            answers: ["[多|おお]い の に[対|たい]して"],
            explanation: "A clause takes の before に[対|たい]して: [多|おお]いのに[対|たい]して.",
          },
          {
            prompt: "Whereas, with に[対|たい]して (use [静|しず]か): “The town is quiet, whereas the station area is lively”: [町|まち]は＿、[駅前|えきまえ]はにぎやかだ。",
            answers: ["[静|しず]か な の に[対|たい]して"],
            explanation: "A な-adjective keeps な before の: [静|しず]かなのに[対|たい]して.",
          },
          {
            prompt: "Fix it: [父|ちち]は[早|はや]く[起|お]きるに[対|たい]して、[母|はは]は[遅|おそ]く[起|お]きる。",
            answers: ["[父|ちち] は [早|はや]く [起|お]きる の に[対|たい]して、 [母|はは] は [遅|おそ]く [起|お]きる。"],
            explanation: "A clause needs の before に[対|たい]して: [起|お]きるのに[対|たい]して.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-totte",
    title: "For someone, from their point of view: にとって",
    mark: "にとって",
    summary: "Say for whom something is important, hard, useful or a problem.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ni totte); Bunpro, “に取って”; JLPT Sensei, “にとって”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **にとって** says from whose point of view a judgement holds: “for X, it's important / hard / a problem”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + にとって", "[私|わたし] にとって"],
          ["Noun + にとって は (contrast, emphasis)", "[子供|こども] にとって は"],
          ["Noun + にとって の + Noun", "[学生|がくせい] にとって の [問題|もんだい]"],
        ],
      },
      {
        type: "text",
        text: "にとって is written in kana. What follows is a judgement about how something is for that person or group: [大切|たいせつ], [大事|だいじ], [難|むずか]しい, [簡単|かんたん], [必要|ひつよう], [問題|もんだい], いい[経験|けいけん]. It doesn't say who holds an opinion or does something: for “in my opinion”, say [私|わたし]は…と[思|おも]う.",
      },
      {
        type: "text",
        text: "のために (n3-reasons) is for someone's benefit, with an action you do for them: [母|はは]のために[料理|りょうり]を[作|つく]る. には often replaces にとって before an adjective, and sounds lighter: この[本|ほん]は[子供|こども]には[難|むずか]しい. にとっては adds a contrast: “for them, at least”.",
      },
      { type: "link", href: "/learn/n3-reasons/tame-ni", label: "For, in order to: ために", text: "のために: for someone's sake." },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {にとって}、 [家族|かぞく] が [一番|いちばん] [大切|たいせつ] です。", en: "For me, family matters most.", alt: "[私|わたし] {にとって}、 [家族|かぞく] が [一番|いちばん] [大切|たいせつ] だ。" },
          { jp: "この [仕事|しごと] は [私|わたし] {にとって} いい [経験|けいけん] に なりました。", en: "This job turned out to be a good experience for me.", alt: "この [仕事|しごと] は [私|わたし] {にとって} いい [経験|けいけん] に なった。" },
          { jp: "[外国人|がいこくじん] {にとって}、 [敬語|けいご] は [難|むずか]しい です よね。", en: "Keigo is hard for foreigners, isn't it?", alt: "[外国人|がいこくじん] {にとって}、 [敬語|けいご] は [難|むずか]しい よね。" },
          { jp: "[田舎|いなか] に [住|す]む [人|ひと] {にとって}、 [車|くるま] は [必要|ひつよう] な もの だ。", en: "For people who live in the country, a car is a necessity.", alt: "[田舎|いなか] に [住|す]む [人|ひと] {にとって}、 [車|くるま] は [必要|ひつよう] な もの です。" },
          { jp: "[学生|がくせい] {にとって}、 [本|ほん] の [値段|ねだん] は [大|おお]きな [問題|もんだい] です。", en: "For students, the price of books is a big problem." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[母|はは] {にとって}、 この [町|まち] は [便利|べんり] です。", en: "For my mother, this town is convenient." },
        b: { jp: "[母|はは] {の ため に}、 この [町|まち] に [引|ひ]っ[越|こ]しました。", en: "We moved to this town for my mother's sake." },
        diff: "A different sentence on purpose, to show the two jobs. にとって is the point of view a judgement holds from ([便利|べんり] for her). のために is the person an action is done for (moving, for her benefit).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A judgement, not an action",
        text: "✗ [友達|ともだち]にとって、[料理|りょうり]を[作|つく]りました ✓ [友達|ともだち]のために、[料理|りょうり]を[作|つく]りました. にとって needs a judgement after it ([大切|たいせつ], [難|むずか]しい, [必要|ひつよう]); an action done for someone's benefit takes のために.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "この [写真|しゃしん]、 [古|ふる]い ね。 [捨|す]てない の？", en: "This photo's old. Aren't you going to throw it out?" },
          { speaker: "Aya", jp: "だめ。 [私|わたし] {にとって} は [大切|たいせつ] な [思|おも]い[出|で] なん だ。", en: "No way. To me it's a precious memory." },
          { speaker: "Kenta", jp: "そう なん だ。 ごめん ね。", en: "Oh, I see. Sorry." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With にとって: “For beginners, this dictionary is easy to use”: [初心者|しょしんしゃ]＿、この[辞書|じしょ]は[使|つか]いやすい。",
            answers: ["にとって", "にとって は"],
            explanation: "Whose point of view + にとって: [初心者|しょしんしゃ]にとって.",
          },
          {
            prompt: "With にとって, before a noun: “a problem for foreigners”: [外国人|がいこくじん]＿[問題|もんだい]",
            answers: ["にとって の"],
            explanation: "Before a noun, にとって takes の: [外国人|がいこくじん]にとっての[問題|もんだい].",
          },
          {
            prompt: "For her benefit, not her point of view: “I made dinner for my mother”: [母|はは]＿、[晩|ばん]ご[飯|はん]を[作|つく]った。",
            answers: ["の ため に"],
            explanation: "An action done for someone's sake takes のために; にとって needs a judgement after it.",
          },
          {
            prompt: "Fix it (from her point of view): [彼女|かのじょ]のために、この[仕事|しごと]は[簡単|かんたん]すぎる。",
            answers: [
              "[彼女|かのじょ] にとって、 この [仕事|しごと] は [簡単|かんたん]すぎる。",
              "[彼女|かのじょ] にとって は、 この [仕事|しごと] は [簡単|かんたん]すぎる。",
              "[彼女|かのじょ] に は、 この [仕事|しごと] は [簡単|かんたん]すぎる。",
            ],
            explanation: "“Too easy for her” is a judgement from her point of view: [彼女|かのじょ]にとって.",
          },
        ],
      },
    ],
  },
  {
    slug: "toshite",
    title: "As, in the role of: として",
    mark: "として",
    summary: "Say in what role or capacity someone acts, and what someone thinks speaking for themselves.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (to shite); Bunpro, “として”; JLPT Sensei, “として”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "Bunpro puts として at N3 but としては and としても at N2; JLPT Sensei lists として at N3."),
    blocks: [
      {
        type: "idea",
        text: "Noun + **として** says in what role, capacity or status someone acts or something is seen: “as a …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + として", "[通訳|つうやく] として [働|はたら]く"],
          ["Noun + として は (speaking as, for one's part)", "[私|わたし] として は"],
          ["Noun + として も (as … too)", "[親|おや] として も"],
          ["Noun + として の + Noun", "[医者|いしゃ] として の [経験|けいけん]"],
        ],
      },
      {
        type: "text",
        text: "として is written in kana. The noun before it names a role or a status: [先生|せんせい], [代表|だいひょう], [留学生|りゅうがくせい], お[土産|みやげ]. [私|わたし]としては means “speaking for myself, personally”, a soft way to give your own view.",
      },
      {
        type: "text",
        text: "In speech, で after a role noun often does the same job ([趣味|しゅみ]で: as a hobby; [代表|だいひょう]で[出|で]る), but で also gives a reason or occasion ([仕事|しごと]で[来|き]た: came on business). として says plainly that it's a role, and fits any role and any style.",
      },
      { type: "heading", text: "として: as" },
      {
        type: "examples",
        items: [
          { jp: "[兄|あに] は [通訳|つうやく] {として} [働|はたら]いて います。", en: "My brother works as an interpreter.", alt: "[兄|あに] は [通訳|つうやく] {として} [働|はたら]いて いる。" },
          { jp: "[田中|たなか]-さん は チーム の [代表|だいひょう] {として} [会議|かいぎ] に [出|で]ます。", en: "Tanaka-san will attend the meeting as the team's representative.", alt: "[田中|たなか]-さん は チーム の [代表|だいひょう] {として} [会議|かいぎ] に [出|で]る よ。" },
          { jp: "これ は お[土産|みやげ] {として} [人気|にんき] が ある お[菓子|かし] です。", en: "These are sweets that are popular as a souvenir.", alt: "これ は お[土産|みやげ] {として} [人気|にんき] が ある お[菓子|かし] だ よ。" },
          { jp: "[彼女|かのじょ] は [歌手|かしゅ] {として} [有名|ゆうめい] に なった。", en: "She became famous as a singer.", alt: "[彼女|かのじょ] は [歌手|かしゅ] {として} [有名|ゆうめい] に なりました。" },
        ],
      },
      { type: "heading", text: "としては, としても, としての" },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] {として は}、 [来週|らいしゅう] の ほう が いい です。", en: "Personally, next week would suit me better.", alt: "[私|わたし] {として は}、 [来週|らいしゅう] の ほう が いい。" },
          { jp: "[親|おや] {として も}、 [子供|こども] の [将来|しょうらい] が [心配|しんぱい] です。", en: "As a parent, I worry about my child's future too.", alt: "[親|おや] {として も}、 [子供|こども] の [将来|しょうらい] が [心配|しんぱい] だ。" },
          { jp: "[医者|いしゃ] {として の} [経験|けいけん] は まだ [短|みじか]い です。", en: "My experience as a doctor is still short." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[仕事|しごと] {で} [日本|にほん] に [来|き]ました。", en: "I came to Japan on business." },
        b: { jp: "[留学生|りゅうがくせい] {として} [日本|にほん] に [来|き]ました。", en: "I came to Japan as an exchange student." },
        diff: "で gives the occasion or reason for coming. として gives the role you came in.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "“As” isn't に",
        text: "✗ [会社|かいしゃ]の[代表|だいひょう]に[話|はな]しました (a real sentence, but it says something else: “I spoke *to* the company's representative”) ✓ [会社|かいしゃ]の[代表|だいひょう]として[話|はな]しました (I spoke *as* the company's representative). に marks who you speak to; として marks the role you speak in.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[前|まえ] の [仕事|しごと] で は、 どんな こと を して いました か？", en: "What did you do in your last job?" },
          { speaker: "Mr Mori", jp: "[学校|がっこう] の [先生|せんせい] {として}、 [五年|ごねん] [働|はたら]いて いました。", en: "I worked as a school teacher for five years." },
          { speaker: "Ms Sato", jp: "そう です か。 [先生|せんせい] {として の} [経験|けいけん] は、 この [仕事|しごと] に も [役|やく] に [立|た]ちそう です ね。", en: "I see. Your experience as a teacher looks as if it will be useful in this job too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With として: “He's famous as a writer”: [彼|かれ]は[作家|さっか]＿[有名|ゆうめい]です。",
            answers: ["として"],
            explanation: "The role he's known in + として: [作家|さっか]として[有名|ゆうめい].",
          },
          {
            prompt: "Before a noun: “my life as a student”: [学生|がくせい]＿[生活|せいかつ]",
            answers: ["として の"],
            explanation: "Before a noun, として takes の: [学生|がくせい]としての[生活|せいかつ].",
          },
          {
            prompt: "Polite, with [私|わたし]: “Personally, I'm against it”: ＿、[反対|はんたい]です。",
            answers: ["[私|わたし] として は"],
            explanation: "[私|わたし]としては: speaking for myself.",
          },
          {
            prompt: "Fix it (“My sister works as a doctor”): [姉|あね]は[医者|いしゃ]に[働|はたら]いています。",
            answers: ["[姉|あね] は [医者|いしゃ] として [働|はたら]いて います。"],
            explanation: "The role you work in takes として: [医者|いしゃ]として[働|はたら]いています.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-kurabete",
    title: "Compared with: にくらべて",
    mark: "に[比|くら]べて",
    summary: "Set something against a standard: compared with last year, with Tokyo, with before.",
    source: "Bunpro, “に比べて”; JLPT Sensei, “に比べて（にくらべて）”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **に[比|くら]べて** (or **に[比|くら]べると**) makes something the yardstick: “compared with X, …”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + に[比|くら]べて", "[去年|きょねん] に [比|くら]べて"],
          ["Noun + に[比|くら]べると", "[東京|とうきょう] に [比|くら]べる と"],
          ["Verb, plain + の + に[比|くら]べて", "[電車|でんしゃ] で [行|い]く の に [比|くら]べて"],
        ],
      },
      {
        type: "text",
        text: "[比|くら]べる is “to compare”. に[比|くら]べて and に[比|くら]べると mean the same; と[比|くら]べて is also common, and writing shortens it to に[比|くら]べ. The second half says how something differs from the yardstick: more, less, cheaper, or how it has changed ([前|まえ]に[比|くら]べて, compared with before).",
      },
      {
        type: "text",
        text: "より (the comparing lesson) puts the comparison inside one sentence: AはBより[高|たか]い, “A is more expensive than B”. に[比|くら]べて sets B up first as the standard and then describes A, so it suits change over time and a careful, measured tone.",
      },
      { type: "link", href: "/learn/n5-essentials/comparing", label: "Comparing: より and のほうが", text: "The everyday way to compare two things." },
      {
        type: "examples",
        items: [
          { jp: "[今年|ことし] の [夏|なつ] は [去年|きょねん] に {[比|くら]べて} [涼|すず]しい です ね。", en: "This summer's cooler than last year, isn't it?", alt: "[今年|ことし] の [夏|なつ] は [去年|きょねん] に {[比|くら]べて} [涼|すず]しい ね。" },
          { jp: "[東京|とうきょう] に {[比|くら]べる と}、 この [町|まち] は [家賃|やちん] が [安|やす]い。", en: "Compared with Tokyo, rents are cheap in this town.", alt: "[東京|とうきょう] に {[比|くら]べる と}、 この [町|まち] は [家賃|やちん] が [安|やす]い です。" },
          { jp: "[前|まえ] に {[比|くら]べて}、 [日本語|にほんご] が ずいぶん [上手|じょうず] に なりました ね。", en: "Your Japanese has really improved compared with before.", alt: "[前|まえ] に {[比|くら]べて}、 [日本語|にほんご] が ずいぶん [上手|じょうず] に なった ね。" },
          { jp: "[電車|でんしゃ] で [行|い]く の に {[比|くら]べて}、 [車|くるま] だ と [時間|じかん] が かかる。", en: "Compared with going by train, driving takes longer.", alt: "[電車|でんしゃ] で [行|い]く の に {[比|くら]べて}、 [車|くるま] だ と [時間|じかん] が かかります。" },
          { jp: "[昔|むかし] に {[比|くら]べる と}、 [子供|こども] の [数|かず] が [減|へ]りました。", en: "Compared with the old days, there are fewer children.", alt: "[昔|むかし] に {[比|くら]べる と}、 [子供|こども] の [数|かず] が [減|へ]った。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] は [大阪|おおさか] {より} [人|ひと] が [多|おお]い。", en: "Tokyo has more people than Osaka." },
        b: { jp: "[大阪|おおさか] に {[比|くら]べて}、 [東京|とうきょう] は [人|ひと] が [多|おお]い。", en: "Compared with Osaka, Tokyo has a lot of people." },
        diff: "より compares the two inside one statement. に[比|くら]べて sets Osaka up first as the yardstick, then describes Tokyo against it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "に, not を",
        text: "✗ [去年|きょねん]を[比|くら]べて ✓ [去年|きょねん]に[比|くら]べて. [比|くら]べる takes を for the things you compare (AとBを[比|くら]べる: to compare A and B), but “compared with X” is Xに[比|くら]べて (or Xと[比|くら]べて).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[大阪|おおさか] の [生活|せいかつ] は どう？", en: "How's life in Osaka?" },
          { speaker: "Kenta", jp: "[東京|とうきょう] に {[比|くら]べる と}、 [食|た]べ[物|もの] が [安|やす]くて おいしい よ。", en: "Compared with Tokyo, the food's cheap and good." },
          { speaker: "Aya", jp: "いい ね。 [今度|こんど] [遊|あそ]び に [行|い]く ね。", en: "Lucky you. I'll come and visit some time." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with に[比|くら]べて: “Compared with last month, we've had more customers”: [先月|せんげつ]＿、お[客|きゃく]さんが[増|ふ]えました。",
            answers: ["に [比|くら]べて", "に [比|くら]べ"],
            explanation: "The yardstick + に[比|くら]べて: [先月|せんげつ]に[比|くら]べて.",
          },
          {
            prompt: "With に[比|くら]べると, after a verb (use [住|す]む): “Compared with living in town, life in the country is quiet”: [町|まち]に＿、[田舎|いなか]の[生活|せいかつ]は[静|しず]かだ。",
            answers: ["[住|す]む の に [比|くら]べる と"],
            explanation: "A verb takes の before に[比|くら]べると: [住|す]むのに[比|くら]べると.",
          },
          {
            prompt: "Casual, with より (use [軽|かる]い): “This bag is lighter than that one”: このかばんはあのかばん＿。",
            answers: ["より [軽|かる]い", "より も [軽|かる]い"],
            explanation: "Inside one statement, より: あのかばんより[軽|かる]い.",
          },
          {
            prompt: "Fix it: [兄|あに]を[比|くら]べて、[弟|おとうと]はよく[食|た]べる。",
            answers: [
              "[兄|あに] に [比|くら]べて、 [弟|おとうと] は よく [食|た]べる。",
              "[兄|あに] に [比|くら]べる と、 [弟|おとうと] は よく [食|た]べる。",
              "[兄|あに] に [比|くら]べ、 [弟|おとうと] は よく [食|た]べる。",
              "[兄|あに] と [比|くら]べて、 [弟|おとうと] は よく [食|た]べる。",
              "[兄|あに] と [比|くら]べる と、 [弟|おとうと] は よく [食|た]べる。",
            ],
            explanation: "“Compared with” is に[比|くら]べて (or と[比|くら]べて), not を.",
          },
        ],
      },
    ],
  },
  {
    slug: "ni-shite-wa",
    title: "For a …, considering: にしては and わりに",
    mark: "にしては",
    summary: "Say a result goes against what you'd expect, for a beginner, for October, for the price.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (ni shite wa; wari ni); Bunpro, “にしては” and “割に”; JLPT Sensei, “にしては” and “割に”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "X + **にしては** says something is surprising given the standard X sets (“for a beginner, she's good”); **[割|わり]に** says much the same, “considering …”, more loosely, and also after adjectives and verbs.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + にしては", "[初心者|しょしんしゃ] に して は"],
          ["Verb, plain + にしては", "[初|はじ]めて [作|つく]った に して は"],
          ["Noun + の + [割|わり]に", "[値段|ねだん] の [割|わり] に"],
          ["い-adjective + [割|わり]に", "[安|やす]い [割|わり] に"],
          ["な-adjective + な + [割|わり]に", "[有名|ゆうめい] な [割|わり] に"],
          ["Verb, plain + [割|わり]に", "よく [食|た]べる [割|わり] に"],
        ],
      },
      {
        type: "text",
        text: "にしては sets a definite standard, a fact about the one being judged ([小学生|しょうがくせい], [十月|じゅうがつ], [初|はじ]めて[作|つく]った), and says the result doesn't match it: often praise (“not bad for …”), sometimes a complaint. It follows a noun or a verb, not an adjective: ✗ [安|やす]いにしては.",
      },
      {
        type: "text",
        text: "[割|わり] (rate, proportion) + に is “considering …, for …”: the second half is more or less than the first would lead you to expect. It follows nouns with の, adjectives and verbs, and is often about amount or degree ([値段|ねだん]の[割|わり]に[量|りょう]が[多|おお]い). After a noun both often fit ([年|とし]の[割|わり]に, その[年|とし]にしては); にしては points at a clearer yardstick, and [割|わり]に is broader and a little more casual. [割|わり]に is also written わりに.",
      },
      {
        type: "text",
        text: "のに also says the result goes against expectation ([有名|ゆうめい]なのに: although it's famous); [割|わり]に adds “for its degree”, so it fits when you're weighing amount or level.",
      },
      { type: "heading", text: "にしては: for a …" },
      {
        type: "examples",
        items: [
          { jp: "[日曜日|にちようび] {に して は}、 [道|みち] が [混|こ]んで います ね。", en: "The roads are busy for a Sunday.", alt: "[日曜日|にちようび] {に して は}、 [道|みち] が [混|こ]んでる ね。" },
          { jp: "[十月|じゅうがつ] {に して は}、 [今日|きょう] は [暑|あつ]い です ね。", en: "It's hot today for October.", alt: "[十月|じゅうがつ] {に して は}、 [今日|きょう] は [暑|あつ]い ね。" },
          { jp: "[小学生|しょうがくせい] {に して は}、 [難|むずか]しい [言葉|ことば] を よく [知|し]って いる。", en: "She knows a lot of hard words for a primary school pupil.", alt: "[小学生|しょうがくせい] {に して は}、 [難|むずか]しい [言葉|ことば] を よく [知|し]って います。" },
          { jp: "[日本|にほん] に [来|き]て [一年|いちねん] {に して は}、 [日本語|にほんご] が [上手|じょうず] です ね。", en: "Your Japanese is good for someone who's only been in Japan a year.", alt: "[日本|にほん] に [来|き]て [一年|いちねん] {に して は}、 [日本語|にほんご] が [上手|じょうず] だ ね。" },
          { jp: "[初|はじ]めて [作|つく]った {に して は}、 よく できて います ね。", en: "It's come out well for a first attempt.", alt: "[初|はじ]めて [作|つく]った {に して は}、 よく できてる ね。" },
        ],
      },
      { type: "heading", text: "[割|わり]に: considering" },
      {
        type: "examples",
        items: [
          { jp: "この [店|みせ] は [値段|ねだん] の {[割|わり] に} [量|りょう] が [多|おお]い。", en: "This place gives you a lot for the price.", alt: "この [店|みせ] は [値段|ねだん] の {[割|わり] に} [量|りょう] が [多|おお]い です。" },
          { jp: "この [映画|えいが] は [有名|ゆうめい] な {[割|わり] に}、 あまり [面白|おもしろ]くなかった。", en: "This film wasn't much good, considering how famous it is.", alt: "この [映画|えいが] は [有名|ゆうめい] な {[割|わり] に}、 あまり [面白|おもしろ]くなかった です。" },
          { jp: "[弟|おとうと] は よく [食|た]べる {[割|わり] に} [太|ふと]らない。", en: "My brother doesn't put on weight, considering how much he eats.", alt: "[弟|おとうと] は よく [食|た]べる {[割|わり] に} [太|ふと]りません。" },
          { jp: "[祖母|そぼ] は [年|とし] の {[割|わり] に} [若|わか]く [見|み]えます。", en: "My grandmother looks young for her age.", alt: "[祖母|そぼ] は [年|とし] の {[割|わり] に} [若|わか]く [見|み]える。" },
          { jp: "この かばん は [安|やす]い {[割|わり] に} [便利|べんり] だ よ。", en: "This bag is handy for something so cheap.", alt: "この かばん は [安|やす]い {[割|わり] に} [便利|べんり] です よ。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[初心者|しょしんしゃ] {に して は}、 [上手|じょうず] です ね。", en: "You're good for a beginner." },
        b: { jp: "[初心者|しょしんしゃ] {の [割|わり] に}、 [上手|じょうず] です ね。", en: "You're good, considering you're a beginner." },
        diff: "After a noun both work. にしては holds you up against the standard of a beginner; の[割|わり]に is a little looser, “considering”.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not after an adjective",
        text: "✗ [安|やす]いにしては、おいしい ✓ [安|やす]い[割|わり]に、おいしい. にしては follows a noun or a verb; after an い- or な-adjective, use [割|わり]に ([有名|ゆうめい]な[割|わり]に).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "この ケーキ、 [作|つく]った の？", en: "Did you make this cake?" },
          { speaker: "Aya", jp: "うん。 [初|はじ]めて [作|つく]った ん だ。", en: "Yes. It's the first one I've made." },
          { speaker: "Kenta", jp: "[初|はじ]めて {に して は}、 すごく おいしい よ！", en: "It's really good, for a first try!" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With にしては: “He talks a lot for a three-year-old”: [三歳|さんさい]＿、よく[話|はな]す。",
            answers: ["に して は"],
            explanation: "A noun sets the standard: [三歳|さんさい]にしては.",
          },
          {
            prompt: "With [割|わり]に (use [新|あたら]しい): “This computer is hard to use, considering how new it is”: このパソコンは＿、[使|つか]いにくい。",
            answers: ["[新|あたら]しい [割|わり] に", "[新|あたら]しい [割|わり] に は"],
            explanation: "An い-adjective goes straight before [割|わり]に: [新|あたら]しい[割|わり]に.",
          },
          {
            prompt: "With [割|わり]に (use [簡単|かんたん]): “This game is fun, considering how simple the rules are”: このゲームはルールが＿、[面白|おもしろ]い。",
            answers: ["[簡単|かんたん] な [割|わり] に", "[簡単|かんたん] な [割|わり] に は"],
            explanation: "A な-adjective keeps な: [簡単|かんたん]な[割|わり]に.",
          },
          {
            prompt: "Fix it: この[部屋|へや]は[広|ひろ]いにしては、[安|やす]い。",
            answers: ["この [部屋|へや] は [広|ひろ]い [割|わり] に、 [安|やす]い。", "この [部屋|へや] は [広|ひろ]い [割|わり] に は、 [安|やす]い。"],
            explanation: "にしては doesn't follow an adjective; [広|ひろ]い[割|わり]に does.",
          },
        ],
      },
    ],
  },
  {
    slug: "wo-hajime",
    title: "Starting with, not least: をはじめ",
    mark: "をはじめ",
    summary: "Name the main or best-known example first, then the whole group.",
    source: "Bunpro, “をはじめ”; JLPT Sensei, “をはじめ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "Noun + **をはじめ** (or **をはじめとして**) names the most important or best-known member of a group first, then the group: “X and others, not least X”, “starting with X”.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + をはじめ", "[京都|きょうと] をはじめ"],
          ["Noun + をはじめとして", "すし をはじめ として"],
          ["Noun + をはじめとする + Noun", "[東京|とうきょう] をはじめ と する [大|おお]きな [町|まち]"],
        ],
      },
      {
        type: "text",
        text: "The noun before をはじめ is the leading example: the highest in rank, the best known, the biggest. The second half names the whole group (みんな, たくさんの, いろいろな, [多|おお]くの) and says something true of all of them. It's formal and fairly written: speeches, guides, the news, thanks at a ceremony. In conversation people say XとかYとか, or Xなど. はじめ is usually written in kana here.",
      },
      {
        type: "examples",
        items: [
          { jp: "[先生|せんせい] {をはじめ}、 クラス の みんな が [応援|おうえん] して くれました。", en: "The whole class cheered me on, our teacher first of all.", alt: "[先生|せんせい] {をはじめ}、 クラス の みんな が [応援|おうえん] して くれた。" },
          { jp: "[京都|きょうと] {をはじめ}、 [日本|にほん] に は [古|ふる]い [町|まち] が たくさん あります。", en: "Japan has many old towns, Kyoto first among them.", alt: "[京都|きょうと] {をはじめ}、 [日本|にほん] に は [古|ふる]い [町|まち] が たくさん ある。" },
          { jp: "すし {をはじめ として}、 [日本|にほん] の [料理|りょうり] は [世界|せかい] で [人気|にんき] が あります。", en: "Japanese food, with sushi in the lead, is popular around the world.", alt: "すし {をはじめ として}、 [日本|にほん] の [料理|りょうり] は [世界|せかい] で [人気|にんき] が ある。" },
          { jp: "[両親|りょうしん] {をはじめ}、 たくさん の [人|ひと] に [助|たす]けて もらいました。", en: "I had help from lots of people, my parents above all.", alt: "[両親|りょうしん] {をはじめ}、 たくさん の [人|ひと] に [助|たす]けて もらった。" },
          { jp: "[東京|とうきょう] {をはじめ と する} [大|おお]きな [町|まち] で は、 [家賃|やちん] が [高|たか]い。", en: "In the big cities, Tokyo above all, rents are high.", alt: "[東京|とうきょう] {をはじめ と する} [大|おお]きな [町|まち] で は、 [家賃|やちん] が [高|たか]い です。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[日本|にほん] {や} [韓国|かんこく] で [人気|にんき] が あります。", en: "It's popular in Japan, Korea and so on." },
        b: { jp: "[日本|にほん] {をはじめ}、 アジア の [多|おお]く の [国|くに] で [人気|にんき] が あります。", en: "It's popular across Asia, in Japan above all." },
        diff: "や just lists a few examples. をはじめ puts Japan first as the leading example and then speaks of the whole group.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not “first, then”",
        text: "✗ まず[郵便局|ゆうびんきょく]をはじめ、[銀行|ぎんこう]に[行|い]きます ✓ まず[郵便局|ゆうびんきょく]に[行|い]って、それから[銀行|ぎんこう]に[行|い]きます. をはじめ isn't about the order things happen in: it names the main member of a group.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[昨日|きのう] の パーティー は どう でした か？", en: "How was yesterday's party?" },
          { speaker: "Mr Mori", jp: "[社長|しゃちょう] {をはじめ}、 [会社|かいしゃ] の [人|ひと] が [五十人|ごじゅうにん] ぐらい [来|き]ました よ。", en: "About fifty people from the company came, the president included." },
          { speaker: "Ms Sato", jp: "それ は にぎやか でした ね。", en: "That must have been lively." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With をはじめ: “This town has all kinds of shops, the department store first among them”: デパート＿、この[町|まち]にはいろいろな[店|みせ]があります。",
            answers: ["をはじめ", "をはじめ として"],
            explanation: "The leading example + をはじめ(として): デパートをはじめ.",
          },
          {
            prompt: "Formal thanks, with をはじめ: “I'm grateful to everyone, my teacher first of all”: [先生|せんせい]＿、みなさんに[感謝|かんしゃ]しています。",
            answers: ["をはじめ", "をはじめ として"],
            explanation: "The most important person comes first: [先生|せんせい]をはじめ, then everyone.",
          },
          {
            prompt: "Fix it: [首相|しゅしょう]をはじめに、[有名|ゆうめい]な[人|ひと]がたくさん[来|き]ました。",
            answers: ["[首相|しゅしょう] を はじめ、 [有名|ゆうめい] な [人|ひと] が たくさん [来|き]ました。", "[首相|しゅしょう] を はじめ として、 [有名|ゆうめい] な [人|ひと] が たくさん [来|き]ました。"],
            explanation: "It is をはじめ (or をはじめとして), not をはじめに.",
          },
          {
            prompt: "Before a noun, formal: “sports such as football, football above all”: サッカー＿スポーツ",
            answers: ["をはじめ と する"],
            explanation: "Before a noun, をはじめとする: サッカーをはじめとするスポーツ.",
          },
        ],
      },
    ],
  },
  {
    slug: "kawari-ni",
    title: "Instead of, in return, on behalf of: かわりに and にかわって",
    mark: "[代|か]わりに",
    summary: "Say what replaces what, what you give in exchange, and who stands in for whom.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (kawari ni); Bunpro, “代わりに” and “に代わって”; JLPT Sensei, “代わりに” and “にかわって”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "**[代|か]わりに** says one thing is done or used in place of another (“instead of”), or given in exchange (“in return for”); a person + **に[代|か]わって** says someone acts in another's place (“on behalf of”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + の + [代|か]わりに", "[父|ちち] の [代|か]わり に"],
          ["Verb, plain + [代|か]わりに", "[車|くるま] を [使|つか]う [代|か]わり に"],
          ["Starting a sentence: その[代|か]わり(に)", "その [代|か]わり"],
          ["Noun (a person) + に[代|か]わって", "[社長|しゃちょう] に [代|か]わって"],
        ],
      },
      {
        type: "text",
        text: "[代|か]わり is a noun: a substitute. Noun + の[代|か]わりに: X is replaced by something else. Verb + [代|か]わりに has two readings: “instead of doing” ([車|くるま]を[使|つか]う[代|か]わりに[自転車|じてんしゃ]で: by bike instead of by car) and “in return for doing” (I'll cook, and in return you…). At the start of a sentence, その[代|か]わり(に) is “but in return”. On its own, [代|か]わりに is “instead”: [私|わたし]が[代|か]わりに[行|い]く (I'll go instead).",
      },
      {
        type: "text",
        text: "に[代|か]わって comes from the verb [代|か]わる (to take someone's place). It follows a person, and sounds more formal, as in speeches and announcements; it's also used for something new taking over from something old in general ([手紙|てがみ]に[代|か]わってメール). For a simple swap of things on one occasion, say の[代|か]わりに.",
      },
      { type: "heading", text: "[代|か]わりに: instead of, in return" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は ご[飯|はん] の {[代|か]わり に} パン を [食|た]べた。", en: "Today I had bread instead of rice.", alt: "[今日|きょう] は ご[飯|はん] の {[代|か]わり に} パン を [食|た]べました。" },
          { jp: "[車|くるま] を [使|つか]う {[代|か]わり に}、 [自転車|じてんしゃ] で [通|かよ]う こと に しました。", en: "I've decided to cycle to work instead of using the car.", alt: "[車|くるま] を [使|つか]う {[代|か]わり に}、 [自転車|じてんしゃ] で [通|かよ]う こと に した。" },
          { jp: "[料理|りょうり] は [私|わたし] が [作|つく]る {[代|か]わり に}、 [片付|かたづ]け を して くれない？", en: "I'll cook, so in return could you clear up?", alt: "[料理|りょうり] は [私|わたし] が [作|つく]る {[代|か]わり に}、 [片付|かたづ]け を して くれません か？" },
          { jp: "[英語|えいご] を [教|おし]える {[代|か]わり に}、 [日本語|にほんご] を [教|おし]えて もらって います。", en: "In return for teaching English, I'm getting taught Japanese.", alt: "[英語|えいご] を [教|おし]える {[代|か]わり に}、 [日本語|にほんご] を [教|おし]えて もらって いる。" },
          {
            jp: "[給料|きゅうりょう] は いい です。 その {[代|か]わり}、 [休|やす]み が [少|すく]ない です。",
            en: "The pay is good. On the other hand, you don't get much time off.",
            alt: "[給料|きゅうりょう] は いい。 その {[代|か]わり}、 [休|やす]み が [少|すく]ない。",
            note: "その[代|か]わり(に) at the start of a sentence: “but in return”, the price you pay for the good part.",
          },
        ],
      },
      { type: "heading", text: "に[代|か]わって: on behalf of, in place of" },
      {
        type: "examples",
        items: [
          { jp: "[部長|ぶちょう] {に [代|か]わって}、 [私|わたし] が [説明|せつめい] します。", en: "I'll explain on the manager's behalf." },
          { jp: "[病気|びょうき] の [母|はは] {に [代|か]わって}、 [姉|あね] が [料理|りょうり] を して います。", en: "My sister is doing the cooking in place of our mother, who's ill.", alt: "[病気|びょうき] の [母|はは] {に [代|か]わって}、 [姉|あね] が [料理|りょうり] を して いる。" },
          { jp: "[最近|さいきん] は、 [手紙|てがみ] {に [代|か]わって} メール で [連絡|れんらく] する [人|ひと] が [多|おお]い。", en: "These days most people keep in touch by email instead of by letter.", alt: "[最近|さいきん] は、 [手紙|てがみ] {に [代|か]わって} メール で [連絡|れんらく] する [人|ひと] が [多|おお]い です。" },
          { jp: "[今日|きょう] は [山田|やまだ]-[先生|せんせい] {に [代|か]わって}、 [私|わたし] が [授業|じゅぎょう] を します。", en: "Today I'll be teaching the class in place of Yamada-sensei." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[父|ちち] {の [代|か]わり に}、 [私|わたし] が [挨拶|あいさつ] を しました。", en: "I gave the speech instead of my father." },
        b: { jp: "[父|ちち] {に [代|か]わって}、 [私|わたし] が [挨拶|あいさつ] を しました。", en: "I gave the speech on my father's behalf." },
        diff: "Nearly the same. の[代|か]わりに is everyday; に[代|か]わって sounds formal, the way you'd put it in the speech itself.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Swapping things: の[代|か]わりに",
        text: "✗ ご[飯|はん]に[代|か]わって、パンを[食|た]べた (odd for a swap of things) ✓ ご[飯|はん]の[代|か]わりに、パンを[食|た]べた. に[代|か]わって is for a person standing in, or a new thing taking over in general; a one-off swap of things takes の[代|か]わりに. And a noun needs の: ✗ ご[飯|はん][代|か]わりに.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[明日|あした] の [授業|じゅぎょう]、 [休|やす]む ん だ。 ノート、 [見|み]せて くれる？", en: "I'm missing class tomorrow. Will you show me your notes?" },
          { speaker: "Kenta", jp: "いい よ。 その {[代|か]わり}、 [今度|こんど] [昼|ひる]ご[飯|はん] おごって ね。", en: "Sure. In return, buy me lunch some time." },
          { speaker: "Aya", jp: "わかった。 [約束|やくそく] する。", en: "Deal. I promise." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With [代|か]わりに: “I drank tea instead of coffee”: コーヒー＿、お[茶|ちゃ]を[飲|の]んだ。",
            answers: ["の [代|か]わり に"],
            explanation: "A noun takes の: コーヒーの[代|か]わりに.",
          },
          {
            prompt: "With [代|か]わりに (use [行|い]く): “Instead of going to the gym, I run in the park”: ジムに＿、[公園|こうえん]で[走|はし]っています。",
            answers: ["[行|い]く [代|か]わり に"],
            explanation: "A plain verb goes straight before [代|か]わりに: [行|い]く[代|か]わりに.",
          },
          {
            prompt: "Formal, with に[代|か]わって: “I'll speak on behalf of the president”: [社長|しゃちょう]＿、[私|わたし]が[話|はな]します。",
            answers: ["に [代|か]わって"],
            explanation: "Standing in for a person, formally: [社長|しゃちょう]に[代|か]わって.",
          },
          {
            prompt: "Fix it (a swap of things): ペンに[代|か]わって、[鉛筆|えんぴつ]で[書|か]いた。",
            answers: ["ペン の [代|か]わり に、 [鉛筆|えんぴつ] で [書|か]いた。"],
            explanation: "A one-off swap of things takes の[代|か]わりに: ペンの[代|か]わりに.",
          },
        ],
      },
    ],
  },
  {
    slug: "tte",
    title: "Casual って: as for, and quoting",
    mark: "って",
    summary: "Bring up a topic with って, ask what something is, and pass on what someone said.",
    source: "Tae Kim, Guide to Japanese Grammar (casual quotes and topics with って); Bunpro, “って” (slang)",
    register: "plain",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "Bunpro's casual って; not on JLPT Sensei's N3 list."),
    blocks: [
      {
        type: "idea",
        text: "In casual speech **って** does two jobs: after a noun it brings up what you're talking about, like は (“X, you know …”, “what's X?”), and after what someone said it quotes, like と or という, often with [言|い]う left out.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Use", "Example"],
        rows: [
          ["Topic: Noun + って", "[日本|にほん] の [夏|なつ] って"],
          ["Topic: Verb, plain + の + って", "[一人|ひとり] で [旅行|りょこう] する の って"],
          ["What is it? Noun + って + [何|なに]", "これ って [何|なに]"],
          ["Quote: plain form + って + [言|い]う", "[来|こ]ない って [言|い]ってた"],
          ["Quote, [言|い]う left out", "[来|こ]ない って"],
        ],
      },
      {
        type: "text",
        text: "As a topic, って is like は, but casual, and it often carries curiosity or feeling: about something you've heard of but don't know well, or something you want to comment on ([日本|にほん]の[夏|なつ]って[暑|あつ]いね). A verb is turned into a noun first with の: [旅行|りょこう]するのって[楽|たの]しい. Xって[何|なに]？ is the usual casual way to ask what a word or thing is.",
      },
      {
        type: "text",
        text: "As a quote, って is the casual と (って[言|い]ってた, っていう: you met these with と[言|い]う). Very often [言|い]う is dropped and って ends the sentence: [来|こ]ないって。 (He says he isn't coming.) って is speech and chat. Polite speech does use it (Xって[何|なん]ですか？), but in writing, an email to a teacher or an interview, use は and と(いう).",
      },
      { type: "link", href: "/learn/n4-seeming/to-iu", label: "Said, called, the fact that: という", text: "Quoting with と and って[言|い]う." },
      { type: "heading", text: "って as the topic" },
      {
        type: "examples",
        items: [
          { jp: "[日本|にほん] の [夏|なつ] {って}、 [本当|ほんとう] に [暑|あつ]い ね。", en: "Summers in Japan are really hot, aren't they?" },
          { jp: "[田中|たなか]-さん {って}、 どんな [人|ひと]？", en: "What's Tanaka-san like?" },
          { jp: "「[空気|くうき] を [読|よ]む」 {って}、 どういう [意味|いみ]？", en: "What does “reading the air” mean?" },
          { jp: "[一人|ひとり] で [旅行|りょこう] する の {って}、 [楽|たの]しい よ。", en: "Travelling on your own is fun, you know.", note: "After a verb, の + って." },
          { jp: "[彼|かれ] {って}、 いつも [遅|おく]れて くる よね。", en: "He's always late, isn't he?" },
        ],
      },
      { type: "heading", text: "って as a quote" },
      {
        type: "examples",
        items: [
          { jp: "[山田|やまだ]-さん、 [今日|きょう] は [来|こ]られない {って}。", en: "Yamada-san says she can't make it today." },
          { jp: "[母|はは] が [早|はや]く [帰|かえ]りなさい {って [言|い]ってた}。", en: "Mum said to come home early." },
          { jp: "[店|みせ] の [人|ひと] に [聞|き]いたら、 もう ない {って}。", en: "I asked the shop staff, and they said there are none left." },
          { jp: "「ありがとう」 {って} [伝|つた]えて ね。", en: "Tell her I said thanks." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[東京|とうきょう] {は}、 [家賃|やちん] が [高|たか]い。", en: "In Tokyo, rents are high." },
        b: { jp: "[東京|とうきょう] {って}、 [家賃|やちん] が [高|たか]い。", en: "Tokyo, you know, rents are high there." },
        diff: "は states it plainly. って sounds chattier, as if Tokyo has just come up and you're sharing your impression.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not in writing",
        text: "✗ (in a report) [東京|とうきょう]って[人口|じんこう]が[多|おお]い ✓ [東京|とうきょう]は[人口|じんこう]が[多|おお]い. って belongs to speech and chat messages. In an essay, an email to a teacher or a job interview, use は and と(いう).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[週末|しゅうまつ] の キャンプ {って}、 [何時|なんじ] に [出発|しゅっぱつ]？", en: "The camping trip at the weekend: what time are we leaving?" },
          { speaker: "Kenta", jp: "[森|もり]-さん が [七時|しちじ] {って [言|い]ってた} よ。", en: "Mori-san said seven." },
          { speaker: "Aya", jp: "[早|はや]い ね。 [雨|あめ] でも [行|い]く の？", en: "That's early. Are we going even if it rains?" },
          { speaker: "Kenta", jp: "[少|すこ]し なら [大丈夫|だいじょうぶ] だ {って}。", en: "He says a bit of rain is fine." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, asking what something is: “What's a ‘kotatsu’?”: 「こたつ」＿？",
            answers: ["って [何|なに]", "って [何|なん] な の"],
            explanation: "Xって[何|なに]？ is the casual “what's X?”.",
          },
          {
            prompt: "Casual, quoting with just って (use [来|く]る): “Kenta says he's coming late”: [健太|けんた]、[遅|おそ]く＿。",
            answers: ["[来|く]る って"],
            explanation: "The quote + って, with [言|い]ってた left out: [遅|おそ]く[来|く]るって.",
          },
          {
            prompt: "Casual, with って as the topic: “Is Kyoto cold in winter too?”: [京都|きょうと]＿、[冬|ふゆ]も[寒|さむ]い？",
            answers: ["って"],
            explanation: "Bringing up a topic casually: [京都|きょうと]って.",
          },
          {
            prompt: "Casual, quoting with って: “My sister said she'd lost her phone”: [姉|あね]が[携帯|けいたい]をなくした＿。",
            answers: ["って", "って [言|い]って いた", "って [言|い]った"],
            explanation: "The quote + って, with or without [言|い]ってた: なくしたって([言|い]ってた).",
          },
          {
            prompt: "Polite, without って (an email to a teacher): [明日|あした]のテストって[何時|なんじ]からですか？",
            answers: [
              "[明日|あした] の テスト は [何時|なんじ] から です か？",
              "[明日|あした] の テスト は [何時|なんじ] から でしょう か？",
              "[明日|あした] の テスト は [何時|なんじ] から に なります か？",
            ],
            explanation: "In writing to a teacher, the topic takes は: テストは.",
          },
        ],
      },
    ],
  },
  {
    slug: "n-datte",
    title: "I heard: んだって and ということだ",
    mark: "んだって",
    summary: "Pass on news casually with んだって, and formally with ということだ.",
    source: "Bunpro, “んだって” and “ということだ”; JLPT Sensei, “んだって” and “ということだ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "In casual speech, a plain form + **んだって** passes on something you heard (“apparently”, “I heard”); a plain form + **ということだ** does the same in a formal or written way (“I'm told”, “it's said that”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb or い-adjective, plain + んだって", "[来|く]る ん だって"],
          ["Noun or な-adjective + なんだって", "[雪|ゆき] なん だって"],
          ["Noun or な-adjective + だって", "[医者|いしゃ] だって"],
          ["Plain form + ということだ (nouns keep だ)", "[休|やす]み だ と いう こと だ"],
        ],
      },
      {
        type: "text",
        text: "んだって is the explanatory ん + だ + the quoting って: “it's that …, they say”. It's for friends and family. A noun or な-adjective takes なん ([雪|ゆき]なんだって), or drops it ([医者|いしゃ]だって). With a rising voice it checks what you were told: …んだって？ (Is it true that …?)",
      },
      {
        type: "text",
        text: "そうだ (the “I hear” lesson) is neutral: fine in polite speech and in writing ([雪|ゆき]だそうです). ということだ is stiffer and more written than そうだ: the news, announcements, passing on a message at work, often with によると. The tense goes in the sentence before it; ということでした passes on a message you were given. In the to-iu lesson, ということ meant “so that means”; here it reports what was said.",
      },
      { type: "link", href: "/learn/n4-seeming/sou-hearsay", label: "I hear that: そうだ", text: "The neutral way to pass on news." },
      { type: "heading", text: "んだって: apparently (casual)" },
      {
        type: "examples",
        items: [
          { jp: "[山田|やまだ]-さん、 [来月|らいげつ] [会社|かいしゃ] を [辞|や]める {ん だって}。", en: "Apparently Yamada-san is leaving the company next month." },
          { jp: "あの [映画|えいが]、 すごく [怖|こわ]い {ん だって}。", en: "I heard that film is really scary." },
          { jp: "[明日|あした] は [雪|ゆき] {なん だって}。", en: "Apparently it's going to snow tomorrow." },
          { jp: "[駅前|えきまえ] の パン[屋|や]、 [先週|せんしゅう] [閉|し]まった {ん だって}。", en: "I heard the bakery by the station closed down last week." },
          { jp: "[佐藤|さとう]-さん の お[兄|にい]さん、 [医者|いしゃ] {だって}。", en: "Sato-san's big brother is a doctor, apparently.", note: "After a noun, なん may drop." },
        ],
      },
      { type: "heading", text: "ということだ: I'm told (formal)" },
      {
        type: "examples",
        items: [
          { jp: "[天気予報|てんきよほう] によると、 [明日|あした] は [晴|は]れる {と いう こと です}。", en: "According to the forecast, it's going to be fine tomorrow." },
          { jp: "[部長|ぶちょう] は [今日|きょう] [休|やす]み だ {と いう こと です}。", en: "I'm told the manager is off today." },
          { jp: "[事故|じこ] の ため、 [電車|でんしゃ] が [遅|おく]れて いる {と いう こと です}。", en: "We're told the trains are delayed because of an accident." },
          { jp: "[田中|たなか]-さん から [電話|でんわ] が あって、 [少|すこ]し [遅|おく]れる {と いう こと でした}。", en: "Tanaka-san called to say she'd be a little late." },
          { jp: "ニュース によると、 [今年|ことし] の [冬|ふゆ] は [寒|さむ]く なる {と いう こと だ}。", en: "According to the news, this winter is going to be cold." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] は [休|やす]み {なん だって}。", en: "Apparently tomorrow's a day off." },
        b: { jp: "[明日|あした] は [休|やす]み {だ と いう こと です}。", en: "I'm told tomorrow is a day off." },
        diff: "The same news. (a) is what you'd tell a friend; (b) is how you'd pass it on at work or in an announcement.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Nouns take なん",
        text: "✗ [明日|あした]は[雨|あめ]んだって ✓ [明日|あした]は[雨|あめ]なんだって (or [雨|あめ]だって). A noun or な-adjective needs なん before んだって, as before んです. And to your boss, say そうです or ということです, not んだって.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "ねえ、 [聞|き]いた？ [来週|らいしゅう] の テスト、 [中止|ちゅうし] に なった {ん だって}。", en: "Hey, did you hear? Apparently next week's test has been cancelled." },
          { speaker: "Aya", jp: "え、 ほんと？ [誰|だれ] から [聞|き]いた の？", en: "What, really? Who told you?" },
          { speaker: "Kenta", jp: "[森|もり]-さん。 [先生|せんせい] が [病気|びょうき] {なん だって}。", en: "Mori-san. Apparently the teacher's ill." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with んだって (use [引|ひ]っ[越|こ]す): “Apparently Mori-san is moving next month”: [森|もり]さん、[来月|らいげつ]＿。",
            answers: ["[引|ひ]っ[越|こ]す ん だって"],
            explanation: "A plain verb + んだって: [引|ひ]っ[越|こ]すんだって.",
          },
          {
            prompt: "Casual, with だって, after a noun: “I heard the party is on Saturday”: パーティーは[土曜日|どようび]＿。",
            answers: ["なん だって", "だって"],
            explanation: "A noun takes なんだって, or just だって.",
          },
          {
            prompt: "Polite, passing on a message, with ということ: “I'm told the meeting has been changed to three o'clock”: [会議|かいぎ]は[三時|さんじ]からに[変|か]わった＿。",
            answers: ["と いう こと です", "と いう こと でした"],
            explanation: "A formal message passed on: …[変|か]わったということです (ということでした for a message you were given).",
          },
          {
            prompt: "Fix it (casual, “I heard it's quiet there”): あそこは[静|しず]かんだって。",
            answers: ["あそこ は [静|しず]か なん だって。", "あそこ は [静|しず]か だって。"],
            explanation: "A な-adjective needs なん: [静|しず]かなんだって.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-iu-no-wa",
    title: "X means, and the reason is: というのは",
    mark: "というのは",
    summary: "Pick out a word or idea to explain it, and give the reason for what you just said.",
    source: "Bunpro, “というのは”; JLPT Sensei, “というのは”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "X + **というのは** (casually **っていうのは**) picks out a word or idea to explain it: “X means …”, ending in **〜のことだ** or **〜という[意味|いみ]だ**; at the start of a sentence, **というのは、〜からだ** gives the reason for what you've just said (“That's because …”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Use", "Example"],
        rows: [
          ["Naming what it is: X というのは … のことだ", "[花見|はなみ] と いう の は … の こと だ"],
          ["Giving the meaning: X というのは … という[意味|いみ]だ", "[禁煙|きんえん] と いう の は … と いう [意味|いみ] だ"],
          ["Casual: X っていうのは", "[友達|ともだち] って いう の は"],
          ["The reason: …。というのは、… からだ", "と いう の は、 [雨|あめ] が [降|ふ]った から だ"],
        ],
      },
      {
        type: "text",
        text: "In a definition, というのは marks the word being explained, like a heading. End with のこと(だ) to name what the word refers to, with という[意味|いみ](だ) to give its meaning as a sentence, or with a verb + こと(だ) for an activity. Casually, っていうのは, or just って (the casual って lesson).",
      },
      {
        type: "text",
        text: "As a connector at the start of a sentence, というのは explains what was just said, often something surprising, and the sentence ends in から(だ) or んです. It's a little formal; among friends, だって (because) or なんでかというと do the same job. というのも and (more formally) なぜなら do the same job too.",
      },
      { type: "heading", text: "というのは: X means" },
      {
        type: "examples",
        items: [
          { jp: "「[花見|はなみ]」 {と いう の} は、 [桜|さくら] を [見|み] ながら [食|た]べたり [飲|の]んだり する こと です。", en: "“Hanami” means eating and drinking while you look at the cherry blossom.", alt: "「[花見|はなみ]」 {って いう の} は、 [桜|さくら] を [見|み] ながら [食|た]べたり [飲|の]んだり する こと だ よ。" },
          { jp: "「[禁煙|きんえん]」 {と いう の} は、 たばこ を [吸|す]って は いけない と いう [意味|いみ] です。", en: "“Kin'en” means you mustn't smoke." },
          { jp: "[部長|ぶちょう] の 「[検討|けんとう] します」 {って いう の} は、 たぶん 「だめ」 と いう [意味|いみ] だ よ。", en: "When the manager says “I'll consider it”, it probably means “no”.", alt: "[部長|ぶちょう] の 「[検討|けんとう] します」 {と いう の} は、 たぶん 「だめ」 と いう [意味|いみ] です よ。" },
          { jp: "[友達|ともだち] {って いう の} は、 [困|こま]った とき に [助|たす]けて くれる [人|ひと] の こと だ と [思|おも]う。", en: "A friend, I think, is someone who helps you when you're in trouble.", alt: "[友達|ともだち] {と いう の} は、 [困|こま]った とき に [助|たす]けて くれる [人|ひと] の こと だ と [思|おも]います。" },
        ],
      },
      { type: "heading", text: "というのは、〜からだ: that's because" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [行|い]けません。 {と いう の は}、 [母|はは] が [入院|にゅういん] する から です。", en: "I can't come tomorrow. That's because my mother is going into hospital." },
          { jp: "この [店|みせ] は いつも [混|こ]んで います。 {と いう の は}、 [安|やす]くて おいしい から です。", en: "This place is always packed. That's because it's cheap and good." },
          { jp: "[彼|かれ] は [最近|さいきん] [元気|げんき] が ない。 {と いう の は}、 [試験|しけん] に [落|お]ちた から だ。", en: "He's been down lately. It's because he failed his exam." },
          { jp: "[今日|きょう] は [早|はや]く [帰|かえ]ります。 {と いう の は}、 [友達|ともだち] が [来|く]る から です。", en: "I'm going home early today. That's because a friend is coming." },
        ],
      },
      {
        type: "pair",
        a: { jp: "「[本日|ほんじつ] [休業|きゅうぎょう]」 と いう の は、 [今日|きょう] は [休|やす]み {と いう [意味|いみ]} です。", en: "“Honjitsu kyuugyou” means they're closed today." },
        b: { jp: "「[駅前|えきまえ]」 と いう の は、 [駅|えき] の [前|まえ] の [辺|あた]り {の こと} です。", en: "“Ekimae” is the area in front of the station." },
        diff: "Two different words on purpose, to show the two endings. という[意味|いみ] gives the meaning as a sentence (they're closed); のこと names the thing the word refers to (an area).",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Finish the definition",
        text: "✗ 「[禁煙|きんえん]」というのは、たばこを[吸|す]ってはいけないです ✓ …[吸|す]ってはいけないという[意味|いみ]です. After というのは, say what kind of answer you're giving: という[意味|いみ]だ (a meaning) or のことだ (a thing).",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "すみません、 「[飲|の]み[会|かい]」 {と いう の} は [何|なん] です か？", en: "Excuse me, what's a “nomikai”?" },
          { speaker: "Ms Sato", jp: "[会社|かいしゃ] の [人|ひと] と お[酒|さけ] を [飲|の]み に [行|い]く こと です よ。", en: "It's going out drinking with people from work." },
          { speaker: "Mr Mori", jp: "あ、 そう なん です か。", en: "Oh, I see." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with というのは: “‘Ekiben’ means the boxed lunches sold at stations”: 「[駅弁|えきべん]」＿、[駅|えき]で[売|う]っているお[弁当|べんとう]のことです。",
            answers: ["と いう の は"],
            explanation: "The word being explained + というのは.",
          },
          {
            prompt: "Polite, ending in のこと, naming who it is: “A ‘senpai’ is someone who joined your school or company before you”: 「[先輩|せんぱい]」というのは、[学校|がっこう]や[会社|かいしゃ]に[先|さき]に[入|はい]った[人|ひと]＿。",
            answers: ["の こと です"],
            explanation: "Naming who the word refers to: [人|ひと]のことです.",
          },
          {
            prompt: "Polite, giving the meaning with [意味|いみ]: “‘Muryou’ means you don't need any money”: 「[無料|むりょう]」というのは、お[金|かね]がいらない＿。",
            answers: ["と いう [意味|いみ] です"],
            explanation: "A meaning given as a sentence: いらないという[意味|いみ]です.",
          },
          {
            prompt: "Giving the reason, with というのは: “I'm not drinking tonight. That's because I came by car”: [今夜|こんや]はお[酒|さけ]を[飲|の]みません。＿、[車|くるま]で[来|き]たからです。",
            answers: ["と いう の は"],
            explanation: "というのは at the start of a sentence, ending in からです.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-ieba",
    title: "Speaking of: といえば and というと",
    mark: "といえば",
    summary: "Pick up a topic and say what it brings to mind, or check what someone means.",
    source: "Makino & Tsutsui, Dictionary of Intermediate Japanese Grammar (to ieba); Bunpro, “といえば”; JLPT Sensei, “と言えば” and “と言うと”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "X + **といえば** picks up a topic, one someone has just mentioned or one you name, and says what it brings to mind: “speaking of X”, “when you think of X, it's …”; **というと** is close, and also checks what someone means.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + といえば", "[夏|なつ] と いえば"],
          ["Noun + というと", "[京都|きょうと] と いう と"],
          ["Checking: 「X」 + というと、〜ですか", "「[田中|たなか]-さん」 と いう と"],
        ],
      },
      {
        type: "text",
        text: "Both are written in kana here. といえば has two common uses: naming the typical example ([日本|にほん]の[夏|なつ]といえば[花火|はなび]: “summer in Japan means fireworks”), and picking up a word someone just said to move on to something about it (“speaking of trips, …”). A noun goes straight before it, with no だ.",
      },
      {
        type: "text",
        text: "というと also brings up what something calls to mind, but it's especially common for checking: 「[田中|たなか]さん」というと、[営業|えいぎょう]の[田中|たなか]さんですか？ (“When you say Tanaka-san, do you mean …?”). The set phrase そういえば (“that reminds me”, “now you mention it”) comes from といえば.",
      },
      { type: "heading", text: "といえば: speaking of" },
      {
        type: "examples",
        items: [
          { jp: "[日本|にほん] の [夏|なつ] と {いえば}、 [花火|はなび] です よね。", en: "Summer in Japan means fireworks, doesn't it?", alt: "[日本|にほん] の [夏|なつ] と {いえば}、 [花火|はなび] だ よね。" },
          { jp: "[北海道|ほっかいどう] と {いえば}、 やっぱり [雪|ゆき] と ラーメン だ。", en: "When you think of Hokkaido, it has to be snow and ramen.", alt: "[北海道|ほっかいどう] と {いえば}、 やっぱり [雪|ゆき] と ラーメン です。" },
          { jp: "[旅行|りょこう] と {いえば}、 [来月|らいげつ] の [連休|れんきゅう] は どこ か [行|い]く？", en: "Speaking of trips, are you going anywhere over next month's long weekend?", alt: "[旅行|りょこう] と {いえば}、 [来月|らいげつ] の [連休|れんきゅう] は どこ か [行|い]きます か？" },
          { jp: "[猫|ねこ] と {いえば}、 [田中|たなか]-さん の [家|いえ] の [猫|ねこ]、 [元気|げんき] です か？", en: "Speaking of cats, how's Tanaka-san's cat doing?", alt: "[猫|ねこ] と {いえば}、 [田中|たなか]-さん の [家|いえ] の [猫|ねこ]、 [元気|げんき]？" },
        ],
      },
      { type: "heading", text: "というと: when you say, when it comes to" },
      {
        type: "examples",
        items: [
          { jp: "[京都|きょうと] と {いう と}、 [古|ふる]い お[寺|てら] の イメージ が あります。", en: "Kyoto makes me think of old temples.", alt: "[京都|きょうと] と {いう と}、 [古|ふる]い お[寺|てら] の イメージ が ある。" },
          { jp: "「[田中|たなか]-さん」 と {いう と}、 [営業|えいぎょう] の [田中|たなか]-さん です か？", en: "When you say “Tanaka-san”, do you mean Tanaka-san in sales?", alt: "「[田中|たなか]-さん」 って {いう と}、 [営業|えいぎょう] の [田中|たなか]-さん？" },
          { jp: "[来週|らいしゅう] の [金曜日|きんようび] と {いう と}、 [十日|とおか] です ね。", en: "Next Friday, you say? That's the tenth, then.", alt: "[来週|らいしゅう] の [金曜日|きんようび] と {いう と}、 [十日|とおか] だ ね。" },
          { jp: "[春|はる] と {いう と}、 やっぱり [桜|さくら] です ね。", en: "When it comes to spring, it has to be cherry blossom.", alt: "[春|はる] と {いう と}、 やっぱり [桜|さくら] だ ね。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山田|やまだ]-さん と {いえば}、 [最近|さいきん] [見|み]ません ね。", en: "Speaking of Yamada-san, I haven't seen her lately." },
        b: { jp: "[山田|やまだ]-さん と {いう と}、 [隣|となり] の [部屋|へや] の [山田|やまだ]-さん です か？", en: "When you say Yamada-san, do you mean the Yamada-san next door?" },
        diff: "(a) picks up the name to say something new about her. (b) checks which Yamada-san is meant, the job というと does best.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だ before といえば",
        text: "✗ [冬|ふゆ]だといえば、スキーだよね ✓ [冬|ふゆ]といえば、スキーだよね. A noun goes straight before といえば and というと. And it's と, the quoting particle: ✗ [冬|ふゆ]にいえば.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[来週|らいしゅう]、 [大阪|おおさか] に [出張|しゅっちょう] なん だ。", en: "I'm off to Osaka on business next week." },
          { speaker: "Aya", jp: "[大阪|おおさか] と {いえば}、 [食|た]べ[物|もの] が おいしい よね。 お[土産|みやげ]、 よろしく！", en: "Speaking of Osaka, the food's so good there. Bring me something back!" },
          { speaker: "Kenta", jp: "[仕事|しごと] だ よ… でも、 [時間|じかん] が あったら [買|か]って くる よ。", en: "It's for work… But if I have time, I'll get you something." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "With といえば: “When you think of Japanese food, it's sushi”: [日本|にほん]の[料理|りょうり]＿、すしだ。",
            answers: ["と いえば"],
            explanation: "The topic + といえば, then the typical example.",
          },
          {
            prompt: "Polite, with というと, checking what's meant: “When you say ‘the shop by the station’, do you mean the bakery?”: 「[駅前|えきまえ]の[店|みせ]」＿、パン[屋|や]のことですか？",
            answers: ["と いう と"],
            explanation: "Checking what someone means: …というと、…のことですか？",
          },
          {
            prompt: "Casual, picking up what was just said: A: [昨日|きのう]、[山|やま]に[登|のぼ]ったんだ。 B: [山|やま]＿、[今度|こんど][一緒|いっしょ]に[行|い]かない？",
            answers: ["と いえば", "と いう と"],
            explanation: "B picks up the word [山|やま] and moves on: [山|やま]といえば (or というと).",
          },
          {
            prompt: "Fix it: [冬|ふゆ]だといえば、スキーだよね。",
            answers: ["[冬|ふゆ] と いえば、 スキー だ よね。", "[冬|ふゆ] と いう と、 スキー だ よね。"],
            explanation: "A noun goes straight before といえば: [冬|ふゆ]といえば.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-iu-yori",
    title: "B rather than A: というより and むしろ",
    mark: "というより",
    summary: "Swap a word for a truer one, and point to what is, if anything, the case.",
    source: "Bunpro, “というより” and “むしろ”; JLPT Sensei, “というより” and “むしろ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3"),
    blocks: [
      {
        type: "idea",
        text: "A + **というより** B says B describes it better than A: “not so much A as B”, and **むしろ** (“rather, if anything”) points to the side that is truer or better, often against what you'd expect.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Noun + というより", "[先生|せんせい] と いう より"],
          ["い-adjective + というより", "[涼|すず]しい と いう より"],
          ["な-adjective + というより", "[丁寧|ていねい] と いう より"],
          ["Verb, plain + というより", "[寝|ね]た と いう より"],
          ["A よりむしろ B", "[疲|つか]れる より むしろ"],
        ],
      },
      {
        type: "text",
        text: "というより corrects a word, or reaches for a more exact one: the truer word comes second. Nouns and な-adjectives go straight before it, usually without だ. It's common in speech and writing; っていうか is a looser “or rather” heard in casual speech.",
      },
      {
        type: "text",
        text: "むしろ is an adverb that leans towards the other side of an expectation: “I don't mind rainy days. If anything, I like them.” It often pairs with というより or より: AというよりむしろB, AよりむしろB(のほうが). It's written in kana.",
      },
      { type: "heading", text: "というより: not so much A as B" },
      {
        type: "examples",
        items: [
          { jp: "[彼|かれ] は [先生|せんせい] {と いう より}、 [友達|ともだち] みたい な [人|ひと] です。", en: "He's less a teacher than a kind of friend.", alt: "[彼|かれ] は [先生|せんせい] {と いう より}、 [友達|ともだち] みたい な [人|ひと] だ。" },
          { jp: "[今日|きょう] は [涼|すず]しい {と いう より}、 [寒|さむ]い ね。", en: "It's not so much cool today as cold.", alt: "[今日|きょう] は [涼|すず]しい {と いう より}、 [寒|さむ]い です ね。" },
          { jp: "[彼女|かのじょ] の [話|はな]し[方|かた] は [丁寧|ていねい] {と いう より}、 [冷|つめ]たい [感|かん]じ が した。", en: "The way she spoke felt less polite than cold.", alt: "[彼女|かのじょ] の [話|はな]し[方|かた] は [丁寧|ていねい] {と いう より}、 [冷|つめ]たい [感|かん]じ が しました。" },
          { jp: "[姉|あね] は [料理|りょうり] が [好|す]き {と いう より}、 [食|た]べる の が [好|す]き なん です。", en: "My sister doesn't like cooking so much as eating.", alt: "[姉|あね] は [料理|りょうり] が [好|す]き {と いう より}、 [食|た]べる の が [好|す]き なん だ。" },
          { jp: "[今|いま] の [仕事|しごと] は、 [仕事|しごと] {と いう より} [趣味|しゅみ] です。", en: "My job now is less work than a hobby.", alt: "[今|いま] の [仕事|しごと] は、 [仕事|しごと] {と いう より} [趣味|しゅみ] だ ね。" },
        ],
      },
      { type: "heading", text: "むしろ: rather, if anything" },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] の [日|ひ] は [嫌|きら]い じゃ ありません。 {むしろ} [好|す]き です。", en: "I don't mind rainy days. If anything, I like them.", alt: "[雨|あめ] の [日|ひ] は [嫌|きら]い じゃ ない。 {むしろ} [好|す]き だ よ。" },
          { jp: "[運動|うんどう] した [後|あと] は、 [疲|つか]れる より {むしろ} [元気|げんき] に なります。", en: "After exercise, I feel, if anything, more lively than tired.", needsReview: "Natural with a verb before より むしろ, or would 疲れるというより, むしろ be the usual way to say it?", alt: "[運動|うんどう] した [後|あと] は、 [疲|つか]れる より {むしろ} [元気|げんき] に なる。" },
          { jp: "この [映画|えいが] は [子供|こども] より {むしろ} [大人|おとな] に [見|み]て ほしい。", en: "I'd like adults to see this film, rather than children.", alt: "この [映画|えいが] は [子供|こども] より {むしろ} [大人|おとな] に [見|み]て ほしい です。" },
          { jp: "[電車|でんしゃ] が [遅|おく]れる なら、 {むしろ} [歩|ある]いた ほう が [早|はや]い。", en: "If the train's going to be late, I'd actually be quicker walking.", alt: "[電車|でんしゃ] が [遅|おく]れる なら、 {むしろ} [歩|ある]いた ほう が [早|はや]い です。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[静|しず]か {と いう より}、 [寂|さび]しい [町|まち] だ。", en: "It's not so much a quiet town as a lonely one." },
        b: { jp: "[静|しず]か {だ けど}、 [寂|さび]しい [町|まち] だ。", en: "It's a quiet town, but a lonely one." },
        diff: "というより swaps “quiet” for a truer word. けど keeps both: it's quiet, and it's also lonely.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The truer word goes second",
        text: "✗ [寒|さむ]いというより[涼|すず]しい (says something else, “not so much cold as cool”; wrong for “it's not just cool, it's cold”) ✓ [涼|すず]しいというより[寒|さむ]い. What comes before というより is the word you're setting aside; what comes after is the one you mean.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[森|もり]-さん は [料理|りょうり] が [上手|じょうず] です ね。", en: "You're a good cook, Mori-san." },
          { speaker: "Mr Mori", jp: "[上手|じょうず] {と いう より}、 [好|す]き な だけ です よ。", en: "I'm not so much good at it as just keen on it." },
          { speaker: "Ms Sato", jp: "[好|す]き なら、 それ が [一番|いちばん] です よ。", en: "If you enjoy it, that's what matters most." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with というより: “She's less a colleague than a friend”: [彼女|かのじょ]は[同僚|どうりょう]＿、[友達|ともだち]です。",
            answers: ["と いう より", "と いう より も"],
            explanation: "The word set aside + というより, then the truer one.",
          },
          {
            prompt: "With というより (use [面白|おもしろ]い): “The film wasn't so much funny as strange”: その[映画|えいが]は＿、[変|へん]だった。",
            answers: ["[面白|おもしろ]い と いう より", "[面白|おもしろ]い と いう より も", "[面白|おもしろ]かった と いう より", "[面白|おもしろ]かった と いう より も"],
            explanation: "An い-adjective goes straight before というより.",
          },
          {
            prompt: "With むしろ: “I took the medicine, but if anything I got worse”: [薬|くすり]を[飲|の]んだけど、＿[悪|わる]くなった。",
            answers: ["むしろ"],
            explanation: "むしろ: against what you'd expect, the other way.",
          },
          {
            prompt: "Casual, with というより (use [寝|ね]る): “I didn't so much sleep as just lie down”: ＿、[横|よこ]になっただけだ。",
            answers: ["[寝|ね]た と いう より", "[寝|ね]た と いう より も"],
            explanation: "The past goes before というより: [寝|ね]たというより.",
          },
        ],
      },
    ],
  },
];
