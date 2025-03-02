"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useRef } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  FlagIcon,
  PhotoIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

import ViewButton from "./buttons/view";
import LikeButton from "./buttons/like";
import CommentButton from "./buttons/comment";
import ShareButton from "./buttons/share";
import { Avatar } from "./user";
import { FollowButton, UnfollowButton } from "./buttons/follow";

import { timeSince } from "@/utils";
import { ImagesViewer } from "./modals/viewer";

export function CommentTall({
  postID,
  postImageSource,
  postImageAlternate,
  postTitle,
  postContent,
  commentID,
  commentContent,
}) {
  return (
    <Link
      href={`/posts/${postID}?cid=${commentID}`}
      className="card bg-base-200"
    >
      <div className="card-body p-5">
        <p>{commentContent}</p>
        <div className="card flex-row bg-base-300">
          {postImageSource && (
            <figure className="py-5 pl-5">
              <Image
                className="rounded-xl"
                src={postImageSource}
                alt={postImageAlternate}
                width={100}
                height={100}
              />
            </figure>
          )}
          <div className="card-body flex-row p-5">
            <div className="flex-1">
              <h3 className="card-title">{postTitle}</h3>
              <p>{postContent}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Comment({
  user,
  postID,
  commentData,
  userViewsData,
  userLikesData,
  userCommentsData,
  userFollowingData,
  sharePath,
  shareFacebookHashtag,
  shareXHashtags,
  isPreview,
  isParent,
}) {
  const ref = useRef();

  const handleShowImagesViewer = () => {
    if (ref.current) ref.current.showModal();
  };
  const hasViewed = userViewsData?.some(
    (view) => view.comment?.id === commentData.id,
  );
  const hasLiked = userLikesData?.some(
    (like) => like.comment?.id === commentData.id,
  );
  const hasCommented = userCommentsData?.some(
    (comment) => comment.comment?.id === commentData.id,
  );
  const hasFollowedWriter = userFollowingData?.some(
    (follow) => follow.user.id === commentData.writer.id,
  );

  return (
    <div
      id={`comment-${commentData.id}`}
      className={`card space-y-4 ${isParent ? "bg-base-200" : "bg-base-100"} p-4`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar
            avatarURL={commentData.writer.avatar_url}
            nickname={commentData.writer.nickname}
            fallbackSizeClass="size-10"
            height={40}
            width={40}
          />
          <div>
            <h4
              className={`font-bold ${commentData.writer.role?.toLowerCase() === "admin" ? "text-secondary" : ""}`}
            >
              {commentData.writer.nickname}
            </h4>
            <time
              className="text-sm"
              dateTime={new Date(commentData.created_at).toISOString()}
              suppressHydrationWarning
            >
              {timeSince(commentData.created_at)}
            </time>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user ? (
            user.id !== commentData.writer.id ? (
              !hasFollowedWriter && (
                <FollowButton
                  user={user}
                  followID={commentData.writer.id}
                  buttonClass="btn btn-primary btn-sm"
                />
              )
            ) : (
              <form>
                <button className="btn btn-primary btn-sm">Edit</button>
              </form>
            )
          ) : (
            <Link
              href="/sign-in"
              className="btn btn-primary btn-sm rounded-xl md:btn-md"
            >
              Follow
            </Link>
          )}
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-primary btn-sm"
            >
              <EllipsisVerticalIcon className="size-5" />
            </div>
            <ul
              tabIndex={0}
              className={`menu dropdown-content z-[1] mt-1 w-52 rounded-box ${isParent ? "bg-base-100" : "bg-base-200"} p-2 shadow`}
            >
              {user?.id !== commentData.writer.id
                ? hasFollowedWriter && (
                    <li>
                      <UnfollowButton
                        user={user}
                        followID={commentData.writer.id}
                        buttonClass="inline-flex gap-2"
                      />
                    </li>
                  )
                : null}
              {user?.id === commentData.writer.id ? (
                <li>
                  <button type="button" className="text-error">
                    <TrashIcon className="size-5" />
                    Delete this comment
                  </button>
                </li>
              ) : null}
              {user?.id !== commentData.writer.id ? (
                <li>
                  <button type="button">
                    <FlagIcon className="size-5" />
                    Report this comment
                  </button>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
      <p>{commentData.content}</p>
      {commentData.images ? (
        <>
          <div
            className={`badge ${isParent ? "badge-neutral" : "badge-ghost"} badge-lg w-full gap-2`}
          >
            <PhotoIcon className="size-5" />
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(commentData.images.length)}{" "}
            Photos
          </div>
          {isPreview ? (
            <>
              <div className="grid grid-cols-4 gap-4">
                {commentData.images.map(
                  (image, index) =>
                    index < 4 && (
                      <Link
                        className="flex relative aspect-square items-center justify-center rounded-box bg-base-100"
                        href={`/#comment-${commentData.id}-image-${index + 1}`}
                        onClick={handleShowImagesViewer}
                        key={index}
                      >
                        <Image
                          className="w-full rounded-box object-cover"
                          src={image.source}
                          alt={image.alternate || `Preview comment image ${index + 1}`}
                          fill
                        />
                      </Link>
                    ),
                )}
              </div>
              <ImagesViewer
                className="!mt-0"
                id={`comment-${commentData.id}`}
                images={commentData.images}
                ref={ref}
              />
            </>
          ) : (
            <>
              <div className="carousel w-full overflow-clip rounded-lg">
                {commentData.images.map((image, index) => (
                  <div
                    id={`post-${commentData.id}-image-${index + 1}`}
                    className="carousel-item relative w-full"
                    key={index}
                  >
                    <Image
                      className="w-full cursor-pointer"
                      src={image.source}
                      alt={image.alternate || `Preview comment image ${index + 1}`}
                      quality={100}
                      width={1920}
                      height={1080}
                      onClick={handleShowImagesViewer}
                    />
                    <ImagesViewer
                      className="!mt-0"
                      id={`post-${commentData.id}`}
                      images={commentData.images}
                      ref={ref}
                    />
                    <div className="absolute inset-x-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                      <Link
                        href={`#post-${commentData.id}-image-${!index ? commentData.images.length : index + 1}`}
                        className="btn btn-circle"
                      >
                        <ChevronLeftIcon className="size-5" />
                      </Link>
                      <Link
                        href={`#post-${commentData.id}-image-${index + 1 === commentData.images.length ? index + 1 : index + 2}`}
                        className="btn btn-circle"
                      >
                        <ChevronRightIcon className="size-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-center gap-2 py-2">
                {commentData.images.map((_image, index) => (
                  <a
                    href={`#post-${commentData.id}-image-${index + 1}`}
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
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2">
          <ViewButton
            viewCount={commentData.view_count}
            hasViewed={hasViewed}
            isCompact
            showCount
          />
        </div>
        <div className="flex items-center gap-2">
          <LikeButton
            user={user}
            postID={postID}
            likeCount={commentData.like_count}
            hasLiked={hasLiked}
            isCompact
            showCount
          />
        </div>
        <div className="flex items-center gap-2">
          <CommentButton
            postID={postID}
            commentCount={commentData.comment_count}
            hasCommented={hasCommented}
            isCompact
            showCount
          />
        </div>
        <div className="flex items-center gap-2">
          <ShareButton
            user={user}
            postID={postID}
            sharePath={sharePath}
            facebookHashtag={shareFacebookHashtag}
            shareXHashtags={shareXHashtags}
            isCompact
            showCount
          />
        </div>
      </div>
      {commentData.replies?.length ? (
        <div className="space-y-4">
          {commentData.replies.map((reply, index) => (
            <Fragment key={index}>
              <Comment
                user={user}
                postID={postID}
                commentData={reply}
                userViewsData={userViewsData}
                userLikesData={userLikesData}
                userCommentsData={userCommentsData}
                userFollowingData={userFollowingData}
              />
              {commentData.length >= 5 ? (
                <button type="button" className="btn btn-primary btn-sm">
                  View More ...
                </button>
              ) : (
                ""
              )}
            </Fragment>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function CommentPlaceholder() {
  return <></>;
}
