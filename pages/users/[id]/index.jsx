import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useContext, Fragment, useEffect } from "react";
import useSWR, { SWRConfig } from "swr";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeSlashIcon,
  FunnelIcon,
  MapPinIcon,
  PencilIcon,
  PencilSquareIcon,
  TagIcon,
  UserGroupIcon,
  UserIcon,
  UsersIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { allCountries } from "country-region-data";

import { CircleTall } from "@/components/circle";
import { NotFound, Empty } from "@/components/error";
import { PostTall } from "@/components/post";
import { CommentTall } from "@/components/comments";

import { SessionContext } from "@/contexts/session";

import { createClient } from "@/utils/supabase/component";
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
            imagesSource={post.images[0].source}
            imagesAlternate={post.images[0].alternate}
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
  const supabase = createClient();
  const session = useContext(SessionContext);

  const { data: user } = useSWR(`/api/v1/users/${router.query.id}`);
  const { data: followers } = useSWR(
    `/api/v1/users/${router.query.id}/followers`,
  );
  const { data: following } = useSWR(
    `/api/v1/users/${router.query.id}/following`,
  );

  const [active, setActive] = useState(0);
  const [cover, setCover] = useState(user.cover_url || "");
  const [avatar, setAvatar] = useState(user.avatar_url || "");
  const [copied, setCopied] = useState(false);
  const [nickname, setNickname] = useState(
    user.nickname || session?.user.raw_metadata?.nickname || "",
  );
  const [pronoun, setPronoun] = useState(user.pronouns || "Do not specified");
  const [country, setCountry] = useState(user.country || "Do not specified");
  const [signature, setSignature] = useState(user.signature || "");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

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
  const maxNicknameLength = 20;
  const pronouns = [
    {
      name: "He/Him",
      value: "He/Him",
    },
    {
      name: "She/Her",
      value: "She/Her",
    },
    {
      name: "They/Them",
      value: "They/Them",
    },
  ];
  const maxSignatureLength = 256;

  const handleCopyUID = () => {
    navigator.clipboard.writeText(user.id);
    setCopied(true);
  };
  const handleShowEditProfileModal = () => {
    document.getElementById("user-edit-profile-modal").showModal();
  };
  const handleUpdateProfile = async () => {
    let newCoverURL = null,
      newAvatarURL = null;
    const updateStatus = (isLoading, type, message) => {
      setLoading(isLoading);
      setStatus({ type: type, message: message });
      setTimeout(() => setStatus({ type: "", message: "" }), 3000);
    };

    updateStatus(true, "", "");

    // Upload and download user cover and avatar to storage
    if (cover !== user.cover_url) {
      const { error: coverUploadError } = await supabase.storage
        .from("users")
        .upload(`${session.user.id}/cover.png`, cover, {
          upsert: true,
        });

      if (coverUploadError) updateStatus(false, "error", coverUploadError);

      const { data: coverDownloadData, error: coverDownloadError } =
        await supabase.storage
          .from("users")
          .getPublicUrl(`${session.user.id}/cover.png`);

      if (coverDownloadError) updateStatus(false, "error", coverDownloadError);

      newCoverURL = coverDownloadData.publicUrl;
    }
    if (avatar !== user.avatar_url) {
      const { error: avatarUploadError } = await supabase.storage
        .from("users")
        .upload(`${session.user.id}/avatar.png`, avatar, {
          upsert: true,
        });

      if (avatarUploadError) updateStatus(false, "error", avatarUploadError);

      const { data: avatarDownloadData, error: avatarDownloadError } =
        await supabase.storage
          .from("users")
          .getPublicUrl(`${session.user.id}/avatar.png`, {
            transform: {
              width: 100,
              height: 100,
            },
          });

      if (avatarDownloadError)
        updateStatus(false, "error", avatarDownloadError);

      newAvatarURL = avatarDownloadData.publicUrl;
    }

    // Update user profile to database
    const { error: userUpdateError } = await supabase
      .from("users")
      .update({
        cover_url: newCoverURL || cover,
        avatar_url: newAvatarURL || avatar,
        nickname: nickname,
        pronouns: pronoun,
        country: country,
        signature: signature,
      })
      .eq("id", session.user.id);

    if (userUpdateError) updateStatus(false, "error", userUpdateError);
    updateStatus(false, "success", "");
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
            <NotFound description={user.message} error={user.error} />
          </div>
        </div>
      ) : (
        <div className="container relative mx-auto min-h-screen">
          <div
            className="hero h-72 overflow-clip rounded-2xl bg-base-300 bg-fixed bg-no-repeat"
            style={{
              backgroundImage: `url(${user.cover_url || "/assets/images/random-shapes.svg"})`,
            }}
          >
            <div className="hero-overlay bg-opacity-0 bg-gradient-to-b from-transparent to-base-300" />
          </div>
          <div className="absolute top-56 grid w-full grid-cols-2 justify-between px-12">
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
                <>
                  <button className="btn" onClick={handleShowEditProfileModal}>
                    Edit Profile
                  </button>
                  <dialog
                    id="user-edit-profile-modal"
                    className="modal text-start"
                  >
                    <div className="modal-box space-y-4 text-center">
                      <h3 className="text-left text-lg font-bold">Profile</h3>
                      <p className="text-left">
                        Some changes to the information may take a few minutes.
                      </p>
                      <div
                        className="hero h-40 overflow-clip rounded-box bg-base-300"
                        style={{
                          backgroundImage: `url(${cover || "/assets/images/random-shapes.svg"})`,
                        }}
                      >
                        <div className="hero-overlay bg-opacity-60" />
                        <div className="hero-content text-center text-neutral-content">
                          <label className="btn btn-circle">
                            <input
                              type="file"
                              onChange={(event) =>
                                setCover(
                                  URL.createObjectURL(event.target.files[0]),
                                )
                              }
                              accept="image/*"
                              hidden
                            />
                            <PencilSquareIcon className="size-4" />
                          </label>
                        </div>
                      </div>
                      <div className={`avatar ${avatar ? "" : "placeholder"}`}>
                        <div
                          className={`w-20 rounded-full ${avatar ? "" : "bg-neutral text-neutral-content"}`}
                        >
                          {avatar ? (
                            <Image
                              src={avatar}
                              alt={user.nickname}
                              width={80}
                              height={80}
                            />
                          ) : (
                            <span className="text-3xl">
                              {user.nickname.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="join">
                          <label className="btn btn-primary">
                            <input
                              type="file"
                              onChange={(event) =>
                                setAvatar(
                                  URL.createObjectURL(event.target.files[0]),
                                )
                              }
                              className="file-input join-item file-input-bordered w-full max-w-xs"
                              accept="image/*"
                              hidden
                            />
                            Change Avatar
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text flex items-center gap-1">
                              <TagIcon className="size-4" />
                              Nickname
                            </span>
                          </div>
                          <input
                            type="text"
                            placeholder="Type your nickname here"
                            className="input input-bordered w-full"
                            value={nickname}
                            onChange={(event) =>
                              setNickname(event.target.value)
                            }
                            maxLength={maxNicknameLength}
                          />
                          <div className="label">
                            <span className="label-text-alt" />
                            <span className="label-text-alt">
                              {maxNicknameLength - nickname.length} /{" "}
                              {maxNicknameLength}
                            </span>
                          </div>
                        </label>
                        <label className="form-control w-full">
                          <div className="label">
                            <span className="label-text flex items-center gap-1">
                              <UserIcon className="size-4" />
                              Pronouns
                            </span>
                          </div>
                          <select
                            className="select select-bordered"
                            value={pronoun}
                            onChange={(event) => setPronoun(event.target.value)}
                          >
                            <option value="Do not specified">
                              Don&apos;t specified
                            </option>
                            {pronouns.map((pronoun, index) => (
                              <option value={pronoun.value} key={index}>
                                {pronoun.name}
                              </option>
                            ))}
                            <option value="Custom">Custom</option>
                          </select>
                        </label>
                      </div>
                      <label className="form-control w-full">
                        <div className="label">
                          <span className="label-text flex items-center gap-1">
                            <MapPinIcon className="size-4" />
                            Country
                          </span>
                        </div>
                        <select
                          className="select select-bordered"
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                        >
                          <option value="Do not specified">
                            Don&apos;t specified
                          </option>
                          {allCountries.map((country, index) => (
                            <option
                              value={country[1].toLowerCase()}
                              key={index}
                            >
                              {country[0]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="form-control">
                        <div className="label">
                          <span className="label-text flex items-center gap-1">
                            <PencilIcon className="size-4" />
                            Signature
                          </span>
                        </div>
                        <textarea
                          className="textarea textarea-bordered h-24"
                          placeholder="Type your signature here"
                          value={signature}
                          onChange={(event) => setSignature(event.target.value)}
                          maxLength={maxSignatureLength}
                        />
                        <div className="label">
                          <span className="label-text-alt" />
                          <span className="label-text-alt">
                            {maxSignatureLength - signature.length} /{" "}
                            {maxSignatureLength}
                          </span>
                        </div>
                      </label>
                      {status.type && status.message && (
                        <div
                          role="alert"
                          className={`alert alert-${status.type}`}
                        >
                          {status.type === "error" ? (
                            <XCircleIcon className="size-6 shrink-0 stroke-current" />
                          ) : (
                            status.type === "warning" && (
                              <ExclamationTriangleIcon className="size-6 shrink-0 stroke-current" />
                            )
                          )}
                          <span>{status.message}</span>
                        </div>
                      )}
                      <p>
                        You can change visibility your information on{" "}
                        <button className="link link-primary">privacy</button>{" "}
                        settings.
                      </p>
                      <div className="modal-action justify-center">
                        <button
                          className="btn btn-primary"
                          disable={loading}
                          onClick={handleUpdateProfile}
                        >
                          {loading ? (
                            <span className="loading loading-spinner" />
                          ) : status.type === "success" ? (
                            <CheckCircleIcon className="size-5" />
                          ) : status.type === "error" ? (
                            <XCircleIcon className="size-5" />
                          ) : (
                            status.type === "warning" && (
                              <ExclamationTriangleIcon className="size-5" />
                            )
                          )}{" "}
                          Update
                        </button>
                        <form method="dialog">
                          <button className="btn btn-outline btn-primary">
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </>
              ) : (
                <button
                  className="btn"
                  onClick={() =>
                    session
                      ? null
                      : document.getElementById("auth-sign-in").showModal()
                  }
                >
                  Follow
                </button>
              )}
            </div>
          </div>
          <div className="space-y-4 p-12">
            <div className="flex gap-2">
              <Link
                href={`/users/${session?.user.id}/followers`}
                className="badge badge-primary badge-lg gap-2 border-none pl-0"
              >
                <div className="badge badge-lg gap-2">
                  <UserGroupIcon className="size-4" /> Followers
                </div>
                {followers.length || 0}
              </Link>
              <Link
                href={`/users/${session?.user.id}/following`}
                className="badge badge-primary badge-lg gap-2 border-none pl-0"
              >
                <div className="badge badge-lg gap-2">
                  <UsersIcon className="size-4" /> Following
                </div>
                {following.length || 0}
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
                          className={
                            "tab space-x-2" +
                            (active === index ? " tab-active" : "")
                          }
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
                            className={
                              active === index ? "tab tab-active" : "tab"
                            }
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
