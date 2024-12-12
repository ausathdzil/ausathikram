import { formatDate, getBlogPosts } from '@/lib/blog';
import { Metadata } from 'next';
import { Link } from 'next-view-transitions';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Ausath Ikram blog.',
};

export default function Page() {
  return (
    <section className="w-full space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-semibold">Blog</h1>
        <p>
          This is where I write about things that interest me. Mostly about web
          development.
        </p>
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center sm:gap-8">
            <Link className="w-3/4" href={`/blog/${post.slug}`}>
              <h1 className="text-lg sm:text-xl text-foreground hover:underline underline-offset-4">
                {post.metadata.title}
              </h1>
            </Link>
            <p className="">{formatDate(post.metadata.publishedAt)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
