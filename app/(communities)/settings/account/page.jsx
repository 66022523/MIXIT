import { Section } from "@/components/section";
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  IdentificationIcon,
  KeyIcon,
  LockClosedIcon,
  PlusCircleIcon,
  QuestionMarkCircleIcon,
  UserCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";

import { getUser } from "@/libs/queries/auth";
import { getUserProfile } from "@/libs/queries/users";
import Image from "next/image";
import Link from "next/link";

export default async function AccountSettings() {
  const { user } = await getUser();
  const { data: userProfileData } = await getUserProfile(user.id);

  return (
    <div className="space-y-4">
      <Section
        Icon={UserCircleIcon}
        title="Account"
        description="Manage your account settings"
      />
      <div className="card image-full before:!bg-base-100">
        <figure>
          <Image
            src={
              userProfileData.cover_url ||
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E"
            }
            width={1280}
            height={720}
            alt={userProfileData.nickname}
            className="rounded-xl"
          />
        </figure>
        <div className="card-body space-y-4 !text-base-content">
          <div className="flex items-center gap-4">
            <Image
              className="rounded-full"
              src={userProfileData.avatar_url || ""}
              alt={userProfileData.nickname}
              width={50}
              height={50}
            />
            <div className="flex-1">
              <h2 className="card-title">{userProfileData.nickname}</h2>
              <p className="line-clamp-1">{userProfileData.signature}</p>
            </div>
            <Link href="/settings/profile" className="btn btn-primary">
              Edit
            </Link>
          </div>
          <div className="card bg-base-200/60 backdrop-blur">
            <div className="card-body space-y-2">
              <h2 className="card-title">Account Details</h2>
              <div className="flex items-center gap-2">
                <IdentificationIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />{" "}
                <b>ID:</b>
                <span className="line-clamp-1 flex-1">{user.id}</span>
                <button className="btn btn-primary btn-sm">Copy</button>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />{" "}
                <b>Email:</b>
                <span className="line-clamp-1 flex-1">{user.email}</span>
                <Link
                  href="/settings/security#email"
                  className="btn btn-primary btn-sm"
                >
                  Change
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <KeyIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />{" "}
                <b>Password:</b>
                <span className="line-clamp-1 flex-1">********</span>
                <Link
                  href="/settings/security#password"
                  className="btn btn-primary btn-sm"
                >
                  Change
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <QuestionMarkCircleIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />{" "}
                <b>Last Sign In:</b>{" "}
                {new Date(user.last_sign_in_at).toLocaleString()}
              </div>
              <div className="flex items-center gap-2">
                <PlusCircleIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />{" "}
                <b>Joined At:</b> {new Date(user.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100">
        <div className="card-body space-y-4">
          <Section
            Icon={ShieldCheckIcon}
            title="Security"
            description="Always keep your account safe."
          />
          <div className="card bg-green-100 dark:bg-green-900">
            <div className="card-body flex-row items-center gap-4">
              <ShieldCheckIcon className="size-20 rounded-full p-4 text-success shadow-inner shadow-success" />
              <span>
                <h2 className="card-title">All Operational</h2>
                <p>Great, keep your account secure.</p>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="card bg-base-100">
        <div className="card-body">
          <Section
            Icon={ExclamationTriangleIcon}
            title="Delete Account"
            description="Please proceed with caution."
          />
          <p>
            Deleting an account means that you{" "}
            <b>won&apos;t be able to recover</b> your account once it&apos;s
            been deleted.
          </p>
          <div className="card-actions">
            <button type="button" className="btn btn-error">
              <LockClosedIcon className="size-5" /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
