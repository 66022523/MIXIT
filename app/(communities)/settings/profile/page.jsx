"use client";
import { useState, useEffect, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ExclamationTriangleIcon,
  MapPinIcon,
  PencilIcon,
  PencilSquareIcon,
  TagIcon,
  UserIcon as UserOutlineIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { UserIcon as UserSolidIcon } from "@heroicons/react/24/solid";
import { CountryDropdown } from "react-country-region-selector";

import { useProfile } from "@/contexts/profileContext";

import { updateProfileAction } from "@/lib/actions/user";

import { Section } from "@/components/section";

import config from "@/config";

export default function ProfileSettings() {
  const profile = useProfile();

  const [cover, setCover] = useState();
  const [avatar, setAvatar] = useState();
  const [nickname, setNickname] = useState();
  const [pronoun, setPronoun] = useState();
  const [country, setCountry] = useState();
  const [signature, setSignature] = useState();
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

  const pronounOptions = [
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

  const submitAction = async (formData) => {
    startTransition(async () => {
      const status = await updateProfileAction(formData);

      setStatus(status);
    });
  };
  const handlePreviewImage = (event, dispatch) => {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event) => dispatch(event.target.result);
  };

  useEffect(() => {
    if (profile) {
      setCover(profile.cover_url);
      setAvatar(profile.avatar_url);
      setNickname(profile.nickname);
      setPronoun(profile.pronouns);
      setCountry(profile.country);
      setSignature(profile.signature);
    }
  }, [profile]);

  return (
    <form className="space-y-4" action={submitAction}>
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
          <label className="btn btn-circle rounded-full" disabled={isPending}>
            <input
              type="file"
              name="cover"
              accept="image/*"
              hidden
              onChange={(event) => handlePreviewImage(event, setCover)}
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
              <Image
                src={avatar}
                alt={profile?.nickname}
                width={80}
                height={80}
              />
            ) : (
              <span className="text-3xl">{profile?.nickname?.charAt(0)}</span>
            )}
          </div>
        </div>
        <div className="join">
          <label className="btn btn-primary" disabled={isPending}>
            <input
              type="file"
              className="file-input join-item file-input-bordered w-full max-w-xs"
              name="avatar"
              accept="image/*"
              hidden
              onChange={(event) => handlePreviewImage(event, setAvatar)}
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
              {config.validation.nicknameMaxLength - nickname?.length || 0}/
              {config.validation.nicknameMaxLength}
            </span>
          </div>
          <input
            type="text"
            placeholder="Kevin"
            className="input input-bordered w-full"
            name="nickname"
            value={nickname}
            maxLength={config.validation.nicknameMaxLength}
            disabled={isPending}
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
            name="pronoun"
            value={pronoun}
            disabled={isPending}
            onChange={(event) => setPronoun(event.target.value)}
          >
            <option value="Do not specify">Don&apos;t specified</option>
            {pronounOptions.map((option, index) => (
              <option value={option.value} key={index}>
                {option.name}
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
          defaultOptionLabel="Do not specify"
          name="country"
          value={country?.toUpperCase()}
          valueType="short"
          disabled={isPending}
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
            {config.validation.signatureMaxLength - signature?.length || 0}/
            {config.validation.signatureMaxLength}
          </span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24"
          placeholder="Nice to meet you"
          name="signature"
          value={signature}
          maxLength={config.validation.signatureMaxLength}
          disabled={isPending}
          onChange={(event) => setSignature(event.target.value)}
        />
      </label>
      {status?.message && (
        <div role="alert" className={`alert alert-${status.type}`}>
          {status.type === "danger" ? (
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
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          {isPending && <span className="loading loading-spinner" />} Update
        </button>
      </div>
    </form>
  );
}
