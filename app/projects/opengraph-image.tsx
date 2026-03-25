import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

export const alt = 'Projects'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return createOGImage({
    children: 'Projects',
  })
}
