import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { EnvelopeIcon, KeyIcon, QuestionMarkCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

import { createClient } from "@/utils/supabase/component";

export function Modal({ id, description, children }) {
  return (
    <dialog id={id} className="modal backdrop-blur-lg">
      <div className="modal-box p-7 text-center">
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
        <h1 className="text-4xl font-bold text-primary">MIXIT</h1>
        <p>{description}</p>
        <br />
        {children}
        <div className="divider">Other</div>
        <div className="flex justify-center gap-5">
          <button className="btn btn-circle btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <g>
                <path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
              </g>
            </svg>
          </button>
          <button className="btn btn-circle btn-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="size-5"
            >
              <g>
                <path d="M24,12.073c0,5.989-4.394,10.954-10.13,11.855v-8.363h2.789l0.531-3.46H13.87V9.86c0-0.947,0.464-1.869,1.95-1.869h1.509   V5.045c0,0-1.37-0.234-2.679-0.234c-2.734,0-4.52,1.657-4.52,4.656v2.637H7.091v3.46h3.039v8.363C4.395,23.025,0,18.061,0,12.073   c0-6.627,5.373-12,12-12S24,5.445,24,12.073z" />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </dialog>
  );
}

export function SignInModal() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) console.error(error);
  };

  return (
    <Modal id="auth-sign-in" description="Account Sign In">
      <form>
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
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <br />
        <button
          type="button"
          className="btn btn-primary w-full"
          onClick={handleSignIn}
        >
          Sign in
        </button>
      </form>
      <div className="flex justify-between p-2">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            document.getElementById("auth-sign-in").close();
            document.getElementById("auth-sign-up").showModal();
          }}
        >
          Sign up
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            document.getElementById("auth-sign-in").close();
            document.getElementById("auth-forgot").showModal();
          }}
        >
          Forgot Password
        </button>
      </div>
    </Modal>
  );
}

export function SignUpModal() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [legal, setLegal] = useState(false);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) console.error(error);

    router.push("/");
  };

  return (
    <Modal id="auth-sign-up" description="Account Sign Up">
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
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="label">
          <span className="label-text-alt text-start">
            Password must be 8-30 characters and a combination of numbers,
            letters, or special characters
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
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
      </label>
      <br />
      <button
        type="button"
        className="btn btn-primary w-full"
        onClick={handleSignUp}
      >
        Sign up
      </button>
      <div className="form-control">
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="checkbox-primary checkbox rounded-full"
            value={legal}
            onChange={(event) => setLegal(event.target.value)}
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
      <p>
        Already have an account?{" "}
        <a
          className="link link-primary"
          onClick={() => {
            document.getElementById("auth-sign-up").close();
            document.getElementById("auth-sign-in").showModal();
          }}
        >
          Sign in
        </a>
      </p>
    </Modal>
  );
}

export function ForgotModal() {
  return (
    <Modal id="auth-forgot" description="Account Reset Password">
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
        />
      </label>
      <br />
      <button className="btn btn-primary w-full">Submit</button>
      <div className="flex justify-between p-2">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            document.getElementById("auth-forgot").close();
            document.getElementById("auth-sign-up").showModal();
          }}
        >
          Sign up
        </button>
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => {
            document.getElementById("auth-forgot").close();
            document.getElementById("auth-sign-in").showModal();
          }}
        >
          Sign in
        </button>
      </div>
    </Modal>
  );
}

export default function Auth() {
  return (
    <>
      <SignInModal />
      <SignUpModal />
      <ForgotModal />
    </>
  );
}
