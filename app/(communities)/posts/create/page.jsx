import Link from "next/link";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { Section } from "@/components/section";
import { Placeholder } from "@/components/empty";
import { Post, PostPlaceholder } from "@/components/post";
import { createClient } from "@/utils/supabase/server";
import Input from "@/components/CreatePostModal";
import { FireIcon } from "@heroicons/react/24/solid";

export default async function Communities() {
  const supabase = createClient();
  const { data: posts } = await supabase.from("posts").select(`
    id,
    created_at,
    title,
    content,
    views (users!views_user_id_fkey (*)),
    likes (users!likes_user_id_fkey (*)),
    comments (*),
    shares (users!shares_user_id_fkey (*)),
    writer:users!posts_writer_id_fkey (*)
  `);

  const { data: tags } = await supabase.from("tags").select();

  return (
    <div className="container mx-auto flex gap-8 p-4 lg:p-8">
      <div className="flex-1">
        <Section Icon={Bars3BottomLeftIcon} title="Posts" />
        <Input />
        {posts?.length ? (
          <div className="rounded-xl bg-base-100">
            {posts.map((post, index) => (
              <Post
                id={post.id}
                createdAt={post.created_at}
                title={post.title}
                content={post.content}
                view={post.views}
                likes={post.likes}
                comments={post.comments}
                shares={post.shares}
                writerID={post.writer?.id}
                writerAvatarURL={post.writer?.avatar_url}
                writerNickname={post.writer?.nickname}
                isEnded={index + 1 === posts.length}
                key={index}
              />
            ))}
          </div>
        ) : (
          <Placeholder
            title="Empty Posts"
            description="There are currently no posts."
          >
            <PostPlaceholder isEnded={true} />
          </Placeholder>
        )}
      </div>

      <div className="w-1/4">
        <div className="card bg-base-100 p-4">
          <h2 className="flex items-center text-xl font-bold">
            <FireIcon className="mr-2 h-6 w-6 text-red-500" />
            Hot Topics
          </h2>
          <ul>
            {tags?.length ? (
              tags.map((tag) => (
                <Fragment key={tag.id}>
                  <li className="my-2">
                    <Link href={`/topics/${tag.id}`} className="flex items-center text-primary">
                      #{tag.name}
                    </Link>
                    <span className="text-sm text-gray-500">
                      - {tag.posts?.length || 0} posts
                    </span>
                  </li>
                </Fragment>
              ))
            ) : (
              <Placeholder title="Empty Tags" description="There are currently no tags." />
            )}
          </ul>
          <div className="card-actions">
            <Link href="/tags" className="btn btn-primary w-full">
              View More
            </Link>
          </div>
        </div>

        <div className="mt-8 text-gray-400">
          <ul className="list-disc space-y-1 pl-4">
            <li>
              <Link href="/about" className="text-primary">
                About
              </Link>
            </li>
            <li>
              <Link href="/agreements/terms" className="text-primary">
                Terms of Services
              </Link>
            </li>
            <li>
              <Link href="/agreements/privacy" className="text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/agreements/cookies" className="text-primary">
                Cookies Policy
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            © Copyright MIXIT. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
