import { createClient } from "@/utils/supabase/server-props";

export default function User({ user }) {
  return <h1>Hello, {user.auth?.email || user.nickname || "user"}!</h1>;
}

export async function getServerSideProps(context) {
  const supabase = createClient(context);
  const { data } = await supabase.auth.getUser();
  const response = await fetch(
    `http://localhost:3000/api/v1/users/${context.query.id}`,
  );

  if (!response.ok) throw new Error("Failed to fetch user data");

  const user = await response.json();

  if (data.user?.id === user.id) user.auth = data.user;

  supabase.auth.onAuthStateChange((event, session) => {
    switch (event) {
      case "SIGNED_IN":
        if (data.user?.id === user.id) user.auth = data.user;
        break;
      case "SIGNED_OUT":
        if (user.auth) delete user.auth;
        break;
      default:
        break;
    }
  });

  return {
    props: { user },
  };
}
