import { useState, useRef, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Kanit } from "next/font/google";
import { useRouter } from "next/router";
import Head from "next/head";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

import "flag-icons/css/flag-icons.min.css";
import "@/styles/globals.css";

import Layout from "@/components/layout";

import { SessionContext } from "@/contexts/session";

import { createClient } from "@/utils/supabase/component";

const inter = Inter({
  subsets: [
    "cyrillic",
    "cyrillic-ext",
    "greek",
    "greek-ext",
    "latin",
    "latin-ext",
    "vietnamese",
  ],
  weight: "variable",
  display: "swap",
  variable: "--font-inter",
});
const kanit = Kanit({
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-kanit",
});

export default function App({ Component, pageProps }) {
  const supabase = createClient();
  const router = useRouter();
  const progressRef = useRef(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    hljs.registerLanguage("json", json);
    hljs.highlightAll();
  }, []);
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_OUT") {
        setSession(null);
      } else if (session) {
        setSession(session);
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);
  useEffect(() => {
    const startProgress = () => {
      const step = () => {
        const next =
          progressRef.current.value +
          (progressRef.current.value < 20
            ? 0.1
            : progressRef.current.value < 50
              ? 0.4
              : progressRef.current.value < 80
                ? 0.2
                : 0.05);

        if (next < 100) {
          progressRef.current.value = Math.min(next, 90);
          requestAnimationFrame(step);
        } else {
          progressRef.current.value = 100;
        }
      };
      step();
    };
    const completeProgress = () => {
      progressRef.current.value = 100;
      setTimeout(() => (progressRef.current.value = 0), 500);
    };

    router.events.on("routeChangeStart", startProgress);
    router.events.on("routeChangeComplete", completeProgress);
    router.events.on("routeChangeError", completeProgress);

    return () => {
      router.events.off("routeChangeStart", startProgress);
      router.events.off("routeChangeComplete", completeProgress);
      router.events.off("routeChangeError", completeProgress);
    };
  }, [router]);

  return (
    <SessionContext.Provider value={session}>
      <Head>
        <title>MIXIT&apos;s - Popular Gaming Community</title>
        <meta
          property="og:title"
          content="MIXIT's - Popular Gaming Community"
          key="title"
        />
      </Head>
      <progress
        className="progress progress-primary fixed top-0 z-[9999] h-[3px] bg-transparent"
        ref={progressRef}
        value="0"
        max="100"
      />
      <Layout className={`${inter.variable} ${kanit.variable} font-sans`}>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
      <SpeedInsights />
    </SessionContext.Provider>
  );
}
