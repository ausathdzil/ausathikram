import Link from 'next/link';

import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

const MAX_POSTS = 10;

export default function Home() {
  const posts = getBlogPosts();

  const recentPosts = posts
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
    .splice(0, MAX_POSTS);

  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="not-prose font-medium text-primary text-xl">
        Ausath Ikram
      </h1>
      <p>Frontend Developer</p>
      <h2 className="not-prose font-medium text-primary text-xl">Work</h2>
      <p>
        I&apos;m a Frontend Developer at eBdesk. I like to build accessible,
        minimalist and performant web applications.
      </p>
      <h2 className="not-prose font-medium text-primary text-xl">Blog</h2>
      <ul className="not-prose mt-2 space-y-1">
        {recentPosts.map((post) => (
          <li
            className="-mx-3 w-full rounded-lg px-3 py-2 hover:bg-muted/50"
            key={post.slug}
          >
            <Link className="flex flex-col" href={`/blog/${post.slug}`}>
              <p>{post.metadata.title}</p>
              <time
                className="text-muted-foreground text-sm md:text-base"
                dateTime={post.metadata.publishedAt}
              >
                {formatDate(post.metadata.publishedAt)}
              </time>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
