"use server";
import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

export async function getUsers() {
  const supabase = createClient();
  const { data, error } = await supabase.from("users").select();
  if (error) throw error;
  return data;
}


export async function getProfile(id) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("id", id)
    .single();
  if (error) throw error;
  return data;
}