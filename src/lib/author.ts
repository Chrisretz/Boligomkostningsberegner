/**
 * Navngiven afsender bag Boligklarheds indhold (E-E-A-T).
 *
 * ─────────────────────────────────────────────────────────────────────
 * VIGTIGT, LÆS FØR PUBLICERING:
 * Google vægter forfatterens troværdighed højt på boligøkonomi (YMYL).
 * Teksten herunder er et udkast. RET den, så den er 100 % sand for dine
 * faktiske forhold, før du pusher. Skriv ALDRIG kvalifikationer, du ikke
 * reelt har (fx en titel eller et årstal, der ikke passer). En falsk
 * ekspertprofil skader mere, end den gavner, hvis den opdages.
 *
 * Udfyld gerne:
 * - `credentials`: dine reelle, korte kvalifikationer/erfaringer.
 * - `imageUrl`: sti til et rigtigt portrætfoto i /public (styrker E-E-A-T).
 * - `linkedinUrl`: din personlige LinkedIn, hvis du vil linke til den.
 * ─────────────────────────────────────────────────────────────────────
 */

export const AUTHOR = {
  slug: "christoffer-retz",
  name: "Christoffer Retz",
  /** Kort rolle vist i byline og på profilsiden. */
  role: "Grundlægger og redaktør, Boligklarhed",
  /** Sti til forfatterens profilside. */
  path: "/forfatter/christoffer-retz",
  /**
   * Bio i afsnit. Hold det ærligt og konkret. Ret til dine reelle forhold.
   */
  bio: [
    "Christoffer Retz er grundlægger og redaktør af Boligklarhed. Han står bag beregnerne, dataene og artiklerne på sitet.",
    "Han har baggrund i og arbejder til daglig med finans, investering og ejendomsøkonomi, og han byggede Boligklarhed for at gøre tallene bag et boligkøb gennemskuelige for almindelige købere.",
    "Alt indhold bygger på officielle satser og aktuelle markedsdata, og det opdateres løbende. Boligklarhed er uafhængigt og er hverken bank, mægler eller låneformidler.",
  ],
  /**
   * Korte kvalifikationer/erfaringer. RET til dine reelle. Slet linjer, du
   * ikke kan stå inde for. Tom liste er bedre end en usand.
   */
  credentials: [
    "Grundlægger af Boligklarhed",
    "Baggrund inden for finans, investering og ejendomsøkonomi",
  ] as readonly string[],
  /** Rigtigt portrætfoto i /public styrker E-E-A-T. Tom = intet billede vises. */
  imageUrl: "",
  /** Personlig LinkedIn (valgfri). Tom = vises ikke. */
  linkedinUrl: "",
} as const;
