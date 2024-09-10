import { FunnelIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/solid";

import { Sidebar } from "@/components/layouts/sidebar";
import { NotFound } from "@/components/empty";
import { Section } from "@/components/section";
import { User } from "@/components/user";

import { createClient } from "@/utils/supabase/server";

export default async function Users() {
  const supabase = createClient();
  const { data: users } = await supabase.from("users").select();

  return (
    <Sidebar className="p-12">
      <div className="flex justify-between">
        <Section
          Icon={UsersIcon}
          title="Users"
          description="All users who are in MIXIT."
        />
        <div className="items-center space-x-2">
          <div className="badge badge-lg gap-2 border-none pl-0">
            <div className="badge badge-primary badge-lg gap-2">
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(users?.length ?? 0)}
            </div>
            Members
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
          {users?.length ? (
            users?.map((user, index) => (
              <User
                id={user.id}
                avatarURL={user.avatar_url}
                nickname={user.nickname}
                role={user.role}
                country={user.country}
                signature={user.signature}
                isEnded={index + 1 === users.length}
                key={index}
              />
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound iconCenter description="There are no users yet." />
              </div>
            </div>
          )}
        </div>
      </div>
    </Sidebar>
  );
}
