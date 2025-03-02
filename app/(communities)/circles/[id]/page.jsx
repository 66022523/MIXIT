import {
  UsersIcon,
  PlusCircleIcon,
  ShareIcon,
  Bars3BottomLeftIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";

import { Sidebar } from "@/components/layouts/sidebar";
import { Section } from "@/components/section";
import { Post } from "@/components/post";

import { getCircle } from "@/libs/queries/circles";
import {
  getUserCircles,
  getUserComments,
  getUserFollowing,
  getUserLikes,
  getUserViews,
} from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";
import { Fragment } from "react";

export default async function Circle({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [
    { data: circleData },
    { data: userCirclesData },
    { data: userViewsData },
    { data: userLikesData },
    { data: userCommentsData },
    { data: userFollowingData },
  ] = await Promise.all([
    getCircle(id),
    getUserCircles(user?.id),
    getUserViews(user?.id, user),
    getUserLikes(user?.id),
    getUserComments(user?.id),
    getUserFollowing(user?.id),
  ]);

  return circleData ? (
    <>
      <div
        className="hero overflow-clip rounded-box"
        style={{
          backgroundImage: `url(${circleData.cover_url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content h-52 w-full flex-col items-end justify-between p-5 text-neutral-content lg:flex-row">
          <div className="space-y-2">
            <div>
              <span className="text-lg">{circleData.developer}</span>
              <h1 className="text-5xl font-bold">{circleData.name}</h1>
            </div>
            <div className="badge badge-lg gap-2 pl-0">
              <div className="badge badge-primary badge-lg gap-2">
                <UsersIcon className="size-4" />
                Members
              </div>
              {circleData.member_count || 0}
            </div>
          </div>
          <div className="space-x-2">
            {userCirclesData.some(
              (userCircle) => userCircle.id === circleData.id,
            ) ? (
              <button className="btn btn-error">
                <MinusCircleIcon className="size-5" />
                Leave
              </button>
            ) : (
              <button className="btn btn-primary">
                <PlusCircleIcon className="size-5" />
                Join
              </button>
            )}
            <button className="btn btn-primary">
              <ShareIcon className="size-5" />
              Share
            </button>
          </div>
        </div>
      </div>
      <Sidebar>
        <Section Icon={Bars3BottomLeftIcon} title="Posts" />
        <div className="rounded-2xl bg-base-100">
          {circleData.posts?.length
            ? circleData.posts.map((post, index) => (
                <Fragment key={index}>
                  <div className="card">
                    <div className="card-body">
                      <Post
                        user={user}
                        postData={post}
                        userViewsData={userViewsData}
                        userLikesData={userLikesData}
                        userCommentsData={userCommentsData}
                        userFollowingData={userFollowingData}
                        isEnded={index + 1 === circleData.posts.length}
                        isPreview={true}
                      />
                    </div>
                  </div>
                  {index + 1 !== post.length && <div className="divider" />}
                </Fragment>
              ))
            : null}
        </div>
      </Sidebar>
    </>
  ) : (
    <div>Loading...</div>
  );
}
