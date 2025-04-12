import { projects } from '@/lib/projects';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description: "Ausath Ikram's projects.",
  openGraph: {
    title: 'Projects | Ausath Ikram',
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
        <h1 className="text-xl">Projects</h1>
        <p className="prose prose-zinc dark:prose-invert">
          Side projects I&apos;ve worked on.
        </p>
      </article>
      <ul className="space-y-4">
        {projects.map((project, i) => (
          <li className="w-fit" key={i}>
            <Link className="text-xl" href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </li>
        ))}
      </ul>
    </>
  );
}
