import type { MDXComponents } from 'mdx/types';
import type { Route } from 'next';
import NextImage from 'next/image';
import NextLink from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import {
  Children,
  type ComponentProps,
  createElement,
  isValidElement,
  type JSX,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Tweet } from 'react-tweet';
import { codeToHtml } from 'shiki';

import { slugify } from '@/lib/utils';
import { CopyButton } from './copy-button';

function Link<T extends string>({
  href,
  ...props
}: ComponentProps<'a'> & {
  href: Route<T> | URL | string;
}) {
  if (!href || href.startsWith('#')) {
    return <a href={href} {...props} />;
  }

  if (href.startsWith('/')) {
    return (
      <NextLink
        className="decoration-muted-foreground underline-offset-4 hover:decoration-primary"
        href={href as Route<T>}
        {...props}
      >
        {props.children}
      </NextLink>
    );
  }

  return (
    <a
      className="decoration-muted-foreground underline-offset-4 hover:decoration-primary"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  );
}

function Image(props: ComponentProps<typeof NextImage>) {
  return (
    <NextImage
      className="rounded-md"
      height={300}
      priority
      width={700}
      {...props}
    />
  );
}

async function Pre({ children, ...props }: ComponentProps<'pre'>) {
  const codeElement = Children.toArray(children).find(
    (child) => isValidElement(child) && child.type === 'code'
  ) as ReactElement<HTMLPreElement> | undefined;

  const className = codeElement?.props?.className ?? '';
  const isCodeBlock =
    typeof className === 'string' && className.startsWith('language-');

  const lang = className.split(' ')[0]?.split('-')[1] ?? '';

  if (isCodeBlock || lang) {
    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        light: 'github-light',
        dark: 'vesper',
      },
    });

    return (
      <div className="relative">
        <CopyButton codeElement={codeElement} />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Required for Shiki code highlighting */}
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    );
  }

  return (
    <div className="relative">
      <CopyButton codeElement={codeElement} />
      <pre {...props}>{children}</pre>
    </div>
  );
}

function createHeading(level: number) {
  const Heading = ({ children }: { children: ReactNode }) => {
    const slug = slugify(String(children));

    return createElement(
      `h${level}`,
      { id: slug, className: 'group relative font-semibold text-xl' },
      [
        createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            'aria-hidden': true,
            tabIndex: -1,
            className:
              'absolute invisible no-underline -ml-[1em] pr-2 w-full group-hover:visible',
          },
          createElement(
            'span',
            {
              className:
                'text-muted-foreground opacity-0 group-hover:opacity-100',
            },
            '#'
          )
        ),
        children,
      ]
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

export const components: MDXComponents = {
  a: Link,
  h1: createHeading(1),
  h2: createHeading(2),
  // biome-ignore lint/style/noMagicNumbers: Level 3 heading
  h3: createHeading(3),
  img: Image,
  pre: Pre,
  Tweet,
};

export function CustomMDX(props: JSX.IntrinsicAttributes & MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
