import Link from "next/link";
import { Fragment } from "react";
import { FireIcon } from "@heroicons/react/24/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

import { Tag, TagPlaceholder } from "@/components/tag";
import { Placeholder } from "@/components/empty";

import config from "@/config";

import { createClient } from "@/utils/supabase/server";

export async function Sidebar({ className, children }) {
  const supabase = createClient();

  const { data: circles } = await supabase.from("circles").select();
  const { data: tags } = await supabase.from("tags").select();

  return (
    <div
      className={`grid min-h-screen grid-cols-4 gap-12 lg:flex-nowrap ${className}`}
    >
      <div className="col-span-4 space-y-4 lg:col-span-3 lg:space-y-12">
        {children}
      </div>
      <aside className="sticky bottom-0 col-span-4 space-y-4 lg:col-span-1 lg:space-y-12">
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
                    <Link
                      href={`#${circle.id === 1 ? circles.length : circle.id - 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      <ChevronLeftIcon className="size-5" />
                    </Link>
                    <Link
                      href={`#${circle.id === circles.length ? 1 : circle.id + 1}`}
                      className="btn btn-circle btn-sm"
                    >
                      <ChevronRightIcon className="size-5" />
                    </Link>
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
              <Placeholder
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
              </Placeholder>
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
        <p>© Copyright {config.metadata.name}. All Rights Reserved.</p>
      </aside>
    </div>
  );
}
