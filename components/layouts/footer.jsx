import Link from "next/link";

import config from "@/config";

export function Footer() {
  return (
    <>
      <ul className="list-disc">
        <li>
          <Link className="link link-primary" href="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="link link-primary" href="/agreements/terms">
            Terms of Services
          </Link>
        </li>
        <li>
          <Link className="link link-primary" href="/agreements/privacy">
            Privacy of Policy
          </Link>
        </li>
        <li>
          <Link className="link link-primary" href="/agreements/cookies">
            Cookies Policy
          </Link>
        </li>
      </ul>
      <p>© Copyright {config.metadata.name}. All Rights Reserved.</p>
    </>
  );
}