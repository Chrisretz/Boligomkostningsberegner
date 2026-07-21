import { ArtiklerArticleFeedbackGate } from "@/components/ArtiklerArticleFeedbackGate";
import { ArticleExtras } from "@/components/ArticleExtras";
import { ArticleToc } from "@/components/ArticleToc";

export default function ArtiklerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ArticleToc />
      {children}
      <ArticleExtras />
      <ArtiklerArticleFeedbackGate />
    </>
  );
}
