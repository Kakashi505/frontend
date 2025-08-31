/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export as a static site
  output: 'export',

  // Skip ESLint during builds (optional, keeps builds faster)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable Next.js image optimization (required for static export)
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
