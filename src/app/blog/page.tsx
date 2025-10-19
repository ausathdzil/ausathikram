import type { Metadata } from 'next';
import Link from 'next/link';

import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ausath Ikram blog.',
  openGraph: {
    title: 'Blog - Ausath Ikram',
    description: "Ausath Ikram's blog.",
    url: 'https://ausathikram.com/blog',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
  },
};

export default function Page() {
  const allPosts = getBlogPosts();

  const sortedPosts = allPosts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );

  const groupedPosts = sortedPosts.reduce(
    (acc, post) => {
      const year = new Date(post.metadata.publishedAt).getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {} as Record<number, typeof allPosts>
  );

  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="not-prose font-medium text-primary text-xl">Blog</h1>
      <p>Things that interest me, mostly about web development.</p>
      <div className="space-y-4">
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, posts]) => (
            <div className="space-y-2" key={year}>
              <h2 className="not-prose font-medium text-primary text-xl">
                {year}
              </h2>
              <ul className="not-prose mt-2 space-y-1">
                {posts.map((post) => (
                  <li
                    className="-mx-3 w-full rounded-lg px-3 py-2 hover:bg-muted/50"
                    key={post.slug}
                  >
                    <Link className="flex flex-col" href={`/blog/${post.slug}`}>
                      <div className="flex justify-between">
                        <p>{post.metadata.title}</p>
                        <time
                          className="hidden text-muted-foreground text-sm sm:block"
                          dateTime={post.metadata.publishedAt}
                        >
                          {formatDate(post.metadata.publishedAt, false)}
                        </time>
                      </div>
                      <p className="line-clamp-1 text-muted-foreground text-xs sm:text-sm">
                        {post.metadata.summary}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </article>
  );
}
