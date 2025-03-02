"use server";

import { slug } from "@/utils";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addCommentAction(
  user,
  circleID,
  postID,
  previousState,
  formData,
) {
  const content = formData.get("content");
  const images = formData.getAll("images");
  const nsfw = formData.get("nsfw");

  if (!user) {
    return {
      status: 401,
      message: "You must be logged in to add a comment.",
    };
  }
  if (!postID) {
    return {
      status: 400,
      message: "Please provide the ID of the post.",
    };
  }
  if (!content) {
    return {
      status: 400,
      message: "Please provide the content of the comment.",
    };
  }
  if (content.length > 1024) {
    return {
      status: 400,
      message: "Comment content must be less than 1024 characters.",
    };
  }

  const supabase = await createClient();
  const { data: commentData, error: commentError } = await supabase
    .from("comments")
    .insert({
      content: content,
      nsfw: Boolean(nsfw),
      circle_id: circleID,
      post_id: postID,
      writer_id: user.id,
    })
    .select();

  if (commentError) {
    console.error(commentError);
    return {
      status: 500,
      message: "Failed to add comment.",
    };
  }

  for (let i = 0; i < images.length; i++) {
    if (images[i]?.size) {
      const image = images[i];
      const imageName = slug(image.name)
      const imageType = image.type;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("comments")
        .upload(`${commentData[0].id}/${imageName}`, image, {
          contentType: imageType,
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        console.error(uploadError);
        return {
          status: 500,
          message: "Failed to upload image.",
        };
      }

      const { data } = supabase.storage
        .from("comments")
        .getPublicUrl(uploadData.path);
      const { error: imageError } = await supabase.from("images").insert({
        source: data.publicUrl,
        comment_id: commentData[0].id,
        user_id: user.id,
      });

      if (imageError) {
        console.error(imageError);
        return {
          status: 500,
          message: "Failed to add image to database.",
        };
      }
    }
  }

  revalidatePath(`/posts/${postID}`);

  return {
    status: 200,
    message: "Comment added.",
  };
}
