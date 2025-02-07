"use client";
import { useState, useEffect, useTransition } from "react";
import {
  XMarkIcon,
  Bars2Icon,
  XCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { InputContentEditor } from "@/components/editor";

import { getCircles } from "@/lib/queries/circles";
import { postAction } from "@/lib/actions/post";
import { Section } from "@/components/section";

export default function CreatePost() {
  const [circles, setCircles] = useState([]);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [circle, setCircle] = useState();
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

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

  const submitAction = (formData) => {
    startTransition(async () => {
      const status = await postAction(formData, content, tags);

      setStatus(status);

      if (status.type === "success") {
        setStatus(null);
      }
    });
  };

  const addTag = (event) => {
    if (event.key === "Enter" && event.target.value) {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTag = (at) => {
    const newTags = tags.filter((_, index) => index !== at);
    setTags(newTags);
  };

  useEffect(() => {
    const fetchCircles = async () => {
      const circles = await getCircles("id, name");
      setCircles(circles);
    };
    fetchCircles();
  }, []);

  return (
    <>
      <Section
        Icon={Bars2Icon}
        title="Create Post"
        description="Create new post."
      />
      <form className="space-y-4" action={submitAction}>
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
        <InputContentEditor setState={setContent} disabled={isPending} />
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
              <option disabled>
                Select Community
              </option>
              {circles.map((circle) => (
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
              onKeyDown={addTag}
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
                    <button onClick={() => removeTag(index)}>
                      <XMarkIcon className="size-4" />
                    </button>
                  </span>
                ))}
              </span>
            </div>
          </label>
        </div>
        {status?.message && (
          <div
            role="alert"
            className={`alert alert-${status.type === "error" ? "danger" : status.type}`}
          >
            {status.type === "error" ? (
              <XCircleIcon className="size-6" />
            ) : status.type === "warning" ? (
              <ExclamationTriangleIcon className="size-6" />
            ) : (
              <InformationCircleIcon className="size-6" />
            )}
            <span>{status.message}</span>
          </div>
        )}
        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={!title || !content || isPending}
        >
          {isPending && <span className="loading loading-spinner" />} Post
        </button>
      </form>
    </>
  );
}
