import type { Metadata } from "next";
import { canonicalUrl, PATH_HVAD_KAN_JEG_KOEBE_BOLIG_FOR } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Hvad kan jeg købe bolig for? – Beregn dit lånerum";
const description =
  "Beregn lånerum ud fra indtægt og gearing. Følsomhedsanalyse (gearing 3,5–5). Supplér med boligomkostningsberegneren for ydelse.";
const ogDescription =
  "Beregn dit lånerum ud fra indtægt og gearing. Se maks. lån og estimeret købspris med følsomhedsanalyse.";

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
