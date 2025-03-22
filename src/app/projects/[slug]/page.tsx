import { projects } from '@/lib/projects';
import { url } from '@/lib/utils';
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
      url: `https://ausathikram.vercel.app/projects/${project.slug}`,
      siteName: 'Ausath Ikram',
      locale: 'en_US',
      images: [
        {
          url: `${url}/api/og?title=${project.title}`,
          width: 1200,
          height: 630,
          alt: `${project.title}`,
        },
      ],
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
    <section className="w-full">
      <div className="space-y-8">
        {project.image && (
          <div className="relative w-[250px] h-[150px] sm:w-[350px] sm:h-[300px] lg:w-[600px] max-w-full lg:h-[300px]">
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
          <h1 className="text-xl text-primary">{project.title}</h1>
          <p>{project.description}</p>
        </article>
        <div className="flex items-center gap-4 text-primary">
          {project.link && (
            <a
              className="flex gap-2 items-center"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Demo</span>
              <ArrowUpRightIcon />
            </a>
          )}
          {project.repo && (
            <a
              className="flex gap-2 items-center"
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub Repo</span>
              <ArrowUpRightIcon />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
