import { formatDate, getBlogPosts } from '@/lib/blog';
import { url } from '@/lib/utils';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ausath Ikram blog.',
  openGraph: {
    title: 'Blog | Ausath Ikram',
    description: "Ausath Ikram's blog.",
    url: 'https://ausathikram.vercel.app/blog',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
    images: [
      {
        url: `${url}/api/og?title=Blog%20|%20Ausath%20Ikram`,
        width: 1200,
        height: 630,
        alt: "Things that interest me, mostly about web development.",
      },
    ],
  },
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-primary text-xl">Blog</h1>
        <p>Things that interest me, mostly about web development.</p>
      </article>
      <BlogPosts />
    </section>
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
              className="w-fit sm:text-lg text-primary col-span-2 lg:col-span-1"
              href={`/blog/${post.slug}`}
            >
              {post.metadata.title}
            </Link>
            <p>{formatDate(post.metadata.publishedAt)}</p>
            <p className="hidden md:block text-sm">{post.metadata.summary}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
