import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

import { projects } from '@/lib/projects';

export const alt = "Ausath Ikram's projects";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function Image({ params }: PageProps<'/projects/[slug]'>) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return new Response('Not found', { status: 404 });
  }

  const interSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/Inter-SemiBold.ttf')
  );

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: '96px',
        fontSize: '72px',
        lineHeight: '1',
      }}
    >
      {project.title}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Inter',
          data: interSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
