import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

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

  return (
    <>
      <article className="space-y-2">
        <h1 className="text-xl font-medium">Blog</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Things that interest me, mostly about web development.
        </p>
      </article>
      <ul className="space-y-1">
        {sortedPosts.map((post) => (
          <li key={post.slug}>
            <Link
              className="-mx-3 flex flex-col w-full px-3 py-2 hover:bg-muted/50 rounded-lg transition-colors"
              href={`/blog/${post.slug}`}
            >
              <span>{post.metadata.title}</span>
              <span className="text-sm text-muted-foreground max-w-[80%]">
                {post.metadata.summary}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
