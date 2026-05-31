import { ImageResponse } from 'next/og'

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = 'image/png'

export function createOGImage({
  children,
}: {
  children: React.ReactNode
}): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems: 'flex-end',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: '96px',
        fontSize: '72px',
        lineHeight: '1',
      }}
    >
      {children}
    </div>,
    {
      ...ogImageSize,
    },
  )
}
