"use client";

import Image from "next/image";
import { useActionState, useState } from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

import { requestCircleAction } from "@/libs/actions/circle";

import { imageToBase64 } from "@/utils";

export default function RequestCircleForm() {
  const [cover, setCover] = useState("");
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [developer, setDeveloper] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("released");
  const [nsfw, setNSFW] = useState(false);

  const [state, formAction, isPending] = useActionState(requestCircleAction, {
    status: 100,
    message: "",
  });

  return (
    <form action={formAction}>
      <div
        className="hero relative z-20 h-80 overflow-clip rounded-box bg-base-300"
        style={{
          backgroundImage: `url(${cover || "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E\""})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <label className="btn btn-circle rounded-full" disabled={isPending}>
            <input
              type="file"
              name="cover"
              accept="image/*"
              hidden
              onChange={async (event) =>
                setCover(await imageToBase64(event.target.files[0]))
              }
            />
            <PencilSquareIcon className="size-4" />
          </label>
          <small>Recommended cover size is 1280x320.</small>
        </div>
      </div>
      <div className="flex items-center gap-4 py-4">
        <div className={`avatar ${icon ? "" : "placeholder"}`}>
          <div
            className={`w-20 rounded-full ${icon ? "" : "bg-neutral text-neutral-content"}`}
          >
            {icon ? (
              <Image src={icon} alt={"Circle"} width={80} height={80} />
            ) : (
              <span className="text-3xl">{"Circle"?.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="join">
          <label className="btn btn-primary" disabled={isPending}>
            <input
              type="file"
              className="file-input join-item file-input-bordered w-full max-w-xs"
              name="icon"
              accept="image/*"
              hidden
              onChange={async (event) =>
                setIcon(await imageToBase64(event.target.files[0]))
              }
            />
            Change Icon
          </label>
        </div>
      </div>
      <div className="flex gap-4">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Name</span>
          </div>
          <input
            type="text"
            placeholder="MIXIT's"
            name="name"
            className="input input-bordered w-full"
            disabled={isPending}
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Link</span>
          </div>
          <input
            type="text"
            placeholder="https://mixit.com"
            name="link"
            className="input input-bordered w-full"
            disabled={isPending}
            value={link}
            onChange={(event) => setLink(event.target.value)}
          />
        </label>
      </div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Developer</span>
        </div>
        <input
          type="text"
          placeholder="MIXIT Teams"
          name="developer"
          className="input input-bordered w-full"
          disabled={isPending}
          value={developer}
          onChange={(event) => setDeveloper(event.target.value)}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text">Description</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="A game community that gathers people from different places together in a single place."
          name="description"
          disabled={isPending}
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text">Status</span>
        </div>
        <select
          className="select select-bordered"
          name="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
          disabled={isPending}
        >
          <option value="released">Released</option>
          <option value="develop">Develop</option>
          <option value="closed">Closed</option>
          <option value="beta">Beta</option>
        </select>
      </label>
      <div className="form-control max-w-xs">
        <label className="label cursor-not-allowed justify-normal gap-2">
          <input
            type="checkbox"
            className="toggle toggle-primary"
            name="nsfw"
            disabled
            value={nsfw}
            onChange={(event) => setNSFW(event.target.value)}
          />
          <span className="label-text">
            <span>Serious Content (NSFW)</span>
            <br />
            <small className="text-gray-400">
              Mark this post as potentially having strong version content.
            </small>
          </span>
        </label>
      </div>
      <p>
        If confirmed, you&apos;ll automatically become an admin of this circle
        and consider you to be a member of this circle.
      </p>
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={isPending}
      >
        Request
      </button>
    </form>
  );
}
