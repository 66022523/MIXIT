import { Sidebar } from "@/components/layouts/sidebar";

export default function Layout({ children }) {
  return (
    <Sidebar className="p-12">
      {children}
    </Sidebar>
  );
}
