import createMDX from '@next/mdx';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
    mdxRs: true,
    turbopackFileSystemCacheForDev: true,
  },
  pageExtensions: ['md', 'mdx', 'ts', 'tsx'],
  typedRoutes: true,
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
