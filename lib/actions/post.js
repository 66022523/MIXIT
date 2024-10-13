"use server";
import { createClient } from "@/utils/supabase/server";

export const postAction = async (formData, content, tags) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const title = formData.get("title")?.toString();
  const circle = formData.get("circle")?.toString();

  if (!user)
    return {
      type: "warning",
      message: "Please log in first.",
    };

  const { data: postData, error: postError } = await supabase
    .from("posts")
    .insert({
      title: title,
      content: content,
      circle_id: circle || null,
      writer_id: user.id,
    })
    .select()
    .single();

  if (postError)
    return {
      type: "error",
      message: postError.message,
    };

  if (tags?.length) {
    for (const tag of tags) {
      const { data: tagData, error: tagsError } = await supabase
        .from("tags")
        .insert({ name: tag, circle_id: circle })
        .select()
        .single();

      if (tagsError)
        return {
          type: "error",
          message: tagsError.message,
        };

      const { error: postsTagsError } = await supabase
        .from("posts_tags")
        .insert({ post_id: postData.id, tag_id: tagData.id });

      if (postsTagsError)
        return {
          type: "error",
          message: postsTagsError.message,
        };
    }
  }

  formData.set("title", "");
  formData.set("circle", "");

  return {
    type: "success",
    message: "",
  };
};

export const updateLikeAction = async (post_id, likes, user) => {
  const supabase = createClient();

  if (!user) return;
  if (likes.some((like) => like.user.id === user.id)) {
    return await supabase.from("likes").delete().eq("user_id", user.id);
  } else {
    return await supabase.from("likes").insert({ user_id: user.id, post_id });
  }
};
