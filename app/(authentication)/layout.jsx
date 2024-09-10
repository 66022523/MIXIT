import Link from "next/link";

import { Social } from "@/components/modals/authentication/social";

import config from "@/config";

export default function AuthenticationLayout({ children }) {
  return (
    <main
      className="hero min-h-screen bg-base-200 bg-auto bg-center"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41zM20 18.6l2.83-2.83 1.41 1.41L21.41 20l2.83 2.83-1.41 1.41L20 21.41l-2.83 2.83-1.41-1.41L18.59 20l-2.83-2.83 1.41-1.41L20 18.59z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      }}
    >
      <div className="hero-overlay bg-base-300 bg-opacity-50" />
      <div className="hero-content w-full">
        <div className="card w-full max-w-md bg-base-100 shadow-2xl">
          <div className="card-body items-center text-center">
            <Link
              href="/"
              className="btn btn-ghost text-2xl font-bold text-primary"
            >
              {config.metadata.name}
            </Link>
            {children}
            <Social />
          </div>
        </div>
      </div>
    </main>
  );
}
