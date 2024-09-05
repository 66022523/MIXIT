import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  TagIcon,
  FunnelIcon,
  Bars3BottomLeftIcon,
  PencilIcon,
  BellIcon,
  Bars3BottomRightIcon,
  PuzzlePieceIcon,
  UsersIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightEndOnRectangleIcon,
  Cog6ToothIcon,
  SwatchIcon,
  IdentificationIcon,
  HomeIcon,
  FireIcon,
  ChevronRightIcon,
  WindowIcon,
} from "@heroicons/react/24/outline";

import { Favicon } from "./content";

import { useSession } from "@/contexts/session";

import useUser from "@/hooks/useUser";

import { createClient } from "@/utils/supabase/component";

export function TopNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const session = useSession();

  const { data: user, error, isLoading } = useUser(session?.user.id);

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [theme, setTheme] = useState(
    (typeof localStorage !== "undefined" &&
      JSON.parse(localStorage.getItem("theme"))) ??
      "default",
  );

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
  const searchOptions = [
    {
      icon: <TagIcon className="size-5" />,
      name: "Tags",
      value: "tags",
    },
    {
      icon: <Bars3BottomLeftIcon className="size-5" />,
      name: "Posts",
      value: "posts",
    },
    {
      icon: <PuzzlePieceIcon className="size-5" />,
      name: "Games",
      value: "games",
    },
    {
      icon: <UsersIcon className="size-5" />,
      name: "Users",
      value: "users",
    },
    {
      icon: <ChatBubbleBottomCenterTextIcon className="size-5" />,
      name: "Comments",
      value: "comments",
    },
  ];
  const themeOptions = [
    {
      name: "System",
      value: "default",
    },
    {
      name: "Light",
      value: "light",
    },
    {
      name: "Dark",
      value: "dark",
    },
  ];

  const handleSearch = () => {
    router.push(`/search?keyword=${searchKeyword}&filter=${searchFilter}`);
  };
  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error);
  };

  useEffect(
    () => localStorage.setItem("theme", JSON.stringify(theme)),
    [theme],
  );

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
        <Favicon className="btn btn-ghost inline-flex text-xl text-primary lg:hidden" />
        <div className="join hidden rounded-full bg-primary p-1 lg:inline-flex">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle join-item btn-sm"
            >
              <FunnelIcon className="size-5" />
            </div>
            <ul className="menu dropdown-content menu-sm z-[1] mt-6 w-52 rounded-box bg-base-100 shadow">
              {searchOptions.map((option, index) => (
                <li key={index}>
                  <button
                    onClick={() => setSearchFilter(option.value)}
                    className={searchFilter === option.name ? "active" : ""}
                  >
                    {option.icon}
                    {option.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="form-control w-full">
            <input
              type="search"
              className="input input-sm join-item input-ghost border-transparent bg-transparent placeholder:text-primary-content focus:border-transparent focus:bg-transparent focus:outline-none"
              placeholder="Start to search everything..."
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </div>
          <button
            className="btn btn-circle btn-ghost join-item btn-sm text-primary-content"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="size-5" />
          </button>
        </div>
      </div>
      <div className="flex-none">
        <button className="btn btn-circle btn-ghost hidden lg:inline-flex">
          <PencilIcon className="size-5" />
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
            className={`btn btn-circle ${
              session
                ? !isLoading && user?.avatar_url
                  ? "btn-ghost"
                  : "btn-neutral"
                : "btn-primary"
            } avatar ${session && !isLoading && user?.avatar_url ? "" : "placeholder"}`}
          >
            {session ? (
              <div className="w-10 rounded-full">
                {!isLoading && user?.avatar_url ? (
                  <Image
                    alt={user.nickname}
                    src={user.avatar_url}
                    width={40}
                    height={40}
                  />
                ) : (
                  <span>{!isLoading && user?.nickname?.charAt(0)}</span>
                )}
              </div>
            ) : (
              <UserIcon className="size-5" />
            )}
          </div>
          <ul className="menu dropdown-content menu-sm z-[1] mt-4 w-52 rounded-box bg-base-100 p-2 shadow">
            {session ? (
              <>
                <li
                  className={`menu-title ${user?.role?.toLowerCase() === "admin" ? "text-secondary" : ""}`}
                >
                  {isLoading ? (
                    <div className="skeleton h-4 w-20" />
                  ) : (
                    user?.nickname
                  )}
                </li>
                {user?.role?.toLowerCase() === "admin" && (
                  <li>
                    <Link href="/dashboard">
                      <WindowIcon className="size-5" /> Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <Link href={`/users/${session.user.id}`}>
                    <IdentificationIcon className="size-5" /> Profile
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  type="button"
                  className="text-primary"
                  onClick={handleShowSignInModal}
                >
                  <ArrowRightEndOnRectangleIcon className="size-5" /> Sign in
                </button>
              </li>
            )}
            <li>
              <details>
                <summary>
                  <SwatchIcon className="size-5" /> Theme
                </summary>
                <ul>
                  {themeOptions.map((option, index) => (
                    <li key={index}>
                      <input
                        type="radio"
                        name="theme"
                        className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                        aria-label={option.name}
                        value={option.value}
                        checked={theme === option.value}
                        onChange={(event) => setTheme(event.target.value)}
                      />
                    </li>
                  ))}
                </ul>
              </details>
            </li>
            <li>
              <Link href="/settings">
                <Cog6ToothIcon className="size-5" /> Settings
              </Link>
            </li>
            {session && (
              <li>
                <button
                  type="button"
                  className="text-error"
                  onClick={handleSignOut}
                >
                  <ArrowRightStartOnRectangleIcon className="size-5" /> Sign out
                </button>
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

export function BottomNavbar() {
  const router = useRouter();
  const session = useSession();

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <div className="btm-nav relative bg-base-100/80 backdrop-blur-3xl">
      <Link
        href="/"
        className={`${router.pathname === "/" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <HomeIcon className="size-5" />
      </Link>
      <Link
        href="/tags"
        className={`${router.pathname === "/tags" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <FireIcon className="size-5" />
      </Link>
      <button type="button" className="bg-opacity-50">
        <PencilIcon className="size-5" />
      </button>
      <button type="button" className="bg-opacity-50">
        <BellIcon className="size-5" />
      </button>
      <button
        type="button"
        onClick={() =>
          session
            ? router.push(`/users/${session.user.id}`)
            : handleShowSignInModal
        }
        className={`${router.pathname === "/users/[id]" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <UserIcon className="size-5" />
      </button>
    </div>
  );
}
