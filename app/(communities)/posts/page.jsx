import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Section } from "@/components/section";
import { Placeholder } from "@/components/empty";
import { Post, PostPlaceholder } from "@/components/post";
import { getUser } from "@/lib/queries/auth";
import { getPosts } from "@/lib/queries/posts";

export default async function Communities() {
  const { user } = await getUser();
  const posts = await getPosts();

  return (
    <>
      <Section Icon={Bars3BottomLeftIcon} title="Posts" />
      {posts?.length ? (
        <div className="rounded-xl bg-base-100">
          {posts.map((post, index) => (
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
              isEnded={index + 1 === posts.length}
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
