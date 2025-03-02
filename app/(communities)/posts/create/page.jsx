import { Bars2Icon } from "@heroicons/react/24/outline";

import { Section } from "@/components/section";
import EditorPostForm from "@/components/forms/posts/editor";

import { addPostAction } from "@/libs/actions/post";
import { getUserCircles } from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";

export default async function CreatePost() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  const { data: userCirclesData } = await getUserCircles(user?.id);

  return (
    <>
      <Section
        Icon={Bars2Icon}
        title="Create Post"
        description="Create a new post to share with your community."
      />
      <div className="card bg-base-100">
        <div className="card-body">
          <EditorPostForm
            user={user}
            userCirclesData={userCirclesData}
            action={addPostAction}
          />
        </div>
      </div>
    </>
  );
}
