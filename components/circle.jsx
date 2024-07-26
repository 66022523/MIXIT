import Link from "next/link";

export default function Circle({ data }) {
  return (
    <Link href={`/circles/${data.id}`} className="card image-full w-96 bg-base-100">
      <figure>
        <picture>
          <img src={data.cover_url} alt={data.name} />
        </picture>
      </figure>
      <div className="card-body">
        <h2 className="card-title">{data.name}</h2>
        <p className="overflow-hidden text-ellipsis">{data.description}</p>
      </div>
    </Link>
  );
}
