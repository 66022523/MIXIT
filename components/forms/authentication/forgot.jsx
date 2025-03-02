"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { forgotAction } from "@/libs/actions/auth";

export function Forgot() {
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

  const submitAction = (formData) => {
    startTransition(async () => {
      const status = await forgotAction(formData);

      setStatus(status);
    });
  };

  return (
    <form className="w-full space-y-4" action={submitAction}>
      <p>Recovery Account</p>
      <label className="form-control">
        <div className="label">
          <span className="label-text flex gap-2">
            <EnvelopeIcon className="size-5" />
            Email
          </span>
        </div>
        <input
          type="email"
          placeholder="example@domain.subdomain"
          name="email"
          required
          disabled={isPending}
          className="input input-bordered"
        />
        {status?.errors?.email && (
          <div className="label">
            <span className="label-text-alt text-error">
              {status.errors.email}
            </span>
          </div>
        )}
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
        {isPending && <span className="loading loading-spinner" />} Submit
      </button>
      <div className="flex justify-between p-2">
        <Link href="/sign-up" className="btn btn-ghost btn-sm">
          Sign up
        </Link>
        <Link href="/sign-in" className="btn btn-ghost btn-sm">
          Sign in
        </Link>
      </div>
    </form>
  );
}
