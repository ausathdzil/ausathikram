import { getBlogPosts } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

export default function Home() {
  const posts = getBlogPosts();

  const recentPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .splice(0, 4);

  return (
    <>
      <article className="space-y-2">
        <h1 className="text-xl font-medium">Ausath Ikram</h1>
        <p className="prose prose-zinc dark:prose-invert prose-strong:font-medium">
          I&apos;m a <strong>web developer</strong> who mainly work with{' '}
          <strong>Next.js</strong>. I&apos;m always{' '}
          <strong>looking for new opportunities to learn and grow</strong> to
          become a better developer.
        </p>
      </article>
      <div className="flex flex-col gap-2">
        <span className="text-xl font-medium">Blog</span>
        <ul className="space-y-1">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                className="-mx-3 flex flex-col w-full px-3 py-2 hover:bg-muted/50 rounded-lg transition-colors"
                href={`/blog/${post.slug}`}
              >
                <span>{post.metadata.title}</span>
                <span className="text-muted-foreground">
                  {formatDate(post.metadata.publishedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
