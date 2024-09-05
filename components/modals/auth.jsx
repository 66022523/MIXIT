import Link from "next/link";
import { useState } from "react";
import { isAuthApiError, isAuthWeakPasswordError } from "@supabase/supabase-js";
import {
  EnvelopeIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  KeyIcon,
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { Favicon } from "../content";

import { createClient } from "@/utils/supabase/component";
import { passwordRegex } from "@/utils/pattern";

function AuthModal({ id, description, children }) {
  const supabase = createClient();

  const handleWithDiscord = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: {
        redirectTo: `http://localhost:3000/api/v1/auth/callback`,
      },
    });
  };
  const handleWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `http://localhost:3000/api/v1/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  return (
    <dialog id={id} className="modal backdrop-blur">
      <div className="overflow-invisible modal-box rounded-badge bg-opacity-80">
        <div className="flex justify-end gap-2">
          <button className="btn btn-circle btn-primary btn-sm">
            <QuestionMarkCircleIcon className="size-6" />
          </button>
          <form method="dialog">
            <button className="btn btn-circle btn-primary btn-sm">
              <XCircleIcon className="size-6" />
            </button>
          </form>
        </div>
        <Favicon className="btn btn-ghost text-center text-4xl font-bold text-primary" />
        <p className="text-center">{description}</p>
        <br />
        {children}
        <div className="divider">Social Media</div>
        <div className="flex justify-center gap-5">
          <button
            className="btn btn-circle btn-primary"
            type="button"
            onClick={handleWithDiscord}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M20.317,4.37c-1.53-0.702-3.17-1.219-4.885-1.515c-0.031-0.006-0.062,0.009-0.079,0.037   c-0.211,0.375-0.445,0.865-0.608,1.249c-1.845-0.276-3.68-0.276-5.487,0C9.095,3.748,8.852,3.267,8.641,2.892   C8.624,2.864,8.593,2.85,8.562,2.855C6.848,3.15,5.208,3.667,3.677,4.37C3.664,4.375,3.652,4.385,3.645,4.397   c-3.111,4.648-3.964,9.182-3.546,13.66c0.002,0.022,0.014,0.043,0.031,0.056c2.053,1.508,4.041,2.423,5.993,3.029   c0.031,0.01,0.064-0.002,0.084-0.028c0.462-0.63,0.873-1.295,1.226-1.994c0.021-0.041,0.001-0.09-0.042-0.106   c-0.653-0.248-1.274-0.55-1.872-0.892c-0.047-0.028-0.051-0.095-0.008-0.128c0.126-0.094,0.252-0.192,0.372-0.291   c0.022-0.018,0.052-0.022,0.078-0.01c3.928,1.793,8.18,1.793,12.061,0c0.026-0.012,0.056-0.009,0.079,0.01   c0.12,0.099,0.246,0.198,0.373,0.292c0.044,0.032,0.041,0.1-0.007,0.128c-0.598,0.349-1.219,0.645-1.873,0.891   c-0.043,0.016-0.061,0.066-0.041,0.107c0.36,0.698,0.772,1.363,1.225,1.993c0.019,0.027,0.053,0.038,0.084,0.029   c1.961-0.607,3.95-1.522,6.002-3.029c0.018-0.013,0.029-0.033,0.031-0.055c0.5-5.177-0.838-9.674-3.548-13.66   C20.342,4.385,20.33,4.375,20.317,4.37z M8.02,15.331c-1.183,0-2.157-1.086-2.157-2.419s0.955-2.419,2.157-2.419   c1.211,0,2.176,1.095,2.157,2.419C10.177,14.246,9.221,15.331,8.02,15.331z M15.995,15.331c-1.182,0-2.157-1.086-2.157-2.419   s0.955-2.419,2.157-2.419c1.211,0,2.176,1.095,2.157,2.419C18.152,14.246,17.206,15.331,15.995,15.331z" />
            </svg>
          </button>
          <button
            className="btn btn-circle btn-primary"
            type="button"
            onClick={handleWithGoogle}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
            </svg>
          </button>
          <button className="btn btn-circle btn-primary" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
            </svg>
          </button>
          <button className="btn btn-circle btn-primary" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <path d="m18.9,1.153h3.682l-8.042,9.189,9.46,12.506h-7.405l-5.804-7.583-6.634,7.583H.469l8.6-9.831L0,1.153h7.593l5.241,6.931,6.065-6.931Zm-1.293,19.494h2.039L6.482,3.239h-2.19l13.314,17.408Z" />
            </svg>
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export function AuthSignInModal() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false,
  });

  const handleCloseModal = () => {
    document.getElementById("auth-sign-in").close();
  };
  const handleSignUpModal = () => {
    handleCloseModal();
    document.getElementById("auth-sign-up").showModal();
  };
  const handleForgotModal = () => {
    handleCloseModal();
    document.getElementById("auth-forgot").showModal();
  };
  const handleSignIn = async (event) => {
    event.preventDefault();

    setStatus({ type: "", message: "", loading: true });

    if (!email)
      return setStatus({
        type: "warning",
        message: "Please enter your email.",
        loading: false,
      });
    if (!password) {
      return setStatus({
        type: "warning",
        message: "Please enter your password.",
        loading: false,
      });
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);

      if (isAuthApiError(error))
        return setStatus({
          type: "warning",
          message: error.message,
          loading: false,
        });

      switch (error.code) {
        case "email_not_confirmed":
          return setStatus({
            type: "warning",
            message:
              "This email address has not been verified. Please check your email.",
            loading: false,
          });
        case "user_banned":
          return setStatus({
            type: "warning",
            message:
              "This user has been banned. Please contact support if you think this is an error.",
            loading: false,
          });
        case "user_not_found":
          return setStatus({
            type: "warning",
            message:
              "The user was not found. Please sign up for an account first.",
            loading: false,
          });
        default:
          return setStatus({
            type: "error",
            message: "An unknown error occurred. Please try again.",
            loading: false,
          });
      }
    }

    handleCloseModal();
  };

  return (
    <AuthModal id="auth-sign-in" description="Account Sign In">
      <form className="space-y-4" onSubmit={handleSignIn}>
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
            value={email}
            required
            disabled={status.loading}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            required
            disabled={status.loading}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {status?.message && (
          <div role="alert" className={`alert alert-${status.type}`}>
            {status.type === "error" ? (
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
          disabled={status.loading}
        >
          {status.loading && <span className="loading loading-spinner" />} Sign
          in
        </button>
      </form>
      <div className="flex justify-between p-2">
        <button className="btn btn-ghost btn-sm" onClick={handleForgotModal}>
          Forgot Password
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleSignUpModal}>
          Sign up
        </button>
      </div>
    </AuthModal>
  );
}

export function AuthSignUpModal() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [legal, setLegal] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false,
  });

  const minNewPasswordLength = 8;

  const handleCloseModal = () => {
    document.getElementById("auth-sign-up").close();
  };
  const handleSignInModal = () => {
    handleCloseModal();
    document.getElementById("auth-sign-in").showModal();
  };
  const handleSignUp = async (event) => {
    event.preventDefault();

    setStatus({ type: "", message: "", loading: true });

    if (!email)
      return setStatus({
        type: "warning",
        message: "Please enter your email.",
        loading: false,
      });
    if (!password)
      return setStatus({
        type: "warning",
        message: "Please enter your password.",
        loading: false,
      });
    if (!confirmPassword)
      return setStatus({
        type: "warning",
        message: "Please confirm your password.",
        loading: false,
      });
    if (password !== confirmPassword)
      return setStatus({
        type: "warning",
        message: "The password does not match, please enter it again.",
        loading: false,
      });
    if (!legal)
      return setStatus({
        type: "warning",
        message: "You must read and acknowledge the app's policies.",
        loading: false,
      });

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: `${email.substring(0, 5)}`,
        },
      },
    });

    if (error) {
      console.error(error);

      if (isAuthWeakPasswordError(error))
        return setStatus({
          type: "warning",
          message:
            "Passwords must be at least 8 - 30 characters long, consisting of lowercase letters, uppercase letters, numbers, and symbols.",
          loading: false,
        });
      if (isAuthApiError(error)) {
        if (error.status === 429)
          return setStatus({
            type: "error",
            message: "Too many requests. Please wait a bit.",
            loading: false,
          });
        return setStatus({
          type: "error",
          message: error.message,
          loading: false,
        });
      }
      switch (error.code) {
        case "email_exists":
          return setStatus({
            type: "warning",
            message: "This email address is already in the system.",
            loading: false,
          });
        case "email_provider_disabled":
          return setStatus({
            type: "warning",
            message:
              "Currently, it is temporarily impossible to apply for a new account.",
            loading: false,
          });
        case "over_email_send_rate_limit":
          return setStatus({
            type: "warning",
            message:
              "Send too many verification emails to such accounts, please try again later.",
            loading: false,
          });
        case "over_request_rate_limit":
          return setStatus({
            type: "warning",
            message:
              "There are too many requests to send confirmation emails, please try again later.",
            loading: false,
          });
        case "email_not_confirmed":
          return setStatus({
            type: "warning",
            message:
              "This email address has not been verified. Please check your email.",
            loading: false,
          });
        case "user_already_exists":
          return setStatus({
            type: "warning",
            message: "There are already such users in the system.",
            loading: false,
          });
        case "user_banned":
          return setStatus({
            type: "warning",
            message:
              "This user has been banned. Please contact support if you think this is an error.",
            loading: false,
          });
        default:
          return setStatus({
            type: "error",
            message: "An unknown error occurred. Please try again.",
            loading: false,
          });
      }
    }

    setStatus({
      type: "info",
      message:
        "Complete the account creation by the verification link sent in the email.",
      loading: false,
    });
  };

  return (
    <AuthModal id="auth-sign-up" description="Account Sign Up">
      <form className="space-y-4" onSubmit={handleSignUp}>
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
            value={email}
            required
            disabled={status.loading}
            onChange={(event) => setEmail(event.target.value)}
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
            pattern={passwordRegex.source}
            minLength={minNewPasswordLength}
            value={password}
            required
            disabled={status.loading}
            onChange={(event) => setPassword(event.target.value)}
          />
          <div className="label">
            <span className="label-text-alt text-start">
              Minimum {minNewPasswordLength} characters, lowercase, uppercase letters, digits and symbols
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
            value={confirmPassword}
            required
            disabled={status.loading}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </label>
        <div className="form-control">
          <label className="label cursor-pointer gap-2">
            <input
              type="checkbox"
              className="checkbox-primary checkbox rounded-full"
              value={legal}
              required
              disabled={status.loading}
              onChange={(event) => setLegal(event.target.value)}
            />
            <span className="label-text text-start">
              By create account you agree{" "}
              <Link
                href="/agreements/terms"
                className="link link-primary"
                onClick={handleCloseModal}
              >
                Terms of Services
              </Link>
              ,{" "}
              <Link
                href="/agreements/privacy"
                className="link link-primary"
                onClick={handleCloseModal}
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                href="/agreements/cookies"
                className="link link-primary"
                onClick={handleCloseModal}
              >
                Cookies Policy
              </Link>
              .
            </span>
          </label>
        </div>
        {status?.message && (
          <div role="alert" className={`alert alert-${status.type}`}>
            {status.type === "error" ? (
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
          disabled={status.loading}
        >
          {status.loading && <span className="loading loading-spinner" />} Sign
          up
        </button>
      </form>
      <p className="text-center">
        Already have an account?{" "}
        <button
          type="button"
          className="link link-primary"
          onClick={handleSignInModal}
        >
          Sign in
        </button>
      </p>
    </AuthModal>
  );
}

export function AuthForgotModal() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false,
  });

  const handleCloseModal = () => {
    document.getElementById("auth-forgot").close();
  };
  const handleSignUpModal = () => {
    handleCloseModal();
    document.getElementById("auth-sign-up").showModal();
  };
  const handleSignInModal = () => {
    handleCloseModal();
    document.getElementById("auth-sign-in").showModal();
  };
  const handleForgot = async (event) => {
    event.preventDefault();

    setStatus({ type: "", message: "", loading: true });

    if (!email)
      return setStatus({
        type: "warning",
        message: "Please enter your email.",
        loading: false,
      });

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      console.error(error);

      if (isAuthApiError(error)) {
        if (error.status === 429)
          return setStatus({
            type: "error",
            message: "Too many requests. Please wait a bit.",
            loading: false,
          });
        return setStatus({
          type: "error",
          message: error.message,
          loading: false,
        });
      }
      return setStatus({
        type: "error",
        message: "An unknown error occurred. Please try again.",
        loading: false,
      });
    }

    setStatus({
      type: "info",
      message: "A password reset email has been sent to the email. ",
      loading: false,
    });
  };

  return (
    <AuthModal id="auth-forgot" description="Account Reset Password">
      <form className="space-y-4" onSubmit={handleForgot}>
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
            required
            disabled={status.loading}
            className="input input-bordered w-full"
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        {status?.message && (
          <div role="alert" className={`alert alert-${status.type}`}>
            {status.type === "error" ? (
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
          disabled={status.loading}
        >
          {status.loading && <span className="loading loading-spinner" />}{" "}
          Submit
        </button>
      </form>
      <div className="flex justify-between p-2">
        <button className="btn btn-ghost btn-sm" onClick={handleSignUpModal}>
          Sign up
        </button>
        <button className="btn btn-ghost btn-sm" onClick={handleSignInModal}>
          Sign in
        </button>
      </div>
    </AuthModal>
  );
}
