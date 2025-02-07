import { FunnelIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/solid";

import { Section } from "@/components/section";
import { Sidebar } from "@/components/layouts/sidebar";
import { NotFound } from "@/components/empty";
import { User } from "@/components/user";

import { getProfile, getFollowing } from "@/lib/queries/users";

export default async function Following({ params }) {
  const { id } = await params;
  const profile = await getProfile(id);
  const following = await getFollowing(id, true);

  return (
    <Sidebar>
      <div className="flex justify-between">
        <Section
          backLink={`/users/${profile.id}`}
          Icon={UsersIcon}
          title={`${profile.nickname} Following`}
          description={`Users who ${profile.nickname} are following.`}
        />
        <div className="items-center space-x-2">
          <div className="badge badge-lg gap-2 border-none pl-0">
            <div className="badge badge-primary badge-lg gap-2">
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(following.length || 0)}
            </div>
            Users
          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-circle">
              <FunnelIcon className="size-5" />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-200 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="card bg-base-100">
        <div className="card-body">
          {following?.length ? (
            following?.map((user, index) => (
              <User
                id={user.user.id}
                avatarURL={user.user.avatar_url}
                nickname={user.user.nickname}
                role={user.user.role}
                country={user.user.country}
                signature={user.user.signature}
                isEnded={index + 1 === following.length}
                key={index}
              />
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound
                  iconCenter
                  description={`${profile.nickname} hasn't followed anyone at the moment.`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
