import { CommentTall } from "@/components/comments";
import { PostTall } from "@/components/post";
import { Empty } from "@/components/empty";

export function UserTabLikes({ profile }) {
  return (
    <>
      {profile.likes?.length ? (
        profile.likes.map((like, index) =>
          like.post ? (
            <PostTall
              id={like.post.id}
              imagesSource={like.post.images[0].source}
              imagesAlternate={like.post.images[0].alternate}
              title={like.post.title}
              content={like.post.content}
              key={index}
            />
          ) : like.comment ? (
            <CommentTall
              postID={like.comment.post.id}
              postImageSource={like.comment.post.images[0].source}
              postImageAlternate={like.comment.post.images[0].alternate}
              postTitle={like.comment.post.title}
              postContent={like.comment.post.content}
              commentID={like.comment.id}
              commentContent={like.comment.content}
              key={index}
            />
          ) : null,
        )
      ) : (
        <Empty description="Users don't have any content of particular interest yet." />
      )}
    </>
  );
}
