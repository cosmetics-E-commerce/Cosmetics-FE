import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Lint is enforced by `pnpm lint`; Next's deprecated build-time lint hook
    // does not reliably detect flat ESLint configs in this setup.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
      },
    ],
  },
  transpilePackages: ['@cosmetics/contracts'],
};

export default nextConfig;
