import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("posts")
      .select()
      .eq("id", id)
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
