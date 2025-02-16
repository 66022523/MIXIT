import Link from "next/link";
import Image from "next/image";
import { StarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";

import config from "@/configs";

import { Section } from "@/components/section";

import { getCircles } from "@/libs/queries/circles";

export default async function Circles() {
  const { data: circlesData } = await getCircles();

  return (
    <>
      <div className="card h-80 overflow-hidden rounded-2xl bg-base-100 bg-gradient-to-br from-transparent to-primary/20">
        <div className="card-body place-content-center items-center text-center">
          <h1 className="card-title z-[1] font-bold">
            Search your communities in {config.metadata.name}
          </h1>
          <span className="z-[1]">
            There are many game categories. We&apos;ve got a place for you.
          </span>
          <br />
          <label className="input input-bordered z-[1] flex w-full max-w-md items-center gap-2 rounded-full">
            <input
              type="search"
              className="grow"
              placeholder="Search Community"
            />
            <MagnifyingGlassIcon className="size-4" />
          </label>
          <svg
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute opacity-40 blur"
          >
            <circle cx="1440" cy="1024" r="500" fill="oklch(var(--p))" />
            <circle cx="0" cy="300" r="300" fill="oklch(var(--p))" />
          </svg>
          <span className="absolute right-2/4 top-1/4 select-none text-8xl font-bold opacity-10">
            SEARCHER
          </span>
        </div>
      </div>
      <Section Icon={StarIcon} title="Recommended Communities" />
      <div className="grid grid-cols-4 gap-4">
        {circlesData.map((circle, index) => (
          <Link
            className="card bg-base-100"
            href={`/circles/${circle.id}`}
            key={index}
          >
            <figure>
              <Image
                src={circle.cover_url}
                alt={circle.name}
                className="size-full"
                width={1920}
                height={1080}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{circle.name}</h2>
              <p className="line-clamp-3">{circle.description}</p>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
