import type { Metadata } from 'next';
import Link from 'next/link';

import { getBlogPosts } from '@/lib/blog';

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
    <>
      <article className="space-y-2">
        <h1 className="font-medium text-xl">Blog</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Things that interest me, mostly about web development.
        </p>
      </article>
      <div className="space-y-4">
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, posts]) => (
            <div className="space-y-2" key={year}>
              <h2 className="font-medium text-lg">{year}</h2>
              <ul className="space-y-1">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      className="-mx-3 flex w-full flex-col rounded-lg px-3 py-2 hover:bg-muted/50"
                      href={`/blog/${post.slug}`}
                    >
                      <span>{post.metadata.title}</span>
                      <span className="line-clamp-1 text-muted-foreground text-xs sm:text-sm">
                        {post.metadata.summary}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </>
  );
}
