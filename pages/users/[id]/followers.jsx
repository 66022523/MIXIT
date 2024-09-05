import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/solid";

import { Section, NotFound, Content } from "@/components/content";
import { User } from "@/components/user";

import { fetcher } from "@/utils/fetcher";

function Component() {
  const router = useRouter();
  const { data: user } = useSWR(`/api/v1/users/${router.query.id}`);
  const { data: followers } = useSWR(
    `/api/v1/users/${router.query.id}/followers`,
  );

  return (
    <Content className="p-12">
      <div className="flex justify-between">
        <Section
          backLink={`/users/${user.id}`}
          Icon={UserGroupIcon}
          title={`${user.nickname} Followers`}
          description={`All users who are following ${user.nickname}.`}
        />
        <div className="items-center space-x-2">
          <div className="badge badge-lg gap-2 border-none pl-0">
            <div className="badge badge-primary badge-lg gap-2">
              {Intl.NumberFormat("en-US", {
                notation: "compact",
                maximumFractionDigits: 1,
              }).format(followers.length || 0)}
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
          {followers?.length ? (
            followers?.map((user, index) => (
              <User
                id={user.id}
                avatarURL={user.avatar_url}
                nickname={user.nickname}
                role={user.role}
                country={user.country}
                signature={user.signature}
                isEnded={index + 1 === followers.length}
                key={index}
              />
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound
                iconCenter
                  description={`There are no users following ${user.nickname} yet.`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
}

export default function Followers({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}

export async function getServerSideProps(context) {
  const user = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}`,
  );
  const followers = await fetcher(
    `http://localhost:3000/api/v1/users/${context.query.id}/followers`,
  );
  const circles = await fetcher("http://localhost:3000/api/v1/circles");
  const tags = await fetcher("http://localhost:3000/api/v1/tags");
  return {
    props: {
      fallback: {
        [`/api/v1/users/${context.query.id}`]: user,
        [`/api/v1/users/${context.query.id}/followers`]: followers,
        "/api/v1/circles": circles,
        "/api/v1/tags": tags,
      },
    },
  };
}
