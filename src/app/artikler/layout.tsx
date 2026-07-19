import { ArtiklerArticleFeedbackGate } from "@/components/ArtiklerArticleFeedbackGate";
import { ArticleExtras } from "@/components/ArticleExtras";

export default function ArtiklerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ArticleExtras />
      <ArtiklerArticleFeedbackGate />
    </>
  );
}
