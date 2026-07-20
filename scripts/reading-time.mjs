/**
 * Genererer src/lib/article-reading-time.ts ud fra artiklernes tekstindhold.
 * Kør: node scripts/reading-time.mjs
 *
 * Optællingen er approksimativ: JSX-tags, imports, className-strenge og
 * kodeblokke fjernes, og resten tælles som ord ved 200 ord/minut.
 */
import fs from "node:fs";
import path from "node:path";

const ARTICLES_DIR = path.join(process.cwd(), "src/app/artikler");
const OUT = path.join(process.cwd(), "src/lib/article-reading-time.ts");
const WORDS_PER_MINUTE = 200;

function extractText(src) {
  return (
    src
      // fjern imports, metadata-blokke og JSON-LD
      .replace(/^import[\s\S]*?;$/gm, "")
      .replace(/className="[^"]*"/g, "")
      .replace(/href="[^"]*"/g, "")
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
      .replace(/\/\*[\s\S]*?\*\//g, "")
      .replace(/<[^>]+>/g, " ")
      // JSX-udtryk som {" "} og {variabel}
      .replace(/\{[^{}]*\}/g, " ")
      .replace(/&nbsp;|&quot;|&amp;/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  );
}

const entries = [];
for (const slug of fs.readdirSync(ARTICLES_DIR)) {
  const file = path.join(ARTICLES_DIR, slug, "page.tsx");
  if (!fs.existsSync(file)) continue;
  const text = extractText(fs.readFileSync(file, "utf8"));
  const words = text.split(" ").filter((w) => /[a-zA-ZæøåÆØÅ]/.test(w)).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  entries.push({ path: `/artikler/${slug}`, minutes, words });
}
entries.sort((a, b) => a.path.localeCompare(b.path));

const body = entries
  .map((e) => `  "${e.path}": ${e.minutes}, // ca. ${e.words} ord`)
  .join("\n");

fs.writeFileSync(
  OUT,
  `/**
 * Estimeret læsetid i minutter pr. artikel (${WORDS_PER_MINUTE} ord/min).
 * GENERERET FIL – kør \`npm run reading-time\` efter ændringer i artikler.
 */
export const readingTimeByPath: Record<string, number> = {
${body}
};

export function getReadingTime(path: string): number | null {
  return readingTimeByPath[path] ?? null;
}
`
);

console.log(`OK – ${entries.length} artikler skrevet til article-reading-time.ts`);
