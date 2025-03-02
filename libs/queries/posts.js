"use server";

import { createClient } from "@/utils/supabase/server";

export async function getPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      created_at,
      deleted,
      deleted_at,
      nsfw,
      title,
      content,
      tags (*),
      images,
      view_count:views (count),
      like_count:likes (count),
      comment_count:comments (count),
      share_count:shares (count),
      writer:writer_id (*),
      circle:circle_id (*)
    `,
    )
    .neq("deleted", true)
    .order("created_at", { ascending: false });

  if (!data || error) return { data: null, error };

  data.forEach((post) => {
    post.view_count = post.view_count[0].count;
    post.like_count = post.like_count[0].count;
    post.comment_count = post.comment_count[0].count;
    post.share_count = post.share_count[0].count;
  });

  return { data, error: null };
}

export async function getSimilarPosts(id) {
  if (!id) return { data: null, error: "Please provide ID of post." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
      id,
      created_at,
      deleted,
      deleted_at,
      nsfw,
      title,
      content,
      tags (*),
      images,
      view_count:views (count),
      like_count:likes (count),
      comment_count:comments (count),
      share_count:shares (count),
      writer:writer_id (*),
      circle:circle_id (*)
    `,
    )
    .neq("deleted", true)
    .neq("id", id)
    .order("created_at", { ascending: false });

  if (!data || error) return { data: null, error };

  data.forEach((post) => {
    post.view_count = post.view_count[0].count;
    post.like_count = post.like_count[0].count;
    post.comment_count = post.comment_count[0].count;
  });

  return { data, error: null };
}

export async function getPost(id) {
  if (!id) return { data: null, error: "Please provide ID of post." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("posts")
    .select(
      `
        id,
        created_at,
        deleted,
        deleted_at,
        nsfw,
        title,
        content,
        tags (*),
        images,
        view_count:views (count),
        like_count:likes (count),
        comment_count:comments (count),
        share_count:shares (count),
        writer:writer_id (*),
        circle:circle_id (*)
      `,
    )
    .neq("deleted", true)
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  data.view_count = data.view_count[0].count;
  data.like_count = data.like_count[0].count;
  data.comment_count = data.comment_count[0].count;
  data.share_count = data.share_count[0].count;

  return { data, error: null };
}

export async function getPostComments(id) {
  if (!id) return { data: null, error: "Please provide ID of post." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
        id,
        created_at,
        content,
        nsfw,
        deleted,
        deleted_at,
        images (*),
        writer:writer_id (*),
        replies:comments (
          id,
          created_at,
          content,
          nsfw,
          deleted,
          deleted_at,
          writer:writer_id (*),
          view_count:views (count),
          like_count:likes (count),
          reply_count:comments (count),
          share_count:shares (count)
        ),
        view_count:views (count),
        like_count:likes (count),
        reply_count:comments (count),
        share_count:shares (count)
      `,
    )
    .limit(5, { referencedTable: "replies" })
    .order("created_at", { ascending: false })
    .neq("deleted", true)
    .is("parent_id", null)
    .eq("post_id", id);

  if (!data || error) return { data: null, error };

  const statsReplies = (reply) => {
    ["view_count", "like_count", "reply_count", "share_count"].forEach(
      (field) => {
        reply[field] = reply[field][0].count;
      },
    );
    reply.replies?.forEach(statsReplies);
  };

  data.forEach(statsReplies);

  return { data, error: null };
}
