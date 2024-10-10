import Link from "next/link";
import Image from "next/image";
import {
  PencilIcon,
  BellIcon,
  Bars3BottomRightIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  ChevronRightIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/solid";

import { signOutAction } from "@/lib/actions/auth";

import { Searcher } from "@/components/layouts/navbar/searcher";
import { Themes } from "@/components/layouts/navbar/themes";
import { Favicon } from "@/components/icons";

import { createClient } from "@/utils/supabase/server";

export async function HeaderNavbar() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data: userData } = await supabase
    .from("users")
    .select()
    .eq("id", user?.id)
    .single();

  const pages = [
    {
      name: "Circles",
      href: "/circles",
    },
    {
      name: "Posts",
      href: "/posts",
    },
    {
      name: "Tags",
      href: "/tags",
    },
    {
      name: "Users",
      href: "/users",
    },
  ];

  return (
    <nav className="navbar bg-base-100/80 backdrop-blur-3xl">
      <div className="flex-none">
        <ul className="menu hidden px-1 lg:menu-horizontal">
          {pages.map((page, index) => (
            <li key={index}>
              <Link href={page.href}>{page.name}</Link>
            </li>
          ))}
        </ul>
        <label
          htmlFor="sidebar-drawer"
          className="btn btn-ghost drawer-button lg:hidden"
        >
          <ChevronRightIcon className="size-5" />
        </label>
      </div>
      <div className="flex-1 items-center justify-center">
        <Link
          href="/"
          className="btn btn-ghost inline-flex text-primary lg:hidden"
        >
          <Favicon className="size-8" />
        </Link>
        <Searcher />
      </div>
      <div className="flex-none">
        <div className="tooltip tooltip-bottom" data-tip="New Post">
          <Link
            href="/posts/create"
            className="btn btn-circle btn-ghost hidden lg:inline-flex"
          >
            <PencilIcon className="size-5" />
          </Link>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Notification">
          <div className="dropdown dropdown-end hidden lg:block">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost"
            >
              <BellIcon className="size-5" />
              {/* <span className="badge indicator-item badge-primary badge-xs" /> */}
            </div>
            <div
              tabIndex={0}
              className="card dropdown-content card-compact z-[1] mt-4 w-96 bg-base-100 p-2 shadow"
            >
              <div className="card-body">
                <div className="flex justify-between">
                  <h3 className="card-title">Notifications</h3>
                  <div className="badge badge-ghost">0</div>
                </div>
                <div className="space-y-2 rounded-box bg-base-200 p-2">
                  <div role="alert" className="alert bg-base-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-info"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold">New message!</h3>
                      <div className="text-xs">You have 1 unread message</div>
                    </div>
                    <button className="btn btn-sm">See</button>
                  </div>
                  <div role="alert" className="alert bg-base-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="h-6 w-6 shrink-0 stroke-info"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-bold">New message!</h3>
                      <div className="text-xs">You have 1 unread message</div>
                    </div>
                    <button className="btn btn-sm">See</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="tooltip tooltip-bottom" data-tip="Profile">
          <div className="dropdown dropdown-end hidden lg:block">
            <div
              tabIndex={0}
              role="button"
              className={`btn btn-circle ${
                user
                  ? userData?.avatar_url
                    ? "btn-ghost"
                    : "btn-neutral"
                  : "btn-primary"
              } avatar ${user && userData?.avatar_url ? "" : "placeholder"}`}
            >
              {user ? (
                <div className="w-10 rounded-full">
                  {userData?.avatar_url ? (
                    <Image
                      alt={userData.nickname}
                      src={userData.avatar_url}
                      width={40}
                      height={40}
                    />
                  ) : (
                    <span>{userData?.nickname?.charAt(0)}</span>
                  )}
                </div>
              ) : (
                <UserIcon className="size-5" />
              )}
            </div>
            <ul className="menu dropdown-content menu-sm z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow">
              {user ? (
                <>
                  <li
                    className={`menu-title ${userData?.role?.toLowerCase() === "admin" ? "text-secondary" : ""}`}
                  >
                    {userData?.nickname}
                  </li>
                  {userData?.role?.toLowerCase() === "admin" && (
                    <li>
                      <Link href="/dashboard">
                        <WindowIcon className="size-5" /> Dashboard
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link href={`/users/${user.id}`}>
                      <IdentificationIcon className="size-5" /> Profile
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/sign-in" passHref className="text-primary">
                    <ArrowRightEndOnRectangleIcon className="size-5" /> Sign in
                  </Link>
                </li>
              )}
              <li>
                <Themes />
              </li>
              <li>
                <Link href={user ? "/settings/account" : "/settings/privacy"}>
                  <Cog6ToothIcon className="size-5" /> Settings
                </Link>
              </li>
              {user && (
                <li>
                  <form action={signOutAction}>
                    <button type="submit" className="flex gap-2 text-error">
                      <ArrowRightStartOnRectangleIcon className="size-5" /> Sign
                      out
                    </button>
                  </form>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-ghost lg:hidden"
          >
            <Bars3BottomRightIcon className="size-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow lg:hidden"
          >
            {pages.map((page, index) => (
              <li key={index}>
                <Link href={page.href}>{page.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
