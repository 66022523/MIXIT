import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;

  const searchParams = request.nextUrl.searchParams;
  const limit = searchParams.get("limit") || 10;

  const requestHeaders = new Headers(request.headers);
  const authorization = requestHeaders.get("authorization");

  if (!authorization)
    return Response.json(
      { message: "Missing authorization header" },
      { status: 400 },
    );

  const token = authorization.split(" ")[1] || "";

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user)
      return Response.json(
        { message: "Unauthorized", error: authError },
        { status: 401 },
      );
    if (user.id !== id)
      return Response.json(
        {
          message: "There are not enough permissions to access it.",
          error: authError,
        },
        { status: 403 },
      );

    const { data, error } = await supabase
      .from("users")
      .select(
        `
          views (
            created_at,
            post:posts!views_post_id_fkey (*),
            comment:comments!views_comment_id_fkey (*)
          )
        `,
      )
      .eq("id", id)
      .limit(limit, { referencedTable: "views" })
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

    data.views = Object.values(
      data.views.reduce((acc, view) => {
        if (view.post) {
          const postID = view.post.id;
          if (!acc[postID]) {
            acc[postID] = { ...view, view_count: 1 };
          } else {
            acc[postID].view_count += 1;
          }
        }
        return acc;
      }, {}),
    );

    return Response.json(data.views, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
