"use client";
import { useState, useCallback, Fragment } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { EyeSlashIcon, FunnelIcon } from "@heroicons/react/24/outline";

import { setSearchParamsString } from "@/utils";

import { UserTabCircles } from "./circles";
import { UserTabComments } from "./comments";
import { UserTabLikes } from "./likes";
import { UserTabPosts } from "./posts";
import { UserTabReports } from "./reports";
import { UserTabViews } from "./views";

export function UserTabs({ user, profile }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");

  const [active, setActive] = useState(tab ?? "circles");

  const tabOptions = [
    {
      name: "Circles",
      value: "circles",
      private: false,
      content: UserTabCircles,
    },
    {
      name: "Posts",
      value: "posts",
      private: false,
      content: UserTabPosts,
    },
    {
      name: "Views",
      value: "views",
      private: true,
      content: UserTabViews,
    },
    {
      name: "Likes",
      value: "likes",
      private: false,
      content: UserTabLikes,
    },
    {
      name: "Comments",
      value: "comments",
      private: false,
      content: UserTabComments,
    },
    {
      name: "Reports",
      value: "reports",
      private: true,
      content: UserTabReports,
    },
  ];

  const createQueryString = useCallback(
    (name, value) => setSearchParamsString(searchParams, name, value),
    [searchParams],
  );
  const handleActiveTab = (tab) => {
    router.push(`${pathname}?${createQueryString("tab", tab)}`, {
      scroll: false,
    });
    setActive(tab);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div role="tablist" className="tabs-boxed tabs">
          {tabOptions.map((option, index) => (
            <Fragment key={index}>
              {option.private && user?.id === profile.id ? (
                <button
                  type="button"
                  role="tab"
                  className={`tab space-x-2 ${active === option.value ? "tab-active" : ""}`}
                  onClick={() => handleActiveTab(option.value)}
                >
                  <EyeSlashIcon className="size-5" /> <span>{option.name}</span>
                </button>
              ) : (
                !option.private && (
                  <button
                    type="button"
                    role="tab"
                    className={`tab ${active === option.value ? "tab-active" : ""}`}
                    onClick={() => handleActiveTab(option.value)}
                  >
                    {option.name}
                  </button>
                )
              )}
            </Fragment>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="badge badge-lg gap-2 border-none pl-0">
            <div className="badge badge-primary badge-lg gap-2">
              {profile[
                tabOptions.find((option) => option.value === active).value
              ]?.length || 0}
            </div>
            {tabOptions.find((option) => option.value === active).name}
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle btn-sm">
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
        {tabOptions.map((option, index) => (
          <Fragment key={index}>
            <input
              type="radio"
              className={active === option.value ? "tab-active" : ""}
              name="user-content-tabs"
              hidden
            />
            <div
              role="tabpanel"
              className="tab-content space-y-6 !rounded-box border-base-300 bg-base-100 p-6"
            >
              <option.content profile={profile} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
