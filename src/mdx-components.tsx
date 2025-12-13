import type { MDXComponents } from 'mdx/types';

import { components } from '@/components/custom-mdx';

export function useMDXComponents(mdxComponents: MDXComponents): MDXComponents {
  return { ...components, ...mdxComponents };
}
