import Image from "next/image";
import { Sidebar } from "@/components/layouts/sidebar";
import { Post } from "@/components/post";
import { createClient } from "@/utils/supabase/server";

export default async function CommunityDetails({ params: { cid } }) {
  const supabase = createClient();
  const { data: community, error } = await supabase
    .from("circles")
    .select(
      `
        *,
        posts (*)
      `,
    )
    .eq("id", cid)
    .single();

  if (error) return console.log(error);

  console.log(community);

  return (
    <div className="container mx-auto p-8">
      {community ? (
        <>
          <div className="relative mb-4 flex h-48 items-center justify-between rounded-lg bg-base-100 p-4 shadow-sm">
            {community.cover_url && (
              <Image
                src={community.cover_url}
                alt={`${community.name} background`}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 rounded-lg"
              />
            )}
            <div className="relative z-10 p-4">
              <h1 className="text-2xl font-bold text-primary">
                {community.name}
              </h1>
              <p className="text-gray-500">Members: {community.memberCount}</p>
            </div>
            <div className="relative z-10 flex gap-2">
              <button className="btn btn-primary rounded-full">Join us!</button>
              <button className="btn btn-outline rounded-full">Share</button>
            </div>
            <div className="absolute inset-0 rounded-lg bg-black bg-opacity-30"></div>
          </div>
          <Sidebar>
            {community.posts?.length
              ? community.posts.map((post, index) => (
                  <>{<Post 
                    id={post.id} 
                    createdAt={post.created_at}
                    title={post.title}
                    content={post.content}
                    tags={post.tags}
                    images={post.images}
                    views={post.views}
                    likes={post.likes}
                    comments={post.comments}
                    shares={post.shares}
                    writerID={post.writerID}
                    writerAvatarURL={post.writerAvatarURL}
                    writerNickname={post.writerNickname}
                    writerRole={post.writerRole}
                    circleID={post.circleID}
                    circleIconURL={post.circleIconURL}
                    circleName={post.circleName}
                    isEnded={false}
                    key={index}
                  ></Post>}</>
                ))
              : "no"}
          </Sidebar>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
