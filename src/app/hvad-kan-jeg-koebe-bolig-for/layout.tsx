import type { Metadata } from "next";
import { canonicalUrl, PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

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

export default function HvadKanJegKoebeBoligForLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
