"use server";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export const updateProfileAction = async (formData) => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: profile } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id)
    .single();

  let newCover, newAvatar;
  const cover = formData.get("cover");
  const avatar = formData.get("avatar");
  const nickname = formData.get("nickname")?.toString();
  const pronoun = formData.get("pronoun")?.toString();
  const country = formData.get("country")?.toString();
  const signature = formData.get("signature")?.toString();

  // Upload and download user cover and avatar to storage
  if (cover.size && cover !== profile.cover_url) {
    const { data: upload, error } = await supabase.storage
      .from("users")
      .upload(`${user?.id}/cover.png`, cover, {
        upsert: true,
        contentType: cover.type,
      });

    if (error) return { type: "danger", message: error.message };

    const { data } = supabase.storage.from("users").getPublicUrl(upload.path);
    newCover = data.publicUrl;
  }
  if (avatar.size && avatar !== profile.avatar_url) {
    const { data: upload, error } = await supabase.storage
      .from("users")
      .upload(`${user?.id}/avatar.png`, avatar, {
        upsert: true,
        contentType: avatar.type,
      });

    if (error) return { type: "danger", message: error.message };

    const { data } = supabase.storage.from("users").getPublicUrl(upload.path);
    newAvatar = data.publicUrl;
  }

  // Update user profile to database
  const { error } = await supabase
    .from("users")
    .update(
      Object.entries({
        cover_url: newCover !== profile.cover_url && newCover,
        avatar_url: newAvatar !== profile.avatar_url && newAvatar,
        nickname: nickname !== profile.nickname && nickname,
        pronoun: pronoun !== profile.pronoun && pronoun,
        country: country !== profile.country && country,
        signature: signature !== profile.signature && signature,
      }).reduce(
        (previousValue, [key, value]) =>
          value ? ((previousValue[key] = value), previousValue) : previousValue,
        {},
      ),
    )
    .eq("id", user?.id);

  if (error) return { type: "danger", message: error.message };

  revalidatePath("/", "layout");

  return { type: "success", message: "" };
};
