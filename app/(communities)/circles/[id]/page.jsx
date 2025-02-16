import { Sidebar } from "@/components/layouts/sidebar";
import { Section } from "@/components/section";
import { Post } from "@/components/post";

import { getUser } from "@/libs/queries/auth";
import { getCircle } from "@/libs/queries/circles";
import {
  UsersIcon,
  PlusCircleIcon,
  ShareIcon,
  Bars3BottomLeftIcon,
  MinusCircleIcon,
} from "@heroicons/react/24/solid";
import { getUserCircles } from "@/libs/queries/users";

export default async function Circle({ params }) {
  const { id } = await params;
  const { user } = await getUser();
  const { data: circleData } = await getCircle(id);
  const { data: userCircleData } = await getUserCircles(user?.id);

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
            <h1 className="text-5xl font-bold">{circleData.name}</h1>
            <div className="badge badge-lg gap-2 pl-0">
              <div className="badge badge-primary badge-lg gap-2">
                <UsersIcon className="size-4" />
                Members
              </div>
              {circleData.member_count || 0}
            </div>
          </div>
          <div className="space-x-2">
            {userCircleData.find(
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
        <div className="card bg-base-100">
          {circleData.posts?.length
            ? circleData.posts.map((post, index) => (
                <Post
                  user={user}
                  id={post.id}
                  createdAt={post.created_at}
                  title={post.title}
                  content={post.content}
                  tags={post.tags}
                  images={post.images}
                  view={post.views}
                  likes={post.likes}
                  comments={post.comments}
                  shares={post.shares}
                  writerID={post.writer?.id}
                  writerAvatarURL={post.writer?.avatar_url}
                  writerNickname={post.writer?.nickname}
                  writerRole={post.writer?.role}
                  circleID={post.circle?.id}
                  circleIconURL={post.circle?.icon_url}
                  circleName={post.circle?.name}
                  isEnded={index + 1 === circleData.posts.length}
                  isPreview={true}
                  key={index}
                />
              ))
            : null}
        </div>
      </Sidebar>
    </>
  ) : (
    <div>Loading...</div>
  );
}
