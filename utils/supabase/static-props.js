import { createClient as createClientPrimitive } from "@supabase/supabase-js";

export function createClient() {
  const supabase = createClientPrimitive(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      db: {
        schema: process.env.NODE_ENV === "production" ? "public" : "private",
      },
    },
  );

  return supabase;
}
