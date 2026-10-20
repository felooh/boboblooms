import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep links to the old Google Sites pages working.
  async redirects() {
    return [
      { source: "/home", destination: "/", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/valentine", destination: "/gallery/valentines", permanent: true },
      { source: "/flowers/:slug", destination: "/gallery/:slug", permanent: true },
      { source: "/wedding-decor/:slug", destination: "/gallery/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
