import Link from "next/link";
import { UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export function UserStats({ following, followers, profile }) {
  return (
    <div className="flex pt-12 gap-2">
      <Link
        href={`/users/${profile.id}/following`}
        className="badge badge-primary badge-lg gap-2 border-none pl-0"
      >
        <div className="badge badge-lg gap-2">
          <UsersIcon className="size-4" /> Following
        </div>
        {following?.count || 0}
      </Link>
      <Link
        href={`/users/${profile.id}/followers`}
        className="badge badge-primary badge-lg gap-2 border-none pl-0"
      >
        <div className="badge badge-lg gap-2">
          <UserGroupIcon className="size-4" /> Followers
        </div>
        {followers?.count || 0}
      </Link>
    </div>
  );
}
