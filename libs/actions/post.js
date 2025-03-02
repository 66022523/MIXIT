"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { slug } from "@/utils";

export const addPostAction = async (
  user,
  content,
  tags,
  previousState,
  formData,
) => {
  const title = formData.get("title")?.toString();
  const circle = formData.get("circle")?.toString();

  if (!user)
    return {
      status: 401,
      message: "Please log in first.",
    };
  if (!title)
    return {
      status: 400,
      message: "Title is required.",
    };
  if (!content)
    return {
      status: 400,
      message: "Content is required.",
    };

  try {
    const supabase = await createClient();
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
        status: 500,
        message: postError.message,
      };

    tags?.forEach(async (tag) => {
      const slugTag = slug(tag);
      const { data: tagData, error: tagsError } = await supabase
        .from("tags")
        .upsert({ name: slugTag, circle_id: circle })
        .select()
        .single();

      if (tagsError)
        return {
          status: 500,
          message: tagsError.message,
        };

      const { error: postsTagsError } = await supabase
        .from("posts_tags")
        .upsert({ post_id: postData.id, tag_id: tagData.id });

      if (postsTagsError)
        return {
          status: 500,
          message: postsTagsError.message,
        };
    });

    formData.set("title", "");
    formData.set("circle", "");

    return redirect(`/posts/${postData.id}`);
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Something went wrong.",
    };
  }
};

export const editPostAction = async (
  user,
  postID,
  content,
  tags,
  previousState,
  formData,
) => {
  const title = formData.get("title")?.toString();
  const circle = formData.get("circle")?.toString();

  if (!user)
    return {
      status: 401,
      message: "Please log in first.",
    };
  if (!title)
    return {
      status: 400,
      message: "Title is required.",
    };
  if (!content)
    return {
      status: 400,
      message: "Content is required.",
    };

  try {
    const supabase = await createClient();
    const { data: postData, error: postError } = await supabase
      .from("posts")
      .update({
        title: title,
        content: content,
        circle_id: circle || null,
        writer_id: user.id,
        updated_at: new Date(),
      })
      .eq("id", postID)
      .eq("writer_id", user.id)
      .select()
      .single();

    if (postError)
      return {
        status: 500,
        message: postError.message,
      };

    tags?.forEach(async (tag) => {
      const slugTag = slug(tag);
      const { data: tagData, error: tagsError } = await supabase
        .from("tags")
        .upsert({ name: slugTag, circle_id: circle })
        .select()
        .single();

      if (tagsError)
        return {
          status: 500,
          message: tagsError.message,
        };

      const { error: postsTagsError } = await supabase
        .from("posts_tags")
        .upsert({ post_id: postData.id, tag_id: tagData.id });

      if (postsTagsError)
        return {
          status: 500,
          message: postsTagsError.message,
        };
    });

    formData.set("title", "");
    formData.set("circle", "");

    revalidatePath(`/`);
    revalidatePath(`/posts`);
    revalidatePath(`/posts/${postData.id}`);

    return {
      status: 200,
      message: "Success to edit post.",
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Something went wrong.",
    };
  }
};

export const deletePostAction = async (
  user,
  postID,
  previousState,
  formAction,
) => {
  if (!user)
    return {
      status: 401,
      message: "Please log in first.",
    };
  if (!postID)
    return {
      status: 400,
      message: "Please provide post ID.",
    };

  const supabase = await createClient();
  const { error } = await supabase
    .from("posts")
    .update({ deleted: true, deleted_at: new Date() })
    .eq("writer_id", user.id)
    .eq("id", postID);

  if (error)
    return {
      status: 500,
      message: error.message,
    };

  revalidatePath("/");
  revalidatePath("/posts");
  revalidatePath(`/posts/${postID}`);

  return {
    status: 200,
    message: "Success to delete post.",
  };
};

export const likePostAction = async (user, id, previousState, formAction) => {
  if (!user)
    return {
      status: 401,
      message: "Please log in first.",
      data: {
        active: previousState.data.active,
        count: previousState.data.count,
      },
    };
  if (!id)
    return {
      status: 400,
      message: "Please provide post ID.",
      data: {
        active: previousState.data.active,
        count: previousState.data.count,
      },
    };

  const supabase = await createClient();

  if (previousState.data.active) {
    const { error } = await supabase
      .from("likes")
      .delete()
      .eq("user_id", user?.id)
      .eq("post_id", id);

    if (error)
      return {
        status: 500,
        message: error.message,
      };
  } else {
    const { error } = await supabase
      .from("likes")
      .insert({ user_id: user?.id, post_id: id });

    if (error)
      return {
        status: 500,
        message: error.message,
        data: {
          active: previousState.data.active,
          count: previousState.data.count,
        },
      };
  }

  return {
    status: 200,
    message: "Success to like post.",
    data: {
      active: !previousState.data.active,
      count: previousState.data.active
        ? previousState.data.count - 1
        : previousState.data.count + 1,
    },
  };
};
