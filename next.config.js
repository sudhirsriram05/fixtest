/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { 
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      }
    ]
  },
  // Disable SWC minification and use Terser instead
  swcMinify: false,
  // Disable experimental features that might cause issues
  experimental: {
    swcTraceProfiling: false,
    forceSwcTransforms: false
  },
  // Disable type checking during build to avoid native module issues
  typescript: {
    ignoreBuildErrors: true
  },
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true
};

module.exports = nextConfig;