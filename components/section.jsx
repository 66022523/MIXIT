import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";

export function Section({
  backLink,
  id,
  Icon,
  inline,
  title,
  description,
  descriptionClass,
  hint,
  hintClass,
  children,
}) {
  return (
    <div className="flex items-center gap-2" id={id}>
      {backLink && (
        <Link href={backLink} className="btn btn-circle btn-ghost">
          <ChevronLeftIcon className="size-5" />
        </Link>
      )}
      <Icon className="size-8 rounded-full bg-primary p-2 text-primary-content" />
      <div className={inline && "flex items-center gap-2"}>
        <h2 className="font-bold">{title}</h2>
        {description && <p className={descriptionClass}>{description}</p>}
        {hint && <small className={hintClass}>{hint}</small>}
      </div>
      {children}
    </div>
  );
}
