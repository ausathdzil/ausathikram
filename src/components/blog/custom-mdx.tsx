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

function BlueButton(props: any) {
  return (
    <button
      className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded-lg"
      {...props}
    >
      button
    </button>
  );
}

let components = {
  a: CustomLink,
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
