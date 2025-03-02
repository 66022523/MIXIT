import EditorPostForm from "@/components/forms/posts/editor";

import { getPost } from "@/libs/queries/posts";
import { getUserCircles } from "@/libs/queries/users";
import { editPostAction } from "@/libs/actions/post";

import { createClient } from "@/utils/supabase/server";

export default async function EditPost({ params }) {
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
    <div className="card bg-base-100">
      <div className="card-body">
        <EditorPostForm
          user={user}
          postData={postData}
          userCirclesData={userCirclesData}
          action={editPostAction}
        />
      </div>
    </div>
  );
}
