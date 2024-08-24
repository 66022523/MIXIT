import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  const stringOrFirstString = (item) => (Array.isArray(item) ? item[0] : item);

  switch (req.method) {
    case "GET":
      const tokenHash = stringOrFirstString(req.query.token_hash);
      const type = stringOrFirstString(req.query.type);
      const next = req.query.next ? stringOrFirstString(req.query.next) : "/";

      if (tokenHash && type) {
        const supabase = createClient(req, res);
        const { error } = await supabase.auth.verifyOtp({
          type: type,
          token_hash: tokenHash,
        });

        if (error) return res.status(500).end(error.message);

        return res.redirect(next)
      }
      return res.status(500).end("Sorry, something went wrong");
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
