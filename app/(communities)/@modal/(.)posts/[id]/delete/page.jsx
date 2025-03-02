import DeletePostForm from "@/components/forms/posts/delete";

import { getPost } from "@/libs/queries/posts";

import { createClient } from "@/utils/supabase/server";

export default async function DeletePostModal({ params }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: postData } = await getPost(id);

  return <DeletePostForm user={user} postData={postData} isModal />;
}
