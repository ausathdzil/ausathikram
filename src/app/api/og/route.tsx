import { url } from '@/lib/utils';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  const inter = await fetch(url + '/fonts/Inter-SemiBold.ttf').then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div tw="text-6xl bg-white w-full h-full flex items-end justify-start tracking-tight p-24">
        {title}
      </div>
    ),
    {
      fonts: [
        {
          data: inter,
          name: 'Inter',
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
