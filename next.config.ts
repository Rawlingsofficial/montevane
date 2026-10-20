import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Uploaded product photos are served by the app itself from /media/*.
    localPatterns: [{ pathname: "/media/**" }, { pathname: "/images/**" }],
  },
};

export default nextConfig;
