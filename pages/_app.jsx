import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useReportWebVitals } from "next/web-vitals";
import { Inter, Kanit } from "next/font/google";
import Router from "next/router";
import Head from "next/head";
import NProgress from "nprogress";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";

import "flag-icons/css/flag-icons.min.css";
import "nprogress/nprogress.css";
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
})

NProgress.configure({ showSpinner: false });
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default function App({ Component, pageProps }) {
  const supabase = createClient();
  const [session, setSession] = useState(null);

  useReportWebVitals((metric) => {
    console.log(metric);
  });
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case "SIGNED_OUT":
          setSession(null);
          break;
        case "TOKEN_REFRESHED":
        case "INITIAL_SESSION":
        case "SIGNED_IN":
        case "PASSWORD_RECOVERY":
        case "USER_UPDATED":
        default:
          setSession(session);
          break;
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);
  useEffect(() => {
    hljs.registerLanguage("json", json);
    hljs.highlightAll();
  }, []);

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
      <Layout className={`${inter.variable} ${kanit.variable} font-sans`}>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
      <SpeedInsights />
    </SessionContext.Provider>
  );
}
