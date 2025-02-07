import { notFound } from "next/navigation";

import { UserCover } from "./_components/cover";
import { UserDetail } from "./_components/details";
import { UserStats } from "./_components/stats";
import { UserAchievement } from "./_components/achievement";
import { UserTabs } from "./_components/tabs";

import { getUser } from "@/lib/queries/auth";
import { getProfile, getFollowing, getFollowers } from "@/lib/queries/users";

export default async function Page({ params }) {
  const { id } = await params;
  const { user } = await getUser();

  const profile = await getProfile(
    id,
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
  );

  if (!profile) notFound();

  const following = await getFollowing(id, true);
  const followers = await getFollowers(id, true);

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
