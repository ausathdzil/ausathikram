import ProjectCard from '@/components/projects/project-card';
import { projects, Project } from '@/lib/projects';

export default function Page() {
  return (
    <section className="py-12 space-y-6 text-center">
      <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        {projects.map((project: Project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}
      </ul>
    </section>
  );
}
