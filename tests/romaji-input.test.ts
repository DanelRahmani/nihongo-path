import { describe, expect, it } from "vitest";
import { normalizeRomaji, romajiMatches } from "@/lib/romaji-input";

describe("romajiMatches", () => {
  it.each([
    ["shi", "shi"],
    ["si", "shi"],
    ["chizu", "chizu"],
    ["tizu", "chizu"],
    ["tsukue", "tsukue"],
    ["tukue", "tsukue"],
    ["fuji", "fuji"],
    ["huzi", "fuji"],
    ["sya", "sha"],
    ["tya", "cha"],
    ["jyu", "ju"],
    ["kyou", "kyou"],
    ["kyoo", "kyou"],
    ["kyō", "kyou"],
    ["hon'ya", "hon'ya"],
    ["honya", "hon'ya"],
    ["Koohii", "koohii"],
    ["wo", "o"],
  ])("accepts %s for %s", (typed, expected) => expect(romajiMatches(typed, expected)).toBe(true));

  it.each([
    ["shu", "shi"],
    ["kyo", "kyou"],
    ["gakko", "gakkou"],
    ["", "a"],
  ])("rejects %s for %s", (typed, expected) => expect(romajiMatches(typed, expected)).toBe(false));

  it("leaves Hepburn as it is", () => {
    expect(normalizeRomaji("shinbun")).toBe("shinbun");
    expect(normalizeRomaji("matcha")).toBe("matcha");
  });
});
