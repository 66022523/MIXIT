import { PostTall } from "@/components/post";
import { Empty } from "@/components/empty";

export function UserTabPosts({ profile }) {
  return (
    <>
      {profile.posts?.length ? (
        profile.posts.map((post, index) => (
          <PostTall
            id={post.id}
            imagesSource={post.images?.[0].source}
            imagesAlternate={post.images?.[0].alternate}
            title={post.title}
            content={post.content}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user hasn't posted anything yet." />
      )}
    </>
  );
}