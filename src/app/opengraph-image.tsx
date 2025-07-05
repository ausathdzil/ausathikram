import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'Ausath Ikram';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  const interSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/Inter-SemiBold.ttf')
  );

  return new ImageResponse(
    <div tw="text-7xl bg-white w-full h-full flex items-end justify-start p-24">
      Ausath Ikram
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
