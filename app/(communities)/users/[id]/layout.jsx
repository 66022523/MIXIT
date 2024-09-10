import config from "@/config";

import supabase from "@/utils/supabase";
import { createClient } from "@/utils/supabase/server";

export async function generateStaticParams() {
  const { data } = await supabase.from("users").select();

  return data.map((user) => ({
    id: user.id,
  }));
}

export async function generateMetadata({ params: { id } }) {
  const supabase = createClient();
  const { data: profile } = await supabase
    .from("users")
    .select(
      `
        *,
        circles (*),
        posts (*),
        comments (
          *,
          post:posts!comments_post_id_fkey(*))
        ),
        likes (
          created_at,
          post:posts!likes_post_id_fkey (*),
          comment:comments!likes_comment_id_fkey (*)
        ),
        views (
          created_at,
          post:posts!views_post_id_fkey (*),
          comment:comments!views_comment_id_fkey (*)
        )
      `,
    )
    .eq("id", id)
    .single();

  return {
    title: `${profile?.nickname || "User Not Found"} | ${config.metadata.app}`,
  };
}

export default async function User({ children }) {
  return (
    <div className="container mx-auto min-h-screen p-12">
      <div className="relative space-y-4">
        {children}
      </div>
    </div>
  );
}
