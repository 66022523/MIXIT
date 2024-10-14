import { SidePosts } from "@/components/layouts/sidebar";

export default function Layout({ children }) {
  return (
    <SidePosts className="p-12">
      {children}
    </SidePosts>
  );
}
