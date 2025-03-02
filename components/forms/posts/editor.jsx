"use client";

import { useState, useActionState, useEffect } from "react";
import {
  XMarkIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import RichTextEditor from "@/components/editor";
import { PostTall } from "@/components/post";

export default function EditorPostForm({
  user,
  postData,
  userCirclesData,
  action,
  isModal,
}) {
  const router = useRouter();
  const [title, setTitle] = useState(postData?.title || "");
  const [content, setContent] = useState(postData?.content || "");
  const [circle, setCircle] = useState(postData?.circle || "");
  const [tags, setTags] = useState(
    postData?.tags?.map((tag) => tag.name) || [],
  );
  const [state, formAction, isPending] = useActionState(
    action.bind(null, user, postData?.id, content, tags),
    { status: 100, message: "" },
  );

  // const fetchGIFs = () => {
  //   const apiKey = process.env.NEXT_PUBLIC_TENOR_API_KEY;
  //   const clientKey = process.env.NEXT_PUBLIC_TENOR_CLIENT_KEY;
  //   const limit = 8;

  //   fetch(
  //     `https://tenor.googleapis.com/v2/search?q=${null}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`,
  //   )
  //     .then((response) => response.json())
  //     .then((data) => setGifs(data.results || []))
  //     .catch((error) => console.error("Error fetching GIFs:", error));
  // };
  const handleAddTag = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };
  const handleRemoveTag = (at) => {
    const newTags = tags.filter((_, index) => index !== at);
    setTags(newTags);
  };

  useEffect(() => {
    if (state.status === 200) {
      router.back();
    }
    if (![100, 200].includes(state.status)) {
      console.error(state.message);
    }
  }, [state]);

  return (
    <>
      {postData ? (
        <>
          {isModal ? (
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">Editing Post</h3>
              <div className="flex justify-end gap-2">
                <button
                  className="btn btn-circle btn-primary btn-sm"
                  disabled={isPending}
                >
                  <QuestionMarkCircleIcon className="size-6" />
                </button>
                <form method="dialog">
                  <button
                    className="btn btn-circle btn-primary btn-sm"
                    disabled={isPending}
                  >
                    <XCircleIcon className="size-6" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <h3 className="card-title">Editing Post</h3>
          )}
          <p className={isModal ? "py-4" : ""}>Your are editing this post</p>
          <PostTall
            cardClassName={isModal ? "mb-4" : ""}
            postData={postData}
            disabled={isPending}
          />
        </>
      ) : null}
      <form action={formAction}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter your post topic"
            className="input input-bordered w-full"
            required
            disabled={isPending}
          />
        </label>
        <RichTextEditor
          setState={setContent}
          label="Content"
          content={content}
          disabled={isPending}
        />
        <div className="grid grid-cols-2 gap-4">
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Circle</span>
            </div>
            <select
              className="select select-bordered"
              name="circle"
              value={circle}
              onChange={(event) => setCircle(event.target.value)}
              disabled={isPending}
            >
              <option disabled>Select Community</option>
              {userCirclesData.map((circle) => (
                <option key={circle.id} value={circle.id}>
                  {circle.name}
                </option>
              ))}
            </select>
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">Topics</span>
            </div>
            <input
              type="text"
              placeholder="Add a tag and press Enter"
              onKeyDown={handleAddTag}
              className="input input-bordered w-full"
              disabled={isPending}
            />
            <div className="label">
              <span className="label-text-alt flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="badge badge-primary badge-lg gap-2"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                    >
                      <XMarkIcon className="size-4" />
                    </button>
                  </span>
                ))}
              </span>
            </div>
          </label>
        </div>
        <div className="form-control max-w-xs">
          <label className="label cursor-not-allowed justify-normal gap-2">
            <input type="checkbox" className="toggle toggle-primary" disabled />
            <span className="label-text">
              <span>Serious Content (NSFW)</span>
              <br />
              <small className="text-gray-400">
                Mark this post as potentially having strong version content.
              </small>
            </span>
          </label>
        </div>
        {![100, 200].includes(state.status) && (
          <div
            role="alert"
            className={`alert ${state.status === 500 ? "alert-danger" : "alert-warning"}`}
          >
            {state.status === 500 ? (
              <XCircleIcon className="size-6" />
            ) : (
              <ExclamationTriangleIcon className="size-6" />
            )}
            <span>{state.message}</span>
          </div>
        )}
        <div className={isModal ? "modal-action" : "card-actions"}>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={!title || !content || isPending}
          >
            {isPending && <span className="loading loading-spinner" />} Post
          </button>
        </div>
      </form>
    </>
  );
}
