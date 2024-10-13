import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user && request.nextUrl.pathname === "/settings")
    return NextResponse.redirect(new URL("/settings/account", request.url));
  if (
    !user &&
    (request.nextUrl.pathname === "/settings" ||
      request.nextUrl.pathname.startsWith("/settings/profile") ||
      request.nextUrl.pathname.startsWith("/settings/security") ||
      request.nextUrl.pathname.startsWith("/settings/account"))
  )
    return NextResponse.redirect(new URL("/settings/privacy", request.url));
  if (
    user &&
    (request.nextUrl.pathname.startsWith("/sign-in") ||
      request.nextUrl.pathname.startsWith("/sign-up") ||
      request.nextUrl.pathname.startsWith("/forgot"))
  )
    return NextResponse.redirect(new URL("/", request.url));
  if (
    !user?.app_metadata?.recovery_password &&
    request.nextUrl.pathname.startsWith("/recovery")
  )
    return NextResponse.redirect(new URL("/", request.url));

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
