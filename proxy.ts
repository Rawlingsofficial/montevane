import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";
import { DEFAULT_LOCALE, isLocale } from "@/lib/i18n/config";

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
  if (isLocale(first)) return NextResponse.next();

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
