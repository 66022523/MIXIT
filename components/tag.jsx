import Link from "next/link";
import Image from "next/image";

const { createClient } = require("@/utils/supabase/component");

export function TagPill({ isHeader, iconURL, name, url }) {
  const supabase = createClient();
  const { data: icon } = supabase.storage.from("circles").getPublicUrl(iconURL);

  return (
    <Link
      href={url || ""}
      className={
        "badge link-hover link badge-primary space-x-1" +
        (isHeader ? "" : " badge-outline")
      }
    >
      {iconURL ? (
        <Image
          className="rounded-full"
          src={icon.publicUrl}
          alt={name}
          width={16}
          height={16}
        />
      ) : (
        <span>#</span>
      )}
      <span>{name}</span>
    </Link>
  );
}

export function TagPillPlaceholder({ skeleton }) {
  return (
    <div className="badge badge-outline space-x-1">
      <div
        className={
          "size-4 rounded-full" + (skeleton ? " skeleton" : " bg-base-300")
        }
      />
      <span
        className={
          "h-2 w-4" + (skeleton ? " skeleton" : " rounded-full bg-base-300")
        }
      />
    </div>
  );
}

export function Tag({ id, name }) {
  return (
    <Link href={`/tags/${id}`} className="link-hover link">
      <h3># {name}</h3>
      <p>24 posts • 345 members</p>
    </Link>
  );
}

export function TagPlaceholder({ skelton }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={
          skelton ? "skeleton h-4 w-20" : "h-4 w-20 rounded-full bg-base-300"
        }
      ></div>
      <div
        className={
          skelton ? "skeleton h-4 w-28" : "h-4 w-28 rounded-full bg-base-300"
        }
      ></div>
    </div>
  );
}
