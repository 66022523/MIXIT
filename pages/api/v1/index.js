import createClient from "@/utils/supabase/api";

export default async function handler(req, res) {
  try {
    createClient(req, res);
    return res.status(200).json({ connected: true });
  } catch (error) {
    return res.status(500).json({ connected: false, error });
  }
}
