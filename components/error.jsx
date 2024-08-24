import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import { js_beautify } from "js-beautify";

export function NotFound({ iconSize, iconPadding, title, description, error }) {
  return (
    <div className="max-w-md space-y-4 p-5">
      <CubeTransparentIcon
        className={`size-${iconSize || 20} p-${iconPadding || 4} mx-auto rounded-full text-warning shadow-inner shadow-warning`}
      />
      {title && <h1 className="font-black">{title}</h1>}
      {description && <p>{description}</p>}
      {error && (
        <div className="mockup-code text-start">
          {js_beautify(JSON.stringify(error) || error)
            .split("\n")
            .map((line, index) => (
              <pre data-prefix={index + 1} key={index}>
                <code className="language-json">{line}</code>
              </pre>
            ))}
        </div>
      )}
    </div>
  );
}

export function Empty({ description }) {
  return (
    <div className="items-center space-y-2 p-10 text-center">
      <CubeTransparentIcon className="mx-auto size-12 text-gray-400" />
      <p>{description}</p>
    </div>
  );
}

export function EmptyPlaceholder({
  className,
  icon,
  title,
  description,
  children,
}) {
  return (
    <div className={`relative overflow-clip rounded-2xl bg-base-100 ${className}`}>
      {children}
      <div className="absolute left-1/2 top-1/2 z-10 size-full -translate-x-1/2 -translate-y-1/2 content-center rounded-box bg-neutral bg-opacity-60 text-center text-neutral-content">
        {icon}
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </div>
  );
}
