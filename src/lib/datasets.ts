/**
 * Fælles data for /data-sektionen. Hver post er en selvopdaterende
 * datakilde. Bruges af hub-siden og Data-dropdownen i Topbar.
 */

export const datasets = [
  {
    id: "realkreditrenter",
    href: "/realkreditrenter",
    title: "Realkreditrenter",
    tagline: "Aktuelle renter pr. lånetype",
    description:
      "Fast rente, F3, F5 og F-kort med kurs, og hvad renten betyder for ydelsen. Hentet fra obligationskurserne bag lånene.",
    cadence: "Opdateres dagligt",
    source: "Totalkredit",
  },
  {
    id: "elpriser",
    href: "/elpriser",
    title: "Elpriser",
    tagline: "Spotpris pr. kWh, DK1 og DK2",
    description:
      "Aktuel elspotpris time for time for Vest- og Østdanmark, plus et vejledende skøn over den samlede pris inkl. transport, afgift og moms.",
    cadence: "Opdateres dagligt",
    source: "Energi Data Service",
  },
  {
    id: "boligpriser",
    href: "/boligpriser",
    title: "Boligpriser",
    tagline: "Kr. pr. m² pr. kommune",
    description:
      "Realiseret handelspris pr. m² for huse og ejerlejligheder i din kommune, med udvikling kvartal for kvartal tilbage til 1992.",
    cadence: "Opdateres kvartalsvis",
    source: "Finans Danmark",
  },
] as const;

export type DatasetId = (typeof datasets)[number]["id"];
