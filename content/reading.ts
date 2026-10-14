/**
 * The reading view (/read): short real-world texts to read with kanji showing, and haiku by Bashō and Issa.
 * Everything except the haiku is original (content/STYLE.md §2). Reading texts write numbers in Arabic
 * digits, with one ruby group over the number and its counter: [10時|じゅうじ] (§8). The haiku are quoted texts (§5): they keep the kanji of the edition named in their `source`,
 * so the 常用, kanji-data and dictionary tests skip them (lib/corpus.ts marks them `quoted`).
 *
 * Only the reading page and the corpus import this file: practice decks must never quiz on it
 * (tests/reading.test.ts).
 */
import type { Jp } from "@/content/types";

export interface ReadingLine {
  jp: Jp;
  en: string;
  /** A price beside a menu item, in reading-text digits: [400円|よんひゃくえん]. */
  price?: Jp;
  /** In a chat: who sent it. "me" sits on the right. */
  from?: "me" | "them";
}

export interface ReadingText {
  slug: string;
  kind: "sign" | "menu" | "chat" | "news" | "story" | "haiku";
  /** What the reader is looking at, in English. */
  title: string;
  /** A haiku's poet, in English. */
  author?: string;
  /** For a quoted text: the edition its text and reading are checked against. */
  source?: string;
  /** In a chat: the other person's name, shown above their messages. */
  them?: Jp;
  lines: ReadingLine[];
}

export const READING: ReadingText[] = [
  {
    slug: "shop-sign",
    kind: "sign",
    title: "A sign on a shop door",
    lines: [
      { jp: "[本日|ほんじつ] [休業|きゅうぎょう]", en: "Closed today" },
      { jp: "[明日|あした] は [10時|じゅうじ] から [営業|えいぎょう] します。", en: "Open from 10 tomorrow." },
      { jp: "[店長|てんちょう]", en: "The manager" },
    ],
  },
  {
    slug: "cafe-menu",
    kind: "menu",
    title: "A café menu",
    lines: [
      { jp: "コーヒー", en: "coffee", price: "[400円|よんひゃくえん]" },
      { jp: "[紅茶|こうちゃ]", en: "black tea", price: "[400円|よんひゃくえん]" },
      { jp: "ケーキ", en: "cake", price: "[500円|ごひゃくえん]" },
      { jp: "[飲|の]み[物|もの] は アイス も あります。", en: "We also have iced drinks." },
    ],
  },
  {
    slug: "chat",
    kind: "chat",
    title: "A chat between friends",
    them: "[健太|けんた]",
    lines: [
      { jp: "[明日|あした]、 [暇|ひま]？", en: "Are you free tomorrow?", from: "me" },
      { jp: "うん、 [午後|ごご] なら [暇|ひま] だ よ。", en: "Yeah, I'm free in the afternoon.", from: "them" },
      { jp: "[映画|えいが] [見|み] に [行|い]かない？", en: "Want to go and see a film?", from: "me" },
      { jp: "いい ね！ [何時|なんじ] に する？", en: "Sounds good! What time?", from: "them" },
      { jp: "[2時|にじ] に [駅|えき] で。", en: "Two o'clock at the station.", from: "me" },
      { jp: "オッケー！ じゃあ、 また [明日|あした]。", en: "OK! See you tomorrow, then.", from: "them" },
    ],
  },
  {
    slug: "news",
    kind: "news",
    title: "A news headline",
    lines: [
      { jp: "[東京|とうきょう] で [初雪|はつゆき]", en: "First snow in Tokyo" },
      { jp: "[今朝|けさ]、 [東京|とうきょう] で [雪|ゆき] が [降|ふ]りました。", en: "Snow fell in Tokyo this morning." },
      { jp: "[電車|でんしゃ] が [少|すこ]し [遅|おく]れて います。", en: "Trains are running a little late." },
    ],
  },
  {
    slug: "story",
    kind: "story",
    title: "A short story: the cat and the umbrella",
    lines: [
      { jp: "[日曜日|にちようび] は [雨|あめ] でした。", en: "It rained on Sunday." },
      { jp: "[駅|えき] の [前|まえ] に [小|ちい]さい [猫|ねこ] が いました。", en: "There was a little cat in front of the station." },
      { jp: "[猫|ねこ] は ぬれて いました。", en: "The cat was wet." },
      { jp: "[私|わたし] は [猫|ねこ] に [傘|かさ] を あげました。", en: "I gave the cat my umbrella." },
      { jp: "[月曜日|げつようび]、 [猫|ねこ] は いません でした。", en: "On Monday, the cat was gone." },
      { jp: "[傘|かさ] も ありません でした。", en: "So was the umbrella." },
      { jp: "[少|すこ]し うれしかった です。", en: "It made me a little happy." },
    ],
  },
  {
    slug: "basho-furuike",
    kind: "haiku",
    title: "Haiku",
    author: "Matsuo Bashō (1644–1694)",
    source: "Bashō haikushū (Iwanami Bunko)",
    lines: [{ jp: "[古池|ふるいけ] や [蛙|かわず] [飛|と]び[込|こ]む [水|みず] の [音|おと]", en: "An old pond: a frog jumps in, the sound of the water." }],
  },
  {
    slug: "basho-shizukasa",
    kind: "haiku",
    title: "Haiku",
    author: "Matsuo Bashō (1644–1694)",
    source: "Bashō haikushū (Iwanami Bunko)",
    lines: [{ jp: "[閑|しず]かさ や [岩|いわ] に しみ[入|い]る [蝉|せみ] の [声|こえ]", en: "Such stillness: soaking into the rocks, the cicadas' cry." }],
  },
  {
    slug: "issa-suzume",
    kind: "haiku",
    title: "Haiku",
    author: "Kobayashi Issa (1763–1828)",
    source: "Issa haikushū (Iwanami Bunko)",
    lines: [{ jp: "[雀|すずめ] の [子|こ] そこのけ そこのけ [御馬|おうま] が [通|とお]る", en: "Sparrow chick, out of the way, out of the way! The honourable horse is coming through." }],
  },
  {
    slug: "issa-meigetsu",
    kind: "haiku",
    title: "Haiku",
    author: "Kobayashi Issa (1763–1828)",
    source: "Issa haikushū (Iwanami Bunko)",
    lines: [{ jp: "[名月|めいげつ] を [取|と]って くれろ と [泣|な]く [子|こ] かな", en: "“Get me the harvest moon!” cries the child." }],
  },
];
