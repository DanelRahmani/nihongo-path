/**
 * The cloze deck's hand-reviewed data (E5), keyed by card id ("unit/lesson#hash", lib/cloze-cards.ts clozeId),
 * each with its line beside it. Lines are also left out by rule (lib/cloze-cards.ts): pair lines whose other side
 * fits the same gap, lines with several highlights, highlights covering most of the line, and the kana lessons.
 */

/** Lines left out by hand: another answer is equally right, or the line doesn't test what its lesson teaches. */
export const CLOZE_EXCLUSIONS: Record<string, string> = {
  // その [本|ほん] ＿＿ [昨日|きのう] [読|よ]んだ。 (は)
  "word-order/topic-comment#1hp5wdf": "を also fits “I read that book yesterday”.",
  // この [町|まち] ＿＿ [静|しず]か です。 (は)
  "particles/wa-topic#49hyv3": "が also fits “This town is quiet”.",
  // [弟|おとうと] ＿＿ [好|す]き な [歌|うた] (が)
  "particles/wa-vs-ga#v14nhi": "の also fits in a describing clause (弟の好きな歌).",
  // [家|いえ] ＿＿ [出|で]る。 (を)
  "particles/wo-object#1tb44dt": "から also fits “leave the house” (家から出る).",
  // [夜|よる] [九時|くじ] ＿＿ です。 (まで)
  "particles/kara-made#1hklyup": "“Nine in the evening” doesn't say “until”; only the dialogue gives まで.",
  // [十時|じゅうじ] ＿＿ です。 (から)
  "particles/kara-made#1q0f3th": "“At ten” doesn't say “from”; only the dialogue gives から.",
  // ＿＿ [電車|でんしゃ] が [便利|べんり] です。 ([日本|にほん] は)
  "word-order/topic-comment#1cztdb9": "日本では also fits “Trains are convenient in Japan”.",
  // ＿＿ [電車|でんしゃ] が [便利|べんり] だ よ。 ([日本|にほん] は)
  "word-order/topic-comment#ww2spr": "日本では also fits “Trains are convenient in Japan”.",
  // すみません、 ＿＿ は いくら です か？ (それ)
  "grammar/kosoado#nuh6ou": "あれ also fits “How much is that?”; the English doesn't say where the thing is.",
  // ＿＿ は [五千円|ごせんえん] です。 (あれ)
  "grammar/kosoado#azqce4": "それ also fits “That one's 5,000 yen”.",
  // ＿＿ は [学生|がくせい] です か？ (あなた)
  "culture/avoid-anata#1vlsxhu": "Any name or title fits, and the lesson teaches avoiding あなた, not using it.",
  // ＿＿ は [学生|がくせい] です か？ ([田中|たなか]-さん)
  "culture/avoid-anata#1tm2qiv": "Any name or title fits “Are you a student?”.",
  // わざわざ ＿＿。 (すみません)
  "culture/sumimasen#1ou0qwj": "ありがとう(ございます) also fits “Thank you for going to all that trouble”.",
  // [!私|わたし] は ＿＿ が [!好|す]き です。 (コーヒー)
  "start/three-scripts#3zf6ea": "three-scripts shows the scripts and teaches neither word; the learner hasn't met kana yet.",
  // ＿＿ を [!勉強|べんきょう] して います。 ([!日本語|にほんご])
  "start/three-scripts#3xgh1b": "three-scripts shows the scripts and teaches neither word; the learner hasn't met kana yet.",
  // [夏休|なつやす]み ＿＿ どこか [行|い]きました か？ (に)
  "particles/ni-target#12v2wwu": "は also fits (夏休みはどこか行きましたか？).",
  // [帰|かえ]＿＿ (る), and the same for 入る, 走る, 知る and 切る
  "verbs/verb-groups#1h7fwx5": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#owvqls": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#15s6ws4": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#qokyqk": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  "verbs/verb-groups#rrvmw4": "The gap is the dictionary ending る, which the English gives away; the card tests nothing.",
  // [変|か]え＿＿ (ます)
  "verbs/verb-groups#1ler4ia": "The gap is the ending ます alone, which the English gives away; the card tests nothing.",
  // [電話|でんわ]＿＿ です。 and three more: the answer is the kanji 中
  "suffixes/chuu-juu#alelyp": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#8bu5y3": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#17adcuf": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#at5bm6": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#1o4hs3y": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
  "suffixes/chuu-juu#1pznjnw": "Typing ちゅう or じゅう gives the kanji 中, so the card can't test the reading the lesson teaches.",
};

/**
 * Other answers that count, reviewed by hand: a particle the lesson says also fits, and the digits a keyboard
 * offers for a number (as the lesson quizzes list them). Written as typed.
 */
export const CLOZE_ALSO: Record<string, string[]> = {
  // [学校|がっこう] ＿＿ [行|い]く。 (に)
  "particles/ni-target#dfhvgm": ["へ"],
  // はい、 [京都|きょうと] ＿＿ [行|い]きました。 (に)
  "particles/ni-target#o4rdlq": ["へ"],
  // [北|きた] ＿＿ [向|む]かう。 (へ): the lesson says both mark direction.
  "particles/e-vs-ni#qg11ya": ["に"],
  // [空港|くうこう] ＿＿ [急|いそ]ぐ。 (へ)
  "particles/e-vs-ni#bym6xw": ["に"],
  // [本|ほん] ＿＿ [雑誌|ざっし] を [読|よ]む。 (や): the lesson teaches とか too.
  "particles/to-ya#10z33pn": ["とか"],
  // [暑|あつ]い ＿＿、 [窓|まど] を [開|あ]けて。 (から)
  "particles/kara-made#1mf4v1l": ["ので"],
  // ＿＿？ すごい ね！ ([本当|ほんとう]): casual, and the quiz accepts え、ほんと？
  "culture/aizuchi#1h78sko": ["ほんと"],
  // りんご を ＿＿ ください。 ([三|みっ]つ), and the other counting lines
  "grammar/numbers-counting#xyzfbn": ["3つ"],
  "grammar/numbers-counting#x2pemp": ["5枚"],
  "grammar/numbers-counting#1h6d5ks": ["2本"],
  "grammar/numbers-counting#1pqgp07": ["2人"],
  // [猫|ねこ] が ＿＿ いる。 ([三匹|さんびき])
  "suffixes/tachi-plural#uny2gr": ["3匹"],
};
