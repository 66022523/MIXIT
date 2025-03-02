import { notFound } from "next/navigation";

import { UserCover } from "./_components/cover";
import { UserDetail } from "./_components/details";
import { UserStats } from "./_components/stats";
import { UserAchievement } from "./_components/achievement";
import { UserTabs } from "./_components/tabs";

import {
  getUserProfile,
  getUserCircles,
  getUserComments,
  getUserLikes,
  getUserPosts,
  getUserReports,
  getUserViews,
} from "@/libs/queries/users";

import config from "@/configs";

import { createClient } from "@/utils/supabase/server";
import supabase from "@/utils/supabase";

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
  const { data: users } = await supabase.from("users").select("id");

  return users.map((user) => ({
    id: user.id,
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const { data: profile } = await supabase
    .from("users")
    .select("nickname")
    .eq("id", id)
    .single();

  return {
    title: `${profile?.nickname || "User Not Found"} | ${config.metadata.app}`,
  };
}

export default async function UserPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [
    { data: userProfileData },
    { data: userCirclesData },
    { data: userCommentsData },
    { data: userLikesData },
    { data: userPostsData },
    { data: userReportsData },
    { data: userViewsData },
  ] = await Promise.all([
    getUserProfile(id),
    getUserCircles(id),
    getUserComments(id),
    getUserLikes(id),
    getUserPosts(id),
    getUserReports(id, user),
    getUserViews(id, user),
  ]);

  if (!userProfileData) notFound();

  return (
    <>
      <UserCover profile={userProfileData} />
      <UserDetail user={user} profile={userProfileData} />
      <UserStats profile={userProfileData} />
      <UserAchievement profile={userProfileData} />
      <UserTabs
        user={user}
        profile={userProfileData}
        circles={userCirclesData}
        comments={userCommentsData}
        likes={userLikesData}
        posts={userPostsData}
        reports={userReportsData}
        views={userViewsData}
      />
    </>
  );
}
