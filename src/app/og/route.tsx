import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  const interSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/Inter-SemiBold.ttf')
  );

  return new ImageResponse(
    (
      <div tw="text-7xl bg-white w-full h-full flex items-end justify-start p-24">
        {title}
      </div>
    ),
    {
      fonts: [
        {
          data: interSemiBold,
          name: 'Inter',
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
