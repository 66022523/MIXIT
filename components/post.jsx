import Image from "next/image";
import Link from "next/link";
import {
  ChatBubbleBottomCenterIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import timeSince from "@/utils/timeSince";

export function Tag({ header, iconURL, name, url }) {
  return (
    <Link
      href={url || ""}
      className={
        "badge link-hover link badge-primary" + (header ? "" : " badge-outline")
      }
    >
      <span className="mr-1">#</span>
      {iconURL && (
        <Image
          className="mr-1 rounded-full"
          src={iconURL}
          alt={name}
          width={16}
          height={16}
        />
      )}
      <span>{name}</span>
    </Link>
  );
}

export default function Posts({ data, end }) {
  const id = data.id;
  const createdAt = data.created_at;
  const title = data.title;
  const content = data.content;
  const tags = data.tags;
  const images = data.images;
  const views = data.views;
  const comments = data.comments;
  const likes = data.likes;
  const shares = data.shares;
  const writer = data.writer;
  const writerID = writer.id;
  const writerAvatarURL = writer.avatar_url;
  const writerNickname = writer.nickname;
  const circle = data.circle;
  const circleID = circle.id;
  const circleIconURL = circle.icon_url;
  const circleName = circle.name;

  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex justify-between">
            <Link href={`/users/${writerID}`} className="flex items-center gap-2">
              <div className="avatar">
                <div className="h-12 w-12 rounded-full">
                  <Image
                    src={writer ? writerAvatarURL : "/favicon.ico"}
                    alt=""
                    width={48}
                    height={48}
                  />
                </div>
              </div>
              <div>
                <h4>{writerNickname}</h4>
                <small>{timeSince(createdAt)}</small>
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
          <div className="py-4">
            <Link href={`/posts/${id}`}>
              <h3 className="card-title">{title}</h3>
              <p>{content}</p>
            </Link>
            <br />
            <div className="flex flex-wrap gap-2">
              <Tag
                header={true}
                iconURL={circleIconURL}
                name={circleName}
                url={`/circles/${circleID}`}
              />
              {tags?.map((tag, index) => (
                <Tag name={tag.name} url={`/tags/${tag.id}`} key={index} />
              ))}
            </div>
            <br />
            <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {images?.map((image, index) => (
                <picture key={index}>
                  <img
                    className="rounded-2xl"
                    src={image.source}
                    alt={image.alternate}
                    width="100%"
                    height="100%"
                  />
                </picture>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex items-center justify-center gap-2 text-sm text-base-content">
              <button className="btn btn-disabled btn-circle btn-sm bg-opacity-20 md:btn-md">
                <EyeIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(views)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className="btn btn-circle btn-error btn-sm bg-opacity-20 text-base-content md:btn-md">
                <HeartIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(likes)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className="btn btn-circle btn-primary btn-sm bg-opacity-20 text-base-content md:btn-md">
                <ChatBubbleBottomCenterIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(comments.length)}
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
              <button className="btn btn-circle btn-primary btn-sm bg-opacity-20 text-base-content md:btn-md">
                <ShareIcon className="size-5" />
              </button>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(shares)}
            </div>
          </div>
        </div>
      </div>
      {!end && <div className="divider" />}
    </>
  );
}
