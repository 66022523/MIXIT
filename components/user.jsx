import Link from "next/link";
import Image from "next/image";
import { EllipsisVerticalIcon, FlagIcon } from "@heroicons/react/24/outline";

export function User({
  id,
  avatarURL,
  nickname,
  role,
  country,
  signature,
  isEnded,
}) {
  return (
    <>
      <div className="card flex-row bg-base-200">
        <figure>
          <Link
            href={`/users/${id}`}
            className={`avatar py-5 pl-5 ${avatarURL ? "" : "placeholder"}`}
          >
            <div
              className={`w-20 rounded-full ${avatarURL ? "" : "bg-neutral text-neutral-content"}`}
            >
              {avatarURL ? (
                <Image
                  className="mask mask-circle"
                  src={avatarURL}
                  alt={nickname}
                  width={80}
                  height={80}
                />
              ) : (
                <span className="text-3xl">{nickname.charAt(0)}</span>
              )}
            </div>
          </Link>
        </figure>
        <div className="card-body flex-row p-5">
          <Link href={`/users/${id}`} className="flex-1 content-center">
            <h3 className="card-title">
              {nickname}{" "}
              {role.toLowerCase() !== "user" && (
                <span className="badge badge-secondary align-middle">
                  {role}
                </span>
              )}
            </h3>
            <p>
              {country && <span className={`fi fi-${country}`} />} {signature}
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
      {isEnded && <div className="divider">That&apos;s all</div>}
    </>
  );
}
