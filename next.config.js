/** @type {import('next').NextConfig} */
const nextConfig = {
  // Skip ESLint during builds (optional, keeps builds faster)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable Next.js image optimization
  images: {
    domains: ['images.pexels.com', 'images.unsplash.com'],
  },
};

module.exports = nextConfig;
