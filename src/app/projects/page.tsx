import { projects } from '@/lib/projects';
import { Link } from 'next-view-transitions';

export const metadata = {
  title: 'projects',
  description: 'ausath ikram projects.',
};

export default function Page() {
  return (
    <section className="w-full max-w-3xl py-12 space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl text-foreground font-bold">projects</h1>
        <p>side projects i&apos;ve worked on.</p>
      </article>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${project.slug}`}>
              <h1 className="text-xl text-foreground hover:underline underline-offset-4">
                {project.title}
              </h1>
            </Link>
            <p className="w-2/3">{project.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
