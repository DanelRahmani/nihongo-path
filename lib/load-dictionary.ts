import type { DictionaryData } from "@/lib/lookup";

let dataPromise: Promise<DictionaryData> | undefined;

/**
 * The static /dictionary-data.json, fetched once per page view and shared by the word inspector and the
 * dictionary page. A failed fetch is forgotten, so the next request tries again.
 */
export function loadDictionary(): Promise<DictionaryData> {
  dataPromise ??= fetch("/dictionary-data.json")
    .then((response) => {
      if (!response.ok) throw new Error("The dictionary data could not be loaded.");
      return response.json() as Promise<DictionaryData>;
    })
    .catch((error: unknown) => {
      dataPromise = undefined;
      throw error;
    });
  return dataPromise;
}
