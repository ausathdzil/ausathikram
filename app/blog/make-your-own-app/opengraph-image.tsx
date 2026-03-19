import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

const title = 'Make Your Own App'

export const alt = title
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return createOGImage({
    children: title,
  })
}
