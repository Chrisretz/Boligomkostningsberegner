import type { Metadata } from "next";
import "./globals.css";
import { Topbar } from "@/components/Topbar";
import { Footer } from "@/components/Footer";
import { CookieBanner } from "@/components/CookieBanner";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site";
import {
  organizationSchema,
  websiteSchema,
} from "@/lib/structured-data";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Beregn boligomkostninger – Hvad koster det reelt at købe bolig?",
    template: "%s | Boligklarhed",
  },
  description:
    "Boligklarhed er en gratis boligomkostningsberegner til danske boligkøbere. Beregn omkostninger ved boligkøb – tinglysning, pant og månedlig ydelse.",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: SITE_URL,
    title: "Beregn boligomkostninger – Hvad koster det reelt at købe bolig?",
    description:
      "Få overblik over, hvad din bolig reelt koster. Boligklarhed samler engangsomkostninger, månedlige udgifter til lån, ejerudgifter, vedligehold og rentestest ét sted.",
    images: [
      {
        url: "/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "Boligklarhed – boligomkostningsberegner",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      <head>
        <link
          rel="sitemap"
          type="application/xml"
          title="Sitemap"
          href={`${SITE_URL}/sitemap.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
      </head>
      <body className="font-sans antialiased bg-brand-background text-text-primary flex flex-col min-h-screen">
        <GoogleAnalytics />
        <Topbar />
        <div className="flex-1">{children}</div>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
