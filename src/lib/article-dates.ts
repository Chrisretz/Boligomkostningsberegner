/**
 * Publicerings- og seneste opdateringsdato pr. side (ISO 8601).
 * Vises i ArticleMeta og i JSON-LD (Article).
 *
 * Når du opretter en ny artikel-side: kør `npm run article:new -- /artikler/din-slug`
 * (sætter datePublished og dateModified til i dag kl. 12:00 Europe/Copenhagen).
 *
 * Når du opdaterer indhold på en eksisterende artikel: kør
 * `npm run article:touch -- /artikler/din-slug` (opdaterer kun dateModified).
 *
 * Alternativt kan du redigere tidsstemplerne manuelt her — brug altid den faktiske
 * publicerings-/redigeringsdato, ikke en tilfældig dato fra en tidligere session.
 */
export type ArticleDates = {
  datePublished: string;
  dateModified: string;
};

export const articleDatesByPath: Record<string, ArticleDates> = {
  "/artikler/boligkoeb-foerste-gang": {
    datePublished: "2026-03-05T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/ejerlejlighed": {
    datePublished: "2026-03-06T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/ejerskifteforsikring": {
    datePublished: "2026-03-07T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/ejerudgifter": {
    datePublished: "2026-03-08T10:00:00+01:00",
    dateModified: "2026-04-10T12:00:00+02:00",
  },
  "/artikler/elforbrug-husstand": {
    datePublished: "2026-03-09T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/eksisterende-pantebrev": {
    datePublished: "2026-03-10T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/grundskyld-og-ejendomsskat": {
    datePublished: "2026-03-11T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/hvad-kan-jeg-koebe-bolig-for": {
    datePublished: "2026-03-12T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/indboforsikring": {
    datePublished: "2026-03-13T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/realkreditlan": {
    datePublished: "2026-03-14T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/realkreditlan-beregner": {
    datePublished: "2026-04-30T10:00:00+02:00",
    dateModified: "2026-04-30T10:00:00+02:00",
  },
  "/artikler/sammenligning-af-laanetyper": {
    datePublished: "2026-04-01T14:00:00+02:00",
    dateModified: "2026-04-01T14:00:00+02:00",
  },
  "/artikler/energimaerker-og-boligokonomi": {
    datePublished: "2026-04-01T14:00:00+02:00",
    dateModified: "2026-04-01T14:00:00+02:00",
  },
  "/artikler/saadan-vurderer-banken-dit-boliglan": {
    datePublished: "2026-03-15T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/tinglysning": {
    datePublished: "2026-03-16T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/vedligehold": {
    datePublished: "2026-03-18T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
  "/artikler/tvangsauktioner": {
    datePublished: "2026-04-07T10:00:00+02:00",
    dateModified: "2026-04-07T10:00:00+02:00",
  },
  "/boligbegreber": {
    datePublished: "2026-03-20T10:00:00+01:00",
    dateModified: "2026-04-01T12:00:00+02:00",
  },
};

export function getArticleDates(path: string): ArticleDates {
  const dates = articleDatesByPath[path];
  if (!dates) {
    throw new Error(`Manglende datoer for path: ${path}`);
  }
  return dates;
}
