import EditorPostForm from "@/components/forms/posts/editor";

import { getPost } from "@/libs/queries/posts";
import { getUserCircles } from "@/libs/queries/users";
import { editPostAction } from "@/libs/actions/post";

import { createClient } from "@/utils/supabase/server";

export default async function EditPostModal({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const [{ data: postData }, { data: userCirclesData }] = await Promise.all([
    getPost(id),
    getUserCircles(user?.id),
  ]);

  return (
    <EditorPostForm
      user={user}
      postData={postData}
      userCirclesData={userCirclesData}
      action={editPostAction}
      isModal
    />
  );
}
