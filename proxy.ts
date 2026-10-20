import { NextResponse, type NextRequest } from "next/server";

import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth/session";

// Fast signature check for /admin pages. Server Actions re-verify against the
// database with requireAdmin().
export default function proxy(request: NextRequest) {
  const signedIn = verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value) !== null;
  const { pathname } = request.nextUrl;
  const isLoginRoute = pathname === "/admin/login";

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
  matcher: ["/admin/:path*"],
};
