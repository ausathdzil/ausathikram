import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

function CustomLink(props: any) {
  let href = props.href;

  if (href.startsWith('/')) {
    return (
      <Link
        className="text-primary hover:underline underline-offset-4"
        href={href}
        target="_blank"
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
      className="text-primary hover:underline underline-offset-4"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  );
}

let components = {
  h1: (props: any) => (
    <h1
      className="text-4xl text-foreground font-bold"
      {...props}
    />
  ),
  h2: (props: any) => (
    <h2
      className="text-3xl text-foreground font-bold"
      {...props}
    />
  ),
  p: (props: any) => (
    <p
      className="text-lg"
      {...props}
    />
  ),
  strong: (props: any) => (
    <strong
      className="text-foreground"
      {...props}
    />
  ),
  a: CustomLink,
};

export default function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
