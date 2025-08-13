/** @type {import('next').NextConfig} */
// Switch to static export so GitHub Pages can host the site without a Node server.
// Note: Any API routes or dynamic server functions will be excluded.
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["www.nicolaswester.com", "localhost"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
