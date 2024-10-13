"use server";
import { createClient } from "@/utils/supabase/server";

export async function getPosts(select) {
  const supabase = createClient();
  const { data, error } = await supabase.from("posts").select(
    select ||
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
      views (user:users!views_user_id_fkey (*)),
      likes (user:users!likes_user_id_fkey (*)),
      comments (*, writer:users!comments_writer_id_fkey (*)),
      shares (user:users!shares_user_id_fkey (*)),
      writer:users!posts_writer_id_fkey (*),
      circle:circles!posts_circle_id_fkey (*)
    `,
  );
  if (error) return error;
  return data;
}

export async function getPost(id, select) {
  const supabase = createClient();
  return await supabase
    .from("posts")
    .select(
      select ||
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
        views (user:users!views_user_id_fkey (*)),
        likes (user:users!likes_user_id_fkey (*)),
        comments (*, writer:users!comments_writer_id_fkey (*)),
        shares (user:users!shares_user_id_fkey (*)),
        writer:users!posts_writer_id_fkey (*),
        circle:circles!posts_circle_id_fkey (*)
      `,
    )
    .eq("id", id)
    .single();
}
