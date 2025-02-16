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

import { createClient } from "@/utils/supabase/server";

export default async function UserPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();
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
    getUserReports(session, id),
    getUserViews(session, id),
  ]);

  if (!userProfileData) notFound();

  return (
    <>
      <UserCover profile={userProfileData} />
      <UserDetail user={session.user} profile={userProfileData} />
      <UserStats profile={userProfileData} />
      <UserAchievement profile={userProfileData} />
      <UserTabs
        user={session.user}
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
