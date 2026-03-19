import { ImageResponse } from 'next/og'
import type { ReactNode } from 'react'

export const ogImageSize = {
  width: 1200,
  height: 630,
}

export const ogImageContentType = 'image/png'

interface OGImageProps {
  alignItems?: 'flex-start' | 'center' | 'flex-end'
  backgroundColor?: string
  children: ReactNode
  fontSize?: string
  justifyContent?: 'flex-start' | 'center' | 'flex-end'
  padding?: string
}

export function createOGImage({
  children,
  backgroundColor = '#fff',
  fontSize = '72px',
  padding = '96px',
  alignItems = 'flex-end',
  justifyContent = 'flex-start',
}: OGImageProps): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        alignItems,
        justifyContent,
        backgroundColor,
        padding,
        fontSize,
        lineHeight: '1',
      }}
    >
      {children}
    </div>,
    {
      ...ogImageSize,
    }
  )
}
