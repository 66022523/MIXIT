import Link from "next/link";
import {
  IdentificationIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { ProfileProvider } from "./_contexts/profileContext";

import config from "@/config";

import { getUser as getAuthUser } from "@/lib/queries/auth";

export default async function SettingsLayout({ children }) {
  const { user } = await getAuthUser();

  const menuOptions = [
    {
      id: "profile",
      icon: <IdentificationIcon className="size-6" />,
      name: "Profile",
      userRequired: true,
    },
    {
      id: "security",
      icon: <ShieldCheckIcon className="size-6" />,
      name: "Security",
      userRequired: true,
    },
    {
      id: "privacy",
      icon: <LockClosedIcon className="size-6" />,
      name: "Privacy",
      userRequired: false,
    },
    {
      id: "account",
      icon: <UserCircleIcon className="size-6" />,
      name: "Account",
      userRequired: true,
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-12 p-12">
      <div className="col-span-1">
        <div className="sticky top-12 space-y-4">
          <ul className="menu rounded-box bg-base-200/80">
            <li className="menu-title">Settings</li>
            {menuOptions.map(
              (option, index) =>
                (option.userRequired ? user : true) && (
                  <li key={index}>
                    <Link href={`/settings/${option.id}`}>
                      {option.icon}
                      {option.name}
                    </Link>
                  </li>
                ),
            )}
          </ul>
          <p>© Copyright {config.metadata.name}. All Rights Reserved.</p>
        </div>
      </div>
      <div className="col-span-3">
        <ProfileProvider>{children}</ProfileProvider>
      </div>
    </div>
  );
}
