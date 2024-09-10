"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  KeyIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { signInAction } from "@/lib/actions/auth";

export function SignIn() {
  const router = useRouter();
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

  const submitAction = (formData) => {
    startTransition(async () => {
      const status = await signInAction(formData);

      setStatus(status);

      if (status.type === "success") {
        setStatus(null);
        router.back();
      }
    });
  };

  return (
    <form className="w-full space-y-4" action={submitAction}>
      <p>Account Sign In</p>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex gap-2">
            <EnvelopeIcon className="size-5" />
            Email
          </span>
        </div>
        <input
          type="email"
          placeholder="example@domain.subdomain"
          className="input input-bordered w-full"
          name="email"
          required
          disabled={isPending}
        />
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex gap-2">
            <KeyIcon className="size-5" />
            Password
          </span>
        </div>
        <input
          type="password"
          placeholder="12345678"
          className="input input-bordered w-full"
          name="password"
          required
          disabled={isPending}
        />
      </label>
      {status?.message && (
        <div role="alert" className={`alert alert-${status.type}`}>
          {status.type === "danger" ? (
            <XCircleIcon className="size-6" />
          ) : status.type === "warning" ? (
            <ExclamationTriangleIcon className="size-6" />
          ) : (
            <InformationCircleIcon className="size-6" />
          )}
          <span>{status.message}</span>
        </div>
      )}
      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={isPending}
      >
        {isPending && <span className="loading loading-spinner" />} Sign in
      </button>
      <div className="flex justify-between p-2">
        <Link href="/forgot" className="btn btn-ghost btn-sm">
          Forgot Password
        </Link>
        <Link href="/sign-up" className="btn btn-ghost btn-sm">
          Sign up
        </Link>
      </div>
    </form>
  );
}
