import { ImageResponse } from 'next/og';

export default function OpengraphImage({
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
    }
  );
}
