import Playground from '@/app/playground/playground.mdx';
import { components } from '@/components/blog/custom-mdx';

export default function Page() {
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <Playground components={components} />
    </article>
  );
}
