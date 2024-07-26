import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const supabase = createClient(req, res);

  switch (req.method) {
    case "GET":
      try {
        const { data, error } = await supabase
          .from("users")
          .select()
          .eq("id", req.query.id)
          .single();

        if (error) throw error;

        return res.status(200).json(data);
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
