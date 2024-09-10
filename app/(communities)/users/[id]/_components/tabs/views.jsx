import { CommentTall } from "@/components/comments";
import { PostTall } from "@/components/post";
import { Empty } from "@/components/empty";

export function UserTabViews({ profile }) {
  return (
    <>
      {profile.views?.length ? (
        profile.views.map((view, index) =>
          view.post ? (
            <PostTall
              id={view.post.id}
              imagesSource={view.post.images[0].source}
              imagesAlternate={view.post.images[0].alternate}
              title={view.post.title}
              content={view.post.content}
              key={index}
            />
          ) : view.comment ? (
            <CommentTall
              postID={view.comment.post.id}
              postImageSource={view.comment.post.images[0].source}
              postImageAlternate={view.comment.post.images[0].alternate}
              postTitle={view.comment.post.title}
              postContent={view.comment.post.content}
              commentID={view.comment.id}
              commentContent={view.comment.content}
              key={index}
            />
          ) : null,
        )
      ) : (
        <Empty description="The user has not visited any content." />
      )}
    </>
  );
}
