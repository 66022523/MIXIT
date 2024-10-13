import Create from "@/components/modals/posts/create";
import { Section } from "@/components/section";
import { Bars2Icon } from "@heroicons/react/24/outline";

export default function CreatePost() {
  return (
    <>
      <Section
        Icon={Bars2Icon}
        title="Create Post"
        description="Create new post."
      />
      <Create />
    </>
  );
}
