/** ISO dato YYYY-MM-DD til fødselsdato (UTC-dato, ingen klokkeslæt). */

export function parseIsoDateParts(
  iso: string
): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const m = Number(match[2]);
  const d = Number(match[3]);
  if (!Number.isInteger(y) || !Number.isInteger(m) || !Number.isInteger(d)) {
    return null;
  }
  return { y, m, d };
}

export function isCalendarDateValid(y: number, m: number, d: number): boolean {
  if (m < 1 || m > 12 || d < 1 || d > 31) return false;
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

export function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

/**
 * Gyldig fødselsdato: reel kalenderdag, ikke i fremtiden, alder i [minAge, maxAge].
 */
export function isValidBirthDate(
  iso: string,
  opts?: { minAge?: number; maxAge?: number }
): boolean {
  const minAge = opts?.minAge ?? 18;
  const maxAge = opts?.maxAge ?? 100;
  const parts = parseIsoDateParts(iso);
  if (!parts) return false;
  const { y, m, d } = parts;
  if (!isCalendarDateValid(y, m, d)) return false;

  const now = new Date();
  const todayUtc = Date.UTC(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );
  const birthUtc = Date.UTC(y, m - 1, d);
  if (birthUtc > todayUtc) return false;

  let age = now.getFullYear() - y;
  const hadBirthday =
    now.getMonth() > m - 1 ||
    (now.getMonth() === m - 1 && now.getDate() >= d);
  if (!hadBirthday) age -= 1;
  return age >= minAge && age <= maxAge;
}
