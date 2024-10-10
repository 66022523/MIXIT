import config from "@/config";

import supabase from "@/utils/supabase";

export async function generateStaticParams() {
  const { data: users } = await supabase.from("users").select("id");

  return users.map((user) => ({
    id: user.id,
  }));
}

export async function generateMetadata({ params: { id } }) {
  const { data: profile } = await supabase
    .from("users")
    .select("nickname")
    .eq("id", id)
    .single();

  return {
    title: `${profile?.nickname || "User Not Found"} | ${config.metadata.app}`,
  };
}

export default async function User({ children }) {
  return (
    <div className="container mx-auto min-h-screen p-12">
      <div className="relative space-y-4">{children}</div>
    </div>
  );
}
