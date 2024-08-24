import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const code = req.query.code;
      const next = req.query.next ? req.query.next : "/";

      if (!code)
        return res.status(500).json({
          message: "Sorry, something went wrong",
          error: { code: "auth-code-error" },
        });

      const supabase = createClient(req, res);
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error)
        return res
          .status(500)
          .json({ message: "Can't exchange code for session", error });

      const forwardedProtocol = req.headers["x-forwarded-proto"];
      const forwardedHost = req.headers["x-forwarded-host"];

      if (forwardedProtocol && forwardedHost)
        return res.redirect(`${forwardedProtocol}://${forwardedHost}${next}`);
      return res.redirect(next);
    default:
      return res
        .status(405)
        .appendHeader("Allow", "GET")
        .end(`Method ${req.method} Not Allowed`);
  }
}
