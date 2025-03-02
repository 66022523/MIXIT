import {
  PlusIcon,
  UserGroupIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import Image from "next/image";

import { HeaderNavbar } from "@/components/layouts/navbar/header";
import { FooterNavbar } from "@/components/layouts/navbar/footer";
import { Favicon } from "@/components/icons";

import { createClient } from "@/utils/supabase/server";

export default async function CommunitiesLayout({
  authentication,
  modal,
  children,
}) {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("users")
    .select("*, circles (*)")
    .eq("id", user?.id)
    .single();

  return (
    <div className="drawer lg:drawer-open">
      <input id="drawer-side" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <header className="sticky left-0 top-0 z-50 w-full">
          <HeaderNavbar user={user} profile={data} />
        </header>
        <main className="relative size-full overflow-clip rounded-none bg-base-300/80 lg:rounded-tl-2xl">
          <div className="size-full overflow-y-auto lg:absolute">
            {authentication}
            {modal}
            {children}
          </div>
        </main>
        <footer className="sticky bottom-0 left-0 z-50 w-full lg:hidden">
          <FooterNavbar user={user} />
        </footer>
      </div>
      <div className="overflow-invisible drawer-side z-50">
        <label
          htmlFor="drawer-side"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <aside className="min-h-screen bg-base-100/80 backdrop-blur-3xl">
          <div className="sticky top-0 z-50 hidden bg-base-100 px-2 pt-2 lg:inline-flex">
            <Link href="/" className="btn btn-ghost text-primary">
              <Favicon className="size-8" />
            </Link>
          </div>
          <ul className="menu">
            <li>
              <Link
                className="lg:mx-auto"
                href={user ? `/users/${user?.id}/following` : "/sign-in"}
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
                href={user ? `/users/${user?.id}/followers` : "/sign-in"}
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
            {user &&
              data.circles.map((circle, index) => (
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
              <Link
                className="lg:btn-circle lg:mx-auto"
                href={user ? "/circles/request" : "/sign-in"}
              >
                <div
                  className="btn btn-circle btn-primary btn-sm tooltip tooltip-bottom inline-flex lg:btn-md"
                  data-tip="Request Circle"
                >
                  <PlusIcon className="size-6" />
                </div>
                <span className="lg:hidden">Request Circle</span>
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
