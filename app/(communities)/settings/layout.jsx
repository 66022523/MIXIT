import Link from "next/link";
import {
  IdentificationIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import { ProfileProvider } from "@/contexts/profileContext";

import config from "@/config";

import { getUser } from "@/lib/queries/auth";

export default async function SettingsLayout({ children }) {
  const { user } = await getUser();

  const menuOptions = [
    {
      id: "account",
      icon: <UserCircleIcon className="size-6" />,
      name: "Account",
      userRequired: true,
    },
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
  ];

  return (
    <div className="grid grid-cols-4 gap-12 p-12">
      <div className="col-span-1">
        <div className="sticky top-12 space-y-4">
          <ul className="menu rounded-box bg-base-100/80">
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
        <ProfileProvider id={user?.id}>{children}</ProfileProvider>
      </div>
    </div>
  );
}
