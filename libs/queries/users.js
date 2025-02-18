"use server";

import { createClient } from "@/utils/supabase/server";

export async function getUsers() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserProfile(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        *,
        circles (count),
        comments (count),
        followers:followers_follower_id_fkey (count),
        following:followers_user_id_fkey (count),
        likes (count),
        posts (count),
        reports!reports_user_id_fkey (count),
        shares (count),
        views (count)
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  const countFields = [
    "circles",
    "comments",
    "followers",
    "following",
    "likes",
    "posts",
    "reports",
    "shares",
    "views",
  ];

  countFields.forEach((field) => {
    data[`${field}_count`] = data[field][0].count;
    delete data[field];
  });

  return { data, error: null };
}

export async function getUserCircles(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("circles (*)")
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserComments(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("comments (*, post:posts!comments_post_id_fkey(*))")
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserFollowing(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("followers")
    .select("user:user_id (*)")
    .eq("follower_id", id);

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserFollowers(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("followers")
    .select("user:follower_id (*)")
    .eq("user_id", id);

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserLikes(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        likes (
          created_at,
          post:posts!likes_post_id_fkey (*),
          comment:comments!likes_comment_id_fkey (*)
        )
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserPosts(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("posts (*)")
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserReports(id, user) {
  if (!id) return { data: null, error: "Please provide ID of user." };
  if (!user)
    return { data: null, error: "Please provide current session user data." };
  if (!user.id !== id)
    return {
      data: null,
      error: "There are not enough permissions to access it.",
    };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select("reports!reports_user_id_fkey (id)")
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserShares(id) {
  if (!id) return { data: null, error: "Please provide ID of user." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        shares (
          created_at,
          post:posts!shares_post_id_fkey (*),
          comment:comments!shares_comment_id_fkey (*)
        )
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  return { data, error: null };
}

export async function getUserViews(id, user) {
  if (!id) return { data: null, error: "Please provide ID of user." };
  if (!user)
    return { data: null, error: "Please provide current session user data." };
  if (!user.id !== id)
    return {
      data: null,
      error: "There are not enough permissions to access it.",
    };

  const supabase = await createClient(session);
  const { data, error } = await supabase
    .from("users")
    .select(
      `
        views (
          created_at,
          post:posts!views_post_id_fkey (*),
          comment:comments!views_comment_id_fkey (*)
        )
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  data.views = Object.values(
    data.views.reduce((acc, view) => {
      if (view.post) {
        const postID = view.post.id;
        if (!acc[postID]) {
          acc[postID] = { ...view, view_count: 1 };
        } else {
          acc[postID].view_count += 1;
        }
      }
      return acc;
    }, {}),
  );

  return { data, error: null };
}
