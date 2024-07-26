import { createServerClient } from "@supabase/ssr";

export default function createClient(req, res) {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      db: {
        schema: process.env.NODE_ENV === "production" ? "public" : "private",
      },
      cookies: {
        getAll() {
          return Object.keys(req.cookies).map((name) => ({
            name,
            value: req.cookies[name] || "",
          }));
        },
        setAll(cookiesToSet) {
          res.setHeader(
            "Set-Cookie",
            cookiesToSet.map(({ name, value, options }) =>
              serialize(name, value, options),
            ),
          );
        },
      },
    },
  );

  return supabase;
}
