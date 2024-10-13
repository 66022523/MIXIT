"use client";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  EllipsisVerticalIcon,
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  ShareIcon,
  HeartIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";

import { TagPill, TagPillPlaceholder } from "./tag";

import { ImagesViewer } from "./modals/viewer";

import { updateLikeAction } from "@/lib/actions/post";

import { timeSince } from "@/utils";

export function PostTall({
  id,
  imagesSource,
  imagesAlternate,
  title,
  content,
}) {
  return (
    <div className="card flex-row bg-base-200">
      {imagesSource && (
        <figure className="py-5 pl-5">
          <Image
            className="rounded-xl"
            src={imagesSource}
            alt={imagesAlternate}
            width={100}
            height={100}
          />
        </figure>
      )}
      <div className="card-body flex-row p-5">
        <div className="flex-1">
          <h2 className="card-title">{title}</h2>
          <p>{content}</p>
        </div>
        <div className="card-actions items-center">
          <Link href={`/posts/${id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Post({
  user,
  id,
  createdAt,
  title,
  content,
  tags,
  images,
  views,
  likes,
  comments,
  shares,
  writerID,
  writerAvatarURL,
  writerNickname,
  writerRole,
  circleID,
  circleIconURL,
  circleName,
  isEnded,
  isPreview,
}) {
  const ref = useRef();
  const router = useRouter();
  const [liked, setLiked] = useState({
    active: likes?.some((like) => like.user?.id === user?.id),
    count: likes?.length || 0,
  });

  const handleShowImagesViewer = () => {
    if (ref.current) ref.current.showModal();
  };
  const handleLike = async () => {
    if (!user) return router.push("/sign-in");

    setLiked((like) => ({
      active: !like.active,
      count: like.active ? --like.count : ++like.count,
    }));

    const response = await updateLikeAction(id, likes, user);

    if (response.error) {
      setLiked((like) => ({
        active: !like.active,
        count: like.active ? --like.count : ++like.count,
      }));
      return console.log(response);
    }
  };
  const handleComment = () => {
    if (!user) return router.push("/sign-in");
  };
  const handleShare = () => {};

  return (
    <>
      <div className="card">
        <div className="card-body space-y-4">
          <div className="flex justify-between">
            <Link
              href={`/users/${writerID}`}
              className="flex items-center gap-2"
            >
              <div className={`avatar ${writerAvatarURL ? "" : "placeholder"}`}>
                <div
                  className={`size-12 rounded-full ${writerAvatarURL ? "" : "bg-neutral text-neutral-content"}`}
                >
                  {writerAvatarURL ? (
                    <Image
                      alt={writerNickname}
                      src={writerAvatarURL}
                      width={48}
                      height={48}
                    />
                  ) : (
                    <span>{writerNickname?.charAt(0)}</span>
                  )}
                </div>
              </div>
              <div>
                <h4
                  className={`font-bold ${writerRole?.toLowerCase() === "admin" ? "text-secondary" : ""}`}
                >
                  {writerNickname}
                </h4>
                <time
                  className="text-sm"
                  dateTime={new Date(createdAt).toISOString()}
                  suppressHydrationWarning
                >
                  {timeSince(createdAt)}
                </time>
              </div>
            </Link>
            <div className="flex items-center gap-2">
              <button className="btn btn-primary btn-sm rounded-xl md:btn-md">
                Follow
              </button>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-circle btn-primary btn-sm md:btn-md"
                >
                  <EllipsisVerticalIcon className="size-5" />
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-200 p-2 shadow"
                >
                  <li>
                    <a>
                      <FlagIcon className="size-5" />
                      Report this post
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {isPreview ? (
            <Link href={`/posts/${id}`}>
              <h1 className="card-title text-2xl">{title}</h1>
              <div
                className="line-clamp-6"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </Link>
          ) : (
            <div>
              <h1 className="card-title text-2xl">{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          )}
          {circleID || tags?.length ? (
            <div className="flex flex-wrap gap-2">
              {circleID && (
                <TagPill
                  isHeader={true}
                  iconURL={circleIconURL}
                  name={circleName}
                  url={`/circles/${circleID}`}
                />
              )}
              {tags?.map((tag, index) => (
                <TagPill name={tag.name} url={`/tags/${tag.id}`} key={index} />
              ))}
            </div>
          ) : null}
          {images && (
            <>
              <div className="columns-3xs gap-4 space-y-4">
                {images.map(
                  (image, index) =>
                    index < 4 && (
                      <div onClick={handleShowImagesViewer} key={index}>
                        <Link href={`/#post-${id}-image-${index + 1}`}>
                          <Image
                            className={`${index === 0 || index === 3 ? "aspect-video" : "aspect-square"} w-full rounded-box object-cover`}
                            src={image.source}
                            alt={image.alternate}
                            width={1280}
                            height={720}
                          />
                        </Link>
                      </div>
                    ),
                )}
              </div>
              <ImagesViewer
                className="!mt-0"
                id={`post-${id}`}
                images={images}
                ref={ref}
              />
            </>
          )}
          <div className="grid grid-cols-4 gap-2">
            <div className="flex items-center justify-center gap-2 text-sm">
              <button
                className={`btn btn-disabled btn-circle btn-sm md:btn-md ${views?.find((view) => view.user.id === user?.id) ? "btn-active" : "btn-outline"}`}
              >
                <EyeIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(views?.length || 0)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button
                className={`btn btn-circle btn-error btn-sm md:btn-md ${liked.active ? "btn-active" : "btn-outline"}`}
                onClick={handleLike}
              >
                <HeartIcon
                  className={`size-5 ${liked.active ? "fill-error-content" : ""}`}
                />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(liked.count)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button
                className={`btn btn-circle btn-primary btn-sm md:btn-md ${comments?.find((comment) => comment.writer_id === user?.id) ? "btn-active" : "btn-outline"}`}
                onClick={handleComment}
              >
                <ChatBubbleBottomCenterIcon
                  className={`size-5 ${comments?.find((comment) => comment.writer_id === user?.id) ? "fill-primary-content" : ""}`}
                />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(comments?.length || 0)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button
                className="btn btn-circle btn-outline btn-primary btn-sm md:btn-md"
                onClick={handleShare}
              >
                <ShareIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(shares?.length || 0)}
            </div>
          </div>
        </div>
      </div>
      {!isEnded && <div className="divider" />}
    </>
  );
}

export function PostPlaceholder({ skeleton, isEnded }) {
  return (
    <>
      <div className="card">
        <div className="card-body space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`size-16 shrink-0 rounded-full ${skeleton ? "skeleton" : "bg-base-300"}`}
            />
            <div className="flex flex-col gap-2">
              <div
                className={`h-4 w-20 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
              <div
                className={`h-4 w-28 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div
                className={`h-4 w-20 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
              <div
                className={`h-4 w-40 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
              <div
                className={`h-4 w-48 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
              <div
                className={`h-4 w-48 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <TagPillPlaceholder key={index} />
              ))}
            </div>
            <div className="grid grid-cols-1 grid-rows-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  className={`h-32 w-full ${skeleton ? "skeleton" : "rounded-box bg-base-300"}`}
                  key={index}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className={`mx-auto size-12 rounded-full ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
                key={index}
              />
            ))}
          </div>
        </div>
      </div>
      {!isEnded && <div className="divider" />}
    </>
  );
}
