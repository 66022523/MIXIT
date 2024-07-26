import createClient from "@/utils/supabase/api";

function stringOrFirstString(item) {
  return Array.isArray(item) ? item[0] : item;
}

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const queryParams = req.query;
      const tokenHash = stringOrFirstString(queryParams.tokenHash);
      const type = stringOrFirstString(queryParams.type);
      let redirect = false;

      if (tokenHash && type) {
        const supabase = createClient(req, res);
        const { error } = await supabase.auth.verifyOtp({
          type,
          tokenHash,
        });

        if (error) return res.status(500).end(error);

        redirect = true;
      }
      if (!redirect) return res.status(500).end("Sorry, something went wrong");

      return res.redirect(stringOrFirstString(queryParams.next) || "/");
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
