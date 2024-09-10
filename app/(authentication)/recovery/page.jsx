"use client";
import { useState, useTransition } from "react";
import Link from "next/link";
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  KeyIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/solid";

import { recoveryAction } from "@/lib/actions/auth";

import config from "@/config";

export default function Page() {
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

  const submitAction = (event) => {
    startTransition(async () => {
      const status = await recoveryAction(event);

      setStatus(status);
    });
  };

  return (
    <form action={submitAction}>
      <h2 className="card-title">
        <WrenchIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
        Recovery
      </h2>
      <p>Recover your account by resetting your password.</p>
      <label
        className="form-control w-full"
        disabled={isPending || status?.type === "success"}
      >
        <div className="label">
          <span className="label-text flex gap-2">
            <KeyIcon className="size-5" />
            New Password
          </span>
        </div>
        <input
          type="password"
          placeholder="Type your new password"
          className="input input-bordered w-full"
          name="newPassword"
          required
          pattern={config.validation.passwordRegex}
          minLength={config.validation.passwordMinLength}
        />
        <div className="label">
          <span className="label-text-alt text-start">
            Minimum {config.validation.passwordMinLength} characters, lowercase,
            uppercase letters, digits and symbols
          </span>
        </div>
      </label>
      <label
        className="form-control w-full"
        disabled={isPending || status?.type === "success"}
      >
        <div className="label">
          <span className="label-text flex gap-2">
            <KeyIcon className="size-5" />
            Confirm Password
          </span>
        </div>
        <input
          type="password"
          placeholder="Type confirm password"
          className="input input-bordered w-full"
          name="confirmPassword"
          required
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
      <div className="card-actions mt-4">
        {status?.type === "success" ? (
          <Link href="/" className="btn btn-primary">
            Go Back
          </Link>
        ) : (
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            {isPending && <span className="loading loading-ball" />} Recovery
          </button>
        )}
      </div>
    </form>
  );
}
