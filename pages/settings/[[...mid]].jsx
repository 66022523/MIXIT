import { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MapPinIcon,
  PencilIcon,
  PencilSquareIcon,
  TagIcon,
  UserIcon as UserOutlineIcon,
  XCircleIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon as UserSolidIcon } from "@heroicons/react/24/solid";
import { CountryDropdown } from "react-country-region-selector";

import { Section, NotFound, Copyright } from "@/components/content";

import { SessionContext } from "@/contexts/session";

import { createClient as createServerClient } from "@/utils/supabase/server-props";
import { createClient } from "@/utils/supabase/component";
import { fetcher } from "@/utils/fetcher";

export function AccountSettings() {
  return <>test 4</>;
}

export function PrivacySettings() {
  return <>test 3</>;
}

export function SecuritySettings() {
  return <>test 2</>;
}

export function ProfileSettings() {
  const supabase = createClient();
  const session = useContext(SessionContext);

  const { data: user } = useSWR(
    session && `/api/v1/users/${session?.user.id}`,
    fetcher,
  );

  const [cover, setCover] = useState(user?.cover_url);
  const [avatar, setAvatar] = useState(user?.avatar_url);
  const [nickname, setNickname] = useState(user?.nickname);
  const [pronoun, setPronoun] = useState(user?.pronouns);
  const [country, setCountry] = useState(user?.country);
  const [signature, setSignature] = useState(user?.signature);
  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false,
  });

  const maxNicknameLength = 20;
  const pronouns = [
    {
      name: "He/Him",
      value: "He/Him",
    },
    {
      name: "She/Her",
      value: "She/Her",
    },
    {
      name: "They/Them",
      value: "They/Them",
    },
  ];
  const maxSignatureLength = 256;

  const handleUpdateProfile = async (event) => {
    event.preventDefault();

    const updateStatus = (type, message, loading) => {
      setStatus({ type: type, message: message, loading: loading });
      setTimeout(
        () => setStatus({ type: "", message: "", loading: false }),
        3000,
      );
    };

    updateStatus("", "", true);

    // Upload and download user cover and avatar to storage
    if (cover !== user.cover_url) {
      const { error: coverUploadError } = await supabase.storage
        .from("users")
        .upload(`${session.user.id}/cover.png`, cover, {
          upsert: true,
        });

      if (coverUploadError) updateStatus("error", coverUploadError, false);

      const { data: coverDownloadData } = supabase.storage
        .from("users")
        .getPublicUrl(`${session.user.id}/cover.png`);

      setCover(coverDownloadData.publicUrl);
    }
    if (avatar !== user.avatar_url) {
      const { error: avatarUploadError } = await supabase.storage
        .from("users")
        .upload(`${session.user.id}/avatar.png`, avatar, {
          upsert: true,
        });

      if (avatarUploadError) updateStatus("error", avatarUploadError, false);

      const { data: avatarDownloadData } = supabase.storage
        .from("users")
        .getPublicUrl(`${session.user.id}/avatar.png`);

      setAvatar(avatarDownloadData.publicUrl);
    }

    // Update user profile to database
    const { error: userUpdateError } = await supabase
      .from("users")
      .update(
        JSON.parse(
          JSON.stringify({
            cover_url: cover !== user.cover_url && cover,
            avatar_url: avatar !== user.avatar_url && avatar,
            nickname: nickname !== user.nickname && nickname,
            pronouns: pronoun !== user.pronouns && pronoun,
            country: country !== user.country && country,
            signature: signature !== user.signature && signature,
          }),
        ),
      )
      .eq("id", session.user.id);

    if (userUpdateError) updateStatus("error", userUpdateError, false);
    updateStatus("success", "", false);
  };
  const handleImageToBase64 = (event, setProp) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => setProp(event.target.result);
  };

  return (
    <form className="space-y-4" onSubmit={handleUpdateProfile}>
      <Section
        Icon={UserSolidIcon}
        title="Profile"
        description="Some changes to the information may take a few minutes."
      />
      <div
        className="hero relative z-20 h-80 overflow-clip rounded-box bg-base-300"
        style={{
          backgroundImage: `url(${cover || "\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath fill-rule='evenodd' d='M11 0l5 20H6l5-20zm42 31a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM0 72h40v4H0v-4zm0-8h31v4H0v-4zm20-16h20v4H20v-4zM0 56h40v4H0v-4zm63-25a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM53 41a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-30 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-28-8a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zM56 5a5 5 0 0 0-10 0h10zm10 0a5 5 0 0 1-10 0h10zm-3 46a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm10 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM21 0l5 20H16l5-20zm43 64v-4h-4v4h-4v4h4v4h4v-4h4v-4h-4zM36 13h4v4h-4v-4zm4 4h4v4h-4v-4zm-4 4h4v4h-4v-4zm8-8h4v4h-4v-4z'/%3E%3C/g%3E%3C/svg%3E\""})`,
        }}
      >
        <div className="hero-overlay bg-opacity-60" />
        <div className="hero-content text-center text-neutral-content">
          <label
            className="btn btn-circle rounded-full"
            disabled={status.loading}
          >
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(event) => handleImageToBase64(event, setCover)}
            />
            <PencilSquareIcon className="size-4" />
          </label>
          <small>Recommended cover size is 1280x320.</small>
        </div>
      </div>
      <div className="flex items-center gap-4 py-4">
        <div className={`avatar ${avatar ? "" : "placeholder"}`}>
          <div
            className={`w-20 rounded-full ${avatar ? "" : "bg-neutral text-neutral-content"}`}
          >
            {avatar ? (
              <Image src={avatar} alt={user?.nickname} width={80} height={80} />
            ) : (
              <span className="text-3xl">{user?.nickname?.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="join">
          <label className="btn btn-primary" disabled={status.loading}>
            <input
              type="file"
              className="file-input join-item file-input-bordered w-full max-w-xs"
              accept="image/*"
              hidden
              onChange={(event) => handleImageToBase64(event, setAvatar)}
            />
            Change Avatar
          </label>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <TagIcon className="size-4" />
              Nickname
            </span>
            <span className="label-text-alt">
              {maxNicknameLength - nickname?.length}/{maxNicknameLength}
            </span>
          </div>
          <input
            type="text"
            placeholder="Kevin"
            className="input input-bordered w-full"
            value={nickname}
            maxLength={maxNicknameLength}
            disabled={status.loading}
            onChange={(event) => setNickname(event.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text flex items-center gap-1">
              <UserOutlineIcon className="size-4" />
              Pronouns
            </span>
          </div>
          <select
            className="select select-bordered"
            value={pronoun}
            disabled={status.loading}
            onChange={(event) => setPronoun(event.target.value)}
          >
            <option value="Do not specified">Don&apos;t specified</option>
            {pronouns.map((pronoun, index) => (
              <option value={pronoun.value} key={index}>
                {pronoun.name}
              </option>
            ))}
            <option value="Custom">Custom</option>
          </select>
        </label>
      </div>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <MapPinIcon className="size-4" />
            Country
          </span>
        </div>
        <CountryDropdown
          classes="select select-bordered"
          defaultOptionLabel="Don't specified"
          value={country?.toUpperCase()}
          valueType="short"
          disabled={status.loading}
          onChange={(value) => setCountry(value)}
        />
      </label>
      <label className="form-control">
        <div className="label">
          <span className="label-text flex items-center gap-1">
            <PencilIcon className="size-4" />
            Signature
          </span>
          <span className="label-text-alt">
            {maxSignatureLength - signature?.length}/{maxSignatureLength}
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Nice to meet you"
          value={signature}
          maxLength={maxSignatureLength}
          disabled={status.loading}
          onChange={(event) => setSignature(event.target.value)}
        />
      </label>
      {status.type && status.message && (
        <div role="alert" className={`alert alert-${status.type}`}>
          {status.type === "error" ? (
            <XCircleIcon className="size-6 shrink-0 stroke-current" />
          ) : (
            status.type === "warning" && (
              <ExclamationTriangleIcon className="size-6 shrink-0 stroke-current" />
            )
          )}
          <span>{status.message}</span>
        </div>
      )}
      <p>
        You can change visibility your information on{" "}
        <Link className="link link-primary" href="/settings/privacy">
          privacy
        </Link>{" "}
        settings.
      </p>
      <div className="modal-action justify-center">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={status.loading}
        >
          {status.loading ? (
            <span className="loading loading-spinner" />
          ) : status.type === "success" ? (
            <CheckCircleIcon className="size-5" />
          ) : status.type === "error" ? (
            <XCircleIcon className="size-5" />
          ) : (
            status.type === "warning" && (
              <ExclamationTriangleIcon className="size-5" />
            )
          )}{" "}
          Update
        </button>
      </div>
    </form>
  );
}

export function Component() {
  const router = useRouter();
  const session = useContext(SessionContext);

  const MIDQuery = router.query.mid ?? [
    session ? "profile" : "privacy",
  ];
  const menus = [
    {
      id: "profile",
      icon: <IdentificationIcon className="size-6" />,
      name: "Profile",
      content: <ProfileSettings />,
      mustSignIn: true,
    },
    {
      id: "security",
      icon: <ShieldCheckIcon className="size-6" />,
      name: "Security",
      content: <SecuritySettings />,
      mustSignIn: true,
    },
    {
      id: "privacy",
      icon: <LockClosedIcon className="size-6" />,
      name: "Privacy",
      content: <PrivacySettings />,
      mustSignIn: false,
    },
    {
      id: "account",
      icon: <UserCircleIcon className="size-6" />,
      name: "Account",
      content: <AccountSettings />,
      mustSignIn: true,
    },
  ];

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };

  return (
    <div className="grid grid-cols-4 gap-12 p-12">
      <div className="col-span-1">
        <div className="sticky top-12 space-y-4">
          <ul className="menu rounded-box bg-base-200/80">
            <li className="menu-title">Settings</li>
            {menus.map((menu, index) => (
              <li key={index}>
                <Link
                  className={MIDQuery[0] === menu.id ? "active" : ""}
                  href={
                    menu.mustSignIn && !session ? "" : `/settings/${menu.id}`
                  }
                  onClick={
                    menu.mustSignIn && !session ? handleShowSignInModal : null
                  }
                >
                  {menu.icon}
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
          <Copyright />
        </div>
      </div>
      <div className="col-span-3">
        {menus.find((menu) => menu.id === MIDQuery[0])?.content || (
          <NotFound
            title="Menu not found"
            description="This menu may have been moved or deleted."
          />
        )}
      </div>
    </div>
  );
}

export default function Settings({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}

export async function getServerSideProps(context) {
  const supabase = createServerClient(context);
  const { data, error } = await supabase.auth.getUser();
  const user = await fetcher(
    `http://localhost:3000/api/v1/users/${data.user?.id}`,
  );

  return {
    props: {
      fallback: {
        [`/api/v1/users/${data.user?.id}`]: user,
      },
    },
  };
}
