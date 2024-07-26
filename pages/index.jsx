import Head from "next/head";
import Link from "next/link";
import { useEffect, useState, Fragment } from "react";
import {
  Bars3BottomLeftIcon,
  ChevronRightIcon,
  FireIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import Circle from "@/components/circle";
import Post from "@/components/post";

export default function Home({ circles, posts, tags }) {
  const [circle, setCircle] = useState([]);

  useEffect(() => {
    setCircle(circles[Math.floor(Math.random() * circles.length)]);
    setInterval(() => {
      setCircle(circles[Math.floor(Math.random() * circles.length)]);
    }, 10000);
  }, [circles]);

  return (
    <>
      <Head>
        <title>MIXIT&apos;s - Popular Gaming Community</title>
        <meta
          property="og:title"
          content="MIXIT's - Popular Gaming Community"
          key="title"
        />
      </Head>
      <div className="grid grid-cols-4 gap-12 lg:flex-nowrap">
        <div className="order-last col-span-4 space-y-12 lg:order-first lg:col-span-3">
          <div className="card hidden h-80 overflow-hidden rounded-2xl bg-base-100 bg-gradient-to-br from-transparent to-blue-500/20 lg:flex">
            <div className="card-body place-content-end items-end text-end">
              <h1 className="card-title z-[1] text-2xl font-bold">
                Welcome to your spaces your community!
              </h1>
              <span className="z-[1]">
                This is the epicenter of the gaming community you love.
              </span>
              <div className="absolute bottom-0 left-0 h-1/4 w-1/4 rounded-bl-2xl rounded-tr-2xl bg-blue-500" />
              <div className="absolute bottom-0 left-0 h-2/4 w-2/5 rounded-bl-2xl rounded-tr-2xl bg-blue-500/30" />
              <div className="absolute bottom-0 left-0 h-3/4 w-2/4 rounded-bl-2xl rounded-tr-2xl bg-blue-500/10 backdrop-blur-md" />
              <span className="absolute -right-1/4 top-1/4 text-8xl font-bold opacity-10">
                COMMUNITY
              </span>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <UserGroupIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
              <h2 className="text-2xl font-bold">Communities</h2>
              <small className="text-gray-500">(Shift + Scroll)</small>
            </div>
            <Link href="/circles" className="btn btn-ghost btn-sm">
              View All
              <ChevronRightIcon className="size-5 rounded-full bg-primary p-1 text-primary-content" />
            </Link>
          </div>
          <div className="carousel carousel-center w-full space-x-4 rounded-box bg-base-100 p-4 hover:overflow-x-scroll">
            {circles?.map((circle, index) => (
              <div className="carousel-item" key={index}>
                <Circle data={circle} />
              </div>
            ))}
          </div>
          <div className="items-content flex gap-2">
            <Bars3BottomLeftIcon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
            <h2 className="text-2xl font-bold">Posts</h2>
          </div>
          <div className="rounded-2xl bg-base-100">
            {posts?.map((post, index) => (
              <Post data={post} end={index === posts.length - 1} key={index} />
            ))}
          </div>
        </div>
        <div className="order-first col-span-4 space-y-12 lg:order-last lg:col-span-1">
          <Link href={`/circles/${circle.id}`}>
            <div className="h-80 rounded-xl bg-gradient-to-t from-blue-500 to-base-100 p-2">
              <div
                className="hero h-full place-items-end overflow-hidden rounded-xl"
                style={
                  circle.cover_url
                    ? {
                        backgroundImage: `url(${circle.cover_url})`,
                      }
                    : null
                }
              >
                <div className="hero-overlay bg-transparent bg-gradient-to-t from-base-100 to-transparent" />
                <div className="hero-content p-5">
                  <div className="max-w-md">
                    <h3 className="mb-3 text-xl font-bold">
                      {circle.name}
                      {/* <div className="badge badge-primary">CBT3</div> */}
                    </h3>
                    {/* <small className="mb-3">12/01/2024 • 00:00:00 UTC</small> */}
                    <p>{circle.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title mb-3">
                <FireIcon className="size-8 rounded-full bg-error p-1 text-error-content" />
                Hot Topics
              </h2>
              <ul className="mb-3 list-none">
                {tags?.map((tag, index) => (
                  <Fragment key={index}>
                    <li>
                      <Link
                        href={`/tags/${tag.id}`}
                        className="link-hover link"
                      >
                        <h3># {tag.name}</h3>
                        <p>24 posts • 345 members</p>
                      </Link>
                    </li>
                    {index !== tags.length - 1 && (
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
            </div>
          </div>
          <div className="hidden lg:block">
            <p>© Copyright MIXIT. All Rights Reserved.</p>
            <p>
              <Link className="link link-primary" href="/agreements/terms">
                Terms of Services
              </Link>
              <span> • </span>
              <Link className="link link-primary" href="/agreements/privacy">
                Privacy of Policy
              </Link>
              <span> • </span>
              <Link className="link link-primary" href="/agreements/cookies">
                Cookies Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const responseCircles = await fetch("http://localhost:3000/api/v1/circles");
  const responsePosts = await fetch("http://localhost:3000/api/v1/posts");
  const responseTags = await fetch("http://localhost:3000/api/v1/tags");

  if (!responseCircles.ok) throw new Error("Failed to fetch circles data");
  if (!responsePosts.ok) throw new Error("Failed to fetch posts data");
  if (!responseTags.ok) throw new Error("Failed to fetch tags data");

  const circles = await responseCircles.json();
  const posts = await responsePosts.json();
  const tags = await responseTags.json();

  return { props: { circles, posts, tags } };
}
