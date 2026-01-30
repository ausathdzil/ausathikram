import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    inlineCss: true,
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  reactCompiler: true,
}

const withMDX = createMDX({
  options: {
    remarkPlugins: ['remark-gfm', 'remark-toc'],
    rehypePlugins: ['rehype-slug', 'rehype-autolink-headings'],
  },
})

export default withMDX(nextConfig)
