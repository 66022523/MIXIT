import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 10;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("tags")
      .select(
        `
          name,
          created_at,
          posts (
            id,
            created_at,
            deleted,
            deleted_at,
            nsfw,
            title,
            content,
            history,
            tags (*),
            images,
            views (user:users!views_user_id_fkey (*)),
            likes (user:users!likes_user_id_fkey (*)),
            comments (*, writer:users!comments_writer_id_fkey (*)),
            shares (user:users!shares_user_id_fkey (*)),
            writer:users!posts_writer_id_fkey (*),
            circle:circles!posts_circle_id_fkey (*)
          )
        `
      )
      .eq("id", id)
      .limit(limit, { referencedTable: "posts" })
      .single();

    if (!data)
      return Response.json(
        {
          message: "Currently, there is no information on any posts.",
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

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
