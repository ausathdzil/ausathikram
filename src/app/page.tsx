import { formatDate, getBlogPosts } from '@/lib/blog';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

export default function Home() {
  const posts = getBlogPosts();

  const recentPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .splice(0, 3);

  return (
    <section className="max-w-3xl py-12 space-y-8">
      <article className="space-y-4 text-lg">
        <h1 className="text-2xl text-foreground font-semibold">Ausath Ikram</h1>
        <p className="[&>strong]:text-foreground [&>strong]:font-normal">
          I&apos;m an undergraduate <strong>CS student</strong> majoring in
          Information Systems. I&apos;m also a <strong>web developer</strong>{' '}
          who mainly work with <strong>Next.js</strong>. I&apos;m always{' '}
          <strong>looking for new opportunities to learn and grow</strong> to
          become a better developer.
        </p>
      </article>
      <div className="space-y-2">
        <Link
          href="/blog"
          className="text-xl text-foreground hover:underline underline-offset-4"
        >
          Blog
        </Link>
        <ul className="space-y-2">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-lg text-foreground hover:underline underline-offset-4"
              >
                {post.metadata.title}
              </Link>
              <p>{formatDate(post.metadata.publishedAt)}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <Link
          className="flex text-muted-foreground gap-2 hover:underline underline-offset-4"
          href="/contact"
        >
          <MailIcon />
          <p>ausathdzil@gmail.com</p>
        </Link>
        <div className="flex text-muted-foreground gap-2">
          <MapPinIcon />
          <p>Jakarta, Indonesia</p>
        </div>
      </div>
    </section>
  );
}
