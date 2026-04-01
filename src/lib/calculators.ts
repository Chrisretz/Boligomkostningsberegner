import {
  PATH_BOLIGOMKOSTNINGER_BEREGNER,
  PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
} from "@/lib/site";

/**
 * Fælles data for beregnere – bruges af /beregnere-siden og Topbar-dropdown.
 */

export const calculators = [
  {
    id: "boligomkostninger",
    slug: "boligomkostninger",
    href: PATH_BOLIGOMKOSTNINGER_BEREGNER,
    title: "Boligomkostningsberegner",
    description:
      "Beregn engangsomkostninger, månedlig ydelse og rentestest. Indtast købspris, udbetaling, lån og ejerudgifter.",
  },
  {
    id: "hvad-kan-jeg-koebe-bolig-for",
    slug: "hvad-kan-jeg-koebe-bolig-for",
    href: PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
    title: "Hvad kan jeg købe bolig for?",
    description:
      "Beregn dit lånerum ud fra indtægt og gearing. Se hvor meget du kan låne og hvilken købspris du typisk har råd til.",
  },
] as const;

export type CalculatorId = (typeof calculators)[number]["id"];
