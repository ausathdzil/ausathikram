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
  return (
    <>
      <article className="space-y-2">
        <h1 className="text-xl">Blog</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Things that interest me, mostly about web development.
        </p>
      </article>
      <BlogPosts />
    </>
  );
}

function BlogPosts() {
  const posts = getBlogPosts();

  const sortedPosts = posts.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });

  return (
    <ul className="space-y-4">
      {sortedPosts.map((post) => (
        <li key={post.slug}>
          <div className="grid grid-cols-[1fr_auto] gap-0">
            <Link
              className="w-fit sm:text-lg col-span-2 md:col-span-1"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.title}
            </Link>
            <p className="text-muted-foreground">
              {formatDate(post.metadata.publishedAt)}
            </p>
            <p className="hidden md:block text-sm text-muted-foreground max-w-[80%]">
              {post.metadata.summary}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
