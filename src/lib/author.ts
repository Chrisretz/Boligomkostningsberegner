/**
 * Navngiven afsender bag Boligklarheds indhold (E-E-A-T).
 *
 * Bygget ud fra Christoffers eget CV. Alt herunder er sandt, men tjek det
 * gerne én gang mere, og overvej hvor meget professionel detalje du vil
 * have offentligt på et personligt projekt (fx nuværende arbejdsgiver og
 * transaktionsvolumen er bevidst holdt ude/generelt formuleret).
 *
 * Tilføj gerne senere:
 * - `imageUrl`: rigtigt portrætfoto i /public (styrker E-E-A-T mærkbart).
 * - `linkedinUrl`: din personlige LinkedIn.
 */

export const AUTHOR = {
  slug: "christoffer-retz",
  name: "Christoffer Retz",
  /** Kort rolle vist på profilsiden og som jobTitle i Person-schema. */
  role: "Grundlægger og redaktør · cand.merc. i finansiering",
  path: "/forfatter/christoffer-retz",
  bio: [
    "Christoffer Retz er grundlægger og redaktør af Boligklarhed og står bag beregnerne, dataene og artiklerne på sitet.",
    "Til daglig arbejder han som Investment Manager i ejendomsbranchen, hvor han vurderer ejendomsinvesteringer for institutionelle investorer og family offices. Arbejdet handler om værdiansættelse, DCF- og IRR-modellering, finansiering og risiko, og han har medvirket i ejendomstransaktioner for over 500 mio. euro. Tidligere har han været finansanalytiker hos CBRE.",
    "Han er uddannet cand.merc. i finansiering og regnskab fra Copenhagen Business School og har en efteruddannelse i Real Estate Economics & Finance fra London School of Economics. Boligklarhed byggede han for at gøre de samme metoder, realistiske tal på omkostninger, ydelse og finansiering, tilgængelige for almindelige boligkøbere.",
    "Alt indhold bygger på officielle satser og aktuelle markedsdata og opdateres løbende. Boligklarhed er uafhængigt og er hverken bank, mægler eller låneformidler, og sitet giver ikke personlig finansiel rådgivning.",
  ],
  /** Korte, sande kvalifikationer. Vises på profilsiden. */
  credentials: [
    "Investment Manager i ejendomsbranchen med 6 års erfaring (buy-side)",
    "cand.merc. i finansiering og regnskab, Copenhagen Business School",
    "Real Estate Economics & Finance, London School of Economics",
    "Erfaring med DCF-/IRR-værdiansættelse og ejendomstransaktioner for 500+ mio. euro",
    "Tidligere finansanalytiker hos CBRE",
  ] as readonly string[],
  /** Uddannelsessteder til alumniOf i Person-schema. */
  education: [
    "Copenhagen Business School",
    "London School of Economics",
  ] as readonly string[],
  /** Emner forfatteren har indsigt i (knowsAbout i schema). */
  knowsAbout: [
    "Boligøkonomi",
    "Realkreditlån",
    "Ejendomsinvestering",
    "Værdiansættelse",
    "Finansiering",
  ] as readonly string[],
  /** Rigtigt portrætfoto i /public styrker E-E-A-T. Tom = intet billede. */
  imageUrl: "",
  /** Personlig LinkedIn (valgfri). Tom = vises ikke. */
  linkedinUrl: "",
} as const;
