import { notFound } from "next/navigation";

import { UserCover } from "./_components/cover";
import { UserDetail } from "./_components/details";
import { UserStats } from "./_components/stats";
import { UserAchievement } from "./_components/achievement";
import { UserTabs } from "./_components/tabs/tabs";

import config from "@/config";

import supabase from "@/utils/supabase";
import { createClient } from "@/utils/supabase/server";

async function getProfile(id) {
  const supabase = createClient();
  const { data } = await supabase
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

  return data;
}
async function getFollowing(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("followers")
    .select("count", { count: "exact" })
    .eq("user_id", id)
    .limit(1)
    .single();

  return data;
}
async function getFollowers(id) {
  const supabase = createClient();
  const { data } = await supabase
    .from("followers")
    .select("count", { count: "exact" })
    .eq("follower_id", id)
    .limit(1)
    .single();

  return data;
}

export async function generateStaticParams() {
  const { data } = await supabase.from("users").select();

  return data.map((user) => ({
    id: user.id,
  }));
}

export async function generateMetadata({ params: { id } }) {
  const profile = await getProfile(id);

  return {
    title: `${profile?.nickname || "User Not Found"} | ${config.metadata.app}`,
  };
}

export default async function Page({ params: { id } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const profile = await getProfile(id);

  if (!profile) notFound();

  const following = await getFollowing(id);
  const followers = await getFollowers(id);

  return (
    <>
      <UserCover profile={profile} />
      <UserDetail user={user} profile={profile} />
      <UserStats
        following={following}
        followers={followers}
        profile={profile}
      />
      <UserAchievement profile={profile} />
      <UserTabs user={user} profile={profile} />
    </>
  );
}
