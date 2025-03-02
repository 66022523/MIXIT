import { getPosts } from "@/libs/queries/posts";
import {
  getUserComments,
  getUserFollowing,
  getUserLikes,
  getUserViews,
} from "@/libs/queries/users";

import { SidePosts } from "@/components/layouts/sidebar";

import { createClient } from "@/utils/supabase/server";

export default async function Layout({ children }) {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [
    { data: postsData },
    { data: userViewsData },
    { data: userLikesData },
    { data: userCommentsData },
    { data: userFollowingData },
  ] = await Promise.all([
    getPosts(),
    getUserViews(user?.id, user),
    getUserLikes(user?.id),
    getUserComments(user?.id),
    getUserFollowing(user?.id),
  ]);

  return (
    <SidePosts
      user={user}
      postsData={postsData}
      userViewsData={userViewsData}
      userLikesData={userLikesData}
      userCommentsData={userCommentsData}
      userFollowingData={userFollowingData}
      className="p-12"
    >
      {children}
    </SidePosts>
  );
}
