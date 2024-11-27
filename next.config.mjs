/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.sanity.io", "images.unsplash.com"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
    workerThreads: true,
    optimisticClientCache: true,
    webpackBuildWorker: true // Remove "serverActions" as it is no longer needed
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
  },
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  generateEtags: true,
  pageExtensions: ["tsx", "ts"],
  productionBrowserSourceMaps: false,
  httpAgentOptions: {
    keepAlive: true
  }
};

export default nextConfig;
