#!/usr/bin/env node
/**
 * Opdaterer publicerings-/aendringsdatoer i src/lib/article-dates.ts
 * med "i dag" kl. 12:00 i Europe/Copenhagen (matcher typisk CMS-redaktion).
 *
 * Brug:
 *   npm run article:touch -- /artikler/ejerudgifter
 *   npm run article:new -- /artikler/ny-artikel-slug
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";

const TZ = "Europe/Copenhagen";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const DATES_FILE = join(ROOT, "src/lib/article-dates.ts");

function normalizePath(p) {
  const s = String(p).trim();
  if (!s.startsWith("/")) return `/${s.replace(/^\/+/, "")}`;
  return s;
}

function copenhagenNoonIso() {
  const dayStr = formatInTimeZone(new Date(), TZ, "yyyy-MM-dd");
  const instant = fromZonedTime(`${dayStr}T12:00:00`, TZ);
  return formatInTimeZone(instant, TZ, "yyyy-MM-dd'T'HH:mm:ssXXX");
}

function touchDateModified(content, articlePath, iso) {
  const key = `"${articlePath}"`;
  const i = content.indexOf(`${key}:`);
  if (i === -1) {
    throw new Error(
      `Kunne ikke finde ${key} i article-dates.ts. Tilfoej foerst posten med npm run article:new.`,
    );
  }
  const slice = content.slice(i);
  const modRe = /dateModified:\s*"[^"]*"/;
  if (!modRe.test(slice)) {
    throw new Error(`dateModified ikke fundet for ${articlePath}`);
  }
  const replaced = slice.replace(modRe, `dateModified: "${iso}"`);
  return content.slice(0, i) + replaced;
}

function addNewEntry(content, articlePath, iso) {
  const key = `"${articlePath}"`;
  if (content.includes(`${key}:`)) {
    throw new Error(
      `${articlePath} findes allerede. Brug article:touch til kun at opdatere aendringsdato.`,
    );
  }
  const marker = "\nexport function getArticleDates";
  const mi = content.indexOf(marker);
  if (mi === -1) {
    throw new Error(
      "Kunne ikke finde export function getArticleDates - filen har uventet format.",
    );
  }
  const head = content.slice(0, mi);
  const tail = content.slice(mi);
  const close = head.lastIndexOf("\n};");
  if (close === -1) {
    throw new Error("Kunne ikke finde afslutning af articleDatesByPath.");
  }
  const block = `\n  ${key}: {\n    datePublished: "${iso}",\n    dateModified: "${iso}",\n  },`;
  return head.slice(0, close) + block + head.slice(close) + tail;
}

function main() {
  const [, , cmd, rawPath] = process.argv;
  if (!cmd || !rawPath || !["touch", "new"].includes(cmd)) {
    console.error(
      "Brug:\n  npm run article:touch -- /artikler/slug\n  npm run article:new -- /artikler/slug",
    );
    process.exit(1);
  }
  const articlePath = normalizePath(rawPath);
  const iso = copenhagenNoonIso();
  let content = readFileSync(DATES_FILE, "utf8");

  if (cmd === "touch") {
    content = touchDateModified(content, articlePath, iso);
  } else {
    content = addNewEntry(content, articlePath, iso);
  }

  writeFileSync(DATES_FILE, content, "utf8");
  console.log(
    cmd === "touch"
      ? `Opdateret dateModified for ${articlePath} -> ${iso}`
      : `Tilfojet ${articlePath} med datePublished og dateModified -> ${iso}`,
  );
}

main();
