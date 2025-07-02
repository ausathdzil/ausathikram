import { Metadata } from 'next';
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
  const posts = getBlogPosts();

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  const groupedPosts = sortedPosts.reduce((acc, post) => {
    const year = new Date(post.metadata.publishedAt).getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  return (
    <>
      <article className="space-y-2">
        <h1 className="text-xl font-medium">Blog</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Things that interest me, mostly about web development.
        </p>
      </article>
      <div className="space-y-4">
        {Object.entries(groupedPosts)
          .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
          .map(([year, posts]) => (
            <div key={year} className="space-y-2">
              <h2 className="text-lg font-medium">{year}</h2>
              <ul className="space-y-1">
                {posts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      className="-mx-3 flex flex-col w-full px-3 py-2 hover:bg-muted/50 rounded-lg transition-colors ease-out"
                      href={`/blog/${post.slug}`}
                    >
                      <span>{post.metadata.title}</span>
                      <span className="text-xs sm:text-sm text-muted-foreground line-clamp-1">
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
