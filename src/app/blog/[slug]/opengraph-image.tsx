import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

import { getBlogPost, getBlogPostsMetadata } from '@/lib/blog';

export const alt = "Ausath Ikram's blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export function generateStaticParams() {
  const posts = getBlogPostsMetadata();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Image({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return new Response('Not found', { status: 404 });
  }

  const libreFranklinSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/LibreFranklin-SemiBold.ttf')
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
      {post.metadata.title}
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Libre Franklin',
          data: libreFranklinSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
