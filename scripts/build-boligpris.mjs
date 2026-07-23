/**
 * Bygger boligpris-historikken (kr. pr. m², realiseret handelspris) fra
 * Finans Danmarks Boligmarkedsstatistik og skriver den til en statisk fil,
 * så /boligpriser-siden bare læser færdige tal.
 *
 * Kør lokalt: `npm run boligpris:history`
 * Kræver netværk.
 *
 * Kilde: Boligmarkedsstatistikken, Finans Danmark. Data må frit bruges med
 * tydelig kildeangivelse. API: api.statbank.dk/v1/s20 (samme software som
 * Danmarks Statistik, egen sti /s20 til Finans Danmarks statbank).
 *
 * Henter INKREMENTELT: læser den gemte fil og henter kun de kvartaler, der
 * mangler. Første kørsel henter alt tilbage til 1992; derefter kun det nye
 * kvartal.
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const API = "https://api.statbank.dk/v1/s20";
const TABLE = "BM010";
const CATEGORIES = { hus: "1", lejl: "2" }; // Parcel-/rækkehus, Ejerlejlighed
const PRICE = "REAL"; // Realiseret handelspris
const MIN_KR = 1000; // kr/m2 – lavere er suspekt
const MAX_KR = 300000;

// Skånsom hentning.
const DELAY_MS = 800;
const MAX_RETRIES = 6;
const QUARTERS_PER_CALL = 24; // små kald = korte URL'er, robust

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchText(url) {
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt += 1) {
    const res = await fetch(url, { headers: { Accept: "text/csv,application/json" } });
    if (res.status === 429 || res.status === 503) {
      const wait = Number(res.headers.get("retry-after")) || Math.min(60, 5 * (attempt + 1));
      console.log(`  ${res.status} – venter ${wait}s (forsøg ${attempt + 1}) ...`);
      await sleep(wait * 1000);
      continue;
    }
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
  }
  throw new Error("Gav op efter gentagne rate limits.");
}

/** Klassificér et område ud fra dets statbank-id. */
function areaType(id) {
  if (id === "00") return "land";
  if (/^08\d$/.test(id)) return "region";
  if (/^\d{2}$/.test(id)) return "landsdel";
  return "kommune";
}

async function getMeta() {
  const json = JSON.parse(
    await fetchText(`${API}/tableinfo/${TABLE}?format=JSON&lang=da`)
  );
  const areasVar = json.variables.find((v) => v.id === "OMR20");
  const timeVar = json.variables.find((v) => v.id === "Tid");
  const areas = areasVar.values.map((v) => ({
    id: v.id,
    name: v.text,
    type: areaType(v.id),
  }));
  // Normalisér navne (NFC), så CSV- og metadata-navne matcher uanset
  // hvordan æøå er kodet.
  const nameToId = new Map(areas.map((a) => [a.name.normalize("NFC"), a.id]));
  const quarters = timeVar.values.map((v) => v.id);
  return { areas, nameToId, quarters };
}

/** Del et array i bidder af højst n. */
function chunk(arr, n) {
  const out = [];
  for (let i = 0; i < arr.length; i += n) out.push(arr.slice(i, i + n));
  return out;
}

/**
 * Henter realiseret m2-pris for én kategori for de givne kvartaler.
 * Henter alle områder pr. kald og tager kvartalerne i små bidder.
 *
 * VIGTIGT: statbank-API'et kræver URL-kodede værdilister. Rå kommaer i
 * OMR20/Tid giver et tomt svar. Derfor encodeURIComponent på begge.
 *
 * Returnerer Map<"områdeId|kvartal", kr>.
 */
async function fetchCategory(catCode, areaIds, quarters, nameToId) {
  const result = new Map();
  const label = Object.keys(CATEGORIES).find((k) => CATEGORIES[k] === catCode);
  const omr = encodeURIComponent(areaIds.join(","));
  const chunks = chunk(quarters, QUARTERS_PER_CALL);
  for (let i = 0; i < chunks.length; i += 1) {
    const tid = encodeURIComponent(chunks[i].join(","));
    const url =
      `${API}/data/${TABLE}/CSV?OMR20=${omr}&EJKAT20=${catCode}` +
      `&PRIS20=${PRICE}&Tid=${tid}`;
    const csv = await fetchText(url);
    const lines = csv.split(/\r?\n/).slice(1); // drop header
    let matched = 0;
    for (const line of lines) {
      if (!line.trim()) continue;
      const cols = line.split(";");
      if (cols.length < 5) continue;
      const areaName = cols[1].normalize("NFC");
      const q = cols[3];
      const raw = Number((cols[4] || "").replace(/\s/g, "").replace(",", "."));
      const id = nameToId.get(areaName);
      if (!id) continue;
      if (!Number.isFinite(raw) || raw < MIN_KR || raw > MAX_KR) continue;
      result.set(`${id}|${q}`, Math.round(raw));
      matched += 1;
    }
    // Fejl højlydt hvis første kald ikke giver data – så vi ikke skriver
    // en tom fil i stilhed. Vis et udklip af svaret til fejlsøgning.
    if (i === 0 && matched === 0) {
      throw new Error(
        `Ingen tal i første svar for '${label}'. API-svar (start):\n` +
          csv.slice(0, 400)
      );
    }
    console.log(`  ${label}: kvartal-bidder ${i + 1}/${chunks.length} (${matched} tal)`);
    await sleep(DELAY_MS);
  }
  return result;
}

function outPath() {
  const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "data");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  return join(dir, "boligpriser.json");
}

function readExisting(path) {
  if (!existsSync(path)) return null;
  try {
    return JSON.parse(readFileSync(path, "utf8"));
  } catch {
    return null;
  }
}

async function main() {
  const path = outPath();
  console.log("Henter metadata fra Finans Danmark (BM010) ...");
  const { areas, nameToId, quarters } = await getMeta();

  const rawExisting = readExisting(path);
  // Kun brugbar som grundlag, hvis der faktisk er områdedata i filen.
  const existing =
    rawExisting && rawExisting.areas && rawExisting.areas.length > 0
      ? rawExisting
      : null;
  const haveQuarters = new Set(existing?.quarters ?? []);
  const missing = quarters.filter((q) => !haveQuarters.has(q));

  if (existing && missing.length === 0) {
    console.log("Alle kvartaler er allerede hentet. Ingen nye kald.");
    return;
  }
  console.log(
    existing
      ? `Har ${haveQuarters.size} kvartaler, mangler ${missing.length}. Henter kun de manglende ...`
      : `Første kørsel: henter alle ${quarters.length} kvartaler (kan tage et par minutter) ...`
  );

  const fetchQuarters = existing ? missing : quarters;
  const areaIds = areas.map((a) => a.id);
  const hus = await fetchCategory(CATEGORIES.hus, areaIds, fetchQuarters, nameToId);
  const lejl = await fetchCategory(CATEGORIES.lejl, areaIds, fetchQuarters, nameToId);

  // Byg område-serier, aligned til den fulde kvartals-akse.
  const prevByArea = new Map(
    (existing?.areas ?? []).map((a) => [a.id, a])
  );
  const outAreas = areas.map((a) => {
    const prev = prevByArea.get(a.id);
    const husSeries = quarters.map((q, i) => {
      const fresh = hus.get(`${a.id}|${q}`);
      if (fresh != null) return fresh;
      return prev?.hus?.[i] ?? null;
    });
    const lejlSeries = quarters.map((q, i) => {
      const fresh = lejl.get(`${a.id}|${q}`);
      if (fresh != null) return fresh;
      return prev?.lejl?.[i] ?? null;
    });
    return { id: a.id, name: a.name, type: a.type, hus: husSeries, lejl: lejlSeries };
  });

  // Behold kun områder med mindst ét datapunkt.
  const filtered = outAreas.filter(
    (a) => a.hus.some((v) => v != null) || a.lejl.some((v) => v != null)
  );

  const now = new Date();
  const payload = {
    generated: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`,
    source: "Boligmarkedsstatistikken, Finans Danmark",
    unit: "kr/m2",
    price: "Realiseret handelspris",
    quarters,
    areas: filtered,
  };

  writeFileSync(path, JSON.stringify(payload), "utf8");
  console.log(
    `Skrev ${filtered.length} områder × ${quarters.length} kvartaler til public/data/boligpriser.json`
  );
}

main().catch((err) => {
  console.error("Fejl:", err.message);
  process.exit(1);
});
