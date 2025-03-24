import createMDX from '@next/mdx';
import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  transpilePackages: ['next-mdx-remote'],
  experimental: {
    viewTransition: true,
  }
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
