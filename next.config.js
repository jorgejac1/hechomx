// eslint-disable-next-line @typescript-eslint/no-require-imports
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Responsive breakpoints for srcset generation
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Modern formats with fallback - AVIF has best compression, WebP is widely supported
    formats: ['image/avif', 'image/webp'],
    // Minimum cache time for optimized images (31 days)
    minimumCacheTTL: 2678400,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
      },
      // Ready for future CDN/cloud storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        protocol: 'https',
        hostname: '*.cloudinary.com',
      },
    ],
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Improve performance with compiler optimizations
  compiler: {
    // Remove console.log in production (keep errors and warnings)
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
