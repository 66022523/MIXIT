import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from("tags")
          .select("*, posts (id)");

        if (!data)
          return res.status(404).json({
            message: "There are no tag topics available at this time.",
            error,
          });
        if (error)
          return res.status(500).json({
            message: "An error occurred while retrieving data.",
            error,
          });

        return res.status(200).json(
          data.map((tag) => ({
            ...tag,
            posts: tag.posts.map((post) => post.id),
          })),
        );
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
