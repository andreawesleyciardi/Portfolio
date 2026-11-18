import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static site: plain HTML, CSS and JS that can be hosted anywhere.
  output: 'export',
  images: { unoptimized: true },
  transpilePackages: [
    '@portfolio/ui',
    '@portfolio/devices',
    '@portfolio/backdrop',
    '@portfolio/timeline',
    '@portfolio/eras',
    '@portfolio/scene',
  ],
};

export default nextConfig;
