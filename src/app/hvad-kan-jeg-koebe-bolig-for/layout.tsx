import type { Metadata } from "next";
import { canonicalUrl, PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";
import { HVAD_KAN_JEG_KOEBE_FAQ } from "@/lib/artikel-faq/hvad-kan-jeg-koebe-bolig-for";
import {
  getBreadcrumbSchema,
  getCalculatorSchema,
  getFaqPageSchema,
} from "@/lib/structured-data";

const title = "Hvad kan jeg købe bolig for? Beregn det gratis";
const description =
  "Indtast din indtægt og gæld, og se med det samme hvad du kan købe bolig for. Gratis beregner uden login, med lånerum ved gearing 3,5-5.";
const ogDescription =
  "Se hvad du kan købe bolig for. Gratis beregner: indtast indtægt og gæld, og få lånerum og maksimal købspris med det samme.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl(PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR) },
  ...socialMetadata({
    path: PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
    title,
    description: ogDescription,
  }),
};

const faqSchema = getFaqPageSchema([...HVAD_KAN_JEG_KOEBE_FAQ]);
const calculatorSchema = getCalculatorSchema({
  name: "Hvad kan jeg købe bolig for?",
  description:
    "Beregn dit lånerum ud fra indtægt og gæld. Se maksimal købspris ved gearing 3,5-5.",
  path: PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR,
});
const breadcrumbSchema = getBreadcrumbSchema([
  { name: "Forside", path: "/" },
  { name: "Beregnere", path: "/beregnere" },
  { name: "Hvad kan jeg købe bolig for?", path: PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR },
]);

export default function HvadKanJegKoebeBoligForLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
