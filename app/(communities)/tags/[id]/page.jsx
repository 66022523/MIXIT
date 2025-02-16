import { HashtagIcon, TagIcon } from "@heroicons/react/24/solid";

import { Post } from "@/components/post";

import { getUser } from "@/libs/queries/auth";
import { getTag } from "@/libs/queries/tags";

export default async function Tag({ params }) {
  const { id } = await params;
  const { user } = await getUser();
  const { data: tagData } = await getTag(id);

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
                isEnded={index + 1 === tagData.posts.length}
                key={index}
              />
            ))
          : null}
      </div>
    </>
  );
}
