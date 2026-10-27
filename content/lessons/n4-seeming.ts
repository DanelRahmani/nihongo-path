import { jlpt } from "@/content/jlpt";
import type { Lesson } from "@/content/types";

export const n4Seeming: Lesson[] = [
  {
    slug: "sou-looks",
    title: "Looks like: そう after a stem",
    mark: "〜そう",
    summary: "Say how something looks, or what looks about to happen, from what you can see.",
    source: "Genki II ch. 13 (〜そうです: it looks like); Bunpro, “そう” and “そうに・そうな”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "An adjective's stem or a verb's stem + **そう** says how something looks from what you can see: [高|たか]そう (looks expensive), [雨|あめ]が[降|ふ]りそう (looks as if it's going to rain).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["い-adjective: drop the い", "[高|たか]そう"],
          ["いい and ない: よさ, なさ", "よさそう · なさそう"],
          ["な-adjective", "[元気|げんき]そう"],
          ["い-adjective, negative: くなさそう", "[高|たか]くなさそう"],
          ["Verb stem: about to happen", "[降|ふ]りそう"],
          ["Before a noun: そう な", "おいしそう な パン"],
          ["Before a verb: そう に", "[楽|たの]しそう に [話|はな]す"],
        ],
      },
      {
        type: "text",
        text: "そう works like a な-adjective: そうです politely, そうだ or plain そう casually, そうな before a noun and そうに before a verb. いい becomes よさそう and ない becomes なさそう ([時間|じかん]がなさそう: there doesn't seem to be time). After an adjective it's how a thing or person looks; after a verb's stem it's what looks about to happen, or likely to.",
      },
      { type: "heading", text: "Adjective + そう: looks …" },
      {
        type: "examples",
        items: [
          { jp: "この ケーキ、 おいし{そう} です ね。", en: "This cake looks delicious.", alt: "この ケーキ、 おいし{そう}！" },
          { jp: "[田中|たなか]-さん、 [今日|きょう] は [忙|いそが]し{そう} です ね。", en: "Tanaka-san looks busy today.", alt: "[田中|たなか]-さん、 [今日|きょう] は [忙|いそが]し{そう} だ ね。" },
          { jp: "[山田|やまだ]-さん は [元気|げんき]{そう} でした。", en: "Yamada-san seemed well.", alt: "[山田|やまだ]-さん は [元気|げんき]{そう} だった。" },
          { jp: "[重|おも]{そう} だ ね。 [持|も]とう か？", en: "That looks heavy. Shall I carry it?", alt: "[重|おも]{そう} です ね。 [持|も]ちましょう か？" },
          { jp: "この [店|みせ]、 {よさそう} です ね。", en: "This place looks good.", alt: "この [店|みせ]、 {よさそう} だ ね。", note: "いい takes よさそう, never いそう." },
        ],
      },
      { type: "heading", text: "Verb stem + そう: looks about to …" },
      {
        type: "examples",
        items: [
          { jp: "[雨|あめ] が [降|ふ]り{そう} です ね。", en: "It looks like it's going to rain.", alt: "[雨|あめ] が [降|ふ]り{そう} だ ね。" },
          { jp: "[荷物|にもつ] が [落|お]ち{そう} です よ。", en: "Your bags look like they're about to fall.", alt: "[荷物|にもつ] が [落|お]ち{そう} だ よ。" },
          { jp: "[妹|いもうと] が [泣|な]き{そう} です。", en: "My little sister looks like she's going to cry.", alt: "[妹|いもうと] が [泣|な]き{そう}。" },
          { jp: "[会議|かいぎ] に [間|ま]に[合|あ]い{そう}？", en: "Do you think you'll make it to the meeting?", alt: "[会議|かいぎ] に [間|ま]に[合|あ]い{そう} です か？", note: "From how things stand, not only from a look: will it work out?" },
        ],
      },
      { type: "heading", text: "そうな + noun, そうに + verb" },
      {
        type: "examples",
        items: [
          { jp: "[駅|えき] の [前|まえ] に おいし{そう な} パン[屋|や] が ある。", en: "There's a bakery by the station that looks good.", alt: "[駅|えき] の [前|まえ] に おいし{そう な} パン[屋|や] が あります。" },
          { jp: "[子供|こども]たち が [楽|たの]し{そう に} [遊|あそ]んで います。", en: "The children are playing happily.", alt: "[子供|こども]たち が [楽|たの]し{そう に} [遊|あそ]んで いる。" },
          { jp: "[優|やさ]し{そう な} [人|ひと] です ね。", en: "He looks kind.", alt: "[優|やさ]し{そう な} [人|ひと] だ ね。" },
          { jp: "[父|ちち] は いつも ビール を おいし{そう に} [飲|の]みます。", en: "My dad always looks like he's really enjoying his beer.", alt: "[父|ちち] は いつも ビール を おいし{そう に} [飲|の]む。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [服|ふく]、 {[高|たか]い} です ね。", en: "These clothes are expensive." },
        b: { jp: "この [服|ふく]、 {[高|たか]そう} です ね。", en: "These clothes look expensive." },
        diff: "a states it: you've seen the price. b judges from how they look.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Looks like, or I hear?",
        text: "✗ [雨|あめ]が[降|ふ]るそうです (meaning “it looks like rain”) ✓ [雨|あめ]が[降|ふ]りそうです. “Looks like” takes the stem; after the full plain form, そうです means “I hear”: [降|ふ]るそうです is “I hear it's going to rain” (the next lesson). And for what's plain to see, say it outright: この[花|はな]はきれいですね. かわいそう isn't “looks cute”: it's a word of its own, “poor thing”.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "ねえ、 この ラーメン、 おいし{そう}！", en: "Hey, this ramen looks amazing!" },
          { speaker: "Kenta", jp: "でしょ？ ここ、 いつも [人|ひと] が [多|おお]い ん だ。", en: "Told you. This place is always packed." },
          { speaker: "Aya", jp: "でも、 ちょっと [辛|から]{そう} だ ね。", en: "It looks a bit spicy, though." },
          { speaker: "Kenta", jp: "[大丈夫|だいじょうぶ]。 そんなに [辛|から]くない よ。", en: "It's fine. It's not that spicy." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with そう: “That film looks interesting” (use [面白|おもしろ]い): あの[映画|えいが]、＿ね。",
            answers: ["[面白|おもしろ]そう です"],
            explanation: "Drop the い and add そう: [面白|おもしろ]そう, + です.",
          },
          {
            prompt: "Polite, with そう: “It looks like it'll clear up this afternoon” (use [晴|は]れる): [午後|ごご]は＿。",
            answers: ["[晴|は]れそう です"],
            explanation: "What looks about to happen takes the verb's stem: [晴|は]れ + そう + です.",
          },
          {
            prompt: "With そう, before a noun: “a strong-looking dog” (use [強|つよ]い): ＿[犬|いぬ]",
            answers: ["[強|つよ]そう な"],
            explanation: "そう works like a な-adjective, so before a noun it takes な: [強|つよ]そうな[犬|いぬ].",
          },
          {
            prompt: "Casual, with そう and いい: “That looks good!” (of a plan): それ、＿ね！",
            answers: ["よさそう", "よさそう だ"],
            explanation: "いい has no stem of its own for そう: it becomes よさそう.",
          },
          {
            prompt: "Fix it (you mean “this chair looks like it's going to break”): このいすは[壊|こわ]れるそうです。",
            answers: ["この いす は [壊|こわ]れそう です。"],
            explanation: "“Looks about to” takes the stem: [壊|こわ]れそうです. [壊|こわ]れるそうです would mean “I hear it's going to break”.",
          },
        ],
      },
    ],
  },
  {
    slug: "sou-hearsay",
    title: "I hear that: そうだ after a plain form",
    mark: "〜そうだ",
    summary: "Pass on something you heard or read, and say where it came from with によると.",
    source: "Genki II ch. 17 (〜そうです: I hear); Bunpro, “そうだ” (hearsay)",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N3", "JLPT Sensei lists そうだ (I heard that) at N4."),
    blocks: [
      {
        type: "idea",
        text: "A full plain form + **そうだ** (politely **そうです**) passes on something you heard or read ([雪|ゆき]が[降|ふ]るそうです: I hear it's going to snow), and **によると** names where it came from.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[来|く]る そう だ"],
          ["Verb, plain past", "[来|き]た そう だ"],
          ["い-adjective", "[高|たか]い そう だ"],
          ["な-adjective + だ", "[静|しず]か だ そう だ"],
          ["Noun + だ", "[雨|あめ] だ そう だ"],
          ["Where you heard it: Noun + によると", "ニュース によると"],
        ],
      },
      {
        type: "text",
        text: "Unlike the “looks like” そう, this one follows a whole plain sentence, and nouns and な-adjectives keep their だ. そうだ itself never goes into the past or the negative: the tense goes in the sentence before it ([行|い]ったそうです, [行|い]かないそうです). It's common in polite speech and in writing. Among friends people often say …んだって or …らしいよ instead.",
      },
      {
        type: "examples",
        items: [
          { jp: "[週末|しゅうまつ] は [雪|ゆき] が [降|ふ]る {そう です}。", en: "I hear it's going to snow at the weekend.", alt: "[週末|しゅうまつ] は [雪|ゆき] が [降|ふ]る {そう だ} よ。" },
          { jp: "[山田|やまだ]-さん は [来月|らいげつ] [結婚|けっこん] する {そう です}。", en: "I hear Yamada-san's getting married next month.", alt: "[山田|やまだ]-さん は [来月|らいげつ] [結婚|けっこん] する {そう だ} よ。" },
          { jp: "あの [店|みせ] の ラーメン は とても おいしい {そう です}。", en: "I hear the ramen at that place is really good.", alt: "あの [店|みせ] の ラーメン は とても おいしい {そう だ}。" },
          { jp: "[田中|たなか]-さん の お[父|とう]さん は [医者|いしゃ] {だ そう です}。", en: "I hear Tanaka-san's father is a doctor." },
          { jp: "[昨日|きのう] の [試合|しあい] は [日本|にほん] が [勝|か]った {そう だ}。", en: "I hear Japan won yesterday's match.", alt: "[昨日|きのう] の [試合|しあい] は [日本|にほん] が [勝|か]った {そう です}。" },
        ],
      },
      { type: "heading", text: "によると: according to" },
      {
        type: "examples",
        items: [
          { jp: "ニュース によると、 [電車|でんしゃ] が [止|と]まって いる {そう です}。", en: "According to the news, the trains have stopped.", alt: "ニュース によると、 [電車|でんしゃ] が [止|と]まってる {そう だ} よ。" },
          { jp: "[先生|せんせい] の [話|はなし] によると、 [来週|らいしゅう] テスト が ある {そう です}。", en: "According to the teacher, there's a test next week." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[忙|いそが]し{そう} です。", en: "She looks busy." },
        b: { jp: "[忙|いそが]しい {そう} です。", en: "I hear she's busy." },
        diff: "One kana apart. The stem + そう (a) is what you can see; the full plain form + そう (b) is what you were told.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Nouns keep だ",
        text: "✗ [学生|がくせい]そうです ✓ [学生|がくせい]だそうです. Before the “I hear” そう, a noun or な-adjective needs だ. And そう itself stays as it is: ✗ [行|い]くそうでした ✓ [行|い]ったそうです.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[駅|えき] の [前|まえ] に [新|あたら]しい [喫茶店|きっさてん] が できた {そう です} よ。", en: "I hear a new café has opened in front of the station." },
          { speaker: "Mr Mori", jp: "へえ、 そう です か。", en: "Oh, really?" },
          { speaker: "Ms Sato", jp: "[友達|ともだち] の [話|はなし] によると、 ケーキ が おいしい {そう です}。", en: "According to a friend, the cakes are good." },
          { speaker: "Mr Mori", jp: "じゃあ、 [今度|こんど] [行|い]って みましょう。", en: "Let's go and try it some time, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with そう: “I hear the test is tomorrow”: テストは[明日|あした]＿。",
            answers: ["だ そう です"],
            explanation: "A noun keeps だ before the “I hear” そう: [明日|あした]だそうです.",
          },
          {
            prompt: "Polite, with そう: “I hear the manager has caught a cold” (use [引|ひ]く): [部長|ぶちょう]は[風邪|かぜ]を＿。",
            answers: ["[引|ひ]いた そう です", "[引|ひ]いて いる そう です"],
            explanation: "The past goes in the sentence before そう: [引|ひ]いた + そうです.",
          },
          {
            prompt: "Casual, with そう: “I hear that library is quiet” (use [静|しず]か): あの[図書館|としょかん]は＿よ。",
            answers: ["[静|しず]か だ そう だ"],
            explanation: "A な-adjective keeps だ: [静|しず]かだ + そうだ.",
          },
          {
            prompt: "“According to my mother (use によると), my sister is coming home”: [母|はは]＿、[姉|あね]が[帰|かえ]ってくるそうです。",
            answers: ["によると", "の [話|はなし] によると"],
            explanation: "によると names the source: [母|はは]によると, or [母|はは]の[話|はなし]によると (according to what my mother said).",
          },
          {
            prompt: "Fix it (you heard it): [山田|やまだ]さんは[先生|せんせい]そうです。",
            answers: ["[山田|やまだ]-さん は [先生|せんせい] だ そう です。"],
            explanation: "A noun needs だ before the “I hear” そう: [先生|せんせい]だそうです.",
          },
        ],
      },
    ],
  },
  {
    slug: "you-mitai",
    title: "Seems, and like: ようだ and みたい",
    mark: "〜みたい",
    summary: "Say what seems to be so from what you notice, and compare things with “like”.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (yoo da); Bunpro, “ようだ”, “みたい”, “のように・のような” and “みたいに・みたいな”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "**ようだ** and **みたいだ** say what seems to be so, judging from what you notice yourself (“it seems”, “it looks as if”); with に and な they also mean “like”: [子供|こども]のように, [子供|こども]みたいに (like a child).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "よう (more formal)", "みたい (casual)"],
        rows: [
          ["Verb, plain form", "[来|く]る よう だ", "[来|く]る みたい だ"],
          ["い-adjective", "[寒|さむ]い よう だ", "[寒|さむ]い みたい だ"],
          ["な-adjective", "[静|しず]か な よう だ", "[静|しず]か みたい だ"],
          ["Noun", "[雨|あめ] の よう だ", "[雨|あめ] みたい だ"],
          ["Like: + に before a verb or adjective", "[子供|こども] の よう に", "[子供|こども] みたい に"],
          ["Like: + な before a noun", "[子供|こども] の よう な", "[子供|こども] みたい な"],
        ],
      },
      {
        type: "text",
        text: "よう takes what a noun takes: な after a な-adjective, の after a noun. みたい goes straight after the plain form, with no な or の. Both work like a な-adjective: ようです, みたいです, みたいな + noun, みたいに + verb. みたい is everyday speech; よう sounds more formal, and it's the one you'll read. Both rest on what you notice yourself: a sound, a look, a smell, how someone acts.",
      },
      { type: "heading", text: "ようだ: seems (more formal)" },
      {
        type: "examples",
        items: [
          { jp: "[鍵|かぎ] が かかって いる {よう です}。", en: "It seems to be locked.", alt: "[鍵|かぎ] が かかってる {みたい}。" },
          { jp: "[山田|やまだ]-さん は [風邪|かぜ] {の よう です}。", en: "Yamada-san seems to have a cold.", alt: "[山田|やまだ]-さん、 [風邪|かぜ] {みたい}。" },
          { jp: "[田中|たなか]-さん は [最近|さいきん] [暇|ひま] {な よう です}。", en: "Tanaka-san seems to have time on her hands lately.", alt: "[田中|たなか]-さん、 [最近|さいきん] [暇|ひま] {みたい}。" },
          { jp: "[部長|ぶちょう] は [会議|かいぎ] の [時間|じかん] を [忘|わす]れて いる {よう です}。", en: "The manager seems to have forgotten the meeting time." },
        ],
      },
      { type: "heading", text: "みたいだ: seems (casual)" },
      {
        type: "examples",
        items: [
          { jp: "[誰|だれ] か [来|き]た {みたい} だ ね。", en: "Sounds like someone's here.", alt: "[誰|だれ] か [来|き]た {みたい} です ね。" },
          { jp: "[雨|あめ] が [降|ふ]って きた {みたい}。", en: "Looks like it's started raining.", alt: "[雨|あめ] が [降|ふ]って きた {みたい} です。" },
          { jp: "[妹|いもうと] は [新|あたら]しい [学校|がっこう] が [好|す]き {みたい}。", en: "My sister seems to like her new school.", alt: "[妹|いもうと] は [新|あたら]しい [学校|がっこう] が [好|す]き {みたい} です。" },
          { jp: "[彼|かれ] は [日本語|にほんご] が [分|わ]かる {みたい} です。", en: "He seems to understand Japanese.", alt: "[彼|かれ]、 [日本語|にほんご] が [分|わ]かる {みたい}。" },
        ],
      },
      { type: "heading", text: "Like: のように · みたいに · のような · みたいな" },
      {
        type: "examples",
        items: [
          { jp: "[兄|あに] は [子供|こども] {の よう に} [喜|よろこ]びました。", en: "My brother was as happy as a child.", alt: "[兄|あに] は [子供|こども] {みたい に} [喜|よろこ]んだ。" },
          { jp: "[今日|きょう] は [夏|なつ] {みたい に} [暑|あつ]い ね。", en: "It's as hot as summer today.", alt: "[今日|きょう] は [夏|なつ] {の よう に} [暑|あつ]い です ね。" },
          { jp: "[田中|たなか]-さん {みたい な} [人|ひと] に なりたい。", en: "I want to be someone like Tanaka-san.", alt: "[田中|たなか]-さん {の よう な} [人|ひと] に なりたい です。" },
          { jp: "[本当|ほんとう] に [夢|ゆめ] {みたい} です。", en: "It's like a dream, really.", alt: "[本当|ほんとう] に [夢|ゆめ] {みたい}！" },
          { jp: "[日本人|にほんじん] {みたい に} [日本語|にほんご] を [話|はな]したい。", en: "I want to speak Japanese like a Japanese person.", alt: "[日本人|にほんじん] {みたい に} [日本語|にほんご] を [話|はな]したい です。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] が [降|ふ]った {よう です}。", en: "It seems it rained (the ground's wet)." },
        b: { jp: "[雨|あめ] が [降|ふ]った {そう です}。", en: "I hear it rained." },
        diff: "ようです is your own judgement from what you notice; そうです after a plain form passes on what someone told you.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "みたい takes no の or な",
        text: "✗ [雨|あめ]のみたいです ✓ [雨|あめ]みたいです (or [雨|あめ]のようです). ✗ [静|しず]かなみたい ✓ [静|しず]かみたい (or [静|しず]かなようだ). よう is a noun, so it wants の and な before it; みたい follows the word directly.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "え？ [電気|でんき] が [消|き]えてる。", en: "Huh? The lights are off." },
          { speaker: "Aya", jp: "[誰|だれ] も いない {みたい} だ ね。", en: "Looks like nobody's in." },
          { speaker: "Kenta", jp: "[今日|きょう] は [休|やす]み {みたい}。 ドア に メモ が ある よ。", en: "Seems they're closed today. There's a note on the door." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with みたい: “It seems the train's late” (use [遅|おく]れる): [電車|でんしゃ]が＿。",
            answers: ["[遅|おく]れて いる みたい", "[遅|おく]れて いる みたい だ", "[遅|おく]れた みたい", "[遅|おく]れた みたい だ"],
            explanation: "みたい follows the plain form directly: [遅|おく]れている (or [遅|おく]れてる) + みたい.",
          },
          {
            prompt: "Written, with よう: “The child seems to be ill”: その[子供|こども]は[病気|びょうき]＿。",
            answers: ["の よう だ", "の よう です"],
            explanation: "よう is a noun, so a noun takes の before it: [病気|びょうき]のようだ.",
          },
          {
            prompt: "Casual, with みたい: “I want a dog like that one”: あの[犬|いぬ]＿[犬|いぬ]が[欲|ほ]しい。",
            answers: ["みたい な"],
            explanation: "Before a noun, みたい takes な: あの[犬|いぬ]みたいな[犬|いぬ].",
          },
          {
            prompt: "Polite, with よう: “It's cold like winter today”: [今日|きょう]は[冬|ふゆ]＿[寒|さむ]いです。",
            answers: ["の よう に"],
            explanation: "Before an adjective or verb, “like” is ように, with の after a noun: [冬|ふゆ]のように.",
          },
          {
            prompt: "Fix it: [彼|かれ]は[元気|げんき]なみたいです。",
            answers: ["[彼|かれ] は [元気|げんき] みたい です。", "[彼|かれ] は [元気|げんき] な よう です。"],
            explanation: "みたい follows a な-adjective with no な: [元気|げんき]みたいです. With よう, the な stays: [元気|げんき]なようです.",
          },
        ],
      },
    ],
  },
  {
    slug: "rashii",
    title: "Apparently: らしい",
    mark: "らしい",
    summary: "Say what you've gathered from what you heard or read, and what's typical of something.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (rashii); Bunpro, “らしい ①” and “らしい ②”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **らしい** says what you've gathered, usually from what you heard or read (“apparently”, “it seems”); straight after a noun it can also mean “typical of”: [春|はる]らしい[天気|てんき] (real spring weather).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[来|く]る らしい"],
          ["い-adjective", "[高|たか]い らしい"],
          ["な-adjective, no だ", "[静|しず]か らしい"],
          ["Noun, no だ", "[雨|あめ] らしい"],
          ["Typical of: Noun + らしい", "[春|はる]らしい"],
        ],
      },
      {
        type: "text",
        text: "らしい is an い-adjective: らしいです politely. Nouns and な-adjectives take it with no だ. It sounds more distant than そうだ: something you've gathered, not checked, so it's handy for gossip and for news you can't vouch for. In conversation it's very common: [来|こ]ないらしいよ (apparently she isn't coming).",
      },
      {
        type: "table",
        caption: "そう, よう, みたい and らしい",
        headers: ["Pattern", "Based on", "Example"],
        rows: [
          ["Stem + そう", "what it looks like", "[雨|あめ] が [降|ふ]りそう だ"],
          ["Plain form + そうだ", "something you were told", "[雨|あめ] が [降|ふ]る そう だ"],
          ["よう だ · みたい だ", "what you notice yourself", "[雨|あめ] が [降|ふ]った よう だ"],
          ["らしい", "what you've gathered, often second-hand", "[雨|あめ] が [降|ふ]る らしい"],
        ],
      },
      { type: "heading", text: "Apparently: らしい" },
      {
        type: "examples",
        items: [
          { jp: "[田中|たなか]-さん は [明日|あした] [来|こ]ない {らしい} よ。", en: "Apparently Tanaka-san isn't coming tomorrow.", alt: "[田中|たなか]-さん は [明日|あした] [来|こ]ない {らしい} です よ。" },
          { jp: "あの [映画|えいが]、 すごく [面白|おもしろ]い {らしい}。", en: "That film's supposed to be really good.", alt: "あの [映画|えいが] は とても [面白|おもしろ]い {らしい} です。" },
          { jp: "[来週|らいしゅう] の [試験|しけん] は [難|むずか]しい {らしい} です。", en: "Apparently next week's exam is hard.", alt: "[来週|らいしゅう] の [試験|しけん]、 [難|むずか]しい {らしい} よ。" },
          { jp: "[隣|となり] の [人|ひと] は [先生|せんせい] {らしい}。", en: "Apparently the person next door is a teacher.", alt: "[隣|となり] の [人|ひと] は [先生|せんせい] {らしい} です。" },
          { jp: "この [町|まち] は [昔|むかし] とても [静|しず]か だった {らしい} です。", en: "This town was apparently very quiet in the old days." },
        ],
      },
      { type: "heading", text: "Typical of: Noun + らしい" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は [春|はる]{らしい} [天気|てんき] です ね。", en: "It's real spring weather today.", alt: "[今日|きょう] は [春|はる]{らしい} [天気|てんき] だ ね。" },
          { jp: "それ は [彼|かれ]{らしい} [答|こた]え です ね。", en: "That answer is so like him.", alt: "それ は [彼|かれ]{らしい} [答|こた]え だ ね。" },
          { jp: "[日本|にほん]{らしい} お[土産|みやげ] を [買|か]いたい です。", en: "I want to buy a souvenir that's typically Japanese.", alt: "[日本|にほん]{らしい} お[土産|みやげ] を [買|か]いたい。" },
          { jp: "[母|はは]{らしい} [手紙|てがみ] だった。", en: "It was a letter just like Mum.", alt: "[母|はは]{らしい} [手紙|てがみ] でした。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[雨|あめ] {らしい} です。", en: "Apparently it's raining (someone said so)." },
        b: { jp: "[雨|あめ] {みたい} です。", en: "It seems to be raining (I can hear it)." },
        diff: "らしい leans on what you've heard or read; みたい on what you notice yourself. In casual speech the line between them blurs.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だ before らしい",
        text: "✗ [雨|あめ]だらしい ✓ [雨|あめ]らしい. A noun or な-adjective takes らしい directly (the past keeps its だった: [雨|あめ]だったらしい). And after a noun らしい can mean two things: [学生|がくせい]らしい is “apparently a student” or “just like a student”; the context tells you which.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[聞|き]いた？ [山田|やまだ]-さん、 [会社|かいしゃ] を [辞|や]める {らしい} よ。", en: "Have you heard? Apparently Yamada-san's leaving the company." },
          { speaker: "Kenta", jp: "え、 ほんと？ [誰|だれ] から [聞|き]いた の？", en: "What, really? Who told you?" },
          { speaker: "Aya", jp: "[田中|たなか]-さん。 でも、 まだ [分|わ]からない {らしい}。", en: "Tanaka-san. But apparently nothing's certain yet." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, with らしい: “Apparently the shop's closed today” (use [休|やす]み): その[店|みせ]は[今日|きょう]＿よ。",
            answers: ["[休|やす]み らしい"],
            explanation: "A noun takes らしい with no だ: [休|やす]みらしい.",
          },
          {
            prompt: "Polite, with らしい: “Apparently this book is popular” (use [人気|にんき]): この[本|ほん]は＿。",
            answers: ["[人気|にんき] が ある らしい です", "[人気|にんき] らしい です"],
            explanation: "[人気|にんき]がある (is popular) + らしいです.",
          },
          {
            prompt: "Casual, with らしい: “Apparently it snowed in Tokyo yesterday”: [昨日|きのう]、[東京|とうきょう]で[雪|ゆき]が＿よ。",
            answers: ["[降|ふ]った らしい"],
            explanation: "The past goes before らしい: [降|ふ]った + らしい.",
          },
          {
            prompt: "Typical of: “It's real autumn weather”: [秋|あき]＿[天気|てんき]ですね。",
            answers: ["らしい"],
            explanation: "Noun + らしい, “typical of”: [秋|あき]らしい[天気|てんき].",
          },
          {
            prompt: "Fix it: [姉|あね]の[友達|ともだち]は[医者|いしゃ]だらしいです。",
            answers: ["[姉|あね] の [友達|ともだち] は [医者|いしゃ] らしい です。"],
            explanation: "A noun takes らしい with no だ: [医者|いしゃ]らしいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "hazu",
    title: "Should be, can't be: はずだ and はずがない",
    mark: "はず",
    summary: "Say what you expect to be true, from what you know, and what can't possibly be.",
    source: "Genki II ch. 19 (〜はずです); Bunpro, “はずだ” and “はずがない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **はずだ** says what you expect to be true from what you know (“should be”, “is supposed to”); **はずがない** says it can't be.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Should be", "Can't be"],
        rows: [
          ["Verb, plain form", "[来|く]る はず だ", "[来|く]る はず が ない"],
          ["い-adjective", "[高|たか]い はず だ", "[高|たか]い はず が ない"],
          ["な-adjective + な", "[静|しず]か な はず だ", "[静|しず]か な はず が ない"],
          ["Noun + の", "[休|やす]み の はず だ", "[休|やす]み の はず が ない"],
        ],
      },
      {
        type: "text",
        text: "はず is a noun, written in kana, so it takes な and の the way a noun does. It's an expectation with a reason behind it: a timetable, what someone said, how things normally go. Politely: はずです, はずがありません. Casual speech often drops the が: はずない. はずだった is what should have happened and didn't.",
      },
      { type: "heading", text: "はずだ: should be" },
      {
        type: "examples",
        items: [
          { jp: "[電車|でんしゃ] は もうすぐ [来|く]る {はず です}。", en: "The train should be here any minute.", alt: "[電車|でんしゃ] は もうすぐ [来|く]る {はず だ} よ。" },
          { jp: "[田中|たなか]-さん は [今日|きょう] [休|やす]み {の はず} です。", en: "Tanaka-san is supposed to be off today.", alt: "[田中|たなか]-さん、 [今日|きょう] は [休|やす]み {の はず} だ よ。" },
          { jp: "[鍵|かぎ] は [机|つくえ] の [上|うえ] に [置|お]いた {はず} だ けど…", en: "I should have left the keys on the desk, but…", alt: "[鍵|かぎ] は [机|つくえ] の [上|うえ] に [置|お]いた {はず} です けど…" },
          { jp: "[図書館|としょかん] は [八時|はちじ] まで [開|あ]いて いる {はず です}。", en: "The library should be open till eight.", alt: "[図書館|としょかん] は [八時|はちじ] まで [開|あ]いてる {はず だ} よ。" },
          { jp: "[荷物|にもつ] は [昨日|きのう] [着|つ]く {はず でした} が…", en: "The parcel was supposed to arrive yesterday, but…", note: "はずだった, politely はずでした: it should have, and didn't." },
        ],
      },
      { type: "heading", text: "はずがない: can't be" },
      {
        type: "examples",
        items: [
          { jp: "そんな こと、 ある {はず が ない}。", en: "That can't be!", alt: "そんな こと、 ある {はず が ありません}。" },
          { jp: "[彼|かれ] が うそ を [言|い]う {はず が ない}。", en: "He'd never lie.", alt: "[彼|かれ] が うそ を [言|い]う {はず が ありません}。" },
          { jp: "[毎日|まいにち] [練習|れんしゅう] した から、 [負|ま]ける {はず が ない}。", en: "We practised every day, so there's no way we'll lose.", alt: "[毎日|まいにち] [練習|れんしゅう] した から、 [負|ま]ける {はず が ありません}。" },
          { jp: "この [問題|もんだい] が [子供|こども] に [分|わ]かる {はず が ありません}。", en: "There's no way a child could understand this problem.", alt: "この [問題|もんだい] が [子供|こども] に [分|わ]かる {はず が ない} よ。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山田|やまだ]-さん も [来|く]る {はず です}。", en: "Yamada-san should be coming too." },
        b: { jp: "[山田|やまだ]-さん も [来|く]る {でしょう}。", en: "Yamada-san will probably come too." },
        diff: "はず rests on something you know (she said so, it's on the schedule); でしょう is a plain guess.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Expected, not obliged",
        text: "✗ [宿題|しゅくだい]をするはずです (meaning “I have to do my homework”) ✓ [宿題|しゅくだい]をしなければなりません. はずだ says what's expected to be true; for what you have to do, use なければならない. And a noun takes の: ✗ [休|やす]みはずです ✓ [休|やす]みのはずです.",
      },
      { type: "link", href: "/learn/n5-essentials/nakereba", label: "Must: なければならない", text: "For what you have to do." },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[会議|かいぎ] は [三時|さんじ] から です よね？", en: "The meeting's at three, isn't it?" },
          { speaker: "Mr Mori", jp: "はい、 その {はず です}。 [部長|ぶちょう] が そう [言|い]って いました。", en: "Yes, it should be. The manager said so." },
          { speaker: "Ms Sato", jp: "でも、 まだ [誰|だれ] も [来|き]て いません ね。", en: "But nobody's here yet." },
          { speaker: "Mr Mori", jp: "おかしい です ね…", en: "That's odd…" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with はず: “The class should finish by five” (use [終|お]わる): [授業|じゅぎょう]は[五時|ごじ]までに＿。",
            answers: ["[終|お]わる はず です"],
            explanation: "Plain form + はずです: [終|お]わるはずです.",
          },
          {
            prompt: "Casual, with はず: “Kenta should know” (use [知|し]る): [健太|けんた]なら＿よ。",
            answers: ["[知|し]って いる はず だ", "[知|し]って いる はず"],
            explanation: "“Know” is [知|し]っている; + はずだ: [知|し]っているはずだ (casually [知|し]ってるはず).",
          },
          {
            prompt: "Casual, with はず: “There's no way it's that expensive”: そんなに[高|たか]い＿。",
            answers: ["はず が ない", "はず ない"],
            explanation: "はずがない: it can't be. Casual speech often drops the が: はずない.",
          },
          {
            prompt: "With はず, after a noun: “He should be a student”: [彼|かれ]は[学生|がくせい]＿だ。",
            answers: ["の はず"],
            explanation: "はず is a noun, so a noun takes の before it: [学生|がくせい]のはずだ.",
          },
          {
            prompt: "Fix it: [彼|かれ]は[元気|げんき]はずです。",
            answers: ["[彼|かれ] は [元気|げんき] な はず です。"],
            explanation: "A な-adjective takes な before はず: [元気|げんき]なはずです.",
          },
        ],
      },
    ],
  },
  {
    slug: "kamoshirenai",
    title: "Maybe: かもしれない and かも",
    mark: "かもしれない",
    summary: "Say something might be so, and how that differs from でしょう.",
    source: "Genki II ch. 14 (〜かもしれません); Bunpro, “かもしれない”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **かもしれない** (politely **かもしれません**) says something is possible (“maybe”, “might”); casual speech often cuts it to **かも**.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[来|く]る かも しれない"],
          ["い-adjective", "[高|たか]い かも しれない"],
          ["な-adjective, no だ", "[静|しず]か かも しれない"],
          ["Noun, no だ", "[雨|あめ] かも しれない"],
          ["Casual, cut short", "[雨|あめ] かも"],
        ],
      },
      {
        type: "text",
        text: "Like でしょう, it follows nouns and な-adjectives without だ, and it's written in kana. It's weaker than でしょう and だろう: でしょう leans towards yes, かもしれない only says it's possible. Unlike でしょう, it works for your own plans too: [遅|おく]れるかもしれません (I might be late). かも on its own is casual: to a teacher or a customer, say かもしれません in full.",
      },
      { type: "link", href: "/learn/n5-essentials/deshou", label: "Probably: でしょう and だろう", text: "The stronger guess." },
      { type: "heading", text: "かもしれない: might" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [雪|ゆき] {かも しれません}。", en: "It might snow tomorrow.", alt: "[明日|あした] は [雪|ゆき] {かも しれない}。" },
          { jp: "[会議|かいぎ] に [少|すこ]し [遅|おく]れる {かも しれません}。", en: "I might be a little late for the meeting.", alt: "[会議|かいぎ] に [少|すこ]し [遅|おく]れる {かも しれない}。" },
          { jp: "その [話|はなし]、 [本当|ほんとう] {かも しれない} よ。", en: "That story might be true, you know.", alt: "その [話|はなし] は [本当|ほんとう] {かも しれません} よ。" },
          { jp: "[財布|さいふ] を [電車|でんしゃ] に [忘|わす]れた {かも しれない}。", en: "I might have left my wallet on the train.", alt: "[財布|さいふ] を [電車|でんしゃ] に [忘|わす]れた {かも しれません}。" },
          { jp: "この [仕事|しごと] は [私|わたし] に は [難|むずか]しい {かも しれません}。", en: "This job might be too hard for me." },
        ],
      },
      { type: "heading", text: "かも: casual" },
      {
        type: "examples",
        items: [
          { jp: "それ、 いい {かも}！", en: "Ooh, that could work!", alt: "それ、 いい {かも しれません} ね。" },
          { jp: "[今日|きょう] は [早|はや]く [帰|かえ]れる {かも}。", en: "I might be able to get home early today.", alt: "[今日|きょう] は [早|はや]く [帰|かえ]れる {かも しれません}。" },
          { jp: "[風邪|かぜ] [引|ひ]いた {かも}。", en: "I think I might have caught a cold.", alt: "[風邪|かぜ] を [引|ひ]いた {かも しれません}。" },
          { jp: "あの [人|ひと]、 [先生|せんせい] {かも}。", en: "That person might be a teacher.", alt: "あの [人|ひと] は [先生|せんせい] {かも しれません}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[店|みせ] は もう [閉|し]まって いる {でしょう}。", en: "The shop will probably be closed by now." },
        b: { jp: "[店|みせ] は もう [閉|し]まって いる {かも しれません}。", en: "The shop might be closed by now." },
        diff: "でしょう: you think it's likely. かもしれません: it's possible, nothing more.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だ before it",
        text: "✗ [学生|がくせい]だかもしれない ✓ [学生|がくせい]かもしれない. Like でしょう, かもしれない follows a noun or な-adjective directly. And keep かも for friends: to a teacher, ✗ [遅|おく]れるかも ✓ [遅|おく]れるかもしれません.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[明日|あした] の ピクニック、 [雨|あめ] {かも} よ。", en: "Tomorrow's picnic might get rained off." },
          { speaker: "Aya", jp: "え、 ほんと？ じゃあ、 [傘|かさ] を [持|も]って いった ほう が いい {かも} ね。", en: "Oh no, really? We'd better take umbrellas, then." },
          { speaker: "Kenta", jp: "そう だ ね。 [上着|うわぎ] も あった ほう が いい {かも しれない}。", en: "Yeah. A jacket might be a good idea too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with かもしれない: “It might be cold tonight” (use [寒|さむ]い): [今夜|こんや]は＿。",
            answers: ["[寒|さむ]い かも しれません"],
            explanation: "An い-adjective goes straight before it: [寒|さむ]いかもしれません.",
          },
          {
            prompt: "Casual, with かも or かもしれない: “He might be ill”: [彼|かれ]、[病気|びょうき]＿。",
            answers: ["かも", "かも しれない", "かも ね", "かも しれない ね"],
            explanation: "A noun takes it with no だ: [病気|びょうき]かも, or in full [病気|びょうき]かもしれない.",
          },
          {
            prompt: "Polite, with かもしれない: “I might not be able to go tomorrow” (use [行|い]ける): [明日|あした]は＿。",
            answers: ["[行|い]けない かも しれません"],
            explanation: "The negative goes before it: [行|い]けない + かもしれません.",
          },
          {
            prompt: "Casual, with かもしれない: “It might have been a dream”: [夢|ゆめ]だった＿。",
            answers: ["かも しれない", "かも"],
            explanation: "The past keeps its だった: [夢|ゆめ]だったかもしれない.",
          },
          {
            prompt: "Fix it: [明日|あした]は[雨|あめ]だかもしれません。",
            answers: ["[明日|あした] は [雨|あめ] かも しれません。"],
            explanation: "A noun takes かもしれません with no だ: [雨|あめ]かもしれません.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-omou",
    title: "I think: とおもう and とおもっている",
    mark: "と[思|おも]う",
    summary: "Say what you think, and what someone else thinks.",
    source: "Genki I ch. 8 (〜と思います); Bunpro, “とおもう”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **と[思|おも]う** says what you think (“I think that…”); **と[思|おも]っている** is what someone has been thinking, and the usual way to say what another person thinks.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before と", "Example"],
        rows: [
          ["Verb, plain form", "[来|く]る と [思|おも]う"],
          ["Verb, plain negative", "[来|こ]ない と [思|おも]う"],
          ["い-adjective", "[高|たか]い と [思|おも]う"],
          ["な-adjective + だ", "[静|しず]か だ と [思|おも]う"],
          ["Noun + だ", "[学生|がくせい] だ と [思|おも]う"],
        ],
      },
      {
        type: "text",
        text: "What comes before と is plain even in polite speech: the politeness goes on [思|おも]う ([思|おも]います). Nouns and な-adjectives keep だ here, unlike before でしょう. For “I don't think…”, Japanese usually makes the part before と negative: [来|こ]ないと[思|おも]う rather than [来|く]ると[思|おも]わない. [思|おも]う on its own is your own view; for someone else's, say [思|おも]っている ([母|はは]は…と[思|おも]っています).",
      },
      { type: "link", href: "/learn/n4-plans/you-to-omou", label: "The volitional + と[思|おも]う", text: "“I think I'll …”: your own plans." },
      { type: "heading", text: "と[思|おも]う: I think" },
      {
        type: "examples",
        items: [
          { jp: "この [映画|えいが] は [面白|おもしろ]い {と [思|おも]います}。", en: "I think this film is good.", alt: "この [映画|えいが] は [面白|おもしろ]い {と [思|おも]う}。" },
          { jp: "[田中|たなか]-さん は もう [帰|かえ]った {と [思|おも]う} よ。", en: "I think Tanaka-san's already gone home.", alt: "[田中|たなか]-さん は もう [帰|かえ]った {と [思|おも]います} よ。" },
          { jp: "あの [人|ひと] は [先生|せんせい] {だ と [思|おも]います}。", en: "I think that person's a teacher.", alt: "あの [人|ひと]、 [先生|せんせい] {だ と [思|おも]う}。" },
          { jp: "[明日|あした] は [雨|あめ] が [降|ふ]らない {と [思|おも]う}。", en: "I don't think it'll rain tomorrow.", alt: "[明日|あした] は [雨|あめ] が [降|ふ]らない {と [思|おも]います}。", note: "“I don't think…”: the part before と is negative." },
          { jp: "[京都|きょうと] の ほう が [静|しず]か {だ と [思|おも]う}。", en: "I think Kyoto's quieter.", alt: "[京都|きょうと] の ほう が [静|しず]か {だ と [思|おも]います}。" },
        ],
      },
      { type: "heading", text: "と[思|おも]っている: someone thinks" },
      {
        type: "examples",
        items: [
          { jp: "[母|はは] は [私|わたし] が まだ [子供|こども] {だ と [思|おも]って います}。", en: "My mother thinks I'm still a child.", alt: "[母|はは] は [私|わたし] が まだ [子供|こども] {だ と [思|おも]って いる}。" },
          { jp: "[兄|あに] は この [車|くるま] が [一番|いちばん] いい {と [思|おも]って います}。", en: "My brother thinks this car is the best.", alt: "[兄|あに] は この [車|くるま] が [一番|いちばん] いい {と [思|おも]って いる}。" },
          { jp: "みんな、 [田中|たなか]-さん が [来|く]る {と [思|おも]って いた}。", en: "Everyone thought Tanaka-san was coming.", alt: "みんな、 [田中|たなか]-さん が [来|く]る {と [思|おも]って いました}。" },
          { jp: "[多|おお]く の [人|ひと] が [日本語|にほんご] は [難|むずか]しい {と [思|おも]って います}。", en: "A lot of people think Japanese is hard." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山田|やまだ]-さん は [明日|あした] も [来|く]る {と [思|おも]います}。", en: "I think Yamada-san will come tomorrow too." },
        b: { jp: "[私|わたし] は [明日|あした] も [来|こ]{よう と [思|おも]います}。", en: "I think I'll come tomorrow too." },
        diff: "The plain form + と[思|おも]う is your opinion of what will happen; the volitional + と[思|おも]う is your own plan.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Plain before と, and だ after a noun",
        text: "✗ [学生|がくせい]と[思|おも]います ✓ [学生|がくせい]だと[思|おも]います. Before と, a noun or な-adjective needs だ. And the part before と stays plain: ✗ [来|き]ますと[思|おも]います ✓ [来|く]ると[思|おも]います.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "この [店|みせ]、 どう [思|おも]います か？", en: "What do you think of this place?" },
          { speaker: "Mr Mori", jp: "[料理|りょうり] は おいしい {と [思|おも]います}。 でも、 ちょっと [高|たか]い です ね。", en: "I think the food's good. It's a bit pricey, though." },
          { speaker: "Ms Sato", jp: "そう です ね。 [山田|やまだ]-さん も [高|たか]い {と [思|おも]って います} よ。", en: "Yes. Yamada-san thinks it's expensive too." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with と[思|おも]う: “I think the station is near” (use [近|ちか]い): [駅|えき]は＿。",
            answers: ["[近|ちか]い と [思|おも]います"],
            explanation: "The adjective stays plain; the politeness goes on [思|おも]います.",
          },
          {
            prompt: "Casual, with と[思|おも]う: “I think he's Japanese”: [彼|かれ]は[日本人|にほんじん]＿。",
            answers: ["だ と [思|おも]う"],
            explanation: "A noun needs だ before と: [日本人|にほんじん]だと[思|おも]う.",
          },
          {
            prompt: "Casual, with と[思|おも]う: “I don't think she'll come” (use [来|く]る): [彼女|かのじょ]は＿。",
            answers: ["[来|こ]ない と [思|おも]う", "[来|く]る と [思|おも]わない"],
            explanation: "Japanese usually puts the negative before と: [来|こ]ないと[思|おも]う.",
          },
          {
            prompt: "Polite, someone else's view: “My sister thinks these clothes are cute”: [妹|いもうと]はこの[服|ふく]がかわいい＿。",
            answers: ["と [思|おも]って います"],
            explanation: "For what someone else thinks, と[思|おも]っています.",
          },
          {
            prompt: "Fix it: この[本|ほん]は[有名|ゆうめい]と[思|おも]います。",
            answers: ["この [本|ほん] は [有名|ゆうめい] だ と [思|おも]います。"],
            explanation: "A な-adjective needs だ before と: [有名|ゆうめい]だと[思|おも]います.",
          },
        ],
      },
    ],
  },
  {
    slug: "to-iu",
    title: "Said, called, the fact that: という and ということ",
    mark: "と[言|い]う",
    summary: "Quote and report what someone said, name things with という, and turn a statement into a noun with ということ.",
    source: "Genki I ch. 8 (〜と言っていました); Makino & Tsutsui, Dictionary of Basic Japanese Grammar (to iu); Bunpro, “と (quotation)” and “ということ”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro has quoting と at N5 and という (called) at N3; JLPT Sensei lists という and ということ at N4."),
    blocks: [
      {
        type: "idea",
        text: "と marks what was said (「…」と[言|い]った quotes the words, a plain form + と[言|い]った reports them), **という** joins a name to what it names (「[緑|みどり]」という[店|みせ]: a shop called Midori), and **ということ** turns a whole statement into a noun (“the fact that”, “so that means”).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Pattern", "Example"],
        rows: [
          ["Quoted: 「…」 + と + [言|い]う", "「おはよう」 と [言|い]った"],
          ["Reported: plain form + と + [言|い]う", "[来|こ]ない と [言|い]った"],
          ["Called: Name + という + Noun", "[緑|みどり] と いう [店|みせ]"],
          ["The fact that: plain form + ということ", "[来|く]る と いう こと"],
        ],
      },
      {
        type: "text",
        text: "A quote in 「」 keeps the speaker's own words, polite or not. Reported words are plain, and the politeness goes on [言|い]う ([言|い]いました); nouns and な-adjectives take だ before と, as with と[思|おも]う. When it means “called”, という is written in kana. In casual speech って often replaces と: [来|こ]ないって[言|い]ってた, [緑|みどり]っていう[店|みせ].",
      },
      { type: "link", href: "/learn/particles/to-ya", label: "と and や", text: "Where quoting と first appears." },
      { type: "heading", text: "と[言|い]う: said" },
      {
        type: "examples",
        items: [
          { jp: "[先生|せんせい] は 「[明日|あした] テスト を します」 {と [言|い]いました}。", en: "The teacher said, “We'll have a test tomorrow.”", alt: "[先生|せんせい] は 「[明日|あした] テスト を します」 {と [言|い]った}。" },
          { jp: "[田中|たなか]-さん は [今日|きょう] は [来|こ]ない {と [言|い]って いました}。", en: "Tanaka-san said she isn't coming today.", alt: "[田中|たなか]-さん、 [今日|きょう] は [来|こ]ない {って [言|い]ってた}。" },
          { jp: "[父|ちち] は [仕事|しごと] が [忙|いそが]しい {と [言|い]って いた}。", en: "Dad said work was busy.", alt: "[父|ちち] は [仕事|しごと] が [忙|いそが]しい {と [言|い]って いました}。" },
          { jp: "[彼|かれ] は 「すぐ [行|い]く」 {と [言|い]った}。", en: "He said, “I'll be right there.”", alt: "[彼|かれ] は 「すぐ [行|い]く」 {と [言|い]いました}。" },
          { jp: "これ は [日本語|にほんご] で [何|なん] {と [言|い]います} か？", en: "What's this called in Japanese?" },
        ],
      },
      { type: "heading", text: "という: called" },
      {
        type: "examples",
        items: [
          { jp: "「[緑|みどり]」 {と いう} [喫茶店|きっさてん] を [知|し]って います か？", en: "Do you know a café called Midori?", alt: "「[緑|みどり]」 {って いう} [喫茶店|きっさてん]、 [知|し]ってる？" },
          { jp: "[山田|やまだ] {と いう} [人|ひと] から [電話|でんわ] が ありました。", en: "There was a call from someone called Yamada.", alt: "[山田|やまだ] {って いう} [人|ひと] から [電話|でんわ] が あった よ。" },
          { jp: "これ は [何|なん] {と いう} [花|はな] です か？", en: "What's this flower called?", alt: "これ、 [何|なん] {って いう} [花|はな]？" },
          { jp: "「[月|つき]」 {と いう} [映画|えいが] を [見|み]ました。", en: "I saw a film called “Tsuki”.", alt: "「[月|つき]」 {って いう} [映画|えいが] を [見|み]た。" },
        ],
      },
      { type: "heading", text: "ということ: the fact that, so that means" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] は [休|やす]み {と いう こと} です か？", en: "So you mean tomorrow's a day off?", alt: "[明日|あした] は [休|やす]み {って こと}？" },
          { jp: "[来月|らいげつ] [値段|ねだん] が [上|あ]がる {と いう こと} を [知|し]って います か？", en: "Did you know prices are going up next month?" },
          { jp: "[一人|ひとり] で [生活|せいかつ] する {と いう こと} は [大変|たいへん] です。", en: "Living on your own is hard work.", alt: "[一人|ひとり] で [生活|せいかつ] する {と いう こと} は [大変|たいへん] だ。" },
          { jp: "じゃあ、 [今日|きょう] は [会|あ]えない {と いう こと} だ ね。", en: "So that means we can't meet today.", alt: "じゃあ、 [今日|きょう] は [会|あ]えない {と いう こと} です ね。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{「[行|い]きます」} と [言|い]いました。", en: "She said, “I'll go.”" },
        b: { jp: "{[行|い]く} と [言|い]いました。", en: "She said she'd go." },
        diff: "a quotes her own words, polite and all. b reports them, so they're plain; the politeness is in [言|い]いました.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Reported nouns keep だ",
        text: "✗ [彼|かれ]は[医者|いしゃ]と[言|い]いました (meaning “he said he's a doctor”) ✓ [彼|かれ]は[医者|いしゃ]だと[言|い]いました. Without だ, it sounds as if he said the single word “doctor”. Reported nouns and な-adjectives keep だ before と, as before と[思|おも]う.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "さっき、 [森|もり] {と いう} [人|ひと] が [来|き]た よ。", en: "Someone called Mori came by earlier." },
          { speaker: "Aya", jp: "え、 [何|なに]か [言|い]ってた？", en: "Oh? Did she say anything?" },
          { speaker: "Kenta", jp: "[明日|あした] また [来|く]る {って [言|い]ってた} よ。", en: "She said she'd come back tomorrow." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, quoting: “My friend said, ‘It's fine’”: [友達|ともだち]は「[大丈夫|だいじょうぶ]」＿。",
            answers: ["と [言|い]いました", "と [言|い]って いました", "って [言|い]いました", "って [言|い]って いました"],
            explanation: "と marks the quote, then [言|い]いました (or [言|い]っていました, “was saying”).",
          },
          {
            prompt: "Casual, reporting: “Kenta said he's busy” (use [忙|いそが]しい): [健太|けんた]は＿よ。",
            answers: ["[忙|いそが]しい と [言|い]って いた", "[忙|いそが]しい って [言|い]って いた", "[忙|いそが]しい と [言|い]った", "[忙|いそが]しい って [言|い]った"],
            explanation: "Reported words are plain: [忙|いそが]しいと[言|い]っていた, casually [忙|いそが]しいって[言|い]ってた.",
          },
          {
            prompt: "Called: “a cat called Tama”: 「タマ」＿[猫|ねこ]",
            answers: ["と いう", "って いう"],
            explanation: "Name + という + noun: 「タマ」という[猫|ねこ] (casually っていう).",
          },
          {
            prompt: "Polite, with ということ: “So that means the shop is closed?”: [店|みせ]は[休|やす]み＿か？",
            answers: ["と いう こと です", "って いう こと です"],
            explanation: "ということです checks what something means: [休|やす]みということですか？",
          },
          {
            prompt: "Fix it (he said he's free tomorrow): [彼|かれ]は[明日|あした][暇|ひま]と[言|い]いました。",
            answers: ["[彼|かれ] は [明日|あした] [暇|ひま] だ と [言|い]いました。", "[彼|かれ] は [明日|あした] [暇|ひま] だ って [言|い]いました。"],
            explanation: "A reported な-adjective keeps だ before と: [暇|ひま]だと[言|い]いました.",
          },
        ],
      },
    ],
  },
  {
    slug: "ka-dou-ka",
    title: "Questions inside sentences: か and かどうか",
    mark: "かどうか",
    summary: "Put a question inside a sentence: “I don't know what time it starts”, “I haven't decided whether to go”.",
    source: "Genki II ch. 20 (questions within larger sentences); Bunpro, “かどうか” and “Question-phrase + か”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A question can sit inside a bigger sentence: with a question word, end it in **か** ([何時|なんじ]に[来|く]るか[分|わ]からない: I don't know what time she's coming); for a yes-or-no question, end it in **かどうか** ([行|い]くかどうか[決|き]めていない: I haven't decided whether I'm going).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "With a question word", "Yes or no"],
        rows: [
          ["Verb, plain form", "[何時|なんじ] に [来|く]る か", "[来|く]る か どう か"],
          ["Verb, plain past", "[何|なに] を [買|か]った か", "[買|か]った か どう か"],
          ["い-adjective", "どれ が [安|やす]い か", "[安|やす]い か どう か"],
          ["な-adjective, no だ", "どこ が [静|しず]か か", "[静|しず]か か どう か"],
          ["Noun, no だ", "[誰|だれ] の [傘|かさ] か", "[本当|ほんとう] か どう か"],
        ],
      },
      {
        type: "text",
        text: "The question inside is plain, even in a polite sentence: the politeness goes on the verb at the end ([分|わ]かりません, [教|おし]えてください). A noun or な-adjective takes か with no だ. The verbs that usually follow are [分|わ]かる, [知|し]る, [聞|き]く, [教|おし]える, [決|き]める, [覚|おぼ]える and [忘|わす]れる. You'll also hear のか (どこにあるのか[分|わ]からない), a little more emphatic. A bare か also works for a yes-or-no question ([行|い]くか[決|き]めていない), but かどうか spells out the yes-or-no.",
      },
      { type: "heading", text: "Question word … か" },
      {
        type: "examples",
        items: [
          { jp: "[会議|かいぎ] が [何時|なんじ] に [始|はじ]まる {か} [分|わ]かりません。", en: "I don't know what time the meeting starts.", alt: "[会議|かいぎ]、 [何時|なんじ] に [始|はじ]まる {か} [分|わ]からない。" },
          { jp: "[誰|だれ] が [来|く]る {か} [知|し]って います か？", en: "Do you know who's coming?", alt: "[誰|だれ] が [来|く]る {か} [知|し]ってる？" },
          { jp: "[何|なに] を [買|か]った {か} [忘|わす]れた。", en: "I've forgotten what I bought.", alt: "[何|なに] を [買|か]った {か} [忘|わす]れました。" },
          { jp: "どこ に [傘|かさ] を [置|お]いた {か} [覚|おぼ]えて いない。", en: "I can't remember where I left my umbrella.", alt: "どこ に [傘|かさ] を [置|お]いた {か} [覚|おぼ]えて いません。" },
          { jp: "どの [電車|でんしゃ] に [乗|の]れば いい {か} [教|おし]えて ください。", en: "Please tell me which train I should take." },
        ],
      },
      { type: "heading", text: "かどうか: whether or not" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした] [行|い]く {か どう か} まだ [決|き]めて いません。", en: "I haven't decided yet whether I'm going tomorrow.", alt: "[明日|あした] [行|い]く {か どう か} まだ [決|き]めて いない。" },
          { jp: "[窓|まど] が [閉|し]まって いる {か どう か} [見|み]て きます。", en: "I'll go and check whether the windows are shut.", alt: "[窓|まど] が [閉|し]まって いる {か どう か} [見|み]て くる ね。" },
          { jp: "[森|もり]-さん が [来|く]る {か どう か} [分|わ]からない。", en: "I don't know whether Mori-san is coming.", alt: "[森|もり]-さん が [来|く]る {か どう か} [分|わ]かりません。" },
          { jp: "この [答|こた]え が [正|ただ]しい {か どう か} [先生|せんせい] に [聞|き]いて みます。", en: "I'll ask the teacher whether this answer is right.", alt: "この [答|こた]え が [正|ただ]しい {か どう か} [先生|せんせい] に [聞|き]いて みる。" },
          { jp: "その [部屋|へや] が [静|しず]か {か どう か} [知|し]りたい です。", en: "I'd like to know whether the room is quiet.", alt: "その [部屋|へや] が [静|しず]か {か どう か} [知|し]りたい。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[山田|やまだ]-さん が [行|い]く {か どう か} [聞|き]きました。", en: "I asked whether Yamada-san is going." },
        b: { jp: "[山田|やまだ]-さん が いつ [行|い]く {か} [聞|き]きました。", en: "I asked when Yamada-san is going." },
        diff: "A yes-or-no question takes かどうか; once there's a question word (いつ), か alone does the job.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A question word takes か alone",
        text: "✗ [何時|なんじ]に[来|く]るかどうか[分|わ]かりません ✓ [何時|なんじ]に[来|く]るか[分|わ]かりません. かどうか is “whether or not”, so it can't follow a question word. And the question inside stays plain, with no だ after a noun: ✗ [学生|がくせい]ですかどうか ✓ [学生|がくせい]かどうか: the usual form has no だ, as before かもしれない.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[明日|あした] の [会議|かいぎ]、 [何時|なんじ] に [終|お]わる {か} [知|し]って います か？", en: "Do you know what time tomorrow's meeting finishes?" },
          { speaker: "Mr Mori", jp: "すみません、 [分|わ]かりません。 [部長|ぶちょう] に [聞|き]いて みます。", en: "Sorry, I don't. I'll ask the manager." },
          { speaker: "Ms Sato", jp: "ありがとう ございます。 [部屋|へや] が [使|つか]える {か どう か} も [聞|き]いて もらえます か？", en: "Thank you. Could you also ask whether we can use the room?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with か: “I don't know where the post office is”: [郵便局|ゆうびんきょく]が＿[分|わ]かりません。",
            answers: ["どこ に ある か", "どこ か", "どこ に ある の か", "どこ な の か"],
            explanation: "Question word + plain form + か: [郵便局|ゆうびんきょく]がどこにあるか[分|わ]かりません (or simply どこか).",
          },
          {
            prompt: "Casual, with かどうか: “I don't know whether the library is open on Sunday” (use [開|あ]く): [日曜日|にちようび]に[図書館|としょかん]が＿[分|わ]からない。",
            answers: ["[開|あ]く か どう か", "[開|あ]いて いる か どう か"],
            explanation: "A yes-or-no question inside a sentence ends in かどうか: [開|あ]くかどうか, or [開|あ]いているかどうか.",
          },
          {
            prompt: "With a noun, yes or no: “I don't know whether she's a student”: [彼女|かのじょ]が[学生|がくせい]＿[分|わ]かりません。",
            answers: ["か どう か", "か"],
            explanation: "A noun takes かどうか with no だ: [学生|がくせい]かどうか (a bare か works too).",
          },
          {
            prompt: "Polite, with か: “Please tell me what you'd like to eat”: [何|なに]が＿[教|おし]えてください。",
            answers: ["[食|た]べたい か", "[食|た]べたい の か"],
            explanation: "The question inside stays plain: [何|なに]が[食|た]べたいか[教|おし]えてください.",
          },
          {
            prompt: "Fix it: バスが[何時|なんじ]に[来|く]るかどうか[分|わ]かりません。",
            answers: ["バス が [何時|なんじ] に [来|く]る か [分|わ]かりません。", "バス が [何時|なんじ] に [来|く]る の か [分|わ]かりません。"],
            explanation: "With a question word ([何時|なんじ]), か alone: [何時|なんじ]に[来|く]るか.",
          },
        ],
      },
    ],
  },
  {
    slug: "n-desu",
    title: "Explaining: のだ and んです",
    mark: "んです",
    summary: "Give the story behind something, ask for it, and know when not to.",
    source: "Genki I ch. 12 (〜んです); Bunpro, “〜んです・のです”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N5"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **んです** (casually **んだ**, in writing **のです**) presents what you say as the explanation or the story behind something; as a question, **んですか** (casually **の？**) asks for that story.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[行|い]く ん です"],
          ["Verb, plain past", "[行|い]った ん です"],
          ["い-adjective", "[痛|いた]い ん です"],
          ["な-adjective + な", "[暇|ひま] なん です"],
          ["Noun + な", "[学生|がくせい] なん です"],
          ["Casual question", "[行|い]く の？"],
        ],
      },
      {
        type: "text",
        text: "ん is a spoken の: written Japanese uses のです and のだ. Nouns and な-adjectives take な before it ([休|やす]みなんです). It does three jobs: explaining (“it's that…”, “you see”), asking for an explanation of something you've noticed (どうしたんですか？ “what's happened?”), and adding feeling ([本当|ほんとう]に[楽|たの]しかったんです: it really was fun). A plain question asks for facts; a んですか question shows you've noticed something and want the story. Casually, the question is …の？ and the statement …んだ or …の.",
      },
      { type: "heading", text: "んです · んだ: explaining" },
      {
        type: "examples",
        items: [
          { jp: "すみません、 [頭|あたま] が [痛|いた]い {ん です}。", en: "Sorry, I've got a headache.", alt: "ごめん、 [頭|あたま] が [痛|いた]い {ん だ}。", note: "Say it as the reason for leaving early: you're explaining, not just reporting." },
          { jp: "[明日|あした] は [行|い]けません。 [仕事|しごと] が ある {ん です}。", en: "I can't go tomorrow. I've got work, you see.", alt: "[明日|あした] は [行|い]けない。 [仕事|しごと] が ある {ん だ}。" },
          { jp: "この [町|まち] は [夜|よる] とても [静|しず]か {なん です}。", en: "This town is really quiet at night, you know.", alt: "この [町|まち]、 [夜|よる] は すごく [静|しず]か {なん だ}。" },
          { jp: "[弟|おとうと] は まだ [大学生|だいがくせい] {なん です}。", en: "My brother's still at university, you see.", alt: "[弟|おとうと] は まだ [大学生|だいがくせい] {なん だ}。" },
          { jp: "[昨日|きのう] の パーティー、 [本当|ほんとう] に [楽|たの]しかった {ん だ}。", en: "Yesterday's party was really fun.", alt: "[昨日|きのう] の パーティー、 [本当|ほんとう] に [楽|たの]しかった {ん です}。", note: "Feeling: you want them to know how it was." },
        ],
      },
      { type: "heading", text: "んですか · の？: asking for the story" },
      {
        type: "examples",
        items: [
          { jp: "どう した {ん です か}？", en: "What's the matter?", alt: "どう した {の}？" },
          { jp: "どうして [日本語|にほんご] を [勉強|べんきょう] して いる {ん です か}？", en: "Why are you studying Japanese?", alt: "どうして [日本語|にほんご] を [勉強|べんきょう] して いる {の}？" },
          { jp: "[新|あたら]しい [靴|くつ] だ ね。 どこ で [買|か]った {の}？", en: "New shoes! Where did you get them?", alt: "[新|あたら]しい [靴|くつ] です ね。 どこ で [買|か]った {ん です か}？" },
          { jp: "[元気|げんき] が ない ね。 [何|なに]か あった {の}？", en: "You seem down. Did something happen?", alt: "[元気|げんき] が ない です ね。 [何|なに]か あった {ん です か}？" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[昨日|きのう] [休|やす]みました {か}？", en: "Were you off yesterday?" },
        b: { jp: "[昨日|きのう] [休|やす]んだ {ん です か}？", en: "Oh, were you off yesterday? (I didn't see you)" },
        diff: "a just asks for the fact. b shows you've noticed something and want to know what happened.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not every sentence is an explanation",
        text: "✗ [学生|がくせい]んです ✓ [学生|がくせい]なんです: a noun needs な. And don't use it everywhere: introducing yourself, ✗ [私|わたし]は[学生|がくせい]なんです ✓ [私|わたし]は[学生|がくせい]です. With nothing to explain, んです sounds as if you're making excuses or hinting at something. Asked a simple question, answer simply: [行|い]きますか？ → はい、[行|い]きます.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[健太|けんた]、 [眠|ねむ]そう だ ね。 どう した {の}？", en: "Kenta, you look sleepy. What's up?" },
          { speaker: "Kenta", jp: "[昨日|きのう]、 [三時|さんじ] まで ゲーム を して いた {ん だ}。", en: "I was playing games till three last night." },
          { speaker: "Aya", jp: "え、 [今日|きょう] テスト が ある {ん だ} よ！", en: "What? We've got a test today!" },
        ],
      },
      {
        type: "callout",
        kind: "tip",
        text: "〜んですが… opens a request or a question gently, by giving the background first: ちょっと[聞|き]きたいことがあるんですが… (there's something I'd like to ask…).",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, explaining why you're late: “The bus didn't come” (use [来|く]る): バスが＿。",
            answers: ["[来|こ]なかった ん です", "[来|こ]なかった の です"],
            explanation: "Plain past negative + んです: [来|こ]なかったんです.",
          },
          {
            prompt: "Casual, with の: “Why are you laughing?” (use [笑|わら]う): どうして＿？",
            answers: ["[笑|わら]って いる の"],
            explanation: "Asking for the story, casually: plain form + の: [笑|わら]っているの？ (or [笑|わら]ってるの？).",
          },
          {
            prompt: "Polite, with a な-adjective: “I'm free today, you see”: [今日|きょう]は[暇|ひま]＿。",
            answers: ["なん です", "な の です"],
            explanation: "A な-adjective takes な: [暇|ひま]なんです.",
          },
          {
            prompt: "Casual, with んだ: “I've lost my key” (use なくす): [鍵|かぎ]を＿。",
            answers: ["なくした ん だ", "なくしちゃった ん だ", "なくして しまった ん だ"],
            explanation: "Plain past + んだ: なくしたんだ.",
          },
          {
            prompt: "Fix it: [母|はは]は[先生|せんせい]んです。",
            answers: ["[母|はは] は [先生|せんせい] なん です。", "[母|はは] は [先生|せんせい] な の です。"],
            explanation: "A noun takes な before ん: [先生|せんせい]なんです.",
          },
        ],
      },
    ],
  },
  {
    slug: "kana",
    title: "I wonder: かな and かしら",
    mark: "かな",
    summary: "Wonder aloud, ask softly, and say “I think I might…”, and the polite way to do it.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (kana, kashira); Bunpro, “かな” and “かしら”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A plain form + **かな** wonders aloud (“I wonder if…”) or asks softly, and **かしら** means the same with a traditionally feminine sound; both are casual, and the polite way to wonder is **でしょうか**.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["Verb, plain form", "[来|く]る かな"],
          ["Verb, plain past", "[来|き]た かな"],
          ["い-adjective", "[高|たか]い かな"],
          ["な-adjective, no だ", "[静|しず]か かな"],
          ["Noun, no だ", "[雨|あめ] かな"],
          ["Volitional: I think I might", "[帰|かえ]ろう かな"],
          ["Negative: I wish", "[来|こ]ない かな"],
        ],
      },
      {
        type: "text",
        text: "かな is か (a question) + な (a musing ending). Like でしょう, it takes a noun or な-adjective with no だ. Said to yourself, it wonders; said to a friend, it asks without pushing (この[服|ふく]、どうかな？). After the volitional it means “I think I might”: [帰|かえ]ろうかな. After a negative it can be a wish: [早|はや]く[来|こ]ないかな (I wish she'd hurry up and come). かな and かしら are for yourself and your friends; to a teacher or a customer, use でしょうか.",
      },
      { type: "heading", text: "かな: I wonder" },
      {
        type: "examples",
        items: [
          { jp: "[明日|あした]、 [晴|は]れる {かな}。", en: "I wonder if it'll be sunny tomorrow.", alt: "[明日|あした] は [晴|は]れる {でしょう か}。" },
          { jp: "この [服|ふく]、 [大|おお]きすぎる {かな}？", en: "Is this too big, do you think?", alt: "この [服|ふく]、 [大|おお]きすぎる {でしょう か}？" },
          { jp: "[田中|たなか]-さん、 もう [着|つ]いた {かな}。", en: "I wonder if Tanaka-san's arrived yet.", alt: "[田中|たなか]-さん は もう [着|つ]いた {でしょう か}。" },
          { jp: "[誰|だれ] に [聞|き]けば いい {かな}。", en: "Who should I ask, I wonder.", alt: "[誰|だれ] に [聞|き]けば いい {でしょう か}。" },
          { jp: "[早|はや]く [夏休|なつやす]み に ならない {かな}。", en: "I wish the summer holidays would hurry up and come.", note: "After a negative: a wish." },
        ],
      },
      { type: "heading", text: "かな after the volitional and the negative" },
      {
        type: "examples",
        items: [
          { jp: "[今日|きょう] は カレー に しよう {かな}。", en: "I think I might have curry today.", note: "Volitional + かな: a plan you're toying with." },
          { jp: "[週末|しゅうまつ] は [家|いえ] に いよう {かな}。", en: "I think I might stay in at the weekend." },
          { jp: "[新|あたら]しい [靴|くつ] を [買|か]おう {かな}。", en: "I think I might buy some new shoes." },
          { jp: "[早|はや]く [春|はる] に ならない {かな}。", en: "I wish spring would hurry up.", note: "Negative + かな: a wish." },
          { jp: "[健太|けんた]、 [早|はや]く [来|こ]ない {かな}。", en: "I wish Kenta would hurry up and come." },
          { jp: "[誰|だれ] か [手伝|てつだ]って くれない {かな}。", en: "I wish someone would help." },
        ],
      },
      { type: "heading", text: "かしら: I wonder (traditionally feminine)" },
      {
        type: "examples",
        items: [
          { jp: "あの [人|ひと]、 [誰|だれ] {かしら}。", en: "I wonder who that is." },
          { jp: "[雨|あめ]、 [明日|あした] まで [降|ふ]る {かしら}。", en: "I wonder if the rain will go on till tomorrow." },
          { jp: "この ケーキ、 [子供|こども] も [食|た]べられる {かしら}。", en: "I wonder if children can eat this cake too." },
          { jp: "[窓|まど]、 [閉|し]めた {かしら}。", en: "Did I shut the window, I wonder?" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[会議|かいぎ] は [何時|なんじ] から {かな}？", en: "What time's the meeting, I wonder?" },
        b: { jp: "[会議|かいぎ] は [何時|なんじ] から {でしょう か}？", en: "What time is the meeting, may I ask?" },
        diff: "The same soft question: かな to yourself or a friend, でしょうか to a colleague, a teacher or a customer.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "No だ, and not to your teacher",
        text: "✗ [雨|あめ]だかな ✓ [雨|あめ]かな: a noun takes かな with no だ. And かな is casual: to a teacher, ✗ [明日|あした]は[休|やす]みかな？ ✓ [明日|あした]は[休|やす]みでしょうか？",
      },
      {
        type: "callout",
        kind: "culture",
        text: "かしら is traditionally a women's word. Today you'll hear it mostly from older women, and in films, books and translated dialogue; most young women, and men, say かな. Men use かしら mainly when they're putting on a voice. As a learner, かな is the safe choice for anyone.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Aya", jp: "[山田|やまだ]-さん、 [明日|あした] [来|く]る {かな}？", en: "Do you think Yamada-san will come tomorrow?" },
          { speaker: "Kenta", jp: "どう {かな}。 [最近|さいきん] [忙|いそが]しい みたい だ よ。", en: "Hard to say. She seems busy lately." },
          { speaker: "Aya", jp: "じゃあ、 [後|あと] で [電話|でんわ] して みよう {かな}。", en: "I think I might give her a call later, then." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Casual, wondering: “I wonder if he's at home” (use いる): [彼|かれ]、[家|いえ]に＿。",
            answers: ["いる かな", "いる かしら", "いる の かな", "いる の かしら"],
            explanation: "Plain form + かな (or かしら): いるかな (or いるのかな).",
          },
          {
            prompt: "Polite, wondering (to a customer): “I wonder if it'll snow tomorrow”: [明日|あした]は[雪|ゆき]が[降|ふ]る＿。",
            answers: ["でしょう か"],
            explanation: "The polite way to wonder is でしょうか: [降|ふ]るでしょうか.",
          },
          {
            prompt: "Casual, with a noun: “I wonder if this is his bag”: これ、[彼|かれ]のかばん＿。",
            answers: ["かな", "かしら", "な の かな", "な の かしら"],
            explanation: "A noun takes かな with no だ: かばんかな (or かばんなのかな).",
          },
          {
            prompt: "Casual, “I think I might”: “I think I might head home soon” (use [帰|かえ]る): そろそろ＿。",
            answers: ["[帰|かえ]ろう かな", "[帰|かえ]ろう かしら"],
            explanation: "The volitional + かな: [帰|かえ]ろうかな.",
          },
          {
            prompt: "Fix it: [今日|きょう]は[休|やす]みだかな。",
            answers: ["[今日|きょう] は [休|やす]み かな。", "[今日|きょう] は [休|やす]み な の かな。", "[今日|きょう] は [休|やす]み かしら。"],
            explanation: "No だ before かな: [休|やす]みかな.",
          },
        ],
      },
    ],
  },
  {
    slug: "yasui-nikui",
    title: "Easy to do, hard to do: やすい and にくい",
    mark: "〜やすい",
    summary: "Say whether something is easy or hard to do, with a verb's stem.",
    source: "Genki II ch. 20 (〜やすい / 〜にくい); Bunpro, “〜やすい” and “〜にくい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A verb's stem + **やすい** says something is easy to do ([読|よ]みやすい: easy to read); stem + **にくい** says it's hard to do ([読|よ]みにくい: hard to read).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Easy to", "Hard to"],
        rows: [
          ["Verb stem", "[読|よ]みやすい", "[読|よ]みにくい"],
          ["する verb stem", "[運転|うんてん] しやすい", "[運転|うんてん] しにくい"],
          ["Past", "[読|よ]みやすかった", "[読|よ]みにくかった"],
          ["Negative", "[読|よ]みやすくない", "[読|よ]みにくくない"],
          ["Before a noun", "[読|よ]みやすい [本|ほん]", "[読|よ]みにくい [本|ほん]"],
        ],
      },
      {
        type: "text",
        text: "The result is an い-adjective: [分|わ]かりやすかった, [使|つか]いにくくないです. やすい also means “tends to”, for things that happen easily: [冬|ふゆ]は[風邪|かぜ]を[引|ひ]きやすい. These words describe the doing; [易|やさ]しい and [難|むずか]しい describe the thing itself.",
      },
      { type: "heading", text: "やすい: easy to" },
      {
        type: "examples",
        items: [
          { jp: "この ペン は [書|か]き{やすい} です。", en: "This pen is nice to write with.", alt: "この ペン、 [書|か]き{やすい}。" },
          { jp: "[先生|せんせい] の [説明|せつめい] は [分|わ]かり{やすい} です ね。", en: "The teacher's explanations are easy to follow.", alt: "[先生|せんせい] の [説明|せつめい] は [分|わ]かり{やすい} ね。" },
          { jp: "この [靴|くつ] は [歩|ある]き{やすい}。", en: "These shoes are comfortable to walk in.", alt: "この [靴|くつ] は [歩|ある]き{やすい} です。" },
          { jp: "[冬|ふゆ] は [風邪|かぜ] を [引|ひ]き{やすい} です。", en: "It's easy to catch a cold in winter.", alt: "[冬|ふゆ] は [風邪|かぜ] を [引|ひ]き{やすい}。", note: "やすい as “tends to”." },
          { jp: "[東京|とうきょう] は [住|す]み{やすい} [町|まち] です か？", en: "Is Tokyo an easy city to live in?", alt: "[東京|とうきょう] って [住|す]み{やすい}？" },
        ],
      },
      { type: "heading", text: "にくい: hard to" },
      {
        type: "examples",
        items: [
          { jp: "この [地図|ちず] は [見|み]{にくい} です。", en: "This map is hard to read.", alt: "この [地図|ちず]、 [見|み]{にくい}。" },
          { jp: "この [魚|さかな] は [骨|ほね] が [多|おお]くて、 [食|た]べ{にくい}。", en: "This fish has a lot of bones, so it's hard to eat.", alt: "この [魚|さかな] は [骨|ほね] が [多|おお]くて、 [食|た]べ{にくい} です。" },
          { jp: "ちょっと [言|い]い{にくい} ん です が…", en: "This is a bit awkward to say, but…" },
          { jp: "この [車|くるま] は [大|おお]きくて [運転|うんてん] し{にくい} です。", en: "This car is big, so it's hard to drive.", alt: "この [車|くるま]、 [大|おお]きくて [運転|うんてん] し{にくい}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "この [本|ほん] は {[易|やさ]しい} です。", en: "This book is easy (the content is simple)." },
        b: { jp: "この [本|ほん] は {[読|よ]みやすい} です。", en: "This book is easy to read (clear print, short lines)." },
        diff: "[易|やさ]しい judges the content; [読|よ]みやすい judges the reading. A hard book can still be nice to read.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The stem, and い-adjective endings",
        text: "✗ この[本|ほん]は[読|よ]むやすいです ✓ [読|よ]みやすいです: やすい and にくい follow the stem. And the result is an い-adjective: ✗ [読|よ]みやすいでした ✓ [読|よ]みやすかったです.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Ms Sato", jp: "[新|あたら]しい スマホ、 どう です か？", en: "How's your new phone?" },
          { speaker: "Mr Mori", jp: "[使|つか]い{やすい} です よ。 [字|じ] が [大|おお]きくて [見|み]{やすい} ん です。", en: "It's easy to use. The text is big, so it's easy to see." },
          { speaker: "Ms Sato", jp: "いい です ね。 [前|まえ] の は [使|つか]い{にくかった} です から ね。", en: "Nice. The old one was hard to use, wasn't it?" },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with やすい: “This bag is easy to carry” (use [持|も]つ): このかばんは＿。",
            answers: ["[持|も]ちやすい です"],
            explanation: "Stem + やすい: [持|も]ち + やすい + です.",
          },
          {
            prompt: "Casual, with にくい: “This meat is hard to cut” (use [切|き]る): この[肉|にく]、＿。",
            answers: ["[切|き]りにくい", "[切|き]りにくい ね", "[切|き]りにくい な"],
            explanation: "Stem + にくい: [切|き]りにくい.",
          },
          {
            prompt: "Polite past, with にくい: “The test questions were hard to understand” (use [分|わ]かる): テストの[問題|もんだい]は＿。",
            answers: ["[分|わ]かりにくかった です"],
            explanation: "にくい conjugates like an い-adjective: [分|わ]かりにくかったです.",
          },
          {
            prompt: "With やすい, before a noun: “an easy dish to make” (use [作|つく]る): ＿[料理|りょうり]",
            answers: ["[作|つく]りやすい"],
            explanation: "Like any い-adjective, it goes straight before the noun: [作|つく]りやすい[料理|りょうり].",
          },
          {
            prompt: "Fix it: このいすは[座|すわ]るにくいです。",
            answers: ["この いす は [座|すわ]りにくい です。"],
            explanation: "にくい follows the stem: [座|すわ]りにくいです.",
          },
        ],
      },
    ],
  },
  {
    slug: "garu",
    title: "Someone else's feelings: がる and がっている",
    mark: "〜がる",
    summary: "Talk about what someone else feels, from how they act: [寒|さむ]がる, [怖|こわ]がっている, [欲|ほ]しがる.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (garu); Bunpro, “がる”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "An adjective of feeling loses its い (or a な-adjective its な) and takes **がる** to describe someone else's feeling from the signs they show: [寒|さむ]がる (to feel the cold), [怖|こわ]がっている (is scared).",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["い-adjective: drop the い", "[怖|こわ]がる"],
          ["な-adjective", "[残念|ざんねん]がる"],
          ["[欲|ほ]しい", "[欲|ほ]しがる"],
          ["Verb stem + たい", "[行|い]きたがる"],
          ["Now: がっている", "[怖|こわ]がって いる"],
        ],
      },
      {
        type: "text",
        text: "Japanese doesn't state another person's feelings as fact: [寒|さむ]い, [怖|こわ]い, [欲|ほ]しい are for your own. For someone else, がる says they show the feeling, by what they do or say. It's a godan verb: がっている for how someone feels now, がる for a habit or what people in general do. What they feel about takes を: [犬|いぬ]が[怖|こわ]い (I'm scared of dogs) but [犬|いぬ]を[怖|こわ]がる.",
      },
      { type: "link", href: "/learn/verbs/tai-form", label: "〜たい and たがっている", text: "The same がる after たい: what someone else wants to do." },
      { type: "link", href: "/learn/n5-essentials/hoshii", label: "[欲|ほ]しい", text: "Wanting things, and [欲|ほ]しがっている." },
      {
        type: "examples",
        items: [
          { jp: "[妹|いもうと] は [犬|いぬ] を [怖|こわ]{がって} います。", en: "My little sister is scared of dogs.", alt: "[妹|いもうと] は [犬|いぬ] を [怖|こわ]{がって} いる。" },
          { jp: "[子供|こども] が [嫌|いや]{がって} いる から、 やめて。", en: "The child doesn't like it, so stop.", alt: "[子供|こども] が [嫌|いや]{がって} います から、 やめて ください。" },
          { jp: "[山田|やまだ]-さん は [試合|しあい] に [負|ま]けて、 [残念|ざんねん]{がって} いました。", en: "Yamada-san was disappointed to lose the match.", alt: "[山田|やまだ]-さん は [試合|しあい] に [負|ま]けて、 [残念|ざんねん]{がって} いた。" },
          { jp: "[息子|むすこ] が [新|あたら]しい [靴|くつ] を [欲|ほ]し{がって} いる。", en: "My son wants new shoes.", alt: "[息子|むすこ] が [新|あたら]しい [靴|くつ] を [欲|ほ]し{がって} います。" },
          { jp: "[祖母|そぼ] は すぐ [寒|さむ]{がる}。", en: "My gran always feels the cold.", alt: "[祖母|そぼ] は すぐ [寒|さむ]{がります}。", note: "The dictionary form for a habit." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[私|わたし] は [虫|むし] が {[怖|こわ]い} です。", en: "I'm scared of insects." },
        b: { jp: "[弟|おとうと] は [虫|むし] を {[怖|こわ]がって} います。", en: "My little brother is scared of insects." },
        diff: "Your own feeling: [怖|こわ]い, with が. Someone else's: [怖|こわ]がっている, with を.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "がる is for other people",
        text: "✗ [私|わたし]は[寒|さむ]がっています ✓ [私|わたし]は[寒|さむ]いです: you know your own feelings, so state them. And the thing felt takes を with がる: ✗ [弟|おとうと]は[犬|いぬ]が[怖|こわ]がっている ✓ [弟|おとうと]は[犬|いぬ]を[怖|こわ]がっている.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Kenta", jp: "[姉|あね] の [子供|こども] が、 うち の [猫|ねこ] を [怖|こわ]{がって} いる ん だ。", en: "My sister's little one is scared of our cat." },
          { speaker: "Aya", jp: "[小|ちい]さい [子供|こども] は よく [猫|ねこ] や [犬|いぬ] を [怖|こわ]{がる} よ ね。", en: "Little kids are often scared of cats and dogs." },
          { speaker: "Kenta", jp: "でも、 [猫|ねこ] の ほう も [嫌|いや]{がって} いる みたい。", en: "But the cat doesn't seem too keen either." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, someone else: “My mother is scared of planes” (use [怖|こわ]い): [母|はは]は[飛行機|ひこうき]を＿。",
            answers: ["[怖|こわ]がって います", "[怖|こわ]がります"],
            explanation: "About someone else: [怖|こわ]い → [怖|こわ]がる, and how she feels is [怖|こわ]がっています. (The dictionary form, [怖|こわ]がります, is a habit: she tends to be scared.)",
          },
          {
            prompt: "Casual, someone else: “Kenta wants a watch” (use [欲|ほ]しい): [健太|けんた]は[時計|とけい]を＿。",
            answers: ["[欲|ほ]しがって いる", "[欲|ほ]しがって いる よ"],
            explanation: "[欲|ほ]しい → [欲|ほ]しがる; now: [欲|ほ]しがっている.",
          },
          {
            prompt: "Casual, a habit: “Dogs don't like baths” (use [嫌|いや]): [犬|いぬ]はお[風呂|ふろ]を＿。",
            answers: ["[嫌|いや]がる", "[嫌|いや]がる よ", "[嫌|いや]がる よ ね"],
            explanation: "A な-adjective takes がる directly: [嫌|いや]がる. The dictionary form for what's generally so.",
          },
          {
            prompt: "Polite past: “Tanaka-san was shy” (use [恥|は]ずかしい): [田中|たなか]さんは＿。",
            answers: ["[恥|は]ずかしがって いました", "[恥|は]ずかしがりました"],
            explanation: "Drop the い and add がる: [恥|は]ずかしがる → [恥|は]ずかしがっていました.",
          },
          {
            prompt: "Fix it: [弟|おとうと]は[海|うみ]が[怖|こわ]がっています。",
            answers: ["[弟|おとうと] は [海|うみ] を [怖|こわ]がって います。"],
            explanation: "With がる, the thing felt takes を: [海|うみ]を[怖|こわ]がっています.",
          },
        ],
      },
    ],
  },
  {
    slug: "ga-suru",
    title: "Sounds, smells and hunches: がする",
    mark: "がする",
    summary: "Say you can hear, smell or taste something, and that you have a feeling about something.",
    source: "Makino & Tsutsui, Dictionary of Basic Japanese Grammar (ga suru); Bunpro, “がする”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4"),
    blocks: [
      {
        type: "idea",
        text: "A sound, a smell, a taste or a voice + **がする** says you perceive it ([音|おと]がする: there's a noise); a plain clause + **[気|き]がする** says you have a feeling about something.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Before it", "Example"],
        rows: [
          ["[音|おと], [声|こえ]: a sound", "[音|おと] が する"],
          ["[匂|にお]い: a smell", "いい [匂|にお]い が する"],
          ["[味|あじ]: a taste", "[甘|あま]い [味|あじ] が する"],
          ["Plain clause + [気|き]", "[雨|あめ] が [降|ふ]る [気|き] が する"],
        ],
      },
      {
        type: "text",
        text: "The sound or smell is the subject, with が, and する here means “is there to be sensed”: no one is doing anything. It usually comes with a word that says what kind ([変|へん]な[音|おと], いい[匂|にお]い, [甘|あま]い[味|あじ]). [気|き]がする is softer than と[思|おも]う: a hunch, not an opinion.",
      },
      { type: "heading", text: "Sounds, smells and tastes" },
      {
        type: "examples",
        items: [
          { jp: "[隣|となり] の [部屋|へや] から [変|へん] な [音|おと] {が する}。", en: "There's a strange noise coming from next door.", alt: "[隣|となり] の [部屋|へや] から [変|へん] な [音|おと] {が します}。" },
          { jp: "[台所|だいどころ] から いい [匂|にお]い {が します}。", en: "Something smells good in the kitchen.", alt: "[台所|だいどころ] から いい [匂|にお]い {が する}。" },
          { jp: "この ジュース、 ちょっと [甘|あま]い [味|あじ] {が する} ね。", en: "This juice tastes a bit sweet.", alt: "この ジュース、 ちょっと [甘|あま]い [味|あじ] {が します} ね。" },
          { jp: "[外|そと] で [子供|こども] の [声|こえ] {が します}。", en: "I can hear children outside.", alt: "[外|そと] で [子供|こども] の [声|こえ] {が する}。" },
        ],
      },
      { type: "heading", text: "[気|き]がする: I have a feeling" },
      {
        type: "examples",
        items: [
          { jp: "[誰|だれ]か に [見|み]られて いる {[気|き] が する}。", en: "I feel like someone's watching me.", alt: "[誰|だれ]か に [見|み]られて いる {[気|き] が します}。" },
          { jp: "[今日|きょう] は いい こと が ある {[気|き] が します}。", en: "I've got a feeling something good will happen today.", alt: "[今日|きょう] は いい こと が ある {[気|き] が する}。" },
          { jp: "この [歌|うた]、 どこか で [聞|き]いた {[気|き] が する}。", en: "I feel like I've heard this song somewhere.", alt: "この [歌|うた]、 どこか で [聞|き]いた {[気|き] が します}。" },
          { jp: "[彼|かれ] は [来|こ]ない {[気|き] が します}。", en: "I have a feeling he won't come.", alt: "[彼|かれ] は [来|こ]ない {[気|き] が する}。" },
        ],
      },
      {
        type: "pair",
        a: { jp: "[明日|あした] は [晴|は]れる {と [思|おも]います}。", en: "I think it'll be sunny tomorrow." },
        b: { jp: "[明日|あした] は [晴|は]れる {[気|き] が します}。", en: "I have a feeling it'll be sunny tomorrow." },
        diff: "と[思|おも]う gives your opinion; [気|き]がする is a hunch you can't quite back up.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "A sound you hear isn't ある",
        text: "✗ [隣|となり]から[音|おと]があります ✓ [隣|となり]から[音|おと]がします. A sound, smell or taste you notice now is がする. And don't use [気|き]がする for a firm opinion you'd defend: say と[思|おも]う.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Mr Mori", jp: "[何|なに]か [変|へん] な [音|おと] {が しません} か？", en: "Can you hear a strange noise?" },
          { speaker: "Ms Sato", jp: "あ、 [本当|ほんとう] です ね。 [窓|まど] の [外|そと] から です ね。", en: "Oh, you're right. It's coming from outside the window." },
          { speaker: "Mr Mori", jp: "[雨|あめ] の [音|おと] {が します} ね。", en: "It sounds like rain." },
        ],
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Polite, with する: “There's a smell of coffee”: コーヒーの[匂|にお]い＿。",
            answers: ["が します"],
            explanation: "A smell you notice + がします.",
          },
          {
            prompt: "Casual, with する: “I can hear a car”: [車|くるま]の[音|おと]＿。",
            answers: ["が する"],
            explanation: "A sound you hear + がする: [車|くるま]の[音|おと]がする.",
          },
          {
            prompt: "Polite, a hunch: “I feel as if I've met him before”: [前|まえ]に[会|あ]った＿。",
            answers: ["[気|き] が します"],
            explanation: "A plain clause + [気|き]がします: [会|あ]った[気|き]がします.",
          },
          {
            prompt: "Casual: “This tea tastes strange”: このお[茶|ちゃ]、[変|へん]な[味|あじ]＿。",
            answers: ["が する", "が する ね"],
            explanation: "A taste + がする: [変|へん]な[味|あじ]がする.",
          },
          {
            prompt: "Fix it: [外|そと]で[大|おお]きい[音|おと]がありました。",
            answers: ["[外|そと] で [大|おお]きい [音|おと] が しました。"],
            explanation: "A sound you heard is がした, politely がしました, not があった.",
          },
        ],
      },
    ],
  },
  {
    slug: "commands",
    title: "Commands: the plain command, な and なさい",
    mark: "〜ろ・〜な",
    summary: "Read and understand the blunt command ([行|い]け, [食|た]べろ), don't ([触|さわ]るな) and なさい, and know who says them.",
    source: "Genki II ch. 22 (なさい) and Tae Kim's Guide, “Using the command form”; Bunpro, “命令形”, “な” and “なさい”",
    register: "both",
    kinds: ["grammar"],
    jlpt: jlpt("N4", "Bunpro has the な prohibitive at N5 and the command form and なさい at N4; JLPT Sensei lists な and なさい at N4, and its N4 pages as saved have no entry for the command form."),
    blocks: [
      {
        type: "idea",
        text: "The plain command ([行|い]け, [食|た]べろ) gives a blunt order, a plain form + **な** ([触|さわ]るな) forbids, and the stem + **なさい** ([食|た]べなさい) is the firm command of a parent or a teacher.",
      },
      {
        type: "table",
        caption: "How it connects",
        headers: ["Verb", "Command", "Don't", "なさい"],
        rows: [
          ["う-verb: the え row", "[行|い]け", "[行|い]く な", "[行|い]きなさい"],
          ["る-verb: る → ろ", "[食|た]べろ", "[食|た]べる な", "[食|た]べなさい"],
          ["する", "しろ", "する な", "しなさい"],
          ["[来|く]る", "[来|こ]い", "[来|く]る な", "[来|き]なさい"],
        ],
      },
      {
        type: "text",
        text: "For an う-verb, the last kana moves to the え row ([書|か]く → [書|か]け, [待|ま]つ → [待|ま]て). A る-verb swaps る for ろ ([寝|ね]る → [寝|ね]ろ). する is しろ (in writing せよ) and [来|く]る is [来|こ]い. な goes after the dictionary form. なさい follows the ます stem. All three are plain and direct, so in conversation they sound rough or bossy: you'll meet them on signs and road markings, in exam instructions, from coaches and fans at sports, from parents to children, and between close male friends. To ask someone to do something, use 〜てください or 〜ないでください.",
      },
      { type: "heading", text: "The command form" },
      {
        type: "examples",
        items: [
          { jp: "{[止|と]まれ}", en: "Stop (road sign)", note: "Signs give commands without being rude: no one is talking to you." },
          { jp: "[頑張|がんば]{れ}！", en: "Go for it! (shouted, blunt)", note: "Shouted at races and matches: encouragement, not an order." },
          { jp: "[早|はや]く {[寝|ね]ろ}。", en: "Go to bed! (a blunt order)", alt: "[早|はや]く [寝|ね]て ください。", note: "Blunt: a father to his son, say." },
          { jp: "こっち に {[来|こ]い}！", en: "Get over here! (a blunt order)", alt: "こっち に [来|き]て ください。" },
          { jp: "[正|ただ]しい もの を {[選|えら]べ}。", en: "Choose the correct answer. (exam instruction)", note: "Exam instructions, in writing." },
        ],
      },
      { type: "heading", text: "な: don't" },
      {
        type: "examples",
        items: [
          { jp: "[触|さわ]る {な}", en: "Do not touch (sign)" },
          { jp: "[危|あぶ]ない！ そこ に [入|はい]る {な}！", en: "Watch out! Don't go in there!", alt: "[危|あぶ]ない です から、 そこ に [入|はい]らないで ください。" },
          { jp: "[泣|な]く {な} よ。", en: "Don't cry.", note: "With よ it's softer: a friend comforting a friend." },
          { jp: "[明日|あした] の [約束|やくそく]、 [忘|わす]れる {な} よ。", en: "Don't forget about tomorrow.", alt: "[明日|あした] の [約束|やくそく]、 [忘|わす]れないで ください ね。" },
        ],
      },
      { type: "heading", text: "なさい: parents and teachers" },
      {
        type: "examples",
        items: [
          { jp: "もう [七時|しちじ] だ よ。 [早|はや]く [起|お]き{なさい}！", en: "It's seven already. Get up! (a parent)" },
          { jp: "[野菜|やさい] も [食|た]べ{なさい}。", en: "Eat your vegetables too. (a parent)" },
          { jp: "[宿題|しゅくだい] を して から [遊|あそ]び{なさい}。", en: "Do your homework before you play. (a parent)" },
          { jp: "[次|つぎ] の [質問|しつもん] に [答|こた]え{なさい}。", en: "Answer the following questions. (exam instructions)", note: "Exam instructions." },
        ],
      },
      {
        type: "pair",
        a: { jp: "[早|はや]く [食|た]べ{ろ}！", en: "Eat up! (blunt)" },
        b: { jp: "[早|はや]く [食|た]べ{なさい}。", en: "Eat up, now. (a parent)" },
        diff: "Both are orders. The command form is rough; なさい is firm but proper, the voice of someone in charge of you.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Not to people above you, or to customers",
        text: "✗ [先生|せんせい]、ちょっと[待|ま]て ✓ [先生|せんせい]、ちょっと[待|ま]ってください. ✗ (to a guest) [座|すわ]りなさい ✓ どうぞ、[座|すわ]ってください. And the る-verb command ends in ろ: ✗ [寝|ね]れ ✓ [寝|ね]ろ; [来|く]る is ✓ [来|こ]い.",
      },
      {
        type: "dialogue",
        lines: [
          { speaker: "Coach", jp: "もっと [速|はや]く {[走|はし]れ}！", en: "Run faster! (a coach's order)" },
          { speaker: "Coach", jp: "[下|した] を [見|み]る {な}！ [前|まえ] を [見|み]ろ！", en: "Don't look down! Eyes ahead!" },
          { speaker: "Aya", jp: "[健太|けんた]、 [頑張|がんば]{れ}！", en: "Come on, Kenta! (a cheer)" },
        ],
        note: "At sports, coaches and fans shout commands for energy; in that setting they are not usually heard as rude.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "Command form of [来|く]る: “Come quickly!”: [早|はや]く＿！",
            answers: ["[来|こ]い"],
            explanation: "[来|く]る's command is [来|こ]い.",
          },
          {
            prompt: "Don't, with な: “Don't open it!” (use [開|あ]ける): ＿！",
            answers: ["[開|あ]ける な"],
            explanation: "The dictionary form + な: [開|あ]けるな.",
          },
          {
            prompt: "With なさい, a parent: “Wash your hands” (use [洗|あら]う): [手|て]を＿。",
            answers: ["[洗|あら]いなさい"],
            explanation: "The ます stem + なさい: [洗|あら]いなさい.",
          },
          {
            prompt: "Command form of する: “Clean your room!” (use [掃除|そうじ]する): [部屋|へや]を＿！",
            answers: ["[掃除|そうじ] しろ"],
            explanation: "する's command is しろ: [掃除|そうじ]しろ.",
          },
          {
            prompt: "Fix it: もっと[食|た]べれ！",
            answers: ["もっと [食|た]べろ！"],
            explanation: "A る-verb's command swaps る for ろ: [食|た]べろ.",
          },
        ],
      },
    ],
  },
];
