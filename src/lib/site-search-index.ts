import { articles } from "@/lib/articles";
import { BEGREBER } from "@/lib/begreber";
import { calculators } from "@/lib/calculators";

export type SiteSearchKind = "side" | "beregner" | "artikel" | "begreb";

export type SiteSearchItem = {
  id: string;
  href: string;
  title: string;
  description: string;
  kind: SiteSearchKind;
};

const STATIC_PAGES: readonly SiteSearchItem[] = [
  {
    id: "forside",
    href: "/",
    title: "Forside",
    description: "Boligklarhed – beregn boligomkostninger, lån og få overblik.",
    kind: "side",
  },
  {
    id: "beregnere",
    href: "/beregnere",
    title: "Beregnere",
    description: "Oversigt over boligomkostningsberegner, lånerum og boliglånsguide.",
    kind: "side",
  },
  {
    id: "boligbegreber",
    href: "/boligbegreber",
    title: "Boligbegreber",
    description: "Opslagsværk med forklaringer af begreber ved boligkøb og finansiering.",
    kind: "side",
  },
  {
    id: "artikler",
    href: "/artikler",
    title: "Artikler",
    description: "Artikler om tinglysning, lån, skat, forsikring og boligkøb.",
    kind: "side",
  },
  {
    id: "om-os",
    href: "/om-os",
    title: "Om os",
    description: "Hvem står bag Boligklarhed og hvad kan du bruge sitet til.",
    kind: "side",
  },
  {
    id: "cookies",
    href: "/cookies",
    title: "Cookies",
    description: "Information om cookies og hvordan du styrer samtykke.",
    kind: "side",
  },
  {
    id: "privacy",
    href: "/privacy",
    title: "Privatlivspolitik",
    description: "Hvilke data der behandles og dine rettigheder.",
    kind: "side",
  },
  {
    id: "disclaimer",
    href: "/disclaimer",
    title: "Ansvarsfraskrivelse",
    description: "Vejledende beregninger og begrænset ansvar.",
    kind: "side",
  },
] as const;

function buildIndex(): SiteSearchItem[] {
  const list: SiteSearchItem[] = [...STATIC_PAGES];

  for (const c of calculators) {
    list.push({
      id: `calc-${c.id}`,
      href: c.href,
      title: c.title,
      description: c.description,
      kind: "beregner",
    });
  }

  for (const a of articles) {
    list.push({
      id: `artikel-${a.slug}`,
      href: `/artikler/${a.slug}`,
      title: a.title,
      description: a.description,
      kind: "artikel",
    });
  }

  for (const b of BEGREBER) {
    list.push({
      id: `begreb-${b.id}`,
      href: `/boligbegreber#${b.id}`,
      title: b.term,
      description: b.kortForklaring,
      kind: "begreb",
    });
  }

  return list;
}

/** Alle søgbare destinationer (sider, beregnere, artikler, begreber). */
export const SITE_SEARCH_INDEX: readonly SiteSearchItem[] = buildIndex();
