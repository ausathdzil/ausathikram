import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactCompiler: true,
  typedRoutes: true,
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
