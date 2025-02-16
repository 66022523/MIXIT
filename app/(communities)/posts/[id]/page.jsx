import Image from "next/image";
import {
  ChatBubbleBottomCenterIcon,
  EyeIcon,
  HeartIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";

import { Placeholder } from "@/components/empty";
import { Post, PostPlaceholder } from "@/components/post";

import { getUser } from "@/libs/queries/auth";
import { getPost } from "@/libs/queries/posts";

export default async function PostDetail({ params }) {
  const { id } = await params;
  const { user } = await getUser();
  const { data: postData, error } = await getPost(id);

  if (error) console.error(error);

  return (
    <>
      {postData && !error ? (
        <div className="space-y-4 rounded-2xl bg-base-100 pb-4">
          <Post
            user={user}
            id={postData.id}
            createdAt={postData.created_at}
            title={postData.title}
            content={postData.content}
            tags={postData.tags}
            images={postData.images}
            view={postData.views}
            likes={postData.likes}
            comments={postData.comments}
            shares={postData.shares}
            writerID={postData.writer?.id}
            writerAvatarURL={postData.writer?.avatar_url}
            writerNickname={postData.writer?.nickname}
            writerRole={postData.writer?.role}
            circleID={postData.circle?.id}
            circleIconURL={postData.circle?.icon_url}
            circleName={postData.circle?.name}
            isEnded={true}
          />

          <div role="tablist" className="tabs-boxed tabs mx-8">
            {[
              "All Comments",
              "Most Views",
              "Most Likes",
              "Most Comments",
              "Most Shares",
              "Newest",
              "Oldest",
            ].map((option) => (
              <a
                role="tab"
                className={option === "All Comments" ? "tab tab-active" : "tab"}
                key={option}
              >
                {option}
              </a>
            ))}
          </div>

          <div className="space-y-4 px-8 pb-4">
            {postData?.comments?.length > 0 ? (
              postData?.comments?.map((comment, index) => (
                <div key={index} className="card bg-base-200 p-4">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="h-12 w-12 rounded-full bg-neutral text-neutral-content">
                          {comment.writer.avatar_url ? (
                            <Image
                              alt={comment.writer.nickname}
                              src={comment.writer.avatar_url}
                              width={48}
                              height={48}
                            />
                          ) : (
                            <span className="text-lg font-bold">
                              {comment.writer.nickname?.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-text font-bold">
                          {comment.writer.nickname}
                        </h4>
                        <p className="text-text text-sm">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <button className="btn btn-primary btn-sm">Follow</button>
                  </div>
                  <p className="text-text mb-4">{comment.content}</p>
                  <div className="text-text flex items-center space-x-6">
                    <div className="flex items-center text-sm">
                      <EyeIcon className="mr-2 h-5 w-5" />
                      {comment.views || 0}
                    </div>
                    <div className="flex items-center text-sm">
                      <HeartIcon className="mr-2 h-5 w-5" />
                      {comment.likes || 0}
                    </div>
                    <div className="flex items-center text-sm">
                      <ChatBubbleBottomCenterIcon className="mr-2 h-5 w-5" />
                      {comment.replies || 0}
                    </div>
                    <div className="flex items-center text-sm">
                      <ShareIcon className="mr-2 h-5 w-5" />
                      {comment.shares || 0}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-text">No comments yet...</p>
            )}
          </div>
        </div>
      ) : (
        <Placeholder
          title="No Post Found"
          description="This post may have been moved or deleted."
        >
          <PostPlaceholder isEnded={true} />
        </Placeholder>
      )}
    </>
  );
}
