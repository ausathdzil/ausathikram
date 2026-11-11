import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

const title = 'Stateless Agents'

export const alt = title
export const size = ogImageSize
export const contentType = ogImageContentType

export default function Image() {
  return createOGImage({
    children: title,
  })
}
