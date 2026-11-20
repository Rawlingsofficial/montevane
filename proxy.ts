import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { isFilteredRequest } from "@/lib/catalog/filters";
import { DEFAULT_LOCALE, isLocale, type Locale } from "@/lib/i18n/config";

// /shop/<category>[/<sub>[/<condition>]][/page/<n>] — the listings that take filters.
const SHOP_LISTING = /^(\/shop\/[a-z0-9-]+(?:\/(?!page\/)[a-z0-9-]+){0,2})(?:\/page\/(\d+))?\/?$/;

/** Filtered shop listings are served by the dynamic /[locale]/browse route. */
function filteredListing(request: NextRequest, locale: Locale, path: string) {
  if (!isFilteredRequest(request.nextUrl.searchParams)) return null;
  const m = SHOP_LISTING.exec(path);
  if (!m) return null;
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/browse`;
  url.searchParams.set("scope", m[1]);
  if (m[2]) url.searchParams.set("page", m[2]);
  return NextResponse.rewrite(url);
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) return guardAdmin(request);

  // Locale routing. English has no prefix: "/en/x" redirects to "/x" (one
  // canonical URL), and "/x" is served internally from app/[locale] as "en".
  const first = pathname.split("/")[1] ?? "";
  if (first === DEFAULT_LOCALE) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(DEFAULT_LOCALE.length + 1) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return filteredListing(request, first, pathname.slice(first.length + 1) || "/") ?? NextResponse.next();

  const filtered = filteredListing(request, DEFAULT_LOCALE, pathname);
  if (filtered) return filtered;
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

// Fast signature check for /admin pages. Server Actions re-verify against the
// database with requireAdmin().
function guardAdmin(request: NextRequest) {
  const signedIn = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value) !== null;
  const isLoginRoute = request.nextUrl.pathname === "/admin/login";

  if (!signedIn && !isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }

  if (signedIn && isLoginRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Everything except Next internals, API/media routes, metadata files and
  // anything with a file extension (images, fonts, icons).
  matcher: ["/((?!_next|api|media|sitemap.xml|robots.txt|favicon.ico|icon.png|images|.*\\.[\\w]+$).*)"],
};
