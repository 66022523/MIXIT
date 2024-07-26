import {
  HomeIcon,
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export function AppMenu({ url, name, children }) {
  const handleSignInModel = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <li>
      <Link
        className="tooltip tooltip-bottom inline-flex lg:self-center"
        data-tip={name}
        href={url}
        onClick={handleSignInModel}
      >
        {children}
        <span className="lg:hidden">{name}</span>
      </Link>
    </li>
  );
}

export default function Sidebar({ session, children }) {
  return (
    <main className="drawer lg:drawer-open">
      <input id="drawer-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content rounded-t-2xl bg-base-300/90 p-4 lg:rounded-tl-2xl lg:rounded-tr-none lg:p-12">
        {children}
      </div>
      <div className="drawer-side top-16 z-40 lg:bg-base-100/90">
        <label
          htmlFor="drawer-sidebar"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <ul className="menu text-base-content">
          <AppMenu url="/" name="Home">
            <HomeIcon className="size-6" />
          </AppMenu>
          <AppMenu
            url={session ? `/users/${session.user.id}/following` : ""}
            name="Following"
          >
            <UsersIcon className="size-6" />
          </AppMenu>
          <AppMenu
            url={session ? `/users/${session.user.id}/followers` : ""}
            name="Follower"
          >
            <UserGroupIcon className="size-6" />
          </AppMenu>
          <li className="divider mx-auto h-1 w-10 rounded-full" />
          <li>
            <Link
              className="btn btn-circle btn-primary mx-auto"
              href="/circles"
              name="Join Community"
            >
              <PlusIcon className="size-6" />
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
