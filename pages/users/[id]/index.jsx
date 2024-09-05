import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, Fragment } from "react";
import useSWR, { SWRConfig } from "swr";
import { EyeSlashIcon, FunnelIcon } from "@heroicons/react/24/outline";
import { UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";

import { CircleTall } from "@/components/circle";
import { NotFound, Empty } from "@/components/content";
import { CommentTall } from "@/components/comments";
import { PostTall } from "@/components/post";

import { SessionContext } from "@/contexts/session";

import { fetcher } from "@/utils/fetcher";

function UserTabCircles() {
  const router = useRouter();
  const { data } = useSWR(`/api/v1/users/${router.query.id}/circles`);

  return (
    <>
      {data?.length ? (
        data.map((circle, index) => (
          <CircleTall
            id={circle.id}
            coverURL={circle.cover_url}
            iconURL={circle.icon_url}
            name={circle.name}
            description={circle.description}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user is not in any circles yet." />
      )}
    </>
  );
}

function UserTabPosts() {
  const router = useRouter();
  const { data } = useSWR(`/api/v1/users/${router.query.id}/posts`);

  return (
    <>
      {data?.length ? (
        data.map((post, index) => (
          <PostTall
            id={post.id}
            imagesSource={post.images?.[0].source}
            imagesAlternate={post.images?.[0].alternate}
            title={post.title}
            content={post.content}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user hasn't posted anything yet." />
      )}
    </>
  );
}

function UserTabViews() {
  const router = useRouter();
  const { data } = useSWR(`/api/v1/users/${router.query.id}/views`);

  return (
    <>
      {data?.length ? (
        data.map((view, index) =>
          view.post ? (
            <PostTall
              id={view.post.id}
              imagesSource={view.post.images[0].source}
              imagesAlternate={view.post.images[0].alternate}
              title={view.post.title}
              content={view.post.content}
              key={index}
            />
          ) : view.comment ? (
            <CommentTall
              postID={view.comment.post.id}
              postImageSource={view.comment.post.images[0].source}
              postImageAlternate={view.comment.post.images[0].alternate}
              postTitle={view.comment.post.title}
              postContent={view.comment.post.content}
              commentID={view.comment.id}
              commentContent={view.comment.content}
              key={index}
            />
          ) : null,
        )
      ) : (
        <Empty description="The user has not visited any content." />
      )}
    </>
  );
}

function UserTabLikes() {
  const router = useRouter();
  const { data } = useSWR(`/api/v1/users/${router.query.id}/likes`);

  return (
    <>
      {data?.length ? (
        data.map((like, index) =>
          like.post ? (
            <PostTall
              id={like.post.id}
              imagesSource={like.post.images[0].source}
              imagesAlternate={like.post.images[0].alternate}
              title={like.post.title}
              content={like.post.content}
              key={index}
            />
          ) : like.comment ? (
            <CommentTall
              postID={like.comment.post.id}
              postImageSource={like.comment.post.images[0].source}
              postImageAlternate={like.comment.post.images[0].alternate}
              postTitle={like.comment.post.title}
              postContent={like.comment.post.content}
              commentID={like.comment.id}
              commentContent={like.comment.content}
              key={index}
            />
          ) : null,
        )
      ) : (
        <Empty description="Users don't have any content of particular interest yet." />
      )}
    </>
  );
}

function UserTabComments() {
  const router = useRouter();
  const { data } = useSWR(`/api/v1/users/${router.query.id}/comments`);

  return (
    <>
      {data?.length ? (
        data.map((comment, index) => (
          <CommentTall
            postID={comment.post.id}
            postImageSource={comment.post.images[0].source}
            postImageAlternate={comment.post.images[0].alternate}
            postTitle={comment.post.title}
            postContent={comment.post.content}
            commentID={comment.id}
            commentContent={comment.content}
            key={index}
          />
        ))
      ) : (
        <Empty description="This user hasn't posted anything yet." />
      )}
    </>
  );
}

function UserTabReports() {
  return <>This feature is under development...</>;
}

function Component() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const { data: user } = useSWR(`/api/v1/users/${router.query.id}`);
  const { data: followers } = useSWR(
    `/api/v1/users/${router.query.id}/followers`,
  );
  const { data: following } = useSWR(
    `/api/v1/users/${router.query.id}/following`,
  );

  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const tabs = [
    {
      name: "Circles",
      value: "circles",
      private: false,
      Component: UserTabCircles,
    },
    {
      name: "Posts",
      value: "posts",
      private: false,
      Component: UserTabPosts,
    },
    {
      name: "Views",
      value: "views",
      private: true,
      Component: UserTabViews,
    },
    {
      name: "Likes",
      value: "likes",
      private: false,
      Component: UserTabLikes,
    },
    {
      name: "Comments",
      value: "comments",
      private: false,
      Component: UserTabComments,
    },
    {
      name: "Reports",
      value: "reports",
      private: true,
      Component: UserTabReports,
    },
  ];

  const handleCopyUID = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
  };
  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <>
      <Head>
        <title>
          {user?.nickname ? `${user.nickname} | MIXIT's` : "MIXIT's"}
        </title>
        <meta
          property="og:title"
          content={user?.nickname ? `${user.nickname} | MIXIT's` : "MIXIT's"}
          key="title"
        />
      </Head>
      {user.error ? (
        <div className="hero h-full">
          <div className="hero-content text-center">
            <NotFound
              iconCenter
              description={user.message}
              error={user.error}
            />
          </div>
        </div>
      ) : (
        <div className="container relative mx-auto min-h-screen">
            <div
              className="hero h-80 overflow-clip rounded-2xl bg-base-300 bg-fixed bg-cover text-base-100"
              style={{
                backgroundImage: `url(${user.cover_url || "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E\""})`,
              }}
            >
              <div className="hero-overlay bg-opacity-0 bg-gradient-to-b from-transparent to-base-300" />
            </div>
          <div className="absolute top-64 grid w-full grid-cols-2 justify-between px-12">
            <div className="flex gap-4">
              <div className={`avatar ${user.avatar_url ? "" : "placeholder"}`}>
                <div
                  className={`w-24 rounded-full ${user.avatar_url ? "" : "bg-neutral text-neutral-content"}`}
                >
                  {user.avatar_url ? (
                    <Image
                      src={user.avatar_url}
                      alt={user.nickname}
                      width={96}
                      height={96}
                    />
                  ) : (
                    user.nickname && (
                      <span className="text-3xl">
                        {user.nickname.charAt(0)}
                      </span>
                    )
                  )}
                </div>
              </div>
              <div>
                <h1 className="font-bold">
                  {user.nickname}{" "}
                  {user.role.toLowerCase() !== "user" && (
                    <span className="badge badge-secondary align-middle">
                      {user.role}
                    </span>
                  )}
                </h1>
                <small>
                  UID:
                  <div
                    className={`tooltip tooltip-right ${copied ? "tooltip-success" : ""}`}
                    data-tip={copied ? "Copied" : "Click to copy"}
                    onMouseLeave={() => setTimeout(() => setCopied(false), 200)}
                  >
                    <button
                      className="btn btn-ghost btn-xs"
                      disabled={!user.id}
                      onClick={handleCopyUID}
                    >
                      {user.id ?? "Unable to fetch UID"}
                    </button>
                  </div>
                </small>
                <p>
                  {user.country && <span className={`fi fi-${user.country}`} />}{" "}
                  {user.signature ?? "No signature"}
                </p>
              </div>
            </div>
            <div className="text-end">
              {session?.user.id === user.id ? (
                <Link href="/settings/profile" className="btn">
                  Edit Profile
                </Link>
              ) : (
                <button
                  className="btn"
                  onClick={() => !session && handleShowSignInModal}
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4 p-12">
            <div className="flex gap-2">
              <Link
                href={`/users/${user.id}/following`}
                className="badge badge-primary badge-lg gap-2 border-none pl-0"
              >
                <div className="badge badge-lg gap-2">
                  <UsersIcon className="size-4" /> Following
                </div>
                {following?.length || 0}
              </Link>
              <Link
                href={`/users/${user.id}/followers`}
                className="badge badge-primary badge-lg gap-2 border-none pl-0"
              >
                <div className="badge badge-lg gap-2">
                  <UserGroupIcon className="size-4" /> Followers
                </div>
                {followers?.length || 0}
              </Link>
            </div>
            <div className="grid auto-cols-max grid-flow-col gap-4">
              <div className="card bg-base-100">
                <div className="card-body flex-row gap-4 p-4">
                  <h2 className="card-title rounded-box bg-base-200 p-4 text-4xl text-primary">
                    {user.level || 0}
                  </h2>
                  <div className="content-center">
                    <p>
                      <b>Experiences</b>: {user.exp || 0} / 200
                    </p>
                    <progress
                      className="progress progress-primary w-56"
                      value={user.exp || 0}
                      max="200"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-col items-center">
                <div className="z-[2] size-20 place-content-center rounded-full bg-primary text-center text-primary-content">
                  1
                </div>
                <div className="z-[1] -ml-10 size-20 place-content-center rounded-full bg-accent text-center text-accent-content">
                  2
                </div>
                <div className="z-0 -ml-10 size-20 place-content-center rounded-full bg-secondary text-center text-secondary-content">
                  3
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div role="tablist" className="tabs-boxed tabs">
                  {tabs.map((tab, index) => (
                    <Fragment key={index}>
                      {tab.private && session?.user.id === user.id ? (
                        <button
                          type="button"
                          role="tab"
                          className={`tab space-x-2 ${active === index ? "tab-active" : ""}`}
                          onClick={() => setActive(index)}
                        >
                          <EyeSlashIcon className="size-5" />{" "}
                          <span>{tab.name}</span>
                        </button>
                      ) : (
                        !tab.private && (
                          <button
                            type="button"
                            role="tab"
                            className={`tab ${active === index ? "tab-active" : ""}`}
                            onClick={() => setActive(index)}
                          >
                            {tab.name}
                          </button>
                        )
                      )}
                    </Fragment>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {tabs[active].private && session?.user.id === user.id ? (
                    <div className="badge badge-lg gap-2 border-none pl-0">
                      <div className="badge badge-primary badge-lg gap-2">
                        {user[tabs[active].value]?.length || 0}
                      </div>
                      {tabs[active].name}
                    </div>
                  ) : (
                    !tabs[active].private && (
                      <div className="badge badge-lg gap-2 border-none pl-0">
                        <div className="badge badge-primary badge-lg gap-2">
                          {user[tabs[active].value]?.length || 0}
                        </div>
                        {tabs[active].name}
                      </div>
                    )
                  )}
                  <div className="dropdown dropdown-end">
                    <div
                      tabIndex={0}
                      role="button"
                      className="btn btn-circle btn-sm"
                    >
                      <FunnelIcon className="size-5" />
                    </div>
                    <ul
                      tabIndex={0}
                      className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-200 p-2 shadow"
                    >
                      <li>
                        <a>Item 1</a>
                      </li>
                      <li>
                        <a>Item 2</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div>
                {tabs.map((tab, index) => (
                  <Fragment key={index}>
                    <input
                      type="radio"
                      className={active === index ? "tab-active" : ""}
                      name="user-content-tabs"
                      hidden
                    />
                    <div
                      role="tabpanel"
                      className="tab-content space-y-6 !rounded-box border-base-300 bg-base-100 p-6"
                    >
                      <tab.Component />
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function User({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}

export async function getServerSideProps(context) {
  const user = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}`,
  );
  const followers = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/followers`,
  );
  const following = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/following`,
  );
  const circles = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/circles`,
  );
  const posts = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/posts`,
  );
  const views = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/views`,
  );
  const likes = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/likes`,
  );
  const comments = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/comments`,
  );

  return {
    props: {
      fallback: {
        [`/api/v1/users/${context.query.id}`]: user,
        [`/api/v1/users/${context.query.id}/followers`]: followers,
        [`/api/v1/users/${context.query.id}/following`]: following,
        [`/api/v1/users/${context.query.id}/circles`]: circles,
        [`/api/v1/users/${context.query.id}/posts`]: posts,
        [`/api/v1/users/${context.query.id}/views`]: views,
        [`/api/v1/users/${context.query.id}/likes`]: likes,
        [`/api/v1/users/${context.query.id}/comments`]: comments,
      },
    },
  };
}
