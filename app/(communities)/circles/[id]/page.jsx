import { Sidebar } from "@/components/layouts/sidebar";
import { Section } from "@/components/section";
import { Post } from "@/components/post";

import { getUser } from "@/lib/queries/auth";
import { getProfile } from "@/lib/queries/users";
import { getCircle } from "@/lib/queries/circles";
import { UsersIcon, PlusCircleIcon, ShareIcon, Bars3BottomLeftIcon } from "@heroicons/react/24/solid";

export default async function Circle({ params: { id } }) {
  const { user } = await getUser();
  const profile = await getProfile(user?.id);
  const circle = await getCircle(
    id,
    `
      name,
      cover_url,
      icon_url,
      posts (
        *,
        circle:circles!posts_circle_id_fkey (*),
        writer:users!posts_writer_id_fkey (*)
      )
    `,
  );

  return circle ? (
    <>
      <div
        className="hero overflow-clip rounded-box"
        style={{
          backgroundImage: `url(${circle.cover_url})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content h-52 w-full flex-col items-end p-5 text-neutral-content lg:flex-row">
          <div className="grow space-y-2">
            <h1 className="text-5xl font-bold">{circle.name}</h1>
            <div className="badge badge-lg gap-2 pl-0">
              <div className="badge badge-primary badge-lg gap-2">
                <UsersIcon className="size-4" />
                Members
              </div>
              0
            </div>
          </div>
          <div className="space-x-2">
            <button className="btn btn-primary">
              <PlusCircleIcon className="size-5" />
              Join
            </button>
            <button className="btn btn-primary">
              <ShareIcon className="size-5" />
              Share
            </button>
          </div>
        </div>
      </div>
      <Section Icon={Bars3BottomLeftIcon} title="Posts" />
      <Sidebar>
        <div className="card bg-base-100">
          {circle.posts?.length
            ? circle.posts.map((post, index) => (
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
                  isEnded={index + 1 === circle.posts.length}
                  isPreview={true}
                  key={index}
                />
              ))
            : ""}
        </div>
      </Sidebar>
    </>
  ) : (
    <div>Loading...</div>
  );
}
