import { url } from '@/lib/utils';
import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  const inter = await fetch(url + '/fonts/Inter-Regular.ttf').then((res) =>
    res.arrayBuffer()
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-start',
          padding: '6rem',
        }}
      >
        {title}
      </div>
    ),
    {
      fonts: [
        {
          data: inter,
          name: 'Inter',
          weight: 400,
          style: 'normal',
        },
      ],
    }
  );
}
