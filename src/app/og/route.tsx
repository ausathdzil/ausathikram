import { readFile } from 'fs/promises';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import path from 'path';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  const pretendardSemiBold = await readFile(
    path.join(process.cwd(), 'src/app/fonts/Pretendard-SemiBold.otf')
  );

  return new ImageResponse(
    (
      <div tw="text-7xl bg-white w-full h-full flex items-end justify-start tracking-tight p-24">
        {title}
      </div>
    ),
    {
      fonts: [
        {
          data: pretendardSemiBold,
          name: 'Pretendard',
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
