import { TagIcon } from "@heroicons/react/24/solid";

import { Tag } from "@/components/tag";
import { Section } from "@/components/section";

import { getTags } from "@/libs/queries/tags";
import { Fragment } from "react";

export default async function Tags() {
  const { data: tagsData } = await getTags();

  return (
    <>
      <Section Icon={TagIcon} title="Tags" />
      <div className="card bg-base-100">
        <div className="card-body">
          {tagsData?.length
            ? tagsData.map((tag, index) => (
                <Fragment key={index}>
                  <Tag
                    id={tag.id}
                    name={tag.name}
                    postLength={tag.posts?.length || 0}
                  />
                  {index !== tagsData.length - 1 && <div className="divider" />}
                </Fragment>
              ))
            : null}
        </div>
      </div>
    </>
  );
}
