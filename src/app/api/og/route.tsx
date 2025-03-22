import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

async function loadGoogleFont() {
  const res = await fetch(
    'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,400&display=swap'
  ).then((res) => res.text());

  const fontUrlMatch = res.match(
    /url\((https:\/\/fonts\.gstatic\.com[^)]+\.ttf)\)/
  );

  if (!fontUrlMatch) {
    throw new Error('Could not find font URL');
  }

  const fontBuffer = await fetch(fontUrlMatch[1]).then((res) =>
    res.arrayBuffer()
  );

  return fontBuffer;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const title = searchParams.get('title') || 'Ausath Ikram';

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 64,
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
          name: 'Inter',
          data: await loadGoogleFont(),
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
