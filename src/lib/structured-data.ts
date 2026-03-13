import { SITE_URL } from "./site";
import { FAQ_ITEMS } from "./faq";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Boligklarhed",
  url: SITE_URL,
  description:
    "Klarhed over din boligøkonomi. Beregn engangsomkostninger, månedlige udgifter og stress test ved boligkøb.",
  logo: `${SITE_URL}/boligklarhed-logo.svg`,
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Boligklarhed",
  url: SITE_URL,
  description:
    "Beregn hvad det reelt koster at købe og eje din bolig. Engangsomkostninger, månedlig total og stress test.",
  publisher: {
    "@type": "Organization",
    name: "Boligklarhed",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/boligklarhed-logo.svg`,
    },
  },
  inLanguage: "da-DK",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/beregn` },
    "query-input": "required name=search_term_string",
  },
} as const;

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Boligomkostningsberegner",
  url: `${SITE_URL}/beregn`,
  description:
    "Beregn engangsomkostninger, månedlige udgifter og rentestest ved boligkøb. Inkluderer tinglysning, vedligehold og ejerudgifter.",
  applicationCategory: "FinanceApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "DKK",
  },
} as const;

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/** Article JSON-LD for artikelsider. Bruges til SEO og mulige rich results. */
export function getArticleSchema({
  title,
  description,
  path,
  datePublished = "2024-06-01",
  dateModified,
}: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
}) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      "@type": "Organization",
      name: "Boligklarhed",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Boligklarhed",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/boligklarhed-logo.svg`,
      },
    },
    inLanguage: "da-DK",
  } as const;
}
