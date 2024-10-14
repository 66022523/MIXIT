"use server";
import { createClient } from "@/utils/supabase/server";

export async function getCircles(select) {
  const supabase = createClient();
  const { data, error } = await supabase.from("circles").select(select);
  if (error) return error;
  return data;
}

export async function getCircle(id, select) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("circles")
    .select(select)
    .eq("id", id)
    .single();
  if (error) return error;
  return data;
}
