"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("posts").select(
    `
      id,
      created_at,
      deleted,
      deleted_at,
      nsfw,
      title,
      content,
      history,
      tags (*),
      images,
      views (count),
      likes (users!likes_user_id_fkey (*)),
      comments (*),
      shares (users!shares_user_id_fkey (*)),
      writer:users!posts_writer_id_fkey (*),
      circle:circles!posts_circle_id_fkey (*)
    `,
  );

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getPost(id) {
  if (!id) return { data: null, error: "Please provide ID of post." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select()
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}
