import { PostTall } from "@/components/post";
import { Empty } from "@/components/empty";

export function UserTabPosts({ posts }) {
  return (
    <>
      {posts?.length ? (
        posts.map((post, index) => <PostTall postData={post} key={index} />)
      ) : (
        <Empty description="This user hasn't posted anything yet." />
      )}
    </>
  );
}
