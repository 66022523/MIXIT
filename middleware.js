import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  let response = NextResponse.next({
    request,
  });
  let redirect = null;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
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

  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/settings/profile") ||
      request.nextUrl.pathname.startsWith("/settings/security") ||
      request.nextUrl.pathname.startsWith("/settings/account"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/settings";
    redirect = url;
  }

  supabase.auth.onAuthStateChange((event, _session) => {
    if (
      event !== "PASSWORD_RECOVERY" &&
      request.nextUrl.pathname.startsWith("/recovery")
    ) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      redirect = url;
    }
  });

  if (redirect) return NextResponse.redirect(redirect);
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
