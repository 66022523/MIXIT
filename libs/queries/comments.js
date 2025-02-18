"use server";

import { createClient } from "@/utils/supabase/server";

export async function getComments() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("comments").select();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getComment(id) {
  if (!id) return { data: null, error: "Please provide ID of comment." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select()
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}
