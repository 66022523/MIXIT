import { XMarkIcon } from "@heroicons/react/24/outline";

export function Images({ id, items, indicators }) {
  return (
    <dialog id={`viewer-${id}-images`} className="modal backdrop-blur">
      <form className="absolute right-2 top-2" method="dialog">
        <button className="btn btn-circle btn-sm">
          <XMarkIcon className="size-5" />
        </button>
      </form>
      <div className="carousel w-11/12 max-w-5xl">{items}</div>
      <div className="flex w-full justify-center gap-2 py-2">{indicators}</div>
    </dialog>
  );
}

const viewer = {
  Images,
};

export default viewer;
