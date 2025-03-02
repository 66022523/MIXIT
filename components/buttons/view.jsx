import { EyeIcon as EyeOutlineIcon } from "@heroicons/react/24/outline";
import { EyeIcon as EyeSolidIcon } from "@heroicons/react/24/solid";

export default function ViewButton({
  viewCount = 0,
  hasViewed,
  isCompact,
  showCount,
}) {
  return (
    <>
      <button
        type="button"
        className={`btn btn-circle no-animation btn-sm ${isCompact ? "" : "md:btn-md"} ${hasViewed ? "btn-active" : "btn-outline"}`}
      >
        {hasViewed ? (
          <EyeSolidIcon className={isCompact ? "size-4" : "size-5"} />
        ) : (
          <EyeOutlineIcon className={isCompact ? "size-4" : "size-5"} />
        )}
      </button>
      {showCount &&
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(viewCount)}
    </>
  );
}
