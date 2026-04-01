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
    ];
  },
};

export default nextConfig;
