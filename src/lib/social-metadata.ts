import type { Metadata } from "next";
import { canonicalUrl } from "@/lib/site";

const DEFAULT_OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Boligklarhed – klarhed over din boligøkonomi",
} as const;

/**
 * Unikke Open Graph- og Twitter Card-felter pr. side, så deling ikke viser forsidenavn/-tekst.
 */
export function socialMetadata(options: {
  path: string;
  title: string;
  description: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = canonicalUrl(options.path);
  return {
    openGraph: {
      title: options.title,
      description: options.description,
      url,
      type: "website",
      locale: "da_DK",
      siteName: "Boligklarhed",
      images: [DEFAULT_OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: options.title,
      description: options.description,
      images: [DEFAULT_OG_IMAGE.url],
    },
  };
}
