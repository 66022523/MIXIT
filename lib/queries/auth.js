"use server"
import { isAuthSessionMissingError } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";

export async function getUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error && !isAuthSessionMissingError(error)) return error;
  return data;
}