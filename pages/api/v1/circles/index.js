import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const { data, error } = await supabase.from("circles").select();

        if (!data)
          return res
            .status(404)
            .json({
              message: "Currently, there is no information on any circles.",
              error,
            });
        if (error)
          return res
            .status(500)
            .json({
              message: "An error occurred while retrieving data.",
              error,
            });

        return res.status(200).json(data);
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
