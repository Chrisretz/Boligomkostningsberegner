import { ArtiklerArticleFeedbackGate } from "@/components/ArtiklerArticleFeedbackGate";

export default function ArtiklerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ArtiklerArticleFeedbackGate />
    </>
  );
}
