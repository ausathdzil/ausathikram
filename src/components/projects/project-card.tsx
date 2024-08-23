import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Project } from '@/lib/projects';
import { Link } from 'next-view-transitions';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.image ? `/projects/${project.slug}` : `${project.repo}`}
      target={project.image ? '_self' : '_blank'}
    >
      <Card className="border-none shadow-none hover:bg-accent-foreground/5 dark:hover:bg-accent/15 transition ease-in-out">
        <CardHeader className="text-muted-foreground hover:text-primary transition ease-in-out">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
