import type { NextConfig } from "next";

// URLs from before the Hermès & rare-watches repositioning. Permanent, so
// search engines carry the old pages' ranking over to the new ones.
const MOVED: [string, string][] = [
  ["/shop/bags", "/shop/birkin-bags"],
  ["/models/hermes-birkin", "/shop/birkin-bags"],
  ["/models/hermes-kelly", "/shop/kelly-bags"],
  ["/models/chanel-classic-flap", "/brands/hermes"],
  ["/models/lady-dior", "/brands/hermes"],
  ["/models/louis-vuitton-neverfull", "/brands/hermes"],
  ["/models/louis-vuitton-speedy", "/brands/hermes"],
  ["/models/goyard-tote", "/brands/hermes"],
  ...["chanel", "louis-vuitton", "loewe", "gucci", "prada", "saint-laurent", "dior", "celine", "burberry", "givenchy", "chloe", "goyard"].map(
    (b): [string, string] => [`/brands/${b}`, "/brands/hermes"]
  ),
];

const nextConfig: NextConfig = {
  experimental: {
    // Every storefront page queries Postgres; fewer pages at once per build
    // worker keeps the connection pool from timing out.
    staticGenerationMaxConcurrency: 4,
  },
  images: {
    // Uploaded product photos are served by the app itself from /media/*.
    localPatterns: [{ pathname: "/media/**" }, { pathname: "/images/**" }],
  },
  async redirects() {
    return MOVED.flatMap(([from, to]) => [
      { source: from, destination: to, permanent: true },
      { source: `/:locale(de|uz)${from}`, destination: `/:locale${to}`, permanent: true },
    ]);
  },
};

export default nextConfig;
