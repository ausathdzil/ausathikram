import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

export const alt = 'Ausath Ikram'
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return createOGImage({
    children: 'Ausath Ikram',
  })
}
