"use client";

import { ShareIcon } from "@heroicons/react/24/outline";

import { FacebookIcon, RedditIcon, XIcon, EmailIcon } from "../icons";

export default function ShareButton({
  user,
  postID,
  commentID,
  sharePath,
  shareCount = 0,
  facebookHashtag = "#mixit",
  xHashtags = ["#mixit"],
  isCompact,
  showCount,
}) {
  const shareURL = typeof window !== "undefined" ? `${window.location.origin}/${sharePath}` : "";

  // Facebook
  const facebook = new URL("https://www.facebook.com/dialog/share");
  facebook.searchParams.append(
    "app_id",
    process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
  );
  facebook.searchParams.append("display", "popup");
  facebook.searchParams.append("href", shareURL);
  facebook.searchParams.append("hashtag", facebookHashtag);

  // Reddit
  const reddit = new URL("https://www.reddit.com/submit");
  reddit.searchParams.append("url", shareURL);

  // X
  const x = new URL("https://x.com/intent/tweet");
  x.searchParams.append("url", shareURL);
  x.searchParams.append("hashtags", [...xHashtags].join(","));

  // Email
  const email = new URL("mailto:");
  email.searchParams.append("body", shareURL);

  const openInNewWindow = async (url, platform) => {
    const width = 600;
    const height = 400;
    const topCenter = (window.screen.height - height) / 2;
    const leftCenter = (window.screen.width - width) / 2;
    const newWindow = window.open(
      url,
      "_blank",
      [
        "noopener",
        "noreferrer",
        platform !== email ? `width=${width}` : null,
        platform !== email ? `height=${height}` : null,
        platform !== email ? `top=${topCenter}` : null,
        platform !== email ? `left=${leftCenter}` : null,
      ]
        .filter(Boolean)
        .join(","),
    );

    const supabase = await createClient();
    const { error } = await supabase.from("shares").insert({
      user_id: user.id || null,
      post_id: postID || null,
      comment_id: commentID || null,
      platform,
    });

    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className="dropdown dropdown-end dropdown-top">
        <div
          tabIndex={0}
          role="button"
          className={`btn btn-circle btn-outline btn-primary btn-sm ${isCompact ? "" : "md:btn-md"}`}
        >
          <ShareIcon className={isCompact ? "size-4" : "size-5"} />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] mb-1 w-52 rounded-box bg-base-200 p-2 shadow"
        >
          <li>
            <button
              onClick={() => openInNewWindow(facebook.toString(), "facebook")}
              target="_blank"
            >
              <FacebookIcon className="size-8" />
              Facebook
            </button>
          </li>
          <li>
            <button
              onClick={() => openInNewWindow(reddit.toString(), "reddit")}
              target="_blank"
            >
              <RedditIcon className="size-8" />
              Reddit
            </button>
          </li>
          <li>
            <button
              onClick={() => openInNewWindow(x.toString(), "x")}
              target="_blank"
            >
              <XIcon className="size-8" />X
            </button>
          </li>
          <li>
            <button
              onClick={() => openInNewWindow(email.toString(), "email")}
              target="_blank"
            >
              <EmailIcon className="size-8" />
              Email
            </button>
          </li>
        </ul>
      </div>
      {showCount &&
        Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(shareCount)}
    </>
  );
}
