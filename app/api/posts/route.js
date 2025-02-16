import { createClient } from "@/utils/supabase/server";

export async function GET(request) {
  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 10;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
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
          views (count),
          likes (users!likes_user_id_fkey (*)),
          comments (*),
          shares (users!shares_user_id_fkey (*)),
          writer:users!posts_writer_id_fkey (*),
          circle:circles!posts_circle_id_fkey (*)
        `,
      )
      .limit(limit);

    if (!data)
      return Response.json(
        {
          message: "Currently, there is no information on any circles.",
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
