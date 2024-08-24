import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const {
          data: { likes },
          error,
        } = await supabase
          .from("users")
          .select(
            "likes (created_at, post:posts!likes_post_id_fkey (*), comment:comments!likes_comment_id_fkey (*))",
          )
          .eq("id", req.query.id)
          .single();

        if (!likes)
          return res.status(404).json({
            message: `No user found or unable to retrieve data.`,
            error,
          });
        if (error)
          return res.status(500).json({
            message: "An error occurred while retrieving data.",
            error,
          });

        return res.status(200).json(likes);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Internal server error", error });
      }
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
