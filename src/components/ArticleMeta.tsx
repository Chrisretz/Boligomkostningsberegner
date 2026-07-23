import Link from "next/link";
import type { ArticleDates } from "@/lib/article-dates";
import { formatIsoDateDa } from "@/lib/format-date";
import { getReadingTime } from "@/lib/article-reading-time";
import { AUTHOR } from "@/lib/author";

/** Synlig byline + publicer-/opdateringsdato (matcher JSON-LD Article). */
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
      Skrevet af{" "}
      <Link
        href={AUTHOR.path}
        className="text-text-secondary font-medium hover:text-brand-primary hover:underline"
        rel="author"
      >
        {AUTHOR.name}
      </Link>
      {" · "}
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
    </p>
  );
}
