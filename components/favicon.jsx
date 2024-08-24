import Link from "next/link";

export default function Favicon({ className }) {
  return (
    <Link href="/" className={className}>
      MIXIT
    </Link>
  );
}
