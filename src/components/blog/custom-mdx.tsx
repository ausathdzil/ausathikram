import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import React, { Children } from 'react';
import { Tweet } from 'react-tweet';
import { codeToHtml } from 'shiki';

import { slugify } from '@/lib/utils';
import { CopyButton } from './copy-button';

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (!href || href.startsWith('#')) {
    return <a {...props} />;
  }

  if (href.startsWith('/')) {
    return (
      <Link
        className="decoration-muted-foreground underline-offset-4 hover:decoration-primary"
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <a
      className="decoration-muted-foreground underline-offset-4 hover:decoration-primary"
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    />
  );
}

function CustomImage(props: React.ComponentProps<typeof Image>) {
  return (
    /* eslint-disable-next-line jsx-a11y/alt-text */
    <Image
      className="rounded-md"
      height={300}
      priority
      width={700}
      {...props}
    />
  );
}

async function Pre({
  children,
  ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) {
  const codeElement = Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === 'code'
  ) as React.ReactElement<HTMLPreElement> | undefined;

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
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Required for code highlighting */}
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
  const Heading = ({ children }: { children: React.ReactNode }) => {
    const slug = slugify(String(children));

    return React.createElement(
      `h${level}`,
      { id: slug, className: 'group relative font-semibold text-xl' },
      [
        React.createElement(
          'a',
          {
            href: `#${slug}`,
            key: `link-${slug}`,
            'aria-hidden': true,
            tabIndex: -1,
            className:
              'absolute invisible no-underline -ml-[1em] pr-2 w-full group-hover:visible',
          },
          React.createElement(
            'span',
            {
              className:
                'text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100',
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

const components = {
  a: CustomLink,
  img: CustomImage,
  pre: Pre,
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Tweet,
};

export function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
