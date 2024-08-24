import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import {
  Navbar,
  BottomNavigation,
  Dropdown,
  Button,
  Menu,
  Input,
  Skeleton,
  Join,
} from "react-daisyui";
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
} from "@heroicons/react/24/outline";

import Favicon from "./favicon";

import { SessionContext } from "@/contexts/session";

import useUser from "@/hooks/useUser";

import { createClient } from "@/utils/supabase/component";

export function TopNavbar({ handleToggleDrawerVisible }) {
  const router = useRouter();
  const session = useContext(SessionContext);
  const { data: user, error, isLoading } = useUser(session?.user.id);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [theme, setTheme] = useState(
    (typeof localStorage !== "undefined" &&
      JSON.parse(localStorage.getItem("theme"))) ??
      "default",
  );

  const supabase = createClient();
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
    <Navbar className="bg-base-100/80 backdrop-blur-3xl">
      <div className="flex-none">
        <Menu horizontal className="hidden px-1 lg:flex">
          {pages.map((page, index) => (
            <Menu.Item key={index}>
              <Link href={page.href}>{page.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
        <Button
          color="ghost"
          className="lg:hidden"
          onClick={handleToggleDrawerVisible}
        >
          <ChevronRightIcon className="size-5" />
        </Button>
      </div>
      <div className="flex-1 justify-center">
        <Favicon className="btn btn-ghost inline-flex text-xl text-primary lg:hidden" />
        <Join className="rounded-full bg-primary p-1">
          <Dropdown>
            <Dropdown.Toggle
              button={false}
              className="btn btn-circle join-item btn-sm"
            >
              <FunnelIcon className="size-5" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="menu-sm z-[1] mt-6 w-52">
              {searchOptions.map((option, index) => (
                <Menu.Item key={index}>
                  <button
                    onClick={() => setSearchFilter(option.value)}
                    className={searchFilter === option.name ? "active" : ""}
                  >
                    {option.icon}
                    {option.name}
                  </button>
                </Menu.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
          <div className="form-control w-full">
            <Input
              type="search"
              size="sm"
              color="ghost"
              className="join-item bg-transparent border-transparent placeholder:text-primary-content focus:border-transparent focus:bg-transparent focus:outline-none"
              placeholder="Start to search everything..."
              value={searchKeyword}
              onChange={(event) => setSearchKeyword(event.target.value)}
            />
          </div>
          <Button
            shape="circle"
            size="sm"
            color="ghost"
            className="join-item text-primary-content"
            onClick={handleSearch}
          >
            <MagnifyingGlassIcon className="size-5" />
          </Button>
        </Join>
      </div>
      <div className="flex-none">
        <Button shape="circle" color="ghost" className="hidden lg:inline-flex">
          <PencilIcon className="size-5" />
        </Button>
        <Button shape="circle" color="ghost" className="hidden lg:inline-flex">
          <div className="indicator">
            <BellIcon className="size-5" />
            {/* <span className="badge indicator-item badge-primary badge-xs" /> */}
          </div>
        </Button>
        <Dropdown className="hidden lg:block" end>
          <Button
            tag="label"
            tabIndex={0}
            color={
              session
                ? !isLoading && user?.avatar_url
                  ? "ghost"
                  : "neutral"
                : "primary"
            }
            shape="circle"
            className={
              session
                ? "avatar" +
                  (!isLoading && user?.avatar_url ? "" : " placeholder")
                : "avatar"
            }
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
                  <span>{!isLoading && user?.nickname.charAt(0)}</span>
                )}
              </div>
            ) : (
              <UserIcon className="size-5" />
            )}
          </Button>
          <Dropdown.Menu className="menu-sm z-[1] mt-4 w-52">
            {session ? (
              <>
                <Menu.Title>
                  {isLoading ? (
                    <Skeleton className="h-4 w-20" />
                  ) : (
                    user?.nickname
                  )}
                </Menu.Title>
                <Menu.Item>
                  <Link href={`/users/${session.user.id}`}>
                    <IdentificationIcon className="size-5" /> Profile
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <Menu.Item>
                <button
                  type="button"
                  className="text-primary"
                  onClick={handleShowSignInModal}
                >
                  <ArrowRightEndOnRectangleIcon className="size-5" /> Sign in
                </button>
              </Menu.Item>
            )}
            <Menu.Item>
              <Menu.Details
                label={
                  <>
                    <SwatchIcon className="size-5" /> Theme
                  </>
                }
              >
                {themeOptions.map((option, index) => (
                  <Menu.Item key={index}>
                    <input
                      type="radio"
                      name="theme"
                      className="theme-controller btn btn-ghost btn-sm btn-block justify-start"
                      aria-label={option.name}
                      value={option.value}
                      checked={theme === option.value}
                      onChange={(event) => setTheme(event.target.value)}
                    />
                  </Menu.Item>
                ))}
              </Menu.Details>
            </Menu.Item>
            <Menu.Item>
              <button type="button">
                <Cog6ToothIcon className="size-5" /> Settings
              </button>
            </Menu.Item>
            {session && (
              <Menu.Item>
                <button
                  type="button"
                  className="text-error"
                  onClick={handleSignOut}
                >
                  <ArrowRightStartOnRectangleIcon className="size-5" /> Sign out
                </button>
              </Menu.Item>
            )}
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown end>
          <Button tag="label" color="ghost" tabIndex={0} className="lg:hidden">
            <Bars3BottomRightIcon className="size-5" />
          </Button>
          <Dropdown.Menu
            tabIndex={0}
            className="menu-sm z-[1] mt-3 w-52 lg:hidden"
          >
            {pages.map((page, index) => (
              <Menu.Item key={index}>
                <Link href={page.href}>{page.name}</Link>
              </Menu.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Navbar>
  );
}

export function BottomNavbar() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <BottomNavigation className="relative bg-base-100/80 backdrop-blur-3xl">
      <BottomNavigation.Item
        onClick={() => router.push(`/`)}
        className="bg-opacity-50"
        color={router.pathname === `/` ? "primary" : ""}
        active={router.pathname === `/`}
      >
        <HomeIcon className="size-5" />
      </BottomNavigation.Item>
      <BottomNavigation.Item
        onClick={() => router.push(`/tags`)}
        className="bg-opacity-50"
        color={router.pathname === `/tags` ? "primary" : ""}
        active={router.pathname === `/tags`}
      >
        <FireIcon className="size-5" />
      </BottomNavigation.Item>
      <BottomNavigation.Item className="bg-opacity-50">
        <PencilIcon className="size-5" />
      </BottomNavigation.Item>
      <BottomNavigation.Item className="bg-opacity-50">
        <BellIcon className="size-5" />
      </BottomNavigation.Item>
      <BottomNavigation.Item
        onClick={() =>
          session
            ? router.push(`/users/${session.user.id}`)
            : handleShowSignInModal
        }
        className="bg-opacity-50"
        color={router.pathname === `/users/[id]` ? "primary" : ""}
        active={router.pathname === `/users/[id]`}
      >
        <UserIcon className="size-5" />
      </BottomNavigation.Item>
    </BottomNavigation>
  );
}
