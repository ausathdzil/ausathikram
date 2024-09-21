import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import React, { Children } from 'react';
import { codeToHtml } from 'shiki';

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link
        className="underline-offset-4"
        href={href}
        {...props}
      >
        {props.children}
      </Link>
    );
  }

  if (href.startsWith('#')) {
    return <a {...props} />;
  }

  return (
    <a
      className="underline-offset-4"
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
      return <code {...props}>{children}</code>;
    }

    const html = await codeToHtml(String(codeElement?.props.children), {
      lang,
      theme: 'vitesse-dark',
    });

    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  return <pre {...props}>{children}</pre>;
}

function BlueButton(props: any) {
  return (
    <button
      className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      {...props}
    >
      button
    </button>
  );
}

let components = {
  a: CustomLink,
  pre: Pre,
  BlueButton,
};

export default function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
