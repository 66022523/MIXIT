import { useActionState } from "react";

import { HeartIcon as HeartOutlineIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

import { likePostAction } from "@/libs/actions/post";

export default function LikeButton({
  user,
  postID,
  likeCount = 0,
  hasLiked,
  isCompact,
  showCount,
}) {
  const [state, formAction] = useActionState(
    likePostAction.bind(null, user, postID),
    {
      status: 100,
      message: "",
      data: {
        active: hasLiked,
        count: likeCount,
      },
    },
  );

  return (
    <>
      <form>
        <button
          className={`btn btn-circle btn-error btn-sm ${isCompact ? "" : "md:btn-md"} ${state.data.active ? "btn-active" : "btn-outline"}`}
          formAction={formAction}
        >
          {state.data.active ? (
            <HeartSolidIcon className={isCompact ? "size-4" : "size-5"} />
          ) : (
            <HeartOutlineIcon className={isCompact ? "size-4" : "size-5"} />
          )}
        </button>
      </form>
      {showCount &&
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(state.data.count)}
    </>
  );
}
