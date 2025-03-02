"use server";

import { createClient } from "@/utils/supabase/server";

export async function getTags() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("tags").select("*, posts (id)");

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getTag(id) {
  if (!id) return { data: null, error: "Please provide ID of tag." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tags")
    .select(
      `
        name,
        created_at,
        posts (
          id,
          created_at,
          deleted,
          deleted_at,
          nsfw,
          title,
          content,
          tags (*),
          images,
          views (user:users!views_user_id_fkey (*)),
          likes (user:users!likes_user_id_fkey (*)),
          comments (*, writer:users!comments_writer_id_fkey (*)),
          shares (user:users!shares_user_id_fkey (*)),
          writer:users!posts_writer_id_fkey (*),
          circle:circles!posts_circle_id_fkey (*)
        )
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}
