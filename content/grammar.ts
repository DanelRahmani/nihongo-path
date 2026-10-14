/**
 * The grammar overview (/grammar): one topic per construction, each linked to the lesson that teaches it.
 * Examples are copied verbatim from that lesson (its examples, pairs or alt lines, with the lesson's English);
 * tests/grammar.test.ts checks that, and that every particle, grammar and verb lesson has a topic.
 * Patterns are English prose with Japanese inside: no word spaces in the Japanese (content/STYLE.md §3).
 */
import type { Jp, Rich } from "@/content/types";

export interface GrammarExample {
  jp: Jp;
  en: string;
  /** For two examples that differ only in register, as the lessons label their alt lines. */
  register?: "Polite" | "Casual";
}

export interface GrammarTopic {
  /** Anchor on the page: /grammar#wa-topic. */
  slug: string;
  /** The construction, with placeholders in English: "A は B". */
  pattern: Rich;
  /** What it means or does, in a few words. */
  meaning: Rich;
  /** The lesson that teaches it: "particles/wa-topic". */
  lesson: string;
  examples: GrammarExample[];
}

export interface GrammarGroup {
  slug: string;
  title: string;
  topics: GrammarTopic[];
}

export const GRAMMAR: GrammarGroup[] = [
  {
    slug: "sentences",
    title: "How a sentence works",
    topics: [
      {
        slug: "polite-casual",
        pattern: "…です · …ます · plain form",
        meaning: "In speech, every sentence ends polite (です/ます) or casual (the plain form), depending on who you're talking to.",
        lesson: "start/polite-and-casual",
        examples: [
          { jp: "[毎朝|まいあさ] コーヒー を [飲|の]{みます}。", en: "I drink coffee every morning.", register: "Polite" },
          { jp: "[毎朝|まいあさ] コーヒー を [飲|の]{む}。", en: "I drink coffee every morning.", register: "Casual" },
        ],
      },
      {
        slug: "verb-last",
        pattern: "… Verb。",
        meaning: "In a normal sentence the verb, adjective or です/だ comes last; only small endings like か, よ and ね follow it.",
        lesson: "word-order/verb-last",
        examples: [{ jp: "[私|わたし] は パン を {[食|た]べます}。", en: "I eat bread." }],
      },
      {
        slug: "topic-comment",
        pattern: "Topic は Subject が …",
        meaning: "The topic sets the scene, and the comment has its own が-subject: “as for today, the weather is nice”.",
        lesson: "word-order/topic-comment",
        examples: [{ jp: "{[今日|きょう] は} [天気|てんき] が いい。", en: "The weather's nice today." }],
      },
      {
        slug: "order-moves",
        pattern: "Noun + particle, in any order, then Verb",
        meaning: "Particles label each word's job, so the pieces before the verb can move.",
        lesson: "word-order/particles-move",
        examples: [
          { jp: "[昨日|きのう] [友達|ともだち] {と} [公園|こうえん] {で} [遊|あそ]んだ。", en: "Yesterday I hung out with a friend in the park." },
          { jp: "[昨日|きのう] [公園|こうえん] {で} [友達|ともだち] {と} [遊|あそ]んだ。", en: "Yesterday I hung out in the park with a friend." },
        ],
      },
      {
        slug: "dropping-words",
        pattern: "(I / you / it) … Verb",
        meaning: "Leave out whatever the listener already knows, especially “I” and “you”.",
        lesson: "word-order/dropping-words",
        examples: [{ jp: "[明日|あした] {[来|き]ます} か？", en: "Are (you) coming tomorrow?" }],
      },
      {
        slug: "modifiers-first",
        pattern: "Description + Noun",
        meaning: "Adjectives, の phrases and whole clauses go before the noun they describe.",
        lesson: "word-order/modifiers-first",
        examples: [
          { jp: "{[赤|あか]い} [車|くるま]", en: "a red car" },
          { jp: "{[昨日|きのう] [買|か]った} [車|くるま]", en: "the car I bought yesterday" },
        ],
      },
    ],
  },
  {
    slug: "particles",
    title: "Particles",
    topics: [
      {
        slug: "wa-topic",
        pattern: "A は B",
        meaning: "は sets the topic: “as for A, B”.",
        lesson: "particles/wa-topic",
        examples: [{ jp: "[私|わたし] {は} [学生|がくせい] です。", en: "I'm a student." }],
      },
      {
        slug: "ga-subject",
        pattern: "Subject が Verb / Adjective",
        meaning: "が marks who or what does the verb or is the adjective; the subject is there even when unsaid (the zero が).",
        lesson: "particles/ga-subject",
        examples: [
          { jp: "[雨|あめ] {が} [降|ふ]って いる。", en: "It's raining." },
          { jp: "[頭|あたま] {が} [痛|いた]い。", en: "I have a headache." },
        ],
      },
      {
        slug: "question-word-ga",
        pattern: "Question word が … か？",
        meaning: "A question word as the subject takes が, never は; so does the answer.",
        lesson: "particles/wa-vs-ga",
        examples: [
          { jp: "[誰|だれ] {が} [来|き]ました か？", en: "Who came?" },
          { jp: "[田中|たなか]-さん {が} [来|き]ました。", en: "Tanaka came. (It was Tanaka.)" },
        ],
      },
      {
        slug: "wa-ga-likes",
        pattern: "Person は Thing が[好|す]き",
        meaning: "The topic is the one who likes; が marks what they like.",
        lesson: "particles/wa-vs-ga",
        examples: [{ jp: "[私|わたし] {は} [猫|ねこ] {が} [好|す]き です。", en: "I like cats." }],
      },
      {
        slug: "contrast-wa",
        pattern: "A は …、B は …",
        meaning: "は can contrast: two は in one sentence almost always do, and は in place of を hints “unlike other things”.",
        lesson: "particles/wa-vs-ga",
        examples: [{ jp: "コーヒー {は} [飲|の]む けど、 お[茶|ちゃ] {は} [飲|の]まない。", en: "I drink coffee, but I don't drink tea." }],
      },
      {
        slug: "wo-object",
        pattern: "Object を Verb",
        meaning: "を marks what the action is done to, and also the place you move through or leave.",
        lesson: "particles/wo-object",
        examples: [
          { jp: "[本|ほん] {を} [読|よ]みます。", en: "I read books." },
          { jp: "[公園|こうえん] {を} [歩|ある]く。", en: "I walk through the park." },
        ],
      },
      {
        slug: "ni-place-time",
        pattern: "Place に[行|い]く · Time に Verb",
        meaning: "に points at a target: where you go, and when something happens.",
        lesson: "particles/ni-target",
        examples: [
          { jp: "[学校|がっこう] {に} [行|い]く。", en: "I'm going to school." },
          { jp: "[七時|しちじ] {に} [起|お]きます。", en: "I get up at seven." },
        ],
      },
      {
        slug: "ni-person",
        pattern: "Person に Object を Verb",
        meaning: "に marks the person who receives: “to” someone.",
        lesson: "particles/ni-target",
        examples: [{ jp: "[友達|ともだち] {に} プレゼント を あげた。", en: "I gave my friend a present." }],
      },
      {
        slug: "ni-purpose",
        pattern: "Verb stem に[行|い]く",
        meaning: "Go somewhere to do something.",
        lesson: "particles/ni-target",
        examples: [{ jp: "[公園|こうえん] に [遊|あそ]び {に} [行|い]く。", en: "I'm going to the park to play." }],
      },
      {
        slug: "ni-naru",
        pattern: "Noun になる",
        meaning: "Become something.",
        lesson: "particles/ni-target",
        examples: [{ jp: "[水|みず] が [氷|こおり] {に} なった。", en: "The water turned into ice." }],
      },
      {
        slug: "de-place",
        pattern: "Place で Verb",
        meaning: "で marks the place where an action happens.",
        lesson: "particles/de-place-means",
        examples: [{ jp: "[公園|こうえん] {で} [遊|あそ]ぶ。", en: "I play in the park." }],
      },
      {
        slug: "de-means",
        pattern: "Means で Verb",
        meaning: "で marks what you use: a tool, a vehicle or a language.",
        lesson: "particles/de-place-means",
        examples: [
          { jp: "[電車|でんしゃ] {で} [東京|とうきょう] に [行|い]く。", en: "I go to Tokyo by train." },
          { jp: "[箸|はし] {で} [食|た]べる。", en: "I eat with chopsticks." },
        ],
      },
      {
        slug: "de-ichiban",
        pattern: "Range で[一番|いちばん] Adjective",
        meaning: "The most … in a group or place.",
        lesson: "particles/de-place-means",
        examples: [{ jp: "クラス {で} [一番|いちばん] [背|せ] が [高|たか]い。", en: "(I'm) the tallest in the class." }],
      },
      {
        slug: "ni-vs-de",
        pattern: "Place に (be, arrive) · Place で (do)",
        meaning: "The verb decides: に for being or arriving somewhere, で for doing something there.",
        lesson: "particles/ni-vs-de",
        examples: [
          { jp: "[駅|えき] {に} [着|つ]いた。", en: "I've arrived at the station." },
          { jp: "[駅|えき] {で} [待|ま]って いる。", en: "I'm waiting at the station." },
        ],
      },
      {
        slug: "e-direction",
        pattern: "Place へ Verb · A への B",
        meaning: "へ (pronounced e) points in a direction, toward somewhere; with verbs of motion it is nearly the same as に, which is more common.",
        lesson: "particles/e-vs-ni",
        examples: [
          { jp: "[北|きた] {へ} [向|む]かう。", en: "I head north." },
          { jp: "[母|はは] {へ の} [手紙|てがみ]", en: "a letter to my mother" },
        ],
      },
      {
        slug: "to-and",
        pattern: "A と B",
        meaning: "Joins nouns: A and B, a complete list.",
        lesson: "particles/to-ya",
        examples: [{ jp: "りんご {と} バナナ を [食|た]べた。", en: "I ate an apple and a banana." }],
      },
      {
        slug: "to-with",
        pattern: "Person と Verb",
        meaning: "Do something with someone.",
        lesson: "particles/to-ya",
        examples: [{ jp: "[友達|ともだち] {と} [映画|えいが] を [見|み]た。", en: "I watched a movie with a friend." }],
      },
      {
        slug: "ya-examples",
        pattern: "A や B",
        meaning: "Joins nouns: A, B and so on, a few examples rather than the whole list.",
        lesson: "particles/to-ya",
        examples: [{ jp: "[本|ほん] {や} [雑誌|ざっし] を [読|よ]む。", en: "I read books, magazines and so on." }],
      },
      {
        slug: "mo-also",
        pattern: "A も … · A も B も …",
        meaning: "A too; both A and B.",
        lesson: "particles/mo-also",
        examples: [
          { jp: "パン {も} [食|た]べる。", en: "I'll eat bread too." },
          { jp: "[猫|ねこ] {も} [犬|いぬ] {も} [好|す]き です。", en: "I like both cats and dogs." },
        ],
      },
      {
        slug: "nanimo-negative",
        pattern: "[何|なに]も + negative",
        meaning: "Nothing, not anything.",
        lesson: "particles/mo-also",
        examples: [{ jp: "[何|なに] {も} [食|た]べなかった。", en: "I didn't eat anything." }],
      },
      {
        slug: "no-linking",
        pattern: "A の B",
        meaning: "A's B, B of A: A describes B.",
        lesson: "particles/no-linking",
        examples: [
          { jp: "[私|わたし] {の} [本|ほん]", en: "my book" },
          { jp: "[友達|ともだち] {の} お[母|かあ]さん", en: "my friend's mother" },
        ],
      },
      {
        slug: "no-one",
        pattern: "Adjective の · Noun の",
        meaning: "The … one; after a noun, “…'s” on its own (mine, Tanaka's).",
        lesson: "particles/no-linking",
        examples: [
          { jp: "[小|ちい]さい {の} は あります か？", en: "Do you have a small one?" },
          { jp: "それ は [田中|たなか]-さん {の} です。", en: "That's Tanaka's." },
        ],
      },
      {
        slug: "kara-made",
        pattern: "A から B まで",
        meaning: "From A until (or as far as) B, in time or space.",
        lesson: "particles/kara-made",
        examples: [
          { jp: "[九時|くじ] {から} [五時|ごじ] {まで} [働|はたら]きます。", en: "I work from nine to five." },
          { jp: "[家|いえ] {から} [駅|えき] {まで} [歩|ある]いた。", en: "I walked from home to the station." },
        ],
      },
      {
        slug: "kara-because",
        pattern: "Reason から、Result",
        meaning: "Gives a reason: “…, so …” (because).",
        lesson: "particles/kara-made",
        examples: [{ jp: "[暑|あつ]い {から}、 [窓|まど] を [開|あ]けて。", en: "It's hot, so open the window." }],
      },
      {
        slug: "ka-question",
        pattern: "Sentence か？",
        meaning: "か at the end makes a question; nothing else moves.",
        lesson: "particles/ka-question",
        examples: [
          { jp: "コーヒー を [飲|の]みます {か}？", en: "Do you drink coffee?" },
          { jp: "[先生|せんせい] です {か}？", en: "Are you a teacher?" },
        ],
      },
      {
        slug: "casual-question",
        pattern: "Sentence？ (casual)",
        meaning: "Casual questions usually drop か and let the pitch rise.",
        lesson: "particles/ka-question",
        examples: [{ jp: "コーヒー [飲|の]む？", en: "Do you drink coffee?" }],
      },
      {
        slug: "ka-or",
        pattern: "A か B",
        meaning: "A or B.",
        lesson: "particles/ka-question",
        examples: [{ jp: "[紅茶|こうちゃ] {か} コーヒー", en: "tea or coffee" }],
      },
      {
        slug: "yo",
        pattern: "Sentence よ",
        meaning: "Tells the listener something new: “you know”.",
        lesson: "particles/yo-ne",
        examples: [{ jp: "この [道|みち]、 [危|あぶ]ない です {よ}。", en: "This road's dangerous, you know." }],
      },
      {
        slug: "ne",
        pattern: "Sentence ね · Sentence よね？",
        meaning: "Checks something you share: “isn't it?”, “right?”.",
        lesson: "particles/yo-ne",
        examples: [
          { jp: "[雨|あめ]、 よく [降|ふ]ります {ね}。", en: "It really keeps raining, doesn't it?" },
          { jp: "[明日|あした] [来|く]る {よね}？", en: "You're coming tomorrow, right?" },
        ],
      },
    ],
  },
  {
    slug: "nouns-adjectives",
    title: "Nouns and adjectives",
    topics: [
      {
        slug: "desu-da",
        pattern: "A は B です · A は B だ",
        meaning: "A is B, polite and casual.",
        lesson: "grammar/desu-da",
        examples: [
          { jp: "[田中|たなか]-さん は [先生|せんせい] {です}。", en: "Ms Tanaka is a teacher.", register: "Polite" },
          { jp: "[田中|たなか]-さん は [先生|せんせい] {だ} よ。", en: "Ms Tanaka is a teacher.", register: "Casual" },
        ],
      },
      {
        slug: "noun-forms",
        pattern: "Noun じゃない (じゃありません) · だった (でした) · じゃなかった (じゃありませんでした)",
        meaning: "Isn't, was and wasn't for nouns, casual (polite).",
        lesson: "grammar/desu-da",
        examples: [
          { jp: "[明日|あした] は [休|やす]み {じゃ ない}。", en: "Tomorrow isn't a day off." },
          { jp: "[昨日|きのう] は [雨|あめ] {でした}。", en: "It rained yesterday." },
        ],
      },
      {
        slug: "i-adjectives",
        pattern: "〜い · 〜くない · 〜かった · 〜くなかった",
        meaning: "い-adjectives change their own ending: isn't, was, wasn't.",
        lesson: "grammar/i-adjectives",
        examples: [
          { jp: "[今日|きょう] は {[寒|さむ]くない}。", en: "It isn't cold today." },
          { jp: "[昨日|きのう] の [映画|えいが] は {[面白|おもしろ]かった}。", en: "Yesterday's film was really good." },
        ],
      },
      {
        slug: "ii-yoi",
        pattern: "いい → よくない · よかった",
        meaning: "いい builds its other forms from よい.",
        lesson: "grammar/i-adjectives",
        examples: [
          { jp: "{よくない}。", en: "It's not good." },
          { jp: "[天気|てんき] が {よかった}。", en: "The weather was good." },
        ],
      },
      {
        slug: "na-adjectives",
        pattern: "な-adj です · な-adj な Noun",
        meaning: "な-adjectives behave like nouns, and take な before a noun.",
        lesson: "grammar/na-adjectives",
        examples: [
          { jp: "この [町|まち] は {[静|しず]か} です。", en: "This town is quiet." },
          { jp: "{[静|しず]か な} [町|まち]", en: "a quiet town" },
        ],
      },
    ],
  },
  {
    slug: "existence-questions",
    title: "Existence, pointing, questions and numbers",
    topics: [
      {
        slug: "aru-iru",
        pattern: "Place に Thing がある · Place に Person がいる",
        meaning: "There is: いる for people and animals, ある for everything else.",
        lesson: "grammar/aru-iru",
        examples: [
          { jp: "[公園|こうえん] に [子供|こども] が {いる}。", en: "There are children in the park." },
          { jp: "[公園|こうえん] に ベンチ が {ある}。", en: "There's a bench in the park." },
        ],
      },
      {
        slug: "have",
        pattern: "Thing がある · Person がいる",
        meaning: "To have: ある for things, いる for people.",
        lesson: "grammar/aru-iru",
        examples: [
          { jp: "お[金|かね] が {ありません}。", en: "I don't have any money." },
          { jp: "[兄弟|きょうだい] が {いる}？", en: "Do you have any brothers or sisters?" },
        ],
      },
      {
        slug: "kosoado",
        pattern: "こ・そ・あ・ど",
        meaning: "Near me, near you, over there, which: これ/それ/あれ/どれ, この…, ここ….",
        lesson: "grammar/kosoado",
        examples: [
          { jp: "{これ} は [何|なん] です か？", en: "What's this?" },
          { jp: "トイレ は {どこ} です か？", en: "Where's the toilet?" },
        ],
      },
      {
        slug: "question-words",
        pattern: "… Question word … か？",
        meaning: "The question word goes where the answer would go; add か, or drop it in casual speech.",
        lesson: "grammar/question-words",
        examples: [
          { jp: "{いつ} [日本|にほん] に [来|き]ました か？", en: "When did you come to Japan?" },
          { jp: "[昨日|きのう] {[何|なに]} を [食|た]べた？", en: "What did you eat yesterday?" },
        ],
      },
      {
        slug: "counters",
        pattern: "Thing を Number + Counter",
        meaning: "Count things with a counter after the number; number + counter usually sits right before the verb, with no particle.",
        lesson: "grammar/numbers-counting",
        examples: [
          { jp: "[切手|きって] を {[五枚|ごまい]} ください。", en: "Five stamps, please." },
          { jp: "りんご を {[三|みっ]つ} ください。", en: "Three apples, please." },
        ],
      },
    ],
  },
  {
    slug: "verbs",
    title: "Verb forms",
    topics: [
      {
        slug: "verb-groups",
        pattern: "る-verbs · う-verbs · する and [来|く]る",
        meaning: "A verb's group decides how every form is built.",
        lesson: "verbs/verb-groups",
        examples: [
          { jp: "[帰|かえ]{り}ます", en: "(I) go home" },
          { jp: "[変|か]え{ます}", en: "(I) change (it)" },
        ],
      },
      {
        slug: "masu-form",
        pattern: "Verb stem + ます · ません · ました · ませんでした",
        meaning: "Polite verbs: do, don't, did, didn't.",
        lesson: "verbs/masu-form",
        examples: [
          { jp: "[明日|あした] [東京|とうきょう] に [行|い]{きます}。", en: "I'll go to Tokyo tomorrow." },
          { jp: "[昨日|きのう] は [勉強|べんきょう] {しません でした}。", en: "I didn't study yesterday." },
        ],
      },
      {
        slug: "masen-ka",
        pattern: "Verb stem + ませんか？",
        meaning: "Won't you …? A polite invitation.",
        lesson: "verbs/masu-form",
        examples: [{ jp: "[一緒|いっしょ] に [晩|ばん]ご[飯|はん] を [食|た]べません か？", en: "Would you like to have dinner together?" }],
      },
      {
        slug: "nai-form",
        pattern: "る-verb 〜ない · う-verb a-sound + ない",
        meaning: "Casual “don't”.",
        lesson: "verbs/nai-form",
        examples: [{ jp: "お[酒|さけ] は [飲|の]{まない}。", en: "I don't drink alcohol." }],
      },
      {
        slug: "te-form",
        pattern: "〜て、〜て、…",
        meaning: "The て form links actions: “… and then …”.",
        lesson: "verbs/te-form",
        examples: [{ jp: "[家|いえ] に {[帰|かえ]って}、 すぐ [寝|ね]た。", en: "I went home and went straight to bed." }],
      },
      {
        slug: "te-request",
        pattern: "〜て。 (casual)",
        meaning: "The て form alone is a casual request.",
        lesson: "verbs/te-form",
        examples: [{ jp: "[窓|まど] を [開|あ]け{て}。", en: "Open the window." }],
      },
      {
        slug: "kute",
        pattern: "い-adj 〜くて · な-adj or Noun で",
        meaning: "Links an adjective or noun to what follows: “… and …”.",
        lesson: "verbs/te-form",
        examples: [{ jp: "この [店|みせ] は [安|やす]{くて} おいしい。", en: "This place is cheap and tasty." }],
      },
      {
        slug: "ta-form",
        pattern: "〜た · 〜なかった",
        meaning: "Casual past: did, didn't.",
        lesson: "verbs/ta-form",
        examples: [
          { jp: "[本|ほん] を [三冊|さんさつ] [読|よ]{んだ}。", en: "I read three books." },
          { jp: "[朝|あさ]ご[飯|はん] を [食|た]べ{なかった}。", en: "I didn't eat breakfast." },
        ],
      },
      {
        slug: "te-iru",
        pattern: "〜ている",
        meaning: "Is doing; or a lasting state.",
        lesson: "verbs/te-iru-te-kudasai",
        examples: [
          { jp: "[今|いま]、 [本|ほん] を [読|よ]んで {いる}。", en: "I'm reading a book right now." },
          { jp: "[姉|あね] は [京都|きょうと] に [住|す]んで {いる}。", en: "My sister lives in Kyoto." },
        ],
      },
      {
        slug: "te-kudasai",
        pattern: "〜てください",
        meaning: "Please do ….",
        lesson: "verbs/te-iru-te-kudasai",
        examples: [{ jp: "ちょっと [待|ま]って {ください}。", en: "Please wait a moment." }],
      },
      {
        slug: "tai",
        pattern: "Verb stem + たい · たくない",
        meaning: "Want to do; don't want to.",
        lesson: "verbs/tai-form",
        examples: [
          { jp: "[日本|にほん] に [行|い]き{たい}。", en: "I want to go to Japan." },
          { jp: "[今日|きょう] は [何|なに] も し{たくない}。", en: "I don't want to do anything today." },
        ],
      },
      {
        slug: "tagatte-iru",
        pattern: "Verb stem + たがっている",
        meaning: "Someone else wants to do something.",
        lesson: "verbs/tai-form",
        examples: [{ jp: "[弟|おとうと] は ゲーム を [買|か]い{たがって いる}。", en: "My little brother wants to buy a game." }],
      },
      {
        slug: "mashou",
        pattern: "Verb stem + ましょう · ましょうか",
        meaning: "Let's …; shall we …?; shall I …?",
        lesson: "verbs/volitional",
        examples: [
          { jp: "そろそろ [行|い]き{ましょう} か。", en: "Shall we get going?" },
          { jp: "[手伝|てつだ]い{ましょう} か？", en: "Shall I help you?" },
        ],
      },
      {
        slug: "volitional",
        pattern: "る-verb 〜よう · う-verb o-sound + う",
        meaning: "Casual “let's …”, or “I think I'll …”.",
        lesson: "verbs/volitional",
        examples: [
          { jp: "[一緒|いっしょ] に [帰|かえ]{ろう}。", en: "Let's go home together." },
          { jp: "もう [寝|ね]{よう}。", en: "I think I'll go to bed now." },
        ],
      },
      {
        slug: "potential",
        pattern: "る-verb 〜られる · う-verb e-sound + る",
        meaning: "Can do: the potential form.",
        lesson: "verbs/potential",
        examples: [
          { jp: "[日本語|にほんご] が {[話|はな]せます}。", en: "I can speak Japanese." },
          { jp: "[納豆|なっとう] が {[食|た]べられない}。", en: "I can't eat natto." },
        ],
      },
      {
        slug: "tara",
        pattern: "〜たら、…",
        meaning: "If …, or when ….",
        lesson: "verbs/tara-conditional",
        examples: [
          { jp: "[雨|あめ] が [降|ふ]っ{たら}、 [行|い]かない。", en: "If it rains, I won't go." },
          { jp: "[駅|えき] に [着|つ]い{たら}、 [電話|でんわ] して。", en: "Call me when you get to the station." },
        ],
      },
    ],
  },
];

export const GRAMMAR_TOPICS: GrammarTopic[] = GRAMMAR.flatMap((g) => g.topics);
