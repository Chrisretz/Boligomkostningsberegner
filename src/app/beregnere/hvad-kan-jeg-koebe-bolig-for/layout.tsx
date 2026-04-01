import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hvad kan jeg købe bolig for? – Beregn dit lånerum",
  description:
    "Beregn lånerum ud fra indtægt og gearing. Følsomhedsanalyse (gearing 3,5–5). Supplér med boligomkostningsberegneren for ydelse.",
  alternates: { canonical: canonicalUrl("/beregnere/hvad-kan-jeg-koebe-bolig-for") },
  openGraph: {
    title: "Hvad kan jeg købe bolig for? – Beregn dit lånerum",
    description:
      "Beregn dit lånerum ud fra indtægt og gearing. Se maks. lån og estimeret købspris med følsomhedsanalyse.",
    url: canonicalUrl("/beregnere/hvad-kan-jeg-koebe-bolig-for"),
  },
};

export default function HvadKanJegKoebeBoligForLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
