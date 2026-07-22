import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/beregn",
        destination: "/beregn-dine-boligomkostninger",
        permanent: true,
      },
      {
        source: "/beregnere/hvad-kan-jeg-koebe-bolig-for",
        destination: "/hvad-kan-jeg-koebe-bolig-for",
        permanent: true,
      },
      // Kannibaliserings-oprydning juli 2026: artiklen konkurrerede med
      // beregnersiden om samme søgeord (begge lå på placering 50+ i GSC).
      // Indholdet er flettet ind på beregneren og i «sådan vurderer banken».
      {
        source: "/artikler/hvad-kan-jeg-koebe-bolig-for",
        destination: "/hvad-kan-jeg-koebe-bolig-for",
        permanent: true,
      },
      // Samme årsag: «realkreditlan-beregner» konkurrerede med den rigtige
      // realkreditberegner på /boliglaan-beregner.
      {
        source: "/artikler/realkreditlan-beregner",
        destination: "/boliglaan-beregner",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
