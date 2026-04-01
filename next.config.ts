import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/beregn",
        destination: "/beregn-dine-boligomkostninger",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
