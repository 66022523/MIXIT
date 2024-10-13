"use server";
import { createClient } from "@/utils/supabase/server";

export async function getUsers(select) {
  const supabase = createClient();
  const { data, error } = await supabase.from("users").select(select);
  if (error) return error;
  return data;
}

export async function getProfile(id, select) {
  if (!id) return { user: {} };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select(select)
    .eq("id", id)
    .single();
  if (error) return error;
  return data;
}

export async function getFollowing(id, count) {
  if (!id) return { user: [] };

  const supabase = createClient();
  let query = supabase
    .from("followers")
    .select(count ? "count" : "user:follower_id (*)", { count: "exact" })
    .eq("user_id", id);

  if (count) query.limit(1).single();

  const { data, error } = await query;

  if (error) return error;
  return data;
}
export async function getFollowers(id, count) {
  if (!id) return { user: [] };

  const supabase = createClient();
  let query = supabase
    .from("followers")
    .select(count ? "count" : "user:user_id (*)", { count: "exact" })
    .eq("follower_id", id);

  if (count) query.limit(1).single();

  const { data, error } = await query;

  if (error) return error;
  return data;
}

export async function getCircles(id) {
  if (!id) return { circles: [] };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("users")
    .select("circles (*)")
    .eq("id", id)
    .single();
  if (error) return error;
  return data;
}
