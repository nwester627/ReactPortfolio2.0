/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  images: {
    unoptimized: true,
    domains: ["localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  assetPrefix:
    process.env.NODE_ENV === "production" ? "/ReactPortfolio2.0" : "",
  basePath: process.env.NODE_ENV === "production" ? "/ReactPortfolio2.0" : "",
};

module.exports = nextConfig;
