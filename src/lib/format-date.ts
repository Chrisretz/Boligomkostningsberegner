/** Dansk lang dato fra ISO-streng (fx "2026-03-08" eller fuld ISO). */
export function formatIsoDateDa(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return new Intl.DateTimeFormat("da-DK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
