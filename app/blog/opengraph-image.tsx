import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Blog'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  const libreFranklinSemiBold = await readFile(
    path.join(process.cwd(), 'app/fonts/LibreFranklin-SemiBold.ttf')
  )

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
      Blog
    </div>,
    {
      ...size,
      fonts: [
        {
          name: 'Libre Franklin',
          data: libreFranklinSemiBold,
          style: 'normal',
          weight: 600,
        },
      ],
    }
  )
}
