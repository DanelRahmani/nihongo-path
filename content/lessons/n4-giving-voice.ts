import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n4GivingVoice: Lesson[] = [
  {
    slug: "ageru-kureru-morau",
    title: "Giving and receiving: あげる, くれる, もらう",
    mark: "あげる・くれる",
    summary: "Say who gave what to whom, with the three verbs Japanese uses for it, and which way each one points.",
    source: "Genki II ch. 14 (あげる, くれる, もらう); Bunpro, “あげる”, “くれる” and “もらう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5", "JLPT Sensei lists only the て forms (てあげる, てくれる, てもらう), at N4."),
    blocks: [
      {
        type: "idea",
        text: "**あげる** is giving away from me (or from anyone, to someone outside my side), **くれる** is someone giving to me or my side, and **もらう** is receiving, told from the receiver's side.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Which way", "Example"],
        rows: [
          ["あげる", "Giver は/が + receiver に: away from me, or between other people", "[友達|ともだち] に [花|はな] を あげる"],
          ["くれる", "Giver が + (me or my side に): towards me", "[母|はは] が [時計|とけい] を くれる"],
          ["もらう", "Receiver は/が + giver に or から: I (or someone) get it", "[父|ちち] に [自転車|じてんしゃ] を もらう"],
        ],
      },
      {
        type: "text",
        text: "English “give” covers both あげる and くれる; Japanese picks the verb by direction. When the thing comes to you, or to someone on your side (your family, your friends, your group), it's くれる, and [私|わたし]に is usually left unsaid. With もらう, the giver takes に or から; から is the usual choice when the giver is a company or a school. All three are about things here; doing someone a favour comes in the next lesson. The polite versions, [差|さ]し[上|あ]げる, くださる and いただく, come in the keigo lessons.",
      },
      { type: "link", href: "/learn/particles/ni-target", label: "に: the target", text: "に marks who receives: [友達|ともだち]にプレゼントをあげた." },
      { type: "heading", text: "あげる: giving away" },
      {
        type: "examples",
        items: [
          { jp: "[友達|ともだち] に [花|はな] を {あげました}。", en: "I gave my friend some flowers.", alt: "[友達|ともだち] に [花|はな] を {あげた}。" },
          { jp: "[弟|おとうと] に [古|ふる]い ゲーム を {あげた}。", en: "I gave my little brother an old game.", alt: "[弟|おとうと] に [古|ふる]い ゲーム を {あげました}。" },
          {
            jp: "[田中|たなか]-さん は [木村|きむら]-さん に チョコレート を {あげました}。",
            en: "Tanaka gave Kimura some chocolate.",
            note: "Between two other people, the verb is あげる.",
          },
          { jp: "[猫|ねこ] に ご[飯|はん] を {あげました} か？", en: "Have you fed the cat?", alt: "[猫|ねこ] に ご[飯|はん] {あげた}？" },
        ],
      },
      { type: "heading", text: "くれる: giving to me" },
      {
        type: "examples",
        items: [
          { jp: "[母|はは] が この [時計|とけい] を {くれました}。", en: "My mother gave me this watch.", alt: "[母|はは] が この [時計|とけい] を {くれた}。" },
          { jp: "[誰|だれ] が この お[菓子|かし] を {くれた} の？", en: "Who gave us these sweets?", alt: "[誰|だれ] が この お[菓子|かし] を {くれた} ん です か？" },
          {
            jp: "[友達|ともだち] が [私|わたし] の [妹|いもうと] に [本|ほん] を {くれました}。",
            en: "A friend gave my little sister a book.",
            note: "My sister is on my side, so it's くれる, not あげる.",
          },
          { jp: "[近所|きんじょ] の [人|ひと] が [野菜|やさい] を {くれた}。", en: "A neighbour gave us some vegetables.", alt: "[近所|きんじょ] の [人|ひと] が [野菜|やさい] を {くれました}。" },
        ],
      },
      { type: "heading", text: "もらう: receiving" },
      {
        type: "examples",
        items: [
          { jp: "[父|ちち] に [自転車|じてんしゃ] を {もらいました}。", en: "I got a bike from my dad.", alt: "[父|ちち] に [自転車|じてんしゃ] を {もらった}。" },
          { jp: "[先輩|せんぱい] から [古|ふる]い [教科書|きょうかしょ] を {もらった}。", en: "I got some old textbooks from a senior student.", alt: "[先輩|せんぱい] から [古|ふる]い [教科書|きょうかしょ] を {もらいました}。" },
          { jp: "[誕生日|たんじょうび] に [何|なに] を {もらいました} か？", en: "What did you get for your birthday?", alt: "[誕生日|たんじょうび] に [何|なに] {もらった}？" },
          { jp: "[妹|いもうと] は [友達|ともだち] から [手紙|てがみ] を {もらいました}。", en: "My little sister got a letter from a friend." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[友達|ともだち] が [本|ほん] を {くれました}。", en: "A friend gave me a book." },
        b: { jp: "[友達|ともだち] に [本|ほん] を {もらいました}。", en: "I got a book from a friend." },
        diff: "The same event. With くれる the friend is the subject (が) and the book comes to me; with もらう I'm the subject and the friend takes に.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Towards me is くれる",
        text: "✗ [友達|ともだち]が[私|わたし]にお[土産|みやげ]をあげました ✓ [友達|ともだち]がお[土産|みやげ]をくれました. あげる never points at me or my side. When something comes to you, use くれる (and usually drop [私|わたし]に), or tell it from your side with もらう: [友達|ともだち]にお[土産|みやげ]をもらいました.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "その マフラー、 かわいい ね。", en: "That scarf's cute." },
          { speaker: "Kenta", jp: "ありがとう。 [姉|あね] が {くれた} ん だ。", en: "Thanks. My big sister gave it to me." },
          { speaker: "Aya", jp: "[私|わたし] も [去年|きょねん]、 [母|はは] に マフラー を {もらった} よ。", en: "I got one from my mum last year too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual: “My grandmother gave me some money”: [祖母|そぼ]がお[金|かね]を＿。",
            answers: ["くれた"],
            explanation: "The money comes to me, so くれる: [祖母|そぼ]がお[金|かね]をくれた.",
          },
          {
            prompt: "Polite: “I gave my teacher a card”: [先生|せんせい]にカードを＿。",
            answers: ["あげました", "[差|さ]し[上|あ]げました"],
            explanation: "Away from me: あげました is fine and common. To a teacher, the humble [差|さ]し[上|あ]げました is more respectful.",
          },
          {
            prompt: "The particle: “I got a scarf from my aunt”: おばさん＿マフラーをもらいました。",
            answers: ["に", "から"],
            explanation: "With もらう, the giver takes に or から.",
          },
          {
            prompt: "Casual: “A friend gave my little brother a game”: [友達|ともだち]が[弟|おとうと]にゲームを＿。",
            answers: ["くれた"],
            explanation: "My brother is on my side, so it's くれる: [弟|おとうと]にゲームをくれた.",
          },
          {
            prompt: "Fix it: [友達|ともだち]が[私|わたし]にお[土産|みやげ]をあげました。",
            answers: [
              "[友達|ともだち] が [私|わたし] に お[土産|みやげ] を くれました。",
              "[友達|ともだち] が お[土産|みやげ] を くれました。",
              "[友達|ともだち] に お[土産|みやげ] を もらいました。",
              "[友達|ともだち] から お[土産|みやげ] を もらいました。",
              "[私|わたし] は [友達|ともだち] に お[土産|みやげ] を もらいました。",
              "[私|わたし] は [友達|ともだち] から お[土産|みやげ] を もらいました。",
            ],
            explanation: "あげる never points at me: [友達|ともだち]がお[土産|みやげ]をくれました, or from my side, [友達|ともだち]にお[土産|みやげ]をもらいました.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-ageru-kureru-morau",
    title: "Doing favours: てあげる, てくれる, てもらう",
    mark: "〜てくれる",
    summary: "Say who did a favour for whom, and thank someone for it.",
    source: "Genki II ch. 16 (〜てあげる, 〜てくれる, 〜てもらう); Bunpro, “てあげる”, “てくれる”, “てもらう” and “てくれてありがとう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A verb's て form + **あげる**, **くれる** or **もらう** turns an action into a favour, and the helper verb points the same way as with things: てあげる for me (or anyone) doing it for others, てくれる for someone doing it for me, てもらう for getting someone to do it.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb て form + あげる: I do it for someone", "[教|おし]えて あげる"],
          ["Verb て form + くれる: someone does it for me", "[教|おし]えて くれる"],
          ["Verb て form + もらう: I get someone (に) to do it", "[教|おし]えて もらう"],
          ["Verb て form + くれて + ありがとう: thanks for doing it", "[来|き]て くれて ありがとう"],
        ],
      },
      {
        type: "text",
        text: "After the て form, あげる, くれる and もらう are written in kana. The person helped and the helper keep their particles from the last lesson: someone が …てくれる, someone に …てもらう. Japanese marks favours far more than English does: a sentence such as [友達|ともだち]が[手伝|てつだ]ってくれた carries a thank-you that “my friend helped” doesn't.",
      },
      { type: "heading", text: "〜てあげる: doing it for someone" },
      {
        type: "examples",
        items: [
          { jp: "[妹|いもうと] に [宿題|しゅくだい] を [教|おし]えて {あげました}。", en: "I helped my little sister with her homework.", alt: "[妹|いもうと] に [宿題|しゅくだい] を [教|おし]えて {あげた}。" },
          { jp: "[弟|おとうと] の [写真|しゃしん] を [撮|と]って {あげた}。", en: "I took a photo of my little brother for him.", alt: "[弟|おとうと] の [写真|しゃしん] を [撮|と]って {あげました}。" },
          { jp: "[子供|こども] に [本|ほん] を [読|よ]んで {あげる} の が [好|す]き です。", en: "I love reading to the kids.", alt: "[子供|こども] に [本|ほん] を [読|よ]んで {あげる} の が [好|す]き。" },
          { jp: "[田中|たなか]-さん は [友達|ともだち] を [駅|えき] まで [送|おく]って {あげました}。", en: "Tanaka gave her friend a lift to the station." },
        ],
      },
      { type: "heading", text: "〜てくれる: someone does it for me" },
      {
        type: "examples",
        items: [
          { jp: "[友達|ともだち] が [写真|しゃしん] を [撮|と]って {くれました}。", en: "A friend took a photo for me.", alt: "[友達|ともだち] が [写真|しゃしん] を [撮|と]って {くれた}。" },
          { jp: "[手伝|てつだ]って {くれて} ありがとう。", en: "Thanks for helping.", alt: "[手伝|てつだ]って {くれて} ありがとう ございます。" },
          { jp: "[母|はは] が [毎朝|まいあさ] お[弁当|べんとう] を [作|つく]って {くれます}。", en: "My mum makes me a packed lunch every morning.", alt: "[母|はは] が [毎朝|まいあさ] お[弁当|べんとう] を [作|つく]って {くれる}。" },
          { jp: "[先生|せんせい] が [日本|にほん] の [歌|うた] を [教|おし]えて {くれた}。", en: "The teacher taught us a Japanese song.", alt: "[先生|せんせい] が [日本|にほん] の [歌|うた] を [教|おし]えて {くれました}。" },
        ],
      },
      { type: "heading", text: "〜てもらう: getting it done" },
      {
        type: "examples",
        items: [
          { jp: "[友達|ともだち] に [部屋|へや] の [掃除|そうじ] を [手伝|てつだ]って {もらいました}。", en: "I got a friend to help me clean my room.", alt: "[友達|ともだち] に [部屋|へや] の [掃除|そうじ] を [手伝|てつだ]って {もらった}。" },
          { jp: "[兄|あに] に [宿題|しゅくだい] を [見|み]て {もらった}。", en: "I had my big brother look over my homework.", alt: "[兄|あに] に [宿題|しゅくだい] を [見|み]て {もらいました}。" },
          { jp: "[店|みせ] の [人|ひと] に [使|つか]い[方|かた] を [説明|せつめい] して {もらった}。", en: "I got the shop assistant to explain how to use it.", alt: "[店|みせ] の [人|ひと] に [使|つか]い[方|かた] を [説明|せつめい] して {もらいました}。" },
          { jp: "[母|はは] に [駅|えき] まで [迎|むか]え に [来|き]て {もらいました}。", en: "My mum came to pick me up at the station.", note: "Literally “I had my mum come to pick me up”: with もらう, I'm the one who received the favour, often because I asked." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[友達|ともだち] が [車|くるま] で [送|おく]って {くれました}。", en: "A friend kindly drove me home." },
        b: { jp: "[友達|ともだち] に [車|くるま] で [送|おく]って {もらいました}。", en: "I got a friend to drive me home." },
        diff: "The same favour. てくれる makes the friend the subject and sounds as if they offered; てもらう makes me the subject, and often hints that I asked.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A favour to me is てくれる",
        text: "✗ [友達|ともだち]が[道|みち]を[教|おし]えてあげました (meaning “to me”) ✓ [友達|ともだち]が[道|みち]を[教|おし]えてくれました. As with things, あげる points away from me. A favour done for me or my side is てくれる, or, from my side, てもらう: [友達|ともだち]に[道|みち]を[教|おし]えてもらいました.",
      },
      {
        type: "callout",
        kind: "culture",
        title: "Careful with てあげる",
        text: "てあげる says out loud that you're doing someone a favour, so said to their face it can sound condescending, and to a teacher or a boss it's rude: ✗ [先生|せんせい]、[荷物|にもつ]を[持|も]ってあげます. Offer instead: [荷物|にもつ]を[持|も]ちましょうか？ (or the humble お[持|も]ちします, in the humble-speech lesson). てくれる and てもらう carry thanks, so they're safe with anyone.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[昨日|きのう] は [手伝|てつだ]って {くれて}、 ありがとう ございました。", en: "Thanks for helping me yesterday." },
          { speaker: "Mr Mori", jp: "いえいえ。 [会議|かいぎ] は [大丈夫|だいじょうぶ] でした か？", en: "Not at all. Did the meeting go all right?" },
          { speaker: "Ms Sato", jp: "はい。 [部長|ぶちょう] に も [見|み]て {もらいました}。 [助|たす]かりました。", en: "Yes. I had the manager look it over too. You were a great help." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with てあげる: “I fixed my little brother's bike for him” (use [直|なお]す): [弟|おとうと]の[自転車|じてんしゃ]を＿。",
            answers: ["[直|なお]して あげた"],
            explanation: "I do it for him: [直|なお]して + あげた.",
          },
          {
            prompt: "Polite, with てくれる: “A neighbour lent me an umbrella” (use [貸|か]す): [近所|きんじょ]の[人|ひと]が[傘|かさ]を＿。",
            answers: ["[貸|か]して くれました", "[貸|か]して くださいました"],
            explanation: "Done for me: [貸|か]して + くれました (くださいました is the honorific version, in the keigo lessons).",
          },
          {
            prompt: "Polite, with てもらう: “I had my teacher check my essay” (use [見|み]る): [先生|せんせい]に[作文|さくぶん]を＿。",
            answers: ["[見|み]て もらいました", "[見|み]て いただきました"],
            explanation: "I got it done: [見|み]て + もらいました. To a teacher, the humble いただきました is more respectful.",
          },
          {
            prompt: "Casual: “Thanks for coming” (use [来|く]る): ＿ありがとう。",
            answers: ["[来|き]て くれて"],
            explanation: "Thanks for a favour: て form + くれて + ありがとう: [来|き]てくれてありがとう.",
          },
          {
            prompt: "Fix it (your friend did it for you): [友達|ともだち]が[地図|ちず]を[書|か]いてあげました。",
            answers: [
              "[友達|ともだち] が [地図|ちず] を [書|か]いて くれました。",
              "[友達|ともだち] に [地図|ちず] を [書|か]いて もらいました。",
              "[友達|ともだち] が [私|わたし] に [地図|ちず] を [書|か]いて くれました。",
              "[私|わたし] は [友達|ともだち] に [地図|ちず] を [書|か]いて もらいました。",
            ],
            explanation: "A favour to me is てくれる: [友達|ともだち]が[地図|ちず]を[書|か]いてくれました (or [友達|ともだち]に…[書|か]いてもらいました).",
          },
        ],
      },
    ],
  },
  {
    slug: "requests",
    title: "Asking a favour: てくれない？ to ていただけませんか",
    mark: "〜てもらえませんか",
    summary: "Ask someone to do something for you, from a casual てくれる？ to a very polite ていただけませんか.",
    source: "Genki II ch. 16 (〜てくれない？, 〜てもらえませんか, 〜ていただけませんか); Bunpro, “てくれない・てもらえない” and “ていただけませんか”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Asking whether someone will do you a favour (て form + くれる？) or whether you can receive it (て form + もらえる？) is the everyday way to make a request, and the negative and polite forms make it softer.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["How polite", "Before it", "Example"],
        rows: [
          ["Casual", "Verb て form + くれる？ · くれない？", "[手伝|てつだ]って くれない？"],
          ["Casual", "Verb て form + もらえる？ · もらえない？", "[手伝|てつだ]って もらえる？"],
          ["Polite", "Verb て form + くれませんか · もらえませんか", "[手伝|てつだ]って もらえません か？"],
          ["Very polite", "Verb て form + いただけませんか", "[手伝|てつだ]って いただけません か？"],
        ],
      },
      {
        type: "text",
        text: "The negative question is softer than the plain one: くれない？ is gentler than くれる？, and もらえませんか than もらえますか. With もらう and いただく the request uses the potential (もらえる, いただける: “can I receive …?”); くれる needs none. くれませんか is fine with colleagues; もらえませんか is the safer polite choice with someone you do not know. ていただけませんか is what you say to a stranger, a customer or a boss. てください, from the verb lessons, is polite too, but it is still an instruction; these forms ask.",
      },
      { type: "link", href: "/learn/verbs/te-iru-te-kudasai", label: "〜てください", text: "The polite instruction these requests soften." },
      { type: "heading", text: "Casual: 〜てくれない？, 〜てもらえる？" },
      {
        type: "examples",
        items: [
          { jp: "ちょっと [手伝|てつだ]って {くれない}？", en: "Could you give me a hand?", alt: "ちょっと [手伝|てつだ]って {くれません か}？" },
          { jp: "その [塩|しお]、 [取|と]って {くれる}？", en: "Could you pass me the salt?", alt: "その [塩|しお] を [取|と]って {くれます か}？" },
          { jp: "[帰|かえ]り に [牛乳|ぎゅうにゅう] を [買|か]って きて {もらえる}？", en: "Could you pick up some milk on the way home?", alt: "[帰|かえ]り に [牛乳|ぎゅうにゅう] を [買|か]って きて {もらえます か}？" },
          { jp: "[駅|えき] に [着|つ]いたら、 [電話|でんわ] して {もらえない}？", en: "Could you give me a call when you get to the station?", alt: "[駅|えき] に [着|つ]いたら、 [電話|でんわ] して {もらえません か}？" },
        ],
      },
      { type: "heading", text: "Polite: 〜てもらえませんか, 〜ていただけませんか" },
      {
        type: "examples",
        items: [
          { jp: "すみません、 [写真|しゃしん] を [撮|と]って {もらえません か}？", en: "Excuse me, could you take our photo?" },
          { jp: "もう [少|すこ]し ゆっくり [話|はな]して {くれません か}？", en: "Could you speak a little more slowly?", alt: "もう [少|すこ]し ゆっくり [話|はな]して {くれない}？" },
          { jp: "すみません、 [駅|えき] まで の [道|みち] を [教|おし]えて {いただけません か}？", en: "Excuse me, could you tell me the way to the station?" },
          { jp: "[申|もう]し[訳|わけ] ありません が、 [少|すこ]し [待|ま]って {いただけません か}？", en: "I'm sorry, but would you mind waiting a moment?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[窓|まど] を [開|あ]けて {ください}。", en: "Please open the window." },
        b: { jp: "[窓|まど] を [開|あ]けて {もらえません か}？", en: "Could you open the window?" },
        diff: "てください is a polite instruction; てもらえませんか asks whether the other person could, and leaves them room to say no.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "もらう asks with the potential",
        text: "✗ [手伝|てつだ]ってもらいませんか？ ✓ [手伝|てつだ]ってもらえませんか？ [手伝|てつだ]ってもらいませんか would mean “shall we not get help?”. A request with もらう or いただく asks whether you *can* receive the favour, so it takes the potential: もらえませんか, いただけませんか. With くれる there's no potential: [手伝|てつだ]ってくれませんか.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[佐藤|さとう]-さん、 この メール を [英語|えいご] に [直|なお]して {いただけません か}？", en: "Ms Sato, could I ask you to put this email into English?" },
          { speaker: "Ms Sato", jp: "いい です よ。 いつ まで です か？", en: "Sure. When do you need it by?" },
          { speaker: "Mr Mori", jp: "[明日|あした] の [朝|あさ] まで に お[願|ねが]い できます か？", en: "Could you manage it by tomorrow morning?" },
          { speaker: "Ms Sato", jp: "わかりました。", en: "All right." },
        ],
        note: "Between colleagues, てもらえませんか would do as well; ていただけませんか is a notch more careful.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with くれる: “Could you open the door?” (use [開|あ]ける): ドア、＿？",
            answers: ["[開|あ]けて くれる", "[開|あ]けて くれない"],
            explanation: "て form + くれる？, or the softer くれない？: [開|あ]けてくれない？",
          },
          {
            prompt: "Polite, with もらう: “Could you write your name here?” (use [書|か]く): ここにお[名前|なまえ]を＿？",
            answers: ["[書|か]いて もらえません か", "[書|か]いて もらえます か"],
            explanation: "もらう asks with its potential: [書|か]いてもらえませんか (softer than もらえますか).",
          },
          {
            prompt: "Very polite, with いただく: “Could you lend me a pen?” (use [貸|か]す): ペンを＿？",
            answers: ["[貸|か]して いただけません か", "[貸|か]して いただけます か"],
            explanation: "いただく takes its potential too: [貸|か]していただけませんか.",
          },
          {
            prompt: "Casual, with もらう: “Could you turn on the light?” (use つける): [電気|でんき]、＿？",
            answers: ["つけて もらえる", "つけて もらえない"],
            explanation: "Casual: て form + もらえる？ or もらえない？",
          },
          {
            prompt: "Fix it (keep it a request, not て ください): すみません、ちょっと[待|ま]ってもらいませんか？",
            answers: [
              "すみません、 ちょっと [待|ま]って もらえません か？",
              "すみません、 ちょっと [待|ま]って もらえます か？",
              "すみません、 ちょっと [待|ま]って いただけません か？",
              "すみません、 ちょっと [待|ま]って いただけます か？",
              "すみません、 ちょっと [待|ま]って くれません か？",
              "すみません、 ちょっと [待|ま]って くれます か？",
            ],
            explanation: "A request with もらう takes the potential: [待|ま]ってもらえませんか.",
          },
        ],
      },
    ],
  },
  {
    slug: "te-hoshii",
    title: "I want you to: てほしい",
    mark: "〜てほしい",
    summary: "Say what you want someone else to do, or not to do.",
    source: "Bunpro, “てほしい”; Makino & Tsutsui, Dictionary of Basic Japanese Grammar (hoshii (2))",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A verb's て form + **ほしい** says you want someone else to do something, with that person marked by に; the ない form + **でほしい** says you want them not to.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Person に + Verb て form + ほしい", "[母|はは] に [来|き]て ほしい"],
          ["Person に + Verb ない form + で + ほしい", "[母|はは] に [言|い]わないで ほしい"],
          ["Compare: Noun が + [欲|ほ]しい (a thing)", "[時間|じかん] が [欲|ほ]しい"],
          ["Compare: Verb stem + たい (you do it)", "[早|はや]く [帰|かえ]りたい"],
        ],
      },
      {
        type: "text",
        text: "After a て form, ほしい is written in kana; on its own, “want a thing”, it's [欲|ほ]しい. It conjugates like any い-adjective: ほしくない, ほしかった, polite ほしいです. Like たい, it states your own wish, so said straight to a teacher or a boss it sounds pushy: ask them with ていただけませんか instead.",
      },
      { type: "link", href: "/learn/n5-essentials/hoshii", label: "[欲|ほ]しい: wanting things", text: "Noun が[欲|ほ]しい, and how it differs from たい." },
      { type: "heading", text: "〜てほしい: I want you to" },
      {
        type: "examples",
        items: [
          { jp: "[母|はは] に も [来|き]て {ほしい} です。", en: "I'd like my mother to come too.", alt: "[母|はは] に も [来|き]て {ほしい}。" },
          { jp: "[誰|だれ] か に [手伝|てつだ]って {ほしい}。", en: "I wish someone would help me.", alt: "[誰|だれ] か に [手伝|てつだ]って {ほしい} です。" },
          { jp: "[子供|こども] に は [野菜|やさい] を もっと [食|た]べて {ほしい}。", en: "I want the kids to eat more vegetables.", alt: "[子供|こども] に は [野菜|やさい] を もっと [食|た]べて {ほしい} です。" },
          { jp: "[先生|せんせい] に もう [一度|いちど] [説明|せつめい] して {ほしかった}。", en: "I wish the teacher had explained it once more.", alt: "[先生|せんせい] に もう [一度|いちど] [説明|せつめい] して {ほしかった} です。" },
        ],
      },
      { type: "heading", text: "〜ないでほしい: I'd rather you didn't" },
      {
        type: "examples",
        items: [
          { jp: "[夜|よる] は [大|おお]きい [音|おと] で [音楽|おんがく] を [聞|き]か{ないで ほしい} です。", en: "I'd rather you didn't listen to music loudly at night.", alt: "[夜|よる] は [大|おお]きい [音|おと] で [音楽|おんがく] を [聞|き]か{ないで ほしい}。" },
          {
            jp: "[宿題|しゅくだい] を [忘|わす]れ{ないで ほしい} です。",
            en: "I don't want you to forget your homework.",
            alt: "[宿題|しゅくだい] を [忘|わす]れ{ないで ほしい}。",
            note: "〜てほしくない also works: [言|い]ってほしくない (I don't want you to say it).",
          },
          { jp: "ここ に [物|もの] を [置|お]か{ないで ほしい} です。", en: "I'd rather you didn't leave things here.", alt: "ここ に [物|もの] を [置|お]か{ないで ほしい}。" },
          { jp: "[一人|ひとり] で [行|い]か{ないで ほしい}。", en: "I don't want you to go on your own.", alt: "[一人|ひとり] で [行|い]か{ないで ほしい} です。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[早|はや]く [帰|かえ]り{たい}。", en: "I want to go home early." },
        b: { jp: "[早|はや]く [帰|かえ]って {ほしい}。", en: "I want you to come home early." },
        diff: "たい is what I want to do myself; てほしい is what I want someone else to do.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Someone else's action takes てほしい",
        text: "✗ [友達|ともだち]に[来|き]たいです ✓ [友達|ともだち]に[来|き]てほしいです. たい only ever says what you yourself want to do. For what you want another person to do, use the て form + ほしい, with the person marked by に.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[来週|らいしゅう]、 [僕|ぼく] の [誕生日|たんじょうび] パーティー を する ん だ。 あや に も [来|き]て {ほしい}。", en: "I'm having a birthday party next week. I'd love you to come, Aya." },
          { speaker: "Aya", jp: "[行|い]く [行|い]く！ [何時|なんじ] から？", en: "I'll be there! What time does it start?" },
          { speaker: "Kenta", jp: "[七時|しちじ] から だ よ。", en: "From seven." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ほしい: “I'd like you to read this” (use [読|よ]む): これを＿。",
            answers: ["[読|よ]んで ほしい です"],
            explanation: "て form + ほしい + です: [読|よ]んでほしいです.",
          },
          {
            prompt: "Casual: “I don't want you to tell my mum” (use [言|い]う): [母|はは]には＿。",
            answers: ["[言|い]わないで ほしい", "[言|い]って ほしくない"],
            explanation: "Wanting someone not to: ない form + でほしい: [言|い]わないでほしい.",
          },
          {
            prompt: "Casual: “I wanted my dad to come to the match” (use [来|く]る): [父|ちち]に[試合|しあい]に＿。",
            answers: ["[来|き]て ほしかった"],
            explanation: "ほしい is an い-adjective: [来|き]てほしかった.",
          },
          {
            prompt: "Casual, with ほしい: “I want my sister to clean her room” (use [掃除|そうじ]する): [妹|いもうと]に[部屋|へや]を＿。",
            answers: ["[掃除|そうじ] して ほしい"],
            explanation: "[掃除|そうじ]して + ほしい, with the person marked by に.",
          },
          {
            prompt: "Fix it (you want your friend to wait): [友達|ともだち]に[待|ま]ちたいです。",
            answers: [
              "[友達|ともだち] に [待|ま]って ほしい です。",
              "[友達|ともだち] に [待|ま]って ほしい。",
              "[友達|ともだち] に [待|ま]って いて ほしい です。",
              "[友達|ともだち] に [待|ま]って いて ほしい。",
            ],
            explanation: "たい is only for your own actions; for your friend's, [待|ま]ってほしいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "passive",
    title: "Done by someone: the passive (れる, られる)",
    mark: "〜られる",
    summary: "Say what was done to someone or something, and by whom, and tell the passive from the potential.",
    source: "Genki II ch. 21 (passive sentences); Bunpro, “Verb［れる・られる］ (Passive)”",
    register: "both",
    kinds: ["verbs"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The passive (る-verbs + **られる**, う-verbs' a-sound + **れる**) makes the person or thing an action happens to the subject, and the doer takes に: [先生|せんせい]に[褒|ほ]められた (I was praised by the teacher).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Plain form", "Passive"],
        rows: [
          ["る-verb: drop る, add られる", "[食|た]べる", "[食|た]べられる"],
          ["う-verb: a-sound + れる", "[書|か]く", "[書|か]かれる"],
          ["う-verb ending in う: わ + れる", "[言|い]う", "[言|い]われる"],
          ["Irregular", "する", "される"],
          ["Irregular", "[来|く]る", "[来|こ]られる"],
        ],
      },
      {
        type: "text",
        text: "The passive is a る-verb in its own right: [褒|ほ]められた, [褒|ほ]められます, [褒|ほ]められて. Japanese uses it most when something happens to a person (praised, told off, asked, invited), and for facts about things where the doer doesn't matter ([読|よ]まれている, [建|た]てられた). For a る-verb it looks exactly like the potential: [食|た]べられる is “can eat” and “be eaten”. The particles tell them apart: a doer with に means the passive; “can” takes が for the thing and has no doer.",
      },
      { type: "link", href: "/learn/verbs/potential", label: "The potential form", text: "[食|た]べられる as “can eat”." },
      {
        type: "examples",
        items: [
          { jp: "[先生|せんせい] に {[褒|ほ]められました}。", en: "I was praised by the teacher.", alt: "[先生|せんせい] に {[褒|ほ]められた}。" },
          { jp: "この [本|ほん] は [多|おお]く の [人|ひと] に {[読|よ]まれて} います。", en: "This book is read by a great many people.", alt: "この [本|ほん] は [多|おお]く の [人|ひと] に {[読|よ]まれて} いる。" },
          { jp: "[弟|おとうと] は [友達|ともだち] に {[笑|わら]われました}。", en: "My little brother got laughed at by his friends.", alt: "[弟|おとうと] は [友達|ともだち] に {[笑|わら]われた}。" },
          { jp: "この [寺|てら] は [八百年|はっぴゃくねん] [前|まえ] に {[建|た]てられました}。", en: "This temple was built eight hundred years ago.", note: "No doer: the passive states a fact about the temple." },
          { jp: "[会議|かいぎ] で [部長|ぶちょう] に [意見|いけん] を {[聞|き]かれた}。", en: "At the meeting, the manager asked me what I thought.", alt: "[会議|かいぎ] で [部長|ぶちょう] に [意見|いけん] を {[聞|き]かれました}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[私|わたし] は [魚|さかな] が {[食|た]べられます}。", en: "I can eat fish." },
        b: { jp: "[魚|さかな] は [猫|ねこ] に {[食|た]べられました}。", en: "The fish was eaten by the cat." },
        diff: "The same verb form. In a the fish takes が and I do the eating: the potential. In b the cat is the doer, marked に, and the fish is what it happened to: the passive.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A doer with に needs the passive",
        text: "✗ [私|わたし]は[先生|せんせい]に[呼|よ]びました ✓ [私|わたし]は[先生|せんせい]に[呼|よ]ばれました. With the active [呼|よ]びました, I would be the one calling. When the subject is the one it happens to and the doer takes に, the verb must be passive. And う-verbs take the a-sound + れる, not られる: [書|か]かれる, [言|い]われる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "どう した の？ [元気|げんき] ない ね。", en: "What's up? You look down." },
          { speaker: "Kenta", jp: "[会議|かいぎ] に [遅|おく]れて、 [部長|ぶちょう] に {[怒|おこ]られた} ん だ。", en: "I was late for a meeting, and the manager had a go at me." },
          { speaker: "Aya", jp: "そう なん だ。 [大変|たいへん] だった ね。", en: "Oh no. That sounds rough." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual passive: “I got woken up by my little brother” (use [起|お]こす): [弟|おとうと]に＿。",
            answers: ["[起|お]こされた", "[起|お]こされちゃった"],
            explanation: "[起|お]こす is an う-verb: a-sound + れる: [起|お]こされる, past [起|お]こされた.",
          },
          {
            prompt: "Polite passive: “English is spoken in many countries” (use [話|はな]す): [英語|えいご]はたくさんの[国|くに]で＿。",
            answers: ["[話|はな]されて います", "[話|はな]されます"],
            explanation: "[話|はな]す → [話|はな]される; a general fact is often ている: [話|はな]されています.",
          },
          {
            prompt: "Casual passive: “I got invited to a party by a friend” (use [誘|さそ]う): [友達|ともだち]にパーティーに＿。",
            answers: ["[誘|さそ]われた"],
            explanation: "[誘|さそ]う ends in う, so わ + れる: [誘|さそ]われる, past [誘|さそ]われた.",
          },
          {
            prompt: "Polite passive: “The window was broken by someone” (use [割|わ]る): [窓|まど]が[誰|だれ]かに＿。",
            answers: ["[割|わ]られました", "[割|わ]られて しまいました"],
            explanation: "[割|わ]る is an う-verb: [割|わ]られる, polite past [割|わ]られました.",
          },
          {
            prompt: "Fix it (you were the one praised): [私|わたし]は[部長|ぶちょう]に[褒|ほ]めました。",
            answers: ["[私|わたし] は [部長|ぶちょう] に [褒|ほ]められました。", "[部長|ぶちょう] に [褒|ほ]められました。"],
            explanation: "The doer takes に and I'm the one it happened to, so the passive: [褒|ほ]められました.",
          },
        ],
      },
    ],
  },
  {
    slug: "suffering-passive",
    title: "It happened to me: the suffering passive",
    mark: "[降|ふ]られた",
    summary: "Use the passive to say something happened to you and you didn't like it, even with verbs that take no object.",
    source: "Genki II ch. 21 (passive sentences: being bothered); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (rareru (passive): indirect passive); Bunpro, “Verb［れる・られる］ (Passive)”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro and JLPT Sensei cover it under the passive (Verb［れる・られる］, 受身形) rather than as a point of its own."),
    blocks: [
      {
        type: "idea",
        text: "The passive can also say that something someone did, or something that just happened, affected you, usually for the worse: [雨|あめ]に[降|ふ]られた (I got rained on), [財布|さいふ]を[盗|ぬす]まれた (I had my wallet stolen).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["What happens", "Example"],
        rows: [
          ["Something just happens to you (a verb with no object)", "[雨|あめ] に [降|ふ]られた"],
          ["Someone does something to your thing (it keeps を)", "[足|あし] を [踏|ふ]まれた"],
          ["Someone does something that bothers you", "[隣|となり] の [人|ひと] に タバコ を [吸|す]われた"],
        ],
      },
      {
        type: "text",
        text: "The verbs form their passive as in the last lesson. What's new is the subject: it's you (usually unsaid), the one affected, not the thing acted on. So even verbs with no object can be passive ([降|ふ]る, [泣|な]く, [来|く]る), and when someone acts on your thing, the thing keeps を. English often says it with “on me” or “I had … done”. Most of these sentences complain; the tone comes from the passive itself.",
      },
      {
        type: "examples",
        items: [
          { jp: "[買|か]い[物|もの] の [帰|かえ]り に [雨|あめ] に {[降|ふ]られました}。", en: "I got caught in the rain on the way back from the shops.", alt: "[買|か]い[物|もの] の [帰|かえ]り に [雨|あめ] に {[降|ふ]られた}。" },
          { jp: "[電車|でんしゃ] で [知|し]らない [人|ひと] に [足|あし] を {[踏|ふ]まれた}。", en: "Someone I didn't know stepped on my foot on the train.", alt: "[電車|でんしゃ] で [知|し]らない [人|ひと] に [足|あし] を {[踏|ふ]まれました}。" },
          { jp: "[夜中|よなか] に [子供|こども] に {[泣|な]かれて}、 [全然|ぜんぜん] [寝|ね]られなかった。", en: "My child cried in the night, and I couldn't sleep at all.", alt: "[夜中|よなか] に [子供|こども] に {[泣|な]かれて}、 [全然|ぜんぜん] [寝|ね]られません でした。" },
          { jp: "[駅|えき] で [財布|さいふ] を {[盗|ぬす]まれました}。", en: "I had my wallet stolen at the station.", alt: "[駅|えき] で [財布|さいふ] を {[盗|ぬす]まれた}。" },
          { jp: "[隣|となり] の [人|ひと] に タバコ を {[吸|す]われて}、 [嫌|いや] だった。", en: "The person next to me smoked, and I hated it." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] が {[降|ふ]りました}。", en: "It rained." },
        b: { jp: "[雨|あめ] に {[降|ふ]られました}。", en: "I got caught in the rain." },
        diff: "a just reports the weather. b is about me: the rain fell on me, and I wasn't happy about it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "に with the passive, が with the plain verb",
        text: "✗ [雨|あめ]に[降|ふ]りました ✓ [雨|あめ]に[降|ふ]られました (or just [雨|あめ]が[降|ふ]りました). In the suffering passive, に marks what did it to you, so the verb must be passive. With the plain verb, the rain is the subject and takes が.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[森|もり]-さん、 [大丈夫|だいじょうぶ] です か？", en: "Mr Mori, are you all right?" },
          { speaker: "Mr Mori", jp: "[昨日|きのう]、 [隣|となり] の [部屋|へや] の [人|ひと] に [夜中|よなか] まで {[騒|さわ]がれて}、 [寝|ね]られなかった ん です。", en: "The people next door were noisy till the small hours, and I couldn't sleep." },
          { speaker: "Ms Sato", jp: "それ は [大変|たいへん] でした ね。", en: "That sounds awful." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, suffering passive: “My little brother read my diary (and I hated it)” (use [読|よ]む): [弟|おとうと]に[日記|にっき]を＿。",
            answers: ["[読|よ]まれた", "[読|よ]まれて しまった", "[読|よ]まれちゃった"],
            explanation: "My diary keeps を, my brother takes に, and the verb is passive: [読|よ]まれた.",
          },
          {
            prompt: "Polite, suffering passive: “I got caught in the snow”: [雪|ゆき]に＿。",
            answers: ["[降|ふ]られました", "[降|ふ]られて しまいました"],
            explanation: "[降|ふ]る has no object, but it can still be passive when it happens to you: [雪|ゆき]に[降|ふ]られました.",
          },
          {
            prompt: "Casual, suffering passive: “I had my bike stolen” (use [盗|ぬす]む): [自転車|じてんしゃ]を＿。",
            answers: ["[盗|ぬす]まれた", "[盗|ぬす]まれて しまった", "[盗|ぬす]まれちゃった"],
            explanation: "My bike keeps を: [自転車|じてんしゃ]を[盗|ぬす]まれた.",
          },
          {
            prompt: "Casual, suffering passive: “Someone took my seat” (use [取|と]る): [誰|だれ]かに[席|せき]を＿。",
            answers: ["[取|と]られた", "[取|と]られて しまった", "[取|と]られちゃった"],
            explanation: "[取|と]る → [取|と]られる: [席|せき]を[取|と]られた.",
          },
          {
            prompt: "Fix it (you got rained on): [雨|あめ]に[降|ふ]りました。",
            answers: ["[雨|あめ] に [降|ふ]られました。"],
            explanation: "に marks what did it to you, so the verb is passive: [雨|あめ]に[降|ふ]られました.",
          },
        ],
      },
    ],
  },
  {
    slug: "causative",
    title: "Make or let someone do it: the causative (せる, させる)",
    mark: "〜させる",
    summary: "Say that someone made or let someone else do something.",
    source: "Genki II ch. 22 (causative sentences); Bunpro, “Verb［せる・させる］ (Causative)”; Makino & Tsutsui, Dictionary of Basic Japanese Grammar (saseru)",
    register: "both",
    kinds: ["verbs"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The causative (る-verbs + **させる**, う-verbs' a-sound + **せる**) says someone makes or lets another person do something: [子供|こども]を[遊|あそ]ばせる (let the children play).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Plain form", "Causative"],
        rows: [
          ["る-verb: drop る, add させる", "[食|た]べる", "[食|た]べさせる"],
          ["う-verb: a-sound + せる", "[書|か]く", "[書|か]かせる"],
          ["う-verb ending in う: わ + せる", "[言|い]う", "[言|い]わせる"],
          ["Irregular", "する", "させる"],
          ["Irregular", "[来|く]る", "[来|こ]させる"],
        ],
      },
      {
        type: "text",
        text: "The one who makes or lets is the subject; the one who does it takes に when the verb has an object ([娘|むすめ]に[本|ほん]を[選|えら]ばせる), and を or に when it has none ([子供|こども]を[走|はし]らせる). The causative is a る-verb: させた, させます, させて. Whether it's “make” or “let” comes from the context. It also turns up in set phrases: お[待|ま]たせしました (sorry to have kept you waiting) is the causative of [待|ま]つ.",
      },
      {
        type: "examples",
        items: [
          { jp: "[母|はは] は [私|わたし] に [毎日|まいにち] ピアノ を [練習|れんしゅう] {させました}。", en: "My mum made me practise the piano every day.", alt: "[母|はは] は [私|わたし] に [毎日|まいにち] ピアノ を [練習|れんしゅう] {させた}。" },
          { jp: "[先生|せんせい] は [学生|がくせい] に [作文|さくぶん] を {[書|か]かせました}。", en: "The teacher had the students write an essay.", alt: "[先生|せんせい] は [学生|がくせい] に [作文|さくぶん] を {[書|か]かせた}。" },
          { jp: "[子供|こども] を [公園|こうえん] で {[遊|あそ]ばせました}。", en: "I let the kids play in the park.", alt: "[子供|こども] を [公園|こうえん] で {[遊|あそ]ばせた}。", note: "With an intransitive verb like [遊|あそ]ぶ, を is normal for “let” too; the pair below is only a tendency." },
          { jp: "[父|ちち] は [弟|おとうと] を [一人|ひとり] で {[行|い]かせなかった}。", en: "My father wouldn't let my little brother go on his own.", alt: "[父|ちち] は [弟|おとうと] を [一人|ひとり] で {[行|い]かせません でした}。" },
          { jp: "[娘|むすめ] に [好|す]き な [本|ほん] を {[選|えら]ばせました}。", en: "I let my daughter choose whichever book she liked." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[子供|こども] {を} [走|はし]らせました。", en: "I made the children run." },
        b: { jp: "[子供|こども] {に} [走|はし]らせました。", en: "I let the children run." },
        diff: "With a verb that has no object, を often leans towards “made them” and に towards “let them”, since に treats them as doers with a say. Context can override both.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "させる, not られる",
        text: "✗ [母|はは]は[私|わたし]に[野菜|やさい]を[食|た]べられました ✓ [母|はは]は[私|わたし]に[野菜|やさい]を[食|た]べさせました. The causative ending is させる (せる for う-verbs). られる is the passive or the potential: with it, the sentence would say that Mum had her vegetables eaten by me.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[週末|しゅうまつ] は [何|なに] を した の？", en: "What did you do at the weekend?" },
          { speaker: "Kenta", jp: "[犬|いぬ] を [川|かわ] で {[泳|およ]がせた} ん だ。 すごく [喜|よろこ]んでた よ。", en: "I let the dog swim in the river. He loved it." },
          { speaker: "Aya", jp: "いい ね。 うち の [犬|いぬ] は [水|みず] が [嫌|きら]い なん だ。", en: "Nice. Our dog hates water." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite causative: “I had my son clean his room” (use [掃除|そうじ]する): [息子|むすこ]に[部屋|へや]を＿。",
            answers: ["[掃除|そうじ] させました"],
            explanation: "する → させる: [掃除|そうじ]させました.",
          },
          {
            prompt: "Casual causative: “My dad made me carry the bags” (use [持|も]つ): [父|ちち]は[私|わたし]に[荷物|にもつ]を＿。",
            answers: ["[持|も]たせた"],
            explanation: "[持|も]つ is an う-verb: a-sound + せる: [持|も]たせる, past [持|も]たせた.",
          },
          {
            prompt: "Polite causative: “I let the children watch TV” (use [見|み]る): [子供|こども]たちにテレビを＿。",
            answers: ["[見|み]させました"],
            explanation: "[見|み]る is a る-verb: [見|み]させる. ([見|み]せる is another verb, “show”.)",
          },
          {
            prompt: "Casual causative: “Sorry I kept you waiting so long” (use [待|ま]つ): [長|なが]い[間|あいだ]＿、ごめんね。",
            answers: ["[待|ま]たせて", "[待|ま]たせちゃって", "[待|ま]たせて しまって"],
            explanation: "I made you wait: [待|ま]たせる, て form [待|ま]たせて.",
          },
          {
            prompt: "Fix it (Mum made my brother wash the dishes): [母|はは]は[弟|おとうと]に[皿|さら]を[洗|あら]われました。",
            answers: ["[母|はは] は [弟|おとうと] に [皿|さら] を [洗|あら]わせました。"],
            explanation: "“Make someone do” is the causative: [洗|あら]う → [洗|あら]わせる. [洗|あら]われる is the passive.",
          },
        ],
      },
    ],
  },
  {
    slug: "causative-passive",
    title: "Being made to: the causative passive (させられる)",
    mark: "させられる",
    summary: "Say you were made to do something, usually against your will.",
    source: "Genki II ch. 23 (causative-passive sentences); Bunpro, “Causative-Passive”",
    register: "both",
    kinds: ["verbs"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "The causative passive (る-verbs + **させられる**, う-verbs' a-sound + **せられる** or the shorter **される**) says you were made to do something, with the one who made you marked by に.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Causative", "Causative passive"],
        rows: [
          ["[食|た]べる", "[食|た]べさせる", "[食|た]べさせられる"],
          ["[待|ま]つ", "[待|ま]たせる", "[待|ま]たせられる · [待|ま]たされる"],
          ["[話|はな]す", "[話|はな]させる", "[話|はな]させられる"],
          ["する", "させる", "させられる"],
          ["[来|く]る", "[来|こ]させる", "[来|こ]させられる"],
        ],
      },
      {
        type: "text",
        text: "It's the causative made passive: させる → させられる. For う-verbs, speech mostly uses the short form, a-sound + される ([待|ま]たされる, [飲|の]まされる), except for verbs ending in す, which keep the long one ([話|はな]させられる). The doer is you, as the subject; the person who made you takes に. It nearly always means you didn't want to.",
      },
      {
        type: "examples",
        items: [
          { jp: "[子供|こども] の とき、 [毎日|まいにち] [牛乳|ぎゅうにゅう] を {[飲|の]まされました}。", en: "As a kid, I was made to drink milk every day.", alt: "[子供|こども] の とき、 [毎日|まいにち] [牛乳|ぎゅうにゅう] を {[飲|の]まされた}。" },
          { jp: "[先輩|せんぱい] に [重|おも]い [荷物|にもつ] を {[運|はこ]ばされた}。", en: "A senior made me carry the heavy bags.", alt: "[先輩|せんぱい] に [重|おも]い [荷物|にもつ] を {[運|はこ]ばされました}。" },
          { jp: "[駅|えき] で [一時間|いちじかん] も {[待|ま]たされました}。", en: "I was kept waiting at the station for a whole hour.", alt: "[駅|えき] で [一時間|いちじかん] も {[待|ま]たされた}。" },
          { jp: "[授業|じゅぎょう] で みんな の [前|まえ] で [発表|はっぴょう] {させられた}。", en: "In class I was made to give a talk in front of everyone.", alt: "[授業|じゅぎょう] で みんな の [前|まえ] で [発表|はっぴょう] {させられました}。" },
          { jp: "[会議|かいぎ] で [急|きゅう] に [英語|えいご] で {[話|はな]させられました}。", en: "At the meeting I was suddenly made to speak in English.", note: "A verb ending in す keeps the long form." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[先生|せんせい] は [学生|がくせい] に [宿題|しゅくだい] を {させました}。", en: "The teacher made the students do homework." },
        b: { jp: "[学生|がくせい] は [先生|せんせい] に [宿題|しゅくだい] を {させられました}。", en: "The students were made to do homework by the teacher." },
        diff: "The same event. The causative tells it from the teacher's side; the causative passive from the students', who didn't choose it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Made to do, not done to",
        text: "✗ [母|はは]に[野菜|やさい]を[食|た]べられた ✓ [母|はは]に[野菜|やさい]を[食|た]べさせられた. [食|た]べられた is the passive (here the suffering passive): Mum ate the vegetables, to my cost. Being made to eat them needs the させ as well. And the short form is only for う-verbs not ending in す: ✗ [話|はな]さされた ✓ [話|はな]させられた.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[昨日|きのう] の パーティー、 どう だった？", en: "How was the party yesterday?" },
          { speaker: "Aya", jp: "[楽|たの]しかった けど、 カラオケ で [何度|なんど] も {[歌|うた]わされた} よ。", en: "It was fun, but they made me sing karaoke again and again." },
          { speaker: "Kenta", jp: "それ は [大変|たいへん] だった ね。", en: "Poor you." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite causative passive: “I was made to clean the toilets” (use [掃除|そうじ]する): トイレを＿。",
            answers: ["[掃除|そうじ] させられました"],
            explanation: "する → させる → させられる: [掃除|そうじ]させられました.",
          },
          {
            prompt: "Casual causative passive: “I was made to read a long book” (use [読|よ]む): [長|なが]い[本|ほん]を＿。",
            answers: ["[読|よ]まされた", "[読|よ]ませられた"],
            explanation: "[読|よ]む → [読|よ]ませられる, or in speech the short [読|よ]まされる: [読|よ]まされた.",
          },
          {
            prompt: "Polite causative passive: “I was made to go to the office on Sunday” (use [行|い]く): [日曜日|にちようび]に[会社|かいしゃ]に＿。",
            answers: ["[行|い]かされました", "[行|い]かせられました"],
            explanation: "[行|い]く → [行|い]かせられる, short [行|い]かされる: [行|い]かされました.",
          },
          {
            prompt: "Casual causative passive: “I was made to quit the club” (use [辞|や]める): クラブを＿。",
            answers: ["[辞|や]めさせられた"],
            explanation: "A る-verb has only the long form: [辞|や]めさせられた.",
          },
          {
            prompt: "Fix it (your dad made you wash the car): [父|ちち]に[車|くるま]を[洗|あら]わせました。",
            answers: ["[父|ちち] に [車|くるま] を [洗|あら]わされました。", "[父|ちち] に [車|くるま] を [洗|あら]わせられました。"],
            explanation: "You were made to, so the causative passive: [洗|あら]わされました (or [洗|あら]わせられました).",
          },
        ],
      },
    ],
  },
  {
    slug: "sasete-kudasai",
    title: "Let me: させてください",
    mark: "〜させてください",
    summary: "Ask to be allowed to do something yourself, from a casual させて to a very polite させていただけませんか.",
    source: "Genki II ch. 22 (〜させてください); JLPT Sensei, “させてください”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro has no entry for させてください (its させてもらう is N3); JLPT Sensei lists させてください at N4."),
    blocks: [
      {
        type: "idea",
        text: "The causative's て form + **ください** asks the listener to let you do something: [私|わたし]に[払|はら]わせてください (let me pay).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Causative て form", "Let me…"],
        rows: [
          ["[休|やす]む", "[休|やす]ませて", "[休|やす]ませて ください"],
          ["[考|かんが]える", "[考|かんが]えさせて", "[考|かんが]えさせて ください"],
          ["する", "させて", "させて ください"],
          ["[使|つか]う", "[使|つか]わせて", "[使|つか]わせて ください"],
        ],
      },
      {
        type: "text",
        text: "You are the one who'll do it, so the person who lets you is the listener, and you take に when you're named ([私|わたし]に). Casual speech drops ください: [私|わたし]にやらせて. For a bigger ask, use the request forms of the earlier lesson: させてもらえませんか, or to a boss, させていただけませんか. (You'll also hear させていただきます, “I'll take the liberty of …”, in very formal speech.)",
      },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は [私|わたし] に {[払|はら]わせて ください}。", en: "Let me pay today.", alt: "[今日|きょう] は [私|わたし] に {[払|はら]わせて}。" },
          { jp: "すみません、 [少|すこ]し [考|かんが]え{させて ください}。", en: "Sorry, let me think about it for a bit.", alt: "ごめん、 [少|すこ]し [考|かんが]え{させて}。" },
          { jp: "その [仕事|しごと]、 [私|わたし] に {やらせて}。", en: "Let me do that job.", alt: "その [仕事|しごと]、 [私|わたし] に {やらせて ください}。" },
          { jp: "この [部屋|へや] を [使|つか]わ{せて もらえません か}？", en: "Could I use this room?" },
          {
            jp: "[具合|ぐあい] が [悪|わる]い ので、 [今日|きょう] は [早|はや]く [帰|かえ]ら{せて いただけません か}？",
            en: "I'm not feeling well. Could I go home early today?",
          },
        ],
      },
      {
        type: "pair",
        a: { jp: "[写真|しゃしん] を [撮|と]って {ください}。", en: "Please take a photo." },
        b: { jp: "[写真|しゃしん] を [撮|と]ら{せて ください}。", en: "Please let me take a photo." },
        diff: "てください asks the listener to do it; the causative させてください asks them to let *you* do it.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Who does it?",
        text: "✗ [私|わたし]に[説明|せつめい]してください (meaning “let me explain”) ✓ [私|わたし]に[説明|せつめい]させてください. Without the causative, you are asking the other person to do it: [私|わたし]に[説明|せつめい]してください means “please explain it to me”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[部長|ぶちょう]、 [来週|らいしゅう] の [金曜日|きんようび]、 [休|やす]ま{せて いただけません か}？", en: "Could I take next Friday off?" },
          { speaker: "Manager", jp: "いい です よ。 [何|なに] か ある ん です か？", en: "That's fine. Is something on?" },
          { speaker: "Mr Mori", jp: "[国|くに] から [両親|りょうしん] が [来|く]る ん です。", en: "My parents are coming over from back home." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with ください: “Please let me go too” (use [行|い]く): [私|わたし]も＿。",
            answers: ["[行|い]かせて ください"],
            explanation: "[行|い]く → [行|い]かせる → [行|い]かせて + ください.",
          },
          {
            prompt: "Casual: “Let me see it too” (use [見|み]る): [私|わたし]にも＿。",
            answers: ["[見|み]させて", "[見|み]せて"],
            explanation: "The causative of [見|み]る is [見|み]させる: [見|み]させて. In everyday speech people more often say [見|み]せて (show me), which is accepted too.",
          },
          {
            prompt: "Very polite, with いただく: “Could I ask a question?” (use [質問|しつもん]する): ＿？",
            answers: [
              "[質問|しつもん] させて いただけません か",
              "[質問|しつもん] させて いただけます か",
              "[質問|しつもん] を させて いただけません か",
              "[質問|しつもん] を させて いただけます か",
            ],
            explanation: "する → させる → させて + いただけませんか.",
          },
          {
            prompt: "Polite, with もらう: “Could I sit here?” (use [座|すわ]る): ここに＿？",
            answers: ["[座|すわ]らせて もらえません か", "[座|すわ]らせて もらえます か"],
            explanation: "[座|すわ]る → [座|すわ]らせる → [座|すわ]らせて + もらえませんか.",
          },
          {
            prompt: "Fix it (you want to explain it yourself): [私|わたし]に[説明|せつめい]してください。",
            answers: [
              "[私|わたし] に [説明|せつめい] させて ください。",
              "[私|わたし] に [説明|せつめい] を させて ください。",
              "[説明|せつめい] させて ください。",
              "[説明|せつめい] を させて ください。",
            ],
            explanation: "You'll do the explaining, so the causative: [説明|せつめい]させてください.",
          },
        ],
      },
    ],
  },
  {
    slug: "sonkeigo",
    title: "Honorific speech: いらっしゃる, お〜になる",
    mark: "[尊敬語|そんけいご]",
    summary: "Raise the person you're talking to or about: honorific verbs, お〜になる and お〜ください.",
    source: "Genki II ch. 19 (honorific expressions, 〜てくださる); Bunpro, “お～になる”, “なさる”, “お～ください” and “いらっしゃる”",
    register: "polite",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "Honorific speech ([尊敬語|そんけいご], sonkeigo) shows respect for the person doing the action, a teacher, a boss or a customer, by swapping in a special verb (いらっしゃる) or wrapping the stem: **お + stem + になる**, and **お + stem + ください** for a request.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["お + Verb stem + になる", "お[待|ま]ち に なる"],
          ["A special verb, for the most common verbs", "いらっしゃる · [召|め]し[上|あ]がる · おっしゃる"],
          ["お + Verb stem + ください: a polite request", "お[待|ま]ち ください"],
        ],
      },
      {
        type: "table",
        caption: "The special honorific verbs",
        headers: ["Verb", "Honorific"],
        rows: [
          ["[行|い]く · [来|く]る · いる", "いらっしゃる"],
          ["[食|た]べる · [飲|の]む", "[召|め]し[上|あ]がる"],
          ["[言|い]う", "おっしゃる"],
          ["する", "なさる"],
          ["[見|み]る", "ご[覧|らん] に なる"],
          ["くれる", "くださる"],
          ["[寝|ね]る", "お[休|やす]み に なる"],
        ],
      },
      {
        type: "text",
        text: "A verb with a special form uses it: you say いらっしゃる, not お[行|い]きになる. いらっしゃる, おっしゃる, なさる and くださる have irregular ます forms: いらっしゃいます, おっしゃいます, なさいます, くださいます. Honorific speech is about someone else, never about yourself, and when you talk to that person it comes with polite endings: the sentence still ends in ます or です. With a する-noun the お becomes ご: ご[説明|せつめい]ください. You'll also hear a lighter honorific made with the passive ending ([帰|かえ]られる, [来|こ]られる), which this lesson leaves aside.",
      },
      { type: "heading", text: "お〜になる" },
      {
        type: "examples",
        items: [
          { jp: "[社長|しゃちょう] は もう {お[帰|かえ]り に なりました}。", en: "The company president has already gone home." },
          { jp: "[先生|せんせい] は この [本|ほん] を {お[読|よ]み に なりました} か？", en: "Have you read this book, sir?", note: "Asking a teacher directly: Japanese uses the title, not あなた." },
          { jp: "[田中|たなか]-[様|さま]、 [何時|なんじ] に {お[着|つ]き に なります} か？", en: "What time will you be arriving, Mr Tanaka?" },
          { jp: "[部長|ぶちょう] は [毎朝|まいあさ] [七時|しちじ] に {お[出|で]かけ に なります}。", en: "The manager leaves the house at seven every morning." },
        ],
      },
      { type: "heading", text: "The special verbs" },
      {
        type: "examples",
        items: [
          { jp: "[先生|せんせい] は [今|いま] [教室|きょうしつ] に {いらっしゃいます}。", en: "The teacher is in the classroom now." },
          { jp: "[何|なに] を {[召|め]し[上|あ]がります} か？", en: "What would you like to eat?" },
          { jp: "[部長|ぶちょう] が そう {おっしゃいました}。", en: "The manager said so." },
          { jp: "[週末|しゅうまつ] は [何|なに] を {なさいます} か？", en: "What are you doing at the weekend?" },
          { jp: "もう この [映画|えいが] を {ご[覧|らん] に なりました} か？", en: "Have you seen this film yet?" },
        ],
      },
      { type: "heading", text: "お〜ください: please do" },
      {
        type: "examples",
        items: [
          { jp: "こちら で {お[待|ま]ち ください}。", en: "Please wait here." },
          { jp: "どうぞ {お[入|はい]り ください}。", en: "Please come in." },
          { jp: "こちら に お[名前|なまえ] を {お[書|か]き ください}。", en: "Please write your name here." },
          { jp: "どうぞ ご[自由|じゆう] に {お[取|と]り ください}。", en: "Please help yourself.", note: "A common sign beside free leaflets or samples." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[先生|せんせい] は [何時|なんじ] に {[来|き]ます} か？", en: "What time is the teacher coming?" },
        b: { jp: "[先生|せんせい] は [何時|なんじ] に {いらっしゃいます} か？", en: "What time is the teacher coming?" },
        diff: "Both are polite. ます is polite to the listener; いらっしゃる also shows respect for the teacher, the one coming.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Never for yourself",
        text: "✗ [私|わたし]はもうお[帰|かえ]りになります ✓ [私|わたし]はもう[帰|かえ]ります. Honorific speech raises the person who acts, so using it for yourself sounds as if you were praising yourself. For your own actions, use plain polite speech or the humble forms of the next lesson. And a verb with a special form doesn't take お〜になる: ✗ お[見|み]になる ✓ ご[覧|らん]になる.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[部長|ぶちょう]、 [明日|あした] の [会議|かいぎ] に は {いらっしゃいます} か？", en: "Will you be at tomorrow's meeting?" },
          { speaker: "Manager", jp: "ええ、 [出|で]ます よ。 [十時|じゅうじ] から でした ね。", en: "Yes, I'll be there. It's at ten, isn't it?" },
          { speaker: "Ms Sato", jp: "はい。 コーヒー、 {[召|め]し[上|あ]がります} か？", en: "That's right. Would you like a coffee?" },
          { speaker: "Manager", jp: "ありがとう。 いただきます。", en: "Thanks. I'd love one." },
        ],
        note: "Ms Sato uses honorifics for her manager's actions; the manager, talking about himself, uses plain polite speech (and the set phrase いただきます).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Honorific of [来|く]る: “What time will the president come?”: [社長|しゃちょう]は[何時|なんじ]に＿か？",
            answers: ["いらっしゃいます", "[来|こ]られます", "お[見|み]え に なります", "お[越|こ]し に なります", "おいで に なります"],
            explanation: "[来|く]る has a special honorific: いらっしゃいます. ([来|こ]られます, お[見|み]えになります, お[越|こ]しになります and おいでになります are also used.)",
          },
          {
            prompt: "Honorific, お〜になる: “The customer is waiting” (use [待|ま]つ): お[客|きゃく][様|さま]が＿います。",
            answers: ["お[待|ま]ち に なって"],
            explanation: "お + [待|ま]ち + になる, in the て form before います: お[待|ま]ちになっています.",
          },
          {
            prompt: "Honorific of [言|い]う: “What did the teacher say?”: [先生|せんせい]は[何|なん]と＿か？",
            answers: ["おっしゃいました", "[言|い]われました"],
            explanation: "[言|い]う has a special honorific: おっしゃる, polite past おっしゃいました.",
          },
          {
            prompt: "With お〜ください: “Please use this pen” (use [使|つか]う): このペンを＿。",
            answers: ["お[使|つか]い ください"],
            explanation: "お + stem + ください: お[使|つか]いください.",
          },
          {
            prompt: "Fix it (about yourself): [私|わたし]は[毎朝|まいあさ]コーヒーを[召|め]し[上|あ]がります。",
            answers: ["[私|わたし] は [毎朝|まいあさ] コーヒー を [飲|の]みます。", "[私|わたし] は [毎朝|まいあさ] コーヒー を [飲|の]んで います。"],
            explanation: "Honorifics are never for yourself: [飲|の]みます.",
          },
        ],
      },
    ],
  },
  {
    slug: "kenjougo",
    title: "Humble speech: お〜する, いたす, ございます",
    mark: "[謙譲語|けんじょうご]",
    summary: "Lower yourself and your side to show respect: humble verbs, お〜する, and the very polite ございます.",
    source: "Genki II ch. 20 (extra-modest expressions, humble expressions); Bunpro, “お～する”, “いたす”, “ございます” and “でございます”",
    register: "polite",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro and JLPT Sensei list いたす, ございます and でございます at N4; the other humble verbs (参る, 申す, おる, 伺う, 拝見する) are on neither list as points of their own."),
    blocks: [
      {
        type: "idea",
        text: "Humble speech ([謙譲語|けんじょうご], kenjougo) shows respect by lowering yourself and your side: a special humble verb ([参|まい]る, [申|もう]す), or **お + stem + する** for something you do for the other person, while **ございます** is the very polite あります.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["お + Verb stem + する · いたす", "お[持|も]ち します"],
          ["ご + する noun + する · いたす", "ご[案内|あんない] します"],
          ["A special verb, for the most common verbs", "[参|まい]る · [申|もう]す · おる"],
          ["ございます for あります, でございます for です", "こちら で ございます"],
        ],
      },
      {
        type: "table",
        caption: "The special humble verbs",
        headers: ["Verb", "Humble"],
        rows: [
          ["[行|い]く · [来|く]る", "[参|まい]る"],
          ["いる", "おる"],
          ["する", "いたす"],
          ["[言|い]う", "[申|もう]す"],
          ["[食|た]べる · [飲|の]む · もらう", "いただく"],
          ["[見|み]る", "[拝見|はいけん] する"],
          ["[聞|き]く, and visiting someone", "[伺|うかが]う"],
          ["あげる", "[差|さ]し[上|あ]げる"],
        ],
      },
      {
        type: "text",
        text: "Humble speech is for what you, your family or your company do, said to or about someone you respect. お〜する is only for actions done for or towards that person (carrying their bag, calling them, showing them the way); you don't say お[帰|かえ]りします for going home. Most する-nouns take ご (ご[案内|あんない], ご[説明|せつめい]), but a few common ones take お: お[電話|でんわ]します, お[願|ねが]いします. いたす is a humbler する, so お〜いたします is humbler still. ございます and でございます aren't about anyone's actions: they make the whole sentence more formal, and you hear them most from shop and hotel staff.",
      },
      { type: "link", href: "/learn/culture/uchi-soto", label: "Uchi and soto", text: "Who counts as “your side”, and why it decides the speech level." },
      { type: "heading", text: "お〜する: doing it for you" },
      {
        type: "examples",
        items: [
          { jp: "[荷物|にもつ] を {お[持|も]ち します}。", en: "Let me carry your bag." },
          { jp: "[後|あと] で {お[電話|でんわ] します}。", en: "I'll call you later." },
          { jp: "[駅|えき] まで {ご[案内|あんない] します}。", en: "I'll show you the way to the station." },
          { jp: "[写真|しゃしん] は [明日|あした] {お[送|おく]り いたします}。", en: "I'll send you the photos tomorrow." },
        ],
      },
      { type: "heading", text: "The special verbs" },
      {
        type: "examples",
        items: [
          { jp: "[私|わたし] は スミス と {[申|もう]します}。", en: "My name is Smith." },
          { jp: "[明日|あした] [三時|さんじ] に そちら に {[参|まい]ります}。", en: "I'll come to you at three tomorrow." },
          { jp: "[私|わたし] は [東京|とうきょう] に [住|す]んで {おります}。", en: "I live in Tokyo." },
          { jp: "[先週|せんしゅう]、 [先生|せんせい] の お[宅|たく] に {[伺|うかが]いました}。", en: "Last week I visited my teacher at home." },
          { jp: "お[手紙|てがみ]、 {[拝見|はいけん] しました}。", en: "I've read your letter." },
          { jp: "お[茶|ちゃ] を {いただきます}。", en: "I'll have some tea, thank you." },
          { jp: "[先生|せんせい] に [本|ほん] を {いただきました}。", en: "My teacher gave me a book." },
          { jp: "お[待|ま]たせ {いたしました}。", en: "Sorry to keep you waiting." },
          { jp: "それ は [私|わたし] が {いたします}。", en: "I'll do that." },
        ],
      },
      { type: "heading", text: "ございます, でございます" },
      {
        type: "examples",
        items: [
          { jp: "トイレ は [二階|にかい] に {ございます}。", en: "The toilets are on the first floor.", note: "[二階|にかい] is the floor above the ground floor." },
          { jp: "こちら が [新|あたら]しい メニュー {で ございます}。", en: "This is our new menu." },
          { jp: "ご[質問|しつもん] は {ございます} か？", en: "Do you have any questions?" },
          { jp: "はい、 [山田|やまだ] {で ございます}。", en: "Yamada speaking.", note: "How staff answer the phone." },
          { jp: "[申|もう]し[訳|わけ] ございません。 その [色|いろ] は [今|いま] {ございません}。", en: "I'm sorry, we don't have that colour at the moment." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] また {[来|き]ます}。", en: "I'll come again tomorrow." },
        b: { jp: "[明日|あした] また {[参|まい]ります}。", en: "I'll come again tomorrow." },
        diff: "Both are polite; [参|まい]ります lowers the speaker, and so shows respect to the listener.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Humble is for your side only",
        text: "✗ [先生|せんせい]が[参|まい]りました ✓ [先生|せんせい]がいらっしゃいました. Humble verbs lower the one who acts, so using one for your teacher puts them down. Use humble speech for yourself and your side, honorific speech for others: ✗ お[持|も]ちになります (for your own carrying) ✓ お[持|も]ちします.",
      },
      {
        type: "callout",
        kind: "culture",
        title: "Your boss is on your side",
        text: "Talking to someone outside the company, your own colleagues and even your boss are on your side (uchi). So on the phone to a client, staff use humble verbs for their boss and drop さん: [部長|ぶちょう]の[森|もり]は[今|いま][会議|かいぎ]に[出|で]ております. Inside the company, the same boss gets honorifics.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Caller", jp: "もしもし、 [山田|やまだ] と {[申|もう]します} が、 [森|もり]-さん は いらっしゃいます か？", en: "Hello, my name is Yamada. Is Mr Mori there?" },
          { speaker: "Receptionist", jp: "[申|もう]し[訳|わけ] ございません。 [森|もり] は [今|いま] [出|で]かけて {おります}。", en: "I'm very sorry. Mr Mori is out at the moment." },
          { speaker: "Caller", jp: "わかりました。 また [夕方|ゆうがた] に {お[電話|でんわ] いたします}。", en: "I see. I'll call again this evening." },
        ],
        note: "The receptionist says [森|もり], not [森|もり]さん, and uses おります: to an outsider, a colleague is on her side.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Humble of [行|い]く, to a client: “I'm going to Osaka next week”: [来週|らいしゅう][大阪|おおさか]に＿。",
            answers: ["[参|まい]ります"],
            explanation: "[行|い]く has a special humble verb: [参|まい]ります.",
          },
          {
            prompt: "Humble, お〜する: “I'll help you” (use [手伝|てつだ]う): ＿。",
            answers: ["お[手伝|てつだ]い します", "お[手伝|てつだ]い いたします"],
            explanation: "Something you do for the other person: お + stem + する: お[手伝|てつだ]いします.",
          },
          {
            prompt: "Very polite, to a customer: “There's a lift over there”: あちらにエレベーターが＿。",
            answers: ["ございます"],
            explanation: "ございます is the very polite あります.",
          },
          {
            prompt: "Humble of [見|み]る, to a customer: “I've seen your photos”: お[写真|しゃしん]、＿。",
            answers: ["[拝見|はいけん] しました", "[拝見|はいけん] いたしました"],
            explanation: "[見|み]る has a special humble verb: [拝見|はいけん]する.",
          },
          {
            prompt: "Fix it (about your own action): [私|わたし]が[駅|えき]までお[送|おく]りになります。",
            answers: ["[私|わたし] が [駅|えき] まで お[送|おく]り します。", "[私|わたし] が [駅|えき] まで お[送|おく]り いたします。"],
            explanation: "お〜になる is honorific, for others; for yourself, the humble お[送|おく]りします.",
          },
        ],
      },
    ],
  },
];
