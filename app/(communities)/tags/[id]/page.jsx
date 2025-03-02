import { HashtagIcon } from "@heroicons/react/24/solid";

import { Post } from "@/components/post";

import { getTag } from "@/libs/queries/tags";
import {
  getUserComments,
  getUserFollowing,
  getUserLikes,
  getUserViews,
} from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";

export default async function Tag({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [
    { data: tagData },
    { data: userViewsData },
    { data: userLikesData },
    { data: userCommentsData },
    { data: userFollowingData },
  ] = await Promise.all([
    getTag(id),
    getUserViews(user?.id, user),
    getUserLikes(user?.id),
    getUserComments(user?.id),
    getUserFollowing(user?.id),
  ]);

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="rounded-btn bg-base-100 p-5">
          <HashtagIcon className="size-5" />
        </div>
        <h1 className="line-clamp-1 grow font-bold">{tagData?.name}</h1>
        <div className="badge gap-2 pl-0">
          <div className="badge badge-primary gap-2">Posts</div>
          {tagData?.posts?.length || 0}
        </div>
      </div>
      <div className="rounded-xl bg-base-100">
        {tagData?.posts?.length
          ? tagData.posts.map((post, index) => (
              <Post
                user={user}
                postData={post}
                userViewsData={userViewsData}
                userLikesData={userLikesData}
                userCommentsData={userCommentsData}
                userFollowingData={userFollowingData}
                isEnded={index + 1 === tagData.posts.length}
                key={index}
              />
            ))
          : null}
      </div>
    </>
  );
}
