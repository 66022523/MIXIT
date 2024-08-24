import Link from "next/link";
import useSWR from "swr";
import { Fragment } from "react";
import { FireIcon } from "@heroicons/react/24/solid";

import { Tag, TagPlaceholder } from "./tag";

import { EmptyPlaceholder } from "./error";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { createClient } from "@/utils/supabase/component";

export default function Sidebar() {
  const supabase = createClient();
  const { data: circles } = useSWR("/api/v1/circles");
  const { data: tags } = useSWR("/api/v1/tags");

  return (
    <>
      {circles?.length && (
        <div className="carousel w-full">
          {circles.map((circle, index) => {
            const { data: cover } = supabase.storage
              .from("circles")
              .getPublicUrl(circle.cover_url);

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
                      backgroundImage: `url(${cover.publicUrl})`,
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
                      <Tag id={tag.id} name={tag.name} />
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
      <div className="hidden lg:block">
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
        <p>© Copyright MIXIT. All Rights Reserved.</p>
      </div>
    </>
  );
}
