import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const id = (await params).id;

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("circles")
      .select(
        `
          *,
          posts (
            *,
            circle:circles!posts_circle_id_fkey (*),
            writer:users!posts_writer_id_fkey (*)
          ),
          member_count:users_circles (count)
        `,
      )
      .eq("id", id)
      .single();

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
    
    data.member_count = data.member_count[0].count;

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { message: "Internal server error", error: error.message },
      { status: 500 },
    );
  }
}
