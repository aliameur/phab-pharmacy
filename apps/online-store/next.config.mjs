//@ts-check
import { composePlugins, withNx } from '@nx/next';
import './env.mjs';

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    svgr: false
  }
};

const plugins = [// Add more Next.js plugins to this list if needed.
  withNx];

export default composePlugins(...plugins)(nextConfig);
