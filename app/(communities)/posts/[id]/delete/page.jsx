import DeletePostForm from "@/components/forms/posts/delete";

import { getPost } from "@/libs/queries/posts";

import { createClient } from "@/utils/supabase/server";

export default async function DeletePost({ params }) {
  const { id } = params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: postData } = await getPost(id);

  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <DeletePostForm user={user} postData={postData} />
      </div>
    </div>
  );
}
