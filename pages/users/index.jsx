import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import {
  EllipsisVerticalIcon,
  FlagIcon,
  FunnelIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { NotFound } from "@/components/error";

import { fetcher } from "@/utils/fetcher";

function Component() {
  const { data: users } = useSWR("/api/v1/users");

  return (
    <div className="space-y-12 p-12">
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <UsersIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
          <div>
            <h2 className="font-bold">Users</h2>
            <p>All users who are in MIXIT.</p>
          </div>
        </div>
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
              <Fragment key={index}>
                <div className="card flex-row bg-base-200">
                  <figure className="avatar py-5 pl-5">
                    <Link href={`/users/${user.id}`} className="w-20">
                      {user.avatar_url ? (
                        <Image
                          className="mask mask-circle"
                          src={user.avatar_url}
                          alt={user.nickname}
                          width={80}
                          height={80}
                        />
                      ) : (
                        <span className="text-3xl">
                          {user.nickname.charAt(0)}
                        </span>
                      )}
                    </Link>
                  </figure>
                  <div className="card-body flex-row p-5">
                    <Link
                      href={`/users/${user.id}`}
                      className="flex-1 content-center"
                    >
                      <h3 className="card-title">
                        {user.nickname}{" "}
                        {user.role.toLowerCase() !== "user" && (
                          <span className="badge badge-secondary align-middle">
                            {user.role}
                          </span>
                        )}
                      </h3>
                      <p>
                        {user.country && (
                          <span className={`fi fi-${user.country}`} />
                        )}{" "}
                        {user.signature}
                      </p>
                    </Link>
                    <div className="card-actions items-center">
                      <button type="button" className="btn btn-primary">
                        Follow
                      </button>
                      <div className="dropdown dropdown-end">
                        <div
                          tabIndex={0}
                          role="button"
                          className="btn btn-circle btn-primary"
                        >
                          <EllipsisVerticalIcon className="size-5" />
                        </div>
                        <ul
                          tabIndex={0}
                          className="menu dropdown-content z-[1] mt-1 w-52 rounded-box bg-base-300 p-2 shadow"
                        >
                          <li>
                            <a>
                              <FlagIcon className="size-5" /> Report this user
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                {index + 1 === users.length && (
                  <div className="divider">That&apos;s all</div>
                )}
              </Fragment>
            ))
          ) : (
            <div className="hero">
              <div className="hero-content text-center">
                <NotFound description="There are no users yet." />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Users({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const users = await fetcher("http://localhost:3000/api/v1/users");
  return {
    props: {
      fallback: {
        "/api/v1/users": users,
      },
    },
  };
}
