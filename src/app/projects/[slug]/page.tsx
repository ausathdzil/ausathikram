import { Button } from '@/components/ui/button';
import { projects } from '@/lib/projects';
import { baseUrl } from '@/lib/utils';
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
      images: [
        {
          url: `${baseUrl}/og?title=${encodeURIComponent(project.title)}`,
          width: 1200,
          height: 630,
          alt: `${project.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
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
        <div className="relative w-[300px] h-[150px] md:w-[450px] md:h-[300px] lg:w-[600px] max-w-full lg:h-[300px]">
          <Image
            className="object-cover object-top rounded-lg"
            src={project.image}
            alt={`${project.title} image preview`}
            priority={true}
            placeholder="blur"
            fill
            sizes="(min-width: 1024px) 100vw, (min-width: 640px) 50vw, 33vw"
            quality={100}
          />
        </div>
      )}
      <article className="space-y-2">
        <h1 className="text-xl">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </article>
      <div className="flex items-center gap-4">
        {project.link && (
          <Button asChild>
            <a href={project.link} target="_blank" rel="noopener noreferrer">
              <ArrowUpRightIcon />
              <span>Demo</span>
            </a>
          </Button>
        )}
        {project.repo && (
          <Button asChild variant="outline">
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
