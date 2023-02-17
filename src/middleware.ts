import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isPublicPage } from "./utils/isPublicPage";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createMiddlewareSupabaseClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  if (isPublicPage(pathname)) {
    return res;
  } else if (pathname.startsWith("/auth")) {
    if (session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/";
      return NextResponse.redirect(redirectUrl);
    } else {
      return res;
    }
  }

  if (session !== null) {
    return res;
  }

  const redirectUrl = req.nextUrl.clone();
  redirectUrl.pathname = "/auth/login";
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher:
    "/((?!api|_next|static|public|favicon.ico|googled52fa57ae1d5a167.html).*)",
};
