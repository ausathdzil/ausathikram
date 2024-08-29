import ProjectCard from '@/components/projects/project-card';
import { projects } from '@/lib/projects';

export const metadata = {
  title: 'projects',
  description: 'ausath ikram projects.',
};

export default function Page() {
  return (
    <section className="py-12 space-y-6 text-center">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
