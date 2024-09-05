import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import { FunnelIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/solid";

import { Section, NotFound, Content } from "@/components/content";
import { User } from "@/components/user";

import { fetcher } from "@/utils/fetcher";

export const getServerSideProps = async ({ params }) => {
  const user = await fetcher(
    `http://localhost:3000/api/v1/users/${params.id}`,
  );
  const following = await fetcher(
    `http://localhost:3000/api/v1/users/${params.id}/following`,
  );
  const circles = await fetcher("http://localhost:3000/api/v1/circles");
  const tags = await fetcher("http://localhost:3000/api/v1/tags");
  return {
    props: {
      fallback: {
        [`/api/v1/users/${params.id}`]: user,
        [`/api/v1/users/${params.id}/following`]: following,
        "/api/v1/circles": circles,
        "/api/v1/tags": tags,
      },
    },
  };
}

function Component() {
  const router = useRouter();
  const { data: user } = useSWR(`/api/v1/users/${router.query.id}`);
  const { data: following } = useSWR(
    `/api/v1/users/${router.query.id}/following`,
  );

  return (
    <Content className="p-12">
      <div className="flex justify-between">
        <Section
          backLink={`/users/${user.id}`}
          Icon={UsersIcon}
          title={`${user.nickname} Following`}
          description={`Users who ${user.nickname} are following.`}
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
                id={user.id}
                avatarURL={user.avatar_url}
                nickname={user.nickname}
                role={user.role}
                country={user.country}
                signature={user.signature}
                isEnded={index + 1 === following.length}
                key={index}
              />
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound
                iconCenter
                  description={`${user.nickname} hasn't followed anyone at the moment.`}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Content>
  );
}

export default function Following({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}
