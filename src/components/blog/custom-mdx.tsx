import CopyButton from '@/components/blog/copy-button';
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc';
import { Link } from 'next-view-transitions';
import React, { Children } from 'react';
import { codeToHtml } from 'shiki';

function CustomLink(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href;

  if (href?.startsWith('/')) {
    return (
      <Link
        className="underline-offset-4 decoration-zinc-500 hover:decoration-zinc-950 dark:hover:decoration-zinc-50"
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  if (href?.startsWith('#')) {
    return <a {...props} />;
  }

  return (
    <a
      className="underline-offset-4 decoration-zinc-500 hover:decoration-zinc-950 dark:hover:decoration-zinc-50"
      target="_blank"
      rel="noopener noreferrer"
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

  if (isCodeBlock) {
    const lang = className.split(' ')[0]?.split('-')[1] ?? '';

    if (!lang) {
      return (
        <div className="relative">
          <CopyButton codeElement={codeElement} />
          <code {...props}>{children}</code>
        </div>
      );
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    });

    return (
      <div className="relative">
        <CopyButton codeElement={codeElement} />
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

const components = {
  a: CustomLink,
  pre: Pre,
};

export default function CustomMDX(
  props: React.JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
