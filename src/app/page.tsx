import { getBlogPosts } from '@/lib/blog';
import { MailIcon, MapPinIcon } from 'lucide-react';
import { Link } from 'next-view-transitions';

export default function Home() {
  let posts = getBlogPosts();

  let recentPosts = posts
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
        <h1 className="text-3xl text-foreground font-bold">ausath ikram</h1>
        <p>
          hi 👋 my name is{' '}
          <strong className="text-foreground">ausath abdi dzil ikram</strong>.
          i&apos;m an undergraduate computer science student majoring in
          information systems. i&apos;m also a{' '}
          <strong className="text-foreground">web developer</strong>. i mainly
          work with <strong className="text-foreground">next.js</strong> as my
          go to react framework. i&apos;m always looking for new opportunities
          to learn and grow.
        </p>
      </article>
      <div className="space-y-2">
        <Link
          href="/blog"
          className="text-2xl text-foreground font-bold hover:underline underline-offset-4"
        >
          blog
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
              <p>{post.metadata.publishedAt}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-4">
        <div className="flex text-muted-foreground gap-2">
          <MailIcon />
          <p>ausathdzil@gmail.com</p>
        </div>
        <div className="flex text-muted-foreground gap-2">
          <MapPinIcon />
          <p>jakarta, indonesia</p>
        </div>
      </div>
    </section>
  );
}
