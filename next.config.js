const UnoCSS = require("@unocss/webpack").default;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      { source: "/feed", destination: "/app/feed" },
      { source: "/sync", destination: "/app/sync" },
      { source: "/shop", destination: "/app/shop" },
      { source: "/:handle*", destination: "/app/:handle*" },
    ];
  },
  webpack: (config) => {
    config.plugins.push(UnoCSS());
    return config;
  },
  experimental: {
    scrollRestoration: true,
    images: {
      allowFutureImage: true,
    },
  },
};

module.exports = nextConfig;
