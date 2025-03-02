"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { PostTall } from "@/components/post";

import { deletePostAction } from "@/libs/actions/post";

export default function DeletePostForm({ user, postData, isModal }) {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    deletePostAction.bind(null, user, postData?.id),
    {
      status: 100,
      message: "",
    },
  );

  useEffect(() => {
    if (state.status === 200) {
      router.back();
    }
    if (![100, 200].includes(state.status)) {
      console.error(state);
    }
  }, [state, router]);

  return (
    <>
      <h3 className={isModal ? "text-lg font-bold" : "card-title"}>
        Delete This Post?
      </h3>
      <p className={isModal ? "py-4" : ""}>
        Do you want to delete this post? After it is deleted, it cannot be
        restored.
      </p>
      <PostTall postData={postData} disabled={isPending} />
      <div className={isModal ? "modal-action" : "card-actions"}>
        <form>
          <button
            className="btn btn-error"
            formAction={formAction}
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner" />}
            Delete
          </button>
        </form>
        <form method="dialog">
          <button className="btn" disabled={isPending}>
            Cancel
          </button>
        </form>
      </div>
    </>
  );
}
