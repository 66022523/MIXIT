import { HashtagIcon, TagIcon } from "@heroicons/react/24/solid";

import { Post } from "@/components/post";

import { getUser } from "@/lib/queries/auth";
import { getTag } from "@/lib/queries/tags";

export default async function Tag({ params: { id } }) {
  const { user } = await getUser();
  const tag = await getTag(
    id,
    `
      name,
      posts (
        id,
        created_at,
        deleted,
        deleted_at,
        nsfw,
        title,
        content,
        history,
        tags (*),
        images,
        views (user:users!views_user_id_fkey (*)),
        likes (user:users!likes_user_id_fkey (*)),
        comments (*, writer:users!comments_writer_id_fkey (*)),
        shares (user:users!shares_user_id_fkey (*)),
        writer:users!posts_writer_id_fkey (*),
        circle:circles!posts_circle_id_fkey (*)
      )
    `,
  );

  return (
    <>
      <div className="flex items-center gap-4">
        <div className="rounded-btn bg-base-100 p-5">
          <HashtagIcon className="size-5" />
        </div>
        <h1 className="line-clamp-1 grow font-bold">{tag?.name}</h1>
        <div className="badge gap-2 pl-0">
          <div className="badge badge-primary gap-2">Posts</div>
          {tag?.posts?.length || 0}
        </div>
      </div>
      <div className="rounded-xl bg-base-100">
        {tag?.posts?.length
          ? tag.posts.map((post, index) => (
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
                isEnded={index + 1 === tag.posts.length}
                key={index}
              />
            ))
          : ""}
      </div>
    </>
  );
}
