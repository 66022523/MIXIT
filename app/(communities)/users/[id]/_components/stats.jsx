import Link from "next/link";
import { UsersIcon, UserGroupIcon } from "@heroicons/react/24/solid";

export function UserStats({ profile }) {
  return (
    <div className="flex gap-2 pt-12">
      <Link
        href={`/users/${profile.id}/following`}
        className="badge badge-primary badge-lg gap-2 border-none pl-0"
      >
        <div className="badge badge-lg gap-2">
          <UsersIcon className="size-4" /> Following
        </div>
        {profile.following_count || 0}
      </Link>
      <Link
        href={`/users/${profile.id}/followers`}
        className="badge badge-primary badge-lg gap-2 border-none pl-0"
      >
        <div className="badge badge-lg gap-2">
          <UserGroupIcon className="size-4" /> Followers
        </div>
        {profile.followers_count || 0}
      </Link>
    </div>
  );
}
