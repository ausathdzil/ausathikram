import { projects } from '@/lib/projects';
import { ArrowUpRightIcon } from 'lucide-react';
import Image from 'next/image';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  props: {
    params: Promise<{ slug: string }>;
  }
) {
  const params = await props.params;
  const project = projects.find((project) => project.slug === params.slug);

  return {
    title: project?.title,
    description: project?.description,
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = projects.find((project) => project.slug === params.slug);

  return (
    <section className="py-12 space-y-12">
      {project ? (
        <div className="space-y-4">
          {project.image && (
            <div className="relative w-[250px] h-[150px] sm:w-[400px] sm:h-[300px] lg:w-[700px] lg:h-[400px]">
              <Image
                className="object-cover object-top rounded-lg border-zinc-500 border-2"
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
          <article>
            <h1 className="text-4xl text-primary font-bold">{project.title}</h1>
            <p className="text-lg">{project.description}</p>
          </article>
          <div className="flex space-x-4">
            {project.link && (
              <a
                className="flex gap-2 items-center text-primary hover:underline underline-offset-4"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>view site</span>
                <ArrowUpRightIcon />
              </a>
            )}
            {project.repo && (
              <a
                className="flex gap-2 items-center text-primary hover:underline underline-offset-4"
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>github repo</span>
                <ArrowUpRightIcon />
              </a>
            )}
          </div>
        </div>
      ) : (
        <p>project not found</p>
      )}
    </section>
  );
}
