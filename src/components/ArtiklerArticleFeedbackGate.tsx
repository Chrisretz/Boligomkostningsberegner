"use client";

import { usePathname } from "next/navigation";
import { ArticleFeedbackForm } from "@/components/ArticleFeedbackForm";

export function ArtiklerArticleFeedbackGate() {
  const pathname = usePathname();
  if (!pathname?.startsWith("/artikler/")) {
    return null;
  }

  return (
    <aside
      className="border-t border-border bg-brand-background"
      aria-label="Feedback om artiklen"
    >
      <div className="container mx-auto max-w-2xl px-4 py-10 md:py-12">
        <ArticleFeedbackForm articlePath={pathname} />
      </div>
    </aside>
  );
}
