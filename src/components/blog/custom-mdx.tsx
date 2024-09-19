import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: (props) => (
    <h1
      className="text-4xl text-foreground font-bold"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="text-3xl text-foreground font-bold"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="text-lg"
      {...props}
    />
  ),
  strong: (props) => (
    <strong
      className="text-foreground"
      {...props}
    />
  ),
};

export default function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
