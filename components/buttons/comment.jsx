import Link from "next/link";
import { ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterOutlineIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon as ChatBubbleBottomCenterSolidIcon } from "@heroicons/react/24/solid";

export default function CommentButton({
  postID,
  commentID,
  commentCount = 0,
  hasCommented,
  isCompact,
  showCount,
}) {
  return (
    <>
      <Link
        href={
          postID
            ? `/posts/${postID}#comments`
            : `/posts/${postID}#reply-${commentID}`
        }
        className={`btn btn-circle btn-primary btn-sm ${isCompact ? "" : "md:btn-md"} ${hasCommented ? "btn-active" : "btn-outline"}`}
      >
        {hasCommented ? (
          <ChatBubbleBottomCenterSolidIcon
            className={isCompact ? "size-4" : "size-5"}
          />
        ) : (
          <ChatBubbleBottomCenterOutlineIcon
            className={isCompact ? "size-4" : "size-5"}
          />
        )}
      </Link>
      {showCount &&
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(commentCount)}
    </>
  );
}
