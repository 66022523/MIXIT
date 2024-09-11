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

import { signUpAction } from "@/lib/actions/auth";

import validation from "@/config";

export function SignUp() {
  const router = useRouter();
  const [status, setStatus] = useState();

  const [isPending, startTransition] = useTransition();

  const submitAction = (formData) => {
    startTransition(async () => {
      const status = await signUpAction(formData);

      setStatus(status);
    });
  };

  return (
    <form className="w-full space-y-4" action={submitAction}>
      <p>Account Sign Up</p>
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
          pattern={validation.passwordRegex}
          minLength={validation.passwordMinLength}
          name="password"
          required
          disabled={isPending}
        />
        <div className="label">
          <span className="label-text-alt text-start">
            Minimum {validation.passwordMinLength} characters, lowercase,
            uppercase letters, digits and symbols
          </span>
        </div>
      </label>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text flex gap-2">
            <KeyIcon className="size-5" />
            Confirm Password
          </span>
        </div>
        <input
          type="password"
          placeholder="12345678"
          className="input input-bordered w-full"
          name="confirmPassword"
          required
          disabled={isPending}
        />
      </label>
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="checkbox-primary checkbox rounded-full"
            name="legal"
            required
            disabled={isPending}
          />
          <span className="label-text text-start">
            By create account you agree{" "}
            <Link href="/agreements/terms" className="link link-primary">
              Terms of Services
            </Link>
            ,{" "}
            <Link href="/agreements/privacy" className="link link-primary">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="/agreements/cookies" className="link link-primary">
              Cookies Policy
            </Link>
            .
          </span>
        </label>
      </div>
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
        {isPending && <span className="loading loading-spinner" />} Sign up
      </button>
      <p className="text-center">
        Already have an account?{" "}
        <Link href="/sign-in" className="link link-primary">
          Sign in
        </Link>
      </p>
    </form>
  );
}
