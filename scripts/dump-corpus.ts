// Prints every Japanese line in the curriculum with its location, reading, romaji and English:
// the printed dump that content reviewers check against content/STYLE.md.
//
//   npm run dump                      the whole curriculum
//   npm run dump -- particles         one unit
//   npm run dump -- verbs/te-form     one lesson (any key prefix works; several are allowed)
import { corpusFields, dumpText } from "@/lib/corpus";

const filters = process.argv.slice(2);
const fields = corpusFields().filter((f) => filters.length === 0 || filters.some((p) => f.lesson.startsWith(p)));
if (fields.length === 0) {
  console.error(`No lessons match: ${filters.join(", ")}`);
  process.exit(1);
}
process.stdout.write(dumpText(fields));
