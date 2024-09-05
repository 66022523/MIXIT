import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import {
  Bars3BottomLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";

import { Circle, CirclePlaceholder } from "@/components/circle";
import { Section, EmptyPlaceholder, Content } from "@/components/content";
import { Post, PostPlaceholder } from "@/components/post";

import { fetcher } from "@/utils/fetcher";

function Component() {
  const { data: circles } = useSWR("/api/v1/circles");
  const { data: posts } = useSWR("/api/v1/posts");

  return (
    <div className="container mx-auto space-y-4 p-4 lg:space-y-12 lg:p-12">
      <div className="card h-80 overflow-hidden rounded-2xl bg-base-100 bg-gradient-to-br from-transparent to-primary/20">
        <div className="card-body place-content-end items-end text-end">
          <h1 className="card-title z-[1] font-bold">
            Welcome to your spaces your community!
          </h1>
          <span className="z-[1]">
            This is the epicenter of the gaming community you love.
          </span>
          <div className="absolute bottom-0 left-0 h-1/4 w-1/4 rounded-bl-2xl rounded-tr-2xl bg-primary" />
          <div className="absolute bottom-0 left-0 h-2/4 w-2/5 rounded-bl-2xl rounded-tr-2xl bg-primary/30" />
          <div className="absolute bottom-0 left-0 h-3/4 w-2/4 rounded-bl-2xl rounded-tr-2xl bg-primary/10 backdrop-blur-md" />
          <span className="absolute -right-1/4 top-1/4 text-8xl font-bold opacity-10">
            COMMUNITY
          </span>
        </div>
      </div>
      <Content>
        <div className="flex justify-between">
          <Section
            Icon={UserGroupIcon}
            inline
            title="Communities"
            hint={
              <>
                (<kbd className="kbd kbd-xs">Shift</kbd>
                <span>+</span>
                <kbd className="kbd kbd-xs">Scroll</kbd>)
              </>
            }
            hintClass="hidden space-x-1 text-gray-500 lg:block"
          />
          <Link href="/circles" className="btn btn-ghost btn-sm">
            View All
            <ChevronRightIcon className="size-5 rounded-full bg-primary p-1 text-primary-content" />
          </Link>
        </div>
        {circles?.length ? (
          <div className="carousel carousel-center relative w-full space-x-4 rounded-box bg-base-100 p-4 hover:overflow-x-scroll">
            {circles.map((circle, index) => (
              <div className="carousel-item" key={index}>
                <Circle
                  id={circle.id}
                  coverURL={circle.cover_url}
                  name={circle.name}
                  description={circle.description}
                />
              </div>
            ))}
          </div>
        ) : (
          <EmptyPlaceholder
            title="Empty Circles"
            description="There are currently no circles."
          >
            <div className="carousel carousel-center relative w-full space-x-4 p-4 hover:overflow-x-scroll">
              {Array.from({ length: 2 }).map((_, index) => (
                <div className="carousel-item" key={index}>
                  <CirclePlaceholder />
                </div>
              ))}
            </div>
          </EmptyPlaceholder>
        )}
        <Section Icon={Bars3BottomLeftIcon} title="Posts" />
        {posts?.length ? (
          <div className="rounded-2xl bg-base-100">
            {posts.map((post, index) => (
              <Post
                id={post.id}
                createdAt={post.created_at}
                title={post.title}
                content={post.content}
                tags={post.tags}
                images={post.images}
                view={post.views}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                writerID={post.writer?.id}
                writerAvatarURL={post.writer?.avatar_url}
                writerNickname={post.writer?.nickname}
                writerRole={post.writer?.role}
                circleID={post.circle?.id}
                circleIconURL={post.circle?.icon_url}
                circleName={post.circle?.name}
                isEnded={index + 1 === posts.length}
                key={index}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder
            title="Empty Posts"
            description="There are currently no posts."
          >
            <PostPlaceholder isEnded={true} />
          </EmptyPlaceholder>
        )}
      </Content>
    </div>
  );
}

export default function Home({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Component />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const circles = await fetcher("http://localhost:3000/api/v1/circles");
  const posts = await fetcher("http://localhost:3000/api/v1/posts");
  const tags = await fetcher("http://localhost:3000/api/v1/tags");

  return {
    props: {
      fallback: {
        "/api/v1/circles": circles,
        "/api/v1/posts": posts,
        "/api/v1/tags": tags,
      },
    },
  };
}
