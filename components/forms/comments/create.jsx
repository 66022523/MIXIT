"use client";

import Image from "next/image";
import { useActionState, useEffect, useRef, useState } from "react";
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import { Avatar } from "@/components/user";

import { addCommentAction } from "@/libs/actions/comment";

export default function CreateCommentForm({
  user,
  profile,
  circleID,
  postID,
  previousContent,
  previousImages,
}) {
  const formRef = useRef();
  const imagesRef = useRef();

  const [content, setContent] = useState(previousContent || "");
  const [images, setImages] = useState(previousImages || []);
  const [NSFW, setNSFW] = useState(false);

  const [state, formAction, isPending] = useActionState(
    addCommentAction.bind(null, user, circleID, postID),
    { status: 100, message: "" },
  );

  //   const fetchGIFs = () => {
  //     const apiKey = process.env.NEXT_PUBLIC_TENOR_API_KEY;
  //     const clientKey = process.env.NEXT_PUBLIC_TENOR_CLIENT_KEY;
  //     const limit = 8;
  //     const searchUrl = `https://tenor.googleapis.com/v2/search?q=${searchTerm}&key=${apiKey}&client_key=${clientKey}&limit=${limit}`;

  //     fetch(searchUrl)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setGifs(data.results || []);
  //       })
  //       .catch((error) => console.error("Error fetching GIFs:", error));
  //   };
  const handleContent = (event) => {
    setContent(event.target.value);
  };
  const handleAddImages = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...newImages]);
  };
  const handleRemoveImage = (index) => {
    imagesRef.current.files[index] = null;
    setImages(images.filter((_, i) => i !== index));
  };
  const handleNSFW = (event) => {
    setNSFW(event.target.checked);
  };

  useEffect(() => {
    if (state.status === 200) {
      setContent("");
      setImages([]);
      setNSFW(false);
      formRef.current.reset();
    }
  }, [state]);

  return (
    <form className="flex gap-4" action={formAction} ref={formRef}>
      <Avatar
        avatarURL={profile.avatar_url}
        nickname={profile.nickname}
        fallbackSizeClass="size-10"
        width={40}
        height={40}
      />
      <div className="grow space-y-2">
        <label className="form-control">
          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write your comment..."
            rows="3"
            name="content"
            value={content}
            required
            maxLength={1024}
            disabled={isPending}
            onChange={handleContent}
          />
          <div className="label">
            <span className="label-text-alt" />
            <span className="label-text-alt">{content.length}/1024</span>
          </div>
        </label>
        {images.length ? (
          <div className="carousel carousel-center w-full space-x-4 rounded-box bg-neutral p-4">
            {images.map((image, index) => (
              <div
                className="carousel-item relative size-24 rounded-box bg-base-100"
                key={index}
              >
                <button
                  type="button"
                  className="btn btn-circle btn-xs absolute right-2 top-2 opacity-80"
                  onClick={() => handleRemoveImage(index)}
                  disabled={isPending}
                >
                  <XMarkIcon className="size-4" />
                </button>
                <Image
                  src={image}
                  alt={`Preview upload comment image ${index + 1}`}
                  className="rounded-box object-cover"
                  width={96}
                  height={96}
                />
              </div>
            ))}
          </div>
        ) : null}
        {![100, 200].includes(state.status) ? (
          <div
            role="alert"
            className={`alert ${state.status === 500 ? "alert-error" : "alert-warning"}`}
          >
            {state.status === 500 ? (
              <XCircleIcon className="size-5" />
            ) : (
              <ExclamationTriangleIcon className="size-5" />
            )}
            <span>{state.message}</span>
          </div>
        ) : null}
        <div className="flex items-center justify-between gap-4">
          <div className="flex gap-2">
            <div className="tooltip" data-tip="Add Images">
              <label
                className={`btn btn-circle ${isPending ? "btn-disabled" : ""}`}
              >
                <input
                  type="file"
                  accept="image/*"
                  name="images"
                  multiple
                  hidden
                  ref={imagesRef}
                  disabled={isPending}
                  onChange={handleAddImages}
                />
                <PhotoIcon className="size-5" />
              </label>
            </div>
            <div className="tooltip" data-tip="Serious Content (NSFW)">
              <label
                className={`btn btn-circle ${isPending ? "btn-disabled" : ""} ${NSFW ? "btn-active" : ""}`}
              >
                <input
                  type="checkbox"
                  name="nsfw"
                  hidden
                  value={NSFW}
                  disabled={isPending}
                  onChange={handleNSFW}
                />
                <ExclamationCircleIcon className="size-5" />
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-spinner" />}
            Comment
          </button>
        </div>
      </div>
    </form>
  );
}
