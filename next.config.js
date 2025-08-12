/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
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
  assetPrefix: process.env.NODE_ENV === "production" ? "/ReactPortfolio2.0" : "",
  basePath: process.env.NODE_ENV === "production" ? "/ReactPortfolio2.0" : "",
  trailingSlash: true,
};

module.exports = nextConfig;
