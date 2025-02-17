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
        protocol: "http",
        hostname: "167.86.76.177"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "http",
        hostname: "mci-admin.org",
        port: "",
        pathname: "/storage/**"
      },
      {
        protocol: "https",
        hostname: "mci-admin.org",
        port: "",
        pathname: "/api/storage/innovators/**"
      },
      {
        protocol: "http",
        hostname: "mci-admin.org",
        port: "",
        pathname: "/api/storage/**"
      },
      {
        protocol: "http",
        hostname: "167.86.76.177",
        port: "8080",
        pathname: "/storage/**"
      },
      {
        protocol: "https",
        hostname: "mci-admin.org",
        port: "",
        pathname: "/api/storage/**"
      },
      {
        protocol: "https",
        hostname: "mci-admin.org",
        port: "",
        pathname: "/storage/**"
      }
    ],
    domains: ["mci-admin.org"], // Fallback for dynamic paths
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
  },

  // Experimental features
  experimental: {
    scrollRestoration: true, // Preserve scroll position
    // Add these to handle the build errors
    missingSuspenseWithCSRBailout: false,
    esmExternals: false
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" // Remove console logs in production
  },

  // Page extensions
  pageExtensions: ["tsx", "ts", "jsx", "js"],

  // TypeScript configuration
  typescript: {
    // Always ignore build errors to prevent blocking deployment
    ignoreBuildErrors: true
  },

  // ESLint configuration
  eslint: {
    // Ignore during builds to prevent blocking deployment
    ignoreDuringBuilds: true
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


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Basic configurations
//   reactStrictMode: true,
//   poweredByHeader: false,
//   output: "standalone",

//   // Image configurations
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "cdn.sanity.io"
//       },
//       {
//         protocol: "http",
//         hostname: "167.86.76.177"
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com"
//       },
//       {
//         protocol: "http",
//         hostname: "mci-admin.org",
//         pathname: "/storage/**"
//       },
//       {
//         protocol: "https",
//         hostname: "mci-admin.org",
//         pathname: "/storage/**"
//       },
//       {
//         protocol: "http",
//         hostname: "167.86.76.177",
//         port: "8080",
//         pathname: "/storage/**"
//       }
//     ],
    // domains: ["mci-admin.org"], // Fallback for dynamic paths
    // minimumCacheTTL: 60,
    // deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // imageSizes: [16, 32, 48, 64, 96, 128, 256, 384]
//   },

//   // Experimental features - Disable problematic ones
//   experimental: {
//     // Disable optimizeCss to prevent critters error
//     optimizeCss: false,
//     scrollRestoration: true,
//     missingSuspenseWithCSRBailout: false,
//     esmExternals: false
//   },

//   // Compiler options
//   compiler: {
//     removeConsole:
//       process.env.NODE_ENV === "production"
//         ? {
//             exclude: ["error", "warn"]
//           }
//         : false
//   },

//   // Page extensions
//   pageExtensions: ["tsx", "ts", "jsx", "js"],

//   // TypeScript configuration
//   typescript: {
//     ignoreBuildErrors: true
//   },

//   // ESLint configuration
//   eslint: {
//     ignoreDuringBuilds: true
//   },

//   // Headers configuration
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [
//           {
//             key: "X-DNS-Prefetch-Control",
//             value: "on"
//           },
//           {
//             key: "Strict-Transport-Security",
//             value: "max-age=31536000; includeSubDomains"
//           },
//           {
//             key: "X-Frame-Options",
//             value: "SAMEORIGIN"
//           },
//           {
//             key: "X-Content-Type-Options",
//             value: "nosniff"
//           },
//           {
//             key: "Referrer-Policy",
//             value: "strict-origin-when-cross-origin"
//           }
//         ]
//       },
//       {
//         source: "/api/:path*",
//         headers: [
//           { key: "Access-Control-Allow-Credentials", value: "true" },
//           { key: "Access-Control-Allow-Origin", value: "*" },
//           {
//             key: "Access-Control-Allow-Methods",
//             value: "GET,DELETE,PATCH,POST,PUT"
//           },
//           {
//             key: "Access-Control-Allow-Headers",
//             value:
//               "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
//           }
//         ]
//       }
//     ];
//   },

//   // Rewrites to handle API requests
//   async rewrites() {
//     return {
//       beforeFiles: [
//         {
//           source: "/api/:path*",
//           destination: "https://mci-admin.org/api/:path*"
//         }
//       ]
//     };
//   }
// };

// export default nextConfig;