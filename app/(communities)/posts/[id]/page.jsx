import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/solid";

import { Section } from "@/components/section";
import { Comment } from "@/components/comments";
import { Placeholder } from "@/components/empty";
import { Post, PostPlaceholder } from "@/components/post";
import CreateCommentForm from "@/components/forms/comments/create";

import { getPost, getPostComments } from "@/libs/queries/posts";
import {
  getUserComments,
  getUserFollowing,
  getUserLikes,
  getUserProfile,
  getUserViews,
} from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";

export default async function PostDetail({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [
    { error: viewError },
    { data: postData },
    { data: postCommentsData },
    { data: userProfileData },
    { data: userViewsData },
    { data: userLikesData },
    { data: userCommentsData },
    { data: userFollowingData },
  ] = await Promise.all([
    supabase
      .from("views")
      .insert(user ? { user_id: user.id, post_id: id } : { post_id: id }),
    getPost(id),
    getPostComments(id),
    getUserProfile(user?.id),
    getUserViews(user?.id, user),
    getUserLikes(user?.id),
    getUserComments(user?.id),
    getUserFollowing(user?.id),
  ]);

  const commentFilter = [
    "All Comments",
    "Most Views",
    "Most Likes",
    "Most Comments",
    "Most Shares",
    "Newest",
    "Oldest",
  ];

  return (
    <>
      {postData ? (
        <div className="card bg-base-100">
          <div className="card-body space-y-4">
            <Post
              user={user}
              postData={postData}
              userViewsData={userViewsData}
              userLikesData={userLikesData}
              userCommentsData={userCommentsData}
              userFollowingData={userFollowingData}
              showCount
              isEnded={true}
            />
            <Section
              Icon={ChatBubbleLeftEllipsisIcon}
              title="Comments"
              description="Join the conversation and share your thoughts."
              id="comments"
            />
            <div className="space-y-4">
              <CreateCommentForm
                user={user}
                profile={userProfileData}
                circleID={postData.circle.id}
                postID={postData.id}
              />
              {postCommentsData?.length
                ? postCommentsData.map((comment, index) => (
                    <Comment
                      user={user}
                      postID={id}
                      commentData={comment}
                      userViewsData={userViewsData}
                      userLikesData={userLikesData}
                      userCommentsData={userCommentsData}
                      userFollowingData={userFollowingData}
                      isPreview
                      isParent
                      key={index}
                    />
                  ))
                : !user && <p>No comments yet...</p>}
            </div>
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
