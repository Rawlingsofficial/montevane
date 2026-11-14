import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/i18n/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api/", "/search", "/de/search", "/uz/search", "/wishlist", "/de/wishlist", "/uz/wishlist", "/browse", "/de/browse", "/uz/browse"] }],
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
