"use client";
import { useState, useTransition } from "react";
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  KeyIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { recoveryAction } from "@/libs/actions/auth";

import configs from "@/configs";

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
    <form className="w-full space-y-4" action={submitAction}>
      <p>Recover your account by resetting your password.</p>
      {status?.type === "success" ? (
        <div className="card bg-base-200">
          <div className="card-body">
            <CheckCircleIcon className="mx-auto size-20 rounded-full p-4 text-success shadow-inner shadow-success" />
            <p>Your account has been restored, you can close this page.</p>
          </div>
        </div>
      ) : (
        <>
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
              pattern={configs.validation.password_regex}
              minLength={configs.validation.min_password}
            />
            <div className="label">
              <span
                className={`label-text-alt text-start ${status?.errors?.password ? "text-error" : ""}`}
              >
                {status?.errors?.password ? (
                  <>
                    <p>Password must:</p>
                    <ul className="list-disc">
                      {status.errors.password.map((error) => (
                        <li key={error}>{error}</li>
                      ))}
                    </ul>
                  </>
                ) : (
                  `Minimum ${configs.validation.min_password} characters, lowercase, uppercase letters, digits and symbols`
                )}
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
            {status?.errors?.confirmPassword && (
              <div className="label">
                <span className="label-text-alt text-error">
                  {status.errors.confirmPassword}
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
          <div className="card-actions mt-4">
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={isPending}
            >
              {isPending && <span className="loading loading-ball" />} Recovery
            </button>
          </div>
        </>
      )}
    </form>
  );
}
