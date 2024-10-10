"use server";
import { createClient } from "@/utils/supabase/server";

export const updateLikeAction = async (post_id, likes, user) => {
  const supabase = createClient();

  if (!user) return;
  if (likes.some((like) => like.user.id === user.id)) {
    return await supabase.from("likes").delete().eq("user_id", user.id);
  } else {
    return await supabase.from("likes").insert({ user_id: user.id, post_id });
  }
};
