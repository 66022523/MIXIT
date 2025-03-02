"use client";
import { useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Error({ error, reset }) {
  useEffect(() => console.error(error), [error]);

  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 space-y-4 text-center">
      <DotLottieReact
        className="h-60"
        src="/assets/animations/cat-in-library.json"
        loop
        autoplay
      />
      <div>
        <h2 className="font-bold">
          <u>500</u> - Server-side error occurred
        </h2>
        <p>
          There is a temporary problem with the internal system, we are urgently
          working to fix it.
        </p>
      </div>
      <button
        type="button"
        className="btn btn-ghost btn-sm"
        onClick={() => reset()}
      >
        <ArrowPathIcon className="size-5" />
        Try again
      </button>
    </div>
  );
}
