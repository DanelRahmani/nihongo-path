import type { Lesson } from "@/content/types";

const DRILL = {
  type: "link",
  href: "/kana/drill",
  label: "Drill hiragana",
  text: "Start with the first row — new rows open as you learn them.",
} as const;

// Kana lessons write every word in kana: reading the kana is the point (content/STYLE.md §5).
// Highlights mark the kana being taught, pairs are minimal pairs, and the quiz asks for readings
// in romaji (§10). Beat-by-beat splits (ko-o) show the sound; romaji (kou) shows the spelling.

export const hiragana: Lesson[] = [
  {
    slug: "hiragana-vowels-kstn",
    title: "Hiragana 1: the vowels and the K, S, T, N rows",
    mark: "あ",
    summary: "Five vowels, then a consonant in front of each — 25 characters.",
    source: "Genki I — Hiragana; the standard gojuuon chart",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "Each kana in this chart is one beat: one of the five vowels **a i u e o**, or a consonant plus a vowel, as in **ka ki ku ke ko**.",
      },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["—", "あ a", "い i", "う u", "え e", "お o"],
          ["k", "か ka", "き ki", "く ku", "け ke", "こ ko"],
          ["s", "さ sa", "し shi", "す su", "せ se", "そ so"],
          ["t", "た ta", "ち chi", "つ tsu", "て te", "と to"],
          ["n", "な na", "に ni", "ぬ nu", "ね ne", "の no"],
        ],
      },
      {
        type: "text",
        text: "Three sounds break the pattern: し is **shi**, ち is **chi**, つ is **tsu**. Vowels are short and pure: a as in *father*, i as in *machine*, u as in *put* (lips relaxed), e as in *bed*, o as in *go* but cut short, with no w glide at the end.",
      },
      {
        type: "examples",
        items: [
          { jp: "す{し}", en: "sushi", note: "し is shi." },
          { jp: "く{ち}", en: "mouth", note: "ち is chi." },
          { jp: "{つ}くえ", en: "desk", note: "つ is tsu: a quick t before the s, as at the end of *cats*." },
          { jp: "{ち}かて{つ}", en: "subway", note: "Both in one word: chi and tsu." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{つ}き", en: "moon" },
        b: { jp: "{す}き", en: "liked (as in “I like it”)" },
        diff: "Only the t is different: tsuki is the moon, suki means you like something. Say the t in つ, or the moon turns into a liking.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "e is never ee",
        text: "✗ *sah-kee* ✓ *sah-keh* for さけ (sake). The Japanese e is always the e in *bed*, never the ee in *see*: English habits with a final e (karate, Kobe) are what mislead.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Picture books for young Japanese children are written almost entirely in hiragana, with spaces between phrases to make them easier to read. This app's Kana only mode is similar, though it also spaces off each particle.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **ねこ** (cat)?",
            answers: ["ねこ"],
            answerIn: "romaji",
            explanation: "ね ne + こ ko: neko. Two beats.",
          },
          {
            prompt: "How do you read **あし** (foot, leg)?",
            answers: ["あし"],
            answerIn: "romaji",
            explanation: "あ a + し shi: ashi. (Another romaji system writes し as si; that's accepted too.)",
          },
          {
            prompt: "How do you read **なつ** (summer)?",
            answers: ["なつ"],
            answerIn: "romaji",
            explanation: "な na + つ tsu: natsu. Keep the t in tsu.",
          },
          {
            prompt: "How do you read **ちかい** (near)?",
            answers: ["ちかい"],
            answerIn: "romaji",
            explanation: "ち chi + か ka + い i: chikai. Three beats.",
          },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-hmyrw",
    title: "Hiragana 2: the H, M, Y, R, W rows and ん",
    mark: "は",
    summary: "The second half of the basic chart, including the only basic kana with no vowel.",
    source: "Genki I — Hiragana; the standard gojuuon chart",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      { type: "idea", text: "Five more rows and ん complete the 46 basic hiragana; the Y and W rows are short, and ん stands alone." },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["h", "は ha", "ひ hi", "ふ fu", "へ he", "ほ ho"],
          ["m", "ま ma", "み mi", "む mu", "め me", "も mo"],
          ["y", "や ya", "", "ゆ yu", "", "よ yo"],
          ["r", "ら ra", "り ri", "る ru", "れ re", "ろ ro"],
          ["w", "わ wa", "", "", "", "を o"],
          ["n", "ん n", "", "", "", ""],
        ],
      },
      {
        type: "text",
        text: "ふ is **fu**, made with the lips close together but not touching, and no teeth (unlike English f). The Japanese r is a light tap, somewhere between English r, l and d. In modern spelling を is only used as a particle, mostly marking the object. ん is a full beat on its own: ほん (book) is two beats, ho-n.",
      },
      {
        type: "examples",
        items: [
          { jp: "さい{ふ}", en: "wallet", note: "ふ is fu: lips close but not touching, and blow gently." },
          { jp: "さ{る}", en: "monkey", note: "る is a light tap of the tongue: ru." },
          { jp: "て{ん}き", en: "weather", note: "te-n-ki: three beats. ん is a beat of its own." },
          { jp: "{ゆ}き", en: "snow" },
          { jp: "{わ}たし", en: "I, me" },
        ],
      },
      {
        type: "pair",
        a: { jp: "{ふ}ね", en: "boat" },
        b: { jp: "{ほ}ね", en: "bone" },
        diff: "One kana changes the word. Both are in the H row, but ふ is fu, not hu.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "The particle は is read wa",
        text: "✗ わたしわ ✓ わたしは. As a particle, は is read **wa** but still written は; likewise を is read **o** and へ is read **e**. When spelling was modernised in 1946, these three particles kept their old spelling.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "The chart you've just finished is Japan's alphabetical order: dictionaries, phone contacts and class lists run あいうえお, かきくけこ… row by row.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **ふゆ** (winter)?",
            answers: ["ふゆ"],
            answerIn: "romaji",
            explanation: "ふ fu + ゆ yu: fuyu.",
          },
          {
            prompt: "How do you read **みかん** (mandarin orange)?",
            answers: ["みかん"],
            answerIn: "romaji",
            explanation: "み mi + か ka + ん n: mikan. Three beats, and ん is the third.",
          },
          {
            prompt: "How do you read **よる** (night)?",
            answers: ["よる"],
            answerIn: "romaji",
            explanation: "よ yo + る ru: yoru, with a light tap on the r.",
          },
          {
            prompt: "How do you read **ほんや** (bookshop)?",
            answers: ["ほんや"],
            answerIn: "romaji",
            explanation: "ほ ho + ん n + や ya: three beats. Romaji writes hon'ya so it isn't read ho + nya (a combination you'll meet in Hiragana 4). Typed without the apostrophe, honya is accepted too.",
          },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-dakuten",
    title: "Hiragana 3: two dots and a circle make new sounds (が, ぱ…)",
    mark: "が",
    summary: "Dakuten ゛ and handakuten ゜ turn 20 kana into 25 new kana.",
    source: "Genki I — Hiragana (diacritics); Gendai kanazukai, the 1986 cabinet rules for kana spelling (on ぢ and づ)",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "Two small dots ゛ (**dakuten**) voice a sound (k → g, s → z, t → d, h → b), and a small circle ゜ (**handakuten**) turns h into **p**.",
      },
      {
        type: "table",
        headers: ["", "a", "i", "u", "e", "o"],
        rows: [
          ["g", "が ga", "ぎ gi", "ぐ gu", "げ ge", "ご go"],
          ["z", "ざ za", "じ ji", "ず zu", "ぜ ze", "ぞ zo"],
          ["d", "だ da", "ぢ ji", "づ zu", "で de", "ど do"],
          ["b", "ば ba", "び bi", "ぶ bu", "べ be", "ぼ bo"],
          ["p", "ぱ pa", "ぴ pi", "ぷ pu", "ぺ pe", "ぽ po"],
        ],
        caption: "Two quirks: the H row turns into b and p because, long ago, it was said with a p sound; and じ and ぢ are both ji, ず and づ both zu.",
      },
      {
        type: "examples",
        items: [
          { jp: "{ご}はん", en: "rice, a meal", note: "こ ko → ご go." },
          { jp: "か{ぜ}", en: "wind; also a cold", note: "せ se → ぜ ze." },
          { jp: "{で}んわ", en: "telephone", note: "て te → で de." },
          { jp: "て{ぶ}くろ", en: "gloves", note: "ふ fu → ぶ bu." },
          { jp: "さん{ぽ}", en: "a walk", note: "ほ ho → ぽ po, with the circle." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{ふ}た", en: "lid" },
        b: { jp: "{ぶ}た", en: "pig" },
        diff: "Two tiny dots change the word completely. Always check for them.",
      },
      {
        type: "pair",
        a: { jp: "か{き}", en: "persimmon" },
        b: { jp: "か{ぎ}", en: "key" },
        diff: "Same idea on the second kana: き ki → ぎ gi.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "ぢ and づ in spelling",
        text: "✗ つずく ✓ つづく (to continue). ぢ and づ sound the same as じ and ず, and じ and ず are the usual spelling. ぢ and づ appear mainly where a ち or つ repeats (つづく) or gets voiced as two words join (はな nose + ち blood → はなぢ, a nosebleed). With romaji input on a Japanese keyboard, type them as *di* and *du*.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "In everyday speech the marks have friendly names: ゛ is てんてん (“dot dot”) and ゜ is まる (“circle”). Spelling a word out, people say 「か」にてんてん (“か with dot dot”) for が.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **かばん** (bag)?",
            answers: ["かばん"],
            answerIn: "romaji",
            explanation: "か ka + ば ba + ん n: kaban. は ha with dakuten is ば ba.",
          },
          {
            prompt: "How do you read **たまご** (egg)?",
            answers: ["たまご"],
            answerIn: "romaji",
            explanation: "た ta + ま ma + ご go: tamago.",
          },
          {
            prompt: "How do you read **えんぴつ** (pencil)?",
            answers: ["えんぴつ"],
            answerIn: "romaji",
            explanation: "え e + ん n + ぴ pi + つ tsu: enpitsu. The circle makes ひ hi into ぴ pi. (Traditional Hepburn, still seen on many signs, writes empitsu; both are accepted.)",
          },
          {
            prompt: "How do you read **みかづき** (crescent moon)?",
            answers: ["みかづき"],
            answerIn: "romaji",
            explanation: "み mi + か ka + づ zu + き ki: mikazuki. It's みか (an old word for the third day of the month) + つき (moon), and the つ gets its dots as the words join; づ sounds just like ず.",
          },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-combos",
    title: "Hiragana 4: small ゃ ゅ ょ merge into one sound (きゃ, しゅ…)",
    mark: "きゃ",
    summary: "An i-sound plus a small ya, yu or yo becomes a single beat.",
    source: "Genki I — Hiragana (combinations)",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "An i-sound kana plus a **small** ゃ, ゅ or ょ merges into one beat: き + ゃ = きゃ **kya**.",
      },
      {
        type: "table",
        headers: ["", "ya", "yu", "yo"],
        rows: [
          ["k", "きゃ kya", "きゅ kyu", "きょ kyo"],
          ["sh", "しゃ sha", "しゅ shu", "しょ sho"],
          ["ch", "ちゃ cha", "ちゅ chu", "ちょ cho"],
          ["n", "にゃ nya", "にゅ nyu", "にょ nyo"],
          ["h", "ひゃ hya", "ひゅ hyu", "ひょ hyo"],
          ["m", "みゃ mya", "みゅ myu", "みょ myo"],
          ["r", "りゃ rya", "りゅ ryu", "りょ ryo"],
          ["g", "ぎゃ gya", "ぎゅ gyu", "ぎょ gyo"],
          ["j", "じゃ ja", "じゅ ju", "じょ jo"],
          ["b", "びゃ bya", "びゅ byu", "びょ byo"],
          ["p", "ぴゃ pya", "ぴゅ pyu", "ぴょ pyo"],
        ],
      },
      {
        type: "examples",
        items: [
          { jp: "{きょ}う", en: "today", note: "きょ is one beat, then う lengthens the o: kyo-o, two beats (more in Hiragana 5)." },
          { jp: "{しゃ}しん", en: "photo" },
          { jp: "お{ちゃ}", en: "tea (usually green tea)" },
          { jp: "{じゅ}{ぎょ}う", en: "class, lesson", note: "Two combos in one word: ju-gyo-o." },
        ],
      },
      {
        type: "pair",
        a: { jp: "{びょ}ういん", en: "hospital", note: "byo-o-i-n: four beats." },
        b: { jp: "{びよ}ういん", en: "hair salon", note: "bi-yo-o-i-n: five beats." },
        diff: "Small ょ merges with び; a full-size よ is its own beat. Size matters!",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Kyoto has no “kee”",
        text: "✗ *kee-oh-toe* ✓ *kyo-o-to*: kyo is one beat, then hold the o for a second beat. In きょうと (Kyoto) the small ょ merges with き, and the う lengthens the o (Hiragana 5).",
      },
      {
        type: "callout",
        kind: "culture",
        text: "Combos are most common in words that came from Chinese, like しゃしん, じゅぎょう and びょういん. And a Japanese cat says にゃん (nyan): に plus a small ゃ.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **ちゃわん** (rice bowl)?",
            answers: ["ちゃわん"],
            answerIn: "romaji",
            explanation: "ちゃ cha + わ wa + ん n: chawan. Three beats.",
          },
          {
            prompt: "How do you read **じしょ** (dictionary)?",
            answers: ["じしょ"],
            answerIn: "romaji",
            explanation: "じ ji + しょ sho: jisho. Two beats.",
          },
          {
            prompt: "How do you read **ひゃく** (hundred)?",
            answers: ["ひゃく"],
            answerIn: "romaji",
            explanation: "ひゃ hya + く ku: hyaku.",
          },
          {
            prompt: "How do you read **しゅみ** (hobby)?",
            answers: ["しゅみ"],
            answerIn: "romaji",
            explanation: "しゅ shu + み mi: shumi.",
          },
        ],
      },
      DRILL,
    ],
  },
  {
    slug: "hiragana-small-tsu-long-vowels",
    title: "Hiragana 5: small っ doubles a sound, and long vowels",
    mark: "っ",
    summary: "The extra beat of っ, and vowels held for two beats.",
    source: "Genki I — Hiragana (double consonants and long vowels)",
    register: "neutral",
    kinds: ["kana"],
    blocks: [
      {
        type: "idea",
        text: "A small **っ** adds a beat that doubles the next consonant, and a **long vowel** holds its sound for two beats.",
      },
      {
        type: "examples",
        items: [
          { jp: "き{っ}ぷ", en: "ticket", note: "Before k, t or p, っ is a short silent stop: ki-p-pu, kippu." },
          { jp: "ざ{っ}し", en: "magazine", note: "Before s or sh, っ is a held hiss: za-s-shi, zasshi." },
          { jp: "おか{あ}さん", en: "mother", note: "The あ holds the a: o-ka-a-sa-n." },
          { jp: "ひこ{う}き", en: "airplane", note: "こう sounds like a long o: hi-ko-o-ki (spelled hikouki)." },
          { jp: "え{い}が", en: "movie", note: "えい usually sounds like a long e: e-e-ga (spelled eiga)." },
        ],
      },
      {
        type: "pair",
        a: { jp: "おと", en: "sound", note: "o-to: two beats." },
        b: { jp: "お{っ}と", en: "husband", note: "o-t-to: three beats, with a short stop." },
        diff: "The small っ adds a beat: a short stop, like the catch in *hot tub*. In romaji it doubles the consonant: otto.",
      },
      { type: "heading", text: "Long vowels" },
      {
        type: "pair",
        a: { jp: "おばさん", en: "aunt, middle-aged woman" },
        b: { jp: "おば{あ}さん", en: "grandmother, elderly woman" },
        diff: "One extra beat of あ adds a generation. Hold long vowels for their full length.",
      },
      {
        type: "table",
        headers: ["Written", "Sounds like", "Example"],
        rows: [
          ["ああ · いい · うう", "a, i, u held", "おいしい (tasty), くうき (air)"],
          ["えい · ええ", "usually a long e", "せんせい (teacher), おねえさん (older sister)"],
          ["おう · おお", "a long o", "ありがとう (thank you), おおきい (big)"],
        ],
        caption: "Inside a word, おう is a long o (ありがとう, and the “let's” form いきましょう). The exception is a verb's dictionary form, where the う is the verb's own ending and is usually said as u: おもう (to think) is o-mo-u.",
      },
      {
        type: "callout",
        kind: "mistake",
        title: "Tokyo has four beats",
        text: "✗ *toe-kee-oh* ✓ *to-o-kyo-o*: とうきょう has four beats, with both o's held (romaji toukyou). English spellings drop long vowels (Tokyo, Kyoto, Osaka), but in Japanese the length is part of the word.",
      },
      {
        type: "callout",
        kind: "culture",
        text: "In manga and chat, a small っ at the end of a word marks a sudden stop: あっ！ (Ah!), えっ？ (Huh?).",
      },
      {
        type: "callout",
        kind: "tip",
        text: "The romaji in these lessons spells long vowels out (ou, ei, ii) exactly as they're written in kana, so you can always map it back.",
      },
      {
        type: "quiz",
        questions: [
          {
            prompt: "How do you read **がっこう** (school)?",
            answers: ["がっこう"],
            answerIn: "romaji",
            explanation: "が ga + っ + こう kou (a long o): gakkou. The っ doubles the k.",
          },
          {
            prompt: "How do you read **いっぱい** (full; a lot)?",
            answers: ["いっぱい"],
            answerIn: "romaji",
            explanation: "い i + っ + ぱ pa + い i: ippai. The っ doubles the p.",
          },
          {
            prompt: "How do you read **おにいさん** (older brother)?",
            answers: ["おにいさん"],
            answerIn: "romaji",
            explanation: "o-ni-i-sa-n: oniisan. The い after に holds the i.",
          },
          {
            prompt: "How do you read **とおい** (far)?",
            answers: ["とおい"],
            answerIn: "romaji",
            explanation: "と to + お o + い i: tooi. A few words, like とおい and おおきい, spell their long o with お instead of う.",
          },
        ],
      },
      DRILL,
    ],
  },
];
