import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";
import { socialMetadata } from "@/lib/social-metadata";

const title = "Hvad kan jeg købe bolig for? – Beregn dit lånerum";
const description =
  "Beregn lånerum ud fra indtægt og gearing. Følsomhedsanalyse (gearing 3,5–5). Supplér med boligomkostningsberegneren for ydelse.";
const ogDescription =
  "Beregn dit lånerum ud fra indtægt og gearing. Se maks. lån og estimeret købspris med følsomhedsanalyse.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: canonicalUrl("/beregnere/hvad-kan-jeg-koebe-bolig-for") },
  ...socialMetadata({
    path: "/beregnere/hvad-kan-jeg-koebe-bolig-for",
    title,
    description: ogDescription,
  }),
};

export default function HvadKanJegKoebeBoligForLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
