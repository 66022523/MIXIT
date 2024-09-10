import { forwardRef } from "react";
import Link from "next/link"
import { XMarkIcon } from "@heroicons/react/24/outline";

export const ImagesViewer = forwardRef(function ImagesViewer(
  { id, images },
  ref,
) {
  return (
    <dialog ref={ref} className="modal backdrop-blur">
      <form className="absolute right-2 top-2" method="dialog">
        <button className="btn btn-circle btn-sm">
          <XMarkIcon className="size-5" />
        </button>
      </form>
      <div className="carousel w-11/12 max-w-5xl">
        {images.map((image, index) => (
          <div
            id={`${id}-image-${index + 1}`}
            className="carousel-item w-full items-center justify-center"
            key={index}
          >
            <picture className="relative py-10">
              <img
                className="absolute w-full rounded-2xl blur-lg"
                src={image.source}
                alt={image.alternate}
                width="100%"
                height="100%"
              />
              <img
                className="relative w-full rounded-2xl"
                src={image.source}
                alt={image.alternate}
                width="100%"
                height="100%"
              />
            </picture>
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center gap-2 py-2">
        {images.map((_, index) => (
          <Link
            href={`#${id}-image-${index + 1}`}
            className="btn btn-xs"
            key={index}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </dialog>
  );
});
