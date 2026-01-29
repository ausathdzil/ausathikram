import type { MDXComponents } from 'mdx/types'
import NextLink from 'next/link'
import { highlight } from 'sugar-high'

function Link({
  children,
  href,
  ...props
}: React.ComponentProps<typeof NextLink>) {
  const hrefString = href.toString()

  if (hrefString.startsWith('/')) {
    return (
      <NextLink href={href} {...props}>
        {children}
      </NextLink>
    )
  }

  if (hrefString.startsWith('#')) {
    return (
      <a href={href.toString()} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={hrefString} rel="noopener noreferrer" target="_blank" {...props}>
      {children}
    </a>
  )
}

function Code({ children, ...props }: React.ComponentProps<'code'>) {
  const codeHtml = highlight(children as string)
  // biome-ignore lint/security/noDangerouslySetInnerHtml: sugar-high just works this way
  return <code dangerouslySetInnerHTML={{ __html: codeHtml }} {...props} />
}

const components: MDXComponents = {
  a: Link,
  code: Code,
}

export function useMDXComponents(): MDXComponents {
  return components
}
