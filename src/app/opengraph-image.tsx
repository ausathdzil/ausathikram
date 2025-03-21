import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Ausath Ikram';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function Image() {
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
        }}
      >
        Ausath Ikram
      </div>
    ),
    {
      ...size,
    }
  );
}
