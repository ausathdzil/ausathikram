import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

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

let components = {
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
