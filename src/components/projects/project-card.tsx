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
      <Card className="flex flex-col items-center border-none shadow-none hover:bg-accent-foreground/5 dark:hover:bg-accent/15 transition ease-in-out p-6 gap-4">
        {project.image && (
          <CardHeader className="relative w-[300px] h-[150px]">
            <Image
              className="object-cover rounded-lg"
              src={project.image}
              alt={project.title}
              quality={100}
              fill
            />
          </CardHeader>
        )}
        <CardContent className="text-muted-foreground hover:text-primary transition ease-in-out">
          <CardTitle>{project.title}</CardTitle>
          <CardDescription>{project.description}</CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}
