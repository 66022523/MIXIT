import { FunnelIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/solid";

import { Section } from "@/components/section";
import { Sidebar } from "@/components/layouts/sidebar";
import { NotFound } from "@/components/empty";
import { User } from "@/components/user";

import { getUserProfile, getUserFollowing } from "@/libs/queries/users";

export default async function Following({ params }) {
  const { id } = await params;
  const [{ data: profileData }, { data: followingData }] = await Promise.all([
    getUserProfile(id),
    getUserFollowing(id),
  ]);

  return (
    <Sidebar>
      <Section
        backLink={`/users/${profileData.id}`}
        Icon={UsersIcon}
        title={`${profileData.nickname} Following`}
        description={`Users who ${profileData.nickname} are following.`}
      >
        <div className="badge badge-lg gap-2 border-none pl-0">
          <div className="badge badge-primary badge-lg gap-2">
            {Intl.NumberFormat("en-US", {
              notation: "compact",
              maximumFractionDigits: 1,
            }).format(followingData?.length || 0)}
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
      </Section>
      <div className="card bg-base-100">
        <div className="card-body">
          {followingData?.length ? (
            followingData.map((user, index) => (
              <User
                id={user.user.id}
                avatarURL={user.user.avatar_url}
                nickname={user.user.nickname}
                role={user.user.role}
                country={user.user.country}
                signature={user.user.signature}
                isEnded={index + 1 === followingData.length}
                key={index}
              />
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound
                  iconCenter
                  description={`${profileData.nickname} hasn't followed anyone at the moment.`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
