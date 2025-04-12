import { getBlogPosts } from '@/lib/blog';
import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import path from 'path';

export const alt = "Ausath Ikram's blog";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    return;
  }

  const pretendardSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/Pretendard-SemiBold.otf')
  );

  return new ImageResponse(
    (
      <div tw="text-7xl bg-white w-full h-full flex items-end justify-start tracking-tight p-24">
        {post.metadata.title}
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Pretendard',
          data: pretendardSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  );
}
