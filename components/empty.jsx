"use client"

import { CubeTransparentIcon } from "@heroicons/react/24/solid";

import { Code } from "@/components/mockup";

export function NotFound({
  iconSize,
  iconPadding,
  iconCenter,
  title,
  description,
  error,
}) {
  return (
    <div className="max-w-md space-y-4 p-5">
      <CubeTransparentIcon
        className={`${iconSize ? `size-${iconSize}` : "size-20"} ${iconPadding ? `p-${iconPadding}` : "p-4"} ${iconCenter && "mx-auto"} rounded-full text-warning shadow-inner shadow-warning`}
      />
      {title && <h1 className="font-black">{title}</h1>}
      {description && <p>{description}</p>}
      {error && <Code>{error}</Code>}
    </div>
  );
}

export function Placeholder({ className, icon, title, description, children }) {
  return (
    <div
      className={`relative overflow-clip rounded-2xl bg-base-100 ${className}`}
    >
      {children}
      <div className="absolute left-1/2 top-1/2 z-10 size-full -translate-x-1/2 -translate-y-1/2 content-center rounded-box bg-neutral bg-opacity-60 text-center text-neutral-content">
        {icon}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}

export function Empty({ title, description }) {
  return (
    <div className="items-center space-y-2 p-10 text-center">
      <CubeTransparentIcon className="mx-auto size-12 text-gray-400" />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}
