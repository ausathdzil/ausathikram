import { createOGImage, ogImageContentType, ogImageSize } from '@/components/og'

export const alt = 'Blog'
export const size = ogImageSize
export const contentType = ogImageContentType

export default async function Image() {
  return await createOGImage({
    children: 'Blog',
  })
}
