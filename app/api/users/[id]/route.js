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
          comments (count),
          followers:followers_follower_id_fkey (count),
          following:followers_user_id_fkey (count),
          likes (count),
          posts (count),
          reports!reports_user_id_fkey (count),
          shares (count),
          views (count)
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

    const countFields = [
      "circles",
      "comments",
      "followers",
      "following",
      "likes",
      "posts",
      "reports",
      "shares",
      "views",
    ];

    countFields.forEach((field) => {
      data[`${field}_count`] = data[field][0].count;
      delete data[field];
    });

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
