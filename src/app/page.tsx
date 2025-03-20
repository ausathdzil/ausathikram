import { formatDate, getBlogPosts } from "@/lib/blog";
import { AtSign, MapPinIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <section className="space-y-8">
      <article className="space-y-4 text-lg">
        <h1 className="text-xl text-primary">Ausath Ikram</h1>
        <p className="[&>strong]:text-primary [&>strong]:font-normal">
          I&apos;m a <strong>Web Developer</strong> who mainly work with{" "}
          <strong>Next.js</strong>. I&apos;m always{" "}
          <strong>looking for new opportunities to learn and grow</strong> to
          become a better developer.
        </p>
      </article>
      <div className="flex flex-col gap-2 text-primary">
        <Link
          href="/blog"
          className="text-xl hover:underline underline-offset-4"
        >
          Blog
        </Link>
        <RecentPosts />
      </div>
      <div className="space-y-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPinIcon size={16} />
          <p>Jakarta, Indonesia</p>
        </div>
        <Link
          className="flex items-center gap-2 hover:underline underline-offset-4"
          href="/contact"
        >
          <AtSign size={16} />
          <p>Contact Me</p>
        </Link>
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
          <Link
            href={`/blog/${post.slug}`}
            className="text-lg hover:underline underline-offset-4"
          >
            {post.metadata.title}
          </Link>
          <p className="text-muted-foreground">{formatDate(post.metadata.publishedAt)}</p>
        </li>
      ))}
    </ul>
  );
}
