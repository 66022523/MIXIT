import Link from "next/link";
import { useState } from "react";
import {
  FunnelIcon,
  Bars3BottomLeftIcon,
  UserIcon as UserSolidIcon,
  PencilIcon,
  BellIcon,
} from "@heroicons/react/24/solid";
import {
  TagIcon,
  Bars3CenterLeftIcon,
  PuzzlePieceIcon,
  UserIcon as UserOutlineIcon,
  ChatBubbleBottomCenterTextIcon,
  MagnifyingGlassIcon,
  ArrowRightCircleIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/outline";

import { createClient } from "@/utils/supabase/component";

export function Favicon({ className }) {
  return (
    <Link href="/" className={className}>
      MIXIT
    </Link>
  );
}

export function Menu({ className }) {
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
    <ul tabIndex={0} className={className}>
      <li className="lg:hidden">
        <label htmlFor="drawer-sidebar">
          <ArrowRightCircleIcon className="size-5" />
        </label>
      </li>
      {pages.map((page, index) => (
        <li key={index}>
          <Link href={page.href}>{page.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("");

  const handleSearch = () => {
    Router.push(`/search?keyword=${keyword}&filter=${filter}`);
  };

  return (
    <div className="hidden items-center gap-2 rounded-badge bg-primary/50 p-1.5 lg:flex">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-circle btn-sm">
          <FunnelIcon className="size-5" />
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] mt-5 w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a
              onClick={() => setFilter("tags")}
              className={filter === "tags" ? "active" : ""}
            >
              <TagIcon className="size-5" />
              Tags
            </a>
          </li>
          <li>
            <a
              onClick={() => setFilter("posts")}
              className={filter === "posts" ? "active" : ""}
            >
              <Bars3BottomLeftIcon className="size-5" />
              Posts
            </a>
          </li>
          <li>
            <a
              onClick={() => setFilter("games")}
              className={filter === "games" ? "active" : ""}
            >
              <PuzzlePieceIcon className="size-5" />
              Games
            </a>
          </li>
          <li>
            <a
              onClick={() => setFilter("users")}
              className={filter === "users" ? "active" : ""}
            >
              <UserOutlineIcon className="size-5" />
              Users
            </a>
          </li>
          <li>
            <a
              onClick={() => setFilter("comments")}
              className={filter === "comments" ? "active" : ""}
            >
              <ChatBubbleBottomCenterTextIcon className="size-5" />
              Comments
            </a>
          </li>
        </ul>
      </div>
      <div className="form-control w-full">
        <input
          type="search"
          className="input input-sm bg-transparent text-primary-content placeholder:text-primary-content placeholder:text-opacity-50 focus:border-transparent focus:outline-none"
          placeholder="Start to search anythings..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <button
        type="button"
        className="btn btn-circle btn-ghost btn-sm"
        onClick={handleSearch}
      >
        <MagnifyingGlassIcon className="size-5" />
      </button>
    </div>
  );
}

export default function Navbar({ session }) {
  const supabase = createClient();

  const handleSignInModel = () => {
    document.getElementById("auth-sign-in").showModal();
  };
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) throw new Error(error);
  };

  return (
    <nav className="navbar sticky top-0 z-50 bg-base-100/90 backdrop-blur-3xl">
      <div className="flex-none">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <Bars3CenterLeftIcon className="size-5" />
          </div>
          <Menu className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow" />
        </div>
        <Favicon className="btn btn-ghost hidden text-xl lg:inline-flex" />
        <Menu className="menu menu-horizontal hidden px-1 lg:flex" />
      </div>
      <div className="flex-1 justify-center">
        <Favicon className="btn btn-ghost inline-flex text-xl lg:hidden" />
        <SearchBar />
      </div>
      <div className="flex-none gap-2">
        <button className="btn btn-circle btn-primary btn-sm hidden lg:inline-flex">
          <PencilIcon className="size-5" />
        </button>
        <button className="btn btn-circle btn-primary btn-sm">
          <BellIcon className="size-5" />
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-circle btn-primary btn-sm"
          >
            <UserSolidIcon className="size-5" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] mt-6 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              {session ? (
                <button type="button" onClick={handleSignOut}>
                  Sign out
                </button>
              ) : (
                <button type="button" onClick={handleSignInModel}>
                  Sign in
                </button>
              )}
            </li>
            <li className="lg:hidden">
              <a>New Post</a>
            </li>
            <li>
              <div className="form-control">
                <label className="label cursor-pointer gap-2">
                  <label className="grid cursor-pointer place-items-center">
                    <input
                      type="checkbox"
                      value={"dark"}
                      className="theme-controller toggle col-span-2 col-start-1 row-start-1 bg-base-content"
                    />
                    <SunIcon className="col-start-1 row-start-1 size-3.5 fill-base-100 stroke-base-100" />
                    <MoonIcon className="col-start-2 row-start-1 size-3.5 fill-base-100 stroke-base-100" />
                  </label>
                  <span className="label-text">Switch theme</span>
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
