import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Project } from '@/lib/projects';
import { Link } from 'next-view-transitions';
import Image from 'next/image';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.image ? `/projects/${project.slug}` : `${project.repo}`}
      target={project.image ? '_self' : '_blank'}
    >
      <Card className="text-muted-foreground hover:text-primary flex flex-col items-center border-none shadow-none hover:bg-accent-foreground/5 dark:hover:bg-accent/15 transition ease-in-out p-6 gap-4">
        {project.image && (
          <CardHeader className="relative w-[250px] h-[150px] md:w-[300px] md:h-[200px]">
            <Image
              className="object-cover object-top rounded-lg border-zinc-500 border-2"
              src={project.image}
              alt={project.title}
              priority={true}
              fill
            />
          </CardHeader>
        )}
        <CardContent className="space-y-2">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
