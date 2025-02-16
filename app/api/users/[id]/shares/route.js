import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 10;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select(
        `
          shares (
            created_at,
            post:posts!shares_post_id_fkey (*),
            comment:comments!shares_comment_id_fkey (*)
          )
        `,
      )
      .eq("id", id)
      .limit(limit, { referencedTable: "shares" })
      .single();

    if (!data)
      return Response.json(
        {
          message: "No user found or unable to retrieve data.",
          error,
        },
        { status: 404 },
      );
    if (error)
      return Response.json(
        {
          message: "An error occurred while retrieving data.",
          error,
        },
        { status: 500 },
      );

    return Response.json(data.shares, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
