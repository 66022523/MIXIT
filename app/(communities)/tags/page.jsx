import { TagIcon } from "@heroicons/react/24/solid";

import { Tag } from "@/components/tag";
import { Section } from "@/components/section";

import { getTags } from "@/lib/queries/tags";

export default async function Tags() {
  const tags = await getTags("id, name, posts(*)");

  return tags ? (
    <>
      <Section Icon={TagIcon} title="Tags" />
      <div className="card bg-base-100">
        <div className="card-body">
          {tags?.length
            ? tags.map((tag, index) => (
                <>
                  <Tag
                    id={tag.id}
                    name={tag.name}
                    postLength={tag.posts?.length || 0}
                    key={index}
                  />
                  {index !== tags.length - 1 && <div className="divider" />}
                </>
              ))
            : ""}
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
