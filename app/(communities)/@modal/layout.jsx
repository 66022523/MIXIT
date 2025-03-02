"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

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
      <div className="overflow-invisible modal-box rounded-badge bg-opacity-80">
        {children}
      </div>
    </dialog>
  );
}
