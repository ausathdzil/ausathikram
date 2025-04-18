import { Button } from '@/components/ui/button';
import { projects } from '@/lib/projects';
import { ArrowUpRightIcon } from 'lucide-react';
import { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const project = projects.find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `https://ausathikram.com/projects/${project.slug}`,
      siteName: 'Ausath Ikram',
      locale: 'en_US',
    },
  };
}

export default async function Page(props: ProjectPageProps) {
  const params = await props.params;
  const project = projects.find((project) => project.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {project.image && (
        <div className="border rounded-lg relative w-[606px] max-w-full h-[200px] sm:h-[250px] md:h-[300px]">
          <Image
            className="object-cover object-top rounded-lg"
            src={project.image}
            alt={`${project.title} image preview`}
            placeholder="blur"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            quality={100}
            priority
          />
        </div>
      )}
      <article className="space-y-2">
        <h1 className="text-xl">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </article>
      <div className="flex items-center gap-4">
        {project.link && (
          <Button size="lg" asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ArrowUpRightIcon />
              <span>Demo</span>
            </a>
          </Button>
        )}
        {project.repo && (
          <Button size="lg" asChild variant="outline">
            <a href={project.repo} target="_blank" rel="noopener noreferrer">
              <ArrowUpRightIcon />
              <span>GitHub</span>
            </a>
          </Button>
        )}
      </div>
    </>
  );
}
