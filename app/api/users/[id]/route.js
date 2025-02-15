import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("users")
      .select(
        `
          *,
          circles (*),
          comments (
            *,
            post:posts!comments_post_id_fkey(*)
          ),
          followers:followers_user_id_fkey (*),
          following:followers_follower_id_fkey (*),
          likes (
            created_at,
            post:posts!likes_post_id_fkey (*),
            comment:comments!likes_comment_id_fkey (*)
          ),
          posts (*),
          reports!reports_user_id_fkey (id),
          shares (
            created_at,
            post:posts!shares_post_id_fkey (*),
            comment:comments!shares_comment_id_fkey (*)
          ),
          views (
            created_at,
            post:posts!views_post_id_fkey (*),
            comment:comments!views_comment_id_fkey (*)
          )
        `,
      )
      .eq("id", id)
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

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
