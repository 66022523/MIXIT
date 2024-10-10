import Link from "next/link";
import Image from "next/image";
import {
  PencilIcon,
  BellIcon,
  Bars3BottomRightIcon,
  UserIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  IdentificationIcon,
  ChevronRightIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";

import { signOutAction } from "@/lib/actions/auth";

import { Searcher } from "@/components/layouts/navbar/searcher";
import { Themes } from "@/components/layouts/navbar/themes";

import config from "@/config";

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
          className="btn btn-ghost inline-flex text-xl text-primary lg:hidden"
        >
          {config.metadata.name}
        </Link>
        <Searcher />
      </div>
      <div className="flex-none">
        <button className="btn btn-circle btn-ghost hidden lg:inline-flex">
          <Link href="/posts/create">
            <PencilIcon className="size-5" />
          </Link>
        </button>
        <div className="dropdown dropdown-end hidden lg:block">
          <div tabIndex={0} role="button" className="btn btn-circle btn-ghost">
            <BellIcon className="size-5" />
            {/* <span className="badge indicator-item badge-primary badge-xs" /> */}
          </div>
          <div
            tabIndex={0}
            className="card dropdown-content card-compact mt-4 w-80 bg-base-100 p-2 shadow"
          >
            <div className="card-body">
              <h3 className="card-title">Notifications</h3>
              <p>you can use any element as a dropdown.</p>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end hidden lg:block">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-circle ${user
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
              <Link href={user ? "/settings/profile" : "/settings/privacy"}>
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
