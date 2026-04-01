import type { ArticleDates } from "@/lib/article-dates";
import { formatIsoDateDa } from "@/lib/format-date";

/** Synlig publicer-/opdateringsdato (matcher JSON-LD Article i getArticleSchema). */
export function ArticleMeta({ datePublished, dateModified }: ArticleDates) {
  const pubDay = datePublished.slice(0, 10);
  const modDay = dateModified.slice(0, 10);
  const showBoth = modDay !== pubDay;

  return (
    <p className="text-small text-text-muted mb-6 not-prose">
      Publiceret{" "}
      <time dateTime={pubDay}>{formatIsoDateDa(datePublished)}</time>
      {showBoth && (
        <>
          {" · "}Opdateret{" "}
          <time dateTime={modDay}>{formatIsoDateDa(dateModified)}</time>
        </>
      )}
      {" · "}
      <span className="text-text-secondary">Boligklarhed</span>
    </p>
  );
}
