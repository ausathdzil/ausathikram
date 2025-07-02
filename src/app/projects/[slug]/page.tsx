import { ArrowUpRightIcon } from 'lucide-react';

import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { projects } from '@/lib/projects';
import { baseUrl, cn } from '@/lib/utils';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  props: ProjectPageProps
): Promise<Metadata> {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      url: `${baseUrl}/projects/${project.slug}`,
      siteName: 'Ausath Ikram',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/og?title=${project.title}`,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
  };
}

export default async function Page(props: ProjectPageProps) {
  const params = await props.params;
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {project.image && (
        <div className="relative w-[700px] max-w-full h-[200px] sm:h-[350px] border rounded-md">
          <Image
            className="object-cover object-top rounded-md"
            src={project.image}
            alt={project.title}
            fill
            priority
            placeholder="blur"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 100vw"
            quality={100}
          />
        </div>
      )}
      <article className="space-y-2">
        <h1 className="text-xl font-medium">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </article>
      <div className="flex items-center gap-4">
        {project.link && (
          <a
            className={cn(buttonVariants({ size: 'lg' }))}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRightIcon />
            <span>Demo</span>
          </a>
        )}
        {project.repo && (
          <a
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ArrowUpRightIcon />
            GitHub
          </a>
        )}
      </div>
    </>
  );
}
