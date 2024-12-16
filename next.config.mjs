/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic configurations
  reactStrictMode: true,
  poweredByHeader: false,
  output: "standalone",

  // Image configurations
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      }
    ],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Experimental features
  experimental: {
    scrollRestoration: true // Preserve scroll position
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" // Remove console logs in production
  },

  // Page extensions
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV !== "production" // Ignore only in non-production builds
  },

  // Headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on"
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains"
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN"
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
