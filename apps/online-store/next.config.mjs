//@ts-check
import { composePlugins, withNx } from '@nx/next';

import './env.mjs';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false,
  },
  images: {
    // formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'medusa-public-images.s3.eu-west-1.amazonaws.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'metafields-manager-by-hulkapps.s3-accelerate.amazonaws.com',
        pathname: '/uploads/godsonjewelry.myshopify.com/**'
      }
    ]
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

export default composePlugins(...plugins)(nextConfig);
