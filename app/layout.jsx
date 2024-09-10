import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Kanit } from "next/font/google";

import { ProgressBar } from "@/components/layouts/progressbar";

import config from "@/config";

import "flag-icons/css/flag-icons.min.css";
import "./globals.css";

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

export const metadata = {
  title: `${config.metadata.app} - ${config.metadata.short_description}`,
  description: config.metadata.long_description,
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${kanit.variable} font-sans antialiased`}
      >
        <svg
          viewBox="0 0 1440 1024"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="fixed opacity-50 blur-3xl"
        >
          <circle cx="1440" cy="1024" r="600" fill="oklch(var(--p))" />
          <circle cx="800" cy="150" r="150" fill="oklch(var(--in))" />
          <circle cx="150" cy="400" r="100" fill="oklch(var(--s))" />
        </svg>
        {children}
        <ProgressBar />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
