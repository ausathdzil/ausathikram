import type { Metadata } from 'next';
import Link from 'next/link';

import { projects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Ausath Ikram's projects.",
  openGraph: {
    title: 'Ausath Ikram - Projects',
    description: 'Ausath Ikram projects.',
    url: 'https://ausathikram.com/projects',
    siteName: 'Ausath Ikram',
    locale: 'en_US',
  },
};

export default function Page() {
  return (
    <article className="prose prose-zinc dark:prose-invert">
      <h1 className="not-prose font-medium text-primary text-xl">Projects</h1>
      <p>Side projects I&apos;ve worked on.</p>
      <ul className="not-prose mt-2 space-y-1">
        {projects.map((project) => (
          <li
            className="-mx-3 w-full rounded-lg px-3 py-2 transition-colors ease-out hover:bg-muted/50"
            key={project.slug}
          >
            <Link className="flex flex-col" href={`/projects/${project.slug}`}>
              <p>{project.title}</p>
              <p className="text-muted-foreground text-xs sm:text-sm">
                {project.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </article>
  );
}
