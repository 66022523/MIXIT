import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  // Supabase Middleware
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // System Middleware
  const pathname = request.nextUrl.pathname
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && pathname === "/settings")
    return NextResponse.redirect(new URL("/settings/account", request.url));
  if (
    !user &&
    (pathname === "/settings" ||
      pathname.startsWith("/settings/profile") ||
      pathname.startsWith("/settings/security") ||
      pathname.startsWith("/settings/account"))
  )
    return NextResponse.redirect(new URL("/settings/privacy", request.url));
  if (
    user &&
    (pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up") ||
      pathname.startsWith("/forgot"))
  )
    return NextResponse.redirect(new URL("/", request.url));
  if (
    !user?.app_metadata?.recovery_password &&
    pathname.startsWith("/recovery")
  )
    return NextResponse.redirect(new URL("/", request.url));

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
