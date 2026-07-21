/**
 * Estimeret læsetid i minutter pr. artikel (200 ord/min).
 * GENERERET FIL – kør `npm run reading-time` efter ændringer i artikler.
 */
export const readingTimeByPath: Record<string, number> = {
  "/artikler/boligkoeb-foerste-gang": 3, // ca. 601 ord
  "/artikler/ejerlejlighed": 3, // ca. 512 ord
  "/artikler/ejerskifteforsikring": 4, // ca. 788 ord
  "/artikler/ejerudgifter": 8, // ca. 1691 ord
  "/artikler/eksisterende-pantebrev": 4, // ca. 815 ord
  "/artikler/elforbrug-husstand": 4, // ca. 795 ord
  "/artikler/energimaerker-og-boligokonomi": 2, // ca. 479 ord
  "/artikler/grundskyld-og-ejendomsskat": 4, // ca. 731 ord
  "/artikler/hvad-kan-jeg-koebe-bolig-for": 7, // ca. 1427 ord
  "/artikler/indboforsikring": 3, // ca. 594 ord
  "/artikler/koeb-bolig-sammen-ugift": 4, // ca. 875 ord
  "/artikler/realkreditlan": 3, // ca. 678 ord
  "/artikler/realkreditlan-beregner": 4, // ca. 867 ord
  "/artikler/saadan-vurderer-banken-dit-boliglan": 3, // ca. 690 ord
  "/artikler/sammenligning-af-laanetyper": 3, // ca. 584 ord
  "/artikler/tinglysning": 3, // ca. 505 ord
  "/artikler/tvangsauktioner": 5, // ca. 1098 ord
  "/artikler/vaelg-ejendomsmaegler": 7, // ca. 1402 ord
  "/artikler/vedligehold": 3, // ca. 636 ord
};

export function getReadingTime(path: string): number | null {
  return readingTimeByPath[path] ?? null;
}
