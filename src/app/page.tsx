import { buttonVariants } from '@/components/ui/button';
import { getBlogPosts } from '@/lib/blog';
import { cn, formatDate } from '@/lib/utils';
import { RssIcon } from 'lucide-react';
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
        <Link className="w-fit text-xl font-medium" href="/blog">
          Blog
        </Link>
        <ul className="space-y-2">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link className="w-fit" href={`/blog/${post.slug}`}>
                {post.metadata.title}
              </Link>
              <p className="text-muted-foreground">
                {formatDate(post.metadata.publishedAt)}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <a
        className={cn(
          buttonVariants(),
          'rounded-full max-w-fit bg-orange-500  hover:bg-orange-500/90 text-white'
        )}
        href="/rss"
      >
        <RssIcon />
        RSS
      </a>
    </>
  );
}
