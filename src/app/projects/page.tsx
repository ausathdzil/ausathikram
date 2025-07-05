import type { Metadata } from 'next';
import Link from 'next/link';

import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Ausath Ikram's projects.",
  openGraph: {
    title: 'Projects - Ausath Ikram',
    description: 'Ausath Ikram projects.',
    url: 'https://ausathikram.com/projects',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
  },
};

export default function Page() {
  return (
    <>
      <article className="space-y-2">
        <h1 className="font-medium text-xl">Projects</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Side projects I&apos;ve worked on.
        </p>
      </article>
      <ul className="space-y-1">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              className="-mx-3 flex w-full flex-col rounded-lg px-3 py-2 transition-colors ease-out hover:bg-muted/50"
              href={`/projects/${project.slug}`}
            >
              <span>{project.title}</span>
              <span className="text-muted-foreground text-xs sm:text-sm">
                {project.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
