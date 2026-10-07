import { describe, expect, it } from "vitest";
import { plainOf, readingOf } from "@/lib/markup";
import { kanaToRomaji, romajiOf } from "@/lib/romaji";

// The romaji scheme in content/STYLE.md §6, pinned word by word. A change here is a change to the
// scheme: update STYLE.md in the same commit and review the corpus snapshot diff.

describe("golden readings: long vowels are spelled as the kana are written", () => {
  it.each([
    ["おかあさん", "okaasan"],
    ["おにいさん", "oniisan"],
    ["くうき", "kuuki"],
    ["おねえさん", "oneesan"],
    ["せんせい", "sensei"],
    ["えいが", "eiga"],
    ["おとうさん", "otousan"],
    ["がっこう", "gakkou"],
    ["おおきい", "ookii"],
    ["とおり", "toori"],
    ["きょう", "kyou"],
    ["りょうり", "ryouri"],
    ["じゅう", "juu"],
  ])("%s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));
});

describe("golden readings: katakana ー repeats the vowel before it", () => {
  it.each([
    ["コーヒー", "koohii"],
    ["ラーメン", "raamen"],
    ["ケーキ", "keeki"],
    ["スーパー", "suupaa"],
    ["ジュース", "juusu"],
    ["ショー", "shoo"],
    ["パーティー", "paatii"],
  ])("%s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));
});

describe("golden readings: っ doubles the next consonant", () => {
  it.each([
    ["きって", "kitte"],
    ["ざっし", "zasshi"],
    ["いっしょ", "issho"],
    ["みっつ", "mittsu"],
    ["いっぱい", "ippai"],
    ["ベッド", "beddo"],
    ["ホットドッグ", "hottodoggu"],
  ])("%s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));

  it("writes t before ch", () => {
    expect(kanaToRomaji("まっちゃ")).toBe("matcha");
    expect(kanaToRomaji("ぼっちゃん")).toBe("botchan");
  });

  it("drops a word-final っ", () => {
    expect(kanaToRomaji("あっ！")).toBe("a!");
  });
});

describe("golden readings: ん", () => {
  it.each([
    ["ほんや", "hon'ya"],
    ["こんや", "kon'ya"],
    ["きんえん", "kin'en"],
    ["せんえん", "sen'en"],
    ["げんいん", "gen'in"],
    ["パンや", "pan'ya"],
  ])("takes an apostrophe before a vowel or y: %s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));

  it.each([
    ["しんぶん", "shinbun"],
    ["さんぽ", "sanpo"],
    ["てんぷら", "tenpura"],
    ["がんばる", "ganbaru"],
    ["せんまん", "senman"],
  ])("stays n before b, m and p: %s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));

  it.each([
    ["みんな", "minna"],
    ["あんない", "annai"],
    ["ほん", "hon"],
  ])("is plain n elsewhere: %s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));
});

describe("golden readings: は, へ and を", () => {
  it("read wa, e and o as particles (their own word)", () => {
    expect(kanaToRomaji("わたし は がくせい です。")).toBe("watashi wa gakusei desu.");
    expect(kanaToRomaji("にほん へ いきます。")).toBe("nihon e ikimasu.");
    expect(kanaToRomaji("みず を のみます。")).toBe("mizu o nomimasu.");
    expect(kanaToRomaji("ここ に は ない。")).toBe("koko ni wa nai.");
    expect(kanaToRomaji("ここ では ない。")).toBe("koko dewa nai.");
  });

  it("read wa in the set greetings, and in では as a conjunction", () => {
    expect(kanaToRomaji("では、 はじめましょう。")).toBe("dewa, hajimemashou.");
    expect(kanaToRomaji("こんにちは。")).toBe("konnichiwa.");
    expect(kanaToRomaji("こんばんは！")).toBe("konbanwa!");
  });

  it("read ha and he inside a word", () => {
    expect(kanaToRomaji("はな")).toBe("hana");
    expect(kanaToRomaji("はは")).toBe("haha");
    expect(kanaToRomaji("へや")).toBe("heya");
  });

  it("read ha when a kanji word is read は (歯, 葉), never as the particle", () => {
    expect(romajiOf("[歯|は] が [痛|いた]い。")).toBe("ha ga itai.");
    expect(romajiOf("[葉|は] が [赤|あか]い。")).toBe("ha ga akai.");
    expect(romajiOf("[歯|は] {は} [白|しろ]い。")).toBe("ha wa shiroi.");
  });

  it("read stacked particles one by one (STYLE.md writes them as separate words)", () => {
    expect(kanaToRomaji("ここ で は ない。")).toBe("koko de wa nai.");
    expect(kanaToRomaji("にほん に も いきたい。")).toBe("nihon ni mo ikitai.");
  });

  it("read wa where ・ separates the particles", () => {
    expect(kanaToRomaji("は・が")).toBe("wa ga");
  });

  // STYLE.md writes these greetings in kana; the kanji spellings here only test the engine.
  it("still read wa when only the kana part of a word is the particle", () => {
    expect(romajiOf("[私|わたし] は [学生|がくせい] です。")).toBe("watashi wa gakusei desu.");
    expect(romajiOf("[今日|こんにち]は。")).toBe("konnichiwa.");
    expect(romajiOf("[今晩|こんばん]は。")).toBe("konbanwa.");
  });
});

describe("golden readings: ぢ and づ", () => {
  it.each([
    ["はなぢ", "hanaji"],
    ["ちぢむ", "chijimu"],
    ["つづく", "tsuzuku"],
    ["みかづき", "mikazuki"],
    ["こづつみ", "kozutsumi"],
  ])("%s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));
});

describe("golden readings: extended katakana", () => {
  it.each([
    ["ヴァイオリン", "vaiorin"],
    ["ティッシュ", "tisshu"],
    ["ディズニー", "dizunii"],
    ["ファン", "fan"],
    ["フォーク", "fooku"],
    ["ウェブ", "webu"],
    ["シェフ", "shefu"],
    ["ジェット", "jetto"],
    ["チェック", "chekku"],
  ])("%s → %s", (kana, romaji) => expect(kanaToRomaji(kana)).toBe(romaji));
});

describe("golden readings: names and punctuation", () => {
  it("hyphenates where the markup joins a name to its suffix or title", () => {
    expect(romajiOf("[田中|たなか]-さん")).toBe("tanaka-san");
    expect(romajiOf("[健太|けんた]-くん、[元気|げんき]？")).toBe("kenta-kun, genki?");
    expect(romajiOf("スミス-さん")).toBe("sumisu-san");
    expect(romajiOf("[山田|やまだ]-[先生|せんせい]")).toBe("yamada-sensei");
    expect(romajiOf("[田中|たなか]-さん-たち")).toBe("tanaka-san-tachi");
  });

  it("never shows the join in Japanese", () => {
    expect(plainOf("[田中|たなか]-さん")).toBe("田中さん");
    expect(readingOf("[田中|たなか]-さん")).toBe("たなかさん");
  });

  it("keeps family words and other suffixes attached", () => {
    expect(romajiOf("お[母|かあ]さん")).toBe("okaasan");
    expect(romajiOf("お[客|きゃく][様|さま]")).toBe("okyakusama");
  });

  it("maps Japanese punctuation", () => {
    expect(kanaToRomaji("「はい」 と いった。")).toBe("\"hai\" to itta.");
    expect(kanaToRomaji("〜ます")).toBe("~masu");
    expect(kanaToRomaji("『こころ』 を よんだ。")).toBe("\"kokoro\" o yonda.");
    expect(kanaToRomaji("あ・ア")).toBe("a a");
  });
});
