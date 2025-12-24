import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/portal',
        destination: '/portal.html',
      },
      {
        source: '/portal/',
        destination: '/portal.html',
      },
    ];
  },
};

export default nextConfig;
