"use client"
import { useState, Fragment } from "react";
import { EyeSlashIcon, FunnelIcon } from "@heroicons/react/24/outline";

import { UserTabCircles } from "./circles";
import { UserTabComments } from "./comments";
import { UserTabLikes } from "./likes";
import { UserTabPosts } from "./posts";
import { UserTabReports } from "./reports";
import { UserTabViews } from "./views";

export function UserTabs({ user, profile }) {
  const [active, setActive] = useState(0);

  const tabs = [
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div role="tablist" className="tabs-boxed tabs">
          {tabs.map((tab, index) => (
            <Fragment key={index}>
              {tab.private && user?.id === profile.id ? (
                <button
                  type="button"
                  role="tab"
                  className={`tab space-x-2 ${active === index ? "tab-active" : ""}`}
                  onClick={() => setActive(index)}
                >
                  <EyeSlashIcon className="size-5" /> <span>{tab.name}</span>
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
          {tabs[active].private && user?.id === profile.id ? (
            <div className="badge badge-lg gap-2 border-none pl-0">
              <div className="badge badge-primary badge-lg gap-2">
                {profile[tabs[active].value]?.length || 0}
              </div>
              {tabs[active].name}
            </div>
          ) : (
            !tabs[active].private && (
              <div className="badge badge-lg gap-2 border-none pl-0">
                <div className="badge badge-primary badge-lg gap-2">
                  {profile[tabs[active].value]?.length || 0}
                </div>
                {tabs[active].name}
              </div>
            )
          )}
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
              <tab.content profile={profile} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
