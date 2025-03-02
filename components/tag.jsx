import Link from "next/link";
import Image from "next/image";

export function TagPill({ isHeader, iconURL, name, url }) {
  return (
    <Link
      href={url || ""}
      className={`badge link-hover link badge-primary space-x-1 ${isHeader ? "" : "badge-outline"}`}
    >
      {iconURL ? (
        <Image
          className="rounded-full"
          src={iconURL}
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
        className={`size-4 rounded-full ${skeleton ? "skeleton" : "bg-base-300"}`}
      />
      <span
        className={`h-2 w-4 ${skeleton ? "skeleton" : "rounded-full bg-base-300"}`}
      />
    </div>
  );
}

export function Tag({ id, name, postLength }) {
  return (
    <Link href={`/tags/${id}`} className="link-hover link">
      <h3 className="link link-primary"># {name}</h3>
      <p>
        {Intl.NumberFormat("en-US", {
          notation: "compact",
          maximumFractionDigits: 1,
        }).format(postLength)}{" "}
        posts • 0 members
      </p>
    </Link>
  );
}

export function TagPlaceholder({ skelton }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`h-4 w-20 ${skelton ? "skeleton" : "rounded-full bg-base-300"}`}
      />
      <div
        className={`h-4 w-28 ${skelton ? "skeleton" : "rounded-full bg-base-300"}`}
      />
    </div>
  );
}
