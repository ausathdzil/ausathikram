import { ImageResponse } from 'next/og';

async function loadGoogleFont() {
  const res = await fetch(
    'https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,700&display=swap'
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

export default async function OpengraphImage({
  title,
  size,
}: {
  title: string;
  size: { width: number; height: number };
}) {
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
          padding: '6rem 4rem',
          textTransform: 'capitalize',
        }}
      >
        {title}
      </div>
    ),
    {
      ...size,
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
