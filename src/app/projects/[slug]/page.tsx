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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

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
    },
  };
}

export default async function Page({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      {project.image && (
        <div className="relative h-[200px] w-[700px] max-w-full rounded-md border sm:h-[350px]">
          <Image
            alt={project.title}
            className="rounded-md object-cover object-top"
            fill
            placeholder="blur"
            priority
            quality={100}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 100vw"
            src={project.image}
          />
        </div>
      )}
      <article className="space-y-2">
        <h1 className="font-medium text-xl">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </article>
      <div className="flex items-center gap-4">
        {project.link && (
          <a
            className={cn(buttonVariants({ size: 'lg' }))}
            href={project.link}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ArrowUpRightIcon />
            Demo
          </a>
        )}
        {project.repo && (
          <a
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}
            href={project.repo}
            rel="noopener noreferrer"
            target="_blank"
          >
            <ArrowUpRightIcon />
            GitHub
          </a>
        )}
      </div>
    </>
  );
}
