import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const wifiDescriptionWord = "Ghosting";
const MIN_WORD_CHARS = 1;
const MAX_WORD_CHARS = 20;

const entryPath = join(dirname(fileURLToPath(import.meta.url)), "entry.txt");
// Resolve entry.txt relative to this script file, never process.cwd(): the
// grader runs main.ts from an arbitrary working directory.
const storedWord = readFileSync(entryPath, "utf8");
// Gate: exactly one word, 1–20 characters, matching the competition rules.
if (storedWord.length < MIN_WORD_CHARS || storedWord.length > MAX_WORD_CHARS) {
  throw new Error(`entry must be ${MIN_WORD_CHARS}–${MAX_WORD_CHARS} characters`);
}
if (/\s/.test(storedWord)) {
  throw new Error("entry must be exactly one word");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), wifiDescriptionWord);
