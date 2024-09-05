import Link from "next/link";
import useSWR from "swr";
import { Fragment } from "react";
import { FireIcon } from "@heroicons/react/24/solid";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
} from "@heroicons/react/24/outline";
import { js_beautify } from "js-beautify";

import { Tag, TagPlaceholder } from "./tag";

import { fetcher } from "@/utils/fetcher";

export function Favicon(props) {
  return (
    <Link href="/" {...props}>
      MIXIT
    </Link>
  );
}

export function Section({
  backLink,
  id,
  Icon,
  inline,
  title,
  description,
  descriptionClass,
  hint,
  hintClass,
  children,
}) {
  return (
    <div className="flex items-center gap-2" id={id}>
      {backLink && (
        <Link href={backLink} className="btn btn-circle btn-ghost">
          <ChevronLeftIcon className="size-5" />
        </Link>
      )}
      <Icon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
      <div className={inline && "flex items-center gap-2"}>
        <h2 className="font-bold">{title}</h2>
        {description && <p className={descriptionClass}>{description}</p>}
        {hint && <small className={hintClass}>{hint}</small>}
      </div>
      {children}
    </div>
  );
}

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
        className={`size-${iconSize || 20} p-${iconPadding || 4} ${iconCenter && "mx-auto"} rounded-full text-warning shadow-inner shadow-warning`}
      />
      {title && <h1 className="font-black">{title}</h1>}
      {description && <p>{description}</p>}
      {error && (
        <div className="mockup-code text-start">
          {js_beautify(JSON.stringify(error) || error)
            .split("\n")
            .map((line, index) => (
              <pre data-prefix={index + 1} key={index}>
                <code className="language-json">{line}</code>
              </pre>
            ))}
        </div>
      )}
    </div>
  );
}

export function EmptyPlaceholder({
  className,
  icon,
  title,
  description,
  children,
}) {
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

export function Empty({ description }) {
  return (
    <div className="items-center space-y-2 p-10 text-center">
      <CubeTransparentIcon className="mx-auto size-12 text-gray-400" />
      <p>{description}</p>
    </div>
  );
}

export function Copyright(props) {
  return <p {...props}>© Copyright MIXIT. All Rights Reserved.</p>;
}

export function Content({ className, children }) {
  const { data: circles } = useSWR("/api/v1/circles", fetcher);
  const { data: tags } = useSWR("/api/v1/tags", fetcher);

  return (
    <div
      className={`grid min-h-screen grid-cols-4 gap-12 lg:flex-nowrap ${className}`}
    >
      <div className="col-span-4 space-y-4 lg:col-span-3 lg:space-y-12">
        {children}
      </div>
      <div className="sticky bottom-0 col-span-4 space-y-4 lg:col-span-1 lg:space-y-12">
        {circles?.length && (
          <div className="carousel w-full">
            {circles.map((circle, index) => {
              return (
                <div
                  id={circle.id}
                  className="carousel-item relative w-full"
                  key={index}
                >
                  <Link
                    className="h-80 w-full rounded-xl bg-gradient-to-t from-blue-500 to-base-100 p-2"
                    href={`/circles/${circle.id}`}
                  >
                    <div
                      className="hero h-full place-items-end overflow-hidden rounded-xl"
                      style={{
                        backgroundImage: `url(${circle.cover_url})`,
                      }}
                    >
                      <div className="hero-overlay bg-transparent bg-gradient-to-t from-base-100 to-transparent" />
                      <div className="hero-content p-5">
                        <div className="max-w-md">
                          <h3 className="mb-3 font-bold">
                            {circle.name}
                            {/* <div className="badge badge-primary">CBT3</div> */}
                          </h3>
                          {/* <small className="mb-3">12/01/2024 • 00:00:00 UTC</small> */}
                          <p className="line-clamp-2">{circle.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a
                      href={`#${circle.id === 1 ? circles.length : circle.id - 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      <ChevronLeftIcon className="size-5" />
                    </a>
                    <a
                      href={`#${circle.id === circles.length ? 1 : circle.id + 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      <ChevronRightIcon className="size-5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="card bg-base-100">
          <div className="card-body space-y-4">
            <h2 className="card-title">
              <FireIcon className="size-8 rounded-full bg-error p-1 text-error-content" />
              Hot Topics
            </h2>
            {tags?.length ? (
              <>
                <ul className="list-none">
                  {tags.map((tag, index) => (
                    <Fragment key={index}>
                      <li>
                        <Tag
                          id={tag.id}
                          name={tag.name}
                          postLength={tag.posts?.length || 0}
                        />
                      </li>
                      {index + 1 !== tags.length && (
                        <li>
                          <div className="divider" />
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
                <div className="card-actions">
                  <Link href="/tags" className="btn btn-primary w-full">
                    View More
                  </Link>
                </div>
              </>
            ) : (
              <EmptyPlaceholder
                title="Empty Tags"
                description="There are currently no tags."
              >
                <ul className="list-none">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Fragment key={index}>
                      <li>
                        <TagPlaceholder />
                      </li>
                      {index + 1 !== 5 && (
                        <li>
                          <div className="divider" />
                        </li>
                      )}
                    </Fragment>
                  ))}
                </ul>
              </EmptyPlaceholder>
            )}
          </div>
        </div>
        <ul className="list-disc">
          <li>
            <Link className="link link-primary" href="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="link link-primary" href="/agreements/terms">
              Terms of Services
            </Link>
          </li>
          <li>
            <Link className="link link-primary" href="/agreements/privacy">
              Privacy of Policy
            </Link>
          </li>
          <li>
            <Link className="link link-primary" href="/agreements/cookies">
              Cookies Policy
            </Link>
          </li>
        </ul>
        <Copyright />
      </div>
    </div>
  );
}
