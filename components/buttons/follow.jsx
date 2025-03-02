import { useActionState } from "react";

import { followAction, unfollowAction } from "@/libs/actions/user";

export function FollowButton({
  user,
  followID,
  formClass,
  buttonClass,
  label = "Follow",
}) {
  const [state, formAction, isPending] = useActionState(
    followAction.bind(null, user, followID),
    {
      status: 100,
      message: "",
    },
  );

  return (
    <form className={formClass}>
      <button
        className={buttonClass}
        formAction={formAction}
        disabled={isPending}
      >
        {isPending && <span className="loading loading-spinner" />}
        {label}
      </button>
    </form>
  );
}

export function UnfollowButton({
  user,
  followID,
  formClass,
  buttonClass,
  label = "Unfollow",
}) {
  const [state, formAction, isPending] = useActionState(
    unfollowAction.bind(null, user, followID),
    {
      status: 100,
      message: "",
    },
  );

  return (
    <form className={formClass}>
      <button
        className={buttonClass}
        formAction={formAction}
        disabled={isPending}
      >
        {isPending && <span className="loading loading-spinner" />}
        {label}
      </button>
    </form>
  );
}
