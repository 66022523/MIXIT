import { useState } from "react";
import {
  ExclamationTriangleIcon,
  XCircleIcon,
  KeyIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { WrenchIcon } from "@heroicons/react/24/solid";

import { Favicon } from "@/components/content";

import { createClient } from "@/utils/supabase/component";
import { passwordRegex } from "@/utils/pattern";

export default function Recovery() {
  const supabase = createClient();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState({
    type: "",
    message: "",
    loading: false,
  });

  const minNewPasswordLength = 8;

  const handleShowSignInModal = () => {
    document.getElementById("auth-sign-in").showModal();
  };
  const handleRecovery = async (event) => {
    event.preventDefault();

    setStatus({ type: "", message: "", loading: true });

    if (!newPassword)
      return setStatus({
        type: "warning",
        message: "Please enter your new password.",
        loading: false,
      });
    if (!confirmPassword)
      return setStatus({
        type: "warning",
        message: "Please confirm your new password.",
        loading: false,
      });
    if (newPassword !== confirmPassword)
      return setStatus({
        type: "warning",
        message: "The password does not match, please enter it again.",
        loading: false,
      });

    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (data)
      return setStatus({
        type: "success",
        message: "Your password has been updated.",
        loading: false,
      });
    if (error) {
      console.error(error);
      return setStatus({
        type: "warning",
        message: error.message,
        loading: false,
      });
    }
  };

  return (
    <div
      className="hero min-h-screen bg-base-200 bg-auto bg-center"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      <div className="hero-overlay bg-opacity-50" />
      <div className="hero-content">
        <form
          className="card w-full max-w-sm bg-base-100 shadow-2xl"
          onSubmit={handleRecovery}
        >
          <div className="card-body items-center text-center">
            <Favicon className="btn btn-ghost text-2xl font-bold text-primary" />
            <h2 className="card-title">
              <WrenchIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
              Recovery
            </h2>
            <p>Recover your account by resetting your password.</p>
            <label
              className="form-control w-full"
              disabled={status.loading || status.type === "success"}
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
                required
                pattern={passwordRegex.source}
                minLength={minNewPasswordLength}
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
              />
              <div className="label">
                <span className="label-text-alt text-start">
                  Minimum {minNewPasswordLength} characters, lowercase, uppercase letters, digits and symbols
                </span>
              </div>
            </label>
            <label
              className="form-control w-full"
              disabled={status.loading || status.type === "success"}
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
                required
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
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
            <div className="card-actions mt-4">
              {status.type === "success" ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleShowSignInModal}
                >
                  Sign in
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status.loading}
                >
                  {status.loading && <span className="loading loading-ball" />}{" "}
                  Recovery
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
