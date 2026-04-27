import fs from "node:fs";

function readTextSmart(filePath) {
  const b = fs.readFileSync(filePath);
  // UTF-16 LE BOM
  if (b.length >= 2 && b[0] === 0xff && b[1] === 0xfe) {
    return b.toString("utf16le", 2);
  }
  // UTF-8 BOM
  if (b.length >= 3 && b[0] === 0xef && b[1] === 0xbb && b[2] === 0xbf) {
    return b.toString("utf8", 3);
  }

  // Heuristic: many NUL bytes -> likely UTF-16LE without BOM
  const head = b.subarray(0, Math.min(4000, b.length));
  let nul = 0;
  for (const x of head) if (x === 0) nul++;
  return nul > 50 ? b.toString("utf16le") : b.toString("utf8");
}

const filePath = process.argv[2];
if (!filePath) {
  console.error("Usage: node scripts/ensure-utf8.mjs <filePath>");
  process.exit(1);
}

const text = readTextSmart(filePath);
fs.writeFileSync(filePath, text, { encoding: "utf8" });

