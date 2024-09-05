import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  MagnifyingGlassCircleIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { Favicon } from "./content";
import { TopNavbar, BottomNavbar } from "./navbar";

import { SessionContext } from "@/contexts/session";

import useUser from "@/hooks/useUser";

const DynamicAuthSignInModal = dynamic(
  () => import("./modals/auth").then((auth) => auth.AuthSignInModal),
  {
    suspense: true,
    loading: () => <span className="loading loading-ball" />,
  },
);
const DynamicAuthSignUpModal = dynamic(
  () => import("./modals/auth").then((auth) => auth.AuthSignUpModal),
  {
    suspense: true,
    loading: () => <span className="loading loading-ball" />,
  },
);
const DynamicAuthForgotModal = dynamic(
  () => import("./modals/auth").then((auth) => auth.AuthForgotModal),
  {
    suspense: true,
    loading: () => <span className="loading loading-ball" />,
  },
);

export default function Layout(props) {
  const session = useContext(SessionContext);
  const pathname = usePathname();
  const {
    data: circles,
    error,
    isLoading,
  } = useUser(session && `${session?.user.id}/circles`);

  const flattenLayoutPaths = ["/recovery"];

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return flattenLayoutPaths.includes(pathname) ? (
    <main {...props}>{props.children}</main>
  ) : (
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
      <div className={`drawer lg:drawer-open ${props.className}`}>
        <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          <header className="sticky left-0 top-0 z-50 w-full">
            <TopNavbar />
            <DynamicAuthSignInModal />
            <DynamicAuthSignUpModal />
            <DynamicAuthForgotModal />
          </header>
          <main className="relative size-full overflow-clip rounded-none bg-base-300/80 lg:rounded-tl-2xl">
            <div className="size-full overflow-y-auto lg:absolute">
              {props.children}
            </div>
          </main>
          <footer className="sticky bottom-0 left-0 z-50 w-full lg:hidden">
            <BottomNavbar />
          </footer>
        </div>
        <div className="overflow-invisible drawer-side z-50">
          <label
            htmlFor="sidebar-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <aside className="min-h-screen bg-base-100/80 text-base-content backdrop-blur-3xl">
            <div className="sticky top-0 z-50 hidden bg-base-100 px-2 pt-2 lg:inline-flex">
              <Favicon className="btn btn-ghost text-xl text-primary" />
            </div>
            <ul className="menu">
              <li>
                <Link
                  className="lg:mx-auto"
                  href={session ? `/users/${session.user.id}/following` : ""}
                  onClick={!session && handleShowSignInModal}
                >
                  <div className="tooltip tooltip-bottom" data-tip="Following">
                    <UsersIcon className="size-6" />
                  </div>
                  <span className="lg:hidden">Following</span>
                </Link>
              </li>
              <li>
                <Link
                  className="lg:mx-auto"
                  href={session ? `/users/${session.user.id}/followers` : ""}
                  onClick={!session && handleShowSignInModal}
                >
                  <div className="tooltip tooltip-bottom" data-tip="Followers">
                    <UserGroupIcon className="size-6" />
                  </div>
                  <span className="lg:hidden">Followers</span>
                </Link>
              </li>
              <li>
                <div className="btn-disabled divider" />
              </li>
              {session &&
                !isLoading &&
                circles?.map((circle, index) => (
                  <li key={index}>
                    <Link
                      className="lg:btn-circle lg:mx-auto lg:mb-2"
                      href={`/circles/${circle.id}`}
                    >
                      <div
                        className="avatar btn btn-circle btn-ghost tooltip tooltip-bottom"
                        data-tip={circle.name}
                      >
                        <div className="w-12 rounded-full">
                          <Image
                            src={circle.icon_url}
                            alt={circle.name}
                            width={48}
                            height={48}
                          />
                        </div>
                      </div>
                      <span className="lg:hidden">{circle.name}</span>
                    </Link>
                  </li>
                ))}
              <li>
                <Link
                  className="lg:btn-circle lg:mx-auto lg:mb-2"
                  href="/circles"
                >
                  <div
                    className="btn btn-circle btn-primary btn-sm tooltip tooltip-bottom inline-flex lg:btn-md"
                    data-tip="Explorer Community"
                  >
                    <MagnifyingGlassCircleIcon className="size-6" />
                  </div>
                  <span className="lg:hidden">Explorer Community</span>
                </Link>
              </li>
              <li>
                <Link className="lg:btn-circle lg:mx-auto" href="/circles/add">
                  <div
                    className="btn btn-circle btn-primary btn-sm tooltip tooltip-bottom inline-flex lg:btn-md"
                    data-tip="Add Community"
                  >
                    <PlusIcon className="size-6" />
                  </div>
                  <span className="lg:hidden">Add Community</span>
                </Link>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </>
  );
}
