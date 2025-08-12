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
  // Custom domain, no need for assetPrefix or basePath
  images: {
    domains: ['www.nicolaswester.com'],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
