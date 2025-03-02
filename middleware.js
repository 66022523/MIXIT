import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  let response = NextResponse.next({
    request,
  });

  // Update session
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
    error,
  } = await supabase.auth.getUser();
  const pathname = request.nextUrl.pathname;

  // Redirect user
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
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
