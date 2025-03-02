"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PencilIcon,
  BellIcon,
  UserIcon,
  HomeIcon,
  FireIcon,
} from "@heroicons/react/24/outline";

export function FooterNavbar({ user }) {
  const pathname = usePathname();

  return (
    <div className="btm-nav relative bg-base-100/80 backdrop-blur-3xl">
      <Link
        href="/"
        className={`${pathname === "/" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <HomeIcon className="size-5" />
      </Link>
      <Link
        href="/tags"
        className={`${pathname === "/tags" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <FireIcon className="size-5" />
      </Link>
      <button type="button" className="bg-opacity-50">
        <PencilIcon className="size-5" />
      </button>
      <button type="button" className="bg-opacity-50">
        <BellIcon className="size-5" />
      </button>
      <Link
        href={user ? `/users/${user.id}` : "/sign-in"}
        className={`${pathname === "/users/[id]" ? "active text-primary" : ""} bg-opacity-50`}
      >
        <UserIcon className="size-5" />
      </Link>
    </div>
  );
}
