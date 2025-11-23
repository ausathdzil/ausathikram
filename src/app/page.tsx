import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { getBlogPostsMetadata } from '@/lib/blog';
import { sortByDateDesc } from '@/lib/utils';

const MAX_POSTS = 5;

export default function Home() {
  const posts = getBlogPostsMetadata();
  const recentPosts = sortByDateDesc(posts).slice(0, MAX_POSTS);

  return (
    <article className="prose prose-neutral dark:prose-invert">
      <h1 className="font-medium text-xl">Ausath Ikram</h1>
      <p>
        I&apos;m a Frontend Developer at eBdesk. I like to build websites that
        feels good to use.
      </p>
      <p>
        You can find my code on{' '}
        <a
          href="https://github.com/ausathdzil"
          rel="noopener noreferrer"
          target="_blank"
        >
          GitHub
        </a>{' '}
        and connect with me on{' '}
        <a
          href="https://linkedin.com/in/ausathdzil"
          rel="noopener noreferrer"
          target="_blank"
        >
          LinkedIn
        </a>
        .
      </p>
      <h2 className="font-medium text-xl">Blog</h2>
      <ul className="not-prose">
        {recentPosts.map((post) => (
          <li key={post.slug}>
            <Link
              className="-ml-3 flex w-full flex-col rounded-lg px-3 py-2 hover:bg-muted/50"
              href={`/blog/${post.slug}`}
            >
              <p>{post.metadata.title}</p>
              <p className="text-muted-foreground">{post.metadata.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
      {recentPosts.length < posts.length && (
        <Link
          className="not-prose -mx-3 flex w-full items-center gap-2 rounded-lg px-3 py-2 font-medium hover:bg-muted/50"
          href="/blog"
        >
          More <ArrowRightIcon size={16} />
        </Link>
      )}
    </article>
  );
}
