import { describe, expect, it } from "vitest";
import { GET as dictionaryData } from "@/app/dictionary-data.json/route";
import { GET as searchItems } from "@/app/search-items.json/route";
import type { DictionaryData } from "@/lib/lookup";
import { buildSearchIndex, type SearchItem, searchIndex, wordItems } from "@/lib/search";
import { indexSources } from "@/lib/search-sources";

describe("the search index split (I9)", async () => {
  // What the dialog receives: the two static files, through their JSON round trip.
  const route = (await searchItems().json()) as SearchItem[];
  const dictionary = (await dictionaryData().json()) as DictionaryData;
  const client = [...route, ...wordItems(dictionary)];
  const full = buildSearchIndex(indexSources());

  it("sends no words in /search-items.json", () => {
    expect(route.some((i) => i.kind === "word")).toBe(false);
  });

  it("gives the dialog exactly the index it had before, item for item and in order", () => {
    expect(client).toEqual(JSON.parse(JSON.stringify(full)));
  });

  it("ranks the same: “you” still lists あなた in its top five", () => {
    expect(searchIndex(client, "you", 5).map((i) => i.label)).toContain("あなた");
  });

  it("makes the file much smaller", () => {
    // Two fifths: lessons, topics and kanji grow with each JLPT phase, while the words left out stay about the same
    // (a third until JLPT Phase 2's unit 十七).
    expect(Buffer.byteLength(JSON.stringify(route))).toBeLessThan((Buffer.byteLength(JSON.stringify(full)) * 2) / 5);
  });
});
