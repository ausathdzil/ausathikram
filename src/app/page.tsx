import Link from 'next/link';

import { getBlogPosts } from '@/lib/blog';
import { projects } from '@/lib/projects';
import { formatDate } from '@/lib/utils';

const MAX_POSTS = 4;

export default function Home() {
  const posts = getBlogPosts();

  const recentPosts = posts
    .sort((a, b) => {
      return (
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
      );
    })
    .splice(0, MAX_POSTS);

  const recentProjects = projects.slice(0, MAX_POSTS);

  return (
    <>
      <article className="space-y-2">
        <h1 className="font-medium text-xl">Ausath Ikram</h1>
        <p className="text-muted-foreground">Frontend Developer</p>
      </article>

      <article className="space-y-2">
        <h1 className="font-medium text-xl">Work</h1>
        <p className="prose prose-zinc dark:prose-invert">
          I&apos;m a Frontend Developer at eBdesk. I like to build accessible,
          minimalist and performant web applications.
        </p>
      </article>

      <div className="flex flex-col gap-2">
        <Link className="font-medium text-xl" href="/blog">
          Blog
        </Link>
        <ul className="space-y-1">
          {recentPosts.map((post) => (
            <li key={post.slug}>
              <Link
                className="-mx-3 flex w-full flex-col rounded-lg px-3 py-2 transition-colors ease-out hover:bg-muted/50"
                href={`/blog/${post.slug}`}
              >
                <span>{post.metadata.title}</span>
                <span className="text-muted-foreground text-sm md:text-base">
                  {formatDate(post.metadata.publishedAt)}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <Link className="font-medium text-xl" href="/projects">
          Projects
        </Link>
        <ul className="space-y-1">
          {recentProjects.map((project) => (
            <li key={project.slug}>
              <Link
                className="-mx-3 flex w-full flex-col rounded-lg px-3 py-2 transition-colors ease-out hover:bg-muted/50"
                href={`/projects/${project.slug}`}
              >
                <span>{project.title}</span>
                <span className="line-clamp-1 text-muted-foreground text-sm md:text-base">
                  {project.description}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
