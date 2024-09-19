import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="text-lg text-foreground font-bold">{children}</h1>
    ),
    img: (props) => (
      <Image
        className="w-100 h-auto"
        sizes="100vw"
        {...(props as ImageProps)}
      />
    ),
    ...components,
  };
}
