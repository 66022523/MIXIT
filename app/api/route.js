import { createClient } from "@/utils/supabase/server";

export default async function GET() {
  try {
    createClient();
    return Response.json({ connected: true }, { status: 200 });
  } catch (error) {
    return Response.json({ connected: false, error }, { status: 500 });
  }
}
