import Link from "next/link";
import Image from "next/image";

export function CommentTall({
  postID,
  postImageSource,
  postImageAlternate,
  postTitle,
  postContent,
  commentID,
  commentContent,
}) {
  return (
    <Link
      href={`/posts/${postID}?cid=${commentID}`}
      className="card bg-base-200"
    >
      <div className="card-body p-5">
        <p>{commentContent}</p>
        <div className="card flex-row bg-base-300">
          {postImageSource && (
            <figure className="py-5 pl-5">
              <Image
                className="rounded-xl"
                src={postImageSource}
                alt={postImageAlternate}
                width={100}
                height={100}
              />
            </figure>
          )}
          <div className="card-body flex-row p-5">
            <div className="flex-1">
              <h3 className="card-title">{postTitle}</h3>
              <p>{postContent}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
