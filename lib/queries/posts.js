"use server"
import { createClient } from "@/utils/supabase/server";

export async function getPosts(select) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select(select);
  if (error) return error;
  return data;
}