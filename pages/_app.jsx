import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import TopLoader from "nextjs-toploader";

import "@/styles/globals.css";

import Layout from "@/components/layout";

import { SessionContext } from "@/contexts/session";

import { createClient } from "@/utils/supabase/component";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  const supabase = createClient();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const { data: session } = supabase.auth.getSession();

    setSession(session);

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });
  }, [supabase]);

  return (
    <SessionContext.Provider value={session}>
      <Layout>
        <style jsx global>
          {`
            html {
              font-family: ${inter.style.fontFamily};
            }
          `}
        </style>
        <TopLoader color="oklch(var(--p))" showSpinner={false} />
        <Component {...pageProps} />
      </Layout>
    </SessionContext.Provider>
  );
}
