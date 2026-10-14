/**
 * The polite ↔ casual drill's reviewed alternatives (E6), keyed by card id ("unit/lesson#hash" of the line to
 * convert, lib/register-cards.ts), each with its conversion beside it. Other conversions a learner gives that are
 * just as right as the lesson's own line: casual speech keeps or drops を, a noun or な-adjective ends bare or
 * with だ (STYLE §9), and よ stays when it was there. Written as typed. The engine's variants (ない です for
 * ありません) are added on top.
 */
export const REGISTER_ALSO: Record<string, string[]> = {
  // Into casual
  // [何|なに] を [飲|の]みます か？ → [何|なに] [飲|の]む？
  "start/polite-and-casual#1inls1d": ["何を飲む？"],
  // [週末|しゅうまつ] は [何|なに] を します か？ → [週末|しゅうまつ] は [何|なに] する？
  "word-order/verb-last#i5dkzq": ["週末は何をする？"],
  // コーヒー を [飲|の]みます か？ → コーヒー [飲|の]む？
  "particles/ka-question#pw6qb6": ["コーヒーを飲む？"],
  // [毎朝|まいあさ] コーヒー を [飲|の]みます。 → [毎朝|まいあさ] コーヒー を [飲|の]む。
  "start/polite-and-casual#1pfy86w": ["毎朝コーヒー飲む。"],
  // [毎朝|まいあさ] [駅|えき] で コーヒー を [買|か]います。 → … を [買|か]う。
  "word-order/verb-last#4wp2dk": ["毎朝駅でコーヒー買う。"],
  // [日本|にほん] は [電車|でんしゃ] が [便利|べんり] です。 → … [便利|べんり] だ よ。
  "word-order/topic-comment#6bsvj": ["日本は電車が便利。", "日本は電車が便利だ。", "日本は電車が便利だね。"],
  // [田中|たなか]-さん は [先生|せんせい] です。 → … [先生|せんせい] だ よ。
  "grammar/desu-da#xgkrjy": ["田中さんは先生。", "田中さんは先生だ。", "田中さんは先生だね。"],
  // [好|す]き な [食|た]べ[物|もの] は [何|なん] です か？ → … は [何|なに]？
  "grammar/na-adjectives#13t5ar7": ["好きな食べ物は？"],
  // [今|いま]、 [忙|いそが]しい です か？ → [今|いま]、 [忙|いそが]しい？
  "culture/polite-or-casual#1ttl731": ["今、忙しいの？"],

  // Into polite
  // コーヒー [飲|の]む？ → コーヒー を [飲|の]みます か？
  "particles/ka-question#pn76pr": ["コーヒー飲みますか？"],
  // [日本|にほん] は [電車|でんしゃ] が [便利|べんり] だ よ。 → … [便利|べんり] です。
  "word-order/topic-comment#16i0ty1": ["日本は電車が便利ですよ。"],
  // [田中|たなか]-さん は [先生|せんせい] だ よ。 → … [先生|せんせい] です。
  "grammar/desu-da#pczdqy": ["田中さんは先生ですよ。"],
  // [元気|げんき]？ → [元気|げんき] です か？
  "grammar/na-adjectives#d9tbte": ["お元気ですか？"],
};
