import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const { data, error } = await supabase.from("posts").select(
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
            views (users!views_user_id_fkey (*)),
            likes (users!likes_user_id_fkey (*)),
            comments (*),
            shares (users!shares_user_id_fkey (*)),
            writer:users!posts_writer_id_fkey (*),
            circle:circles!posts_circle_id_fkey (*)
          `,
        ).eq("id", req.query.pid).single();

        if (!data)
          return res.status(404).json({
            message: "The content of the post was not found.",
            error,
          });
        if (error)
          return res.status(500).json({
            message: "An error occurred while retrieving data.",
            error,
          });

        return res.status(200).json(data);
      } catch (error) {
        return res.status(500).json(error);
      }
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
