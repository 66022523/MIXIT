"use server";
import { createClient } from "@/utils/supabase/server";

export async function getTags(select) {
  const supabase = createClient();
  const { data, error } = await supabase.from("tags").select(select);
  if (error) return error;
  return data;
}

export async function getTag(id, select) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("tags")
    .select(select)
    .eq("id", id)
    .single();
  if (error) return error;
  return data;
}
