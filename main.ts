// One Letter for Your Day — entry program.
//
// The whole entry is a single letter: H.
// Behind it sits the word "hungover" — the day after, reported honestly:
// the pounding head, the sunglasses indoors, the slow regret. One letter,
// no gloss, exactly as the rules demand.
//
// The gate requires /output/entry.txt to be UTF-8 text of exactly one
// character, so this writes the letter with no trailing newline.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const OUTPUT_PATH = "/output/entry.txt";
const LETTER = "H";

function main(): void {
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, LETTER, { encoding: "utf8" });

  // Read the file back and verify it holds exactly the one letter and
  // nothing else: a stray newline or a partial write would fail the
  // gate, and a silent bad write is worse than a loud failure.
  const written = readFileSync(OUTPUT_PATH, { encoding: "utf8" });
  if (written !== LETTER) {
    throw new Error(
      `entry verification failed: expected exactly ${JSON.stringify(LETTER)}, ` +
        `found ${JSON.stringify(written)}`,
    );
  }
}

try {
  main();
} catch (error) {
  console.error(`one-letter-day: ${error instanceof Error ? error.message : error}`);
  process.exit(1);
}
