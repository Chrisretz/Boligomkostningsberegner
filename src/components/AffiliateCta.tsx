"use client";

import Link from "next/link";
import { trackCtaClick } from "@/lib/track";
import { DEFAULTS } from "@/lib/constants";

interface AffiliateCtaProps {
  placement?: "result_top" | "result_bottom";
}

export function AffiliateCta({ placement = "result_top" }: AffiliateCtaProps) {
  const href = `${DEFAULTS.REDIRECT_ROUTE}?src=beregn&variant=v1&placement=${placement}`;

  const handleClick = () => {
    trackCtaClick({
      ctaId: DEFAULTS.CTA_ID,
      placement,
    });
  };

  return (
    <div className="space-y-2">
      <Link
        href={href}
        rel="nofollow sponsored"
        onClick={handleClick}
        className="block w-full text-center px-8 py-4 text-body font-semibold text-white bg-brand-primary rounded-md shadow-soft hover:bg-brand-primaryHover focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 transition-colors"
      >
        Få 3 uforpligtende lånetilbud
      </Link>
      <p className="text-small text-text-muted text-center">
        Vi kan modtage kommission, hvis du klikker videre og gennemfører en
        henvendelse hos vores partner. Det koster ikke ekstra for dig.
      </p>
    </div>
  );
}
