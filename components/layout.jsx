import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useContext, useState, useCallback } from "react";
import {
  MagnifyingGlassCircleIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { Drawer, Menu, Tooltip, Divider } from "react-daisyui";

import Favicon from "./favicon";
import { TopNavbar, BottomNavbar } from "./navbar";

import { SessionContext } from "@/contexts/session";

import useUser from "@/hooks/useUser";

import { createClient } from "@/utils/supabase/component";

const DynamicAuthSignInModal = dynamic(
  () => import("./auth").then((auth) => auth.AuthSignInModal),
  {
    suspense: true,
    loading: () => <p>Loading...</p>,
  },
);
const DynamicAuthSignUpModal = dynamic(
  () => import("./auth").then((auth) => auth.AuthSignUpModal),
  {
    suspense: true,
    loading: () => <p>Loading...</p>,
  },
);
const DynamicAuthForgotModal = dynamic(
  () => import("./auth").then((auth) => auth.AuthForgotModal),
  {
    suspense: true,
    loading: () => <p>Loading...</p>,
  },
);

function DrawerMenu() {
  const supabase = createClient();
  const session = useContext(SessionContext);
  const {
    data: circles,
    error,
    isLoading,
  } = useUser(session && `${session?.user.id}/circles`);

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <Menu className="h-full bg-base-100/80 text-base-content backdrop-blur-3xl">
      <Menu.Item className="sticky top-0 z-50 hidden bg-base-100 lg:inline-flex">
        <Favicon className="btn btn-ghost text-xl text-primary" />
      </Menu.Item>
      <Menu.Item>
        <Link
          className="lg:mx-auto"
          href={session ? `/users/${session.user.id}/following` : ""}
          onClick={!session && handleShowSignInModal}
        >
          <Tooltip position="bottom" message="Following">
            <UsersIcon className="size-6" />
          </Tooltip>
          <span className="lg:hidden">Following</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link
          className="lg:mx-auto"
          href={session ? `/users/${session.user.id}/followers` : ""}
          onClick={!session && handleShowSignInModal}
        >
          <Tooltip position="bottom" message="Follower">
            <UserGroupIcon className="size-6" />
          </Tooltip>
          <span className="lg:hidden">Follower</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Divider className="btn-disabled" />
      </Menu.Item>
      {session &&
        !isLoading &&
        circles?.map((circle, index) => {
          const { data: icon } = supabase.storage
            .from("circles")
            .getPublicUrl(circle.icon_url);

          return (
            <Menu.Item key={index}>
              <Link
                className="lg:btn-circle lg:mx-auto lg:mb-2"
                href={`/circles/${circle.id}`}
              >
                <Tooltip
                  className="avatar btn btn-circle btn-ghost"
                  position="bottom"
                  message={circle.name}
                >
                  <div className="w-12 rounded-full">
                    <Image
                      src={icon.publicUrl}
                      alt={circle.name}
                      width={48}
                      height={48}
                    />
                  </div>
                </Tooltip>
                <span className="lg:hidden">{circle.name}</span>
              </Link>
            </Menu.Item>
          );
        })}
      <Menu.Item>
        <Link className="lg:btn-circle lg:mx-auto lg:mb-2" href="/circles">
          <Tooltip
            className="btn btn-circle btn-primary btn-sm inline-flex lg:btn-md"
            position="bottom"
            message="Explorer Community"
          >
            <MagnifyingGlassCircleIcon className="size-6" />
          </Tooltip>
          <span className="lg:hidden">Explorer Community</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <Link className="lg:btn-circle lg:mx-auto" href="/circles/add">
          <Tooltip
            className="btn btn-circle btn-primary btn-sm inline-flex lg:btn-md"
            position="bottom"
            message="Add Community"
          >
            <PlusIcon className="size-6" />
          </Tooltip>
          <span className="lg:hidden">Add Community</span>
        </Link>
      </Menu.Item>
    </Menu>
  );
}

export default function Layout({ className, children }) {
  const [visible, setVisible] = useState(false);
  const session = useContext(SessionContext);

  const handleToggleDrawerVisible = useCallback(() => {
    setVisible((visible) => !visible);
  }, []);

  return (
    <>
      <svg
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed opacity-50 blur-3xl"
      >
        <circle cx="1440" cy="1024" r="600" fill="oklch(var(--p))" />
        <circle cx="800" cy="150" r="150" fill="oklch(var(--in))" />
        <circle cx="150" cy="400" r="100" fill="oklch(var(--s))" />
      </svg>
      <Drawer
        className={`lg:drawer-open ${className}`}
        open={visible}
        onClickOverlay={handleToggleDrawerVisible}
        side={<DrawerMenu />}
        sideClassName="overflow-invisible z-50"
        contentClassName="flex flex-col"
      >
        <header className="sticky left-0 top-0 z-50 w-full">
          {!session && (
            <>
              <DynamicAuthSignInModal />
              <DynamicAuthSignUpModal />
              <DynamicAuthForgotModal />
            </>
          )}
          <TopNavbar handleToggleDrawerVisible={handleToggleDrawerVisible} />
        </header>
        <main className="relative size-full overflow-clip rounded-none bg-base-300/80 lg:rounded-tl-2xl">
          <div className="size-full overflow-y-auto lg:absolute">
            {children}
          </div>
        </main>
        <footer className="sticky bottom-0 left-0 z-50 w-full lg:hidden">
          <BottomNavbar />
        </footer>
      </Drawer>
    </>
  );
}
