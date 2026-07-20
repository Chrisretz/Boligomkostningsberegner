import type { ArticleDates } from "@/lib/article-dates";
import { formatIsoDateDa } from "@/lib/format-date";
import { getReadingTime } from "@/lib/article-reading-time";

/** Synlig publicer-/opdateringsdato (matcher JSON-LD Article i getArticleSchema). */
export function ArticleMeta({
  datePublished,
  dateModified,
  path,
}: ArticleDates & { path?: string }) {
  const pubDay = datePublished.slice(0, 10);
  const modDay = dateModified.slice(0, 10);
  const showBoth = modDay !== pubDay;
  const minutes = path ? getReadingTime(path) : null;

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
      {minutes != null && (
        <>
          {" · "}
          {minutes} min. læsning
        </>
      )}
      {" · "}
      <span className="text-text-secondary">Boligklarhed</span>
    </p>
  );
}
