"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  QuestionMarkCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

import { Social } from "@/components/modals/authentication/social";

import config from "@/config";

export default function Layout({ children }) {
  const router = useRouter();
  const dialogRef = useRef();

  const handleDismiss = () => {
    router.back();
  };

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="modal backdrop-blur"
      onClose={handleDismiss}
    >
      <div className="overflow-invisible modal-box rounded-badge bg-opacity-80 text-center">
        <div className="flex justify-end gap-2">
          <button className="btn btn-circle btn-primary btn-sm">
            <QuestionMarkCircleIcon className="size-6" />
          </button>
          <form method="dialog">
            <button className="btn btn-circle btn-primary btn-sm">
              <XCircleIcon className="size-6" />
            </button>
          </form>
        </div>
        <Link href="/" className="btn btn-ghost text-4xl font-bold text-primary">
          {config.metadata.name}
        </Link>
        {children}
        <Social />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
