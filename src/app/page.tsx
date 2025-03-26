import { formatDate, getBlogPosts } from '@/lib/blog';
import { AtSignIcon, MapPinIcon } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="space-y-8">
      <article className="space-y-2">
        <h1 className="text-xl font-normal">Ausath Ikram</h1>
        <p className="prose prose-zinc dark:prose-invert">
          I&apos;m a <strong>Web Developer</strong> who mainly work with{' '}
          <strong>Next.js</strong>. I&apos;m always{' '}
          <strong>looking for new opportunities to learn and grow</strong> to
          become a better developer.
        </p>
      </article>
      <div className="flex flex-col gap-2">
        <Link className="w-fit text-xl" href="/blog">
          Blog
        </Link>
        <RecentPosts />
      </div>
      <div className="space-y-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} />
          <p>Jakarta, Indonesia</p>
        </div>
        <a
          className="w-fit flex items-center gap-2"
          href="mailto:mail@ausathikram.com"
        >
          <AtSignIcon size={16} />
          <span>Email</span>
        </a>
      </div>
    </section>
  );
}

function RecentPosts() {
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
  );
}
