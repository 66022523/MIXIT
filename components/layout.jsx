import { useContext } from "react";

import Auth from "./auth";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

import { SessionContext } from "@/contexts/session";

export default function Layout({ children }) {
  const session = useContext(SessionContext);

  return (
    <>
      <svg
        viewBox="0 0 1440 1024"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="fixed blur-3xl"
      >
        <circle cx="1440" cy="1024" r="600" fill="oklch(var(--p))" />
        <circle cx="800" cy="200" r="150" fill="oklch(var(--in))" />
        <circle cx="150" cy="350" r="100" fill="oklch(var(--s))" />
      </svg>
      {!session && <Auth />}
      <Navbar session={session} />
      <Sidebar session={session}>
          {children}
      </Sidebar>
    </>
  );
}
