import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
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
};

export default function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
