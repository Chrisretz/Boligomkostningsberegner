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
    default: "Boligklarhed – Beregn boligomkostninger",
    template: "%s | Boligklarhed",
  },
  description:
    "Beregn hvad det reelt koster at købe og eje din bolig. Engangsomkostninger, månedlig total og stress test.",
  openGraph: {
    type: "website",
    locale: "da_DK",
    url: SITE_URL,
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
