import { NextResponse } from "next/server";
import { redirect } from 'next/navigation'
import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") ?? "/";

  if (tokenHash && type) {
    const supabase = createClient();
    const { error } = await supabase.auth.verifyOtp({
      type: type,
      token_hash: tokenHash,
    });

    if (error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return redirect(next);
  }

  return NextResponse.json(
    { error: "Sorry, something went wrong" },
    { status: 500 },
  );
}
