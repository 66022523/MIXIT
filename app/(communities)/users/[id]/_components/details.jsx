"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export function UserDetail({ user, profile }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const handleCopyUserID = () => {
    navigator.clipboard.writeText(profile.id);
    setCopied(true);
  };

  return (
    <div className="absolute top-60 grid w-full grid-cols-2 justify-between px-12">
      <div className="flex gap-4">
        <div className={`avatar ${profile.avatar_url ? "" : "placeholder"}`}>
          <div
            className={`w-24 rounded-full ${profile.avatar_url ? "" : "bg-neutral text-neutral-content"}`}
          >
            {profile.avatar_url ? (
              <Image
                src={profile.avatar_url}
                alt={profile.nickname}
                width={96}
                height={96}
              />
            ) : (
              profile.nickname && (
                <span className="text-3xl">{profile.nickname.charAt(0)}</span>
              )
            )}
          </div>
        </div>
        <div>
          <h1 className="font-bold">
            {profile.nickname}{" "}
            {profile.role.toLowerCase() !== "user" && (
              <span className="badge badge-secondary align-middle">
                {profile.role}
              </span>
            )}
          </h1>
          <small>
            UID:
            <div
              className={`tooltip tooltip-right ${copied ? "tooltip-success" : ""}`}
              data-tip={copied ? "Copied" : "Click to copy"}
              onMouseLeave={() => setTimeout(() => setCopied(false), 200)}
            >
              <button
                className="btn btn-ghost btn-xs"
                disabled={!profile.id}
                onClick={handleCopyUserID}
              >
                {profile.id}
              </button>
            </div>
          </small>
          <p>
            {profile.country && (
              <span className={`fi fi-${profile.country.toLowerCase()}`} />
            )}{" "}
            {profile.signature ?? "No signature"}
          </p>
        </div>
      </div>
      <div className="text-end">
        {user?.id === profile.id ? (
          <Link href="/settings/profile" className="btn">
            Edit Profile
          </Link>
        ) : (
          <button
            className="btn"
            onClick={() => (user ? null : router.push("/sign-in"))}
          >
            Follow
          </button>
        )}
      </div>
    </div>
  );
}
