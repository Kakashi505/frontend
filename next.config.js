/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during builds (optional, keeps builds faster)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable Next.js image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    // Allow local images to work properly
    unoptimized: true,
  },
};

module.exports = nextConfig;
