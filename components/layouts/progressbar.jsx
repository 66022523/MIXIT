"use client";
import { AppProgressBar } from "next-nprogress-bar";

export function ProgressBar() {
  return (
    <AppProgressBar
      height="3px"
      color="oklch(var(--p))"
      options={{ showSpinner: false }}
      shallowRouting
    />
  );
}
