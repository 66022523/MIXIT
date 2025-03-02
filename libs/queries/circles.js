"use server";

import { createClient } from "@/utils/supabase/server";

export async function getCircles() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select("*, member_count:users_circles (count)");

  if (!data || error) return { data: null, error };

  data.forEach((circle) => {
    circle.member_count = circle.member_count[0].count;
  });

  return { data, error: null };
}

export async function getCircle(id) {
  if (!id) return { data: null, error: "Please provide ID of circle." };

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("circles")
    .select(
      `
        *,
        posts (
          *,
          circle:circles!posts_circle_id_fkey (*),
          writer:users!posts_writer_id_fkey (*)
        ),
        member_count:users_circles (count)
      `,
    )
    .eq("id", id)
    .single();

  if (!data || error) return { data: null, error };

  data.member_count = data.member_count[0].count;

  return { data, error: null };
}
