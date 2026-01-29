import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactCompiler: true,
  typedRoutes: true,
}

export default nextConfig
