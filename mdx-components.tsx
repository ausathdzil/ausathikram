import type { MDXComponents } from 'mdx/types'
import type { Route } from 'next'
import NextLink from 'next/link'
import { highlight } from 'sugar-high'

function Link({ href, ...props }: React.ComponentProps<'a'>) {
  if (!href || href.startsWith('#')) {
    return <a className="scroll-m-10" href={href} {...props} />
  }

  if (href.startsWith('/')) {
    return (
      <NextLink href={href as Route} {...props}>
        {props.children}
      </NextLink>
    )
  }

  return <a href={href} rel="noopener noreferrer" target="_blank" {...props} />
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
