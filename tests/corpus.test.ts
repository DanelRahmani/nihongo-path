import { describe, expect, it } from "vitest";
import { corpusFields, snapshotText } from "@/lib/corpus";

describe("reading corpus", () => {
  // Every Japanese line as written | reading | romaji. Any change to a reading, a Japanese line or
  // the romaji engine shows up as a diff in tests/__snapshots__/corpus.txt. Review it line by line,
  // then accept it with `npm test -- -u`. A change to the engine alone must leave this file as it is.
  it("matches the reading snapshot", async () => {
    await expect(snapshotText(corpusFields())).toMatchFileSnapshot("__snapshots__/corpus.txt");
  });
});
