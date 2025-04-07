import { baseUrl } from '@/lib/utils';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  const pretendard = await fetch(
    baseUrl + '/fonts/Pretendard-SemiBold.otf'
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div tw="text-7xl bg-white w-full h-full flex items-end justify-start tracking-tight p-24">
        {title}
      </div>
    ),
    {
      fonts: [
        {
          data: pretendard,
          name: 'Pretendard',
          weight: 600,
          style: 'normal',
        },
      ],
    }
  );
}
