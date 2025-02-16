import { CommentTall } from "@/components/comments";
import { Empty } from "@/components/empty";

export function UserTabComments({ comments }) {
  return (
    <>
      {comments?.length ? (
        comments.map((comment, index) => (
          <CommentTall
            postID={comment.post.id}
            postImageSource={comment.post.images[0].source}
            postImageAlternate={comment.post.images[0].alternate}
            postTitle={comment.post.title}
            postContent={comment.post.content}
            commentID={comment.id}
            commentContent={comment.content}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user hasn't posted anything yet." />
      )}
    </>
  );
}
