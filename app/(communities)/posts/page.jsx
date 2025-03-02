import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";

import { Section } from "@/components/section";
import { Placeholder } from "@/components/empty";
import { Post, PostPlaceholder } from "@/components/post";

import { getPosts } from "@/libs/queries/posts";
import {
  getUserComments,
  getUserFollowing,
  getUserLikes,
  getUserViews,
} from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";

export default async function Communities() {
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
    <>
      <Section Icon={Bars3BottomLeftIcon} title="Posts">
        <div className="badge badge-lg gap-2 border-none pl-0">
          <div className="badge badge-primary badge-lg gap-2">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(postsData?.length || 0)}
          </div>
          Posts
        </div>
      </Section>
      {postsData?.length ? (
        <div className="rounded-xl bg-base-100">
          {postsData.map((post, index) => (
            <Post
              user={user}
              postData={post}
              userViewsData={userViewsData}
              userLikesData={userLikesData}
              userCommentsData={userCommentsData}
              userFollowingData={userFollowingData}
              showCount
              isEnded={index + 1 === postsData.length}
              isPreview={true}
              key={index}
            />
          ))}
        </div>
      ) : (
        <Placeholder
          title="Empty Posts"
          description="There are currently no posts."
        >
          <PostPlaceholder isEnded={true} />
        </Placeholder>
      )}
    </>
  );
}
