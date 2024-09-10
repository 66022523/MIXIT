"use client"
import Link from "next/link";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 space-y-4 text-center">
      <DotLottieReact
        className="h-60"
        src="/assets/animations/cat-plasma-globe.json"
        loop
        autoplay
      />
      <div>
        <h2 className="font-bold">
          <u>404</u> - Page Not Found
        </h2>
        <p>This page may have been moved or deleted.</p>
      </div>
      <Link href="/" className="btn btn-ghost btn-sm">
        <ArrowUturnLeftIcon className="size-5" />
        Go Back
      </Link>
    </div>
  );
}