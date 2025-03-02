"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import {
  EllipsisVerticalIcon,
  EyeIcon as EyeOutlineIcon,
  FlagIcon,
  PencilIcon,
  PhotoIcon,
  TrashIcon,
  UserMinusIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

import ViewButton from "./buttons/view";
import LikeButton from "./buttons/like";
import CommentButton from "./buttons/comment";
import ShareButton from "./buttons/share";
import { Avatar } from "./user";
import { FollowButton, UnfollowButton } from "./buttons/follow";
import { ImagesViewer } from "./modals/viewer";
import { TagPill, TagPillPlaceholder } from "./tag";

import { timeSince } from "@/utils";

export function PostTall({ cardClassName, postData, showCount, disabled }) {
  return (
    <div
      className={`card card-compact bg-base-200 lg:card-side ${cardClassName}`}
    >
      {postData.images && (
        <figure className="py-4 pl-4">
          <Image
            className="rounded-xl"
            src={postData.images[0].source}
            alt={postData.images[0].alternate}
            width={100}
            height={100}
          />
        </figure>
      )}
      <div className="card-body flex-row items-center justify-between">
        <div className="line-clamp-2">
          <h2 className="font-bold">{postData.title}</h2>
          <div
            className="whitespace-break-spaces break-all"
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </div>
        <div className="card-actions items-center gap-2">
          {showCount ? (
            <span className="flex items-center gap-2">
              <EyeOutlineIcon className="size-5" />
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(postData.view_count || 0)}
            </span>
          ) : null}
          <Link
            href={`/posts/${postData.id}`}
            className="btn btn-primary"
            disabled={disabled}
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export function Post({
  user,
  postData,
  userViewsData,
  userLikesData,
  userCommentsData,
  userFollowingData,
  sharePath,
  shareFacebookHashtag,
  shareXHashtags,
  showCount,
  isPreview,
  isCompact,
}) {
  const ref = useRef();

  const hasViewed = userViewsData?.some(
    (view) => view.post?.id === postData.id,
  );
  const hasLiked = userLikesData?.some((like) => like.post?.id === postData.id);
  const hasCommented = userCommentsData?.some(
    (comment) => comment.post?.id === postData.id,
  );
  const hasFollowedWriter = userFollowingData?.some(
    (follow) => follow.user.id === postData.writer?.id,
  );

  const handleShowImagesViewer = () => {
    if (ref.current) ref.current.showModal();
  };

  return (
    <>
      <div className="flex justify-between">
        <Link
          href={`/users/${postData.writer.id}`}
          className="flex items-center gap-2"
        >
          <Avatar
            avatarURL={postData.writer.avatar_url}
            nickname={postData.writer.nickname}
          />
          <div>
            <h4
              className={`line-clamp-2 font-bold ${postData.writer.role?.toLowerCase() === "admin" ? "text-secondary" : ""}`}
            >
              {postData.writer.nickname}
            </h4>
            <time
              className="text-sm"
              dateTime={new Date(postData.created_at).toISOString()}
              suppressHydrationWarning
            >
              {timeSince(postData.created_at)}
            </time>
          </div>
        </Link>
        <div className="flex items-center gap-2">
          {!isCompact ? (
            user ? (
              user.id !== postData.writer.id ? (
                !hasFollowedWriter && (
                  <FollowButton
                    user={user}
                    followID={postData.writer.id}
                    buttonClass="btn btn-primary btn-sm rounded-xl md:btn-md"
                  />
                )
              ) : (
                <Link
                  href={`/posts/${postData.id}/edit`}
                  className="btn btn-primary btn-sm rounded-xl md:btn-md"
                >
                  Edit
                </Link>
              )
            ) : (
              <Link
                href="/sign-in"
                className="btn btn-primary btn-sm rounded-xl md:btn-md"
              >
                Follow
              </Link>
            )
          ) : null}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-circle btn-primary btn-sm ${isCompact ? "" : "md:btn-md"}`}
            >
              <EllipsisVerticalIcon className="size-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-200 p-2 shadow"
            >
              {isCompact ? (
                user ? (
                  user.id !== postData.writer.id ? (
                    !hasFollowedWriter && (
                      <li>
                        <FollowButton
                          user={user}
                          followID={postData.writer.id}
                          buttonClass="inline-flex gap-2"
                          label={
                            <>
                              <UserPlusIcon className="size-5" />
                              Follow this user
                            </>
                          }
                        />
                      </li>
                    )
                  ) : (
                    <li>
                      <Link href={`/posts/${postData.id}/edit`}>
                        <PencilIcon className="size-5" />
                        Edit this post
                      </Link>
                    </li>
                  )
                ) : (
                  <li>
                    <Link href="/sign-in">
                      <UserPlusIcon className="size-5" />
                      Follow this user
                    </Link>
                  </li>
                )
              ) : null}
              {user?.id !== postData.writer.id
                ? hasFollowedWriter && (
                    <li>
                      <UnfollowButton
                        user={user}
                        followID={postData.writer.id}
                        buttonClass="inline-flex gap-2"
                        label={
                          <>
                            <UserMinusIcon className="size-5" />
                            Unfollow this user
                          </>
                        }
                      />
                    </li>
                  )
                : null}
              {user?.id === postData.writer.id ? (
                <li>
                  <Link
                    href={`/posts/${postData.id}/delete`}
                    className="text-error"
                  >
                    <TrashIcon className="size-5" />
                    Delete this post
                  </Link>
                </li>
              ) : null}
              {user?.id !== postData.writer.id ? (
                <li>
                  <button type="button">
                    <FlagIcon className="size-5" />
                    Report this post
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      {isPreview ? (
        <Link href={`/posts/${postData.id}`}>
          <h1 className="card-title text-2xl">{postData.title}</h1>
          <div
            className={isCompact ? "line-clamp-2" : "line-clamp-6"}
            dangerouslySetInnerHTML={{ __html: postData.content }}
          />
        </Link>
      ) : (
        <div>
          <h1 className="card-title text-2xl">{postData.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </div>
      )}
      {postData.circle_id || postData.tags?.length ? (
        <div className="flex flex-wrap gap-2">
          {postData.circle_id && (
            <TagPill
              isHeader={true}
              iconURL={postData.circle.icon_url}
              name={postData.circle.name}
              url={`/circles/${postData.circle_id}`}
            />
          )}
          {postData.tags?.map((tag, index) => (
            <TagPill name={tag.name} url={`/tags/${tag.id}`} key={index} />
          ))}
        </div>
      ) : null}
      {postData.images ? (
        <>
          <div className="badge badge-ghost badge-lg w-full gap-2">
            <PhotoIcon className="size-5" />
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(postData.images.length)}{" "}
            Photos
          </div>
          {isPreview ? (
            <>
              <div
                className={`${isCompact ? "grid grid-cols-2" : "columns-3xs space-y-4"} gap-4`}
              >
                {postData.images.map(
                  (image, index) =>
                    index < (isCompact ? 2 : 4) && (
                      <div onClick={handleShowImagesViewer} key={index}>
                        <Link href={`/#post-${postData.id}-image-${index + 1}`}>
                          <Image
                            className={`${isCompact ? "aspect-square" : index === 0 || index === 3 ? "aspect-video" : "aspect-square"} w-full rounded-box object-cover`}
                            src={image.source}
                            alt={
                              image.alternate ||
                              `Preview post image ${index + 1}`
                            }
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
                id={`post-${postData.id}`}
                images={postData.images}
                ref={ref}
              />
            </>
          ) : (
            <>
              <div className="carousel w-full overflow-clip rounded-lg">
                {postData.images.map((image, index) => (
                  <div
                    id={`post-${postData.id}-image-${index + 1}`}
                    className="carousel-item relative w-full"
                    key={index}
                  >
                    <Image
                      className="w-full cursor-pointer"
                      src={image.source}
                      alt={image.alternate || `Preview post image ${index + 1}`}
                      quality={100}
                      width={1920}
                      height={1080}
                      onClick={handleShowImagesViewer}
                    />
                    <ImagesViewer
                      className="!mt-0"
                      id={`post-${postData.id}`}
                      images={postData.images}
                      ref={ref}
                    />
                    <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <Link
                        href={`#post-${postData.id}-image-${!index ? postData.images.length : index + 1}`}
                        className="btn btn-circle"
                      >
                        <ChevronLeftIcon className="size-5" />
                      </Link>
                      <Link
                        href={`#post-${postData.id}-image-${index + 1 === postData.images.length ? index + 1 : index + 2}`}
                        className="btn btn-circle"
                      >
                        <ChevronRightIcon className="size-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-2 py-2">
                {postData.images.map((_image, index) => (
                  <a
                    href={`#post-${postData.id}-image-${index + 1}`}
                    className="btn btn-xs"
                    key={index}
                  >
                    {index + 1}
                  </a>
                ))}
              </div>
            </>
          )}
        </>
      ) : null}
      <div className="grid grid-cols-4 gap-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <ViewButton
            viewCount={postData.view_count}
            hasViewed={hasViewed}
            isCompact={isCompact}
            showCount={showCount}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <LikeButton
            user={user}
            postID={postData.id}
            likeCount={postData.like_count}
            hasLiked={hasLiked}
            isCompact={isCompact}
            showCount={showCount}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <CommentButton
            postID={postData.id}
            commentCount={postData.comment_count}
            hasCommented={hasCommented}
            isCompact={isCompact}
            showCount={showCount}
          />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm">
          <ShareButton
            user={user}
            postID={postData.id}
            sharePath={sharePath}
            facebookHashtag={shareFacebookHashtag}
            shareXHashtags={shareXHashtags}
            isCompact={isCompact}
            showCount={showCount}
          />
        </div>
      </div>
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
