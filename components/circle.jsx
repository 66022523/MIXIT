import Link from "next/link";
import Image from "next/image";

import { createClient } from "@/utils/supabase/component";

export function CirclePlaceholder({ skeleton }) {
  return (
    <div className="card w-96 bg-base-200">
      <div className="card-body gap-4">
        <div
          className={
            "h-4 w-28" + (skeleton ? " skeleton" : " rounded-full bg-base-300")
          }
        />
        <div className="flex flex-col gap-4">
          <div
            className={
              "h-4 w-full" +
              (skeleton ? " skeleton" : " rounded-full bg-base-300")
            }
          />
          <div
            className={
              "h-4 w-full" +
              (skeleton ? " skeleton" : " rounded-full bg-base-300")
            }
          />
          <div
            className={
              "h-4 w-36" +
              (skeleton ? " skeleton" : " rounded-full bg-base-300")
            }
          />
        </div>
      </div>
    </div>
  );
}

export function CircleTall({ id, coverURL, iconURL, name, description }) {
  const supabase = createClient();
  const { data: cover } = supabase.storage
    .from("circles")
    .getPublicUrl(coverURL);
  const { data: icon } = supabase.storage
    .from("circles")
    .getPublicUrl(iconURL, {
      transform: {
        width: 100,
        height: 100,
      },
    });

  return (
    <Link
      href={`/circles/${id}`}
      className="hero overflow-clip rounded-2xl"
      style={{
        backgroundImage: `url("${cover.publicUrl}")`,
      }}
    >
      <div className="hero-overlay bg-opacity-75" />
      <div className="hero-content w-full p-8 text-neutral-content">
        <div className="grid w-full grid-cols-2 gap-2">
          <div className="content-center space-y-2">
            <h2 className="flex items-center gap-2 font-bold">
              <Image
                className="mask mask-circle size-5"
                src={icon.publicUrl}
                alt={name}
                width={20}
                height={20}
              />
              {name}
            </h2>
            <p className="line-clamp-2">{description}</p>
          </div>
          <div className="flex flex-row items-center justify-end">
            <button className="btn btn-primary">Join</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function Circle({ id, coverURL, name, description }) {
  const supabase = createClient();
  const { data: cover } = supabase.storage.from("circles").getPublicUrl(coverURL);

  return (
    <Link href={`/circles/${id}`} className="card image-full w-96 bg-base-100">
      <figure>
        <picture>
          <img src={cover.publicUrl} alt={name} />
        </picture>
      </figure>
      <div className="card-body">
        <h3 className="card-title">{name}</h3>
        <p className="line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}
