import { projects } from '@/lib/projects';
import { ArrowUpRightIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((project) => project.slug === params.slug);

  return {
    title: project?.title,
    description: project?.description,
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((project) => project.slug === params.slug);

  return (
    <section className="py-12 space-y-12">
      {project ? (
        <article className="space-y-2">
          <h1 className="text-4xl text-primary font-bold">{project.title}</h1>
          {project.image && (
            <Image
              src={project.image || ''}
              alt={`${project.title} image preview`}
              width={800}
              height={200}
              className="rounded-lg border-zinc-500 border-2"
              priority={true}
              quality={100}
            />
          )}
          <p className="text-lg">{project.description}</p>
          <div className="flex space-x-4">
            {project.link && (
              <Link
                href={project.link}
                target="_blank"
                className="flex gap-2 items-center text-primary hover:underline underline-offset-4"
              >
                <span>view site</span>
                <ArrowUpRightIcon />
              </Link>
            )}
            {project.repo && (
              <Link
                href={project.repo}
                target="_blank"
                className="flex gap-2 items-center text-primary hover:underline underline-offset-4"
              >
                <span>github repo</span>
                <ArrowUpRightIcon />
              </Link>
            )}
          </div>
        </article>
      ) : (
        <p>project not found</p>
      )}
    </section>
  );
}
