import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const { data: posts, error } = await supabase.from("posts").select();

        if (error) throw error;
        if (!posts?.length) return res.status(200).json([]);

        const result = await Promise.all(
          posts.map(async (post) => {
            const { data: user, error: userError } = await supabase
              .from("users")
              .select()
              .eq("id", post.writer_id)
              .single();

            if (userError) throw userError;

            const { data: comments, error: commentsError } = await supabase
              .from("comments")
              .select("*, comments (*)")
              .eq("post_id", post.id)
              .order("created_at", { ascending: false })
              .is("comment_id", null);

            if (commentsError) throw commentsError;

            const { data: circle, error: circleError } = await supabase
              .from("circles")
              .select()
              .eq("id", post.circle_id)
              .single();

            if (circleError) throw circleError;

            const { data: tags, error: tagsError } = await supabase
              .from("posts")
              .select("id, tags (id, name)");

            if (tagsError) throw tagsError;

            ["writer_id", "circle_id"].forEach((key) => delete post[key]);

            return {
              ...post,
              writer: user,
              circle: circle,
              comments: comments,
              tags: tags[0].tags,
            };
          }),
        );

        return res.status(200).json(result);
      } catch (error) {
        return res.status(500).json({ message: "Failed to fetch data", error });
      }
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
