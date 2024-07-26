/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "webstatic.hoyoverse.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wutheringwaves.kurogames.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "maseshi.web.app",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
