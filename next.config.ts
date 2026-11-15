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
  // Product imported with a wrong brand prefix in its address.
  ["/products/audemars-piguet-kelly-pochette-swift-rose-sakura-phw", "/products/hermes-kelly-pochette-swift-rose-sakura-phw"],
  // Early placeholder journal posts, replaced by the buying guides.
  ["/journal/how-to-authenticate-a-luxury-handbag", "/journal/how-to-authenticate-hermes"],
  ["/journal/inside-the-atelier", "/journal/hermes-birkin-buying-guide"],
  ["/journal/brief-history-of-the-quilt", "/journal"],
  ["/journal/spring-editorial-pastels-and-patent", "/journal"],
  ["/journal/the-rise-of-the-micro-bag", "/journal"],
  ["/journal/caring-for-your-investment-piece", "/journal"],
  ...["louis-vuitton", "loewe", "gucci", "prada", "saint-laurent", "dior", "celine", "burberry", "givenchy", "chloe", "goyard"].map(
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
    return [
      // montevane.com is the main domain; the old one forwards page for page,
      // except search-engine verification files, which must load on the domain itself.
      {
        source: "/:path((?!yandex_[0-9a-f]+\\.html$|BingSiteAuth\\.xml$|google[0-9a-f]+\\.html$).*)",
        has: [{ type: "host" as const, value: "(?:www\\.)?luxurybagsandwatches\\.com" }],
        destination: "https://www.montevane.com/:path",
        permanent: true,
      },
      ...MOVED.flatMap(([from, to]) => [
        { source: from, destination: to, permanent: true },
        { source: `/:locale(de|uz)${from}`, destination: `/:locale${to}`, permanent: true },
      ]),
    ];
  },
};

export default nextConfig;
